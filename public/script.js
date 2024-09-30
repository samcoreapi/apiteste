// script.js

const appointmentsList = document.getElementById('appointmentsList');
const appointmentForm = document.getElementById('appointmentForm');

let appointments = []; // Array para armazenar os agendamentos

appointmentForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Evita o envio do formulário

    const name = document.getElementById('name').value;
    const date = new Date(document.getElementById('date').value);
    const time = document.getElementById('time').value;

    if (name && date && time) {
        const appointmentTime = new Date(date);
        const [hours, minutes] = time.split(':');
        appointmentTime.setHours(hours, minutes, 0, 0); // Ajusta a hora

        appointments.push({ name, date: appointmentTime }); // Adiciona o novo agendamento
        renderAppointments();
        appointmentForm.reset(); // Reseta o formulário
    }
});

// Função para renderizar a lista de agendamentos
function renderAppointments() {
    appointmentsList.innerHTML = ''; // Limpa a lista

    appointments.forEach((appointment, index) => {
        const li = document.createElement('li');
        li.textContent = `${appointment.name} - ${appointment.date.toLocaleString()}`;

        // Botão para editar
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.classList.add('edit-btn');
        editButton.addEventListener('click', () => editAppointment(index));
        
        // Botão para apagar
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Apagar';
        deleteButton.addEventListener('click', () => deleteAppointment(index));
        
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        appointmentsList.appendChild(li);
    });
}

// Função para editar um agendamento
function editAppointment(index) {
    const appointment = appointments[index];
    document.getElementById('name').value = appointment.name;
    document.getElementById('date').value = appointment.date.toISOString().slice(0, 10);
    document.getElementById('time').value = appointment.date.toTimeString().slice(0, 5);
    deleteAppointment(index); // Remove o agendamento original
}

// Função para apagar um agendamento
function deleteAppointment(index) {
    appointments.splice(index, 1); // Remove o agendamento do array
    renderAppointments(); // Re-renderiza a lista de agendamentos
}
