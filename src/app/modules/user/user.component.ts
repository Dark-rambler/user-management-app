import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
    MatInputModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export default class UserComponent implements OnInit {
  id!: string;
  user: any;

  // Datos de ejemplo - en una app real vendrían de un servicio
  users = [
    {
      id: 1,
      name: 'Alexander',
      email: 'john.smith@gmail.com',
      address: '1600 Pennsylvania Avenue NW, Washington, DC 20500',
      phone: '(555) 123-4567',
      birthDate: 'March 12, 2023',
      bio: 'Cat enthusiast & full-time feline cuddler. 🐾',
      avatar: 'profile.jpg',
      contacts: 50,
      profileViews: 3,
      cats: [
        { name: 'Gibran & Juan', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400' },
        { name: 'Felipe', image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400' },
        { name: 'Sebastian', image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400' },
        { name: 'Juliana & Alejandra', image: 'https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?w=400' }
      ]
    }
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    console.log('ID recibido:', this.id);
    
    // Simular búsqueda del usuario
    this.user = this.users.find(u => u.id.toString() === this.id) || this.users[0];
  }

  addCatLoverFriend() {
    console.log('Adding cat lover friend...');
  }
}
