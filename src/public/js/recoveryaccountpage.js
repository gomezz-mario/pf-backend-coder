const btnEnviar = document.getElementById("btn-enviar");
const form = document.getElementById("form-recovery");

btnEnviar.addEventListener("click", async (evt) => {
	evt.preventDefault();
	const email = form["email"].value;
	if(!email || email === "" || !email.includes("@")) return alert("Ingresa un email válido.");
	const response = await fetch(`/api/users/user-recovery?email=${email}`);
	
	switch(response.status){
		case 200:
			alert("Hemos enviado un link de recuperación de cuenta. Revisa tu correo.");
			window.location = response.url;
			break;
		case 400:
			alert("Usuario no encontrado.");
			break;
		default:
			alert("Ha ocurrido un error en el servidor.");
			break;
	}
});
