import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import { Header } from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Devmotors sua oficina especializada",
  description: "Oficina de carros e motos",
  keywords: [
    "oficina de carros",
    "oficina de motos",
    "reparos automotivos",
    "manutenção de veículos",
    "serviços automotivos",
    "mecânica de carros"
  ],
  openGraph: {
    title: "Devmotors sua oficina especializada",
    images: [`${process.env.NEXT_PUBLIC_URL}/logo.jpg`],
    description: "Oficina de carros e motos",
    url: "https://devmotors.vercel.app",
    siteName: "Devmotors"
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true
    }
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header />
        {children}
        <p
          style={{
            textAlign: "center",
            marginTop: 40,
            marginBottom: 24
          }}
        >
          Todos os direitos reservados @{`${new Date().getFullYear()}.`}
        </p>
      </body>
    </html>
  );
}
