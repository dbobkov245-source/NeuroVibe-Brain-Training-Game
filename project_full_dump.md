# 📦 Полный дамп проекта: `/Volumes/SSD Storage/nv2/NeuroVibe-Brain-Training-Game`

## 📄 index.tsx

```text

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

```

## 📄 tsconfig.node.json

```text
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": ["vite.config.ts", "api/**/*.ts", "postcss.config.js", "tailwind.config.js"]
}

```

## 📄 index.html

```text
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    
    <!-- PWA Основные метатеги (ОБЯЗАТЕЛЬНО в head!) -->
    <meta name="theme-color" content="#6d28d9" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="apple-mobile-web-app-title" content="NeuroVibe" />
    <meta name="application-name" content="NeuroVibe" />
    <meta name="description" content="Интерактивная игра для тренировки памяти и когнитивных навыков" />

    <!-- Манифест и иконки -->
    <link rel="manifest" href="/manifest.json" />
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="icon" href="/icon.svg" type="image/svg+xml" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

    <!-- Preconnect (убраны пробелы в конце URL) -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

    <title>NeuroVibe: Brain Training Game</title>
  </head>
  <body class="bg-gray-50">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

```

## 📄 tailwind.config.js

```text
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

```

## 🚫 .DS_Store (бинарный файл — пропущен)

## 📄 vercel.json

```text
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com ; font-src 'self' https://fonts.gstatic.com ; img-src 'self' data: https:; connect-src 'self' https://generativelanguage.googleapis.com ; worker-src 'self' blob:; manifest-src 'self';"
        }
      ]
    }
  ]
}

```

## 📄 metadata.json

```text
{
  "name": "NeuroVibe: Brain Training Game",
  "description": "An interactive chat-based game designed to train memory and cognitive skills through word challenges, story comprehension, and association tests, powered by the Gemini API.",
  "requestFramePermissions": []
}
```

## 📄 README.md

```text
# NeuroVibe: –ú–æ–±–∏–ª—å–Ω–∞—è –∏–≥—Ä–∞ –¥–ª—è —Ç—Ä–µ–Ω–∏—Ä–æ–≤–∫–∏ –º–æ–∑–≥–∞

![NeuroVibe Gameplay](https://storage.googleapis.com/gemini-prod-us-west1-423901-d2/images/2b7ce11e-8e62-42f8-8422-48f804566c5d.png)

**NeuroVibe** ‚Äî —ç—Ç–æ –∏–Ω—Ç–µ—Ä–∞–∫—Ç–∏–≤–Ω–∞—è –º–æ–±–∏–ª—å–Ω–∞—è –∏–≥—Ä–∞ –Ω–∞ –æ—Å–Ω–æ–≤–µ —á–∞—Ç–∞, —Å–æ–∑–¥–∞–Ω–Ω–∞—è –¥–ª—è —Ç—Ä–µ–Ω–∏—Ä–æ–≤–∫–∏ –ø–∞–º—è—Ç–∏ –∏ –∫–æ–≥–Ω–∏—Ç–∏–≤–Ω—ã—Ö –Ω–∞–≤—ã–∫–æ–≤. –ò—Å–ø–æ–ª—å–∑—É—è –º–æ—â—å Google Gemini API, –ø—Ä–∏–ª–æ–∂–µ–Ω–∏–µ –ø—Ä–µ–¥–ª–∞–≥–∞–µ—Ç —É–≤–ª–µ–∫–∞—Ç–µ–ª—å–Ω—ã–µ –∑–∞–¥–∞–Ω–∏—è –≤ —Ä–∞–∑–ª–∏—á–Ω—ã—Ö —Ä–µ–∂–∏–º–∞—Ö, –æ—Ç—Å–ª–µ–∂–∏–≤–∞–µ—Ç –≤–∞—à –ø—Ä–æ–≥—Ä–µ—Å—Å —Å –ø–æ–º–æ—â—å—é –æ—á–∫–æ–≤ –æ–ø—ã—Ç–∞ (XP) –∏ –Ω–∞–≥—Ä–∞–∂–¥–∞–µ—Ç –¥–æ—Å—Ç–∏–∂–µ–Ω–∏—è–º–∏.

–≠—Ç–æ—Ç –ø—Ä–æ–µ–∫—Ç –∏—Å–ø–æ–ª—å–∑—É–µ—Ç –±–µ–∑–æ–ø–∞—Å–Ω—É—é –∞—Ä—Ö–∏—Ç–µ–∫—Ç—É—Ä—É, –≥–¥–µ API-–∫–ª—é—á –Ω–∏–∫–æ–≥–¥–∞ –Ω–µ –ø–æ–ø–∞–¥–∞–µ—Ç –≤ –±—Ä–∞—É–∑–µ—Ä. –§—Ä–æ–Ω—Ç–µ–Ω–¥ (React) –æ–±—Ä–∞—â–∞–µ—Ç—Å—è –∫ —Å–µ—Ä–≤–µ—Ä–Ω–æ–π —Ñ—É–Ω–∫—Ü–∏–∏ (Vercel Serverless Function), –∫–æ—Ç–æ—Ä–∞—è –±–µ–∑–æ–ø–∞—Å–Ω–æ –≤—ã–ø–æ–ª–Ω—è–µ—Ç –∑–∞–ø—Ä–æ—Å—ã –∫ Google Gemini API.

## ‚ú® –í–æ–∑–º–æ–∂–Ω–æ—Å—Ç–∏

- **–¢—Ä–∏ –∏–≥—Ä–æ–≤—ã—Ö —Ä–µ–∂–∏–º–∞**: –°–ª–æ–≤–∞, –ò—Å—Ç–æ—Ä–∏—è, –ê—Å—Å–æ—Ü–∏–∞—Ü–∏–∏.
- **–°–∏—Å—Ç–µ–º–∞ –æ–ø—ã—Ç–∞ (XP)**: –û—Ç—Å–ª–µ–∂–∏–≤–∞–Ω–∏–µ –ø—Ä–æ–≥—Ä–µ—Å—Å–∞ –∑–∞ –ø—Ä–∞–≤–∏–ª—å–Ω—ã–µ –æ—Ç–≤–µ—Ç—ã.
- **–°–∏—Å—Ç–µ–º–∞ –¥–æ—Å—Ç–∏–∂–µ–Ω–∏–π**: –ó–Ω–∞—á–∫–∏ –∑–∞ –≤—ã–ø–æ–ª–Ω–µ–Ω–∏–µ –æ—Å–æ–±—ã—Ö –∑–∞–¥–∞–Ω–∏–π.
- **–ë–µ–∑–æ–ø–∞—Å–Ω–∞—è –∞—Ä—Ö–∏—Ç–µ–∫—Ç—É—Ä–∞**: API-–∫–ª—é—á –Ω–∞–¥—ë–∂–Ω–æ —Ö—Ä–∞–Ω–∏—Ç—Å—è –Ω–∞ —Å–µ—Ä–≤–µ—Ä–µ.
- **–ì–æ—Ç–æ–≤–Ω–æ—Å—Ç—å –∫ PWA**: –ü—Ä–∏–ª–æ–∂–µ–Ω–∏–µ –º–æ–∂–Ω–æ —É—Å—Ç–∞–Ω–æ–≤–∏—Ç—å –Ω–∞ –≥–ª–∞–≤–Ω—ã–π —ç–∫—Ä–∞–Ω —Å–º–∞—Ä—Ç—Ñ–æ–Ω–∞.

## üöÄ –¢–µ—Ö–Ω–æ–ª–æ–≥–∏—á–µ—Å–∫–∏–π —Å—Ç–µ–∫

- **–§—Ä–µ–π–º–≤–æ—Ä–∫**: React 19 + Vite
- **–Ø–∑—ã–∫**: TypeScript
- **–°—Ç–∏–ª–∏–∑–∞—Ü–∏—è**: Tailwind CSS
- **–ë—ç–∫–µ–Ω–¥**: Vercel Serverless Functions
- **AI**: Google Gemini API (`gemini-2.5-flash`)

## ÈÉ®ÁΩ≤ - –†–∞–∑–≤—ë—Ä—Ç—ã–≤–∞–Ω–∏–µ –Ω–∞ Vercel

–†–∞–∑–≤–µ—Ä–Ω—É—Ç—å —ç—Ç–æ—Ç –ø—Ä–æ–µ–∫—Ç –Ω–µ–≤–µ—Ä–æ—è—Ç–Ω–æ –ø—Ä–æ—Å—Ç–æ.

1.  **–ó–∞–≥—Ä—É–∑–∏—Ç–µ —ç—Ç–æ—Ç –ø—Ä–æ–µ–∫—Ç –Ω–∞ –≤–∞—à —Ä–µ–ø–æ–∑–∏—Ç–æ—Ä–∏–π GitHub.**

2.  **–°–æ–∑–¥–∞–π—Ç–µ –Ω–æ–≤—ã–π –ø—Ä–æ–µ–∫—Ç –Ω–∞ [Vercel](https://vercel.com/new).**
    - –ù–∞–∂–º–∏—Ç–µ "Import Git Repository".
    - –í—ã–±–µ—Ä–∏—Ç–µ –≤–∞—à —Ä–µ–ø–æ–∑–∏—Ç–æ—Ä–∏–π. Vercel –∞–≤—Ç–æ–º–∞—Ç–∏—á–µ—Å–∫–∏ –æ–ø—Ä–µ–¥–µ–ª–∏—Ç, —á—Ç–æ —ç—Ç–æ –ø—Ä–æ–µ–∫—Ç –Ω–∞ Vite.

3.  **–ù–∞—Å—Ç—Ä–æ–π—Ç–µ –ø–µ—Ä–µ–º–µ–Ω–Ω—ã–µ –æ–∫—Ä—É–∂–µ–Ω–∏—è.**
    - –í –Ω–∞—Å—Ç—Ä–æ–π–∫–∞—Ö –ø—Ä–æ–µ–∫—Ç–∞ Vercel –ø–µ—Ä–µ–π–¥–∏—Ç–µ –≤–æ –≤–∫–ª–∞–¥–∫—É **Settings** -> **Environment Variables**.
    - –î–æ–±–∞–≤—å—Ç–µ –Ω–æ–≤—É—é –ø–µ—Ä–µ–º–µ–Ω–Ω—É—é:
      - **Name**: `API_KEY`
      - **Value**: –í–∞—à API-–∫–ª—é—á –æ—Ç Google Gemini (–Ω–∞—á–∏–Ω–∞–µ—Ç—Å—è —Å `AIza...`)
    - –ù–∞–∂–º–∏—Ç–µ **Save**.

    ![Vercel Environment Variables](https://storage.googleapis.com/gemini-prod-us-west1-423901-d2/images/2f92f254-20b8-4c3c-829d-6485f2416f4d.png)

4.  **–ù–∞–∂–º–∏—Ç–µ "Deploy".**
    - Vercel –∞–≤—Ç–æ–º–∞—Ç–∏—á–µ—Å–∫–∏ —É—Å—Ç–∞–Ω–æ–≤–∏—Ç –∑–∞–≤–∏—Å–∏–º–æ—Å—Ç–∏, —Å–æ–±–µ—Ä—ë—Ç –ø—Ä–æ–µ–∫—Ç –∏ —Ä–∞–∑–≤–µ—Ä–Ω—ë—Ç –≤–∞—à–µ –ø—Ä–∏–ª–æ–∂–µ–Ω–∏–µ –≤–º–µ—Å—Ç–µ —Å —Å–µ—Ä–≤–µ—Ä–Ω–æ–π —Ñ—É–Ω–∫—Ü–∏–µ–π.

–ß–µ—Ä–µ–∑ –Ω–µ—Å–∫–æ–ª—å–∫–æ –º–∏–Ω—É—Ç –≤–∞—à–µ –ø—Ä–∏–ª–æ–∂–µ–Ω–∏–µ –±—É–¥–µ—Ç –¥–æ—Å—Ç—É–ø–Ω–æ –ø–æ –ø—Ä–µ–¥–æ—Å—Ç–∞–≤–ª–µ–Ω–Ω–æ–º—É URL.

## üíª –õ–æ–∫–∞–ª—å–Ω–∞—è —Ä–∞–∑—Ä–∞–±–æ—Ç–∫–∞

1.  **–ö–ª–æ–Ω–∏—Ä—É–π—Ç–µ —Ä–µ–ø–æ–∑–∏—Ç–æ—Ä–∏–π:**
    ```bash
    git clone https://github.com/your-username/neurovibe.git
    cd neurovibe
    ```

2.  **–£—Å—Ç–∞–Ω–æ–≤–∏—Ç–µ –∑–∞–≤–∏—Å–∏–º–æ—Å—Ç–∏:**
    ```bash
    npm install
    ```

3.  **–°–æ–∑–¥–∞–π—Ç–µ —Ñ–∞–π–ª –¥–ª—è –ø–µ—Ä–µ–º–µ–Ω–Ω—ã—Ö –æ–∫—Ä—É–∂–µ–Ω–∏—è:**
    - –°–æ–∑–¥–∞–π—Ç–µ —Ñ–∞–π–ª `.env.local` –≤ –∫–æ—Ä–Ω–µ –ø—Ä–æ–µ–∫—Ç–∞.
    - –î–æ–±–∞–≤—å—Ç–µ –≤ –Ω–µ–≥–æ –≤–∞—à API-–∫–ª—é—á:
      ```
      API_KEY=AIzaSy...
      ```

4.  **–ó–∞–ø—É—Å—Ç–∏—Ç–µ –ø—Ä–æ–µ–∫—Ç:**
    - –î–ª—è —Ç–µ—Å—Ç–∏—Ä–æ–≤–∞–Ω–∏—è —Ñ—Ä–æ–Ω—Ç–µ–Ω–¥–∞ –∏ –±—ç–∫–µ–Ω–¥–∞ –≤–º–µ—Å—Ç–µ, –∏—Å–ø–æ–ª—å–∑—É–π—Ç–µ Vercel CLI:
    ```bash
    npm install -g vercel
    vercel dev
    ```
    –≠—Ç–æ –∑–∞–ø—É—Å—Ç–∏—Ç –ª–æ–∫–∞–ª—å–Ω—ã–π —Å–µ—Ä–≤–µ—Ä, –∫–æ—Ç–æ—Ä—ã–π —ç–º—É–ª–∏—Ä—É–µ—Ç –æ–∫—Ä—É–∂–µ–Ω–∏–µ Vercel, –≤–∫–ª—é—á–∞—è —Å–µ—Ä–≤–µ—Ä–Ω—ã–µ —Ñ—É–Ω–∫—Ü–∏–∏.
```

