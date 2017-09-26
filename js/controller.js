class Controller
{
  constructor (middleware) {
    this.middleware = middleware
  }

  applyFilters (data, commandLineStr) {
    const filtersSequence = this._parseCommandLineStr(commandLineStr)
    data = this._processData(data, filtersSequence)

    return data
  }

  _parseCommandLineStr (str) {
    const DELIMITER = ';'

    let filtersSequence = str.split(DELIMITER)
    filtersSequence = filtersSequence.map(el => el.trim())

    return filtersSequence
  }

  _processData (data, filters) {
    filters.forEach(filter => {
      const service = this.middleware.availableFilters.find(el => el[0] === filter)

      if (!service) {
        alert('"' + filter + '" can not be found.')

        return false
      }

      const serviceTitle = service[1]
      const serviceFunction = this.middleware
        .services[serviceTitle]
        .filter(filter)

      data = this.middleware.services[serviceTitle][serviceFunction](data)
    })

    return data
  }
}
