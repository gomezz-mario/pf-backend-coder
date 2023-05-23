import { CartService } from "../services/carts.service.js";
import { ProductService} from "../services/products.service.js";

export const renderProductsGallery = async(request, response) => {
	let { products, pagination } = request.body.result;
	const { page, limit, filters, sort, totalPages } = pagination;

	const category = filters.category;
	
	const paymentMethod = filters.paymentMethod;
	pagination.linkPrevPage = page > 1 ? urlBuilder(page - 1, limit, filters, sort) : null;
	pagination.linkNextPage = page < totalPages ? urlBuilder(page, limit, filters, sort) : null;
	pagination.pages = pagesPagination(page, totalPages).map(p => ({
		numberPage: p,
		link: urlBuilder(p, limit, filters, sort),
		selected: page === p
	}));

	products = products.map(product => {
		switch(product.cuotas){
			case 3:
				product.paymentMethod = "tres_cuotas_sin_interes";
				break;
			case 6:
				product.paymentMethod = "seis_cuotas_sin_interes";
				break;
			case 12:
				product.paymentMethod = "doce_cuotas_sin_interes";
				break;
			case 24:
				product.paymentMethod = "ahora_24";
				break;
		}
		product.llega_maniana = true;
		product.retiralo_ya = true;
		product.shipping = "envio_gratis"
		return product;
	});

	const user = request.session.user;
	response.render('CategoryPage', {
		title: category ? "My Ecommerce - " + (category[0].toUpperCase() + category.substring(1)).split("_").join(" ") : "My Ecommerce - Categorías",
		styles: ["style.css","header.css","categorypage.css", "product.css"],
		scripts: ["header.js","index.js"],
		user,
		admin: user && user.role === "admin",
		premium: user && (user.role === "premium" || user.role === "admin"),
		pagination,
		products,
		menu: {
			categorySelected: category? (category[0].toUpperCase() + category.substring(1)).split("_").join(" ") : "",
			searchOptions: [
				{
					title: "Ordenar por",
					optionSelected: sort ? (sort[0].toUpperCase() + sort.substring(1)).split("_").join(" ") : "",
					options: [
						{
							description: "Mas relevantes",
							circleType: true,
							selected: sort === "mas_relevantes",
							link: sort !== "mas_relevantes" ? urlBuilder(page, limit, filters, "mas_relevantes") : urlBuilder(page, limit, filters, null)
						},
						{
							description: "Mayor precio",
							circleType: true,
							selected: sort === "mayor_precio",
							link: sort !== "mayor_precio" ? urlBuilder(page, limit, filters, "mayor_precio") : urlBuilder(page, limit, filters, null)
						},
						{
							description: "Menor precio",
							circleType: true,
							selected: sort === "menor_precio",
							link: sort !== "menor_precio" ? urlBuilder(page, limit, filters, "menor_precio") : urlBuilder(page, limit, filters, null)
						},
						{
							description: "Mayor descuento",
							circleType: true,
							selected: sort === "mayor_descuento",
							link: sort !== "mayor_descuento" ? urlBuilder(page, limit, filters, "mayor_descuento") : urlBuilder(page, limit, filters, null)
						},
					]

				},
				{
					title: "Métodos de pago",
					optionSelected: paymentMethod ? (paymentMethod[0].toUpperCase() + paymentMethod.substring(1)).split("_").join(" ") : "",
					options: [
						{
							description: "Tres cuotas sin interes",
							circleType: true,
							selected: paymentMethod === "tres_cuotas_sin_interes",
							link: paymentMethod !== "tres_cuotas_sin_interes" ? urlBuilder(page, limit, {...filters, paymentMethod: "tres_cuotas_sin_interes"}, sort) : urlBuilder(page, limit, clearFilter(filters, "paymentMethod"), sort)
						},
						{
							description: "Seis cuotas sin interes",
							circleType: true,
							selected: paymentMethod === "seis_cuotas_sin_interes",
							link: paymentMethod !== "seis_cuotas_sin_interes" ? urlBuilder(page, limit, {...filters, paymentMethod: "seis_cuotas_sin_interes"}, sort) : urlBuilder(page, limit, clearFilter(filters, "paymentMethod"), sort)
						},
						{
							description: "Doce cuotas sin interes",
							circleType: true,
							selected: paymentMethod === "doce_cuotas_sin_interes",
							link: paymentMethod !== "doce_cuotas_sin_interes" ? urlBuilder(page, limit, {...filters, paymentMethod: "doce_cuotas_sin_interes"}, sort) : urlBuilder(page, limit, clearFilter(filters, "paymentMethod"), sort)
						},
						{
							description: "Ahora 24",
							circleType: true,
							selected: paymentMethod === "ahora_24",
							link: paymentMethod !== "ahora_24" ? urlBuilder(page, limit, {...filters, paymentMethod: "ahora_24"}, sort) : urlBuilder(page, limit, clearFilter(filters, "paymentMethod"), sort)
						},
					]
				},
			]
		}
	});
}
export const renderProductDetails = async(request, response) => {
	const product = request.body.result;
	const user = request.session.user;
	response.render('ProductDetails', {
		title: "Detalle de producto",
		styles: ["style.css","header.css","productdetailspage.css","product.css"],
		scripts: ["header.js", "productdetailpage.js"],
		product,
		user,
		admin: user && user.role === "admin",
		premium: user && (user.role === "premium" || user.role === "admin"),
	});
}
export const renderHome = async(request, response) => {
	const user = request.session.user;
	response.render('HomePage', {
		styles: ["style.css", "header.css", "homepage.css"],
		scripts: ["header.js"],
		user,
		admin: user && user.role === "admin",
		premium: user && (user.role === "premium" || user.role === "admin"),
		categories: [
			{
				title: "Notebooks",
				image: "https://http2.mlstatic.com/D_NQ_NP_745797-MLA69340654813_052023-O.webp",
				link: "/views/categories/?category=notebooks"
			},
			{
				title: "Celulares",
				image: "https://http2.mlstatic.com/D_NQ_NP_885487-MLA52731088598_122022-O.webp",
				link: "/views/categories/?category=celulares"
			},
			{
				title: "Tablets",
				image: "https://http2.mlstatic.com/D_NQ_NP_870191-MLA51468993998_092022-O.webp",
				link: "/views/categories/?category=tablets"
			},
			{
				title: "Parlantes",
				image: "https://http2.mlstatic.com/D_NQ_NP_890096-MLA69414222576_052023-O.webp",
				link: "/views/categories/?category=parlantes"
			},
			{
				title: "Auriculares",
				image: "https://http2.mlstatic.com/D_NQ_NP_900109-MLA50636252333_072022-O.webp",
				link: "/views/categories/?category=auriculares"
			},
			{
				title: "Accesorios",
				image: "https://http2.mlstatic.com/D_NQ_NP_878309-MLA40733131990_022020-O.webp",
				link: "/views/categories/?category=accesorios"
			},
		],
	})
}
export const renderCart = async(request, response) => {
	const user = request.session.user;
	let cart = null;
	if(user.cart){
		cart = await CartService.getCart(user.cart);
		const products = await Promise.all(cart.products.map(async product => {
			const productData = await ProductService.getProductById(product._id);
			return {
				_id: product._id,
				quantity: product.quantity,
				...productData
			}
		}));

		let total = products.reduce((acum, product) => acum = acum + product.quantity*product.price, 0) + 2000;
		
		cart = {
			_id: cart._id,
			products,
			total_envio: 2000,
			total
		}
	}

	response.render('CartPage', {
		styles: ["style.css", "header.css"],
		scripts: ["header.js", "cartpage.js"],
		user,
		admin: user && user.role === "admin",
		premium: user && (user.role === "premium" || user.role === "admin"),
		cart
	});
}
export const renderLogin = async(request, response) => {
	response.render('LoginPage', {
		styles: ["style.css", "forms.css"],
		scripts: ["loginpage.js"],
	});
}
export const renderRegister = async(request, response) => {
	response.render('RegisterPage', {
		styles: ["style.css", "forms.css"],
		scripts: ["registerpage.js"],
	});
}
export const renderRecovery = async(request, response) => {
	response.render('RecoveryAccPage', {
		styles: ["style.css", "forms.css"],
		scripts: ["recoveryaccountpage.js"],
	});
}
export const renderPublicaciones = async(request, response) => {
	const user = request.session.user;
	const myproducts = await ProductService.getProductsByOwner(user._id);
	
	response.render('PublicacionesPage', {
		styles: ["style.css", "header.css"],
		scripts: ["header.js","publicacionespage.js"],
		user,
		admin: user && user.role === "admin",
		premium: user && (user.role === "premium" || user.role === "admin"),
		myproducts
	})
}
export const renderNewProductPage = async(request, response) => {
	const user = request.session.user;
	response.render('NewProductPage', {
		styles: ["style.css", "header.css", "forms.css"],
		scripts: ["header.js", "form-product.js"],
		user,
		admin: user && user.role === "admin",
		premium: user && (user.role === "premium" || user.role === "admin"),
	})
}
export const renderEditProductPage = async(request, response) => {
	const user = request.session.user;
	const pid = request.params.pid;
	const product = await ProductService.getProductById(pid);
	response.render('EditProductPage', {
		styles: ["style.css", "header.css", "forms.css"],
		scripts: ["header.js", "updateproductform.js"],
		user,
		admin: user && user.role === "admin",
		premium: user && (user.role === "premium" || user.role === "admin"),
		product
	})
}
export const renderAdminPage = async(request, response) => {
	const user = request.session.user;
	const allUsers = request.body.allUsers;//TODOS LOS USUARIOS QUE NO SEAN ADMINS ?
	console.log(allUsers)
	response.render('AdminPage', {
		styles: ["style.css", "header.css"],
		scripts: ["header.js","adminpage.js"],
		user,
		admin: user && user.role === "admin",
		premium: user && (user.role === "premium" || user.role === "admin"),
		allUsers
	})
}


















