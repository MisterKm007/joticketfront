import { ENDPOINTS, ACCESS_TOKEN_KEY } from './config.js';
import { apiFetch } from './api.js';
import { storage, toast } from './utils.js';

export async function registerUser({ username, email, password }) {
  const res = await apiFetch(ENDPOINTS.register, {
    method: 'POST',
    body: { username, email, password },
  });
  if (res && res.access_token) {
    storage.set(ACCESS_TOKEN_KEY, res.access_token);
  }
  return res;
}

export async function loginUser({ email, password }) {
  const res = await apiFetch(ENDPOINTS.login, {
    method: 'POST',
    body: { email, password },
  });
  const token = res.access_token || res.token || res.accessToken;
  if (!token) throw new Error("Token manquant dans la réponse.");
  storage.set(ACCESS_TOKEN_KEY, token);
  return res;
}

export function logout() {
  storage.del(ACCESS_TOKEN_KEY);
  toast("Déconnecté.");
}