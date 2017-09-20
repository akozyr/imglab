const jsfeatService = {
  imageData: null,
  filters: {},
  getFilters () {
    const filters = {
      grayscale: this.grayscale,
      gaussian_blur: this.gaussianBlur,
      sobel_derivatives: this.sobelDerivatives,
      canny: this.canny
    }

    this.filters = filters

    return Object.keys(this.filters)
  },
  grayscale () {    
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
  gaussianBlur () {
    let bluredImg = new jsfeat.matrix_t(
      this.imageData.width,
      this.imageData.height,
      jsfeat.U8_t | jsfeat.C1_t
    )

    const radius = 2
    const sigma = 0
    const kernelSize = (radius + 1) << 1

    jsfeat.imgproc.gaussian_blur(
      this.imageData.data,
      bluredImg,
      kernelSize,
      sigma
    )

    return this._convertU8toImageData(this.imageData, bluredImg)
  },
  sobelDerivatives () {

  },
  canny () {

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
  }
}
