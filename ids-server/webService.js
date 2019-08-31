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
const RSA_PRIVATE_TOKEN_KEY = fs.readFileSync('token_rsa.key').toString();
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
                        console.log(isMatch);
                            const token = jwt.sign({},RSA_PRIVATE_TOKEN_KEY,{
                                algorithm: 'RS256',
                                subject: user.username
                            })
                            console.log(token);
                            return res.status(200).json({
                                valid: true,
                                data: user,
                                JWTtoken: token,
                            });
                    }).catch(error => res.status(200).json(invalidResult));
            }).catch(error => res.status(200).json(invalidResult));
        });
    })

// app.post('/api/user/setUser', (req,res) => {
//     mongoose.connect(url, function(err){
//         if(err) throw err;
//         let username = req.body.username
//         User.findOne({username: username})
    
//     })
// })
 
app.listen(3000, () => console.log('App server running on port 3000!'))