const multer = require('multer')

const upload = multer().array();

module.exports = {upload}