# floating-label

> A floating label plugin written in vanilla javascript

[![Build Status](https://travis-ci.org/datuhealth/floating-label.svg?branch=master)](https://travis-ci.org/datuhealth/floating-label)

floatingLabel.js is a small javascript library to use the [floating label pattern](http://bradfrost.com/blog/post/float-label-pattern/) on your own forms. It's light (1kb minified and gzipped) and [simple](#api) to use.

```shell
npm install floating-label
bower install floatingLabel.js
```

# example

The only markup needed is either an `input` or a `textarea` element, and some sort of element for the label. Since version 2.0, labels _must_ now include the `for` attribute to associate it to an input. Not only is this per the spec & accessible, you can now have inputs without a label, and have the label element somewhere else in the DOM.

```html
<form>
    <label for="input">My descriptive label</label>
    <input type="text" name="input" id="input" placeholder="Your name here">
</form>
```

From there, when you load the page, call the `init` method with an option config.

```javascript
floatingLabel.init({
    floatingClassName: 'custom-class', // defaults to 'floating'
    delegateEvents: true // defaults to false
});
```

If you're running a single page app and need to re-run floatingLabel when a new view is rendered, use `evaluateInputs`

```javascript
floatingLabel.evaluateInputs();
```

# api

## `init( options )`

The init method is a simple function to evaluate all the inputs on a page once the DOM has been loaded. An optional config object can be passed in to set a custom class and whether to delegate events or bind them directly on the inputs themselves.

```javascript
floatingLabel.init({
    floatingClassName: 'custom-class', // defaults to 'floating'
    delegateEvents: true // defaults to false
});
```

## `evaluateInputs()`

The meat an potatoes of floatingLabel is in the evaluateInputs method. This will read the DOM and loop through all input or textarea elements on the page. It will either bind events to each input or delegate the events to the body.

If you have a single page app and need to bind events to a newly rendered view, run eveluateInputs.

```javascript
floatingLabel.evaluateInputs();
```

# contributing

If you would like to contribute, please create a new branch after forking with your changes, then submit a PR to this repo. We use [standard](https://github.com/feross/standard) for our javascript styleguide.

# license

[Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)

Copyright 2015 Datu Health, Inc
