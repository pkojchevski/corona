import React, { useState } from "react";

import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

import { ReactComponent as SearchIcon } from "../assets/images/search.svg";

import { COUNTRIES } from "../utils/countries.js";
import { useCoronaGlobalValues } from "../context";

const Search = ({ handleShow, handleCountry, handleTotal }) => {
  const { coronaGlobal, countries } = useCoronaGlobalValues();
  const [autocomplete, setAutocomplete] = useState({
    // The active selection's index
    activeSuggestion: 0,
    // The suggestions that match the user's input
    filteredSuggestions: [],
    // Whether or not the suggestion list is shown
    showSuggestions: false,
    // What the user has entered
    userInput: ""
  });

  const onChange = e => {
    const suggestions = countries;
    const userInput = e.currentTarget.value;
    const filteredSuggestions = suggestions.filter(sugg => {
      return (
        sugg
          .toLowerCase()
          .trim()
          .indexOf(userInput.toLowerCase().trim()) > -1
      );
    });
    setAutocomplete({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  const onClick = e => {
    setAutocomplete({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
    handleShow();
    handleCountry(e.currentTarget.innerText);
    handleTotal(
      [...coronaGlobal]
        .filter(item => item.Country === e.currentTarget.innerText)
        .map(item => item.total)
    );
    setTimeout(() => {
      setAutocomplete({ userInput: "" });
    }, 500);
  };

  const onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = autocomplete;

    // enter
    if (e.keyCode === 13) {
      setAutocomplete({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
      handleShow();
      handleCountry(filteredSuggestions[activeSuggestion]);
      handleTotal(
        [...coronaGlobal]
          .filter(item => item.Country === e.currentTarget.innerText)
          .map(item => item.total)
      );
      setTimeout(() => {
        setAutocomplete({ userInput: "" });
      }, 500);
    }
    // up arrow
    if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      setAutocomplete({
        ...autocomplete,
        activeSuggestion: activeSuggestion - 1
      });
    }

    // down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      setAutocomplete({
        ...autocomplete,
        activeSuggestion: activeSuggestion + 1
      });
    }
  };

  const {
    activeSuggestion,
    showSuggestions,
    userInput,
    filteredSuggestions
  } = autocomplete;
  let suggestionsListComponent;

  if (showSuggestions && userInput) {
    if (filteredSuggestions.length) {
      suggestionsListComponent = (
        <ul className="suggestions">
          {filteredSuggestions.map((suggestion, index) => {
            let className;

            // Flag the active suggestion with a class
            if (index === activeSuggestion) {
              className = "suggestion-active";
            }

            return (
              <li className={className} key={suggestion} onClick={onClick}>
                {suggestion}
              </li>
            );
          })}
        </ul>
      );
    } else {
      suggestionsListComponent = (
        <div className="no-suggestions">
          <em>No suggestions, you're on your own!</em>
        </div>
      );
    }
  }
  return (
    <div className="search-input">
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">
            <SearchIcon width="20px" height="20px" />
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder="Search Countries..."
          aria-label="Search"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      {/* <input
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={userInput}
      /> */}
      {suggestionsListComponent}
    </div>
  );
};

export default Search;
