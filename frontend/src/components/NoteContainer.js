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

  componentDidMount() {
    fetch("http://localhost:3000/api/v1/notes")
      .then(res => res.json())
      .then(noteData => {
        this.setState({
          notes: noteData
        });
      });
  }

  handleNoteClick = note => {
    this.setState({ noteClicked: note });
    console.log("state being changed to:", note);
  };

  handleEditClick = note => {
    // onClick= handleEditClick
    // show edit form with placeholder text of this.state.noteClicked
    this.setState({ editClicked: true });

    if (this.state.editClicked === false) {
      return false;
    } else {
      console.log("click");
      return true;
    }

    // fetch patch request to edit the note
  };

  render() {
    return (
      <Fragment>
        <Search />
        <div className="container">
          <Sidebar
            notes={this.state.notes} // STATE
            handleNoteClick={this.handleNoteClick}
          />
          <Content
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
