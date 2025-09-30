
# 🔍 Project Review: Responsive Profile Card

## 🌟 General Feedback

This is a **good starting point** for a responsive profile card! The structure is clear, and the use of Google Fonts and external stylesheets is well handled. Below is a detailed breakdown of what’s working well and areas for improvement.

---

## ✅ What’s Working Well

- ✅ Proper HTML5 structure (`<!DOCTYPE html>`, `lang="en"`, meta tags).
- ✅ External CSS and Google Fonts are correctly linked.
- ✅ Clear class and ID naming (e.g., `wrapper`, `container`, `info`, `buttons`).
- ✅ Use of `alt` attribute on images.
- ✅ Use of semantic elements like `<h3>` and `<p>` for text content.

---

## 🔧 Suggestions for Improvement

### 1. **Accessibility & Semantics**
- **Use semantic landmarks** like `<main>` for main content instead of generic `<div>`:
  ```html
  <main class="wrapper"> ... </main>
  ```
  This helps screen readers and resolves landmark-related warnings.

- **Replace `id="btn"` with `class="btn"`**: IDs must be unique, and here it's reused across multiple buttons.
  ```html
  <button class="btn">GitHub</button>
  ```

### 2. **Descriptive `alt` Text**
- Update the image's `alt` attribute to be more descriptive:
  ```html
  <img src="images/avatar-jessica.jpeg" alt="Portrait of Jessica Randall">
  ```

### 3. **Use an `<h1>` Heading**
- Add an `<h1>` as the main heading for accessibility and WCAG compliance:
  ```html
  <h1>Jessica Randall</h1>
  ```

### 4. **Use Links for External Buttons**
- If the buttons lead to external sites, use `<a>` tags styled as buttons:
  ```html
  <a href="https://github.com/..." class="btn" target="_blank" rel="noopener">GitHub</a>
  ```

---

## 💡 Bonus Tips

- Consider wrapping the buttons in a `<ul>` list for semantic grouping.
- Add `:focus` and `:hover` styles for better keyboard accessibility.
- Optionally wrap the quote/bio in a `<blockquote>` or add `aria-label` for better screen reader support.

---

Would love to see how the final design turns out! Let me know if you’d like help reviewing the CSS or refactoring the code further. 🎨✨
