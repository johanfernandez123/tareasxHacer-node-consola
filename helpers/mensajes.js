require('colors');

const mostrarMenu = () => {
    return new Promise( resolve => {

        console.clear();
        console.log('========================='.green);
        console.log(' Seleccione una opción'.green);
        console.log('=========================\n'.green);
    
        console.log(`${'1.'.green} Crear Tarea`);
        console.log(`${'2.'.green} Listar Tareas`);
        console.log(`${'3.'.green} Listar Tareas Completadas`);
        console.log(`${'4.'.green} Listar Tareas Pendientes`);
        console.log(`${'5.'.green} Completar Tarea(s)`);
        console.log(`${'6.'.green} Borrar Una Tarea`);
        console.log(`${'0.'.green} Salir \n`);
    
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
        readLine.question('Seleccione una opción: ', (opt) => {
            console.log(opt);
            readLine.close();
            resolve(opt);
        })
    });
 

}

const pausa = () => {
    return new Promise(resolve => {
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
        readLine.question(`\nPrecione ${'ENTER'.green} para continuar\n`, (opt) => {
            readLine.close();
            resolve();
        })
    })

}

module.exports = {
    mostrarMenu,
    pausa
}