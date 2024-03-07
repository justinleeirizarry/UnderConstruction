"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const images = ["/coco.png", "/coco1.png", "/coco0.png", "/coco2.png"];

const ImageComponent = () => {
  const [randomImage, setRandomImage] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * images.length);

    setRandomImage(images[randomIndex]);
  }, []);

  return (
    <div className="w-36 rounded-lg overflow-hidden border border-black">
      {randomImage && (
        <Image
          src={randomImage}
          alt="good dog"
          width={400}
          height={400}
          objectFit="cover"
        />
      )}
    </div>
  );
};

export default ImageComponent;
