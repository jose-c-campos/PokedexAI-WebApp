import React from 'react'
import Audio from '../assets/visuals/audio.gif'
import No_Audio from '../assets/visuals/no_audio.png'

const AudioGif = ({ dexterSpeaking }) => {

  const handleClick = () => {
    dexterSpeaking = false
  }

  return (
    <div className="flex justify-center">
      {dexterSpeaking ? (
        <img src={Audio} className="
        rounded-full h-[30px] w-[30px]
        sm:w-[20px] sm:h-[20px]
        md:w-[32px] md:h-[32px]
        lg:w-[36px] lg:h-[36px]
        xl:w-[48px] xl:h-[48px]"
        onClick={handleClick}
        />
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default AudioGif