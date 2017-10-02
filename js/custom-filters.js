class CustomFilters
{
  // 5.211709716960968 - for flower.bmp
  // 7.009716283345514 - for cameraman.bmp

  getImageEntropy (imageData) {
    const MAX_COLOR_VALUE = 256

    let red = new Array(MAX_COLOR_VALUE).fill(0)
    let green = new Array(MAX_COLOR_VALUE).fill(0)
    let blue = new Array(MAX_COLOR_VALUE).fill(0)

    Math.logBase = (number, base) => {
      if (number > 0) {
        return Math.log(number) / Math.log(base)
      }

      return 1
    }

    for (let i = 0; i < imageData.data.length; i += 4) {
      let [r, g, b] = [imageData.data[i], imageData.data[i + 1], imageData.data[i + 2]]

      red[r]++
      green[g]++
      blue[b]++
    }


    let redFrequency, greenFrequency, blueFrequency
    let entropy = 0.0
    let frequency = 0.0

    const PIXEL_NUMBER = imageData.width * imageData.height

    // TODO: this logic can be refactored:
    // three arrays (red, green, blue) can be merged into single array
    for (let i = 0; i < MAX_COLOR_VALUE; i++) {
      redFrequency = red[i] / PIXEL_NUMBER
      greenFrequency = green[i] / PIXEL_NUMBER
      blueFrequency = blue[i] / PIXEL_NUMBER

      frequency = (redFrequency + greenFrequency + blueFrequency) / 3
      entropy += frequency * Math.logBase(frequency, 2)
    }

    return -entropy
  }
}
