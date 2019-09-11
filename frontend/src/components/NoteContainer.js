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

  handleCancel = () => {
    this.setState({ editClicked: false });
  };

  handleNoteClick = note => {
    this.setState({ noteClicked: note, editClicked: false });
  };

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
    }).then(() => this.renderNotes());
  };

  handleDelete = id => {
    console.log(id);
    console.log("delete pending further work by me");
    let deleteConfirmation = window.confirm("Delete this note?");
    if (deleteConfirmation == true) {
      // fetch(`http://localhost:3000/api/v1/notes/${id}`, {
      //   method: "DELETE",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify(newNote)
      // }).then(() => this.renderNotes());
      // alert("note deleted!")
    } else {
      alert("Don't worry, your note is safe! 😄");
    }
  };

  handleSearch = input => {
    this.setState({ search: input });
  };

  filterNotes = () => {
    let notes = this.state.notes.filter(note =>
      note.title.toLowerCase().includes(this.state.search.toLowerCase())
    );
    return notes;
  };

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
            handleSubmit={this.handleSubmit}
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
