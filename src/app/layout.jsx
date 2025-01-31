import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserProvider, SelectedUserProvider } from "@/context/Usercontext";
import AuthcontextProvider from "@/context/Authcontext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Secrate",
  description: "Curious to discover what people really think about you?",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden w-screen h-screen`}
      >
        <AuthcontextProvider>
          <SelectedUserProvider>
            <UserProvider>{children}</UserProvider>
          </SelectedUserProvider>
        </AuthcontextProvider>
      </body>
    </html>
  );
}
