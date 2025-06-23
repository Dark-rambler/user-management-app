import { Component, ViewChild, AfterViewInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
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

  @Input() users: User[] = [];
  @Input() loading: boolean = false;
  @Input() error: string | null = null;
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 5;
  @Input() totalUsers: number = 0;

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() refresh = new EventEmitter<void>();  public displayedColumns: string[] = ['id', 'fullName', 'email', 'address', 'phone', 'birthDate', 'actions'];
  public dataSource = new MatTableDataSource<User>([]);

  constructor(private router: Router) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['users'] && this.users) {
      this.dataSource.data = this.users;
    }
  }

  public ngAfterViewInit() {
    this.dataSource.sortingDataAccessor = (data: User, sortHeaderId: string) => {
      switch (sortHeaderId) {
        case 'fullName': return data.name;
        case 'id': return data.id;
        case 'email': return data.email;
        case 'address': return data.address;
        case 'phone': return data.phone;
        case 'birthDate': return new Date(data.birthDate).getTime();
        default: return (data as any)[sortHeaderId];
      }    };

    this.dataSource.sort = this.sort;
  }

  public onPageEvent(event: PageEvent): void {
    if (event.pageSize !== this.pageSize) {
      this.pageSizeChange.emit(event.pageSize);
    }

    const newPage = event.pageIndex + 1;    if (newPage !== this.currentPage) {
      this.pageChange.emit(newPage);
    }
  }
  public onSearchClick(searchTerm: string): void {
    this.dataSource.filter = searchTerm.trim().toLowerCase();
  }

  public onClearSearch(searchInput: HTMLInputElement): void {
    searchInput.value = '';
    this.dataSource.filter = '';
    searchInput.focus();
  }

  public onRefreshData(): void {
    this.refresh.emit();
  }

  public onSelectUser(userId: string): void {
    this.router.navigate(['/app/user', userId]);
  }

}
