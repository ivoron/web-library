import { makeAutoObservable } from "mobx";

class BookStore {
  URL = "https://www.googleapis.com/books/v1/volumes?q=";
  API_KEY = "AIzaSyB46Sfp1ZdlvAUrEhfvtcH3GLI9plzOaXU";
  answer = "По Вашему запросу книги не найдены";
  totalItems = 0;
  books = [
    // {
    //   id: "123",
    //   kind: "",
    //   selfLink: "",
    //   volumeInfo: {
    //     authors: ["Author"],
    //     title: "Title",
    //     subtitle: "Essays on Architecture, 1796-1799",
    //     publisher: "Getty Publications",
    //     imageLinks: {
    //       smallThumbnail:
    //         "http://books.google.com/books/content?id=GlzIDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    //       thumbnail:
    //         "http://books.google.com/books/content?id=GlzIDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    //     },
    //   },
    // },
  ];
  constructor() {
    makeAutoObservable(this);
  }
  fetchBooks = async (searchQyery) => {
    let searChedBooks = await fetch(`${this.URL}?q=${searchQyery}`);
    if (searChedBooks.ok) {
      let fetchedBooks = await searChedBooks.json();
      this.totalItems = fetchedBooks.totalItems;
      this.books = fetchedBooks.items;
      if (this.totalItems > 0) {
        this.answer = `Найдено ${this.totalItems} книг(и)`;
      }
    }
  };
}
export default BookStore;
