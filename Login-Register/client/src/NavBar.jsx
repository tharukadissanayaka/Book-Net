// NavBar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Reuse same styles

function NavBar({ activePage }) {
  const [showCategories, setShowCategories] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCategories(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="navbar">
      <div className="logo" onClick={() => navigate('/home')}>BookNet</div>

      <div className="search-bar">
        <input type="text" placeholder="Search here" className="search-input" />
        <button className="search-button">Search</button>
      </div>

      <div className="nav-dropdowns">
        <div
          className={activePage === 'all' ? 'nav-item-active' : 'nav-item'}
          onClick={() => navigate('/home')}
        >
          All ▾
        </div>

        <div className="dropdown" ref={dropdownRef}>
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
                  onClick={() => navigate(`/${category.toLowerCase().replace(/\s/g, '-')}`)}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        <div
          className={activePage === 'cart' ? 'nav-item-active' : 'nav-item'}
          onClick={() => navigate('/mycollection')}
        >
          My collection ▾
        </div>
        <div className="nav-item">Reading list ▾</div>
      </div>
    </div>
  );
}

export default NavBar;
