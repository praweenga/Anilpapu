import { NextRequest, NextResponse } from "next/server";
import { verifyMuxWebhookSignature, type MuxWebhookEvent } from "@/lib/mux-server";

export async function POST(request: NextRequest) {
  const body = await request.text();

  if (process.env.MUX_WEBHOOK_SECRET && !verifyMuxWebhookSignature(body, request.headers)) {
    return NextResponse.json({ error: "Invalid webhook signature." }, { status: 401 });
  }

  const event = JSON.parse(body) as MuxWebhookEvent;

  return NextResponse.json({
    received: true,
    type: event.type,
    assetId: "id" in event.data ? event.data.id : undefined,
    status: "status" in event.data ? event.data.status : undefined,
  });
}
