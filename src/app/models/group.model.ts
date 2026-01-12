export interface Persona {
  nombre: string;
  descripcion: string;
  edad: number;
  ciudad: string;
}

export interface Group {
  nombre: string;
  personas: Persona[];
}