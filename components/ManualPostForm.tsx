"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import { triggerManualPost } from "@/app/actions";

const initialState = {
  success: false,
  message: "",
  postId: undefined as string | undefined
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        backgroundColor: pending ? "#475569" : "#2563eb",
        color: "#f8fafc",
        border: "none",
        borderRadius: "8px",
        padding: "12px 18px",
        fontSize: "16px",
        cursor: pending ? "not-allowed" : "pointer",
        transition: "transform 0.18s ease"
      }}
    >
      {pending ? "Posting…" : "Post to Facebook Now"}
    </button>
  );
}

export function ManualPostForm({ defaultMessage }: { defaultMessage: string }) {
  const [state, formAction] = useFormState(triggerManualPost, initialState);

  useEffect(() => {
    if (!state.success) {
      return;
    }
    const timeout = window.setTimeout(() => {
      const banner = document.getElementById("post-status-banner");
      banner?.classList.add("fade-out");
    }, 2000);
    return () => window.clearTimeout(timeout);
  }, [state.success]);

  return (
    <form
      action={formAction}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "18px",
        backgroundColor: "#1e293b",
        padding: "24px",
        borderRadius: "16px",
        boxShadow: "0 30px 60px rgba(15, 23, 42, 0.45)"
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <label htmlFor="message" style={{ fontWeight: 600, fontSize: "18px" }}>
          Compose a post
        </label>
        <textarea
          id="message"
          name="message"
          required
          placeholder="What would you like to post today?"
          defaultValue={defaultMessage}
          rows={6}
          style={{
            padding: "16px",
            borderRadius: "12px",
            border: "1px solid #334155",
            backgroundColor: "#0f172a",
            color: "#e2e8f0",
            resize: "vertical",
            minHeight: "120px",
            fontSize: "16px",
            lineHeight: "1.5"
          }}
        />
        <p style={{ margin: 0, fontSize: "14px", color: "#94a3b8" }}>
          The cron job uses the `FACEBOOK_POST_MESSAGE` environment variable.
          Updating it in Vercel will adjust your daily automation.
        </p>
      </div>
      <SubmitButton />
      {state.message && (
        <div
          id="post-status-banner"
          style={{
            padding: "16px",
            borderRadius: "12px",
            backgroundColor: state.success ? "#0f766e" : "#b91c1c",
            color: "#f8fafc",
            fontSize: "15px"
          }}
        >
          <div style={{ fontWeight: 600 }}>
            {state.success ? "Post succeeded" : "Post failed"}
          </div>
          <div style={{ marginTop: "4px" }}>{state.message}</div>
          {state.postId && (
            <div style={{ marginTop: "6px", fontSize: "13px", opacity: 0.85 }}>
              Facebook post id: {state.postId}
            </div>
          )}
        </div>
      )}
    </form>
  );
}
