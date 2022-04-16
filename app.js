require('colors');

const {
    inquirerMenu,
    pause,
    readInput,
    deleteMenu,
    confirm,
    completedChekListMenu
} = require('./helpers/inquirer');
const Tasks = require('./models/tasks');
const { saveDB, readDB} = require('./helpers/saveFile');


const tasks = new Tasks();
const taskDB = readDB(); // Read Json

if (taskDB) {
  tasks.loadTasksFromArray(taskDB); // Load data if the file have data
}



const main = async () => {
    let opt = '';

    do {
        opt = await inquirerMenu(); // Open principal menu
        
        switch (opt) {
            case 1: // Create Task
             const desc = await readInput('Description:');
             tasks.createTask(desc);
            break;
            case 2: // List Task
                tasks.listComplete();
            break;
            case 3: // List Complete Task
                tasks.listPendingComplete();
            break;
            case 4: // List Pending Task
                tasks.listPendingComplete(false);
            break;
            case 5: // Complete or pending Task
                const ids = await completedChekListMenu(tasks.listArr);
                tasks.toggleTasks(ids);
            break;
            case 6: // Delete task
                const id = await deleteMenu(tasks.listArr);
                if (id !== 0) {
                    const isDeleted = await confirm('Are you sure you want to delete the task ?');
                    if (isDeleted) {
                        tasks.deleteTask(id);
                    }
                }
            break;
        }
        
        saveDB(tasks.listArr);
        await pause();

    } while (opt !== 0);
}

main();

