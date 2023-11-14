var express = require('express');
const { bizareDB } = require('./config/database');
const twig = require('twig');
 //importer le modèle 'User'
const User = require('./models/User');

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

app.get('/register', (req, res) => {
  res.render('pages/register');
});

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User({ username, email, password });
  await newUser.save();
  res.redirect('/users');
});

app.get('/users', async (req, res) => {
  const users = await User.find({});
  res.render('pages/users', { users });
});

app.listen(3333, () => {
	console.log(`🚀🚀 Lancement avec succès du server`);
});

module.exports = app;