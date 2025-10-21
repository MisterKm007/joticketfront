import { BASE_URL, ACCESS_TOKEN_KEY } from './config.js';
import { storage } from './utils.js';

const buildHeaders = (isJSON = true, withAuth = false) => {
  const headers = {};
  if (isJSON) headers['Content-Type'] = 'application/json';
  if (withAuth) {
    const token = storage.get(ACCESS_TOKEN_KEY);
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export async function apiFetch(path, { method = 'GET', body = null, auth = false } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: buildHeaders(!!body, auth),
    body: body ? JSON.stringify(body) : null,
  });
  const text = await res.text();
  let data;
  try { data = text ? JSON.parse(text) : {}; } catch { data = { raw: text }; }
  if (!res.ok) {
    const msg = (data && (data.detail || data.message)) || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data;
}