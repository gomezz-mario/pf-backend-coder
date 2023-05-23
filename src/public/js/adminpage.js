const btnsDelete = document.querySelectorAll(".delete");
const btnsEdit = document.querySelectorAll(".edit");
const btnsCancel = document.querySelectorAll(".cancel");
const btnsChangeBackRole = document.querySelectorAll(".btn-change-role.left");
const btnsChangeNextRole = document.querySelectorAll(".btn-change-role.right");
const btnsSave = document.querySelectorAll(".btn-user-action.save");
const btnDeleteUsers = document.getElementById("btn-delete-users");

const roles = ["user", "premium", "admin"];
let role = 0;

if(btnDeleteUsers){
	btnDeleteUsers.addEventListener("click", async (evt) => {
		evt.preventDefault();
		const response = await fetch('/api/users');
		if(response.status === 200){
			const users = (await response.json()).payload;
			const ahora = new Date();
			const cincoMinutosInMilis = 300000;
			const usersNoAdminsInactivos = users.filter(user => user.role !== "admin" && (ahora - new Date(user.lastConnection)) > cincoMinutosInMilis);
			console.log("Eliminando ", usersNoAdminsInactivos.length, " usuarios.");
			await Promise.all(usersNoAdminsInactivos.map(async user => {
				return await fetch(`/api/users/${user._id}`, {
					method: "DELETE",
					headers: {'Content-Type': 'application/json'}
				})
			}));
	
			window.location = '/views/admin'
		}
	});
}
if(btnsDelete && btnsDelete.length > 0){
	btnsDelete.forEach(btn => btn.addEventListener("click", async (evt) => {
		evt.preventDefault();
		const userId = btn.getAttribute("data-id");
		await fetch(`/api/users/${userId}`, {
			method: "DELETE",
			headers: {'Content-Type': 'application/json'}
		});
		window.location = "/views/admin";
	}))
}
if(btnsSave && btnsSave.length > 0){
	btnsSave.forEach(btn => btn.addEventListener("click", async (evt) => {
		evt.preventDefault();
		const userId = btn.getAttribute("data-id");
		const cardUser = btn.parentElement.parentElement;
		const changeRoleContainer = cardUser.querySelector(".content-data").querySelector(".change-role__container");
		const changeField = changeRoleContainer.querySelector(".change");
		const role = changeField.getAttribute("data-role");
		await fetch(`/api/users/${userId}`, {
			method: "PUT",
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				updateData: {role}
			})
		});
		window.location = "/views/admin";
	}))
}
if(btnsEdit && btnsEdit.length > 0){
	btnsEdit.forEach(btn => btn.addEventListener("click", (evt) => {
		evt.preventDefault();
		const cardUser = btn.parentElement.parentElement;
		
		const userRoleField = cardUser.querySelector(".content-data").querySelector(".user__role");
		userRoleField.classList.add("no-show");
		
		const changeRoleContainer = cardUser.querySelector(".content-data").querySelector(".change-role__container");
		changeRoleContainer.classList.remove("no-show");
		
		const actionsContainer = cardUser.parentElement.querySelectorAll(".content-actions");
		actionsContainer.forEach(content => content.classList.toggle("no-show"));
		
		const changeField = changeRoleContainer.querySelector(".change");
		const role = userRoleField.getAttribute("data-role");
		changeField.setAttribute("data-role", role);

		const roleIndex = roles.findIndex(r => r === role);
		changeField.innerHTML = roles[roleIndex]
	}))
}
if(btnsCancel && btnsCancel.length > 0){
	btnsCancel.forEach(btn => btn.addEventListener("click", (evt) => {
		evt.preventDefault();
		const cardUser = btn.parentElement.parentElement;
		
		const userRoleField = cardUser.querySelector(".content-data").querySelector(".user__role");
		userRoleField.classList.remove("no-show");
		
		const changeRoleContainer = cardUser.querySelector(".content-data").querySelector(".change-role__container");
		changeRoleContainer.classList.add("no-show");
		
		const actionsContainer = cardUser.parentElement.querySelectorAll(".content-actions");
		actionsContainer.forEach(content => content.classList.toggle("no-show"));
	}))
}
if(btnsChangeBackRole && btnsChangeBackRole.length > 0){
	btnsChangeBackRole.forEach(btn => btn.addEventListener("click", (evt) => {
		evt.preventDefault();
		const cardUser = btn.parentElement;
		const change = cardUser.querySelector(".change");
		const roleValue = change.getAttribute("data-role");
		role = roles.findIndex(role => role === roleValue);
		role = role > 0 ? role-1 : 2;
		change.innerHTML = roles[role];
		change.setAttribute("data-role", roles[role]);
	}));
}
if(btnsChangeNextRole && btnsChangeNextRole.length > 0){
	btnsChangeNextRole.forEach(btn => btn.addEventListener("click", (evt) => {
		evt.preventDefault();
		const cardUser = btn.parentElement;
		const change = cardUser.querySelector(".change");
		const roleValue = change.getAttribute("data-role");
		role = roles.findIndex(role => role === roleValue);
		role = role < 2 ? role+1 : 0;
		change.innerHTML = roles[role];
		change.setAttribute("data-role", roles[role]);
	}));
}