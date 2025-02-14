//libs
import Handlebars from "handlebars";
import * as Pages from "./pages";

//import components
import button from './partials/button/button';
import { testData } from "./mockData.js";

//register components
Handlebars.registerPartial('Button', button);


export default class App {
    constructor() {
        this.state = {
            currentPage: 'ExampPage'
        }
        this.appElement = document.getElementById('app');
    };

    render() {
        // let template;
        // template = Handlebars.compile(Pages.MessagePage);
        // this.appElement.innerHTML = template({});
        if(this.state.currentPage === "ExampPage") {
            let template;
            template = Handlebars.compile(Pages.AllComponentsPage);    
            this.appElement.innerHTML = template({
                currentPage: this.state.currentPage,
                users: testData});
        }
        this.attachEventListeners();
    }
    attachEventListeners() {
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