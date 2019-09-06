import React, { Component, Fragment } from "react";
import Search from "./Search";
import Sidebar from "./Sidebar";
import Content from "./Content";

class NoteContainer extends Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      selectedNote: {}
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

  displayNotesInSidebar = () => {};

  // displayNoteInContent = () => {};

  handleNoteClick = () => {
    console.log("display this note in content/noteViewer");
    // displayNoteInContent();
  };

  handleNewNoteClick = () => {
    console.log("click... New note form to appear");
  };

  render() {
    // console.log(this.state.notes);
    return (
      <Fragment>
        <Search />
        <div className="container">
          <Sidebar
            notes={this.state.notes}
            displayNotesInSidebar={this.displayNotesInSidebar}
            handleNewNoteClick={this.handleNewNoteClick}
            handleNoteClick={this.handleNoteClick}
          />
          <Content notes={this.state.notes} />
        </div>
      </Fragment>
    );
  }
}

export default NoteContainer;
