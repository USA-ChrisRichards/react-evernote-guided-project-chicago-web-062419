import React from "react";
import NoteItem from "./NoteItem";

const NoteList = props => {
  const notesList = props.filterNotes.map(note => {
    let caption = "";
    if (note.body.length > 15) {
      caption = note.body.substring(0, 15) + "...";
    } else {
      caption = note.body;
    }
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
