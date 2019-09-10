import React, { Component, Fragment } from "react";
import Search from "./Search";
import Sidebar from "./Sidebar";
import Content from "./Content";

class NoteContainer extends Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      noteClicked: null,
      editClicked: false
    };
  }

  displayUpdatedNotes = updatedNote => {
    //map through, if note id matched updatedNote id, return updated note
    const updatedNotes = this.state.notes.map(note => {
      if (note.id == updatedNote.id) {
        return updatedNote;
      } else {
        return note;
      }
    });
    this.setState({
      notes: updatedNotes,
      noteClicked: updatedNote,
      editClicked: false
    });
  };

  updateNote = (changes, id) => {
    console.log(changes, id);
    fetch(`http://localhost:3000/api/v1/notes/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "PATCH",
      body: JSON.stringify(changes)
    })
      .then(res => res.json())
      .then(note => this.displayUpdatedNotes(note))
      .catch(error => console.log(error));
  };

  componentDidMount() {
    fetch("http://localhost:3000/api/v1/notes")
      .then(res => res.json())
      .then(noteData => {
        this.setState({
          notes: noteData
        });
      });
  }

  handleCancel = () => {
    this.setState({ editClicked: false });
  };

  handleNoteClick = note => {
    this.setState({ noteClicked: note, editClicked: false });
  };

  handleEditClick = note => {
    // onClick= handleEditClick
    // show edit form with placeholder text of this.state.noteClicked
    this.setState({ editClicked: note });

    if (this.state.editClicked === false) {
      return false;
    } else {
      console.log("click");
      return true;
    }
  };

  displayNewNote = newNote => {};

  handleNewNote = newNote => {
    console.log("new note");
    fetch(`http://localhost:3000/api/v1/notes/`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(newNote)
    })
      .then(res => res.json())
      .then(note => console.log(note));
  };

  render() {
    return (
      <Fragment>
        <Search />
        <div className="container">
          <Sidebar
            notes={this.state.notes} // STATE
            handleNoteClick={this.handleNoteClick}
            handleNewNote={this.handleNewNote}
          />
          <Content
            updateNote={this.updateNote}
            handleSubmit={this.handleSubmit}
            handleCancel={this.handleCancel}
            handleEditClick={this.handleEditClick}
            editClicked={this.state.editClicked} // STATE
            notes={this.state.notes} // STATE
            noteClicked={this.state.noteClicked} // STATE
          />
        </div>
      </Fragment>
    );
  }
}

export default NoteContainer;
