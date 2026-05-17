# Frontend Mentor - Article preview component solution

This is a solution to the [Frontend Mentor Article Preview Component Challenge](https://www.frontendmentor.io/challenges/article-preview-component-dYBN_pYFT). Frontend Mentor challenges help improve frontend development skills by building realistic UI components and responsive layouts.

---

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)

---

## Overview

### The challenge

Users should be able to:

- View the optimal layout depending on their device screen size
- See the social media share links when clicking the share button
- Experience different share popup behavior on desktop and mobile layouts

---

### Screenshot

```md
![Project Screenshot](./screenshot.jpg)
```

---

### Links

- Solution URL: Add your Frontend Mentor solution URL here
- Live Site URL: Add your deployed live site URL here

---

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties (variables)
- Flexbox
- Mobile-first workflow
- Vanilla JavaScript
- Responsive design using media queries

---

### What I learned

This project helped reinforce several important frontend concepts:

- Structuring responsive card layouts using Flexbox
- Using CSS variables to create reusable design systems
- Creating different UI behaviors for mobile and desktop
- Working with `position: absolute` and `position: relative`
- Understanding how `overflow: hidden` affects positioned elements
- Toggling UI states using JavaScript and CSS classes

One important thing I learned was how absolute positioning depends on the nearest positioned parent element.

Example:

```css
.card {
  position: relative;
}

.share-popup {
  position: absolute;
  bottom: 0;
  left: 0;
}
```

I also learned that sometimes layout issues are caused by HTML structure rather than only CSS.

---

### Continued development

In future projects, I would like to continue improving my understanding of:

- Responsive UI interactions
- Advanced positioning and layering
- Accessibility improvements
- Cleaner component structure
- CSS animations and transitions
- JavaScript DOM manipulation

I would also like to practice building more interactive components using vanilla JavaScript before moving into larger frameworks.

---

### Useful resources

- [MDN Web Docs](https://developer.mozilla.org) - Helped me better understand CSS positioning and Flexbox.
- [CSS-Tricks Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) - Very useful visual guide for Flexbox layouts.
- [Frontend Mentor Community](https://www.frontendmentor.io/community) - Helpful for seeing how other developers approached similar challenges.

---

### AI Collaboration

AI tools were used as learning assistants during this project.

Tools used:
- ChatGPT

How AI was used:
- Debugging layout and positioning issues
- Understanding responsive popup behavior
- Explaining CSS concepts like positioning contexts and overflow clipping
- Guidance on structuring HTML and CSS more cleanly
- Clarifying mobile vs desktop interaction differences

What worked well:
- Breaking problems into smaller debugging steps
- Explaining the “why” behind layout behavior
- Helping identify structural issues in the component

The project was still manually built and adjusted through experimentation and testing.

---

## Author

- GitHub - 
- Portfolio Website - h
- Frontend Mentor - 