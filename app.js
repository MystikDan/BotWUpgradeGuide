const Express = require('express');
const Request = require('request');
const http = require('http');
const React = require('react');
const app = Express();
const path = require('path');
const fs = require('fs');
const csv = require('csv');
const parser = csv.parse();
let armorSetsJSON = {};
let armorJSON = {};
// const sqlite = require('sqlite3').verbose();
// const db = new sqlite.Database(':memory:');
// import express from 'express';
// import request from 'request';
// import http from 'http';
// import React from 'react';
// import Promise from 'bluebird';
// import db from 'sqlite';
//
// const app = express();
// const port = process.env.PORT || 8080;

// initializing db
// db.serialize(function() {
//     let armorSetCreateSql = "CREATE TABLE armor_set (" +
//         "armor_set_id INT PRIMARY KEY AUTOINCREMENT" +
//     ")";
//
//     let armorCreateSql = "CREATE TABLE armor (" +
//         "armor_id INT PRIMARY KEY AUTOINCREMENT," +
//         "armor_set_id INT REFERENCES armor_set(armor_set_id) " +
//         "name TEXT UNIQUE" +
//     ")";
//     db.run(armorCreateSql);
//
//     let statement = db.prepare("INSERT INTO armor VALUES ()");
//
// });

console.log('The app has started');
// console.log(parser);

fs.readFile(__dirname + '/data/armor-sets.csv', 'utf8', function(error, data) {
    if (error) {
        return console.log(error);
    } else {
        data = data.split('\n');
        data.shift();
        data = data.filter(function(value) {
            return value != '';
        });
        armorSetsJSON = data.reduce(function(obj, row) {
            obj[row.split(',')[0]] = row.split(',')[1];
            return obj;
        }, {});
    }
});

fs.readFile(__dirname + '/data/armor.csv', 'utf8', function(error, data) {
    if (error) {
        return console.log(error);
    } else {
        data = data.split('\n');
        data.shift();
        data = data.filter(function(value) {
            return value != '';
        });
        armorJSON = data.reduce(function(obj, row) {
            row = row.split(',');
            obj[row[0]] = {
                "armorSet": row[1],
                "bonus": row[2],
                "location": row[3],
                "initialDefense": row[4]
            };
            if (row.length > 5) {

            }

            return obj;
        }, {});
    }
});

app.get('/', function (request, response) {
    // response.send('The beginning...');
    console.log(armorSetsJSON);
    console.log(armorJSON);
    response.sendFile(path.join(__dirname + '/index.html'));
});

app.use(Express.static(__dirname));

app.listen(8080);
