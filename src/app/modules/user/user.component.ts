import { Component, OnInit, DestroyRef, inject } from '@angular/core';
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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
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
  private destroyRef = inject(DestroyRef);
  public id!: string;
  public user: UserDetailViewModel | null = null;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.loadUserFromAPI();
  }

  private loadUserFromAPI(): void {
    const currentUsers = this.userService.users();
    let foundUser = currentUsers.find((user: User) => user.id === this.id);

    if (foundUser) {
      this.user = this.adaptUserData(foundUser);
    } else {
      this.userService.getUsers(50)
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (users: User[]) => {
          foundUser = users.find((user: User) => user.id === this.id);
          if (foundUser) {
            this.user = this.adaptUserData(foundUser);
          } else {
            if (users.length > 0) {
              this.user = this.adaptUserData(users[0]);
            }
          }
        },
        error: (error) => {
          this.user = this.getDefaultUser();
        }
      });
    }
  }

  private adaptUserData(apiUser: User): UserDetailViewModel {
    return {
      id: apiUser.id,
      name: apiUser.name,
      email: apiUser.email,
      address: apiUser.address,
      phone: apiUser.phone,
      birthDate: apiUser.birthDate,
      bio: this.generateBio(apiUser),
      avatar: apiUser.picture,
      contacts: Math.floor(Math.random() * 100) + 10,
      profileViews: Math.floor(Math.random() * 20) + 1,
      cats: this.generateCatsData()
    };
  }
  private generateBio(user: User): string {
    const genderText = user.gender === 'male' ? 'man' : 'woman';
    return `${genderText} who loves cats & enjoys life. 🐾`;
  }
  private generateCatsData(): CatData[] {
    const catNames = ['Whiskers', 'Mittens', 'Shadow', 'Luna'];
    const catImages = [
      'images/cats/cats.png',
      'images/cats/cats3.png',
      'images/cats/cats2.png',
      'images/cats/cats1.png',
    ];

    const cats: CatData[] = [];

    for (let i = 0; i < catImages.length; i++) {
      cats.push({
        name: catNames[i],
        image: catImages[i]
      });
    }

    return cats;
  }
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
        { name: 'Whiskers', image: 'images/cats/cats.png' },
        { name: 'Mittens', image: 'images/cats/cats3.png' },
        { name: 'Shadow', image: 'images/cats/cats2.png' },
        { name: 'Luna', image: 'images/cats/cats1.png' }
      ]
    };
  }

}
