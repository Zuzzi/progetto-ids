//WEB SERVICE
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose');
const url = 'mongodb://localhost/Progetto_IDS';
const User = require('./model/user');
const Contract = require('./model/contract');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3('ws://localhost:22000');

const RSA_PRIVATE_TOKEN_KEY = fs.readFileSync('rsa_private_token.key').toString();
const RSA_PUBLIC_TOKEN_KEY = fs.readFileSync('rsa_public_token.key').toString();
const KEYSTORE_MASTER_KEY = '123';
// const KEYSTORE_MASTER_KEY = 'Progetto-IDS'
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))

app.post('/api/user/login', (req,res) => {
    mongoose.connect(url, function(err){
        if(err) throw err;
        let username = req.body.username
        let password = req.body.password
        console.log('connected successfully, username is ', username);
        console.log('Searching into mongodb/ProgettoIDS database..');
        const invalidResult = {
            valid: false,
            data: null,
            wallet: null,
            JWTtoken: null,
        };
        User.findOne({username: username})
            .populate('contracts')
            .exec().then(user => {
                    console.log(user);
                    user.comparePassword(password).then(isMatch => {
                        if (isMatch) {
                            // delete Object.getPrototypeOf(user).password;
                            const keystore = user.keystore;
                            const privateKey = web3.eth.accounts.decrypt(keystore, KEYSTORE_MASTER_KEY).privateKey;
                            // delete Object.getPrototypeOf(user).keystore;
                            const token = jwt.sign({username: user.username},RSA_PRIVATE_TOKEN_KEY,{
                                algorithm: 'RS256',
                            });
                            return res.status(200).json({
                                valid: true,
                                data: user,
                                privateKey: privateKey,
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
        var decodedToken;
        try {
        decodedToken = jwt.verify(req.body.JWTtoken, RSA_PUBLIC_TOKEN_KEY);
        console.log(decodedToken);
        }
        catch (error) {
            console.log(error);
            return res.status(200).json(invalidResult); 
        }
        mongoose.connect(url, function(err){
            if(err) throw err;
            username = decodedToken.username;
            User.findOne({username: username})
            .populate('contracts')
            .exec().then(user => {
                // delete Object.getPrototypeOf(user).password;
                const keystore = user.keystore;
                const privateKey = web3.eth.accounts.decrypt(keystore, KEYSTORE_MASTER_KEY).privateKey;
                // delete Object.getPrototypeOf(user).keystore;
                return res.status(200).json({
                    valid: true,
                    data: user,
                    privateKey: privateKey,
                    JWTtoken: null,
                });
            }).catch(error => res.status(200).json(invalidResult));
        });
    });
 
app.listen(3000, () => console.log('App server running on port 3000!'))