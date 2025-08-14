// NavBar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Reuse same styles

function NavBar({ activePage }) {
  const [showCategories, setShowCategories] = useState(false);
  const [showReadingListMenu, setShowReadingListMenu] = useState(false);

  const categoriesRef = useRef(null);
  const readingListRef = useRef(null);
  const navigate = useNavigate();

  const toggleCategories = () => {
    setShowCategories(prev => !prev);
    setShowReadingListMenu(false);
  };

  const toggleReadingListMenu = () => {
    setShowReadingListMenu(prev => !prev);
    setShowCategories(false);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setShowCategories(false);
    setShowReadingListMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (categoriesRef.current && !categoriesRef.current.contains(event.target)) &&
        (readingListRef.current && !readingListRef.current.contains(event.target))
      ) {
        setShowCategories(false);
        setShowReadingListMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="navbar">
      <div className="logo" onClick={() => handleNavigate('/home')}>BookNet</div>

      <div className="search-bar">
        <input type="text" placeholder="Search here" className="search-input" />
        <button className="search-button">Search</button>
      </div>

      <div className="nav-dropdowns">
        {/* All */}
        <div
          className={activePage === 'all' ? 'nav-item-active' : 'nav-item'}
          onClick={() => handleNavigate('/home')}
        >
          All ▾
        </div>

        {/* Categories Dropdown */}
        <div className="dropdown" ref={categoriesRef}>
          <div className="nav-item" onClick={toggleCategories}>Categories ▾</div>
          {showCategories && (
            <div className="dropdown-content">
              {[
                "Fantasy",
                "SciFi",
                "Romantic",
                "Kids",
                "Historical",
                "Thriller",
              ].map((category, i) => (
                <button
                  key={i}
                  className="category-btn"
                  onClick={() => handleNavigate(`/${category.toLowerCase().replace(/\s/g, '-')}`)}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* My Collection */}
        <div
          className={activePage === 'cart' ? 'nav-item-active' : 'nav-item'}
          onClick={() => handleNavigate('/mycollection')}
        >
          My collection ▾
        </div>

        {/* Reading List Dropdown */}
        <div className="dropdown" ref={readingListRef}>
          <div
            className={activePage === 'readinglist' ? 'nav-item-active' : 'nav-item'}
            onClick={toggleReadingListMenu}
          >
            Reading list ▾
          </div>
          {showReadingListMenu && (
            <div className="dropdown-content">
              <button
                className="category-btn"
                onClick={() => handleNavigate('/newbooks')}
              >
                New Books
              </button>
              <button
                className="category-btn"
                onClick={() => handleNavigate('/continuereading')}
              >
                Continue Reading
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;


