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

    let probability = new Array(MAX_COLOR_VALUE).fill(0)
    let entropy = 0.0
    let redProbability, greenProbability, blueProbability

    const PIXEL_NUMBER = imageData.width * imageData.height

    for (let i = 0; i < MAX_COLOR_VALUE; i++) {
      redProbability = red[i] / PIXEL_NUMBER
      greenProbability = green[i] / PIXEL_NUMBER
      blueProbability = blue[i] / PIXEL_NUMBER

      probability[i] = (redProbability + greenProbability + blueProbability) / 3
      entropy += probability[i] * Math.logBase(probability[i], 2)
    }

    return -entropy
  }
}
