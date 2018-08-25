/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/scripts/join.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/scripts/join.js":
/*!*****************************!*\
  !*** ./src/scripts/join.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _stylesheets_join_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../stylesheets/join.scss */ \"./src/stylesheets/join.scss\");\n/* harmony import */ var _stylesheets_join_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylesheets_join_scss__WEBPACK_IMPORTED_MODULE_0__);\n/* eslint-env browser, jquery */\r\n\r\n\r\n\r\n$(() => {\r\n  const checkFieldsetValidity = (step) => {\r\n    const validity = []\r\n    customValidityCheckers.forEach((value, key, map) => {\r\n      validity.push(...joinFormSteps[step].find(key).map(value).get())\r\n    })\r\n    validity.push(...$('input, select, textarea', joinFormSteps[step])\r\n      .map((index, element) => element.checkValidity()).get())\r\n    joinFormSteps[step].addClass('was-validated')\r\n    return validity.every((x) => x)\r\n  }\r\n  const checkID = (callback = (result) => {}) => {\r\n    const username = $('#username').val()\r\n    const result = Object.create(usernameCheckResult)\r\n    if (!username) {\r\n      result.value = username\r\n      result.invalidCause = 'invalid-username'\r\n      callback(result)\r\n    } else {\r\n      $('.last-checked-username').text(username)\r\n      $.getJSON('/account/checkID', { username }, (data) => {\r\n        result.value = data.username\r\n        result.valid = data.isunique\r\n        if (result.valid) {\r\n          result.invalidCause = ''\r\n        } else {\r\n          result.invalidCause = 'username-is-not-unique'\r\n        }\r\n      }).fail(() => {\r\n        result.value = username\r\n        result.valid = false\r\n        result.invalidCause = 'server-cannot-check-username'\r\n      }).always(() => {\r\n        $('.last-checked-username').text(username)\r\n        callback(result)\r\n      })\r\n    }\r\n  }\r\n  const updateJoinFormStep = (step) => {\r\n    $.each(joinFormSteps, (index, value) => {\r\n      value.hide()\r\n    })\r\n    joinFormSteps[step].show()\r\n    $('input', joinFormSteps[step]).first().focus()\r\n  }\r\n  const updateJoinStep = (step) => {\r\n    $.each(joinSteps, (index, value) => {\r\n      value.removeClass('join-step__item--active')\r\n    })\r\n    joinSteps[step].addClass('join-step__item--active')\r\n  }\r\n  const updateMemberCheck = () => {\r\n    if ($('#is-offline-member').prop('checked')) {\r\n      $('#member-application').addClass('text-muted')\r\n      $('#member-application input').prop('disabled', true)\r\n    } else {\r\n      $('#member-application').removeClass('text-muted')\r\n      $('#member-application input').prop('disabled', false)\r\n    }\r\n  }\r\n\r\n  const customValidityCheckers = new Map([\r\n    [$('#member-application input'), (index, element) => {\r\n      if ($('#is-offline-member').prop('checked') || element.value) {\r\n        element.setCustomValidity('')\r\n        return true\r\n      } else {\r\n        element.setCustomValidity('동아리에 가입하려면 이 항목을 입력해야 합니다.')\r\n        return false\r\n      }\r\n    }],\r\n    [$('#username'), (index, element) => {\r\n      $(element).siblings('.valid-feedback, .invalid-feedback').hide()\r\n      if (lastCheckedUsername.valid) {\r\n        $(element).removeClass('is-invalid').addClass('is-valid')\r\n          .siblings('.valid-feedback').show()\r\n        return true\r\n      } else {\r\n        $(element).removeClass('is-valid').addClass('is-invalid')\r\n        $('#' + lastCheckedUsername.invalidCause).show()\r\n        return false\r\n      }\r\n    }],\r\n    [$('#passwordrepeat'), (index, element) => {\r\n      const differentPasswordFeedback = $(element).siblings('.invalid-feedback')\r\n      differentPasswordFeedback.hide()\r\n      if ($('#password').val() === element.value) {\r\n        element.setCustomValidity('')\r\n        return true\r\n      } else {\r\n        differentPasswordFeedback.show()\r\n        element.setCustomValidity('입력하신 비밀번호와 일치하지 않습니다.')\r\n        return false\r\n      }\r\n    }]\r\n  ])\r\n  const joinFormSteps = $('#join-form > .join-form__step')\r\n    .map((index, element) => $(element))\r\n  const joinSteps = $('.join-step > .join-step__item')\r\n    .map((index, element) => $(element))\r\n  const usernameCheckResult = {\r\n    value: '',\r\n    valid: false,\r\n    invalidCause: 'invalid-username'\r\n  }\r\n  let lastCheckedUsername = Object.create(usernameCheckResult)\r\n  let currentStep = 0\r\n\r\n  $('#is-offline-member').change(updateMemberCheck)\r\n  $('#username').focusout(() => { checkID((result) => { lastCheckedUsername = result }) })\r\n  $('.join-form__prev').click((event) => {\r\n    if (currentStep > 0) {\r\n      currentStep--\r\n      joinFormSteps[currentStep].removeClass('was-validated')\r\n      updateJoinFormStep(currentStep)\r\n      updateJoinStep(currentStep)\r\n      if (currentStep !== joinFormSteps.length - 1) {\r\n        $('.join-form__next').show()\r\n        $('.join-form__submit').hide()\r\n      }\r\n      if (currentStep === 0) {\r\n        $('.join-form__prev').prop('disabled', true)\r\n      }\r\n    }\r\n  })\r\n  $('.join-form__next').click((event) => {\r\n    if (checkFieldsetValidity(currentStep) &&\r\n    currentStep < joinFormSteps.length - 1) {\r\n      currentStep++\r\n      updateJoinFormStep(currentStep)\r\n      updateJoinStep(currentStep)\r\n      if (currentStep === joinFormSteps.length - 1) {\r\n        $('.join-form__next').hide()\r\n        $('.join-form__submit').show()\r\n      }\r\n      $('.join-form__prev').prop('disabled', false)\r\n    }\r\n  })\r\n  $('#join-form').submit((event) => {\r\n    if (currentStep === joinFormSteps.length - 1) {\r\n      checkID((result) => {\r\n        lastCheckedUsername = result\r\n        if (checkFieldsetValidity(currentStep)) undefined.submit()\r\n      })\r\n    }\r\n    event.preventDefault()\r\n  })\r\n\r\n  // Initialize view\r\n\r\n  updateMemberCheck()\r\n  $('#tos-agree, #privacy-agree').prop('checked', false)\r\n  $('username').removeClass('is-valid is-invalid')\r\n  $('.join-form__prev').prop('disabled', true)\r\n\r\n  joinFormSteps[currentStep].show()\r\n  $('#join-form').prop('hidden', false)\r\n})\r\n\n\n//# sourceURL=webpack:///./src/scripts/join.js?");

/***/ }),

/***/ "./src/stylesheets/join.scss":
/*!***********************************!*\
  !*** ./src/stylesheets/join.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/stylesheets/join.scss?");

/***/ })

/******/ });