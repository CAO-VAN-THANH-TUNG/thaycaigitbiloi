const express = require('express');
const Service = require('../models/Service');
const router = express.Router();

// Lấy danh sách dịch vụ
// Lấy danh sách dịch vụ
router.get('/', async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách dịch vụ', error });
    }
});

router.post('/', async (req, res) => {
    const { name, description } = req.body;

    try {
        const newService = new Service({ name, description });
        await newService.save();
        res.status(201).json(newService);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi tạo dịch vụ', error });
    }
});
module.exports = router;
