
import Handlebars from "handlebars";
import * as Pages from "./pages";


import Dropdown from './partials/dropdown/Dropdown';
import Field from './partials/field/Field';
import Input from './partials/input/Input';
import SearchInput from './partials/searchInput/SearchInput';
import SettingField from './partials/settingField/SettingField';
import button from './partials/button/button';
import Link from './partials/link/Link';



Handlebars.registerPartial('Button', button);
Handlebars.registerPartial('Dropdown', Dropdown);
Handlebars.registerPartial('Field', Field);
Handlebars.registerPartial('Input', Input);
Handlebars.registerPartial('SearchInput', SearchInput);
Handlebars.registerPartial('SettingField', SettingField);
Handlebars.registerPartial('Link', Link);
const pages = {
    'Login': [ Pages.Login, {} ], 
    '505': [Pages.ServerError, {}], 
    'NewAvatar': [Pages.NewAvatar, {}], 
    'Profile': [Pages.Profile, {}], 
    'Signin': [Pages.Signin, {}], 
    'AllBlocks': [Pages.AllComponentsPage, {}], 
    'NotFound': [Pages.NotFound, {}] 
};

export default class App {
    constructor() {
        this.state = {
            currentPage: 'Login'
        }
        this.appElement = document.getElementById('app');
    };
    
    render() {
        switch (this.state.currentPage) {
            case "Login":
                this.renderPage('Login');
                break;
            case "505":
                this.renderPage('505'); 
                break;
            case "NewAvatar":
                this.renderPage('NewAvatar'); 
                break;
            case "Profile":
                this.renderPage('Profile'); 
                break;
            case "Signin":
                this.renderPage('Signin'); 
                break;
            case "AllBlocks":
                this.renderPage('AllBlocks'); 
                break;
            default:
                this.renderPage('NotFound'); 
        }
        this.attachEventListeners();
    }

    renderPage(page) {
        const [ source, context ] = pages[page];
        const container = document.getElementById('app');

        const temlpatingFunction = Handlebars.compile(source);
        console.log('html', temlpatingFunction(context))
        container.innerHTML = temlpatingFunction(context);
}
    

    attachEventListeners() {     
        const allButtons = document.querySelectorAll('button');
        const allLinks = document.querySelectorAll('a');
        allButtons.forEach(button => {
            button.addEventListener('click', () => {
                const pageName = link.dataset.page;
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
