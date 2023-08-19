import personaje from './personaje.json' assert { type: 'json' };
const datos = JSON.parse(personaje);
      console.log(datos);

const tareas = [
"Diaria",
"Arenas",
"Arch10",
"Arch25",
"Semanal",
"ICC10",
"ICC25",
"ICC10h",
"ICC25h",
"Transmutacion",
"Investigacion rasganorte",
"Inscripcion rasganorte",
"Inscripcion menor",
"Deposito"
];

const tablaTareas = document.getElementById('tabla-tareas');
const encabezado = document.getElementById('encabezado');
const totalFaltante = document.getElementById('total-faltante');

encabezado.innerHTML = '<th><span class="icono">Tareas</span></th>';

for (const personaje in datos.personaje) {
  encabezado.innerHTML += `
  <th>
  ${personaje}
  <br>
  <input type="checkbox" id="checkbox-${personaje}" data-personaje="${personaje}" class="marcar-desmarcar-todas">
  </th>
  `;
}
// Función para marcar o desmarcar una tarea en todos los personajes
function marcarDesmarcarTareaEnPersonajes(tareaIndex, marcar) {
  for (const personaje in datos.personaje) {
    const personajeTareasMarcadas = datos.personaje[personaje][2];

    if (marcar) {
      if (!personajeTareasMarcadas.includes(tareaIndex)) {
        personajeTareasMarcadas.push(tareaIndex);
      }
    } else {
      const tareaIndexToRemove = personajeTareasMarcadas.indexOf(tareaIndex);
      if (tareaIndexToRemove > -1) {
        personajeTareasMarcadas.splice(tareaIndexToRemove, 1);
      }
    }
  }

  actualizarDatosEnArchivo();
} 

tareas.forEach((tarea, index) => {
  const row = document.createElement('tr');
  let rowHTML = `<td>${tarea}<input type="checkbox" class="marcar-fila-tareas" data-tarea-index="${index}"></td>`;

  for (const personaje in datos.personaje) {
    const personajeTareas = datos.personaje[personaje][1];
    const personajeTareasMarcadas = datos.personaje[personaje][2];
    const enLista = personajeTareas.includes(index);
    const estaMarcada = personajeTareasMarcadas && personajeTareasMarcadas.includes(index);
    const checkBox = enLista ? `<input type="checkbox" data-personaje="${personaje}" data-tarea-index="${index}"${estaMarcada ? ' checked' : ''}>` : '';

    rowHTML += `<td class='check'>${checkBox}</td>`;
  }

  row.innerHTML = rowHTML;
  tablaTareas.appendChild(row);
});

const gearScoreRow = document.createElement('tr');
gearScoreRow.innerHTML = '<td>GearScore</td>';

for (const personaje in datos.personaje) {
  const personajeGearScore = datos.personaje[personaje][0];
  gearScoreRow.innerHTML += `
  <td>
  <input type="number" value="${personajeGearScore}" data-personaje="${personaje}">
  </td>
  `;
}

tablaTareas.insertBefore(gearScoreRow, tablaTareas.getElementsByTagName('tr')[1]);

let tareasFaltantes = calcularTareasFaltantes();

function calcularTareasFaltantes() {
  const checkboxes = tablaTareas.querySelectorAll('input[type="checkbox"]:not(.marcar-desmarcar-todas):not(.marcar-fila-tareas)');
  let contador = checkboxes.length;

  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      contador--;
    }
  });

  return Math.max(0, contador);
}

function actualizarTotalFaltante() {
  totalFaltante.textContent = `Tareas faltantes: ${tareasFaltantes}`;
}

actualizarTotalFaltante();

tablaTareas.addEventListener('change', (event) => {
  const checkbox = event.target;
  if (!checkbox.matches('input[type="checkbox"]:not(.marcar-desmarcar-todas):not(.marcar-fila-tareas)')) {
    return;
  }

  const personaje = checkbox.dataset.personaje;
  const tareaIndex = parseInt(checkbox.dataset.tareaIndex);

  if (checkbox.checked) {
    if (!datos.personaje[personaje][2]) {
      datos.personaje[personaje][2] = [];
    }

    if (!datos.personaje[personaje][2].includes(tareaIndex)) {
      datos.personaje[personaje][2].push(tareaIndex);
    }
    tareasFaltantes--;
  } else {
    const tareaIndexToRemove = datos.personaje[personaje][2].indexOf(tareaIndex);
    if (tareaIndexToRemove > -1) {
      datos.personaje[personaje][2].splice(tareaIndexToRemove, 1);
    }
    tareasFaltantes++;
  }

  tareasFaltantes = Math.max(0, tareasFaltantes);
  actualizarTotalFaltante();
  verificaFilaCompleta();
  actualizarDatosEnArchivo();
  actualizarCheckboxMarcarDesmarcar(personaje);
  actualizarCheckboxMarcarFila(tareaIndex);
});

