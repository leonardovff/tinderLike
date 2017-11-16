<div style="text-align: center;">
  <img style="height: 200px; width: 300px; " src="tinderNewLogo.svg">
</div>

# tinderlike

Automatic liker on tinder web

![peek 2017-10-06 06-19](https://user-images.githubusercontent.com/1028425/31271681-c1ca4898-aa5e-11e7-9704-df053707c306.gif)

## Features

* Like or dislike Automatically
* Filter person's based on keywords in bio profile description
* Filter person's based on max distance

## Usage

Run this application directly from your browser's console

### Run

1. Open the browser's console
2. <kbd>CTRL</kbd>+<kbd>C</kbd>  <kbd>CTRL</kbd>+<kbd>V</kbd> code in console
3. With function run (time in milliseconds) and filter array and max distance in km

```js
run(200, ['aquariana', 'batata'], 3)
```

### Stop
```js
stop();
```

### Note about max distance

Sometimes, if you are liked by a person, the distance may be greater than that you set in the app, the distance filter allows you to limit these matchs

## License

This project is licensed under the terms of the [**MIT**](https://opensource.org/licenses/MIT) license.
