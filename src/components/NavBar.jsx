import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setCreateNoteGlobal } from "../store/slices/createNote.slice";

const NavBar = () => {

  const createNote = useSelector(state => state.createNote);
  const dispatch = useDispatch();

  const createNoteClick = () => {
    dispatch(setCreateNoteGlobal(!createNote));
  };

  const archivedNotesDefaultNote = () => {
    dispatch(setCreateNoteGlobal(false));
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          My notes
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" onClick={createNoteClick}>
              <span>Create Note <i className="fa-regular fa-note-sticky"></i></span>
              <div className="liquid"></div>
            </Nav.Link>
            <Nav.Link as={Link} to="/archivednotes" onClick={archivedNotesDefaultNote}>
              Archived notes
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
