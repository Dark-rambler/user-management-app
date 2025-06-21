import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
@Component({
  selector: 'app-table',
  standalone: false,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public showFiller = false;
  public displayedColumns: string[] = ['id', 'fullName', 'email', 'address', 'phone', 'birthDate', 'actions'];
  public users: any[]; // Definir el tipo de datos de los usuarios
  public dataSource
  constructor(private router: Router) {
    this.showFiller = false;
    this.users = [
      {
        id: 1,
        name: 'John Smith',
        email: 'johnsmith@gmail.com',
        address: '1600 Pennsylvania Avenue NW, Washington, DC 20500',
        phone: '(555) 123-4567',
        birthDate: 'March 12, 2023'
      },
      {
        id: 2,
        name: 'Olivia Bennett',
        email: 'ollyben@gmail.com',
        address: '1 Infinite Loop, Cupertino, CA 95014',
        phone: '(555) 123-2121',
        birthDate: 'June 27, 2022'
      },
      {
        id: 3,
        name: 'Daniel Warren',
        email: 'dwarren3@gmail.com',
        address: '350 Fifth Avenue, New York, NY 10118',
        phone: '(555) 123-4777',
        birthDate: 'January 8, 2024'
      },
      {
        id: 4,
        name: 'Chloe Hayes',
        email: 'chloehye@gmail.com',
        address: '1600 Amphitheatre Parkway, Mountain View, CA 94043',
        phone: '(555) 123-6666',
        birthDate: 'October 5, 2021'
      },
      {
        id: 5,
        name: 'Marcus Reed',
        email: 'reeds777@gmail.com',
        address: '4059 Mt Lee Drive, Hollywood, CA 90068',
        phone: '(555) 123-1234',
        birthDate: 'February 19, 2023'
      },
      {
        id: 6,
        name: 'Olivia Bennett',
        email: 'ollyben@gmail.com',
        address: '1 Infinite Loop, Cupertino, CA 95014',
        phone: '(555) 123-2121',
        birthDate: 'June 27, 2022'
      },
      {
        id: 7,
        name: 'Daniel Warren',
        email: 'dwarren3@gmail.com',
        address: '350 Fifth Avenue, New York, NY 10118',
        phone: '(555) 123-4777',
        birthDate: 'January 8, 2024'
      },
      {
        id: 8,
        name: 'Chloe Hayes',
        email: 'chloehye@gmail.com',
        address: '1600 Amphitheatre Parkway, Mountain View, CA 94043',
        phone: '(555) 123-6666',
        birthDate: 'October 5, 2021'
      },
      {
        id: 9,
        name: 'Marcus Reed',
        email: 'reeds777@gmail.com',
        address: '4059 Mt Lee Drive, Hollywood, CA 90068',
        phone: '(555) 123-1234',
        birthDate: 'February 19, 2023'
      }, {
        id: 10,
        name: 'Olivia Bennett',
        email: 'ollyben@gmail.com',
        address: '1 Infinite Loop, Cupertino, CA 95014',
        phone: '(555) 123-2121',
        birthDate: 'June 27, 2022'
      },
      {
        id: 11,
        name: 'Daniel Warren',
        email: 'dwarren3@gmail.com',
        address: '350 Fifth Avenue, New York, NY 10118',
        phone: '(555) 123-4777',
        birthDate: 'January 8, 2024'
      },
      {
        id: 12,
        name: 'Chloe Hayes',
        email: 'chloehye@gmail.com',
        address: '1600 Amphitheatre Parkway, Mountain View, CA 94043',
        phone: '(555) 123-6666',
        birthDate: 'October 5, 2021'
      },
      {
        id: 13,
        name: 'Marcus Reed',
        email: 'reeds777@gmail.com',
        address: '4059 Mt Lee Drive, Hollywood, CA 90068',
        phone: '(555) 123-1234',
        birthDate: 'February 19, 2023'
      }];

    this.dataSource = new MatTableDataSource(this.users);

  }
  ngAfterViewInit() {
    // Conectar paginator y sort al dataSource
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Configurar el ordenamiento personalizado para que 'fullName' ordene por 'name'
    this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string) => {
      switch (sortHeaderId) {
        case 'fullName': return data.name;
        case 'id': return data.name; // Usar name para ordenar por ID también
        default: return data[sortHeaderId];
      }
    };
  }

  public onSelectUser(id: number) {
    this.router.navigate(['/app/user', id]);
  }

  // Datos de usuarios

  // DataSource para la tabla (después de definir users)

}
