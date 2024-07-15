document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');
    const totalTimeCount = document.getElementById('totalTimeCount');

    let totalMinutes = 0;

    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const taskNameInput = document.getElementById('taskName');
        const taskTimeInput = document.getElementById('taskTime');

        const taskName = taskNameInput.value.trim();
        const taskTime = parseInt(taskTimeInput.value);

        if (taskName === '' || isNaN(taskTime) || taskTime <= 0) {
            showAlert('POR FAVOR INGRESA UN NOMBRE Y TIEMPO VALIDO PARA ASIGNAR LA TAREA.', 'danger');
            return;
        }

        addTask(taskName, taskTime);
        taskForm.reset();
    });

    function addTask(name, time) {
        const task = document.createElement('div');
        task.classList.add('task');
        task.innerHTML = `
            <span class="task-name">${name}</span> - <span class="task-time">${time} MINUTOS</span>
            <input type="checkbox">
        `;

        const checkbox = task.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                totalMinutes += time;
                showAlert(`TAREA "${name}" COMPLETADA. TOTAL DE TIEMPO INVERTIDO: ${totalMinutes} MINUTOS.`, 'success');
                task.classList.add('completed');
            } else {
                totalMinutes -= time;
                showAlert(`TAREA "${name}" MARCADA INCOMPLETA. TOTAL DE TIEMPO INVERTIDO: ${totalMinutes} MINUTOS.`, 'danger');
                task.classList.remove('completed');
            }
            updateTimeCount();
        });

        taskList.appendChild(task);
        updateTimeCount();
    }

    function updateTimeCount() {
        totalTimeCount.textContent = totalMinutes;
    }

    function showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.appendChild(document.createTextNode(message));

        const container = document.querySelector('.container');
        const form = document.querySelector('#taskForm');
        container.insertBefore(alertDiv, form);

        setTimeout(function() {
            alertDiv.remove();
        }, 3000);
    }
});
