import { NextResponse, NextRequest } from "next/server";
import { config } from "@/lib/config";
import { postToFacebook } from "@/lib/facebook";

function verifyCronSecret(req: NextRequest): void {
  const received = req.headers.get("x-cron-secret");
  if (!received) {
    throw new Error("Missing x-cron-secret header.");
  }
  const expected = config.cronSecret();
  if (received !== expected) {
    throw new Error("Invalid cron secret.");
  }
}

async function executePost() {
  const message = config.defaultPostMessage();
  const postId = await postToFacebook(message);
  return NextResponse.json({ success: true, postId });
}

export async function GET(req: NextRequest) {
  try {
    verifyCronSecret(req);
    return await executePost();
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unexpected error while handling scheduled post."
      },
      { status: 400 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    verifyCronSecret(req);
    return await executePost();
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unexpected error while handling scheduled post."
      },
      { status: 400 }
    );
  }
}
