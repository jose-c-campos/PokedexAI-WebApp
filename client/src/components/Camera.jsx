import React, { forwardRef } from 'react'
import Webcam from "react-webcam"

const Camera = forwardRef((props, ref) => {
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };
    
  return (
    <div className="flex justify-center">
        <div className="flex relative">
            <Webcam
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="rounded-md w-[320px] h-[160px] text-sm text-center
            sm:w-[200px] sm:h-[100px] sm:text-xs
            md:w-[620px] md:h-[270px] md:text-sm md:text-xl
            sideways:w-[300px] sideways:h-[160px] sideways:text-base
            lg:w-[370px] lg:h-[160px] lg:text-base
            xl:w-[470px] xl:h-[210px] lg:text-lg
            2xl:w-[600px] 2xl:h-[270px] 2xl:text-lg"
            ref={ref}
            >
            </Webcam>
        </div>
    </div> 
  )
})
export default Camera