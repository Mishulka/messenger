import router from "./core/Router";
import * as Pages from "./pages";
import Store from "./core/Store";
import Block from "./core/block";


function protectRoute(page: Block | null) {
  return () => {
    const user = Store.getState().user;
    if (!user) {
      router.go('/');
      return new Block('div', { class: 'empty-protected' });
    }
    return page;
  };
}

router
  .use('/', Pages.loginPage)
  .use('/signup', Pages.signUpPage)
  .use('/messenger', protectRoute(Pages.selectChatPage))
  .use('/settings', protectRoute(Pages.profilePage))
  .use('/edit-profile', protectRoute(Pages.editProfilePage))
  .use('/edit-password', protectRoute(Pages.editPasswordPage))
  .use('/new-avatar', protectRoute(Pages.newAvatarPage))
  .use('/404', Pages.notFoundPage)
  .use('/505', Pages.serverErrorPage);

