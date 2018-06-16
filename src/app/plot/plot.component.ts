import { Component, OnInit, OnDestroy } from '@angular/core';
import { StateService } from '../state.service';
import { S1P } from '../../../libs/smith/src/SnP';

import * as d3 from 'd3';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css']
})
export class PlotComponent implements OnInit, OnDestroy {
  plotTitle = 'Magnitude';

  private margin = { top: 20, right: 20, bottom: 50, left: 50 };
  private xAxis: d3.Selection<d3.BaseType, {}, HTMLElement, any>;
  private yAxis: d3.Selection<d3.BaseType, {}, HTMLElement, any>;
  private line: d3.Line<[number, number]>;
  private path: d3.Selection<d3.BaseType, {}, HTMLElement, any>;

  private subscription: Subscription;

  private data = [];

  constructor(private state: StateService) {
    this.subscription =  this.state.dataSetAdded.subscribe({
      next: (data: S1P) => {
        if (this.data.length !== 0) { return; }

        setTimeout(() => {
          this.data = this.calculate(data);
          this.draw();
        }, 0);
      }
    });
  }

  ngOnInit() {
    if (this.state.dataSets.length === 0) {
      return;
    }

    this.data = this.calculate(this.state.dataSets[0]);
    this.draw();
  }

  ngOnDestroy() {
    if (!!this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private calculate(data: S1P): [number, number][] {
    return data.map((e): [number, number] => [
      e.freq,
      20 * Math.log10(Math.sqrt(
        e.point[0] * e.point[0] + e.point[1] * e.point[1]
      ))
    ]);
  }

  private draw() {
    const svg = d3.select('#plot')
      .attr('width', '100%')
      .attr('height', '100%');

    const containerSize = this.getPlotContainerSize();

    const g = svg.append('g').attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    const x = d3.scaleLinear().rangeRound([ 0, containerSize.width ]);
    const y = d3.scaleLinear().rangeRound([ containerSize.height, 0 ]);

    this.line = d3.line();
    this.line
      .x((d) => x(d[0]))
      .y((d) => y(d[1]));

    x.domain(d3.extent(this.data, (d) => d[0]));
    y.domain(d3.extent(this.data, (d) => d[1]));

    this.xAxis = g.append('g');
    this.xAxis
      .attr('transform', `translate(0, ${containerSize.height})`)
      .call(
        d3.axisBottom(x).tickFormat((d: number) => (d / 1e9).toFixed(1))
      )
    .append('text')
      .attr('fill', '#000')
      .attr('x', containerSize.width / 2)
      .attr('y', this.margin.bottom - 10)
      .attr('text-anchor', 'middle')
      .text('Frequency (GHz)');

    this.yAxis = g.append('g');
    this.yAxis
      .call(d3.axisLeft(y))
    .append('text')
      .attr('fill', '#000')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - (this.margin.left - 10))
      .attr('x', 0 - (containerSize.height / 2))
      .attr('dy', '0.71em')
      .attr('text-anchor', 'middle')
      .text('Magnitude (dB)');

    this.path = g.append('path');
    this.path
      .datum(this.data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5)
      .attr('d', this.line);

    d3.select(window).on('resize.updatesvg', this.redraw.bind(this));
  }

  private getPlotContainerSize(): { width: number, height: number } {
    const container = d3.select<HTMLElement, {}>('#plot-container').node();
    const rect = container.getBoundingClientRect();
    const width = rect.width - this.margin.left - this.margin.right;
    const height = rect.height - this.margin.top - this.margin.bottom;
    return { width, height };
  }

  private redraw() {
    const containerSize = this.getPlotContainerSize();

    const x = d3.scaleLinear().rangeRound([0, containerSize.width]);
    const y = d3.scaleLinear().rangeRound([containerSize.height, 0]);

    this.line
      .x((d) => x(d[0]))
      .y((d) => y(d[1]));

    x.domain(d3.extent(this.data, (d) => d[0]));
    y.domain(d3.extent(this.data, (d) => d[1]));

    this.xAxis
      .attr('transform', `translate(0, ${containerSize.height})`)
      .call(
        d3.axisBottom(x).tickFormat((d: number) => (d / 1e9).toFixed(1))
      );

    this.yAxis
      .call(d3.axisLeft(y));

    this.path
      .attr('d', this.line);
  }
}


