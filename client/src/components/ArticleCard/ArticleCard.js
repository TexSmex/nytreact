import React from "react";
//import "./ArticleCard.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
//onClick={() => props.clickGame(props.id)}
const ArticleCard = props => (
  <div className="container" key={props.key}>
    <div className="row">
   
      <img  className="col-3" src={props.pic} height="200px"/>
      <div className="col-9">
      <h4>{props.title}</h4>
      <h5>By : {props.author}</h5>
      <h6>Publication date : {props.date}</h6>
      <h6> for more : <a href={props.url} target="_blank">click here</a></h6>
      
      </div>

    </div>
  </div>
);

export default ArticleCard;