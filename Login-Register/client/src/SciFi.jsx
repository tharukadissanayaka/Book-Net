import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // ✅ Added
import './Home.css';
import NavBar from './NavBar';

import SciFiBook1 from './Pictures/Black and White Modern Minimalist Robot Science Fiction Book Cover.png';
import SciFiBook2 from './Pictures/Minimalist sci-fi novel book cover.png';
import SciFiBook3 from './Pictures/Beige and Red Minimalist Eye Illustration Book Cover.png';
import SciFiBook4 from './Pictures/White and Blue Surreal Fiction Earth Wattpad Book Cover.png';
import SciFiBook5 from './Pictures/Beige And Black Simple Science Fiction Book Cover.png';
import SciFiBook6 from './Pictures/Pink Neon Science Fiction Book Cover.png';

function SciFi() {
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail"); // ✅ Get logged-in user email

  const scifiBooks = [
    {
      title: 'The Robots',
      author: 'Shawn Garcia',
      votes: '5,328 votes',
      image: SciFiBook1,
      description: 'Join the Little Explorer on her magical journey through forests, rivers, and mountains.',
      price: '2.50'
    },
    {
      title: 'Terra Frema',
      author: 'Takehiro Kanegi',
      votes: '8,726 votes',
      image: SciFiBook2,
      description: 'A fun-filled adventure in a school where spells and potions are part of the daily routine.',
      price: '1.56'
    },
    {
      title: 'Eye',
      author: 'Morgan Maxwell',
      votes: '6,210 votes',
      image: SciFiBook3,
      description: 'Heartwarming tales of friendship between a group of talking animals.',
      price: '0.98'
    },
    {
      title: 'Between the stars',
      author: 'Emily Bright',
      votes: '6,210 votes',
      image: SciFiBook4,
      description: 'Heartwarming tales of friendship between a group of talking animals.',
      price: '1.24'
    },
    {
      title: 'Paradox',
      author: 'Margarita Perez',
      votes: '6,210 votes',
      image: SciFiBook5,
      description: 'Heartwarming tales of friendship between a group of talking animals.',
      price: '2.29'
    },
    {
      title: 'Game of your mind',
      author: 'Margarita Perz',
      votes: '6,210 votes',
      image: SciFiBook6,
      description: 'Heartwarming tales of friendship between a group of talking animals.',
      price: '2.00'
    },
  ];

  const handleBuy = (book) => {
    if (!email) {
      alert("Please log in first!");
      navigate("/login");
      return;
    }

    axios.post("http://localhost:3001/cart", {
      bookname: book.title,
      email: email,
      price: book.price,
      quantity: 1,
      image: book.image
    })
    .then(res => {
      alert("Book added to cart!");
    })
    .catch(err => {
      console.error(err);
      alert("Error adding to cart");
    });
  };

  return (
    <div className="home-container">
      <NavBar activePage="scifi" />
   

      {/* KIDS BOOKS */}
      <section className="section">
        <h2>Sci-Fi Section</h2>
        <div className="book-row">
          {scifiBooks.map((book, i) => (
            <div key={i} className="book-popular-card">
              <img src={book.image} alt={book.title} />
              <div className="popular-info">
                <h4>{book.title}</h4>
                <p>By {book.author}</p>
                <p className="votes">⭐ 4.5 | {book.votes}</p>
                <p className="desc">{book.description}</p>
                <p><b>${book.price}</b></p>
                <button className="buy-btn" onClick={() => handleBuy(book)}>Buy</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default SciFi;