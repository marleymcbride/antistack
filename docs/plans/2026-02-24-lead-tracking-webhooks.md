# Lead Tracking Webhooks Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add two supplementary fire-and-forget webhook POST calls to capture lead tracking data from 3weeks.co for the Admin Dashboard.

**Architecture:** Centralized helper functions in `lib/n8n-webhook-client.ts` provide single source of truth for webhook URLs. Components import and call these helpers after existing webhooks succeed. All webhook calls are fire-and-forget with silent error handling to never block user experience.

**Tech Stack:** Next.js 14, TypeScript, React Hook Form, fetch API

---

## Task 1: Add Work With Me Webhook Helper Function

**Files:**
- Modify: `lib/n8n-webhook-client.ts:250-271`

**Context:** The email capture helper already exists at lines 250-271. We need to add a similar helper for Work With Me leads.

**Step 1: Add fireWorkWithMeWebhook function**

Add this function immediately after `fire3weeksEmailCaptureWebhook()` (after line 271):

```typescript
/**
 * Fire-and-forget webhook for Work With Me leads
 * Sends lead tracking data to n8n without blocking the user experience
 * @param email - User's email address
 */
export function fireWorkWithMeWebhook(email: string): void {
  const payload = {
    email,
    source: 'work-with-me-3weeks',
    timestamp: new Date().toISOString()
  };

  // Fire and forget - don't await, don't block
  fetch('https://n8n.marleymcbride.co/webhook/antistack-workwithme-leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).catch(err => {
    // Silently fail - don't break user experience
    console.error('Work With Me webhook failed:', err);
  });
}
```

**Step 2: Verify TypeScript compiles**

Run: `npm run build` (or `npx tsc --noEmit` if available)
Expected: No TypeScript errors

**Step 3: Commit**

```bash
git add lib/n8n-webhook-client.ts
git commit -m "feat: add fireWorkWithMeWebhook helper function"
```

---

## Task 2: Integrate Email Capture Webhook in Email CTA

**Files:**
- Modify: `components/email-cta.tsx:85-100`

**Context:** After the existing `submitToN8nWebhook()` succeeds, fire the email capture webhook.

**Step 1: Import fire3weeksEmailCaptureWebhook**

Add to imports at top of file (around line 8):

```typescript
import { fire3weeksEmailCaptureWebhook } from '../lib/n8n-webhook-client';
```

**Step 2: Fire webhook after successful submission**

Replace lines 85-100 with:

```typescript
      await submitToN8nWebhook(
        data.email,
        '', // firstName - empty for this form
        'hero-section' // source tracking
      );

      console.log('🎉 EMAIL CTA - N8N webhook submission successful!');

      // Fire lead tracking webhook (fire-and-forget)
      fire3weeksEmailCaptureWebhook(data.email);

      console.log('🔄 EMAIL CTA - Redirecting to', redirectUrl);

      // Success - redirect to specified URL
      if (redirectUrl.startsWith('http')) {
        window.location.href = redirectUrl;
      } else {
        router.push(redirectUrl);
      }
      return;
```

**Step 3: Verify TypeScript compiles**

Run: `npm run build` (or `npx tsc --noEmit`)
Expected: No TypeScript errors

**Step 4: Commit**

```bash
git add components/email-cta.tsx
git commit -m "feat: integrate email capture webhook in email-cta component"
```

---

## Task 3: Update Work With Me Webhooks in Email CTA

**Files:**
- Modify: `components/email-cta.tsx:119-165`

**Context:** Update the `handleWorkWithMe` function to use the new helper function and update webhook URL from test to production.

**Step 1: Import fireWorkWithMeWebhook**

Add to the existing import statement (around line 8):

```typescript
import { fire3weeksEmailCaptureWebhook, fireWorkWithMeWebhook } from '../lib/n8n-webhook-client';
```

**Step 2: Replace handleWorkWithMe with new implementation**

Replace the entire `handleWorkWithMe` function (lines 119-165) with:

```typescript
  const handleWorkWithMe = async () => {
    // Get email from form using react-hook-form
    const emailValue = (getValues().email as string)?.trim();

    // Check if email exists and is valid
    if (emailValue && emailRegex.test(emailValue)) {
      // Email exists - submit directly
      // Fire Work With Me webhook (fire-and-forget)
      fireWorkWithMeWebhook(emailValue);

      console.log('🎉 WORK WITH ME - Webhook fired, opening limitless-life.co in new tab');
      console.log('🔄 WORK WITH ME - Opening limitless-life.co in new tab');

      // Open limitless-life.co in new tab
      window.open('https://limitless-life.co', '_blank');
    } else {
      // No email - open modal
      setIsWorkWithMeModalOpen(true);
    }
  };
```

