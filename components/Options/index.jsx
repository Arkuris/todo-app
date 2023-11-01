import { useContext } from 'react';
import React, { useState } from 'react';
import { ThemeContext } from '../../context/Theme/ThemeProvider';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Options () {
  const [showModal, setShowModal] = useState(false);
  const theme = useContext(ThemeContext);

  const buttonStyle = {
    backgroundColor: theme.mode === 'light' ? theme.primaryColor : theme.secondaryColor,
    color: theme.mode === 'light' ? '#000' : '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Open Theme Options
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Theme Options</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>Current Mode: {theme.mode}</h2>
          <button style={buttonStyle} onClick={theme.toggleMode}>Toggle Theme Mode!</button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Options;
