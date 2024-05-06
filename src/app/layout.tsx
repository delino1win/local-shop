import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./NavBar";
import AuthProvider from "./context/AuthProvider";
import Sidebar from "./components/sidebar";
import MobileSidebar from "./components/sidebar/seller/mobile_sidebar_menu";
import ChatModal from "./components/chat/chatModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <NavBar />
          <div className="min-h-screen w-full flex max-sm:flex-none max-sm:max-w-full bg-slate-500">
            <Sidebar />
            <MobileSidebar />
            <div className="mx-24 rounded-lg flex-1 max-sm:mx-12 max-sm:text-xs overflow-x-auto">
              {children}
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
