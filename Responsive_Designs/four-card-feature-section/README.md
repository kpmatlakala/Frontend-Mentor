# Frontend Mentor - Four card feature section solution

This is a solution to the [Four card feature section challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/four-card-feature-section-weK1eFYK). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

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

- Solution URL: [Four Card Feature Section using CSS Grid](https://www.frontendmentor.io/solutions/four-card-feature-section-using-css-grid-viZcnudZ-b)
- Live Site URL: [Add your live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- CSS Grid
- Flexbox
- Mobile-first workflow

### What I learned

This project helped me practice complex CSS Grid layouts and responsive design. I focused on creating a clean card-based layout that works seamlessly across different screen sizes.

```html
<div class="card">
  <div class="supervisor">
    <div class="small-bar green"></div>
    <h2>Supervisor</h2>
    <p>Monitors activity to identify project roadblocks</p>
    <img src="images/icon-supervisor.svg" alt="Supervisor icon">
  </div>
</div>
```

```css
.card {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  align-items: center;
}

@media (max-width: 768px) {
  .card {
    grid-template-columns: 1fr;
  }
}
```

## Continued development
I want to continue improving my CSS Grid skills and explore more complex responsive layouts. I also plan to focus on better semantic HTML structure and accessibility practices.

## Author
* Frontend Mentor - [@kpmatlakala](https://www.frontendmentor.io/profile/kpmatlakala)
* GitHub - [@kpmatlakala](https://github.com/kpmatlakala)
