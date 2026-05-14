import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ammar Ahmed | Full-Stack Developer",
  description: "Portfolio of Ammar Ahmed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/marker.svg" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;700;800&display=swap" rel="stylesheet" />
        <link href="/css/font-awesome/css/all.min.css" rel="stylesheet" />
        <link href="/css/bootstrap-icons/bootstrap-icons.css" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
