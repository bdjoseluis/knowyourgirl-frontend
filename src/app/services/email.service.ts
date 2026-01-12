import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/environment.prod';

@Injectable({ providedIn: 'root' })
export class GrupoService {
  // Cambiamos el puerto al de Spring Boot (8087)
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Obtener todos
getAll(): Observable<any[]> {
  return this.http.get<any[]>(this.apiUrl);
}

// Guardar (POST)
saveGroup(group: any): Observable<any> {
  return this.http.post(this.apiUrl, group);
}

// Eliminar (DELETE)
delete(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`);
}

}