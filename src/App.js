import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    // showSearchPage: false
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }


  updateShelf=(shelf,book)=>{
    let found=false;
    BooksAPI.update(book,shelf);
    var newBooks=this.state.books.map((oldBook) => {
      if(oldBook.id === book.id){
       oldBook.shelf=shelf;
       found=true;
       return oldBook
     }
       else {
         return oldBook;
       }
     }
     );
     //add new book to the books array
     if (found===false)
     {
       newBooks.push(book);
     }
     //update the books array
     this.setState({books:newBooks});

    }



  render() {
    console.log("inside render");
    return (
      <div className="app">
        <Route  path='/search' render={() => (
          <SearchBooks
            books={this.state.books}
            updateShelf={this.updateShelf}


          />
        ) }/>

        <Route exact path='/' render={() => (
          <ListBooks
            books={this.state.books}
            updateShelf={this.updateShelf}
          />
        )}/>

      </div>
    )
  }
}

export default BooksApp
