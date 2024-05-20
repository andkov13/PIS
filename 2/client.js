document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', function() {
        const loginInput = document.getElementById('loginInput');
        const login = loginInput.value.trim();
        
        if (login) {
            fetchPersonalData(login);
        } else {
            alert('Please enter your Moodle login.');
        }
    });
});

function fetchPersonalData(login) {
    const apiUrl = `http://localhost:3000?login=${login}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                const section = document.querySelector('section');
                const error = document.createElement('p');
                error.textContent = `ERROR: unknown login`;
                section.appendChild(error);
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            displayPersonalData(data);
        })
        .catch(error => console.error('Error fetching the personal data:', error));
}

function displayPersonalData(data) {
    const section = document.querySelector('section');
    section.innerHTML = ''; // Очищення секції перед відображенням нових даних

    const surname = document.createElement('p');
    surname.textContent = `Прізвище: ${data.surname}`;
    section.appendChild(surname);

    const name = document.createElement('p');
    name.textContent = `Ім’я: ${data.name}`;
    section.appendChild(name);

    const course = document.createElement('p');
    course.textContent = `Курс: ${data.course}`;
    section.appendChild(course);

    const group = document.createElement('p');
    group.textContent = `Група: ${data.group}`;
    section.appendChild(group);
}
