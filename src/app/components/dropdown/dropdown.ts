import { Component, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownService } from './dropdown.service';


@Component({
  selector: 'app-dropdown',
  imports: [CommonModule],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.scss',
})
export class Dropdown {
  @Input() label!: string;
  @Input() required = false;
  @Input() options: string[] = [];
  @Input() selected: string | null = null;
  @Input() disabled: boolean = false;

  @Output() selectedChange = new EventEmitter<string>();

  isOpen = false;

  constructor(private readonly elementRef: ElementRef, private readonly dropdownService: DropdownService) {}

  toggleDropdown(event: Event): void {
    if (this.disabled) return;
    event.stopPropagation();

    if (!this.isOpen) {
      this.dropdownService.register(this);
      this.isOpen = true;
    } else {
      this.dropdownService.unregister(this);
      this.isOpen = false;
    }
  }

  selectOption(option: string): void {
    this.selectedChange.emit(option);
    this.close();
  }

  close(): void {
    this.isOpen = false;
  }

  onOptionClick(event: Event, option: string) {
    event.stopPropagation();
    this.selectOption(option);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.isOpen && !this.elementRef.nativeElement.contains(event.target)) {
      this.dropdownService.unregister(this);
      this.close();
    }
  }
}
