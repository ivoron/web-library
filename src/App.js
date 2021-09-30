import "./App.css";
import { SearchForm } from "./SearchForm";
import React from "react";
import BooksList from "./BooksList";
import { observer } from "mobx-react";

const App = observer(({ store }) => {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Google library</h2>
      </header>
      <div className="container">
        <SearchForm fetchBooks={store.fetchBooks} />
        {store.totalItems > 0 && store.answer}
        {store.books ? <BooksList books={store.books} /> : store.answer}
        {store.totalItems > 10 && (
          <button className="myBotton">Загрузить еще</button>
        )}
      </div>
      <footer className="footer">footer</footer>
      {/* <BookPage /> */}
    </div>
  );
});

export default App;
