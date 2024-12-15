import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import NoteCard from '../../components/Cards/NoteCard';
import { MdAdd, MdClose } from "react-icons/md";
import AddEditNotes from './AddEditNotes';
import Modal from "react-modal";
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import StoryPrompt from './StoryPrompt'; // Import the StoryPrompt component

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();

  // Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  // Get all notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  // Edit Note
  const editNote = (note) => {
    setOpenAddEditModal({ isShown: true, type: "edit", data: note });
  };

  // Delete Note
  const deleteNote = async (noteId) => {
    try {
      await axiosInstance.delete(`/delete-note/${noteId}`);
      getAllNotes(); // Refresh the notes after deletion
    } catch (error) {
      console.log("Error deleting note");
    }
  };

  // Search for a Note
  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query },
      });

      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
  }, []);

  return (
    <>
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />

      <div className="container mx-auto mt-8">
        {allNotes.length === 0 ? (
          <div className="flex items-center justify-center h-[70vh]">
            <div className="text-gray-500 text-s font-semibold">
              Out of nothing, something can be created.
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {allNotes.map((item) => (
              <NoteCard 
                key={item._id}
                title={item.title} 
                date={item.createdOn} 
                content={item.content}
                tags={item.tags}
                onEdit={() => editNote(item)}  
                onDelete={() => deleteNote(item._id)}  
              />
            ))}
          </div>
        )}
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-black hover:bg-gray-800 absolute right-10 bottom-10" 
        onClick={() => setOpenAddEditModal({ isShown: true, type: "add", data: null })}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal 
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.5)", // dim the background
          },
        }}
        contentLabel="Add or Edit Note"
        className="w-[60vw] max-h-[95vh] bg-white rounded-md mx-auto mt-14 p-6"
      >
        <div className="modal-scrollable">
          <div className="flex justify-between">
            <button
              className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
              onClick={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
            >
              <MdClose className="text-xl text-slate-400" />
            </button>
            <StoryPrompt /> {/* This will place the "?" button */}
          </div>

          <AddEditNotes 
            type={openAddEditModal.type}
            noteData={openAddEditModal.data}
            onClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
            getAllNotes={getAllNotes}
          />
        </div>
      </Modal>
    </>
  );
};

export default Home;
