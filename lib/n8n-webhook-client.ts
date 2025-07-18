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
  // Validate inputs
  if (!email || !source) {
    throw new Error('Email and source are required');
  }

  // Validate email format
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (!emailRegex.test(email)) {
    throw new Error('Please enter a valid email address');
  }

  // Validate environment variables
  if (!PRIMARY_ENDPOINT || !FALLBACK_ENDPOINT) {
    throw new Error('N8N webhook endpoints not configured');
  }

  const payload: WebhookPayload = {
    email,
    firstName,
    source
  };

  // Try primary endpoint first
  try {
    const response = await submitToN8nWebhookDirect(PRIMARY_ENDPOINT, payload);
    return response;
  } catch (primaryError) {
    console.warn('Primary N8N endpoint failed, trying fallback:', primaryError);

    // Try fallback endpoint
    try {
      const response = await submitToN8nWebhookDirect(FALLBACK_ENDPOINT, payload);
      return response;
    } catch (fallbackError) {
      console.error('Both N8N endpoints failed:', fallbackError);

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
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // Always parse JSON response regardless of HTTP status
    let result: WebhookResponse;
    try {
      result = await response.json();
    } catch (jsonError) {
      throw new Error('Invalid response format from webhook');
    }

    // Check webhook success field first (N8N specific)
    if (!result.success) {
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

    // Success - return the response
    return result;

  } catch (error) {
    // Handle network errors
    if (error instanceof Error && error.message.includes('fetch')) {
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
    const unexpectedError = new Error('An unexpected error occurred. Please try again.') as WebhookError;
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
