import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { CdkTableModule } from '@angular/cdk/table';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatTableModule,
  MatSidenavModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatListModule,
  MatRippleModule,
  MatMenuModule,
  MatIconModule,
  MatButtonToggleModule,
  MatTooltipModule,
  MatTabsModule,
  MatCardModule
} from '@angular/material';

import { StateService } from './state.service';

import { AppComponent } from './app.component';
import { CursorComponent } from './cursor/cursor.component';
import { MarkersComponent } from './markers/markers.component';
import { ConstCirclesComponent } from './const-circles/const-circles.component';
import { MarkerDetailsComponent } from './marker-details/marker-details.component';
import { PlotComponent } from './plot/plot.component';
import { MainComponent } from './main/main.component';
import { SmithComponent } from './smith/smith.component';

const routes: Routes = [
  { path: '', redirectTo: '/main/(left:smith//right:cursor)', pathMatch: 'full' },
  { path: 'main', component: MainComponent, children: [
    { path: 'plot',                     component: PlotComponent,         outlet: 'left'  },
    { path: 'smith',                    component: SmithComponent,        outlet: 'left'  },
    { path: 'smith-settings',           component: ConstCirclesComponent, outlet: 'left'  },

    { path: 'cursor',                   component: CursorComponent,       outlet: 'right' },
    { path: 'markers',                  component: MarkersComponent,      outlet: 'right' },
    { path: 'marker/:dataset/:marker',  component: MarkerDetailsComponent, outlet: 'right' },
  ]},
  { path: '**', redirectTo: '/main/(left:smith//right:cursor)' },
];

@NgModule({
  declarations: [
    AppComponent,
    CursorComponent,
    MarkersComponent,
    ConstCirclesComponent,
    MarkerDetailsComponent,
    PlotComponent,
    MainComponent,
    SmithComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(routes, { enableTracing: false }),
    HttpClientModule,
    ReactiveFormsModule,
    LayoutModule,
    CdkTableModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatTableModule,
    MatSidenavModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatListModule,
    MatRippleModule,
    MatMenuModule,
    MatIconModule,
    MatButtonToggleModule,
    MatTooltipModule,
    MatTabsModule,
    MatCardModule
  ],
  exports: [RouterModule],
  providers: [StateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
