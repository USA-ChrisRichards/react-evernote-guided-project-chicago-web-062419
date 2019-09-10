import React from "react";
import NoteItem from "./NoteItem";

const NoteList = props => {
  const notesList = props.notes.map(note => {
    let caption = note.body.substring(0, 15);
    // caption will limit character showing and NoteItem has '...' in <p>
    return (
      <NoteItem
        key={note.id}
        note={note}
        title={note.title}
        caption={caption}
        handleNoteClick={props.handleNoteClick}
      />
    );
  });
  return <ul>{notesList}</ul>;
};

export default NoteList;
