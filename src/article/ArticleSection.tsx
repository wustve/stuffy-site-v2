import React from "react";

export default function ArticleSection(props) {
     if (props.content !== null) {
          return (
               <div>
                    <div className = "title">
                         <h2>{props.title}</h2>
                    </div>
                    <p id = {props.title}>{props.content}</p>
               </div>
          );
     } else {
          return null;
     }
}