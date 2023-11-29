import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "@/provider/SessionProvider";

// const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "700"],
  subsets: ["cyrillic"],
});

export const metadata: Metadata = {
  title: "Twitter Clone",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={roboto.className}>{children}</body>
      </html>
    </SessionProvider>
  );
}
