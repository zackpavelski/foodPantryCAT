const {google} = import { google } from '../node_modules/googleapis/build/src/googleapis.js'
const keys = require('./scanner/key.json')
const SHEET_ID = '194PR-6uTsQXrN0Px4WNil-PJ-zPlkTr8HVx3W5SzdF0';
const ACCESS_TOKEN = 'ya29.a0AfH6SMCIPhwMhcdJEnIULPPLqHCm8xTgaE0Q06_DVVeCOnH5QzcmWadLjcVHP0FHlHWM5Wv8qquqrjOWt4yN_PeTQ9p-k8B8dT_IJ-1QLDpYg4MRSvgvAZk1KndDYVOSgRlHzs71extyQ8Um65NYs8nUwY--';

const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://googleapis.com/auth/spreadsheets']
);
client.authorize(function(err, tokens){
    if(err){
        console.log(err);
        return;
    }
    else{
        console.log('connected');
    }
});