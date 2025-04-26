import { useState } from 'react'
import './App.css'
import Header from './layout/Header'
import MainContent from './layout/MainContent'
import Footer from './layout/Footer'
import Container from '@mui/material/Container';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Container maxWidth="xl">
        <Header />
        <MainContent />
      </Container >

    </>
  )
}

export default App
