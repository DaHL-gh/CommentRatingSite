import React, { useState, useEffect } from 'react';

const TypingAnimation = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setDisplayedText('');
    setIndex(0);
  }, [text]);

  useEffect(() => {
    if (index < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prevIndex) => prevIndex + 1);
      }, 50); 

      return () => clearTimeout(timeoutId);
    }
  }, [text, index]);

  return <span>{displayedText}</span>;
};

export default TypingAnimation;