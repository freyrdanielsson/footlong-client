const baseurl = process.env.REACT_APP_SERVICE_URL || '';

/**
 * 
 *  TODO: Don't export get and post directly
 */

export default async function get(path) {
    return request('GET', path);
}

export async function post(path, data) {
    return request('POST', path, data);
}

async function request(method, path, data = '') {
    const url = new URL(path, baseurl);

    const options = {
        method,
        headers: {},
    };

    if (data) {
        options.headers = { 'content-type': 'application/json' };
        options.body = JSON.stringify(data);
    }

    const token = window.localStorage.getItem('token');
    if (token) {
        options.headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url.href, options);

    const json = await response.json();

    const { status, ok } = response;

    return {
        data: json,
        ok,
        status,
    }
}





