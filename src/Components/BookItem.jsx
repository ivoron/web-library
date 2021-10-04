export function BookItem(props) {
  let { volumeInfo } = props.book;

  const openBook = (selfLink) => {
    props.setUrl(selfLink);
    props.history.push("/book/");
  };

  return (
    <div className="bookCard" onClick={() => openBook(props.book.selfLink)}>
      <div className="album">
        <img
          src={volumeInfo.imageLinks?.smallThumbnail}
          alt={volumeInfo.title}
        ></img>
      </div>
      <div className="bookInfo">
        <strong>{volumeInfo.title}</strong>
        <br />
        <span>{volumeInfo.authors?.join(", ")}</span>
        <span>
          {volumeInfo.publisher && `Издательство: ${volumeInfo.publisher}`}
        </span>
        {volumeInfo.categories && (
          <span>Категория: {volumeInfo.categories[0]}</span>
        )}
      </div>
    </div>
  );
}