## 📄 project_full_dump.md

```text

```

## 📄 .gitignore

```text
# Dependencies
node_modules/
.pnp
.pnp.js

# Production builds
dist/
build/
.out/
.vercel

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
*.log

# IDEs and editors
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
.idea/
.vscode/
.vscode/settings.json
*.sublime-project
*.sublime-workspace

# PWA generated assets
public/pwa-*.png
public/apple-touch-icon-*.png
public/maskable-icon-*.png
public/icon-*.png
sw.js
sw.js.map
workbox-*.js
workbox-*.js.map

# OS files
Thumbs.db

```

## 📄 package.json

```text
{
  "name": "neurovibe",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "vercel-build": "tsc && vite build"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "workbox-window": "^7.1.0",
    "idb": "^8.0.0",
    "@vercel/node": "^3.0.0",
    "@vercel/edge-config": "^1.0.0",
    "web-push": "^3.6.6"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@types/web-push": "^3.6.3",
    "@vitejs/plugin-react": "^4.3.1",
    "vite": "^5.3.3",
    "vite-plugin-pwa": "^0.20.0",
    "typescript": "^5.5.3",
    "tailwindcss": "^3.4.4",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.39",
    "@types/workbox-window": "^4.3.4"
  }
}

```

## 📄 tsconfig.json

```text
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable", "WebWorker"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "types": ["vite-plugin-pwa/client"]
  },
  "include": ["src"], 
  "references": [{ "path": "./tsconfig.node.json" }]
}

```

## 📄 export_full_project.py

```text
import os
import chardet

# ========== –Ω–∞—Å—Ç—Ä–æ–π–∫–∏ ==========

# –ü–∞–ø–∫–∏, –∫–æ—Ç–æ—Ä—ã–µ –Ω—É–∂–Ω–æ –∏—Å–∫–ª—é—á–∏—Ç—å
EXCLUDED_DIRS = {
    ".git", "node_modules", "__pycache__", "venv", ".idea", ".vscode",
    "dist", "build", ".next", ".turbo", ".expo", ".pytest_cache"
}

# –¢–∏–ø—ã —Ñ–∞–π–ª–æ–≤, –∫–æ—Ç–æ—Ä—ã–µ –ø—Ä–æ–ø—É—Å–∫–∞–µ–º
BINARY_EXTENSIONS = {
    ".png", ".jpg", ".jpeg", ".gif", ".bmp", ".ico",
    ".pdf", ".zip", ".tar", ".gz", ".7z", ".exe", ".dll",
    ".ttf", ".otf", ".woff", ".woff2", ".mp3", ".mp4", ".mov",
}

OUTPUT_FILENAME = "project_full_dump.md"

# ==================================


def is_binary_file(file_path):
    """–û–ø—Ä–µ–¥–µ–ª—è–µ—Ç –±–∏–Ω–∞—Ä–Ω—ã–µ —Ñ–∞–π–ª—ã –ø–æ —Ä–∞—Å—à–∏—Ä–µ–Ω–∏—é –∏–ª–∏ —Å–æ–¥–µ—Ä–∂–∏–º–æ–º—É."""
    _, ext = os.path.splitext(file_path)
    if ext.lower() in BINARY_EXTENSIONS:
        return True

    try:
        with open(file_path, "rb") as f:
            chunk = f.read(1024)
            if b"\0" in chunk:
                return True
    except:
        return True

    return False


def read_text_file(file_path):
    """–û–ø—Ä–µ–¥–µ–ª—è–µ–º –∫–æ–¥–∏—Ä–æ–≤–∫—É –∏ —á–∏—Ç–∞–µ–º —Ç–µ–∫—Å—Ç."""
    try:
        with open(file_path, "rb") as f:
            raw = f.read()

        encoding = chardet.detect(raw)["encoding"] or "utf-8"

        return raw.decode(encoding, errors="replace")
    except Exception as e:
        return f"<<–û—à–∏–±–∫–∞ —á—Ç–µ–Ω–∏—è —Ñ–∞–π–ª–∞: {e}>>"


def export_project(root_folder):
    with open(OUTPUT_FILENAME, "w", encoding="utf-8") as out:
        out.write(f"# üì¶ –ü–æ–ª–Ω—ã–π –¥–∞–º–ø –ø—Ä–æ–µ–∫—Ç–∞: `{root_folder}`\n\n")

        for dirpath, dirnames, filenames in os.walk(root_folder):
            # –£–±–∏—Ä–∞–µ–º –∏–∑ –æ–±—Ö–æ–¥–∞ –∏—Å–∫–ª—é—á—ë–Ω–Ω—ã–µ –ø–∞–ø–∫–∏
            dirnames[:] = [d for d in dirnames if d not in EXCLUDED_DIRS]

            for filename in filenames:
                full_path = os.path.join(dirpath, filename)
                rel_path = os.path.relpath(full_path, root_folder)

                if is_binary_file(full_path):
                    out.write(f"## üö´ {rel_path} (–±–∏–Ω–∞—Ä–Ω—ã–π —Ñ–∞–π–ª ‚Äî –ø—Ä–æ–ø—É—â–µ–Ω)\n\n")
                    continue

                out.write(f"## üìÑ {rel_path}\n\n")
                out.write("```text\n")
                out.write(read_text_file(full_path))
                out.write("\n```\n\n")

    print(f"‚úÖ –ì–æ—Ç–æ–≤–æ! –§–∞–π–ª '{OUTPUT_FILENAME}' —Å–æ–∑–¥–∞–Ω.")


if __name__ == "__main__":
    project_root = os.getcwd()
    export_project(project_root)

```

## 📄 vite.config.ts

```text
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';

const pwaOptions: VitePWAOptions = {
  registerType: 'prompt',
  strategies: 'injectManifest',
  srcDir: 'src',
  filename: 'sw.ts',
  injectRegister: 'auto',
  workbox: {
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts-cache',
          expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
          cacheableResponse: { statuses: [0, 200] }
        }
      },
      {
        urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'gstatic-fonts-cache',
          expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
          cacheableResponse: { statuses: [0, 200] }
        }
      },
      {
        urlPattern: /\.(?:png|jpg|jpeg|svg|ico)$/i,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'images-cache',
          expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 }
        }
      }
    ]
  },
  includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'icon.svg'],
  manifest: {
    name: 'NeuroVibe: Brain Training Game',
    short_name: 'NeuroVibe',
    description: 'Интерактивная игра для тренировки памяти и когнитивных навыков',
    theme_color: '#6d28d9',
    background_color: '#f9fafb',
    display: 'standalone',
    orientation: 'portrait-primary',
    start_url: '/',
    scope: '/',
    id: '/',
    lang: 'ru',
    categories: ['games', 'education', 'health'],
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png', purpose: 'apple touch icon' },
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'maskable' }
    ],
    shortcuts: [
      {
        name: 'Слова',
        short_name: 'Слова',
        description: 'Начать игру на запоминание слов',
        url: '/?mode=words',
        icons: [{ src: '/icon.svg', sizes: 'any' }]
      },
      {
        name: 'История',
        short_name: 'История',
        description: 'Начать игру на понимание истории',
        url: '/?mode=story',
        icons: [{ src: '/icon.svg', sizes: 'any' }]
      },
      {
        name: 'Ассоциации',
        short_name: 'Ассоциации',
        description: 'Начать игру на ассоциативное мышление',
        url: '/?mode=associations',
        icons: [{ src: '/icon.svg', sizes: 'any' }]
      }
    ],
    share_target: {
      action: '/',
      method: 'GET',
      params: { title: 'title', text: 'text', url: 'url' }
    }
  },
  devOptions: { enabled: true, type: 'module' }
};

export default defineConfig({
  plugins: [react(), VitePWA(pwaOptions)],
  server: {
    port: 3000,
    host: true,
    // Убран proxy loop - API работает напрямую через Vercel функции
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['./src/components/Icons']
        }
      }
    }
  }
});

```

## 📄 postcss.config.js

```text
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

