import { NextRequest, NextResponse } from "next/server";
import { VSLAnalyticsEvent } from "@/types/vsl.types";

export async function POST(request: NextRequest) {
  try {
    const event: VSLAnalyticsEvent = await request.json();

    if (!event.type || !event.videoId || !event.sessionId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Analytics event received - can be logged to database here
    console.log("VSL Analytics Event:", event);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("VSL Analytics API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
