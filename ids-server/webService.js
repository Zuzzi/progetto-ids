//WEB SERVICE
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose');
const url = 'mongodb://localhost/Progetto_IDS';
const User = require('./model/user');
const Contract = require('./model/contract');
 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))
 
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

app.post('/api/user/getUser',(req,res) => {
    mongoose.connect(url, function(err){
        if(err) throw err;
        let username = req.body.username
        // rimuovere il primo log in futuro
        console.log('connected successfully, username is ', username);
        console.log('Searching into mongodb/ProgettoIDS database..');

        User.findOne({username: username})
            .populate('contracts')
            .exec(function(err, user) {
                if (err) throw err;
                console.log(user);
                return res.status(200).json({
                    status: 'success',
                    data: user
                })
            })
    })
})
 
app.listen(3000, () => console.log('App server running on port 3000!'))