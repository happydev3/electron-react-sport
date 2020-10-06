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

    let result;

    if( arg === 'all') {
        result = db.select().from('optimizers');
    } else {
        result = db.select().from('optimizers').where('id', arg);
    };
    
    result.then((rows) => {
        event.reply('responseGetOptimizes', rows);
    })
   
});

ipcMain.on('insertOptimizes', (event, arg) => {
    
    db('optimizers')
    .insert({
        name: arg.name,
        minSalary: arg.minSalary,
        maxSalary: arg.maxSalary,
        maxPlayers: arg.maxPlayers,
        minTeams: arg.minTeams,
        noOpponent: arg.noOpponent,
        positions: arg.positions.toString()
    })
    .then((rows) => {
       event.reply('responseInsertOptimizes', 'success')
    })
    .catch(e => {
        console.error(e);
        event.reply('responseInsertOptimizes', 'false')
    });
})

ipcMain.on('updateOptimizes', (event, arg) => {

    db('optimizers')
    .where('id', arg.id)
    .update({
        name: arg.name,
        minSalary: arg.minSalary,
        maxSalary: arg.maxSalary,
        maxPlayers: arg.maxPlayers,
        minTeams: arg.minTeams,
        noOpponent: arg.noOpponent,
        positions: arg.positions.toString()
    })
    .then((rows) => {
       event.reply('responseUpdateOptimizes', 'success')
    })
    .catch(e => {
        console.error(e);
        event.reply('responseUpdateOptimizes', 'false')
    });
});


ipcMain.on('deleteOptimize', (event, arg) => {
    if(arg === 'all') {
        db('optimizers')
        .whereNot('id', -1)
        .del()
        .then((rows) => {
            event.reply('responseDeleteOptimize', 'success')
        })
        .catch(e => {
            console.error(e);
            event.reply('responseDeleteOptimize', 'false')
        });
    } else {
        db('optimizers')
        .where('id', arg)
        .del()
        .then((rows) => {
            event.reply('responseDeleteOptimize', 'success')
         })
         .catch(e => {
             console.error(e);
             event.reply('responseDeleteOptimize', 'false')
         });
    }
});
