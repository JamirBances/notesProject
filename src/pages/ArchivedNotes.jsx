import React, { useEffect, useState } from "react";
import noteIdea from "../assets/noteIdea.svg";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  getCreateNoteThunks,
  setCreateNoteGlobal,
} from "../store/slices/createNote.slice";
import FormCreateNote from "../components/FormCreateNote";
import Swal from "sweetalert2";

const ArchivedNotes = () => {
  const dispatch = useDispatch();

  const [notesArchived, setNotesArchived] = useState([]);
  const [noteSelected, setNoteSelected] = useState(null);
  const createNote = useSelector((state) => state.createNote);
  
  const createNoteClick = () => {
    dispatch(setCreateNoteGlobal(!createNote));
  };

  useEffect(() => {
    dispatch(getCreateNoteThunks());
  }, []);

  useEffect(() => {
    axios
      .get("https://notesdb.up.railway.app/api/v1/notes/getAllNotesArchived")
      .then((res) => setNotesArchived(res.data.Notes));
  }, []);

  const getAllNotesArchived = () => {
    axios
      .get("https://notesdb.up.railway.app/api/v1/notes/getAllNotesArchived")
      .then((res) => setNotesArchived(res.data.Notes));
  };

  const unarchiveNote = (id) => {
    axios
      .put(`https://notesdb.up.railway.app/api/v1/notes/update/${id}`, {
        archived: false,
      })
      .then(() => getAllNotesArchived());
  };

  const selectNote = (note) => {
    setNoteSelected(note);
  };

  const deselectNote = () => {
    setNoteSelected(null);
  };

  const deleteNote = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this note?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      color: "#FFFFFF",
      background: "#5B6688",
      confirmButtonColor: "#00ADBF",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://notesdb.up.railway.app/api/v1/notes/delete/${id}`)
          .then(() => getAllNotesArchived());
      }
    });
  };

  return (
    <div>
      <h1>Archived Notes</h1>
      <Row>
        {notesArchived.map((note) => (
          <Col lg={6} key={note.id}>
            <div className="home-notes">
              <div className="home-notes-information">
                <img src={noteIdea} alt="imgNote" />
                <div className="home-notes-information-text">
                  <p>{note.title}</p>
                  <p>Last edited: {note.date}</p>
                </div>
              </div>
              <div className="home-notes-icons">
                <button
                  className="home-notes-icons-button-pushable"
                  role="button"
                  onClick={() => unarchiveNote(note.id)}
                >
                  <span className="home-notes-icons-button-shadow"></span>
                  <span className="home-notes-icons-button-edge"></span>
                  <span className="home-notes-icons-button-front text">
                    <i className="fa-solid fa-box-archive"></i>
                  </span>
                </button>
                <button
                  className="home-notes-icons-button-pushable"
                  role="button"
                  onClick={() => selectNote(note)}
                >
                  <span className="home-notes-icons-button-shadow"></span>
                  <span className="home-notes-icons-button-edge"></span>
                  <span
                    className="home-notes-icons-button-front text"
                    onClick={() => createNoteClick()}
                  >
                    <i className="fa-solid fa-pencil"></i>
                  </span>
                </button>
                <button
                  className="home-notes-icons-button-pushable"
                  role="button"
                  onClick={() => deleteNote(note.id)}
                >
                  <span className="home-notes-icons-button-shadow"></span>
                  <span className="home-notes-icons-button-edge"></span>
                  <span className="home-notes-icons-button-front text">
                    <i className="fa-solid fa-trash-can"></i>
                  </span>
                </button>
              </div>
            </div>
          </Col>
        ))}
        {createNote === true && (
          <FormCreateNote
            getAllNotes={getAllNotesArchived}
            noteSelected={noteSelected}
            deselectNote={deselectNote}
          />
        )}
      </Row>
    </div>
  );
};

export default ArchivedNotes;
