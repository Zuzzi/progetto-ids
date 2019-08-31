//WEB SERVICE
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose');
const url = 'mongodb://localhost/Progetto_IDS';
const User = require('./model/user');
const Contract = require('./model/contract');
const jwt = require('jsonwebtoken');
const fs = require('fs')
//TODO Dove mettere sta chiave:
const RSA_PRIVATE_TOKEN_KEY = fs.readFileSync('rsa_private_token.key').toString();
const RSA_PUBLIC_TOKEN_KEY = fs.readFileSync('rsa_public_token.key').toString();
// const ContractSources = require('./model/contractSource');
 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))

app.post('/api/user/login', (req,res) => {
    mongoose.connect(url, function(err){
        if(err) throw err;
        let username = req.body.username
        let password = req.body.password
        //TODO: rimuovere il primo log
        console.log('connected successfully, username is ', username);
        console.log('Searching into mongodb/ProgettoIDS database..');
        const invalidResult = {
            valid: false,
            data: null,
            JWTtoken: null,
        };
        User.findOne({username: username})
            .populate('contracts')
            .exec().then(user => {
                    console.log(user);
                    user.comparePassword(password).then(isMatch => {
                        if (isMatch) {
                            const token = jwt.sign({username: user.username},RSA_PRIVATE_TOKEN_KEY,{
                                algorithm: 'RS256',
                            });
                            return res.status(200).json({
                                valid: true,
                                data: user,
                                JWTtoken: token,
                            });
                        }
                        else {
                            return res.status(200).json(invalidResult);
                        }
                    })
            }).catch(error => res.status(200).json(invalidResult));
        });
    });

    app.post('/api/user/tokenLogin', (req,res) => {
        mongoose.connect(url, function(err){
            if(err) throw err;
            const invalidResult = {
                valid: false,
                data: null,
                JWTtoken: null,
            };
            var decodedToken;
            try {
            decodedToken = jwt.verify(req.body.JWTtoken, RSA_PUBLIC_TOKEN_KEY);
            console.log(decodedToken);
            }
            catch (error) {
                console.log(error);
                return res.status(200).json(invalidResult); 
            }
            username = decodedToken.username;
            User.findOne({username: username})
            .populate('contracts')
            .exec().then(user => res.status(200).json({
                valid: true,
                data: user,
                // TODO per adesso null ma potrebbe servire per il refresh
                JWTtoken: null,
            })).catch(error => res.status(200).json(invalidResult));
        });
    });
 
app.listen(3000, () => console.log('App server running on port 3000!'))