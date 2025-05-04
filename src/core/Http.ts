enum METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH'
};


type Options = {
    method: METHOD;
    data?: string;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

class Http  {  
    get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, {...options, method: METHOD.GET});
    };
     
    request<Request>(url: string, options: Options = { method: METHOD.GET }): Promise<XMLHttpRequest> {
    
        const {method, data} = options;
    
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
        
            xhr.open(method, url);
            xhr.setRequestHeader('Content-Type', 'text/plain', );
            //key for test api. Will delete it later
            xhr.setRequestHeader('x-api-key', 'reqres-free-v1', );
    
            xhr.onload = function() {
                resolve(xhr);
            }
    
            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;
    
            if (method === METHOD.GET || !data) {
                xhr.send();
            }else {
                xhr.send((data));
            }
        })     
    }
}



export { Http, METHOD };