"use client"

import React, { useState, useEffect } from 'react';

const AutoSuggestInput = () => {
    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [wordSelected, setWordSelected] = useState(false);

    const getCurrentWord = (text) => {
        const words = text.trim().split(/\s+/);
        return words[words.length - 1];
    };

    useEffect(() => {
        if (wordSelected) return; // Don't fetch if a word was just selected

        const currentWord = getCurrentWord(input);
        if (!currentWord) {
            setSuggestions([]);
            return;
        }

        const fetchSuggestions = async () => {
            try {
                const response = await fetch(`https://api.datamuse.com/sug?s=${currentWord}`);
                const data = await response.json();
                setSuggestions(data.map(item => item.word));
            } catch (err) {
                console.error('Failed to fetch suggestions', err);
            }
        };

        const delayDebounce = setTimeout(() => {
            fetchSuggestions();
        }, 300); // debounce

        return () => clearTimeout(delayDebounce);
    }, [input, wordSelected]);

    const handleInputChange = (e) => {
        setInput(e.target.value);
        setWordSelected(false); // User is typing again, allow suggestions
    };

    const handleSuggestionClick = (suggestion) => {
        const words = input.trim().split(/\s+/);
        words[words.length - 1] = suggestion;
        setInput(words.join(' ') + ' ');
        setSuggestions([]);
        setWordSelected(true); // Prevent suggestion fetch until next input
    };

    return (
        <div style={{ position: 'relative', width: '300px' }}>
            <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Type your message..."
                style={{ width: '100%', padding: '8px' }}
            />
            {suggestions.length > 0 && !wordSelected && (
                <ul style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    border: '1px solid #ccc',
                    backgroundColor: '#fff',
                    listStyle: 'none',
                    padding: '4px',
                    margin: 0,
                    zIndex: 1000
                }}>
                    {suggestions.map((word, i) => (
                        <li key={i}
                            onClick={() => handleSuggestionClick(word)}
                            style={{ padding: '4px', cursor: 'pointer' }}
                        >
                            {word}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AutoSuggestInput;
