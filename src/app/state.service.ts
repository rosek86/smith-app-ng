import { Injectable, EventEmitter } from '@angular/core';
import { Smith } from '../../libs/smith/src/Smith';
import { S1P } from '../../libs/smith/src/SnP';

@Injectable()
export class StateService {
  smith = new Smith();

  dataSetAdded = new EventEmitter<S1P>();

  constCircles = {
    impedance:  { display: true,  minor: false, },
    admittance: { display: false, minor: false, },
    swr:        { display: false, minor: false, },
    q:          { display: false, minor: false, },
  };

  readonly dataSets: S1P[] = [];

  constructor() { }

  public addDataSet(data: S1P) {
    this.dataSets.push(data);
    // this.smith.addS1P(data);

    this.dataSetAdded.emit(data);
  }

  public updataVisibility() {
    const smith = this.smith;

    smith.ConstResistance.visibility(this.constCircles.impedance.display);
    smith.ConstResistance.displayMinor(this.constCircles.impedance.minor);
    smith.ConstReactance.visibility(this.constCircles.impedance.display);
    smith.ConstReactance.displayMinor(this.constCircles.impedance.minor);

    smith.ConstConductance.visibility(this.constCircles.admittance.display);
    smith.ConstConductance.displayMinor(this.constCircles.admittance.minor);
    smith.ConstSusceptance.visibility(this.constCircles.admittance.display);
    smith.ConstSusceptance.displayMinor(this.constCircles.admittance.minor);

    smith.ConstQCircles.visibility(this.constCircles.q.display);
    smith.ConstSwrCircles.visibility(this.constCircles.swr.display);
  }
}
