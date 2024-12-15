import React, { useState, useEffect } from 'react';
import TagInput from '../../components/Input/TagInput';
import axiosInstance from '../../utils/axiosInstance';
import StoryPrompt from './StoryPrompt';

const AddEditNotes = ({ noteData, type, getAllNotes, onClose }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);

  // Add Note
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", { title, content, tags });
      if (response.data && response.data.note) {
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  };

  // Edit Note
  const editNote = async () => {
    try {
      const response = await axiosInstance.put(`/edit-note/${noteData._id}`, { title, content, tags });
      if (response.data && response.data.note) {
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  };

  const handleAddEditNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }

    if (!content) {
      setError("Please enter the content");
      return;
    }

    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  useEffect(() => {
    if (type === "edit" && noteData) {
      setTitle(noteData.title);
      setContent(noteData.content);
      setTags(noteData.tags);
    }
  }, [type, noteData]);

  return (
    <div>
      <div className="flex flex-col gap-2">
        <label className="input-label"></label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none bg-white p-2 rounded-md border border-transparent"
          placeholder="Enter the title"
          value={title}
          onChange={({ target }) => {
            setTitle(target.value);
            if (error) setError(null);
          }}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label"></label>
        <textarea
          type="text"
          className="text-sm text-slate-950 outline-none bg-white p-2 rounded-md border border-transparent resize-none"
          placeholder=". . ."
          rows={10}
          value={content}
          onChange={({ target }) => {
            setContent(target.value);
            if (error) setError(null);
          }}
        />
      </div>

      <div className="mt-3">
        <label className="input-label"></label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      <button
        className="btn-primary font-medium mt-5 p-3"
        onClick={handleAddEditNote}
      >
        {type === "edit" ? "EDIT" : "ADD"}
      </button>
    </div>
  );
};

export default AddEditNotes;
