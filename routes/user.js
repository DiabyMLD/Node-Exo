const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const User = require('../models/User');
router.post('/register', upload.single('avatar'), userController.registerUser);
// Routes utilisateur


// Afficher la page d'inscription
router.get('/register', userController.showRegisterPage);

// Lister tous les utilisateurs
router.get('/users', userController.listUsers);

// Afficher la page de modification
router.get('/edit/:id', userController.showEditPage);

// Supprimer un utilisateur
router.get('/delete/:id', userController.deleteUser);

// Enregistrer un nouvel utilisateur
router.post('/register', upload.single('avatar'), userController.registerUser);

// Modifier un utilisateur
router.post('/edit/:id', upload.single('avatar'), userController.editUser);

// Servir les images (avatars)
router.get('/avatar/:id', async (req, res) => {
    try {
        console.log("Requête pour l'avatar reçue"); // Log
        const user = await User.findById(req.params.id);
        console.log("Utilisateur trouvé :", user); // Log
        res.set('Content-Type', user.avatar.contentType);
        res.send(user.avatar.data);
    } catch (error) {
        console.error("Erreur :", error); // Log d'erreur
        res.status(400).send("Erreur lors de la récupération de l'avatar");
    }
});

// Exportation du routeur
module.exports = router;
