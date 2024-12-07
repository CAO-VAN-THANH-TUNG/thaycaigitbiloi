const mongoose = require('mongoose');

// Định nghĩa schema
const bookingSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true,
        trim: true,     
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value); // Kiểm tra định dạng HH:mm
            },
            message: 'Thời gian không hợp lệ!',
        },
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled'], // Chỉ chấp nhận các giá trị này
        default: 'Pending', 
    },
});

// Tạo model
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
