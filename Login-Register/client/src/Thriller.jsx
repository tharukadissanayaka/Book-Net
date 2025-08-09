import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // ✅ Added
import './Home.css';
import NavBar from './NavBar';

import ThrillerBook1 from './Pictures/Teal and Black The Silence Wattpad Book Cover.png';
import ThrillerBook2 from './Pictures/Black Thriller Ebook Cover Document.png';
import ThrillerBook3 from './Pictures/Dark blue Modern Mystical Detective eBook Cover.png';
import ThrillerBook4 from './Pictures/Blue and Beige Vintage Illustrative Novel Story Book Cover.png';
import ThrillerBook5 from './Pictures/Black and White Dark Vintage Horror  Ebook Cover.png';
import ThrillerBook6 from './Pictures/Brown and White Thriller Book Cover.png';

function Thriller() {
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail"); // ✅ Get logged-in user email

  const thrillerBooks = [
    {
      title: 'The Silence',
      author: 'Sarah Green',
      votes: '5,328 votes',
      image: ThrillerBook1,
      description: 'Join the Little Explorer on her magical journey through forests, rivers, and mountains.',
      price: '1.23'
    },
    {
      title: 'Behind the Dark',
      author: 'John White',
      votes: '8,726 votes',
      image: ThrillerBook2,
      description: 'A fun-filled adventure in a school where spells and potions are part of the daily routine.',
      price: '2.34'
    },
    {
      title: 'The Autumn Story',
      author: 'Emily Bright',
      votes: '6,210 votes',
      image: ThrillerBook3,
      description: 'Heartwarming tales of friendship between a group of talking animals.',
      price: '3.25'
    },
    {
      title: 'The Sea Adventures',
      author: 'Emily Bright',
      votes: '6,210 votes',
      image: ThrillerBook4,
      description: 'Heartwarming tales of friendship between a group of talking animals.',
      price: '1.45'
    },
    {
      title: 'Hunted by Darkness',
      author: 'Emily Bright',
      votes: '6,210 votes',
      image: ThrillerBook5,
      description: 'Heartwarming tales of friendship between a group of talking animals.',
      price: '2.65'
    },
    {
      title: 'In the Fog',
      author: 'Emily Bright',
      votes: '6,210 votes',
      image: ThrillerBook6,
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
      <NavBar activePage="thriller" />
   

      {/* KIDS BOOKS */}
      <section className="section">
        <h2>Thriller Section</h2>
        <div className="book-row">
          {thrillerBooks.map((book, i) => (
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

export default Thriller;
