import editIcon from "../assets/images/edit.svg";
import delIcon from "../assets/images/del.svg";
import clsx from "clsx";
import { useContext } from "react";
import { TodoContext } from "../context/todoContext";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const NotesItem = ({ note, view }) => {
	const { t } = useTranslation();
	const { deleteHandler, changeHandler, searchValue } =
		useContext(TodoContext);
	const deleteNote = (id) => {
		deleteHandler(id);
		toast.error(t("delNote"), {
			position: "top-right",
			autoClose: 2000,
			pauseOnHover: false,
		});
	};
	const notesItemTop = clsx("notes__item-top", { active: !view });

	return (
		<div className="notes__item">
			<div className={notesItemTop}>
				<h3 className="notes__item-top-title">{note.title}</h3>
				<p className="notes__item-top-date">{note.date}</p>
			</div>
			<p className="notes__item-text">{note.text}</p>
			{!searchValue && (
				<div className="notes__item-btns">
					<button
						className="notes__item-btn purple"
						onClick={() => changeHandler(note)}
					>
						<img src={editIcon} alt="" />
						<span>{t("edit")}</span>
					</button>
					<button
						className="notes__item-btn red"
						onClick={() => deleteNote(note.id)}
					>
						<img src={delIcon} alt="" />
						<span>{t("del")}</span>
					</button>
				</div>
			)}
		</div>
	);
};

export default NotesItem;
