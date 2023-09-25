import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../src/App.jsx';
import fs from 'fs';
import path from 'path';

export default (req, res) => {
  try {
    const appString = ReactDOMServer.renderToString(<App />);

    // 获取构建目录中的文件
    const files = fs.readdirSync(path.join(process.cwd(), 'dist', 'assets'));
    const scriptFile = files.find(
      (file) => file.startsWith('index-') && file.endsWith('.js')
    );

    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>TFT Set9.5台服城邦衝分賽</title>
    </head>
    <body>
      <div id="root">${appString}</div>
      <script src="/dist/assets/${scriptFile}"></script>
    </body>
    </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error rendering app');
  }
};
