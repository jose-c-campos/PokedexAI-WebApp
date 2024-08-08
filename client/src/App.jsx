import { useCallback, useState, useEffect, useRef } from 'react'
import Right from './components/Right'
import Left from './components/Left'
import { pokemonDatabase } from './constants/pokemonDatabase'
import sound from './assets/soundtracks/red_green.mp3'
import './index.css'
import axios from 'axios'

function App() {

  const [currentPokemonIndex, setCurrentPokemonIndex] = useState(151);
  const [musicIsPlaying, setMusicIsPlaying] = useState(false);
  const [prediction, makePrediction] = useState(null);
  const [descriptionPlaying, setDescriptionPlaying] = useState(false);
  const [dexterSpeaking, setDexterSpeaking] = useState(false);

  const audio = useRef(new Audio(sound));
  const descriptionAudio = useRef(null);

  const BACKEND_URL = process.env.NODE_ENV === 'production' ? ' https://pokedexai-4532d415c31e.herokuapp.com' : 'http://localhost:8080';


  // AFTER CLIENT UPLOADS/TAKES IMAGES, POKEMON IS RETURNED

  const handleFileUpload = async (formData) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/upload`, formData)
      
        const number = response.data.number
        const prediction = response.data.prediction

        setCurrentPokemonIndex(response.data.number)
        
        const pokemonInfo = pokemonDatabase[number]

        // Stop the previous audio if it's playing
        if (descriptionAudio.current) {
          descriptionAudio.current.pause();
          descriptionAudio.current.currentTime = 0;
        }
        
        descriptionAudio.current = new Audio(pokemonInfo.description_audio)

        descriptionAudio.current.addEventListener('ended', () => {
          setDexterSpeaking(false);
        });

        setDexterSpeaking(true)
        descriptionAudio.current.play()
        setDescriptionPlaying(true)

    } catch (error) {
      console.error('Error:', error.response.data);
    }
  };

  // MANAGES AUDIO CONTROL OF DEXTER'S AUDIO DESCRIPTIONS
  
  useEffect(() => {
    if (descriptionAudio.current) {
      descriptionAudio.current.pause();
      descriptionAudio.current.currentTime = 0;
      setDexterSpeaking(false);
    }
  }, []);
  
  // TOGGLES POKEMON DATABASE FORWARD/BACKWARD

  const handleNext = (e) => {
    e.preventDefault()
    if (currentPokemonIndex < pokemonDatabase.length - 2) {
      setCurrentPokemonIndex(currentPokemonIndex + 1);
    }
    else {
      setCurrentPokemonIndex(0)
    }
  };

  const handlePrevious = (e) => {
    e.preventDefault()
    if (currentPokemonIndex > 0) {
      setCurrentPokemonIndex(currentPokemonIndex - 1);
    }
    else {
      setCurrentPokemonIndex(150)
    }
  };

  // HANDLES GAP BETWEEN FIRST AND LAST POKEMON IN DATABASE
  
  const handleSearch = (searchTerm) => {
    const index = pokemonDatabase.findIndex(
      pokemon => pokemon.pokemon.toLowerCase() === searchTerm.toLowerCase()
    )
    setCurrentPokemonIndex(index !== -1 ? index : 151)
  };

  return (
    <div className="flex justify-center w-[calc(100dvw)] h-[calc(100dvh)]">
      <div className="
      w-[calc(100dvw)]
      xl:w-[80%]"
      >
        <div className="
        flex flex-col 
        sideways:flex-row
        xl:flex-row"
        >
          <Left className="" 
          onPrevious={handlePrevious} onNext={handleNext} 
          currentPokemonIndex={currentPokemonIndex} onSearch={handleSearch} 
          prediction={prediction} dexterSpeaking={dexterSpeaking} 
          setDexterSpeaking={setDexterSpeaking}
          />
          <Right className=""
          onSearch={handleSearch}
          onFileUpload={handleFileUpload} 
          />
        </div>
      </div>
    </div>
  )
}

export default App
