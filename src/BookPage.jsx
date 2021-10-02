import React from "react";

export default function BookPage(props) {
  let { volumeInfo } = props;
  return (
    <div className="container">
      <div className="book__page">
        <div className="contetn">
          <div>
            <img src={props} alt={props} />
            <div className="bookInfo">
              <strong>{volumeInfo.title}</strong>
              <br />
              <span>{volumeInfo.authors?.join(", ")}</span>
              <p>
                {volumeInfo.publisher &&
                  `Издательство: ${volumeInfo.publisher}`}
              </p>
              <span>Категория: {volumeInfo.categories?.[0]}</span>
            </div>
          </div>
        </div>
        <div className="book__discription">discription</div>
      </div>
    </div>
  );
}
