const jsfeatService = {
  imageData: null,
  getFilters () {
    const filters = {
      grayscale: this.grayscale,
      gaussian_blur: this.gaussianBlur,
      sobel_derivatives: this.sobelDerivatives,
      canny: this.canny
    }

    return Object.keys(filters)
  },
  _convertU8toImageData (imageData, u8Array) {
    let dataU32 = new Uint32Array(imageData.data.buffer)
    const alpha = (0xff << 24);
    let i = u8Array.cols * u8Array.rows, pix = 0
    while (--i >= 0) {
        pix = u8Array.data[i]
        dataU32[i] = alpha | (pix << 16) | (pix << 8) | pix
    }

    return imageData
  },
  _grayscale () {
    let grayImg = new jsfeat.matrix_t(
      this.imageData.width,
      this.imageData.height,
      jsfeat.U8_t | jsfeat.C1_t
    )
    const code = jsfeat.COLOR_RGBA2GRAY

    jsfeat.imgproc.grayscale(
      this.imageData.data,
      this.imageData.width,
      this.imageData.height,
      grayImg,
      code
    )

    return this._convertU8toImageData(this.imageData, grayImg)
  },
  _gaussianBlur () {

  },
  _sobelDerivatives () {

  },
  _canny () {

  }
}
