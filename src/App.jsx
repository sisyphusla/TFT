import './App.css'
import Header from './components/header'
import List from './components/list'
import Footer from './components/footer'
import SEO from './components/seo'
import { Analytics } from '@vercel/analytics/react';
import TabsComponent from './components/tabs'

function App() {


  return (
    <div className='app'>
      <Header />
      <TabsComponent />
      <Footer />
      <Analytics />
      <SEO
        title="TFT Set9.5台服城邦衝分賽"
        description="Set9.5台服聯盟戰棋城邦衝分賽，總共分為四組，隊長皆為知名戰棋實況主，
        分別是花輪同學、圖奇奶王 綠茶、ToBeTerry、絕世拿鐵。每隊有一位隊長加上八位隊員所組成，隊員都是台服聯盟戰棋高端以及實況主。"
        keywords="TFT,戰棋,SET9.5 "

        ogUrl="https://tftrank.vercel.app/"
        ogImgUrl="https://tftrank.vercel.app/tftranksummarycard.png"


      />
    </div>
  )
}

export default App
