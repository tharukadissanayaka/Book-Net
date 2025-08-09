import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // ✅ Added
import './Home.css';
import NavBar from './NavBar';

import kidBook1 from './Pictures/Blue Yellow Cute Sea Ocean Watercolor Story Book Cover Document A4.png';
import kidBook2 from './Pictures/Colorful illustrative playful childish dinosaur cover a4 Document.png';
import kidBook3 from './Pictures/Green and Yellow Cute Illustrated Safari Animals Story Book Cover A4.png';
import kidBook4 from './Pictures/Blue Illustration Daily Activity Kids Cover Book A4 Document.png';
import kidBook5 from './Pictures/Colorful Farm Theme Coloring Book Cover.png';
import kidBook6 from './Pictures/Light Green Illustrative Forest Notebook Cover A4 Document.png';

function Kids() {
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail"); // ✅ Get logged-in user email

  const kidsBooks = [
    {
      title: 'The Ocean',
      author: 'Sarah Green',
      votes: '5,328 votes',
      image: kidBook1,
      description: 'Join the Little Explorer on her magical journey through forests, rivers, and mountains.',
      price: '1.58'
    },
    {
      title: 'Origin of the Dinosuar',
      author: 'John White',
      votes: '8,726 votes',
      image: kidBook2,
      description: 'A fun-filled adventure in a school where spells and potions are part of the daily routine.',
      price: '2.54'
    },
    {
      title: 'Safari Animals',
      author: 'Emily Bright',
      votes: '6,210 votes',
      image: kidBook3,
      description: 'Heartwarming tales of friendship between a group of talking animals.',
      price: '0.97'
    },
    {
      title: 'Daily Activity Kids',
      author: 'Emily Bright',
      votes: '6,210 votes',
      image: kidBook4,
      description: 'Heartwarming tales of friendship between a group of talking animals.',
      price: '1.62'
    },
    {
      title: 'Coloring Book',
      author: 'Emily Bright',
      votes: '6,210 votes',
      image: kidBook5,
      description: 'Heartwarming tales of friendship between a group of talking animals.',
      price: '3.54'
    },
    {
      title: 'Note Book',
      author: 'Emily Bright',
      votes: '6,210 votes',
      image: kidBook6,
      description: 'Heartwarming tales of friendship between a group of talking animals.',
      price: '1.50'
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
      <NavBar activePage="kids" />
   

      {/* KIDS BOOKS */}
      <section className="section">
        <h2>Kids Section</h2>
        <div className="book-row">
          {kidsBooks.map((book, i) => (
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

export default Kids;



