const {v4: uuidV4 } = require('uuid');

class Task {
    id = '';
    desc = '';
    completedIn = null;

    constructor (desc) {
        this.id = uuidV4();
        this.desc = desc;
    }
}

module.exports = Task;