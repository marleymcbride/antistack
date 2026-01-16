'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function N8nDirectTest() {
  const [results, setResults] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const testEndpoint = async (endpoint: string, payload: any, testName: string) => {
    try {
      console.log(`🧪 Testing ${testName}:`, endpoint, payload);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log(`📡 ${testName} Response Status:`, response.status, response.statusText);
      console.log(`📡 ${testName} Response Headers:`, Object.fromEntries(response.headers.entries()));

      const responseText = await response.text();
      console.log(`📡 ${testName} Response Body:`, responseText);

      let parsedResponse;
      try {
        parsedResponse = JSON.parse(responseText);
      } catch {
        parsedResponse = responseText;
      }

      return {
        testName,
        endpoint,
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        body: parsedResponse,
        ok: response.ok
      };
    } catch (error) {
      console.error(`❌ ${testName} Error:`, error);
      return {
        testName,
        endpoint,
        error: error instanceof Error ? error.message : String(error),
        ok: false
      };
    }
  };

  const runAllTests = async () => {
    setIsLoading(true);
    setResults('Running comprehensive N8N endpoint tests...\n\n');

    const primary = 'https://n8n.marleymcbride.co/webhook/3x-energy-leads';
    const fallback = 'https://n8n.marleymcbride.co/webhook/systeme-add-contact';

    const testPayload = {
      email: 'test@example.com',
      firstName: 'Test',
      source: 'direct-test'
    };

    const alternativePayloads = [
      // Test different payload structures that N8N might expect
      testPayload,
      { email: 'test@example.com', name: 'Test', source: 'direct-test' },
      { email: 'test@example.com' },
      { contact: { email: 'test@example.com', firstName: 'Test' }, source: 'direct-test' }
    ];

    let allResults = [];

    // Test primary endpoint with different payloads
    for (let i = 0; i < alternativePayloads.length; i++) {
      const result = await testEndpoint(primary, alternativePayloads[i], `Primary-Payload${i + 1}`);
      allResults.push(result);
    }

    // Test fallback endpoint with different payloads
    for (let i = 0; i < alternativePayloads.length; i++) {
      const result = await testEndpoint(fallback, alternativePayloads[i], `Fallback-Payload${i + 1}`);
      allResults.push(result);
    }

    // Test with GET requests to see if endpoints are alive
    try {
      const primaryGet = await fetch(primary, { method: 'GET' });
      allResults.push({
        testName: 'Primary-GET',
        endpoint: primary,
        status: primaryGet.status,
        statusText: primaryGet.statusText,
        body: await primaryGet.text(),
        ok: primaryGet.ok
      });
    } catch (error) {
      allResults.push({
        testName: 'Primary-GET',
        endpoint: primary,
        error: error instanceof Error ? error.message : String(error),
        ok: false
      });
    }

    try {
      const fallbackGet = await fetch(fallback, { method: 'GET' });
      allResults.push({
        testName: 'Fallback-GET',
        endpoint: fallback,
        status: fallbackGet.status,
        statusText: fallbackGet.statusText,
        body: await fallbackGet.text(),
        ok: fallbackGet.ok
      });
    } catch (error) {
      allResults.push({
        testName: 'Fallback-GET',
        endpoint: fallback,
        error: error instanceof Error ? error.message : String(error),
        ok: false
      });
    }

    setResults(JSON.stringify(allResults, null, 2));
    setIsLoading(false);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Direct N8N Endpoint Testing</h1>

      <div className="mb-6">
        <Button
          onClick={runAllTests}
          disabled={isLoading}
          className="mb-4"
        >
          {isLoading ? 'Testing All Endpoints...' : 'Run Comprehensive N8N Tests'}
        </Button>
      </div>

      {results && (
        <div className="mt-6">
          <h3 className="font-medium mb-4">Detailed Test Results:</h3>
          <pre className="whitespace-pre-wrap text-sm bg-gray-100 p-4 rounded-lg overflow-auto max-h-96">
            {results}
          </pre>
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-bold mb-2">This test will:</h3>
        <ul className="text-sm space-y-1">
          <li>• Test both N8N endpoints with multiple payload formats</li>
          <li>• Check if endpoints are alive with GET requests</li>
          <li>• Show exact HTTP status codes and response bodies</li>
          <li>• Help identify if the issue is payload format or endpoint availability</li>
        </ul>
      </div>
    </div>
  );
}
