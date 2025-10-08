// app/management/layout.tsx
import {Toaster} from "react-hot-toast";
import {Inter} from "next/font/google";

const inter = Inter({subsets: ['latin']})

export default function ManagementLayout({children}: { children: React.ReactNode }) {
  return (
    <div className={inter.className}>
      <Toaster position="top-right"/>
      {children}
    </div>
  );
}
