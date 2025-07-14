document.addEventListener('DOMContentLoaded', () => {
  const savedStates = JSON.parse(localStorage.getItem('courseStates')) || {};
  Object.keys(savedStates).forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.className = savedStates[id];
      el.style.pointerEvents = 'auto';
    }
  });
});

function toggleCourseState(currentId, nextIds) {
  const currentCourse = document.getElementById(currentId);

  if (currentCourse.classList.contains('active')) {
    currentCourse.classList.remove('active');
    currentCourse.classList.add('completed');
  } else if (currentCourse.classList.contains('completed')) {
    currentCourse.classList.remove('completed');
    currentCourse.classList.add('active');
  }

  if (currentCourse.classList.contains('completed')) {
    nextIds.forEach(id => {
      const next = document.getElementById(id);
      if (next && next.classList.contains('inactive')) {
        next.classList.remove('inactive');
        next.classList.add('active');
        next.style.pointerEvents = 'auto';
      }
    });
  }

  saveStates();
  checkAndActivateFinal();
}

function saveStates() {
  const courses = document.querySelectorAll('.course');
  const states = {};
  courses.forEach(course => {
    states[course.id] = course.className;
  });
  localStorage.setItem('courseStates', JSON.stringify(states));
}

function checkAndActivateFinal() {
  const allRequired = [
    // lista completa de cursos base para desbloquear internados
    'quimica','matematica','lengua','desempeno','biologia','introduccion',
    'bioquimica','estadistica','redaccion','realidad','morfo1','morfo2','morfo3',
    'morfo4','inmunologia','infectologia','fisiopato1','fisiopato2','semiologiaSim',
    'semiologia','farmacologia','apoyoDiagnostico','seguridad','nutricion',
    'metodologia','medicinaInterna1','medicinaInterna2','medicinaInterna3',
    'epidemiologia','saludPublica','medicinaBasada','atencionPrimaria',
    'tesis1','tesis2','terapeutica','simulacionClinica','simulacionQuirurgica',
    'simulacionPediatrica','simulacionGineco','cuidados','casos1','casos2',
    'cirugia','pediatria','gineco','ecografia','informatica','gerencia','filosofia'
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
