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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/FavoriteList.js":
/*!************************************!*\
  !*** ./components/FavoriteList.js ***!
  \************************************/
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
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/promise */ "./node_modules/@babel/runtime-corejs2/core-js/promise.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! graphql-tag */ "graphql-tag");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-apollo */ "react-apollo");
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_apollo__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _shopify_polaris__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @shopify/polaris */ "@shopify/polaris");
/* harmony import */ var _shopify_polaris__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_shopify_polaris__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _shopify_polaris_icons__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @shopify/polaris-icons */ "@shopify/polaris-icons");
/* harmony import */ var _shopify_polaris_icons__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_shopify_polaris_icons__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var store_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! store-js */ "store-js");
/* harmony import */ var store_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(store_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _shopify_app_bridge_actions__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @shopify/app-bridge/actions */ "@shopify/app-bridge/actions");
/* harmony import */ var _shopify_app_bridge_actions__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_shopify_app_bridge_actions__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _shopify_app_bridge_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @shopify/app-bridge-react */ "@shopify/app-bridge-react");
/* harmony import */ var _shopify_app_bridge_react__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_shopify_app_bridge_react__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _apollo_react_hooks__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @apollo/react-hooks */ "@apollo/react-hooks");
/* harmony import */ var _apollo_react_hooks__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_apollo_react_hooks__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _ResourceList_css__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./ResourceList.css */ "./components/ResourceList.css");
/* harmony import */ var _ResourceList_css__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_ResourceList_css__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _graphql_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./graphql.js */ "./components/graphql.js");









var __jsx = react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5___default()(object); if (_babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4___default.a) { var symbols = _babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4___default()(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default()(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])(target, key, source[key]); }); } else if (_babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2___default.a) { _babel_runtime_corejs2_core_js_object_define_properties__WEBPACK_IMPORTED_MODULE_1___default()(target, _babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2___default()(source)); } else { ownKeys(Object(source)).forEach(function (key) { _babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default()(target, key, _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default()(source, key)); }); } } return target; }













