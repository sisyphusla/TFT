import './App.css'
import Header from './components/header'
import List from './components/list'
import Footer from './components/footer'
import { Analytics } from '@vercel/analytics/react';

function App() {


  return (
    <div className='app'>
      <Header />
      <List />
      <Footer />
      <Analytics />
    </div>
  )
}

export default App
