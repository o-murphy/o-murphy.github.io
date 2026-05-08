// layout.tsx
import "./globals.css";
import { IBM_Plex_Mono } from "next/font/google";
import { headers } from 'next/headers';

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-plex-mono",
});

// Функція для отримання даних (можна зробити асинхронною)
async function getPortfolioData() {
  try {
    // В Next.js 15+ можна читати файли напряму
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(process.cwd(), 'public', 'data', 'portfolio.json');
    const jsonData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(jsonData);
  } catch (error) {
    console.error('Error loading portfolio data:', error);
    return {
      person: {
        name: "Dmytro Yaroshenko",
        title: "Portfolio site"
      }
    };
  }
}

// Оскільки metadata має бути статичним, використовуємо generateMetadata
export async function generateMetadata() {
  const data = await getPortfolioData();
  
  return {
    title: data.person?.name || "Dmytro Yaroshenko",
    description: data.person?.description || "Portfolio site",
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={plexMono.variable}>
      <body>{children}</body>
    </html>
  );
}