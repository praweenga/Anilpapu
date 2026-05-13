import { NextRequest, NextResponse } from "next/server";
import {
  assertAdminRequest,
  createContentSnippet,
  muxRequest,
  type MuxAssetData,
  type MuxDirectUploadData,
} from "@/lib/mux-server";

export async function POST(request: NextRequest) {
  const admin = assertAdminRequest(request.headers);
  if (!admin.ok) return NextResponse.json({ error: admin.message }, { status: admin.status });

  const body = await request.json().catch(() => ({}));
  const origin = request.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "*";
  const destination = typeof body.destination === "string" ? body.destination : "motion-gallery";
  const title = typeof body.title === "string" && body.title.trim() ? body.title.trim() : "anil-portfolio-upload";

  try {
    const upload = await muxRequest<{ data: MuxDirectUploadData }>("/uploads", {
      method: "POST",
      body: JSON.stringify({
        cors_origin: origin,
        new_asset_settings: {
          playback_policy: ["public"],
          encoding_tier: "baseline",
          passthrough: body.passthrough ?? `${destination}:${title}`,
        },
      }),
    });

    return NextResponse.json({ upload: upload.data });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Mux upload creation failed." }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const admin = assertAdminRequest(request.headers);
  if (!admin.ok) return NextResponse.json({ error: admin.message }, { status: admin.status });

  const uploadId = request.nextUrl.searchParams.get("uploadId");
  if (!uploadId) return NextResponse.json({ error: "uploadId is required." }, { status: 400 });

  try {
    const upload = await muxRequest<{ data: MuxDirectUploadData }>(`/uploads/${uploadId}`);
    const assetId = upload.data.asset_id;

    if (!assetId) {
      return NextResponse.json({ upload: upload.data, asset: null, snippet: null });
    }

    const asset = await muxRequest<{ data: MuxAssetData }>(`/assets/${assetId}`);
    const snippet = asset.data.playback_ids?.length ? createContentSnippet(asset.data) : null;

    return NextResponse.json({ upload: upload.data, asset: asset.data, snippet });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Mux upload lookup failed." }, { status: 500 });
  }
}
