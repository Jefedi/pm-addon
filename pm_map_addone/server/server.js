const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware pour analyser le JSON
app.use(express.json());

// Servir les fichiers du dossier public
app.use(express.static('/app/public'));

// Simule une base de données avec un fichier JSON
const dbFile = './app/server/database.json';

// Endpoint pour ajouter un PM
app.post('/add-pm', (req, res) => {
  const newPM = req.body;

  // Lire la base de données existante
  fs.readFile(dbFile, (err, data) => {
    if (err) return res.status(500).send('Erreur lors de la lecture de la base de données.');

    const pms = JSON.parse(data);
    pms.push(newPM);

    // Écrire les nouveaux PM dans la base
    fs.writeFile(dbFile, JSON.stringify(pms), (err) => {
      if (err) return res.status(500).send('Erreur lors de l’écriture dans la base de données.');
      res.status(200).send('PM ajouté avec succès.');
    });
  });
});

// Endpoint pour récupérer tous les PMs
app.get('/get-pms', (req, res) => {
  fs.readFile(dbFile, (err, data) => {
    if (err) return res.status(500).send('Erreur lors de la lecture de la base de données.');
    res.json(JSON.parse(data));
  });
});

// Lancer le serveur
app.listen(PORT, () => console.log(`Serveur lancé sur http://localhost:${PORT}`));
