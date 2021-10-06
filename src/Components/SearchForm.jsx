import { action } from 'mobx'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useState } from 'react'

const SearchForm = observer((props) => {
  const [searchQuery, setSearchQuery] = useState('')
  const searchBook = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setSearchQuery('')
      props.fetchBooks(searchQuery)
    }
  }
  const handleChange = (e) => {
    props.selectCategory(e.target.value)
  }
  return (
    <form className="searchForm" onSubmit={searchBook}>
      <label id="search-label"> Поиск в библиотеке </label> <br />
      <div className="search_panel">
        <input
          autoFocus
          value={searchQuery}
          placeholder="название или имя автора"
          onInput={(event) => setSearchQuery(event.target.value)}
        ></input>
        <label>
          <input type="checkbox" onChange={props.libraryStore.searchByToggle} />
          по автору
        </label>
        <button className="myBotton">Найти</button>
      </div>
      <div className="search_bottom">
        <select onChange={handleChange}>
          <option value="All">все категории</option>
          <option value="Art">искусство</option>
          <option value="Biography">биография</option>
          <option value="Computers">компъютеры</option>
          <option value="History">история</option>
          <option value="Medicall">медицина</option>
          <option value="Poetry">поэзия</option>
        </select>
        <label htmlFor="relevance">
          <input
            type="radio"
            name="selection"
            onChange={action(() => props.selectBy('relevance'))}
            id="relevance"
            value="selection_relevance"
          />
          актуальные
        </label>
        <label htmlFor="newest">
          <input
            type="radio"
            name="selection"
            onChange={action(() => props.selectBy('newest'))}
            id="newest"
            value="selection_newest"
          />
          новые
        </label>
      </div>
      {props.libraryStore.isFetching ? (
        <div className="lds-facebook">
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <div>{props.libraryStore.answer}</div>
      )}
    </form>
  )
})
export default SearchForm
