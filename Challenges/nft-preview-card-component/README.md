# Frontend Mentor - NFT preview card component solution

This is a solution to the [NFT preview card component challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/nft-preview-card-component-SbdUL_w0U). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

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
- See hover states for interactive elements

### Screenshot

![](./preview.jpg)

### Links

- Solution URL: [Add your solution URL here](https://your-solution-url.com)
- Live Site URL: [Add your live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow

### What I learned

This project was great practice for creating interactive card components with hover effects. I focused on building a clean NFT preview card with proper image overlays and smooth transitions.

```html
<article class="nft-card">
  <div class="image-container">
    <img src="images/image-equilibrium.jpg" alt="Equilibrium NFT">
    <div class="overlay">
      <img src="images/icon-view.svg" alt="View icon">
    </div>
  </div>
  <h1>Equilibrium #3429</h1>
  <p>Our Equilibrium collection promotes balance and calm.</p>
</article>
```

```css
.image-container {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: hsl(178, 100%, 50%, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-container:hover .overlay {
  opacity: 1;
}
```

### Continued development
I want to continue improving my CSS skills with more complex hover interactions and explore CSS Grid for card layouts. I also plan to focus on better accessibility practices for interactive elements.

### Author
- Frontend Mentor - [@kpmatlakala](https://www.frontendmentor.io/profile/kpmatlakala)
- GitHub - [@kpmatlakala](https://github.com/kpmatlakala)
