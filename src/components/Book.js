import PropTypes from "prop-types";

const Book = ({
    iBookView,
    OnBookShelfUpdate,
    blnBookShelfLine }) => {


    /* shelfUpdate */
    function shelfUpdate(event) {
        OnBookShelfUpdate(iBookView, event.target.value);
    }

    /* getAuthor */
    const getAuthor = (iBookView) => {
        try {

            if (iBookView.authors && iBookView.authors.length > 0) {
                return iBookView.authors;
            } else {
                return "No Author";
            }
        } catch (error) {
            console.log(error);
        }
    };

    /*getBookImage  */
    const getBookImage = (iBookView) => {
        try {
            if (iBookView.imageLinks) {
                return `url(${iBookView.imageLinks.thumbnail})`;
            } else {
                return 'url("https://png.pngtree.com/png-vector/20201224/ourlarge/pngtree-error-404-page-not-found-png-image_2598541.jpg")';
            }
        } catch (error) {
            console.log(error);
        }
    };

    /* showBookShelf */
    const showBookShelf = (iBookView) => {
        try {
            if (iBookView.shelf === "currentlyReading") {
                return "Currently Reading";
            } else if (iBookView.shelf === "wantToRead") {
                return "Want to Read";
            } else if (iBookView.shelf === "read") {
                return "Read";
            } else if (iBookView.shelf === "none") {
                return "None";
            } else {
                return "None";
            }
        } catch (error) {
            console.log(error);
            return "None";
        }
    };

    return (
        <li key={iBookView.id}>
            <div className="book">
                <div className="book-top">
                    <div
                        className="book-cover"
                        style={{
                            width: 128,
                            height: 193,
                            backgroundImage: getBookImage(iBookView),
                            backgroundPosition: "center",
                            backgroundSize: "contain",
                        }}></div>
                    <div className="book-shelf-changer">
                        <select
                            onChange={shelfUpdate}
                            value={iBookView.shelf}>
                            <option
                                value="asmaa"
                                disabled>
                                Move to...
                            </option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{iBookView.title}</div>
                <div className="book-authors">{getAuthor(iBookView)} </div>
                {blnBookShelfLine === true ? (
                    <div className="book-shelf-line">
                        <u> {showBookShelf(iBookView)} </u>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </li>
    );


};

// "PropTypes"

Book.propTypes = {
    iBookView: PropTypes.object.isRequired,
    blnBookShelfLine: PropTypes.bool.isRequired,
    OnBookShelfUpdate: PropTypes.func.isRequired,
};


export default Book;
