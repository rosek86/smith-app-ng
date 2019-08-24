import { Injectable, EventEmitter } from '@angular/core';
import { Smith } from '../../libs/smith/src/Smith';
import { S1P } from '../../libs/smith/src/SnP';

@Injectable()
export class StateService {
  smith = new Smith();

  dataSetAdded = new EventEmitter<S1P>();

  constCircles = {
    impedance: { display: true, minor: false, },
    admittance: { display: false, minor: false, },
    swr: { display: false },
    q: { display: false }
  };

  readonly dataSets: S1P[] = [];

  constructor() { }

  public addDataSet(data: S1P) {
    this.dataSets.push(data);
    // this.smith.addS1P(data);

    this.dataSetAdded.emit(data);
  }
}
