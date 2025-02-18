
import Handlebars from "handlebars";
import * as Pages from "./pages";


import Dropdown from './partials/dropdown/Dropdown';
import Field from './partials/field/Field';
import Input from './partials/input/Input';
import SearchInput from './partials/searchInput/SearchInput';
import SettingField from './partials/settingField/SettingField';
import button from './partials/button/button';
import Link from './partials/link/Link';
import userCard from './partials/userCard/userCard';



Handlebars.registerPartial('Button', button);
Handlebars.registerPartial('Dropdown', Dropdown);
Handlebars.registerPartial('Field', Field);
Handlebars.registerPartial('Input', Input);
Handlebars.registerPartial('SearchInput', SearchInput);
Handlebars.registerPartial('SettingField', SettingField);
Handlebars.registerPartial('Link', Link);
Handlebars.registerPartial('UserCard', userCard);


//users's data
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
const pages = {
    'Login': [ Pages.Login, {} ], 
    'SelectChat': [ 
        Pages.SelectChat, {
        users: usersData,
        currentUser: currentUser
     }], 
    '505': [Pages.ServerError, {}], 
    'NewAvatar': [Pages.NewAvatar, {}], 
    'Profile': [Pages.Profile, { user: currentUser }], 
    'Signin': [Pages.Signin, {}], 
    'AllBlocks': [Pages.AllBlocks, { users: usersData }],
    'NotFound': [Pages.NotFound, {}] 
};

export default class App {
    constructor() {
        this.state = {
            currentPage: 'Profile'
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

    renderPage(page) {
        const [ source, context ] = pages[page];
        const container = document.getElementById('app');
        
        const temlpate = Handlebars.compile(source);
        container.innerHTML = temlpate(context);
        console.log('AllBlocks context:', context);
    }
    

    attachEventListeners() {     
        const allButtons = document.querySelectorAll('button');
        const allLinks = document.querySelectorAll('a');
        allButtons.forEach(button => {
            button.addEventListener('click', () => {
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
            link.addEventListener('click', () => {
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

    setPage(newState) {
        this.state = { ...this.state, ...newState };
        this.render();
    }
   
}
