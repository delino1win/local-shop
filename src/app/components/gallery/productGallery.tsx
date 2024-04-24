"use client"

import { useState } from "react";

export default function ProductGallery({images}: {images: Product['images']}) {

  const [chosenImg, setChosenImg] = useState(images[0])

  function displayImageOnClick (img: string) {
    setChosenImg(img)
  }

  return (
    <div className="flex flex-col items-center gap-4 bg-opacity-70">
      <div>
        <img
          className="h-[500px] w-[500px] rounded-lg object-contain"
          src={chosenImg}
          alt=""
        />
      </div>
      
      <div className="flex flex-row justify-evenly gap-2 w-[500px] overflow-y-auto scroll-m-0 shrink">
      {images.map((img) => (
        <div key={img} className="bg-transparent" onClick={() => displayImageOnClick(img)}>
        <img
          className="h-[120px] w-[130px] rounded-lg object-contain"
          src={img}
          alt=""
        />
      </div>
      ))}
      </div>
    </div>
  );
}
