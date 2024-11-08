import { defineConfig } from 'vite';

export default defineConfig({
    esbuild: {
        jsx: "transform",
        jsxDev: false,
        jsxImportSource: "vikk",
        jsxInject: `import vikk from 'vikk'`,
        jsxFactory: "vikk"
    }
});