//libs
import Handlebars from "handlebars";
import * as Pages from "./pages";

//import components
import Dropdown from './partials/dropdown/Dropdown';
import Field from './partials/field/Field';
import Input from './partials/input/Input';
import SearchInput from './partials/searchInput/SearchInput';
import SettingField from './partials/settingField/SettingField';
import button from './partials/button/button';


//register components
Handlebars.registerPartial('Button', button);
Handlebars.registerPartial('Dropdown', Dropdown);
Handlebars.registerPartial('Field', Field);
Handlebars.registerPartial('Input', Input);
Handlebars.registerPartial('SearchInput', SearchInput);
Handlebars.registerPartial('SettingField', SettingField);


export default class App {
    
    constructor() {
        this.state = {
            currentPage: 'AllBlocks'
        }
        this.appElement = document.getElementById('app');
    };
    
    render() {
        switch (this.state.currentPage) {
            case "AllBlocks":
                this.renderPage(Pages.AllComponentsPage);
                break;
            case "505":
                this.renderPage(Pages.ServerError);
                break;
            case "Login":
                this.renderPage(Pages.Login);
                break;
            case "NewAvatar":
                this.renderPage(Pages.NewAvatar);
                break;
            case "Profile":
                this.renderPage(Pages.Profile);
                break;
            case "Signin":
                this.renderPage(Pages.Signin);
                break;
            default:
                this.renderPage(Pages.NotFound);
        }
        this.attachEventListeners();
    }

    renderPage(page) {
        const template = Handlebars.compile(page);
        this.appElement.innerHTML = template();
    }

    attachEventListeners() {
        //example event:
        // const PressedButton = document.getElementById('btn-test');
        // if(PressedButton) {
        //     PressedButton.addEventListener('click', () => {
        //         console.log("log about press this button")
        //         this.setState({ currentPage: 'PageAfterPressingThisButton' });
        //     })
        // }

    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.render();
    }
   
}
