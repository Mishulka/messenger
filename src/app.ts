import Handlebars from "handlebars";
import * as Pages from "./pages";
import Block, { TProps } from "./core/block";
import "./routes";


import user1 from './assets/vite.svg';
//import noAvatar from './assets/images/NoAvatar.png';

//const usersData = [
//     {userName: 'Vite', userAvatar: user1},
//     {userName: 'Anonim', noAvatar: noAvatar }
// ];

const currentUser = {
    userName: 'Current User',
    userAvatar: user1
};


//pages contexts
const pages: Record<string, [Block, TProps]> = {
    'Login': [Pages.loginPage, {} ],
    'Signin': [Pages.signInPage, {}],
    'SelectChat': [ Pages.selectChatPage, {} ],
    'Profile': [ Pages.profilePage, {user: currentUser} ],
    'EditProfile': [ Pages.editProfilePage, {user: currentUser} ],
    'EditPassword': [ Pages.editPasswordPage, {user: currentUser} ],
    'NewAvatar': [ Pages.newAvatarPage, {user: currentUser} ],
    '404': [ Pages.notFoundPage, {} ],
    '505': [ Pages.serverErrorPage, {} ],
};

export default class App {
    private state: { currentPage: string };
    // @ts-expect-error: appElement is used in constructor, but ts-check does not see it
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
