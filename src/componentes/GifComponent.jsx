import React, { useEffect, useState } from 'react';

const GifComponent = ({ cWords }) => {
  const [cGifUrl, setCgifUrl] = useState('');
  const cApiKey = 'XrhlhNkC54XUvG0UDVbWFWVNJuddJvta'; // Tu clave de API

  useEffect(() => {
    const asyncFetchGif = async () => {
      try {
        const aTags = cWords.map(word => encodeURIComponent(word));
        const sTagString = aTags.join('+');
        const oGifResponse = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${cApiKey}&tag=${sTagString}`);
        const oGifData = await oGifResponse.json();
        const cGifUrl = oGifData.data.images.downsized_large.url;
        setCgifUrl(cGifUrl);
      } catch (error) {
        console.log(error);
      }
    };

    asyncFetchGif();
  }, [cWords]);

  return (
    <div style={{textAlign: "center"}}>
      {cGifUrl ? (
        <img  style={{textAlign: "center"}} src={cGifUrl} alt="GIF" />
      ) : (
        <p style={{textAlign: "center"}}>Cargando GIF...</p>
      )}
    </div>
  );
};

export default GifComponent;
