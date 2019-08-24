import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StateService } from '../state.service';

@Component({
  selector: 'app-const-circles',
  templateUrl: './const-circles.component.html',
  styleUrls: ['./const-circles.component.css']
})
export class ConstCirclesComponent implements OnInit {
  constCircles = {
    impedance:  { display: true,  minor: false, },
    admittance: { display: false, minor: false, },
    swr:        { display: false, minor: false, },
    q:          { display: false, minor: false, }
  };

  constructor(private router: Router, private state: StateService) {
    this.constCircles = state.constCircles;
  }

  ngOnInit() {
  }

  public change() {
    this.state.constCircles = this.constCircles;
    this.state.updataVisibility();
  }

  public back() {
    this.router.navigate([ '/main', {
      outlets: { left: [ 'smith' ] }
    }]);
  }
}
