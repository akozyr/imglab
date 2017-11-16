class ImageProperties
{
  get MAX_COLOR_VALUE() {
    return 256
  }

  getImageHistogramData (imageData) {
    let red = new Array(this.MAX_COLOR_VALUE).fill(0)
    let green = new Array(this.MAX_COLOR_VALUE).fill(0)
    let blue = new Array(this.MAX_COLOR_VALUE).fill(0)

    for (let i = 0; i < imageData.data.length; i += 4) {
      let [r, g, b] = [imageData.data[i], imageData.data[i + 1], imageData.data[i + 2]]

      red[r]++
      green[g]++
      blue[b]++
    }

    const PIXEL_NUMBER = imageData.width * imageData.height
    let redFrequency = [], greenFrequency = [], blueFrequency = []

    for (let i = 0; i < this.MAX_COLOR_VALUE; i++) {
      redFrequency.push(red[i] / PIXEL_NUMBER)
      greenFrequency.push(green[i] / PIXEL_NUMBER)
      blueFrequency.push(blue[i] / PIXEL_NUMBER)
    }

    return [redFrequency, greenFrequency, blueFrequency]
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

    const [redFrequency, greenFrequency, blueFrequency] = this.getImageHistogramData(imageData)

    let entropy = 0.0
    let frequency = 0.0

    for (let i = 0; i < this.MAX_COLOR_VALUE; i++) {
      frequency = (redFrequency[i] + greenFrequency[i] + blueFrequency[i]) / 3
      entropy += frequency * Math.logBase(frequency, 2)
    }

    return -entropy
  }
}
