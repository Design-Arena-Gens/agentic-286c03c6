import "./globals.css";
import type { Metadata } from "next";

const title = "Facebook Autoposter";
const description =
  "Configure and trigger automated daily Facebook posts powered by a Vercel cron job.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description
  }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="app-container">
        <main
          style={{
            margin: "0 auto",
            width: "100%",
            maxWidth: "960px",
            padding: "64px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "40px"
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
