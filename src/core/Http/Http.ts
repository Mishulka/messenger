enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

type Options = {
  method: METHOD;
  data?: unknown;
  headers?: Record<string, string>;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;
 
class Http {
  private readonly host = 'https://ya-praktikum.tech/api/v2';
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.GET });
  }

  async post<T>(url: string, data?: unknown, headers?: Record<string, string>): Promise<T> {
    const xhr = await this.request(url, { method: METHOD.POST, data, headers });
    return this.parseResponse<T>(xhr);
  }

  async put<T>(url: string, data: unknown, headers?: Record<string, string>): Promise<T> {
    const xhr = await this.request(url, { method: METHOD.PUT, data, headers });
    return this.parseResponse<T>(xhr);
  }

  async delete<T>(url: string, data?: unknown, headers?: Record<string, string>): Promise<T> {
    const xhr = await this.request(url, { method: METHOD.DELETE, data, headers });
    return this.parseResponse<T>(xhr);
  }

  async patch<T>(url: string, data: unknown, headers?: Record<string, string>): Promise<T> {
    const xhr = await this.request(url, { method: METHOD.PATCH, data, headers });
    return this.parseResponse<T>(xhr);
  }

  private makeQueryString(data: Record<string, string>): string {
    return Object.entries(data)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
  }

  private request(endpoint: string, options: Options): Promise<XMLHttpRequest> {
    const { method, data, headers = {} } = options;
    const isGET = method === METHOD.GET;

    const fullUrl = `${this.host}${this.baseUrl}${endpoint}`;
    const urlWithQuery = isGET && data && typeof data === 'object' && !(data instanceof FormData)
      ? `${fullUrl}?${this.makeQueryString(data as Record<string, string>)}`
      : fullUrl;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, urlWithQuery);
      xhr.withCredentials = true;
    
      const isFormData = data instanceof FormData;
      if (!isFormData) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }

      
      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr);
        } else {
          reject(new Error(`Request failed with status ${xhr.status}: ${xhr.responseText}`));
        }
      };

      xhr.onerror = reject;
      xhr.onabort = reject;
      xhr.ontimeout = reject;

      if (isGET || !data) {
        xhr.send();
      } else if (isFormData) {
        xhr.send(data as FormData);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }

  private parseResponse<T>(xhr: XMLHttpRequest): T {
    if (xhr.status === 204 || !xhr.responseText.trim()) {
      return null as unknown as T;
    }

    const contentType = xhr.getResponseHeader('Content-Type');
    try {
      if (contentType?.includes('application/json') || xhr.responseText.trim().startsWith('{')) {
        return JSON.parse(xhr.responseText) as T;
      }
      return xhr.responseText as unknown as T;
    } catch (error) {
      throw new Error(`Failed to parse response: ${(error as Error).message}`);
    }
  }
}

export { Http, METHOD };
