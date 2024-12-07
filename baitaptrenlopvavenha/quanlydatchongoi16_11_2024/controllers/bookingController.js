const Booking = require('../models/Booking');

// Hiển thị danh sách đặt chỗ
exports.getAllBookings = async (req, res) => {
  const bookings = await Booking.find();
  res.render('index', { bookings });
};

// Tạo đặt chỗ mới
exports.createBooking = async (req, res) => {
    const { customerName, date, time } = req.body;
    try {
        const newBooking = new Booking({ customerName, date, time });
        await newBooking.save();
        res.redirect('/'); // Quay lại trang danh sách
    } catch (err) {
        console.error('Lỗi khi thêm booking:', err);
        res.status(400).send('Không thể thêm booking mới');
    }
};


// Sửa đặt chỗ
exports.updateBooking = async (req, res) => {
  const { id } = req.params;
  const { customerName, date, time, status } = req.body;
  await Booking.findByIdAndUpdate(id, { customerName, date, time, status });
  res.redirect('/');
};

// Hủy đặt chỗ
exports.cancelBooking = async (req, res) => {
  const { id } = req.params;
  await Booking.findByIdAndUpdate(id, { status: 'Cancelled' });
  res.redirect('/');
};
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.render('index', { bookings });
    } catch (err) {
        console.error('Lỗi khi lấy danh sách bookings:', err);
        res.status(500).send('Không thể lấy danh sách bookings');
    }
};

// Thêm booking mới
exports.createBooking = async (req, res) => {
    const { customerName, date, time } = req.body;
    try {
        const newBooking = new Booking({ customerName, date, time });
        await newBooking.save();
        res.redirect('/');
    } catch (err) {
        console.error('Lỗi khi thêm booking:', err);
        res.status(400).send('Không thể thêm booking mới');
    }
};
// Route xử lý form tạo booking mới
exports.createBooking = async (req, res) => {
    const { customerName, date, time, status } = req.body;
    try {
      const newBooking = new Booking({
        customerName,
        date,
        time,
        status: status || 'Pending', 
      });
  
      await newBooking.save();
      res.redirect('/'); 
    } catch (err) {
      console.error('Lỗi khi tạo booking:', err);
      res.status(400).send('Không thể tạo booking mới');
    }
  };
// Cập nhật booking
exports.updateBooking = async (req, res) => {
    const { id } = req.params;
    const { customerName, date, time } = req.body;
    try {
        await Booking.findByIdAndUpdate(id, { customerName, date, time });
        res.redirect('/');
    } catch (err) {
        console.error('Lỗi khi cập nhật booking:', err);
        res.status(400).send('Không thể cập nhật booking');
    }
};

// Hủy booking (chỉ cập nhật trạng thái)
exports.cancelBooking = async (req, res) => {
    const { id } = req.params;
    try {
        await Booking.findByIdAndUpdate(id, { status: 'Cancelled' });
        res.redirect('/');
    } catch (err) {
        console.error('Lỗi khi hủy booking:', err);
        res.status(400).send('Không thể hủy booking');
    }
};

// Xóa booking hoàn toàn
exports.deleteBooking = async (req, res) => {
    const { id } = req.params;
    try {
        await Booking.findByIdAndDelete(id);
        res.redirect('/');
    } catch (err) {
        console.error('Lỗi khi xóa booking:', err);
        res.status(400).send('Không thể xóa booking');
    }
};