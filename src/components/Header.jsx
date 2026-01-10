import { useState, useContext, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { Context } from "../context/ContextApi";
import { useTheme } from "../context/ThemeContext"; // Импортируем хук темы

import Loader from "../shared/loader"; 

import ytlogo from "/logo.png";
import logo from "/youtube.png";

import { SlMenu } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { FiBell } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import { BsSun, BsMoon } from "react-icons/bs"; // Иконки для темы

import AuthModal from "./AuthModal";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const { loading, mobileMenu, setMobileMenu } = useContext(Context);
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme(); // Получаем состояние темы

  const navigate = useNavigate();
  const profileRef = useRef(null);

  const { pathname } = useLocation();
  const pageName = pathname?.split("/")?.filter(Boolean)?.[0] || "";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchQueryHandler = (event) => {
    if (
      (event?.key === "Enter" || event === "searchButton") &&
      searchQuery.trim().length > 0
    ) {
      navigate(`/searchResult/${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const mobileMenuToggle = () => {
    setMobileMenu(!mobileMenu);
  };

  return (
    <>
      <div className="sticky top-0 z-20 flex flex-row items-center justify-between h-14 px-4 md:px-5 bg-white dark:bg-black transition-colors duration-300">
        {loading && <Loader />}

        <div className="flex h-5 items-center">
          {pageName !== "video" && (
            <div
              className="flex md:hidden mr-4 cursor-pointer items-center justify-center h-10 w-10 rounded-full hover:bg-[#0000001a] dark:hover:bg-[#ffffff1a]"
              onClick={mobileMenuToggle}
            >
              {mobileMenu ? (
                <CgClose className="text-black dark:text-white text-xl" />
              ) : (
                <SlMenu className="text-black dark:text-white text-xl" />
              )}
            </div>
          )}

          <Link to="/" className="flex items-center">
            <img className="hidden dark:hidden md:block h-8" src={ytlogo} alt="YouTube" />
            <img className="h-8 md:hidden" src={logo} alt="YouTube" />
          </Link>
        </div>

        <div className="group flex items-center flex-grow max-w-[700px] mx-4 md:mx-10">
          <div className="flex flex-grow h-10 bg-[#f0f0f0] dark:bg-[#121212] border border-[#ccc] dark:border-[#303030] rounded-l-full overflow-hidden focus-within:border-blue-500">
            <input
              type="text"
              className="flex-grow bg-transparent outline-none px-4 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Поиск"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
          </div>
          <button
            className="h-10 w-16 bg-[#f0f0f0] dark:bg-[#181818] border border-l-0 border-[#ccc] dark:border-[#303030] rounded-r-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-[#303030]"
            onClick={() => searchQueryHandler("searchButton")}
          >
            <IoIosSearch className="text-xl text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <div className="flex items-center gap-2 md:gap-4 relative" ref={profileRef}>
          {/* КНОПКА ПЕРЕКЛЮЧЕНИЯ ТЕМЫ */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#303030] transition-all duration-200"
            title={theme === "dark" ? "Переключить на светлую" : "Переключить на темную"}
          >
            {theme === "dark" ? (
              <BsSun className="text-xl text-yellow-400" />
            ) : (
              <BsMoon className="text-xl text-gray-600" />
            )}
          </button>

          {isAuthenticated && (
            <div className="hidden md:flex items-center gap-2">
              <div className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#303030] cursor-pointer">
                <RiVideoAddLine className="text-xl text-black dark:text-white" />
              </div>
              <div className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#303030] cursor-pointer">
                <FiBell className="text-xl text-black dark:text-white" />
              </div>
            </div>
          )}

          {isAuthenticated ? (
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="h-9 w-9 md:h-10 md:w-10 rounded-full overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all duration-200"
            >
              <img
                src={user?.avatar || "https://via.placeholder.com/40"}
                alt={user?.name || "Profile"}
                className="w-full h-full object-cover"
              />
            </button>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="px-4 py-1.5 bg-white dark:bg-[#0f0f0f] border border-gray-300 dark:border-gray-600 rounded-full text-sm font-medium hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition text-black dark:text-white"
            >
              Войти
            </button>
          )}

          {showProfileMenu && isAuthenticated && (
            <div className="absolute right-0 top-14 w-72 bg-white dark:bg-[#0f0f0f] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 text-black dark:text-white z-50 overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="font-medium">{user?.name || "Пользователь"}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{user?.email}</div>
              </div>
              <div className="py-1">
                <div className="px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] cursor-pointer transition-colors">
                  Ваш канал
                </div>
                <div className="px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] cursor-pointer transition-colors">
                  YouTube Studio
                </div>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 py-1">
                <div
                  className="px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] text-red-500 cursor-pointer transition-colors"
                  onClick={() => {
                    logout();
                    setShowProfileMenu(false);
                  }}
                >
                  Выйти
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
};

export default Header;