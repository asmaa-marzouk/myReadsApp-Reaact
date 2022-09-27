import "./App.css";
import { useEffect, useState } from "react";
import SearchBook from "./components/BookSearch";
import Shelves from "./components/Shelves";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as BooksApi from "./BooksAPI";

const App = () => {
	const [Books, setBooks] = useState([]);
	const [SearchBooks, setSearchBooks] = useState([]);
	const [SearchQuery, setSearchQuery] = useState("");
	const [SearchPage, setSearchPage] = useState(true);

	useEffect(() => {
		try {
			getBooks();
		} catch (error) {
			console.log(error);
		}
	}, [SearchQuery]);

	/* get Books from api */
	async function getBooks() {
		try {
			const Books = await BooksApi.getAll();
			setBooks(Books);
		} catch (error) {
			console.log(error);
		}
	}

	/* Home Page */
	const click_HomePage = () => {
		try {
			setSearchQuery("");
			setSearchBooks([]);
			setSearchPage(false);
		} catch (error) {
			console.log(error);
		}
	};


	/* updateBook */
	const updateBook = async (Books, iShelf) => {
		try {
			if (SearchBooks.length > 0) {
				for (let b = 0; b < SearchBooks.length; b++) {
					if (SearchBooks[b].id === Books.id) {
						SearchBooks[b].shelf = iShelf;
						break;
					}

					setSearchBooks(SearchBooks);
				}
			}

			await BooksApi.update(Books, iShelf);

			const Books_GetList = await BooksApi.getAll();
			setBooks(Books_GetList);
		} catch (error) {
			console.log(error);
		}
	};

	/*Search Page */
	const click_SearchPage = () => {
		try {
			setSearchQuery("");
			setSearchBooks([]);
			setSearchPage(true);
		} catch (error) {
			console.log(error);
		}
	};

	/* BookSearch */
	function BookSearch(event) {
		try {
			setTimeout(() => {
				const SearchValue = event.target.value.trim();

				if (SearchValue === "") {
					setSearchQuery("");
					setSearchBooks([]);
					setSearchPage(false);
				} else {
					iBookSearchWithoutShelf(SearchValue);
				}
			}, 1000);
		} catch (error) {
			console.log(error);
		}
	}

	/* BookSearch */
	const iBookSearchWithoutShelf = async (SearchValue) => {
		try {
			const iBooksWithout_SearchList = await BooksApi.search(SearchValue, 3);

			if (iBooksWithout_SearchList.length > 0) {
				let iBooks_SearchShelfList = BookSearchSetShelf(
					iBooksWithout_SearchList
				);

				setSearchQuery(SearchValue);

				setSearchBooks(iBooks_SearchShelfList);
				setSearchPage(true);
			} else {
				setSearchQuery(SearchValue);
				setSearchBooks([]);
				setSearchPage(false);
			}
		} catch (error) {
			setSearchQuery(SearchValue);
			setSearchBooks([]);
			setSearchPage(false);

			console.log(error);
		}
	};

	/* Book Search and SetShelf */
	function BookSearchSetShelf(BooksSearchList) {
		try {
			const arrBooks_SearchShelfList = BooksSearchList.map(searchBook => {
				Books.forEach(book => {
					if (book.id === searchBook.id) {
						searchBook.shelf = book.shelf;
					}
				});

				if (!searchBook.shelf) {
					searchBook.shelf = "none";
				}

				return searchBook;
			})

			return arrBooks_SearchShelfList;
		} catch (error) {
			console.log(error);
		}
	}

		return (
			<div className="app">
				<BrowserRouter>
					<Routes>
						<Route
							path="/search"
							element={
								<SearchBook
									BookSearchQuery={SearchQuery}
									BooksSearchList={SearchBooks}
									OnBookSearchQuery={BookSearch}
									OnBookShelfUpdate={updateBook}
									ShowSearchList={SearchPage}
									OnClick_HomePage={click_HomePage}
								/>
							}
						/>
						<Route
							exact
							path="/"
							element={
								<Shelves
									iBooksList={Books}
									OnBookShelfUpdate={updateBook}
									OnClick_SearchPage={click_SearchPage}
								/>
							}></Route>
					</Routes>
				</BrowserRouter>
			</div>
		);
};

export default App;
