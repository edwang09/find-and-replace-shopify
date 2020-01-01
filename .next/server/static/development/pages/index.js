module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/graphql.js":
/*!*******************************!*\
  !*** ./components/graphql.js ***!
  \*******************************/
/*! exports provided: UPDATE_PRODUCTS, SEARCH_PRODUCTS, constructListproduct, constructSearchProduct */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_PRODUCTS", function() { return UPDATE_PRODUCTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SEARCH_PRODUCTS", function() { return SEARCH_PRODUCTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "constructListproduct", function() { return constructListproduct; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "constructSearchProduct", function() { return constructSearchProduct; });
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphql-tag */ "graphql-tag");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_0__);

const UPDATE_PRODUCTS = graphql_tag__WEBPACK_IMPORTED_MODULE_0___default.a`
  mutation productUpdate($input: ProductInput!) {
    productUpdate(input: $input) {
      product {
        id
        title
        handle
        description
      }
      userErrors {
        field
        message
      }
    }
  }
`;
const SEARCH_PRODUCTS = graphql_tag__WEBPACK_IMPORTED_MODULE_0___default.a`
  query getProducts($searchquery: String!) {
    products(query: $searchquery first: 50) {
      edges {
        node {
          title
          handle
          description
          id
          variants(first: 1) {
            edges {
              node {
                price
                id
              }
            }
          }
        }
      }
    }
  }
`;
const constructListproduct = cursor => {
  let addon = "";

  if (cursor) {
    addon = `, after : "${cursor}"`;
  }

  return graphql_tag__WEBPACK_IMPORTED_MODULE_0___default.a`
  query getProducts {
    products(first:50 ${addon}) {
        pageInfo { 
          hasNextPage 
          hasPreviousPage 
        }
        edges {
            cursor
            node {
                title
                handle
                description
                productType
                tags
                vendor
                id
                variants(first: 1) {
                    edges {
                        node {
                            price
                            sku
                            id
                        }
                    }
                }
            }
        }
    }
  }
`;
};
const constructSearchProduct = (productList, VariantList) => {
  return graphql_tag__WEBPACK_IMPORTED_MODULE_0___default.a`
    query getProducts($searchquery: String!) {
      products(query: $searchquery first: 50) {
        edges {
          node {
              ${productList.join("\n")}
            id
            variants(first: 1) {
              edges {
                node {
                  ${VariantList.join("\n")}
                  id
                }
              }
            }
          }
        }
      }
    }
  `;
};

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/define-properties.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/define-properties.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/define-properties */ "core-js/library/fn/object/define-properties");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/define-property */ "core-js/library/fn/object/define-property");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptor.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptor.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/get-own-property-descriptor */ "core-js/library/fn/object/get-own-property-descriptor");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptors.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptors.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/get-own-property-descriptors */ "core-js/library/fn/object/get-own-property-descriptors");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-symbols.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-symbols.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/get-own-property-symbols */ "core-js/library/fn/object/get-own-property-symbols");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/keys.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/keys.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/keys */ "core-js/library/fn/object/keys");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _defineProperty; });
/* harmony import */ var _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/object/define-property */ "./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js");
/* harmony import */ var _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default()(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/***/ }),

/***/ "./pages/index.css":
/*!*************************!*\
  !*** ./pages/index.css ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/define-property */ "./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_properties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/define-properties */ "./node_modules/@babel/runtime-corejs2/core-js/object/define-properties.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_properties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_define_properties__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/get-own-property-descriptors */ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptors.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/get-own-property-descriptor */ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptor.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/get-own-property-symbols */ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-symbols.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/keys */ "./node_modules/@babel/runtime-corejs2/core-js/object/keys.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var store_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! store-js */ "store-js");
