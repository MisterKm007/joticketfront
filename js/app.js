import { qs, qsa, show, hide, toast } from './utils.js';
import { loginUser, registerUser, logout } from './auth.js';
import { ACCESS_TOKEN_KEY } from './config.js';
import { storage } from './utils.js';
import { createBillet } from './tickets.js';

const views = {
  login: qs('#view-login'),
  register: qs('#view-register'),
  app: qs('#view-app'),
  loading: qs('#view-loading'),
  confirmation: qs('#view-confirmation'),
};

const nav = {
  showLogin: qs('#btn-show-login'),
  showRegister: qs('#btn-show-register'),
  logout: qs('#btn-logout'),
};

function switchTo(view) {
  Object.values(views).forEach(hide);
  show(views[view]);
  nav.logout.classList.toggle('hidden', view !== 'app');
}

function boot() {
  // Buttons
  nav.showLogin.addEventListener('click', () => switchTo('login'));
  nav.showRegister.addEventListener('click', () => switchTo('register'));
  nav.logout.addEventListener('click', () => {
    logout();
    switchTo('login');
  });

  // Links
  qs('#link-to-register').addEventListener('click', (e) => { e.preventDefault(); switchTo('register'); });
  qs('#link-to-login').addEventListener('click', (e) => { e.preventDefault(); switchTo('login'); });

  // Forms
  qs('#form-login').addEventListener('submit', onLoginSubmit);
  qs('#form-register').addEventListener('submit', onRegisterSubmit);
  qs('#form-reserve').addEventListener('submit', onReserveSubmit);
  qs('#btn-cancel-reserve').addEventListener('click', onCancelReserve);
  qs('#btn-new-reservation').addEventListener('click', resetReservationUI);

  // Ticket select buttons
  qsa('.btn-choose').forEach(btn => btn.addEventListener('click', onChooseTicket));

  // Initial view based on token
  const hasToken = !!storage.get(ACCESS_TOKEN_KEY);
  if (hasToken) switchTo('app'); else switchTo('login');
}

// Handlers
async function onLoginSubmit(e) {
  e.preventDefault();
  const fd = new FormData(e.currentTarget);
  const payload = {
    email: (fd.get('email') || '').trim(),
    password: (fd.get('password') || '').trim(),
  };
  try {
    await loginUser(payload);
    toast('Connexion réussie.');
    switchTo('app');
  } catch (err) {
    toast(`Erreur: ${err.message}`);
  }
}

async function onRegisterSubmit(e) {
  e.preventDefault();
  const fd = new FormData(e.currentTarget);
  const payload = {
    username: (fd.get('username') || '').trim(),
    email: (fd.get('email') || '').trim(),
    password: (fd.get('password') || '').trim(),
  };
  try {
    await registerUser(payload);
    toast('Compte créé. Vous pouvez vous connecter.');
    switchTo('login');
  } catch (err) {
    toast(`Erreur: ${err.message}`);
  }
}

function onChooseTicket(e) {
  const card = e.currentTarget.closest('.ticket-card');
  const type = card?.dataset?.type || '';
  const typeInput = qs('#reserve-type');
  typeInput.value = type;
  show(qs('#form-reserve'));
  hide(qs('#view-confirmation'));
}

function onCancelReserve() {
  hide(qs('#form-reserve'));
}

async function onReserveSubmit(e) {
  e.preventDefault();
  const fd = new FormData(e.currentTarget);
  const payload = {
    type: (fd.get('type') || '').trim(),
    client_name: (fd.get('client_name') || '').trim(),
    email: (fd.get('email') || '').trim(),
  };
  if (!payload.type) { toast('Choisis un type de billet.'); return; }

  try {
    const res = await createBillet(payload);
    toast('Billet créé !');
    fillConfirmation(res);
    hide(qs('#form-reserve'));
    show(qs('#view-confirmation'));
  } catch (err) {
    toast(`Erreur: ${err.message}`);
  }
}

function fillConfirmation(res) {
  qs('#conf-type').textContent = res.type ?? '';
  qs('#conf-code').textContent = res.code ?? '';
  qs('#conf-id').textContent = res.id ?? '';
  qs('#conf-created').textContent = res.created_at ?? '';
}

function resetReservationUI() {
  hide(qs('#view-confirmation'));
  qs('#form-reserve').reset();
  show(qs('#form-reserve'));
}

document.addEventListener('DOMContentLoaded', boot);