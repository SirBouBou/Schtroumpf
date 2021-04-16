const express = require('express');
const app = express();
const mongoose = require('./database/mongoose');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const cookieParser = require('cookie-parser');

const Auth = require('./database/models/auth'); //Contient les parametres de gestion de connexion(login, mdp)
const Smurf = require('./database/models/smurfs'); //Contient les informations d'une personne, modélisé sous la forme d'un Schtroumpf
const { response } = require('express');


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());
app.use(cookieParser());

/**
 * Permet de modifier un String en échappant les caractères spéciaux afin de protéger contre les failles Xml
 * 
 * @param text - Le texte que l'on souhaite échapper
 * @returns Le texteavec les caractères spéciaux échappés
 */
function escapeHtml(text) {
    var map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
   
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
  }

/**
 * Permet la création d'un compte et son Schtroumpf associé.
 * */
app.post('/app/newUser', (req, res) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
            console.log(err);
        } else {
            bcrypt.hash(req.body.pass, salt, (err, hash) => {
                if (err) {
                    res.json(err);
                } else {
                    new Smurf({
                        pseudo: escapeHtml(req.body.pseudo),
                        age: req.body.age,
                        famille: escapeHtml(req.body.famille),
                        nourriture: escapeHtml(req.body.nourriture),
                    })
                        .save((err, result) => {
                            if (err) {
                              console.log(err);
                            } else {
                                Auth.create({
                                    login: req.body.login,
                                    pass: hash,
                                    smurfId: result._id
                                })
                                res.json(result._id);
                            }

                        })
                    
                    
                }
            })
        }
    })
    
})

/**
 * Permet de se connecter à son compte présent dans la base de données Auth.
 */
app.post('/app/login', (req, res, next) => {
    Auth.findOne({'login': req.body.login}, (err, auth) => {
        if(err) {
            res.json(err);
        } else if (auth == null) {
            res.json("false");
        }
        else {
            bcrypt.compare(req.body.pass, auth.pass, (err, response) => {
                if (err) {
                    res.json(err);
                } else {
                    if(response)
                        response = auth.smurfId;
                    else
                        response = "false";
                    res.json(response);
                }
        });
    }})
})

/**
 * Permet la récupération de tous les Schtroumpfs de la base de donnée.
 */
app.get('/app/smurf', (req, res) => {
    Smurf.find({})
        .then(smurfs => res.send(smurfs))
        .catch((error) => console.log(error))
})

/**
 * Permet de récupérer tous les utilistateurs de la base de donnée(Fonction de developpement uniquement).
 */
app.get('/app/users', (req, res) => {
    Auth.find({})
        .then(auths => res.send(auths))
        .catch((error) => console.log(error))
})

/**
 * Permet de récupérer un unique Schtroumpf grâce à son id.
 */
app.get('/app/smurf/:smurfId', (req, res) => {
    Smurf.find({_id: req.params.smurfId})
        .then(smurfs => res.send(smurfs))
        .catch((error) => console.log(error))
})


/**
 * Permer de supprimer un unique Schtroumpf grâce à son id (Fonction de développement uniquement).
 */
app.delete('/app/smurf/:smurfId', (req, res) => {
    Smurf.findByIdAndDelete(req.params.smurfId)
            .then(smurfs => res.send(smurfs))
            .catch((error) => console.log(error));
})


/**
 * Permet de supprimer un unique utilisateur et le Schtroumpf associé grâce à son id (Fonction de développement uniquement)
 * 
 * @remarks Peut être utilisé pour donner le choix à l'utilisateur de supprimer définitivement son compte
 */
app.delete('/app/users/:userId',(req, res) => {
    const deleteSmurf = (auth => {
        Smurf.findByIdAndDelete(auth.smurfId)
            .then(() => auth)
            .catch((error) => console.log(error))
    })


    Auth.findByIdAndDelete(req.params.userId)
        .then(auth => res.send(deleteSmurf(auth)))
        .catch((error) => console.log(error))
})


/**
 * Permet de modifier les informations d'un utilisateur (Fonction de développement uniquement).
 */
app.patch('/app/users/:userId', (req, res) => {
    Auth.findOneAndUpdate({'_id': req.params.authId}, { $set: req.body })
        .then(auths => res.send(auths))
        .catch((error) => console.log(error))
})


/**
 * Permet de modifier les informations d'un Schtroumpf (Fonction de développement uniquement).
 */
app.patch('/app/smurf/:smurfId', (req, res) => {
    Smurf.findOneAndUpdate({ '_id': req.params.smurfId}, { $set: req.body })
        .then(smurfs => res.send(smurfs))
        .catch((error) => console.log(error))
})


/**
 * Permet d'ajouter un ami à la liste d'amis d'un Schtroumpf
 */
app.post('/app/smurf/:smurfId', (req, res) => {
    Smurf.findOne({ '_id': req.body.id})
        .then(smurf => {
            if (smurf.amis.indexOf(req.params.smurfId) == -1 ) {
                Smurf.updateOne({ '_id': req.body.id}, {$push: {amis: req.params.smurfId}})
                .then(smurf => res.send(smurf))
                .catch((error) => console.log(error))
            } else {
                res.send("Vous êtes déja amis avec cette personne");

            }
        })    
})

app.listen(3000, () => console.log('Server is connected on port 3000'));
