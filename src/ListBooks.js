// TODO:make the select show the present option
//show all the books debending on the shelf
//i don't know what to do with the book already in this file
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class ListBooks extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired
  }
  state = {
    selectValue:'wantToRead'
  }

  handleChange=(e)=>{

    this.setState({selectValue:e.target.value});

  }

   render() {

    const { books , updateShelf} = this.props
    return (

      <div className="list-books">
          {/* show the books debending on the shelf*/}
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                      <ol className="books-grid">

                        {books.map((book) => {if(book.shelf==="currentlyReading")  { return(
                          <li  key={book.id}>
                            <div className="book">
                              <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                <div className="book-shelf-changer">
                                  <select value={book.shelf}
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

                        )}})}
                      </ol>


                  </div>
                </div>
              </div>


              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                      <ol className="books-grid">

                        {books.map((book) => {if(book.shelf==="wantToRead")  { return(
                          <li  key={book.id}>
                            <div className="book">
                              <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                <div className="book-shelf-changer">
                                  <select value={book.shelf}
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

                        )}})}
                      </ol>


                  </div>
                </div>
              </div>


              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                      <ol className="books-grid">

                        {books.map((book) => {if(book.shelf==="read")  { return (
                          <li  key={book.id}>
                            <div className="book">
                              <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                <div className="book-shelf-changer">
                                  <select value={book.shelf}
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

                        )}})}
                      </ol>


                  </div>
                </div>
              </div>



            </div>
            <div className="open-search">
              <Link
                to='/search'
                >Add a book</Link>
            </div>



      </div>


    )
  }
}



export default ListBooks
