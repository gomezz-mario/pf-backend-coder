const btnComprar = document.querySelector('#btn-add-to-cart');
const btnDelete = document.querySelector('#btn-delete');

btnComprar.addEventListener('click', async (e) => {
	e.preventDefault();
	const productId = btnComprar.getAttribute("data-product-id");
	const quantity = 1; //implementar count
	const response = await fetch('/api/carts/add', {
		method: 'PUT',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({products: [{_id: productId, quantity}]})
	});

	switch(response.status){
		case 200:
			alert("Agregaste un producto al carrito.");
			window.location = '/views/'
			break;
		case 401:
			alert("Debes iniciar sesión para agragar este producto al carrito.")
			window.location = '/views/user-login'
			break;
		default:
			alert("Algo salió mal.");
			break;
	}
});

btnDelete.addEventListener('click', async (e) => {
	e.preventDefault();
	const pid = btnDelete.getAttribute("data-product-id");
	const response = await fetch(`/api/products/${pid}`, {
		method: 'DELETE',
		headers: {'Content-Type': 'application/json'},
	});

	switch(response.status){
		case 200:
			window.location = '/views/';
			break;
		default:
			alert(`Ocurrio un error. ${response.status}`);
			break;
	}

});

