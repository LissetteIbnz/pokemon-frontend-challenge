import { env } from "core/environment";

const BASE_URL = env.baseURL;

const client = async <Response>(path: string, customConfig: RequestInit): Promise<Response> => {
  const url = `${BASE_URL}${path}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  const request = new Request(url, config);

  const response = await fetch(request);

  if (!response.ok) {
    const errorMessage = await response.text();
    const parsedError = JSON.parse(errorMessage);
    return Promise.reject(parsedError);
  }

  return response.json();
};

const get = <Response>(path: string, config?: RequestInit) => {
  const requestConfig: RequestInit = { method: "GET", ...config };
  return client<Response>(path, requestConfig);
};

const post = <Response, Body = undefined>({
  path,
  body,
  config,
}: {
  path: string;
  body?: Body;
  config?: RequestInit;
}): Promise<Response> => {
  const requestConfig: RequestInit = {
    method: "POST",
    body: JSON.stringify(body),
    ...config,
  };

  return client<Response>(path, requestConfig);
};

const put = <Body, Response>(path: string, body: Body, config?: RequestInit): Promise<Response> => {
  const requestConfig: RequestInit = {
    method: "PUT",
    body: JSON.stringify(body),
    ...config,
  };

  return client(path, requestConfig);
};

// Prefixed with underscored because delete is a reserved word in Javascript.
const _delete = <Body>(path: string, body?: Body, config?: RequestInit): Promise<void> => {
  const requestConfig: RequestInit = {
    method: "DELETE",
    ...(body && { body: JSON.stringify(body) }),
    ...config,
  };

  return client(path, requestConfig);
};

export const http = {
  get,
  post,
  put,
  delete: _delete,
};
