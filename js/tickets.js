import { ENDPOINTS } from './config.js';
import { apiFetch } from './api.js';

export async function createBillet({ type, client_name, email }) {
  return await apiFetch(ENDPOINTS.createBillet, {
    method: 'POST',
    auth: true,
    body: { type, client_name, email },
  });
}