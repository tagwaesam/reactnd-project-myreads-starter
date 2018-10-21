//TODO:link dont render the route /

import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'


class SearchBooks extends Component {


  constructor(props) {
      super(props);
      this.showingBooks = [];
      this.i=1;
      this.oldQuery="";
      this.s=false;

  }

    static propTypes = {
      books: PropTypes.array.isRequired,
      updateShelf: PropTypes.func.isRequired
    }
    state = {
      query: '',
      showingBooks:[]
    }
     updateQuery = (query) => {
      this.setState({ query: query });

    }

    clearQuery = () => {
      this.setState({ query: '' })
    }



    updateShelfState=(oldBooks,newBooks)=>{
      console.log("inside updateShelfState");

      let temp=[];
      let found=false;
      temp=newBooks.map((newBook) => {oldBooks.map((oldBook)=>{
        if(newBook.id === oldBook.id){
          found=true;
          newBook.shelf=oldBook.shelf;
          return newBook;
          }
        });
        if(found===false){
          newBook.shelf="none";

        }
        return newBook;
      });
      return temp;
     }


     getImageURL=(book)=>
     {

       if(book.hasOwnProperty('imageLinks'))
       {

         return `url(${book.imageLinks.smallThumbnail})`;
       }
       else {
         return '';
       }
     }




     componentDidUpdate() {
       console.log("inside componentDidMount");
       const { books } = this.props;
       const { query } = this.state;




       if (query!==this.oldQuery && query!=="") {
         this.i=1;
         //set the old oldQuery
         this.oldQuery=query;
         //delete the old search
         this.showingBooks=[];
         //get the new books set
         BooksAPI.search(query).then((newBooks)=>{

             //update the shelf of the new books depending on the state of the present shelf
             if(newBooks.length!==0){
               this.showingBooks=this.updateShelfState(books,newBooks);

console.log(books);
console.log(newBooks);
               //sort the books
               this.showingBooks.sort(sortBy('title'));

               //to render the page
               this.setState({showingBooks:this.showingBooks});
            }
            else {
             this.showingBooks = [];
             //to render the page
             this.setState({showingBooks:this.showingBooks});
           }

         }).catch(()=>{

           
           this.showingBooks=[];
           this.forceUpdate();

         });//end of promise

       }
     else
     {

       //dont show box when query empty
       if(query==="" && this.oldQuery!=="" && this.i){
        this.showingBooks = [];

        this.forceUpdate();
        //tobe sure to do it just one time
        this.i=0;

      }

     }


  }//end of componentDidMount()

    render() {
      const { updateShelf,books} = this.props;
      const { query } = this.state;

      console.log("inside render list");



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
              {this.showingBooks.map((book) => (
                <li  key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: this.getImageURL(book) }}></div>
                      <div className="book-shelf-changer">
                        <select value={(book.shelf)}
                          onChange={(e)=>{ this.showingBooks=this.updateShelfState(this.showingBooks,books); updateShelf(e.target.value,book)}}>
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
