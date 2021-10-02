import "./App.css";
import { SearchForm } from "./SearchForm";
import React from "react";
import BooksList from "./BooksList";
import { observer } from "mobx-react";
import { action } from "mobx";

const App = observer(({ store }) => {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Google library</h2>
      </header>
      <div className="container">
        <SearchForm fetchBooks={store.fetchBooks} selectBy={store.selectBy} />
        {store.isFetching && (
          <div className="lds-facebook">
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
        {store.totalItems > 0 && !store.isFetching && <div>{store.answer}</div>}
        {store.books ? <BooksList books={store.books} /> : store.answer}
        {store.hasNextPage &&
          (store.isFetching ? (
            <div className="lds-facebook">
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            <button
              className="myBotton"
              onClick={action(() => store.loadMoreBooks())}
            >
              Загрузить еще
            </button>
          ))}
      </div>
      <footer className="footer">footer</footer>
      {/* <BookPage /> */}
    </div>
  );
});

export default App;
