import React from 'react'
import {
  Route
} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css';
import ListBooks from './ListBooks';
import SearchBook from './SearchBook';



class BooksApp extends React.Component {
  //DOM render后数据填充
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books: books
      })
    }).catch((error) => {
      alert('数据请求错误！')
    })

  }
  state = {
    shelf: [{
      attr: 'currentlyReading',
      val: 'Currently Reading'
    }, {
      attr: 'wantToRead',
      val: 'Want to Read'
    }, {
      attr: 'read',
      val: 'Read'
    }, {
      attr: 'none',
      val: 'None'
    }],
    books: []
  }

  // 图书处理
  movingBook = (book, shelf) => {
    book.shelf = shelf;
    this.setState(state => ({
      books: state.books.filter(bookitem => {
        if (bookitem.id !== book.id)
          return true;
      }).concat(book)
    }))
    //后端数据修改
    BooksAPI.update(book, shelf);

  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={()=>(
          <ListBooks shelf={this.state.shelf} books={this.state.books} onSelect={this.movingBook}/>
        )}/>  
        <Route path='/search' render={()=>(
          <SearchBook shelf={this.state.shelf} books={this.state.books} onSelect={this.movingBook}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp