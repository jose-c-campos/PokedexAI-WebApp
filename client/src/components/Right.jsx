import React, { useState, useEffect, useRef, useCallback } from 'react'
import MyDropzone from '../hooks/MyDropzone'
import Camera from './Camera.jsx'
import camera_icon from '../assets/visuals/camera.jpg'

import {
  anime,
  black_white,
  gold_silver,
  diamond_pearl,
  heartgold_soulsilver,
  pokemon_go,
  red_green,
  ruby_sapphire,
  scarlet_violet,
  x_y,
} from '../assets/soundtracks/index.js'

const Right = ({onFileUpload}) => {

  const [currentAudioIndex, setCurrentAudioIndex] = useState(null);
  const [cameraOn, setCameraOn] = useState(false);
  const audioRefs = useRef([]);
  const webcamRef = useRef(null);

  const toggleCamera = () => {
    setCameraOn(!cameraOn)
  };

  const audios = [
    red_green,
    gold_silver,
    ruby_sapphire,
    diamond_pearl,
    heartgold_soulsilver,
    black_white,
    x_y,
    pokemon_go,
    scarlet_violet,
    anime,
  ];

  // MANAGES MUSIC PLAY/PAUSE FUNCTIONALITY 

  const handleAudio = (index) => {
    if (currentAudioIndex !== null && audioRefs.current[currentAudioIndex]) {
      audioRefs.current[currentAudioIndex].pause();
      audioRefs.current[currentAudioIndex].currentTime = 0;
    }
    if (currentAudioIndex === index) {
      audioRefs.current[index].pause();
      setCurrentAudioIndex(null);
    } else {
      audioRefs.current[index].play();
      setCurrentAudioIndex(index);
    }
  };
    
  // CONVERTS WEBCAM IMAGES INTO PROCESSABLE DATA

  const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  // HANDLES CAMERA FUNCTIONALITY, ALLOWING USERS TO TAKE PHOTOS

  const handleCapture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        const file = dataURLtoFile(imageSrc, 'screenshot.jpg');
        const formData = new FormData();
        formData.append('file', file);
        onFileUpload(formData);
      }
    }
  };
    
  return (

    // BELOW REPRESENTS THE ENTIRE RIGHT SIDE OF THE POKEDEX INTERFACE

    <div className="h-[calc(90dvh)] w-[calc(100dvw)] border-[15px] border-red-800 bg-red-500
    md:h-[calc(100dvh)]
    sideways:h-[calc(100dvh)] sideways:w-[calc(50dvw)] sideways:border-l-[10px]
    lg:w-[calc(100dvw)] lg:h-[calc(100dvh)] lg:border-[20px] lg:border-l-[10px]
    xl:h-[calc(100dvh)] xl:w-[50%] xl:border-l-[15px] xl:border-[20px]
    ">
      <div className="flex">
        <div className="w-[100%] relative">
          <div id="top-cutout" className="flex flex-col ">
            <div className="
            w-[40%] h-2 bg-red-800 self-start mt-[60px]
            md:h-4 md:mt-[70px]
            sideways:w-[41%]
            lg:mt-[104px]
            "/>
            <div id="middle-div" className="
            bg-red-800 h-2 mt-[79px] w-[46px] absolute
            md:h-4 md:mt-[93px] md:w-[62px] md:ml-[10px]
            sideways:ml-0
            lg:mt-[127px]
            2xl:ml-[12px]
            " 
              style={{left: '35%', transform: 'rotate(90deg'}}/>
            <div className="
            border-l-0 w-[60%] h-2 bg-red-800 mt-[30px] relative self-end
            md:h-4
            sideways:w-[59%]
            "/>
          </div>

          {/* DRAP & DROP IMAGES AREA USING DROPZONE HOOK */}

          <div className="h-fit mt-[60px]
          md:mt-[70px]
          sideways:mt-[30px]
          lg:mt-[40px]
          xl:mt-[40px]
          2xl:mt-[50px]
          ">
            {cameraOn ?
              <Camera ref={webcamRef} /> : <MyDropzone onFileUpload={onFileUpload}/>
            }
            
          </div>

          {/* GRID OF BLUE BUTTONS W MUSIC FUNCTIONALITY */}

          <div className="flex justify-center
          mt-4
          md:mt-6
          sideways:hidden
          lg:flex
          xl:mt-8
          ">
            <div className="grid grid-cols-5 border-black rounded-md border-2">
            {audios.map((audioSrc, index) => (
              <div key={index} className="
              bg-sky-500 round-tl-md border-black border-2 cursor-pointer
              w-14 h-9
              sm:w-9 sm:h-5
              md:w-28 md:h-16
              lg:w-16 lg:h-10 
              xl:w-20 xl:h-14
              2xl:w-24 2xl:h-15" >
                <audio ref={el => audioRefs.current[index] = el} src={audioSrc} preload="auto"/>
                <button onClick={() => handleAudio(index)} className="w-full h-full">
                </button>
              </div>
             ))}
            </div>
          </div>

          {/* BELOW GRID OF BUTTONS: DECORATIVE SLATE DOTS AND SLITS*/}

          <div id="rectangles" className="relative flex flex-row
          sideways:hidden
          lg:flex
          ">
            <div className="flex justify-start gap-2 ml-[10%] mt-[20px]
            md:gap-4 md:mt-[28px]
            lg:mt-[20px] lg:ml-[12%]
            2xl:gap-6
            ">
              <div className="h-[10px] w-[10px] bg-slate-900 border-[1px] border-black rounded-full
              sm:h-[10px] sm:w-[10px]
              md:h-[16px] md:w-[16px]
              lg:h-[14px] lg:w-[14px]
              xl:h-[16px] xl:w-[16px]
              " />
              <div className="h-[10px] w-[10px] bg-slate-800 border-[1px] border-black rounded-full
              sm:h-[10px] sm:w-[10px]
              md:h-[16px] md:w-[16px]
              lg:h-[14px] lg:w-[14px]
              xl:h-[16px] xl:w-[16px]
              " />
            </div>
            <div className="flex justify-end ml-[140px]">
              <div className="flex mr-[15%] gap-4 mt-[22px]
              sm:mt-4 sm:ml-4
              md:ml-[250px] md:mt-[32px]
              lg:ml-16 lg:mt-6
              xl:ml-18
              2xl:ml-48 2xl:mt-[24px]
              ">
                <div className="w-[70px] h-[7px] bg-slate-900 border-[1px] border-black rounded-md
                sm:w-[45px] sm:h-[6px] 
                md:w-[100px] md:h-[10px] 
                lg:w-[80px] lg:h-[10px] 
                xl:w-[100px] xl:h-[10px] 
                2xl:w-[110px] 2xl:h-[11px] 
                " />
                <div className="w-[70px] h-[7px] bg-slate-900 border-[1px] border-black rounded-md
                sm:w-[45px] sm:h-[6px] 
                md:w-[100px] md:h-[10px]
                lg:w-[80px] lg:h-[10px]
                xl:w-[100px] xl:h-[10px]
                2xl:w-[110px] 2xl:h-[11px] 
                " />
              </div>
            </div>
            
          </div>

          {/* BELOW DECORATIVE SLATE DOTS AND SLITS: WHITE BUTTONS AND YELLOW CIRCLE */}

            <div className="flex flex-row relative mt-[40px]
            md:mt-[60px]
            sideways:hidden
            lg:flex lg:mt-[35px]
            xl:mt-[15px]
            xl:mt-[35px]
            "> 
              <div className="grid grid-cols-2 ml-[50px]
              md:ml-[100px]
              lg:ml-0 lg:ml-[70px]
              2xl:ml-[100px]
              ">
                <div className="w-12 h-12 bg-gray-100 border-black border-[1px] border-t-2 border-l-2 border-b-2 rounded-sm cursor-pointer flex justify-center place-items-center
                md:w-16 md:h-16
                lg:w-12 lg:h-12
                2xl:w-14 2xl:h-14
                " onClick={handleCapture}
                >
                  {/* WHITE CAMERA BUTTON ONLY APPEARS IF CAMERA IS ON */}

                  {cameraOn ? <img src={camera_icon} className="justify-center w-8 h-8
                   2xl:w-9 2xl:h-9
                  "
                  /> : <></>
                  }
                  
                </div>
                <div className="w-12 h-12 bg-gray-100 border-black border-[1px] border-t-2 border-r-2 border-b-2 rounded-sm
                md:w-16 md:h-16
                lg:w-12 lg:h-12
                2xl:w-14 2xl:h-14
                " />
              </div>
              <div className="flex relative ml-[120px] mt-[5px]
              md:ml-[320px] md:mt-[10px]
              lg:ml-[200px]
              2xl:ml-[300px] 2xl:mt-[14px]
              ">

                {/* YELLOW BUTTON THAT TOGGLES BACK AND FORTH BETWEEN DROPZONE AND CAMERA */}

                <div className="flex" onClick={toggleCamera}>
                  <div className="w-10 h-10 rounded-full bg-yellow-500 border-2 border-black cursor-pointer
                  md:w-12 md:h-12
                  lg:w-8 lg:h-8
                  " />
                </div>
              </div>
            </div>
            
          {/* BOTTOM TWO RECTANGLES W NAME AND LINK TO BLOG */}

          <div className="flex justify-center
          sideways:hidden
          lg:flex
          ">
            <div className="grid grid-cols-2 gap-[15px] mt-[50px] place-items-center place-content-center
            md:gap-[50px]
            lg:gap-[30px] lg:mt-[30px]
            2xl:mt-[50px] 2xl:gap-[60px]
            ">
              <a className="flex w-[165px] h-[85px] bg-slate-900 rounded-md text-white text-sm text-center place-content-center cursor-pointer
              md:w-[280px] md:h-[110px] md:text-xl
              lg:w-[190px] lg:h-[80px] lg:text-base
              xl:w-[220px] xl:h-[90px] xl:mt-[0px]
              2xl:w-[260px] 2xl:h-[100px]
              "
              href="https://www.linkedin.com/in/jose-c-campos"
              >
                <p className="place-content-center">Created by:<br />Jose C Campos</p>
                
              </a>
              <a className="flex w-[165px] h-[85px] bg-slate-900 rounded-md text-white text-sm text-center place-content-center cursor-pointer
              md:w-[280px] md:h-[110px] md:text-xl
              lg:w-[190px] lg:h-[80px] lg:text-base
              xl:w-[220px] xl:h-[90px] xl:mt-
              2xl:w-[260px] 2xl:h-[100px]
              "
              href="https://jose-c-campos.medium.com/pok%C3%A9dexai-how-i-created-the-first-working-digital-pok%C3%A9dex-from-scratch-18f426cd84db?source=friends_link&sk=a0fba3325dbaeb956364bb0770128c28"
              >
                <p className="place-content-center">About PokédexAI</p>
              </a>
            </div>
          </div>
            
          
          </div>
      </div>

      

    </div>

  )
}

export default Right