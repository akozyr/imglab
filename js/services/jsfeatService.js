class JsfeatService extends AbstractService
{
  grayscaleFilter (imageData) {
    let grayImg = new jsfeat.matrix_t(
      imageData.width,
      imageData.height,
      jsfeat.U8_t | jsfeat.C1_t
    )
    const code = jsfeat.COLOR_RGBA2GRAY

    jsfeat.imgproc.grayscale(
      imageData.data,
      imageData.width,
      imageData.height,
      grayImg,
      code
    )

    return this._convertU8toImageData(imageData, grayImg)
  }

  gaussianBlurFilter (imageData) {
    let bluredImg = new jsfeat.matrix_t(
      imageData.width,
      imageData.height,
      jsfeat.U8_t | jsfeat.C1_t
    )

    const radius = 2
    const sigma = 0
    const kernelSize = (radius + 1) << 1
    const sourceMatrix = this._convertImageDataToU8(imageData)

    jsfeat.imgproc.gaussian_blur(
      sourceMatrix,
      bluredImg,
      kernelSize,
      sigma
    )

    return this._convertU8toImageData(imageData, bluredImg)
  }

  sobelDerivativesFilter (imageData) {
    let sobelImg = new jsfeat.matrix_t(
      imageData.width,
      imageData.height,
      jsfeat.U8_t | jsfeat.C1_t
    )

    const sourceMatrix = this._convertImageDataToU8(imageData)

    jsfeat.imgproc.sobel_derivatives(sourceMatrix, sobelImg)

    return this._convertU8toImageData(imageData, sobelImg)
  }

  cannyFilter (imageData) {
    let cannyImg = new jsfeat.matrix_t(
      imageData.width,
      imageData.height,
      jsfeat.U8_t | jsfeat.C1_t
    )

    const lowThreshold = 20
    const highThreshold = 50
    const sourceMatrix = this._convertImageDataToU8(imageData)

    jsfeat.imgproc.canny(
      sourceMatrix,
      cannyImg,
      lowThreshold,
      highThreshold
    )

    return this._convertU8toImageData(imageData, cannyImg)
  }

  _convertU8toImageData (imageData, u8Array) {
    let dataU32 = new Uint32Array(imageData.data.buffer)
    const alpha = (0xff << 24);
    let i = u8Array.cols * u8Array.rows, pix = 0
    while (--i >= 0) {
        pix = u8Array.data[i]
        dataU32[i] = alpha | (pix << 16) | (pix << 8) | pix
    }

    return imageData
  }

  _convertImageDataToU8 (imageData) {
    const buf = new Array(imageData.data.length / 4)
    for (let i = 0, j = 0; i < imageData.data.length; i += 4, ++j) {
      buf[j] = imageData.data[i]
    }

    const mat = new jsfeat.matrix_t(
      imageData.width,
      imageData.height,
      jsfeat.U8C1_t,
      new jsfeat.data_t(imageData.width * imageData.height, buf)
    )

    return mat
  }
}
