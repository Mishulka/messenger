"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var handlebars_js_1 = require("handlebars/dist/handlebars.js");
var Pages = require("./pages");
var Dropdown_1 = require("./partials/dropdown/Dropdown");
var Field_1 = require("./partials/field/Field");
var Input_1 = require("./partials/input/Input");
var SearchInput_1 = require("./partials/searchInput/SearchInput");
var SettingField_1 = require("./partials/settingField/SettingField");
var button_1 = require("./partials/button/button");
var Link_1 = require("./partials/link/Link");
var userCard_1 = require("./partials/userCard/userCard");
handlebars_js_1.default.registerPartial('Button', button_1.default);
handlebars_js_1.default.registerPartial('Dropdown', Dropdown_1.default);
handlebars_js_1.default.registerPartial('Field', Field_1.default);
handlebars_js_1.default.registerPartial('Input', Input_1.default);
handlebars_js_1.default.registerPartial('SearchInput', SearchInput_1.default);
handlebars_js_1.default.registerPartial('SettingField', SettingField_1.default);
handlebars_js_1.default.registerPartial('Link', Link_1.default);
handlebars_js_1.default.registerPartial('UserCard', userCard_1.default);
var user1 = require('./assets/vite.svg');
var noAvatar = require('./assets/images/NoAvatar.png');
var usersData = [
    { userName: 'Vite', userAvatar: user1 },
    { userName: 'Anonim', noAvatar: noAvatar }
];
var currentUser = {
    userName: 'Current User',
    userAvatar: user1
};
//pages contexts
var pages = {
    'Login': [Pages.Login, {}],
    'SelectChat': [
        Pages.SelectChat, {
            users: usersData,
            currentUser: currentUser
        }
    ],
    '505': [Pages.ServerError, {}],
    'NewAvatar': [Pages.NewAvatar, {}],
    'Profile': [Pages.Profile, { user: currentUser }],
    'EditProfile': [Pages.EditProfile, { user: currentUser }],
    'EditPassword': [Pages.EditPassword, { user: currentUser }],
    'Signin': [Pages.Signin, {}],
    'AllBlocks': [Pages.AllBlocks, { users: usersData }],
    'NotFound': [Pages.NotFound, {}]
};
var App = /** @class */ (function () {
    function App() {
        this.state = {
            currentPage: 'Login'
        };
        this.appElement = document.getElementById('app');
    }
    ;
    App.prototype.page = function () {
        var pageName = this.state.currentPage;
        this.renderPage(pageName);
    };
    App.prototype.render = function () {
        this.page();
        this.attachEventListeners();
    };
    App.prototype.renderPage = function (page) {
        var _a = pages[page], source = _a[0], context = _a[1];
        var container = document.getElementById('app');
        var temlpate = handlebars_js_1.default.compile(source);
        container.innerHTML = temlpate(context);
        console.log('AllBlocks context:', context);
    };
    App.prototype.attachEventListeners = function () {
        var _this = this;
        var allButtons = document.querySelectorAll('button');
        var allLinks = document.querySelectorAll('a');
        allButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                console.log("button click");
                var pageName = button.dataset.page;
                if (pageName) {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    _this.state.currentPage = pageName;
                    _this.render();
                }
            });
        });
        allLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                var pageName = link.dataset.page;
                if (pageName) {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    _this.state.currentPage = pageName;
                    _this.render();
                }
            });
        });
    };
    App.prototype.setPage = function (newState) {
        this.state = __assign(__assign({}, this.state), newState);
        this.render();
    };
    return App;
}());
exports.default = App;
