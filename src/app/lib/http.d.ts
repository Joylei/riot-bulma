interface HttpRequest {
    cancel(): void,

    completed: boolean,

    cancelled: boolean
}

interface HttpInterface {
    (url: string): HttpRequest,
    (url: string, done: (err, data) => any): HttpRequest,
    (url: string, data: any): HttpRequest,
    (url: string, data: any, done: (err, data) => any): HttpRequest,
    (url: string, method: string, data: any): HttpRequest,
    (url: string, method: string, data, done: (err, data) => any): HttpRequest,

    get(url: string, data: any, done: (err, data) => any): HttpRequest,

    post(url: string, data: any, done: (err, data) => any): HttpRequest,

    put(url: string, data: any, done: (err, data) => any): HttpRequest,

    delete(url: string, data: any, done: (err, data) => any): HttpRequest
}

export const http: HttpInterface;
export default http

type RequestBuilder = (baseUrl: string, id: any, action: string) => { url: string, method: string = 'GET', data?: any, before?: (done, err, data) => void }
export function resource(baseUrl: string, buildRequest?: RequestBuilder): {
    items(filter: any, done: (err, data) => void): void,
    get(id, done: (err, data) => void): void,
    add(data, done: (err, data) => void): void,
    update(id, data, done: (err, data) => void): void,
    remove(id, done: (err, data) => void): void
}

