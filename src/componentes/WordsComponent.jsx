import { useEffect, useState } from 'react';

const WordsComponent = ({ onWordsChange }) => {
  const [sFact, setFact] = useState('');

  useEffect(() => {
    const asyncFetchWords = async () => {
      try {
        const oResponse = await fetch('https://catfact.ninja/fact');
        const oData = await oResponse.json();
        const aWords = oData.fact.split(' ').slice(0, 4);
        setFact(aWords.join(' '));
        onWordsChange(aWords);
      } catch (error) {
        console.log(error);
      }
    };

    asyncFetchWords();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1 style={{textAlign: "center"}}>Las primeras cuatro palabras:</h1>
      <p style={{textAlign: "center"}}>{sFact}</p>
    </div>
  );
};

export default WordsComponent;
