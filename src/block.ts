
import EventBus from "./core/EventBus"

class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render"
  };

  _element: HTMLElement | null = null;
  _meta: {tagName: string; props: Record<string,any>} | null = null;
  props: Record<string, any>;
  eventBus: () => EventBus;
  _eventBus: () => EventBus;

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

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    //eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    //eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _addEvents() {
    const {events = {}} = this.props;

    Object.keys(events).forEach(eventName => {
      this._element.addEventListener(eventName, events[eventName]);
    });
  }

  _createResources() {
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

  // _componentDidMount() {
  //   this.componentDidMount();
  // }

  componentDidMount(oldProps: undefined) {}

    dispatchComponentDidMount() {
        this._eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

  _componentDidUpdate(oldProps: any, newProps: any) {
    
  }

  componentDidUpdate(oldProps: any, newProps: any) {
    return true;
  }

  setProps = (nextProps: any) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  };

  get element() {
    return this._element;
  }

  _render() {
    const block = this.render();

    // Удалить старые события через removeEventListener
    if(this._element) { 
      this._element.innerHTML = block;
    }

    this._addEvents();
} 

    // Переопределяется пользователем. Необходимо вернуть разметку
  render(): string {
    return '';
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: {}) {
    // Ещё один способ передачи this, но он больше не применяется с приходом ES6+
    const self = this;

        // Здесь вам предстоит реализовать метод
    return props;
  }

  _createDocumentElement(tagName: any) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
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