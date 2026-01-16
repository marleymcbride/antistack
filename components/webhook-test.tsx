'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { submitToN8nWebhook } from '@/lib/n8n-webhook-client';

export default function WebhookTest() {
  const [email, setEmail] = useState('test@example.com');
  const [source, setSource] = useState('test-source');
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const testWebhook = async () => {
    setIsLoading(true);
    setResult('Testing webhook...');

    try {
      const response = await submitToN8nWebhook(email, '', source);
      setResult(`✅ SUCCESS: ${JSON.stringify(response, null, 2)}`);
    } catch (error) {
      setResult(`❌ ERROR: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">N8N Webhook Test</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Test Email:</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="test@example.com"
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Source:</label>
          <Input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="test-source"
            className="w-full"
          />
        </div>

        <Button
          onClick={testWebhook}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Testing...' : 'Test N8N Webhook'}
        </Button>

        {result && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-medium mb-2">Result:</h3>
            <pre className="whitespace-pre-wrap text-sm">{result}</pre>
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium mb-2">Environment Variables:</h3>
          <p className="text-sm">
            <strong>Primary:</strong> {process.env.NEXT_PUBLIC_N8N_PRIMARY_WEBHOOK || 'NOT SET'}
          </p>
          <p className="text-sm">
            <strong>Fallback:</strong> {process.env.NEXT_PUBLIC_N8N_FALLBACK_WEBHOOK || 'NOT SET'}
          </p>

          <div className="mt-4 p-3 bg-yellow-100 rounded border">
            <h4 className="font-medium text-sm mb-2">Expected Configuration:</h4>
            <p className="text-xs text-gray-700">
              <strong>Primary:</strong> https://n8n.marleymcbride.co/webhook/3x-energy-leads
            </p>
            <p className="text-xs text-gray-700">
              <strong>Fallback:</strong> https://n8n.marleymcbride.co/webhook/systeme-add-contact
            </p>
            {process.env.NEXT_PUBLIC_N8N_PRIMARY_WEBHOOK !== 'https://n8n.marleymcbride.co/webhook/3x-energy-leads' && (
              <p className="text-red-600 text-xs mt-2">
                ⚠️ Primary endpoint mismatch! Update your .env.local file.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
