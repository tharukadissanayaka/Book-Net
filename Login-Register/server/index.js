const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Employeemodel = require('./models/Employee');
const Cartmodel = require('./models/Cart');
const OrderModel = require('./models/Order');



const app = express();
app.use(express.json());
app.use(cors());


app.post('/login', (req, res) => {
    const { email, password } = req.body;
    Employeemodel.findOne({email: email})
    .then(user => {
        if(user){
            if(user.password === password){
                res.json("Success");
            } else {
                res.json("Incorrect Password");
            }
        }else{
            res.json("User not found");
        }
    });
});

app.post('/register', (req, res) => {
    Employeemodel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err));
})

// ADD TO CART
app.post('/cart', (req, res) => {
    Cartmodel.create(req.body)
    .then(cartItem => res.json(cartItem))
    .catch(err => res.status(500).json(err));
});

// GET CART ITEMS FOR A USER
app.get('/cart/:email', (req, res) => {
    Cartmodel.find({ email: req.params.email })
    .then(items => res.json(items))
    .catch(err => res.status(500).json(err));
});

// DELETE CART ITEM
app.delete('/cart/:id', (req, res) => {
    Cartmodel.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: "Deleted" }))
    .catch(err => res.status(500).json(err));
});

// Clear all cart items for a user
app.delete('/cart/clear/:email', (req, res) => {
  const userEmail = req.params.email;

  Cartmodel.deleteMany({ email: userEmail })
    .then(() => res.json({ message: 'Cart cleared' }))
    .catch(err => res.status(500).json({ error: 'Failed to clear cart' }));
});


app.post('/order/confirm', async (req, res) => {
  const { email } = req.body;

  try {
    // Fetch cart items for the user
    const cartItems = await Cartmodel.find({ email });

    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Copy cart items to orders collection
    const ordersToInsert = cartItems.map(item => ({
      bookname: item.bookname,
      email: item.email,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
      orderDate: new Date()
    }));

    await OrderModel.insertMany(ordersToInsert);

    // Optionally, clear cart after confirming order
    // await Cartmodel.deleteMany({ email });

    res.json({ message: 'Order confirmed and saved' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error confirming order' });
  }
});



mongoose.connect("mongodb://localhost:27017/BookNet");
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
