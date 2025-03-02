import { Inter} from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
  title: "Watch Shop",
  description: "Created by Hasibul",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        <AuthProvider>{children}</AuthProvider>
        
      </body>
    </html>
  );
}
