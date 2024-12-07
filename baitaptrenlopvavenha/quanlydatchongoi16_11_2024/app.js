const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bookingRoutes = require('./routes/bookingRoutes');
const Booking = require('./models/Booking');

// Tạo một lịch đặt chỗ mới
const newBooking = new Booking({
    customerName: 'Nguyễn Văn A',
    date: new Date('2024-11-20'),
    time: '15:30',
    status: 'Pending', // Có thể bỏ qua vì là giá trị mặc định
});

// Lưu vào MongoDB
newBooking.save()
    .then(() => console.log('Booking đã được lưu thành công!'))
    .catch(err => console.error('Lỗi khi lưu booking:', err));

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/bookingDB', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/', bookingRoutes);

app.listen(3000, () => console.log('Server is running on http://localhost:3000'));
