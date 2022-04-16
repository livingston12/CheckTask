const { restoreDefaultPrompts } = require("inquirer");
const Task = require("./task");

class Tasks {
    _listTask = {};

    get listArr() {
        const listTask = [];

        Object.keys(this._listTask).forEach(key => {
            const task = this._listTask[key];
            listTask.push( task );
        });

        return listTask;
    };

    constructor() {
        this._listTask = {};
    }

    createTask(desc = '') {
        const task = new Task(desc);
        this._listTask[task.id] = task;
    }

    deleteTask(id) {
      if (this._listTask[id]) {
          delete this._listTask[id];
      }
    }

    loadTasksFromArray(array = []) {
        array.forEach(data => {
            this._listTask[data.id] = data;
        });
    }

    listComplete() {
        console.log();
        this.listArr.forEach((task, i) => {
           const index = `${i + 1}`.green;
           const {desc, completedIn} = task;
           var status = completedIn ? 'Completada'.green : 'Pendiente'.red;
           var message = `${index} ${desc} :: ${status}`;
           console.log(message);
        });
        
    }

    listPendingComplete(completed = true) {
        let data = [];
        if (completed) {
            data = this.listArr.filter(x => x.completedIn !== null);
        } else {
            data = this.listArr.filter(x => x.completedIn === null);
        }
        console.log();
        let index = 1;
        data.forEach( task => {
            
            const {desc, completedIn} = task;
            var status = completedIn ? completedIn.green : 'Pendiente'.red;
            var message = `${(index + '.').green} ${desc} :: ${status}`;
            console.log(message);
            index += 1;
         });
    }

    toggleTasks(ids = []) {
        ids.forEach(id => {
           const task = this._listTask[id];
           if (!task.completedIn) {
               task.completedIn = new Date().toISOString();
           }
        });
        
        const tasksIncompleted = this.listArr.filter(arr => !ids.includes(arr.id));
        tasksIncompleted.forEach(task => this._listTask[task.id].completedIn = null);
    }
}


module.exports = Tasks;