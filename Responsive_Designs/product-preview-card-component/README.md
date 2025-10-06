# Frontend Mentor - Product preview card component solution

This is a solution to the [Product preview card component challenge on Frontend Mentor](https://www.frontendmentor.io/solutions/product-preview-card-component-using-html-and-css-1QZ5Ky36qO). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout depending on their device's screen size
- See hover and focus states for interactive elements

### Screenshot

![](./preview.jpg)

### Links

- Solution URL: [Product preview card component](https://www.frontendmentor.io/solutions/product-preview-card-component-using-html-and-css-1QZ5Ky36qO)
- Live Site URL: [Product preview card component](https://kpm-frontendmentor.vercel.app/Responsive_Designs/product-preview-card-component/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow

### What I learned

This project helped me practice creating a responsive product card component with image switching between mobile and desktop views. I focused on clean layout techniques and interactive button states.

```html
<article class="product-card">
  <div class="product-image">
    <picture>
      <source media="(min-width: 768px)" srcset="./images/image-product-desktop.jpg">
      <img src="./images/image-product-mobile.jpg" alt="Gabrielle Essence Eau De Parfum">
    </picture>
  </div>
  <div class="product-info">
    <h1>Gabrielle Essence Eau De Parfum</h1>
    <p>A floral, solar and voluptuous interpretation...</p>
  </div>
</article>
```


## Author
* Frontend Mentor - [@kpmatlakala](https://www.frontendmentor.io/profile/kpmatlakala)
* GitHub - [@kpmatlakala](https://github.com/kpmatlakala)