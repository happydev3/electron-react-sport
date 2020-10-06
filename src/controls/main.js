const { ipcMain } = require('electron');
const sqlite3 = require('sqlite3');
const path = require("path");
const knex = require('knex');
const { promises } = require('dns');
const { rejects } = require('assert');

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
        result.then((rows) => {
            getFullResult(rows).then((res) => {
                event.reply('responseGetOptimizes', res);
            });
        });
        
    } else {
        result = db.select().from('optimizers').where('id', arg);
        result.then((rows) => {
            getFullResult(rows).then((res) => {
                event.reply('responseGetOptimizes', res);
            });
        });
    };
});

ipcMain.on('insertOptimizes', async (event, arg) => {

    let result = await db('optimizers')
                        .insert({
                            name: arg.name,
                            minSalary: arg.minSalary,
                            maxSalary: arg.maxSalary,
                            maxPlayers: arg.maxPlayers,
                            minTeams: arg.minTeams,
                            noOpponent: arg.noOpponent,
                        });

    let insertPositions = arg.positions.map((position) => ({
        content: position, optimize_id: result[0]
    }));


    let positions = await db('positionsOfOptimize')
                            .insert(insertPositions);

    if(result && positions) {
        event.reply('responseInsertOptimizes', 'succcess');
    }

})

ipcMain.on('updateOptimizes', async (event, arg) => {

    console.error('update values => ', arg);

    let result = await db('optimizers')
    .where('id', arg.id)
    .update({
        name: arg.name,
        minSalary: arg.minSalary,
        maxSalary: arg.maxSalary,
        maxPlayers: arg.maxPlayers,
        minTeams: arg.minTeams,
        noOpponent: arg.noOpponent,
    });


    let getAlldeleteById = await db('positionsOfOptimize')
                                    .where('optimize_id', arg.id)
                                    .del();

    let insertPositions = arg.positions.map((position) => ({
        content: position, optimize_id: arg.id
    }));

    let updatePosition = await db('positionsOfOptimize')
                            .insert(insertPositions);

    if(result && updatePosition) {
        event.reply('responseUpdateOptimizes', 'success')
    } else {
        event.reply('responseUpdateOptimizes', 'false')
    }
});


ipcMain.on('deleteOptimize', async (event, arg) => {
    if(arg === 'all') {
        let result = await db('optimizers')
                            .whereNot('id', -1)
                            .del();
        let positions = await db('positionsOfOptimize')
                            .whereNot('id', -1)
                            .del();

        if(result && positions) {
           await event.reply('responseDeleteOptimize', 'success')
        } else {
           await event.reply('responseDeleteOptimize', 'false')
        }
       
    } else {
       let result = await db('optimizers')
                            .where('id', arg)
                            .del()
       let positions = await db('positionsOfOptimize')
                            .where('optimize_id', arg)
                            .del()

       if(result && positions) {
            event.reply('responseDeleteOptimize', 'success')
       } else {
            event.reply('responseDeleteOptimize', 'false')
       }
    }
});


getFullResult = async (result) => {
    let shadowArray = [];

    for(let i = 0; i< result.length ; i++) {
        let _positions = await db.select().where('optimize_id', result[i].id).from('positionsOfOptimize');
        let positions = [];
        let _newArray = [];
        for (let j = 0; j < _positions.length; j++) {
            _newArray.push(_positions[j].content)
        }
        positions = _newArray;
        shadowArray.push({
            ...result[i],
            positions
        })
    }

    let newArray = shadowArray;

    return new Promise ((resolve, reject) => {
         resolve(newArray);
    }); 
}
