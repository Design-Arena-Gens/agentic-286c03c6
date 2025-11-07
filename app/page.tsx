import { ManualPostForm } from "@/components/ManualPostForm";
import { retrieveDefaultMessage } from "./actions";

const sectionsStyles: Record<string, React.CSSProperties> = {
  card: {
    backgroundColor: "#111827",
    borderRadius: "20px",
    padding: "28px",
    boxShadow: "0 30px 60px rgba(15, 23, 42, 0.4)",
    display: "flex",
    flexDirection: "column",
    gap: "18px"
  },
  header: {
    fontSize: "32px",
    fontWeight: 700,
    margin: 0,
    letterSpacing: "-0.025em"
  },
  paragraph: {
    margin: 0,
    fontSize: "17px",
    lineHeight: 1.6,
    color: "#cbd5f5"
  },
  list: {
    margin: "0",
    paddingLeft: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    color: "#cbd5f5",
    fontSize: "16px"
  },
  code: {
    display: "inline-block",
    backgroundColor: "#0f172a",
    borderRadius: "6px",
    padding: "2px 8px",
    fontFamily: "Menlo, Monaco, 'Courier New', monospace",
    fontSize: "14px",
    color: "#38bdf8"
  }
};

export default async function HomePage() {
  const defaultMessage = await retrieveDefaultMessage();

  return (
    <>
      <section style={sectionsStyles.card}>
        <h1 style={sectionsStyles.header}>Automated Facebook Daily Poster</h1>
        <p style={sectionsStyles.paragraph}>
          Configure the environment variables and Vercel Cron schedule to post
          to your Facebook Page automatically once per day. Use the manual post
          form below to verify that credentials, permissions, and messaging
          render correctly before the automation runs.
        </p>
      </section>

      <section style={sectionsStyles.card}>
        <h2 style={{ ...sectionsStyles.header, fontSize: "26px" }}>Manual Post</h2>
        <p style={sectionsStyles.paragraph}>
          Publish instantly to your Page using the provided Page access token.
          This action uses the Facebook Graph API endpoint
          <span style={{ marginLeft: "6px", ...sectionsStyles.code }}>
            POST /v19.0/&lt;PAGE_ID&gt;/feed
          </span>
          .
        </p>
        <ManualPostForm defaultMessage={defaultMessage} />
      </section>

      <section style={sectionsStyles.card}>
        <h2 style={{ ...sectionsStyles.header, fontSize: "26px" }}>
          Deployment Checklist
        </h2>
        <ol style={sectionsStyles.list}>
          <li>
            In Vercel project settings, add environment variables:
            <div style={{ marginTop: "8px", display: "grid", gap: "6px" }}>
              <code style={sectionsStyles.code}>FACEBOOK_PAGE_ID</code>
              <code style={sectionsStyles.code}>FACEBOOK_PAGE_ACCESS_TOKEN</code>
              <code style={sectionsStyles.code}>FACEBOOK_POST_MESSAGE</code>
              <code style={sectionsStyles.code}>CRON_SECRET</code>
            </div>
          </li>
          <li>
            Configure a Facebook Page long-lived access token with{" "}
            <strong>pages_manage_posts</strong> and <strong>pages_read_engagement</strong>{" "}
            permissions.
          </li>
          <li>
            Add a Vercel Cron job pointing to
            <span style={{ marginLeft: "6px", ...sectionsStyles.code }}>
              GET https://agentic-286c03c6.vercel.app/api/post
            </span>{" "}
            once per day at your desired UTC time.
          </li>
          <li>
            In the Cron configuration, set the header{" "}
            <span style={sectionsStyles.code}>x-cron-secret</span> to match your
            <span style={{ marginLeft: "6px", ...sectionsStyles.code }}>CRON_SECRET</span>.
          </li>
          <li>
            Update <code style={sectionsStyles.code}>FACEBOOK_POST_MESSAGE</code> in
            Vercel to change the daily automation content. Redeploy to apply.
          </li>
        </ol>
      </section>

      <section style={sectionsStyles.card}>
        <h2 style={{ ...sectionsStyles.header, fontSize: "26px" }}>
          Troubleshooting Tips
        </h2>
        <ul style={sectionsStyles.list}>
          <li>
            Ensure the Page access token is valid and generated for the same Page ID.
          </li>
          <li>
            Verify the Facebook App mode is set to <strong>Live</strong> when posting
            to production Pages.
          </li>
          <li>
            Monitor the Vercel function logs for API errors or permission problems.
          </li>
          <li>
            Facebook rate limits apply; avoid posting identical content too frequently.
          </li>
        </ul>
      </section>
    </>
  );
}
