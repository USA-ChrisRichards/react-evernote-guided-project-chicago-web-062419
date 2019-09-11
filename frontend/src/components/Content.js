import React, { Component } from "react";
import NoteEditor from "./NoteEditor";
import NoteViewer from "./NoteViewer";
import Instructions from "./Instructions";

/*
  Advice: If you cannot figure out how to get this component to work,
          move the div and renderContent up into NoteContainer and
          try to get it to work in the parent first.
          Then complete the rest of your app before attempting to
          refactor to get this Content component to work.
*/
class Content extends Component {
  constructor(props) {
    super(props);
  }
  //PROPS => notes, noteClicked, handleEditClick()

  renderContent = () => {
    if (this.props.editClicked) {
      return (
        <NoteEditor
          updateNote={this.props.updateNote}
          handleSubmit={this.props.handleSubmit}
          handleEditClick={this.props.handleEditClick}
          note={this.props.noteClicked}
          handleCancel={this.props.handleCancel}
        />
      );
    } else if (this.props.noteClicked) {
      return (
        <NoteViewer
          note={this.props.noteClicked}
          handleEditClick={this.props.handleEditClick}
          handleDelete={this.props.handleDelete}
        />
      );
    } else {
      return <Instructions />;
    }
  };

  render() {
    return (
      <div className="master-detail-element detail">{this.renderContent()}</div>
    );
  }
}

export default Content;
