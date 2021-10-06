import SearchForm from './SearchForm'
import React from 'react'
import BooksList from './BooksList'
import { inject, observer } from 'mobx-react'
import { action } from 'mobx'

const Main = inject(
  'libraryStore',
  'bookStore'
)(
  observer((props) => {
    const { libraryStore } = props
    return (
      <div className="App">
        <header className="App-header">
          <h2>Google library</h2>
        </header>
        <div className="container">
          <SearchForm
            fetchBooks={libraryStore.fetchBooks}
            selectBy={libraryStore.selectBy}
            selectCategory={libraryStore.selectCategory}
            libraryStore={libraryStore}
          />
          {libraryStore.totalItems > 0 && (
            <BooksList
              history={props.history}
              books={libraryStore.filtredBooks}
              setUrl={props.bookStore.setUrl}
            />
          )}
          {libraryStore.hasNextPage &&
            (libraryStore.isFetching ? (
              <div className="lds-facebook">
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : (
              <button
                className="myBotton"
                onClick={action(() => libraryStore.loadMoreBooks())}
              >
                Загрузить еще
              </button>
            ))}
        </div>
        <footer className="footer">footer</footer>
      </div>
    )
  })
)

export default Main
