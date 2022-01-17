import React from 'react';
import Note from './Note';

const API_URL = 'http://localhost:7777';

class Notes extends React.Component {
  state = {
    loading: true,
    notes: [],
    noteText: '',
  };

  componentDidMount() {
    this.loadNotes();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleNewNote = (event) => {
    event.preventDefault();
    fetch(`${API_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: 0, content: this.state.noteText }),
    }).then((response) => {
      this.setState({ noteText: '' });
      this.loadNotes();
    });
  };

  handleRemove = (id) => {
    fetch(`${API_URL}/notes/${id}`, {
      method: 'DELETE',
    }).then((response) => this.loadNotes());
  };

  handleRefresh = (event) => {
    event.preventDefault();
    this.loadNotes();
  };

  loadNotes = () => {
    this.setState({ loading: true });
    fetch(`${API_URL}/notes`)
      .then((response) => response.json())
      .then((data) => this.setState({ notes: data, loading: false }));
  };

  render() {
    return (
      <>
        <div className="header">
          <h1>Notes</h1>
          <a href="#/" className="refresh" onClick={this.handleRefresh}>
            <span className="material-icons">sync</span>
          </a>
        </div>
        {this.state.loading ? (
          <div>Загрузка...</div>
        ) : (
          <div className="note-list">
            {this.state.notes.map((item) => (
              <Note
                key={item.id}
                id={item.id}
                content={item.content}
                onRemove={this.handleRemove}
              />
            ))}
          </div>
        )}
        <div className="note-form">
          <p>New Note</p>
          <textarea
            className="note-textarea"
            name="noteText"
            value={this.state.noteText}
            onChange={this.handleChange}
          />
          <a className="note-send" href="#/" onClick={this.handleNewNote}>
            <span className="material-icons">send</span>
          </a>
        </div>
      </>
    );
  }
}

export default Notes;
