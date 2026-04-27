Backend repo: https://github.com/uzochukwueddie/chatty-backend
Frontend repo: https://github.com/uzochukwueddie/chatty

---

Starting NodeJS packages (and @types) (post express and TSC install and configuration):

To generate tsconfig.json: npx tsc --init

npm i @bull-board/api @bull-board/express @socket.io/redis-adapter @types/pg bcryptjs bullmq cloudinary compression cookie-parser cookie-session cors dotenv helmet hpp http-status-codes ioredis joi pg redis socket.io jsonwebtoken lodash --save

TSC:

npm i --save-dev typescript @types/compression @types/cookie-parser @types/cookie-session @types/cors @types/hpp @types/node @types/ws ts-node tsc-alias tsconfig-paths @types/jsonwebtoken @types/lodash @types/express

(package.json: "dev": "nodemon --exec ts-node -r tsconfig-paths/register src/app.ts")

---

for development:
"dev": "nodemon --exec ts-node -r tsconfig-paths/register src/app.ts",

---

for production:
"build": "tsc && tsc-alias",
"start": "node build/app.js"

---

To run Node and React in one cmd:

npm install --save-dev concurrently

"dev": "concurrently \"nodemon --exec ts-node -r tsconfig-paths/register src/index.ts\" \"npm run dev --prefix ../frontend\""

---

To run Redis:

1. Go to: C:\redis
2. Open CMD
3. Run: redis-server.exe

---

tsconfig.ts:

{
"compilerOptions": {
"module": "commonjs",
"target": "es2023",
"types": ["node"],
"lib": ["DOM", "ES2023"],
"baseUrl": ".",
"outDir": "./build",
"rootDir": "./src",
"strict": true,
"noImplicitAny": true,
"noUnusedLocals": false,
"noUnusedParameters": false,
"moduleResolution": "node",
"esModuleInterop": true,
"sourceMap": true,
"experimentalDecorators": true,
"emitDecoratorMetadata": true,
"forceConsistentCasingInFileNames": true,
"allowSyntheticDefaultImports": true,
"pretty": true,
"resolveJsonModule": true,
"paths": {
"@/_": ["./src/_"],
"@/constants/_": ["./src/globals/constants/_"],
"@/helpers/_": ["./src/globals/helpers/_"],
"@/routes/_": ["./src/globals/routes/_"],
"@/core/_": ["./src/globals/core/_"],
"@/user/_": ["./src/features/user/_"],
"@/job/_": ["./src/features/job/_"],
"@/candidate/_": ["./src/features/candidate-profile/_"],
"@/company/_": ["./src/features/company/_"],
"@/apply/_": ["./src/features/apply/_"],
"@/uploads/_": ["./uploads/_"]
}
},
"files": ["src/type.d.ts"],
"include": ["src/**/*"],
"exclude": ["node_modules", "build"]
}

---

For ReactJS starter:

npm i @reduxjs/toolkit axios dayjs react-icons react-redux react-router-dom uuid --save

npm install react-hook-form zod @hookform/resolvers --save

---

Post tailwind.css and shadcn ui install:

---

changes in tsconfig.app.json:

inside "compilerOptions" block add the following:

"baseUrl": ".",
"paths": {
"@/_": ["./src/_"]
}

---

changes in tsconfig.json:

after "references" block add the following:

"compilerOptions": {
"baseUrl": ".",
"paths": {
"@/_": ["./src/_"]
}
}

---

run: npx shadcn@latest init

npx shadcn@latest add alert-dialog avatar badge breadcrumb button card checkbox collapsible dialog dropdown-menu hover-card input label pagination popover radio-group scroll-area select separator sidebar skeleton sonner switch table textarea tooltip input-group spinner field

---

for sortable:

npm i @dnd-kit/core @dnd-kit/sortable --save

---

for tanstack:

npm i @tanstack/react-query --save
npm i @tanstack/react-query-devtools --save-dev

---

for date formatting (datepicker and all):

npm i date-fns --save

---

for image upload

npm i filepond filepond-plugin-file-validate-size filepond-plugin-image-preview react-easy-crop react-filepond --save

---

for text editor (TinyMCE)

npm i tinymce @tinymce/tinymce-react --save

for overriding default border:

1. get original Oxide CSS from: node_modules > tinymce > skins > ui > oxide > skin.css
2. make copy inside public folder: publuc > oxide > skin.css
3. do changes (.tox .tox-edit-area::before)
4. import skin.css from public folder (import '../../../../public/tinymce-skins/oxide/skin.css')
