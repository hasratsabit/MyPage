import $ from "jquery";

const PageMenuIcon = (function() {

		const PageIcon = '.menu-icon';
		const SideNav = '.nav__side-nav';
		const TopNav = '.nav__top-nav';
		const SmallNav = '.nav__sm-nav';
		const MainContent = '.main';
		const UserBox = '.nav__user-box'


		$(PageIcon).on('click', function() {

			// 1. Close SideNav
			$(SideNav).toggleClass('nav__side-nav--is-closed');
			// 2. Change TopNav width to 100%.
			$(TopNav).toggleClass('nav__top-nav--is-expanded');
			// 3. Change Main Content width to 100%;
			$(MainContent).toggleClass('main--is-expanded');
			// 4. Open Small Nav When SideNav is Closed
			$(SmallNav).toggleClass('nav__sm-nav--is-open');
			//5. Clsoe User Info Box
			$(UserBox).toggleClass('nav__user-box--is-closed');
			// 6. Toggle Menu Icon in Smaller Device
			$(PageIcon).toggleClass('menu-icon--close-x ');
		});

}());
