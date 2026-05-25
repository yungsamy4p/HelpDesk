const express = require('express');
const path = require('path');
const ticketRoutes = require('./src/routes/ticketRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Servir archivos estáticos del frontend desde la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

// Montar endpoints de la API
app.use('/api', ticketRoutes);

app.listen(PORT, () => {
    console.log(`HelpDesk Backend operativo en http://localhost:${PORT}`);
});