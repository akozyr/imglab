$(document).ready(() => {
  const canvas = $('#canvas')[0]
  const inputImage = $('#input-image')[0]
  const outputImage = $('#output-image')[0]
  const commandLine = $('#command-line-input')[0]
  const filtersList = $('#filters-list')[0]
  const filtersListItem = $(filtersList).find('a')

  const controller = new Controller()

  let showColorHistogram = false

  controller.preparer.availableFilters.forEach(el => {
    filtersListItem.clone().text(el[0]).appendTo(filtersList)
  })
  // remove a default item from the filters list
  filtersListItem.eq(0).remove()

  $('#is-custom-filter-enabled').change((el) => {
    let isChecked = $(el.target).prop("checked")

    if (isChecked) {
      $('#custom-filter-matrix-card').fadeIn('slow')
      return
    }

    $('#custom-filter-matrix-card').hide()
  })

  $('#is-color-histogram-enabled').change(el => {
    showColorHistogram = $(el.target).prop("checked")

    if (showColorHistogram) {
      $('.color-histograms').show()
      return
    }

    $('.color-histograms').hide()
  })

  $('.filters-list-item').click(el => {
    if ($(commandLine).val().length > 0) {
      $(commandLine).val($(commandLine).val() + ';' + $(el.target).text())

      return false
    }
    $(commandLine).val($(el.target).text())
  })

  $('#run-button').click(() => {
    const inputImageData = controller.preparer.getImageDataFromImage(inputImage, canvas)

    const inputImagePropertiesConfig = {
      color_histogram: showColorHistogram
    }

    controller.showInputImageProperties(inputImageData, inputImagePropertiesConfig)

    const commandLineStr = $(commandLine).val()

    const outputImageData = controller.applyFilters(inputImageData, commandLineStr)

    controller.preparer.insertImageDataToImage(canvas, outputImageData, outputImage)
  })
})
