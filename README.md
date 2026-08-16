# Impact Storyboard - Community Media Feed

![Vue.js](https://img.shields.io/badge/Vue%203-Composition%20API-4FC08D?style=flat-square&logo=vue.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4.0-38B2AC?style=flat-square&logo=tailwind-css)
![Deployment](https://img.shields.io/badge/Deployment-GitHub%20Pages-blue?style=flat-square&logo=github)

A responsive, accessible, and performant frontend demonstration built with Vue 3 and Tailwind CSS. This project is specifically designed to showcase modern web development practices tailored for Non-Profit Organizations (NPOs) and community-driven initiatives.

## 🚀 Live Demo
**[View the Live Application Here](https://yangfannbut.github.io/impact-storyboard/)**

*(Note: Deployed automatically via GitHub Actions CI/CD pipeline).*

## 💡 Project Architecture & Philosophy

Since NPOs often require robust yet cost-effective solutions, this project utilizes a **Headless Mock Data Architecture**. 

Instead of hard-coding data into the UI components, the application features a dedicated API service layer (`src/services/api.js`). This layer simulates asynchronous backend requests (complete with network latency and loading states). This design ensures that the frontend is completely decoupled and ready to connect to a real REST API or Headless CMS (like WordPress or Strapi) in the future without rewriting the UI logic.

## ✨ Key Features

- **Inclusive & Accessible Design (a11y):** 
  - Strict adherence to high-contrast color ratios for text readability.
  - Comprehensive keyboard navigation support (`tabindex`, visible focus rings).
  - Semantic HTML structure for screen readers.
- **Stateful Interactions:**
  - Smooth skeleton loading screens to reduce perceived waiting time.
  - Interactive media lightbox with background scroll-locking and `ESC` key support.
- **Responsive UI:** Fluid grid layouts that adapt seamlessly from mobile screens to desktop monitors.
- **Form Handling:** Simulated submission workflows with loading states, debouncing, and success feedback.

## 🛠️ Tech Stack

- **Framework:** Vue 3 (Composition API)
- **Build Tool:** Vite (for fast HMR and optimized production builds)
- **Styling:** Tailwind CSS v4
- **Deployment:** GitHub Actions & GitHub Pages

## ⚙️ Local Development Setup

To run this project locally on your machine:

1. **Clone the repository:**
   
   git clone [https://github.com/](https://github.com/)yangfannbut/impact-storyboard.git

   cd impact-storyboard

2. Install dependencies:

	npm install
	Start the development server:

	Bash
	npm run dev
	Build for production:

	Bash

	npm run build