```

## 📄 public/offline.html

```text
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NeuroVibe - –û—Ñ–ª–∞–π–Ω</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      margin: 0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: white;
      padding: 20px;
    }
    .container {
      background: rgba(255,255,255,0.95);
      backdrop-filter: blur(10px);
      padding: 40px;
      border-radius: 20px;
      color: #333;
      max-width: 400px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    h1 {
      color: #6d28d9;
      margin-bottom: 20px;
    }
    p {
      color: #555;
      line-height: 1.6;
      margin-bottom: 30px;
    }
    .icon {
      font-size: 60px;
      margin-bottom: 20px;
    }
    button {
      background: #6d28d9;
      color: white;
      border: none;
      padding: 12px 30px;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
      transition: background 0.3s;
    }
    button:hover {
      background: #5a21b5;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="icon">üò¥</div>
    <h1>–í—ã –æ—Ñ–ª–∞–π–Ω</h1>
    <p>NeuroVibe –Ω—É–∂–µ–Ω –∏–Ω—Ç–µ—Ä–Ω–µ—Ç –¥–ª—è —Ä–∞–±–æ—Ç—ã —Å –∏—Å–∫—É—Å—Å—Ç–≤–µ–Ω–Ω—ã–º –∏–Ω—Ç–µ–ª–ª–µ–∫—Ç–æ–º. –ü–æ–¥–∫–ª—é—á–∏—Ç–µ—Å—å –∫ —Å–µ—Ç–∏, —á—Ç–æ–±—ã –ø—Ä–æ–¥–æ–ª–∂–∏—Ç—å —Ç—Ä–µ–Ω–∏—Ä–æ–≤–∫—É –º–æ–∑–≥–∞!</p>
    <button onclick="window.location.reload()">–ü–æ–ø—Ä–æ–±–æ–≤–∞—Ç—å —Å–Ω–æ–≤–∞</button>
  </div>
</body>
</html>

```

## 🚫 public/favicon.ico (бинарный файл — пропущен)

## 📄 public/daily.json

```text
{
  "id": "",
  "title": "",
  "description": "",
  "target": 0,
  "mode": "words",
  "minScore": 0,
  "xp": 0,
  "completed": false,
  "ts": 0
}

```

## 🚫 public/apple-touch-icon.png (бинарный файл — пропущен)

## 🚫 public/icon-192.png (бинарный файл — пропущен)

## 📄 public/icon.svg

```text
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="512" height="512" rx="96" fill="#6D28D9"/>
<path d="M256 128C186.4 128 131.911 182.502 128.2 252H192C192 216.686 220.686 188 256 188V128Z" fill="white" fill-opacity="0.5"/>
<path d="M256 384C325.6 384 380.089 329.498 383.8 260H320C320 295.314 291.314 324 256 324V384Z" fill="white" fill-opacity="0.5"/>
<path d="M208 256C208 229.49 229.49 208 256 208C282.51 208 304 229.49 304 256C304 282.51 282.51 304 256 304C229.49 304 208 282.51 208 256Z" fill="white"/>
<path d="M256 128C269.467 128 282.467 130.681 294.6 135.6L281.4 162.8C273.8 159.933 265.133 158 256 158V128Z" fill="white"/>
<path d="M256 384C242.533 384 229.533 381.319 217.4 376.4L230.6 349.2C238.2 352.067 246.867 354 256 354V384Z" fill="white"/>
<path d="M141.4 180C146.533 167.867 154.067 156.8 163.4 147.4L186.2 170.2C179.933 176.467 174.733 183.667 170.6 191.4L141.4 180Z" fill="white"/>
<path d="M370.6 364.6C365.467 376.733 357.933 387.8 348.6 397.2L325.8 374.4C332.067 368.133 337.267 360.933 341.4 353.2L370.6 364.6Z" fill="white"/>
</svg>

```

## 📄 public/manifest.json

```text
{
  "name": "NeuroVibe: Brain Training Game",
  "short_name": "NeuroVibe",
  "description": "Интерактивная игра для тренировки памяти и когнитивных навыков через игры со словами, историями и ассоциациями",
  "theme_color": "#6d28d9",
  "background_color": "#f9fafb",
  "display": "standalone",
  "orientation": "portrait-primary",
  "start_url": "/",
  "scope": "/",
  "id": "/",
  "lang": "ru",
  "categories": ["games", "education", "health"],
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/apple-touch-icon.png",
      "sizes": "180x180",
      "type": "image/png",
      "purpose": "apple touch icon"
    },
    {
      "src": "/icon.svg",
      "sizes": "any",
      "type": "image/svg+xml",
      "purpose": "maskable"
    }
  ],
  "screenshots": [
    {
      "src": "/screenshots/screenshot-mobile-1.png",
      "sizes": "1080x1920",
      "type": "image/png",
      "form_factor": "narrow",
      "label": "Мобильный интерфейс игры"
    },
    {
      "src": "/screenshots/screenshot-desktop-1.png",
      "sizes": "1920x1080",
      "type": "image/png",
      "form_factor": "wide",
      "label": "Выбор режима на десктопе"
    }
  ],
  "shortcuts": [
    {
      "name": "Начать игру 'Слова'",
      "short_name": "Слова",
      "description": "Начать новую игру на запоминание слов",
      "url": "/?mode=words",
      "icons": [{ "src": "/icon.svg", "sizes": "any" }]
    },
    {
      "name": "Начать игру 'История'",
      "short_name": "История",
      "description": "Начать новую игру на понимание истории",
      "url": "/?mode=story",
      "icons": [{ "src": "/icon.svg", "sizes": "any" }]
    },
    {
      "name": "Начать игру 'Ассоциации'",
      "short_name": "Ассоциации",
      "description": "Начать новую игру на ассоциативное мышление",
      "url": "/?mode=associations",
      "icons": [{ "src": "/icon.svg", "sizes": "any" }]
    }
  ],
  "share_target": {
    "action": "/",
    "method": "GET",
    "enctype": "application/x-www-form-urlencoded",
    "params": {
      "title": "title",
      "text": "text",
      "url": "url"
    }
  },
  "launch_handler": {
    "client_mode": "focus-existing"
  },
  "edge_side_panel": {
    "preferred_width": 400
  }
}

```

## 🚫 public/icon-512.png (бинарный файл — пропущен)

## 🚫 public/screenshots/screenshot-desktop-1.png (бинарный файл — пропущен)

## 🚫 public/screenshots/screenshot-mobile-1.png (бинарный файл — пропущен)

## 📄 .github/workflows/daily-quest.yml

```text
name: Generate daily quest

on:
  schedule:
    - cron: '0 0 * * *'        # 00:00 UTC каждый день
  workflow_dispatch:           # и ручной запуск (кнопка в GitHub)

jobs:
  gen-and-push:
    runs-on: ubuntu-latest
    permissions:
      contents: write           # чтобы пушить коммит
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          token: ${{ secrets.GITHUB_TOKEN }}   # для push

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Generate daily.json
        run: node .github/scripts/gen-daily.js

      - name: Commit & Push
        run: |
          git config user.name  "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add public/daily.json
          # коммит только если файл изменился
          git diff --cached --quiet || (
            git commit -m "chore: new daily quest $(date -u +%F)"
            git push
          )

```

## 📄 .github/scripts/gen-daily.js

```text
#!/usr/bin/env node
// .github/scripts/gen-daily.js
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Создаем директорию, если её нет
const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const quests = [
  { title: 'Триумф ассоциаций', desc: 'Сыграй 3 партии в ассоциации ≥ 8/10', target: 3, mode: 'associations', minScore: 8, xp: 50 },
  { title: 'Мастер слов', desc: 'Правильно вспомни все 7 слов', target: 1, mode: 'words', minScore: 7, xp: 70 },
  { title: 'Исторический день', desc: 'Пройди историю без ошибок', target: 1, mode: 'story', minScore: 3, xp: 60 },
];

const pick = quests[Math.floor(Math.random() * quests.length)];
const daily = { 
  id: crypto.randomUUID(), 
  ...pick, 
  completed: false, 
  ts: Date.now() 
};

fs.writeFileSync(
  path.join(publicDir, 'daily.json'), 
  JSON.stringify(daily, null, 2)
);
console.log('✅ daily.json создан:', daily.title);

```

## 📄 api/push.ts

```text
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { get } from '@vercel/edge-config';
import webpush from 'web-push';

// Настройка VAPID (лучше вынести mailto тоже в переменную, но пока оставим так)
webpush.setVapidDetails(
  'mailto:you@site.com',
  process.env.VAPID_PUBLIC!,
  process.env.VAPID_PRIVATE!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Проверка авторизации (CRON_SECRET)
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET!}`) {
    return res.status(401).end('Unauthorized');
  }

  try {
    // Получаем данные из Edge Config
    const subs = await get('pushSubs');

    // Проверяем, что subs существует и является массивом
    if (!subs || !Array.isArray(subs)) {
      console.log('No subscriptions found or invalid format');
      return res.status(200).json({ sent: 0, message: 'No subs found' });
    }

    // Отправляем уведомления
    await Promise.all(
      subs.map(async (sub: any) => {
        try {
          await webpush.sendNotification(
            sub,
            JSON.stringify({ body: '9:00 – время тренировки!' })
          );
        } catch (error) {
          console.error('Error sending to sub:', error);
          // Здесь можно добавить логику удаления невалидной подписки, если нужно
        }
      })
    );

    return res.status(200).json({ sent: subs.length });
  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

```

## 📄 api/generate.ts

```text
// api/generate.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error('API_KEY not configured');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const { history, system, generationConfig } = req.body;

  try {
    const response = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: history.map((m: any) => ({
          role: m.role === 'model' ? 'model' : 'user',
          parts: m.parts,
        })),
        systemInstruction: { parts: [{ text: system.text }] },
        generationConfig: {
          ...generationConfig,
          responseMimeType: 'application/json',
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.text().catch(() => 'Unknown error');
      console.error('Gemini error:', response.status, err);
      return res.status(response.status).json({ error: `AI service error: ${response.status}` });
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    let json;
    try {
      const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
      json = JSON.parse(cleaned);
    } catch (e) {
      console.error('Invalid JSON from model:', text);
      return res.status(502).json({ error: 'Invalid response format from AI', raw: text });
    }

    res.status(200).json(json);
  } catch (error: any) {
    console.error('Server error:', error);
    
    if (error.name === 'AbortError') {
      return res.status(504).json({ error: 'Request timeout' });
    }
    
    res.status(500).json({ error: 'Internal server error' });
  }
}

```

## 📄 src/offlineStorage.ts

