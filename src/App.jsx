import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Notes from "./components/Notes";
import editIcon from "./assets/images/edit.svg";
import Modal from "./components/Modal";
import { TodoContext } from "./context/todoContext";
import { ToastContainer } from "react-toastify";

const App = () => {
  const setLS = () => (localStorage.notes = JSON.stringify(notes));
  const getLS = () =>
    localStorage.notes ? JSON.parse(localStorage.notes) : [];

  const [isEdit, setIsEdit] = useState(false);
  const [notes, setNotes] = useState(getLS());
  const [searchValue, setSearchValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const filterNotes = notes.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const close = () => {
    setIsModalOpen(false);
  };
  const [editNote, setEditNote] = useState(null);
  const addOrChangeHandler = (note) => {
    if (editNote?.id) {
      const updateNotes = notes.map((item) => {
        if (item.id == note.id) {
          return note;
        }
        return item;
      });
      setNotes(updateNotes);
    } else {
      setNotes([...notes, note]);
    }
  };
  const openModal = () => {
    setIsModalOpen(true);
    setIsEdit(false);
    setEditNote(null);
  };
  const changeHandler = (note) => {
    setIsModalOpen(true);
    setIsEdit(true);
    setEditNote(note);
  };
  const deleteHandler = (id) => {
    setNotes(notes.filter((item) => item.id != id));
  };
  useEffect(() => {
    setLS();
  }, [notes]);

  return (
    <>
      <TodoContext.Provider
        value={{
          close,
          changeHandler,
          deleteHandler,
          addOrChangeHandler,
          searchValue,
          setSearchValue,
        }}
      >
        <Navbar />
        <Notes notes={filterNotes} />
        {isModalOpen && <Modal isEdit={isEdit} editNote={editNote} />}

        {!isModalOpen && (
          <button className="add__btn" onClick={() => openModal()}>
            <img src={editIcon} alt="" />
          </button>
        )}

        <ToastContainer />
      </TodoContext.Provider>
    </>
  );
};

export default App;
