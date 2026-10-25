module.exports = [
"[project]/apps/web/src/lib/hero3d.js [app-ssr] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/node_modules_three_build_three_module_1blrau2.js",
  "server/chunks/ssr/node_modules_three_examples_jsm_09wai1b._.js",
  "server/chunks/ssr/apps_web_src_lib_hero3d_0ia5tjw.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/apps/web/src/lib/hero3d.js [app-ssr] (ecmascript)");
    });
});
}),
];