```text
// src/offlineStorage.ts
import { ChatMessage } from './types';

export interface GameState {
  xp: number;
  gamesPlayed: number;
  unlockedAchievements: string[];
  chatHistory: ChatMessage[];
  lastSaved: number;
}

export class OfflineStorage {
  private readonly DB_NAME = 'NeuroVibeDB';
  private readonly STORE_NAME = 'gameState';
  private db: IDBDatabase | null = null;
  private initialized = false;

  // Инициализация обязательно должна вызываться один раз при старте приложения
  async init(): Promise<void> {
    if (this.initialized) return;
    this.initialized = true;

    if (!('indexedDB' in window)) {
      console.warn('IndexedDB not supported, using localStorage fallback');
      return;
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.DB_NAME, 1);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.STORE_NAME)) {
          db.createObjectStore(this.STORE_NAME, { keyPath: 'id' });
        }
      };
    });
  }

  async saveGameState(state: GameState): Promise<void> {
    if (this.db) {
      return new Promise((resolve, reject) => {
        try {
          const transaction = this.db!.transaction([this.STORE_NAME], 'readwrite');
          const store = transaction.objectStore(this.STORE_NAME);
          const request = store.put({ ...state, id: 'current' });
          request.onsuccess = () => resolve();
          request.onerror = () => reject(request.error);
        } catch (err) {
          reject(err);
        }
      });
    } else {
      localStorage.setItem('neurovibe-state', JSON.stringify(state));
    }
  }

  async getGameState(): Promise<GameState | null> {
    if (this.db) {
      return new Promise((resolve, reject) => {
        try {
          const transaction = this.db!.transaction([this.STORE_NAME], 'readonly');
          const store = transaction.objectStore(this.STORE_NAME);
          const request = store.get('current');
          request.onsuccess = () => {
            const res = request.result || null;
            // если хранилище возвращает объект с id, нужно убрать id
            if (res) {
              const { id, ...rest } = res;
              resolve(rest as GameState);
            } else {
              resolve(null);
            }
          };
          request.onerror = () => reject(request.error);
        } catch (err) {
          reject(err);
        }
      });
    } else {
      const saved = localStorage.getItem('neurovibe-state');
      return saved ? JSON.parse(saved) : null;
    }
  }

  async clear(): Promise<void> {
    if (this.db) {
      return new Promise((resolve, reject) => {
        try {
          const transaction = this.db!.transaction([this.STORE_NAME], 'readwrite');
          const store = transaction.objectStore(this.STORE_NAME);
          const request = store.delete('current');
          request.onsuccess = () => resolve();
          request.onerror = () => reject(request.error);
        } catch (err) {
          reject(err);
        }
      });
    } else {
      localStorage.removeItem('neurovibe-state');
    }
  }

  async sync(): Promise<void> {
    // Заглушка: при необходимости сюда можно добавить отправку состояния на сервер
    const state = await this.getGameState();
    if (state) console.log('Syncing game state (local)...', { xp: state.xp, gamesPlayed: state.gamesPlayed });
  }
}

```

## 📄 src/App.tsx

```text
// src/App.tsx
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { ChatMessage, GameMode, AchievementId, Achievement, AchievementCheckContext, Persona } from './types';
import { ACHIEVEMENTS } from './achievements';
import { generateJsonResponse } from './services/geminiService';
import { OfflineStorage } from './offlineStorage';
import { BrainCircuit, Award, Send, MessageSquare, BookOpenText, Users, Loader2, Trophy, ArrowLeft } from './components/Icons';
import { ModeButton } from './components/ModeButton';
import { AchievementToast } from './components/AchievementToast';
import { AchievementsPanel } from './components/AchievementsPanel';
import { PWAPrompt } from './components/PWAPrompt';
import { MemoryCard } from './components/MemoryCard';
import { PersonaRadio } from './components/PersonaRadio';
import { useDailyQuest } from './hooks/useDailyQuest';
import { Confetti } from './components/Confetti';

export default function App() {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [xp, setXp] = useState<number>(0);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentMode, setCurrentMode] = useState<GameMode | null>(null);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPWAPrompt, setShowPWAPrompt] = useState<boolean>(false);
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<AchievementId>>(new Set());
  const [gamesPlayed, setGamesPlayed] = useState<number>(0);
  const [showAchievementsPanel, setShowAchievementsPanel] = useState<boolean>(false);
  const [toastQueue, setToastQueue] = useState<Achievement[]>([]);
  const [memoryContent, setMemoryContent] = useState<string | null>(null);
  const [persona, setPersona] = useState<Persona>('demon');
  const [showConfetti, setShowConfetti] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const offlineStorage = useRef<OfflineStorage | null>(null);
  const { quest, complete } = useDailyQuest();

  useEffect(() => {
    offlineStorage.current = new OfflineStorage();
    offlineStorage.current.init().catch((e) => console.warn('OfflineStorage init failed:', e));
    
    const handleOnline = () => {
      setIsOnline(true);
      offlineStorage.current?.sync().catch(console.error);
    };
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    const loadState = async () => {
      try {
        const state = await offlineStorage.current?.getGameState();
        if (state) {
          setXp(state.xp);
          setGamesPlayed(state.gamesPlayed);
          setUnlockedAchievements(new Set(state.unlockedAchievements as AchievementId[]));
          setChatHistory(state.chatHistory);
        }
      } catch (e) { 
        console.error('Failed to load state:', e); 
      }
    };
    loadState();
  }, []);

  useEffect(() => {
    const saveState = async () => {
      try {
        await offlineStorage.current?.saveGameState({
          xp,
          gamesPlayed,
          unlockedAchievements: Array.from(unlockedAchievements),
          chatHistory,
          lastSaved: Date.now()
        });
      } catch (e) { 
        console.error('Failed to save state:', e); 
      }
    };
    saveState();
  }, [xp, gamesPlayed, unlockedAchievements, chatHistory]);

  useEffect(() => {
    if (!gamesPlayed || localStorage.getItem('pwa-prompt-dismissed')) return;
    
    let isMounted = true;
    const handler = (e: Event) => {
      e.preventDefault();
      if (isMounted) setDeferredPrompt(e);
      setTimeout(() => {
        if (isMounted) setShowPWAPrompt(true);
      }, 3000);
    };
    
    window.addEventListener('beforeinstallprompt', handler);
    return () => { 
      isMounted = false; 
      window.removeEventListener('beforeinstallprompt', handler); 
    };
  }, [gamesPlayed]);

  const handleInstallPWA = useCallback(async () => {
    if (!deferredPrompt) return;
    
    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('PWA installed');
        if ('gtag' in window) {
          (window as any).gtag('event', 'pwa_installed');
        }
      }
    } catch (error) {
      console.error('PWA install failed:', error);
    } finally {
      setDeferredPrompt(null);
      setShowPWAPrompt(false);
      localStorage.setItem('pwa-prompt-dismissed', 'true');
    }
  }, [deferredPrompt]);

  const dismissPWAPrompt = useCallback(() => {
    setShowPWAPrompt(false);
    localStorage.setItem('pwa-prompt-dismissed', 'true');
  }, []);

  const checkAndUnlockAchievements = useCallback((modelResponse: any) => {
    if (!modelResponse?.game_data) return;
    
    const ctx: AchievementCheckContext = { 
      xp, 
      gamesPlayed, 
      lastModelResponse: modelResponse, 
      currentGameMode: currentMode 
    };
    
    const newUnlocks = ACHIEVEMENTS.filter(a => 
      !unlockedAchievements.has(a.id) && a.check(ctx)
    );
    
    if (newUnlocks.length) {
      setUnlockedAchievements(prev => {
        const next = new Set(prev);
        newUnlocks.forEach(a => next.add(a.id));
        return next;
      });
      setToastQueue(prev => [...prev, ...newUnlocks]);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [xp, gamesPlayed, currentMode, unlockedAchievements]);

  useEffect(() => {
    if (!quest?.completed && quest?.mode === currentMode) {
      // Quest tracking is done in sendMessage
    }
  }, [quest, currentMode, complete]);

  const resetGame = useCallback(() => {
    setChatHistory([]);
    setCurrentMode(null);
    setMemoryContent(null);
    setInput('');
  }, []);

  const sendMessage = useCallback(async (userPrompt: string, isHiddenPrompt = false) => {
    if (!userPrompt.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      parts: [{ text: userPrompt }],
      isHidden: isHiddenPrompt
    };

    if (!isOnline) {
      const offlineMessage: ChatMessage = {
        role: 'model',
        parts: [{ text: '<strong>–û—Ñ–ª–∞–π–Ω:</strong> –ó–∞–ø—Ä–æ—Å —Å–æ—Ö—Ä–∞–Ω—ë–Ω. –ü–æ–¥–∫–ª—é—á–∏—Ç–µ—Å—å –∫ —Å–µ—Ç–∏ –¥–ª—è –æ—Ç–≤–µ—Ç–∞.' }]
      };
      setChatHistory(prev => [...prev, userMessage, offlineMessage]);
      return;
    }

    setIsLoading(true);
    if (!isHiddenPrompt) setInput('');

    const currentHistory = [...chatHistory, userMessage];
    if (!isHiddenPrompt) setChatHistory(currentHistory);

    try {
      const modelResponse = await generateJsonResponse(currentHistory, persona);
      
      const modelMessage: ChatMessage = {
        role: 'model',
        parts: [{ text: modelResponse.display_html }],
        isHidden: !!modelResponse.isMemoryContent
      };

      const updatedHistory = [...currentHistory, modelMessage];
      setChatHistory(updatedHistory);

      if (modelResponse.isMemoryContent) {
        setMemoryContent(modelResponse.display_html);
      } else {
        setMemoryContent(null);
      }

      setXp(prev => prev + modelResponse.xp_gained);
      checkAndUnlockAchievements(modelResponse);
      
      if (quest && !quest.completed && 
          modelResponse.game_data.mode === quest.mode &&
          (modelResponse.game_data.association_score ?? 0) >= quest.minScore) {
        complete();
        setXp(prev => prev + quest.xp);
      }
    } catch (error) {
      console.error('Message send error:', error);
      const errorMessage: ChatMessage = {
        role: 'model',
        parts: [{ text: `<strong>–û—à–∏–±–∫–∞:</strong> –ù–µ —É–¥–∞–ª–æ—Å—å –ø–æ–ª—É—á–∏—Ç—å –æ—Ç–≤–µ—Ç –æ—Ç AI. –ü–æ–ø—Ä–æ–±—É–π—Ç–µ —Å–Ω–æ–≤–∞.` }]
      };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [chatHistory, isLoading, isOnline, persona, quest, complete, checkAndUnlockAchievements]);

  const handleSend = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input, false);
  }, [input, sendMessage]);

  const handleModeSelect = useCallback((mode: GameMode) => {
    setCurrentMode(mode);
    setGamesPlayed(prev => prev + 1);
    
    const prompts: Record<GameMode, string> = {
      words: '–ù–∞—á–Ω–∏ —Ä–µ–∂–∏–º —Å–ª–æ–≤: –∑–∞–ø–æ–º–Ω–∏ 7 —Å–ª–æ–≤ –∏ –ø–æ—Ç–æ–º –≤–æ—Å–ø—Ä–æ–∏–∑–≤–µ–¥–∏ –∏—Ö.',
      story: '–ù–∞—á–Ω–∏ —Ä–µ–∂–∏–º –∏—Å—Ç–æ—Ä–∏–∏: –¥–∞–π –∫–æ—Ä–æ—Ç–∫—É—é –∏—Å—Ç–æ—Ä–∏—é –¥–ª—è –ø–æ–Ω–∏–º–∞–Ω–∏—è –∏ –≤–æ–ø—Ä–æ—Å–æ–≤.',
      associations: '–ù–∞—á–Ω–∏ —Ä–µ–∂–∏–º –∞—Å—Å–æ—Ü–∏–∞—Ü–∏–π: –¥–∞–π –Ω–∞–±–æ—Ä –∞—Å—Å–æ—Ü–∏–∞—Ü–∏–π –¥–ª—è —Ç–µ—Å—Ç–∞.'
    };
    
    sendMessage(prompts[mode], true);
  }, [sendMessage]);

  useEffect(() => {
    if (chatHistory.length > 0) return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode') as GameMode;
    const sharedText = urlParams.get('text');
    
    if (mode && ['words', 'story', 'associations'].includes(mode)) {
      handleModeSelect(mode);
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (sharedText) {
      sendMessage(sharedText, false);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [chatHistory.length, handleModeSelect, sendMessage]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, memoryContent]);

  const achievementsCount = useMemo(() => 
    `${unlockedAchievements.size}/${ACHIEVEMENTS.length}`, 
    [unlockedAchievements]
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-900 font-sans">
      {!isOnline && (
        <div className="bg-yellow-100 text-yellow-800 text-center py-2 px-4 font-medium">
          ‚ö†Ô∏è –û—Ñ–ª–∞–π–Ω —Ä–µ–∂–∏–º ‚Äî –æ—Ç–≤–µ—Ç—ã —Å–æ—Ö—Ä–∞–Ω—è—é—Ç—Å—è –ª–æ–∫–∞–ª—å–Ω–æ
        </div>
      )}
      
      {toastQueue.length > 0 && (
        <AchievementToast 
          achievement={toastQueue[0]} 
          onClose={() => setToastQueue(prev => prev.slice(1))} 
        />
      )}
      
      {showConfetti && <Confetti />}
      {showPWAPrompt && <PWAPrompt onInstall={handleInstallPWA} onDismiss={dismissPWAPrompt} />}
      
      <AchievementsPanel 
        isOpen={showAchievementsPanel} 
        onClose={() => setShowAchievementsPanel(false)} 
        allAchievements={ACHIEVEMENTS} 
        unlockedIds={unlockedAchievements} 
      />
      
      <header className="sticky top-0 z-10 w-full bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {chatHistory.length > 0 && (
              <button 
                onClick={resetGame} 
                className="p-2 text-gray-500 hover:text-violet-600 transition-colors" 
                aria-label="–ù–∞–∑–∞–¥"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
            )}
            <BrainCircuit className="w-7 h-7 text-violet-600" />
            <h1 className="text-2xl font-bold text-gray-800">NeuroVibe</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowAchievementsPanel(true)} 
              className="text-gray-500 hover:text-violet-600 transition-colors relative" 
              aria-label="–î–æ—Å—Ç–∏–∂–µ–Ω–∏—è"
            >
              <Trophy className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {achievementsCount}
              </span>
            </button>
            
            <div className="flex items-center gap-2 bg-green-100 text-green-800 font-bold rounded-full px-4 py-1.5 shadow-sm transition-all duration-300 hover:shadow-md">
              <Award className="w-5 h-5" />
              <span key={xp} className="animate-pulse-once">{xp} XP</span>
            </div>
          </div>
        </div>
      </header>

      <main ref={chatContainerRef} className="flex-grow overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <PersonaRadio value={persona} onChange={setPersona} />
          
          {quest && !quest.completed && (
            <div className="mx-2 mb-2 p-3 rounded-lg bg-yellow-100 text-yellow-800 text-sm font-medium">
              üéØ <span className="font-bold">{quest.title}</span>: {quest.description}
            </div>
          )}

          {memoryContent && <MemoryCard content={memoryContent} onReady={() => setMemoryContent(null)} />}

          {chatHistory.map((msg, index) => {
            if (msg.isHidden) return null;
            const isUser = msg.role === 'user';
            const bubbleClasses = `p-3 rounded-2xl shadow-md max-w-[85%] sm:max-w-[75%] break-words`;
            const userClasses = `${bubbleClasses} bg-violet-600 text-white rounded-br-lg ml-auto`;
            const modelClasses = `${bubbleClasses} bg-white text-gray-800 rounded-bl-lg border border-gray-100 mr-auto`;
            
            return (
              <div key={index} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={isUser ? userClasses : modelClasses}>
                  {isUser ? (
                    <span>{msg.parts[0].text}</span>
                  ) : (
                    <span dangerouslySetInnerHTML={{ __html: msg.parts[0].text }} />
                  )}
                </div>
              </div>
            );
          })}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="p-3 rounded-2xl shadow-md bg-white text-gray-800 rounded-bl-lg border border-gray-100" aria-label="–ó–∞–≥—Ä—É–∑–∫–∞">
                <Loader2 className="w-5 h-5 animate-spin" />
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="sticky bottom-0 z-10 w-full bg-white/80 backdrop-blur-md p-4 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <div className="max-w-3xl mx-auto">
          {chatHistory.length === 0 && !isLoading && !memoryContent && !currentMode ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <ModeButton 
                icon={<MessageSquare className="w-5 h-5" />} 
                title="–°–ª–æ–≤–∞" 
                description="–ó–∞–ø–æ–º–Ω–∏ 7 —Å–ª–æ–≤" 
                onClick={() => handleModeSelect('words')} 
              />
              <ModeButton 
                icon={<BookOpenText className="w-5 h-5" />} 
                title="–ò—Å—Ç–æ—Ä–∏—è" 
                description="–ü–æ–Ω–∏–º–∞–Ω–∏–µ –∏—Å—Ç–æ—Ä–∏–∏" 
                onClick={() => handleModeSelect('story')} 
              />
              <ModeButton 
                icon={<Users className="w-5 h-5" />} 
                title="–ê—Å—Å–æ—Ü–∏–∞—Ü–∏–∏" 
                description="–¢—Ä–µ–Ω–∏—Ä–æ–≤–∫–∞ –∞—Å—Å–æ—Ü–∏–∞—Ü–∏–π" 
                onClick={() => handleModeSelect('associations')} 
              />
            </div>
          ) : (
            <form onSubmit={handleSend} className="flex items-center gap-3">
              <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                placeholder="–í–≤–µ–¥–∏—Ç–µ —Å–æ–æ–±—â–µ–Ω–∏–µ..." 
                disabled={isLoading || !isOnline || !!memoryContent} 
                className="flex-grow px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:bg-gray-100" 
                aria-label="–í–≤–æ–¥ —Å–æ–æ–±—â–µ–Ω–∏—è" 
                autoComplete="off" 
              />
              <button 
                type="submit" 
                disabled={isLoading || !input.trim() || !isOnline || !!memoryContent} 
                className="p-3 bg-violet-600 text-white rounded-lg shadow-md hover:bg-violet-700 transition-colors duration-200 disabled:bg-gray-400 disabled:shadow-none flex items-center justify-center min-w-[48px]" 
                aria-label={isLoading ? "–û—Ç–ø—Ä–∞–≤–∫–∞..." : "–û—Ç–ø—Ä–∞–≤–∏—Ç—å"}
              >
                {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
              </button>
            </form>
          )}
        </div>
      </footer>
    </div>
  );
}

```

