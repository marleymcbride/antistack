"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

// Email pattern validation
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// Simple type declaration
type SubscribeFormData = {
  email: string;
  [key: string]: any;
};

export default function EmailSignup() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitResult, setSubmitResult] = React.useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // Use react-hook-form without zod
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (
    data: any,
    redirectUrl: string = "/signup-watch-video",
  ) => {
    console.log("📧 EMAIL SIGNUP - Form submission started:", data);

    // Validate email manually
    if (!emailRegex.test(data.email)) {
      console.log("❌ EMAIL SIGNUP - Email validation failed:", data.email);
      setSubmitResult({
        success: false,
        message: "Please enter a valid email address",
      });
      return;
    }

    console.log("✅ EMAIL SIGNUP - Email validation passed");
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      // Get current video time before redirecting (for users coming from video page)
      let currentVideoTime = 0;
      if (window.Wistia && window.Wistia.api) {
        const videos = window.Wistia.api.all();
        if (videos.length > 0) {
          const video = videos[0];
          if (video.time && typeof video.time === "function") {
            currentVideoTime = video.time();
            console.log(
              `🎬 EMAIL SIGNUP - Saving video timestamp: ${currentVideoTime}s`,
            );
          }
        }
      }

      // Store video timestamp in localStorage if available
      if (currentVideoTime > 0) {
        localStorage.setItem("videoResumeTime", currentVideoTime.toString());
        console.log(`💾 EMAIL SIGNUP - Video time saved: ${currentVideoTime}s`);
      }

      console.log("🔄 EMAIL SIGNUP - Importing N8N webhook client...");
      // Submit to N8N webhook with dual-endpoint fallback
      const { submitToN8nWebhook } = await import("../lib/n8n-webhook-client");
      console.log("✅ EMAIL SIGNUP - N8N webhook client imported successfully");

      console.log("🚀 EMAIL SIGNUP - Calling submitToN8nWebhook with:", {
        email: data.email,
        firstName: "",
        source: "anti-stack-section",
      });

      await submitToN8nWebhook(
        data.email,
        "", // firstName - empty for this form
        "anti-stack-section", // source tracking
      );

      console.log("🎉 EMAIL SIGNUP - N8N webhook submission successful!");
      console.log("🔄 EMAIL SIGNUP - Redirecting to", redirectUrl);

      // Success - redirect to specified URL
      if (redirectUrl.startsWith("http")) {
        window.location.href = redirectUrl;
      } else {
        router.push(redirectUrl);
      }
      return;
    } catch (error) {
      console.error("❌ EMAIL SIGNUP - N8N webhook submission failed:", error);

      // Handle N8N webhook errors with professional messages
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred. Please try again later.";
      console.log(
        "📧 EMAIL SIGNUP - Showing error message to user:",
        errorMessage,
      );

      setSubmitResult({
        success: false,
        message: errorMessage,
      });
    } finally {
      console.log(
        "🏁 EMAIL SIGNUP - Form submission completed, resetting loading state",
      );
      setIsSubmitting(false);
    }
  };

  const handleWorkWithMe = async () => {
    // Get email from form
    const emailValue = (
      document.querySelector('input[type="email"]') as HTMLInputElement
    )?.value;

    if (!emailValue || !emailRegex.test(emailValue)) {
      alert("Please enter your email address first");
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit to NEW N8N webhook for work-with-me leads
      const response = await fetch(
        "https://n8n.marleymcbride.co/webhook-test/antistack-workwithme-leads",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailValue,
            source: "work-with-me-leads",
            timestamp: new Date().toISOString(),
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to submit email");
      }

      console.log("🎉 WORK WITH ME - N8N webhook submission successful!");
      console.log("🔄 WORK WITH ME - Redirecting to limitless-life.co");

      // Redirect to limitless-life.co
      window.location.href = "https://limitless-life.co";
    } catch (error) {
      console.error("❌ WORK WITH ME - N8N webhook submission failed:", error);
      alert("There was an error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Two Column Layout - 60/40 Split - Everything Left, Image Right */}
      <div className="grid grid-cols-1 lg:grid-cols-[60fr_40fr] pb-16 gap-8 md:gap-12 lg:gap-16 items-start mt-8 lg:mb-8">
        {/* Left Column - All Content */}
        <div className="pt-0 space-y-5">
          {/* Main CTA Headline */}
          <h2 className="text-xl font-thin leading-none text-left lg:text-left text-[50px] md:text-[44px] lg:text-[50px] ">
            3 Weeks to Jumping Out Of Bed
          </h2>

          {/* Sub-eyebrow - Desktop only COMMENTED OUT NOT IN USE
          <p className="hidden text-base text-left lg:block lg:text-base md:text-base lg:text-lg">
            Join 742+ other elite performers getting:
          </p> */}

          {/* Mobile-only subheading */}
          <p className="block py-3 text-lg font-normal leading-relaxed text-left lg:hidden text-zinc-300">
            Master the simple lifestyle-first health system to get boundless energy every morning in 21 days with the Anti-Stack system
          </p>

          {/* Benefits Box - Desktop only (show on left column) */}
          <div className="hidden px-6 py-10 mx-5 -ml-0 rounded-lg lg:block mtext-left left bg-zinc-800/70">
            <h4 className="mb-4 text-sm font-semibold leading-relaxed md:text-sm lg:text-[19px] lg:mb-6">
              A daily 3-minute read straight to your inbox
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="flex-shrink-0 self-center mr-[10px] text-left text-red-500">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-sm leading-relaxed">
                  The simple 3-step morning flow to wake up feeling energized
                  without caffeine
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 self-center mr-[10px] text-left text-red-500">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-sm leading-relaxed">
                  The EXACT protocol to jump out of bed in only 3 weeks
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 self-center mr-[10px] text-left text-red-500">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-sm leading-relaxed">
                  The full blueprint to reset your hormones and triple your
                  focus without sunning your balls, biohacks or &apos;T
                  boosters&apos;
                </span>
              </li>
            </ul>
          </div>

          {submitResult && (
            <div
              className={`mb-2 p-2 rounded ${
                submitResult.success
                  ? "bg-green-700/20 text-green-100"
                  : "bg-red-700/20 text-red-100"
              }`}
            >
              {submitResult.message}
            </div>
          )}

          {/* Quick Note on getting the email - Desktop only */}
          <div className="hidden text-center lg:block lg:mx-auto lg:-ml-4">
            <p className="text-sm text-zinc-400 md:text-base">
              FREE for the first 100. Drop your email and I&apos;ll send
              it over:
            </p>
          </div>

          {/* Email Form */}
          <div className="mx-auto max-w-[290px] lg:mx-auto lg:max-w-[96%] lg:w-96">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <Input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: emailRegex,
                    message: "Please enter a valid email address",
                  },
                })}
                type="email"
                placeholder="Your Email Address..."
                className={`w-full p-3 h-12 text-base bg-zinc-800 border border-zinc-700 rounded text-white ${
                  errors.email ? "border-red-500" : ""
                }`}
                required
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.email.message as string}
                </p>
              )}
              <Button
                type="submit"
                className="p-3 w-full h-14 text-base font-bold text-white bg-red-700 rounded hover:bg-red-800"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Send me Day 1"}
              </Button>
            </form>
          </div>

          {/* Quick Note on getting the email - Mobile only, UNDERNEATH form */}
          <div className="block text-center lg:hidden">
            <p className="text-sm text-zinc-400">
              FREE for the first 100. Drop your email and I&apos;ll send
              it over:
            </p>
          </div>
        </div>

        {/* Right Column - Book Mockup Image */}
        <div className="flex flex-col justify-center items-center pt-0 space-y-3">
          <img
            src="/images/3WTJOOB - Book mockup.jpg"
            alt="3 Weeks to Jumping Out Of Bed - Book Mockup"
            className="object-contain w-[112%] max-w-md h-auto rounded-lg shadow-2xl"
          />

          {/* Benefits Box - Mobile only (under image) */}
          <div className="block px-5 py-12 -mx-4 rounded-lg lg:hidden bg-zinc-800/70">
            <h4 className="mx-auto mb-4 ml-6 text-lg font-semibold leading-relaxed">
              A daily 3-minute read straight to your inbox
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="flex-shrink-0 self-center mr-[10px] text-left text-red-500">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-sm leading-relaxed">
                  The simple 3-step morning flow to wake up feeling energized
                  without caffeine
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 self-center mr-[10px] text-left text-red-500">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-sm leading-relaxed">
                  The EXACT protocol to jump out of bed in only 3 weeks
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 self-center mr-[10px] text-left text-red-500">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-sm leading-relaxed">
                  The full blueprint to reset your hormones and triple your
                  focus without sunning your balls, biohacks or &apos;T
                  boosters&apos;
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Personal Note - Outside container */}
      <p className="mb-4 text-xs text-center text-zinc-400">
        (I reply to every email personally. No bots or VA. Just yours truly.)
      </p>
    </>
  );
}
