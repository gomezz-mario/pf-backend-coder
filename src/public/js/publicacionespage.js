const btnsDelete = document.querySelectorAll(".btn-delete");

if(btnsDelete && btnsDelete.length > 0){
	btnsDelete.forEach(btn => btn.addEventListener("click", async(evt) => {
		evt.preventDefault();
		const id = btn.getAttribute("data-id");
		const response = await fetch(`/api/products/${id}`, {
			method: "DELETE",
			headers: {'Content-Type': 'application/json'},
		});
		if(response.status === 200){
			window.location = '/views/my-products'
		} else{
			alert("Algo salio mal")
		}
	}))
}