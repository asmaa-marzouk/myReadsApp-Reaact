import React from "react";
import "../App.css";
import Book from "./Book";
import PropTypes from "prop-types";

const BookShelf = ({
    iTitle,
    iShelfCategory,
    iBooksList,
    OnBookShelfUpdate }) => {

    

    const iBookByShelfCategory = iBooksList.filter(iBook => iBook.shelf === iShelfCategory);






    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{iTitle}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">

                    {iBookByShelfCategory.map((iBookView) =>
                        <Book
                            key={iBookView.id}
                            iBookView={iBookView}
                            OnBookShelfUpdate={OnBookShelfUpdate}
                            blnBookShelfLine={false} />
                    )}

                </ol>
            </div>
        </div>
    );

    
};

//"PropTypes"


BookShelf.propTypes = {

    iTitle: PropTypes.string.isRequired,
    iShelfCategory: PropTypes.string.isRequired,
    iBooksList: PropTypes.array.isRequired,
    OnBookShelfUpdate: PropTypes.func.isRequired,
};



export default BookShelf;