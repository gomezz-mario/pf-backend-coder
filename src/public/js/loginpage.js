const formLogin = document.getElementById("form-login");

const emailField = formLogin["email"];
const passwordField = formLogin["password"];
const btnLogin = document.getElementById("btn-login");
btnLogin.addEventListener("click", async (e) => {
	e.preventDefault();
	const email = emailField.value;
	const password = passwordField.value;
	const response = await fetch('/api/users/user-login', {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({email, password}),
	});

	switch(response.status){
		case 200:
			window.location = response.url;
			break; 
		case 400:
			alert("El usuario no existe.");
			break;
		case 401:
			alert("Contraseña incorrecta.");
			break;
		case 500:
			alert("Error del servidor.");
			break;
		default:
			alert("Error desconocido.");
			break;
	}
});