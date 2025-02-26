import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ChildrenOutletContexts, Router, RouterOutlet } from '@angular/router';
import { routeTransitionAnimations } from './route-transition-animations';

@Component({
  selector: 'customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  animations: [routeTransitionAnimations]
})
export class CustomerComponent implements OnInit, OnDestroy{

  router = inject(Router)
  contexts = inject(ChildrenOutletContexts)
  navLinks: any[];
  activeLinkIndex = -1;

  constructor() {
    this.navLinks = [
      {
        label: "First",
        link: "./new",
        index: 0
      },
      {
        label: "Second",
        link: "./list",
        index: 1
      },
    ];
  }
  

  ngOnInit(): void {
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && 
      outlet.activatedRouteData && 
      outlet.activatedRouteData['animationState'];
   }


  ngOnDestroy(): void {
  }
}
