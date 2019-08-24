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
    impedance: { display: true, minor: false, },
    admittance: { display: false, minor: false, },
    swr: { display: false },
    q: { display: false }
  };

  constructor(private router: Router, private state: StateService) {
    this.constCircles = state.constCircles;
  }

  ngOnInit() {
  }

  public change() {
    const smith = this.state.smith;

    // smith.ConstImpCircles.visibility(this.constCircles.impedance.display);
    // smith.ConstImpCircles.displayMinor(this.constCircles.impedance.minor);
    // smith.ConstAdmCircles.visibility(this.constCircles.admittance.display);
    // smith.ConstAdmCircles.displayMinor(this.constCircles.admittance.minor);
    // smith.ConstQCircles  .visibility(this.constCircles.q.display);
    // smith.ConstSwrCircles.visibility(this.constCircles.swr.display);
  }

  public back() {
    this.router.navigate([ '/main', {
      outlets: { 'left': [ 'smith' ] }
    }]);
  }
}
