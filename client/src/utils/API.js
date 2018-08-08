import axios from "axios";

export default {
  
  // Gets all books
  getSavedArticles: function() {
    return axios.get("/api/articles");
  },
  // Deletes the book with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves a book to the database
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  }
};
