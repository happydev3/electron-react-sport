const { ipcMain } = require('electron');
const sqlite3 = require('sqlite3');
const path = require("path");
const knex = require('knex');

const dbPath = path.resolve(__dirname, '../data/data.sqlite');

const db = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: dbPath
    }
});

ipcMain.on('getOptimizes', (event, arg) => {
    console.log('____argument_______', arg);

    let result = db.select().from('optimizers');

    result.then((rows) => {
        console.log('*******rows*********', rows);
        event.reply('responseGetOptimizes', rows);
    })
    // console.log('result', result);

    // ipcMain.send('responseGetOptimizes', result);
});
