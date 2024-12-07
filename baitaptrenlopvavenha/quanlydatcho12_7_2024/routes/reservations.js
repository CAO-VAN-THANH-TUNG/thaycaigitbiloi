const express = require('express');
const jwt = require('jsonwebtoken');
const Reservation = require('../models/Reservation');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware xác thực
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token required' });
  
    if (!JWT_SECRET) return res.status(500).json({ error: 'Server misconfiguration: JWT_SECRET is missing' });
  
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error('JWT Error:', err.message);
        return res.status(401).json({ error: 'Invalid token' });
      }
      req.userId = decoded.id;
      next();
    });
  };
  

// Tạo đặt chỗ
router.post('/', authenticate, async (req, res) => {
    const { service, date, time, people } = req.body;
  
    if (!service || !date || !time || typeof people !== 'number') {
      return res.status(400).json({ error: 'Invalid input: service, date, time, and people are required' });
    }
  
    try {
      const reservation = new Reservation({
        user: req.userId,
        service,
        date,
        time,
        people,
      });
      await reservation.save();
      res.status(201).json(reservation);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
// Lấy danh sách đặt chỗ của người dùng
router.get('/', authenticate, async (req, res) => {
    try {
      const reservations = await Reservation.find({ user: req.userId }).populate('service');
      if (reservations.length === 0) {
        return res.status(404).json({ message: 'No reservations found' });
      }
      res.json(reservations);
    } catch (error) {
      console.error('Error fetching reservations:', error.message);
      res.status(500).json({ error: error.message });
    }
  });
  

// Xóa đặt chỗ
router.delete('/:id', authenticate, async (req, res) => {
    try {
      const reservation = await Reservation.findById(req.params.id);
      if (!reservation) {
        return res.status(404).json({ error: 'Reservation not found' });
      }
      if (reservation.user.toString() !== req.userId) {
        return res.status(403).json({ error: 'Unauthorized: You do not own this reservation' });
      }
      await reservation.remove();
      res.json({ message: 'Reservation deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
