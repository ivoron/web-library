import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";

const BookPage = inject("bookStore")(
  observer((props) => {
    const { volumeInfo } = props.bookStore.book;
    return (
      <div className="container">
        <header className="App-header">
          <h2>
            <Link to="/">На главную</Link>
          </h2>
        </header>
        <div className="error__message">{props.bookStore.error}</div>
        {props.bookStore.isFetching ? (
          <div className="lds-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          <>
            <div className="book__page">
              <div className="content">
                <div>
                  <div className="bookImage">
                    <img
                      src={volumeInfo.imageLinks?.thumbnail}
                      alt={volumeInfo.title}
                    />
                    <div className="bookvolumeInfo">
                      <h2>{volumeInfo.title}</h2>
                      <br />
                      <span>{volumeInfo.authors?.join(", ")}</span>
                      <br />
                      <span>
                        Категория: {volumeInfo.categories?.join(", ")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="book__discription">{volumeInfo.description}</div>
            </div>
          </>
        )}
      </div>
    );
  })
);
export default BookPage;
