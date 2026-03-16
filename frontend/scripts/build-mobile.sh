#!/bin/bash
# Build for mobile (Capacitor)
# This creates a static export in the 'out' directory

echo "🔨 Building kurdi.ch for mobile..."

# Use standalone mode (not export) and copy to out/
npx next build
mkdir -p out

# Copy static files
cp -r public/* out/ 2>/dev/null

echo "✅ Build complete!"
echo ""
echo "Next steps:"
echo "  npx cap add ios       # Add iOS platform"
echo "  npx cap add android   # Add Android platform"
echo "  npx cap sync          # Sync web assets"
echo "  npx cap open ios      # Open in Xcode"
echo "  npx cap open android  # Open in Android Studio"
