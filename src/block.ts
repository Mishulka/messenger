import { compile as HBcompile, TemplateDelegate } from "handlebars";
import EventBus from "./core/EventBus"

export type TProps = Record<string, any>;

class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render"
  };
  public _id: string;
  private _element: HTMLElement | null = null;
  private _meta: {tagName: string; props: Record<string,any>} | null = null;
  props: Record<string, any>;
  eventBus: () => EventBus;
  private _eventBus: () => EventBus;
  public children: Record<string, unknown> = {};

  constructor(tagName = "div", propsAndChild = {}) {
    const { children, props } = this._getChildren(propsAndChild);
    this._id = this._generateId();
    this.children = children;
    this.props = props;
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

  private _generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
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

    Object.values(this.children).forEach(child => {
      (child as Block).dispatchComponentDidMount();
    })  
  }

  componentDidMount() {

  }

    dispatchComponentDidMount() {
        this._eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

  private _componentDidUpdate(oldProps: TProps, newProps: TProps): void {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(oldProps: TProps, newProps: TProps): boolean {
    return JSON.stringify(oldProps) !== JSON.stringify(newProps);
  }

  setProps = (nextProps: unknown) => {
    if (!nextProps) {
      return;
    }

    const oldProps = { ...this.props };

    Object.assign(this.props, nextProps);
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  };

  get element(): HTMLElement | null {
    return this._element;
  }

  private _render() {
    const block = this.render();
    this._removeEvents();
    
    if (this._element){
      this._element.innerHTML = '';
      this._element.appendChild(block);
    }

    this._addEvents();
  } 

   
  render(): DocumentFragment {
    return this.compile('<template>{{content}}</template>', this.props);
  }

  getContent() {
    return this.element;
  }

  _getChildren(propsAndChildren: Record<string, unknown>) {
    const children: Record<string, unknown> = {};
    const props: Record<string, unknown> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
                children[key] = value;
      } else {
                props[key] = value;
              }
      });

      return { children, props };
  }

  compile(template: string, props: Record<string, Block | string >): DocumentFragment {
    const propsAndStubs = { ...props};

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id=${(child as Block)._id}></div>`;
    })

    const fragment = this._createDocumentElement("template") as HTMLTemplateElement;
    fragment.innerHTML = HBcompile(template)(propsAndStubs);

   
    Object.values(this.children).forEach(child => {
      const stub = fragment.content.querySelector(`[data-id="${(child as Block)._id}"]`);
      if (!stub) {
        throw new Error(`Stub for child ${child} not found`);
      }
      stub.replaceWith((child as Block).getContent()!);
    });

    return fragment.content;
  }
  
  private _makePropsProxy(props: TProps): TProps {
    const self = this;
    
    return new Proxy(props, {
      get(target, prop: string){
        return target[prop as keyof TProps];
      },
      set(target, prop: string, value){
        target[prop as keyof TProps] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        return true;
      }

    });
  }

  private _createDocumentElement(tagName: string): HTMLElement {
    if (typeof tagName !== "string") {
      throw new Error(`Invalid tagName: ${tagName}`);
    }
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
