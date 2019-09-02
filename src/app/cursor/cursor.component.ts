import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';
import { StateService } from '../state.service';
import { SmithCursorEvent, SmithEventType } from '../../../libs/smith/src/Smith';
import { Router } from '@angular/router';

interface Element {
  name: string; value?: string; value2?: string;
}

@Component({
  selector: 'app-cursor',
  templateUrl: './cursor.component.html',
  styleUrls: ['./cursor.component.css']
})
export class CursorComponent implements OnInit {
  valueName = 'Cursor';
  columnsToDisplay = [ 'name', 'value', 'value2' ];

  data: Element[] = [
    { name: 'Γ'                   },
    { name: 'Z [Ω]'               },
    { name: 'Y [mS]'              },
    { name: 'Q'                   },
    { name: 'VSWR'                },
    { name: 'Return Loss [dB]'    },
    { name: 'Mismatch Loss [dB]'  },
    { name: 'dBS [dB]'            },
    { name: 'RFL. COEFF. P'       },
    { name: 'RFL. COEFF. E or I'  },
    { name: 'TRANSM. COEFF. P'    },
  ];

  tableDataSource = new MatTableDataSource(this.data);
  dataSourceInput: DataSource<Element> | Observable<Element[]> | Element[] | null = this.data;

  @ViewChild(MatTable, { static: false }) matTable: MatTable<Element>;

  constructor(private state: StateService) { }

  ngOnInit() {
    if (this.state.smith === null) {
      return;
    }
    this.updateCursor(this.state.smith.CursorData);

    this.state.smith.setUserActionHandler((evt) => {
      if (evt.type === SmithEventType.Cursor) {
        this.updateCursor(evt.data as SmithCursorEvent);
      }
    });
  }

  private updateCursor(evt: SmithCursorEvent): void {
    const smith = this.state.smith;
    const rc = evt.reflectionCoefficient;
    this.data[0].value = smith.formatComplex(rc);
    this.data[1].value = smith.formatComplex(evt.impedance, '');
    this.data[1].value2 = smith.formatComplexPolar(evt.impedance, '');
    this.data[2].value = smith.formatComplex(evt.admittance, '');
    this.data[2].value2 = smith.formatComplexPolar(evt.admittance, '');
    this.data[3].value = `${evt.Q.toFixed(3)}`;
    this.data[4].value = `${evt.swr.toFixed(3)} : 1`;
    this.data[5].value = `${evt.returnLoss.toFixed(3)}`;
    this.data[6].value = `${evt.mismatchLoss.toFixed(3)}`;
    this.data[7].value = evt.dBS.toFixed(3);
    this.data[8].value = evt.rflCoeffP.toFixed(3);
    this.data[9].value = evt.rflCoeffEOrI.toFixed(3);
    this.data[10].value = evt.transmCoeffP.toFixed(3);
  }
}
