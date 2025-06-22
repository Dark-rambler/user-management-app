import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../core/services/user.service';
import { User, UserDetailViewModel, CatData } from '../../core/interfaces';
import { BirthDatePipe } from '../../shared/pipes/birth-date.pipe';
import { UserAgePipe } from '../../shared/pipes/user-age.pipe';
import { PhoneFormatPipe } from '../../shared/pipes/phone-format.pipe';

@Component({
  selector: 'app-user',
  standalone: true,  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    BirthDatePipe,
    UserAgePipe,
    PhoneFormatPipe
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export default class UserComponent implements OnInit {
  id!: string;
  user: UserDetailViewModel | null = null;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    console.log('🔍 Buscando usuario con ID:', this.id);

    this.loadUserFromAPI();
  }

  /**
   * Carga el usuario desde la API y adapta los datos al formato del template existente
   */
  private loadUserFromAPI(): void {
    // Primero buscar en el estado actual del servicio
    const currentUsers = this.userService.users();
    let foundUser = currentUsers.find((user: User) => user.id === this.id);

    if (foundUser) {
      this.user = this.adaptUserData(foundUser);
      console.log('✅ Usuario encontrado en estado actual:', this.user);
    } else {
      // Si no está en el estado actual, cargar más usuarios
      console.log('🔄 Cargando usuarios desde API...');
      this.userService.getUsers(50).subscribe({
        next: (users: User[]) => {
          foundUser = users.find((user: User) => user.id === this.id);
          if (foundUser) {
            this.user = this.adaptUserData(foundUser);
            console.log('✅ Usuario encontrado en API:', this.user);
          } else {
            // Fallback: usar el primer usuario disponible
            if (users.length > 0) {
              this.user = this.adaptUserData(users[0]);
              console.log('⚠️ Usuario no encontrado, usando primer usuario disponible');
            }
          }
        },
        error: (error) => {
          console.error('❌ Error al cargar usuarios:', error);
          // Fallback con datos de ejemplo
          this.user = this.getDefaultUser();
        }
      });
    }
  }  /**
   * Adapta los datos del usuario de la API al formato esperado por el template
   */
  private adaptUserData(apiUser: User): UserDetailViewModel {
    return {
      id: apiUser.id,
      name: apiUser.name,
      email: apiUser.email,
      address: apiUser.address,
      phone: apiUser.phone,
      birthDate: apiUser.birthDate, // Sin formatear, se usará pipe en template
      bio: this.generateBio(apiUser),
      avatar: apiUser.picture,
      contacts: Math.floor(Math.random() * 100) + 10, // Simular contactos
      profileViews: Math.floor(Math.random() * 20) + 1, // Simular visualizaciones
      cats: this.generateCatsData() // Datos de gatos simulados
    };
  }
  /**
   * Genera una bio basada en los datos del usuario
   */
  private generateBio(user: User): string {
    const genderText = user.gender === 'male' ? 'man' : 'woman';
    // La edad se calculará usando el pipe en el template
    return `${genderText} who loves cats & enjoys life. 🐾`;
  }
  /**
   * Genera datos de gatos para mantener la funcionalidad del template
   */
  private generateCatsData(): CatData[] {
    const catNames = ['Whiskers', 'Mittens', 'Shadow', 'Luna', 'Oliver', 'Bella'];
    const catImages = [
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400',
      'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400',
      'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400',
      'https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?w=400'
    ];

    const numCats = Math.floor(Math.random() * 4) + 1; // 1-4 gatos
    const cats: CatData[] = [];

    for (let i = 0; i < numCats; i++) {
      cats.push({
        name: catNames[Math.floor(Math.random() * catNames.length)],
        image: catImages[i % catImages.length]
      });
    }

    return cats;
  }
  /**
   * Datos de usuario por defecto en caso de error
   */
  private getDefaultUser(): UserDetailViewModel {
    return {
      id: 'default',
      name: 'User Not Found',
      email: 'user@example.com',
      address: 'Address not available',
      phone: 'Phone not available',
      birthDate: '1990-01-01T00:00:00Z',
      bio: 'Cat enthusiast & full-time feline cuddler. 🐾',
      avatar: 'profile.jpg',
      contacts: 50,
      profileViews: 3,
      cats: [
        { name: 'Default Cat', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400' }
      ]
    };
  }

  addCatLoverFriend() {
    console.log('Adding cat lover friend for user:', this.user?.name);
  }
}
