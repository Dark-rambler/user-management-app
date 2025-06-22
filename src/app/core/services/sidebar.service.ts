import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private _isOpen = signal(false);

  constructor() {
    effect(() => {
      if (this._isOpen()) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
  }

  get isOpen() {
    return this._isOpen.asReadonly();
  }

  toggle() {
    this._isOpen.update(current => !current);
  }

  open() {
    this._isOpen.set(true);
  }

  close() {
    this._isOpen.set(false);
  }
}
