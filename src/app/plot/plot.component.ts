import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { StateService } from '../state.service';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css']
})
export class PlotComponent implements OnInit {
  plotTitle = 'Magnitude';

  private margin = { top: 20, right: 20, bottom: 30, left: 50 };
  private xAxis: d3.Selection<d3.BaseType, {}, HTMLElement, any>;
  private yAxis: d3.Selection<d3.BaseType, {}, HTMLElement, any>;
  private line: d3.Line<[number, number]>;
  private path: d3.Selection<d3.BaseType, {}, HTMLElement, any>;

  private data = [ [ 1, 1 ], [ 2, 2 ] ];

  constructor(state: StateService) {
    if (state.dataSets.length === 0) {
      return;
    }

    this.data = state.dataSets[0].map((e) => [
      e.freq, Math.sqrt(e.point[0] * e.point[0] + e.point[1] * e.point[1])
    ]);
  }

  ngOnInit() {
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
      );

    this.yAxis = g.append('g');
    this.yAxis
      .call(d3.axisLeft(y))
    .append('text')
      .attr('fill', '#000')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
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


