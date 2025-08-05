const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routers/route1');
const { sequelize } = require("./config/sequelize");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/api', router);

// Database synchronization
sequelize.sync({ force: false })
    .then(() => {
        console.log("Database synchronized successfully.");
    })
    .catch((error) => {
        console.error("Error synchronizing the database:", error);
    });

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

