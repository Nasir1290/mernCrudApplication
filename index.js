// // requirements
// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const { createUser, allUser, editUser, setEditUser, deleteUser } = require('./controller/practiceController')
// const path = require('path');

// const cors = require('cors');
// const router = express.Router();



// // initialization
// const App = express()
// dotenv.config()
// const Port = process.env.PORT;
// const DbPassword = process.env.DBPASSWORD;

// // middlewars
// App.use(cors())
// App.use((req, res, next) => {
//     res.type('application/javascript');
//     next();
//   });
// App.use(express.json())
// App.use('/', router)
// App.use(express.static(path.join(__dirname, 'dist')));

// // methods
// router.post('/add', createUser)
// router.get('/all', allUser)
// router.get('/:id', editUser)
// router.patch('/:id', setEditUser)
// router.delete('/:id', deleteUser)
// App.use('/',router)
// App.get('*',(req,res)=> {
//     res.sendFile(path.join(__dirname,'dist','index.html'))
// })
// // database connection
// const DbConnection = async () => {
//     try {

//         await mongoose.connect(`mongodb+srv://NasirMia:NasirMia1290@mydatabase.nhior4u.mongodb.net/crudApplication
//         `, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         })
//         console.log('Data->Base Connected')
//     } catch (error) {
//         console.log('Error to connect database :==>|:=>', error)
//     }

// }
// DbConnection()

// // server connection
// App.listen(Port, () => {
//     console.log(`server listening on Port : ${Port}`)
// })













const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { createUser, allUser, editUser, setEditUser, deleteUser } = require('./controller/practiceController');
const path = require('path');
const cors = require('cors');

// Initialize express app
const app = express();

// Load environment variables from a .env file
dotenv.config();

// Set the port from environment variables or use a default value (e.g., 8000)
const port = process.env.PORT;

// Set up middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'dist')));

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Define your routes
const router = express.Router();
// Mount the router on a path prefix (e.g., '/api')
app.use('/', router);

router.post('/add', createUser);
router.get('/all', allUser);
router.get('/:id', editUser);
router.patch('/:id', setEditUser);
router.delete('/:id', deleteUser);
router.get('*',(req,res) => {
    res.sendFile(path.resolve(__dirname,'dist','index.html'))
} )
// Handle requests to your HTML file
app.get('*', (req, res) => {
    res.type('json')
    res.sendFile(path.join(__dirname, '/dist/index.html'));
});


// Connect to the database
const dbConnection = async () => {
    try {
        await mongoose.connect(`mongodb+srv://NasirMia:NasirMia1290@mydatabase.nhior4u.mongodb.net/crudApplication
    //         `, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database Connected');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};

// Start the server
dbConnection()
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

