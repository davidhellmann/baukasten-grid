![Logo of the project](./baukasten.png)

# Baukasten Grid

**Oh wait, another grid system? Yes!**

* [Demo CSS Grid](https://davidhellmann.github.io/baukasten-grid/)
* [Demo Flexbox Grid](https://davidhellmann.github.io/baukasten-grid/flexbox-grid.html)
* [Demo CSS Grid + Fallback](https://davidhellmann.github.io/baukasten-grid/fallbackgrid.html)

## How to use that fancy grid…

### Install Baukasten Grid
```
// Nostalgic
npm i baukaten-grid

// Hipster
yarn add baukasten-grid
```

### Basic usage
Open your main CSS file and this

```
// Nostalgic
@import '../../../node_modules/baukasten-grid/scss/baukasten-grid';

// Hipster (Webpack)
@import '~baukasten-grid/scss/baukasten-grid';
```

### Advanced usage
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

  // Breakpoints must have at least a "min" and a "max". The other Breakpoints as u like
  // We use all the time "min-width".
  // Cols are how many cols can have a row on that specific breakpoint.
  breakpoints: (
    min: (from: 320px, to: 399px, cols: 6),
    xs:  (from: 400px, to: 599px, cols: 6),
    s:   (from: 600px, to: 799px, cols: 12),
    m:   (from: 800px, to: 999px, cols: 12),
    l:   (from: 1000px, to: 1439px, cols: 24),
    max: (from: 1440px, to: 0, cols: 24)
  )
);
```
