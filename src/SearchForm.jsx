import { action } from "mobx";
import React from "react";
import { useState } from "react";

export function SearchForm(props) {
  const [searchQuery, setSearchQuery] = useState("");
  let searchBook = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchQuery("");
      props.fetchBooks(searchQuery);
    }
  };
  return (
    <form className="searchForm" onSubmit={searchBook}>
      <label> Поиск в библиотеке </label> <br />
      <input
        value={searchQuery}
        placeholder="Введите название или автора"
        onInput={(event) => setSearchQuery(event.target.value)}
      ></input>
      <button className="myBotton">Найти</button>
      <div>
        <select>
          <option>all</option>
          <option>art</option>
          <option>biography</option>
          <option>computers</option>
          <option>history</option>
          <option>medicall</option>
          <option>poetry</option>
        </select>

        <input
          type="radio"
          name="selection"
          onChange={action(() => props.selectBy("relevance"))}
          id="relevance"
          value="selection_relevance"
        />
        <label htmlFor="relevance">relevance</label>
        <input
          type="radio"
          name="selection"
          onChange={action(() => props.selectBy("newest"))}
          id="newest"
          value="selection_newest"
        />
        <label htmlFor="newest">newest</label>
      </div>
    </form>
  );
}
