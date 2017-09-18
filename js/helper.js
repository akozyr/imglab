function getImageDataFromImage(image, canvas)
{
  let context2d = canvas.getContext('2d')

  let [width, height] = [0, 0]

  canvas.width = width = image.width
  canvas.height = height = image.height

  context2d.drawImage(image, 0, 0, width, height)

  return context2d.getImageData(0, 0, width, height)
}
