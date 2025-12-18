// dropdown.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DropdownService {
  private currentOpenDropdown: any = null;

  register(dropdown: any) {
    if (this.currentOpenDropdown && this.currentOpenDropdown !== dropdown) {
      this.currentOpenDropdown.close();
    }
    this.currentOpenDropdown = dropdown;
  }

  unregister(dropdown: any) {
    if (this.currentOpenDropdown === dropdown) {
      this.currentOpenDropdown = null;
    }
  }

  closeCurrent() {
    if (this.currentOpenDropdown) {
      this.currentOpenDropdown.close();
      this.currentOpenDropdown = null;
    }
  }
}