**Step 3: Verify TypeScript compiles**

Run: `npm run build` (or `npx tsc --noEmit`)
Expected: No TypeScript errors

**Step 4: Commit**

```bash
git add components/email-cta.tsx
git commit -m "feat: update Work With Me webhook to use production endpoint"
```

---

## Task 4: Integrate Email Capture Webhook in Email Signup

**Files:**
- Modify: `components/email-signup.tsx:1-8` and `components/email-signup.tsx:90-105`

**Context:** Same pattern as Task 2 - add import and fire webhook after existing submission succeeds.

**Step 1: Import fire3weeksEmailCaptureWebhook**

Add to imports at top of file (around line 8):

```typescript
import { fire3weeksEmailCaptureWebhook } from '../lib/n8n-webhook-client';
```

**Step 2: Fire webhook after successful submission**

Replace lines 90-105 with:

```typescript
      await submitToN8nWebhook(
        data.email,
        "", // firstName - empty for this form
        "anti-stack-section", // source tracking
      );

      console.log("🎉 EMAIL SIGNUP - N8N webhook submission successful!");

      // Fire lead tracking webhook (fire-and-forget)
      fire3weeksEmailCaptureWebhook(data.email);

      console.log("🔄 EMAIL SIGNUP - Redirecting to", redirectUrl);

      // Success - redirect to specified URL
      if (redirectUrl.startsWith("http")) {
        window.location.href = redirectUrl;
      } else {
        router.push(redirectUrl);
      }
      return;
```

**Step 3: Verify TypeScript compiles**

Run: `npm run build` (or `npx tsc --noEmit`)
Expected: No TypeScript errors

**Step 4: Commit**

```bash
git add components/email-signup.tsx
git commit -m "feat: integrate email capture webhook in email-signup component"
```

---

## Task 5: Update Work With Me Webhooks in Email Signup

**Files:**
- Modify: `components/email-signup.tsx:131-177`

**Context:** Update `handleWorkWithMe` to use the helper function and update from test to production URL.

**Step 1: Import fireWorkWithMeWebhook**

Update the import statement (around line 8):

```typescript
import { fire3weeksEmailCaptureWebhook, fireWorkWithMeWebhook } from '../lib/n8n-webhook-client';
```

**Step 2: Replace handleWorkWithMe with new implementation**

Replace the entire `handleWorkWithMe` function (lines 131-177) with:

```typescript
  const handleWorkWithMe = async () => {
    // Get email from form using react-hook-form
    const emailValue = (getValues().email as string)?.trim();

    // Check if email exists and is valid
    if (emailValue && emailRegex.test(emailValue)) {
      // Email exists - submit directly
      // Fire Work With Me webhook (fire-and-forget)
      fireWorkWithMeWebhook(emailValue);

      console.log('🎉 WORK WITH ME - Webhook fired, opening limitless-life.co in new tab');
      console.log('🔄 WORK WITH ME - Opening limitless-life.co in new tab');

      // Open limitless-life.co in new tab
      window.open('https://limitless-life.co', '_blank');
    } else {
      // No email - open modal
      setIsWorkWithMeModalOpen(true);
    }
  };
```

**Step 3: Verify TypeScript compiles**

Run: `npm run build` (or `npx tsc --noEmit`)
Expected: No TypeScript errors

**Step 4: Commit**

```bash
git add components/email-signup.tsx
git commit -m "feat: update Work With Me webhook to use production endpoint"
```

---

## Task 6: Update Work With Me Modal Webhooks

**Files:**
- Modify: `components/work-with-me-modal.tsx:75-125`

**Context:** The modal submits email then opens limitless-life.co. Need to fire both webhooks (email capture + work with me) and update to production URL.

**Step 1: Import helper functions**

Add to imports at top of file (around line 7):

```typescript
import { fire3weeksEmailCaptureWebhook, fireWorkWithMeWebhook } from '../lib/n8n-webhook-client';
```

**Step 2: Replace onSubmit to use new webhooks**

