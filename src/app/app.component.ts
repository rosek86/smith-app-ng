import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';

import { Smith, SmithEvent, SmithEventType, SmithCursorEvent, SmithMarkerEvent } from '../../libs/smith/src/Smith';
import { S1P, S1PEntry } from '../../libs/smith/src/SnP';

import { StateService } from './state.service';
import { SmithConstantCircle } from '../../libs/smith/src/SmithConstantCircle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(private state: StateService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  public async loadData(evt: Event): Promise<void> {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const data = await this.openFile(input.files[0]);
      const values = this.parseTouchstone(data);

      // const calculator = new SmithConstantCircle(50);
      // .map((entry) => {
      //   const freq = entry.freq;

      //   let [ R, X ] = calculator.denormalize(
      //     calculator.reflectionCoefficientToImpedance(entry.point)
      //   );

      //   const C = 100e-12; // 100 pF
      //   const Xc = calculator.capacitanceToReactance(C, freq);

      //   R += 0;
      //   X += X + Xc;

      //   const point = calculator.impedanceToReflectionCoefficient(
      //     calculator.normalize([ R, X ])
      //   );

      //   return { freq, point };
      // });

      this.state.addDataSet(values);
    }
  }

  private openFile(file: Blob): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsText(file);
    });
  }

  private parseTouchstone(data: string): S1P {
    const values: S1P = [];
    const lines = data.split('\n');

    for (const line of lines) {
      if (line.charAt(0) === '!') { continue; }
      if (line.charAt(0) === '#') { continue; }

      const row = line.trim().split(/ +/g);
      if (row.length !== 3) { continue; }

      const value = row.map((v) => parseFloat(v));

      values.push({
        freq: value[0],
        point: [value[1], value[2]],
      });
    }

    return values;
  }
}
