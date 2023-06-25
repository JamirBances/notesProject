import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setCreateNoteGlobal } from "../store/slices/createNote.slice";
import { setDataNoteGlobal } from "../store/slices/dataNote.slice";
import axios from "axios";

const FormCreateNote = ({ getAllNotes, noteSelected, deselectNote }) => {
  const { handleSubmit, register, reset } = useForm();

  const dispatch = useDispatch();
  const createNoteCanceled = () => {
    dispatch(setCreateNoteGlobal(false));
  };

  useEffect(() => {
    if (noteSelected !== null) {
      reset(noteSelected);
    } else {
      reset({
        title: "",
        content: "",
      });
    }
  }, [noteSelected]);

  /* const createNote = useSelector((state) => state.createNote); */

  /* const dataNote = useSelector((state) => state.dataNote);
  console.log(dataNote); */

  const submit = (data) => {
    /* dispatch(setDataNoteGlobal(data)); */
    if (noteSelected !== null) {
      axios
        .put(
          `https://notesdb.up.railway.app/api/v1/notes/update/${noteSelected.id}`,
          data
        )
        .then(() => {
          getAllNotes(), deselectNote();
        });
    } else {
      axios
        .post("https://notesdb.up.railway.app/api/v1/notes/create", data)
        .then(() => getAllNotes())
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="form-create-note-container-father">
      <div className="form-create-note-container">
        <div className="form-create-note-background">
          <div className="form-create-note-title">
            <h1 className="form-create-note-h1">Create/Edit note</h1>
          </div>
          <form className="form-create-note">
            <div className="form-create-note-subtitles">
              <label htmlFor="title">Title: </label>
              <label htmlFor="content">Content: </label>
            </div>
            <div className="form-create-note-textareas">
              <input
                {...register("title")}
                type="text"
                id="title"
                placeholder="Great title"
              />
              <textarea
                {...register("content")}
                type="text"
                id="content"
                placeholder="Write your note..."
              ></textarea>
            </div>
          </form>
          <div className="form-create-note-button-container">
            <button className="form-create-note-button">
              <span className="form-create-note-button-shadow"></span>
              <span className="form-create-note-button-edge"></span>
              <span
                className="form-create-note-button-front text"
                onClick={createNoteCanceled}
              >
                <i className="fa-solid fa-xmark"></i> Cancel
              </span>
            </button>
            <button
              className="form-create-note-button"
              onClick={createNoteCanceled}
            >
              <span className="form-create-note-button-shadow"></span>
              <span className="form-create-note-button-edge"></span>
              <span
                className="form-create-note-button-front text"
                onClick={handleSubmit(submit)}
              >
                <i className="fa-regular fa-floppy-disk"></i> Save
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormCreateNote;
