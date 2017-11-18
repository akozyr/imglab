class TrackingjsService extends AbstractImageProcessingService
{
  sobelFilter (imageData) {
    const result = tracking.Image.sobel(
      imageData.data,
      imageData.width,
      imageData.height
    )

    return this._convertFloat32ArrayToImageData(
      result,
      imageData.width,
      imageData.height
    )
  }

  _convertFloat32ArrayToImageData (float32Array, width, height) {
    return new ImageData(
      new Uint8ClampedArray(float32Array),
      width,
      height
    )
  }
}
