import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover' as any,
});

// Create or get the Premium product + price
async function getOrCreatePrice(): Promise<string> {
  const prices = await stripe.prices.list({
    lookup_keys: ['kurdi_premium_monthly'],
    limit: 1,
  });

  if (prices.data.length > 0) {
    return prices.data[0].id;
  }

  const product = await stripe.products.create({
    name: 'kurdi.ch Premium',
    description: 'Alle Lektionen (A1–C2), Sprachausgabe, Eltern-Dashboard, werbefrei',
  });

  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: 1000, // 10.00 CHF
    currency: 'chf',
    recurring: { interval: 'month' },
    lookup_key: 'kurdi_premium_monthly',
  });

  return price.id;
}

export async function POST(req: NextRequest) {
  try {
    const origin = req.headers.get('origin') || 'http://localhost:3000';
    const body = await req.json().catch(() => ({}));
    const { user_id, email } = body;

    const priceId = await getOrCreatePrice();

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/pricing?success=true`,
      cancel_url: `${origin}/pricing?canceled=true`,
      metadata: { user_id: String(user_id || '') },
    };

    // Pre-fill email if available
    if (email) {
      sessionParams.customer_email = email;
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    console.error('Stripe error:', e.message);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
