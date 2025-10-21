export const qs = (sel, el = document) => el.querySelector(sel);
export const qsa = (sel, el = document) => Array.from(el.querySelectorAll(sel));

export const show = (el) => el.classList.remove('hidden');
export const hide = (el) => el.classList.add('hidden');

export const toast = (msg, ms = 2500) => {
  const box = qs('#view-toast');
  box.textContent = msg;
  show(box);
  setTimeout(() => hide(box), ms);
};

export const storage = {
  set(k, v) { localStorage.setItem(k, JSON.stringify(v)); },
  get(k)    { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } },
  del(k)    { localStorage.removeItem(k); }
};