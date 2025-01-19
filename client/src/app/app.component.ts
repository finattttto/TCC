import { Component, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: '../styles.scss',
  providers: [MessageService, DialogService, ConfirmationService],
})
export class AppComponent implements OnInit {
  private routeSubscription: Subscription;

  title = 'Jogo Libras';

  dockItens: MenuItem[] = [
    {
      label: 'Início',
      icon: 'https://cdn-icons-png.freepik.com/256/10751/10751558.png?semt=ais_hybrid',
      command: () => {
        this.router.navigateByUrl('');
      },
    },
    {
      label: 'Jogo Letras',
      icon: 'https://cdn-icons-png.flaticon.com/512/7300/7300779.png',
      command: () => {
        this.router.navigateByUrl('/alfabeto-manual');
      },
    },
    {
      label: 'Jogo Memória',
      icon: 'https://cdn-icons-png.flaticon.com/512/6168/6168860.png',
      command: () => {
        this.router.navigateByUrl('/jogo-memoria');
      },
    },
    {
      label: 'Jogo Palavras',
      icon: 'https://cdn-icons-png.flaticon.com/512/8541/8541715.png',
      command: () => {
        this.router.navigateByUrl('jogo-palavra');
      },
    },
    {
      label: 'Jogo Adivinhação',
      icon: 'https://cdn-icons-png.flaticon.com/512/5893/5893002.png',
      command: () => {
        this.router.navigateByUrl('/adivinhacao');
      },
    },
  ];

  allowedRoutes = ['/adivinhacao', '/alfabeto-manual', '/jogo-memoria', '/jogo-palavra', '/'];

  constructor(
    public router: Router,
    private primengConfig: PrimeNGConfig,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;

    this.routeSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.allowedRoutes.includes(event.urlAfterRedirects)) {
          this.renderer.addClass(document.body, 'custom-background');
        } else {
          this.renderer.removeClass(document.body, 'custom-background');
        }
      }
    });
  }

  isDockVisible(): boolean {
    return this.allowedRoutes.includes(this.router.url);
  }
}
