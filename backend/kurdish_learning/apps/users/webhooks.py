import stripe
from datetime import timedelta
from django.conf import settings
from django.http import HttpResponse
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from .models import User

stripe.api_key = settings.STRIPE_SECRET_KEY


@csrf_exempt
@require_POST
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE', '')

    # Verify webhook signature if secret is configured
    if settings.STRIPE_WEBHOOK_SECRET:
        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
            )
        except (ValueError, stripe.error.SignatureVerificationError):
            return HttpResponse(status=400)
    else:
        # In test mode without webhook secret, parse directly
        import json
        event = stripe.Event.construct_from(json.loads(payload), stripe.api_key)

    event_type = event['type']

    if event_type == 'checkout.session.completed':
        session = event['data']['object']
        user_id = session.get('metadata', {}).get('user_id')
        customer_id = session.get('customer')

        if user_id:
            try:
                user = User.objects.get(pk=int(user_id))
                user.plan = User.PLAN_PREMIUM
                user.plan_expires = timezone.now() + timedelta(days=30)
                if customer_id:
                    user.stripe_customer_id = customer_id
                user.save(update_fields=['plan', 'plan_expires', 'stripe_customer_id'])
            except User.DoesNotExist:
                pass

    elif event_type == 'invoice.paid':
        # Recurring subscription payment
        invoice = event['data']['object']
        customer_id = invoice.get('customer')

        if customer_id:
            try:
                user = User.objects.get(stripe_customer_id=customer_id)
                user.plan = User.PLAN_PREMIUM
                user.plan_expires = timezone.now() + timedelta(days=30)
                user.save(update_fields=['plan', 'plan_expires'])
            except User.DoesNotExist:
                pass

    elif event_type in ('customer.subscription.deleted', 'customer.subscription.paused'):
        sub = event['data']['object']
        customer_id = sub.get('customer')

        if customer_id:
            try:
                user = User.objects.get(stripe_customer_id=customer_id)
                user.plan = User.PLAN_FREE
                user.plan_expires = None
                user.save(update_fields=['plan', 'plan_expires'])
            except User.DoesNotExist:
                pass

    return HttpResponse(status=200)
