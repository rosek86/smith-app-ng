import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Observable ,  Subscription } from 'rxjs';
import { StateService } from '../state.service';
import { SmithMarkerEvent, SmithEventType } from '../../../libs/smith/src/Smith';
import { Router, ActivatedRoute } from '@angular/router';

interface Element {
  name: string; value?: string; value2?: string;
}

@Component({
  selector: 'app-marker-details',
  templateUrl: './marker-details.component.html',
  styleUrls: ['./marker-details.component.css']
})
export class MarkerDetailsComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  private datasetNo = 0;
  private markerNo = 0;

  valueName = 'Marker';
  columnsToDisplay = [ 'name', 'value', 'value2' ];

  data: Element[] = [
    { name: 'Frequency [Hz]'      },
    { name: 'Γ'                   },
    { name: 'Z [Ω]'               },
    { name: 'Y [mS]'              },
    { name: 'Q'                   },
    { name: 'VSWR'                },
    { name: 'Return Loss [dB]'    },
    { name: 'Mismatch Loss [dB]'  },
    { name: 'Component [nF]'      },
  ];

  tableDataSource = new MatTableDataSource(this.data);
  dataSourceInput: DataSource<Element> | Observable<Element[]> | Element[] | null = this.data;

  @ViewChild(MatTable, { static: false }) matTable: MatTable<Element>;

  constructor(private route: ActivatedRoute, private router: Router, private state: StateService) {

  }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe((params) => {
      this.datasetNo = +params.datasetNo || 0;
      this.markerNo  = +params.markerNo  || 0;

      this.valueName = `Marker ${this.datasetNo + 1}-${this.markerNo + 1}`;

      this.updateMarker(this.state.smith.getMarkerData(this.datasetNo, this.markerNo));
    });

    this.state.smith.setUserActionHandler((evt) => {
      if (evt.type !== SmithEventType.Marker) {
        return;
      }
      const data = evt.data as SmithMarkerEvent;
      if (data.datasetNo !== this.datasetNo || data.markerNo !== this.markerNo) {
        return;
      }
      this.updateMarker(data);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private updateMarker(evt: SmithMarkerEvent): void {
    const smith = this.state.smith;
    const rc = evt.reflectionCoefficient;
    const freq = evt.freq;
    this.data[0].value = smith.formatNumber(freq);
    this.data[1].value = smith.formatComplex(rc);
    this.data[2].value = smith.formatComplex(evt.impedance, '');
    this.data[2].value2 = smith.formatComplexPolar(evt.impedance, '');
    this.data[3].value = smith.formatComplex(evt.admittance, '');
    this.data[3].value2 = smith.formatComplexPolar(evt.admittance, '');
    this.data[4].value = `${evt.Q.toFixed(3)}`;
    this.data[5].value = `${evt.swr.toFixed(3)} : 1`;
    this.data[6].value = `${evt.returnLoss.toFixed(3)}`;
    this.data[7].value = `${evt.mismatchLoss.toFixed(3)}`;
    this.data[8].value = smith.getReactanceComponentValue(rc, freq);
  }
}
