import esbuild from 'esbuild';

esbuild.build({
    entryPoints: ['src/main.ts'],
    bundle: true,
    platform: 'node',
    outfile: 'dist/index.js',
    minify: true,
    sourcemap: true,
    target: 'node20'
})