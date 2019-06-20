//WEB SERVICE
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose');
const url = 'mongodb://localhost/Progetto_IDS';
const User = require('./model/user');
const Contract = require('./model/contract');
// const ContractSources = require('./model/contractSource');
 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))
 

// TODO: eliminare questa funzione obsoleta
app.post('/api/user/login', (req, res) => {
    mongoose.connect(url, function(err){
        if(err) throw err;
        // rimuovere il primo log in futuro
        console.log('connected successfully, username is ',req.body.username,' password is ',req.body.password);
        console.log('Searching into mongodb/Progetto_IDS database..');

        console.log(req.body.username)

        User.find({
            username : req.body.username, password: req.body.password
        }, function(err, user){
            if(err) throw err;
            console.log(user);
            if(user.length === 1){  
                return res.status(200).json({
                    status: 'success',
                    data: user
                })
            } else {
                return res.status(200).json({
                    status: 'fail',
                    message: 'Login Failed'
                })
            }
             
        })
    });
})

app.post('/api/user/getUser', (req,res) => {
    mongoose.connect(url, function(err){
        if(err) throw err;
        let username = req.body.username
        let password = req.body.password
        //TODO: rimuovere il primo log
        console.log('connected successfully, username is ', username);
        console.log('Searching into mongodb/ProgettoIDS database..');
        
        User.findOne({username: username})
            .populate('contracts')
            .exec(function(err, user) {
                if (err) throw err;
                console.log(user);
                // TODO: Se l'utente non viene trovato?
                user.comparePassword(password,(err, isMatch) => {
                    if (err) throw err;
                    if (isMatch === true) {
                        return res.status(200).json({
                            // TODO: status forse deve essere un boolean
                            status: 'success',
                            // TODO: è necessario/sicuro ritornare anche l'hash tra le varie informazioni?
                            data: user
                        });
                    }
                    else {
                        return res.status(200).json({
                            status: 'fail',
                            data: null
                        })
                    }
                })
            })
    })
})

app.post('/api/user/setUser', (req,res) => {
    mongoose.connect(url, function(err){
        if(err) throw err;
        let username = req.body.username
        User.findOne({username: username})
    
    })
})
// TODO: rimuovere questa funzione obsoleta
app.get('/api/contractSources/getContractSources/', (_req, res) => {
    mongoose.connect(url, function(err) {
        if(err) throw err;
        console.log('connected successfully, need to find contractSources');
        console.log('Searching into mongodb/ProgettoIDS database..');

        ContractSources.find({}, function(err, contractSources){
            if(err) throw err;
            console.log(contractSources); 
            return res.status(200).json({
                status: 'success',
                data: contractSources
            })
        })
    })
})
 
app.listen(3000, () => console.log('App server running on port 3000!'))