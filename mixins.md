![Logo of the project](./baukasten.png)

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
@mixin col-padding($factor: 1) {
  $gutterMin: $factor * $bk-gutterMin;
  $gutterMax: $factor * $bk-gutterMax;

  @include f($gutterMin, $gutterMax, padding-left padding-right);
}
```

### Make Col Mixin
```
@mixin col($cols: 1, $context: 1, $sassMode: true) {
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
```

### Make Row Margin
```
@mixin row-margin($factor: 1) {
  $factor: $factor * -1;
  $gutterMin: $factor * $bk-gutterMin;
  $gutterMax: $factor * $bk-gutterMax;

  @include f($gutterMin, $gutterMax, margin-left margin-right);
}
```

### Make Row
```
@mixin row($cols: 1, $margin: true, $sassMode: true) {
  width: auto;
  @if $margin == true {
    @include row-margin();
  }
  @if $sassMode == true {
    flex-flow: row wrap;
    flex: 1 1 0;
  }

  display: flex;
}
```

### Make Section Padding
```
@mixin section-padding($factor: 1) {
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
@mixin section($behaviour: 'fixed', $padding: true, $factor: 1) {
  width: 100%;
  max-width: if($behaviour == 'fixed', $bk-maxWidth, none);

  @if $padding == true {
    $factor: $factor * 2;
    $gutterMin: $factor * $bk-gutterMin;
    $gutterMax: $factor * $bk-gutterMax;
    @include f($gutterMin, $gutterMax, padding-left padding-right);
  }
}
```

### Make VR
```
@mixin vr($factor: 1) {
  $factor: $factor * 2;
  $gutterMinVertical: $factor * $bk-gutterMinVertical;
  $gutterMaxVertical: $factor * $bk-gutterMaxVertical;

  @include f($gutterMinVertical, $gutterMaxVertical, margin-top);
}
```

### Space Mixins
```
@mixin space($properties: null, $factor: 1, $direction: 'x') {
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

@mixin spaceX($properties: null, $factor: 1) {
  @include space($properties, $factor, 'x');
}

@mixin spaceY($properties: null, $factor: 1) {
  @include space($properties, $factor, 'y');
}
```

### Col Offset
```
@mixin col-offset($cols: 1, $context: 1, $sassMode: true) {
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
  right: $offset;
}
```
