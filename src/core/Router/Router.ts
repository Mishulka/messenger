import Block from "../Block/block";
import Route from "./Route";

export class Router {
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

    use(pathname: string, block: Block | (() => Block | null)): this {
        const blockFactory = typeof block === 'function'
            ? () => {
                const result = (block as () => Block | null)();
                if (result === null) {
                    throw new Error('Block factory returned null');
                }
                return result;
            }
            : () => {
                if (block === null) {
                    throw new Error('Block is null');
                }
                return block;
            };

        const route = new Route(
            pathname,
            blockFactory,
            { rootQuery: this._rootQuery }
        );
        this.routes.push(route);
        return this;
    }

    start(): void {
      window.onpopstate = event => {
        if(event.currentTarget){
          this._onRoute((event.currentTarget as Window).location.pathname);
        }
    };

    this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string): void {
        const route = this.getRoute(pathname);

        if (!route) {
        const notFoundRoute = this.getRoute('/404');
        if (notFoundRoute) {
            console.log('ERR: Route not found for pathname:', pathname);
            this._onRoute('/404');
        }
        return;
      }

        if (this._currentRoute  && this._currentRoute !== route) {
            console.log('Leaving route:', this._currentRoute);
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
    }

    go(pathname: string): void {
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

export default router;
