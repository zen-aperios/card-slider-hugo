# card-slider-hugo

Card stack slider script (exact source + uglified build).

## Files

- `card-slider.js` exact source script
- `card-slider.min.js` uglified/minified production script
- `script.js` mirror for pen usage

## Webflow CDN

```html
<script src="https://cdn.jsdelivr.net/gh/zen-aperios/card-slider-hugo@main/card-slider.min.js"></script>
```

## Required Markup Classes

- `#stack`
- `.card-stack-item`
- `.slider-button.right`
- `.slider-button.left`

## Required Libraries

```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/Draggable.min.js"></script>
```

Optional (for momentum throw):

```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/InertiaPlugin.min.js"></script>
```
