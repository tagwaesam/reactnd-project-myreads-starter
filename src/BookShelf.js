

import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BookShelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired
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


  render() {
    console.log("inside render shelf");
    const { books , updateShelf ,bookState} = this.props

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{bookState}</h2>
          <div className="bookshelf-books">
              <ol className="books-grid">

              {books.map((book) => {if(book.shelf===bookState)  { return(
                <li  key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: this.getImageURL(book) }}></div>
                      <div className="book-shelf-changer">
                        <select value={book.shelf}
                          onChange={(e)=>{updateShelf(e.target.value,book) }}>
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
    )





  }




}

export default BookShelf
