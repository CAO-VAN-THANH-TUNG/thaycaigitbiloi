const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.get('/', bookingController.getAllBookings);
router.post('/create', bookingController.createBooking);
router.post('/update/:id', bookingController.updateBooking);
router.post('/cancel/:id', bookingController.cancelBooking);
router.get('/', bookingController.getAllBookings);



router.post('/edit/:id', bookingController.updateBooking);


router.post('/cancel/:id', bookingController.cancelBooking);


router.post('/delete/:id', bookingController.deleteBooking);
// Route xử lý tạo booking
router.post('/create', async (req, res) => {
    try {
        const { customerName, date, time } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!customerName || !date || !time) {
            return res.status(400).send('Dữ liệu không hợp lệ!');
        }

        // Tạo booking mới
        const newBooking = new Booking({
            customerName,
            date,
            time,
            status: 'Pending', // Trạng thái mặc định
        });

        await newBooking.save();
        res.redirect('/'); // Quay lại danh sách đặt chỗ
    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi khi thêm booking!');
    }
});

module.exports = router;