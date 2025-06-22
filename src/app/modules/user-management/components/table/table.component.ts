import { Component, ViewChild, AfterViewInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, input, output } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { User } from '../../../../core/interfaces';
import { BirthDatePipe } from '../../../../shared/pipes/birth-date.pipe';
import { PhoneFormatPipe } from '../../../../shared/pipes/phone-format.pipe';

@Component({
  selector: 'app-table',
  standalone: false,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements AfterViewInit, OnChanges {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Inputs usando signals (Angular 17+)
  @Input() users: User[] = [];
  @Input() loading: boolean = false;
  @Input() error: string | null = null;
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 10;
  @Input() totalUsers: number = 0;

  // Outputs para eventos
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() refresh = new EventEmitter<void>();
  public displayedColumns: string[] = ['id', 'fullName', 'email', 'address', 'phone', 'birthDate', 'actions'];
  public dataSource = new MatTableDataSource<User>([]);

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    // Actualizar el dataSource cuando cambien los usuarios
    if (changes['users'] && this.users) {
      console.log('📊 Actualizando tabla con', this.users.length, 'usuarios');
      this.dataSource.data = this.users;
    }
  }
  ngAfterViewInit() {
    // Configurar el ordenamiento personalizado
    this.dataSource.sortingDataAccessor = (data: User, sortHeaderId: string) => {
      switch (sortHeaderId) {
        case 'fullName': return data.name; // Usar name para fullName
        case 'id': return data.id;
        case 'email': return data.email;
        case 'address': return data.address;
        case 'phone': return data.phone;
        case 'birthDate': return new Date(data.birthDate).getTime();
        default: return (data as any)[sortHeaderId];
      }
    };

    // Conectar sort al dataSource (pero no paginator, ya que manejamos paginación externamente)
    this.dataSource.sort = this.sort;
  }

  /**
   * Maneja el cambio de página del paginator
   */
  onPageEvent(event: PageEvent): void {
    console.log('📄 Evento de paginación:', event);

    // Si cambió el tamaño de página
    if (event.pageSize !== this.pageSize) {
      this.pageSizeChange.emit(event.pageSize);
    }

    // Si cambió la página (pageIndex es 0-based, pero nuestro servicio usa 1-based)
    const newPage = event.pageIndex + 1;
    if (newPage !== this.currentPage) {
      this.pageChange.emit(newPage);
    }
  }  /**
   * Maneja la búsqueda local en los datos actuales
   */
  onSearch(searchTerm: string): void {
    this.dataSource.filter = searchTerm.trim().toLowerCase();
  }
  /**
   * Maneja la búsqueda cuando se presiona el botón o Enter
   */
  onSearchClick(searchTerm: string): void {
    console.log('🔍 Ejecutando búsqueda:', searchTerm);
    this.onSearch(searchTerm);
  }

  /**
   * Limpia la búsqueda
   */
  onClearSearch(searchInput: HTMLInputElement): void {
    searchInput.value = '';
    this.onSearch('');
    searchInput.focus();
  }

  /**
   * Refresca los datos
   */
  onRefreshData(): void {
    this.refresh.emit();
  }
  /**
   * Navega al detalle del usuario
   */
  public onSelectUser(userId: string): void {
    this.router.navigate(['/app/user', userId]);
  }

}
