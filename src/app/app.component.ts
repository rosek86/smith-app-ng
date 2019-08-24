import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

import { S1P } from '../../libs/smith/src/SnP';

import { StateService } from './state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(mdIconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
    private state: StateService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    mdIconRegistry.addSvgIcon('series-ind', sanitizer.bypassSecurityTrustResourceUrl('assets/series-ind.svg'));
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
      this.state.addDataSet(values);
    }
  }

  private openFile(file: Blob): Promise<string> {
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
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
