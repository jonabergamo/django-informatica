import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "../Context/Auth";
import NavigationBar from "../components/NavigationBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className="bg-zinc-900 text-white overflow-x-hidden">
          <NavigationBar />
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
