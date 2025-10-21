# JO Tickets — Frontend (Step 2)

Étape 2 : ajout de la sélection de billet et de la création de réservation.

## Config
- `js/config.js` : `BASE_URL` déjà réglé sur `https://backend-divine-haze-4499.fly.dev`
- Endpoints utilisés :
  - `POST /auth/register`
  - `POST /auth/login`
  - `POST /billets/` (auth requis)

## Utilisation
1. Ouvre `index.html` dans un navigateur (ou sers le dossier avec un serveur statique).
2. Crée un compte puis connecte-toi.
3. Choisis **solo / duo / famille**, remplis **nom + email**, clique **Réserver**.
4. La confirmation affiche `type`, `code`, `id`, `created_at`.

## Fichiers
- `index.html` — vues auth + app + sélection billets + formulaire + confirmation
- `styles.css` — styles (grille, cartes)
- `js/config.js` — BASE_URL + endpoints
- `js/utils.js` — DOM, toast, storage
- `js/api.js` — wrapper fetch
- `js/auth.js` — register/login/logout
- `js/tickets.js` — `createBillet()`
- `js/app.js` — logique UI et handlers