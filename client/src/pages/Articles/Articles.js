import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import SaveBtn from "../../components/SaveBtn";
import ArticleCard from "../../components/ArticleCard";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import buildQueryURL from "../../utils/searchArticles";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, Year, FormBtn } from "../../components/Form";




class Articles extends Component {
  state = {
    articles: [],
    savedArticles: [],
    topic: "",
    startYear: "",
    endYear: ""
  };

 
  componentDidMount() {
    this.getSavedArticles();
  }

  componentDidUpdate() {

  }

  getSavedArticles = () => {
    API.getSavedArticles()
      .then(res =>
        this.setState({ savedArticles: res.data })
      )
      .catch(err => console.log(err));
  
  };

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.getSavedArticles())
      .catch(err => console.log(err));
  };

  saveArticle = (article) => {
    API.saveArticle({
      title: article.title,
      author: article.author,
      date: article.date,
      url: article.url,
      pic: article.pic
    })
      .then(res => this.getSavedArticles())
      .catch(err => console.log(err));
  };

  

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.topic && this.state.startYear && this.state.endYear) {
 
      //this.setState
     

      buildQueryURL(this.state, (articlesResults) => {

         //console.log(articlesResults);
        this.setState({ articles: articlesResults, topic: "", startYear: "", endYear: ""})
      
      });
      
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
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
              <Year
                value={this.state.startYear}
                onChange={this.handleInputChange}
                name="startYear"
                placeholder="Please enter four digits starting year"
                pattern="\d*" minLength="4" maxLength="4" 
              />
              <Year
                value={this.state.endYear}
                onChange={this.handleInputChange}
                name="endYear"
                placeholder="Please enter four digits ending year"
                pattern="\d*" minLength="4" maxLength="4" 
                
              />
              <FormBtn
                disabled={!(this.state.topic && this.state.startYear && this.state.endYear )}
                onClick={this.handleFormSubmit}
              >
                Submit
              </FormBtn>
            </form>
          </Col>
          </Row>
          <Row>
          <Col size="md-12 sm-12">
            
          
           
            {this.state.articles.length ? (
              
              <List >
                <h3>Articles found :</h3>
                {this.state.articles.map(article => (
                   <ListItem>
                  <ArticleCard 
                  key={article.url}
                  title={article.title}
                  pic={article.pic}
                  author={article.author}
                  url={article.url}
                  date={article.date}
                  />
                  <SaveBtn onClick={() => this.saveArticle(article)} />
                 
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
        <Row>
          <Col size="md-12 sm-12">

           {this.state.savedArticles.length ? (
              
              <List >
                <h3>Saved Articles found :</h3>
                {this.state.savedArticles.map(savedArticle => (
                   <ListItem>
                  <ArticleCard 
                  key={savedArticle.url}
                  title={savedArticle.title}
                  pic={savedArticle.pic}
                  author={savedArticle.author}
                  url={savedArticle.url}
                  date={savedArticle.date}
                  />
                 
                  <DeleteBtn onClick={() => this.deleteArticle(savedArticle._id)} />
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
//key={article._id} inside list
// <Link to={"/books/" + book._id}>
{/* <strong>
{book.title} by {book.author}
</strong>
</Link> */}
// <DeleteBtn onClick={() => this.deleteBook(book._id)} />
