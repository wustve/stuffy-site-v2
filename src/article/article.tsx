import React, { Component } from "react";
import { Link } from "react-router-dom";
import {ArticleData} from "../../interfaces/ArticleData";
import ArticleSection from "./ArticleSection"
import StuffyForm from "../stuffyform/StuffyForm"
import './article.scss';

export default class Article extends Component<{match: any}, {isLoaded: boolean, error: any, articleData: ArticleData, isEditMode: boolean}> {
     constructor(props) {
          super(props);
          this.state = {
               isLoaded: false,
               error: null,
               articleData: null,
               isEditMode: false
          }
          this.fetchData = this.fetchData.bind(this);
          this.enterEditMode = this.enterEditMode.bind(this);
          this.exitEditMode = this.exitEditMode.bind(this);
     }

     componentDidMount() {
          this.fetchData();
     }

     componentDidUpdate(prevProps) {
          if (this.props.match.params.name !== prevProps.match.params.name || this.props.match.params.animal_type !== 
               prevProps.match.params.animal_type) {
               this.fetchData();
          }
     }

     fetchData() {
          fetch('/stuffies/' + this.props.match.params.name.split(' ').join('_') + '/' + 
               this.props.match.params.animal_type.split(' ').join('_'))
          .then(res => res.json())
          .then(res => this.setState({
               isLoaded: true,
               articleData: res
          }),
          err => this.setState({
               isLoaded: true,
               error: err,
          })
          );
     }

     enterEditMode() {
          this.setState({
               isEditMode : true
          });
     }

     exitEditMode() {
          this.setState({
               isEditMode : false
          });
     }

     render() {
          if (this.state.error) {
               return <div className="body">error {this.state.error.message}</div>;
          } else if (!this.state.isLoaded) {
               return <div className="body">loading</div>;
          } else if (this.state.isEditMode) {
               return (<StuffyForm isAdd={false} articleData={this.state.articleData} exit={this.exitEditMode}/>);
          } else {
               return (
               <div id = "content-wrapper">
                    <div className = "title" id = "main-title">
                         <h1>{this.state.articleData.name}</h1>
                         <button id = 'edit' onClick = {this.enterEditMode}>[ Edit ]</button>
                    </div>
                    <div id = "info-wrapper">
                         <div id ="image-div">
                              <img src={this.state.articleData.image} className = "thumbnail"/>
                         </div>
                         <div id = "paragraphs">
                              <ArticleSection title='Owner' content={this.state.articleData.owner}/>
                              <ArticleSection title='Animal Type' content={this.state.articleData.animal_type}/>
                              <ArticleSection title='Name Origin' content={this.state.articleData.name_origin}/>
                              <ArticleSection title='Origin' content={this.state.articleData.origin}/>
                              <ArticleSection title='Other Notes' content={this.state.articleData.other_notes}/>
                         </div>
                    </div>
               </div>);
          }
     }
}