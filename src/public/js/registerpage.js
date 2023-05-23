const sections = document.querySelectorAll(".form__section");
const btnSumbit = document.querySelectorAll(".btn-register")[0];
const btnsNext = document.querySelectorAll(".btn-next");
const btnsBack = document.querySelectorAll(".btn-back");
const form = document.getElementById("form-register");

let step = 0;

const hideAllSections = () => {
	sections.forEach(section => {
		section.classList.add("no-show");
	})
}

const showOneSection = (numberSection) => {
	sections[numberSection].classList.remove("no-show");
}

btnsNext.forEach(btn => {
	btn.addEventListener("click", (event) => {
		event.preventDefault();
		step++;
		hideAllSections();
		showOneSection(step);
	})
});

btnsBack.forEach(btn => {
	btn.addEventListener("click", (event) => {
		event.preventDefault();
		step--;
		hideAllSections();
		showOneSection(step);
	})
});

btnSumbit.addEventListener("click", async(event) => {
	event.preventDefault();
	//STEP 0
	const firstName = form['firstName'].value;
	const lastName = form['lastName'].value;
	const birthday = form['birthday'].value;
	if(!birthday || birthday === "" || !lastName || lastName === "" || !firstName || firstName === ""){
		step = 0;
		hideAllSections();
		showOneSection(step);
		alert("Los campos son obligatorios.");
		return
	}
	//STEP 1
	const address = form['address'].value;
	const phone = form['phone'].value;
	if(!address || address === "" || !phone || phone === ""){
		step = 1;
		hideAllSections();
		showOneSection(step);
		alert("Los campos son obligatorios.");
		return
	}
	//STEP 2
	const email = form['email'].value;
	const pass1 = form['password1'].value;
	const pass2 = form['password2'].value;
	if(!email || email === "" || !pass1 || pass1 === "" || !pass2 || pass2 === ""){
		step = 2;
		hideAllSections();
		showOneSection(step);
		alert("Los campos son obligatorios.");
		return
	}
	if(pass1.length < 6){
		step = 2;
		hideAllSections();
		showOneSection(step);
		alert("La contraseña no es válida. Debe tener al menos 6 caracteres.");
		return
	}
	if(pass1 !== pass2){
		step = 2;
		hideAllSections();
		showOneSection(step);
		alert("Las contraseñas no coinciden.");
		return
	}
	
	const userData = {
		firstName,
		lastName,
		fullName: `${firstName} ${lastName}`,
		address,
		phone,
		email,
		password: pass1
	};

	let response = await fetch('/api/users/user-register', {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({userData}),
	});
	
	switch(response.status){
		case 200:
			window.location = response.url;
			break; 
		case 400:
			alert("El usuario ya existe.");
			break;
		case 500:
			alert("Error del servidor.");
			break;
		default:
			alert("Error desconocido.");
			break;
	}

});
