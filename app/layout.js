import "./globals.css";

export const metadata = {
  title: "AI Movie Insight Builder",
  description: "AI-powered sentiment analysis for IMDb movies.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
