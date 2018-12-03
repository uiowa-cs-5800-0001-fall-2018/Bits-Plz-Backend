const fire_app = require('firebase');
const firebase_api_key = require('./firebase_api_key.json');
const db = fire_app.initializeApp(firebase_api_key).database();
module.exports = db;