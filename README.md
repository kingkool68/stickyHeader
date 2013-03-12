stickyHeader.js makes table headers stick to the top of the viewport when scrolling down long HTML data tables. Slides for the presentation I gave at the September DC jQuery Meetup can be found at http://www.slideshare.net/kingkool68/stickyheaderjs

Versions for

* jQuery
* Prototype
* Moo Tools
* Dojo Toolkit

To get started just include:

0. stickyHeader.js
0. The two CSS rules to your stylesheet
0. class="stickyHeader" to any table that you want to have a stickyHeader

## CSS Rules

```css
    .hide {
        display:none;
    }
    div.stickyHeader {
        top:0;
        position:fixed;
        _position:absolute;
    }
```

## Demos
* http://dev.kingkool68.com/stickyHeader/jquery.htm
* http://features.pewforum.org/muslim-population/?sort=Pop1990&order=ASC