import { Component, OnInit } from '@angular/core';
import { testDecortator } from 'src/app/decorators/testDecorators';

/* This super variable allow to load google params */
declare var google : any;

@Component({
  selector: 'app-ad-home',
  templateUrl: './ad-home.component.html',
  styleUrls: ['./ad-home.component.css']
})

export class AdminHomeComponent implements OnInit {

  buttonShow : any;
  buttonHide : any;
  chartOne : any;
  chartTwo : any;
  test : string = '';
  testArr : string[] = [];
  isDisabled : boolean = true;
  input : any;

  ngOnInit() {
    this.loadChart();
    this.setInput();
  }

  setInput() {
    this.input = (<HTMLInputElement>document.querySelector('#test'));
  }

  loadChart() {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart);

    google.charts.load('current', {packages: ['corechart', 'bar']});
    google.charts.setOnLoadCallback(this.drawMultSeries);
  }

  drawChart() {

    google.charts.load('current', { 'packages': ['corechart'] });

    const data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['Work', 10],
      ['Eat', 2],
      ['TV', 2],
      ['Gym', 2],
      ['Sleep', 8]
    ]);

    // Optional; add a title and set the width and height of the chart
    var options = { 'title': 'My Average Day', 'width': 550, 'height': 350 };

    // Display the chart inside the <div> element with id="piechart"
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
  }

  drawMultSeries() {
    var data = new google.visualization.DataTable();
    data.addColumn('timeofday', 'Time of Day');
    data.addColumn('number', 'Motivation Level');
    data.addColumn('number', 'Energy Level');

    data.addRows([
      [{v: [8, 0, 0], f: '8 am'}, 10, 10],
      [{v: [9, 0, 0], f: '9 am'}, 9, 7.5],
      [{v: [10, 0, 0], f:'10 am'}, 8, 5.25],
      [{v: [11, 0, 0], f: '11 am'}, 7, 4],
      [{v: [12, 0, 0], f: '12 pm'}, 5, 3],
      [{v: [13, 0, 0], f: '1 pm'}, 4.5, 2],
      [{v: [14, 0, 0], f: '2 pm'}, 4, 1.5],
      [{v: [15, 0, 0], f: '3 pm'}, 3, 1],
      [{v: [16, 0, 0], f: '4 pm'}, 2, .5],
      [{v: [17, 0, 0], f: '5 pm'}, 1, .25],
    ]);

    var options = { 'title': 'My Average Day', 'width': 550, 'height': 350 }

    var chart = new google.visualization.ColumnChart(
      document.getElementById('chart_div'));

    chart.draw(data, options);
  }

  getColor() {
    let color = 'blue';
    return color;
  }

  checkDisabled() {
    if (this.input.value == '') {
      this.isDisabled = true;
    } else {
      this.isDisabled = false;
    }
  }

  saveInArray() {
    this.testArr.push(this.input.value);
    this.input.value = '';
    this.test = '';
    this.isDisabled = true;
  }

  deleteThis(test) {
    let pos = this.testArr.indexOf(test);
    this.testArr.splice(pos, 1);
  }

  deleteAllTab() {
    let lenght = this.testArr.length;
    this.testArr.splice(0, lenght);
  }

  @testDecortator()
  getTestInConsole() : any {
    let myObject = 'hello world !';
    return myObject;
  }

}
