const iconArrow = document.querySelector("#icon-arrow");
const menu = document.querySelector(".profile__menu");
let down = true;
iconArrow.addEventListener("click", (evt) => {
	evt.preventDefault();
	if(down){
		iconArrow.classList.replace("bi-chevron-down", "bi-chevron-up");
	} else{
		iconArrow.classList.replace("bi-chevron-up", "bi-chevron-down");
	}
	menu.classList.toggle("no-show");
	down = !down;
})
