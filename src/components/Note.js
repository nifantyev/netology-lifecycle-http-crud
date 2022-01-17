import React from 'react';
import PropTypes from 'prop-types';

const Note = ({ id, content, onRemove }) => {
  const handleClick = () => {
    onRemove(id);
  };

  return (
    <div className="note">
      <pre>{content}</pre>
      <a href="#/" className="note-remove" onClick={handleClick}>
        <span className="material-icons">close</span>
      </a>
    </div>
  );
};

Note.propTypes = {
  id: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default Note;
