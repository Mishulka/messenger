export function render(query,block) {
    const root = document.querySelector(query);
    root.AppendChild(block.getContent());   
    block.dispatchComponentDidMount();
    return root;    
}