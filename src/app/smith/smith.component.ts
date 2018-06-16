import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Smith } from '../../../libs/smith/src/Smith';
import { StateService } from '../state.service';

@Component({
  selector: 'app-smith',
  templateUrl: './smith.component.html',
  styleUrls: ['./smith.component.css']
})
export class SmithComponent implements OnInit {
  constructor(private router: Router, private state: StateService) {
  }

  ngOnInit(): void {
    this.state.smith.draw('#smith', '100%');

    // if (this.state.dataSets.length > 0) {
    //   this.state.smith.addS1P(this.state.dataSets[0]);
    // }
  }

  edit(): void {
    this.router.navigate(['/main', {
      outlets: { 'left': [ 'smith-settings' ] }
    }]);
  }
}



