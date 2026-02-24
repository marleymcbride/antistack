# Work With Me Modal Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create a simple email collection modal that opens when users click "WORK WITH ME" button, submitting to N8N webhook and redirecting to limitless-life.co in a new tab.

**Architecture:** Create a new modal component adapted from limitless-life's email-popup.tsx, simplified to single-step email collection. Integrate into email-cta.tsx and email-signup.tsx by checking form state before showing modal.

**Tech Stack:** React, React Hook Form, Tailwind CSS, createPortal for modal rendering

---

## Task 1: Create WorkWithMeModal Component

**Files:**
- Create: `components/work-with-me-modal.tsx`

**Step 1: Create the modal component file**

Create `components/work-with-me-modal.tsx` with:

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createPortal } from 'react-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

interface WorkWithMeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WorkWithMeModal({ isOpen, onClose }: WorkWithMeModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [mounted, setMounted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Block scrolling when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Reset form when popup opens
  useEffect(() => {
    if (isOpen) {
      reset();
      setSubmitResult(null);
    }
  }, [isOpen, reset]);

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const onSubmit = async (data: any) => {
    console.log('📧 WORK WITH ME MODAL - Form submission started:', data);

    // Validate email manually
    if (!emailRegex.test(data.email)) {
      console.log('❌ WORK WITH ME MODAL - Email validation failed:', data.email);
      setSubmitResult({
        success: false,
        message: 'Please enter a valid email address',
      });
      return;
    }

    console.log('✅ WORK WITH ME MODAL - Email validation passed');
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      // Submit to N8N webhook for work-with-me leads
      const response = await fetch(
        'https://n8n.marleymcbride.co/webhook-test/antistack-workwithme-leads',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: data.email,
            source: 'work-with-me-modal',
            timestamp: new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to submit email');
      }

      console.log('🎉 WORK WITH ME MODAL - N8N webhook submission successful!');
      console.log('🔄 WORK WITH ME MODAL - Opening limitless-life.co in new tab');

      // Open limitless-life.co in new tab
      window.open('https://limitless-life.co', '_blank');

      // Close modal
      onClose();
    } catch (error) {
      console.error('❌ WORK WITH ME MODAL - N8N webhook submission failed:', error);
      setSubmitResult({
        success: false,
        message: 'There was an error. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !mounted) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-zinc-800 rounded-xl shadow-2xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-zinc-400 hover:text-zinc-200 transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Work With Me</h2>
          <p className="text-zinc-400 text-sm">Enter your email to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {submitResult && (
            <div
              className={`p-3 rounded text-sm ${
                submitResult.success
                  ? 'bg-green-900/30 text-green-200'
                  : 'bg-red-900/30 text-red-200'
              }`}
            >
              {submitResult.message}
            </div>
          )}

          <div>
            <Input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: emailRegex,
                  message: 'Please enter a valid email address',
                },
              })}
              type="email"
              placeholder="Your Email Address..."
              className={`w-full h-12 bg-zinc-700 border-zinc-600 text-white placeholder-zinc-400 ${
                errors.email ? 'border-red-500' : ''
              }`}
              autoFocus
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-400">
                {errors.email.message as string}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-base font-bold text-white bg-red-700 rounded hover:bg-red-800"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Continue'}
          </Button>
        </form>

        {/* Trust indicator */}
        <div className="text-center mt-6 pt-4 border-t border-zinc-700">
          <p className="text-xs text-zinc-500 uppercase tracking-wide">
            🔒 Secure
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
```

**Step 2: Verify the file was created**

Run: `ls -la components/work-with-me-modal.tsx`
Expected: File exists

**Step 3: Commit**

```bash
git add components/work-with-me-modal.tsx
git commit -m "feat: add WorkWithMeModal component"
```

---

## Task 2: Integrate Modal into email-cta.tsx

**Files:**
- Modify: `components/email-cta.tsx:116-260`

**Step 1: Read the current email-cta.tsx to understand structure**

Run: `cat components/email-cta.tsx | grep -n "handleWorkWithMe\|WORK WITH ME"`
Expected: See current handleWorkWithMe function and button locations

**Step 2: Add modal state and import at top of file**

Add import after line 7:
```typescript
import WorkWithMeModal from './work-with-me-modal';
```

Add state after line 24 (inside component):
```typescript
const [isWorkWithMeModalOpen, setIsWorkWithMeModalOpen] = useState(false);
```

**Step 3: Replace handleWorkWithMe function (lines 116-157)**

Replace the entire function with:
```typescript
const handleWorkWithMe = async () => {
  // Get email from form using react-hook-form
  const emailValue = (getValues().email as string)?.trim();

  // Check if email exists and is valid
  if (emailValue && emailRegex.test(emailValue)) {
    // Email exists - submit directly
    setIsSubmitting(true);

    try {
      // Submit to N8N webhook for work-with-me leads
      const response = await fetch('https://n8n.marleymcbride.co/webhook-test/antistack-workwithme-leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailValue,
          source: 'work-with-me-leads',
          timestamp: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit email');
      }

      console.log('🎉 WORK WITH ME - N8N webhook submission successful!');
      console.log('🔄 WORK WITH ME - Opening limitless-life.co in new tab');

      // Open limitless-life.co in new tab
      window.open('https://limitless-life.co', '_blank');

    } catch (error) {
      console.error('❌ WORK WITH ME - N8N webhook submission failed:', error);
      alert('There was an error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  } else {
    // No email - open modal
    setIsWorkWithMeModalOpen(true);
  }
};
```

**Step 4: Add getValues destructuring to useForm hook**

Modify line 27-32 to destructure getValues:
```typescript
const {
  register,
  handleSubmit,
  formState: { errors },
  reset,
  getValues,
} = useForm();
```

**Step 5: Add modal component at end of return statement**

Before the closing `</>` of the component (before line 265), add:
```typescript
<WorkWithMeModal
  isOpen={isWorkWithMeModalOpen}
  onClose={() => setIsWorkWithMeModalOpen(false)}
/>
```

**Step 6: Verify changes**

Run: `grep -n "WorkWithMeModal\|isWorkWithMeModalOpen\|getValues" components/email-cta.tsx`
Expected: See all new additions

**Step 7: Test the build**

Run: `npm run build` (or `pnpm build` / `yarn build` depending on your package manager)
Expected: Build succeeds with no type errors

**Step 8: Commit**

```bash
git add components/email-cta.tsx
git commit -m "feat: integrate WorkWithMeModal into email-cta component"
```

---

## Task 3: Integrate Modal into email-signup.tsx

**Files:**
- Modify: `components/email-signup.tsx:128-173`

**Step 1: Add modal state and import at top of file**

Add import after line 7:
```typescript
import WorkWithMeModal from './work-with-me-modal';
```

Add state after line 24 (inside component):
```typescript
const [isWorkWithMeModalOpen, setIsWorkWithMeModalOpen] = useState(false);
```

**Step 2: Replace handleWorkWithMe function (lines 128-173)**

Replace the entire function with:
```typescript
const handleWorkWithMe = async () => {
  // Get email from form using react-hook-form
  const emailValue = (getValues().email as string)?.trim();

  // Check if email exists and is valid
  if (emailValue && emailRegex.test(emailValue)) {
    // Email exists - submit directly
    setIsSubmitting(true);

    try {
      // Submit to N8N webhook for work-with-me leads
      const response = await fetch('https://n8n.marleymcbride.co/webhook-test/antistack-workwithme-leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailValue,
          source: 'work-with-me-leads',
          timestamp: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit email');
      }

      console.log('🎉 WORK WITH ME - N8N webhook submission successful!');
      console.log('🔄 WORK WITH ME - Opening limitless-life.co in new tab');

      // Open limitless-life.co in new tab
      window.open('https://limitless-life.co', '_blank');

    } catch (error) {
      console.error('❌ WORK WITH ME - N8N webhook submission failed:', error);
      alert('There was an error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  } else {
    // No email - open modal
    setIsWorkWithMeModalOpen(true);
  }
};
```

**Step 3: Add getValues destructuring to useForm hook**

Modify line 27-32 to destructure getValues:
```typescript
const {
  register,
  handleSubmit,
  formState: { errors },
  reset,
  getValues,
} = useForm();
```

**Step 4: Add modal component at end of return statement**

Before the closing `</>` of the component (before line 429), add:
```typescript
<WorkWithMeModal
  isOpen={isWorkWithMeModalOpen}
  onClose={() => setIsWorkWithMeModalOpen(false)}
/>
```

**Step 5: Verify changes**

Run: `grep -n "WorkWithMeModal\|isWorkWithMeModalOpen\|getValues" components/email-signup.tsx`
Expected: See all new additions

**Step 6: Test the build**

Run: `npm run build`
Expected: Build succeeds with no type errors

**Step 7: Commit**

```bash
git add components/email-signup.tsx
git commit -m "feat: integrate WorkWithMeModal into email-signup component"
```

---

## Task 4: Manual Testing

**Files:**
- Manual testing in browser

**Step 1: Start dev server**

Run: `npm run dev`
Expected: Dev server starts successfully

**Step 2: Test modal without email in form**

1. Open the page in browser
2. Click "WORK WITH ME" button without entering email in main form
3. Verify modal opens
4. Verify body scroll is blocked
5. Enter invalid email (test@)
6. Click Continue - verify validation error shows
7. Enter valid email (test@example.com)
8. Click Continue - verify new tab opens to limitless-life.co
9. Verify modal closes

**Step 3: Test direct submit with existing email**

1. Refresh page
2. Enter valid email in main form
3. Click "WORK WITH ME" button
4. Verify modal does NOT open
5. Verify new tab opens directly to limitless-life.co

**Step 4: Test ESC key and click-outside to close**

1. Click "WORK WITH ME" without email
2. Press ESC key - verify modal closes
3. Click "WORK WITH ME" again
4. Click outside the modal (on backdrop) - verify modal closes
5. Verify scroll is restored

**Step 5: Test error handling**

1. Open browser DevTools Network tab
2. Throttle network to "Offline"
3. Click "WORK WITH ME"
4. Enter email and submit
5. Verify error message displays in modal
6. Verify modal stays open for retry

**Step 6: Commit**

```bash
git add -A
git commit -m "test: manual testing complete - work with me modal"
```

---

## Task 5: Final Verification

**Files:**
- Final checks

**Step 1: Run full test suite**

Run: `npm run test` (if tests exist)
Expected: All tests pass

**Step 2: Production build check**

Run: `npm run build`
Expected: Build completes successfully

**Step 3: Verify git status**

Run: `git status`
Expected: Only 3 new commits (Tasks 1-3), no uncommitted changes

**Step 4: Final commit**

```bash
git add -A
git commit -m "feat: work with me modal implementation complete"
```

---

## Summary

This plan creates a simplified email collection modal that:
- Opens when "WORK WITH ME" is clicked without an email
- Collects email via single-step form
- Submits to N8N webhook
- Opens limitless-life.co in new tab
- Uses existing styling patterns from the codebase
- Supports keyboard (ESC) and click-outside to close
- Blocks body scroll when open
