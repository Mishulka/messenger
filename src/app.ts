import Handlebars from "handlebars";
import * as Pages from "./pages";
import Block from "./core/block";

// import user1 from './assets/vite.svg';
// import noAvatar from './assets/images/NoAvatar.png';

// const usersData = [
//     {userName: 'Vite', userAvatar: user1},
//     {userName: 'Anonim', noAvatar: noAvatar }
// ];

// const currentUser = {
//     userName: 'Current User',
//     userAvatar: user1
// };


//pages contexts
const pages: Record<string, [Block | string,any]> = {
    'Login': [Pages.loginPage, {} ], 
    'Signin': [Pages.signInPage, {}],
    // 'SelectChat': [ 
    //     Pages.SelectChat, {
    //     users: usersData,
    //     currentUser: currentUser
    //  }], 
    // '505': [Pages.ServerError, {}], 
    // 'NewAvatar': [Pages.NewAvatar, {}], 
    // 'Profile': [Pages.Profile, { user: currentUser }], 
    // 'EditProfile': [Pages.EditProfile, { user: currentUser }], 
    // 'EditPassword': [Pages.EditPassword, { user: currentUser }], 
    // 'Signin': [Pages.Signin, {}], 
    // 'AllBlocks': [Pages.AllBlocks, { users: usersData }],
    // 'NotFound': [Pages.NotFound, {}]
};

export default class App {
    private state: { currentPage: string };
    // @ts-ignore
    // appElement is used in constructor, but ts-check does not see it
    private appElement: HTMLElement | null;

    constructor() {
        this.state = {
            currentPage: 'Login'
        }
        this.appElement = document.getElementById('app');
    }
    
    page() {
        const pageName = this.state.currentPage;
        this.renderPage(pageName);
    }
    
    render() {
        this.page();
        this.attachEventListeners();
    }

    renderPage(page: string) {
        const [ source, context ] = pages[page];
        const container = document.getElementById('app');
        
        //const template = Handlebars.compile(source);
        if (!container) {
            throw new Error('Container not found');
        }
        if(typeof source === 'string') {
            const template = Handlebars.compile(source);
            container.innerHTML = template(context);
        } else if (source instanceof Block) {
            container.innerHTML = '';
            container.appendChild(source.getContent() as HTMLElement);
            source.dispatchComponentDidMount();
        }
    }
    

    attachEventListeners() {     
        const allButtons = document.querySelectorAll('button');
        const allLinks = document.querySelectorAll('a');
        allButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                console.log("button click")
                const pageName = button.dataset.page;

                if (pageName) {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    this.state.currentPage = pageName; 
                    this.render(); 
                }
            });
        });
        allLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                const pageName = link.dataset.page;
                if (pageName) {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    this.state.currentPage = pageName; 
                    this.render(); 
                }
            });
        });
    }

    setPage(newState: Partial<{currentPage: string}> ) {
        this.state = { ...this.state, ...newState };
        this.render();
    }
   
}
