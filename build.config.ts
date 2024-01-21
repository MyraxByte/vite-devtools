import { BuildConfig } from "unbuild"

export default [{
  entries: ["src/index.ts"],
  outDir: "dist",
  clean: true,
  declaration: true,
  externals: [],
  rollup: {
    emitCJS: true,
    esbuild: {
      minify: true
    },
    inlineDependencies: true,
  },
}] as BuildConfig[]