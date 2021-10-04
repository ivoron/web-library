import { action } from "mobx";
import React from "react";
import { useState } from "react";

export function SearchForm(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const searchBook = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchQuery("");
      props.fetchBooks(searchQuery);
    }
  };
  const handleChange = (e) => {
    props.selectCategory(e.target.value);
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
        <select onChange={handleChange}>
          <option value="All">все</option>
          <option value="Art">искусство</option>
          <option value="Biography">биография</option>
          <option value="Computers">компъютеры</option>
          <option value="History">история</option>
          <option value="Medicall">медицина</option>
          <option value="Poetry">поэзия</option>
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
