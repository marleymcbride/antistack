'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export default function FinalCTAButton() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleClick = async () => {
    // Get email from any email input on the page
    const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
    const emailValue = emailInput?.value;

    if (!emailValue || !emailRegex.test(emailValue)) {
      alert('Please enter your email address first');
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit to NEW N8N webhook for work-with-me leads
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

      console.log('🎉 FINAL CTA - N8N webhook submission successful!');
      console.log('🔄 FINAL CTA - Redirecting to limitless-life.co');

      // Redirect to limitless-life.co
      window.location.href = 'https://limitless-life.co';

    } catch (error) {
      console.error('❌ FINAL CTA - N8N webhook submission failed:', error);
      alert('There was an error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isSubmitting}
      className="p-5 w-full text-xl font-bold text-white bg-red-700 rounded hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isSubmitting ? 'Processing...' : 'Show me how'}
    </button>
  );
}
