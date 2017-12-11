class Controller
{
  constructor () {
    this.preparer = new Preparer()
  }

  applyFilters (data, commandLineStr) {
    const filtersSequence = this._parseCommandLineStr(commandLineStr)
    data = this._processData(data, filtersSequence)

    return data
  }

  showInputImageProperties (data, inputImagePropertiesConfig) {
    // TODO: refactor for multiply image properties
    // it will be some loop for check the whole `imageProperties` object
    if (!inputImagePropertiesConfig.color_histogram) {
      return
    }

    const imageProperties = new ImageProperties()
    const [red, green, blue] = imageProperties.getColorImageHistogramData(data)

    const highchartsService = new HighchartsService()
    highchartsService.drawHistogram(
      'input-image-histogram-r',
      imageProperties.getNormalizedArray(red),
      'red'
    )

    highchartsService.drawHistogram(
      'input-image-histogram-g',
      imageProperties.getNormalizedArray(green),
      'green'
    )

    highchartsService.drawHistogram(
      'input-image-histogram-b',
      imageProperties.getNormalizedArray(blue),
      'blue'
    )

    return {
      entropy: imageProperties.getImageEntropy(data)
    }
  }

  _parseCommandLineStr (str) {
    const DELIMITER = ';'

    let filtersSequence = str.split(DELIMITER)
    filtersSequence = filtersSequence.map(el => el.trim())

    return filtersSequence
  }

  _processData (data, filters) {
    filters.forEach(filter => {
      const service = this.preparer.availableFilters.find(el => el[0] === filter)

      if (!service) {
        alert('"' + filter + '" can not be found.')

        return false
      }

      const serviceTitle = service[1]
      const serviceFunction = this.preparer
        .services[serviceTitle]
        .filter(filter)

      data = this.preparer.services[serviceTitle][serviceFunction](data)
    })

    return data
  }
}
