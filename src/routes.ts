import router from "./core/Router";
import * as Pages from "./pages";

router
  .use('/login', Pages.loginPage)
  .use('/signup', Pages.signUpPage)
  .use('/select-chat', Pages.selectChatPage)
  .use('/profile', Pages.profilePage)
  .use('/edit-profile', Pages.editProfilePage)
  .use('/edit-password', Pages.editPasswordPage)
  .use('/new-avatar', Pages.newAvatarPage)
  .use('/404', Pages.notFoundPage)
  .use('/505', Pages.serverErrorPage);
