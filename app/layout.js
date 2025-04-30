import { Nunito } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const nunito = Nunito({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Watch Store",
  description: "Watch Store that sells watches",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={nunito.className}
        suppressContentEditableWarning
        suppressHydrationWarning
      >
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>

      </body>
    </html>
  );
}
