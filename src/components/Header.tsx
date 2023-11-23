import { useTranslation } from "react-i18next";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import detectBrowserLanguage from "detect-browser-language";
import { BsSearch, BsCaretDownFill } from "react-icons/bs";
import langs from "../data/languages.json";
import { useEffect, useState } from "react";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [langDisplay, setLangDisplay] = useState<string>("none");
  const [currentLang, setLang] = useState<string>(detectBrowserLanguage());
  const getFlag = () => {
    const cl = langs.filter((lang) => lang.type === currentLang);
    return cl[0].flag;
  };
  const [currentFlag, setFlag] = useState<string>(getFlag());
  const navigate = useNavigate();

  const changeLange = (l: string, lt: string) => {
    i18n.changeLanguage(l);
    setLang(lt);
  };

  useEffect(() => {
    setFlag(getFlag());
  }, [currentLang]);

  return (
    <div className="headerBox">
      <div className="headerLogo">
        <span onClick={() => navigate("/")}>Online-Shopping</span>
      </div>
      <div className="headerMenu">
        <div className="searchPannel">
          <div className="searchPannelCategory">
            {t("All")} <BsCaretDownFill />
          </div>
          <div className="searchPannelInputBox">
            <input className="searchPannelInput" placeholder={t("Search")} />
          </div>
          <div className="searchPannelSearchButton">
            <BsSearch />
          </div>
        </div>
        <div
          className="languageSelector"
          onMouseOver={() => setLangDisplay("inline-block")}
          onMouseOut={() => setLangDisplay("none")}
        >
          <img src={currentFlag} className="languageSelectorFlag" />{" "}
          <span>{currentLang}</span>
          <div className="languageList" style={{ display: langDisplay }}>
            {langs.map((lang, index) => {
              return (
                <div
                  key={index}
                  onClick={() => changeLange(lang.language, lang.type)}
                  className="languageItem"
                >
                  {lang.type}
                </div>
              );
            })}
          </div>
        </div>
        <div className="signinBox">
          <Link to="/signin">{t("Signin")}</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
