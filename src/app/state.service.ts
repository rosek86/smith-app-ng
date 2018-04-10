import { Injectable } from '@angular/core';
import { Smith } from '../../libs/smith/src/Smith';

@Injectable()
export class StateService {
  smith: Smith|null = null;
  constCircles = {
    impedance: { display: true, minor: false, },
    admittance: { display: false, minor: false, },
    swr: { display: false },
    q: { display: false }
  };

  constructor() { }

}
