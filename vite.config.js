import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/mawada-academy/", // <-- أضيفي هذا السطر (بنفس اسم الـ Repo)
});
