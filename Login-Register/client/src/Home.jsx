import React, { useState, useEffect, useRef } from 'react';
import silence from './Pictures/Black and Grey Dark Forest Aesthetic Book Cover.png';
import The_girl_in_the_woods from './Pictures/Blue Mystery Girl Woods Novel Book Cover.png';
import Garden from './Pictures/Dark Girl Portrait & Flowers Paper Collage Book Cover.png';
import TheWoods from './Pictures/Gray Brown Minimalist Mysterious Thriller Book Cover.png';
import Venus from './Pictures/Red Modern Science Fiction Book Cover.png';
import TheLostKingdom from './Pictures/Simple Elegant Young Adult Fantasy Romance Book Cover.png';
import HelloCarol from './Pictures/Yellow and Green Illustration Story Tale Book Cover.png';

import './Home.css';

function Home() {
  const [showCategories, setShowCategories] = useState(false);
  const dropdownRef = useRef(null);

  const handleBookClick = (title) => {
    alert(`Clicked on: ${title}`);
  };

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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const books = {
    popular: [
      {
        title: "Silence",
        author: "Delia Owens",
        votes: "198,268 votes",
        image: silence,
      },
      {
        title: "The girl in the woods",
        author: "Anthony Doerr",
        votes: "198,268 votes",
        image: The_girl_in_the_woods,
      },
    ],
    recommended: [
      {
        title: "Garden",
        author: "Kevin Kwan",
        votes: "198,268 votes",
        image: Garden,
      },
      {
        title: "TheWoods",
        author: "Kevin Kwan",
        votes: "198,268 votes",
        image: TheWoods,
      },
      {
        title: "Venus",
        author: "Tere Liye",
        votes: "198,268 votes",
        image: Venus,
      },
      {
        title: "TheLostKingdom",
        author: "Tere Liye",
        votes: "198,268 votes",
        image: TheLostKingdom,
      },
      {
        title: "HelloCarol",
        author: "Fiersa Besari",
        votes: "198,268 votes",
        image: HelloCarol,
      },
    ],
  };

  return (
    <div className="home-container">
      {/* NAVBAR */}
      <div className="navbar">
        <div className="logo">BookNet</div>

        <div className="search-bar">
          <input type="text" placeholder="Search here" className="search-input" />
          <button className="search-button">Search</button>
        </div>

        <div className="nav-dropdowns">
          <div className="nav-item-active">All ▾</div>

          <div className="dropdown" ref={dropdownRef}>
            <div className="nav-item" onClick={toggleCategories}>Categories ▾</div>
            {showCategories && (
              <div className="dropdown-content">
                {[
                  "Fantasy",
                  "Sci-fi",
                  "Romantic",
                  "Kids",
                  "Historical",
                  "Thriller",
                ].map((category, i) => (
                  <button key={i} className="category-btn">{category}</button>
                ))}
              </div>
            )}
          </div>

          <div className="nav-item">My collection ▾</div>
          <div className="nav-item">Reading list ▾</div>
        </div>
      </div>

      {/* POPULAR SECTION */}
      <section className="section">
        <h2>Popular</h2>
        <div className="book-row">
          {books.popular.map((book, i) => (
            <button key={i} className="book-popular-card" onClick={() => handleBookClick(book.title)}>
              <img src={book.image} alt={book.title} />
              <div className="popular-info">
                <h4>{book.title}</h4>
                <p>By {book.author}</p>
                <p className="votes">⭐ 4.5 | {book.votes}</p>
                <p className="desc">This book invites readers into a world of imagination, knowledge, and emotion.</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* RECOMMENDED SECTION */}
      <section className="section">
        <h2>Recommended</h2>
        <div className="book-recommend-row">
          {books.recommended.map((book, i) => (
            <div key={i} className="book-recommend-card">
              <img src={book.image} alt={book.title} />
              <h4>{book.title}</h4>
              <p>4.5 ★ ({book.votes})</p>
            </div>
          ))}
        </div>
      </section>

      <p className="more-link">More &gt;&gt;&gt;</p>
    </div>
  );
}

export default Home;


