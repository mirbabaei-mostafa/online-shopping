import { useTranslation } from 'react-i18next';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import detectBrowserLanguage from 'detect-browser-language';
import langs from '../data/languages.json';
import { useEffect, useState } from 'react';

const Header = () => {
  const { t, i18n } = useTranslation();
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
        <span onClick={() => navigate('/')}>Online-Shopping</span>
      </div>
      <div className="headerMenu">
        <div className="searchPannel">
          <div className="searchPannelCategory">Alle</div>
          <div className="searchPannelInputBox">
            <input />
          </div>
        </div>
        <div className="languageSelector">
          <img src={currentFlag} className="languageSelectorFlag" />{' '}
          <span>{currentLang}</span>
          <div className="languageList">
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
        <div>
          <Link to="/signin">{t('Signin')}</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
