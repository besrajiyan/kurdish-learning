"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/stripe/checkout/route";
exports.ids = ["app/api/stripe/checkout/route"];
exports.modules = {

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fstripe%2Fcheckout%2Froute&page=%2Fapi%2Fstripe%2Fcheckout%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fstripe%2Fcheckout%2Froute.ts&appDir=%2FUsers%2Froj%2FDesktop%2Fkurdish-learning%2Ffrontend%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Froj%2FDesktop%2Fkurdish-learning%2Ffrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fstripe%2Fcheckout%2Froute&page=%2Fapi%2Fstripe%2Fcheckout%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fstripe%2Fcheckout%2Froute.ts&appDir=%2FUsers%2Froj%2FDesktop%2Fkurdish-learning%2Ffrontend%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Froj%2FDesktop%2Fkurdish-learning%2Ffrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_roj_Desktop_kurdish_learning_frontend_src_app_api_stripe_checkout_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/stripe/checkout/route.ts */ \"(rsc)/./src/app/api/stripe/checkout/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"standalone\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/stripe/checkout/route\",\n        pathname: \"/api/stripe/checkout\",\n        filename: \"route\",\n        bundlePath: \"app/api/stripe/checkout/route\"\n    },\n    resolvedPagePath: \"/Users/roj/Desktop/kurdish-learning/frontend/src/app/api/stripe/checkout/route.ts\",\n    nextConfigOutput,\n    userland: _Users_roj_Desktop_kurdish_learning_frontend_src_app_api_stripe_checkout_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/stripe/checkout/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZzdHJpcGUlMkZjaGVja291dCUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGc3RyaXBlJTJGY2hlY2tvdXQlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZzdHJpcGUlMkZjaGVja291dCUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRnJvaiUyRkRlc2t0b3AlMkZrdXJkaXNoLWxlYXJuaW5nJTJGZnJvbnRlbmQlMkZzcmMlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGcm9qJTJGRGVza3RvcCUyRmt1cmRpc2gtbGVhcm5pbmclMkZmcm9udGVuZCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD1zdGFuZGFsb25lJnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUNjO0FBQ2lDO0FBQzlHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnSEFBbUI7QUFDM0M7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsaUVBQWlFO0FBQ3pFO0FBQ0E7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDdUg7O0FBRXZIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8va3VyZGlzaC1sZWFybmluZy1mcm9udGVuZC8/ODFjNyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvcm9qL0Rlc2t0b3Ava3VyZGlzaC1sZWFybmluZy9mcm9udGVuZC9zcmMvYXBwL2FwaS9zdHJpcGUvY2hlY2tvdXQvcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwic3RhbmRhbG9uZVwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9zdHJpcGUvY2hlY2tvdXQvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9zdHJpcGUvY2hlY2tvdXRcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3N0cmlwZS9jaGVja291dC9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9Vc2Vycy9yb2ovRGVza3RvcC9rdXJkaXNoLWxlYXJuaW5nL2Zyb250ZW5kL3NyYy9hcHAvYXBpL3N0cmlwZS9jaGVja291dC9yb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvc3RyaXBlL2NoZWNrb3V0L3JvdXRlXCI7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHNlcnZlckhvb2tzLFxuICAgICAgICBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fstripe%2Fcheckout%2Froute&page=%2Fapi%2Fstripe%2Fcheckout%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fstripe%2Fcheckout%2Froute.ts&appDir=%2FUsers%2Froj%2FDesktop%2Fkurdish-learning%2Ffrontend%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Froj%2FDesktop%2Fkurdish-learning%2Ffrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/stripe/checkout/route.ts":
/*!**********************************************!*\
  !*** ./src/app/api/stripe/checkout/route.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var stripe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! stripe */ \"(rsc)/./node_modules/stripe/esm/stripe.esm.node.js\");\n\n\nconst stripe = new stripe__WEBPACK_IMPORTED_MODULE_1__[\"default\"](process.env.STRIPE_SECRET_KEY, {\n    apiVersion: \"2026-02-25.clover\"\n});\n// Create or get the Premium product + price\nasync function getOrCreatePrice() {\n    const prices = await stripe.prices.list({\n        lookup_keys: [\n            \"kurdi_premium_monthly\"\n        ],\n        limit: 1\n    });\n    if (prices.data.length > 0) {\n        return prices.data[0].id;\n    }\n    const product = await stripe.products.create({\n        name: \"kurdi.ch Premium\",\n        description: \"Alle Lektionen (A1–C2), Sprachausgabe, Eltern-Dashboard, werbefrei\"\n    });\n    const price = await stripe.prices.create({\n        product: product.id,\n        unit_amount: 1000,\n        currency: \"chf\",\n        recurring: {\n            interval: \"month\"\n        },\n        lookup_key: \"kurdi_premium_monthly\"\n    });\n    return price.id;\n}\nasync function POST(req) {\n    try {\n        const origin = req.headers.get(\"origin\") || \"http://localhost:3000\";\n        const body = await req.json().catch(()=>({}));\n        const { user_id, email } = body;\n        const priceId = await getOrCreatePrice();\n        const sessionParams = {\n            mode: \"subscription\",\n            payment_method_types: [\n                \"card\"\n            ],\n            line_items: [\n                {\n                    price: priceId,\n                    quantity: 1\n                }\n            ],\n            success_url: `${origin}/pricing?success=true`,\n            cancel_url: `${origin}/pricing?canceled=true`,\n            metadata: {\n                user_id: String(user_id || \"\")\n            }\n        };\n        // Pre-fill email if available\n        if (email) {\n            sessionParams.customer_email = email;\n        }\n        const session = await stripe.checkout.sessions.create(sessionParams);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            url: session.url\n        });\n    } catch (e) {\n        console.error(\"Stripe error:\", e.message);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: e.message\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9zdHJpcGUvY2hlY2tvdXQvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQXdEO0FBQzVCO0FBRTVCLE1BQU1FLFNBQVMsSUFBSUQsOENBQU1BLENBQUNFLFFBQVFDLEdBQUcsQ0FBQ0MsaUJBQWlCLEVBQUc7SUFDeERDLFlBQVk7QUFDZDtBQUVBLDRDQUE0QztBQUM1QyxlQUFlQztJQUNiLE1BQU1DLFNBQVMsTUFBTU4sT0FBT00sTUFBTSxDQUFDQyxJQUFJLENBQUM7UUFDdENDLGFBQWE7WUFBQztTQUF3QjtRQUN0Q0MsT0FBTztJQUNUO0lBRUEsSUFBSUgsT0FBT0ksSUFBSSxDQUFDQyxNQUFNLEdBQUcsR0FBRztRQUMxQixPQUFPTCxPQUFPSSxJQUFJLENBQUMsRUFBRSxDQUFDRSxFQUFFO0lBQzFCO0lBRUEsTUFBTUMsVUFBVSxNQUFNYixPQUFPYyxRQUFRLENBQUNDLE1BQU0sQ0FBQztRQUMzQ0MsTUFBTTtRQUNOQyxhQUFhO0lBQ2Y7SUFFQSxNQUFNQyxRQUFRLE1BQU1sQixPQUFPTSxNQUFNLENBQUNTLE1BQU0sQ0FBQztRQUN2Q0YsU0FBU0EsUUFBUUQsRUFBRTtRQUNuQk8sYUFBYTtRQUNiQyxVQUFVO1FBQ1ZDLFdBQVc7WUFBRUMsVUFBVTtRQUFRO1FBQy9CQyxZQUFZO0lBQ2Q7SUFFQSxPQUFPTCxNQUFNTixFQUFFO0FBQ2pCO0FBRU8sZUFBZVksS0FBS0MsR0FBZ0I7SUFDekMsSUFBSTtRQUNGLE1BQU1DLFNBQVNELElBQUlFLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLGFBQWE7UUFDNUMsTUFBTUMsT0FBTyxNQUFNSixJQUFJSyxJQUFJLEdBQUdDLEtBQUssQ0FBQyxJQUFPLEVBQUM7UUFDNUMsTUFBTSxFQUFFQyxPQUFPLEVBQUVDLEtBQUssRUFBRSxHQUFHSjtRQUUzQixNQUFNSyxVQUFVLE1BQU03QjtRQUV0QixNQUFNOEIsZ0JBQXFEO1lBQ3pEQyxNQUFNO1lBQ05DLHNCQUFzQjtnQkFBQzthQUFPO1lBQzlCQyxZQUFZO2dCQUFDO29CQUFFcEIsT0FBT2dCO29CQUFTSyxVQUFVO2dCQUFFO2FBQUU7WUFDN0NDLGFBQWEsQ0FBQyxFQUFFZCxPQUFPLHFCQUFxQixDQUFDO1lBQzdDZSxZQUFZLENBQUMsRUFBRWYsT0FBTyxzQkFBc0IsQ0FBQztZQUM3Q2dCLFVBQVU7Z0JBQUVWLFNBQVNXLE9BQU9YLFdBQVc7WUFBSTtRQUM3QztRQUVBLDhCQUE4QjtRQUM5QixJQUFJQyxPQUFPO1lBQ1RFLGNBQWNTLGNBQWMsR0FBR1g7UUFDakM7UUFFQSxNQUFNWSxVQUFVLE1BQU03QyxPQUFPOEMsUUFBUSxDQUFDQyxRQUFRLENBQUNoQyxNQUFNLENBQUNvQjtRQUV0RCxPQUFPckMscURBQVlBLENBQUNnQyxJQUFJLENBQUM7WUFBRWtCLEtBQUtILFFBQVFHLEdBQUc7UUFBQztJQUM5QyxFQUFFLE9BQU9DLEdBQVE7UUFDZkMsUUFBUUMsS0FBSyxDQUFDLGlCQUFpQkYsRUFBRUcsT0FBTztRQUN4QyxPQUFPdEQscURBQVlBLENBQUNnQyxJQUFJLENBQUM7WUFBRXFCLE9BQU9GLEVBQUVHLE9BQU87UUFBQyxHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUMvRDtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8va3VyZGlzaC1sZWFybmluZy1mcm9udGVuZC8uL3NyYy9hcHAvYXBpL3N0cmlwZS9jaGVja291dC9yb3V0ZS50cz8wMTViIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XG5pbXBvcnQgU3RyaXBlIGZyb20gJ3N0cmlwZSc7XG5cbmNvbnN0IHN0cmlwZSA9IG5ldyBTdHJpcGUocHJvY2Vzcy5lbnYuU1RSSVBFX1NFQ1JFVF9LRVkhLCB7XG4gIGFwaVZlcnNpb246ICcyMDI2LTAyLTI1LmNsb3ZlcicgYXMgYW55LFxufSk7XG5cbi8vIENyZWF0ZSBvciBnZXQgdGhlIFByZW1pdW0gcHJvZHVjdCArIHByaWNlXG5hc3luYyBmdW5jdGlvbiBnZXRPckNyZWF0ZVByaWNlKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gIGNvbnN0IHByaWNlcyA9IGF3YWl0IHN0cmlwZS5wcmljZXMubGlzdCh7XG4gICAgbG9va3VwX2tleXM6IFsna3VyZGlfcHJlbWl1bV9tb250aGx5J10sXG4gICAgbGltaXQ6IDEsXG4gIH0pO1xuXG4gIGlmIChwcmljZXMuZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIHByaWNlcy5kYXRhWzBdLmlkO1xuICB9XG5cbiAgY29uc3QgcHJvZHVjdCA9IGF3YWl0IHN0cmlwZS5wcm9kdWN0cy5jcmVhdGUoe1xuICAgIG5hbWU6ICdrdXJkaS5jaCBQcmVtaXVtJyxcbiAgICBkZXNjcmlwdGlvbjogJ0FsbGUgTGVrdGlvbmVuIChBMeKAk0MyKSwgU3ByYWNoYXVzZ2FiZSwgRWx0ZXJuLURhc2hib2FyZCwgd2VyYmVmcmVpJyxcbiAgfSk7XG5cbiAgY29uc3QgcHJpY2UgPSBhd2FpdCBzdHJpcGUucHJpY2VzLmNyZWF0ZSh7XG4gICAgcHJvZHVjdDogcHJvZHVjdC5pZCxcbiAgICB1bml0X2Ftb3VudDogMTAwMCwgLy8gMTAuMDAgQ0hGXG4gICAgY3VycmVuY3k6ICdjaGYnLFxuICAgIHJlY3VycmluZzogeyBpbnRlcnZhbDogJ21vbnRoJyB9LFxuICAgIGxvb2t1cF9rZXk6ICdrdXJkaV9wcmVtaXVtX21vbnRobHknLFxuICB9KTtcblxuICByZXR1cm4gcHJpY2UuaWQ7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcTogTmV4dFJlcXVlc3QpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBvcmlnaW4gPSByZXEuaGVhZGVycy5nZXQoJ29yaWdpbicpIHx8ICdodHRwOi8vbG9jYWxob3N0OjMwMDAnO1xuICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXEuanNvbigpLmNhdGNoKCgpID0+ICh7fSkpO1xuICAgIGNvbnN0IHsgdXNlcl9pZCwgZW1haWwgfSA9IGJvZHk7XG5cbiAgICBjb25zdCBwcmljZUlkID0gYXdhaXQgZ2V0T3JDcmVhdGVQcmljZSgpO1xuXG4gICAgY29uc3Qgc2Vzc2lvblBhcmFtczogU3RyaXBlLkNoZWNrb3V0LlNlc3Npb25DcmVhdGVQYXJhbXMgPSB7XG4gICAgICBtb2RlOiAnc3Vic2NyaXB0aW9uJyxcbiAgICAgIHBheW1lbnRfbWV0aG9kX3R5cGVzOiBbJ2NhcmQnXSxcbiAgICAgIGxpbmVfaXRlbXM6IFt7IHByaWNlOiBwcmljZUlkLCBxdWFudGl0eTogMSB9XSxcbiAgICAgIHN1Y2Nlc3NfdXJsOiBgJHtvcmlnaW59L3ByaWNpbmc/c3VjY2Vzcz10cnVlYCxcbiAgICAgIGNhbmNlbF91cmw6IGAke29yaWdpbn0vcHJpY2luZz9jYW5jZWxlZD10cnVlYCxcbiAgICAgIG1ldGFkYXRhOiB7IHVzZXJfaWQ6IFN0cmluZyh1c2VyX2lkIHx8ICcnKSB9LFxuICAgIH07XG5cbiAgICAvLyBQcmUtZmlsbCBlbWFpbCBpZiBhdmFpbGFibGVcbiAgICBpZiAoZW1haWwpIHtcbiAgICAgIHNlc3Npb25QYXJhbXMuY3VzdG9tZXJfZW1haWwgPSBlbWFpbDtcbiAgICB9XG5cbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgc3RyaXBlLmNoZWNrb3V0LnNlc3Npb25zLmNyZWF0ZShzZXNzaW9uUGFyYW1zKTtcblxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IHVybDogc2Vzc2lvbi51cmwgfSk7XG4gIH0gY2F0Y2ggKGU6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1N0cmlwZSBlcnJvcjonLCBlLm1lc3NhZ2UpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBlLm1lc3NhZ2UgfSwgeyBzdGF0dXM6IDUwMCB9KTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsIlN0cmlwZSIsInN0cmlwZSIsInByb2Nlc3MiLCJlbnYiLCJTVFJJUEVfU0VDUkVUX0tFWSIsImFwaVZlcnNpb24iLCJnZXRPckNyZWF0ZVByaWNlIiwicHJpY2VzIiwibGlzdCIsImxvb2t1cF9rZXlzIiwibGltaXQiLCJkYXRhIiwibGVuZ3RoIiwiaWQiLCJwcm9kdWN0IiwicHJvZHVjdHMiLCJjcmVhdGUiLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJwcmljZSIsInVuaXRfYW1vdW50IiwiY3VycmVuY3kiLCJyZWN1cnJpbmciLCJpbnRlcnZhbCIsImxvb2t1cF9rZXkiLCJQT1NUIiwicmVxIiwib3JpZ2luIiwiaGVhZGVycyIsImdldCIsImJvZHkiLCJqc29uIiwiY2F0Y2giLCJ1c2VyX2lkIiwiZW1haWwiLCJwcmljZUlkIiwic2Vzc2lvblBhcmFtcyIsIm1vZGUiLCJwYXltZW50X21ldGhvZF90eXBlcyIsImxpbmVfaXRlbXMiLCJxdWFudGl0eSIsInN1Y2Nlc3NfdXJsIiwiY2FuY2VsX3VybCIsIm1ldGFkYXRhIiwiU3RyaW5nIiwiY3VzdG9tZXJfZW1haWwiLCJzZXNzaW9uIiwiY2hlY2tvdXQiLCJzZXNzaW9ucyIsInVybCIsImUiLCJjb25zb2xlIiwiZXJyb3IiLCJtZXNzYWdlIiwic3RhdHVzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/stripe/checkout/route.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/stripe","vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fstripe%2Fcheckout%2Froute&page=%2Fapi%2Fstripe%2Fcheckout%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fstripe%2Fcheckout%2Froute.ts&appDir=%2FUsers%2Froj%2FDesktop%2Fkurdish-learning%2Ffrontend%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Froj%2FDesktop%2Fkurdish-learning%2Ffrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();