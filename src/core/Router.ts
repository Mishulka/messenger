import Block from "./block";
import Route from "./Route";

class Router {
    static __instance: Router; 
    private routes!: Route[];
    private history!: History;
    private _currentRoute!: Route | null;
    private _rootQuery!: string;

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes! = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname: string, block: Block): this {
        const route = new Route(pathname, () => block, {rootQuery: this._rootQuery});
        this.routes.push(route);
        return this;
    }

    start(): void {
      window.onpopstate = event => {
        if(event.currentTarget){
          this._onRoute((event.currentTarget as Window).location.pathname);
          console.log("CURRENT ROUTE: ",this._currentRoute)
        }
    };

    this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string): void {
      console.log('onRoute', pathname);
        const route = this.getRoute(pathname);

        if(!route) {
          console.log('ERR: Route not found for pathname:', pathname);
          return;
        }

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        console.log('currentRoute', this._currentRoute);
        route.render();
    }

    go(pathname: string): void {
      console.log('go', pathname);
      this.history.pushState({}, "", pathname)
      this._onRoute(pathname);
    }

    back(): void {
      history.back()
    }

    forward(): void {
      history.forward()
    }

    getRoute(pathname: string): Route | undefined {
        return this.routes.find(route => route.match(pathname));
    }
}

const router = new Router('#app');
console.log('Router instance created');

export default router;