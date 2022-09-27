import React from "react";
import { Link } from "react-router-dom";
import BookShelf from "./BookShelf";
import PropTypes from "prop-types";

const Shelves = ({
	iBooksList,
	OnBookShelfUpdate,
	OnClick_SearchPage
}) => {

	return (
		<div className="list-books">
			<div className="list-books-title">
				<h1>MyReads</h1>
			</div>
			<div className="list-books-content">
				<div>
					<BookShelf
						key="currentlyReading"
						iTitle="Currently Reading"
						iShelfCategory="currentlyReading"
						iBooksList={iBooksList}
						OnBookShelfUpdate={OnBookShelfUpdate}
					/>
					<BookShelf
						key="wantToRead"
						iTitle="Want to Read"
						iShelfCategory="wantToRead"
						iBooksList={iBooksList}
						OnBookShelfUpdate={OnBookShelfUpdate}
					/>
					<BookShelf
						key="read"
						iTitle="Read"
						iShelfCategory="read"
						iBooksList={iBooksList}
						OnBookShelfUpdate={OnBookShelfUpdate}
					/>
				</div>
			</div>
			<div className="open-search">
				<Link
					to="/search"
					onClick={OnClick_SearchPage}
					>
					Add a book
				</Link>
			</div>
		</div>
	);


};

//"PropTypes"

Shelves.propTypes = {
	iBooksList: PropTypes.array.isRequired,
	OnBookShelfUpdate: PropTypes.func.isRequired,
	OnClick_SearchPage: PropTypes.func.isRequired,
};


export default Shelves;
