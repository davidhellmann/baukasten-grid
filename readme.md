![Logo of the project](./baukasten.png)

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

* [Demo CSS Grid](https://davidhellmann.github.io/baukasten-grid/)
* [Demo Flexbox Grid](https://davidhellmann.github.io/baukasten-grid/flexbox-grid.html)
* [Demo CSS Grid + Fallback](https://davidhellmann.github.io/baukasten-grid/fallbackgrid.html)

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
  // You want to use CSS Grid?
  // @Boolean
  // default: true
  cssgrid: true,

  // Your Project must support older browsers? No Problem, we've a Fallback (flexbox) here!
  // @Boolean
  // default: true
  cssgrid-fallback: true,

  // You want to use Flexbox only? Also no Problem! But you must set the "cssgrid-fallback" and "cssgrid" to false.
  // @Boolean
  // default: false
  flexboxgrid: false,

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
  // default: false
  offset-classes: false,
  push-classes: false,
  pull-classes: false,

  // Disbale Padding Horizontal for Sections. Rows. Cols
  // @Boolean
  // default: false
  disable-padding-horizontal: false,

  // Breakpoints must have at least a "min" and a "max". The other Breakpoints as u like
  // We use all the time "min-width".
  // Cols are how many cols can have a row on that specific breakpoint.
  breakpoints: (
    min: (from: 320px, cols: 6, create-classes: true),
    xs:  (from: 400px, cols: 6, create-classes: false),
    s:   (from: 600px, cols: 12, create-classes: true),
    m:   (from: 800px, cols: 12, create-classes: false),
    l:   (from: 1000px, cols: 24, create-classes: true),
    max: (from: 1440px, cols: 24, create-classes: false)
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
```

### Make Col Position
```
@mixin col-pos($cols: auto, $context: 1) {
  @if $cols != auto {
    $cols: ceil($cols);
  }

  @if $bk-cssgrid == true {
    grid-column-start: $cols;
  }
}
```

### Make Col Mixin
```
@mixin make-col($cols: 1, $context: 1, $sassMode: true) {
  // Calculate the Context
  $width: $cols / $context * 100%;

  // Check if SassMode active
  @if $sassMode == false  {
    // Set Flexbox Settings when CSS Grid is no active
    @if $bk-cssgrid == false or $bk-cssgrid-fallback == true {
      flex: 0 1 $width;
      max-width: $width;
    }

    // Set CSS Grid Settings
    @if $bk-cssgrid == true {
      @if $bk-cssgrid-fallback == true {
        max-width: none;
      }

      grid-column-end: span ceil($cols);

      @if $bk-cssgrid-fallback == true {
        .use-flexbox > & {
          flex: 0 1 $width;
          max-width: $width;
        }
      }
    }

  } @else {
    // Set Flexbox Settings when CSS Grid is no active
    @if $bk-cssgrid == false {
      min-height: 1px;
      flex: 0 1 $width;
      max-width: $width;
    }

    // Set CSS Grid Settings
    @if $bk-cssgrid == true {
      grid-column-start: auto;
      grid-column-end: span ceil($cols);

      @if $bk-cssgrid-fallback == true {
        .use-flexbox > & {
          flex: 0 1 $width;
          max-width: $width;
        }
      }
    }
  }
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
```

### Make Row
```
@mixin make-row($cols: 1, $sassMode: true) {
  @include make-row-margin();
  @if $sassMode == true {
    @if $bk-cssgrid == false or $bk-cssgrid-fallback == true {
      flex-flow: row wrap;
      flex: 1 1 auto;
    }
  }

  @if $bk-cssgrid == false {
    display: flex;
  }

  @if $bk-cssgrid == true {
    display: grid;
    grid-template-columns: repeat($cols, 1fr);
  }
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
```

### Make Section
```
@mixin make-section($behaviour: 'fixed', $padding: true, $factor: 1) {
  max-width: if($behaviour == 'fixed', $bk-maxWidth, none);
  $factor: $factor * 2;
  $gutterMin: $factor * $bk-gutterMin;
  $gutterMax: $factor * $bk-gutterMax;

  @if $padding == true {
    @include f($gutterMin, $gutterMax, padding-left padding-right);
  }
}
```

### Make VR
```
@mixin make-vr($factor: 1) {
  $factor: $factor * 2;
  $gutterMin: $factor * $bk-gutterMin;
  $gutterMax: $factor * $bk-gutterMax;

  @include f($gutterMin, $gutterMax, margin-top);
}
```

### Col Offset
```
@mixin col-offset($cols: 1, $context: 1, $sassMode: true) {
  // Rounds to integer Numbers
  @if $cols != auto {
    $cols: ceil($cols);
  }

  // Calculate the Context
  $offset: $cols  / $context * 100%;

  @if $sassMode == true {
    @if $bk-cssgrid == false or $bk-cssgrid-fallback == true {
      margin-left: $offset;
    }
  }

  @if $bk-cssgrid == false {
    margin-left: $offset;
  }

  @if $bk-cssgrid == true {
    grid-column-start: $cols + 1;

    @if $bk-cssgrid-fallback == true {
      .use-flexbox > & {
        margin-left: $offset;
      }
    }
  }
}
```

### Col Push
```
@mixin col-push($cols: 1, $context: 1, $sassMode: true) {
  // Rounds to integer Numbers
  @if $cols != auto {
    $cols: ceil($cols);
  }

  // Calculate the Context
  $offset: $cols  / $context * 100%;
  left: $offset;
}
```

### Col Pull
```
@mixin col-pull($cols: 1, $context: 1, $sassMode: true) {
  // Rounds to integer Numbers
  @if $cols != auto {
    $cols: ceil($cols);
  }

  // Calculate the Context
  $offset: $cols  / $context * 100%;

  @if $sassMode == true {
    @if $bk-cssgrid == false or $bk-cssgrid-fallback == true {
      left: -$offset;
    }
  }

  @if $bk-cssgrid == false {
    // Calculate the Context
    left: -$offset;
  }

  @if $bk-cssgrid == true {
    grid-column-start: $cols;
  }
}
```
