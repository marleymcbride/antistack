'use client';

import React from 'react';

export default function EnvCheck() {
  const primary = process.env.NEXT_PUBLIC_N8N_PRIMARY_WEBHOOK;
  const fallback = process.env.NEXT_PUBLIC_N8N_FALLBACK_WEBHOOK;

  const expectedPrimary = 'https://n8n.marleymcbride.co/webhook/3x-energy-leads';
  const expectedFallback = 'https://n8n.marleymcbride.co/webhook/systeme-add-contact';

  const primaryCorrect = primary === expectedPrimary;
  const fallbackCorrect = fallback === expectedFallback;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Environment Variables Check</h1>

      <div className="space-y-4">
        <div className={`p-4 rounded-lg ${primaryCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
          <h3 className="font-bold mb-2">Primary Webhook:</h3>
          <p className="text-sm break-all">
            <strong>Current:</strong> {primary || 'NOT SET'}
          </p>
          <p className="text-sm break-all">
            <strong>Expected:</strong> {expectedPrimary}
          </p>
          <p className={`text-sm mt-2 ${primaryCorrect ? 'text-green-700' : 'text-red-700'}`}>
            {primaryCorrect ? '✅ CORRECT' : '❌ INCORRECT'}
          </p>
        </div>

        <div className={`p-4 rounded-lg ${fallbackCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
          <h3 className="font-bold mb-2">Fallback Webhook:</h3>
          <p className="text-sm break-all">
            <strong>Current:</strong> {fallback || 'NOT SET'}
          </p>
          <p className="text-sm break-all">
            <strong>Expected:</strong> {expectedFallback}
          </p>
          <p className={`text-sm mt-2 ${fallbackCorrect ? 'text-green-700' : 'text-red-700'}`}>
            {fallbackCorrect ? '✅ CORRECT' : '❌ INCORRECT'}
          </p>
        </div>

        <div className="p-4 bg-blue-100 rounded-lg">
          <h3 className="font-bold mb-2">Overall Status:</h3>
          {primaryCorrect && fallbackCorrect ? (
            <p className="text-green-700">🎉 Environment is correctly configured!</p>
          ) : (
            <div>
              <p className="text-red-700 mb-2">⚠️ Environment needs to be updated</p>
              <div className="bg-yellow-50 p-3 rounded border">
                <p className="text-sm font-medium mb-2">To fix this:</p>
                <ol className="text-sm space-y-1 pl-4">
                  <li>1. Run: <code className="bg-gray-200 px-1 rounded">node update-env.js</code></li>
                  <li>2. Or manually update your .env.local file</li>
                  <li>3. Restart your dev server</li>
                </ol>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
