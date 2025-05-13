import Block from "./block";

function isEqual(lhs: string, rhs: string): boolean {
  return lhs === rhs;
}

function render(query: string, block: Block): Element | null {
  const root = document.querySelector(query);
  if(root){
    root.textContent = block.getContent().toString();
  }
  return root;
}

class Route {
    private _pathname: string;
    private _blockClass: typeof Block;
    private _block!: Block | null;
    private _props: { rootQuery: string };

    constructor(pathname: string, view: typeof Block, props: { rootQuery: string }) {
        this._pathname = pathname;
        this._blockClass = view;
        //this._block = null;
        this._props = props;
    }

    navigate(pathname: string): void {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave(): void {
      if (this._block) {
        this._block.hide();
      }
    }
    
    match(pathname: string): boolean {
        return isEqual(pathname, this._pathname);
    }

    render(): void {
      if(!this._block) {
        this._block = new this._blockClass();
        
        if(this._block) {
          render(this._props.rootQuery, this._block);
        }
        return;
      }

      
      this._block.show();
    }
}

export default Route;