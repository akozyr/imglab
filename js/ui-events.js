$(document).ready(() => {
  // show Custom Filter Matrix
  $('#is-custom-filter-enabled').change((el) => {
    let isChecked = $(el.target).prop("checked")

    if (isChecked) {
      $('#custom-filter-matrix-card').fadeIn('slow')
    } else {
      $('#custom-filter-matrix-card').hide()
    }
  })

  $('#run-button').click(() => {
    const inputImageData = getImageDataFromImage(
      $('#input-image')[0],
      $('#canvas')[0]
    )
    console.log(inputImageData)
  })
})
