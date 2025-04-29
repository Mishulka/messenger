export function render(query: string,block: any) {
    const root = document.querySelector(query);
    if (!root) {
        throw new Error(`Root element not found for selector "${query}"`);
    }
    root.appendChild(block.getContent());   
    block.dispatchComponentDidMount();
    return root;    
}