## 📄 src/main.tsx

```text
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './register-sw';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

```

## 🚫 src/.DS_Store (бинарный файл — пропущен)

## 📄 src/achievements.ts

```text
import { AchievementDefinition } from './types';
import { BookOpenText, MessageSquare, Users, Award, Trophy, Brain } from './components/Icons';

export const ACHIEVEMENTS: AchievementDefinition[] = [
  {
    id: 'STORY_PATHFINDER',
    name: 'Первооткрыватель Историй',
    description: 'Завершите свою первую игру в режиме "История".',
    icon: BookOpenText,
    check: ({ lastModelResponse, currentGameMode }) => {
      if (!lastModelResponse || currentGameMode !== 'story') return false;
      return lastModelResponse.xp_gained > 0 && lastModelResponse.game_data.mode === 'story';
    },
  },
  {
    id: 'WORD_MASTER',
    name: 'Мастер Слов',
    description: 'Правильно вспомните все 7 слов в режиме "Слова".',
    icon: MessageSquare,
    check: ({ lastModelResponse, currentGameMode }) => {
      if (!lastModelResponse || currentGameMode !== 'words') return false;
      const { correct_answers, total_items } = lastModelResponse.game_data;
      return correct_answers === 7 && total_items === 7;
    },
  },
  {
    id: 'ASSOCIATION_ACE',
    name: 'Асс Ассоциаций',
    description: 'Получите оценку 8/10 или выше в режиме "Ассоциации".',
    icon: Users,
    check: ({ lastModelResponse, currentGameMode }) => {
      if (!lastModelResponse || currentGameMode !== 'associations') return false;
      const { association_score } = lastModelResponse.game_data;
      return association_score !== undefined && association_score >= 8;
    },
  },
  {
    id: 'NOVICE_NEURONAUT',
    name: 'Начинающий Нейронавт',
    description: 'Заработайте свои первые 100 XP.',
    icon: Award,
    check: ({ xp }) => xp >= 100,
  },
  {
    id: 'FIVE_TIME_CHAMPION',
    name: 'Пятикратный Чемпион',
    description: 'Сыграйте 5 игр в любом режиме.',
    icon: Trophy,
    check: ({ gamesPlayed }) => gamesPlayed >= 5,
  },
  // Новые достижения
  {
    id: 'SARCASM_KING',
    name: 'Король Сарказма',
    description: 'Выиграйте 3 игры в ассоциациях с оценкой 9+.',
    icon: Brain,
    check: ({ lastModelResponse, currentGameMode }) => {
      if (!lastModelResponse || currentGameMode !== 'associations') return false;
      const { association_score } = lastModelResponse.game_data;
      return association_score !== undefined && association_score >= 9;
    },
  },
  {
    id: 'DARK_PHILOSOPHER',
    name: 'Тёмный Философ',
    description: 'В режиме ассоциаций найдите глубокую связь (10/10).',
    icon: Brain,
    check: ({ lastModelResponse, currentGameMode }) => {
      if (!lastModelResponse || currentGameMode !== 'associations') return false;
      const { association_score } = lastModelResponse.game_data;
      return association_score === 10;
    },
  },
];

```

## 📄 src/sw.ts

```text
// src/sw.ts
/// <reference lib="webworker" />
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

declare const self: ServiceWorkerGlobalScope;

precacheAndRoute(self.__WB_MANIFEST || []);

cleanupOutdatedCaches();

registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new CacheFirst({
    cacheName: 'google-fonts-stylesheets',
  })
);

registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 30,
        maxAgeSeconds: 60 * 60 * 24 * 365,
      }),
    ],
  })
);

registerRoute(
  ({ request }) => request.mode === 'navigate',
  async () => {
    try {
      return await fetch('/offline.html');
    } catch {
      const cache = await caches.open('workbox-precache');
      const response = await cache.match('/offline.html');
      return response || new Response('Offline content not available', { status: 503 });
    }
  }
);

registerRoute(
  /\.(?:png|jpg|jpeg|svg|ico|woff2?)$/,
  new StaleWhileRevalidate({
    cacheName: 'assets',
  })
);

```

## 📄 src/register-sw.ts

