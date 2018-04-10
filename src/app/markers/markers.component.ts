import { Component, OnInit, ViewChild } from '@angular/core';
import { StateService } from '../state.service';
import { MatTableDataSource, MatTable } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { SmithMarkerEvent, SmithEventType } from '../../../libs/smith/src/Smith';
import { S1PEntry } from '../../../libs/smith/src/SnP';

interface Element {
  marker: string;
  impedance: string;
  frequency: string;
}

@Component({
  selector: 'app-markers',
  templateUrl: './markers.component.html',
  styleUrls: ['./markers.component.css']
})
export class MarkersComponent implements OnInit {
  valueName = 'Markers';
  columnsToDisplay = [ 'marker', 'impedance', 'frequency' ];

  data: Element[] = [];

  tableDataSource = new MatTableDataSource(this.data);
  dataSourceInput: DataSource<Element> | Observable<Element[]> | Element[] | null = this.data;

  @ViewChild(MatTable) matTable: MatTable<Element>;

  constructor(private router: Router, private state: StateService) { }

  ngOnInit() {
    this.updateMarkers();

    this.state.smith.setUserActionHandler((evt) => {
      if (evt.type === SmithEventType.Marker) {
        this.updateMarkers();
      }
    });
  }

  private updateMarkers(): void {
    const data: Element[] = [];

    this.state.smith.Datasets.forEach((dataset, datasetNo) => {
      dataset.Markers.forEach((marker, markerNo) => {
        data.push(this.getDataEntry(datasetNo, markerNo, marker.selectedPoint));
      });
    });

    this.data = data;
    this.dataSourceInput = data;

    // this.data[8] = { name: 'Value', value: smith.getReactanceComponentValue(rc, freq) };
  }

  private getDataEntry(datasetNo: number, markerNo: number, entry: S1PEntry): Element {
    const smith = this.state.smith;

    const imp = smith.calcImpedance(entry.point);
    const freq = entry.freq;

    return {
      marker: `${datasetNo + 1}-${markerNo + 1}`,
      impedance: smith.formatComplex(imp, 'Ω'),
      frequency: smith.formatNumber(freq) + 'Hz'
    };
  }

  public selectCursor(): void {
    this.router.navigate([ '/cursor' ]);
  }

  public selectMarkers(): void {
  }
}
