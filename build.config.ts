import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [],
  clean: true,
  failOnWarn: false,
  declaration: true,
  externals: [],
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
  },
})