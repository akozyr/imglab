class AbstractImageProcessingService
{
  constructor () {
    this.METHOD_SUFFIX = 'Filter'
  }

  getServiceFilters () {
    const mask = new RegExp('^[a-zA-Z]+' + this.METHOD_SUFFIX + '$')
    let filters = Object.getOwnPropertyNames(this.constructor.prototype)
      .filter(el => mask.test(el))

    filters = filters.map(classMethod => {
      return classMethod
        .replace(this.METHOD_SUFFIX, '')
        .replace(/([A-Z])/g, $1 => "_" + $1.toLowerCase())
    })

    return filters
  }

  filter (title) {
    return title.replace(
      /(\_[a-z])/g,
      $1 => $1.toUpperCase().replace('_','')
    ) + this.METHOD_SUFFIX
  }
}
