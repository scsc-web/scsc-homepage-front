/* eslint-env browser, jquery */

import '../stylesheets/about.scss'

$(() => {
  const acronymExpansionList = [
    [
      'Imperatively',
      'INIT:',
      'Innovatively',
      'Irresponsibly'
    ], [
      'Nested',
      'Never-ending',
      'New',
      'Nice',
      'Not',
      'Notorious'
    ], [
      'Independent',
      'Information',
      'INIT',
      'Internet',
      'IO',
      'Iteration'
    ], [
      'Table',
      'Team',
      'Technologies',
      'Tragedy'
    ]
  ]
  const selectedWords = []

  acronymExpansionList.forEach((value, index, array) => {
    selectedWords[index] = value[Math.floor(Math.random() * value.length)]
  })

  $('#acronym-generator').text(selectedWords.join(' ')).removeClass('d-none')
})
