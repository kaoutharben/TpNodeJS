const express = require("express")
const fileUpload = require("express-fileupload")
const cors = require("cors")
const morgan = require("morgan")
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');


const app = express()

// Middleware
app.use(bodyParser.json());
app.use(methodOverride('_method'));


// Mongo URI
const mongoURI = 'mongodb+srv://admin:123@cluster0.hloif.mongodb.net/TP1?retryWrites=true&w=majority';

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs;

conn.once('open', () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});
const upload = multer({ storage });

// @route GET /
// @desc Loads form
app.get('/', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        // Check if files
        if (!files || files.length === 0) {
            res.render('index', { files: false });
        } else {
            files.map(file => {
                if (
                    file.contentType === 'image/jpeg' ||
                    file.contentType === 'image/png'
                ) {
                    file.isImage = true;
                } else {
                    file.isImage = false;
                }
            });
            res.render('index', { files: files });
        }
    });
});

// @route POST /upload
// @desc  Uploads file to DB
app.post('/upload', upload.single('file'), (req, res) => {
    // res.json({ file: req.file });
    res.redirect('/');
});

// @route GET /files
// @desc  Display all files in JSON
app.get('/files', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        // Check if files
        if (!files || files.length === 0) {
            return res.status(404).json({
                err: 'No files exist'
            });
        }

        // Files exist
        return res.json(files);
    });
});

// @route GET /files/:filename
// @desc  Display single file object
app.get('/files/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }
        // File exists
        return res.json(file);
    });
});

// @route GET /image/:filename
// @desc Display Image
app.get('/image/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }

        // Check if image
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            // Read output to browser
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            res.status(404).json({
                err: 'Not an image'
            });
        }
    });
});
app.use(fileUpload({
    createParentPath: true
}))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))

app.post("/picture", async (req, res) => {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: "No files"
            })
        } else {
            const { picture } = req.files

            picture.mv("./uploads/" + picture.name)

            res.send({
                status: true,
                message: "File is uploaded"
            })
        }
    } catch (e) {
        res.status(500).send(e)
    }
})

const port = 4000

app.listen(port, () => console.log(`Server is running on port ${port}`))