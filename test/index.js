var floatingLabel = require('../floatingLabel')
var test = require('tape')

function eventFire (el, evtType) {
  if (el.fireEvent) {
    el.fireEvent('on' + evtType)
  } else {
    var evtObj = document.createEvent('Events')

    evtObj.initEvent(evtType, true, false)
    el.dispatchEvent(evtObj)
  }
}

function setupForm () {
  document.body.innerHTML = [
    '<form method="POST" action="javascript:void(0);" enctype="application/x-www-form-urlencoded">',
    '<div class="initial no-value">',
    '<label for="no-value">No value</label>',
    '<input type="text" name="no-value" id="no-value" placeholder="No value" />',
    '</div>',
    '<div class="initial value">',
    '<label for="value">With value</label>',
    '<input type="text" name="value" id="value" value="With value" />',
    '</div>',
    '<div class="initial no-value textarea">',
    '<label for="no-value-textarea">No value on a textarea</label>',
    '<textarea name="no-value-textarea" id="no-value-textarea" placeholder="No value"></textarea>',
    '</div>',
    '<div class="initial value textarea">',
    '<label for="value-textarea">With value on a textarea</label>',
    '<textarea name="value-textarea" id="value-textarea">With value</textarea>',
    '</div>',
    '<div class="initial no-label">',
    '<input type="text" name="no-label" id="no-label" placeholder="No label">',
    '</div>',
    '<div class="initial no-label textarea">',
    '<textarea name="no-label-textarea" id="no-label-textarea" placeholder="No label"></textarea>',
    '</div>',
    '</form>'
  ].join('')
}

test('a custom floating class can be used', function (t) {
  setupForm()

  floatingLabel.init({
    floatingClassName: 'custom-float'
  })

  var noValueContainer = document.body.querySelector('div.initial.no-value')
  var label = noValueContainer.querySelector('label[for="no-value"]')
  var input = noValueContainer.querySelector('input')

  t.equal(input.value, '', 'there is no default input value')
  t.notOk(label.classList.contains('custom-float'), 'there is no floating class by default')

  input.value = 'With value'

  eventFire(input, 'keyup')

  floatingLabel.evaluateInputs()

  t.equal(input.value, 'With value', 'the new value was set correctly')
  t.ok(label.classList.contains('custom-float'), 'the custom floating class was applied')
  t.end()
})

test('the initial state should not be floating without a value on an input', function (t) {
  setupForm()

  floatingLabel.init({
    floatingClassName: 'floating'
  })

  var noValueContainer = document.querySelector('div.initial.no-value')
  var label = noValueContainer.querySelector('label[for="no-value"]')
  var input = noValueContainer.querySelector('input')

  t.equal(input.value, '', 'there is no initial value')
  t.notOk(label.classList.contains('floating'), 'there shouldn\'t be a floating class')
  t.end()
})

test('the initial state should be floating with an initial value on an input', function (t) {
  setupForm()

  floatingLabel.evaluateInputs()

  var noValueContainer = document.querySelector('div.initial.value')
  var label = noValueContainer.querySelector('label[for="value"]')
  var input = noValueContainer.querySelector('input')

  t.equal(input.value, 'With value', 'there is an initial value on the input')
  t.ok(label.classList.contains('floating'), 'The floating class is on the label')
  t.end()
})

test('the initial state should not be floating without a value on a textarea', function (t) {
  setupForm()

  floatingLabel.evaluateInputs()

  var noValueContainer = document.querySelector('div.initial.no-value.textarea')
  var label = noValueContainer.querySelector('label[for="no-value-textarea"]')
  var input = noValueContainer.querySelector('textarea')

  t.equal(input.value, '', 'There\'s no initial value in the textarea')
  t.notOk(label.classList.contains('floating'), 'The label isn\'t floating')
  t.end()
})

test('the initial state should be floating with an initial value on a textarea', function (t) {
  setupForm()

  floatingLabel.evaluateInputs()

  var noValueContainer = document.querySelector('div.initial.value.textarea')
  var label = noValueContainer.querySelector('label[for="value-textarea"]')
  var input = noValueContainer.querySelector('textarea')

  t.equal(input.value, 'With value', 'There\'s an initial value on the textarea')
  t.ok(label.classList.contains('floating'), 'The label is initialy floating')
  t.end()
})

test('the label should float as text is entered via keyboard', function (t) {
  setupForm()

  floatingLabel.evaluateInputs()

  var noValueContainer = document.querySelector('div.initial.no-value')
  var label = noValueContainer.querySelector('label[for="no-value"]')
  var input = noValueContainer.querySelector('input')

  t.equal(input.value, '', 'There\'s no initial value on the input')
  t.notOk(label.classList.contains('floating'), 'The label isn\'t initially floating')

  input.value = 'New value entered'

  eventFire(input, 'keyup')

  floatingLabel.evaluateInputs()

  t.equal(input.value, 'New value entered', 'The input now has a value')
  t.ok(label.classList.contains('floating'), 'The label is now floating')
  t.end()
})

test('the page should still work if an input has no label', function (t) {
  setupForm()

  floatingLabel.evaluateInputs()

  var noValueContainer = document.querySelector('div.initial.no-label')
  var label = noValueContainer.querySelector('label[for="no-label"]')
  var input = noValueContainer.querySelector('input')

  t.notOk(label, 'There is no label')

  input.value = 'New value entered'

  eventFire(input, 'keyup')

  floatingLabel.evaluateInputs()

  t.end()
})

test('the page should still work if a textarea has no label', function (t) {
  setupForm()

  floatingLabel.evaluateInputs()

  var noValueContainer = document.querySelector('div.initial.no-label.textarea')
  var label = noValueContainer.querySelector('label[for="no-label-textarea"]')
  var input = noValueContainer.querySelector('textarea')

  t.notOk(label, 'There is no label')

  input.value = 'New value entered'

  eventFire(input, 'keyup')

  floatingLabel.evaluateInputs()

  t.end()
})
