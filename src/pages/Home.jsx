import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import noteIdea from "../assets/noteIdea.svg";
import FormCreateNote from "../components/FormCreateNote";
import {
  getCreateNoteThunks,
  setCreateNoteGlobal,
} from "../store/slices/createNote.slice";
import axios from "axios";
import Swal from "sweetalert2";

const Home = () => {
  const dispatch = useDispatch();

  const createNote = useSelector((state) => state.createNote);
  const dataNote = useSelector((state) => state.dataNote);

  const [notes, setNotes] = useState([]);
  const [noteSelected, setNoteSelected] = useState(null);

  const createNoteClick = () => {
    dispatch(setCreateNoteGlobal(!createNote));
  };

  useEffect(() => {
    dispatch(getCreateNoteThunks());
  }, []);

  useEffect(() => {
    axios
      .get("https://notesdb.up.railway.app/api/v1/notes/getallnotes")
      .then((res) => setNotes(res.data.Notes));
  }, []);

  const getAllNotes = () => {
    axios
      .get("https://notesdb.up.railway.app/api/v1/notes/getallnotes")
      .then((res) => setNotes(res.data.Notes));
  };

  const selectNote = (note) => {
    setNoteSelected(note);
  };

  const deselectNote = () => {
    setNoteSelected(null);
  };

  const archivedNote = (id) => {
    console.log(id);
    axios
      .put(`https://notesdb.up.railway.app/api/v1/notes/update/${id}`, {
        archived: true,
      })
      .then(() => getAllNotes());
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
          .then(() => getAllNotes());
      }
    });
  };

  return (
    <div className="home">
      <h1>Home</h1>
      <Row>
        {notes.map((note) => (
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
                  onClick={() => archivedNote(note.id)}
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
            getAllNotes={getAllNotes}
            noteSelected={noteSelected}
            deselectNote={deselectNote}
          />
        )}
      </Row>
    </div>
  );
};

export default Home;
