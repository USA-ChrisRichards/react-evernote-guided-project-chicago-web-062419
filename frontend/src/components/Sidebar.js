import React, { Component } from "react";
import NoteList from "./NoteList";

class Sidebar extends Component {
  render() {
    const notesArr = this.props.notes;
    return (
      <div className="master-detail-element sidebar">
        <NoteList
          notes={notesArr}
          handleNoteClick={this.props.handleNoteClick}
          filterNotes={this.props.filterNotes()}
        />
        <button onClick={this.props.createNewNote}>New</button>
      </div>
    );
  }
}

export default Sidebar;
