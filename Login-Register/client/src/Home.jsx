import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import added
import NavBar from './NavBar';

import silence from './Pictures/Black and Grey Dark Forest Aesthetic Book Cover.png';
import The_girl_in_the_woods from './Pictures/Blue Mystery Girl Woods Novel Book Cover.png';
import Garden from './Pictures/Dark Girl Portrait & Flowers Paper Collage Book Cover.png';
import TheWoods from './Pictures/Gray Brown Minimalist Mysterious Thriller Book Cover.png';
import Venus from './Pictures/Red Modern Science Fiction Book Cover.png';
import TheLostKingdom from './Pictures/Simple Elegant Young Adult Fantasy Romance Book Cover.png';
import HelloCarol from './Pictures/Yellow and Green Illustration Story Tale Book Cover.png';
import Paradox from './Pictures/Beige And Black Simple Science Fiction Book Cover.png';
import Eye from './Pictures/Beige and Red Minimalist Eye Illustration Book Cover.png';

import './Home.css';

function Home() {
  const [showCategories, setShowCategories] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate(); // ✅ Used for navigation

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
        title: 'Silence',
        author: 'Delia Owens',
        votes: '35,458 votes',
        image: silence,
      },
      {
        title: 'The girl in the woods',
        author: 'Anthony Doerr',
        votes: '98,268 votes',
        image: The_girl_in_the_woods,
      },
    ],
    recommended: [
      {
        title: 'Garden',
        author: 'Kevin Kwan',
        votes: '8,268 votes',
        image: Garden,
      },
      {
        title: 'TheWoods',
        author: 'Kevin Kwan',
        votes: '19,826 votes',
        image: TheWoods,
      },
      {
        title: 'Venus',
        author: 'Tere Liye',
        votes: '198,268 votes',
        image: Venus,
      },
      {
        title: 'TheLostKingdom',
        author: 'Tere Liye',
        votes: '8,268 votes',
        image: TheLostKingdom,
      },
      {
        title: 'HelloCarol',
        author: 'Fiersa Besari',
        votes: '9,868 votes',
        image: HelloCarol,
      },
      {
        title: 'Paradox',
        author: 'Fiersa Besari',
        votes: '1,968 votes',
        image: Paradox,
      },
      {
        title: 'Eye',
        author: 'Fiersa Besari',
        votes: '8,638 votes',
        image: Eye,
      },
    ],
  };

  return (
    <div className="home-container">
      <NavBar activePage="all" /> 

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
        <button className="more-link">More &gt;&gt;&gt;</button>
      </section>
    </div>
  );
}

export default Home;


