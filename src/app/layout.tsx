import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const Chatbot = dynamic(() => import("@/components/Chatbot"), { ssr: false });

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Sachin Sharma | DevOps Portfolio",
  description: "Futuristic DevOps Portfolio of Sachin Sharma - DevOps Enthusiast, Cloud Architect, and Tech Explorer.",
  keywords: ["DevOps", "Cloud Architect", "Site Reliability Engineering", "Kubernetes", "Docker", "Terraform", "CI/CD", "Next.js", "Portfolio"],
  authors: [{ name: "Sachin Sharma" }],
  openGraph: {
    title: "Sachin Sharma | DevOps Portfolio",
    description: "Building scalable, futuristic infrastructure and bridging the gap between development and operations.",
    url: "https://your-portfolio-url.com", // User should update this
    siteName: "Sachin Sharma Portfolio",
    images: [
      {
        url: "/og-image.png", // User should add this image to /public
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sachin Sharma | DevOps Portfolio",
    description: "Building scalable, futuristic infrastructure and bridging the gap between development and operations.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CustomCursor />
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Chatbot />
      </body>
    </html>
  );
}
