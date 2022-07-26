import React, { useState, useEffect } from "react";

const useImage = ({ src }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
  }, [src]);
  return loaded;
};

const MinigameImage = ({ src, alt }) => {
  const { loaded } = useImage({ src });
  return (
    <img
      className={`first-impression-image-act ${loaded}`}
      src={src}
      alt={alt}
    />
  );
};

export default MinigameImage;
