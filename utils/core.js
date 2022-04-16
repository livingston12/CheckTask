const readline = (message, callback) => {
    const read = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    read.question(message, (opt) => {
        callback(opt);
        read.close();
    });
}


module.exports = readline;
