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
      editClicked: false,
      search: ""
    };
  }

  //* READ ******************************************************

  componentDidMount() {
    this.renderNotes();
  }

  renderNotes = () => {
    fetch("http://localhost:3000/api/v1/notes")
      .then(res => res.json())
      .then(noteData => {
        this.setState({
          notes: noteData
        });
      });
  };

  handleNoteClick = note => {
    this.setState({ noteClicked: note, editClicked: false });
  };

  //* UPDATE ******************************************************

  handleEditClick = note => {
    // show edit form with placeholder text of this.state.noteClicked
    this.setState({ editClicked: note });

    if (this.state.editClicked === false) {
      return false;
    } else {
      console.log("click");
      return true;
    }
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

  displayUpdatedNotes = updatedNote => {
    //map through, if note id matched updatedNote id, return updated note
    const updatedNotes = this.state.notes.map(note => {
      if (note.id === updatedNote.id) {
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

  handleCancel = () => {
    this.setState({ editClicked: false });
  };

  //* CREATE ******************************************************

  createNewNote = () => {
    let newNote = {
      user_id: 1,
      title: "Enter note title here",
      body: "Enter note details here"
    };
    fetch("http://localhost:3000/api/v1/notes", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newNote)
    })
      .then(res => res.json())
      .then(newNote =>
        this.setState(prevState => {
          return { notes: [...prevState.notes, newNote] };
        })
      );
  };

  //* DELETE ******************************************************

  handleDelete = deletedNote => {
    let deleteConfirmation = window.confirm(
      "Are you sure you want to DELETE THIS NOTE?"
    );
    if (deleteConfirmation === true) {
      fetch(`http://localhost:3000/api/v1/notes/${deletedNote.id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(deletedNote)
      })
        .then(res => res.json())
        .then(json => this.filterDeletedNote(deletedNote));
      alert("note deleted!");
      console.log(this.state.notes);
    } else {
      alert("Don't worry, your note is safe! 😄");
    }
  };

  filterDeletedNote(deletedNote) {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== deletedNote.id)
    });
    this.setState({ noteClicked: null });
  }

  //* FILTER/SEARCH FEATURE ********************************************

  handleSearch = input => {
    this.setState({ search: input });
  };

  filterNotes = () => {
    let notes = this.state.notes.filter(note =>
      note.title.toLowerCase().includes(this.state.search.toLowerCase())
    );
    return notes;
  };

  //**********************************************************************

  render() {
    return (
      <Fragment>
        <Search handleSearch={this.handleSearch} />
        <div className="container">
          <Sidebar
            notes={this.filterNotes}
            handleNoteClick={this.handleNoteClick}
            createNewNote={this.createNewNote}
            filterNotes={this.filterNotes}
          />
          <Content
            updateNote={this.updateNote}
            handleCancel={this.handleCancel}
            handleEditClick={this.handleEditClick}
            handleDelete={this.handleDelete}
            editClicked={this.state.editClicked}
            notes={this.state.notes}
            noteClicked={this.state.noteClicked}
          />
        </div>
      </Fragment>
    );
  }
}

export default NoteContainer;
