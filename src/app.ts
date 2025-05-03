import Handlebars from "handlebars";
import * as Pages from "./pages";
import Block from "./block";


import Dropdown from './partials/dropdown/Dropdown';
import Field from './partials/field/Field';
import Input from './partials/input/Input';
import SearchInput from './partials/searchInput/SearchInput';
import SettingField from './partials/settingField/SettingField';
//import { template as button } from './partials/button/button';
import Link from './partials/link/Link';
import userCard from './partials/userCard/userCard';

//import { buttonHTML } from './partials/button/index';

import { BlockPage } from './pages/BlockPage/BlockPage';
import { ButtonBlock } from './partials/button/Component';

const button = new ButtonBlock({ text: 'Click me' });

//Handlebars.registerPartial('Button', button);
Handlebars.registerPartial('Dropdown', Dropdown);
Handlebars.registerPartial('Field', Field);
Handlebars.registerPartial('Input', Input);
Handlebars.registerPartial('SearchInput', SearchInput);
Handlebars.registerPartial('SettingField', SettingField);
Handlebars.registerPartial('Link', Link);
Handlebars.registerPartial('UserCard', userCard);



import user1 from './assets/vite.svg';
import noAvatar from './assets/images/NoAvatar.png';

const usersData = [
    {userName: 'Vite', userAvatar: user1},
    {userName: 'Anonim', noAvatar: noAvatar }
];

const currentUser = {
    userName: 'Current User',
    userAvatar: user1
};


//pages contexts
const pages: Record<string, [Block | string,any]> = {
    'Login': [ Pages.Login, {} ], 
    'SelectChat': [ 
        Pages.SelectChat, {
        users: usersData,
        currentUser: currentUser
     }], 
    '505': [Pages.ServerError, {}], 
    'NewAvatar': [Pages.NewAvatar, {}], 
    'Profile': [Pages.Profile, { user: currentUser }], 
    'EditProfile': [Pages.EditProfile, { user: currentUser }], 
    'EditPassword': [Pages.EditPassword, { user: currentUser }], 
    'Signin': [Pages.Signin, {}], 
    'AllBlocks': [Pages.AllBlocks, { users: usersData }],
    'NotFound': [Pages.NotFound, {}] ,
    'BlockPage': [new BlockPage({ userName: 'John Doe', button }), {}]
};

export default class App {
    private state: { currentPage: string };
    // @ts-ignore
    // appElement is used in constructor, but ts-check does not see it
    private appElement: HTMLElement | null;

    constructor() {
        this.state = {
            currentPage: 'BlockPage'
        }
        this.appElement = document.getElementById('app');
    };
    
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
        console.log('Rendered page:', page, 'with context:', context);
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
