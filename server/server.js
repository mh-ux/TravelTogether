const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const User = require('./models/User');
const Group = require('./models/Group');
const Trip = require('./models/Trip');
const Itinerary = require('./models/Itinerary');
const authRoutes = require('./routes/authRoutes');
const groupRoutes = require('./routes/groupRoutes');
const tripRoutes = require('./routes/tripRoutes');
const itineraryRoutes = require('./routes/itineraryRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json()); // Middleware to parse JSON requests
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/itineraries', itineraryRoutes);
app.use('/api/expenses', expenseRoutes);

// Connect to the database
connectDB().then(() => {
  User.createIndexes();
  Group.createIndexes();
  Trip.createIndexes();
  Itinerary.createIndexes()
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('joinGroup', (groupId) => {
    socket.join(groupId);
  });

  socket.on('joinItinerary', (itineraryId) => {
    socket.join(itineraryId);
  });

  socket.on('editItineraryItem', async ({ tripId, itemId, updatedItem }) => {
    const itinerary = await Itinerary.findOne({ trip: tripId });
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
    const itinerary = await Itinerary.findOne({ trip: tripId });
    if (!itinerary) {
      socket.emit('error', 'Itinerary not found');
      return;
    }

    itinerary.items.push(newItem);
    await itinerary.save();

    io.to(tripId).emit('itineraryUpdated', itinerary);
  });

  socket.on('deleteItineraryItem', async ({ tripId, itemId }) => {
    const itinerary = await Itinerary.findOne({ trip: tripId });
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
