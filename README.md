# KnowYourGirl — Frontend

**Interfaz Angular para dar de alta grupos de personas y enviarlos por correo.**
Es el front de la API [knowyourgirl](https://github.com/bdjoseluis/knowyourgirl).

---

## Qué hace

- **Formulario de grupo**: nombre del grupo y las personas que lo componen
  (nombre, descripción, edad, ciudad), añadiendo y quitando filas sobre la marcha
- **Validación** antes de enviar, con Angular Forms
- **Envío por correo** del grupo montado, a través de un servicio propio

## Cómo está organizado

```
src/app/
├── group-form/          el formulario: componente, plantilla y estilos
├── models/group.model   tipado de grupo y persona
└── services/email       envío del grupo
```

## Stack

Angular · TypeScript · RxJS · Angular Forms

## Ejecutarlo

```bash
npm install
npm start           # http://localhost:4200
```

La API tiene que estar levantada aparte; la URL se configura en
`src/enviroments/environment.prod.ts`.

## Estado

Proyecto de formación, terminado. Desplegado en su momento en Vercel contra la API
en Render.
