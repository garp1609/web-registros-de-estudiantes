// Cargar productos del localStorage al cargar la página
document.addEventListener('DOMContentLoaded', loadProducts);

// Evento para el formulario
document.getElementById('productForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const categoria = document.getElementById('categoria').value;
    const precio = parseFloat(document.getElementById('precio').value);
    const stock = parseInt(document.getElementById('stock').value);
    const rowIndex = document.getElementById('rowIndex').value;

    if (rowIndex === '') {
        // Agregar nuevo producto
        addProduct(nombre, categoria, precio, stock);
    } else {
        // Editar producto existente
        editProduct(rowIndex, nombre, categoria, precio, stock);
    }

    document.getElementById('productForm').reset();
    document.getElementById('rowIndex').value = '';
});

// Función para agregar producto
function addProduct(nombre, categoria, precio, stock) {
    if (nombre && categoria && precio > 0 && stock >= 0) {
        const products = getProducts();
        const newProduct = { nombre, categoria, precio, stock };
        products.push(newProduct);
        saveProducts(products);
        renderProducts();
        showTotalCount();
        Swal.fire('Producto Agregado', 'El producto ha sido agregado exitosamente.', 'success');
    } else {
        Swal.fire('Error', 'Por favor, complete todos los campos correctamente.', 'error');
    }
}

// Función para editar producto
function editProduct(rowIndex, nombre, categoria, precio, stock) {
    Swal.fire({
        title: 'Confirmar Edición',
        text: "¿Está seguro que desea editar este producto?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, editar',
        cancelButtonText: 'No, cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            const products = getProducts();
            products[rowIndex] = { nombre, categoria, precio, stock };
            saveProducts(products);
            renderProducts();
            showTotalCount();
            Swal.fire('Producto Editado', 'El producto ha sido editado exitosamente.', 'success');
        }
    });
}

// Función para eliminar producto
function deleteProduct(rowIndex) {
    Swal.fire({
        title: 'Confirmar Eliminación',
        text: "¿Está seguro que desea eliminar este producto?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'No, cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            const products = getProducts();
            products.splice(rowIndex, 1);
            saveProducts(products);
            renderProducts();
            showTotalCount();
            Swal.fire('Producto Eliminado', 'El producto ha sido eliminado exitosamente.', 'success');
        }
    });
}

// Función para cargar productos desde localStorage
function loadProducts() {
    renderProducts();
    showTotalCount();
}

// Función para renderizar productos en la tabla
function renderProducts() {
    const products = getProducts();
    const tableBody = document.getElementById('productsTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    products.forEach((product, index) => {
        const newRow = tableBody.insertRow();
        newRow.innerHTML = `
            <td>${product.nombre}</td>
            <td>${product.categoria}</td>
            <td>$${product.precio.toFixed(2)}</td>
            <td>${product.stock}</td>
            <td>
                <button class="btn btn-warning" onclick="editRow(${index})">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="btn btn-danger" onclick="deleteProduct(${index})">
                    <i class="fas fa-trash"></i> Eliminar
                </button>
            </td>
        `;
    });
}

// Función para obtener productos del localStorage
function getProducts() {
    return JSON.parse(localStorage.getItem('products')) || [];
}

// Función para guardar productos en localStorage
function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

// Mostrar total de artículos
function showTotalCount() {
    const products = getProducts();
    document.getElementById('articleCount').innerText = products.length;
}

// Editar fila en la tabla
function editRow(rowIndex) {
    const products = getProducts();
    const product = products[rowIndex];

    document.getElementById('nombre').value = product.nombre;
    document.getElementById('categoria').value = product.categoria;
    document.getElementById('precio').value = product.precio;
    document.getElementById('stock').value = product.stock;
    document.getElementById('rowIndex').value = rowIndex;
}