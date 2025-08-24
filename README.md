## 🛠️ Key Dependencies

### 🎨 UI & Styling
- **Mantine** (`core, dates, form, notifications, tiptap`) → Modern UI components, forms, date pickers, and text editor  
- **Framer Motion** → Smooth animations  
- **Tabler Icons, React Icons** → Icon sets  

### 📊 Data & State Management
- **Zustand** → Lightweight and modular state management  
- **Tanstack React Query** → Data fetching, caching, and synchronization  
- **React Table, React Virtual** → Optimized tables and virtualized lists  
- **Immer** → Immutable state management  

### 🌐 API & Backend Communication
- **Axios** → HTTP client for API calls  
- **Orval** → Generate typed API services from OpenAPI specification  
- **jsonwebtoken** → JWT authentication  
- **qs / query-string** → Query parameter parsing  

### 🧩 Drag & Drop / Layout
- **@dnd-kit/core, sortable** → Drag & Drop functionality  
- **react-grid-layout** → Dashboard grid layouts  
- **react-resizable-panels** → Resizable split panels  

### ✍️ Text Editing & Code Editing
- **Tiptap** → Rich text editor  
- **@uiw/react-codemirror** → Code editor  

### 📈 Visualization
- **ECharts + ECharts-GL** → Charts and data visualization  

### ✅ Testing & Code Quality
- **Playwright** → End-to-End testing  
- **Allure** → Test reporting  
- **Biome** → Linting and formatting  
- **Husky & Lint-Staged** → Git hooks to enforce code quality  

---

## 🚀 NPM Scripts

- `npm run dev` → Start development server (with **Turbopack**)  
- `npm run build` → Build the project for production  
- `npm run start` → Start production server  
- `npm run test` → Run Playwright tests  
- `npm run test-headed` → Run tests in headed mode (visible browser)  
- `npm run lint-dev` → Run linting in development mode  
- `npm run lint-prod` → Strict linting for production  
- `npm run icon:create` → Generate React components from SVG icons  
- `npm run orval` → Generate API services from OpenAPI  

---

## 📌 Conclusion
This project combines **Next.js App Router**, **Mantine UI**, **React Query**, and **Zustand** to deliver a modern, scalable architecture for web applications.  
By leveraging **Orval** (typed API clients), **Playwright** (E2E testing), and **Biome** (code quality), the development team can ensure rapid iteration while maintaining a high-quality, maintainable codebase.

---
