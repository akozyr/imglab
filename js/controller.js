const controller = {
  applyFilters (data, commandLineStr) {
    jsfeatService.imageData = data

    data = jsfeatService._grayscale()

    return data
  },
  parseCommandLineStr () {

  }
}
