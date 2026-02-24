// N8N Webhook Client - Bulletproof dual-endpoint integration
// Built for enterprise-level reliability with zero tolerance for failures

export interface WebhookPayload {
  email: string;
  firstName: string;
  source: string;
}

export interface WebhookResponse {
  success: boolean;
  message: string;
  email?: string;
  timestamp?: string;
  error?: string;
}

export interface WebhookError extends Error {
  webhookError?: boolean;
  errorType?: string;
  endpoint?: string;
}

// N8N Webhook endpoints from environment variables
const PRIMARY_ENDPOINT = process.env.NEXT_PUBLIC_N8N_PRIMARY_WEBHOOK;
const FALLBACK_ENDPOINT = process.env.NEXT_PUBLIC_N8N_FALLBACK_WEBHOOK;

/**
 * Submit to N8N webhook with dual-endpoint fallback system
 * Enterprise-grade reliability with professional error handling
 */
export async function submitToN8nWebhook(
  email: string,
  firstName: string = '',
  source: string
): Promise<WebhookResponse> {
  // Debug environment variables
  console.log('🔍 Environment Debug:', {
    PRIMARY_ENDPOINT,
    FALLBACK_ENDPOINT,
    env_PRIMARY: process.env.NEXT_PUBLIC_N8N_PRIMARY_WEBHOOK,
    env_FALLBACK: process.env.NEXT_PUBLIC_N8N_FALLBACK_WEBHOOK
  });

  // Validate inputs
  if (!email || !source) {
    throw new Error('Email and source are required');
  }

  // Validate email format
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (!emailRegex.test(email)) {
    throw new Error('Please enter a valid email address');
  }

  // Validate environment variables with detailed error
  if (!PRIMARY_ENDPOINT || !FALLBACK_ENDPOINT) {
    const errorMsg = `N8N webhook endpoints not configured. PRIMARY: ${PRIMARY_ENDPOINT || 'undefined'}, FALLBACK: ${FALLBACK_ENDPOINT || 'undefined'}`;
    console.error('❌ Environment Error:', errorMsg);
    throw new Error(errorMsg);
  }

  const payload: WebhookPayload = {
    email,
    firstName,
    source
  };

  // Try primary endpoint first
  try {
    console.log('🎯 Trying PRIMARY endpoint...');
    const response = await submitToN8nWebhookDirect(PRIMARY_ENDPOINT, payload);
    console.log('🎉 PRIMARY endpoint SUCCESS:', response);
    return response;
  } catch (primaryError) {
    console.warn('❌ PRIMARY endpoint failed:', primaryError);

    // Try fallback endpoint
    try {
      console.log('🎯 Trying FALLBACK endpoint...');
      const response = await submitToN8nWebhookDirect(FALLBACK_ENDPOINT, payload);
      console.log('🎉 FALLBACK endpoint SUCCESS:', response);
      return response;
    } catch (fallbackError) {
      console.error('❌ FALLBACK endpoint also failed:', fallbackError);
      console.error('❌ BOTH ENDPOINTS FAILED - Summary:', {
        primary: {
          endpoint: PRIMARY_ENDPOINT,
          error: primaryError instanceof Error ? primaryError.message : String(primaryError)
        },
        fallback: {
          endpoint: FALLBACK_ENDPOINT,
          error: fallbackError instanceof Error ? fallbackError.message : String(fallbackError)
        }
      });

      // Create comprehensive error for user
      const webhookError = new Error('Service temporarily unavailable. Please try again in a moment.') as WebhookError;
      webhookError.webhookError = true;
      webhookError.errorType = 'ALL_ENDPOINTS_FAILED';
      throw webhookError;
    }
  }
}

/**
 * Direct submission to a specific N8N webhook endpoint
 * Handles response parsing and error mapping
 */
