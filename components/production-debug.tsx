'use client';

import React from 'react';

export default function ProductionDebug() {
  const [debugInfo, setDebugInfo] = React.useState<any>(null);

  React.useEffect(() => {
    // Gather all debug information
    const info = {
      // Environment variables
      env: {
        primary: process.env.NEXT_PUBLIC_N8N_PRIMARY_WEBHOOK,
        fallback: process.env.NEXT_PUBLIC_N8N_FALLBACK_WEBHOOK,
        nodeEnv: process.env.NODE_ENV,
      },

      // Browser info
      browser: {
        userAgent: navigator.userAgent,
        cookieEnabled: navigator.cookieEnabled,
        onLine: navigator.onLine,
        language: navigator.language,
      },

      // Current page info
      page: {
        url: window.location.href,
        origin: window.location.origin,
        hostname: window.location.hostname,
        protocol: window.location.protocol,
      },

      // JavaScript capabilities
      js: {
        fetch: typeof fetch !== 'undefined',
        localStorage: typeof localStorage !== 'undefined',
        console: typeof console !== 'undefined',
        wistia: typeof window.Wistia !== 'undefined',
      },

      // Vercel specific
      vercel: {
        url: process.env.VERCEL_URL,
        env: process.env.VERCEL_ENV,
        region: process.env.VERCEL_REGION,
      }
    };

    setDebugInfo(info);
    console.log('🔍 PRODUCTION DEBUG INFO:', info);
  }, []);

  const testN8nEndpoints = async () => {
    const primary = process.env.NEXT_PUBLIC_N8N_PRIMARY_WEBHOOK;
    const fallback = process.env.NEXT_PUBLIC_N8N_FALLBACK_WEBHOOK;

    console.log('🧪 Testing N8N endpoints...');
    console.log('Primary:', primary);
    console.log('Fallback:', fallback);

    if (!primary || !fallback) {
      alert('❌ Environment variables not set in Vercel!\n\nPrimary: ' + (primary || 'undefined') + '\nFallback: ' + (fallback || 'undefined'));
      return;
    }

    try {
      const { submitToN8nWebhook } = await import('../lib/n8n-webhook-client');
      const result = await submitToN8nWebhook('test@production.com', 'Production', 'production-debug');
      alert('✅ N8N Test Successful:\n' + JSON.stringify(result, null, 2));
    } catch (error) {
      alert('❌ N8N Test Failed:\n' + (error instanceof Error ? error.message : String(error)));
    }
  };

  const testVideoPopup = () => {
    console.log('🎬 Testing video popup functionality...');

    // Check if video overlay components exist
    const overlay = document.querySelector('[data-video-container]');
    console.log('Video container found:', !!overlay);

    // Check if Wistia is loaded
    console.log('Wistia available:', typeof window.Wistia !== 'undefined');

    // Try to trigger popup manually
    const event = new CustomEvent('test-popup', { detail: { manual: true } });
    window.dispatchEvent(event);

    alert('Check console for video popup debug info');
  };

  if (!debugInfo) {
    return <div className="p-8">Loading debug info...</div>;
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🔍 Production Debug Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <button
          onClick={testN8nEndpoints}
          className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          🧪 Test N8N Endpoints
        </button>

        <button
          onClick={testVideoPopup}
          className="p-4 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          🎬 Test Video Popup
        </button>
      </div>

      <div className="space-y-6">
        {/* Environment Variables */}
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="font-bold mb-2">Environment Variables:</h3>
          <div className={`text-sm ${debugInfo.env.primary && debugInfo.env.fallback ? 'text-green-700' : 'text-red-700'}`}>
            <p><strong>PRIMARY:</strong> {debugInfo.env.primary || '❌ NOT SET'}</p>
            <p><strong>FALLBACK:</strong> {debugInfo.env.fallback || '❌ NOT SET'}</p>
            <p><strong>NODE_ENV:</strong> {debugInfo.env.nodeEnv}</p>
          </div>
        </div>

        {/* Vercel Info */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="font-bold mb-2">Vercel Deployment Info:</h3>
          <div className="text-sm">
            <p><strong>URL:</strong> {debugInfo.vercel.url || 'Not available'}</p>
            <p><strong>Environment:</strong> {debugInfo.vercel.env || 'Not available'}</p>
            <p><strong>Region:</strong> {debugInfo.vercel.region || 'Not available'}</p>
          </div>
        </div>

        {/* Page Info */}
        <div className="p-4 bg-yellow-50 rounded-lg">
          <h3 className="font-bold mb-2">Page Info:</h3>
          <div className="text-sm">
            <p><strong>URL:</strong> {debugInfo.page.url}</p>
            <p><strong>Origin:</strong> {debugInfo.page.origin}</p>
            <p><strong>Protocol:</strong> {debugInfo.page.protocol}</p>
          </div>
        </div>

        {/* JavaScript Capabilities */}
        <div className="p-4 bg-green-50 rounded-lg">
          <h3 className="font-bold mb-2">JavaScript Capabilities:</h3>
          <div className="text-sm">
            <p><strong>Fetch API:</strong> {debugInfo.js.fetch ? '✅' : '❌'}</p>
            <p><strong>LocalStorage:</strong> {debugInfo.js.localStorage ? '✅' : '❌'}</p>
            <p><strong>Console:</strong> {debugInfo.js.console ? '✅' : '❌'}</p>
            <p><strong>Wistia:</strong> {debugInfo.js.wistia ? '✅' : '❌'}</p>
          </div>
        </div>

        {/* Raw Debug Data */}
        <details className="p-4 bg-gray-50 rounded-lg">
          <summary className="font-bold cursor-pointer">Raw Debug Data (Click to expand)</summary>
          <pre className="mt-2 text-xs overflow-auto max-h-96">
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
}