class ResourceListWithProducts extends react__WEBPACK_IMPORTED_MODULE_8___default.a.Component {
  constructor(...args) {
    super(...args);

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])(this, "state", {
      favorites: {},
      bundles: {},
      selectedItems: [],
      loading: "",
      toasts: []
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])(this, "transformData", (data, searchquery, replacestring, scopes, matchcase, operation) => {
      const regsearchquery = new RegExp(searchquery, this.getRegexCase(matchcase));
      let result = {
        id: data.id
      };
      scopes.map(sco => {
        if (sco === "tags") {
          if (operation === "insert") {
            result[sco] = [replacestring, ...data[sco]];
          } else if (operation === "append") {
            result[sco] = [...data[sco], replacestring];
          } else {
            result[sco] = data[sco].map(tag => tag.replace(regsearchquery, replacestring));
          }
        } else if (sco === "description") {
          if (operation === "insert") {
            result[sco] = `<p>${replacestring}</p><p>` + data[sco] + '</p>';
          } else if (operation === "append") {
            result[sco] = '<p>' + data[sco] + `</p><p>${replacestring}</p>`;
          } else {
            result["descriptionHtml"] = '<p>' + data[sco].replace(regsearchquery, replacestring) + '</p>';
          }
        } else {
          if (operation === "insert") {
            result[sco] = replacestring + data[sco];
          } else if (operation === "append") {
            result[sco] = data[sco] + replacestring;
          } else {
            result[sco] = data[sco].replace(regsearchquery, replacestring);
          }
        }
      });
      console.log(result);
      return result;
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])(this, "handleReplace", (products, searchquery, replacestring, scopes, matchcase, operation) => {
      return new _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_6___default.a((resolve, reject) => {
        if (!products || products.length < 1) {
          reject("no product");
        }

        const promises = products.length;
        let count = promises;
        products.map(item => {
          this.props.apolloClient.mutate({
            mutation: _graphql_js__WEBPACK_IMPORTED_MODULE_19__["UPDATE_PRODUCTS"],
            variables: {
              input: this.transformData(item.node, searchquery, replacestring, scopes, matchcase, operation)
            }
          }).then(response => {
            console.log(response);
            count -= 1;

            if (count === 0) {
              resolve({
                promises,
                searchquery,
                replacestring
              });
            }
          });
        });
      });
    });
  }

  randomString(length) {
    return Math.round(Math.pow(36, length + 1) - Math.random() * Math.pow(36, length)).toString(36).slice(1);
  }

  getRegexCase(matchcase) {
    return matchcase ? "g" : "gi";
  }

  setSelectedItems(selectedItems) {
    console.log(selectedItems);
    return this.setState({
      selectedItems
    });
  }

  ObjtoArray(obj) {
    return _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5___default()(obj).map(key => {
      return _objectSpread({}, obj[key], {
        key
      });
    });
  }

  ArrayobjtoArray(obj) {
    return _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5___default()(obj).map(key => {
      return {
        content: obj[key],
        key
      };
    });
  }

  componentDidMount() {
    this.fetchQuery();
    const favorites = store_js__WEBPACK_IMPORTED_MODULE_13___default.a.get("favorite") ? store_js__WEBPACK_IMPORTED_MODULE_13___default.a.get("favorite") : {};
    const bundles = store_js__WEBPACK_IMPORTED_MODULE_13___default.a.get("bundle") ? store_js__WEBPACK_IMPORTED_MODULE_13___default.a.get("bundle") : {}; // if(Object.keys.length(bundles)===0){
    //     store.set("bundle",{})
    // }

    console.log(favorites);
    console.log(bundles);
    this.setState({
      favorites,
      bundles
    });
  }

  fetchQuery() {
    this.setState({
      fetching: true
    });
    this.props.apolloClient.query({
      query: _graphql_js__WEBPACK_IMPORTED_MODULE_19__["LIST_PRODUCTS"]
    }).then(response => this.setState({
      allproducts: response.data.products.edges,
      fetching: false
    }));
  }

  filterQuery(searchquery, scopes, matchcase, operation) {
    return new _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_6___default.a((resolve, reject) => {
      if (operation === "insert" || opertaion === "append") {
        return this.state.allproducts;
      } else if (searchquery !== "" && scopes.length !== 0 && this.state.allproducts.length !== 0) {
        const currentproducts = this.state.allproducts.filter(prod => {
          const regx = new RegExp(searchquery, this.getRegexCase(matchcase));
          return scopes.some(sco => {
            if (sco === "tags") {
              return prod.node[sco].join("/n").search(regx) > -1;
            }

            return prod.node[sco].search(regx) > -1;
          });
        });
        console.log("currentproducts");
        resolve(currentproducts);
      } else {
        resolve([]);
      }
    });
  }

  runFavorite(key) {
    const {
      searchquery,
      replacestring,
      scopes,
      matchcase,
      operation
    } = this.state.favorites[key];
    this.setState({
      loading: key
    });
    this.filterQuery(searchquery, scopes, matchcase, operation).then(response => {
      console.log(response);

      if (response && response.length > 0) {
        this.handleReplace(response, searchquery, replacestring, scopes, matchcase, operation).then(res => {
          this.setState({
            loading: null,
            toasts: [...this.state.toasts, {
              key: this.randomString(10),
              content: `${res.promises} products changed.`
            }]
          });
          this.fetchQuery();
        });
      } else {
        this.setState({
          loading: null,
          toasts: [...this.state.toasts, {
            key: this.randomString(10),
            content: `no matching product found`
          }]
        });
      }
    });
  }

  removeFavorite(key) {
    const {
      favorites
    } = this.state;
    delete favorites[key];
    store_js__WEBPACK_IMPORTED_MODULE_13___default.a.set("favorite", favorites);
    this.setState({
      favorites
    });
  }

  createBundle() {
    const {
      favorites,
      bundles
    } = this.state;
    const newbundle = this.state.selectedItems.reduce((bundle, key) => {
      console.log(bundle);
      const fav = favorites[key];
      console.log(fav);
      delete favorites[key];
      return [...bundle, fav];
    }, []);
    const newbundlekey = "bundle:" + this.state.selectedItems.join(';');
    console.log(newbundle);
    console.log(newbundlekey);
    console.log(favorites);
    store_js__WEBPACK_IMPORTED_MODULE_13___default.a.set("favorite", favorites);
    let newbundles;

    if (!store_js__WEBPACK_IMPORTED_MODULE_13___default.a.get('bundle')) {
      console.log("no current bundle");
      newbundles = {
        [newbundlekey]: newbundle
      };
    } else {
      newbundles = _objectSpread({}, bundles, {
        [newbundlekey]: newbundle
      });
    }

    store_js__WEBPACK_IMPORTED_MODULE_13___default.a.set("bundle", newbundles);
    this.setState({
      selectedItems: [],
      favorites,
      bundles: newbundles
    });
  }

  unbundle(key) {
    const {
      favorites,
      bundles
    } = this.state;
    const bundle = bundles[key];
    bundle.map(fav => {
      const hashedfav = _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5___default()(fav).sort().map(x => fav[x].toString()).join(";");

      favorites[hashedfav] = fav;
    });
    delete bundles[key];
    console.log(bundles);
    console.log(favorites);
    store_js__WEBPACK_IMPORTED_MODULE_13___default.a.set("favorite", favorites);
    store_js__WEBPACK_IMPORTED_MODULE_13___default.a.set("bundle", bundles);
    this.setState({
      favorites,
      bundles
    });
  }

  runBundle(key) {
    const bundle = this.state.bundles[key];
    this.setState({
      loading: key
    });
    const bundles = bundle.length;
    let count = bundles;
    bundle.map(fav => {
      const {
        searchquery,
        replacestring,
        scopes,
        matchcase,
        operation
      } = fav;
      this.filterQuery(searchquery, scopes, matchcase, operation).then(response => {
        console.log(response);

        if (response && response.length > 0) {
          this.handleReplace(response, searchquery, replacestring, scopes, matchcase, operation).then(res => {
            this.setState({
              toasts: [...this.state.toasts, {
                key: this.randomString(10),
                content: `${res.promises} products changed.`
              }]
            }, () => {
              count -= 1;

              if (count === 0) {
                this.setState({
                  loading: null,
                  toasts: [...this.state.toasts, {
                    key: this.randomString(10),
                    content: `bundle completed.`
                  }]
                });
                this.fetchQuery();
              }
            });
          });
        } else {
          this.setState({
            toasts: [...this.state.toasts, {
              key: this.randomString(10),
              content: `no matching product found.`
            }]
          }, () => {
            count -= 1;

            if (count === 0) {
              this.setState({
                loading: null,
                toasts: [...this.state.toasts, {
                  key: this.randomString(10),
                  content: `bundle completed.`
                }]
              });
              this.fetchQuery();
            }
          });
        }
      });
    });
  }

  render() {
    const toastMarkup = this.state.toasts.map(toast => {
      return __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_11__["Toast"], {
        key: toast.key,
        content: toast.content,
        onDismiss: () => this.setState({
          toasts: this.state.toasts.filter(to => to.key !== toast.key)
        })
      });
    });
    return __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_11__["Frame"], null, __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_11__["Card"], null, __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_11__["ResourceList"], {
      resourceName: {
        singular: 'favorite',
        plural: 'favorites'
      },
      items: this.ObjtoArray(this.state.favorites),
      selectedItems: this.state.selectedItems,
      onSelectionChange: this.setSelectedItems.bind(this),
      selectable: true,
      promotedBulkActions: [{
        content: 'Bundle',
        onAction: () => this.createBundle()
      }],
      renderItem: item => {
        const {
          key,
          searchquery,
          replacestring,
          matchcase,
          scopes,
          operation
        } = item;
        const shortcutActions = [{
          content: 'Run',
          loading: this.state.loading === key,
          onAction: () => this.runFavorite(key)
        }, {
          content: 'Remove',
          onAction: () => this.removeFavorite(key)
        }];
        const title = {
          "find": `Find "${searchquery}"`,
          "insert": "Insert in front",
          "append": "Append to end"
        };
        return __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_11__["ResourceItem"], {
          id: key,
          key: key,
          shortcutActions: shortcutActions,
          persistActions: true,
          name: searchquery
        }, __jsx("h3", null, __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_11__["TextStyle"], {
          variation: "strong"
        }, title[operation], " | "), __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_11__["TextStyle"], {
          variation: "subdued"
        }, "in (", scopes.toString(), ")")), __jsx("div", null, searchquery === 'find' ? "Replace" : "", " with :\"", replacestring, "\" ", matchcase ? "(Case Sensitive)" : "(Case Insensitive)"));
      }
    })), __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_11__["Card"], null, __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_11__["ResourceList"], {
      resourceName: {
        singular: 'bundle',
        plural: 'bundles'
      },
      items: this.ArrayobjtoArray(this.state.bundles),
      renderItem: item => {
        const {
          key,
          content
        } = item;
        const shortcutActions = [{
          content: 'Run',
          loading: this.state.loading === key,
          onAction: () => this.runBundle(key)
        }, {
          content: 'Unbundle',
          onAction: () => this.unbundle(key)
        }];
        return __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_11__["ResourceItem"], {
          id: key,
          key: key,
          persistActions: true,
          shortcutActions: shortcutActions
        }, __jsx("h3", null, __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_11__["TextStyle"], {
          variation: "strong"
        }, "Bundle")), content.map(item => {
          const title = {
            "find": `Find "${item.searchquery}"`,
            "insert": "Insert in front",
            "append": "Append to end"
          };
          return __jsx("div", null, title[item.operation], " in (", item.scopes.toString(), "); ", item.searchquery === 'find' ? "Replace" : "", " with :\"", item.replacestring, "\" ", item.matchcase ? "(Case Sensitive)" : "(Case Insensitive)");
        }));
      }
    })), this.state.showtoast ? __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_11__["Toast"], {
      content: this.state.toastcontent,
      onDismiss: () => this.setState({
        showtoast: false
      })
    }) : null, toastMarkup);
  }

}

Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])(ResourceListWithProducts, "contextType", _shopify_app_bridge_react__WEBPACK_IMPORTED_MODULE_15__["Context"]);

