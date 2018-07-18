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
      console.log(this.state.books)
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

  //移动项
  movingBook = (book, shelf) => {
    //改变状态 筛选改变项
    this.setState(state => ({
      books: state.books.filter(bookitem => {
        if (bookitem.id === book.id) { //当前书架移动
          bookitem.shelf = shelf;
        }
        return true;
      })
    }))
    //后端数据修改
    BooksAPI.update(book, shelf);
  }

  //添加项
  addBook = (book, shelf) => {
    book.shelf = shelf;
    //改变状态 筛选改变项
    this.setState(state => ({
      books: state.books.concat(book)
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
          <SearchBook shelf={this.state.shelf} books={this.state.books} onSelect={this.addBook}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp