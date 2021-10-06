import { action, makeObservable, observable } from 'mobx'

class LibraryStore {
  URL = 'https://www.googleapis.com/books/v1/volumes'
  API_KEY = 'AIzaSyB46Sfp1ZdlvAUrEhfvtcH3GLI9plzOaXU'
  answer = ''
  searchQyery = ''
  intitle = 'intitle:'
  inauthor = 'inauthor:'
  searchByAuthors = false
  totalItems = 0
  startIndex = 0
  maxResults = 30
  currentPage = 1
  hasNextPage = false
  isLoadMore = false
  isFetching = false
  orderBy = 'relevance'
  sortedBy = 'All'
  books = []
  filtredBooks = []
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
      sortedBy: observable,
      books: observable,
      filtredBooks: observable,
      fetchBooks: action,
      loadMoreBooks: action,
      showNextPage: action,
      selectBy: action,
      sortedBooksByCategory: action,
    })
  }

  fetchBooks = async (searchQyery, moreBooks = false) => {
    if (!moreBooks) {
      this.hasNextPage = false
      this.startIndex = 0
      this.currentPage = 1
    }
    this.searchQyery = searchQyery.split(' ').join('+')
    let totalUrl = `${this.URL}?q=${
      this.searchByAuthors ? this.inauthor : this.intitle
    }${this.searchQyery}&startIndex=${this.startIndex}&maxResults=${
      this.maxResults
    }&orderBy=${this.orderBy}&key=${this.API_KEY}`
    try {
      this.isFetching = true
      this.answer = ''
      const searChedBooks = await fetch(totalUrl)
      const fetchedBooks = await searChedBooks.json()
      this.totalItems = fetchedBooks.totalItems
      this.totalItems && this.currentPage === 1
        ? (this.books = fetchedBooks.items)
        : this.hasNextPage && this.books.push(...fetchedBooks.items)
      if (this.totalItems > 0) {
        this.answer = `Найдено ${this.totalItems} книг(и)`
      } else {
        this.answer = `По запросу ${this.searchQyery} книги не найдены`
      }
      this.showNextPage()
      this.selectCategory(this.sortedBy)
    } catch (e) {
      this.answer = `Не удалось загрузить результаты поиска...`
      console.log(e)
    }
    this.isFetching = false
    console.log(this.isFetching)
  }
  loadMoreBooks = () => {
    this.startIndex === 0
      ? (this.startIndex = this.maxResults + 1)
      : (this.startIndex += this.maxResults)
    this.currentPage += 1
    this.fetchBooks(this.searchQyery, true)
  }
  showNextPage = () => {
    if (this.totalItems > 30) {
      this.hasNextPage = true
      if (this.maxResults * this.currentPage >= this.totalItems) {
        this.hasNextPage = false
      }
    }
  }
  selectBy = (option) => {
    this.orderBy = option
    this.fetchBooks(this.searchQyery)
  }
  selectCategory = (category) => {
    this.sortedBy = category
    this.sortedBooksByCategory()
  }
  sortedBooksByCategory = () => {
    if (this.sortedBy === 'All') {
      this.filtredBooks = this.books
    } else {
      this.filtredBooks = this.books.filter((book) =>
        book.volumeInfo.categories?.includes(this.sortedBy)
      )
    }
  }
  searchByToggle = () => {
    this.searchByAuthors = !this.searchByAuthors
  }
}
export default LibraryStore