/* harmony default export */ __webpack_exports__["default"] = (ResourceListWithProducts);

/***/ }),

/***/ "./components/ResourceList.css":
/*!*************************************!*\
  !*** ./components/ResourceList.css ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./components/graphql.js":
/*!*******************************!*\
  !*** ./components/graphql.js ***!
  \*******************************/
/*! exports provided: UPDATE_PRODUCTS, SEARCH_PRODUCTS, LIST_PRODUCTS, constructSearchProduct */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_PRODUCTS", function() { return UPDATE_PRODUCTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SEARCH_PRODUCTS", function() { return SEARCH_PRODUCTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LIST_PRODUCTS", function() { return LIST_PRODUCTS; });
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
const LIST_PRODUCTS = graphql_tag__WEBPACK_IMPORTED_MODULE_0___default.a`
  query getProducts {
    products(first:100) {
        edges {
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

/***/ "./node_modules/@babel/runtime-corejs2/core-js/promise.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/promise.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/promise */ "core-js/library/fn/promise");

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

/***/ "./pages/favorite.js":
/*!***************************!*\
  !*** ./pages/favorite.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _shopify_polaris__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shopify/polaris */ "@shopify/polaris");
/* harmony import */ var _shopify_polaris__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_shopify_polaris__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _shopify_app_bridge_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @shopify/app-bridge-react */ "@shopify/app-bridge-react");
/* harmony import */ var _shopify_app_bridge_react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_shopify_app_bridge_react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var store_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! store-js */ "store-js");
/* harmony import */ var store_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(store_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_FavoriteList_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/FavoriteList.js */ "./components/FavoriteList.js");


var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;




const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

class Favorite extends react__WEBPACK_IMPORTED_MODULE_1___default.a.Component {
  constructor(...args) {
    super(...args);

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "state", {
      open: false
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "handleSelection", resources => {
      const idsFromResources = resources.selection.map(product => product.id);
      this.setState({
        open: false
      });
      store_js__WEBPACK_IMPORTED_MODULE_4___default.a.set('ids', idsFromResources);
    });
  }

  render() {
    // const emptyState = !store.get('ids');
    const emptyState = false;
    console.log(this.props);
    return __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_2__["Page"], null, emptyState ? __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_2__["Layout"], null, __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_2__["EmptyState"], {
      heading: "You dont have favorite yet",
      action: {
        content: 'Go to main page',
        onAction: () => this.setState({
          open: true
        })
      },
      image: img
    }, __jsx("p", null, "Create Find and Replace and save it to favorite"))) : __jsx(_components_FavoriteList_js__WEBPACK_IMPORTED_MODULE_5__["default"], {
      apolloClient: this.props.apolloClient
    }));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Favorite);

/***/ }),

/***/ 4:
/*!*********************************!*\
  !*** multi ./pages/favorite.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/edwang09/Documents/Upwork/Shopify/pages/favorite.js */"./pages/favorite.js");


/***/ }),

/***/ "@apollo/react-hooks":
/*!**************************************!*\
  !*** external "@apollo/react-hooks" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@apollo/react-hooks");

/***/ }),

/***/ "@shopify/app-bridge-react":
/*!********************************************!*\
  !*** external "@shopify/app-bridge-react" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@shopify/app-bridge-react");

/***/ }),

/***/ "@shopify/app-bridge/actions":
/*!**********************************************!*\
  !*** external "@shopify/app-bridge/actions" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@shopify/app-bridge/actions");

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

/***/ "core-js/library/fn/promise":
/*!*********************************************!*\
  !*** external "core-js/library/fn/promise" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/promise");

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

/***/ "react-apollo":
/*!*******************************!*\
  !*** external "react-apollo" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-apollo");

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
//# sourceMappingURL=favorite.js.map