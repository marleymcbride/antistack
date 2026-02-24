# Lead Tracking Webhooks Design

**Date:** 2026-02-24
**Project:** 3weeks.co Lead Tracking Integration
**Status:** Approved

## Overview

Add two supplementary "fire-and-forget" webhook POST calls to capture lead tracking data from 3weeks.co. The webhooks send data to n8n workflows, which store leads in a centralized Postgres database for real-time visibility in the Admin Dashboard at limitless-life.co/admin.

**Key Principle:** These webhooks are ADDITIVE only. Existing email subscription functionality remains unchanged.

## Architecture

### Webhook Endpoints

| Trigger | Webhook URL | `source` value |
|---------|-------------|----------------|
| Email signup form | `https://n8n.marleymcbride.co/webhook/3weeks-email-capture` | `3weeks-email-capture` |
| Work With Me button | `https://n8n.marleymcbride.co/webhook/antistack-workwithme-leads` | `work-with-me-3weeks` |

### Payload Format

Both webhooks use identical payload structure:

```json
{
  "email": "user@example.com",
  "source": "3weeks-email-capture" | "work-with-me-3weeks",
  "timestamp": "2026-02-24T12:00:00.000Z"
}
```

## Components

### 1. Email Capture Webhook

**Function:** `fire3weeksEmailCaptureWebhook(email: string)`
**Location:** `lib/n8n-webhook-client.ts` (already implemented)
**Behavior:** Fire-and-forget POST to email capture endpoint
**Called from:** All email submission handlers after existing webhook succeeds

### 2. Work With Me Webhook

**Function:** `fireWorkWithMeWebhook(email: string)`
**Location:** `lib/n8n-webhook-client.ts` (to be added)
**Behavior:** Fire-and-forget POST to Work With Me endpoint
**Called from:** Button click handlers when user clicks "WORK WITH ME"

### Files to Modify

1. `lib/n8n-webhook-client.ts` - Add `fireWorkWithMeWebhook()` function
2. `components/email-cta.tsx` - Integrate both webhooks
3. `components/email-signup.tsx` - Integrate both webhooks
4. `components/work-with-me-modal.tsx` - Update Work With Me webhook URL

## Data Flow

### Email Signup Flow

```
User submits email form
  ↓
Existing webhook succeeds (submitToN8nWebhook)
  ↓
Fire fire3weeksEmailCaptureWebhook() [fire-and-forget]
  ↓
Continue with redirect to signup page
```

### Work With Me Flow (Scenario A - Email exists)

```
User clicks "WORK WITH ME" button (email already in form)
  ↓
Fire fireWorkWithMeWebhook() [fire-and-forget]
  ↓
Open limitless-life.co in new tab
```

### Work With Me Flow (Scenario B - No email)

```
User clicks "WORK WITH ME" button (no email)
  ↓
Show email capture modal
  ↓
User submits email in modal
  ↓
Fire fire3weeksEmailCaptureWebhook() [fire-and-forget]
  ↓
Fire fireWorkWithMeWebhook() [fire-and-forget]
  ↓
Open limitless-life.co in new tab
```

## Error Handling

**Fire-and-forget approach:**

- All webhook calls use `.catch()` to silently log errors
- No `await` - webhooks fire asynchronously without blocking user flow
- Errors logged to `console.error()` only - never shown to user
- User experience continues regardless of webhook success/failure

**Rationale:** The webhooks are for analytics/tracking purposes. Business continuity (completing the user's intended action) is more important than capturing every single lead event.

## Testing Plan

### Pre-deployment

1. Test webhooks with curl to verify endpoints return `{"success":true}`
2. Test locally: submit email → check Admin Dashboard for new lead
3. Test locally: click Work With Me → check Admin Dashboard filtered view

### Post-deployment

1. Verify production data flowing to Admin Dashboard
2. Monitor console for webhook errors (should be minimal)
3. Confirm existing email subscription flow still works

## Implementation Approach

**Hybrid approach:**
- Centralized helper functions in `lib/n8n-webhook-client.ts` for reusable webhooks
- Email capture webhook uses helper (fires from multiple components)
- Work With Me webhook uses helper (consistent pattern)
- Components import and call helpers as needed

This provides single source of truth for webhook URLs while maintaining clean integration points.
