// components/SEO.jsx

import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({ title, description, keywords, ogTitle, ogDescription, ogUrl, ogImgUrl }) => {
  return (
    <Helmet>
      {/* 基本 SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph 標籤 */}
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImgUrl}></meta>
      <meta data-react-helmet="true" property="og:url" content={ogUrl}></meta>


      {/* Twitter Card */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:image" content="https://tftrank.vercel.app/tftranksummarycard.png" />
      <meta name="twitter:title" content="TFT Set9.5台服城邦衝分賽" />
      <meta name="twitter:description" content="Set9.5台服聯盟戰棋城邦衝分賽，總共分為四組，隊長皆為知名戰棋實況主，
        分別是花輪同學、圖奇奶王 綠茶、ToBeTerry、絕世拿鐵。每隊有一位隊長加上八位隊員所組成，隊員都是台服聯盟戰棋高端以及實況主。" />
    </Helmet>
  );
};

export default SEO;
