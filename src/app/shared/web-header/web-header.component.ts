import { Component } from '@angular/core';

@Component({
  selector: 'app-web-header',
  standalone: true,
  imports: [],
  templateUrl: './web-header.component.html',
  styleUrl: './web-header.component.css'
})
export class WebHeaderComponent {
  isMobileMenuOpen = false;
  isSubmenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (!this.isMobileMenuOpen) {
      this.isSubmenuOpen = false;
    }
  }

  toggleSubmenu(event: Event) {
    event.preventDefault();
    if (window.innerWidth <= 768) {
      this.isSubmenuOpen = !this.isSubmenuOpen;
    }
  }
}
