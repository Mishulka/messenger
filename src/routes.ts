import router from "./core/Router";
import * as Pages from "./pages";


//routes registration
router
//   .use('/', Pages.loginPage as unknown as typeof Block)
//   .use('/signin', Pages.signInPage as unknown as typeof Block)
//   .use('/select-chat', Pages.selectChatPage as unknown as typeof Block)
//   .use('/profile', Pages.profilePage as unknown as typeof Block)
//   .use('/edit-profile', Pages.editProfilePage as unknown as typeof Block)
//   .use('/edit-password', Pages.editPasswordPage as unknown as typeof Block)
//   .use('/new-avatar', Pages.newAvatarPage as unknown as typeof Block)
//   .use('/404', Pages.notFoundPage as unknown as typeof Block)
//   .use('/505', Pages.serverErrorPage as unknown as typeof Block)
//   .start();
  .use('/', Pages.loginPage)
  .use('/signin', Pages.signInPage)
  .use('/select-chat', Pages.selectChatPage)
  .use('/profile', Pages.profilePage)
  .use('/edit-profile', Pages.editProfilePage)
  .use('/edit-password', Pages.editPasswordPage)
  .use('/new-avatar', Pages.newAvatarPage)
  .use('/404', Pages.notFoundPage)
  .use('/505', Pages.serverErrorPage)
  .start();