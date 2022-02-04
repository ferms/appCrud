import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public subscriber: Subscription;
  show = true;

  constructor(private router: Router ) {


    this.subscriber = this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe((event) => {
      if (event.url === '/login' || event.url === '/' || event.url === '/change-password'){
        this.show  = false;
      } else {
        this.show = true;
      }
    });

   }

  ngOnInit(): void {
  }

}
