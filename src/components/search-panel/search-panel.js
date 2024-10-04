import React, { useState } from 'react';

import './search-panel.css';


const SearchPanel = ({ onSearchChange }) => {

    const [ term, setTerm ] = useState('')

    const onSearchChangeHandler = (e) => {
        const newTerm = e.target.value;
        setTerm(newTerm);
        onSearchChange(newTerm);
    };

        return (
            <input type="text"
                   className="form-control search-input"
                   placeholder="type to search"
                   value={term}
                   onChange={onSearchChangeHandler}
            />
        );
};

export default SearchPanel