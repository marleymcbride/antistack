'use client';

import React from 'react';
import WorkWithMeModal from './work-with-me-modal';
import { fireWorkWithMeWebhook } from '../lib/n8n-webhook-client';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export default function FinalCTAButton() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isWorkWithMeModalOpen, setIsWorkWithMeModalOpen] = React.useState(false);

  const handleClick = async () => {
    // Get email from any email input on the page
    const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
    const emailValue = emailInput?.value?.trim();

    // Check if email exists and is valid
    if (emailValue && emailRegex.test(emailValue)) {
      // Email exists - fire webhook and open limitless-life.co
      setIsSubmitting(true);

      try {
        // Fire Work With Me webhook and wait for completion
        await fireWorkWithMeWebhook(emailValue);

        console.log('🎉 FINAL CTA - Webhook fired, opening limitless-life.co in new tab');

        // Open limitless-life.co in new tab
        window.open('https://limitless-life.co?3w=squeeze-page_work-with-me', '_blank');

      } catch (error) {
        console.error('❌ FINAL CTA - Webhook error:', error);
        // Still open the page even if webhook fails
        window.open('https://limitless-life.co?3w=squeeze-page_work-with-me', '_blank');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // No email - open modal
      setIsWorkWithMeModalOpen(true);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={isSubmitting}
        className="p-5 w-full text-xl font-bold text-white bg-red-700 rounded hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Processing...' : 'Work with Marley'}
      </button>

      <WorkWithMeModal
        isOpen={isWorkWithMeModalOpen}
        onClose={() => setIsWorkWithMeModalOpen(false)}
      />
    </>
  );
}
