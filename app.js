var express = require('express');
const { bizareDB } = require('./config/database');
const twig = require('twig');

var app = express();

// Connexion à la base de données
bizareDB();

app.set('view engine', 'twig');
app.set('views', './views');

// Route de base pour tester
app.get('/', (req, res) => {
  res.send('Yeah ! Ça marche ! Je suis dans le navigateur ! 🎉🚀');
});

app.get('/home', (req, res) => {
  res.render('home');
});

app.listen(3333, () => {
	console.log(`🚀🚀 Lancement avec succès du server`);
});

module.exports = app;