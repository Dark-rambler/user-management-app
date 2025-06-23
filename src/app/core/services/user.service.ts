import { Injectable, signal, computed, DestroyRef, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap, catchError, of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  RandomUserResponse,
  RandomUser,
  User,
  UserServiceState
} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = 'https://randomuser.me/api/';
  private destroyRef = inject(DestroyRef);

  private state = signal<UserServiceState>({
    users: [],
    loading: false,
    error: null,
    currentPage: 1,
    pageSize: 5,
    totalUsers: 0  });
  public users = computed(() => this.state().users);
  public loading = computed(() => this.state().loading);
  public error = computed(() => this.state().error);
  public currentPage = computed(() => this.state().currentPage);
  public pageSize = computed(() => this.state().pageSize);
  public totalUsers = computed(() => this.state().totalUsers);

  constructor(private http: HttpClient) {}
  public getUsersPaginated(page: number = 1, pageSize: number = 5): Observable<User[]> {
    this.updateState({ loading: true, error: null, currentPage: page, pageSize });

    const url = `${this.baseUrl}?results=${pageSize}&page=${page}&seed=foobar`;

    return this.http.get<RandomUserResponse>(url).pipe(
      map(response => this.transformUsers(response.results)),
      tap(users => {
        this.updateState({
          users,
          loading: false,
          totalUsers: pageSize * 10
        });
      }),
      catchError(error => {        this.updateState({
          loading: false,
          error: 'Error al cargar usuarios. Verifique su conexión.'
        });
        return of([]);
      })
    );  }
  public getUsers(count: number = 5): Observable<User[]> {
    return this.getUsersPaginated(1, count);
  }
  public goToPage(page: number): void {
    if (page > 0) {
      this.getUsersPaginated(page, this.pageSize())
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe();
    }
  }

  public setPageSize(pageSize: number): void {
    this.getUsersPaginated(1, pageSize)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  public refresh(): void {
    this.getUsersPaginated(this.currentPage(), this.pageSize())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  private updateState(updates: Partial<UserServiceState>): void {
    this.state.update(current => ({ ...current, ...updates }));  }

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
    }));  }

  private formatAddress(location: any): string {
    return `${location.street.number} ${location.street.name}, ${location.city}, ${location.state}`;  }

  private getFullAddress(location: any): string {
    return `${location.street.number} ${location.street.name}, ${location.city}, ${location.state}, ${location.country}, ${location.postcode}`;  }

  private formatDate(dateString: string): string {
    return dateString;
  }
}
