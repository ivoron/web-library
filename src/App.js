import { Provider } from "mobx-react";
import React from "react";
import { Route, Switch } from "react-router";
import Main from "./Components/Main";
import BookStore from "./store/BookStore";
import LibraryStore from "./store/LibraryStore";
import BookPage from "./Components/BookPage";

export default function App() {
  const store = {
    libraryStore: new LibraryStore(),
    bookStore: new BookStore(),
  };

  return (
    <Provider {...store}>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/book/" component={BookPage} />
      </Switch>
    </Provider>
  );
}
