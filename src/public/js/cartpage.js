const btnsCountAdd = document.querySelectorAll(".btn-count.add");
if(btnsCountAdd && btnsCountAdd.length > 0){
	btnsCountAdd.forEach(btn => btn.addEventListener("click", async (evt) => {
		evt.preventDefault();
		const pid = btn.parentElement.getAttribute("data-pid");
		const quantity = btn.parentElement.getAttribute("data-quantity");
		if(quantity < 10){
			const response = await fetch('/api/carts/add', {
				method: "PUT",
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					products: [
						{
							_id: pid,
							quantity: 1
						}
					]
				})
			});
			if(response.status === 200){
				window.location = "/views/cart"
			} else{
				alert(`Response status: ${response.status}`)
			}
		} else{
			console.log("Es 10")
		}
	}));
}

const btnsCountRemove = document.querySelectorAll(".btn-count.remove");
if(btnsCountRemove && btnsCountRemove.length > 0){
	btnsCountRemove.forEach(btn => btn.addEventListener("click", async (evt) => {
		evt.preventDefault();
		const pid = btn.parentElement.getAttribute("data-pid");
		const quantity = btn.parentElement.getAttribute("data-quantity");
		if(quantity > 1){
			const response = await fetch('/api/carts/add', {
				method: "PUT",
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					products: [
						{
							_id: pid,
							quantity: -1
						}
					]
				})
			});
			if(response.status === 200){
				window.location = "/views/cart"
			} else{
				alert(`Response status: ${response.status}`)
			}
		} else{
			console.log("Es 1")
		}
	}));
}

const btnsRemoveToCart =document.querySelectorAll(".btn-remove-to-cart");
if(btnsRemoveToCart && btnsRemoveToCart.length > 0){
	btnsRemoveToCart.forEach(btn => btn.addEventListener("click", async(evt) => {
		evt.preventDefault();
		const pid = btn.getAttribute("data-pid");
		const response = await fetch('/api/carts/delete-products', {
			method: "PUT",
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				products: [pid]
			})
		});
		if(response.status === 200){
			window.location = '/views/cart'
		} else{
			alert(`Response status: ${response.status}`)
		}
	}))
}

const btnPurchase = document.querySelector("#btn-purchase");
if(btnPurchase){
	btnPurchase.addEventListener("click", async(evt)=> {
		evt.preventDefault();
		const response = await fetch('/api/carts/purchase', {
			method: "POST",
			headers: {'Content-Type': 'application/json'},
		})

		switch(response.status){
			case 200:
				alert("Tu compra ha sido registrada exitosamente.");
				window.location = '/views/';
				break;
			default:
				alert("Ha ocurrido un error en el proceso de compra.");
				break;
		}
	});
}