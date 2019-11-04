![Logo of the project](./baukasten.png)

```
INFO --------------------------------------------------------------

We removed CSS Grid!

-----------------------------------------------------------INFO END
```

# Baukasten Grid
## Table of content
* [Intro](#intro)
* [Install Baukasten Grid](#install-baukasten-grid)
* [Basic usage](#basic-usage)
* [Advanced usage](#advanced-usage)
* [Include Media Support](#include-media-support)
* [Available Mixins](#available-mixins)

---

## Intro
**Oh wait, another grid system? Yes!**

* [Demo Flexbox Grid](https://davidhellmann.github.io/baukasten-grid)

---

## Install Baukasten Grid
```
// Nostalgic
npm i baukasten-grid

// Hipster
yarn add baukasten-grid
```

---

## Basic usage
Open your main CSS file and this
```
// Nostalgic
@import '../../../node_modules/baukasten-grid/scss/baukasten-grid';

// Hipster (Webpack)
@import '~baukasten-grid/scss/baukasten-grid';
```

---

## Advanced usage
Your project is so special? No problem!
You can overwrite the default settings map with your own settings.
Add this to your main CSS file before you import `baukasten-grid`
```
// First: you have to add the Map
$bk-grid-settings-custom: (
  // This add some CSS Styleing to the "section", "row" and "col" classes.
  // @Boolean
  // default: false
  testing: false,

  // Naming Conventions? No Problem. You can choose you prefix!
  // @String
  // default: 'o-'
  prefix: 'o-',

  // Units are for Paddings and Margins. All Paddings an Margins are Fluid.
  // That means that on the smallest breakpoint the Padding on each col side
  // is: gutter * gutter-min-factor (8px * 1) and on the biggest breakpoint it
  // is: gutter * gutter-max-factor (8px * 2)
  // For Margins top it is the same with the Vertical factors.
  units: (
    gutter: 8px,
    gutter-min-factor: 1,
    gutter-max-factor: 2,
    gutter-min-vertical-factor: 1,
    gutter-max-vertical-factor: 2
  ),

  // Class Creation
  // Not every projects need all this offset / push / pull classes. You decide!
  // @Boolean
  // default: true
  offset-classes: true,
  push-classes: true,
  pull-classes: true,

  // Disbale Padding Horizontal for Sections. Rows. Cols
  // @Boolean
  // default: false
  disable-padding-horizontal: false,

  // Breakpoints must have at least a "min" and a "max". The other Breakpoints as u like
  // We use all the time "min-width".
  // Cols are how many cols can have a row on that specific breakpoint.
  breakpoints: (
    min: (from: 320px, cols: 6, create-classes: true),
    xs:  (from: 400px, cols: 6, create-classes: true),
    s:   (from: 600px, cols: 12, create-classes: true),
    m:   (from: 800px, cols: 12, create-classes: true),
    l:   (from: 1000px, cols: 24, create-classes: true),
    max: (from: 1440px, cols: 24, create-classes: true)
  )
);
```

---

## Include Media Support
We love to use the Include Media Mixin and we support it.
How? Simple, we map the breakpoints from our settings to the `$breakpoints` map.
Just do that in your `app.scss`:
```
// Imports
// Important to include "Include Media" at this point
// Cause we set the map our Breakpoints to their map $breakpoints
@import '~include-media/dist/include-media';

// Settings
$bk-grid-settings-custom: (
  …
  your settings
  …
);

// Include the grid
@import '~baukasten-grid/scss/baukasten-grid';
```

---

## Available Mixins
### Center
```
@mixin center {
  margin-left: auto;
  margin-right: auto;
}
```

### Fluid Mixin
```
@mixin fluid($min-value, $max-value, $properties: null, $min-vw: $bk-minWidth, $max-vw: $bk-maxWidth) {
  @if ($properties != null) {
    @each $property in $properties {
      #{$property}: $min-value;
    }

    @media screen and (min-width: $min-vw) {
      @each $property in $properties {
        #{$property}: calc(#{$min-value} + #{strip-unit($max-value - $min-value)} * (100vw - #{$min-vw}) / (#{strip-unit($max-vw - $min-vw)}));
      }
    }

    @media screen and (min-width: $max-vw) {
      @each $property in $properties {
        #{$property}: $max-value;
      }
    }
  }
}

// Shorthand Version
@mixin f($args...) {
  @include fluid($args...);
}
```

### Make Col Padding
```
@mixin make-col-padding($factor: 1) {
  $gutterMin: $factor * $bk-gutterMin;
  $gutterMax: $factor * $bk-gutterMax;

  @include f($gutterMin, $gutterMax, padding-left padding-right);
}

// Shorthand Version
@mixin col-padding($args...) {
  @include make-col-padding($args...);
}
```

### Make Col Mixin
```
@mixin make-col($cols: 1, $context: 1, $sassMode: true) {
  // Calculate the Context
  $width: $cols / $context * 100%;

  // Check if SassMode active
  @if $sassMode == false {
    flex: 0 1 $width;
    max-width: $width;
  } @else {
    min-height: 1px;
    flex: 0 1 $width;
    max-width: $width;
  }
}

// Shorthand Version
@mixin col($args...) {
  @include make-col($args...);
}
```

### Make Row Margin
```
@mixin make-row-margin($factor: 1) {
  $factor: $factor * -1;
  $gutterMin: $factor * $bk-gutterMin;
  $gutterMax: $factor * $bk-gutterMax;

  @include f($gutterMin, $gutterMax, margin-left margin-right);
}

// Shorthand Version
@mixin row-margin($args...) {
  @include make-row-margin($args...);
}
```

### Make Row
```
@mixin make-row($cols: 1, $margin: true, $sassMode: true) {
  width: auto;
  @if $margin == true {
    @include make-row-margin();
  }
  @if $sassMode == true {
    flex-flow: row wrap;
    flex: 1 1 0;
  }

  display: flex;
}

// Shorthand Version
@mixin row($args...) {
  @include make-row($args...);
}
```

### Make Section Padding
```
@mixin make-section-padding($factor: 1) {
  @if $factor <= 1 {
    $factor: $factor * 2;
    $gutterMin: $factor * $bk-gutterMinVertical;
    $gutterMax: $factor * $bk-gutterMaxVertical;

    padding-top: 0;
    @include f($gutterMin, $gutterMax, padding-bottom);

  } @else {
    $factor: $factor * 2;
    $gutterMin: $bk-gutterMinVertical;
    $gutterMax: $bk-gutterMaxVertical;

    @include f($gutterMin * ($factor - 2), $gutterMax * ($factor - 2), padding-top);
    @include f($gutterMin * ($factor), $gutterMax * ($factor), padding-bottom);
  }
}

// Shorthand Version
@mixin section-padding($args...) {
  @include make-section-padding($args...);
}
```

### Make Section
```
@mixin make-section($behaviour: 'fixed', $padding: true, $factor: 1) {
  width: 100%;
  max-width: if($behaviour == 'fixed', $bk-maxWidth, none);

  @if $padding == true {
    $factor: $factor * 2;
    $gutterMin: $factor * $bk-gutterMin;
    $gutterMax: $factor * $bk-gutterMax;
    @include f($gutterMin, $gutterMax, padding-left padding-right);
  }
}

// Shorthand Version
@mixin section($args...) {
  @include make-section($args...);
}
```

### Make VR
```
@mixin make-vr($factor: 1) {
  $factor: $factor * 2;
  $gutterMinVertical: $factor * $bk-gutterMinVertical;
  $gutterMaxVertical: $factor * $bk-gutterMaxVertical;

  @include f($gutterMinVertical, $gutterMaxVertical, margin-top);
}

// Shorthand Version
@mixin vr($args...) {
  @include make-vr($args...);
}
```

### Space Mixins
```
@mixin make-space($properties: null, $factor: 1, $direction: 'x') {
  $factor: $factor * 2;
  $gutterMin: $factor * $bk-gutterMin;
  $gutterMax: $factor * $bk-gutterMax;

  @if ($direction != 'x') {
    $gutterMin: $factor * $bk-gutterMinVertical;
    $gutterMax: $factor * $bk-gutterMaxVertical;
  }

  @if ($properties != null) {
    @each $property in $properties {
      @include f($gutterMin, $gutterMax, $property);
    }
  }
}

// Shorthand Version
@mixin space($args...) {
  @include make-space($args...);
}

@mixin spaceX($properties: null, $factor: 1) {
  @include make-space($properties, $factor, 'x');
}

@mixin spaceY($properties: null, $factor: 1) {
  @include make-space($properties, $factor, 'y');
}
```

### Col Offset
```
@mixin make-col-offset($cols: 1, $context: 1, $sassMode: true) {
  $offset: 0;

  // Rounds to integer Numbers
  @if $cols != auto {
    $cols: ceil($cols);

    // Calculate the Context
    $offset: $cols  / $context * 100%;
  }

  // If Cols auto set it to 0
  @if $cols == auto {
    $offset: auto;
    $cols: 0;
  }

  margin-left: $offset;
}

// Shorthand Version
@mixin col-offset($args...) {
  @include make-col-offset($args...);
}
```

### Col Push
```
@mixin make-col-push($cols: 1, $context: 1, $sassMode: true) {
  // Rounds to integer Numbers
  @if $cols != auto {
    $cols: ceil($cols);
  }

  // Calculate the Context
  $offset: $cols  / $context * 100%;
  left: $offset;
}

// Shorthand Version
@mixin col-push($args...) {
  @include make-col-push($args...);
}
```

### Col Pull
```
@mixin make-col-pull($cols: 1, $context: 1, $sassMode: true) {
  // Rounds to integer Numbers
  @if $cols != auto {
    $cols: ceil($cols);
  }

  // Calculate the Context
  $offset: $cols  / $context * 100%;
  right: $offset;
}

// Shorthand Version
@mixin col-pull($args...) {
  @include make-col-pull($args...);
}
```


## Utility Classes
All classes are available for all breakpoints:

```html
<div class="w-24/24">Breakpoint: min</div>
<div class="s:w-12/24">Breakpoint: s</div>
<div class="m:w-8/24">Breakpoint: m</div>
<div class="l:w-6/24">Breakpoint: l</div>
<div class="max:w-3/24">Breakpoint: max</div>
```

### Width Classes

| Class  | Properties |
| :--- | :--- |
| `.w-1/24` | `width: 4.1666666667%;` |
| `.w-2/24` | `width: 8.3333333333%;` |
| `.w-3/24` | `width: 12.5%;` |
| `.w-4/24` | `width: 16.6666666667%;` |
| `.w-5/24` | `width: 20.8333333333%;` |
| `.w-6/24` | `width: 25%;` |
| `.w-7/24` | `width: 29.1666666667%;` |
| `.w-8/24` | `width: 33.3333333333%;` |
| `.w-9/24` | `width: 37.5%;` |
| `.w-10/24` | `width: 41.6666666667%;` |
| `.w-11/24` | `width: 45.8333333333%;` |
| `.w-12/24` | `width: 50%;` |
| `.w-13/24` | `width: 54.1666666667%;` |
| `.w-14/24` | `width: 58.3333333333%;` |
| `.w-15/24` | `width: 62.5%;` |
| `.w-16/24` | `width: 66.6666666667%;` |
| `.w-17/24` | `width: 70.8333333333%;` |
| `.w-18/24` | `width: 75%;` |
| `.w-19/24` | `width: 79.1666666667%;` |
| `.w-20/24` | `width: 83.3333333333%;` |
| `.w-21/24` | `width: 87.5%;` |
| `.w-22/24` | `width: 91.6666666667%;` |
| `.w-23/24` | `width: 95.8333333333%;` |
| `.w-24/24` | `width: 100%;` |


.w-1\/24 {
    width: 4.1666666667%;
  }
