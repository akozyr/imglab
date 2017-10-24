class HighchartsService
{
  drawHistogram (outputElementId, data) {
    const HISTOGRAM_TITLE = 'Brightness Histogram'
    const Y_AXIS_TITLE = 'Relative Pixels Number'
    const Y_AXIS_MAX = 1
    const AREA_START_POINT = 0
    const AREA_ENABLE_MOUSE_TRACKING = false
    const AREA_LINE_WIDTH = 1
    const SERIES_TITLE = 'USSR/Russia'

    Highcharts.chart(outputElementId, {
      chart: { type: 'area' },
      title: { text: HISTOGRAM_TITLE },
      xAxis: {
        allowDecimals: false,
        labels: {
          formatter () {
            return this.value
          }
        }
      },
      yAxis: {
        title: { text: Y_AXIS_TITLE },
        max: Y_AXIS_MAX,
        labels: {
          formatter () {
            return this.value;
          }
        }
      },
      plotOptions: {
        area: {
          enableMouseTracking: AREA_ENABLE_MOUSE_TRACKING,
          lineWidth: AREA_LINE_WIDTH,
          pointStart: AREA_START_POINT
        }
      },
      series: [
        {
          name: SERIES_TITLE,
          data: data
        }
      ]
    })
  }
}