Replace the entire `onSubmit` function (lines 75-125) with:

```typescript
  const onSubmit = async (data: FormData) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('📧 WORK WITH ME MODAL - Form submission started:', data);
    }

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      // Fire both webhooks (fire-and-forget)
      fire3weeksEmailCaptureWebhook(data.email);
      fireWorkWithMeWebhook(data.email);

      if (process.env.NODE_ENV === 'development') {
        console.log('🎉 WORK WITH ME MODAL - Webhooks fired successfully!');
        console.log('🔄 WORK WITH ME MODAL - Opening limitless-life.co in new tab');
      }

      // Open limitless-life.co in new tab
      window.open('https://limitless-life.co', '_blank');

      // Close modal
      onClose();
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('❌ WORK WITH ME MODAL - Error:', error);
      }
      setSubmitResult({
        success: false,
        message: 'There was an error. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
```

**Step 3: Verify TypeScript compiles**

Run: `npm run build` (or `npx tsc --noEmit`)
Expected: No TypeScript errors

**Step 4: Commit**

```bash
git add components/work-with-me-modal.tsx
git commit -m "feat: integrate tracking webhooks in work-with-me-modal"
```

---

## Task 7: Test Webhooks with curl

**Files:** None (testing)

**Context:** Verify webhook endpoints are accessible and return expected responses before deploying.

**Step 1: Test email capture webhook**

Run:
```bash
curl -X POST https://n8n.marleymcbride.co/webhook/3weeks-email-capture \
  -H 'Content-Type: application/json' \
  -d '{"email":"test@example.com","source":"3weeks-email-capture","timestamp":"2026-02-24T12:00:00.000Z"}'
```

Expected: `{"success":true,"message":"Lead captured"}` or similar success response

**Step 2: Test Work With Me webhook**

Run:
```bash
curl -X POST https://n8n.marleymcbride.co/webhook/antistack-workwithme-leads \
  -H 'Content-Type: application/json' \
  -d '{"email":"test@example.com","source":"work-with-me-3weeks","timestamp":"2026-02-24T12:00:00.000Z"}'
```

Expected: `{"success":true,"message":"Lead captured"}` or similar success response

**Note:** If webhooks return 404, the n8n workflows need to be activated. Contact the n8n specialist to activate the workflows before proceeding with deployment.

**Step 3: Document test results**

Create a comment in your PR or commit noting webhook test results.

**Step 4: Commit**

```bash
git commit --allow-empty -m "test: verify webhook endpoints are accessible"
```

---

## Task 8: Final Verification and Build

**Files:** Multiple (verification)

**Context:** Ensure all changes compile and the application builds successfully.

**Step 1: Run TypeScript compiler**

Run: `npm run build` (or `npx tsc --noEmit`)
Expected: No TypeScript errors

**Step 2: Check for console errors**

Start dev server: `npm run dev`
Expected: No runtime errors on page load

**Step 3: Verify imports are correct**

Check that all helper functions are properly imported in:
- `components/email-cta.tsx`
- `components/email-signup.tsx`
- `components/work-with-me-modal.tsx`

**Step 4: Final commit**

```bash
git add -A
git commit -m "chore: final build verification successful"
```

---

## Post-Deployment Testing

After deploying to production, perform these manual tests:

### Test 1: Email Signup Flow

1. Go to 3weeks.co
2. Submit a test email in the signup form
3. Check: `https://limitless-life.co/admin`
4. Expected: New row appears with `source_site = '3weeks.co'`, `lead_action = 'email-signup'`, `lead_temperature = 'warm'`

### Test 2: Work With Me Flow (with email)

1. Go to 3weeks.co
2. Enter email in form (but don't submit)
3. Click "WORK WITH ME" button
4. Check: `https://limitless-life.co/admin/leads/work-with-me`
5. Expected: Lead appears in filtered view, `lead_action = 'work-with-me'`, `lead_temperature = 'hot'`

### Test 3: Work With Me Flow (without email)

1. Go to 3weeks.co
2. Click "WORK WITH ME" button (no email in form)
3. Modal should open
4. Submit email in modal
5. Check: `https://limitless-life.co/admin/leads/work-with-me`
6. Expected: Lead appears with both email signup and work-with-me actions

---

## Design Document Reference

For complete architecture and data flow documentation, see: `docs/plans/2026-02-24-lead-tracking-webhooks-design.md`
