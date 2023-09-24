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
      <meta name="Robots" content='all' />


      {/* Open Graph 標籤 */}
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImgUrl} />
      <meta property="og:url" content={ogUrl} />


      {/* Twitter Card */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:image" content={ogImgUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default SEO;
