

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

class ListBooks extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired
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
                  <BookShelf
                    books={books}
                    updateShelf={updateShelf}
                    bookState={"currentlyReading"}
                  />
              </div>
              <div>
                  <BookShelf
                    books={books}
                    updateShelf={updateShelf}
                    bookState={"wantToRead"}
                  />
              </div>
              <div>
                  <BookShelf
                    books={books}
                    updateShelf={updateShelf}
                    bookState={"read"}
                  />
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
