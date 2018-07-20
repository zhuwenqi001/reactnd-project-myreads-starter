import React, {
  Component
}
from 'react';
import {
  Link
} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Books from './Books'

class SearchBook extends Component {
  state = {
    query: '',
    searchBooks: []
  }

  //更新搜索state
  updateQuery = (query) => {
    this.setState(state => ({
      query: query.trim()
    }))
    if (query) {
      BooksAPI.search(query).then((data) => {
        this.setState(state => ({
          searchBooks: data
        }))
      })
    }
  }



  render() {
    const {
      books,
      shelf,
      onSelect
    } = this.props;
    const {
      query,
      searchBooks
    } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input 
            type="text" 
            placeholder="Search by title or author" 
            value={query} 
            onChange={(event)=>this.updateQuery(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
      {/*
        1、query不为空 判断searchBooks
        2、searchBooks 检索返回error （提示没有检索到相关结果）
        3、searchBooks 异步检索未结束，为空数组 （提示检索中）
        4、searchBooks 非空数组 （展示数据）
      */}
          {query.length!==0 && (
             searchBooks.error==='empty query' ? <p>抱歉！没有搜索到相关结果！</p> : (searchBooks.length===0 ? <p>loading</p> : <Books books={books} shelf={shelf} searchBooks={searchBooks} onSelect={onSelect}/>)
          )}

        </div>
      </div>
    )
  }
}

export default SearchBook;