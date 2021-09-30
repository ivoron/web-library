import React from "react";
import { BookItem } from "./BookItem";

export default function BooksList(props) {
  return (
    <>
      {props.books.map((book) => (
        <BookItem book={book} key={book.id} />
      ))}
    </>
  );
}