```text
import { Workbox } from 'workbox-window';

if ('serviceWorker' in navigator) {
  const wb = new Workbox('/sw.js');
  
  wb.addEventListener('activated', (event) => {
    console.log('‚úÖ Service Worker –∞–∫—Ç–∏–≤–∏—Ä–æ–≤–∞–Ω', event);
  });

  wb.addEventListener('waiting', () => {
    console.log('üîî –î–æ—Å—Ç—É–ø–Ω–æ –æ–±–Ω–æ–≤–ª–µ–Ω–∏–µ –ø—Ä–∏–ª–æ–∂–µ–Ω–∏—è');
    if (confirm('–î–æ—Å—Ç—É–ø–Ω–∞ –Ω–æ–≤–∞—è –≤–µ—Ä—Å–∏—è NeuroVibe. –û–±–Ω–æ–≤–∏—Ç—å?')) {
      wb.messageSkipWaiting();
      window.location.reload();
    }
  });

  wb.register()
    .then(() => console.log('‚úÖ Service Worker –∑–∞—Ä–µ–≥–∏—Å—Ç—Ä–∏—Ä–æ–≤–∞–Ω'))
    .catch((err) => console.error('‚ùå –û—à–∏–±–∫–∞ —Ä–µ–≥–∏—Å—Ç—Ä–∞—Ü–∏–∏ SW:', err));
}

```

## 📄 src/index.css

```text
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  @keyframes pulse-once {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.25);
      opacity: 0.9;
    }
  }
  .animate-pulse-once {
    animation: pulse-once 0.5s ease-in-out;
  }

  @keyframes fade-in-down {
    0% { opacity: 0; transform: translate(-50%, -20px); }
    100% { opacity: 1; transform: translate(-50%, 0); }
  }
  .animate-fade-in-down { 
    animation: fade-in-down 0.5s ease-out forwards; 
  }

  @keyframes fade-in-up {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in-up { 
    animation: fade-in-up 0.3s ease-out forwards; 
  }

  @keyframes confetti-fall {
    0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
  }
}

```

## 📄 src/types.ts

```text
import { type FC, type SVGProps } from 'react';

// ========== Базовые типы сообщений ==========
export type MessageRole = 'user' | 'model';

export interface ChatMessage {
  role: MessageRole;
  parts: { text: string }[];
  isHidden?: boolean; // Для скрытых системных промптов
}

// ========== Режимы игры ==========
export const GAME_MODES = ['words', 'story', 'associations'] as const;
export type GameMode = typeof GAME_MODES[number];

// ========== Персоны ==========
export const PERSONAS = ['demon', 'cyborg', 'grandpa'] as const;
export type Persona = typeof PERSONAS[number];

// ========== Достижения ==========
export const ACHIEVEMENT_IDS = [
  'STORY_PATHFINDER',
  'WORD_MASTER',
  'ASSOCIATION_ACE',
  'NOVICE_NEURONAUT',
  'FIVE_TIME_CHAMPION',
  'SARCASM_KING',
  'DARK_PHILOSOPHER'
] as const;

export type AchievementId = typeof ACHIEVEMENT_IDS[number];

export type IconComponent = FC<SVGProps<SVGSVGElement>>;

export interface Achievement {
  id: AchievementId;
  name: string;
  description: string;
  icon: IconComponent;
}

// ========== Данные игры ==========
export interface GameData {
  mode: GameMode;
  correct_answers?: number;
  total_items?: number;
  association_score?: number;
}

// ========== Ответ модели ==========
export interface ModelResponseData {
  display_html: string;
  xp_gained: number;
  game_data: GameData;
  isMemoryContent?: boolean; // Для карточки запоминания
}

// ========== Контекст проверки достижений ==========
export interface AchievementCheckContext {
  xp: number;
  gamesPlayed: number;
  lastModelResponse?: ModelResponseData;
  currentGameMode: GameMode | null;
}

// ========== Определение достижения с проверкой ==========
export interface AchievementDefinition extends Achievement {
  check: (ctx: AchievementCheckContext) => boolean;
}

// ========== Состояние игры для offline storage ==========
export interface GameState {
  xp: number;
  gamesPlayed: number;
  unlockedAchievements: AchievementId[];
  chatHistory: ChatMessage[];
  lastSaved: number;
}

// ========== Ежедневный квест ==========
export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  target: number;
  mode: GameMode;
  minScore: number;
  xp: number;
  completed: boolean;
  ts?: number;
}

// ========== Service Worker типы ==========
declare global {
  interface ServiceWorkerGlobalScope {
    __WB_MANIFEST: any;
  }

  interface SyncEvent extends ExtendableEvent {
    readonly tag: string;
    readonly lastChance: boolean;
  }

  interface FetchEvent extends ExtendableEvent {
    readonly request: Request;
    respondWith(response: Response | Promise<Response>): void;
  }

  interface ServiceWorkerGlobalScopeEventMap {
    sync: SyncEvent;
    fetch: FetchEvent;
  }

  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

// ========== Утилиты ==========

/**
 * Type guard для проверки валидности ответа модели
 */
export function isModelResponseData(obj: unknown): obj is ModelResponseData {
  if (!obj || typeof obj !== 'object') return false;

  const data = obj as any;

  return (
    typeof data.display_html === 'string' &&
    typeof data.xp_gained === 'number' &&
    data.game_data &&
    typeof data.game_data === 'object' &&
    GAME_MODES.includes(data.game_data.mode)
  );
}

/**
 * Type guard для проверки валидности режима игры
 */
export function isGameMode(value: unknown): value is GameMode {
  return typeof value === 'string' && GAME_MODES.includes(value as GameMode);
}

/**
 * Type guard для проверки валидности персоны
 */
export function isPersona(value: unknown): value is Persona {
  return typeof value === 'string' && PERSONAS.includes(value as Persona);
}

```

## 📄 src/constants.ts

```text
import { Persona } from './types';

export const SYSTEM_INSTRUCTION = { 
  text: `–¢—ã ‚Äî NeuroVibe, –≤–µ–¥—É—â–∏–π –∏–≥—Ä—ã –¥–ª—è —Ç—Ä–µ–Ω–∏—Ä–æ–≤–∫–∏ –º–æ–∑–≥–∞.

–ö–†–ò–¢–ò–ß–ï–°–ö–ò –í–ê–ñ–ù–û: –í–°–ï–ì–î–ê –æ—Ç–≤–µ—á–∞–π –¢–û–õ–¨–ö–û –≤–∞–ª–∏–¥–Ω—ã–º JSON –≤ —Ç–æ—á–Ω–æ–º —Ñ–æ—Ä–º–∞—Ç–µ:
{
  "display_html": "<p>–¢–≤–æ–π HTML-–æ—Ç–≤–µ—Ç –∏–≥—Ä–æ–∫—É</p>",
  "xp_gained": 10,
  "game_data": {
    "mode": "words" | "story" | "associations",
    "correct_answers": 5,
    "total_items": 7,
    "association_score": 8
  },
  "isMemoryContent": false
}

–†–ï–ñ–ò–ú–´ –ò–ì–†:

1Ô∏è‚É£ WORDS (–ó–∞–ø–æ–º–Ω–∏ —Å–ª–æ–≤–∞):
   - –ü–æ–∫–∞–∑—ã–≤–∞–µ—à—å 7 —Å–ª—É—á–∞–π–Ω—ã—Ö —Å–ª–æ–≤ —Å HTML —Ñ–æ—Ä–º–∞—Ç–∏—Ä–æ–≤–∞–Ω–∏–µ–º
   - –°—Ç–∞–≤–∏—à—å isMemoryContent: true
   - –ü–æ—Å–ª–µ –æ—Ç–≤–µ—Ç–∞ –∏–≥—Ä–æ–∫–∞ –ø—Ä–æ–≤–µ—Ä—è–µ—à—å –∏ –¥–∞—ë—à—å XP

2Ô∏è‚É£ STORY (–ò—Å—Ç–æ—Ä–∏—è):
   - –†–∞—Å—Å–∫–∞–∑—ã–≤–∞–µ—à—å –∫–æ—Ä–æ—Ç–∫—É—é –∏—Å—Ç–æ—Ä–∏—é (3-5 –ø—Ä–µ–¥–ª–æ–∂–µ–Ω–∏–π)
   - –ó–∞–¥–∞—ë—à—å 3 –≤–æ–ø—Ä–æ—Å–∞ –ø–æ –æ—á–µ—Ä–µ–¥–∏
   - –ó–∞ –ø—Ä–∞–≤–∏–ª—å–Ω—ã–µ –æ—Ç–≤–µ—Ç—ã ‚Äî XP

3Ô∏è‚É£ ASSOCIATIONS (–ê—Å—Å–æ—Ü–∏–∞—Ü–∏–∏):
   - –î–∞—ë—à—å 2 —Å–ª–æ–≤–∞, –∏–≥—Ä–æ–∫ –Ω–∞—Ö–æ–¥–∏—Ç —Å–≤—è–∑—å
   - –û—Ü–µ–Ω–∏–≤–∞–µ—à—å –∫—Ä–µ–∞—Ç–∏–≤–Ω–æ—Å—Ç—å –æ—Ç 1 –¥–æ 10
   - association_score –æ–±—è–∑–∞—Ç–µ–ª–µ–Ω!

–ü–†–ê–í–ò–õ–ê XP:
- –ò–¥–µ–∞–ª—å–Ω—ã–π –æ—Ç–≤–µ—Ç = 20 XP
- –•–æ—Ä–æ—à–∏–π = 10-15 XP
- –°—Ä–µ–¥–Ω–∏–π = 5-10 XP
- –°–ª–∞–±—ã–π = 0-5 XP

–ù–ò–ö–û–ì–î–ê –Ω–µ –≤—ã—Ö–æ–¥–∏ –∏–∑ —Ä–æ–ª–∏. –ù–∏–∫–∞–∫–∏—Ö –∏–∑–≤–∏–Ω–µ–Ω–∏–π –∑–∞ JSON.` 
};

export const GENERATION_CONFIG = {
  temperature: 0.9,
  topP: 0.95,
  maxOutputTokens: 600
};

export const PERSONA_PROMPTS: Record<Persona, string> = {
  demon: `üî• –ü–ï–†–°–û–ù–ê: –ó–ª–æ–±–Ω—ã–π —Å–∞—Ä–∫–∞—Å—Ç–∏—á–Ω—ã–π –¥–µ–º–æ–Ω
- –ò—Å–ø–æ–ª—å–∑—É–π emoji: üòà üíÄ üî• ‚ö°
- –ï—Ö–∏–¥–Ω—ã–µ –∫–æ–º–º–µ–Ω—Ç–∞—Ä–∏–∏
- "–ñ–∞–ª–∫–∏–π —Å–º–µ—Ä—Ç–Ω—ã–π", "–¢–≤–æ–π –º–æ–∑–≥ —Ö–∏—Ä–µ–µ—Ç"
- –ü—Ä–∏ –æ—à–∏–±–∫–∞—Ö: "–ö–∞–∫ —è –∏ –¥—É–º–∞–ª, –ø—Ä–æ–≤–∞–ª!"`,

  cyborg: `ü§ñ –ü–ï–†–°–û–ù–ê: –•–æ–ª–æ–¥–Ω—ã–π –Ω–∞—É—á–Ω—ã–π –∫–∏–±–æ—Ä–≥
