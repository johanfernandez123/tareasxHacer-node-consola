
require('colors');
const { guardarDB,leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu,
        pausa,
        leerInput,
        listadoTareaBorrar,
        confirmar,
        mostrarListadoChecklist
     } = require('./helpers/inquirer'); // con inquirer
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');
// const { mostrarMenu, pausa } = require('./helpers/mensajes'); //manualmente

console.clear();

const main = async() => {
    let opt = ''
    const tareas = new Tareas();
    const tareasDB = leerDB();
    if(tareasDB){ // cargar tareas
        tareas.cargarTareasFromArray(tareasDB);

    }
    do {
       // imprimir el menu
        opt = await inquirerMenu();
        switch (opt) {
            case '1': //crear tareas
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea(desc);
            break;

            case '2': // mostrar tareas
                tareas.listadoCompleto();
            break;

            case '3': //listar completadas
                tareas.listarPendientesCompletadas(true);
            break;

            case '4': // Listar pendientes
                tareas.listarPendientesCompletadas(false);
            break;

            case '5': // completado o pendiente
              const ids =  await mostrarListadoChecklist(tareas.listadoArr);
              tareas.toggleCompletadas(ids)
            break;

            case '6': // Borrar
                const id = await listadoTareaBorrar(tareas.listadoArr)
                if (id !== '0'){
                    const ok = await confirmar('¿Desea Borrar La Tarea');
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log('Tarea Borrada'.red)
                    }
                }
               
            break;

        
        
        }

        guardarDB(tareas.listadoArr);

        await pausa();

    } while (opt !== '0');
    
    
}

main();