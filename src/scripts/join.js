/* eslint-env browser, jquery */

import '../stylesheets/join.scss'

$(() => {
  const checkFieldsetValidity = (step) => {
    const validity = []
    customValidityCheckers.forEach((value, key, map) => {
      validity.push(...joinFormSteps[step].find(key).map(value).get())
    })
    validity.push(...$('input, select, textarea', joinFormSteps[step])
      .map((index, element) => element.checkValidity()).get())
    joinFormSteps[step].addClass('was-validated')
    return validity.every((x) => x)
  }
  const checkID = (callback = (result) => {}) => {
    const username = $('#username').val()
    const result = Object.create(usernameCheckResult)
    if (!username) {
      result.value = username
      result.invalidCause = 'invalid-username'
      callback(result)
    } else {
      $('.last-checked-username').text(username)
      $.getJSON('/account/checkID', { username }, (data) => {
        result.value = data.username
        result.valid = data.isunique
        if (result.valid) {
          result.invalidCause = ''
        } else {
          result.invalidCause = 'username-is-not-unique'
        }
      }).fail(() => {
        result.value = username
        result.valid = false
        result.invalidCause = 'server-cannot-check-username'
      }).always(() => {
        $('.last-checked-username').text(username)
        callback(result)
      })
    }
  }
  const updateJoinFormStep = (step) => {
    $.each(joinFormSteps, (index, value) => {
      value.hide()
    })
    joinFormSteps[step].show()
    $('input', joinFormSteps[step]).first().focus()
  }
  const updateJoinStep = (step) => {
    $.each(joinSteps, (index, value) => {
      value.removeClass('join-step__item--active')
    })
    joinSteps[step].addClass('join-step__item--active')
  }
  const updateMemberCheck = () => {
    if ($('#is-offline-member').prop('checked')) {
      $('#member-application').addClass('text-muted')
      $('#member-application input').prop('disabled', true)
    } else {
      $('#member-application').removeClass('text-muted')
      $('#member-application input').prop('disabled', false)
    }
  }

  const customValidityCheckers = new Map([
    [$('#member-application input'), (index, element) => {
      if ($('#is-offline-member').prop('checked') || element.value) {
        element.setCustomValidity('')
        return true
      } else {
        element.setCustomValidity('동아리에 가입하려면 이 항목을 입력해야 합니다.')
        return false
      }
    }],
    [$('#username'), (index, element) => {
      $(element).siblings('.valid-feedback, .invalid-feedback').hide()
      if (lastCheckedUsername.valid) {
        $(element).removeClass('is-invalid').addClass('is-valid')
          .siblings('.valid-feedback').show()
        return true
      } else {
        $(element).removeClass('is-valid').addClass('is-invalid')
        $('#' + lastCheckedUsername.invalidCause).show()
        return false
      }
    }],
    [$('#passwordrepeat'), (index, element) => {
      const differentPasswordFeedback = $(element).siblings('.invalid-feedback')
      differentPasswordFeedback.hide()
      if ($('#password').val() === element.value) {
        element.setCustomValidity('')
        return true
      } else {
        differentPasswordFeedback.show()
        element.setCustomValidity('입력하신 비밀번호와 일치하지 않습니다.')
        return false
      }
    }]
  ])
  const joinFormSteps = $('#join-form > .join-form__step')
    .map((index, element) => $(element))
  const joinSteps = $('.join-step > .join-step__item')
    .map((index, element) => $(element))
  const usernameCheckResult = {
    value: '',
    valid: false,
    invalidCause: 'invalid-username'
  }
  let lastCheckedUsername = Object.create(usernameCheckResult)
  let currentStep = 0

  $('#is-offline-member').change(updateMemberCheck)
  $('#username').focusout(() => { checkID((result) => { lastCheckedUsername = result }) })
  $('.join-form__prev').click((event) => {
    if (currentStep > 0) {
      currentStep--
      joinFormSteps[currentStep].removeClass('was-validated')
      updateJoinFormStep(currentStep)
      updateJoinStep(currentStep)
      if (currentStep !== joinFormSteps.length - 1) {
        $('.join-form__next').show()
        $('.join-form__submit').hide()
      }
      if (currentStep === 0) {
        $('.join-form__prev').prop('disabled', true)
      }
    }
  })
  $('.join-form__next').click((event) => {
    if (checkFieldsetValidity(currentStep) &&
    currentStep < joinFormSteps.length - 1) {
      currentStep++
      updateJoinFormStep(currentStep)
      updateJoinStep(currentStep)
      if (currentStep === joinFormSteps.length - 1) {
        $('.join-form__next').hide()
        $('.join-form__submit').show()
      }
      $('.join-form__prev').prop('disabled', false)
    }
  })
  $('#join-form').submit((event) => {
    if (currentStep === joinFormSteps.length - 1) {
      checkID((result) => {
        lastCheckedUsername = result
        if (checkFieldsetValidity(currentStep)) this.submit()
      })
    }
    event.preventDefault()
  })

  // Initialize view

  updateMemberCheck()
  $('#tos-agree, #privacy-agree').prop('checked', false)
  $('username').removeClass('is-valid is-invalid')
  $('.join-form__prev').prop('disabled', true)

  joinFormSteps[currentStep].show()
  $('#join-form').prop('hidden', false)
})
