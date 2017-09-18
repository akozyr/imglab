$(document).ready(() => {
  const canvas = $('#canvas')[0]
  const inputImage = $('#input-image')[0]
  const outputImage = $('#output-image')[0]
  const commandLine = $('#command-line-input')[0]

  $('#is-custom-filter-enabled').change((el) => {
    let isChecked = $(el.target).prop("checked")

    if (isChecked) {
      $('#custom-filter-matrix-card').fadeIn('slow')
    } else {
      $('#custom-filter-matrix-card').hide()
    }
  })

  $('#run-button').click(() => {
    const inputImageData = helper.getImageDataFromImage(inputImage, canvas)
    const commandLineStr = $(commandLine).val()

    const outputImageData = controller.applyFilters(inputImageData, commandLineStr)

    helper.insertImageDataToImage(canvas, outputImageData, outputImage)
  })
})
