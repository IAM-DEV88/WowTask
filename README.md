# WowTask
## Gestor de Tareas
Este código es un gestor de tareas diseñado para su uso en un entorno de juego de varios personajes. Permite a los jugadores realizar un seguimiento de las tareas que deben completar en el juego. Aquí se destacan las principales características y utilidades del código:

<img src="https://i.ibb.co/T0gyc7V/Captura-de-pantalla-2023-08-26-184458.png" width="400">

# Características principales
- Carga de datos desde un archivo JSON: El código carga los datos de los personajes desde un archivo JSON (personaje.json) al inicio. Esto permite que los jugadores tengan sus propios datos persistentes.
- Tabla de tareas dinámica: Se crea una tabla de tareas en la página web de forma dinámica en función de los datos cargados. Las tareas se organizan en filas y los personajes en columnas.
- Marcado de tareas: Los jugadores pueden marcar y desmarcar tareas específicas para indicar si han sido completadas o no. Esto se hace mediante casillas de verificación.
- Marcado/desmarcado masivo: Los jugadores pueden marcar o desmarcar todas las tareas para un personaje específico o una tarea específica en todos los personajes con solo hacer clic en la casilla de verificación correspondiente.
- Actualización de datos en tiempo real: Cada vez que se marca o desmarca una tarea, se actualizan los datos en el archivo JSON (json.php) en el servidor, lo que permite que todos los jugadores mantengan control de su progreso en tiempo real.
- Cálculo de tareas faltantes: Se calcula el número de tareas que faltan por completar y se muestra en la parte inferior de la tabla.
Edición del Gear Score: Los jugadores pueden editar el Gear Score de sus personajes directamente en la tabla.

# Utilidades
- Gestión de tareas de juegos multijugador: Permite a los jugadores llevar un registro de las tareas que deben realizar en el juego.
- Seguimiento del progreso en tiempo real: Los jugadores pueden ver en tiempo real cuántas tareas han completado y cuántas quedan por hacer.
- Personalización de datos de personajes: Cada jugador puede cargar sus propios datos de personajes desde el archivo JSON, lo que permite una experiencia personalizada.
- Edición del Gear Score: Los jugadores pueden ajustar el Gear Score de sus personajes según sea necesario para reflejar con precisión su progreso en el juego.
- Sincronización de datos en el servidor: Los datos se almacenan en un servidor y se actualizan en tiempo real, lo que garantiza que todos los jugadores tengan acceso a la información más reciente.

# Requisitos previos
El servidor debe admitir PHP para la actualización de datos en el archivo JSON (json.php).

# Uso
- Cargue sus datos de personajes en un archivo JSON llamado personaje.json.
- Coloque este código en su sitio web o servidor que admita PHP.
- Los jugadores pueden acceder al gestor de tareas a través de la página web y comenzar a marcar tareas, editar el Gear Score en tiempo real.

# Contribuciones y mejoras
Este código es un proyecto en desarrollo, y se pueden realizar varias mejoras, como agregar autenticación de usuario, permitir la personalización de la tabla y agregar notificaciones en tiempo real. Las contribuciones son bienvenidas.

# Créditos
Este código fue desarrollado por IAM-DEV88. Se agradecen los aportes y sugerencias de la comunidad de jugadores.