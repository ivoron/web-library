import { action, makeObservable, observable } from "mobx";

class BookStore {
  URL = "https://www.googleapis.com/books/v1/volumes";
  API_KEY = "AIzaSyB46Sfp1ZdlvAUrEhfvtcH3GLI9plzOaXU";
  answer = "";
  searchQyery = "";
  intitle = "intitle:";
  inauthor = "inauthor:";
  searchByAuthors = false;
  totalItems = 0; //66
  startIndex = 0;
  maxResults = 30;
  currentPage = 1; //3
  hasNextPage = false;
  isLoadMore = false; // button
  isFetching = false;
  orderBy = "relevance"; //[, "newest"];
  //language = ["ru", "en", "fr", "it", "de", "ua"]; //volumeInfo.language;
  categories = [
    "art",
    "biography",
    "computers",
    "history",
    "medical",
    "poetry",
  ];
  //volumeInfo.categories "Fiction" "History"
  books = [];
  constructor() {
    makeObservable(this, {
      answer: observable,
      searchQyery: observable,
      searchByAuthors: observable,
      totalItems: observable,
      startIndex: observable,
      currentPage: observable,
      isLoadMore: observable,
      hasNextPage: observable,
      orderBy: observable,
      isFetching: observable,
      books: observable,
      fetchBooks: action,
      loadMoreBooks: action,
      showNextPage: action,
      selectBy: action,
    });
  }

  fetchBooks = async (searchQyery, moreBooks = false) => {
    if (!moreBooks) {
      this.hasNextPage = false;
      this.startIndex = 0;
      this.currentPage = 1;
    }
    this.searchQyery = searchQyery.split(" ").join("+");
    let totalUrl = `${this.URL}?q=${
      this.searchByAuthors ? this.inauthor : this.intitle
    }${this.searchQyery}&startIndex=${this.startIndex}&maxResults=${
      this.maxResults
    }&orderBy=${this.orderBy}&key=${this.API_KEY}`;
    console.log(totalUrl);
    try {
      this.isFetching = true;
      let searChedBooks = await fetch(totalUrl);
      if (searChedBooks.ok) {
        let fetchedBooks = await searChedBooks.json();
        this.totalItems = fetchedBooks.totalItems;
        if (this.totalItems > 0) {
          // console.log(this.books.map((book) => book.volumeInfo.categories));
          this.answer = `Найдено ${this.totalItems} книг(и)`;
        } else {
          this.answer = `По запросу ${this.searchQyery} книги не найдены`;
        }
        if (this.currentPage === 1) {
          this.books = fetchedBooks.items;
        } else if (this.hasNextPage) {
          this.books.push(...fetchedBooks.items);
        }
      }
      this.showNextPage();
      this.isFetching = false;
    } catch (e) {
      console.log(e);
    }
  };
  loadMoreBooks = () => {
    if (this.startIndex === 0) {
      this.startIndex = this.maxResults + 1;
    } else {
      this.startIndex += this.maxResults;
    }
    this.currentPage += 1;
    this.fetchBooks(this.searchQyery, true);
  };
  showNextPage = () => {
    if (this.totalItems > 30) {
      this.hasNextPage = true;
      if (this.maxResults * this.currentPage > this.totalItems) {
        this.hasNextPage = false;
      }
    }
    console.log(this.books);
  };
  selectBy = (option) => {
    this.orderBy = option;
    this.fetchBooks(this.searchQyery);
  };
}
export default BookStore;
