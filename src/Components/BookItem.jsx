export function BookItem(props) {
  let { volumeInfo } = props.book
  const openBook = (selfLink) => {
    props.setUrl(selfLink)
    props.history.push('/book/')
  }
  return (
    <div className="bookCard" onClick={() => openBook(props.book.selfLink)}>
      <div className="album">
        <img
          src={
            volumeInfo.imageLinks?.smallThumbnail ||
            'https://st.depositphotos.com/1705215/1208/i/950/depositphotos_12086967-stock-photo-cover-of-an-old-book.jpg'
          }
          alt={volumeInfo.title}
        ></img>
      </div>
      <div className="bookInfo">
        <strong>{volumeInfo.title}</strong>
        <br />
        <span>{volumeInfo.authors?.join(', ')}</span>
        <br />
        <span>
          {volumeInfo.publisher && `Издательство: ${volumeInfo.publisher}`}{' '}
          <br />
        </span>
        {volumeInfo.categories && (
          <span>Категория: {volumeInfo.categories[0]}</span>
        )}
      </div>
    </div>
  )
}
