import './App.css'
import Header from './components/header'
import Footer from './components/footer'
import { Analytics } from '@vercel/analytics/react';
import TabsComponent from './components/tabs'


function App() {


  return (
    <div className='app'>
      <Header />
      <TabsComponent />
      <Footer />
      <Analytics />
    </div>
  )
}

export default App