const clearFilter = (filters, thisFilter) => {
	return Object.entries(filters).filter(f => f[0] !== thisFilter).reduce((acum, current) => {
		acum[current[0]] = current[1];
		return acum
	}, {});
}

const urlBuilder = (page, limit, filters, sort) => {
	let search = Object.entries(filters).reduce((acum, current) => acum + `&${current[0]}=${current[1]}`, "");
	return `/views/categories?page=${page}&limit=${limit}${search}${sort?`&sort=${sort}`:""}`
};

const pagesPagination = (page, totalPages) => {
	const pages = [];
	const limits = [];
	const limitPages = totalPages < 5 ? totalPages : 5;
	if(limitPages < 5){
		limits[0] = 1;
		limits[1] = limitPages;
	} else{
		let prevs = page - 1;
		let nexts = totalPages - page;
		if(prevs >= 2 && nexts >= 2){
			limits[0] = page - 2;
			limits[1] = page + 2;
		} else{
			if(prevs < 2){
				limits[0] = page - prevs;
				limits[1] = page + 4 - prevs;
			} else{
				limits[0] = page - 4 + nexts;
				limits[1] = page + nexts;
			}
		}
	}
	for(let i = limits[0]; i<limits[1]+1; i++){
		pages.push(i);
	}
	return pages;
}