import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ch.kurdi.app',
  appName: 'kurdi.ch',
  webDir: 'public',
  server: {
    // App loads from the live website — no static export needed
    url: 'https://kurdi.ch',
    androidScheme: 'https',
  },
  ios: {
    contentInset: 'automatic',
  },
};

export default config;
