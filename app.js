var express = require('express');
const { bizareDB } = require('./config/database');
const twig = require('twig');

 //importer le modèle 'User'
const User = require('./models/User');
// Importation du fichier de route user.js
const userRoutes = require('./routes/user');

var app = express();

// Connexion à la base de données
bizareDB();


//Ajouter le middleware 'body-parser'
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'twig');
app.set('views', './views');

// Route de base pour tester
// app.get('/', (req, res) => {
//   res.send('Yeah ! Ça marche ! Je suis dans le navigateur ! 🎉🚀');
// });

app.get('/', (req, res) => {
  res.render('pages/home');
});

app.get('/home', (req, res) => {
  res.render('home');
});

// Utilisation des routes définies dans user.js
app.use('/', userRoutes);


app.listen(3333, () => {
	console.log(`🚀🚀 Lancement avec succès du server`);
});

module.exports = app;