async function submitToN8nWebhookDirect(
  endpoint: string,
  payload: WebhookPayload
): Promise<WebhookResponse> {
  console.log('🔄 Submitting to N8N webhook:', endpoint, payload);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('📡 N8N response status:', response.status, response.statusText);
    console.log('📡 N8N response headers:', Object.fromEntries(response.headers.entries()));

    // Handle non-200 responses
    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

      // Try to get error details from response
      try {
        const errorData = await response.text();
        console.log('❌ N8N error response body:', errorData);

        // Try to parse as JSON first
        try {
          const errorJson = JSON.parse(errorData);
          console.log('❌ N8N error JSON:', errorJson);
          if (errorJson.message) {
            errorMessage = errorJson.message;
          } else if (errorJson.error) {
            errorMessage = errorJson.error;
          }
        } catch (jsonError) {
          console.log('❌ Error response not JSON, using text:', errorData);
          // If not JSON, use the text response
          if (errorData.length > 0 && errorData.length < 200) {
            errorMessage = errorData;
          }
        }
      } catch (textError) {
        // Fallback to status text if we can't read response
        console.log('❌ Could not read error response:', textError);
      }

      const detailedError = new Error(`${endpoint} failed: ${errorMessage}`);
      console.log('❌ Throwing detailed error:', detailedError.message);
      throw detailedError;
    }

    // Parse successful response
    let result: WebhookResponse;
    try {
      const responseText = await response.text();
      console.log('✅ N8N success response text:', responseText);
      result = JSON.parse(responseText);
      console.log('✅ N8N success response parsed:', result);
    } catch (jsonError) {
      console.error('❌ Failed to parse N8N response as JSON:', jsonError);
      throw new Error('Invalid response format from webhook');
    }

    // Check webhook success field (N8N specific)
    if (result.success === false) {
      let userMessage = 'Something went wrong. Please try again.';

      // Map N8N error responses to user-friendly messages
      if (result.error === 'Invalid Email') {
        userMessage = 'Please enter a valid email address';
      } else if (result.error === 'Invalid data format') {
        userMessage = 'Please provide valid email and firstName fields';
      } else if (result.error === 'API Error') {
        userMessage = 'Failed to add contact. Please try again later.';
      } else if (result.message) {
        userMessage = result.message;
      }

      // Create structured error
      const webhookError = new Error(userMessage) as WebhookError;
      webhookError.webhookError = true;
      webhookError.errorType = result.error;
      webhookError.endpoint = endpoint;
      throw webhookError;
    }

    // Handle case where success field is missing (assume success if no error)
    if (result.success === undefined) {
      result.success = true;
      result.message = result.message || 'Successfully submitted';
    }

    console.log('🎉 N8N webhook submission successful:', result);
    return result;

  } catch (error) {
    console.error('❌ N8N webhook error:', error);

    // Handle network errors
    if (error instanceof Error && (error.message.includes('fetch') || error.message.includes('Failed to fetch'))) {
      const networkError = new Error('Connection failed. Please check your internet and try again.') as WebhookError;
      networkError.webhookError = true;
      networkError.errorType = 'NETWORK_ERROR';
      networkError.endpoint = endpoint;
      throw networkError;
    }

    // Re-throw webhook errors as-is
    if ((error as WebhookError).webhookError) {
      throw error;
    }

    // Handle unexpected errors
    const unexpectedError = new Error(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.') as WebhookError;
    unexpectedError.webhookError = true;
    unexpectedError.errorType = 'UNEXPECTED_ERROR';
    unexpectedError.endpoint = endpoint;
    throw unexpectedError;
  }
}

/**
 * Utility to check if an error is a webhook error
 */
export function isWebhookError(error: any): error is WebhookError {
  return error && error.webhookError === true;
}

/**
 * Get user-friendly error message from webhook error
 */
export function getWebhookErrorMessage(error: WebhookError): string {
  if (isWebhookError(error)) {
    return error.message;
  }
  return 'An error occurred. Please try again later.';
}

/**
 * Fire-and-forget webhook for 3weeks lead tracking
 * Sends lead data to limitless-life.co API without blocking the user experience
 * @param email - User's email address
 * @param source - Lead source: '3weeks-email-capture' or 'work-with-me-3weeks'
 */
export function fire3weeksLeadWebhook(email: string, source: '3weeks-email-capture' | 'work-with-me-3weeks'): void {
  const payload = {
    email,
    source,
    timestamp: new Date().toISOString()
  };

  // Fire and forget - don't await, don't block
  fetch('https://limitless-life.co/api/webhooks/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).catch(err => {
    // Silently fail - don't break user experience
    console.error('Lead tracking webhook failed:', err);
  });
}

/**
 * Convenience function for email capture webhook
 * @deprecated Use fire3weeksLeadWebhook(email, '3weeks-email-capture') instead
 */
export function fire3weeksEmailCaptureWebhook(email: string): void {
  fire3weeksLeadWebhook(email, '3weeks-email-capture');
}

/**
 * Convenience function for Work With Me webhook (awaits completion)
 * Use this when you need to ensure the webhook completes before proceeding
 * @deprecated Use fire3weeksLeadWebhook(email, 'work-with-me-3weeks') for fire-and-forget
 */
export async function fireWorkWithMeWebhook(email: string): Promise<void> {
  const payload = {
    email,
    source: 'work-with-me-3weeks' as const,
    timestamp: new Date().toISOString()
  };

  // Send webhook and wait for response
  try {
    const response = await fetch('https://limitless-life.co/api/webhooks/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.error('Work With Me webhook failed:', response.status, response.statusText);
    }
  } catch (err) {
    // Log but don't throw - we still want to open the page
    console.error('Work With Me webhook error:', err);
  }
}
