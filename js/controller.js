const controller = {
  services: {
    'jsfeat': jsfeatService
  },
  applyFilters (data, commandLineStr) {
    jsfeatService.imageData = data

    // data = jsfeatService.grayscale()

    const filtersSequence = this.parseCommandLineStr(commandLineStr)
    data = this.processData(data, filtersSequence)

    return data
  },
  parseCommandLineStr (str) {
    const DELIMITER = ';'

    let filtersSequence = str.split(DELIMITER)
    filtersSequence = filtersSequence.map(el => el.trim())

    return filtersSequence
  },
  processData (data, filters) {
    filters.forEach(filter => {
      let serviceTitle = middleware.availableFilters.find(el => el[0] === filter)

      services[serviceTitle].imageData = data
      data = services[serviceTitle][filter]()
    })

    return data
  }
}
