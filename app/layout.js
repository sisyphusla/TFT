import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata = {
  title: 'S12 分組衝分賽',
  description: 'TFT Player Stats and Rankings',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&family=Poppins:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="h-full m-0 text-white">
        <div className="flex flex-col min-h-screen">
          {/* <Header /> */}
          <main className="flex-grow">{children}</main>
          {/* <Footer /> */}
        </div>
      </body>
    </html>
  );
}
