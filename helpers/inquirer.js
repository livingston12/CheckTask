const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'What do you want to do?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Create task`
            },
            {
                value: 2,
                name: `${'2.'.green} List tasks`
            },
            {
                value: 3,
                name: `${'3.'.green} List complete tasks`
            },
            {
                value: 4,
                name: `${'4.'.green} List pending tasks`
            },
            {
                value: 5,
                name: `${'5.'.green} Complete tasks(s)`
            },
            {
                value: 6,
                name: `${'6.'.green} Delete task`
            },
            {
                value: 0,
                name: `${'0.'.green} Exit`
            },

        ]
    }
];



const inquirerMenu = async () => {
    console.clear();
    console.log('============================'.green);
    console.log('  Select an option'.white);
    console.log('============================\n'.green);

    const { option } = await inquirer.prompt(questions);

    return option;

}

const deleteMenu = async (tasks = []) => {
    console.log();
    const dataChoices = tasks.map((task, i) => {
        const index = `${i + 1}.`.green;
         return {
            value: task.id,
            name: `${index} ${task.desc}`
        };
    });
    dataChoices.unshift({
        value: 0,
        name: `${'0.'.green} Cancel`
    });
    const choices = [
        {
           type: 'list',
           name: 'id',
           message: 'Delete task',
           choices: dataChoices
        }
    ]

   const { id }  = await inquirer.prompt(choices);

   return id;
}

const pause = async () => {
    const questionsPause = [
        {
            type: 'input',
            name: 'pause',
            message: `Press ${ 'ENTER'.green } to continue`
        }
    ];
    console.log('\n');

    await inquirer.prompt(questionsPause);
}

const readInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate: ( value ) => {
                if ( value.lenght === 0 ) {
                    return 'Please introduce a value'.red;
                }
                return true;
            }
        }
    ]
    const { desc } = await inquirer.prompt(question);
    return desc;
}

const confirm = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]
    const { ok } = await inquirer.prompt(question);
    return ok;
}

const completedChekListMenu = async (tasks = []) => {
    console.log();
    const dataChoices = tasks.map((task, i) => {
        const index = `${i + 1}.`.green;
         return {
            value: task.id,
            name: `${index} ${task.desc}`,
            checked: task.completedIn ? true : false
        };
    });
    const choices = [
        {
           type: 'checkbox',
           name: 'ids',
           message: 'Select complete task',
           choices: dataChoices
        }
    ]

   const { ids }  = await inquirer.prompt(choices);

   return ids;
}

module.exports = {
    inquirerMenu,
    pause,
    readInput,
    deleteMenu,
    confirm,
    completedChekListMenu
}