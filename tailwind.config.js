/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}', // 包括 pages 目錄下的所有 JavaScript 和 JSX 文件
    './renderer/**/*.{js,jsx,ts,tsx}', // 包括 renderer 目錄下的所有 JavaScript 和 JSX 文件
    './public/**/*.html', // 如果您在 public 目錄下有使用 HTML 文件
    './components/**/*.{js,jsx,ts,tsx}', // 如果 components 目錄下有使用 Tailwind 的地方
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
