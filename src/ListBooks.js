import React, {
	Component
} from 'react'
import {
	Link
} from 'react-router-dom'
import Books from './Books'

class ListBooks extends Component {
	state = {

	}
	render() {
		const {
			shelf,
			books,
			onSelect
		} = this.props;
		let shelfShow = shelf.filter(item => (item.attr !== 'none')); //筛选当前书架展示 去掉none
		return (
			<div className="list-books">
				<div className="list-books-title">
	              <h1>MyReads</h1>
	            </div>
	            <div className="list-books-content">
					{shelfShow.map(shelfItem=>(
						<div className="bookshelf" key={shelfItem.attr}>
						<h2 className="bookshelf-title">{shelfItem.val}</h2>
						<div className="bookshelf-books">
							<Books books={books} shelf={shelf} shelfCurAttr={shelfItem.attr} onSelect={onSelect}/>
		                 </div>
		            </div>
					))}
		             
		        </div>
            <div className="open-search">
            	<Link to='/search'>Add a book</Link>
            </div>
          </div>
		)
	}
}

export default ListBooks;