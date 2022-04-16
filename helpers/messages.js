require('colors');
const readline = require('../utils/core');

const showMenus = () => {
    return new Promise(resolve => {
        console.clear();
        console.log('============================'.green);
        console.log('  Select an option'.green);
        console.log('============================\n'.green);

        console.log(`${'1.'.green} Create task`);
        console.log(`${'2.'.green} List tasks`);
        console.log(`${'3.'.green} List complete tasks`);
        console.log(`${'4.'.green} List pending tasks`);
        console.log(`${'5.'.green} Complete tasks(s)`);
        console.log(`${'6.'.green} Delete task`);
        console.log(`${'0.'.green} Exit`);

        readline('Select an option: ', (opt) => {
            resolve(opt);
        });
    });
    
}

const pause = () => {
    return new Promise(resolve => {
        readline(`\nPress ${ 'ENTER'.green } to continue\n`, (opt) => {
            resolve(opt);
        });
    })
    
}


module.exports = {
    showMenus,
    pause
}