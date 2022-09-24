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
			console.log("useEffect");

			getBooks();
		} catch (error) {
			console.log(error);
		}
	}, []);


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
	const click_HomePage = (event) => {
		try {
			console.log(event.currentTarget);
			setSearchQuery("");
			setSearchBooks([]);
			setSearchPage(false);
		} catch (error) {
			console.log(error);
		}
	};


	/* updatebook */
	const updatebook = async (Books, iShelf) => {
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
	const click_SearchPage = (event) => {
		try {
			console.log(event.currentTarget);
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
				const SearchValue = event.target.value;
				console.log(
					"SearchValue.trim().length == " + SearchValue.trim().length
				);

				if (SearchValue.trim() === "") {
					setSearchQuery("");
					setSearchBooks([]);
					setSearchPage(false);
				} else {
					iBookSearch(SearchValue);
				}
			}, 1000);
		} catch (error) {
			console.log(error);
		}
	}

	/* BookSearch */
	const iBookSearch = async (SearchValue) => {
		try {
			const iBooks_SearchList = await BooksApi.search(SearchValue, 3);

			if (iBooks_SearchList.length > 0) {
				let iBooks_SearchShelfList = iBookSearch_SetShelf(iBooks_SearchList);

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
	function iBookSearch_SetShelf(iBooks_SearchList) {
		try {
			let arrBooks_SearchShelfList = [];

			for (let b = 0; b < iBooks_SearchList.length; b++) {
				Books.forEach((iBookView) => {
					if (iBookView.id === iBooks_SearchList[b].id) {
						console.log(iBookView);

						iBooks_SearchList[b].shelf = iBookView.shelf;
					} else {
						iBooks_SearchList[b].shelf = "none";
					}
				});
				arrBooks_SearchShelfList.push(iBooks_SearchList[b]);
			}

			return arrBooks_SearchShelfList;
		} catch (error) {
			console.log(error);
		}
	}

	

	

	try {
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
									OnBookShelfUpdate={updatebook}
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
									OnBookShelfUpdate={updatebook}
									OnClick_SearchPage={click_SearchPage}
								/>
							}></Route>
					</Routes>
				</BrowserRouter>
			</div>
		);
	} catch (error) {
		console.log(error);
	}

};

export default App;
