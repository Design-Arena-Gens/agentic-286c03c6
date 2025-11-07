"use server";

import { revalidatePath } from "next/cache";
import { config } from "@/lib/config";
import { postToFacebook } from "@/lib/facebook";

type ActionState = {
  success: boolean;
  message: string;
  postId?: string;
};

export async function triggerManualPost(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const message = String(formData.get("message") ?? "").trim();

  if (!message) {
    return {
      success: false,
      message: "Enter a message before submitting."
    };
  }

  try {
    const postId = await postToFacebook(message);
    revalidatePath("/");
    return {
      success: true,
      message: "Post published to Facebook successfully.",
      postId
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unexpected error while posting to Facebook."
    };
  }
}

export async function retrieveDefaultMessage(): Promise<string> {
  try {
    return config.defaultPostMessage();
  } catch {
    return "";
  }
}
