import { VSLAnalyticsEvent } from "@/types/vsl.types";

export const getSessionId = (): string => {
  if (typeof window === "undefined") return "";

  let sessionId = sessionStorage.getItem("vsl_session_id");
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random()
      .toString(36)
      .slice(2, 11)}`;
    sessionStorage.setItem("vsl_session_id", sessionId);
  }
  return sessionId;
};

export const getUserId = (): string | undefined => {
  if (typeof window === "undefined") return undefined;

  const authUserId = localStorage.getItem("user_id");
  if (authUserId) return authUserId;

  let anonId = localStorage.getItem("vsl_anonymous_id");
  if (!anonId) {
    anonId = `anon_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    localStorage.setItem("vsl_anonymous_id", anonId);
  }
  return anonId;
};

const trackedMilestones = new Set<number>();

export const shouldTrackMilestone = (percentage: number): boolean => {
  const milestone = Math.floor(percentage / 25) * 25;
  if (milestone >= 25 && !trackedMilestones.has(milestone)) {
    trackedMilestones.add(milestone);
    return true;
  }
  return false;
};

export const trackVSLEvent = async (
  event: VSLAnalyticsEvent
): Promise<void> => {
  try {
    // Send to local API route
    await fetch("/api/analytics/vsl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });

    // Send to N8N webhook if configured
    const n8nWebhook = process.env.NEXT_PUBLIC_N8N_VSL_WEBHOOK;
    if (n8nWebhook) {
      await fetch(n8nWebhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });
    }

    console.log("VSL Event tracked:", event.type, event);
  } catch (error) {
    console.error("Failed to track VSL event:", error);
  }
};

export const formatVideoTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};
