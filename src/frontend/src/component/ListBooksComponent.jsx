import React, { Component } from "react";
import BooksDataService from "../service/BooksDataService";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import { ScaleLoader } from "react-spinners";
import { css } from "@emotion/core";

class ListBooksComponent extends Component {
  constructor(props) {
    super(props);
    this.timeout = null;
    this.state = {
      books: [],
      currentPage: 1,
      booksPerPage: 3,
      loading: false,
      clicked: false,
      message: null
    };
    this.deleteBookClicked = this.deleteBookClicked.bind(this);
    this.updateBookClicked = this.updateBookClicked.bind(this);
    this.addBookClicked = this.addBookClicked.bind(this);
    this.refreshbooks = this.refreshBooks.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.refreshBooks();
    this.mounted = true;
  }

  componentWillUnmount = () => {
    this.mounted = false;
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  };

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
    if (!this.state.clicked) {
      this.setState({ clicked: true, loading: true }, async () => {
        this.timeout = setTimeout(() => {
          if (this.mounted) this.setState({ clicked: false, loading: false });
          this.timeout = null;
        }, 1500);
      });
    }
  }

  refreshBooks() {
    BooksDataService.retrieveAllBooks().then(response => {
      console.log(response);
      this.setState({ books: response.data });
    });
    if (!this.state.clicked) {
      this.setState({ clicked: true, loading: true }, async () => {
        this.timeout = setTimeout(() => {
          if (this.mounted) this.setState({ clicked: false, loading: false });
          this.timeout = null;
        }, 1500);
      });
    }
  }

  deleteBookClicked(id) {
    BooksDataService.deleteBook(id).then(response => {
      this.setState({ message: `Delete of course ${id} Successful` });
      this.refreshBooks();
    });
  }

  addBookClicked() {
    this.props.history.push(`/books/-1`);
  }

  updateBookClicked(id) {
    this.props.history.push(`/books/${id}`);
  }

  render() {
    const { books, currentPage, booksPerPage, id } = this.state;

    // Logic for displaying current books
    const indexOfLastSlice = currentPage * booksPerPage;
    const indexOfFirstSlice = indexOfLastSlice - booksPerPage;
    const currentBooks = books.slice(indexOfFirstSlice, indexOfLastSlice);

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(books.length / booksPerPage); i++) {
      pageNumbers.push(i);
    }

    console.log(pageNumbers, id, currentPage);

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          className={`${currentPage === number ? "pagination-active" : ""} `}
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </li>
      );
    });
    const override = css`
      display: table;
      margin: 0 auto;
      border-color: red;
    `;

    return (
      <div className="container">
        <div className="sweet-loading">
          <ScaleLoader
            sizeUnit={"px"}
            size={150}
            css={override}
            color={"#123abc"}
            loading={this.state.loading}
          />
        </div>
        <h3>Books</h3>
        {this.state.message && (
          <div class="alert alert-success">{this.state.message}</div>
        )}
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Author</th>
                <th>ISBN-13</th>
                <th>Comments</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {currentBooks.map(book => (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>{book.description}</td>
                  <td>{book.author}</td>
                  <td>{book.isbn}</td>
                  <td>{book.commentCount}</td>
                  <td>
                    <IconButton aria-label="Edit">
                      <EditIcon
                        onClick={() => this.updateBookClicked(book.id)}
                      />
                    </IconButton>
                  </td>
                  <td>
                    <IconButton aria-label="Delete">
                      <DeleteIcon
                        onClick={() => this.deleteBookClicked(book.id)}
                      />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <Button
              variant="outlined"
              color="primary"
              onClick={this.addBookClicked}
              type="submit"
              style={{
                padding: "0.5rem 2rem",
                height: "2.5rem",
                float: "right"
              }}
            >
              Add book
            </Button>
          </div>
          <div>
            <ul className="pagination" id="page-numbers">
              {renderPageNumbers}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ListBooksComponent;
