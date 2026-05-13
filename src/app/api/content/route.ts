import { NextRequest, NextResponse } from "next/server";
import { readSiteContent, upsertVideo, type ContentPayload } from "@/lib/content-store";
import { assertAdminRequest } from "@/lib/mux-server";

export async function GET() {
  const content = await readSiteContent();
  return NextResponse.json({ content });
}

export async function POST(request: NextRequest) {
  const admin = assertAdminRequest(request.headers);
  if (!admin.ok) return NextResponse.json({ error: admin.message }, { status: admin.status });

  const body = (await request.json().catch(() => null)) as { destination?: string; payload?: ContentPayload } | null;
  if (!body?.destination || !body.payload?.video?.playbackId) {
    return NextResponse.json({ error: "destination and payload.video.playbackId are required." }, { status: 400 });
  }

  const content = await upsertVideo(body.destination, body.payload);
  return NextResponse.json({ content });
}
