class Middleware
{
  constructor () {
    this.availableFilters = []
    this.services = {
      jsfeat: new JsfeatService()
    }

    this.getAvailableFilters()
  }

  getAvailableFilters () {
    for (let service in this.services) {
      const serviceFilters = this.services[service]
        .getServiceFilters()
        .map(el => [el, service])

      this.availableFilters = this.availableFilters.concat(serviceFilters)
    }
  }

  getImageDataFromImage (image, canvas) {
    let context2d = canvas.getContext('2d')

    let [width, height] = [0, 0]

    canvas.width = width = image.width
    canvas.height = height = image.height

    context2d.drawImage(image, 0, 0, width, height)

    return context2d.getImageData(0, 0, width, height)
  }

  insertImageDataToImage (canvas, data, image) {
      let context2d = canvas.getContext('2d')

      let [width, height] = [0, 0]

      canvas.width = width  = data.width
      canvas.height = height = data.height

      context2d.putImageData(data, 0, 0)

      image.src = canvas.toDataURL()
  }
}
