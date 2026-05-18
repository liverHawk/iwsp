import { useState } from 'react'
import artistImg from './assets/artist.jpg'
import charImg from './assets/char.png'
import './App.css'

function App() {
  return (
    <>
      <div className="animated-bg">
        <div className="animated-bg-text">
          <div className="img-container">
            <img className="char-img" src={charImg} alt="character" />
          </div>
        </div>
        <div className="img-container">
          <img className="artist-img" src={artistImg} alt="artist" />
        </div>
      </div>
    </>
  )
}

export default App
