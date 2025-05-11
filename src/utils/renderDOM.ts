import Block from "core/block";

export function render(query: string,block: Block) {
    const root = document.querySelector(query);
    if (!root) {
        throw new Error(`Root element not found for selector "${query}"`);
    }
    root.appendChild(block.getContent());   
    block.dispatchComponentDidMount();
    return root;    
}
