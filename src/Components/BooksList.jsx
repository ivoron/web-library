import React from 'react'
import { BookItem } from './BookItem'

export default function BooksList(props) {
  return (
    <>
      {props.books.map((book) => (
        <BookItem
          history={props.history}
          book={book}
          key={book.etag}
          setUrl={props.setUrl}
        />
      ))}
    </>
  )
}
