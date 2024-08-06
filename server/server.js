// server.js or the main entry point of your application
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Import cors
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const User = require('./models/User'); // Import your models
const Group = require('./models/Group');
const Trip = require('./models/Trip');
const authRoutes = require('./routes/authRoutes');
const groupRoutes = require('./routes/groupRoutes');
const tripRoutes = require('./routes/tripRoutes');
const itineraryRoutes = require('./routes/itineraryRoutes');


dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all origins

const server = http.createServer(app);


const io = new Server(server, {
  cors: {
      origin: '*',
      methods: ['GET', 'POST'],
  },
});


// Connect to the database
connectDB().then(() => {
    // Ensure indexes are created
    User.createIndexes();
    Group.createIndexes();
    Trip.createIndexes();
});

app.use('/api/auth', authRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/itineraries', itineraryRoutes);


io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('joinGroup', (groupId) => {
    socket.join(groupId);
});

  socket.on('joinItinerary', (itineraryId) => {
      socket.join(itineraryId);
  });

  socket.on('editItineraryItem', async ({ tripId, itemId, updatedItem }) => {
    const itinerary = await Itinerary.findOne({ tripId });
    if (!itinerary) {
        socket.emit('error', 'Itinerary not found');
        return;
    }

    const itemIndex = itinerary.items.findIndex(item => item._id.toString() === itemId);
    if (itemIndex === -1) {
        socket.emit('error', 'Item not found');
        return;
    }

    itinerary.items[itemIndex] = { ...itinerary.items[itemIndex], ...updatedItem };
    await itinerary.save();

    io.to(tripId).emit('itineraryUpdated', itinerary);
});

  socket.on('addItineraryItem', async ({ tripId, newItem }) => {
    const itinerary = await Itinerary.findOne({ tripId });
    if (!itinerary) {
        socket.emit('error', 'Itinerary not found');
        return;
    }

    itinerary.items.push(newItem);
    await itinerary.save();

    io.to(tripId).emit('itineraryUpdated', itinerary);
});

socket.on('deleteItineraryItem', async ({ tripId, itemId }) => {
  const itinerary = await Itinerary.findOne({ tripId });
  if (!itinerary) {
      socket.emit('error', 'Itinerary not found');
      return;
  }

  const itemIndex = itinerary.items.findIndex(item => item._id.toString() === itemId);
  if (itemIndex === -1) {
      socket.emit('error', 'Item not found');
      return;
  }

  itinerary.items.splice(itemIndex, 1);
  await itinerary.save();

  io.to(tripId).emit('itineraryUpdated', itinerary);
});

  socket.on('disconnect', () => {
      console.log('user disconnected');
  });
  
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));