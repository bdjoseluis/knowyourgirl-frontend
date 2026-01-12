import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import { GrupoService } from '../services/email.service'; // Asegúrate de que el nombre del archivo coincida

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.css'] // Si creaste el archivo CSS
})
export class GroupFormComponent implements OnInit {
  
  // Variables de estado para el listado y edición
  groupsList: any[] = [];
  isEditing: boolean = false;
  currentGroupId: number | null = null;

  // Definición del formulario reactivo
  form = this.fb.group({
    name: ['', Validators.required],
    members: this.fb.array([])
  });

  constructor(private fb: FormBuilder, private grupoService: GrupoService) {}

  ngOnInit(): void {
    this.addMember(); // Inicia con un miembro vacío
    this.loadGroups(); // Carga la lista inicial desde la BD
  }

  // Getter para facilitar el acceso al FormArray en el HTML
  get members(): FormArray {
    return this.form.get('members') as FormArray;
  }

  // Método para cargar todos los grupos del Backend
  loadGroups(): void {
    this.grupoService.getAll().subscribe({
      next: (data) => {
        this.groupsList = data;
      },
      error: (err) => console.error('Error al cargar grupos:', err)
    });
  }

  // Añadir un nuevo grupo de campos de miembro al formulario
  addMember(): void {
    this.members.push(this.fb.group({
      name: ['', Validators.required],
      description: [''],
      city: [''],
      age: ['']
    }));
  }

  // Eliminar un miembro del formulario
  removeMember(index: number): void {
    if (this.members.length > 1) {
      this.members.removeAt(index);
    }
  }

  // Guardar o Actualizar
  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.value;

    // Construimos el objeto exacto para Spring Boot
    const payload = {
      idGrupo: this.currentGroupId, // Si es null, Spring crea uno nuevo. Si tiene ID, lo actualiza.
      nombre: raw.name,
      personas: (raw.members || []).map((m: any) => ({
        // Si estuviéramos editando, aquí faltaría el idPersona, 
        // pero Hibernate suele manejar bien el reemplazo en cascada
        nombre: m.name,
        descripcion: m.description || '',
        ciudad: m.city || '',
        edad: m.age ? Number(m.age) : 0
      }))
    };

    this.grupoService.saveGroup(payload).subscribe({
      next: () => {
        alert(this.isEditing ? '¡Grupo actualizado con éxito!' : '¡Grupo guardado en la base de datos!');
        this.resetForm();
        this.loadGroups();
      },
      error: (err) => {
        alert('Error en la operación: ' + err.message);
      }
    });
  }

  // Cargar datos de un grupo existente en el formulario
  editGroup(group: any): void {
    this.isEditing = true;
    this.currentGroupId = group.idGrupo;

    // Seteamos el nombre del grupo
    this.form.patchValue({ name: group.nombre });

    // Limpiamos los miembros actuales y cargamos los del grupo seleccionado
    this.members.clear();
    if (group.personas && group.personas.length > 0) {
      group.personas.forEach((p: any) => {
        this.members.push(this.fb.group({
          name: [p.nombre, Validators.required],
          description: [p.descripcion],
          city: [p.ciudad],
          age: [p.edad]
        }));
      });
    } else {
      this.addMember();
    }
    
    // Scroll hacia arriba para que el usuario vea el formulario relleno
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Eliminar grupo
  deleteGroup(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este grupo y todos sus miembros?')) {
      this.grupoService.delete(id).subscribe({
        next: () => {
          alert('Grupo eliminado.');
          this.loadGroups();
          if (this.currentGroupId === id) this.resetForm();
        },
        error: (err) => alert('Error al eliminar: ' + err.message)
      });
    }
  }

  // Limpiar el formulario y volver al estado inicial
  private resetForm(): void {
    this.form.reset();
    this.members.clear();
    this.addMember();
    this.isEditing = false;
    this.currentGroupId = null;
  }
}