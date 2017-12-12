class HighchartsService
{
  constructor () {
    this.yAxisTitle = 'Relative Pixels Number'
    this.yAxisMax = 1
    this.areaStartPoint = 0
    this.areaEnableMouseTracking = false
    this.areaLineWidth = 1
  }

  getColorCode (color) {
    const AVAILABLE_COLORS = {
      red: '#ED561B',
      green: '#64E572',
      blue: '#058DC7'
    }

    if (!Object.keys(AVAILABLE_COLORS).includes(color)) {
      return ''
    }

    return AVAILABLE_COLORS[color]
  }

  getSeriesTitle (colorTitle) {
    const channel = colorTitle.substring(0, 1).toUpperCase();

    return `${channel}-channel`
  }

  getHistogramTitle (color) {
    return `Brightness Histogram of ${this.getSeriesTitle(color)}`
  }

  drawHistogram (outputElementId, data, color) {
    Highcharts.chart(outputElementId, {
      chart: { type: 'area' },
      colors: [this.getColorCode(color)],
      title: { text: this.getHistogramTitle(color) },
      xAxis: {
        allowDecimals: false,
        labels: {
          formatter () {
            return this.value
          }
        }
      },
      yAxis: {
        title: { text: this.yAxisTitle },
        max: this.yAxisMax,
        labels: {
          formatter () {
            return this.value;
          }
        }
      },
      plotOptions: {
        area: {
          enableMouseTracking: this.areaEnableMouseTracking,
          lineWidth: this.areaLineWidth,
          pointStart: this.areaStartPoint
        }
      },
      series: [
        {
          name: this.getSeriesTitle(color),
          data: data
        }
      ]
    })
  }

  drawDiagram (outputElementId, series) {
    Highcharts.chart(outputElementId, {
        chart: { type: 'column' },
        title: { text: 'Relative entropy diagram' },
        xAxis: { type: 'category' },
        yAxis: {
            title: { text: 'Relative entropy value' }
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}%'
                }
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b><br/>'
        },
        series: series
    });
  }
}
