# Travelio Landing Page

A modern landing page built with Vue 3, TypeScript, and Tailwind CSS.

## 🛠 Tech Stack

- Vue 3 - Progressive JavaScript Framework
- TypeScript - For type safety
- Tailwind CSS - For styling
- Vite - Build tool and development server
- Vue Router - For routing
- Headless UI - For accessible UI components
- Heroicons - For beautiful icons

## 📦 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone [your-repository-url]
cd travelio
```

2. Install dependencies:
```bash
# Using npm
npm install

# Using yarn
yarn install
```

3. Start the development server:
```bash
# Using npm
npm run dev

# Using yarn
yarn dev
```

The application will be available at `http://localhost:5173`

## 🔨 Development

### Project Structure
```
travelio/
├── src/              # Source files
├── public/           # Static assets
├── index.html        # Entry HTML file
├── vite.config.ts    # Vite configuration
├── tailwind.config.js # Tailwind CSS configuration
└── tsconfig.json     # TypeScript configuration
```

### Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build locally

### Development Guidelines

1. **TypeScript**
   - Use TypeScript for all new files
   - Follow the existing type definitions

2. **Styling**
   - Use Tailwind CSS classes for styling
   - Follow the utility-first approach
   - Custom styles can be added in the tailwind.config.js

3. **Components**
   - Place reusable components in `src/components`
   - Use Vue 3 Composition API
   - Follow the existing component structure

## 📝 Notes

- The project uses Vue 3's Composition API
- Tailwind CSS is configured with PostCSS
- TypeScript strict mode is enabled
- Vite is used as the build tool for faster development

## 🔧 Troubleshooting

If you encounter any issues:

1. Make sure you're using the correct Node.js version
2. Clear your node_modules and reinstall dependencies
3. Check for any TypeScript errors
4. Verify your environment variables if any

## 📦 Building for Production

To build the application for production:

```bash
# Using npm
npm run build

# Using yarn
yarn build
```

The built files will be in the `dist` directory.
