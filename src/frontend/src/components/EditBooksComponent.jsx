import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import BooksDataService from "../service/BooksDataService";
import CommentsDataService from "../service/CommentsDataService";
import Button from "@material-ui/core/Button";

class EditBooksComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      author: "",
      date: "",
      description: "",
      comments: [],
      isbn: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitComment = this.onSubmitComment.bind(this);
    this.validate = this.validate.bind(this);
    this.refreshComments = this.refreshComments.bind(this);
  }

  componentDidMount() {
    this.getDate();

    // eslint-disable-next-line
    if (this.state.id == -1) {
      return;
    }

    BooksDataService.retrieveBook(this.state.id).then(response =>
      this.setState({
        description: response.data.description,
        author: response.data.author,
        isbn: response.data.isbn,
        commentCount: response.data.commentCount
      })
    );

    CommentsDataService.retrieveComment(this.state.id).then(response =>
      this.setState({ comments: response.data })
    );
  }
  validate(values) {
    let errors = {};
    if (!values.description) {
      errors.description = "Enter Title";
    } else if (values.description.length < 5) {
      errors.description = "Enter atleast 5 Characters in Title";
    }

    return errors;
  }

  getDate = () => {
    var date = new Date().toLocaleString([], {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
    this.setState({ date });
  };

  refreshComments() {
    CommentsDataService.retrieveComment(this.state.id).then(response =>
      this.setState({ comments: response.data })
    );
  }

  onSubmit(values) {
    let book = {
      id: this.state.id,
      description: values.description,
      author: values.author,
      isbn: values.isbn,
      targetDate: values.targetDate,
      commentCount: values.commentCount
    };

    if (this.state.id === "-1") {
      BooksDataService.createBook(book).then(() =>
        this.props.history.push("/books")
      );
    } else {
      BooksDataService.updateBook(this.state.id, book).then(() =>
        this.props.history.push("/books")
      );
    }
    console.log(values);
  }

  onSubmitComment(values) {
    let comment = {
      id: this.state.id,
      comments: values.comments,
      timestamp: this.state.date
    };
    CommentsDataService.createComment(comment).then(() =>
      this.setState({
        id: this.state.id,
        timestamp: this.state.date,
        comments: values.comments
      })
    );
  }

  render() {
    const { description, id, author, isbn, commentCount } = this.state;
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-sm-6 first-column">
              <h3>Add | Edit book</h3>
              <Formik
                initialValues={{ id, description, author, isbn, commentCount }}
                onSubmit={this.onSubmit}
                validateOnChange={false}
                validateOnBlur={false}
                validate={this.validate}
                enableReinitialize={true}
              >
                {props => (
                  <Form>
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="alert alert-warning"
                    />
                    <fieldset className="form-group">
                      <label>Title</label>
                      <Field
                        className="form-control"
                        type="text"
                        name="description"
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <label>Author</label>
                      <Field
                        className="form-control"
                        type="text"
                        name="author"
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <label>ISBN-13</label>
                      <Field className="form-control" type="text" name="isbn" />
                    </fieldset>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={this.addBookClicked}
                      type="submit"
                      className="float-right"
                      style={{
                        padding: "0.5rem 2rem",
                        height: "2.5rem",
                        float: "right",
                        color: "#28a745",
                        border: "1px solid rgba(40, 167, 69, 0.5)"
                      }}
                    >
                      Update
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>
            <React.Fragment>
            {this.refreshComments()}
              {this.state.id > 0 && (
                <div className="col-sm-6 second-column">
                  <h3>Comments</h3>
                  <Formik
                    onSubmit={this.onSubmitComment}
                    enableReinitialize={true}
                  >
                    {props => (
                      <Form>
                        <fieldset className="form-group">
                          <label>Comment</label>
                          <Field
                            className="form-control"
                            type="text"
                            name="comments"
                          />
                        </fieldset>
                        <Button
                          size="medium"
                          type="submit"
                          className="float-right"
                        >
                          Add comment
                        </Button>
                      </Form>
                    )}
                  </Formik>
                  <div className="comments-box">
                    {[this.state.comments].map(comment => (
                      <ul key={comment.id}>
                        <li>
                          Date: <span>{comment.timestamp}</span>
                        </li>
                        <li>
                          Comment: <span>{comment.comments}</span>
                        </li>
                      </ul>
                    ))}
                  </div>
                </div>
              )}
            </React.Fragment>
          </div>
        </div>
      </div>
    );
  }
}

export default EditBooksComponent;
