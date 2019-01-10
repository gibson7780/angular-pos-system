import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-pos-sidebar',
  templateUrl: './pos-sidebar.component.html',
  styleUrls: ['./pos-sidebar.component.css']
})
export class PosSidebarComponent implements OnInit {

  currentUrl: string;

  constructor(private router: Router) {
    // router.events.subscribe((_: NavigationEnd) => this.currentUrl = _.url)
    router.events.subscribe(_ => {
      if (_ instanceof NavigationEnd) {
        this.currentUrl = _.url;
      }
    });﻿
    // router.events.subscribe( () => this.currentUrl=this.router.url )
  }

  ngOnInit() {
  }

}