/* harmony import */ var store_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(store_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _shopify_polaris__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @shopify/polaris */ "@shopify/polaris");
/* harmony import */ var _shopify_polaris__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_shopify_polaris__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _shopify_polaris_icons__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @shopify/polaris-icons */ "@shopify/polaris-icons");
/* harmony import */ var _shopify_polaris_icons__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_shopify_polaris_icons__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _shopify_app_bridge_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @shopify/app-bridge-react */ "@shopify/app-bridge-react");
/* harmony import */ var _shopify_app_bridge_react__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_shopify_app_bridge_react__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./index.css */ "./pages/index.css");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _components_graphql__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../components/graphql */ "./components/graphql.js");








var __jsx = react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5___default()(object); if (_babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4___default.a) { var symbols = _babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4___default()(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default()(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(target, key, source[key]); }); } else if (_babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2___default.a) { _babel_runtime_corejs2_core_js_object_define_properties__WEBPACK_IMPORTED_MODULE_1___default()(target, _babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2___default()(source)); } else { ownKeys(Object(source)).forEach(function (key) { _babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default()(target, key, _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default()(source, key)); }); } } return target; }









class Index extends react__WEBPACK_IMPORTED_MODULE_7___default.a.Component {
  constructor(...args) {
    super(...args);

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(this, "state", {
      fetching: true,
      loading: false,
      searchquery: "",
      replacestring: "",
      matchcase: false,
      saved: false,
      scopes: [],
      scopesV: [],
      products: [],
      allproducts: [],
      operation: 'find'
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(this, "handleScopeSelect", (scope, isVariant) => () => {
      const scopetype = isVariant ? "scopesV" : "scopes";
      const scopes = this.state[scopetype];
      const selected = this.state[scopetype].findIndex(sco => sco === scope) > -1;

      if (selected) {
        this.setState({
          [scopetype]: scopes.filter(sco => sco !== scope)
        }, () => {
          this.filterQuery();
        });
      } else {
        this.setState({
          [scopetype]: [...scopes, scope]
        }, () => {
          this.filterQuery();
        });
      }
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(this, "toggleFavorite", () => {
      console.log("toggle fav");
      const favorite = store_js__WEBPACK_IMPORTED_MODULE_8___default.a.get('favorite');

      const searchform = lodash__WEBPACK_IMPORTED_MODULE_12___default.a.pick(this.state, ['searchquery', 'replacestring', 'matchcase', 'scopes', 'operation']);

      const hashedfav = _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5___default()(searchform).sort().map(x => searchform[x].toString()).join(";");

      if (!this.state.saved) {
        if (!store_js__WEBPACK_IMPORTED_MODULE_8___default.a.get('favorite')) {
          console.log("no current fav");
          console.log("hashedfav:" + hashedfav);
          store_js__WEBPACK_IMPORTED_MODULE_8___default.a.set("favorite", {
            [hashedfav]: searchform
          });
        } else {
          console.log(store_js__WEBPACK_IMPORTED_MODULE_8___default.a.get('favorite'));
          store_js__WEBPACK_IMPORTED_MODULE_8___default.a.set("favorite", _objectSpread({}, favorite, {
            [hashedfav]: searchform
          }));
        }

        this.setState({
          saved: true
        });
      } else {
        delete favorite[hashedfav];
        store_js__WEBPACK_IMPORTED_MODULE_8___default.a.set("favorite", favorite);
        this.setState({
          saved: false
        });
      }
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(this, "handleChange", field => value => {
      if (field === "operation") {
        value = value[0];
      }

      this.setState({
        [field]: value
      }, () => {
        const searchform = lodash__WEBPACK_IMPORTED_MODULE_12___default.a.pick(this.state, ['searchquery', 'replacestring', 'matchcase', 'scopes']);

        const hashedfav = _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5___default()(searchform).sort().map(x => searchform[x].toString()).join(";");

        const saved = store_js__WEBPACK_IMPORTED_MODULE_8___default.a.get('favorite') && store_js__WEBPACK_IMPORTED_MODULE_8___default.a.get('favorite')[hashedfav];
        this.setState({
          saved
        });
        this.filterQuery();
      });
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(this, "handleReplace", () => {
      if (!this.state.products || this.state.products.length < 1) {
        return;
      }

      this.setState({
        loading: true
      });
      const promises = this.state.products.length;
      let count = promises;
      this.state.products.map((item, idx) => {
        this.props.apolloClient.mutate({
          mutation: _components_graphql__WEBPACK_IMPORTED_MODULE_14__["UPDATE_PRODUCTS"],
          variables: {
            input: this.transformData(item.node)
          }
        }).then(response => {
          console.log(response);
          count -= 1;

          if (count === 0) {
            this.fetchQuery();
            this.setState({
              loading: false,
              showtoast: true,
              currentproducts: [],
              toastcontent: `${promises} products changed.`
            });
          }
        });
      });
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(this, "transformData", data => {
      const searchquery = this.getRegex(this.state.searchquery);
      let result = {
        id: data.id
      };
      const {
        operation
      } = this.state;
      this.state.scopes.map(sco => {
        if (sco === "tags") {
          if (operation === "insert") {
            result[sco] = [this.state.replacestring, ...data[sco]];
          } else if (operation === "append") {
            result[sco] = [...data[sco], this.state.replacestring];
          } else {
            result[sco] = data[sco].map(tag => tag.replace(searchquery, this.state.replacestring));
          }
        } else if (sco === "description") {
          if (operation === "insert") {
            result[sco] = `<p>${this.state.replacestring}</p><p>` + data[sco] + '</p>';
          } else if (operation === "append") {
            result[sco] = '<p>' + data[sco] + `</p><p>${this.state.replacestring}</p>`;
          } else {
            result["descriptionHtml"] = '<p>' + data[sco].replace(searchquery, this.state.replacestring) + '</p>';
          }
        } else {
          if (operation === "insert") {
            result[sco] = this.state.replacestring + data[sco];
          } else if (operation === "append") {
            result[sco] = data[sco] + this.state.replacestring;
          } else {
            result[sco] = data[sco].replace(searchquery, this.state.replacestring);
          }
        }
      });
      console.log(result);
      return result;
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(this, "InjectHighlight", text => {
      if (!text) {
        return "NA";
      }

      const replace = this.getRegex(this.state.searchquery);
      return __jsx("span", {
        dangerouslySetInnerHTML: {
          __html: text.replace(replace, function (x) {
            return `<span style="background-color:yellow">${x}</span>`;
          })
        }
      });
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(this, "ConvertDatatoTable", data => {
      if (!data || data.length < 1) {
        return [[]];
      }

      return data.map(item => {
        const node = item.node;
        return this.getHeader().map(sco => {
          if (sco === "tags") {
            if (this.state.scopes.findIndex(scope => sco === scope) == -1) {
              return node[sco].join("/n");
            }

            return this.InjectHighlight(node[sco].join("/n"));
          }

          if (this.state.scopes.findIndex(scope => sco === scope) == -1) {
            return node[sco];
          }

          return this.InjectHighlight(node[sco]);
        });
      });
    });
  }

  componentDidMount() {
    this.fetchQuery();
  }

  getRegexCase() {
    return this.state.matchcase ? "g" : "gi";
  }

  getRegex(searchquery) {
    return new RegExp(searchquery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), this.getRegexCase());
  }

  async fetchQuery() {
    console.log("fetch");
    this.setState({
      fetching: true
    });
    let fetch = true;
    let cursor;

    while (fetch) {
      const response = await this.props.apolloClient.query({
        query: Object(_components_graphql__WEBPACK_IMPORTED_MODULE_14__["constructListproduct"])(cursor)
      });
      console.log(response.data);
      fetch = response.data.products.pageInfo.hasNextPage;
      cursor = response.data.products.edges[response.data.products.edges.length - 1].cursor;
      this.setState({
        allproducts: [...this.state.allproducts, ...response.data.products.edges]
      });
    }

    this.setState({
      fetching: false
    });
  }

  filterQuery() {
    console.log("filter");
    console.log(this.state.allproducts);

    if (this.state.operation === "insert" || this.state.operation === "append") {
      this.setState({
        products: this.state.allproducts
      });
    } else if (this.state.searchquery !== "" && this.state.scopes.length + this.state.scopesV.length !== 0 && this.state.allproducts !== 0) {
      const currentproducts = this.state.allproducts.filter(prod => {
        const regx = this.getRegex(this.state.searchquery);
        return this.state.scopes.some(sco => {
          if (sco === "tags") {
            return prod.node[sco].join("/n").search(regx) > -1;
          }

          return prod.node[sco].search(regx) > -1;
        });
      });
      console.log(currentproducts);
      this.setState({
        products: currentproducts
      });
    } else {
      this.setState({
        products: []
      });
    }
  }

  getHeader() {
    return ["title", "handle", ...this.state.scopes.filter(sco => sco !== "title" && sco !== "handle")];
  }

  getHeaderType() {
    return Array(this.state.scopes.length).fill('text');
  }

  isScopeSelected(scope, isVariant) {
    if (isVariant) {
      return this.state.scopesV.findIndex(sco => sco === scope) > -1;
    }

    return this.state.scopes.findIndex(sco => sco === scope) > -1;
  }

  render() {
    const app = this.context;
    const placeholder = {
      "find": "Replace with",
      "insert": "Insert text",
      "append": "Append text"
    };
    return __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_9__["Page"], {
      fullWidth: true
    }, __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_9__["Frame"], null, __jsx("div", {
      className: "form-container"
    }, __jsx("h3", null, __jsx("b", null, "Operation: ")), __jsx("div", {
      className: "form-row"
    }, __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_9__["ChoiceList"] // title="Operation: "
    , {
      choices: [{
        label: 'Find and Place',
        value: 'find'
      }, {
        label: 'Insert in front',
        value: 'insert'
      }, {
        label: 'Append to end',
        value: 'append'
      }],
      selected: this.state.operation,
      onChange: this.handleChange('operation')
    })), this.state.operation === 'find' && __jsx("div", {
      className: "form-row"
    }, __jsx("div", {
      className: "form-input"
    }, __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_9__["TextField"], {
      placeholder: "Find",
      value: this.state.searchquery,
      onChange: this.handleChange('searchquery')
    }))), __jsx("h3", null, __jsx("b", null, "In fields: ")), __jsx("div", {
      className: "form-row"
    }, __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_9__["Checkbox"], {
      label: "Title",
      checked: this.isScopeSelected('title'),
      onChange: this.handleScopeSelect('title')
    }), __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_9__["Checkbox"], {
      label: "Handle",
      checked: this.isScopeSelected('handle'),
      onChange: this.handleScopeSelect('handle')
    }), __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_9__["Checkbox"], {
      label: "Product types",
      checked: this.isScopeSelected('productType'),
      onChange: this.handleScopeSelect('productType')
    }), __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_9__["Checkbox"], {
      label: "Vendor",
      checked: this.isScopeSelected('vendor'),
      onChange: this.handleScopeSelect('vendor')
    }), __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_9__["Checkbox"], {
      label: "Tags",
      checked: this.isScopeSelected('tags'),
      onChange: this.handleScopeSelect('tags')
    }), __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_9__["Checkbox"], {
      label: "Description",
      checked: this.isScopeSelected('description'),
      onChange: this.handleScopeSelect('description')
    })), __jsx("h3", null, __jsx("b", null, "Variant fields"), "(not in use): "), __jsx("div", {
      className: "form-row"
    }, __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_9__["Checkbox"], {
      label: "Price",
      disabled: true,
      checked: this.isScopeSelected('price', true),
      onChange: this.handleScopeSelect('price', true)
    }), __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_9__["Checkbox"], {
      label: "SKU",
      disabled: true,
      checked: this.isScopeSelected('sku', true),
      onChange: this.handleScopeSelect('sku', true)
    })), __jsx("div", {
      className: "form-row"
    }, __jsx("div", {
      className: "form-input"
    }, __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_9__["TextField"], {
      placeholder: placeholder[this.state.operation],
      value: this.state.replacestring,
      onChange: this.handleChange('replacestring')
    })), __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_9__["Button"], {
      className: "form-button",
      loading: this.state.loading,
      onClick: this.handleReplace.bind(this)
    }, "Replace ")), __jsx("div", {
      className: "form-row"
    }, __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_9__["Checkbox"], {
      label: "Match case",
      checked: this.state.matchcase,
      onChange: this.handleChange('matchcase')
    }), __jsx("a", {
      className: "form-item",
      onClick: this.toggleFavorite.bind(this)
    }, __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_9__["Icon"], {
      source: this.state.saved ? _shopify_polaris_icons__WEBPACK_IMPORTED_MODULE_10__["StarFilledMinor"] : _shopify_polaris_icons__WEBPACK_IMPORTED_MODULE_10__["StarOutlineMinor"]
    }), __jsx("p", null, this.state.saved ? "Saved" : "Save to Favorite")))), __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_9__["Card"], null, __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_9__["DataTable"], {
      columnContentTypes: this.getHeaderType(),
      headings: this.getHeader(),
      rows: this.ConvertDatatoTable(this.state.products)
    })), this.state.showtoast ? __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_9__["Toast"], {
      content: this.state.toastcontent,
      onDismiss: () => this.setState({
        showtoast: false
      })
    }) : null));
  }

}

Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(Index, "contextType", _shopify_app_bridge_react__WEBPACK_IMPORTED_MODULE_11__["Context"]);

