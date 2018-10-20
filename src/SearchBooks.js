

import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'


class SearchBooks extends Component {


    static propTypes = {
      books: PropTypes.array.isRequired,
      updateShelf: PropTypes.func.isRequired
    }
    state = {
      query: '',
      oldQuery:'',
      selectValue:'',
      showingBooks:[]
    }
     updateQuery = (query) => {
      this.setState({ query: query });

    }

    clearQuery = () => {
      this.setState({ query: '' })
    }

    handleChange=(e)=>{
      console.log(e.target.value);
      this.setState({selectValue:e.target.value});

    }



    updateShelfState=(oldBooks,newBooks)=>{
      let temp=[];

      temp=newBooks.map((newBook) => {oldBooks.map((oldBook)=>{
        if(newBook.id === oldBook.id){
          newBook.shelf=oldBook.shelf;
          return newBook;
          }
        });
        newBook.shelf="none";
        return newBook;
      });
      return temp;
     }

     getSelectValue=(shelf)=>{
       if (this.state.selectValue)
        return this.selectValue;
       else
        return shelf;
     }

     getImageURL=(book)=>
     {
       
       if(book.hasOwnProperty('imageLinks'))
       {
         console.log("inside image");
         return `url(${book.imageLinks.smallThumbnail})`;
       }
       else {
         return '';
       }
     }


     componentDidUpdate() {
       const { books , updateShelf} = this.props;
       const { query,oldQuery } = this.state;
       let showingBooks=[];
       let newBooks=[];


       if (query!==oldQuery && query!=="") {


         this.setState({showingBooks:[]});

         //set the old oldQuery
         this.setState({oldQuery:query});
         console.log("q="+query)
         //get the new books set
         BooksAPI.search(query).then((books)=>{newBooks=books;
             console.log("inside query");
             console.log("newbook=",newBooks);

             //update the shelf of the new books depending on the state of the present shelf
             if(newBooks.length!==0){
               newBooks=this.updateShelfState(books,newBooks);
               //console.log(newBooks);
               const match = new RegExp(escapeRegExp(query), 'i');
               showingBooks = newBooks.filter((book)=> ( match.test(book.authors)  || match.test(book.title)));
               //sort the books
               showingBooks.sort(sortBy('author'))
               console.log(showingBooks);
               //to render the page
               this.setState({showingBooks});
            }
            else {
             showingBooks = [];
           }

         }).catch(()=>{
           newBooks=[];
           this.setState({showingBooks:[]});
         });//end of promise

       }
     else
     {



       showingBooks = [];

     }


  }//end of componentDidMount()

    render() {
      const { books , updateShelf} = this.props;
      const { query,oldQuery ,showingBooks , selectValue } = this.state;

      console.log("inside render");
      console.log(showingBooks);




      return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link
              to='/'
              className='close-search'
              >Close</Link>
            <div className="search-books-input-wrapper">
              {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}

              <input
                type='text'
                placeholder='Search by title or author'
                value={query}
                onChange={(event) => this.updateQuery(event.target.value)}
              />

            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {showingBooks.map((book) => (
                <li  key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: this.getImageURL(book) }}></div>
                      <div className="book-shelf-changer">
                        <select value={this.getSelectValue(book.shelf)}
                          onChange={(e)=>{ this.handleChange(e) ; updateShelf(e.target.value,book)}}>
                          <option value="move" disabled>Move to...</option>
                          <option value="currentlyReading" >Currently Reading</option>
                          <option value="wantToRead" >Want to Read</option>
                          <option value="read" >Read</option>
                          <option value="none" >None</option>
                         </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                  </div>
                </li>

              ))}
            </ol>
          </div>
        </div>
      )
    }
}
 export default SearchBooks
