import './globals.css';
import { Inter } from 'next/font/google';
import Header from './components/Header';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'S12 分組衝分賽',
  description:
    '本次比賽為非官方舉辦之台服聯盟戰棋S12季初衝分賽。由花輪同學、Greentea喝綠茶、絕世拿鐵、terry、白龍1五位頂尖棋手領軍。旨在提供各方好手競技舞台，活絡社群競賽風氣，培養觀賽群眾。',
  keywords: '聯盟戰棋, S12, 衝分賽, 台服, 電競',
  author: 'aple83709@gmail.com',
  openGraph: {
    title: 'S12 分組衝分賽',
    description:
      '本次比賽為非官方舉辦之台服聯盟戰棋S12季初衝分賽。由花輪同學、Greentea喝綠茶、絕世拿鐵、terry、白龍1五位頂尖棋手領軍。旨在提供各方好手競技舞台，活絡社群競賽風氣，培養觀賽群眾。',
    type: 'website',
    url: 'https://tftrank.vercel.app/',
    image: 'https://tftrank.vercel.app/api/og',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'S12 分組衝分賽',
  description:
    '本次比賽為非官方舉辦之台服聯盟戰棋S12季初衝分賽。由花輪同學、Greentea喝綠茶、絕世拿鐵、terry、白龍1五位頂尖棋手領軍。旨在提供各方好手競技舞台，活絡社群競賽風氣，培養觀賽群眾。',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
  startDate: '2024-08-01',
  endDate: '2024-08-15',
  organizer: {
    '@type': 'Organization',
    name: '聯盟戰棋台服S12衝分賽',
    url: 'https://tftrank.vercel.app/',
  },
  performer: [
    {
      '@type': 'Person',
      name: '白龍1',
      url: 'https://www.twitch.tv/cyy1u_',
    },
    {
      '@type': 'Person',
      name: 'Latte喝拿鐵',
      url: 'https://www.twitch.tv/jazlatte',
    },
    {
      '@type': 'Person',
      name: '花輪同學',
      url: 'https://www.twitch.tv/gearbaby1010',
    },
    {
      '@type': 'Person',
      name: 'terrytft',
      url: 'https://www.twitch.tv/terrytft',
    },
    {
      '@type': 'Person',
      name: 'Greentea喝綠茶',
      url: 'https://www.twitch.tv/greentea',
    },
  ],
  location: {
    '@type': 'VirtualLocation',
    url: 'https://www.twitch.tv/directory/game/Teamfight%20Tactics',
  },
  subEvent: [
    {
      '@type': 'Event',
      name: '白龍隊',
      performer: [
        {
          '@type': 'Person',
          name: '白龍1',
          url: 'https://www.twitch.tv/cyy1u_',
        },
        {
          '@type': 'Person',
          name: 'AQ1H',
          url: 'https://www.twitch.tv/alphaqi1109',
        },
        {
          '@type': 'Person',
          name: '河川先子',
          url: 'https://www.twitch.tv/roy0200327',
        },
        {
          '@type': 'Person',
          name: '電競損手',
          url: 'https://www.twitch.tv/kcleung1215',
        },
        {
          '@type': 'Person',
          name: '依居居',
          url: 'https://www.twitch.tv/sssttreiiiii123',
        },
        { '@type': 'Person', name: '二等兵' },
        {
          '@type': 'Person',
          name: 'WHAT CAN I DO',
          url: 'https://www.twitch.tv/tft_whatcanido',
        },
        { '@type': 'Person', name: '花花 毛毛 泡泡' },
      ],
    },
    {
      '@type': 'Event',
      name: '拿鐵隊',
      performer: [
        {
          '@type': 'Person',
          name: 'Latte喝拿鐵',
          url: 'https://www.twitch.tv/jazlatte',
        },
        { '@type': 'Person', name: '不能沒有你' },
        {
          '@type': 'Person',
          name: '天晴Haruru',
          url: 'https://www.twitch.tv/tcharuru',
        },
        {
          '@type': 'Person',
          name: '懷疑Owo小熊',
          url: 'https://www.twitch.tv/lilbear1122',
        },
        { '@type': 'Person', name: '請給我一個面子Ð' },
        {
          '@type': 'Person',
          name: '樺樺98',
          url: 'https://www.twitch.tv/tftwawa98',
        },
        {
          '@type': 'Person',
          name: 'Cute SUP O v O b',
          url: 'https://www.twitch.tv/lusciousxd',
        },
        {
          '@type': 'Person',
          name: '罵慧 MurrayTFT',
          url: 'https://www.twitch.tv/murraytft',
        },
        { '@type': 'Person', name: '白帶1' },
      ],
    },
    {
      '@type': 'Event',
      name: '花輪隊',
      performer: [
        {
          '@type': 'Person',
          name: '花輪同學',
          url: 'https://www.twitch.tv/gearbaby1010',
        },
        {
          '@type': 'Person',
          name: 'K寶寶生氣了',
          url: 'https://www.twitch.tv/kbaobao',
        },
        { '@type': 'Person', name: '鐵之硬沼' },
        {
          '@type': 'Person',
          name: 'Ajoe1231',
          url: 'https://www.twitch.tv/ajoe1231',
        },
        {
          '@type': 'Person',
          name: 'blackbigbig',
          url: 'https://www.twitch.tv/bbb1017',
        },
        {
          '@type': 'Person',
          name: '我只會打星海',
          url: 'https://www.twitch.tv/starseabro',
        },
        { '@type': 'Person', name: 'Feelzacman' },
        {
          '@type': 'Person',
          name: '爆豪1',
          url: 'https://www.twitch.tv/gjesst4628',
        },
      ],
    },
    {
      '@type': 'Event',
      name: 'TERRY隊',
      performer: [
        {
          '@type': 'Person',
          name: 'terrytft',
          url: 'https://www.twitch.tv/terrytft',
        },
        {
          '@type': 'Person',
          name: 'Fallhalp',
          url: 'https://www.twitch.tv/kitool',
        },
        { '@type': 'Person', name: 'Wingnism' },
        { '@type': 'Person', name: 'Phantasm殺手' },
        {
          '@type': 'Person',
          name: '摘星旅人',
          url: 'https://www.twitch.tv/daveng12320',
        },
        { '@type': 'Person', name: '2017FIFA' },
        {
          '@type': 'Person',
          name: '貝貝豬頭皮',
          url: 'https://www.twitch.tv/bbdtw',
        },
        { '@type': 'Person', name: 'loveactually' },
      ],
    },
    {
      '@type': 'Event',
      name: '綠茶隊',
      performer: [
        {
          '@type': 'Person',
          name: 'Greentea喝綠茶',
          url: 'https://www.twitch.tv/greentea',
        },
        {
          '@type': 'Person',
          name: '小娜啊',
          url: 'https://www.twitch.tv/nana4ni',
        },
        {
          '@type': 'Person',
          name: '摸雞MoGG',
          url: 'https://www.twitch.tv/mogg666',
        },
        { '@type': 'Person', name: '偶爾愛你' },
        { '@type': 'Person', name: '夏沫沫ÜÜ' },
        {
          '@type': 'Person',
          name: '妳家祖祠留給你住',
          url: 'https://www.twitch.tv/supreme030500000',
        },
        { '@type': 'Person', name: '地瓜QQBALL' },
        { '@type': 'Person', name: '一窩六口' },
      ],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant-TW" className="h-full">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&family=Poppins:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`h-full m-0 text-white ${inter.className}`}>
        <div className="flex flex-col min-h-screen">
          {/* <Header /> */}
          <main className="flex-grow" role="main" aria-label="主要內容">
            {children}
          </main>
          {/* <Footer /> */}
        </div>
      </body>
    </html>
  );
}
