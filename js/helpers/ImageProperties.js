class ImageProperties
{
  get MAX_COLOR_VALUE() {
    return 256
  }

  getColorImageHistogramData (imageData) {
    let red = new Array(this.MAX_COLOR_VALUE).fill(0)
    let green = new Array(this.MAX_COLOR_VALUE).fill(0)
    let blue = new Array(this.MAX_COLOR_VALUE).fill(0)

    for (let i = 0; i < imageData.data.length; i += 4) {
      let [r, g, b] = [imageData.data[i], imageData.data[i + 1], imageData.data[i + 2]]

      red[r]++
      green[g]++
      blue[b]++
    }

    return [red, green, blue]
  }

  getNormalizedArray (array) {
    const getMaxOfArray = (array) => Math.max.apply(null, array)
    const MAX_ARRAY_VALUE = getMaxOfArray(array)

    return array.map(el => el / MAX_ARRAY_VALUE)
  }

  // 5.211709716960968 - for flower.bmp
  // 7.009716283345514 - for cameraman.bmp

  getImageEntropy (imageData) {
    Math.logBase = (number, base) => {
      if (number > 0) {
        return Math.log(number) / Math.log(base)
      }

      return 1
    }

    const [red, green, blue] = this.getColorImageHistogramData(imageData)

    const PIXEL_NUMBER = imageData.width * imageData.height
    let entropy = 0.0
    let frequency = 0.0

    let redFrequency, greenFrequency, blueFrequency

    for (let i = 0; i < this.MAX_COLOR_VALUE; i++) {
      redFrequency = red[i] / PIXEL_NUMBER
      greenFrequency = green[i] / PIXEL_NUMBER
      blueFrequency = blue[i] / PIXEL_NUMBER

      frequency = (redFrequency + greenFrequency + blueFrequency) / 3
      entropy += frequency * Math.logBase(frequency, 2)
    }

    return -entropy
  }
}
