import React, { Component } from "react";
import NoteList from "./NoteList";

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const notesArr = this.props.notes;
    // console.log(notesArr);
    return (
      <div className="master-detail-element sidebar">
        <NoteList
          notes={notesArr}
          handleNoteClick={this.props.handleNoteClick}
        />
        <button onClick={this.props.handleNewNote}>New</button>
      </div>
    );
  }
}

export default Sidebar;
