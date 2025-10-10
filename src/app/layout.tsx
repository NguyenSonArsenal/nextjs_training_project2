import { Inter } from 'next/font/google'
import ReactQueryProvider from "@/component/ReactQueryProvider";
import "./globals.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Project 2',
  description: 'Lorem Ipsum',
  icons: {
    icon: '/asset/favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
