import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap, catchError, of } from 'rxjs';
import {
  RandomUserResponse,
  RandomUser,
  User,
  UserServiceState
} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {  private readonly baseUrl = 'https://randomuser.me/api/';

  private state = signal<UserServiceState>({
    users: [],
    loading: false,
    error: null,
    currentPage: 1,
    pageSize: 10,
    totalUsers: 0  });

  users = computed(() => this.state().users);
  loading = computed(() => this.state().loading);
  error = computed(() => this.state().error);
  currentPage = computed(() => this.state().currentPage);
  pageSize = computed(() => this.state().pageSize);
  totalUsers = computed(() => this.state().totalUsers);

  constructor(private http: HttpClient) {}

  /**
   * Obtiene usuarios para una página específica
   * @param page Número de página (1-based)
   * @param pageSize Tamaño de la página
   * @returns Observable con los usuarios
   */
  getUsersPaginated(page: number = 1, pageSize: number = 10): Observable<User[]> {
    this.updateState({ loading: true, error: null, currentPage: page, pageSize });

    const url = `${this.baseUrl}?results=${pageSize}&page=${page}&seed=foobar`;

    return this.http.get<RandomUserResponse>(url).pipe(
      map(response => this.transformUsers(response.results)),
      tap(users => {
        this.updateState({
          users,
          loading: false,
          totalUsers: pageSize * 10 // Simular total para demo
        });
      }),
      catchError(error => {        this.updateState({
          loading: false,
          error: 'Error al cargar usuarios. Verifique su conexión.'
        });
        return of([]);
      })
    );
  }
  /**
   * Obtiene una lista de usuarios aleatorios (método legacy)
   */
  getUsers(count: number = 10): Observable<User[]> {
    return this.getUsersPaginated(1, count);
  }
  /**
   * Cambia a una página específica
   */
  goToPage(page: number): void {
    if (page > 0) {
      this.getUsersPaginated(page, this.pageSize()).subscribe();
    }
  }

  /**
   * Actualiza el tamaño de página y recarga los datos
   */
  setPageSize(pageSize: number): void {
    this.getUsersPaginated(1, pageSize).subscribe();
  }

  /**
   * Recarga los datos actuales
   */
  refresh(): void {
    this.getUsersPaginated(this.currentPage(), this.pageSize()).subscribe();
  }

  /**
   * Actualiza el estado interno
   */
  private updateState(updates: Partial<UserServiceState>): void {
    this.state.update(current => ({ ...current, ...updates }));
  }

  /**
   * Transforma los datos de la API al modelo interno
   */
  private transformUsers(randomUsers: RandomUser[]): User[] {
    return randomUsers.map((user, index) => ({
      id: user.login.uuid || `user-${Date.now()}-${index}`,
      name: `${user.name.first} ${user.name.last}`,
      email: user.email,
      address: this.formatAddress(user.location),
      phone: user.phone,
      birthDate: this.formatDate(user.dob.date),
      picture: user.picture.large,
      gender: user.gender,
      age: user.dob.age,
      fullAddress: this.getFullAddress(user.location)
    }));
  }
  /**
   * Formatea la dirección del usuario
   */
  private formatAddress(location: any): string {
    return `${location.street.number} ${location.street.name}, ${location.city}, ${location.state}`;
  }

  /**
   * Obtiene la dirección completa del usuario
   */
  private getFullAddress(location: any): string {
    return `${location.street.number} ${location.street.name}, ${location.city}, ${location.state}, ${location.country}, ${location.postcode}`;
  }

  /**
   * Formatea la fecha de nacimiento
   */
  private formatDate(dateString: string): string {
    return dateString;
  }
}
