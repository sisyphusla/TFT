import './App.css'
import Header from './components/header'
import Footer from './components/footer'
import TabsComponent from './components/tabs'



function App() {


  return (
    <div className="app min-h-screen bg-hero-pattern bg-contain bg-image-opacity">
      <Header />
      <TabsComponent />
      <Footer />
    </div>
  )
}

export default App

