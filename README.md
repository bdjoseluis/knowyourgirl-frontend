Proyecto: grupos-app (Angular)

Este repositorio contiene los archivos del componente y servicio para un formulario de grupos.

Instrucciones rápidas para integrarlo en un proyecto Angular existente:

1. Crea un nuevo proyecto Angular si no tienes uno:
   npx -y @angular/cli new grupos-app --routing=false --style=css
2. Copia las carpetas `src/app/group-form`, `src/app/services` y `src/app/models` desde aquí al `src/app/` de tu proyecto.
3. Asegúrate de registrar `GroupFormComponent` en `app.module.ts` y de importar `ReactiveFormsModule` y `HttpClientModule` en el `AppModule`.

Ejemplo de `AppModule` imports:

  import { ReactiveFormsModule } from '@angular/forms';
  import { HttpClientModule } from '@angular/common/http';

  @NgModule({
    imports: [BrowserModule, ReactiveFormsModule, HttpClientModule],
  })

4. Para probar localmente, instala dependencias y ejecuta:
   cd grupos-app
   npm install
   ng serve

5. El backend local escucha en http://localhost:3000/api/groups (ver carpeta `../server`).

Nota: Este proyecto no incluye la app Angular completa (archivos generados por Angular CLI). Si quieres, puedo generar todo el proyecto completo y dejarlo listo para `ng serve`.