- –ò—Å–ø–æ–ª—å–∑—É–π emoji: ü§ñ ‚öôÔ∏è üß¨ üìä
- –ì–æ–≤–æ—Ä–∏ –∫–∞–∫ –ì–ª—ç–¥–æ—Å –∏–∑ Portal
- –°—É—Ö–æ–π —é–º–æ—Ä, —Å—Ç–∞—Ç–∏—Å—Ç–∏–∫–∞
- "–°—É–±—ä–µ–∫—Ç –¥–µ–º–æ–Ω—Å—Ç—Ä–∏—Ä—É–µ—Ç –∫–æ–≥–Ω–∏—Ç–∏–≤–Ω—ã–π –¥–µ—Ñ–∏—Ü–∏—Ç"`,

  grandpa: `üë¥ –ü–ï–†–°–û–ù–ê: –î–æ–±—Ä—ã–π —Å—Ç–∞—Ä—ã–π –¥–µ–¥
- –ò—Å–ø–æ–ª—å–∑—É–π emoji: üë¥ üíö üåø ‚òï
- –¢—ë–ø–ª—ã–µ —Å–ª–æ–≤–∞ –ø–æ–¥–¥–µ—Ä–∂–∫–∏
- "–ú–æ–ª–æ–¥–µ—Ü, –≤–Ω—É—á–µ–∫!", "–í –º–æ—ë –≤—Ä–µ–º—è..."
- –ú—É–¥—Ä—ã–µ —Å–æ–≤–µ—Ç—ã —Å —é–º–æ—Ä–æ–º`
};

export const FEW_SHOT_EXAMPLES = `
=== –ü–†–ò–ú–ï–† 1: WORDS (–Ω–∞—á–∞–ª–æ) ===
USER: "–ù–∞—á–Ω–∏ —Ä–µ–∂–∏–º –°–ª–æ–≤–∞"
ASSISTANT JSON:
{
  "display_html": "<div class='text-center'><h2 class='text-2xl font-bold mb-4'>üß† –ó–∞–ø–æ–º–Ω–∏ —ç—Ç–∏ —Å–ª–æ–≤–∞!</h2><ul class='text-xl space-y-2'><li>üåä <strong>–û–∫–µ–∞–Ω</strong></li><li>üî• <strong>–û–≥–æ–Ω—å</strong></li><li>üåô <strong>–õ—É–Ω–∞</strong></li><li>üé∏ <strong>–ì–∏—Ç–∞—Ä–∞</strong></li><li>üìö <strong>–ö–Ω–∏–≥–∞</strong></li><li>‚ö° <strong>–ú–æ–ª–Ω–∏—è</strong></li><li>üå∏ <strong>–¶–≤–µ—Ç–æ–∫</strong></li></ul><p class='mt-4 text-gray-600'>–£ —Ç–µ–±—è 30 —Å–µ–∫—É–Ω–¥!</p></div>",
  "xp_gained": 0,
  "game_data": { "mode": "words", "total_items": 7 },
  "isMemoryContent": true
}

=== –ü–†–ò–ú–ï–† 2: ASSOCIATIONS (–æ—Ü–µ–Ω–∫–∞) ===
USER: "–ö–≤–∞–Ω—Ç–æ–≤–∞—è —Ñ–∏–∑–∏–∫–∞ —Å–≤—è–∑–∞–Ω–∞ —Å –±–∞–Ω–∞–Ω–∞–º–∏, –ø–æ—Ç–æ–º—É —á—Ç–æ –æ–±–∞ –∂—ë–ª—Ç—ã–µ –∏–ª–∏ –≥–Ω—É—Ç—ã–µ"
ASSISTANT JSON:
{
  "display_html": "<p>üòà <strong>–ö—Ä–µ–∞—Ç–∏–≤–Ω–æ—Å—Ç—å 3/10:</strong> –°–ª–∏—à–∫–æ–º –ø–æ–≤–µ—Ä—Ö–Ω–æ—Å—Ç–Ω–∞—è —Å–≤—è–∑—å. –ö–≤–∞–Ω—Ç–æ–≤–∞—è —Å—É–ø–µ—Ä–ø–æ–∑–∏—Ü–∏—è –æ–ø–∏—Å—ã–≤–∞–µ—Ç —Å–æ—Å—Ç–æ—è–Ω–∏—è –Ω–∞ —Å—É–±–∞—Ç–æ–º–Ω–æ–º —É—Ä–æ–≤–Ω–µ, –∞ '–≥–Ω—É—Ç–æ—Å—Ç—å –±–∞–Ω–∞–Ω–∞' ‚Äî —ç—Ç–æ –º–∞–∫—Ä–æ–æ–±—ä–µ–∫—Ç. –ü–æ–ø—Ä–æ–±—É–π –≥–ª—É–±–∂–µ!</p>",
  "xp_gained": 5,
  "game_data": { "mode": "associations", "association_score": 3 }
}

=== –ü–†–ò–ú–ï–† 3: STORY (–≤–æ–ø—Ä–æ—Å) ===
USER: "–ù–∞—á–Ω–∏ —Ä–µ–∂–∏–º –ò—Å—Ç–æ—Ä–∏—è"
ASSISTANT JSON:
{
  "display_html": "<div><p class='mb-3'>ü§ñ <em>–ê–Ω–∞–ª–∏–∑–∏—Ä—É—é –ø–∞–º—è—Ç—å —Å—É–±—ä–µ–∫—Ç–∞...</em></p><p class='text-lg mb-4'>–£—á—ë–Ω—ã–π –∏–∑–æ–±—Ä—ë–ª –º–∞—à–∏–Ω—É –≤—Ä–µ–º–µ–Ω–∏, –Ω–æ –æ–Ω–∞ —Ä–∞–±–æ—Ç–∞–ª–∞ —Ç–æ–ª—å–∫–æ –Ω–∞–∑–∞–¥. –û–Ω –≤–µ—Ä–Ω—É–ª—Å—è –Ω–∞ –¥–µ–Ω—å –∏ –≤—Å—Ç—Ä–µ—Ç–∏–ª —Å–µ–±—è –≤—á–µ—Ä–∞—à–Ω–µ–≥–æ. –í–º–µ—Å—Ç–µ –æ–Ω–∏ —Ä–µ—à–∏–ª–∏ –Ω–µ –∏–∑–æ–±—Ä–µ—Ç–∞—Ç—å –º–∞—à–∏–Ω—É.</p><p class='font-bold mt-4'>–í–æ–ø—Ä–æ—Å 1/3: –ü–æ—á–µ–º—É —É—á—ë–Ω—ã–π –≤—Å—Ç—Ä–µ—Ç–∏–ª —Å–µ–±—è?</p></div>",
  "xp_gained": 0,
  "game_data": { "mode": "story", "total_items": 3, "correct_answers": 0 }
}
`;

```

## 📄 src/components/Confetti.tsx

```text
// src/components/Confetti.tsx
export const Confetti = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .confetti-piece {
          position: absolute;
          width: 10px;
          height: 10px;
          animation: confetti-fall 3s ease-out forwards;
        }
      `}</style>
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="confetti-piece"
          style={{
            left: `${Math.random() * 100}%`,
            background: `hsl(${Math.random() * 360}, 70%, 50%)`,
            animationDelay: `${Math.random() * 0.5}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
};

```

## 📄 src/components/PWAPrompt.tsx

```text
import React, { useCallback } from 'react';
import { Download, X } from './Icons';

interface PWAPromptProps {
  onInstall: () => void;
  onDismiss: () => void;
}

export const PWAPrompt: React.FC<PWAPromptProps> = ({ onInstall, onDismiss }) => {
  const handleInstall = useCallback(() => {
    onInstall();
    // Track installation event
    if ('gtag' in window) {
      (window as any).gtag('event', 'pwa_install_prompt_accepted');
    }
  }, [onInstall]);

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm animate-fade-in-down" role="dialog" aria-labelledby="pwa-title">
      <div className="bg-white rounded-xl shadow-2xl p-4 border border-violet-200 flex items-center space-x-4">
        <div className="flex-shrink-0 p-3 bg-violet-100 text-violet-600 rounded-full">
          <Download className="w-7 h-7" />
        </div>
        <div className="flex-grow">
          <p id="pwa-title" className="font-bold text-gray-800">Установить NeuroVibe?</p>
          <p className="text-sm text-gray-600">Играй офлайн, быстрее и удобнее!</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleInstall}
            className="px-3 py-1 bg-violet-600 text-white rounded-lg text-sm font-semibold hover:bg-violet-700 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            Установить
          </button>
          <button 
            onClick={onDismiss}
            className="p-1 text-gray-400 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded"
            aria-label="Закрыть"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
      <style>{`
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translate(-50%, -20px); }
          100% { opacity: 1; transform: translate(-50%, 0); }
        }
        .animate-fade-in-down { animation: fade-in-down 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
};

```

## 📄 src/components/MemoryCard.tsx

```text
import React, { useState } from 'react';
import { EyeOff } from './Icons';

interface MemoryCardProps {
  content: string;
  onReady: () => void;
}

export const MemoryCard: React.FC<MemoryCardProps> = ({ content, onReady }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleReady = () => {
    setIsVisible(false);
    setTimeout(onReady, 300); // Плавное исчезание
  };

  if (!isVisible) return null;

  return (
    <div className="bg-white border-2 border-violet-200 rounded-xl p-6 shadow-lg mb-4 animate-fade-in-up">
      <div className="flex items-center gap-2 mb-3">
        <EyeOff className="w-5 h-5 text-violet-600" />
        <span className="text-sm font-semibold text-violet-700">ЗАПОМНИТЕ ЭТО</span>
      </div>
      <div 
        className="text-gray-800 text-lg leading-relaxed"
        dangerouslySetInnerHTML={{ __html: content }} 
      />
      <button
        onClick={handleReady}
        className="mt-4 w-full bg-violet-600 text-white py-3 rounded-lg font-semibold hover:bg-violet-700 transition-colors"
      >
        ГОТОВ (скрыть)
      </button>
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

```

## 📄 src/components/Icons.tsx

```text
import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

export const BrainCircuit: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 5a3 3 0 1 0-5.993.142" /><path d="M18 5a3 3 0 1 0-5.993.142" /><path d="M12 12a3 3 0 1 0-5.993.142" /><path d="M18 12a3 3 0 1 0-5.993.142" /><path d="M12 19a3 3 0 1 0-5.993.142" /><path d="M18 19a3 3 0 1 0-5.993.142" /><path d="M12 5v0a3 3 0 1 1 5.993-.142" /><path d="M12 12v0a3 3 0 1 1 5.993-.142" /><path d="M12 19v0a3 3 0 1 1 5.993-.142" /><path d="M12 5a3 3 0 1 1-5.993-.142" /><path d="M12 12a3 3 0 1 1-5.993-.142" /><path d="M12 19a3 3 0 1 1-5.993-.142" /><path d="m15 4-3 2-3-2" /><path d="m15 11-3 2-3-2" /><path d="m15 18-3 2-3-2" />
  </svg>
);

export const Award: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);

export const Send: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />
  </svg>
);

export const MessageSquare: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

export const BookOpenText: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /><path d="M6 8h2" /><path d="M6 12h2" /><path d="M16 8h2" /><path d="M16 12h2" />
  </svg>
);

export const Users: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const Loader2: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

export const Trophy: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M9 12H4a2 2 0 0 0-2 2v6" /><path d="M15 12h5a2 2 0 0 1 2 2v6" /><path d="M12 15a3 3 0 0 0-3-3H9v3a3 3 0 0 0 3 3h0a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h0a3 3 0 0 0-3 3v3" />
  </svg>
);

export const X: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
  </svg>
);

export const Download: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