/* harmony default export */ __webpack_exports__["default"] = (Index);

/***/ }),

/***/ 5:
/*!******************************!*\
  !*** multi ./pages/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/edwang09/Documents/Upwork/Shopify/pages/index.js */"./pages/index.js");


/***/ }),

/***/ "@shopify/app-bridge-react":
/*!********************************************!*\
  !*** external "@shopify/app-bridge-react" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@shopify/app-bridge-react");

/***/ }),

/***/ "@shopify/polaris":
/*!***********************************!*\
  !*** external "@shopify/polaris" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@shopify/polaris");

/***/ }),

/***/ "@shopify/polaris-icons":
/*!*****************************************!*\
  !*** external "@shopify/polaris-icons" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@shopify/polaris-icons");

/***/ }),

/***/ "core-js/library/fn/object/define-properties":
/*!**************************************************************!*\
  !*** external "core-js/library/fn/object/define-properties" ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/define-properties");

/***/ }),

/***/ "core-js/library/fn/object/define-property":
/*!************************************************************!*\
  !*** external "core-js/library/fn/object/define-property" ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/define-property");

/***/ }),

/***/ "core-js/library/fn/object/get-own-property-descriptor":
/*!************************************************************************!*\
  !*** external "core-js/library/fn/object/get-own-property-descriptor" ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/get-own-property-descriptor");

/***/ }),

/***/ "core-js/library/fn/object/get-own-property-descriptors":
/*!*************************************************************************!*\
  !*** external "core-js/library/fn/object/get-own-property-descriptors" ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/get-own-property-descriptors");

/***/ }),

/***/ "core-js/library/fn/object/get-own-property-symbols":
/*!*********************************************************************!*\
  !*** external "core-js/library/fn/object/get-own-property-symbols" ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/get-own-property-symbols");

/***/ }),

/***/ "core-js/library/fn/object/keys":
/*!*************************************************!*\
  !*** external "core-js/library/fn/object/keys" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/keys");

/***/ }),

/***/ "graphql-tag":
/*!******************************!*\
  !*** external "graphql-tag" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql-tag");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "store-js":
/*!***************************!*\
  !*** external "store-js" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("store-js");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map