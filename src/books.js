import React, {
	Component
} from 'react'

class Books extends Component {
	handleSelect = (event, book) => {
		const value = event.target.value;
		this.props.onSelect(book, value);
	}
	render() {

		const {
			books, //已选择的书
			shelf, //书架 用于option选择
			shelfCurAttr, //当前书架 用于设置默认选中
			searchBooks //搜索到的书
		} = this.props;
		const BookCoverStyle = (book) => {
			const bookbg = book.imageLinks ? book.imageLinks.smallThumbnail : ' ';
			return {
				width: 128,
				height: 188,
				backgroundImage: `url(${bookbg})`
			}
		}
		let showbook; //当前展示的所有书
		if (shelfCurAttr) { //存在当前书架 则筛选书架对应的书
			showbook = books.filter(book => (book.shelf === shelfCurAttr));
		}
		if (searchBooks) { //搜索展示书
			showbook = searchBooks;
		}
		return (
			<ol className="books-grid">
				{showbook.map(book=>(
					<li key={book.id}>
                		<div className="book">
                  			<div className="book-top">
								<div className="book-cover" style={BookCoverStyle(book)}></div>
			                    <div className="book-shelf-changer">
			                      <select 
			                      	value={books.find(item=>(item.id===book.id))?books.find(item=>(item.id===book.id)).shelf:'none'} 
			                      	onChange={(event)=>this.handleSelect(event,book)}>
									<option value="move" disabled>Move to...</option>
									{
										shelf.map(shelfItem => (
										<option value={shelfItem.attr} key={shelfItem.attr}>{shelfItem.val}</option>
			                        ))}
			                      </select>
			                    </div>
                  			</div>
                 		 <div className="book-title">{book.title}</div>
                 		 <div className="book-authors">{Array.isArray(book.authors)?book.authors.join(','):book.authors}</div>
                		</div>
             		 </li>
				))}
              
            </ol>
		)
	}


}

export default Books;