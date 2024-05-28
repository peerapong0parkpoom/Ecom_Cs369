const express = require('express');  //นำเข้า Express.js เพื่อใช้ในการสร้างและกำหนดเซิร์ฟเวอร์ Express.
const router = express.Router();     //นำเข้า Router Express ซึ่งจะใช้ในการกำหนดเส้นทางของแอปพลิเคชัน Express
const path = require('path');        //นำเข้าโมดูล path เพื่อใช้ในการจัดการเส้นทางไฟล์.
// const middleware = require('../middleware'); // เรียกใช้งาน middleware.js
const {register,login, logout} = require('../controllers/authController');


router.post('/register', register);
router.post('/login', login);

// router.post('/login', passport.authenticate('local', {
//     successRedirect: '/home',
//     failureRedirect: '/login',
//     failureFlash: true
// }));

router.get('/logout', logout);

module.exports = router;