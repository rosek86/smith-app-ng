import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
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

const routes: Routes = [
  { path: 'plot', component: PlotComponent },
  { path: 'cursor', component: CursorComponent },
  { path: 'markers', component: MarkersComponent },
  { path: 'const-circles', component: ConstCirclesComponent },
  { path: 'marker/:datasetId/:markerId', component: MarkerDetailsComponent },
  { path: '', redirectTo: '/cursor', pathMatch: 'full' },
  { path: '**', redirectTo: '/cursor', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    CursorComponent,
    MarkersComponent,
    ConstCirclesComponent,
    MarkerDetailsComponent,
    PlotComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(routes, { enableTracing: true }),
    HttpModule,
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
