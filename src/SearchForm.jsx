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
    </form>
  );
}
