import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StateService } from '../state.service';

import * as d3 from 'd3';

@Component({
  selector: 'app-smith',
  templateUrl: './smith.component.html',
  styleUrls: ['./smith.component.css']
})
export class SmithComponent implements OnInit {
  constructor(private router: Router, private state: StateService) {
  }

  ngOnInit(): void {
    this.state.smith.draw('#smith');
    this.state.updataVisibility();
  }

  edit(): void {
    this.router.navigate(['/main', {
      outlets: { left: [ 'smith-settings' ] }
    }]);
  }
}
