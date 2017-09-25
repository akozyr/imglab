const controller = {
  services: {
    'jsfeat': new JsfeatService
  },
  applyFilters (data, commandLineStr) {
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
      const service = middleware.availableFilters.find(el => el[0] === filter)

      if (!service) {
        alert('"' + filter + '" can not be found.')
        return false
      }

      const serviceTitle = service[1]
      data = this.services[serviceTitle].filters[filter](data)
    })

    return data
  }
}
