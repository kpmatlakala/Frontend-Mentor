# Frontend Mentor - FX Checker Solution
![Preview](./preview.jpg)
This is my solution to the **FX Checker** challenge on Frontend Mentor. These challenges are a great way to improve front-end development skills by building realistic applications.

---

## Table of Contents

* [Overview](#overview)

  * [The Challenge](#the-challenge)
  * [Screenshot](#screenshot)
  * [Links](#links)
* [My Process](#my-process)

  * [Built With](#built-with)
  * [What I Learned](#what-i-learned)
  * [Continued Development](#continued-development)
  * [Useful Resources](#useful-resources)
  * [AI Collaboration](#ai-collaboration)
* [Author](#author)
* [Acknowledgments](#acknowledgments)

---

# Overview

## The Challenge

Users should be able to:

### 💱 Converter

* Enter an amount to send and see it convert in real time as they type.
* Select both the **send** and **receive** currencies from a searchable currency picker.
* View the live exchange rate for the active currency pair.
* Swap the selected currencies with a single click.
* Favorite the active currency pair.
* Log every completed conversion to a conversion history.

### 🌍 Currency Picker

* Search currencies by code or name.
* Browse currencies grouped into **Popular** and **Other Currencies**.
* View each currency's flag, code, and full name.
* See which currency is currently selected.

### 📈 Live Markets

* View a scrolling ticker of major currency pairs.
* See live exchange rates and 24-hour market movement.

### 📊 Rate History

* Display historical exchange rates using a responsive line and area chart.
* Switch between:

  * 1D
  * 1W
  * 1M
  * 3M
  * 1Y
  * 5Y
* View:

  * Open
  * Last
  * Absolute Change
  * Percentage Change

### 🌐 Compare

* Compare the converted amount against multiple currencies simultaneously.
* Pin or unpin comparison rows.

### ⭐ Favorites

* Save favorite currency pairs.
* View live rates and daily change.
* Reload any favorite pair into the converter.
* Remove favorites.

### 📝 Conversion Log

* View every conversion with:

  * Relative timestamp
  * Currency pair
  * Sent amount
  * Received amount
* Delete individual entries.
* Clear the entire history.

### ♿ Accessibility

* Fully responsive across mobile, tablet, and desktop.
* Hover and focus states for all interactive elements.
* Complete keyboard navigation.
* Accessible custom controls and dropdowns.

---

## Links

* **Solution URL:** https://www.frontendmentor.io/solutions/fx-checker-live-currency-dashboard-with-react-zustand-and-recharts-kGQIhfEcxZ
* **Live Site:** https://foreign-exchange-checker-nine.vercel.app/

---

# My Process

## Built With

* Semantic HTML5
* Tailwind CSS v4
* CSS Flexbox
* CSS Grid
* Mobile-first workflow
* React
* Vite
* Zustand
* Recharts
* Frankfurter API
* JetBrains Mono

---

# What I Learned

Building this dashboard reinforced several important concepts while also introducing a few new ones.

## State Management with Zustand

Managing application-wide state became significantly simpler with Zustand and its `persist` middleware.

```js
const useFxStore = create(
  persist(
    (set) => ({
      amount: 1000,
      fromCurrency: "USD",
      toCurrency: "EUR",
      favorites: [],
      conversionLog: [],
    }),
    {
      name: "fx-checker-storage",
    }
  )
);
```

---

## Responsive Layouts

Tailwind's responsive utilities made it easy to build layouts that adapt cleanly across screen sizes.

```jsx
<div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
  <div className="w-full sm:flex-1">
    <SendBox />
  </div>

  <SwapButton />

  <div className="w-full sm:flex-1">
    <ReceiveBox />
  </div>
</div>
```

---

## API Integration & Error Handling

Fetching live exchange rates required careful handling of loading, retries, and failed requests.

```js
fetchRates: async () => {
  set({ isLoading: true, error: null });

  try {
    const response = await fetch(
      `https://api.frankfurter.dev/v2/rates?base=${fromCurrency}`
    );

    // Update state...
  } catch (error) {
    set({
      error: error.message,
      isLoading: false,
    });
  }
};
```

---

## Accessible Custom Dropdown

The searchable currency picker was one of the more interesting components to build. It supports:

* Keyboard navigation
* Search filtering
* Focus management
* Current selection indicators
* Fully accessible interactions

---

## Data Visualization

Using Recharts made it straightforward to build a responsive historical exchange-rate chart with gradient fills and custom tooltips.

```jsx
<AreaChart data={historyData}>
  <defs>
    <linearGradient id="limeGradient">
      <stop offset="5%" stopColor="#CEF739" stopOpacity={0.4} />
      <stop offset="95%" stopColor="#CEF739" stopOpacity={0} />
    </linearGradient>
  </defs>

  <Area
    type="monotone"
    dataKey="rate"
    stroke="#CEF739"
    fill="url(#limeGradient)"
  />
</AreaChart>
```

---

## Persisting Data

Favorites and conversion history are automatically saved using localStorage through Zustand's persistence middleware, allowing the app to retain state across browser refreshes.

---

# Continued Development

Some features I'd like to explore next include:

* Accurate 24-hour market changes using historical API data
* Light mode alongside the existing dark theme
* Keyboard shortcuts (e.g. <kbd>Ctrl/Cmd + K</kbd>)
* CSV export for the conversion history
* URL-based currency pair sharing
* User authentication with cloud-synced favorites and history

---

# Useful Resources

* Frankfurter API Documentation
* Zustand Documentation
* Recharts Documentation
* Tailwind CSS Documentation
* JetBrains Mono

---

# AI Collaboration

I used **Claude (Web)** as a development assistant throughout this project.

It helped with:

* Discussing application architecture
* Evaluating React, Vite, and Zustand
* Scaffolding components
* Debugging API integration
* Improving responsive layouts
* Reviewing accessibility
* Refactoring components
* Suggesting performance improvements

### What Worked Well

Claude was especially useful for brainstorming multiple implementation approaches rather than prescribing a single solution. This made it easier to evaluate trade-offs and choose the approach that best fit the project.

Its assistance during debugging was particularly valuable when working through API integration issues and responsive layout edge cases.

### Challenges

At times, suggested solutions were more complex than necessary. Simplifying those implementations ultimately resulted in cleaner, more maintainable code.

---

# Author

* Website — Kabelo P. Matlakala
* Frontend Mentor — @kpmatlakala
* Github - @kpmatlakala

---

# Acknowledgments

A huge thanks to the **Frontend Mentor** community for creating another excellent challenge.

Special thanks to the teams behind:

* React
* Vite
* Zustand
* Tailwind CSS
* Recharts
* Frankfurter API

Their excellent tooling and documentation made building this project both enjoyable and educational.

---

Built with ❤️ during the **FM30 Hackathon**.

I've just completed a front-end coding challenge from @frontendmentor! 🎉

You can see my solution here: https://www.frontendmentor.io/solutions/fx-checker-live-currency-dashboard-with-react-zustand-and-recharts-kGQIhfEcxZ

Any suggestions on how I can improve are welcome!