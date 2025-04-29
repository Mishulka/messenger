
import EventBus from "./core/EventBus"

export type TProps = Record<string, any>;

class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render"
  };

  private _element: HTMLElement | null = null;
  private _meta: {tagName: string; props: Record<string,any>} | null = null;
  props: Record<string, any>;
  eventBus: () => EventBus;
  private _eventBus: () => EventBus;

  constructor(tagName = "div", props = {}) {
  const eventBus = new EventBus();
  this._eventBus = () => eventBus;
  this._meta = {
    tagName,
    props
  };

  this.props = this._makePropsProxy(props);

  this.eventBus = () => eventBus;

  this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _addEvents() {
    const {events = {}} = this.props;
    if (this._element) {
      Object.keys(events).forEach(eventName => {
        this._element!.addEventListener(eventName, events[eventName]);
      });
    }
  }

  private _createResources() {
    if (!this._meta) {
      throw new Error("No meta data");
    }
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount(): void {
    this.componentDidMount();
  }

  componentDidMount() {

  }

    dispatchComponentDidMount() {
        this._eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

  private _componentDidUpdate(oldProps: TProps, newProps: TProps): void {
    
  }

  componentDidUpdate(oldProps: TProps, newProps: TProps): boolean {
    return true;
  }

  setProps = (nextProps: any) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  };

  get element(): HTMLElement | null {
    return this._element;
  }

  private _render() {
    const block = this.render();
    if (this._element) {
      this._removeEvents();
      this._element.innerHTML = block;
      this._addEvents();
    }    
} 

   
  render(): string {
    return '';
  }

  getContent() {
    return this.element;
  }

  
  private _makePropsProxy(props: TProps): TProps {
    const self = this;
    
    let proxyProps = new Proxy(props, {
      get(target, prop: string){
        return target[prop as keyof TProps];
      },
      set(target, prop: string, value){
        target[prop as keyof TProps] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        return true;
      }

    });
        
    return proxyProps;
  }

  private _createDocumentElement(tagName: string): HTMLElement {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  private _removeEvents() {
    const {events = {}} = this.props;
    if (this._element) {
      Object.keys(events).forEach(eventName => {
        this._element!.removeEventListener(eventName, events[eventName]);
      });
    }
  }

  show() {
    const content = this.getContent();
    if (content) {
      content.style.display = "block";
  } else {
      throw new Error("Content is not initialized");
  }
  }

  hide() {
    const content = this.getContent();
    if (content) {
      content.style.display = "none";
  } else {
      throw new Error("Content is not initialized");
  }
}
}

export default Block; 
