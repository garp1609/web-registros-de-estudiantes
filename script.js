document.getElementById('studentForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const matricula = document.getElementById('matricula').value;
    const materia = document.getElementById('materia').value;
    const nota = document.getElementById('nota').value;
    const rowIndex = document.getElementById('rowIndex').value;

    const table = document.getElementById('studentsTable').getElementsByTagName('tbody')[0];

    if (rowIndex === '') {
        // Agregar nueva fila
        const newRow = table.insertRow();
        newRow.innerHTML = `
            <td>${nombre}</td>
            <td>${apellido}</td>
            <td>${matricula}</td>
            <td>${materia}</td>
            <td>${nota}</td>
            <td>
                <button class="btn-edit" onclick="editRow(this)">Editar</button>
                <button class="btn-delete" onclick="deleteRow(this)">Eliminar</button>
            </td>
        `;
    } else {
        // Editar fila existente
        const row = table.rows[rowIndex];
        row.cells[0].innerHTML = nombre;
        row.cells[1].innerHTML = apellido;
        row.cells[2].innerHTML = matricula;
        row.cells[3].innerHTML = materia;
        row.cells[4].innerHTML = nota;
        row.cells[5].innerHTML = `
            <button class="btn-edit" onclick="editRow(this)">Editar</button>
            <button class="btn-delete" onclick="deleteRow(this)">Eliminar</button>
        `;
    }

    document.getElementById('studentForm').reset();
    document.getElementById('rowIndex').value = '';
});

function deleteRow(btn) {
    const row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function editRow(btn) {
    const row = btn.parentNode.parentNode;
    const cells = row.getElementsByTagName('td');

    document.getElementById('nombre').value = cells[0].textContent;
    document.getElementById('apellido').value = cells[1].textContent;
    document.getElementById('matricula').value = cells[2].textContent;
    document.getElementById('materia').value = cells[3].textContent;
    document.getElementById('nota').value = cells[4].textContent;
    document.getElementById('rowIndex').value = row.rowIndex - 1;
}