import React, { useState } from 'react';
import WordsComponent from './componentes/WordsComponent';
import GifComponent from './componentes/GifComponent';

const App = () => {
  const [cWords, setWords] = useState([]);

  const handleWordsChange = (newWords) => {
    setWords(newWords);
  };

  return (
    <div>
      <WordsComponent onWordsChange={handleWordsChange} />
      <GifComponent cWords={cWords} />
    </div>
  );
};

export default App;
