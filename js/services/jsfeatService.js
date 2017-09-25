const JsfeatService = function () {
  const _convertU8toImageData = (imageData, u8Array) => {
    let dataU32 = new Uint32Array(imageData.data.buffer)
    const alpha = (0xff << 24);
    let i = u8Array.cols * u8Array.rows, pix = 0
    while (--i >= 0) {
        pix = u8Array.data[i]
        dataU32[i] = alpha | (pix << 16) | (pix << 8) | pix
    }

    return imageData
  }

<<<<<<< HEAD
  const _convertImageDataToU8 = (imageData) => {
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

=======
>>>>>>> 5e1bce88de125e7285cb5b89ed7dfdcab0ca6233
  const _grayscale = (imageData) => {
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

    return _convertU8toImageData(imageData, grayImg)
  }

  const _gaussianBlur = (imageData) => {
    let bluredImg = new jsfeat.matrix_t(
      imageData.width,
      imageData.height,
      jsfeat.U8_t | jsfeat.C1_t
    )

    const radius = 2
    const sigma = 0
    const kernelSize = (radius + 1) << 1

    jsfeat.imgproc.gaussian_blur(
<<<<<<< HEAD
      _convertImageDataToU8(imageData),
=======
      imageData.data,
>>>>>>> 5e1bce88de125e7285cb5b89ed7dfdcab0ca6233
      bluredImg,
      kernelSize,
      sigma
    )

    return _convertU8toImageData(imageData, bluredImg)
  }

<<<<<<< HEAD
  const _sobelDerivatives = (imageData) => {
    let sobelImg = new jsfeat.matrix_t(
      imageData.width,
      imageData.height,
      jsfeat.U8_t | jsfeat.C1_t
    )

    jsfeat.imgproc.sobel_derivatives(_convertImageDataToU8(imageData), sobelImg)

    return _convertU8toImageData(imageData, sobelImg)
=======
  const _sobelDerivatives = () => {

>>>>>>> 5e1bce88de125e7285cb5b89ed7dfdcab0ca6233
  }

  const _canny = (imageData) => {
    let cannyImg = new jsfeat.matrix_t(
      imageData.width,
      imageData.height,
      jsfeat.U8_t | jsfeat.C1_t
    )

    const lowThreshold = 20
    const highThreshold = 50

    jsfeat.imgproc.canny(
<<<<<<< HEAD
      _convertImageDataToU8(imageData),
=======
      imageData.data,
>>>>>>> 5e1bce88de125e7285cb5b89ed7dfdcab0ca6233
      cannyImg,
      lowThreshold,
      highThreshold
    )

    return _convertU8toImageData(imageData, cannyImg)
  }

  this.filters = {
    grayscale: _grayscale,
    gaussian_blur: _gaussianBlur,
    sobel_derivatives: _sobelDerivatives,
    canny: _canny
  }

  this.getFilters = () => {
    return Object.keys(this.filters)
  }
}
