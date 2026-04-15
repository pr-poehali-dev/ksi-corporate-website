const urls = {
  "api-task-comments": "https://functions.poehali.dev/8516b5a8-cb84-41bf-abad-7045117da932",
  "api-km-balance": "https://functions.poehali.dev/845accff-553a-4de8-a13c-d0a3663dcb1e",
  "api-company-detail": "https://functions.poehali.dev/1b5d9f8d-2b57-45be-9ec6-5cd2c4800cdb",
  "api-users": "https://functions.poehali.dev/de27d472-bc35-48eb-8934-08622b0965b6",
  "api-dashboard": "https://functions.poehali.dev/4c6c5013-3944-4f03-97cf-4c1cad779792",
  "api-tasks": "https://functions.poehali.dev/967b902c-12ad-4726-b3e6-ea9b8d7d0f4c",
  "api-companies": "https://functions.poehali.dev/1a91328e-b97c-468a-8e22-5d496247f460",
  "api-task-detail": "https://functions.poehali.dev/00b65a6a-a92b-40ae-a1de-efa03b53c2c9",
  "api-modules": "https://functions.poehali.dev/ef3e55f0-07e4-4b00-9d8d-ced46597f2ac",
  "api-audit": "https://functions.poehali.dev/0e521cf3-3418-4d50-8bc5-694e87d31b54",
  "api-km-operations": "https://functions.poehali.dev/7772c5a1-8fd5-402f-ab24-4c35c1662827",
  "api-notifications": "https://functions.poehali.dev/1bced70c-36cc-42f3-8233-7875de1d27f1",
  "auth-change-password": "https://functions.poehali.dev/6fd20213-d9b7-441f-be6f-8b51f9651add",
  "auth-me": "https://functions.poehali.dev/1fd884a6-0ce0-4c7b-9cf8-95a09195f975",
  "auth-logout": "https://functions.poehali.dev/efa036e3-d00e-4159-a196-e089c1a217ea",
  "auth-login": "https://functions.poehali.dev/b71cec9c-a5e5-47dd-8fb0-afd40a67732d",
  "site-settings": "https://functions.poehali.dev/de77851c-6234-460f-903b-ca3df97ddc07",
  "contact-form": "https://functions.poehali.dev/d553ddbb-b6e1-494f-bbb6-61d2f1a17148",
} as const;

export type ApiEndpoint = keyof typeof urls;

const TOKEN_KEY = "ksi_token";

function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export class ApiError extends Error {
  status: number;
  data: Record<string, unknown>;

  constructor(status: number, data: Record<string, unknown>) {
    super((data.error as string) || `HTTP ${status}`);
    this.status = status;
    this.data = data;
  }
}

function buildUrl(
  endpoint: ApiEndpoint,
  params?: Record<string, string | number | boolean | undefined | null>
): string {
  const base = urls[endpoint];
  if (!base) {
    throw new Error(`Unknown API endpoint: ${endpoint}`);
  }
  if (!params) return base;

  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value));
    }
  }
  const qs = searchParams.toString();
  return qs ? `${base}?${qs}` : base;
}

async function request<T = Record<string, unknown>>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  endpoint: ApiEndpoint,
  options?: {
    params?: Record<string, string | number | boolean | undefined | null>;
    body?: Record<string, unknown>;
  }
): Promise<T> {
  const url = buildUrl(endpoint, options?.params);
  const token = getToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["X-Authorization"] = `Bearer ${token}`;
  }

  const fetchOptions: RequestInit = {
    method,
    headers,
  };

  if (options?.body && method !== "GET") {
    fetchOptions.body = JSON.stringify(options.body);
  }

  const response = await fetch(url, fetchOptions);

  let data: Record<string, unknown>;
  const text = await response.text();
  try {
    data = JSON.parse(text);
  } catch {
    data = { error: text || "Unknown error" };
  }

  if (!response.ok) {
    throw new ApiError(response.status, data);
  }

  return data as T;
}

export const api = {
  get<T = Record<string, unknown>>(
    endpoint: ApiEndpoint,
    params?: Record<string, string | number | boolean | undefined | null>
  ): Promise<T> {
    return request<T>("GET", endpoint, { params });
  },

  post<T = Record<string, unknown>>(
    endpoint: ApiEndpoint,
    body?: Record<string, unknown>
  ): Promise<T> {
    return request<T>("POST", endpoint, { body });
  },

  put<T = Record<string, unknown>>(
    endpoint: ApiEndpoint,
    body?: Record<string, unknown>
  ): Promise<T> {
    return request<T>("PUT", endpoint, { body });
  },

  delete<T = Record<string, unknown>>(
    endpoint: ApiEndpoint,
    body?: Record<string, unknown>
  ): Promise<T> {
    return request<T>("DELETE", endpoint, { body });
  },
};

export default api;