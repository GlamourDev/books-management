import axios from "axios";

const ROOT_API_URL = "http://localhost:8080";

class BooksDataService {
  retrieveAllBooks() {
    //console.log('executed service')
    return axios.get(`${ROOT_API_URL}/books`);
  }

  retrieveBook(id) {
    //console.log('executed service')
    return axios.get(`${ROOT_API_URL}/books/${id}`);
  }

  deleteBook(id) {
    //console.log('executed service')
    return axios.delete(`${ROOT_API_URL}/books/${id}`);
  }

  updateBook(id, book) {
    //console.log('executed service')
    return axios.put(`${ROOT_API_URL}/books/${id}`, book);
  }

  createBook(book) {
    //console.log('executed service')
    return axios.post(`${ROOT_API_URL}/books/`, book);
  }
}

export default new BooksDataService();
