import { Inter, Poppins, Mulish, Playfair_Display, Noto_Sans } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const mulish = Mulish({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: "400" });
const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"] });
const notoSans = Noto_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Watch Store",
  description: "Watch Store that sells watches",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={notoSans.className}
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
