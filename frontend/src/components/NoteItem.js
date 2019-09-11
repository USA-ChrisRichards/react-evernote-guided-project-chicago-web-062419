import React from "react";

const NoteItem = props => (
  <li onClick={() => props.handleNoteClick(props.note)}>
    <h2>{props.title}</h2>
    <p>{props.caption}</p>
  </li>
);

export default NoteItem;
