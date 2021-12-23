import React, { Component } from "react";
import { Link } from "react-router-dom";
import {ArticleData} from "../../interfaces/ArticleData";
import ArticleSection from "./ArticleSection"
import StuffyForm from "../stuffyform/StuffyForm"
import './article.scss';
import Image from "../image/image";

export default class Article extends Component<{match: any, history: any, fetchMenu: any}, {isLoaded: boolean, error: any, articleData: ArticleData, isEditMode: boolean}> {
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
          this.exitEditModeSuccess = this.exitEditModeSuccess.bind(this);
     }

     componentDidMount() {
          this.fetchData();
     }

     componentDidUpdate(prevProps) {
          if (this.props.match.params.name !== prevProps.match.params.name || this.props.match.params.animal_type !== 
               prevProps.match.params.animal_type) {
               this.fetchData();
               this.exitEditMode();
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

     exitEditModeSuccess(url: string) {
          this.props.fetchMenu();
          this.props.history.push(url);
          this.exitEditMode();
          this.fetchData();
     }

     render() {
          if (this.state.error) {
               return <div className="body">error {this.state.error.message}</div>;
          } else if (!this.state.isLoaded) {
               return <div className="body">loading</div>;
          } else if (this.state.isEditMode) {
               return (<StuffyForm path={this.props.match.url} isAdd={false} articleData={this.state.articleData} exitSuccess={this.exitEditModeSuccess} exit={this.exitEditMode}/>);
          } else {
               return (
               <div id = "content-wrapper">
                    <div className = "title" id = "main-title">
                         <h1>{this.state.articleData.name}</h1>
                         <button id = 'edit' onClick = {this.enterEditMode}>[ Edit ]</button>
                    </div>
                    <div id = "info-wrapper">
                         <Image src = {this.state.articleData.image}></Image>
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