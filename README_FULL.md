Proyecto completo (listo para `ng serve`)

Pasos para ejecutar:

1) Frontend
   cd mobile/grupos-app
   npm install
   npm start

2) Backend
   cd mobile/server
   npm install
   cp .env.example .env   # revisa que TO_EMAIL tenga tu correo; ya viene con `josbotdev@gmail.com`
   npm start

Prueba: abre http://localhost:4200, rellena un grupo y pulsa Guardar. El backend está en http://localhost:3000/api/groups y enviará el correo al TO_EMAIL configurado.

Notas:
- Si no te hace `ng serve` (por permisos o PATH), puedes instalar Angular CLI globalmente y reintentar: `npm i -g @angular/cli`.
- No subas tu `.env` a repositorios públicos.
