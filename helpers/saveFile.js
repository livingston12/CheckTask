const fs = require('fs');
const archivo = './db/data.json';

const saveDB = (data) => {
    try {
        fs.writeFileSync(archivo, JSON.stringify(data));
    }
    catch (err) {
        throw err;
    }
}

const readDB = () => {
    try {
        if(!fs.existsSync(archivo)) {
            return null;
        }
        const info = fs.readFileSync(archivo, {encoding: 'utf-8'});
        const data = JSON.parse(info);
        return data;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    saveDB,
    readDB
 };