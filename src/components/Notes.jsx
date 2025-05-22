import { useContext, useState } from "react";
import listIcon from "../assets/images/list.svg";
import gridIcon from "../assets/images/grid.svg";
import NotesItem from "./NotesItem";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { TodoContext } from "../context/todoContext";

const Notes = ({ notes }) => {
	const [view, setView] = useState(true);
	const { t } = useTranslation();
	const { searchValue } = useContext(TodoContext);
	const viewIcon = view ? listIcon : gridIcon;
	const spanText = view ? t("list") : t("grid");
	const notesList = clsx("notes__list", { active: !view });

	return (
		<main className="main">
			<div className="container">
				<div className="notes">
					<div className="notes__top">
						<h2 className="notes__top-title">
							{searchValue && notes.length
								? t("search")
								: notes.length
								? t("allNotes")
								: t("noNotes")}
						</h2>
						<button
							className="notes__top-btn"
							onClick={() => setView(!view)}
						>
							<img src={viewIcon} alt="" />
							<span>{spanText}</span>
						</button>
					</div>
					<div className={notesList}>
						{notes?.map((note) => (
							<NotesItem note={note} view={view} key={note.id} />
						))}
					</div>
				</div>
			</div>
		</main>
	);
};

export default Notes;