tablaTareas.addEventListener('input', (event) => {
  const input = event.target;
  if (!input.matches('input[type="number"]')) {
    return;
  }

  const personaje = input.dataset.personaje;
  const index = 0;
  datos.personaje[personaje][index] = input.value;

  actualizarDatosEnArchivo();
});

tablaTareas.addEventListener('change', (event) => {
  const checkbox = event.target;
  if (!checkbox.matches('.marcar-fila-tareas')) {
    return;
  }

  const tareaIndex = parseInt(checkbox.dataset.tareaIndex);
  const marcar = checkbox.checked;

  marcarDesmarcarTareasFila(tareaIndex, marcar);
  actualizarDatosEnArchivo();
  actualizarTotalFaltante();
});

function marcarDesmarcarTareasFila(tareaIndex, marcar) {
  const checkboxesTarea = tablaTareas.querySelectorAll(`input[data-tarea-index="${tareaIndex}"]`);

  checkboxesTarea.forEach(checkbox => {
    const personaje = checkbox.dataset.personaje;

    if (marcar) {
      checkbox.checked = true;
      marcarDesmarcarTareaEnPersonajes(tareaIndex, true);
    } else {
      checkbox.checked = false;
      marcarDesmarcarTareaEnPersonajes(tareaIndex, false);
    }
  });

  actualizarCheckboxMarcarFila(tareaIndex);
}

function actualizarCheckboxMarcarDesmarcar(personaje) {
  const checkboxMarcarDesmarcar = document.getElementById(`checkbox-${personaje}`);
  const checkboxesTareasPersonaje = tablaTareas.querySelectorAll(`input[data-personaje="${personaje}"][data-tarea-index]`);

  let todasMarcadas = true;
  checkboxesTareasPersonaje.forEach(tarea => {
    if (!tarea.checked) {
      todasMarcadas = false;
    }
  });

  checkboxMarcarDesmarcar.checked = todasMarcadas;
}

function actualizarCheckboxMarcarFila(tareaIndex) {
  const checkboxMarcarFila = tablaTareas.querySelector(`.marcar-fila-tareas[data-tarea-index="${tareaIndex}"]`);
  const checkboxesTarea = tablaTareas.querySelectorAll(`input[data-tarea-index="${tareaIndex}"]`);

  let todasMarcadas = true;
  checkboxesTarea.forEach(tarea => {
    if (!tarea.checked) {
      todasMarcadas = false;
    }
  });

  checkboxMarcarFila.checked = todasMarcadas;
}

function actualizarDatosEnArchivo() {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'json.php', true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // console.log(xhr.responseText);
      // console.log(datosString);
    }
  };

  const datosString = JSON.stringify(datos);
  const params = `datos=${encodeURIComponent(datosString)}`;
  xhr.send(params);
}

function verificaFilaCompleta() {
  const checkboxesTareas = tablaTareas.querySelectorAll('.marcar-fila-tareas');

  checkboxesTareas.forEach(checkbox => {
    const tareaIndex = parseInt(checkbox.dataset.tareaIndex);
    let marcar = true;

    for (const personaje in datos.personaje) {
      const personajeTareasHabilitadas = datos.personaje[personaje][1];

      if (personajeTareasHabilitadas.includes(tareaIndex)) {

        const personajeTareasMarcadas = datos.personaje[personaje][2];
        if (!personajeTareasMarcadas.includes(tareaIndex)) {
          marcar = false;
          break;
        }
      }
    }

    checkbox.checked = marcar;
  });
}


document.addEventListener('DOMContentLoaded', () => {
  verificaFilaCompleta(); 

  const checkboxesMarcarDesmarcar = document.querySelectorAll('.marcar-desmarcar-todas');

  checkboxesMarcarDesmarcar.forEach(checkbox => {
    const personaje = checkbox.dataset.personaje;
    const checkboxesTareasPersonaje = tablaTareas.querySelectorAll(`input[data-personaje="${personaje}"][data-tarea-index]`);

    let todasMarcadas = true;
    checkboxesTareasPersonaje.forEach(tarea => {
      if (!tarea.checked) {
        todasMarcadas = false;
      }
    });

    checkbox.checked = todasMarcadas;
  });

  checkboxesMarcarDesmarcar.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const personaje = checkbox.dataset.personaje;
      const marcar = checkbox.checked;

      marcarDesmarcarTareasPersonaje(personaje, marcar);
      actualizarCheckboxMarcarDesmarcar(personaje);
      actualizarTotalFaltante();
    });
  });
});