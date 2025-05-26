enum METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH'
}

type Options = {
    method: METHOD;
    data?: unknown;
    headers?: Record<string, string>;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

class Http {
    private readonly host = 'https://ya-praktikum.tech';
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: METHOD.GET });
    }

    async post<T>(url: string, data: unknown, headers?: Record<string, string>): Promise<T> {
        const xhr = await this.request(url, {
            method: METHOD.POST,
            data,
            headers
        });
        return this.parseResponse<T>(xhr);
    }

    put(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: METHOD.PUT });
    }

    delete(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: METHOD.DELETE });
    }

    patch(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: METHOD.PATCH });
    }

    private makeQueryString(data: Record<string, string>): string {
        return Object.entries(data)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
    }

    private request(
        endpoint: string,
        options: Options = { method: METHOD.GET }
    ): Promise<XMLHttpRequest> {
        const { method, data, headers } = options;
        const isGET = method === METHOD.GET;

        const fullUrl = `${this.host}${this.baseUrl}${endpoint}`;
        const urlWithQuery = isGET && data && typeof data === 'object'
            ? `${fullUrl}?${this.makeQueryString(data as Record<string, string>)}`
            : fullUrl;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, urlWithQuery);

            const finalHeaders = {
                'Content-Type': 'application/json',
                ...headers
            };

            Object.entries(finalHeaders).forEach(([key, value]) => {
                xhr.setRequestHeader(key, value);
            });

            xhr.onload = () => resolve(xhr);
            xhr.onerror = reject;
            xhr.onabort = reject;
            xhr.ontimeout = reject;

            if (isGET || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    }

    private parseResponse<T>(xhr: XMLHttpRequest): T {
        try {
            return JSON.parse(xhr.responseText) as T;
        } catch {
            throw new Error('Failed to parse response');
        }
    }
}

export { Http, METHOD };
