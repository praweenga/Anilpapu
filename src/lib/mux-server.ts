import { createHmac, timingSafeEqual } from "crypto";
import { buildVideoSnippet } from "@/lib/mux";

const MUX_API_BASE = "https://api.mux.com/video/v1";

export function assertAdminRequest(headers: Headers) {
  const expected = process.env.ADMIN_UPLOAD_KEY;
  const provided = headers.get("x-admin-upload-key") ?? getCookieValue(headers, "studio_session") ?? getBasicAuthPassword(headers);

  if (!expected) {
    return { ok: false, status: 500, message: "ADMIN_UPLOAD_KEY is not configured." };
  }

  if (provided !== expected) {
    return { ok: false, status: 401, message: "Invalid admin upload key." };
  }

  return { ok: true, status: 200, message: "OK" };
}

function getCookieValue(headers: Headers, name: string) {
  const cookie = headers.get("cookie");
  if (!cookie) return null;

  return (
    cookie
      .split(";")
      .map((part) => part.trim())
      .find((part) => part.startsWith(`${name}=`))
      ?.slice(name.length + 1) ?? null
  );
}

function getBasicAuthPassword(headers: Headers) {
  const authorization = headers.get("authorization");
  if (!authorization?.startsWith("Basic ")) return null;

  const decoded = Buffer.from(authorization.slice("Basic ".length), "base64").toString("utf8");
  return decoded.split(":").slice(1).join(":");
}

export async function muxRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const tokenId = process.env.MUX_TOKEN_ID;
  const tokenSecret = process.env.MUX_TOKEN_SECRET;

  if (!tokenId || !tokenSecret) {
    throw new Error("MUX_TOKEN_ID and MUX_TOKEN_SECRET must be configured.");
  }

  const response = await fetch(`${MUX_API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Basic ${Buffer.from(`${tokenId}:${tokenSecret}`).toString("base64")}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = payload?.error?.message ?? payload?.message ?? "Mux request failed.";
    throw new Error(message);
  }

  return payload as T;
}

export function createContentSnippet(asset: MuxAssetData) {
  const playbackId = asset.playback_ids?.find((id) => id.policy === "public")?.id ?? "";

  return buildVideoSnippet({
    playbackId,
    assetId: asset.id,
    duration: asset.duration,
  });
}

export function verifyMuxWebhookSignature(body: string, headers: Headers) {
  const secret = process.env.MUX_WEBHOOK_SECRET;
  if (!secret) return false;

  const id = headers.get("svix-id");
  const timestamp = headers.get("svix-timestamp");
  const signatureHeader = headers.get("svix-signature");
  if (!id || !timestamp || !signatureHeader) return false;

  const signedContent = `${id}.${timestamp}.${body}`;
  const secretBytes = Buffer.from(secret.replace(/^whsec_/, ""), "base64");
  const expected = createHmac("sha256", secretBytes).update(signedContent).digest("base64");

  return signatureHeader.split(" ").some((signature) => {
    const value = signature.replace(/^v\d+,/, "");
    const expectedBuffer = Buffer.from(expected);
    const actualBuffer = Buffer.from(value);
    return expectedBuffer.length === actualBuffer.length && timingSafeEqual(expectedBuffer, actualBuffer);
  });
}

export interface MuxDirectUploadData {
  id: string;
  status: string;
  url?: string;
  asset_id?: string;
  error?: {
    type?: string;
    message?: string;
  };
}

export interface MuxPlaybackId {
  id: string;
  policy: "public" | "signed";
}

export interface MuxAssetData {
  id: string;
  status: string;
  duration?: number;
  playback_ids?: MuxPlaybackId[];
  errors?: {
    type?: string;
    messages?: string[];
  };
}

export interface MuxWebhookEvent {
  type: string;
  data: MuxAssetData | MuxDirectUploadData;
}
