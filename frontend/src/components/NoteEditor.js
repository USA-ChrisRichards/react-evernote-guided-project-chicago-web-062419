import React, { Component } from "react";

class NoteEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.note.title,
      body: props.note.body
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    //use [] around key because we want the value of event.target.name, not just 'event.target.name'
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.updateNote(this.state, this.props.note.id);
  };

  // Save button which saves the note via a PATCH request
  // Cancel button which discards any changes and reverts back to displaying the note.
  // Clicking a different note while in edit mode should discard your changes and display the new note instead.

  render() {
    return (
      <form className="note-editor" onSubmit={this.handleSubmit}>
        <input
          onChange={this.handleChange}
          type="text"
          name="title"
          defaultValue={this.props.note.title}
        />
        <textarea
          onChange={this.handleChange}
          name="body"
          defaultValue={this.props.note.body}
        />
        <div className="button-row">
          <input className="button" type="submit" value="Save" />
          <button onClick={this.props.handleCancel} type="button">
            Cancel
          </button>
        </div>
      </form>
    );
  }
}

export default NoteEditor;
