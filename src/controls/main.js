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

    console.log('_______event_______', event);
    console.log('_______arg_________', arg);

    let result;

    if( arg === 'all') {
        result = db.select().from('optimizers');
        result.then((rows) => {
            getFullResult(rows).then((res) => {
                console.log('full result', res);
                event.reply('responseGetOptimizes', res);
            });
        });
        
    } else {
        result = db.select().from('optimizers').where('id', arg);
        result.then((rows) => {
            getFullResult(rows).then((res) => {
                console.log('result by id', res);
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


ipcMain.handle('submitCSV', async (event, arg) => {
    console.log('sunmit csv', event, arg);
    let _newArray = [];
    let insertCSV = [];
    for(let i = 0; i < arg.uploadData.length; i++) {
        _newArray.push({
            name: arg.uploadData[i].name,
            position: arg.uploadData[i].pos,
            team: arg.uploadData[i].team,
            opponent: arg.uploadData[i].opp,
            salary: arg.uploadData[i].salary,
            fpts: arg.uploadData[i].fpts,
            exposure: arg.uploadData[i].exp,
            optimize_id: arg.optimizeId
        })
    }
    insertCSV = _newArray;
    console.log('insertCSV', insertCSV);
    let result = await db('players')
                        .insert(insertCSV);

    return result;
});

ipcMain.handle('deleteRow', async (event, arg) => {
    console.log('deleteRow', arg);
    let result = await db('players')
                        .where('id', arg)
                        .del();
    return result;
});

ipcMain.handle('deleteCurrentData', async (event, arg) => {
    console.log('deleteCurrentData', arg);
    let result = await db('players')
                        .where('optimize_id', arg)
                        .del();
    return result;
});

getFullResult = async (result) => {
    let shadowArray = [];

    for(let i = 0; i< result.length ; i++) {
        let players = [];
        let _positions = await db.select().where('optimize_id', result[i].id).from('positionsOfOptimize');
        if(result.length === 1) {
            players = await db.select().where('optimize_id', result[i].id).from('players');
        }
        let positions = [];
        let _newArray = [];
        for (let j = 0; j < _positions.length; j++) {
            _newArray.push(_positions[j].content)
        }
        positions = _newArray;
        shadowArray.push({
            ...result[i],
            positions,
            players
        })
    }

    let newArray = shadowArray;

    return new Promise ((resolve, reject) => {
         resolve(newArray);
    }); 
}
