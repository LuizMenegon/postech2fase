const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routers/route1');

// Importar modelos ANTES da sincronização
require('./models');
const { sequelize } = require("./config/sequelize");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/api', router);

// Health check endpoint para Docker
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        service: 'POSTECH Blog Backend'
    });
});

// Database synchronization (DEPOIS de importar os modelos)
sequelize.sync({ force: false })
    .then(() => {
        console.log("Database synchronized successfully.");
        console.log("Tables created: Teacher, Discipline, Class, Post");
    })
    .catch((error) => {
        console.error("Error synchronizing the database:", error);
    });

// Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

