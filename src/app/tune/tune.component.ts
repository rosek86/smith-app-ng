import { Component, OnInit } from '@angular/core';
import { SmithConstantCircle } from '../../../libs/smith/src/SmithConstantCircle';
import { StateService } from '../state.service';
import { S1P, S1PEntry } from '../../../libs/smith/src/SnP';

@Component({
  selector: 'app-tune',
  templateUrl: './tune.component.html',
  styleUrls: ['./tune.component.css']
})
export class TuneComponent implements OnInit {
  title = 'Tune';

  seriesCap = '0.0';
  shuntCap = '0.0';
  seriesInd = '0.0';
  shuntInd = '0.0';
  seriesRes = '0.0';
  shuntRes = '0.0';

  private calculator = new SmithConstantCircle(50);
  private data: S1P|null = null;

  constructor(private state: StateService) { }

  ngOnInit() {
    if (this.state.dataSets.length === 0) {
      return;
    }

    this.data = this.state.dataSets[0];
  }

  public calculate() {
    if (this.data === null) { return; }

    const data = this.data.map((entry) => {
      if (+this.seriesCap !== 0) { entry = this.addIdealSeriesCap(entry, +this.seriesCap); }
      if (+this.shuntCap  !== 0) { entry = this.addIdealShuntCap (entry, +this.shuntCap);  }
      if (+this.seriesInd !== 0) { entry = this.addIdealSeriesInd(entry, +this.seriesInd); }
      if (+this.shuntInd  !== 0) { entry = this.addIdealShuntInd (entry, +this.shuntInd);  }
      if (+this.seriesRes !== 0) { entry = this.addIdealSeriesRes(entry, +this.seriesRes); }
      if (+this.shuntRes  !== 0) { entry = this.addIdealShuntRes (entry, +this.shuntRes);  }
      return entry;
    });

    this.state.smith.addS1P(data);
  }

  private addIdealSeriesCap(entry: S1PEntry, C: number): S1PEntry {
    const Xc = this.calculator.capacitanceToReactance(C, entry.freq);
    return { freq: entry.freq, point: this.calculator.addImpedance(entry.point, [0, Xc]) };
  }

  private addIdealShuntCap(entry: S1PEntry, C: number): S1PEntry {
    const Xc = this.calculator.capacitanceToReactance(C, entry.freq);
    const Bc = 1 / Xc;
    return { freq: entry.freq, point: this.calculator.addAdmittance(entry.point, [0, Bc]) };
  }

  private addIdealSeriesInd(entry: S1PEntry, L: number): S1PEntry {
    const Xl = this.calculator.inductanceToReactance(L, entry.freq);
    return { freq: entry.freq, point: this.calculator.addImpedance(entry.point, [0, Xl]) };
  }

  private addIdealShuntInd(entry: S1PEntry, L: number): S1PEntry {
    const Xl = this.calculator.inductanceToReactance(L, entry.freq);
    const Bl = 1 / Xl;
    return { freq: entry.freq, point: this.calculator.addAdmittance(entry.point, [0, Bl]) };
  }

  private addIdealSeriesRes(entry: S1PEntry, R: number): S1PEntry {
    return { freq: entry.freq, point: this.calculator.addImpedance(entry.point, [R, 0]) };
  }

  private addIdealShuntRes(entry: S1PEntry, R: number): S1PEntry {
    return { freq: entry.freq, point: this.calculator.addAdmittance(entry.point, [1 / R, 0]) };
  }
}
