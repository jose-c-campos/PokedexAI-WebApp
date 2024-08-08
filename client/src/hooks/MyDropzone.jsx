import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

function MyDropzone({ onFileUpload }) {

  // CALLBACK FUNCTION PROPOGRATES UPLOADED FILES UP TO LEFT COMPONENT

  const handleFile = useCallback((files) => {
  if (files.length === 1) {
    const file = files[0];
    const formData = new FormData();
    formData.append('file', file);
    onFileUpload(formData);
  } else {
    console.error('Please upload exactly one file.');
  }
}, [onFileUpload]);

  // CALLBACK FUNCTION PROPOGRATES DROPPED FILES UP TO LEFT COMPONENT

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length === 1) {
      const file = acceptedFiles[0]
      const formData = new FormData()
      formData.append('file', file)
      onFileUpload(formData)
    } else {
      console.error('Please upload exactly one file.');
    }
    }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    multiple: false,
  })

  return (

    // DROPZONE ALLOWING USERS TO DRAG N DROP IMAGES OR UPLOAD FILES

        <div className="flex justify-center">
          <div className="
          flex relative border-2 border-black rounded-md 
          justify-center place-items-center text-white bg-slate-900 cursor-pointer
          w-[320px] h-[160px] text-sm text-center
          sm:w-[200px] sm:h-[100px] sm:text-xs
          md:w-[620px] md:h-[270px] md:text-sm md:text-xl
          sideways:w-[300px] sideways:h-[160px] sideways:text-base
          lg:w-[400px] lg:h-[160px] lg:text-base
          xl:w-[470px] xl:h-[210px] lg:text-lg
          2xl:w-[600px] 2xl:h-[250px] 2xl:text-lg"
          {...getRootProps()}
          >
            <input {...getInputProps()} />
            {
              isDragActive ?
              <p>'Drop the files here ...</p> :
              <p>Drag 'n' drop Pokémon here, or click to select files</p>
            }
          </div>
        </div>
  )
}

export default MyDropzone;