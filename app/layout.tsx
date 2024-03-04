import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Provider from "@/components/provider";
import { TwitterLayout } from "@/components/layout/TwitterLayout";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default  function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
   
      <GoogleOAuthProvider clientId="32651585841-gt3nvs8lolqqgfirlr4stai212ni937g.apps.googleusercontent.com">
     
      <body className={inter.className}>
      <Provider>
        <TwitterLayout>
        {children}
        </TwitterLayout>
        </Provider>
        <Toaster/>
        </body>
      </GoogleOAuthProvider>
    </html>
  );
}
