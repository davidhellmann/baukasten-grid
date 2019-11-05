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

---

## Intro
**Oh wait, another grid system? Yes!**
And there are a lot classes they are coming with this grid.

**Utility First Grid**

* [Classes](classes.md)
* [Mixins](mixins.md)
* [Demo](https://davidhellmann.github.io/baukasten-grid)

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
