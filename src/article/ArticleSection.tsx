import React from "react";

export default function ArticleSection(props) {
     console.log(props.title);
     console.log(props.content);
     if (props.content === null || props.content === "") {
          return null;
     } else {
          return (
               <div>
                    <div className = "title">
                         <h2>{props.title}</h2>
                    </div>
                    <p id = {props.title}>{props.content}</p>
               </div>
          );
     }
}