window.onload = function(){

	document.querySelectorAll('.btn-collapse-down-module').forEach(btnModuleCollapse => {
		btnModuleCollapse.addEventListener('click', () => {
			btnModuleCollapse.parentElement.querySelector('.collapse-down-module__content').classList.toggle('collapse');
		});
	});
	document.querySelectorAll('.btn-open-menu').forEach(btnOpenMenu => {
		btnOpenMenu.addEventListener('click', () => {
			btnOpenMenu.classList.toggle('collapse');
			btnOpenMenu.parentElement.querySelector('.btn-back-to-collapse-menu').classList.toggle('collapse');
			btnOpenMenu.parentElement.querySelector('.collapse-menu__content').classList.toggle('collapse');
		});
	});
	document.querySelectorAll('.btn-back-to-collapse-menu').forEach(btnBackToCollapseMenu => {
		btnBackToCollapseMenu.addEventListener('click', () => {
			btnBackToCollapseMenu.classList.toggle('collapse');
			btnBackToCollapseMenu.parentElement.querySelector('.btn-open-menu').classList.toggle('collapse');
			btnBackToCollapseMenu.parentElement.querySelector('.collapse-menu__content').classList.toggle('collapse');
		});
	});
}
