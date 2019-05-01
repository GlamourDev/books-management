import axios from "axios";

const ROOT_API_URL = "http://localhost:8080";

class CommentsDataService {
  retrieveAllComments() {
    //console.log('executed service')
    return axios.get(`${ROOT_API_URL}/comments`);
  }

  retrieveComment(id) {
    //console.log('executed service')
    return axios.get(`${ROOT_API_URL}/comments/${id}`);
  }

  deleteComment(id) {
    //console.log('executed service')
    return axios.delete(`${ROOT_API_URL}/comments/${id}`);
  }

  updateComment(id, comment) {
    //console.log('executed service')
    return axios.put(`${ROOT_API_URL}/comments/${id}`, comment);
  }

  createComment(comment) {
    console.log("executed service");
    return axios.post(`${ROOT_API_URL}/comments/`, comment);
  }
}

export default new CommentsDataService();
