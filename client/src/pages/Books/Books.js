import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import buildQueryURL from "../../utils/searchArticles";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, Date, FormBtn } from "../../components/Form";




class Articles extends Component {
  state = {
    articles: [],
    topic: "",
    startYear: "",
    endYear: ""
  };

 
  componentDidMount() {
    //this.loadBooks();
  }

  componentDidUpdate() {

  }

  loadArticles = () => {
    buildQueryURL.then(res =>
        this.setState({ books: res.data, title: "", author: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value.replace(/\-+/g, '')
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.topic && this.state.startYear && this.state.endYear) {

     

      buildQueryURL(this.state, (articlesResults) => {

         console.log(articlesResults);
        this.setState({ articles: articlesResults})
      
      });
      
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron>
            <h5>Search for articles</h5>
            <form>
              <Input
                value={this.state.topic}
                onChange={this.handleInputChange}
                name="topic"
                placeholder="Topic (required)"
              />
              <Date
                value={this.state.startYear}
                onChange={this.handleInputChange}
                name="startYear"
                placeholder=""
              />
              <Date
                value={this.state.endYear}
                onChange={this.handleInputChange}
                name="endYear"
                placeholder=""
              />
              <FormBtn
                disabled={!(this.state.topic && this.state.startYear && this.state.endYear )}
                onClick={this.handleFormSubmit}
              >
                Submit
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;


// API.saveBook({
//   title: this.state.title,
//   author: this.state.author,
//   synopsis: this.state.synopsis
// })
//   .then(res => this.loadBooks())
//   .catch(err => console.log(err));
