import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: '../styles.scss',
  // styleUrl: './app.component.scss'
  providers: [MessageService]
})
export class AppComponent implements OnInit {
  title = 'client';
  currentTheme = 'lara-light-blue';

  toggleTheme() {
    const themeLink = document.getElementById('theme-css') as HTMLLinkElement;
    console.log(themeLink);
    if (this.currentTheme === 'nova-dark') {
      this.currentTheme = 'lara-light-blue'; // Muda para tema claro
    } else {
      this.currentTheme = 'nova-dark'; // Muda para tema escuro
    }
    themeLink.href = `node_modules/primeng/resources/themes/${this.currentTheme}/theme.css`;
  }

  items: MenuItem[] = [
    {
      label: 'Home',
      icon: 'https://cdn-icons-png.freepik.com/256/10751/10751558.png?semt=ais_hybrid',
      command: () => {
        this.router.navigateByUrl("");
      }
    },
    {
      label: 'Adivinhação',
      icon: 'https://cdn-icons-png.flaticon.com/512/5893/5893002.png',
      command: () => {
        this.router.navigateByUrl("/adivinhacao");
      }
    },
    {
      label: 'Memória',
      icon: 'https://cdn-icons-png.flaticon.com/512/6168/6168860.png',
      command: () => {
        this.router.navigateByUrl("/jogo-memoria");
      }
    },
    {
      label: 'Ligar',
      icon: 'https://cdn-icons-png.flaticon.com/512/2241/2241387.png',
      command: () => {
        this.router.navigateByUrl("");
      }
    },
    {
      label: 'Ligar',
      icon: 'https://cdn-icons-png.flaticon.com/512/3354/3354973.png',
      command: () => {
        this.router.navigateByUrl("/alfabeto-manual");
      }
    },
  ];

  constructor(public router: Router, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    // this.router.navigateByUrl()
    this.primengConfig.ripple = true;
  }
}
