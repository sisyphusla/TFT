import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr';
import App from '../App.jsx'
import { Helmet } from "react-helmet";



export default {
  Page: App
}

export function render({ Page, props }) {
  const pageHtml = ReactDOMServer.renderToString(<Page {...props} />);
  const safePageHtml = dangerouslySkipEscape(pageHtml);
  const helmet = Helmet.renderStatic();
  const helmetTitle = dangerouslySkipEscape(helmet.title.toString());
  const helmetMeta = dangerouslySkipEscape(helmet.meta.toString());
  const helmetLink = dangerouslySkipEscape(helmet.link.toString());

  return escapeInject`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="icon" type="image/svg+xml" href="/forceofnature.png" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  ${helmetTitle}
  ${helmetMeta}
  ${helmetLink}
</head>
<body>
  <div id="root">${safePageHtml}</div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>`;
}