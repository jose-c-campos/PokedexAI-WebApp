import React, { useState, useEffect } from 'react'
import { pokemonDatabase } from '../constants/pokemonDatabase'
import d_pad from '../assets/visuals/d_pad.png'
import AudioGif from './AudioGif';

const typeColors = {
  Grass: 'bg-green-500',
  Poison: 'bg-purple-500',
  Fire: 'bg-red-500',
  Water: 'bg-blue-500',
  Bug: 'bg-lime-500',
  Flying: 'bg-sky-500',
  Normal: 'bg-gray-500',
  Electric: 'bg-yellow-500',
  Ground: 'bg-yellow-700',
  Fairy: 'bg-pink-500',
  Fighting: 'bg-red-700',
  Psychic: 'bg-pink-700',
  Rock: 'bg-yellow-900',
  Steel: 'bg-gray-700',
  Ice: 'bg-blue-300',
  Ghost: 'bg-purple-700',
  Dragon: 'bg-indigo-500',
};

const Left = ({onPrevious, onNext, currentPokemonIndex, onSearch, dexterSpeaking}) => {

  const [cardVisible, setCardVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const currentPokemon = pokemonDatabase[currentPokemonIndex];

  // HANDLES SUBMISSIONS IN GREEN SEARCH BOX

  const handleChange = (e) => {
      setSearchTerm(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };
  
  // TOGGLES DISPLAY OF SPRITE AND POKEMON CARD

  const handleClick = () => {
    if (currentPokemonIndex != 151) {
      setCardVisible(~cardVisible)
    }
  };


  return (
    
    // BELOW REPRESENTS THE ENTIRE LEFT SIDE OF THE POKEDEX INTERFACE

    <div className="
    w-[calc(100dvw)] h-[calc(90dvh)] border-[15px] border-red-800 bg-red-500
    sideways:h-[calc(100dvh)] sideways:w-[calc(50dvw)] sideways:border-r-[10px]
    lg:w-[calc(100dvw)] lg:h-[calc(100dvh)] lg:border-[20px] lg:border-r-[10px]
    xl:h-[calc(100dvh)] xl:w-[50%] xl:border-r-[15px] xl:border-[20px]
    ">
      <div className="flex relative">

      {/* TOP-LEFT OF PAGE: Blue light and traffic lights */}

      <div id="blue-light" className="
      w-8 h-8 border-2
      md:w-12 md:h-12
      lg:w-20 lg:h-20 lg:border-4
      mt-6 ml-4 bg-cyan-400 rounded-full"
      />
        <div id="traffic-lights" className="flex">
          <div id="red-light" className="
          w-4 h-4 mt-6 ml-4
          lg:w-6 lg:h-6 lg:mt-8 lg:ml-6
          ml-6 border-[1px] border-black rounded-full bg-red-800"
          />
          <div id="yellow-light" className="
          w-4 h-4 mt-6 ml-2
          lg:w-6 lg:h-6 lg:mt-8 lg:ml-6
          ml-6 border-[1px] border-black rounded-full bg-amber-400"
          />
          <div id="green-light" className="
          w-4 h-4 mt-6 ml-2
          lg:w-6 lg:h-6 lg:mt-8 lg:ml-6
          ml-6 border-[1px] border-black rounded-full bg-green-900"
          />
        </div>
      </div>

      {/* BELOW TRAFFIC LIGHTS: DARK RED CUTOUT DESIGN THAT ADDS SHAPE AND DIMENSION TO UI */}

      <div id="top-cutout" className="flex flex-col relative">
        <div className="
        w-[41%] bg-red-800 self-end h-2
        md:h-4"
        />
        <div id="middle-div" className="
        bg-red-800 h-2 w-[42px] mt-[34px] transform origin-bottom-left absolute
        md:h-4 md:w-[62px] md:mt-[46px]" 
        style={{left: '60%', transform: 'rotate(270deg)'}}
        />
        <div className="
        w-[60%] h-2 bg-red-800 relative mt-[30px] rounded-br-sm
        md:h-4"
        />
      </div>

      {/* POKEDEX MAIN SCREEN: wrapped by a white border */}

      <div className="
      flex flex-col sideways:flex-row sideways:ml-[40px]
      lg:flex-col lg:ml-0
      xl:mt-[20px]
      2xl:mt-[40px]"
      >
        <div className="flex justify-center">
          <div className="
          h-80 w-80 border-[16px] border-white mt-[70px] rounded-bl-[8px] border-b-[16px] rounded-sm
          sm:h-52 sm::w-52
          md:h-[450px] md:w-[450px]
          sideways:h-40 sideways:w-48 sideways:mt-[30px]
          lg:h-80 lg:w-96
          xl:h-[387px] xl:w-[380px] lg:border-[30px] lg:rounded-bl-[48px] lg: border-b-[70px] 
          2xl:w-[450px]
          relative mt-[8%]"
          style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 10% 100%, 0% 90%)' }}
          >

            {/* SHOW POKEMON CARD OR SPRITE TURNARY OPERATION */}

            {cardVisible ? (

              // SHOW CARD FROM ASSETS FOLDER

              <div id="card" className="flex justify-center bg-white">
                <img className="
                cursor-pointer w-[80%] h-[280px]
                sm:w-[100.1px] sm:h-[145.25px]
                sideways:w-24 sideways:h-32
                md:w-[300px] md:h-[390px]
                lg:w-[205.4px] lg:h-[273px]
                xl:w-[240px] xl:h-[332px]" 
                src={currentPokemon.card} 
                alt={currentPokemon.card}
                onClick={handleClick}
                />
              </div>
            ) : ( 

              // ELSE SHOW SPRITE/GIF FROM POKEMON PROJECT W NAME, NUMBER & TYPE

              <div className="" id="gif_block">
                <div className="flex justify-center">
                  <div className="
                  bg-slate-900 w-full h-[260px]
                  sm:h-36
                  sideways:h-32
                  md:h-[380px]
                  lg:h-[260px]
                  xl:h-[330px]"
                  >

                    {/* POKEMON NAME AND NUMBER FROM POKEMON DATABASE IN CONSTANTS FOLDER*/}

                    <div className="flex flex-col">
                      <div id="name" className="flex justify-center">
                        <h2 className="
                        text-white font-bold text-xl mt-[20px]
                        sideways:text-sm sideways:mt-[10px]
                        md:text-3xl md:mt-[30px]
                        lg:text-xl lg:mt-[20px]
                        xl:text-2xl xl:mt-[25px]"
                        > 
                        {
                          currentPokemonIndex ===  151 
                          ? <div></div>
                          : <div>{currentPokemon.pokemon}: #{currentPokemon.number} </div>                         
                        }
                        </h2>
                      </div>
                    </div>

                    {/* POKEMON SPRITE FROM POKEMON PROJECT */}

                    <div className="flex justify-center">
                      {
                        currentPokemonIndex === 151
                        ? <img id="gif" className="
                        cursor-pointer self-center w-[190px] h-[190px] mt-[10px]
                        sm:w-[75px] sm:h-[75px] sm:mt-[10px]
                        sideways:w-[100px] sideways:h-[100px] sideways:mt-[5px]
                        md:w-[230px] md:h-[230px] md:mt-[40px]
                        lg:w-[190px] lg:h-[190px] lg:mt-[15px]
                        xl:w-[220px] xl:h-[220px] xl:mt-[30px]" 
                        src={currentPokemon.gif} 
                        alt={currentPokemon.pokemon}
                        />
                        : <img id="gif" className="
                        cursor-pointer self-center w-[150px] h-[150px] mt-[10px]
                        sm:w-[75px] sm:h-[75px] sm:mt-[10px]
                        sideways:w-[70px] sideways:h-[70px]
                        md:w-[200px] md:h-[200px] md:mt-[20px]
                        lg:w-[150px] lg:h-[150px] lg:mt-[10px]
                        xl:w-[180px] xl:h-[180px] xl:mt-[20px]" 
                        src={currentPokemon.gif} 
                        alt={currentPokemon.pokemon}
                        onClick={handleClick}
                        />

                      }
                      
                    </div>

                    {/* POKEMON TYPE FROM POKEMON DATABASE IN CONSTANTS FOLDER W CORRESPONDING BOX COLOUR */}
                  
                    <div id="type" className="
                    flex gap-4 justify-center
                    mt-[15px]
                    sm:mt-[10px] sm:gap-2
                    md:mt-[30px] md:gap-6
                    sideways:hidden
                    lg:mt-[18px] lg:gap-6 lg:flex
                    xl:mt-[22px] xl:gap-4 
                    ">
                      {currentPokemon.type.map((type, index) => (
                        <h3 key={index} 
                        className={`
                        rounded-md place-content-center text-center 
                        w-[100px] h-[20px] text-sm 
                        sm:w-[55px] sm:h-[13px] sm:text-[10px]
                        md:w-[140px] md:h-[30px] md:text-base
                        lg:w-[100px] lg:h-[20px] lg:text-sm
                        xl:w-[130px] xl:h-[27px] xl:text-base
                        ${typeColors[type] || 'bg-gray-400'}`}
                        >
                          {type}
                        </h3>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
              {/* <div id="description" className="justify-content-center w-[50%]">
                  <h4 className="">
                    {currentPokemon.description}
                  </h4>
              </div> */}
          </div>
        </div>
    

    {/* BELOW POKEDEX MAIN SCREEN */}

      <div className="flex relative justify-start">
        <div className="
          ml-[30px] mt-[40px]
          sm:ml-[30px] sm:mt-[15px]
          md:ml-[100px] md:mt-[35px]
          sideways:hidden
          lg:mt-[25px] lg:ml-[60px] lg:flex
          xl:mt-[30px] xl:ml-[50px]
          2xl:mt-[30px] 2xl:ml-[110px] 
          ">
          <button className="
          h-[40px] w-[40px] rounded-full bg-black cursor-pointer
          sm:h-[20px] sm:w-[20px]
          sideways:h-[30px] sideways:w-[30px]
          md:h-[50px] md:w-[50px]
          lg:h-[40px] lg:w-[40px] 
          xl:h-[50px] xl:w-[50px]"
          >
            <AudioGif dexterSpeaking={dexterSpeaking}/>
          </button>
        </div>

        {/* RED & BLUE SLITS: purely decorative */}

        <div className="flex flex-col">
          <div id="red-blue-rectangles" className="
          relative flex flex-row gap-4 
          sideways:hidden
          lg:flex"
          >
            <div className="
            w-[70px] h-[8px] mt-[30px] ml-[20px] bg-red-700 border-[1px] border-black rounded-md
            sm:w-[45px] sm:h-[6px] sm:mt-4 sm:ml-4
            md:w-[100px] md:h-[10px] md:mt-[30px] md:ml-[60px]
            lg:w-[80px] lg:h-[10px] lg:ml-6 lg:mt-6
            xl:w-[100px] xl:h-[10px] xl:ml-18 xl:mt-8
            2xl:w-[110px] 2xl:h-[12px] 2xl:ml-12"
            />
            <div className="
            w-[70px] h-[8px] mt-[30px] bg-blue-500 border-[1px] border-black rounded-md
            sm:w-[45px] sm:h-[6px] sm:mt-4
            md:w-[100px] md:h-[10px] md:mt-[30px]
            lg:w-[80px] lg:h-[10px] lg:mt-6
            xl:w-[100px] xl:h-[10px] xl:mt-8
            2xl:w-[110px] 2xl:h-[12px]"
            />
          </div>

        {/* SEARCH POKEMON FUNCTIONALITY: wrapped in green background */}

          <div className="
          flex flex-row
          sideways:flex-col
          lg:flex-row"
          > 
            <div className="
            flex relative justify-start
            w-[140px] h-[100px] mt-[40px] ml-[20px]
            sm:w-[70px] sm:h-[55px] sm:mt-6
            md:w-[220px] md:h-[120px] md:mt-8 md:ml-[60px]
            sideways:w-[140px] sideways:h-[70px] sideways:mt-[40px] sideways:ml-[15px]
            lg:w-[160px] lg:h-[100px] lg:mt-[30px] lg:ml-8
            xl:w-[200px] xl:h-[110px] xl:mt-[30px] xl:ml-[30px]
            2xl:w-[210px] 2xl:h-[120px] 2xl:mt-[70px] 2xl:ml-[60px]"
            >
              <form onSubmit={handleSubmit} className="w-full h-full">
                <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                placeholder="Search Pokémon!"
                className="
                text-xs border-[1px] border-black rounded-sm p-2 bg-green-400 text-center w-full h-full
                sm:text-[7px]
                md:text-base 
                lg:text-sm
                xl:text-base
                2xl:text-lg"
                />
              </form>
              {/* <button type="submit" className="p-2 bg-blue-500 text-white">Search</button> */}
            </div>

            {/* D-PAD with button control divs */}

            <div className="
            justify-center w-[110px] h-[140px] mt-[5px] ml-[15px]
            sm:w-[70px] sm:h-[87px] sm:mt-[12px]
            md:w-[150px] md:h-[195px] md:mt-[0px] md:ml-[70px]
            sideways:w-[100px] sideways:h-[130px] sideways:ml-[40px] sideways:mt-[10px]
            lg:w-[140px] lg:h-[160px] lg:ml-[20px] lg:mt-0
            xl:w-[160px] xl:h-[180px] xl:ml-[20px] xl:mt-0
            2xl:w-[180px] 2xl:h-[200px] 2xl:ml-[60px] 2xl:mt-[0px]"
            >
              <img src={d_pad} alt="D-Pad" className=""/>

              {/* Left Clickable Area */}

              <div className="
              absolute cursor-pointer w-8 h-6 top-[94px] left-[252px]
              sm:top-[66px] sm:left-[162px]
              md:top-[111px] md:left-[510px] md:w-10 md:h-8
              sideways:w-8 sideways:h-6 sideways:top-[165px] sideways:left-[47px]
              lg:top-[100px] lg:left-[320px] lg:w-10 lg:h-8
              xl:top-[117px] xl:left-[360px] xl:w-11 xl:h-9
              2xl:top-[128px] 2xl:left-[500px] 2xl:w-14 2xl:h-10"
              onClick={onPrevious}
              />

              {/* Right Clickable Area */}

              <div className="
              absolute cursor-pointer w-8 h-6 top-[94px] left-[310px]
              sm:top-[66px] sm:left-[202px]
              md:top-[111px] md:left-[594px] md:w-10 md:h-8
              sideways:w-8 sideways:h-6 sideways:top-[165px] sideways:left-[100px]
              lg:top-[99px] lg:left-[397px] lg:w-10 lg:h-8
              xl:top-[116px] xl:left-[450px] xl:w-11 xl:h-9
              2xl:top-[128px] 2xl:left-[595px] 2xl:w-14 2xl:h-10"
              onClick={onNext}
              />

              {/* Top Clickable Area */}

              <div className="
              absolute cursor-pointer w-6 h-8 top-[60px] left-[286px]
              sm:top-[46px] sm:left-[182px]
              md:top-[66px] md:left-[557px] md:w-8 md:h-10
              sideways:w-6 sideways:h-8 sideways:top-[134px] sideways:left-[77px]
              lg:top-[57px] lg:left-[364px] lg:w-8 lg:h-10
              xl:top-[69px] xl:left-[410px] xl:w-9 xl:h-11
              2xl:top-[72px] 2xl:left-[557px] 2xl:w-10 2xl:h-14" 
              onClick={handleClick}
              />

              {/* Bottom Clickable Area */}

              <div className="
              absolute cursor-pointer w-6 h-8 top-[120px] left-[286px]
              sm:top-[86px] sm:left-[182px]
              md:top-[148px] md:left-[557px] md:w-8 md:h-10
              sideways:w-6 sideways:h-8 sideways:top-[190px] sideways:left-[77px]
              lg:top-[132px] lg:left-[364px] lg:w-8 lg:h-10
              xl:top-[156px] xl:left-[410px] xl:w-9 xl:h-11
              2xl:top-[170px] 2xl:left-[557px] 2xl:w-10 2xl:h-14"
              onClick={handleClick}
              />
            </div>
          </div>
          
          </div>
        </div>
          
        <div>

        </div>
        
      </div>
    </div>
  )
}

export default Left