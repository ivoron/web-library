import { action, makeObservable } from "mobx";
import { observable } from "mobx";

class BookStore {
  constructor() {
    makeObservable(this, {
      book: observable,
      URL: observable,
      isFetching: observable,
      setUrl: action,
      fetchCurrentBook: action,
    });
  }
  URL = "";
  error = "";
  isFetching = false;
  book = {};

  setUrl = (url) => {
    this.URL = url;
    this.fetchCurrentBook();
  };
  fetchCurrentBook = async () => {
    this.isFetching = true;
    try {
      let currentBook = await fetch(this.URL);
      this.book = await currentBook.json();
    } catch (e) {
      console.log(e, "error");
      this.error = "Не удалось загрузить книгу";
    } finally {
      this.isFetching = false;
    }
  };
}
export default BookStore;
