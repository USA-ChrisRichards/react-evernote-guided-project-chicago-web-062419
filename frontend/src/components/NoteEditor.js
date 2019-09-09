import React, { Component } from "react";

class NoteEditor extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <form className="note-editor">
        <input type="text" name="title" defaultValue={this.props.note.title} />
        <textarea name="body" defaultValue={this.props.note.body} />
        <div className="button-row">
          <input className="button" type="submit" value="Save" />
          <button type="button">Cancel</button>
        </div>
      </form>
    );
  }
}

export default NoteEditor;
