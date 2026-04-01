import { createContext, useState } from 'react';
import { deviceWidth } from '../utility/uniqueIdGenerator';
import { useCallback } from 'react';
export const Context = createContext({
  language: 'en',
  darkmode: 'off',
  changeLanguage: () => {},
  changeDarkMode: () => {},
  mobileViewOn: false,
  findUser: null,
  tokenContext: null,
  findUserFunction: () => {},
  handleToken: () => {},
  navopen: false,
  handleNavOpen: () => {},
  sticky: false,
  handleSticky: () => {},
  loading: false,
  handleSetLoading: () => {},
  handleMobileView: () => {},
});
export default function ContextProvider({ children }) {
  const [language, setLanguage] = useState('en');
  const [darkmode, setDarkMode] = useState('off');
  const [findUser, setFindUser] = useState(null);
  const [tokenContext, setToken] = useState(null);
  const [navopen, setNavOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mobileViewOn, setMobileViewOn] = useState(false);
  function handleNavOpen() {
    setNavOpen((pre) => {
      return !pre;
    });
  }
  const handleMobileView = useCallback(function handleMobileView() {
    const mobileView = deviceWidth();
    setMobileViewOn(mobileView);
  }, []);
  const handleSticky = useCallback(function handleSticky() {
    setSticky(window.scrollY > 0);
  }, []);
  function changeLanguage(value) {
    setLanguage(value);
    document.documentElement.lang = value === 'ta' ? 'ta' : 'en';
  }
  const handleSetLoading = useCallback(function handleSetLoading(value) {
    setLoading(value);
  }, []);
  function changeDarkMode(value) {
    setDarkMode(value);
  }
  const findUserFunction = useCallback(function findUserFunction(value) {
    setFindUser(value);
  }, []);
  const handleToken = useCallback(function handleToken(value) {
    setToken(value);
  }, []);
  const ctxvalue = {
    language,
    changeLanguage,
    darkmode,
    changeDarkMode,
    mobileViewOn,
    findUser,
    findUserFunction,
    tokenContext,
    handleToken,
    navopen,
    handleNavOpen,
    sticky,
    handleSticky,
    loading,
    handleSetLoading,
    handleMobileView,
  };
  return <Context.Provider value={ctxvalue}>{children}</Context.Provider>;
}