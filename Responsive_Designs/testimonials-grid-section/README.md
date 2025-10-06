# Frontend Mentor - Testimonials grid section solution

This is a solution to the [Testimonials grid section challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/testimonials-grid-section-Nnw6J7Un7). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

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

- View the optimal layout for the site depending on their device's screen size

### Screenshot

![](./preview.jpg)

### Links

- Solution URL: [Testimonials Grid Section using CSS Grid](https://www.frontendmentor.io/solutions/testimonials-grid-section-using-css-grid-b2hBep6Of9)
- Live Site URL: [Add your live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- CSS Grid
- Flexbox
- Mobile-first workflow

### What I learned

This project was excellent practice for complex CSS Grid layouts and responsive design. I focused on creating a clean testimonial grid that adapts beautifully across different screen sizes.

```html
<main class="testimonial-container">
  <div class="testimonial">
    <!-- testimonial content -->
  </div>
</main>
```

```css
.testimonial-container {
  display: grid;
  grid-template-areas: 
    'one one two five'
    'three four four five';
  gap: 1.75rem;
}

.testimonial:nth-child(1) {
  grid-area: one;
}
```

### Continued development
I want to continue exploring advanced CSS Grid patterns and improve my responsive design workflow. I also plan to focus more on accessibility and performance optimization in future projects.

### Author
- Frontend Mentor - [@kpmatlakala](https://www.frontendmentor.io/profile/kpmatlakala)
- GitHub - [@kpmatlakala](https://github.com/kpmatlakala)
