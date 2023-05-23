const btnAddProduct = document.getElementById("btn-publicar");
const form = document.querySelector("#form-product");
if(btnAddProduct){
	btnAddProduct.addEventListener("click",async (evt) => {
		evt.preventDefault();
		const productData = {	
			title: form["title"].value,
			description: form["description"].value,
			category: form["category"].value,
			price: parseFloat(form["price"].value)||0,
			discount_percent: parseInt(form["discount_percent"].value),
			cuotas: parseInt(form["cuotas"].value),
			thumbnails: [form["image"].value],
			stock: parseInt(form["stock"].value)||0,
		}
		if(productData.title === ""){
			return alert("Debes agregarle un título a la publicación");
		}
		if(productData.description === ""){
			return alert("Debes agregarle una descripción a la publicación");
			
		}
		if(productData.thumbnails[0] === ""){
			return alert("Debes agregarle una imagen a la publicación");
		}

		const response = await fetch('/api/products', {
			method: "POST",
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({productData})
		});

		if(response.status === 200){
			window.location = '/views/'
		} else{
			alert("Algo salió mal")
		}
	});
}