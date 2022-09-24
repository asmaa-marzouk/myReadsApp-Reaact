import React from "react";
import ReactDOM from "react-dom";
import "../App.css";
import { Link } from "react-router-dom";
import Book from "./Book";
import PropTypes from "prop-types";

const BookSearch = ({
	BookSearchQuery,
	BooksSearchList,
	OnBookSearchQuery,
	OnBookShelfUpdate,
	ShowSearchList,
	OnClick_HomePage }) => {

	

	return (
		<div className="search-books">
			<div className="search-books-bar">
				<Link
					to="/"
					onClick={OnClick_HomePage}
					className="close-search">
					Close
				</Link>
				<div className="search-books-input-wrapper">
					<input
						type="text"
						placeholder="Search by title, author, or ISBN"
						onChange={OnBookSearchQuery}
					/>
				</div>
			</div>
			<div className="search-books-results">
				{ShowSearchList ? (
					<ol className="books-grid">
						{BooksSearchList.map((iBookView) => (
							<Book
								key={iBookView.id}
								iBookView={iBookView}
								OnBookShelfUpdate={OnBookShelfUpdate}
								blnBookShelfLine={true}
							/>
						))}
					</ol>
				) : (
					<div>No Books Type To find result</div>
				)}
			</div>
		</div>
	);

	
};

// PropTypes

BookSearch.propTypes = {

	BookSearchQuery: PropTypes.string.isRequired,
	BooksSearchList: PropTypes.array.isRequired,
	ShowSearchList: PropTypes.bool.isRequired,
	OnClick_HomePage: PropTypes.func.isRequired,
	OnBookSearchQuery: PropTypes.func.isRequired,
	OnBookShelfUpdate: PropTypes.func.isRequired,
};



export default BookSearch;