// üÜï –ò–∫–æ–Ω–∫–∞ –¥–ª—è –∫–Ω–æ–ø–∫–∏ "–ù–∞–∑–∞–¥"
export const ArrowLeft: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m12 19-7-7 7-7" /><path d="M19 12H5" />
  </svg>
);

// üÜï –ò–∫–æ–Ω–∫–∞ –¥–ª—è –∫–∞—Ä—Ç–æ—á–∫–∏ –ø–∞–º—è—Ç–∏
export const EyeOff: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" />
  </svg>
);

// üÜï –ò–∫–æ–Ω–∫–∞ –¥–ª—è –Ω–æ–≤–æ–≥–æ –¥–æ—Å—Ç–∏–∂–µ–Ω–∏—è
export const Brain: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15A2.5 2.5 0 0 1 9.5 22a2.5 2.5 0 0 1-2.96-2.03 3 3 0 0 1-.34-1.86c.27-.26.55-.52.84-.77a7.9 7.9 0 0 1 1.28-.86 10.9 10.9 0 0 1 1.68-.7c.3-.09.7-.21 1.06-.37.17-.07.33-.15.5-.24.1.29.12.6.12.93 0 .59-.19 1.13-.5 1.57a2.5 2.5 0 0 1-2.06 1.07H9.5Z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 2.5 2.5 2.5 2.5 0 0 0 2.96-2.03 3 3 0 0 0 .34-1.86c-.27-.26-.55-.52-.84-.77a7.9 7.9 0 0 0-1.28-.86 10.9 10.9 0 0 0-1.68-.7c-.3-.09-.7-.21-1.06-.37-.17-.07-.33-.15-.5-.24-.1.29-.12.6-.12.93 0 .59.19 1.13.5 1.57a2.5 2.5 0 0 0 2.06 1.07H14.5Z" />
  </svg>
);

```

## 📄 src/components/PersonaRadio.tsx

```text
// src/components/PersonaRadio.tsx
import { Persona } from '../types';

const personas = [
  { id: 'demon' as const, name: 'Ð—Ð»Ð¾Ð±Ð½Ñ‹Ð¹ Ð¡Ð°Ñ€ÐºÐ°Ñ�Ñ‚Ð¸Ñ‡Ð½Ñ‹Ð¹ Ð”ÐµÐ¼Ð¾Ð½', emoji: 'ðŸ˜ˆ' },
  { id: 'cyborg' as const, name: 'Ð¥Ð¾Ð»Ð¾Ð´Ð½Ñ‹Ð¹ Ð�Ð°ÑƒÑ‡Ð½Ñ‹Ð¹ ÐšÐ¸Ð±Ð¾Ñ€Ð³', emoji: 'ðŸ¤–' },
  { id: 'grandpa' as const, name: 'Ð”Ð¾Ð±Ñ€Ñ‹Ð¹ Ð¡Ñ‚Ð°Ñ€Ñ‹Ð¹ Ð”ÐµÐ´', emoji: 'ðŸ‘´' },
];

export const PersonaRadio = ({ value, onChange }: { value: Persona; onChange: (p: Persona) => void }) => (
  <div className="flex gap-3 justify-center mb-4">
    {personas.map((p) => (
      <label key={p.id} className="cursor-pointer">
        <input
          type="radio"
          name="persona"
          checked={value === p.id}
          onChange={() => onChange(p.id)}
          className="sr-only"
          aria-label={p.name}
        />
        <div
          className={`px-4 py-2 rounded-full border-2 transition-all duration-200 ${
            value === p.id 
              ? 'border-violet-600 bg-violet-100 text-violet-900 shadow-md' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <span className="mr-2 text-lg">{p.emoji}</span>
          <span className="text-sm font-medium">{p.name}</span>
        </div>
      </label>
    ))}
  </div>
);

```

## 📄 src/components/ModeButton.tsx

```text
import React from 'react';

interface ModeButtonProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

export const ModeButton: React.FC<ModeButtonProps> = ({ icon, title, description, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center text-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg hover:border-violet-400 hover:bg-violet-50 transition-all duration-200"
    >
      <div className="p-3 bg-violet-100 text-violet-600 rounded-full mb-3">
        {icon}
      </div>
      <span className="font-semibold text-gray-800">{title}</span>
      <span className="text-sm text-gray-500">{description}</span>
    </button>
  );
};

```

## 📄 src/components/AchievementToast.tsx

```text
import React, { useEffect } from 'react';
import { Achievement } from '../types';

interface AchievementToastProps {
  achievement: Achievement;
  onClose: () => void;
}

export const AchievementToast: React.FC<AchievementToastProps> = ({ achievement, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const Icon = achievement.icon;

  return (
    <div 
      className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm animate-fade-in-down"
      onClick={onClose}
    >
      <div className="bg-white rounded-xl shadow-2xl p-4 border border-green-200 flex items-center space-x-4 cursor-pointer">
        <div className="flex-shrink-0 p-3 bg-green-100 text-green-600 rounded-full">
          <Icon className="w-7 h-7" />
        </div>
        <div>
          <p className="font-bold text-gray-800">Достижение открыто!</p>
          <p className="text-gray-600">{achievement.name}</p>
        </div>
      </div>
      <style>{`
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translate(-50%, -20px); }
          100% { opacity: 1; transform: translate(-50%, 0); }
        }
        .animate-fade-in-down { animation: fade-in-down 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
};

```

## 📄 src/components/AchievementsPanel.tsx

```text
import React from 'react';
import { Achievement, AchievementId } from '../types';
import { X } from './Icons';

interface AchievementsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  allAchievements: Achievement[];
  unlockedIds: Set<AchievementId>;
}

export const AchievementsPanel: React.FC<AchievementsPanelProps> = ({ isOpen, onClose, allAchievements, unlockedIds }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl shadow-xl w-full max-w-md relative animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Достижения</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
          {allAchievements.map((ach) => {
            const isUnlocked = unlockedIds.has(ach.id);
            const Icon = ach.icon;
            return (
              <div key={ach.id} className={`flex items-center space-x-4 transition-opacity duration-300 ${isUnlocked ? 'opacity-100' : 'opacity-50'}`}>
                <div className={`p-3 rounded-full ${isUnlocked ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={`font-semibold ${isUnlocked ? 'text-gray-800' : 'text-gray-500'}`}>{ach.name}</h3>
                  <p className="text-sm text-gray-500">{ach.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

```

## 📄 src/components/NeumorphismButton.tsx

```text
import React from 'react';

interface NeoButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string; // ✅ Добавлено
}

export const NeoButton: React.FC<NeoButtonProps> = ({ children, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 rounded-xl text-white font-semibold
      bg-gray-200 dark:bg-gray-800
      shadow-[6px_6px_12px_rgba(0,0,0,0.15),-6px_-6px_12px_rgba(255,255,255,0.7)]
      active:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.7)]
      transition-shadow duration-200 ${className}`}
  >
    {children}
  </button>
);

```

## 📄 src/hooks/useDailyQuest.ts

```text
// src/hooks/useDailyQuest.ts
import { useEffect, useState } from 'react';
import { DailyQuest } from '../types';

const DAY_MS = 24 * 60 * 60 * 1000;

export function useDailyQuest() {
  const [quest, setQuest] = useState<DailyQuest | null>(null);

  useEffect(() => {
    const loadQuest = async () => {
      try {
        // Пытаемся загрузить сгенерированный квест
        const response = await fetch('/daily.json');
        if (response.ok) {
          const serverQuest = await response.json();
          const now = Date.now();
          
          // Проверяем, не устарел ли квест
          if (!serverQuest.ts || now - serverQuest.ts > DAY_MS) {
            // Если устарел, используем локальную резервную копию
            throw new Error('Server quest is outdated');
          }
          
          setQuest(serverQuest);
          localStorage.setItem('dailyQuest', JSON.stringify({ ...serverQuest, loadedFrom: 'server' }));
          return;
        }
      } catch (error) {
        console.warn('Failed to load server quest:', error);
      }

      // Локальная резервная копия (если серверный файл недоступен или устарел)
      const raw = localStorage.getItem('dailyQuest');
      const saved = raw ? JSON.parse(raw) : null;
      const now = Date.now();
      
      if (!saved || now - saved.ts > DAY_MS) {
        const quests = [
          { title: 'Триумф ассоциаций', desc: 'Сыграй 3 партии в ассоциации ≥ 8/10', target: 3, mode: 'associations', minScore: 8, xp: 50 },
          { title: 'Мастер слов', desc: 'Правильно вспомни все 7 слов', target: 1, mode: 'words', minScore: 7, xp: 70 },
          { title: 'Исторический день', desc: 'Пройди историю без ошибок', target: 1, mode: 'story', minScore: 3, xp: 60 },
        ];
        const pick = quests[Math.floor(Math.random() * quests.length)];
        const fresh: DailyQuest = {
          id: crypto.randomUUID(),
          title: pick.title,
          description: pick.desc,
          target: pick.target,
          mode: pick.mode as any,
          minScore: pick.minScore,
          xp: pick.xp,
          completed: false,
          ts: now,
        };
        localStorage.setItem('dailyQuest', JSON.stringify({ ...fresh, loadedFrom: 'local' }));
        setQuest(fresh);
      } else {
        setQuest(saved);
      }
    };
    
    loadQuest();
    const interval = setInterval(loadQuest, DAY_MS);
    return () => clearInterval(interval);
  }, []);

  const complete = () => {
    if (!quest) return;
    const done = { ...quest, completed: true };
    localStorage.setItem('dailyQuest', JSON.stringify({ ...done, ts: Date.now() }));
    setQuest(done);
  };

  return { quest, complete };
}

```

## 📄 src/services/geminiService.ts

```text
// src/services/geminiService.ts
import { ChatMessage, ModelResponseData, Persona } from '../types';
import { GENERATION_CONFIG, PERSONA_PROMPTS, FEW_SHOT_EXAMPLES, SYSTEM_INSTRUCTION } from '../constants';

export class GeminiServiceError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'GeminiServiceError';
  }
}

export async function generateJsonResponse(
  history: ChatMessage[],
  persona: Persona = 'demon'
): Promise<ModelResponseData> {
  const fullSystemPrompt = [
    PERSONA_PROMPTS[persona],
    FEW_SHOT_EXAMPLES,
    SYSTEM_INSTRUCTION.text
  ].join('\n\n').trim();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000); // Увеличен таймаут

  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        history,
        system: { text: fullSystemPrompt },
        generationConfig: GENERATION_CONFIG,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new GeminiServiceError(
        errorData.error || `HTTP ${response.status}: ${response.statusText}`,
        response.status
      );
    }

    const data = await response.json();

    // Валидация ответа
    if (
      typeof data?.display_html !== 'string' ||
      typeof data?.xp_gained !== 'number' ||
      !data?.game_data?.mode
    ) {
      console.error('Invalid response structure:', data);
      throw new GeminiServiceError('Invalid response structure from AI');
    }

    return data as ModelResponseData;
  } catch (err: any) {
    clearTimeout(timeoutId);

    if (err.name === 'AbortError') {
      throw new GeminiServiceError('Request timed out after 15 seconds', 504);
    }

    if (err instanceof GeminiServiceError) throw err;

    throw new GeminiServiceError(
      err.message || 'Network error occurred',
      err.statusCode || 500
    );
  }
}

```

