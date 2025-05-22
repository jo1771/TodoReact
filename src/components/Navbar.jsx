import { useContext, useState } from "react";
import searchIcon from "../assets/images/search.svg";
import backIcon from "../assets/images/back.svg";
import clearIcon from "../assets/images/close.svg";
import { TodoContext } from "../context/todoContext";
import { useTranslation } from "react-i18next";

const Navbar = () => {
	const { i18n, t } = useTranslation();
	const [show, setShow] = useState(true);
	const [language, setLanguage] = useState(i18n.language);
	const { searchValue, setSearchValue } = useContext(TodoContext);

	const reset = () => {
		setShow(true);
		setSearchValue("");
	};
	const changeLang = () => {
		const currentLang = language == "ru" ? "uz" : "ru";
		setLanguage(currentLang);
		i18n.changeLanguage(currentLang);
	};

	return (
		<header className="header">
			<div className="header__nav">
				{show ? (
					<>
						<button
							className="header__nav-lang"
							onClick={() => changeLang()}
						>
							{language}
						</button>
						<h1 className="header__nav-title">{t("title")}</h1>
						<button
							className="header__nav-search"
							onClick={() => setShow(false)}
						>
							<img src={searchIcon} alt="" />
						</button>
					</>
				) : (
					<>
						<button
							className="header__nav-back"
							onClick={() => reset()}
						>
							<img src={backIcon} alt="" />
						</button>
						<input
							className="header__nav-input"
							type="text"
							placeholder={t("search") + "..."}
							value={searchValue}
							onChange={(e) => setSearchValue(e.target.value)}
						/>
						<button className="header__nav-clear">
							<img src={clearIcon} alt="" />
						</button>
					</>
				)}
			</div>
		</header>
	);
};

export default Navbar;
