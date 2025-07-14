// ✅ 1) Restaurar estados al abrir la página
document.addEventListener('DOMContentLoaded', () => {
  const savedStates = JSON.parse(localStorage.getItem('courseStates')) || {};
  Object.keys(savedStates).forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.className = savedStates[id];
      if (el.classList.contains('completed')) {
        el.onclick = null;
      } else if (el.classList.contains('active')) {
        el.style.pointerEvents = 'auto';
      }
    }
  });
});

// ✅ 2) Función para completar curso y desbloquear correlativos
function completeAndActivate(currentId, nextIds) {
  const currentCourse = document.getElementById(currentId);
  currentCourse.classList.remove('active');
  currentCourse.classList.add('completed');
  currentCourse.onclick = null;

  nextIds.forEach(id => {
    const next = document.getElementById(id);
    if (next && next.classList.contains('inactive')) {
      next.classList.remove('inactive');
      next.classList.add('active');
      next.style.pointerEvents = 'auto';
    }
  });

  saveStates();
  checkAndActivateFinal();
}

// ✅ 3) Guardar TODOS los estados cada vez que se cambia algo
function saveStates() {
  const courses = document.querySelectorAll('.course');
  const states = {};
  courses.forEach(course => {
    states[course.id] = course.className;
  });
  localStorage.setItem('courseStates', JSON.stringify(states));
}

// ✅ 4) Desbloquear los finales solo si todo está completado
function checkAndActivateFinal() {
  const allRequired = [
    'quimica','matematica','lengua','desempeno','biologia','introduccion',
    'bioquimica','estadistica','redaccion','realidad','morfo1','anatomia',
    'genetica','desarrollo','morfo2','morfo3','morfo4','inmunologia',
    'infectologia','fisiopato1','fisiopato2','semiologiaSim','semiologia',
    'farmacologia','apoyoDiagnostico','seguridad','nutricion','metodologia',
    'medicinaInterna1','medicinaInterna2','medicinaInterna3','epidemiologia',
    'saludPublica','medicinaBasada','atencionPrimaria','tesis1','tesis2',
    'terapeutica','simulacionClinica','simulacionQuirurgica','simulacionPediatrica',
    'simulacionGineco','cuidados','casos1','casos2','cirugia','pediatria','gineco',
    'ecografia','informatica','gerencia','filosofia'
  ];

  const allCompleted = allRequired.every(id => {
    const el = document.getElementById(id);
    return el && el.classList.contains('completed');
  });

  if (allCompleted) {
    ['preinternado','trabajo','internadoPediatria','internadoMedicina',
     'internadoCirugia','internadoGineco'].forEach(id => {
      const final = document.getElementById(id);
      final.classList.remove('inactive');
      final.classList.add('active');
      final.style.pointerEvents = 'auto';
    });
    saveStates();
  }
}
