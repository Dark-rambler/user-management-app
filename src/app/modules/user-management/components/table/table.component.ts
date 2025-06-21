import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

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

  constructor() {
    // Initialization logic can go here if needed
    this.showFiller = false;
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


  // Datos de usuarios
  public users = [
    {
      name: 'John Smith',
      email: 'johnsmith@gmail.com',
      address: '1600 Pennsylvania Avenue NW, Washington, DC 20500',
      phone: '(555) 123-4567',
      birthDate: 'March 12, 2023'
    },
    {
      name: 'Olivia Bennett',
      email: 'ollyben@gmail.com',
      address: '1 Infinite Loop, Cupertino, CA 95014',
      phone: '(555) 123-2121',
      birthDate: 'June 27, 2022'
    },
    {
      name: 'Daniel Warren',
      email: 'dwarren3@gmail.com',
      address: '350 Fifth Avenue, New York, NY 10118',
      phone: '(555) 123-4777',
      birthDate: 'January 8, 2024'
    },
    {
      name: 'Chloe Hayes',
      email: 'chloehye@gmail.com',
      address: '1600 Amphitheatre Parkway, Mountain View, CA 94043',
      phone: '(555) 123-6666',
      birthDate: 'October 5, 2021'
    },
    {
      name: 'Marcus Reed',
      email: 'reeds777@gmail.com',
      address: '4059 Mt Lee Drive, Hollywood, CA 90068',
      phone: '(555) 123-1234',
      birthDate: 'February 19, 2023'
    },
    {
      name: 'Olivia Bennett',
      email: 'ollyben@gmail.com',
      address: '1 Infinite Loop, Cupertino, CA 95014',
      phone: '(555) 123-2121',
      birthDate: 'June 27, 2022'
    },
    {
      name: 'Daniel Warren',
      email: 'dwarren3@gmail.com',
      address: '350 Fifth Avenue, New York, NY 10118',
      phone: '(555) 123-4777',
      birthDate: 'January 8, 2024'
    },
    {
      name: 'Chloe Hayes',
      email: 'chloehye@gmail.com',
      address: '1600 Amphitheatre Parkway, Mountain View, CA 94043',
      phone: '(555) 123-6666',
      birthDate: 'October 5, 2021'
    },
    {
      name: 'Marcus Reed',
      email: 'reeds777@gmail.com',
      address: '4059 Mt Lee Drive, Hollywood, CA 90068',
      phone: '(555) 123-1234',
      birthDate: 'February 19, 2023'
    }, {
      name: 'Olivia Bennett',
      email: 'ollyben@gmail.com',
      address: '1 Infinite Loop, Cupertino, CA 95014',
      phone: '(555) 123-2121',
      birthDate: 'June 27, 2022'
    },
    {
      name: 'Daniel Warren',
      email: 'dwarren3@gmail.com',
      address: '350 Fifth Avenue, New York, NY 10118',
      phone: '(555) 123-4777',
      birthDate: 'January 8, 2024'
    },
    {
      name: 'Chloe Hayes',
      email: 'chloehye@gmail.com',
      address: '1600 Amphitheatre Parkway, Mountain View, CA 94043',
      phone: '(555) 123-6666',
      birthDate: 'October 5, 2021'
    },
    {
      name: 'Marcus Reed',
      email: 'reeds777@gmail.com',
      address: '4059 Mt Lee Drive, Hollywood, CA 90068',
      phone: '(555) 123-1234',
      birthDate: 'February 19, 2023'
    }  ];

  // DataSource para la tabla (después de definir users)
  public dataSource = new MatTableDataSource(this.users);

}
