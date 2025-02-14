import Handlebars from "handlebars";

import * as Pages from "./pages";

import examp from './partials/examp';

Handlebars.registerPartial('examp', examp);





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
            template = Handlebars.compile(Pages.ExamplePage);    
            this.appElement.innerHTML = template({currentPage: this.state.currentPage});
        }
     
   
        

        //this.attachEventListeners();
    }
   
}