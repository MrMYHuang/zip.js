(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.zip = {}));
})(this, (function (exports) { 'use strict';

  function _regeneratorRuntime() {
    /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */

    _regeneratorRuntime = function () {
      return exports;
    };

    var exports = {},
        Op = Object.prototype,
        hasOwn = Op.hasOwnProperty,
        $Symbol = "function" == typeof Symbol ? Symbol : {},
        iteratorSymbol = $Symbol.iterator || "@@iterator",
        asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
        toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function define(obj, key, value) {
      return Object.defineProperty(obj, key, {
        value: value,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), obj[key];
    }

    try {
      define({}, "");
    } catch (err) {
      define = function (obj, key, value) {
        return obj[key] = value;
      };
    }

    function wrap(innerFn, outerFn, self, tryLocsList) {
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
          generator = Object.create(protoGenerator.prototype),
          context = new Context(tryLocsList || []);
      return generator._invoke = function (innerFn, self, context) {
        var state = "suspendedStart";
        return function (method, arg) {
          if ("executing" === state) throw new Error("Generator is already running");

          if ("completed" === state) {
            if ("throw" === method) throw arg;
            return doneResult();
          }

          for (context.method = method, context.arg = arg;;) {
            var delegate = context.delegate;

            if (delegate) {
              var delegateResult = maybeInvokeDelegate(delegate, context);

              if (delegateResult) {
                if (delegateResult === ContinueSentinel) continue;
                return delegateResult;
              }
            }

            if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
              if ("suspendedStart" === state) throw state = "completed", context.arg;
              context.dispatchException(context.arg);
            } else "return" === context.method && context.abrupt("return", context.arg);
            state = "executing";
            var record = tryCatch(innerFn, self, context);

            if ("normal" === record.type) {
              if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
              return {
                value: record.arg,
                done: context.done
              };
            }

            "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
          }
        };
      }(innerFn, self, context), generator;
    }

    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }

    exports.wrap = wrap;
    var ContinueSentinel = {};

    function Generator() {}

    function GeneratorFunction() {}

    function GeneratorFunctionPrototype() {}

    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function () {
      return this;
    });
    var getProto = Object.getPrototypeOf,
        NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);

    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        define(prototype, method, function (arg) {
          return this._invoke(method, arg);
        });
      });
    }

    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);

        if ("throw" !== record.type) {
          var result = record.arg,
              value = result.value;
          return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          }) : PromiseImpl.resolve(value).then(function (unwrapped) {
            result.value = unwrapped, resolve(result);
          }, function (error) {
            return invoke("throw", error, resolve, reject);
          });
        }

        reject(record.arg);
      }

      var previousPromise;

      this._invoke = function (method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      };
    }

    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];

      if (undefined === method) {
        if (context.delegate = null, "throw" === context.method) {
          if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
          context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);
      if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
      var info = record.arg;
      return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
    }

    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };
      1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal", delete record.arg, entry.completion = record;
    }

    function Context(tryLocsList) {
      this.tryEntries = [{
        tryLoc: "root"
      }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
    }

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) return iteratorMethod.call(iterable);
        if ("function" == typeof iterable.next) return iterable;

        if (!isNaN(iterable.length)) {
          var i = -1,
              next = function next() {
            for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;

            return next.value = undefined, next.done = !0, next;
          };

          return next.next = next;
        }
      }

      return {
        next: doneResult
      };
    }

    function doneResult() {
      return {
        value: undefined,
        done: !0
      };
    }

    return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
      var ctor = "function" == typeof genFun && genFun.constructor;
      return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
    }, exports.mark = function (genFun) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
    }, exports.awrap = function (arg) {
      return {
        __await: arg
      };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      void 0 === PromiseImpl && (PromiseImpl = Promise);
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
      return this;
    }), define(Gp, "toString", function () {
      return "[object Generator]";
    }), exports.keys = function (object) {
      var keys = [];

      for (var key in object) keys.push(key);

      return keys.reverse(), function next() {
        for (; keys.length;) {
          var key = keys.pop();
          if (key in object) return next.value = key, next.done = !1, next;
        }

        return next.done = !0, next;
      };
    }, exports.values = values, Context.prototype = {
      constructor: Context,
      reset: function (skipTempReset) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      },
      stop: function () {
        this.done = !0;
        var rootRecord = this.tryEntries[0].completion;
        if ("throw" === rootRecord.type) throw rootRecord.arg;
        return this.rval;
      },
      dispatchException: function (exception) {
        if (this.done) throw exception;
        var context = this;

        function handle(loc, caught) {
          return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i],
              record = entry.completion;
          if ("root" === entry.tryLoc) return handle("end");

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc"),
                hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            } else {
              if (!hasFinally) throw new Error("try statement without catch or finally");
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            }
          }
        }
      },
      abrupt: function (type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
        var record = finallyEntry ? finallyEntry.completion : {};
        return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
      },
      complete: function (record, afterLoc) {
        if ("throw" === record.type) throw record.arg;
        return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
      },
      finish: function (finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
        }
      },
      catch: function (tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;

            if ("throw" === record.type) {
              var thrown = record.arg;
              resetTryEntry(entry);
            }

            return thrown;
          }
        }

        throw new Error("illegal catch attempt");
      },
      delegateYield: function (iterable, resultName, nextLoc) {
        return this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
      }
    }, exports;
  }

  function _AwaitValue(value) {
    this.wrapped = value;
  }

  function _AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;
        var wrappedAwait = value instanceof _AwaitValue;
        Promise.resolve(wrappedAwait ? value.wrapped : value).then(function (arg) {
          if (wrappedAwait) {
            resume(key === "return" ? "return" : "next", arg);
            return;
          }

          settle(result.done ? "return" : "normal", arg);
        }, function (err) {
          resume("throw", err);
        });
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  _AsyncGenerator.prototype[typeof Symbol === "function" && Symbol.asyncIterator || "@@asyncIterator"] = function () {
    return this;
  };

  _AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  _AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  _AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  function _wrapAsyncGenerator(fn) {
    return function () {
      return new _AsyncGenerator(fn.apply(this, arguments));
    };
  }

  function _awaitAsyncGenerator(value) {
    return new _AwaitValue(value);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
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

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get() {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get.bind();
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(arguments.length < 3 ? target : receiver);
        }

        return desc.value;
      };
    }

    return _get.apply(this, arguments);
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  var check = function (it) {
    return it && it.Math == Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global$F =
    // eslint-disable-next-line es-x/no-global-this -- safe
    check(typeof globalThis == 'object' && globalThis) ||
    check(typeof window == 'object' && window) ||
    // eslint-disable-next-line no-restricted-globals -- safe
    check(typeof self == 'object' && self) ||
    check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
    // eslint-disable-next-line no-new-func -- fallback
    (function () { return this; })() || Function('return this')();

  var objectGetOwnPropertyDescriptor = {};

  var fails$H = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  var fails$G = fails$H;

  // Detect IE8's incomplete defineProperty implementation
  var descriptors = !fails$G(function () {
    // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
  });

  var fails$F = fails$H;

  var functionBindNative = !fails$F(function () {
    // eslint-disable-next-line es-x/no-function-prototype-bind -- safe
    var test = (function () { /* empty */ }).bind();
    // eslint-disable-next-line no-prototype-builtins -- safe
    return typeof test != 'function' || test.hasOwnProperty('prototype');
  });

  var NATIVE_BIND$3 = functionBindNative;

  var call$r = Function.prototype.call;

  var functionCall = NATIVE_BIND$3 ? call$r.bind(call$r) : function () {
    return call$r.apply(call$r, arguments);
  };

  var objectPropertyIsEnumerable = {};

  var $propertyIsEnumerable$2 = {}.propertyIsEnumerable;
  // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
  var getOwnPropertyDescriptor$6 = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG = getOwnPropertyDescriptor$6 && !$propertyIsEnumerable$2.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
  objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor$6(this, V);
    return !!descriptor && descriptor.enumerable;
  } : $propertyIsEnumerable$2;

  var createPropertyDescriptor$7 = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var NATIVE_BIND$2 = functionBindNative;

  var FunctionPrototype$3 = Function.prototype;
  var bind$b = FunctionPrototype$3.bind;
  var call$q = FunctionPrototype$3.call;
  var uncurryThis$I = NATIVE_BIND$2 && bind$b.bind(call$q, call$q);

  var functionUncurryThis = NATIVE_BIND$2 ? function (fn) {
    return fn && uncurryThis$I(fn);
  } : function (fn) {
    return fn && function () {
      return call$q.apply(fn, arguments);
    };
  };

  var uncurryThis$H = functionUncurryThis;

  var toString$d = uncurryThis$H({}.toString);
  var stringSlice$9 = uncurryThis$H(''.slice);

  var classofRaw$1 = function (it) {
    return stringSlice$9(toString$d(it), 8, -1);
  };

  var uncurryThis$G = functionUncurryThis;
  var fails$E = fails$H;
  var classof$f = classofRaw$1;

  var $Object$4 = Object;
  var split$3 = uncurryThis$G(''.split);

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject = fails$E(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !$Object$4('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classof$f(it) == 'String' ? split$3(it, '') : $Object$4(it);
  } : $Object$4;

  var $TypeError$h = TypeError;

  // `RequireObjectCoercible` abstract operation
  // https://tc39.es/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible$8 = function (it) {
    if (it == undefined) throw $TypeError$h("Can't call method on " + it);
    return it;
  };

  // toObject with fallback for non-array-like ES3 strings
  var IndexedObject$3 = indexedObject;
  var requireObjectCoercible$7 = requireObjectCoercible$8;

  var toIndexedObject$b = function (it) {
    return IndexedObject$3(requireObjectCoercible$7(it));
  };

  // `IsCallable` abstract operation
  // https://tc39.es/ecma262/#sec-iscallable
  var isCallable$s = function (argument) {
    return typeof argument == 'function';
  };

  var isCallable$r = isCallable$s;

  var isObject$k = function (it) {
    return typeof it == 'object' ? it !== null : isCallable$r(it);
  };

  var global$E = global$F;
  var isCallable$q = isCallable$s;

  var aFunction = function (argument) {
    return isCallable$q(argument) ? argument : undefined;
  };

  var getBuiltIn$b = function (namespace, method) {
    return arguments.length < 2 ? aFunction(global$E[namespace]) : global$E[namespace] && global$E[namespace][method];
  };

  var uncurryThis$F = functionUncurryThis;

  var objectIsPrototypeOf = uncurryThis$F({}.isPrototypeOf);

  var getBuiltIn$a = getBuiltIn$b;

  var engineUserAgent = getBuiltIn$a('navigator', 'userAgent') || '';

  var global$D = global$F;
  var userAgent$5 = engineUserAgent;

  var process$3 = global$D.process;
  var Deno$1 = global$D.Deno;
  var versions = process$3 && process$3.versions || Deno$1 && Deno$1.version;
  var v8 = versions && versions.v8;
  var match, version;

  if (v8) {
    match = v8.split('.');
    // in old Chrome, versions of V8 isn't V8 = Chrome / 10
    // but their correct versions are not interesting for us
    version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
  }

  // BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
  // so check `userAgent` even if `.v8` exists, but 0
  if (!version && userAgent$5) {
    match = userAgent$5.match(/Edge\/(\d+)/);
    if (!match || match[1] >= 74) {
      match = userAgent$5.match(/Chrome\/(\d+)/);
      if (match) version = +match[1];
    }
  }

  var engineV8Version = version;

  /* eslint-disable es-x/no-symbol -- required for testing */

  var V8_VERSION$3 = engineV8Version;
  var fails$D = fails$H;

  // eslint-disable-next-line es-x/no-object-getownpropertysymbols -- required for testing
  var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$D(function () {
    var symbol = Symbol();
    // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
    return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
      // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
      !Symbol.sham && V8_VERSION$3 && V8_VERSION$3 < 41;
  });

  /* eslint-disable es-x/no-symbol -- required for testing */

  var NATIVE_SYMBOL$6 = nativeSymbol;

  var useSymbolAsUid = NATIVE_SYMBOL$6
    && !Symbol.sham
    && typeof Symbol.iterator == 'symbol';

  var getBuiltIn$9 = getBuiltIn$b;
  var isCallable$p = isCallable$s;
  var isPrototypeOf$7 = objectIsPrototypeOf;
  var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

  var $Object$3 = Object;

  var isSymbol$6 = USE_SYMBOL_AS_UID$1 ? function (it) {
    return typeof it == 'symbol';
  } : function (it) {
    var $Symbol = getBuiltIn$9('Symbol');
    return isCallable$p($Symbol) && isPrototypeOf$7($Symbol.prototype, $Object$3(it));
  };

  var $String$3 = String;

  var tryToString$7 = function (argument) {
    try {
      return $String$3(argument);
    } catch (error) {
      return 'Object';
    }
  };

  var isCallable$o = isCallable$s;
  var tryToString$6 = tryToString$7;

  var $TypeError$g = TypeError;

  // `Assert: IsCallable(argument) is true`
  var aCallable$9 = function (argument) {
    if (isCallable$o(argument)) return argument;
    throw $TypeError$g(tryToString$6(argument) + ' is not a function');
  };

  var aCallable$8 = aCallable$9;

  // `GetMethod` abstract operation
  // https://tc39.es/ecma262/#sec-getmethod
  var getMethod$5 = function (V, P) {
    var func = V[P];
    return func == null ? undefined : aCallable$8(func);
  };

  var call$p = functionCall;
  var isCallable$n = isCallable$s;
  var isObject$j = isObject$k;

  var $TypeError$f = TypeError;

  // `OrdinaryToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-ordinarytoprimitive
  var ordinaryToPrimitive$1 = function (input, pref) {
    var fn, val;
    if (pref === 'string' && isCallable$n(fn = input.toString) && !isObject$j(val = call$p(fn, input))) return val;
    if (isCallable$n(fn = input.valueOf) && !isObject$j(val = call$p(fn, input))) return val;
    if (pref !== 'string' && isCallable$n(fn = input.toString) && !isObject$j(val = call$p(fn, input))) return val;
    throw $TypeError$f("Can't convert object to primitive value");
  };

  var shared$7 = {exports: {}};

  var isPure = false;

  var global$C = global$F;

  // eslint-disable-next-line es-x/no-object-defineproperty -- safe
  var defineProperty$e = Object.defineProperty;

  var defineGlobalProperty$3 = function (key, value) {
    try {
      defineProperty$e(global$C, key, { value: value, configurable: true, writable: true });
    } catch (error) {
      global$C[key] = value;
    } return value;
  };

  var global$B = global$F;
  var defineGlobalProperty$2 = defineGlobalProperty$3;

  var SHARED = '__core-js_shared__';
  var store$3 = global$B[SHARED] || defineGlobalProperty$2(SHARED, {});

  var sharedStore = store$3;

  var store$2 = sharedStore;

  (shared$7.exports = function (key, value) {
    return store$2[key] || (store$2[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.22.8',
    mode: 'global',
    copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
    license: 'https://github.com/zloirock/core-js/blob/v3.22.8/LICENSE',
    source: 'https://github.com/zloirock/core-js'
  });

  var requireObjectCoercible$6 = requireObjectCoercible$8;

  var $Object$2 = Object;

  // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject
  var toObject$d = function (argument) {
    return $Object$2(requireObjectCoercible$6(argument));
  };

  var uncurryThis$E = functionUncurryThis;
  var toObject$c = toObject$d;

  var hasOwnProperty = uncurryThis$E({}.hasOwnProperty);

  // `HasOwnProperty` abstract operation
  // https://tc39.es/ecma262/#sec-hasownproperty
  // eslint-disable-next-line es-x/no-object-hasown -- safe
  var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty(toObject$c(it), key);
  };

  var uncurryThis$D = functionUncurryThis;

  var id$1 = 0;
  var postfix = Math.random();
  var toString$c = uncurryThis$D(1.0.toString);

  var uid$5 = function (key) {
    return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$c(++id$1 + postfix, 36);
  };

  var global$A = global$F;
  var shared$6 = shared$7.exports;
  var hasOwn$k = hasOwnProperty_1;
  var uid$4 = uid$5;
  var NATIVE_SYMBOL$5 = nativeSymbol;
  var USE_SYMBOL_AS_UID = useSymbolAsUid;

  var WellKnownSymbolsStore$1 = shared$6('wks');
  var Symbol$1 = global$A.Symbol;
  var symbolFor = Symbol$1 && Symbol$1['for'];
  var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$4;

  var wellKnownSymbol$t = function (name) {
    if (!hasOwn$k(WellKnownSymbolsStore$1, name) || !(NATIVE_SYMBOL$5 || typeof WellKnownSymbolsStore$1[name] == 'string')) {
      var description = 'Symbol.' + name;
      if (NATIVE_SYMBOL$5 && hasOwn$k(Symbol$1, name)) {
        WellKnownSymbolsStore$1[name] = Symbol$1[name];
      } else if (USE_SYMBOL_AS_UID && symbolFor) {
        WellKnownSymbolsStore$1[name] = symbolFor(description);
      } else {
        WellKnownSymbolsStore$1[name] = createWellKnownSymbol(description);
      }
    } return WellKnownSymbolsStore$1[name];
  };

  var call$o = functionCall;
  var isObject$i = isObject$k;
  var isSymbol$5 = isSymbol$6;
  var getMethod$4 = getMethod$5;
  var ordinaryToPrimitive = ordinaryToPrimitive$1;
  var wellKnownSymbol$s = wellKnownSymbol$t;

  var $TypeError$e = TypeError;
  var TO_PRIMITIVE = wellKnownSymbol$s('toPrimitive');

  // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive
  var toPrimitive$3 = function (input, pref) {
    if (!isObject$i(input) || isSymbol$5(input)) return input;
    var exoticToPrim = getMethod$4(input, TO_PRIMITIVE);
    var result;
    if (exoticToPrim) {
      if (pref === undefined) pref = 'default';
      result = call$o(exoticToPrim, input, pref);
      if (!isObject$i(result) || isSymbol$5(result)) return result;
      throw $TypeError$e("Can't convert object to primitive value");
    }
    if (pref === undefined) pref = 'number';
    return ordinaryToPrimitive(input, pref);
  };

  var toPrimitive$2 = toPrimitive$3;
  var isSymbol$4 = isSymbol$6;

  // `ToPropertyKey` abstract operation
  // https://tc39.es/ecma262/#sec-topropertykey
  var toPropertyKey$5 = function (argument) {
    var key = toPrimitive$2(argument, 'string');
    return isSymbol$4(key) ? key : key + '';
  };

  var global$z = global$F;
  var isObject$h = isObject$k;

  var document$3 = global$z.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS$1 = isObject$h(document$3) && isObject$h(document$3.createElement);

  var documentCreateElement$2 = function (it) {
    return EXISTS$1 ? document$3.createElement(it) : {};
  };

  var DESCRIPTORS$l = descriptors;
  var fails$C = fails$H;
  var createElement$1 = documentCreateElement$2;

  // Thanks to IE8 for its funny defineProperty
  var ie8DomDefine = !DESCRIPTORS$l && !fails$C(function () {
    // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
    return Object.defineProperty(createElement$1('div'), 'a', {
      get: function () { return 7; }
    }).a != 7;
  });

  var DESCRIPTORS$k = descriptors;
  var call$n = functionCall;
  var propertyIsEnumerableModule$2 = objectPropertyIsEnumerable;
  var createPropertyDescriptor$6 = createPropertyDescriptor$7;
  var toIndexedObject$a = toIndexedObject$b;
  var toPropertyKey$4 = toPropertyKey$5;
  var hasOwn$j = hasOwnProperty_1;
  var IE8_DOM_DEFINE$1 = ie8DomDefine;

  // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  objectGetOwnPropertyDescriptor.f = DESCRIPTORS$k ? $getOwnPropertyDescriptor$2 : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject$a(O);
    P = toPropertyKey$4(P);
    if (IE8_DOM_DEFINE$1) try {
      return $getOwnPropertyDescriptor$2(O, P);
    } catch (error) { /* empty */ }
    if (hasOwn$j(O, P)) return createPropertyDescriptor$6(!call$n(propertyIsEnumerableModule$2.f, O, P), O[P]);
  };

  var objectDefineProperty = {};

  var DESCRIPTORS$j = descriptors;
  var fails$B = fails$H;

  // V8 ~ Chrome 36-
  // https://bugs.chromium.org/p/v8/issues/detail?id=3334
  var v8PrototypeDefineBug = DESCRIPTORS$j && fails$B(function () {
    // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
    return Object.defineProperty(function () { /* empty */ }, 'prototype', {
      value: 42,
      writable: false
    }).prototype != 42;
  });

  var isObject$g = isObject$k;

  var $String$2 = String;
  var $TypeError$d = TypeError;

  // `Assert: Type(argument) is Object`
  var anObject$i = function (argument) {
    if (isObject$g(argument)) return argument;
    throw $TypeError$d($String$2(argument) + ' is not an object');
  };

  var DESCRIPTORS$i = descriptors;
  var IE8_DOM_DEFINE = ie8DomDefine;
  var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
  var anObject$h = anObject$i;
  var toPropertyKey$3 = toPropertyKey$5;

  var $TypeError$c = TypeError;
  // eslint-disable-next-line es-x/no-object-defineproperty -- safe
  var $defineProperty$1 = Object.defineProperty;
  // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
  var ENUMERABLE = 'enumerable';
  var CONFIGURABLE$1 = 'configurable';
  var WRITABLE = 'writable';

  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  objectDefineProperty.f = DESCRIPTORS$i ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
    anObject$h(O);
    P = toPropertyKey$3(P);
    anObject$h(Attributes);
    if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
      var current = $getOwnPropertyDescriptor$1(O, P);
      if (current && current[WRITABLE]) {
        O[P] = Attributes.value;
        Attributes = {
          configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
          enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
          writable: false
        };
      }
    } return $defineProperty$1(O, P, Attributes);
  } : $defineProperty$1 : function defineProperty(O, P, Attributes) {
    anObject$h(O);
    P = toPropertyKey$3(P);
    anObject$h(Attributes);
    if (IE8_DOM_DEFINE) try {
      return $defineProperty$1(O, P, Attributes);
    } catch (error) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw $TypeError$c('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var DESCRIPTORS$h = descriptors;
  var definePropertyModule$6 = objectDefineProperty;
  var createPropertyDescriptor$5 = createPropertyDescriptor$7;

  var createNonEnumerableProperty$a = DESCRIPTORS$h ? function (object, key, value) {
    return definePropertyModule$6.f(object, key, createPropertyDescriptor$5(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var makeBuiltIn$3 = {exports: {}};

  var DESCRIPTORS$g = descriptors;
  var hasOwn$i = hasOwnProperty_1;

  var FunctionPrototype$2 = Function.prototype;
  // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
  var getDescriptor = DESCRIPTORS$g && Object.getOwnPropertyDescriptor;

  var EXISTS = hasOwn$i(FunctionPrototype$2, 'name');
  // additional protection from minified / mangled / dropped function names
  var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
  var CONFIGURABLE = EXISTS && (!DESCRIPTORS$g || (DESCRIPTORS$g && getDescriptor(FunctionPrototype$2, 'name').configurable));

  var functionName = {
    EXISTS: EXISTS,
    PROPER: PROPER,
    CONFIGURABLE: CONFIGURABLE
  };

  var uncurryThis$C = functionUncurryThis;
  var isCallable$m = isCallable$s;
  var store$1 = sharedStore;

  var functionToString$1 = uncurryThis$C(Function.toString);

  // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
  if (!isCallable$m(store$1.inspectSource)) {
    store$1.inspectSource = function (it) {
      return functionToString$1(it);
    };
  }

  var inspectSource$4 = store$1.inspectSource;

  var global$y = global$F;
  var isCallable$l = isCallable$s;
  var inspectSource$3 = inspectSource$4;

  var WeakMap$1 = global$y.WeakMap;

  var nativeWeakMap = isCallable$l(WeakMap$1) && /native code/.test(inspectSource$3(WeakMap$1));

  var shared$5 = shared$7.exports;
  var uid$3 = uid$5;

  var keys$2 = shared$5('keys');

  var sharedKey$4 = function (key) {
    return keys$2[key] || (keys$2[key] = uid$3(key));
  };

  var hiddenKeys$6 = {};

  var NATIVE_WEAK_MAP = nativeWeakMap;
  var global$x = global$F;
  var uncurryThis$B = functionUncurryThis;
  var isObject$f = isObject$k;
  var createNonEnumerableProperty$9 = createNonEnumerableProperty$a;
  var hasOwn$h = hasOwnProperty_1;
  var shared$4 = sharedStore;
  var sharedKey$3 = sharedKey$4;
  var hiddenKeys$5 = hiddenKeys$6;

  var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
  var TypeError$7 = global$x.TypeError;
  var WeakMap = global$x.WeakMap;
  var set$2, get$1, has;

  var enforce = function (it) {
    return has(it) ? get$1(it) : set$2(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject$f(it) || (state = get$1(it)).type !== TYPE) {
        throw TypeError$7('Incompatible receiver, ' + TYPE + ' required');
      } return state;
    };
  };

  if (NATIVE_WEAK_MAP || shared$4.state) {
    var store = shared$4.state || (shared$4.state = new WeakMap());
    var wmget = uncurryThis$B(store.get);
    var wmhas = uncurryThis$B(store.has);
    var wmset = uncurryThis$B(store.set);
    set$2 = function (it, metadata) {
      if (wmhas(store, it)) throw new TypeError$7(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      wmset(store, it, metadata);
      return metadata;
    };
    get$1 = function (it) {
      return wmget(store, it) || {};
    };
    has = function (it) {
      return wmhas(store, it);
    };
  } else {
    var STATE = sharedKey$3('state');
    hiddenKeys$5[STATE] = true;
    set$2 = function (it, metadata) {
      if (hasOwn$h(it, STATE)) throw new TypeError$7(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      createNonEnumerableProperty$9(it, STATE, metadata);
      return metadata;
    };
    get$1 = function (it) {
      return hasOwn$h(it, STATE) ? it[STATE] : {};
    };
    has = function (it) {
      return hasOwn$h(it, STATE);
    };
  }

  var internalState = {
    set: set$2,
    get: get$1,
    has: has,
    enforce: enforce,
    getterFor: getterFor
  };

  var fails$A = fails$H;
  var isCallable$k = isCallable$s;
  var hasOwn$g = hasOwnProperty_1;
  var DESCRIPTORS$f = descriptors;
  var CONFIGURABLE_FUNCTION_NAME$2 = functionName.CONFIGURABLE;
  var inspectSource$2 = inspectSource$4;
  var InternalStateModule$9 = internalState;

  var enforceInternalState = InternalStateModule$9.enforce;
  var getInternalState$6 = InternalStateModule$9.get;
  // eslint-disable-next-line es-x/no-object-defineproperty -- safe
  var defineProperty$d = Object.defineProperty;

  var CONFIGURABLE_LENGTH = DESCRIPTORS$f && !fails$A(function () {
    return defineProperty$d(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
  });

  var TEMPLATE = String(String).split('String');

  var makeBuiltIn$2 = makeBuiltIn$3.exports = function (value, name, options) {
    if (String(name).slice(0, 7) === 'Symbol(') {
      name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
    }
    if (options && options.getter) name = 'get ' + name;
    if (options && options.setter) name = 'set ' + name;
    if (!hasOwn$g(value, 'name') || (CONFIGURABLE_FUNCTION_NAME$2 && value.name !== name)) {
      defineProperty$d(value, 'name', { value: name, configurable: true });
    }
    if (CONFIGURABLE_LENGTH && options && hasOwn$g(options, 'arity') && value.length !== options.arity) {
      defineProperty$d(value, 'length', { value: options.arity });
    }
    try {
      if (options && hasOwn$g(options, 'constructor') && options.constructor) {
        if (DESCRIPTORS$f) defineProperty$d(value, 'prototype', { writable: false });
      // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
      } else if (value.prototype) value.prototype = undefined;
    } catch (error) { /* empty */ }
    var state = enforceInternalState(value);
    if (!hasOwn$g(state, 'source')) {
      state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
    } return value;
  };

  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  // eslint-disable-next-line no-extend-native -- required
  Function.prototype.toString = makeBuiltIn$2(function toString() {
    return isCallable$k(this) && getInternalState$6(this).source || inspectSource$2(this);
  }, 'toString');

  var isCallable$j = isCallable$s;
  var createNonEnumerableProperty$8 = createNonEnumerableProperty$a;
  var makeBuiltIn$1 = makeBuiltIn$3.exports;
  var defineGlobalProperty$1 = defineGlobalProperty$3;

  var defineBuiltIn$f = function (O, key, value, options) {
    if (!options) options = {};
    var simple = options.enumerable;
    var name = options.name !== undefined ? options.name : key;
    if (isCallable$j(value)) makeBuiltIn$1(value, name, options);
    if (options.global) {
      if (simple) O[key] = value;
      else defineGlobalProperty$1(key, value);
    } else {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
      if (simple) O[key] = value;
      else createNonEnumerableProperty$8(O, key, value);
    } return O;
  };

  var objectGetOwnPropertyNames = {};

  var ceil = Math.ceil;
  var floor$7 = Math.floor;

  // `Math.trunc` method
  // https://tc39.es/ecma262/#sec-math.trunc
  // eslint-disable-next-line es-x/no-math-trunc -- safe
  var mathTrunc = Math.trunc || function trunc(x) {
    var n = +x;
    return (n > 0 ? floor$7 : ceil)(n);
  };

  var trunc = mathTrunc;

  // `ToIntegerOrInfinity` abstract operation
  // https://tc39.es/ecma262/#sec-tointegerorinfinity
  var toIntegerOrInfinity$9 = function (argument) {
    var number = +argument;
    // eslint-disable-next-line no-self-compare -- NaN check
    return number !== number || number === 0 ? 0 : trunc(number);
  };

  var toIntegerOrInfinity$8 = toIntegerOrInfinity$9;

  var max$4 = Math.max;
  var min$8 = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  var toAbsoluteIndex$8 = function (index, length) {
    var integer = toIntegerOrInfinity$8(index);
    return integer < 0 ? max$4(integer + length, 0) : min$8(integer, length);
  };

  var toIntegerOrInfinity$7 = toIntegerOrInfinity$9;

  var min$7 = Math.min;

  // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength
  var toLength$a = function (argument) {
    return argument > 0 ? min$7(toIntegerOrInfinity$7(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var toLength$9 = toLength$a;

  // `LengthOfArrayLike` abstract operation
  // https://tc39.es/ecma262/#sec-lengthofarraylike
  var lengthOfArrayLike$f = function (obj) {
    return toLength$9(obj.length);
  };

  var toIndexedObject$9 = toIndexedObject$b;
  var toAbsoluteIndex$7 = toAbsoluteIndex$8;
  var lengthOfArrayLike$e = lengthOfArrayLike$f;

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod$5 = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject$9($this);
      var length = lengthOfArrayLike$e(O);
      var index = toAbsoluteIndex$7(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare -- NaN check
      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare -- NaN check
        if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
      } else for (;length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
      } return !IS_INCLUDES && -1;
    };
  };

  var arrayIncludes = {
    // `Array.prototype.includes` method
    // https://tc39.es/ecma262/#sec-array.prototype.includes
    includes: createMethod$5(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod$5(false)
  };

  var uncurryThis$A = functionUncurryThis;
  var hasOwn$f = hasOwnProperty_1;
  var toIndexedObject$8 = toIndexedObject$b;
  var indexOf$1 = arrayIncludes.indexOf;
  var hiddenKeys$4 = hiddenKeys$6;

  var push$8 = uncurryThis$A([].push);

  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject$8(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !hasOwn$f(hiddenKeys$4, key) && hasOwn$f(O, key) && push$8(result, key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (hasOwn$f(O, key = names[i++])) {
      ~indexOf$1(result, key) || push$8(result, key);
    }
    return result;
  };

  // IE8- don't enum bug keys
  var enumBugKeys$3 = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
  ];

  var internalObjectKeys$1 = objectKeysInternal;
  var enumBugKeys$2 = enumBugKeys$3;

  var hiddenKeys$3 = enumBugKeys$2.concat('length', 'prototype');

  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  // eslint-disable-next-line es-x/no-object-getownpropertynames -- safe
  objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return internalObjectKeys$1(O, hiddenKeys$3);
  };

  var objectGetOwnPropertySymbols = {};

  // eslint-disable-next-line es-x/no-object-getownpropertysymbols -- safe
  objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

  var getBuiltIn$8 = getBuiltIn$b;
  var uncurryThis$z = functionUncurryThis;
  var getOwnPropertyNamesModule$2 = objectGetOwnPropertyNames;
  var getOwnPropertySymbolsModule$3 = objectGetOwnPropertySymbols;
  var anObject$g = anObject$i;

  var concat$3 = uncurryThis$z([].concat);

  // all object keys, includes non-enumerable and symbols
  var ownKeys$1 = getBuiltIn$8('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = getOwnPropertyNamesModule$2.f(anObject$g(it));
    var getOwnPropertySymbols = getOwnPropertySymbolsModule$3.f;
    return getOwnPropertySymbols ? concat$3(keys, getOwnPropertySymbols(it)) : keys;
  };

  var hasOwn$e = hasOwnProperty_1;
  var ownKeys = ownKeys$1;
  var getOwnPropertyDescriptorModule$2 = objectGetOwnPropertyDescriptor;
  var definePropertyModule$5 = objectDefineProperty;

  var copyConstructorProperties$2 = function (target, source, exceptions) {
    var keys = ownKeys(source);
    var defineProperty = definePropertyModule$5.f;
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule$2.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!hasOwn$e(target, key) && !(exceptions && hasOwn$e(exceptions, key))) {
        defineProperty(target, key, getOwnPropertyDescriptor(source, key));
      }
    }
  };

  var fails$z = fails$H;
  var isCallable$i = isCallable$s;

  var replacement = /#|\.prototype\./;

  var isForced$4 = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true
      : value == NATIVE ? false
      : isCallable$i(detection) ? fails$z(detection)
      : !!detection;
  };

  var normalize = isForced$4.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced$4.data = {};
  var NATIVE = isForced$4.NATIVE = 'N';
  var POLYFILL = isForced$4.POLYFILL = 'P';

  var isForced_1 = isForced$4;

  var global$w = global$F;
  var getOwnPropertyDescriptor$5 = objectGetOwnPropertyDescriptor.f;
  var createNonEnumerableProperty$7 = createNonEnumerableProperty$a;
  var defineBuiltIn$e = defineBuiltIn$f;
  var defineGlobalProperty = defineGlobalProperty$3;
  var copyConstructorProperties$1 = copyConstructorProperties$2;
  var isForced$3 = isForced_1;

  /*
    options.target         - name of the target object
    options.global         - target is the global object
    options.stat           - export as static methods of target
    options.proto          - export as prototype methods of target
    options.real           - real prototype method for the `pure` version
    options.forced         - export even if the native feature is available
    options.bind           - bind methods to the target, required for the `pure` version
    options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe         - use the simple assignment of property instead of delete + defineProperty
    options.sham           - add a flag to not completely full polyfills
    options.enumerable     - export as enumerable property
    options.dontCallGetSet - prevent calling a getter on target
    options.name           - the .name of the function if it does not match the key
  */
  var _export = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) {
      target = global$w;
    } else if (STATIC) {
      target = global$w[TARGET] || defineGlobalProperty(TARGET, {});
    } else {
      target = (global$w[TARGET] || {}).prototype;
    }
    if (target) for (key in source) {
      sourceProperty = source[key];
      if (options.dontCallGetSet) {
        descriptor = getOwnPropertyDescriptor$5(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];
      FORCED = isForced$3(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
      // contained in target
      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty == typeof targetProperty) continue;
        copyConstructorProperties$1(sourceProperty, targetProperty);
      }
      // add a flag to not completely full polyfills
      if (options.sham || (targetProperty && targetProperty.sham)) {
        createNonEnumerableProperty$7(sourceProperty, 'sham', true);
      }
      defineBuiltIn$e(target, key, sourceProperty, options);
    }
  };

  var uncurryThis$y = functionUncurryThis;
  var aCallable$7 = aCallable$9;
  var NATIVE_BIND$1 = functionBindNative;

  var bind$a = uncurryThis$y(uncurryThis$y.bind);

  // optional / simple context binding
  var functionBindContext = function (fn, that) {
    aCallable$7(fn);
    return that === undefined ? fn : NATIVE_BIND$1 ? bind$a(fn, that) : function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  var classof$e = classofRaw$1;

  // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  // eslint-disable-next-line es-x/no-array-isarray -- safe
  var isArray$4 = Array.isArray || function isArray(argument) {
    return classof$e(argument) == 'Array';
  };

  var wellKnownSymbol$r = wellKnownSymbol$t;

  var TO_STRING_TAG$4 = wellKnownSymbol$r('toStringTag');
  var test = {};

  test[TO_STRING_TAG$4] = 'z';

  var toStringTagSupport = String(test) === '[object z]';

  var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
  var isCallable$h = isCallable$s;
  var classofRaw = classofRaw$1;
  var wellKnownSymbol$q = wellKnownSymbol$t;

  var TO_STRING_TAG$3 = wellKnownSymbol$q('toStringTag');
  var $Object$1 = Object;

  // ES3 wrong here
  var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (error) { /* empty */ }
  };

  // getting tag from ES6+ `Object.prototype.toString`
  var classof$d = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (tag = tryGet(O = $Object$1(it), TO_STRING_TAG$3)) == 'string' ? tag
      // builtinTag case
      : CORRECT_ARGUMENTS ? classofRaw(O)
      // ES3 arguments fallback
      : (result = classofRaw(O)) == 'Object' && isCallable$h(O.callee) ? 'Arguments' : result;
  };

  var uncurryThis$x = functionUncurryThis;
  var fails$y = fails$H;
  var isCallable$g = isCallable$s;
  var classof$c = classof$d;
  var getBuiltIn$7 = getBuiltIn$b;
  var inspectSource$1 = inspectSource$4;

  var noop = function () { /* empty */ };
  var empty = [];
  var construct = getBuiltIn$7('Reflect', 'construct');
  var constructorRegExp = /^\s*(?:class|function)\b/;
  var exec$5 = uncurryThis$x(constructorRegExp.exec);
  var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

  var isConstructorModern = function isConstructor(argument) {
    if (!isCallable$g(argument)) return false;
    try {
      construct(noop, empty, argument);
      return true;
    } catch (error) {
      return false;
    }
  };

  var isConstructorLegacy = function isConstructor(argument) {
    if (!isCallable$g(argument)) return false;
    switch (classof$c(argument)) {
      case 'AsyncFunction':
      case 'GeneratorFunction':
      case 'AsyncGeneratorFunction': return false;
    }
    try {
      // we can't check .prototype since constructors produced by .bind haven't it
      // `Function#toString` throws on some built-it function in some legacy engines
      // (for example, `DOMQuad` and similar in FF41-)
      return INCORRECT_TO_STRING || !!exec$5(constructorRegExp, inspectSource$1(argument));
    } catch (error) {
      return true;
    }
  };

  isConstructorLegacy.sham = true;

  // `IsConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-isconstructor
  var isConstructor$4 = !construct || fails$y(function () {
    var called;
    return isConstructorModern(isConstructorModern.call)
      || !isConstructorModern(Object)
      || !isConstructorModern(function () { called = true; })
      || called;
  }) ? isConstructorLegacy : isConstructorModern;

  var isArray$3 = isArray$4;
  var isConstructor$3 = isConstructor$4;
  var isObject$e = isObject$k;
  var wellKnownSymbol$p = wellKnownSymbol$t;

  var SPECIES$6 = wellKnownSymbol$p('species');
  var $Array$4 = Array;

  // a part of `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesConstructor$1 = function (originalArray) {
    var C;
    if (isArray$3(originalArray)) {
      C = originalArray.constructor;
      // cross-realm fallback
      if (isConstructor$3(C) && (C === $Array$4 || isArray$3(C.prototype))) C = undefined;
      else if (isObject$e(C)) {
        C = C[SPECIES$6];
        if (C === null) C = undefined;
      }
    } return C === undefined ? $Array$4 : C;
  };

  var arraySpeciesConstructor = arraySpeciesConstructor$1;

  // `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesCreate$3 = function (originalArray, length) {
    return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
  };

  var bind$9 = functionBindContext;
  var uncurryThis$w = functionUncurryThis;
  var IndexedObject$2 = indexedObject;
  var toObject$b = toObject$d;
  var lengthOfArrayLike$d = lengthOfArrayLike$f;
  var arraySpeciesCreate$2 = arraySpeciesCreate$3;

  var push$7 = uncurryThis$w([].push);

  // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
  var createMethod$4 = function (TYPE) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var IS_FILTER_REJECT = TYPE == 7;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject$b($this);
      var self = IndexedObject$2(O);
      var boundFunction = bind$9(callbackfn, that);
      var length = lengthOfArrayLike$d(self);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate$2;
      var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
      var value, result;
      for (;length > index; index++) if (NO_HOLES || index in self) {
        value = self[index];
        result = boundFunction(value, index, O);
        if (TYPE) {
          if (IS_MAP) target[index] = result; // map
          else if (result) switch (TYPE) {
            case 3: return true;              // some
            case 5: return value;             // find
            case 6: return index;             // findIndex
            case 2: push$7(target, value);      // filter
          } else switch (TYPE) {
            case 4: return false;             // every
            case 7: push$7(target, value);      // filterReject
          }
        }
      }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
    };
  };

  var arrayIteration = {
    // `Array.prototype.forEach` method
    // https://tc39.es/ecma262/#sec-array.prototype.foreach
    forEach: createMethod$4(0),
    // `Array.prototype.map` method
    // https://tc39.es/ecma262/#sec-array.prototype.map
    map: createMethod$4(1),
    // `Array.prototype.filter` method
    // https://tc39.es/ecma262/#sec-array.prototype.filter
    filter: createMethod$4(2),
    // `Array.prototype.some` method
    // https://tc39.es/ecma262/#sec-array.prototype.some
    some: createMethod$4(3),
    // `Array.prototype.every` method
    // https://tc39.es/ecma262/#sec-array.prototype.every
    every: createMethod$4(4),
    // `Array.prototype.find` method
    // https://tc39.es/ecma262/#sec-array.prototype.find
    find: createMethod$4(5),
    // `Array.prototype.findIndex` method
    // https://tc39.es/ecma262/#sec-array.prototype.findIndex
    findIndex: createMethod$4(6),
    // `Array.prototype.filterReject` method
    // https://github.com/tc39/proposal-array-filtering
    filterReject: createMethod$4(7)
  };

  var fails$x = fails$H;
  var wellKnownSymbol$o = wellKnownSymbol$t;
  var V8_VERSION$2 = engineV8Version;

  var SPECIES$5 = wellKnownSymbol$o('species');

  var arrayMethodHasSpeciesSupport$5 = function (METHOD_NAME) {
    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/677
    return V8_VERSION$2 >= 51 || !fails$x(function () {
      var array = [];
      var constructor = array.constructor = {};
      constructor[SPECIES$5] = function () {
        return { foo: 1 };
      };
      return array[METHOD_NAME](Boolean).foo !== 1;
    });
  };

  var $$A = _export;
  var $map$1 = arrayIteration.map;
  var arrayMethodHasSpeciesSupport$4 = arrayMethodHasSpeciesSupport$5;

  var HAS_SPECIES_SUPPORT$3 = arrayMethodHasSpeciesSupport$4('map');

  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  // with adding support of @@species
  $$A({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$3 }, {
    map: function map(callbackfn /* , thisArg */) {
      return $map$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var toObject$a = toObject$d;
  var toAbsoluteIndex$6 = toAbsoluteIndex$8;
  var lengthOfArrayLike$c = lengthOfArrayLike$f;

  // `Array.prototype.fill` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.fill
  var arrayFill$1 = function fill(value /* , start = 0, end = @length */) {
    var O = toObject$a(this);
    var length = lengthOfArrayLike$c(O);
    var argumentsLength = arguments.length;
    var index = toAbsoluteIndex$6(argumentsLength > 1 ? arguments[1] : undefined, length);
    var end = argumentsLength > 2 ? arguments[2] : undefined;
    var endPos = end === undefined ? length : toAbsoluteIndex$6(end, length);
    while (endPos > index) O[index++] = value;
    return O;
  };

  var objectDefineProperties = {};

  var internalObjectKeys = objectKeysInternal;
  var enumBugKeys$1 = enumBugKeys$3;

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  // eslint-disable-next-line es-x/no-object-keys -- safe
  var objectKeys$4 = Object.keys || function keys(O) {
    return internalObjectKeys(O, enumBugKeys$1);
  };

  var DESCRIPTORS$e = descriptors;
  var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
  var definePropertyModule$4 = objectDefineProperty;
  var anObject$f = anObject$i;
  var toIndexedObject$7 = toIndexedObject$b;
  var objectKeys$3 = objectKeys$4;

  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  // eslint-disable-next-line es-x/no-object-defineproperties -- safe
  objectDefineProperties.f = DESCRIPTORS$e && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject$f(O);
    var props = toIndexedObject$7(Properties);
    var keys = objectKeys$3(Properties);
    var length = keys.length;
    var index = 0;
    var key;
    while (length > index) definePropertyModule$4.f(O, key = keys[index++], props[key]);
    return O;
  };

  var getBuiltIn$6 = getBuiltIn$b;

  var html$2 = getBuiltIn$6('document', 'documentElement');

  /* global ActiveXObject -- old IE, WSH */

  var anObject$e = anObject$i;
  var definePropertiesModule$1 = objectDefineProperties;
  var enumBugKeys = enumBugKeys$3;
  var hiddenKeys$2 = hiddenKeys$6;
  var html$1 = html$2;
  var documentCreateElement$1 = documentCreateElement$2;
  var sharedKey$2 = sharedKey$4;

  var GT = '>';
  var LT = '<';
  var PROTOTYPE$2 = 'prototype';
  var SCRIPT = 'script';
  var IE_PROTO$1 = sharedKey$2('IE_PROTO');

  var EmptyConstructor = function () { /* empty */ };

  var scriptTag = function (content) {
    return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
  };

  // Create object with fake `null` prototype: use ActiveX Object with cleared prototype
  var NullProtoObjectViaActiveX = function (activeXDocument) {
    activeXDocument.write(scriptTag(''));
    activeXDocument.close();
    var temp = activeXDocument.parentWindow.Object;
    activeXDocument = null; // avoid memory leak
    return temp;
  };

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var NullProtoObjectViaIFrame = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = documentCreateElement$1('iframe');
    var JS = 'java' + SCRIPT + ':';
    var iframeDocument;
    iframe.style.display = 'none';
    html$1.appendChild(iframe);
    // https://github.com/zloirock/core-js/issues/475
    iframe.src = String(JS);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(scriptTag('document.F=Object'));
    iframeDocument.close();
    return iframeDocument.F;
  };

  // Check for document.domain and active x support
  // No need to use active x approach when document.domain is not set
  // see https://github.com/es-shims/es5-shim/issues/150
  // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
  // avoid IE GC bug
  var activeXDocument;
  var NullProtoObject = function () {
    try {
      activeXDocument = new ActiveXObject('htmlfile');
    } catch (error) { /* ignore */ }
    NullProtoObject = typeof document != 'undefined'
      ? document.domain && activeXDocument
        ? NullProtoObjectViaActiveX(activeXDocument) // old IE
        : NullProtoObjectViaIFrame()
      : NullProtoObjectViaActiveX(activeXDocument); // WSH
    var length = enumBugKeys.length;
    while (length--) delete NullProtoObject[PROTOTYPE$2][enumBugKeys[length]];
    return NullProtoObject();
  };

  hiddenKeys$2[IE_PROTO$1] = true;

  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  // eslint-disable-next-line es-x/no-object-create -- safe
  var objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      EmptyConstructor[PROTOTYPE$2] = anObject$e(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE$2] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO$1] = O;
    } else result = NullProtoObject();
    return Properties === undefined ? result : definePropertiesModule$1.f(result, Properties);
  };

  var wellKnownSymbol$n = wellKnownSymbol$t;
  var create$5 = objectCreate;
  var defineProperty$c = objectDefineProperty.f;

  var UNSCOPABLES = wellKnownSymbol$n('unscopables');
  var ArrayPrototype$1 = Array.prototype;

  // Array.prototype[@@unscopables]
  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  if (ArrayPrototype$1[UNSCOPABLES] == undefined) {
    defineProperty$c(ArrayPrototype$1, UNSCOPABLES, {
      configurable: true,
      value: create$5(null)
    });
  }

  // add a key to Array.prototype[@@unscopables]
  var addToUnscopables$3 = function (key) {
    ArrayPrototype$1[UNSCOPABLES][key] = true;
  };

  var $$z = _export;
  var fill$1 = arrayFill$1;
  var addToUnscopables$2 = addToUnscopables$3;

  // `Array.prototype.fill` method
  // https://tc39.es/ecma262/#sec-array.prototype.fill
  $$z({ target: 'Array', proto: true }, {
    fill: fill$1
  });

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables$2('fill');

  var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
  var classof$b = classof$d;

  // `Object.prototype.toString` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
    return '[object ' + classof$b(this) + ']';
  };

  var TO_STRING_TAG_SUPPORT = toStringTagSupport;
  var defineBuiltIn$d = defineBuiltIn$f;
  var toString$b = objectToString;

  // `Object.prototype.toString` method
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  if (!TO_STRING_TAG_SUPPORT) {
    defineBuiltIn$d(Object.prototype, 'toString', toString$b, { unsafe: true });
  }

  var $TypeError$b = TypeError;
  var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

  var doesNotExceedSafeInteger$2 = function (it) {
    if (it > MAX_SAFE_INTEGER) throw $TypeError$b('Maximum allowed index exceeded');
    return it;
  };

  var toPropertyKey$2 = toPropertyKey$5;
  var definePropertyModule$3 = objectDefineProperty;
  var createPropertyDescriptor$4 = createPropertyDescriptor$7;

  var createProperty$6 = function (object, key, value) {
    var propertyKey = toPropertyKey$2(key);
    if (propertyKey in object) definePropertyModule$3.f(object, propertyKey, createPropertyDescriptor$4(0, value));
    else object[propertyKey] = value;
  };

  var $$y = _export;
  var fails$w = fails$H;
  var isArray$2 = isArray$4;
  var isObject$d = isObject$k;
  var toObject$9 = toObject$d;
  var lengthOfArrayLike$b = lengthOfArrayLike$f;
  var doesNotExceedSafeInteger$1 = doesNotExceedSafeInteger$2;
  var createProperty$5 = createProperty$6;
  var arraySpeciesCreate$1 = arraySpeciesCreate$3;
  var arrayMethodHasSpeciesSupport$3 = arrayMethodHasSpeciesSupport$5;
  var wellKnownSymbol$m = wellKnownSymbol$t;
  var V8_VERSION$1 = engineV8Version;

  var IS_CONCAT_SPREADABLE = wellKnownSymbol$m('isConcatSpreadable');

  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/679
  var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION$1 >= 51 || !fails$w(function () {
    var array = [];
    array[IS_CONCAT_SPREADABLE] = false;
    return array.concat()[0] !== array;
  });

  var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport$3('concat');

  var isConcatSpreadable = function (O) {
    if (!isObject$d(O)) return false;
    var spreadable = O[IS_CONCAT_SPREADABLE];
    return spreadable !== undefined ? !!spreadable : isArray$2(O);
  };

  var FORCED$5 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

  // `Array.prototype.concat` method
  // https://tc39.es/ecma262/#sec-array.prototype.concat
  // with adding support of @@isConcatSpreadable and @@species
  $$y({ target: 'Array', proto: true, arity: 1, forced: FORCED$5 }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    concat: function concat(arg) {
      var O = toObject$9(this);
      var A = arraySpeciesCreate$1(O, 0);
      var n = 0;
      var i, k, length, len, E;
      for (i = -1, length = arguments.length; i < length; i++) {
        E = i === -1 ? O : arguments[i];
        if (isConcatSpreadable(E)) {
          len = lengthOfArrayLike$b(E);
          doesNotExceedSafeInteger$1(n + len);
          for (k = 0; k < len; k++, n++) if (k in E) createProperty$5(A, n, E[k]);
        } else {
          doesNotExceedSafeInteger$1(n + 1);
          createProperty$5(A, n++, E);
        }
      }
      A.length = n;
      return A;
    }
  });

  var iterators = {};

  var fails$v = fails$H;

  var correctPrototypeGetter = !fails$v(function () {
    function F() { /* empty */ }
    F.prototype.constructor = null;
    // eslint-disable-next-line es-x/no-object-getprototypeof -- required for testing
    return Object.getPrototypeOf(new F()) !== F.prototype;
  });

  var hasOwn$d = hasOwnProperty_1;
  var isCallable$f = isCallable$s;
  var toObject$8 = toObject$d;
  var sharedKey$1 = sharedKey$4;
  var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

  var IE_PROTO = sharedKey$1('IE_PROTO');
  var $Object = Object;
  var ObjectPrototype$3 = $Object.prototype;

  // `Object.getPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.getprototypeof
  // eslint-disable-next-line es-x/no-object-getprototypeof -- safe
  var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
    var object = toObject$8(O);
    if (hasOwn$d(object, IE_PROTO)) return object[IE_PROTO];
    var constructor = object.constructor;
    if (isCallable$f(constructor) && object instanceof constructor) {
      return constructor.prototype;
    } return object instanceof $Object ? ObjectPrototype$3 : null;
  };

  var fails$u = fails$H;
  var isCallable$e = isCallable$s;
  var getPrototypeOf$3 = objectGetPrototypeOf;
  var defineBuiltIn$c = defineBuiltIn$f;
  var wellKnownSymbol$l = wellKnownSymbol$t;

  var ITERATOR$8 = wellKnownSymbol$l('iterator');
  var BUGGY_SAFARI_ITERATORS$1 = false;

  // `%IteratorPrototype%` object
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-object
  var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

  /* eslint-disable es-x/no-array-prototype-keys -- safe */
  if ([].keys) {
    arrayIterator = [].keys();
    // Safari 8 has buggy iterators w/o `next`
    if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
    else {
      PrototypeOfArrayIteratorPrototype = getPrototypeOf$3(getPrototypeOf$3(arrayIterator));
      if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
    }
  }

  var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$2 == undefined || fails$u(function () {
    var test = {};
    // FF44- legacy iterators case
    return IteratorPrototype$2[ITERATOR$8].call(test) !== test;
  });

  if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

  // `%IteratorPrototype%[@@iterator]()` method
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
  if (!isCallable$e(IteratorPrototype$2[ITERATOR$8])) {
    defineBuiltIn$c(IteratorPrototype$2, ITERATOR$8, function () {
      return this;
    });
  }

  var iteratorsCore = {
    IteratorPrototype: IteratorPrototype$2,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
  };

  var defineProperty$b = objectDefineProperty.f;
  var hasOwn$c = hasOwnProperty_1;
  var wellKnownSymbol$k = wellKnownSymbol$t;

  var TO_STRING_TAG$2 = wellKnownSymbol$k('toStringTag');

  var setToStringTag$8 = function (target, TAG, STATIC) {
    if (target && !STATIC) target = target.prototype;
    if (target && !hasOwn$c(target, TO_STRING_TAG$2)) {
      defineProperty$b(target, TO_STRING_TAG$2, { configurable: true, value: TAG });
    }
  };

  var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
  var create$4 = objectCreate;
  var createPropertyDescriptor$3 = createPropertyDescriptor$7;
  var setToStringTag$7 = setToStringTag$8;
  var Iterators$4 = iterators;

  var returnThis$1 = function () { return this; };

  var createIteratorConstructor$2 = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = create$4(IteratorPrototype$1, { next: createPropertyDescriptor$3(+!ENUMERABLE_NEXT, next) });
    setToStringTag$7(IteratorConstructor, TO_STRING_TAG, false);
    Iterators$4[TO_STRING_TAG] = returnThis$1;
    return IteratorConstructor;
  };

  var isCallable$d = isCallable$s;

  var $String$1 = String;
  var $TypeError$a = TypeError;

  var aPossiblePrototype$1 = function (argument) {
    if (typeof argument == 'object' || isCallable$d(argument)) return argument;
    throw $TypeError$a("Can't set " + $String$1(argument) + ' as a prototype');
  };

  /* eslint-disable no-proto -- safe */

  var uncurryThis$v = functionUncurryThis;
  var anObject$d = anObject$i;
  var aPossiblePrototype = aPossiblePrototype$1;

  // `Object.setPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.setprototypeof
  // Works with __proto__ only. Old v8 can't work with null proto objects.
  // eslint-disable-next-line es-x/no-object-setprototypeof -- safe
  var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
    var CORRECT_SETTER = false;
    var test = {};
    var setter;
    try {
      // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
      setter = uncurryThis$v(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
      setter(test, []);
      CORRECT_SETTER = test instanceof Array;
    } catch (error) { /* empty */ }
    return function setPrototypeOf(O, proto) {
      anObject$d(O);
      aPossiblePrototype(proto);
      if (CORRECT_SETTER) setter(O, proto);
      else O.__proto__ = proto;
      return O;
    };
  }() : undefined);

  var $$x = _export;
  var call$m = functionCall;
  var FunctionName$1 = functionName;
  var isCallable$c = isCallable$s;
  var createIteratorConstructor$1 = createIteratorConstructor$2;
  var getPrototypeOf$2 = objectGetPrototypeOf;
  var setPrototypeOf$5 = objectSetPrototypeOf;
  var setToStringTag$6 = setToStringTag$8;
  var createNonEnumerableProperty$6 = createNonEnumerableProperty$a;
  var defineBuiltIn$b = defineBuiltIn$f;
  var wellKnownSymbol$j = wellKnownSymbol$t;
  var Iterators$3 = iterators;
  var IteratorsCore = iteratorsCore;

  var PROPER_FUNCTION_NAME$2 = FunctionName$1.PROPER;
  var CONFIGURABLE_FUNCTION_NAME$1 = FunctionName$1.CONFIGURABLE;
  var IteratorPrototype = IteratorsCore.IteratorPrototype;
  var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
  var ITERATOR$7 = wellKnownSymbol$j('iterator');
  var KEYS = 'keys';
  var VALUES = 'values';
  var ENTRIES = 'entries';

  var returnThis = function () { return this; };

  var defineIterator$3 = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
    createIteratorConstructor$1(IteratorConstructor, NAME, next);

    var getIterationMethod = function (KIND) {
      if (KIND === DEFAULT && defaultIterator) return defaultIterator;
      if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
      switch (KIND) {
        case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
        case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
        case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
      } return function () { return new IteratorConstructor(this); };
    };

    var TO_STRING_TAG = NAME + ' Iterator';
    var INCORRECT_VALUES_NAME = false;
    var IterablePrototype = Iterable.prototype;
    var nativeIterator = IterablePrototype[ITERATOR$7]
      || IterablePrototype['@@iterator']
      || DEFAULT && IterablePrototype[DEFAULT];
    var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
    var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
    var CurrentIteratorPrototype, methods, KEY;

    // fix native
    if (anyNativeIterator) {
      CurrentIteratorPrototype = getPrototypeOf$2(anyNativeIterator.call(new Iterable()));
      if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
        if (getPrototypeOf$2(CurrentIteratorPrototype) !== IteratorPrototype) {
          if (setPrototypeOf$5) {
            setPrototypeOf$5(CurrentIteratorPrototype, IteratorPrototype);
          } else if (!isCallable$c(CurrentIteratorPrototype[ITERATOR$7])) {
            defineBuiltIn$b(CurrentIteratorPrototype, ITERATOR$7, returnThis);
          }
        }
        // Set @@toStringTag to native iterators
        setToStringTag$6(CurrentIteratorPrototype, TO_STRING_TAG, true);
      }
    }

    // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
    if (PROPER_FUNCTION_NAME$2 && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
      if (CONFIGURABLE_FUNCTION_NAME$1) {
        createNonEnumerableProperty$6(IterablePrototype, 'name', VALUES);
      } else {
        INCORRECT_VALUES_NAME = true;
        defaultIterator = function values() { return call$m(nativeIterator, this); };
      }
    }

    // export additional methods
    if (DEFAULT) {
      methods = {
        values: getIterationMethod(VALUES),
        keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
        entries: getIterationMethod(ENTRIES)
      };
      if (FORCED) for (KEY in methods) {
        if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
          defineBuiltIn$b(IterablePrototype, KEY, methods[KEY]);
        }
      } else $$x({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
    }

    // define iterator
    if (IterablePrototype[ITERATOR$7] !== defaultIterator) {
      defineBuiltIn$b(IterablePrototype, ITERATOR$7, defaultIterator, { name: DEFAULT });
    }
    Iterators$3[NAME] = defaultIterator;

    return methods;
  };

  var toIndexedObject$6 = toIndexedObject$b;
  var addToUnscopables$1 = addToUnscopables$3;
  var Iterators$2 = iterators;
  var InternalStateModule$8 = internalState;
  var defineProperty$a = objectDefineProperty.f;
  var defineIterator$2 = defineIterator$3;
  var DESCRIPTORS$d = descriptors;

  var ARRAY_ITERATOR = 'Array Iterator';
  var setInternalState$8 = InternalStateModule$8.set;
  var getInternalState$5 = InternalStateModule$8.getterFor(ARRAY_ITERATOR);

  // `Array.prototype.entries` method
  // https://tc39.es/ecma262/#sec-array.prototype.entries
  // `Array.prototype.keys` method
  // https://tc39.es/ecma262/#sec-array.prototype.keys
  // `Array.prototype.values` method
  // https://tc39.es/ecma262/#sec-array.prototype.values
  // `Array.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-array.prototype-@@iterator
  // `CreateArrayIterator` internal method
  // https://tc39.es/ecma262/#sec-createarrayiterator
  var es_array_iterator = defineIterator$2(Array, 'Array', function (iterated, kind) {
    setInternalState$8(this, {
      type: ARRAY_ITERATOR,
      target: toIndexedObject$6(iterated), // target
      index: 0,                          // next index
      kind: kind                         // kind
    });
  // `%ArrayIteratorPrototype%.next` method
  // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
  }, function () {
    var state = getInternalState$5(this);
    var target = state.target;
    var kind = state.kind;
    var index = state.index++;
    if (!target || index >= target.length) {
      state.target = undefined;
      return { value: undefined, done: true };
    }
    if (kind == 'keys') return { value: index, done: false };
    if (kind == 'values') return { value: target[index], done: false };
    return { value: [index, target[index]], done: false };
  }, 'values');

  // argumentsList[@@iterator] is %ArrayProto_values%
  // https://tc39.es/ecma262/#sec-createunmappedargumentsobject
  // https://tc39.es/ecma262/#sec-createmappedargumentsobject
  var values = Iterators$2.Arguments = Iterators$2.Array;

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables$1('keys');
  addToUnscopables$1('values');
  addToUnscopables$1('entries');

  // V8 ~ Chrome 45- bug
  if (DESCRIPTORS$d && values.name !== 'values') try {
    defineProperty$a(values, 'name', { value: 'values' });
  } catch (error) { /* empty */ }

  // eslint-disable-next-line es-x/no-typed-arrays -- safe
  var arrayBufferNative = typeof ArrayBuffer != 'undefined' && typeof DataView != 'undefined';

  var defineBuiltIn$a = defineBuiltIn$f;

  var defineBuiltIns$3 = function (target, src, options) {
    for (var key in src) defineBuiltIn$a(target, key, src[key], options);
    return target;
  };

  var isPrototypeOf$6 = objectIsPrototypeOf;

  var $TypeError$9 = TypeError;

  var anInstance$7 = function (it, Prototype) {
    if (isPrototypeOf$6(Prototype, it)) return it;
    throw $TypeError$9('Incorrect invocation');
  };

  var toIntegerOrInfinity$6 = toIntegerOrInfinity$9;
  var toLength$8 = toLength$a;

  var $RangeError$3 = RangeError;

  // `ToIndex` abstract operation
  // https://tc39.es/ecma262/#sec-toindex
  var toIndex$2 = function (it) {
    if (it === undefined) return 0;
    var number = toIntegerOrInfinity$6(it);
    var length = toLength$8(number);
    if (number !== length) throw $RangeError$3('Wrong length or index');
    return length;
  };

  // IEEE754 conversions based on https://github.com/feross/ieee754
  var $Array$3 = Array;
  var abs = Math.abs;
  var pow$1 = Math.pow;
  var floor$6 = Math.floor;
  var log = Math.log;
  var LN2 = Math.LN2;

  var pack = function (number, mantissaLength, bytes) {
    var buffer = $Array$3(bytes);
    var exponentLength = bytes * 8 - mantissaLength - 1;
    var eMax = (1 << exponentLength) - 1;
    var eBias = eMax >> 1;
    var rt = mantissaLength === 23 ? pow$1(2, -24) - pow$1(2, -77) : 0;
    var sign = number < 0 || number === 0 && 1 / number < 0 ? 1 : 0;
    var index = 0;
    var exponent, mantissa, c;
    number = abs(number);
    // eslint-disable-next-line no-self-compare -- NaN check
    if (number != number || number === Infinity) {
      // eslint-disable-next-line no-self-compare -- NaN check
      mantissa = number != number ? 1 : 0;
      exponent = eMax;
    } else {
      exponent = floor$6(log(number) / LN2);
      c = pow$1(2, -exponent);
      if (number * c < 1) {
        exponent--;
        c *= 2;
      }
      if (exponent + eBias >= 1) {
        number += rt / c;
      } else {
        number += rt * pow$1(2, 1 - eBias);
      }
      if (number * c >= 2) {
        exponent++;
        c /= 2;
      }
      if (exponent + eBias >= eMax) {
        mantissa = 0;
        exponent = eMax;
      } else if (exponent + eBias >= 1) {
        mantissa = (number * c - 1) * pow$1(2, mantissaLength);
        exponent = exponent + eBias;
      } else {
        mantissa = number * pow$1(2, eBias - 1) * pow$1(2, mantissaLength);
        exponent = 0;
      }
    }
    while (mantissaLength >= 8) {
      buffer[index++] = mantissa & 255;
      mantissa /= 256;
      mantissaLength -= 8;
    }
    exponent = exponent << mantissaLength | mantissa;
    exponentLength += mantissaLength;
    while (exponentLength > 0) {
      buffer[index++] = exponent & 255;
      exponent /= 256;
      exponentLength -= 8;
    }
    buffer[--index] |= sign * 128;
    return buffer;
  };

  var unpack = function (buffer, mantissaLength) {
    var bytes = buffer.length;
    var exponentLength = bytes * 8 - mantissaLength - 1;
    var eMax = (1 << exponentLength) - 1;
    var eBias = eMax >> 1;
    var nBits = exponentLength - 7;
    var index = bytes - 1;
    var sign = buffer[index--];
    var exponent = sign & 127;
    var mantissa;
    sign >>= 7;
    while (nBits > 0) {
      exponent = exponent * 256 + buffer[index--];
      nBits -= 8;
    }
    mantissa = exponent & (1 << -nBits) - 1;
    exponent >>= -nBits;
    nBits += mantissaLength;
    while (nBits > 0) {
      mantissa = mantissa * 256 + buffer[index--];
      nBits -= 8;
    }
    if (exponent === 0) {
      exponent = 1 - eBias;
    } else if (exponent === eMax) {
      return mantissa ? NaN : sign ? -Infinity : Infinity;
    } else {
      mantissa = mantissa + pow$1(2, mantissaLength);
      exponent = exponent - eBias;
    } return (sign ? -1 : 1) * mantissa * pow$1(2, exponent - mantissaLength);
  };

  var ieee754 = {
    pack: pack,
    unpack: unpack
  };

  var toAbsoluteIndex$5 = toAbsoluteIndex$8;
  var lengthOfArrayLike$a = lengthOfArrayLike$f;
  var createProperty$4 = createProperty$6;

  var $Array$2 = Array;
  var max$3 = Math.max;

  var arraySliceSimple = function (O, start, end) {
    var length = lengthOfArrayLike$a(O);
    var k = toAbsoluteIndex$5(start, length);
    var fin = toAbsoluteIndex$5(end === undefined ? length : end, length);
    var result = $Array$2(max$3(fin - k, 0));
    for (var n = 0; k < fin; k++, n++) createProperty$4(result, n, O[k]);
    result.length = n;
    return result;
  };

  var global$v = global$F;
  var uncurryThis$u = functionUncurryThis;
  var DESCRIPTORS$c = descriptors;
  var NATIVE_ARRAY_BUFFER$1 = arrayBufferNative;
  var FunctionName = functionName;
  var createNonEnumerableProperty$5 = createNonEnumerableProperty$a;
  var defineBuiltIns$2 = defineBuiltIns$3;
  var fails$t = fails$H;
  var anInstance$6 = anInstance$7;
  var toIntegerOrInfinity$5 = toIntegerOrInfinity$9;
  var toLength$7 = toLength$a;
  var toIndex$1 = toIndex$2;
  var IEEE754 = ieee754;
  var getPrototypeOf$1 = objectGetPrototypeOf;
  var setPrototypeOf$4 = objectSetPrototypeOf;
  var getOwnPropertyNames$2 = objectGetOwnPropertyNames.f;
  var defineProperty$9 = objectDefineProperty.f;
  var arrayFill = arrayFill$1;
  var arraySlice$a = arraySliceSimple;
  var setToStringTag$5 = setToStringTag$8;
  var InternalStateModule$7 = internalState;

  var PROPER_FUNCTION_NAME$1 = FunctionName.PROPER;
  var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
  var getInternalState$4 = InternalStateModule$7.get;
  var setInternalState$7 = InternalStateModule$7.set;
  var ARRAY_BUFFER$1 = 'ArrayBuffer';
  var DATA_VIEW = 'DataView';
  var PROTOTYPE$1 = 'prototype';
  var WRONG_LENGTH$1 = 'Wrong length';
  var WRONG_INDEX = 'Wrong index';
  var NativeArrayBuffer$1 = global$v[ARRAY_BUFFER$1];
  var $ArrayBuffer = NativeArrayBuffer$1;
  var ArrayBufferPrototype$1 = $ArrayBuffer && $ArrayBuffer[PROTOTYPE$1];
  var $DataView = global$v[DATA_VIEW];
  var DataViewPrototype$1 = $DataView && $DataView[PROTOTYPE$1];
  var ObjectPrototype$2 = Object.prototype;
  var Array$1 = global$v.Array;
  var RangeError$3 = global$v.RangeError;
  var fill = uncurryThis$u(arrayFill);
  var reverse = uncurryThis$u([].reverse);

  var packIEEE754 = IEEE754.pack;
  var unpackIEEE754 = IEEE754.unpack;

  var packInt8 = function (number) {
    return [number & 0xFF];
  };

  var packInt16 = function (number) {
    return [number & 0xFF, number >> 8 & 0xFF];
  };

  var packInt32 = function (number) {
    return [number & 0xFF, number >> 8 & 0xFF, number >> 16 & 0xFF, number >> 24 & 0xFF];
  };

  var unpackInt32 = function (buffer) {
    return buffer[3] << 24 | buffer[2] << 16 | buffer[1] << 8 | buffer[0];
  };

  var packFloat32 = function (number) {
    return packIEEE754(number, 23, 4);
  };

  var packFloat64 = function (number) {
    return packIEEE754(number, 52, 8);
  };

  var addGetter$1 = function (Constructor, key) {
    defineProperty$9(Constructor[PROTOTYPE$1], key, { get: function () { return getInternalState$4(this)[key]; } });
  };

  var get = function (view, count, index, isLittleEndian) {
    var intIndex = toIndex$1(index);
    var store = getInternalState$4(view);
    if (intIndex + count > store.byteLength) throw RangeError$3(WRONG_INDEX);
    var bytes = getInternalState$4(store.buffer).bytes;
    var start = intIndex + store.byteOffset;
    var pack = arraySlice$a(bytes, start, start + count);
    return isLittleEndian ? pack : reverse(pack);
  };

  var set$1 = function (view, count, index, conversion, value, isLittleEndian) {
    var intIndex = toIndex$1(index);
    var store = getInternalState$4(view);
    if (intIndex + count > store.byteLength) throw RangeError$3(WRONG_INDEX);
    var bytes = getInternalState$4(store.buffer).bytes;
    var start = intIndex + store.byteOffset;
    var pack = conversion(+value);
    for (var i = 0; i < count; i++) bytes[start + i] = pack[isLittleEndian ? i : count - i - 1];
  };

  if (!NATIVE_ARRAY_BUFFER$1) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance$6(this, ArrayBufferPrototype$1);
      var byteLength = toIndex$1(length);
      setInternalState$7(this, {
        bytes: fill(Array$1(byteLength), 0),
        byteLength: byteLength
      });
      if (!DESCRIPTORS$c) this.byteLength = byteLength;
    };

    ArrayBufferPrototype$1 = $ArrayBuffer[PROTOTYPE$1];

    $DataView = function DataView(buffer, byteOffset, byteLength) {
      anInstance$6(this, DataViewPrototype$1);
      anInstance$6(buffer, ArrayBufferPrototype$1);
      var bufferLength = getInternalState$4(buffer).byteLength;
      var offset = toIntegerOrInfinity$5(byteOffset);
      if (offset < 0 || offset > bufferLength) throw RangeError$3('Wrong offset');
      byteLength = byteLength === undefined ? bufferLength - offset : toLength$7(byteLength);
      if (offset + byteLength > bufferLength) throw RangeError$3(WRONG_LENGTH$1);
      setInternalState$7(this, {
        buffer: buffer,
        byteLength: byteLength,
        byteOffset: offset
      });
      if (!DESCRIPTORS$c) {
        this.buffer = buffer;
        this.byteLength = byteLength;
        this.byteOffset = offset;
      }
    };

    DataViewPrototype$1 = $DataView[PROTOTYPE$1];

    if (DESCRIPTORS$c) {
      addGetter$1($ArrayBuffer, 'byteLength');
      addGetter$1($DataView, 'buffer');
      addGetter$1($DataView, 'byteLength');
      addGetter$1($DataView, 'byteOffset');
    }

    defineBuiltIns$2(DataViewPrototype$1, {
      getInt8: function getInt8(byteOffset) {
        return get(this, 1, byteOffset)[0] << 24 >> 24;
      },
      getUint8: function getUint8(byteOffset) {
        return get(this, 1, byteOffset)[0];
      },
      getInt16: function getInt16(byteOffset /* , littleEndian */) {
        var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
        return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
      },
      getUint16: function getUint16(byteOffset /* , littleEndian */) {
        var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
        return bytes[1] << 8 | bytes[0];
      },
      getInt32: function getInt32(byteOffset /* , littleEndian */) {
        return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined));
      },
      getUint32: function getUint32(byteOffset /* , littleEndian */) {
        return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined)) >>> 0;
      },
      getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
        return unpackIEEE754(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 23);
      },
      getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
        return unpackIEEE754(get(this, 8, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 52);
      },
      setInt8: function setInt8(byteOffset, value) {
        set$1(this, 1, byteOffset, packInt8, value);
      },
      setUint8: function setUint8(byteOffset, value) {
        set$1(this, 1, byteOffset, packInt8, value);
      },
      setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
        set$1(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
      },
      setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
        set$1(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
      },
      setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
        set$1(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
      },
      setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
        set$1(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
      },
      setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
        set$1(this, 4, byteOffset, packFloat32, value, arguments.length > 2 ? arguments[2] : undefined);
      },
      setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
        set$1(this, 8, byteOffset, packFloat64, value, arguments.length > 2 ? arguments[2] : undefined);
      }
    });
  } else {
    var INCORRECT_ARRAY_BUFFER_NAME = PROPER_FUNCTION_NAME$1 && NativeArrayBuffer$1.name !== ARRAY_BUFFER$1;
    /* eslint-disable no-new -- required for testing */
    if (!fails$t(function () {
      NativeArrayBuffer$1(1);
    }) || !fails$t(function () {
      new NativeArrayBuffer$1(-1);
    }) || fails$t(function () {
      new NativeArrayBuffer$1();
      new NativeArrayBuffer$1(1.5);
      new NativeArrayBuffer$1(NaN);
      return INCORRECT_ARRAY_BUFFER_NAME && !CONFIGURABLE_FUNCTION_NAME;
    })) {
    /* eslint-enable no-new -- required for testing */
      $ArrayBuffer = function ArrayBuffer(length) {
        anInstance$6(this, ArrayBufferPrototype$1);
        return new NativeArrayBuffer$1(toIndex$1(length));
      };

      $ArrayBuffer[PROTOTYPE$1] = ArrayBufferPrototype$1;

      for (var keys$1 = getOwnPropertyNames$2(NativeArrayBuffer$1), j$2 = 0, key$1; keys$1.length > j$2;) {
        if (!((key$1 = keys$1[j$2++]) in $ArrayBuffer)) {
          createNonEnumerableProperty$5($ArrayBuffer, key$1, NativeArrayBuffer$1[key$1]);
        }
      }

      ArrayBufferPrototype$1.constructor = $ArrayBuffer;
    } else if (INCORRECT_ARRAY_BUFFER_NAME && CONFIGURABLE_FUNCTION_NAME) {
      createNonEnumerableProperty$5(NativeArrayBuffer$1, 'name', ARRAY_BUFFER$1);
    }

    // WebKit bug - the same parent prototype for typed arrays and data view
    if (setPrototypeOf$4 && getPrototypeOf$1(DataViewPrototype$1) !== ObjectPrototype$2) {
      setPrototypeOf$4(DataViewPrototype$1, ObjectPrototype$2);
    }

    // iOS Safari 7.x bug
    var testView = new $DataView(new $ArrayBuffer(2));
    var $setInt8 = uncurryThis$u(DataViewPrototype$1.setInt8);
    testView.setInt8(0, 2147483648);
    testView.setInt8(1, 2147483649);
    if (testView.getInt8(0) || !testView.getInt8(1)) defineBuiltIns$2(DataViewPrototype$1, {
      setInt8: function setInt8(byteOffset, value) {
        $setInt8(this, byteOffset, value << 24 >> 24);
      },
      setUint8: function setUint8(byteOffset, value) {
        $setInt8(this, byteOffset, value << 24 >> 24);
      }
    }, { unsafe: true });
  }

  setToStringTag$5($ArrayBuffer, ARRAY_BUFFER$1);
  setToStringTag$5($DataView, DATA_VIEW);

  var arrayBuffer = {
    ArrayBuffer: $ArrayBuffer,
    DataView: $DataView
  };

  var isConstructor$2 = isConstructor$4;
  var tryToString$5 = tryToString$7;

  var $TypeError$8 = TypeError;

  // `Assert: IsConstructor(argument) is true`
  var aConstructor$2 = function (argument) {
    if (isConstructor$2(argument)) return argument;
    throw $TypeError$8(tryToString$5(argument) + ' is not a constructor');
  };

  var anObject$c = anObject$i;
  var aConstructor$1 = aConstructor$2;
  var wellKnownSymbol$i = wellKnownSymbol$t;

  var SPECIES$4 = wellKnownSymbol$i('species');

  // `SpeciesConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-speciesconstructor
  var speciesConstructor$4 = function (O, defaultConstructor) {
    var C = anObject$c(O).constructor;
    var S;
    return C === undefined || (S = anObject$c(C)[SPECIES$4]) == undefined ? defaultConstructor : aConstructor$1(S);
  };

  var $$w = _export;
  var uncurryThis$t = functionUncurryThis;
  var fails$s = fails$H;
  var ArrayBufferModule$1 = arrayBuffer;
  var anObject$b = anObject$i;
  var toAbsoluteIndex$4 = toAbsoluteIndex$8;
  var toLength$6 = toLength$a;
  var speciesConstructor$3 = speciesConstructor$4;

  var ArrayBuffer$4 = ArrayBufferModule$1.ArrayBuffer;
  var DataView$2 = ArrayBufferModule$1.DataView;
  var DataViewPrototype = DataView$2.prototype;
  var un$ArrayBufferSlice = uncurryThis$t(ArrayBuffer$4.prototype.slice);
  var getUint8$1 = uncurryThis$t(DataViewPrototype.getUint8);
  var setUint8$1 = uncurryThis$t(DataViewPrototype.setUint8);

  var INCORRECT_SLICE = fails$s(function () {
    return !new ArrayBuffer$4(2).slice(1, undefined).byteLength;
  });

  // `ArrayBuffer.prototype.slice` method
  // https://tc39.es/ecma262/#sec-arraybuffer.prototype.slice
  $$w({ target: 'ArrayBuffer', proto: true, unsafe: true, forced: INCORRECT_SLICE }, {
    slice: function slice(start, end) {
      if (un$ArrayBufferSlice && end === undefined) {
        return un$ArrayBufferSlice(anObject$b(this), start); // FF fix
      }
      var length = anObject$b(this).byteLength;
      var first = toAbsoluteIndex$4(start, length);
      var fin = toAbsoluteIndex$4(end === undefined ? length : end, length);
      var result = new (speciesConstructor$3(this, ArrayBuffer$4))(toLength$6(fin - first));
      var viewSource = new DataView$2(this);
      var viewTarget = new DataView$2(result);
      var index = 0;
      while (first < fin) {
        setUint8$1(viewTarget, index++, getUint8$1(viewSource, first++));
      } return result;
    }
  });

  var typedArrayConstructor = {exports: {}};

  var wellKnownSymbol$h = wellKnownSymbol$t;

  var ITERATOR$6 = wellKnownSymbol$h('iterator');
  var SAFE_CLOSING = false;

  try {
    var called = 0;
    var iteratorWithReturn = {
      next: function () {
        return { done: !!called++ };
      },
      'return': function () {
        SAFE_CLOSING = true;
      }
    };
    iteratorWithReturn[ITERATOR$6] = function () {
      return this;
    };
    // eslint-disable-next-line es-x/no-array-from, no-throw-literal -- required for testing
    Array.from(iteratorWithReturn, function () { throw 2; });
  } catch (error) { /* empty */ }

  var checkCorrectnessOfIteration$4 = function (exec, SKIP_CLOSING) {
    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
    var ITERATION_SUPPORT = false;
    try {
      var object = {};
      object[ITERATOR$6] = function () {
        return {
          next: function () {
            return { done: ITERATION_SUPPORT = true };
          }
        };
      };
      exec(object);
    } catch (error) { /* empty */ }
    return ITERATION_SUPPORT;
  };

  var NATIVE_ARRAY_BUFFER = arrayBufferNative;
  var DESCRIPTORS$b = descriptors;
  var global$u = global$F;
  var isCallable$b = isCallable$s;
  var isObject$c = isObject$k;
  var hasOwn$b = hasOwnProperty_1;
  var classof$a = classof$d;
  var tryToString$4 = tryToString$7;
  var createNonEnumerableProperty$4 = createNonEnumerableProperty$a;
  var defineBuiltIn$9 = defineBuiltIn$f;
  var defineProperty$8 = objectDefineProperty.f;
  var isPrototypeOf$5 = objectIsPrototypeOf;
  var getPrototypeOf = objectGetPrototypeOf;
  var setPrototypeOf$3 = objectSetPrototypeOf;
  var wellKnownSymbol$g = wellKnownSymbol$t;
  var uid$2 = uid$5;

  var Int8Array$4 = global$u.Int8Array;
  var Int8ArrayPrototype$1 = Int8Array$4 && Int8Array$4.prototype;
  var Uint8ClampedArray$1 = global$u.Uint8ClampedArray;
  var Uint8ClampedArrayPrototype = Uint8ClampedArray$1 && Uint8ClampedArray$1.prototype;
  var TypedArray$1 = Int8Array$4 && getPrototypeOf(Int8Array$4);
  var TypedArrayPrototype$2 = Int8ArrayPrototype$1 && getPrototypeOf(Int8ArrayPrototype$1);
  var ObjectPrototype$1 = Object.prototype;
  var TypeError$6 = global$u.TypeError;

  var TO_STRING_TAG$1 = wellKnownSymbol$g('toStringTag');
  var TYPED_ARRAY_TAG$1 = uid$2('TYPED_ARRAY_TAG');
  var TYPED_ARRAY_CONSTRUCTOR$2 = uid$2('TYPED_ARRAY_CONSTRUCTOR');
  // Fixing native typed arrays in Opera Presto crashes the browser, see #595
  var NATIVE_ARRAY_BUFFER_VIEWS$2 = NATIVE_ARRAY_BUFFER && !!setPrototypeOf$3 && classof$a(global$u.opera) !== 'Opera';
  var TYPED_ARRAY_TAG_REQUIRED = false;
  var NAME$1, Constructor, Prototype;

  var TypedArrayConstructorsList = {
    Int8Array: 1,
    Uint8Array: 1,
    Uint8ClampedArray: 1,
    Int16Array: 2,
    Uint16Array: 2,
    Int32Array: 4,
    Uint32Array: 4,
    Float32Array: 4,
    Float64Array: 8
  };

  var BigIntArrayConstructorsList = {
    BigInt64Array: 8,
    BigUint64Array: 8
  };

  var isView = function isView(it) {
    if (!isObject$c(it)) return false;
    var klass = classof$a(it);
    return klass === 'DataView'
      || hasOwn$b(TypedArrayConstructorsList, klass)
      || hasOwn$b(BigIntArrayConstructorsList, klass);
  };

  var isTypedArray$1 = function (it) {
    if (!isObject$c(it)) return false;
    var klass = classof$a(it);
    return hasOwn$b(TypedArrayConstructorsList, klass)
      || hasOwn$b(BigIntArrayConstructorsList, klass);
  };

  var aTypedArray$m = function (it) {
    if (isTypedArray$1(it)) return it;
    throw TypeError$6('Target is not a typed array');
  };

  var aTypedArrayConstructor$3 = function (C) {
    if (isCallable$b(C) && (!setPrototypeOf$3 || isPrototypeOf$5(TypedArray$1, C))) return C;
    throw TypeError$6(tryToString$4(C) + ' is not a typed array constructor');
  };

  var exportTypedArrayMethod$n = function (KEY, property, forced, options) {
    if (!DESCRIPTORS$b) return;
    if (forced) for (var ARRAY in TypedArrayConstructorsList) {
      var TypedArrayConstructor = global$u[ARRAY];
      if (TypedArrayConstructor && hasOwn$b(TypedArrayConstructor.prototype, KEY)) try {
        delete TypedArrayConstructor.prototype[KEY];
      } catch (error) {
        // old WebKit bug - some methods are non-configurable
        try {
          TypedArrayConstructor.prototype[KEY] = property;
        } catch (error2) { /* empty */ }
      }
    }
    if (!TypedArrayPrototype$2[KEY] || forced) {
      defineBuiltIn$9(TypedArrayPrototype$2, KEY, forced ? property
        : NATIVE_ARRAY_BUFFER_VIEWS$2 && Int8ArrayPrototype$1[KEY] || property, options);
    }
  };

  var exportTypedArrayStaticMethod = function (KEY, property, forced) {
    var ARRAY, TypedArrayConstructor;
    if (!DESCRIPTORS$b) return;
    if (setPrototypeOf$3) {
      if (forced) for (ARRAY in TypedArrayConstructorsList) {
        TypedArrayConstructor = global$u[ARRAY];
        if (TypedArrayConstructor && hasOwn$b(TypedArrayConstructor, KEY)) try {
          delete TypedArrayConstructor[KEY];
        } catch (error) { /* empty */ }
      }
      if (!TypedArray$1[KEY] || forced) {
        // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
        try {
          return defineBuiltIn$9(TypedArray$1, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS$2 && TypedArray$1[KEY] || property);
        } catch (error) { /* empty */ }
      } else return;
    }
    for (ARRAY in TypedArrayConstructorsList) {
      TypedArrayConstructor = global$u[ARRAY];
      if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
        defineBuiltIn$9(TypedArrayConstructor, KEY, property);
      }
    }
  };

  for (NAME$1 in TypedArrayConstructorsList) {
    Constructor = global$u[NAME$1];
    Prototype = Constructor && Constructor.prototype;
    if (Prototype) createNonEnumerableProperty$4(Prototype, TYPED_ARRAY_CONSTRUCTOR$2, Constructor);
    else NATIVE_ARRAY_BUFFER_VIEWS$2 = false;
  }

  for (NAME$1 in BigIntArrayConstructorsList) {
    Constructor = global$u[NAME$1];
    Prototype = Constructor && Constructor.prototype;
    if (Prototype) createNonEnumerableProperty$4(Prototype, TYPED_ARRAY_CONSTRUCTOR$2, Constructor);
  }

  // WebKit bug - typed arrays constructors prototype is Object.prototype
  if (!NATIVE_ARRAY_BUFFER_VIEWS$2 || !isCallable$b(TypedArray$1) || TypedArray$1 === Function.prototype) {
    // eslint-disable-next-line no-shadow -- safe
    TypedArray$1 = function TypedArray() {
      throw TypeError$6('Incorrect invocation');
    };
    if (NATIVE_ARRAY_BUFFER_VIEWS$2) for (NAME$1 in TypedArrayConstructorsList) {
      if (global$u[NAME$1]) setPrototypeOf$3(global$u[NAME$1], TypedArray$1);
    }
  }

  if (!NATIVE_ARRAY_BUFFER_VIEWS$2 || !TypedArrayPrototype$2 || TypedArrayPrototype$2 === ObjectPrototype$1) {
    TypedArrayPrototype$2 = TypedArray$1.prototype;
    if (NATIVE_ARRAY_BUFFER_VIEWS$2) for (NAME$1 in TypedArrayConstructorsList) {
      if (global$u[NAME$1]) setPrototypeOf$3(global$u[NAME$1].prototype, TypedArrayPrototype$2);
    }
  }

  // WebKit bug - one more object in Uint8ClampedArray prototype chain
  if (NATIVE_ARRAY_BUFFER_VIEWS$2 && getPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype$2) {
    setPrototypeOf$3(Uint8ClampedArrayPrototype, TypedArrayPrototype$2);
  }

  if (DESCRIPTORS$b && !hasOwn$b(TypedArrayPrototype$2, TO_STRING_TAG$1)) {
    TYPED_ARRAY_TAG_REQUIRED = true;
    defineProperty$8(TypedArrayPrototype$2, TO_STRING_TAG$1, { get: function () {
      return isObject$c(this) ? this[TYPED_ARRAY_TAG$1] : undefined;
    } });
    for (NAME$1 in TypedArrayConstructorsList) if (global$u[NAME$1]) {
      createNonEnumerableProperty$4(global$u[NAME$1], TYPED_ARRAY_TAG$1, NAME$1);
    }
  }

  var arrayBufferViewCore = {
    NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS$2,
    TYPED_ARRAY_CONSTRUCTOR: TYPED_ARRAY_CONSTRUCTOR$2,
    TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQUIRED && TYPED_ARRAY_TAG$1,
    aTypedArray: aTypedArray$m,
    aTypedArrayConstructor: aTypedArrayConstructor$3,
    exportTypedArrayMethod: exportTypedArrayMethod$n,
    exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
    isView: isView,
    isTypedArray: isTypedArray$1,
    TypedArray: TypedArray$1,
    TypedArrayPrototype: TypedArrayPrototype$2
  };

  /* eslint-disable no-new -- required for testing */

  var global$t = global$F;
  var fails$r = fails$H;
  var checkCorrectnessOfIteration$3 = checkCorrectnessOfIteration$4;
  var NATIVE_ARRAY_BUFFER_VIEWS$1 = arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;

  var ArrayBuffer$3 = global$t.ArrayBuffer;
  var Int8Array$3 = global$t.Int8Array;

  var typedArrayConstructorsRequireWrappers = !NATIVE_ARRAY_BUFFER_VIEWS$1 || !fails$r(function () {
    Int8Array$3(1);
  }) || !fails$r(function () {
    new Int8Array$3(-1);
  }) || !checkCorrectnessOfIteration$3(function (iterable) {
    new Int8Array$3();
    new Int8Array$3(null);
    new Int8Array$3(1.5);
    new Int8Array$3(iterable);
  }, true) || fails$r(function () {
    // Safari (11+) bug - a reason why even Safari 13 should load a typed array polyfill
    return new Int8Array$3(new ArrayBuffer$3(2), 1, undefined).length !== 1;
  });

  var isObject$b = isObject$k;

  var floor$5 = Math.floor;

  // `IsIntegralNumber` abstract operation
  // https://tc39.es/ecma262/#sec-isintegralnumber
  // eslint-disable-next-line es-x/no-number-isinteger -- safe
  var isIntegralNumber$1 = Number.isInteger || function isInteger(it) {
    return !isObject$b(it) && isFinite(it) && floor$5(it) === it;
  };

  var toIntegerOrInfinity$4 = toIntegerOrInfinity$9;

  var $RangeError$2 = RangeError;

  var toPositiveInteger$1 = function (it) {
    var result = toIntegerOrInfinity$4(it);
    if (result < 0) throw $RangeError$2("The argument can't be less than 0");
    return result;
  };

  var toPositiveInteger = toPositiveInteger$1;

  var $RangeError$1 = RangeError;

  var toOffset$2 = function (it, BYTES) {
    var offset = toPositiveInteger(it);
    if (offset % BYTES) throw $RangeError$1('Wrong offset');
    return offset;
  };

  var classof$9 = classof$d;
  var getMethod$3 = getMethod$5;
  var Iterators$1 = iterators;
  var wellKnownSymbol$f = wellKnownSymbol$t;

  var ITERATOR$5 = wellKnownSymbol$f('iterator');

  var getIteratorMethod$5 = function (it) {
    if (it != undefined) return getMethod$3(it, ITERATOR$5)
      || getMethod$3(it, '@@iterator')
      || Iterators$1[classof$9(it)];
  };

  var call$l = functionCall;
  var aCallable$6 = aCallable$9;
  var anObject$a = anObject$i;
  var tryToString$3 = tryToString$7;
  var getIteratorMethod$4 = getIteratorMethod$5;

  var $TypeError$7 = TypeError;

  var getIterator$4 = function (argument, usingIterator) {
    var iteratorMethod = arguments.length < 2 ? getIteratorMethod$4(argument) : usingIterator;
    if (aCallable$6(iteratorMethod)) return anObject$a(call$l(iteratorMethod, argument));
    throw $TypeError$7(tryToString$3(argument) + ' is not iterable');
  };

  var wellKnownSymbol$e = wellKnownSymbol$t;
  var Iterators = iterators;

  var ITERATOR$4 = wellKnownSymbol$e('iterator');
  var ArrayPrototype = Array.prototype;

  // check on default Array iterator
  var isArrayIteratorMethod$3 = function (it) {
    return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR$4] === it);
  };

  var bind$8 = functionBindContext;
  var call$k = functionCall;
  var aConstructor = aConstructor$2;
  var toObject$7 = toObject$d;
  var lengthOfArrayLike$9 = lengthOfArrayLike$f;
  var getIterator$3 = getIterator$4;
  var getIteratorMethod$3 = getIteratorMethod$5;
  var isArrayIteratorMethod$2 = isArrayIteratorMethod$3;
  var aTypedArrayConstructor$2 = arrayBufferViewCore.aTypedArrayConstructor;

  var typedArrayFrom$1 = function from(source /* , mapfn, thisArg */) {
    var C = aConstructor(this);
    var O = toObject$7(source);
    var argumentsLength = arguments.length;
    var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iteratorMethod = getIteratorMethod$3(O);
    var i, length, result, step, iterator, next;
    if (iteratorMethod && !isArrayIteratorMethod$2(iteratorMethod)) {
      iterator = getIterator$3(O, iteratorMethod);
      next = iterator.next;
      O = [];
      while (!(step = call$k(next, iterator)).done) {
        O.push(step.value);
      }
    }
    if (mapping && argumentsLength > 2) {
      mapfn = bind$8(mapfn, arguments[2]);
    }
    length = lengthOfArrayLike$9(O);
    result = new (aTypedArrayConstructor$2(C))(length);
    for (i = 0; length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var getBuiltIn$5 = getBuiltIn$b;
  var definePropertyModule$2 = objectDefineProperty;
  var wellKnownSymbol$d = wellKnownSymbol$t;
  var DESCRIPTORS$a = descriptors;

  var SPECIES$3 = wellKnownSymbol$d('species');

  var setSpecies$4 = function (CONSTRUCTOR_NAME) {
    var Constructor = getBuiltIn$5(CONSTRUCTOR_NAME);
    var defineProperty = definePropertyModule$2.f;

    if (DESCRIPTORS$a && Constructor && !Constructor[SPECIES$3]) {
      defineProperty(Constructor, SPECIES$3, {
        configurable: true,
        get: function () { return this; }
      });
    }
  };

  var isCallable$a = isCallable$s;
  var isObject$a = isObject$k;
  var setPrototypeOf$2 = objectSetPrototypeOf;

  // makes subclassing work correct for wrapped built-ins
  var inheritIfRequired$3 = function ($this, dummy, Wrapper) {
    var NewTarget, NewTargetPrototype;
    if (
      // it can work only with native `setPrototypeOf`
      setPrototypeOf$2 &&
      // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
      isCallable$a(NewTarget = dummy.constructor) &&
      NewTarget !== Wrapper &&
      isObject$a(NewTargetPrototype = NewTarget.prototype) &&
      NewTargetPrototype !== Wrapper.prototype
    ) setPrototypeOf$2($this, NewTargetPrototype);
    return $this;
  };

  var $$v = _export;
  var global$s = global$F;
  var call$j = functionCall;
  var DESCRIPTORS$9 = descriptors;
  var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = typedArrayConstructorsRequireWrappers;
  var ArrayBufferViewCore$n = arrayBufferViewCore;
  var ArrayBufferModule = arrayBuffer;
  var anInstance$5 = anInstance$7;
  var createPropertyDescriptor$2 = createPropertyDescriptor$7;
  var createNonEnumerableProperty$3 = createNonEnumerableProperty$a;
  var isIntegralNumber = isIntegralNumber$1;
  var toLength$5 = toLength$a;
  var toIndex = toIndex$2;
  var toOffset$1 = toOffset$2;
  var toPropertyKey$1 = toPropertyKey$5;
  var hasOwn$a = hasOwnProperty_1;
  var classof$8 = classof$d;
  var isObject$9 = isObject$k;
  var isSymbol$3 = isSymbol$6;
  var create$3 = objectCreate;
  var isPrototypeOf$4 = objectIsPrototypeOf;
  var setPrototypeOf$1 = objectSetPrototypeOf;
  var getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
  var typedArrayFrom = typedArrayFrom$1;
  var forEach$1 = arrayIteration.forEach;
  var setSpecies$3 = setSpecies$4;
  var definePropertyModule$1 = objectDefineProperty;
  var getOwnPropertyDescriptorModule$1 = objectGetOwnPropertyDescriptor;
  var InternalStateModule$6 = internalState;
  var inheritIfRequired$2 = inheritIfRequired$3;

  var getInternalState$3 = InternalStateModule$6.get;
  var setInternalState$6 = InternalStateModule$6.set;
  var nativeDefineProperty$1 = definePropertyModule$1.f;
  var nativeGetOwnPropertyDescriptor$1 = getOwnPropertyDescriptorModule$1.f;
  var round = Math.round;
  var RangeError$2 = global$s.RangeError;
  var ArrayBuffer$2 = ArrayBufferModule.ArrayBuffer;
  var ArrayBufferPrototype = ArrayBuffer$2.prototype;
  var DataView$1 = ArrayBufferModule.DataView;
  var NATIVE_ARRAY_BUFFER_VIEWS = ArrayBufferViewCore$n.NATIVE_ARRAY_BUFFER_VIEWS;
  var TYPED_ARRAY_CONSTRUCTOR$1 = ArrayBufferViewCore$n.TYPED_ARRAY_CONSTRUCTOR;
  var TYPED_ARRAY_TAG = ArrayBufferViewCore$n.TYPED_ARRAY_TAG;
  var TypedArray = ArrayBufferViewCore$n.TypedArray;
  var TypedArrayPrototype$1 = ArrayBufferViewCore$n.TypedArrayPrototype;
  var aTypedArrayConstructor$1 = ArrayBufferViewCore$n.aTypedArrayConstructor;
  var isTypedArray = ArrayBufferViewCore$n.isTypedArray;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var WRONG_LENGTH = 'Wrong length';

  var fromList = function (C, list) {
    aTypedArrayConstructor$1(C);
    var index = 0;
    var length = list.length;
    var result = new C(length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key) {
    nativeDefineProperty$1(it, key, { get: function () {
      return getInternalState$3(this)[key];
    } });
  };

  var isArrayBuffer = function (it) {
    var klass;
    return isPrototypeOf$4(ArrayBufferPrototype, it) || (klass = classof$8(it)) == 'ArrayBuffer' || klass == 'SharedArrayBuffer';
  };

  var isTypedArrayIndex = function (target, key) {
    return isTypedArray(target)
      && !isSymbol$3(key)
      && key in target
      && isIntegralNumber(+key)
      && key >= 0;
  };

  var wrappedGetOwnPropertyDescriptor = function getOwnPropertyDescriptor(target, key) {
    key = toPropertyKey$1(key);
    return isTypedArrayIndex(target, key)
      ? createPropertyDescriptor$2(2, target[key])
      : nativeGetOwnPropertyDescriptor$1(target, key);
  };

  var wrappedDefineProperty = function defineProperty(target, key, descriptor) {
    key = toPropertyKey$1(key);
    if (isTypedArrayIndex(target, key)
      && isObject$9(descriptor)
      && hasOwn$a(descriptor, 'value')
      && !hasOwn$a(descriptor, 'get')
      && !hasOwn$a(descriptor, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !descriptor.configurable
      && (!hasOwn$a(descriptor, 'writable') || descriptor.writable)
      && (!hasOwn$a(descriptor, 'enumerable') || descriptor.enumerable)
    ) {
      target[key] = descriptor.value;
      return target;
    } return nativeDefineProperty$1(target, key, descriptor);
  };

  if (DESCRIPTORS$9) {
    if (!NATIVE_ARRAY_BUFFER_VIEWS) {
      getOwnPropertyDescriptorModule$1.f = wrappedGetOwnPropertyDescriptor;
      definePropertyModule$1.f = wrappedDefineProperty;
      addGetter(TypedArrayPrototype$1, 'buffer');
      addGetter(TypedArrayPrototype$1, 'byteOffset');
      addGetter(TypedArrayPrototype$1, 'byteLength');
      addGetter(TypedArrayPrototype$1, 'length');
    }

    $$v({ target: 'Object', stat: true, forced: !NATIVE_ARRAY_BUFFER_VIEWS }, {
      getOwnPropertyDescriptor: wrappedGetOwnPropertyDescriptor,
      defineProperty: wrappedDefineProperty
    });

    typedArrayConstructor.exports = function (TYPE, wrapper, CLAMPED) {
      var BYTES = TYPE.match(/\d+$/)[0] / 8;
      var CONSTRUCTOR_NAME = TYPE + (CLAMPED ? 'Clamped' : '') + 'Array';
      var GETTER = 'get' + TYPE;
      var SETTER = 'set' + TYPE;
      var NativeTypedArrayConstructor = global$s[CONSTRUCTOR_NAME];
      var TypedArrayConstructor = NativeTypedArrayConstructor;
      var TypedArrayConstructorPrototype = TypedArrayConstructor && TypedArrayConstructor.prototype;
      var exported = {};

      var getter = function (that, index) {
        var data = getInternalState$3(that);
        return data.view[GETTER](index * BYTES + data.byteOffset, true);
      };

      var setter = function (that, index, value) {
        var data = getInternalState$3(that);
        if (CLAMPED) value = (value = round(value)) < 0 ? 0 : value > 0xFF ? 0xFF : value & 0xFF;
        data.view[SETTER](index * BYTES + data.byteOffset, value, true);
      };

      var addElement = function (that, index) {
        nativeDefineProperty$1(that, index, {
          get: function () {
            return getter(this, index);
          },
          set: function (value) {
            return setter(this, index, value);
          },
          enumerable: true
        });
      };

      if (!NATIVE_ARRAY_BUFFER_VIEWS) {
        TypedArrayConstructor = wrapper(function (that, data, offset, $length) {
          anInstance$5(that, TypedArrayConstructorPrototype);
          var index = 0;
          var byteOffset = 0;
          var buffer, byteLength, length;
          if (!isObject$9(data)) {
            length = toIndex(data);
            byteLength = length * BYTES;
            buffer = new ArrayBuffer$2(byteLength);
          } else if (isArrayBuffer(data)) {
            buffer = data;
            byteOffset = toOffset$1(offset, BYTES);
            var $len = data.byteLength;
            if ($length === undefined) {
              if ($len % BYTES) throw RangeError$2(WRONG_LENGTH);
              byteLength = $len - byteOffset;
              if (byteLength < 0) throw RangeError$2(WRONG_LENGTH);
            } else {
              byteLength = toLength$5($length) * BYTES;
              if (byteLength + byteOffset > $len) throw RangeError$2(WRONG_LENGTH);
            }
            length = byteLength / BYTES;
          } else if (isTypedArray(data)) {
            return fromList(TypedArrayConstructor, data);
          } else {
            return call$j(typedArrayFrom, TypedArrayConstructor, data);
          }
          setInternalState$6(that, {
            buffer: buffer,
            byteOffset: byteOffset,
            byteLength: byteLength,
            length: length,
            view: new DataView$1(buffer)
          });
          while (index < length) addElement(that, index++);
        });

        if (setPrototypeOf$1) setPrototypeOf$1(TypedArrayConstructor, TypedArray);
        TypedArrayConstructorPrototype = TypedArrayConstructor.prototype = create$3(TypedArrayPrototype$1);
      } else if (TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS) {
        TypedArrayConstructor = wrapper(function (dummy, data, typedArrayOffset, $length) {
          anInstance$5(dummy, TypedArrayConstructorPrototype);
          return inheritIfRequired$2(function () {
            if (!isObject$9(data)) return new NativeTypedArrayConstructor(toIndex(data));
            if (isArrayBuffer(data)) return $length !== undefined
              ? new NativeTypedArrayConstructor(data, toOffset$1(typedArrayOffset, BYTES), $length)
              : typedArrayOffset !== undefined
                ? new NativeTypedArrayConstructor(data, toOffset$1(typedArrayOffset, BYTES))
                : new NativeTypedArrayConstructor(data);
            if (isTypedArray(data)) return fromList(TypedArrayConstructor, data);
            return call$j(typedArrayFrom, TypedArrayConstructor, data);
          }(), dummy, TypedArrayConstructor);
        });

        if (setPrototypeOf$1) setPrototypeOf$1(TypedArrayConstructor, TypedArray);
        forEach$1(getOwnPropertyNames$1(NativeTypedArrayConstructor), function (key) {
          if (!(key in TypedArrayConstructor)) {
            createNonEnumerableProperty$3(TypedArrayConstructor, key, NativeTypedArrayConstructor[key]);
          }
        });
        TypedArrayConstructor.prototype = TypedArrayConstructorPrototype;
      }

      if (TypedArrayConstructorPrototype.constructor !== TypedArrayConstructor) {
        createNonEnumerableProperty$3(TypedArrayConstructorPrototype, 'constructor', TypedArrayConstructor);
      }

      createNonEnumerableProperty$3(TypedArrayConstructorPrototype, TYPED_ARRAY_CONSTRUCTOR$1, TypedArrayConstructor);

      if (TYPED_ARRAY_TAG) {
        createNonEnumerableProperty$3(TypedArrayConstructorPrototype, TYPED_ARRAY_TAG, CONSTRUCTOR_NAME);
      }

      var FORCED = TypedArrayConstructor != NativeTypedArrayConstructor;

      exported[CONSTRUCTOR_NAME] = TypedArrayConstructor;

      $$v({ global: true, constructor: true, forced: FORCED, sham: !NATIVE_ARRAY_BUFFER_VIEWS }, exported);

      if (!(BYTES_PER_ELEMENT in TypedArrayConstructor)) {
        createNonEnumerableProperty$3(TypedArrayConstructor, BYTES_PER_ELEMENT, BYTES);
      }

      if (!(BYTES_PER_ELEMENT in TypedArrayConstructorPrototype)) {
        createNonEnumerableProperty$3(TypedArrayConstructorPrototype, BYTES_PER_ELEMENT, BYTES);
      }

      setSpecies$3(CONSTRUCTOR_NAME);
    };
  } else typedArrayConstructor.exports = function () { /* empty */ };

  var createTypedArrayConstructor$3 = typedArrayConstructor.exports;

  // `Uint8Array` constructor
  // https://tc39.es/ecma262/#sec-typedarray-objects
  createTypedArrayConstructor$3('Uint8', function (init) {
    return function Uint8Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  });

  var tryToString$2 = tryToString$7;

  var $TypeError$6 = TypeError;

  var deletePropertyOrThrow$2 = function (O, P) {
    if (!delete O[P]) throw $TypeError$6('Cannot delete property ' + tryToString$2(P) + ' of ' + tryToString$2(O));
  };

  var toObject$6 = toObject$d;
  var toAbsoluteIndex$3 = toAbsoluteIndex$8;
  var lengthOfArrayLike$8 = lengthOfArrayLike$f;
  var deletePropertyOrThrow$1 = deletePropertyOrThrow$2;

  var min$6 = Math.min;

  // `Array.prototype.copyWithin` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.copywithin
  // eslint-disable-next-line es-x/no-array-prototype-copywithin -- safe
  var arrayCopyWithin = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
    var O = toObject$6(this);
    var len = lengthOfArrayLike$8(O);
    var to = toAbsoluteIndex$3(target, len);
    var from = toAbsoluteIndex$3(start, len);
    var end = arguments.length > 2 ? arguments[2] : undefined;
    var count = min$6((end === undefined ? len : toAbsoluteIndex$3(end, len)) - from, len - to);
    var inc = 1;
    if (from < to && to < from + count) {
      inc = -1;
      from += count - 1;
      to += count - 1;
    }
    while (count-- > 0) {
      if (from in O) O[to] = O[from];
      else deletePropertyOrThrow$1(O, to);
      to += inc;
      from += inc;
    } return O;
  };

  var uncurryThis$s = functionUncurryThis;
  var ArrayBufferViewCore$m = arrayBufferViewCore;
  var $ArrayCopyWithin = arrayCopyWithin;

  var u$ArrayCopyWithin = uncurryThis$s($ArrayCopyWithin);
  var aTypedArray$l = ArrayBufferViewCore$m.aTypedArray;
  var exportTypedArrayMethod$m = ArrayBufferViewCore$m.exportTypedArrayMethod;

  // `%TypedArray%.prototype.copyWithin` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.copywithin
  exportTypedArrayMethod$m('copyWithin', function copyWithin(target, start /* , end */) {
    return u$ArrayCopyWithin(aTypedArray$l(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
  });

  var ArrayBufferViewCore$l = arrayBufferViewCore;
  var $every = arrayIteration.every;

  var aTypedArray$k = ArrayBufferViewCore$l.aTypedArray;
  var exportTypedArrayMethod$l = ArrayBufferViewCore$l.exportTypedArrayMethod;

  // `%TypedArray%.prototype.every` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.every
  exportTypedArrayMethod$l('every', function every(callbackfn /* , thisArg */) {
    return $every(aTypedArray$k(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  });

  var toPrimitive$1 = toPrimitive$3;

  var $TypeError$5 = TypeError;

  // `ToBigInt` abstract operation
  // https://tc39.es/ecma262/#sec-tobigint
  var toBigInt$1 = function (argument) {
    var prim = toPrimitive$1(argument, 'number');
    if (typeof prim == 'number') throw $TypeError$5("Can't convert number to bigint");
    // eslint-disable-next-line es-x/no-bigint -- safe
    return BigInt(prim);
  };

  var ArrayBufferViewCore$k = arrayBufferViewCore;
  var $fill = arrayFill$1;
  var toBigInt = toBigInt$1;
  var classof$7 = classof$d;
  var call$i = functionCall;
  var uncurryThis$r = functionUncurryThis;
  var fails$q = fails$H;

  var aTypedArray$j = ArrayBufferViewCore$k.aTypedArray;
  var exportTypedArrayMethod$k = ArrayBufferViewCore$k.exportTypedArrayMethod;
  var slice$1 = uncurryThis$r(''.slice);

  // V8 ~ Chrome < 59, Safari < 14.1, FF < 55, Edge <=18
  var CONVERSION_BUG = fails$q(function () {
    var count = 0;
    // eslint-disable-next-line es-x/no-typed-arrays -- safe
    new Int8Array(2).fill({ valueOf: function () { return count++; } });
    return count !== 1;
  });

  // `%TypedArray%.prototype.fill` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.fill
  exportTypedArrayMethod$k('fill', function fill(value /* , start, end */) {
    var length = arguments.length;
    aTypedArray$j(this);
    var actualValue = slice$1(classof$7(this), 0, 3) === 'Big' ? toBigInt(value) : +value;
    return call$i($fill, this, actualValue, length > 1 ? arguments[1] : undefined, length > 2 ? arguments[2] : undefined);
  }, CONVERSION_BUG);

  var lengthOfArrayLike$7 = lengthOfArrayLike$f;

  var arrayFromConstructorAndList$1 = function (Constructor, list) {
    var index = 0;
    var length = lengthOfArrayLike$7(list);
    var result = new Constructor(length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var ArrayBufferViewCore$j = arrayBufferViewCore;
  var speciesConstructor$2 = speciesConstructor$4;

  var TYPED_ARRAY_CONSTRUCTOR = ArrayBufferViewCore$j.TYPED_ARRAY_CONSTRUCTOR;
  var aTypedArrayConstructor = ArrayBufferViewCore$j.aTypedArrayConstructor;

  // a part of `TypedArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#typedarray-species-create
  var typedArraySpeciesConstructor$4 = function (originalArray) {
    return aTypedArrayConstructor(speciesConstructor$2(originalArray, originalArray[TYPED_ARRAY_CONSTRUCTOR]));
  };

  var arrayFromConstructorAndList = arrayFromConstructorAndList$1;
  var typedArraySpeciesConstructor$3 = typedArraySpeciesConstructor$4;

  var typedArrayFromSpeciesAndList = function (instance, list) {
    return arrayFromConstructorAndList(typedArraySpeciesConstructor$3(instance), list);
  };

  var ArrayBufferViewCore$i = arrayBufferViewCore;
  var $filter$1 = arrayIteration.filter;
  var fromSpeciesAndList = typedArrayFromSpeciesAndList;

  var aTypedArray$i = ArrayBufferViewCore$i.aTypedArray;
  var exportTypedArrayMethod$j = ArrayBufferViewCore$i.exportTypedArrayMethod;

  // `%TypedArray%.prototype.filter` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.filter
  exportTypedArrayMethod$j('filter', function filter(callbackfn /* , thisArg */) {
    var list = $filter$1(aTypedArray$i(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    return fromSpeciesAndList(this, list);
  });

  var ArrayBufferViewCore$h = arrayBufferViewCore;
  var $find$1 = arrayIteration.find;

  var aTypedArray$h = ArrayBufferViewCore$h.aTypedArray;
  var exportTypedArrayMethod$i = ArrayBufferViewCore$h.exportTypedArrayMethod;

  // `%TypedArray%.prototype.find` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.find
  exportTypedArrayMethod$i('find', function find(predicate /* , thisArg */) {
    return $find$1(aTypedArray$h(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
  });

  var ArrayBufferViewCore$g = arrayBufferViewCore;
  var $findIndex = arrayIteration.findIndex;

  var aTypedArray$g = ArrayBufferViewCore$g.aTypedArray;
  var exportTypedArrayMethod$h = ArrayBufferViewCore$g.exportTypedArrayMethod;

  // `%TypedArray%.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.findindex
  exportTypedArrayMethod$h('findIndex', function findIndex(predicate /* , thisArg */) {
    return $findIndex(aTypedArray$g(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
  });

  var ArrayBufferViewCore$f = arrayBufferViewCore;
  var $forEach$2 = arrayIteration.forEach;

  var aTypedArray$f = ArrayBufferViewCore$f.aTypedArray;
  var exportTypedArrayMethod$g = ArrayBufferViewCore$f.exportTypedArrayMethod;

  // `%TypedArray%.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.foreach
  exportTypedArrayMethod$g('forEach', function forEach(callbackfn /* , thisArg */) {
    $forEach$2(aTypedArray$f(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  });

  var ArrayBufferViewCore$e = arrayBufferViewCore;
  var $includes = arrayIncludes.includes;

  var aTypedArray$e = ArrayBufferViewCore$e.aTypedArray;
  var exportTypedArrayMethod$f = ArrayBufferViewCore$e.exportTypedArrayMethod;

  // `%TypedArray%.prototype.includes` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.includes
  exportTypedArrayMethod$f('includes', function includes(searchElement /* , fromIndex */) {
    return $includes(aTypedArray$e(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
  });

  var ArrayBufferViewCore$d = arrayBufferViewCore;
  var $indexOf = arrayIncludes.indexOf;

  var aTypedArray$d = ArrayBufferViewCore$d.aTypedArray;
  var exportTypedArrayMethod$e = ArrayBufferViewCore$d.exportTypedArrayMethod;

  // `%TypedArray%.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.indexof
  exportTypedArrayMethod$e('indexOf', function indexOf(searchElement /* , fromIndex */) {
    return $indexOf(aTypedArray$d(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
  });

  var global$r = global$F;
  var fails$p = fails$H;
  var uncurryThis$q = functionUncurryThis;
  var ArrayBufferViewCore$c = arrayBufferViewCore;
  var ArrayIterators = es_array_iterator;
  var wellKnownSymbol$c = wellKnownSymbol$t;

  var ITERATOR$3 = wellKnownSymbol$c('iterator');
  var Uint8Array$2 = global$r.Uint8Array;
  var arrayValues = uncurryThis$q(ArrayIterators.values);
  var arrayKeys = uncurryThis$q(ArrayIterators.keys);
  var arrayEntries = uncurryThis$q(ArrayIterators.entries);
  var aTypedArray$c = ArrayBufferViewCore$c.aTypedArray;
  var exportTypedArrayMethod$d = ArrayBufferViewCore$c.exportTypedArrayMethod;
  var TypedArrayPrototype = Uint8Array$2 && Uint8Array$2.prototype;

  var GENERIC = !fails$p(function () {
    TypedArrayPrototype[ITERATOR$3].call([1]);
  });

  var ITERATOR_IS_VALUES = !!TypedArrayPrototype
    && TypedArrayPrototype.values
    && TypedArrayPrototype[ITERATOR$3] === TypedArrayPrototype.values
    && TypedArrayPrototype.values.name === 'values';

  var typedArrayValues = function values() {
    return arrayValues(aTypedArray$c(this));
  };

  // `%TypedArray%.prototype.entries` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.entries
  exportTypedArrayMethod$d('entries', function entries() {
    return arrayEntries(aTypedArray$c(this));
  }, GENERIC);
  // `%TypedArray%.prototype.keys` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.keys
  exportTypedArrayMethod$d('keys', function keys() {
    return arrayKeys(aTypedArray$c(this));
  }, GENERIC);
  // `%TypedArray%.prototype.values` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.values
  exportTypedArrayMethod$d('values', typedArrayValues, GENERIC || !ITERATOR_IS_VALUES, { name: 'values' });
  // `%TypedArray%.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype-@@iterator
  exportTypedArrayMethod$d(ITERATOR$3, typedArrayValues, GENERIC || !ITERATOR_IS_VALUES, { name: 'values' });

  var ArrayBufferViewCore$b = arrayBufferViewCore;
  var uncurryThis$p = functionUncurryThis;

  var aTypedArray$b = ArrayBufferViewCore$b.aTypedArray;
  var exportTypedArrayMethod$c = ArrayBufferViewCore$b.exportTypedArrayMethod;
  var $join = uncurryThis$p([].join);

  // `%TypedArray%.prototype.join` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.join
  exportTypedArrayMethod$c('join', function join(separator) {
    return $join(aTypedArray$b(this), separator);
  });

  var NATIVE_BIND = functionBindNative;

  var FunctionPrototype$1 = Function.prototype;
  var apply$7 = FunctionPrototype$1.apply;
  var call$h = FunctionPrototype$1.call;

  // eslint-disable-next-line es-x/no-reflect -- safe
  var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call$h.bind(apply$7) : function () {
    return call$h.apply(apply$7, arguments);
  });

  var fails$o = fails$H;

  var arrayMethodIsStrict$2 = function (METHOD_NAME, argument) {
    var method = [][METHOD_NAME];
    return !!method && fails$o(function () {
      // eslint-disable-next-line no-useless-call -- required for testing
      method.call(null, argument || function () { return 1; }, 1);
    });
  };

  /* eslint-disable es-x/no-array-prototype-lastindexof -- safe */
  var apply$6 = functionApply;
  var toIndexedObject$5 = toIndexedObject$b;
  var toIntegerOrInfinity$3 = toIntegerOrInfinity$9;
  var lengthOfArrayLike$6 = lengthOfArrayLike$f;
  var arrayMethodIsStrict$1 = arrayMethodIsStrict$2;

  var min$5 = Math.min;
  var $lastIndexOf$1 = [].lastIndexOf;
  var NEGATIVE_ZERO = !!$lastIndexOf$1 && 1 / [1].lastIndexOf(1, -0) < 0;
  var STRICT_METHOD$1 = arrayMethodIsStrict$1('lastIndexOf');
  var FORCED$4 = NEGATIVE_ZERO || !STRICT_METHOD$1;

  // `Array.prototype.lastIndexOf` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.lastindexof
  var arrayLastIndexOf = FORCED$4 ? function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return apply$6($lastIndexOf$1, this, arguments) || 0;
    var O = toIndexedObject$5(this);
    var length = lengthOfArrayLike$6(O);
    var index = length - 1;
    if (arguments.length > 1) index = min$5(index, toIntegerOrInfinity$3(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O && O[index] === searchElement) return index || 0;
    return -1;
  } : $lastIndexOf$1;

  var ArrayBufferViewCore$a = arrayBufferViewCore;
  var apply$5 = functionApply;
  var $lastIndexOf = arrayLastIndexOf;

  var aTypedArray$a = ArrayBufferViewCore$a.aTypedArray;
  var exportTypedArrayMethod$b = ArrayBufferViewCore$a.exportTypedArrayMethod;

  // `%TypedArray%.prototype.lastIndexOf` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.lastindexof
  exportTypedArrayMethod$b('lastIndexOf', function lastIndexOf(searchElement /* , fromIndex */) {
    var length = arguments.length;
    return apply$5($lastIndexOf, aTypedArray$a(this), length > 1 ? [searchElement, arguments[1]] : [searchElement]);
  });

  var ArrayBufferViewCore$9 = arrayBufferViewCore;
  var $map = arrayIteration.map;
  var typedArraySpeciesConstructor$2 = typedArraySpeciesConstructor$4;

  var aTypedArray$9 = ArrayBufferViewCore$9.aTypedArray;
  var exportTypedArrayMethod$a = ArrayBufferViewCore$9.exportTypedArrayMethod;

  // `%TypedArray%.prototype.map` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.map
  exportTypedArrayMethod$a('map', function map(mapfn /* , thisArg */) {
    return $map(aTypedArray$9(this), mapfn, arguments.length > 1 ? arguments[1] : undefined, function (O, length) {
      return new (typedArraySpeciesConstructor$2(O))(length);
    });
  });

  var aCallable$5 = aCallable$9;
  var toObject$5 = toObject$d;
  var IndexedObject$1 = indexedObject;
  var lengthOfArrayLike$5 = lengthOfArrayLike$f;

  var $TypeError$4 = TypeError;

  // `Array.prototype.{ reduce, reduceRight }` methods implementation
  var createMethod$3 = function (IS_RIGHT) {
    return function (that, callbackfn, argumentsLength, memo) {
      aCallable$5(callbackfn);
      var O = toObject$5(that);
      var self = IndexedObject$1(O);
      var length = lengthOfArrayLike$5(O);
      var index = IS_RIGHT ? length - 1 : 0;
      var i = IS_RIGHT ? -1 : 1;
      if (argumentsLength < 2) while (true) {
        if (index in self) {
          memo = self[index];
          index += i;
          break;
        }
        index += i;
        if (IS_RIGHT ? index < 0 : length <= index) {
          throw $TypeError$4('Reduce of empty array with no initial value');
        }
      }
      for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
        memo = callbackfn(memo, self[index], index, O);
      }
      return memo;
    };
  };

  var arrayReduce = {
    // `Array.prototype.reduce` method
    // https://tc39.es/ecma262/#sec-array.prototype.reduce
    left: createMethod$3(false),
    // `Array.prototype.reduceRight` method
    // https://tc39.es/ecma262/#sec-array.prototype.reduceright
    right: createMethod$3(true)
  };

  var ArrayBufferViewCore$8 = arrayBufferViewCore;
  var $reduce = arrayReduce.left;

  var aTypedArray$8 = ArrayBufferViewCore$8.aTypedArray;
  var exportTypedArrayMethod$9 = ArrayBufferViewCore$8.exportTypedArrayMethod;

  // `%TypedArray%.prototype.reduce` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.reduce
  exportTypedArrayMethod$9('reduce', function reduce(callbackfn /* , initialValue */) {
    var length = arguments.length;
    return $reduce(aTypedArray$8(this), callbackfn, length, length > 1 ? arguments[1] : undefined);
  });

  var ArrayBufferViewCore$7 = arrayBufferViewCore;
  var $reduceRight = arrayReduce.right;

  var aTypedArray$7 = ArrayBufferViewCore$7.aTypedArray;
  var exportTypedArrayMethod$8 = ArrayBufferViewCore$7.exportTypedArrayMethod;

  // `%TypedArray%.prototype.reduceRicht` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.reduceright
  exportTypedArrayMethod$8('reduceRight', function reduceRight(callbackfn /* , initialValue */) {
    var length = arguments.length;
    return $reduceRight(aTypedArray$7(this), callbackfn, length, length > 1 ? arguments[1] : undefined);
  });

  var ArrayBufferViewCore$6 = arrayBufferViewCore;

  var aTypedArray$6 = ArrayBufferViewCore$6.aTypedArray;
  var exportTypedArrayMethod$7 = ArrayBufferViewCore$6.exportTypedArrayMethod;
  var floor$4 = Math.floor;

  // `%TypedArray%.prototype.reverse` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.reverse
  exportTypedArrayMethod$7('reverse', function reverse() {
    var that = this;
    var length = aTypedArray$6(that).length;
    var middle = floor$4(length / 2);
    var index = 0;
    var value;
    while (index < middle) {
      value = that[index];
      that[index++] = that[--length];
      that[length] = value;
    } return that;
  });

  var global$q = global$F;
  var call$g = functionCall;
  var ArrayBufferViewCore$5 = arrayBufferViewCore;
  var lengthOfArrayLike$4 = lengthOfArrayLike$f;
  var toOffset = toOffset$2;
  var toIndexedObject$4 = toObject$d;
  var fails$n = fails$H;

  var RangeError$1 = global$q.RangeError;
  var Int8Array$2 = global$q.Int8Array;
  var Int8ArrayPrototype = Int8Array$2 && Int8Array$2.prototype;
  var $set = Int8ArrayPrototype && Int8ArrayPrototype.set;
  var aTypedArray$5 = ArrayBufferViewCore$5.aTypedArray;
  var exportTypedArrayMethod$6 = ArrayBufferViewCore$5.exportTypedArrayMethod;

  var WORKS_WITH_OBJECTS_AND_GEERIC_ON_TYPED_ARRAYS = !fails$n(function () {
    // eslint-disable-next-line es-x/no-typed-arrays -- required for testing
    var array = new Uint8ClampedArray(2);
    call$g($set, array, { length: 1, 0: 3 }, 1);
    return array[1] !== 3;
  });

  // https://bugs.chromium.org/p/v8/issues/detail?id=11294 and other
  var TO_OBJECT_BUG = WORKS_WITH_OBJECTS_AND_GEERIC_ON_TYPED_ARRAYS && ArrayBufferViewCore$5.NATIVE_ARRAY_BUFFER_VIEWS && fails$n(function () {
    var array = new Int8Array$2(2);
    array.set(1);
    array.set('2', 1);
    return array[0] !== 0 || array[1] !== 2;
  });

  // `%TypedArray%.prototype.set` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.set
  exportTypedArrayMethod$6('set', function set(arrayLike /* , offset */) {
    aTypedArray$5(this);
    var offset = toOffset(arguments.length > 1 ? arguments[1] : undefined, 1);
    var src = toIndexedObject$4(arrayLike);
    if (WORKS_WITH_OBJECTS_AND_GEERIC_ON_TYPED_ARRAYS) return call$g($set, this, src, offset);
    var length = this.length;
    var len = lengthOfArrayLike$4(src);
    var index = 0;
    if (len + offset > length) throw RangeError$1('Wrong length');
    while (index < len) this[offset + index] = src[index++];
  }, !WORKS_WITH_OBJECTS_AND_GEERIC_ON_TYPED_ARRAYS || TO_OBJECT_BUG);

  var uncurryThis$o = functionUncurryThis;

  var arraySlice$9 = uncurryThis$o([].slice);

  var ArrayBufferViewCore$4 = arrayBufferViewCore;
  var typedArraySpeciesConstructor$1 = typedArraySpeciesConstructor$4;
  var fails$m = fails$H;
  var arraySlice$8 = arraySlice$9;

  var aTypedArray$4 = ArrayBufferViewCore$4.aTypedArray;
  var exportTypedArrayMethod$5 = ArrayBufferViewCore$4.exportTypedArrayMethod;

  var FORCED$3 = fails$m(function () {
    // eslint-disable-next-line es-x/no-typed-arrays -- required for testing
    new Int8Array(1).slice();
  });

  // `%TypedArray%.prototype.slice` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.slice
  exportTypedArrayMethod$5('slice', function slice(start, end) {
    var list = arraySlice$8(aTypedArray$4(this), start, end);
    var C = typedArraySpeciesConstructor$1(this);
    var index = 0;
    var length = list.length;
    var result = new C(length);
    while (length > index) result[index] = list[index++];
    return result;
  }, FORCED$3);

  var ArrayBufferViewCore$3 = arrayBufferViewCore;
  var $some = arrayIteration.some;

  var aTypedArray$3 = ArrayBufferViewCore$3.aTypedArray;
  var exportTypedArrayMethod$4 = ArrayBufferViewCore$3.exportTypedArrayMethod;

  // `%TypedArray%.prototype.some` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.some
  exportTypedArrayMethod$4('some', function some(callbackfn /* , thisArg */) {
    return $some(aTypedArray$3(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  });

  var arraySlice$7 = arraySliceSimple;

  var floor$3 = Math.floor;

  var mergeSort = function (array, comparefn) {
    var length = array.length;
    var middle = floor$3(length / 2);
    return length < 8 ? insertionSort(array, comparefn) : merge(
      array,
      mergeSort(arraySlice$7(array, 0, middle), comparefn),
      mergeSort(arraySlice$7(array, middle), comparefn),
      comparefn
    );
  };

  var insertionSort = function (array, comparefn) {
    var length = array.length;
    var i = 1;
    var element, j;

    while (i < length) {
      j = i;
      element = array[i];
      while (j && comparefn(array[j - 1], element) > 0) {
        array[j] = array[--j];
      }
      if (j !== i++) array[j] = element;
    } return array;
  };

  var merge = function (array, left, right, comparefn) {
    var llength = left.length;
    var rlength = right.length;
    var lindex = 0;
    var rindex = 0;

    while (lindex < llength || rindex < rlength) {
      array[lindex + rindex] = (lindex < llength && rindex < rlength)
        ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]
        : lindex < llength ? left[lindex++] : right[rindex++];
    } return array;
  };

  var arraySort$1 = mergeSort;

  var userAgent$4 = engineUserAgent;

  var firefox = userAgent$4.match(/firefox\/(\d+)/i);

  var engineFfVersion = !!firefox && +firefox[1];

  var UA = engineUserAgent;

  var engineIsIeOrEdge = /MSIE|Trident/.test(UA);

  var userAgent$3 = engineUserAgent;

  var webkit = userAgent$3.match(/AppleWebKit\/(\d+)\./);

  var engineWebkitVersion = !!webkit && +webkit[1];

  var global$p = global$F;
  var uncurryThis$n = functionUncurryThis;
  var fails$l = fails$H;
  var aCallable$4 = aCallable$9;
  var internalSort = arraySort$1;
  var ArrayBufferViewCore$2 = arrayBufferViewCore;
  var FF = engineFfVersion;
  var IE_OR_EDGE = engineIsIeOrEdge;
  var V8 = engineV8Version;
  var WEBKIT = engineWebkitVersion;

  var aTypedArray$2 = ArrayBufferViewCore$2.aTypedArray;
  var exportTypedArrayMethod$3 = ArrayBufferViewCore$2.exportTypedArrayMethod;
  var Uint16Array$1 = global$p.Uint16Array;
  var un$Sort = Uint16Array$1 && uncurryThis$n(Uint16Array$1.prototype.sort);

  // WebKit
  var ACCEPT_INCORRECT_ARGUMENTS = !!un$Sort && !(fails$l(function () {
    un$Sort(new Uint16Array$1(2), null);
  }) && fails$l(function () {
    un$Sort(new Uint16Array$1(2), {});
  }));

  var STABLE_SORT = !!un$Sort && !fails$l(function () {
    // feature detection can be too slow, so check engines versions
    if (V8) return V8 < 74;
    if (FF) return FF < 67;
    if (IE_OR_EDGE) return true;
    if (WEBKIT) return WEBKIT < 602;

    var array = new Uint16Array$1(516);
    var expected = Array(516);
    var index, mod;

    for (index = 0; index < 516; index++) {
      mod = index % 4;
      array[index] = 515 - index;
      expected[index] = index - 2 * mod + 3;
    }

    un$Sort(array, function (a, b) {
      return (a / 4 | 0) - (b / 4 | 0);
    });

    for (index = 0; index < 516; index++) {
      if (array[index] !== expected[index]) return true;
    }
  });

  var getSortCompare = function (comparefn) {
    return function (x, y) {
      if (comparefn !== undefined) return +comparefn(x, y) || 0;
      // eslint-disable-next-line no-self-compare -- NaN check
      if (y !== y) return -1;
      // eslint-disable-next-line no-self-compare -- NaN check
      if (x !== x) return 1;
      if (x === 0 && y === 0) return 1 / x > 0 && 1 / y < 0 ? 1 : -1;
      return x > y;
    };
  };

  // `%TypedArray%.prototype.sort` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.sort
  exportTypedArrayMethod$3('sort', function sort(comparefn) {
    if (comparefn !== undefined) aCallable$4(comparefn);
    if (STABLE_SORT) return un$Sort(this, comparefn);

    return internalSort(aTypedArray$2(this), getSortCompare(comparefn));
  }, !STABLE_SORT || ACCEPT_INCORRECT_ARGUMENTS);

  var ArrayBufferViewCore$1 = arrayBufferViewCore;
  var toLength$4 = toLength$a;
  var toAbsoluteIndex$2 = toAbsoluteIndex$8;
  var typedArraySpeciesConstructor = typedArraySpeciesConstructor$4;

  var aTypedArray$1 = ArrayBufferViewCore$1.aTypedArray;
  var exportTypedArrayMethod$2 = ArrayBufferViewCore$1.exportTypedArrayMethod;

  // `%TypedArray%.prototype.subarray` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.subarray
  exportTypedArrayMethod$2('subarray', function subarray(begin, end) {
    var O = aTypedArray$1(this);
    var length = O.length;
    var beginIndex = toAbsoluteIndex$2(begin, length);
    var C = typedArraySpeciesConstructor(O);
    return new C(
      O.buffer,
      O.byteOffset + beginIndex * O.BYTES_PER_ELEMENT,
      toLength$4((end === undefined ? length : toAbsoluteIndex$2(end, length)) - beginIndex)
    );
  });

  var global$o = global$F;
  var apply$4 = functionApply;
  var ArrayBufferViewCore = arrayBufferViewCore;
  var fails$k = fails$H;
  var arraySlice$6 = arraySlice$9;

  var Int8Array$1 = global$o.Int8Array;
  var aTypedArray = ArrayBufferViewCore.aTypedArray;
  var exportTypedArrayMethod$1 = ArrayBufferViewCore.exportTypedArrayMethod;
  var $toLocaleString = [].toLocaleString;

  // iOS Safari 6.x fails here
  var TO_LOCALE_STRING_BUG = !!Int8Array$1 && fails$k(function () {
    $toLocaleString.call(new Int8Array$1(1));
  });

  var FORCED$2 = fails$k(function () {
    return [1, 2].toLocaleString() != new Int8Array$1([1, 2]).toLocaleString();
  }) || !fails$k(function () {
    Int8Array$1.prototype.toLocaleString.call([1, 2]);
  });

  // `%TypedArray%.prototype.toLocaleString` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.tolocalestring
  exportTypedArrayMethod$1('toLocaleString', function toLocaleString() {
    return apply$4(
      $toLocaleString,
      TO_LOCALE_STRING_BUG ? arraySlice$6(aTypedArray(this)) : aTypedArray(this),
      arraySlice$6(arguments)
    );
  }, FORCED$2);

  var exportTypedArrayMethod = arrayBufferViewCore.exportTypedArrayMethod;
  var fails$j = fails$H;
  var global$n = global$F;
  var uncurryThis$m = functionUncurryThis;

  var Uint8Array$1 = global$n.Uint8Array;
  var Uint8ArrayPrototype = Uint8Array$1 && Uint8Array$1.prototype || {};
  var arrayToString = [].toString;
  var join$3 = uncurryThis$m([].join);

  if (fails$j(function () { arrayToString.call({}); })) {
    arrayToString = function toString() {
      return join$3(this);
    };
  }

  var IS_NOT_ARRAY_METHOD = Uint8ArrayPrototype.toString != arrayToString;

  // `%TypedArray%.prototype.toString` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.tostring
  exportTypedArrayMethod('toString', arrayToString, IS_NOT_ARRAY_METHOD);

  var createTypedArrayConstructor$2 = typedArrayConstructor.exports;

  // `Uint16Array` constructor
  // https://tc39.es/ecma262/#sec-typedarray-objects
  createTypedArrayConstructor$2('Uint16', function (init) {
    return function Uint16Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  });

  var $$u = _export;
  var isArray$1 = isArray$4;
  var isConstructor$1 = isConstructor$4;
  var isObject$8 = isObject$k;
  var toAbsoluteIndex$1 = toAbsoluteIndex$8;
  var lengthOfArrayLike$3 = lengthOfArrayLike$f;
  var toIndexedObject$3 = toIndexedObject$b;
  var createProperty$3 = createProperty$6;
  var wellKnownSymbol$b = wellKnownSymbol$t;
  var arrayMethodHasSpeciesSupport$2 = arrayMethodHasSpeciesSupport$5;
  var un$Slice = arraySlice$9;

  var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport$2('slice');

  var SPECIES$2 = wellKnownSymbol$b('species');
  var $Array$1 = Array;
  var max$2 = Math.max;

  // `Array.prototype.slice` method
  // https://tc39.es/ecma262/#sec-array.prototype.slice
  // fallback for not array-like ES3 strings and DOM objects
  $$u({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 }, {
    slice: function slice(start, end) {
      var O = toIndexedObject$3(this);
      var length = lengthOfArrayLike$3(O);
      var k = toAbsoluteIndex$1(start, length);
      var fin = toAbsoluteIndex$1(end === undefined ? length : end, length);
      // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
      var Constructor, result, n;
      if (isArray$1(O)) {
        Constructor = O.constructor;
        // cross-realm fallback
        if (isConstructor$1(Constructor) && (Constructor === $Array$1 || isArray$1(Constructor.prototype))) {
          Constructor = undefined;
        } else if (isObject$8(Constructor)) {
          Constructor = Constructor[SPECIES$2];
          if (Constructor === null) Constructor = undefined;
        }
        if (Constructor === $Array$1 || Constructor === undefined) {
          return un$Slice(O, k, fin);
        }
      }
      result = new (Constructor === undefined ? $Array$1 : Constructor)(max$2(fin - k, 0));
      for (n = 0; k < fin; k++, n++) if (k in O) createProperty$3(result, n, O[k]);
      result.length = n;
      return result;
    }
  });

  var _ref3, _ref4;

  /*
   Copyright (c) 2022 Gildas Lormeau. All rights reserved.

   Redistribution and use in source and binary forms, with or without
   modification, are permitted provided that the following conditions are met:

   1. Redistributions of source code must retain the above copyright notice,
   this list of conditions and the following disclaimer.

   2. Redistributions in binary form must reproduce the above copyright 
   notice, this list of conditions and the following disclaimer in 
   the documentation and/or other materials provided with the distribution.

   3. The names of the authors may not be used to endorse or promote products
   derived from this software without specific prior written permission.

   THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
   INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
   FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
   INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
   INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
   LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
   OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
   EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   */

  /*
   * This program is based on JZlib 1.0.2 ymnk, JCraft,Inc.
   * JZlib is based on zlib-1.1.3, so all credit should go authors
   * Jean-loup Gailly(jloup@gzip.org) and Mark Adler(madler@alumni.caltech.edu)
   * and contributors of zlib.
   */
  // Global
  var MAX_BITS$1 = 15;
  var D_CODES = 30;
  var BL_CODES = 19;
  var LENGTH_CODES = 29;
  var LITERALS = 256;
  var L_CODES = LITERALS + 1 + LENGTH_CODES;
  var HEAP_SIZE = 2 * L_CODES + 1;
  var END_BLOCK = 256; // Bit length codes must not exceed MAX_BL_BITS bits

  var MAX_BL_BITS = 7; // repeat previous bit length 3-6 times (2 bits of repeat count)

  var REP_3_6 = 16; // repeat a zero length 3-10 times (3 bits of repeat count)

  var REPZ_3_10 = 17; // repeat a zero length 11-138 times (7 bits of repeat count)

  var REPZ_11_138 = 18; // The lengths of the bit length codes are sent in order of decreasing
  // probability, to avoid transmitting the lengths for unused bit
  // length codes.

  var Buf_size = 8 * 2; // JZlib version : "1.0.2"

  var Z_DEFAULT_COMPRESSION = -1; // compression strategy

  var Z_FILTERED = 1;
  var Z_HUFFMAN_ONLY = 2;
  var Z_DEFAULT_STRATEGY = 0;
  var Z_NO_FLUSH$1 = 0;
  var Z_PARTIAL_FLUSH = 1;
  var Z_FULL_FLUSH = 3;
  var Z_FINISH$1 = 4;
  var Z_OK$1 = 0;
  var Z_STREAM_END$1 = 1;
  var Z_NEED_DICT$1 = 2;
  var Z_STREAM_ERROR$1 = -2;
  var Z_DATA_ERROR$1 = -3;
  var Z_BUF_ERROR$1 = -5; // Tree

  function extractArray(array) {
    return flatArray(array.map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          length = _ref2[0],
          value = _ref2[1];

      return new Array(length).fill(value, 0, length);
    }));
  }

  function flatArray(array) {
    return array.reduce(function (a, b) {
      return a.concat(Array.isArray(b) ? flatArray(b) : b);
    }, []);
  } // see definition of array dist_code below


  var _dist_code = (_ref3 = [0, 1, 2, 3]).concat.apply(_ref3, _toConsumableArray(extractArray([[2, 4], [2, 5], [4, 6], [4, 7], [8, 8], [8, 9], [16, 10], [16, 11], [32, 12], [32, 13], [64, 14], [64, 15], [2, 0], [1, 16], [1, 17], [2, 18], [2, 19], [4, 20], [4, 21], [8, 22], [8, 23], [16, 24], [16, 25], [32, 26], [32, 27], [64, 28], [64, 29]])));

  function Tree() {
    var that = this; // dyn_tree; // the dynamic tree
    // max_code; // largest code with non zero frequency
    // stat_desc; // the corresponding static tree
    // Compute the optimal bit lengths for a tree and update the total bit
    // length
    // for the current block.
    // IN assertion: the fields freq and dad are set, heap[heap_max] and
    // above are the tree nodes sorted by increasing frequency.
    // OUT assertions: the field len is set to the optimal bit length, the
    // array bl_count contains the frequencies for each bit length.
    // The length opt_len is updated; static_len is also updated if stree is
    // not null.

    function gen_bitlen(s) {
      var tree = that.dyn_tree;
      var stree = that.stat_desc.static_tree;
      var extra = that.stat_desc.extra_bits;
      var base = that.stat_desc.extra_base;
      var max_length = that.stat_desc.max_length;
      var h; // heap index

      var n, m; // iterate over the tree elements

      var bits; // bit length

      var xbits; // extra bits

      var f; // frequency

      var overflow = 0; // number of elements with bit length too large

      for (bits = 0; bits <= MAX_BITS$1; bits++) {
        s.bl_count[bits] = 0;
      } // In a first pass, compute the optimal bit lengths (which may
      // overflow in the case of the bit length tree).


      tree[s.heap[s.heap_max] * 2 + 1] = 0; // root of the heap

      for (h = s.heap_max + 1; h < HEAP_SIZE; h++) {
        n = s.heap[h];
        bits = tree[tree[n * 2 + 1] * 2 + 1] + 1;

        if (bits > max_length) {
          bits = max_length;
          overflow++;
        }

        tree[n * 2 + 1] = bits; // We overwrite tree[n*2+1] which is no longer needed

        if (n > that.max_code) continue; // not a leaf node

        s.bl_count[bits]++;
        xbits = 0;
        if (n >= base) xbits = extra[n - base];
        f = tree[n * 2];
        s.opt_len += f * (bits + xbits);
        if (stree) s.static_len += f * (stree[n * 2 + 1] + xbits);
      }

      if (overflow === 0) return; // This happens for example on obj2 and pic of the Calgary corpus
      // Find the first bit length which could increase:

      do {
        bits = max_length - 1;

        while (s.bl_count[bits] === 0) {
          bits--;
        }

        s.bl_count[bits]--; // move one leaf down the tree

        s.bl_count[bits + 1] += 2; // move one overflow item as its brother

        s.bl_count[max_length]--; // The brother of the overflow item also moves one step up,
        // but this does not affect bl_count[max_length]

        overflow -= 2;
      } while (overflow > 0);

      for (bits = max_length; bits !== 0; bits--) {
        n = s.bl_count[bits];

        while (n !== 0) {
          m = s.heap[--h];
          if (m > that.max_code) continue;

          if (tree[m * 2 + 1] != bits) {
            s.opt_len += (bits - tree[m * 2 + 1]) * tree[m * 2];
            tree[m * 2 + 1] = bits;
          }

          n--;
        }
      }
    } // Reverse the first len bits of a code, using straightforward code (a
    // faster
    // method would use a table)
    // IN assertion: 1 <= len <= 15


    function bi_reverse(code, // the value to invert
    len // its bit length
    ) {
      var res = 0;

      do {
        res |= code & 1;
        code >>>= 1;
        res <<= 1;
      } while (--len > 0);

      return res >>> 1;
    } // Generate the codes for a given tree and bit counts (which need not be
    // optimal).
    // IN assertion: the array bl_count contains the bit length statistics for
    // the given tree and the field len is set for all tree elements.
    // OUT assertion: the field code is set for all tree elements of non
    // zero code length.


    function gen_codes(tree, // the tree to decorate
    max_code, // largest code with non zero frequency
    bl_count // number of codes at each bit length
    ) {
      var next_code = []; // next code value for each
      // bit length

      var code = 0; // running code value

      var bits; // bit index

      var n; // code index

      var len; // The distribution counts are first used to generate the code values
      // without bit reversal.

      for (bits = 1; bits <= MAX_BITS$1; bits++) {
        next_code[bits] = code = code + bl_count[bits - 1] << 1;
      } // Check that the bit counts in bl_count are consistent. The last code
      // must be all ones.
      // Assert (code + bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,
      // "inconsistent bit counts");
      // Tracev((stderr,"gen_codes: max_code %d ", max_code));


      for (n = 0; n <= max_code; n++) {
        len = tree[n * 2 + 1];
        if (len === 0) continue; // Now reverse the bits

        tree[n * 2] = bi_reverse(next_code[len]++, len);
      }
    } // Construct one Huffman tree and assigns the code bit strings and lengths.
    // Update the total bit length for the current block.
    // IN assertion: the field freq is set for all tree elements.
    // OUT assertions: the fields len and code are set to the optimal bit length
    // and corresponding code. The length opt_len is updated; static_len is
    // also updated if stree is not null. The field max_code is set.


    that.build_tree = function (s) {
      var tree = that.dyn_tree;
      var stree = that.stat_desc.static_tree;
      var elems = that.stat_desc.elems;
      var n, m; // iterate over heap elements

      var max_code = -1; // largest code with non zero frequency

      var node; // new node being created
      // Construct the initial heap, with least frequent element in
      // heap[1]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
      // heap[0] is not used.

      s.heap_len = 0;
      s.heap_max = HEAP_SIZE;

      for (n = 0; n < elems; n++) {
        if (tree[n * 2] !== 0) {
          s.heap[++s.heap_len] = max_code = n;
          s.depth[n] = 0;
        } else {
          tree[n * 2 + 1] = 0;
        }
      } // The pkzip format requires that at least one distance code exists,
      // and that at least one bit should be sent even if there is only one
      // possible code. So to avoid special checks later on we force at least
      // two codes of non zero frequency.


      while (s.heap_len < 2) {
        node = s.heap[++s.heap_len] = max_code < 2 ? ++max_code : 0;
        tree[node * 2] = 1;
        s.depth[node] = 0;
        s.opt_len--;
        if (stree) s.static_len -= stree[node * 2 + 1]; // node is 0 or 1 so it does not have extra bits
      }

      that.max_code = max_code; // The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
      // establish sub-heaps of increasing lengths:

      for (n = Math.floor(s.heap_len / 2); n >= 1; n--) {
        s.pqdownheap(tree, n);
      } // Construct the Huffman tree by repeatedly combining the least two
      // frequent nodes.


      node = elems; // next internal node of the tree

      do {
        // n = node of least frequency
        n = s.heap[1];
        s.heap[1] = s.heap[s.heap_len--];
        s.pqdownheap(tree, 1);
        m = s.heap[1]; // m = node of next least frequency

        s.heap[--s.heap_max] = n; // keep the nodes sorted by frequency

        s.heap[--s.heap_max] = m; // Create a new node father of n and m

        tree[node * 2] = tree[n * 2] + tree[m * 2];
        s.depth[node] = Math.max(s.depth[n], s.depth[m]) + 1;
        tree[n * 2 + 1] = tree[m * 2 + 1] = node; // and insert the new node in the heap

        s.heap[1] = node++;
        s.pqdownheap(tree, 1);
      } while (s.heap_len >= 2);

      s.heap[--s.heap_max] = s.heap[1]; // At this point, the fields freq and dad are set. We can now
      // generate the bit lengths.

      gen_bitlen(s); // The field len is now set, we can generate the bit codes

      gen_codes(tree, that.max_code, s.bl_count);
    };
  }

  Tree._length_code = (_ref4 = [0, 1, 2, 3, 4, 5, 6, 7]).concat.apply(_ref4, _toConsumableArray(extractArray([[2, 8], [2, 9], [2, 10], [2, 11], [4, 12], [4, 13], [4, 14], [4, 15], [8, 16], [8, 17], [8, 18], [8, 19], [16, 20], [16, 21], [16, 22], [16, 23], [32, 24], [32, 25], [32, 26], [31, 27], [1, 28]])));
  Tree.base_length = [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 20, 24, 28, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 0];
  Tree.base_dist = [0, 1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192, 256, 384, 512, 768, 1024, 1536, 2048, 3072, 4096, 6144, 8192, 12288, 16384, 24576]; // Mapping from a distance to a distance code. dist is the distance - 1 and
  // must not have side effects. _dist_code[256] and _dist_code[257] are never
  // used.

  Tree.d_code = function (dist) {
    return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
  }; // extra bits for each length code


  Tree.extra_lbits = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]; // extra bits for each distance code

  Tree.extra_dbits = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]; // extra bits for each bit length code

  Tree.extra_blbits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7];
  Tree.bl_order = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]; // StaticTree

  function StaticTree(static_tree, extra_bits, extra_base, elems, max_length) {
    var that = this;
    that.static_tree = static_tree;
    that.extra_bits = extra_bits;
    that.extra_base = extra_base;
    that.elems = elems;
    that.max_length = max_length;
  }

  var static_ltree2_first_part = [12, 140, 76, 204, 44, 172, 108, 236, 28, 156, 92, 220, 60, 188, 124, 252, 2, 130, 66, 194, 34, 162, 98, 226, 18, 146, 82, 210, 50, 178, 114, 242, 10, 138, 74, 202, 42, 170, 106, 234, 26, 154, 90, 218, 58, 186, 122, 250, 6, 134, 70, 198, 38, 166, 102, 230, 22, 150, 86, 214, 54, 182, 118, 246, 14, 142, 78, 206, 46, 174, 110, 238, 30, 158, 94, 222, 62, 190, 126, 254, 1, 129, 65, 193, 33, 161, 97, 225, 17, 145, 81, 209, 49, 177, 113, 241, 9, 137, 73, 201, 41, 169, 105, 233, 25, 153, 89, 217, 57, 185, 121, 249, 5, 133, 69, 197, 37, 165, 101, 229, 21, 149, 85, 213, 53, 181, 117, 245, 13, 141, 77, 205, 45, 173, 109, 237, 29, 157, 93, 221, 61, 189, 125, 253, 19, 275, 147, 403, 83, 339, 211, 467, 51, 307, 179, 435, 115, 371, 243, 499, 11, 267, 139, 395, 75, 331, 203, 459, 43, 299, 171, 427, 107, 363, 235, 491, 27, 283, 155, 411, 91, 347, 219, 475, 59, 315, 187, 443, 123, 379, 251, 507, 7, 263, 135, 391, 71, 327, 199, 455, 39, 295, 167, 423, 103, 359, 231, 487, 23, 279, 151, 407, 87, 343, 215, 471, 55, 311, 183, 439, 119, 375, 247, 503, 15, 271, 143, 399, 79, 335, 207, 463, 47, 303, 175, 431, 111, 367, 239, 495, 31, 287, 159, 415, 95, 351, 223, 479, 63, 319, 191, 447, 127, 383, 255, 511, 0, 64, 32, 96, 16, 80, 48, 112, 8, 72, 40, 104, 24, 88, 56, 120, 4, 68, 36, 100, 20, 84, 52, 116, 3, 131, 67, 195, 35, 163, 99, 227];
  var static_ltree2_second_part = extractArray([[144, 8], [112, 9], [24, 7], [8, 8]]);
  StaticTree.static_ltree = flatArray(static_ltree2_first_part.map(function (value, index) {
    return [value, static_ltree2_second_part[index]];
  }));
  var static_dtree_first_part = [0, 16, 8, 24, 4, 20, 12, 28, 2, 18, 10, 26, 6, 22, 14, 30, 1, 17, 9, 25, 5, 21, 13, 29, 3, 19, 11, 27, 7, 23];
  var static_dtree_second_part = extractArray([[30, 5]]);
  StaticTree.static_dtree = flatArray(static_dtree_first_part.map(function (value, index) {
    return [value, static_dtree_second_part[index]];
  }));
  StaticTree.static_l_desc = new StaticTree(StaticTree.static_ltree, Tree.extra_lbits, LITERALS + 1, L_CODES, MAX_BITS$1);
  StaticTree.static_d_desc = new StaticTree(StaticTree.static_dtree, Tree.extra_dbits, 0, D_CODES, MAX_BITS$1);
  StaticTree.static_bl_desc = new StaticTree(null, Tree.extra_blbits, 0, BL_CODES, MAX_BL_BITS); // Deflate

  var MAX_MEM_LEVEL = 9;
  var DEF_MEM_LEVEL = 8;

  function Config(good_length, max_lazy, nice_length, max_chain, func) {
    var that = this;
    that.good_length = good_length;
    that.max_lazy = max_lazy;
    that.nice_length = nice_length;
    that.max_chain = max_chain;
    that.func = func;
  }

  var STORED$1 = 0;
  var FAST = 1;
  var SLOW = 2;
  var config_table = [new Config(0, 0, 0, 0, STORED$1), new Config(4, 4, 8, 4, FAST), new Config(4, 5, 16, 8, FAST), new Config(4, 6, 32, 32, FAST), new Config(4, 4, 16, 16, SLOW), new Config(8, 16, 32, 32, SLOW), new Config(8, 16, 128, 128, SLOW), new Config(8, 32, 128, 256, SLOW), new Config(32, 128, 258, 1024, SLOW), new Config(32, 258, 258, 4096, SLOW)];
  var z_errmsg = ["need dictionary", // Z_NEED_DICT
  // 2
  "stream end", // Z_STREAM_END 1
  "", // Z_OK 0
  "", // Z_ERRNO (-1)
  "stream error", // Z_STREAM_ERROR (-2)
  "data error", // Z_DATA_ERROR (-3)
  "", // Z_MEM_ERROR (-4)
  "buffer error", // Z_BUF_ERROR (-5)
  "", // Z_VERSION_ERROR (-6)
  ""]; // block not completed, need more input or more output

  var NeedMore = 0; // block flush performed

  var BlockDone = 1; // finish started, need only more output at next deflate

  var FinishStarted = 2; // finish done, accept no more input or output

  var FinishDone = 3; // preset dictionary flag in zlib header

  var PRESET_DICT$1 = 0x20;
  var INIT_STATE = 42;
  var BUSY_STATE = 113;
  var FINISH_STATE = 666; // The deflate compression method

  var Z_DEFLATED$1 = 8;
  var STORED_BLOCK = 0;
  var STATIC_TREES = 1;
  var DYN_TREES = 2;
  var MIN_MATCH = 3;
  var MAX_MATCH = 258;
  var MIN_LOOKAHEAD = MAX_MATCH + MIN_MATCH + 1;

  function smaller(tree, n, m, depth) {
    var tn2 = tree[n * 2];
    var tm2 = tree[m * 2];
    return tn2 < tm2 || tn2 == tm2 && depth[n] <= depth[m];
  }

  function Deflate$1() {
    var that = this;
    var strm; // pointer back to this zlib stream

    var status; // as the name implies
    // pending_buf; // output still pending

    var pending_buf_size; // size of pending_buf
    // pending_out; // next pending byte to output to the stream
    // pending; // nb of bytes in the pending buffer
    // dist_buf; // buffer for distances
    // lc_buf; // buffer for literals or lengths
    // To simplify the code, dist_buf and lc_buf have the same number of elements.
    // To use different lengths, an extra flag array would be necessary.

    var last_flush; // value of flush param for previous deflate call

    var w_size; // LZ77 win size (32K by default)

    var w_bits; // log2(w_size) (8..16)

    var w_mask; // w_size - 1

    var win; // Sliding win. Input bytes are read into the second half of the win,
    // and move to the first half later to keep a dictionary of at least wSize
    // bytes. With this organization, matches are limited to a distance of
    // wSize-MAX_MATCH bytes, but this ensures that IO is always
    // performed with a length multiple of the block size. Also, it limits
    // the win size to 64K, which is quite useful on MSDOS.
    // To do: use the user input buffer as sliding win.

    var window_size; // Actual size of win: 2*wSize, except when the user input buffer
    // is directly used as sliding win.

    var prev; // Link to older string with same hash index. To limit the size of this
    // array to 64K, this link is maintained only for the last 32K strings.
    // An index in this array is thus a win index modulo 32K.

    var head; // Heads of the hash chains or NIL.

    var ins_h; // hash index of string to be inserted

    var hash_size; // number of elements in hash table

    var hash_bits; // log2(hash_size)

    var hash_mask; // hash_size-1
    // Number of bits by which ins_h must be shifted at each input
    // step. It must be such that after MIN_MATCH steps, the oldest
    // byte no longer takes part in the hash key, that is:
    // hash_shift * MIN_MATCH >= hash_bits

    var hash_shift; // Window position at the beginning of the current output block. Gets
    // negative when the win is moved backwards.

    var block_start;
    var match_length; // length of best match

    var prev_match; // previous match

    var match_available; // set if previous match exists

    var strstart; // start of string to insert

    var match_start; // start of matching string

    var lookahead; // number of valid bytes ahead in win
    // Length of the best match at previous step. Matches not greater than this
    // are discarded. This is used in the lazy match evaluation.

    var prev_length; // To speed up deflation, hash chains are never searched beyond this
    // length. A higher limit improves compression ratio but degrades the speed.

    var max_chain_length; // Attempt to find a better match only when the current match is strictly
    // smaller than this value. This mechanism is used only for compression
    // levels >= 4.

    var max_lazy_match; // Insert new strings in the hash table only if the match length is not
    // greater than this length. This saves time but degrades compression.
    // max_insert_length is used only for compression levels <= 3.

    var level; // compression level (1..9)

    var strategy; // favor or force Huffman coding
    // Use a faster search when the previous match is longer than this

    var good_match; // Stop searching when current match exceeds this

    var nice_match;
    var dyn_ltree; // literal and length tree

    var dyn_dtree; // distance tree

    var bl_tree; // Huffman tree for bit lengths

    var l_desc = new Tree(); // desc for literal tree

    var d_desc = new Tree(); // desc for distance tree

    var bl_desc = new Tree(); // desc for bit length tree
    // that.heap_len; // number of elements in the heap
    // that.heap_max; // element of largest frequency
    // The sons of heap[n] are heap[2*n] and heap[2*n+1]. heap[0] is not used.
    // The same heap array is used to build all trees.
    // Depth of each subtree used as tie breaker for trees of equal frequency

    that.depth = []; // Size of match buffer for literals/lengths. There are 4 reasons for
    // limiting lit_bufsize to 64K:
    // - frequencies can be kept in 16 bit counters
    // - if compression is not successful for the first block, all input
    // data is still in the win so we can still emit a stored block even
    // when input comes from standard input. (This can also be done for
    // all blocks if lit_bufsize is not greater than 32K.)
    // - if compression is not successful for a file smaller than 64K, we can
    // even emit a stored file instead of a stored block (saving 5 bytes).
    // This is applicable only for zip (not gzip or zlib).
    // - creating new Huffman trees less frequently may not provide fast
    // adaptation to changes in the input data statistics. (Take for
    // example a binary file with poorly compressible code followed by
    // a highly compressible string table.) Smaller buffer sizes give
    // fast adaptation but have of course the overhead of transmitting
    // trees more frequently.
    // - I can't count above 4

    var lit_bufsize;
    var last_lit; // running index in dist_buf and lc_buf
    // that.opt_len; // bit length of current block with optimal trees
    // that.static_len; // bit length of current block with static trees

    var matches; // number of string matches in current block

    var last_eob_len; // bit length of EOB code for last block
    // Output buffer. bits are inserted starting at the bottom (least
    // significant bits).

    var bi_buf; // Number of valid bits in bi_buf. All bits above the last valid bit
    // are always zero.

    var bi_valid; // number of codes at each bit length for an optimal tree

    that.bl_count = []; // heap used to build the Huffman trees

    that.heap = [];
    dyn_ltree = [];
    dyn_dtree = [];
    bl_tree = [];

    function lm_init() {
      window_size = 2 * w_size;
      head[hash_size - 1] = 0;

      for (var i = 0; i < hash_size - 1; i++) {
        head[i] = 0;
      } // Set the default configuration parameters:


      max_lazy_match = config_table[level].max_lazy;
      good_match = config_table[level].good_length;
      nice_match = config_table[level].nice_length;
      max_chain_length = config_table[level].max_chain;
      strstart = 0;
      block_start = 0;
      lookahead = 0;
      match_length = prev_length = MIN_MATCH - 1;
      match_available = 0;
      ins_h = 0;
    }

    function init_block() {
      var i; // Initialize the trees.

      for (i = 0; i < L_CODES; i++) {
        dyn_ltree[i * 2] = 0;
      }

      for (i = 0; i < D_CODES; i++) {
        dyn_dtree[i * 2] = 0;
      }

      for (i = 0; i < BL_CODES; i++) {
        bl_tree[i * 2] = 0;
      }

      dyn_ltree[END_BLOCK * 2] = 1;
      that.opt_len = that.static_len = 0;
      last_lit = matches = 0;
    } // Initialize the tree data structures for a new zlib stream.


    function tr_init() {
      l_desc.dyn_tree = dyn_ltree;
      l_desc.stat_desc = StaticTree.static_l_desc;
      d_desc.dyn_tree = dyn_dtree;
      d_desc.stat_desc = StaticTree.static_d_desc;
      bl_desc.dyn_tree = bl_tree;
      bl_desc.stat_desc = StaticTree.static_bl_desc;
      bi_buf = 0;
      bi_valid = 0;
      last_eob_len = 8; // enough lookahead for inflate
      // Initialize the first block of the first file:

      init_block();
    } // Restore the heap property by moving down the tree starting at node k,
    // exchanging a node with the smallest of its two sons if necessary,
    // stopping
    // when the heap property is re-established (each father smaller than its
    // two sons).


    that.pqdownheap = function (tree, // the tree to restore
    k // node to move down
    ) {
      var heap = that.heap;
      var v = heap[k];
      var j = k << 1; // left son of k

      while (j <= that.heap_len) {
        // Set j to the smallest of the two sons:
        if (j < that.heap_len && smaller(tree, heap[j + 1], heap[j], that.depth)) {
          j++;
        } // Exit if v is smaller than both sons


        if (smaller(tree, v, heap[j], that.depth)) break; // Exchange v with the smallest son

        heap[k] = heap[j];
        k = j; // And continue down the tree, setting j to the left son of k

        j <<= 1;
      }

      heap[k] = v;
    }; // Scan a literal or distance tree to determine the frequencies of the codes
    // in the bit length tree.


    function scan_tree(tree, // the tree to be scanned
    max_code // and its largest code of non zero frequency
    ) {
      var prevlen = -1; // last emitted length

      var curlen; // length of current code

      var nextlen = tree[0 * 2 + 1]; // length of next code

      var count = 0; // repeat count of the current code

      var max_count = 7; // max repeat count

      var min_count = 4; // min repeat count

      if (nextlen === 0) {
        max_count = 138;
        min_count = 3;
      }

      tree[(max_code + 1) * 2 + 1] = 0xffff; // guard

      for (var n = 0; n <= max_code; n++) {
        curlen = nextlen;
        nextlen = tree[(n + 1) * 2 + 1];

        if (++count < max_count && curlen == nextlen) {
          continue;
        } else if (count < min_count) {
          bl_tree[curlen * 2] += count;
        } else if (curlen !== 0) {
          if (curlen != prevlen) bl_tree[curlen * 2]++;
          bl_tree[REP_3_6 * 2]++;
        } else if (count <= 10) {
          bl_tree[REPZ_3_10 * 2]++;
        } else {
          bl_tree[REPZ_11_138 * 2]++;
        }

        count = 0;
        prevlen = curlen;

        if (nextlen === 0) {
          max_count = 138;
          min_count = 3;
        } else if (curlen == nextlen) {
          max_count = 6;
          min_count = 3;
        } else {
          max_count = 7;
          min_count = 4;
        }
      }
    } // Construct the Huffman tree for the bit lengths and return the index in
    // bl_order of the last bit length code to send.


    function build_bl_tree() {
      var max_blindex; // index of last bit length code of non zero freq
      // Determine the bit length frequencies for literal and distance trees

      scan_tree(dyn_ltree, l_desc.max_code);
      scan_tree(dyn_dtree, d_desc.max_code); // Build the bit length tree:

      bl_desc.build_tree(that); // opt_len now includes the length of the tree representations, except
      // the lengths of the bit lengths codes and the 5+5+4 bits for the
      // counts.
      // Determine the number of bit length codes to send. The pkzip format
      // requires that at least 4 bit length codes be sent. (appnote.txt says
      // 3 but the actual value used is 4.)

      for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) {
        if (bl_tree[Tree.bl_order[max_blindex] * 2 + 1] !== 0) break;
      } // Update opt_len to include the bit length tree and counts


      that.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
      return max_blindex;
    } // Output a byte on the stream.
    // IN assertion: there is enough room in pending_buf.


    function put_byte(p) {
      that.pending_buf[that.pending++] = p;
    }

    function put_short(w) {
      put_byte(w & 0xff);
      put_byte(w >>> 8 & 0xff);
    }

    function putShortMSB(b) {
      put_byte(b >> 8 & 0xff);
      put_byte(b & 0xff & 0xff);
    }

    function send_bits(value, length) {
      var val;
      var len = length;

      if (bi_valid > Buf_size - len) {
        val = value; // bi_buf |= (val << bi_valid);

        bi_buf |= val << bi_valid & 0xffff;
        put_short(bi_buf);
        bi_buf = val >>> Buf_size - bi_valid;
        bi_valid += len - Buf_size;
      } else {
        // bi_buf |= (value) << bi_valid;
        bi_buf |= value << bi_valid & 0xffff;
        bi_valid += len;
      }
    }

    function send_code(c, tree) {
      var c2 = c * 2;
      send_bits(tree[c2] & 0xffff, tree[c2 + 1] & 0xffff);
    } // Send a literal or distance tree in compressed form, using the codes in
    // bl_tree.


    function send_tree(tree, // the tree to be sent
    max_code // and its largest code of non zero frequency
    ) {
      var n; // iterates over all tree elements

      var prevlen = -1; // last emitted length

      var curlen; // length of current code

      var nextlen = tree[0 * 2 + 1]; // length of next code

      var count = 0; // repeat count of the current code

      var max_count = 7; // max repeat count

      var min_count = 4; // min repeat count

      if (nextlen === 0) {
        max_count = 138;
        min_count = 3;
      }

      for (n = 0; n <= max_code; n++) {
        curlen = nextlen;
        nextlen = tree[(n + 1) * 2 + 1];

        if (++count < max_count && curlen == nextlen) {
          continue;
        } else if (count < min_count) {
          do {
            send_code(curlen, bl_tree);
          } while (--count !== 0);
        } else if (curlen !== 0) {
          if (curlen != prevlen) {
            send_code(curlen, bl_tree);
            count--;
          }

          send_code(REP_3_6, bl_tree);
          send_bits(count - 3, 2);
        } else if (count <= 10) {
          send_code(REPZ_3_10, bl_tree);
          send_bits(count - 3, 3);
        } else {
          send_code(REPZ_11_138, bl_tree);
          send_bits(count - 11, 7);
        }

        count = 0;
        prevlen = curlen;

        if (nextlen === 0) {
          max_count = 138;
          min_count = 3;
        } else if (curlen == nextlen) {
          max_count = 6;
          min_count = 3;
        } else {
          max_count = 7;
          min_count = 4;
        }
      }
    } // Send the header for a block using dynamic Huffman trees: the counts, the
    // lengths of the bit length codes, the literal tree and the distance tree.
    // IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.


    function send_all_trees(lcodes, dcodes, blcodes) {
      var rank; // index in bl_order

      send_bits(lcodes - 257, 5); // not +255 as stated in appnote.txt

      send_bits(dcodes - 1, 5);
      send_bits(blcodes - 4, 4); // not -3 as stated in appnote.txt

      for (rank = 0; rank < blcodes; rank++) {
        send_bits(bl_tree[Tree.bl_order[rank] * 2 + 1], 3);
      }

      send_tree(dyn_ltree, lcodes - 1); // literal tree

      send_tree(dyn_dtree, dcodes - 1); // distance tree
    } // Flush the bit buffer, keeping at most 7 bits in it.


    function bi_flush() {
      if (bi_valid == 16) {
        put_short(bi_buf);
        bi_buf = 0;
        bi_valid = 0;
      } else if (bi_valid >= 8) {
        put_byte(bi_buf & 0xff);
        bi_buf >>>= 8;
        bi_valid -= 8;
      }
    } // Send one empty static block to give enough lookahead for inflate.
    // This takes 10 bits, of which 7 may remain in the bit buffer.
    // The current inflate code requires 9 bits of lookahead. If the
    // last two codes for the previous block (real code plus EOB) were coded
    // on 5 bits or less, inflate may have only 5+3 bits of lookahead to decode
    // the last real code. In this case we send two empty static blocks instead
    // of one. (There are no problems if the previous block is stored or fixed.)
    // To simplify the code, we assume the worst case of last real code encoded
    // on one bit only.


    function _tr_align() {
      send_bits(STATIC_TREES << 1, 3);
      send_code(END_BLOCK, StaticTree.static_ltree);
      bi_flush(); // Of the 10 bits for the empty block, we have already sent
      // (10 - bi_valid) bits. The lookahead for the last real code (before
      // the EOB of the previous block) was thus at least one plus the length
      // of the EOB plus what we have just sent of the empty static block.

      if (1 + last_eob_len + 10 - bi_valid < 9) {
        send_bits(STATIC_TREES << 1, 3);
        send_code(END_BLOCK, StaticTree.static_ltree);
        bi_flush();
      }

      last_eob_len = 7;
    } // Save the match info and tally the frequency counts. Return true if
    // the current block must be flushed.


    function _tr_tally(dist, // distance of matched string
    lc // match length-MIN_MATCH or unmatched char (if dist==0)
    ) {
      var out_length, in_length, dcode;
      that.dist_buf[last_lit] = dist;
      that.lc_buf[last_lit] = lc & 0xff;
      last_lit++;

      if (dist === 0) {
        // lc is the unmatched char
        dyn_ltree[lc * 2]++;
      } else {
        matches++; // Here, lc is the match length - MIN_MATCH

        dist--; // dist = match distance - 1

        dyn_ltree[(Tree._length_code[lc] + LITERALS + 1) * 2]++;
        dyn_dtree[Tree.d_code(dist) * 2]++;
      }

      if ((last_lit & 0x1fff) === 0 && level > 2) {
        // Compute an upper bound for the compressed length
        out_length = last_lit * 8;
        in_length = strstart - block_start;

        for (dcode = 0; dcode < D_CODES; dcode++) {
          out_length += dyn_dtree[dcode * 2] * (5 + Tree.extra_dbits[dcode]);
        }

        out_length >>>= 3;
        if (matches < Math.floor(last_lit / 2) && out_length < Math.floor(in_length / 2)) return true;
      }

      return last_lit == lit_bufsize - 1; // We avoid equality with lit_bufsize because of wraparound at 64K
      // on 16 bit machines and because stored blocks are restricted to
      // 64K-1 bytes.
    } // Send the block data compressed using the given Huffman trees


    function compress_block(ltree, dtree) {
      var dist; // distance of matched string

      var lc; // match length or unmatched char (if dist === 0)

      var lx = 0; // running index in dist_buf and lc_buf

      var code; // the code to send

      var extra; // number of extra bits to send

      if (last_lit !== 0) {
        do {
          dist = that.dist_buf[lx];
          lc = that.lc_buf[lx];
          lx++;

          if (dist === 0) {
            send_code(lc, ltree); // send a literal byte
          } else {
            // Here, lc is the match length - MIN_MATCH
            code = Tree._length_code[lc];
            send_code(code + LITERALS + 1, ltree); // send the length
            // code

            extra = Tree.extra_lbits[code];

            if (extra !== 0) {
              lc -= Tree.base_length[code];
              send_bits(lc, extra); // send the extra length bits
            }

            dist--; // dist is now the match distance - 1

            code = Tree.d_code(dist);
            send_code(code, dtree); // send the distance code

            extra = Tree.extra_dbits[code];

            if (extra !== 0) {
              dist -= Tree.base_dist[code];
              send_bits(dist, extra); // send the extra distance bits
            }
          } // literal or match pair ?

        } while (lx < last_lit);
      }

      send_code(END_BLOCK, ltree);
      last_eob_len = ltree[END_BLOCK * 2 + 1];
    } // Flush the bit buffer and align the output on a byte boundary


    function bi_windup() {
      if (bi_valid > 8) {
        put_short(bi_buf);
      } else if (bi_valid > 0) {
        put_byte(bi_buf & 0xff);
      }

      bi_buf = 0;
      bi_valid = 0;
    } // Copy a stored block, storing first the length and its
    // one's complement if requested.


    function copy_block(buf, // the input data
    len, // its length
    header // true if block header must be written
    ) {
      bi_windup(); // align on byte boundary

      last_eob_len = 8; // enough lookahead for inflate

      if (header) {
        put_short(len);
        put_short(~len);
      }

      that.pending_buf.set(win.subarray(buf, buf + len), that.pending);
      that.pending += len;
    } // Send a stored block


    function _tr_stored_block(buf, // input block
    stored_len, // length of input block
    eof // true if this is the last block for a file
    ) {
      send_bits((STORED_BLOCK << 1) + (eof ? 1 : 0), 3); // send block type

      copy_block(buf, stored_len, true); // with header
    } // Determine the best encoding for the current block: dynamic trees, static
    // trees or store, and output the encoded block to the zip file.


    function _tr_flush_block(buf, // input block, or NULL if too old
    stored_len, // length of input block
    eof // true if this is the last block for a file
    ) {
      var opt_lenb, static_lenb; // opt_len and static_len in bytes

      var max_blindex = 0; // index of last bit length code of non zero freq
      // Build the Huffman trees unless a stored block is forced

      if (level > 0) {
        // Construct the literal and distance trees
        l_desc.build_tree(that);
        d_desc.build_tree(that); // At this point, opt_len and static_len are the total bit lengths
        // of
        // the compressed block data, excluding the tree representations.
        // Build the bit length tree for the above two trees, and get the
        // index
        // in bl_order of the last bit length code to send.

        max_blindex = build_bl_tree(); // Determine the best encoding. Compute first the block length in
        // bytes

        opt_lenb = that.opt_len + 3 + 7 >>> 3;
        static_lenb = that.static_len + 3 + 7 >>> 3;
        if (static_lenb <= opt_lenb) opt_lenb = static_lenb;
      } else {
        opt_lenb = static_lenb = stored_len + 5; // force a stored block
      }

      if (stored_len + 4 <= opt_lenb && buf != -1) {
        // 4: two words for the lengths
        // The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.
        // Otherwise we can't have processed more than WSIZE input bytes
        // since
        // the last block flush, because compression would have been
        // successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
        // transform a block into a stored block.
        _tr_stored_block(buf, stored_len, eof);
      } else if (static_lenb == opt_lenb) {
        send_bits((STATIC_TREES << 1) + (eof ? 1 : 0), 3);
        compress_block(StaticTree.static_ltree, StaticTree.static_dtree);
      } else {
        send_bits((DYN_TREES << 1) + (eof ? 1 : 0), 3);
        send_all_trees(l_desc.max_code + 1, d_desc.max_code + 1, max_blindex + 1);
        compress_block(dyn_ltree, dyn_dtree);
      } // The above check is made mod 2^32, for files larger than 512 MB
      // and uLong implemented on 32 bits.


      init_block();

      if (eof) {
        bi_windup();
      }
    }

    function flush_block_only(eof) {
      _tr_flush_block(block_start >= 0 ? block_start : -1, strstart - block_start, eof);

      block_start = strstart;
      strm.flush_pending();
    } // Fill the win when the lookahead becomes insufficient.
    // Updates strstart and lookahead.
    //
    // IN assertion: lookahead < MIN_LOOKAHEAD
    // OUT assertions: strstart <= window_size-MIN_LOOKAHEAD
    // At least one byte has been read, or avail_in === 0; reads are
    // performed for at least two bytes (required for the zip translate_eol
    // option -- not supported here).


    function fill_window() {
      var n, m;
      var p;
      var more; // Amount of free space at the end of the win.

      do {
        more = window_size - lookahead - strstart; // Deal with !@#$% 64K limit:

        if (more === 0 && strstart === 0 && lookahead === 0) {
          more = w_size;
        } else if (more == -1) {
          // Very unlikely, but possible on 16 bit machine if strstart ==
          // 0
          // and lookahead == 1 (input done one byte at time)
          more--; // If the win is almost full and there is insufficient
          // lookahead,
          // move the upper half to the lower one to make room in the
          // upper half.
        } else if (strstart >= w_size + w_size - MIN_LOOKAHEAD) {
          win.set(win.subarray(w_size, w_size + w_size), 0);
          match_start -= w_size;
          strstart -= w_size; // we now have strstart >= MAX_DIST

          block_start -= w_size; // Slide the hash table (could be avoided with 32 bit values
          // at the expense of memory usage). We slide even when level ==
          // 0
          // to keep the hash table consistent if we switch back to level
          // > 0
          // later. (Using level 0 permanently is not an optimal usage of
          // zlib, so we don't care about this pathological case.)

          n = hash_size;
          p = n;

          do {
            m = head[--p] & 0xffff;
            head[p] = m >= w_size ? m - w_size : 0;
          } while (--n !== 0);

          n = w_size;
          p = n;

          do {
            m = prev[--p] & 0xffff;
            prev[p] = m >= w_size ? m - w_size : 0; // If n is not on any hash chain, prev[n] is garbage but
            // its value will never be used.
          } while (--n !== 0);

          more += w_size;
        }

        if (strm.avail_in === 0) return; // If there was no sliding:
        // strstart <= WSIZE+MAX_DIST-1 && lookahead <= MIN_LOOKAHEAD - 1 &&
        // more == window_size - lookahead - strstart
        // => more >= window_size - (MIN_LOOKAHEAD-1 + WSIZE + MAX_DIST-1)
        // => more >= window_size - 2*WSIZE + 2
        // In the BIG_MEM or MMAP case (not yet supported),
        // window_size == input_size + MIN_LOOKAHEAD &&
        // strstart + s->lookahead <= input_size => more >= MIN_LOOKAHEAD.
        // Otherwise, window_size == 2*WSIZE so more >= 2.
        // If there was sliding, more >= WSIZE. So in all cases, more >= 2.

        n = strm.read_buf(win, strstart + lookahead, more);
        lookahead += n; // Initialize the hash value now that we have some input:

        if (lookahead >= MIN_MATCH) {
          ins_h = win[strstart] & 0xff;
          ins_h = (ins_h << hash_shift ^ win[strstart + 1] & 0xff) & hash_mask;
        } // If the whole input has less than MIN_MATCH bytes, ins_h is
        // garbage,
        // but this is not important since only literal bytes will be
        // emitted.

      } while (lookahead < MIN_LOOKAHEAD && strm.avail_in !== 0);
    } // Copy without compression as much as possible from the input stream,
    // return
    // the current block state.
    // This function does not insert new strings in the dictionary since
    // uncompressible data is probably not useful. This function is used
    // only for the level=0 compression option.
    // NOTE: this function should be optimized to avoid extra copying from
    // win to pending_buf.


    function deflate_stored(flush) {
      // Stored blocks are limited to 0xffff bytes, pending_buf is limited
      // to pending_buf_size, and each stored block has a 5 byte header:
      var max_block_size = 0xffff;
      var max_start;

      if (max_block_size > pending_buf_size - 5) {
        max_block_size = pending_buf_size - 5;
      } // Copy as much as possible from input to output:
      // eslint-disable-next-line no-constant-condition


      while (true) {
        // Fill the win as much as possible:
        if (lookahead <= 1) {
          fill_window();
          if (lookahead === 0 && flush == Z_NO_FLUSH$1) return NeedMore;
          if (lookahead === 0) break; // flush the current block
        }

        strstart += lookahead;
        lookahead = 0; // Emit a stored block if pending_buf will be full:

        max_start = block_start + max_block_size;

        if (strstart === 0 || strstart >= max_start) {
          // strstart === 0 is possible when wraparound on 16-bit machine
          lookahead = strstart - max_start;
          strstart = max_start;
          flush_block_only(false);
          if (strm.avail_out === 0) return NeedMore;
        } // Flush if we may have to slide, otherwise block_start may become
        // negative and the data will be gone:


        if (strstart - block_start >= w_size - MIN_LOOKAHEAD) {
          flush_block_only(false);
          if (strm.avail_out === 0) return NeedMore;
        }
      }

      flush_block_only(flush == Z_FINISH$1);
      if (strm.avail_out === 0) return flush == Z_FINISH$1 ? FinishStarted : NeedMore;
      return flush == Z_FINISH$1 ? FinishDone : BlockDone;
    }

    function longest_match(cur_match) {
      var chain_length = max_chain_length; // max hash chain length

      var scan = strstart; // current string

      var match; // matched string

      var len; // length of current match

      var best_len = prev_length; // best match length so far

      var limit = strstart > w_size - MIN_LOOKAHEAD ? strstart - (w_size - MIN_LOOKAHEAD) : 0;
      var _nice_match = nice_match; // Stop when cur_match becomes <= limit. To simplify the code,
      // we prevent matches with the string of win index 0.

      var wmask = w_mask;
      var strend = strstart + MAX_MATCH;
      var scan_end1 = win[scan + best_len - 1];
      var scan_end = win[scan + best_len]; // The code is optimized for HASH_BITS >= 8 and MAX_MATCH-2 multiple of
      // 16.
      // It is easy to get rid of this optimization if necessary.
      // Do not waste too much time if we already have a good match:

      if (prev_length >= good_match) {
        chain_length >>= 2;
      } // Do not look for matches beyond the end of the input. This is
      // necessary
      // to make deflate deterministic.


      if (_nice_match > lookahead) _nice_match = lookahead;

      do {
        match = cur_match; // Skip to next match if the match length cannot increase
        // or if the match length is less than 2:

        if (win[match + best_len] != scan_end || win[match + best_len - 1] != scan_end1 || win[match] != win[scan] || win[++match] != win[scan + 1]) continue; // The check at best_len-1 can be removed because it will be made
        // again later. (This heuristic is not always a win.)
        // It is not necessary to compare scan[2] and match[2] since they
        // are always equal when the other bytes match, given that
        // the hash keys are equal and that HASH_BITS >= 8.

        scan += 2;
        match++; // We check for insufficient lookahead only every 8th comparison;
        // the 256th check will be made at strstart+258.
        // eslint-disable-next-line no-empty

        do {} while (win[++scan] == win[++match] && win[++scan] == win[++match] && win[++scan] == win[++match] && win[++scan] == win[++match] && win[++scan] == win[++match] && win[++scan] == win[++match] && win[++scan] == win[++match] && win[++scan] == win[++match] && scan < strend);

        len = MAX_MATCH - (strend - scan);
        scan = strend - MAX_MATCH;

        if (len > best_len) {
          match_start = cur_match;
          best_len = len;
          if (len >= _nice_match) break;
          scan_end1 = win[scan + best_len - 1];
          scan_end = win[scan + best_len];
        }
      } while ((cur_match = prev[cur_match & wmask] & 0xffff) > limit && --chain_length !== 0);

      if (best_len <= lookahead) return best_len;
      return lookahead;
    } // Compress as much as possible from the input stream, return the current
    // block state.
    // This function does not perform lazy evaluation of matches and inserts
    // new strings in the dictionary only for unmatched strings or for short
    // matches. It is used only for the fast compression options.


    function deflate_fast(flush) {
      // short hash_head = 0; // head of the hash chain
      var hash_head = 0; // head of the hash chain

      var bflush; // set if current block must be flushed
      // eslint-disable-next-line no-constant-condition

      while (true) {
        // Make sure that we always have enough lookahead, except
        // at the end of the input file. We need MAX_MATCH bytes
        // for the next match, plus MIN_MATCH bytes to insert the
        // string following the next match.
        if (lookahead < MIN_LOOKAHEAD) {
          fill_window();

          if (lookahead < MIN_LOOKAHEAD && flush == Z_NO_FLUSH$1) {
            return NeedMore;
          }

          if (lookahead === 0) break; // flush the current block
        } // Insert the string win[strstart .. strstart+2] in the
        // dictionary, and set hash_head to the head of the hash chain:


        if (lookahead >= MIN_MATCH) {
          ins_h = (ins_h << hash_shift ^ win[strstart + (MIN_MATCH - 1)] & 0xff) & hash_mask; // prev[strstart&w_mask]=hash_head=head[ins_h];

          hash_head = head[ins_h] & 0xffff;
          prev[strstart & w_mask] = head[ins_h];
          head[ins_h] = strstart;
        } // Find the longest match, discarding those <= prev_length.
        // At this point we have always match_length < MIN_MATCH


        if (hash_head !== 0 && (strstart - hash_head & 0xffff) <= w_size - MIN_LOOKAHEAD) {
          // To simplify the code, we prevent matches with the string
          // of win index 0 (in particular we have to avoid a match
          // of the string with itself at the start of the input file).
          if (strategy != Z_HUFFMAN_ONLY) {
            match_length = longest_match(hash_head);
          } // longest_match() sets match_start

        }

        if (match_length >= MIN_MATCH) {
          // check_match(strstart, match_start, match_length);
          bflush = _tr_tally(strstart - match_start, match_length - MIN_MATCH);
          lookahead -= match_length; // Insert new strings in the hash table only if the match length
          // is not too large. This saves time but degrades compression.

          if (match_length <= max_lazy_match && lookahead >= MIN_MATCH) {
            match_length--; // string at strstart already in hash table

            do {
              strstart++;
              ins_h = (ins_h << hash_shift ^ win[strstart + (MIN_MATCH - 1)] & 0xff) & hash_mask; // prev[strstart&w_mask]=hash_head=head[ins_h];

              hash_head = head[ins_h] & 0xffff;
              prev[strstart & w_mask] = head[ins_h];
              head[ins_h] = strstart; // strstart never exceeds WSIZE-MAX_MATCH, so there are
              // always MIN_MATCH bytes ahead.
            } while (--match_length !== 0);

            strstart++;
          } else {
            strstart += match_length;
            match_length = 0;
            ins_h = win[strstart] & 0xff;
            ins_h = (ins_h << hash_shift ^ win[strstart + 1] & 0xff) & hash_mask; // If lookahead < MIN_MATCH, ins_h is garbage, but it does
            // not
            // matter since it will be recomputed at next deflate call.
          }
        } else {
          // No match, output a literal byte
          bflush = _tr_tally(0, win[strstart] & 0xff);
          lookahead--;
          strstart++;
        }

        if (bflush) {
          flush_block_only(false);
          if (strm.avail_out === 0) return NeedMore;
        }
      }

      flush_block_only(flush == Z_FINISH$1);

      if (strm.avail_out === 0) {
        if (flush == Z_FINISH$1) return FinishStarted;else return NeedMore;
      }

      return flush == Z_FINISH$1 ? FinishDone : BlockDone;
    } // Same as above, but achieves better compression. We use a lazy
    // evaluation for matches: a match is finally adopted only if there is
    // no better match at the next win position.


    function deflate_slow(flush) {
      // short hash_head = 0; // head of hash chain
      var hash_head = 0; // head of hash chain

      var bflush; // set if current block must be flushed

      var max_insert; // Process the input block.
      // eslint-disable-next-line no-constant-condition

      while (true) {
        // Make sure that we always have enough lookahead, except
        // at the end of the input file. We need MAX_MATCH bytes
        // for the next match, plus MIN_MATCH bytes to insert the
        // string following the next match.
        if (lookahead < MIN_LOOKAHEAD) {
          fill_window();

          if (lookahead < MIN_LOOKAHEAD && flush == Z_NO_FLUSH$1) {
            return NeedMore;
          }

          if (lookahead === 0) break; // flush the current block
        } // Insert the string win[strstart .. strstart+2] in the
        // dictionary, and set hash_head to the head of the hash chain:


        if (lookahead >= MIN_MATCH) {
          ins_h = (ins_h << hash_shift ^ win[strstart + (MIN_MATCH - 1)] & 0xff) & hash_mask; // prev[strstart&w_mask]=hash_head=head[ins_h];

          hash_head = head[ins_h] & 0xffff;
          prev[strstart & w_mask] = head[ins_h];
          head[ins_h] = strstart;
        } // Find the longest match, discarding those <= prev_length.


        prev_length = match_length;
        prev_match = match_start;
        match_length = MIN_MATCH - 1;

        if (hash_head !== 0 && prev_length < max_lazy_match && (strstart - hash_head & 0xffff) <= w_size - MIN_LOOKAHEAD) {
          // To simplify the code, we prevent matches with the string
          // of win index 0 (in particular we have to avoid a match
          // of the string with itself at the start of the input file).
          if (strategy != Z_HUFFMAN_ONLY) {
            match_length = longest_match(hash_head);
          } // longest_match() sets match_start


          if (match_length <= 5 && (strategy == Z_FILTERED || match_length == MIN_MATCH && strstart - match_start > 4096)) {
            // If prev_match is also MIN_MATCH, match_start is garbage
            // but we will ignore the current match anyway.
            match_length = MIN_MATCH - 1;
          }
        } // If there was a match at the previous step and the current
        // match is not better, output the previous match:


        if (prev_length >= MIN_MATCH && match_length <= prev_length) {
          max_insert = strstart + lookahead - MIN_MATCH; // Do not insert strings in hash table beyond this.
          // check_match(strstart-1, prev_match, prev_length);

          bflush = _tr_tally(strstart - 1 - prev_match, prev_length - MIN_MATCH); // Insert in hash table all strings up to the end of the match.
          // strstart-1 and strstart are already inserted. If there is not
          // enough lookahead, the last two strings are not inserted in
          // the hash table.

          lookahead -= prev_length - 1;
          prev_length -= 2;

          do {
            if (++strstart <= max_insert) {
              ins_h = (ins_h << hash_shift ^ win[strstart + (MIN_MATCH - 1)] & 0xff) & hash_mask; // prev[strstart&w_mask]=hash_head=head[ins_h];

              hash_head = head[ins_h] & 0xffff;
              prev[strstart & w_mask] = head[ins_h];
              head[ins_h] = strstart;
            }
          } while (--prev_length !== 0);

          match_available = 0;
          match_length = MIN_MATCH - 1;
          strstart++;

          if (bflush) {
            flush_block_only(false);
            if (strm.avail_out === 0) return NeedMore;
          }
        } else if (match_available !== 0) {
          // If there was no match at the previous position, output a
          // single literal. If there was a match but the current match
          // is longer, truncate the previous match to a single literal.
          bflush = _tr_tally(0, win[strstart - 1] & 0xff);

          if (bflush) {
            flush_block_only(false);
          }

          strstart++;
          lookahead--;
          if (strm.avail_out === 0) return NeedMore;
        } else {
          // There is no previous match to compare with, wait for
          // the next step to decide.
          match_available = 1;
          strstart++;
          lookahead--;
        }
      }

      if (match_available !== 0) {
        bflush = _tr_tally(0, win[strstart - 1] & 0xff);
        match_available = 0;
      }

      flush_block_only(flush == Z_FINISH$1);

      if (strm.avail_out === 0) {
        if (flush == Z_FINISH$1) return FinishStarted;else return NeedMore;
      }

      return flush == Z_FINISH$1 ? FinishDone : BlockDone;
    }

    function deflateReset(strm) {
      strm.total_in = strm.total_out = 0;
      strm.msg = null; //

      that.pending = 0;
      that.pending_out = 0;
      status = BUSY_STATE;
      last_flush = Z_NO_FLUSH$1;
      tr_init();
      lm_init();
      return Z_OK$1;
    }

    that.deflateInit = function (strm, _level, bits, _method, memLevel, _strategy) {
      if (!_method) _method = Z_DEFLATED$1;
      if (!memLevel) memLevel = DEF_MEM_LEVEL;
      if (!_strategy) _strategy = Z_DEFAULT_STRATEGY; // byte[] my_version=ZLIB_VERSION;
      //
      // if (!version || version[0] != my_version[0]
      // || stream_size != sizeof(z_stream)) {
      // return Z_VERSION_ERROR;
      // }

      strm.msg = null;
      if (_level == Z_DEFAULT_COMPRESSION) _level = 6;

      if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || _method != Z_DEFLATED$1 || bits < 9 || bits > 15 || _level < 0 || _level > 9 || _strategy < 0 || _strategy > Z_HUFFMAN_ONLY) {
        return Z_STREAM_ERROR$1;
      }

      strm.dstate = that;
      w_bits = bits;
      w_size = 1 << w_bits;
      w_mask = w_size - 1;
      hash_bits = memLevel + 7;
      hash_size = 1 << hash_bits;
      hash_mask = hash_size - 1;
      hash_shift = Math.floor((hash_bits + MIN_MATCH - 1) / MIN_MATCH);
      win = new Uint8Array(w_size * 2);
      prev = [];
      head = [];
      lit_bufsize = 1 << memLevel + 6; // 16K elements by default

      that.pending_buf = new Uint8Array(lit_bufsize * 4);
      pending_buf_size = lit_bufsize * 4;
      that.dist_buf = new Uint16Array(lit_bufsize);
      that.lc_buf = new Uint8Array(lit_bufsize);
      level = _level;
      strategy = _strategy;
      return deflateReset(strm);
    };

    that.deflateEnd = function () {
      if (status != INIT_STATE && status != BUSY_STATE && status != FINISH_STATE) {
        return Z_STREAM_ERROR$1;
      } // Deallocate in reverse order of allocations:


      that.lc_buf = null;
      that.dist_buf = null;
      that.pending_buf = null;
      head = null;
      prev = null;
      win = null; // free

      that.dstate = null;
      return status == BUSY_STATE ? Z_DATA_ERROR$1 : Z_OK$1;
    };

    that.deflateParams = function (strm, _level, _strategy) {
      var err = Z_OK$1;

      if (_level == Z_DEFAULT_COMPRESSION) {
        _level = 6;
      }

      if (_level < 0 || _level > 9 || _strategy < 0 || _strategy > Z_HUFFMAN_ONLY) {
        return Z_STREAM_ERROR$1;
      }

      if (config_table[level].func != config_table[_level].func && strm.total_in !== 0) {
        // Flush the last buffer:
        err = strm.deflate(Z_PARTIAL_FLUSH);
      }

      if (level != _level) {
        level = _level;
        max_lazy_match = config_table[level].max_lazy;
        good_match = config_table[level].good_length;
        nice_match = config_table[level].nice_length;
        max_chain_length = config_table[level].max_chain;
      }

      strategy = _strategy;
      return err;
    };

    that.deflateSetDictionary = function (strm, dictionary, dictLength) {
      var length = dictLength;
      var n,
          index = 0;
      if (!dictionary || status != INIT_STATE) return Z_STREAM_ERROR$1;
      if (length < MIN_MATCH) return Z_OK$1;

      if (length > w_size - MIN_LOOKAHEAD) {
        length = w_size - MIN_LOOKAHEAD;
        index = dictLength - length; // use the tail of the dictionary
      }

      win.set(dictionary.subarray(index, index + length), 0);
      strstart = length;
      block_start = length; // Insert all strings in the hash table (except for the last two bytes).
      // s->lookahead stays null, so s->ins_h will be recomputed at the next
      // call of fill_window.

      ins_h = win[0] & 0xff;
      ins_h = (ins_h << hash_shift ^ win[1] & 0xff) & hash_mask;

      for (n = 0; n <= length - MIN_MATCH; n++) {
        ins_h = (ins_h << hash_shift ^ win[n + (MIN_MATCH - 1)] & 0xff) & hash_mask;
        prev[n & w_mask] = head[ins_h];
        head[ins_h] = n;
      }

      return Z_OK$1;
    };

    that.deflate = function (_strm, flush) {
      var i, header, level_flags, old_flush, bstate;

      if (flush > Z_FINISH$1 || flush < 0) {
        return Z_STREAM_ERROR$1;
      }

      if (!_strm.next_out || !_strm.next_in && _strm.avail_in !== 0 || status == FINISH_STATE && flush != Z_FINISH$1) {
        _strm.msg = z_errmsg[Z_NEED_DICT$1 - Z_STREAM_ERROR$1];
        return Z_STREAM_ERROR$1;
      }

      if (_strm.avail_out === 0) {
        _strm.msg = z_errmsg[Z_NEED_DICT$1 - Z_BUF_ERROR$1];
        return Z_BUF_ERROR$1;
      }

      strm = _strm; // just in case

      old_flush = last_flush;
      last_flush = flush; // Write the zlib header

      if (status == INIT_STATE) {
        header = Z_DEFLATED$1 + (w_bits - 8 << 4) << 8;
        level_flags = (level - 1 & 0xff) >> 1;
        if (level_flags > 3) level_flags = 3;
        header |= level_flags << 6;
        if (strstart !== 0) header |= PRESET_DICT$1;
        header += 31 - header % 31;
        status = BUSY_STATE;
        putShortMSB(header);
      } // Flush as much pending output as possible


      if (that.pending !== 0) {
        strm.flush_pending();

        if (strm.avail_out === 0) {
          // console.log(" avail_out==0");
          // Since avail_out is 0, deflate will be called again with
          // more output space, but possibly with both pending and
          // avail_in equal to zero. There won't be anything to do,
          // but this is not an error situation so make sure we
          // return OK instead of BUF_ERROR at next call of deflate:
          last_flush = -1;
          return Z_OK$1;
        } // Make sure there is something to do and avoid duplicate
        // consecutive
        // flushes. For repeated and useless calls with Z_FINISH, we keep
        // returning Z_STREAM_END instead of Z_BUFF_ERROR.

      } else if (strm.avail_in === 0 && flush <= old_flush && flush != Z_FINISH$1) {
        strm.msg = z_errmsg[Z_NEED_DICT$1 - Z_BUF_ERROR$1];
        return Z_BUF_ERROR$1;
      } // User must not provide more input after the first FINISH:


      if (status == FINISH_STATE && strm.avail_in !== 0) {
        _strm.msg = z_errmsg[Z_NEED_DICT$1 - Z_BUF_ERROR$1];
        return Z_BUF_ERROR$1;
      } // Start a new block or continue the current one.


      if (strm.avail_in !== 0 || lookahead !== 0 || flush != Z_NO_FLUSH$1 && status != FINISH_STATE) {
        bstate = -1;

        switch (config_table[level].func) {
          case STORED$1:
            bstate = deflate_stored(flush);
            break;

          case FAST:
            bstate = deflate_fast(flush);
            break;

          case SLOW:
            bstate = deflate_slow(flush);
            break;
        }

        if (bstate == FinishStarted || bstate == FinishDone) {
          status = FINISH_STATE;
        }

        if (bstate == NeedMore || bstate == FinishStarted) {
          if (strm.avail_out === 0) {
            last_flush = -1; // avoid BUF_ERROR next call, see above
          }

          return Z_OK$1; // If flush != Z_NO_FLUSH && avail_out === 0, the next call
          // of deflate should use the same flush parameter to make sure
          // that the flush is complete. So we don't have to output an
          // empty block here, this will be done at next call. This also
          // ensures that for a very small output buffer, we emit at most
          // one empty block.
        }

        if (bstate == BlockDone) {
          if (flush == Z_PARTIAL_FLUSH) {
            _tr_align();
          } else {
            // FULL_FLUSH or SYNC_FLUSH
            _tr_stored_block(0, 0, false); // For a full flush, this empty block will be recognized
            // as a special marker by inflate_sync().


            if (flush == Z_FULL_FLUSH) {
              // state.head[s.hash_size-1]=0;
              for (i = 0; i < hash_size
              /*-1*/
              ; i++) {
                // forget history
                head[i] = 0;
              }
            }
          }

          strm.flush_pending();

          if (strm.avail_out === 0) {
            last_flush = -1; // avoid BUF_ERROR at next call, see above

            return Z_OK$1;
          }
        }
      }

      if (flush != Z_FINISH$1) return Z_OK$1;
      return Z_STREAM_END$1;
    };
  } // ZStream


  function ZStream$1() {
    var that = this;
    that.next_in_index = 0;
    that.next_out_index = 0; // that.next_in; // next input byte

    that.avail_in = 0; // number of bytes available at next_in

    that.total_in = 0; // total nb of input bytes read so far
    // that.next_out; // next output byte should be put there

    that.avail_out = 0; // remaining free space at next_out

    that.total_out = 0; // total nb of bytes output so far
    // that.msg;
    // that.dstate;
  }

  ZStream$1.prototype = {
    deflateInit: function deflateInit(level, bits) {
      var that = this;
      that.dstate = new Deflate$1();
      if (!bits) bits = MAX_BITS$1;
      return that.dstate.deflateInit(that, level, bits);
    },
    deflate: function deflate(flush) {
      var that = this;

      if (!that.dstate) {
        return Z_STREAM_ERROR$1;
      }

      return that.dstate.deflate(that, flush);
    },
    deflateEnd: function deflateEnd() {
      var that = this;
      if (!that.dstate) return Z_STREAM_ERROR$1;
      var ret = that.dstate.deflateEnd();
      that.dstate = null;
      return ret;
    },
    deflateParams: function deflateParams(level, strategy) {
      var that = this;
      if (!that.dstate) return Z_STREAM_ERROR$1;
      return that.dstate.deflateParams(that, level, strategy);
    },
    deflateSetDictionary: function deflateSetDictionary(dictionary, dictLength) {
      var that = this;
      if (!that.dstate) return Z_STREAM_ERROR$1;
      return that.dstate.deflateSetDictionary(that, dictionary, dictLength);
    },
    // Read a new buffer from the current input stream, update the
    // total number of bytes read. All deflate() input goes through
    // this function so some applications may wish to modify it to avoid
    // allocating a large strm->next_in buffer and copying from it.
    // (See also flush_pending()).
    read_buf: function read_buf(buf, start, size) {
      var that = this;
      var len = that.avail_in;
      if (len > size) len = size;
      if (len === 0) return 0;
      that.avail_in -= len;
      buf.set(that.next_in.subarray(that.next_in_index, that.next_in_index + len), start);
      that.next_in_index += len;
      that.total_in += len;
      return len;
    },
    // Flush as much pending output as possible. All deflate() output goes
    // through this function so some applications may wish to modify it
    // to avoid allocating a large strm->next_out buffer and copying into it.
    // (See also read_buf()).
    flush_pending: function flush_pending() {
      var that = this;
      var len = that.dstate.pending;
      if (len > that.avail_out) len = that.avail_out;
      if (len === 0) return; // if (that.dstate.pending_buf.length <= that.dstate.pending_out || that.next_out.length <= that.next_out_index
      // || that.dstate.pending_buf.length < (that.dstate.pending_out + len) || that.next_out.length < (that.next_out_index +
      // len)) {
      // console.log(that.dstate.pending_buf.length + ", " + that.dstate.pending_out + ", " + that.next_out.length + ", " +
      // that.next_out_index + ", " + len);
      // console.log("avail_out=" + that.avail_out);
      // }

      that.next_out.set(that.dstate.pending_buf.subarray(that.dstate.pending_out, that.dstate.pending_out + len), that.next_out_index);
      that.next_out_index += len;
      that.dstate.pending_out += len;
      that.total_out += len;
      that.avail_out -= len;
      that.dstate.pending -= len;

      if (that.dstate.pending === 0) {
        that.dstate.pending_out = 0;
      }
    }
  }; // Deflate

  function ZipDeflate(options) {
    var that = this;
    var z = new ZStream$1();
    var bufsize = getMaximumCompressedSize$1(options && options.chunkSize ? options.chunkSize : 64 * 1024);
    var flush = Z_NO_FLUSH$1;
    var buf = new Uint8Array(bufsize);
    var level = options ? options.level : Z_DEFAULT_COMPRESSION;
    if (typeof level == "undefined") level = Z_DEFAULT_COMPRESSION;
    z.deflateInit(level);
    z.next_out = buf;

    that.append = function (data, onprogress) {
      var err,
          array,
          lastIndex = 0,
          bufferIndex = 0,
          bufferSize = 0;
      var buffers = [];
      if (!data.length) return;
      z.next_in_index = 0;
      z.next_in = data;
      z.avail_in = data.length;

      do {
        z.next_out_index = 0;
        z.avail_out = bufsize;
        err = z.deflate(flush);
        if (err != Z_OK$1) throw new Error("deflating: " + z.msg);
        if (z.next_out_index) if (z.next_out_index == bufsize) buffers.push(new Uint8Array(buf));else buffers.push(buf.slice(0, z.next_out_index));
        bufferSize += z.next_out_index;

        if (onprogress && z.next_in_index > 0 && z.next_in_index != lastIndex) {
          onprogress(z.next_in_index);
          lastIndex = z.next_in_index;
        }
      } while (z.avail_in > 0 || z.avail_out === 0);

      if (buffers.length > 1) {
        array = new Uint8Array(bufferSize);
        buffers.forEach(function (chunk) {
          array.set(chunk, bufferIndex);
          bufferIndex += chunk.length;
        });
      } else {
        array = buffers[0] || new Uint8Array(0);
      }

      return array;
    };

    that.flush = function () {
      var err,
          array,
          bufferIndex = 0,
          bufferSize = 0;
      var buffers = [];

      do {
        z.next_out_index = 0;
        z.avail_out = bufsize;
        err = z.deflate(Z_FINISH$1);
        if (err != Z_STREAM_END$1 && err != Z_OK$1) throw new Error("deflating: " + z.msg);
        if (bufsize - z.avail_out > 0) buffers.push(buf.slice(0, z.next_out_index));
        bufferSize += z.next_out_index;
      } while (z.avail_in > 0 || z.avail_out === 0);

      z.deflateEnd();
      array = new Uint8Array(bufferSize);
      buffers.forEach(function (chunk) {
        array.set(chunk, bufferIndex);
        bufferIndex += chunk.length;
      });
      return array;
    };
  }

  function getMaximumCompressedSize$1(uncompressedSize) {
    return uncompressedSize + 5 * (Math.floor(uncompressedSize / 16383) + 1);
  }

  var createTypedArrayConstructor$1 = typedArrayConstructor.exports;

  // `Int32Array` constructor
  // https://tc39.es/ecma262/#sec-typedarray-objects
  createTypedArrayConstructor$1('Int32', function (init) {
    return function Int32Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  });

  /*
   Copyright (c) 2022 Gildas Lormeau. All rights reserved.

   Redistribution and use in source and binary forms, with or without
   modification, are permitted provided that the following conditions are met:

   1. Redistributions of source code must retain the above copyright notice,
   this list of conditions and the following disclaimer.

   2. Redistributions in binary form must reproduce the above copyright 
   notice, this list of conditions and the following disclaimer in 
   the documentation and/or other materials provided with the distribution.

   3. The names of the authors may not be used to endorse or promote products
   derived from this software without specific prior written permission.

   THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
   INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
   FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
   INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
   INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
   LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
   OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
   EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   */

  /*
   * This program is based on JZlib 1.0.2 ymnk, JCraft,Inc.
   * JZlib is based on zlib-1.1.3, so all credit should go authors
   * Jean-loup Gailly(jloup@gzip.org) and Mark Adler(madler@alumni.caltech.edu)
   * and contributors of zlib.
   */
  // Global
  var MAX_BITS = 15;
  var Z_OK = 0;
  var Z_STREAM_END = 1;
  var Z_NEED_DICT = 2;
  var Z_STREAM_ERROR = -2;
  var Z_DATA_ERROR = -3;
  var Z_MEM_ERROR = -4;
  var Z_BUF_ERROR = -5;
  var inflate_mask = [0x00000000, 0x00000001, 0x00000003, 0x00000007, 0x0000000f, 0x0000001f, 0x0000003f, 0x0000007f, 0x000000ff, 0x000001ff, 0x000003ff, 0x000007ff, 0x00000fff, 0x00001fff, 0x00003fff, 0x00007fff, 0x0000ffff];
  var MANY = 1440; // JZlib version : "1.0.2"

  var Z_NO_FLUSH = 0;
  var Z_FINISH = 4; // InfTree

  var fixed_bl = 9;
  var fixed_bd = 5;
  var fixed_tl = [96, 7, 256, 0, 8, 80, 0, 8, 16, 84, 8, 115, 82, 7, 31, 0, 8, 112, 0, 8, 48, 0, 9, 192, 80, 7, 10, 0, 8, 96, 0, 8, 32, 0, 9, 160, 0, 8, 0, 0, 8, 128, 0, 8, 64, 0, 9, 224, 80, 7, 6, 0, 8, 88, 0, 8, 24, 0, 9, 144, 83, 7, 59, 0, 8, 120, 0, 8, 56, 0, 9, 208, 81, 7, 17, 0, 8, 104, 0, 8, 40, 0, 9, 176, 0, 8, 8, 0, 8, 136, 0, 8, 72, 0, 9, 240, 80, 7, 4, 0, 8, 84, 0, 8, 20, 85, 8, 227, 83, 7, 43, 0, 8, 116, 0, 8, 52, 0, 9, 200, 81, 7, 13, 0, 8, 100, 0, 8, 36, 0, 9, 168, 0, 8, 4, 0, 8, 132, 0, 8, 68, 0, 9, 232, 80, 7, 8, 0, 8, 92, 0, 8, 28, 0, 9, 152, 84, 7, 83, 0, 8, 124, 0, 8, 60, 0, 9, 216, 82, 7, 23, 0, 8, 108, 0, 8, 44, 0, 9, 184, 0, 8, 12, 0, 8, 140, 0, 8, 76, 0, 9, 248, 80, 7, 3, 0, 8, 82, 0, 8, 18, 85, 8, 163, 83, 7, 35, 0, 8, 114, 0, 8, 50, 0, 9, 196, 81, 7, 11, 0, 8, 98, 0, 8, 34, 0, 9, 164, 0, 8, 2, 0, 8, 130, 0, 8, 66, 0, 9, 228, 80, 7, 7, 0, 8, 90, 0, 8, 26, 0, 9, 148, 84, 7, 67, 0, 8, 122, 0, 8, 58, 0, 9, 212, 82, 7, 19, 0, 8, 106, 0, 8, 42, 0, 9, 180, 0, 8, 10, 0, 8, 138, 0, 8, 74, 0, 9, 244, 80, 7, 5, 0, 8, 86, 0, 8, 22, 192, 8, 0, 83, 7, 51, 0, 8, 118, 0, 8, 54, 0, 9, 204, 81, 7, 15, 0, 8, 102, 0, 8, 38, 0, 9, 172, 0, 8, 6, 0, 8, 134, 0, 8, 70, 0, 9, 236, 80, 7, 9, 0, 8, 94, 0, 8, 30, 0, 9, 156, 84, 7, 99, 0, 8, 126, 0, 8, 62, 0, 9, 220, 82, 7, 27, 0, 8, 110, 0, 8, 46, 0, 9, 188, 0, 8, 14, 0, 8, 142, 0, 8, 78, 0, 9, 252, 96, 7, 256, 0, 8, 81, 0, 8, 17, 85, 8, 131, 82, 7, 31, 0, 8, 113, 0, 8, 49, 0, 9, 194, 80, 7, 10, 0, 8, 97, 0, 8, 33, 0, 9, 162, 0, 8, 1, 0, 8, 129, 0, 8, 65, 0, 9, 226, 80, 7, 6, 0, 8, 89, 0, 8, 25, 0, 9, 146, 83, 7, 59, 0, 8, 121, 0, 8, 57, 0, 9, 210, 81, 7, 17, 0, 8, 105, 0, 8, 41, 0, 9, 178, 0, 8, 9, 0, 8, 137, 0, 8, 73, 0, 9, 242, 80, 7, 4, 0, 8, 85, 0, 8, 21, 80, 8, 258, 83, 7, 43, 0, 8, 117, 0, 8, 53, 0, 9, 202, 81, 7, 13, 0, 8, 101, 0, 8, 37, 0, 9, 170, 0, 8, 5, 0, 8, 133, 0, 8, 69, 0, 9, 234, 80, 7, 8, 0, 8, 93, 0, 8, 29, 0, 9, 154, 84, 7, 83, 0, 8, 125, 0, 8, 61, 0, 9, 218, 82, 7, 23, 0, 8, 109, 0, 8, 45, 0, 9, 186, 0, 8, 13, 0, 8, 141, 0, 8, 77, 0, 9, 250, 80, 7, 3, 0, 8, 83, 0, 8, 19, 85, 8, 195, 83, 7, 35, 0, 8, 115, 0, 8, 51, 0, 9, 198, 81, 7, 11, 0, 8, 99, 0, 8, 35, 0, 9, 166, 0, 8, 3, 0, 8, 131, 0, 8, 67, 0, 9, 230, 80, 7, 7, 0, 8, 91, 0, 8, 27, 0, 9, 150, 84, 7, 67, 0, 8, 123, 0, 8, 59, 0, 9, 214, 82, 7, 19, 0, 8, 107, 0, 8, 43, 0, 9, 182, 0, 8, 11, 0, 8, 139, 0, 8, 75, 0, 9, 246, 80, 7, 5, 0, 8, 87, 0, 8, 23, 192, 8, 0, 83, 7, 51, 0, 8, 119, 0, 8, 55, 0, 9, 206, 81, 7, 15, 0, 8, 103, 0, 8, 39, 0, 9, 174, 0, 8, 7, 0, 8, 135, 0, 8, 71, 0, 9, 238, 80, 7, 9, 0, 8, 95, 0, 8, 31, 0, 9, 158, 84, 7, 99, 0, 8, 127, 0, 8, 63, 0, 9, 222, 82, 7, 27, 0, 8, 111, 0, 8, 47, 0, 9, 190, 0, 8, 15, 0, 8, 143, 0, 8, 79, 0, 9, 254, 96, 7, 256, 0, 8, 80, 0, 8, 16, 84, 8, 115, 82, 7, 31, 0, 8, 112, 0, 8, 48, 0, 9, 193, 80, 7, 10, 0, 8, 96, 0, 8, 32, 0, 9, 161, 0, 8, 0, 0, 8, 128, 0, 8, 64, 0, 9, 225, 80, 7, 6, 0, 8, 88, 0, 8, 24, 0, 9, 145, 83, 7, 59, 0, 8, 120, 0, 8, 56, 0, 9, 209, 81, 7, 17, 0, 8, 104, 0, 8, 40, 0, 9, 177, 0, 8, 8, 0, 8, 136, 0, 8, 72, 0, 9, 241, 80, 7, 4, 0, 8, 84, 0, 8, 20, 85, 8, 227, 83, 7, 43, 0, 8, 116, 0, 8, 52, 0, 9, 201, 81, 7, 13, 0, 8, 100, 0, 8, 36, 0, 9, 169, 0, 8, 4, 0, 8, 132, 0, 8, 68, 0, 9, 233, 80, 7, 8, 0, 8, 92, 0, 8, 28, 0, 9, 153, 84, 7, 83, 0, 8, 124, 0, 8, 60, 0, 9, 217, 82, 7, 23, 0, 8, 108, 0, 8, 44, 0, 9, 185, 0, 8, 12, 0, 8, 140, 0, 8, 76, 0, 9, 249, 80, 7, 3, 0, 8, 82, 0, 8, 18, 85, 8, 163, 83, 7, 35, 0, 8, 114, 0, 8, 50, 0, 9, 197, 81, 7, 11, 0, 8, 98, 0, 8, 34, 0, 9, 165, 0, 8, 2, 0, 8, 130, 0, 8, 66, 0, 9, 229, 80, 7, 7, 0, 8, 90, 0, 8, 26, 0, 9, 149, 84, 7, 67, 0, 8, 122, 0, 8, 58, 0, 9, 213, 82, 7, 19, 0, 8, 106, 0, 8, 42, 0, 9, 181, 0, 8, 10, 0, 8, 138, 0, 8, 74, 0, 9, 245, 80, 7, 5, 0, 8, 86, 0, 8, 22, 192, 8, 0, 83, 7, 51, 0, 8, 118, 0, 8, 54, 0, 9, 205, 81, 7, 15, 0, 8, 102, 0, 8, 38, 0, 9, 173, 0, 8, 6, 0, 8, 134, 0, 8, 70, 0, 9, 237, 80, 7, 9, 0, 8, 94, 0, 8, 30, 0, 9, 157, 84, 7, 99, 0, 8, 126, 0, 8, 62, 0, 9, 221, 82, 7, 27, 0, 8, 110, 0, 8, 46, 0, 9, 189, 0, 8, 14, 0, 8, 142, 0, 8, 78, 0, 9, 253, 96, 7, 256, 0, 8, 81, 0, 8, 17, 85, 8, 131, 82, 7, 31, 0, 8, 113, 0, 8, 49, 0, 9, 195, 80, 7, 10, 0, 8, 97, 0, 8, 33, 0, 9, 163, 0, 8, 1, 0, 8, 129, 0, 8, 65, 0, 9, 227, 80, 7, 6, 0, 8, 89, 0, 8, 25, 0, 9, 147, 83, 7, 59, 0, 8, 121, 0, 8, 57, 0, 9, 211, 81, 7, 17, 0, 8, 105, 0, 8, 41, 0, 9, 179, 0, 8, 9, 0, 8, 137, 0, 8, 73, 0, 9, 243, 80, 7, 4, 0, 8, 85, 0, 8, 21, 80, 8, 258, 83, 7, 43, 0, 8, 117, 0, 8, 53, 0, 9, 203, 81, 7, 13, 0, 8, 101, 0, 8, 37, 0, 9, 171, 0, 8, 5, 0, 8, 133, 0, 8, 69, 0, 9, 235, 80, 7, 8, 0, 8, 93, 0, 8, 29, 0, 9, 155, 84, 7, 83, 0, 8, 125, 0, 8, 61, 0, 9, 219, 82, 7, 23, 0, 8, 109, 0, 8, 45, 0, 9, 187, 0, 8, 13, 0, 8, 141, 0, 8, 77, 0, 9, 251, 80, 7, 3, 0, 8, 83, 0, 8, 19, 85, 8, 195, 83, 7, 35, 0, 8, 115, 0, 8, 51, 0, 9, 199, 81, 7, 11, 0, 8, 99, 0, 8, 35, 0, 9, 167, 0, 8, 3, 0, 8, 131, 0, 8, 67, 0, 9, 231, 80, 7, 7, 0, 8, 91, 0, 8, 27, 0, 9, 151, 84, 7, 67, 0, 8, 123, 0, 8, 59, 0, 9, 215, 82, 7, 19, 0, 8, 107, 0, 8, 43, 0, 9, 183, 0, 8, 11, 0, 8, 139, 0, 8, 75, 0, 9, 247, 80, 7, 5, 0, 8, 87, 0, 8, 23, 192, 8, 0, 83, 7, 51, 0, 8, 119, 0, 8, 55, 0, 9, 207, 81, 7, 15, 0, 8, 103, 0, 8, 39, 0, 9, 175, 0, 8, 7, 0, 8, 135, 0, 8, 71, 0, 9, 239, 80, 7, 9, 0, 8, 95, 0, 8, 31, 0, 9, 159, 84, 7, 99, 0, 8, 127, 0, 8, 63, 0, 9, 223, 82, 7, 27, 0, 8, 111, 0, 8, 47, 0, 9, 191, 0, 8, 15, 0, 8, 143, 0, 8, 79, 0, 9, 255];
  var fixed_td = [80, 5, 1, 87, 5, 257, 83, 5, 17, 91, 5, 4097, 81, 5, 5, 89, 5, 1025, 85, 5, 65, 93, 5, 16385, 80, 5, 3, 88, 5, 513, 84, 5, 33, 92, 5, 8193, 82, 5, 9, 90, 5, 2049, 86, 5, 129, 192, 5, 24577, 80, 5, 2, 87, 5, 385, 83, 5, 25, 91, 5, 6145, 81, 5, 7, 89, 5, 1537, 85, 5, 97, 93, 5, 24577, 80, 5, 4, 88, 5, 769, 84, 5, 49, 92, 5, 12289, 82, 5, 13, 90, 5, 3073, 86, 5, 193, 192, 5, 24577]; // Tables for deflate from PKZIP's appnote.txt.

  var cplens = [// Copy lengths for literal codes 257..285
  3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0]; // see note #13 above about 258

  var cplext = [// Extra bits for literal codes 257..285
  0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 112, 112 // 112==invalid
  ];
  var cpdist = [// Copy offsets for distance codes 0..29
  1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577];
  var cpdext = [// Extra bits for distance codes
  0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]; // If BMAX needs to be larger than 16, then h and x[] should be uLong.

  var BMAX = 15; // maximum bit length of any code

  function InfTree() {
    var that = this;
    var hn; // hufts used in space

    var v; // work area for huft_build

    var c; // bit length count table

    var r; // table entry for structure assignment

    var u; // table stack

    var x; // bit offsets, then code stack

    function huft_build(b, // code lengths in bits (all assumed <=
    // BMAX)
    bindex, n, // number of codes (assumed <= 288)
    s, // number of simple-valued codes (0..s-1)
    d, // list of base values for non-simple codes
    e, // list of extra bits for non-simple codes
    t, // result: starting table
    m, // maximum lookup bits, returns actual
    hp, // space for trees
    hn, // hufts used in space
    v // working area: values in order of bit length
    ) {
      // Given a list of code lengths and a maximum table size, make a set of
      // tables to decode that set of codes. Return Z_OK on success,
      // Z_BUF_ERROR
      // if the given code set is incomplete (the tables are still built in
      // this
      // case), Z_DATA_ERROR if the input is invalid (an over-subscribed set
      // of
      // lengths), or Z_MEM_ERROR if not enough memory.
      var a; // counter for codes of length k

      var f; // i repeats in table every f entries

      var g; // maximum code length

      var h; // table level

      var i; // counter, current code

      var j; // counter

      var k; // number of bits in current code

      var l; // bits per table (returned in m)

      var mask; // (1 << w) - 1, to avoid cc -O bug on HP

      var p; // pointer into c[], b[], or v[]

      var q; // points to current table

      var w; // bits before this table == (l * h)

      var xp; // pointer into x

      var y; // number of dummy codes added

      var z; // number of entries in current table
      // Generate counts for each bit length

      p = 0;
      i = n;

      do {
        c[b[bindex + p]]++;
        p++;
        i--; // assume all entries <= BMAX
      } while (i !== 0);

      if (c[0] == n) {
        // null input--all zero length codes
        t[0] = -1;
        m[0] = 0;
        return Z_OK;
      } // Find minimum and maximum length, bound *m by those


      l = m[0];

      for (j = 1; j <= BMAX; j++) {
        if (c[j] !== 0) break;
      }

      k = j; // minimum code length

      if (l < j) {
        l = j;
      }

      for (i = BMAX; i !== 0; i--) {
        if (c[i] !== 0) break;
      }

      g = i; // maximum code length

      if (l > i) {
        l = i;
      }

      m[0] = l; // Adjust last length count to fill out codes, if needed

      for (y = 1 << j; j < i; j++, y <<= 1) {
        if ((y -= c[j]) < 0) {
          return Z_DATA_ERROR;
        }
      }

      if ((y -= c[i]) < 0) {
        return Z_DATA_ERROR;
      }

      c[i] += y; // Generate starting offsets into the value table for each length

      x[1] = j = 0;
      p = 1;
      xp = 2;

      while (--i !== 0) {
        // note that i == g from above
        x[xp] = j += c[p];
        xp++;
        p++;
      } // Make a table of values in order of bit lengths


      i = 0;
      p = 0;

      do {
        if ((j = b[bindex + p]) !== 0) {
          v[x[j]++] = i;
        }

        p++;
      } while (++i < n);

      n = x[g]; // set n to length of v
      // Generate the Huffman codes and for each, make the table entries

      x[0] = i = 0; // first Huffman code is zero

      p = 0; // grab values in bit order

      h = -1; // no tables yet--level -1

      w = -l; // bits decoded == (l * h)

      u[0] = 0; // just to keep compilers happy

      q = 0; // ditto

      z = 0; // ditto
      // go through the bit lengths (k already is bits in shortest code)

      for (; k <= g; k++) {
        a = c[k];

        while (a-- !== 0) {
          // here i is the Huffman code of length k bits for value *p
          // make tables up to required level
          while (k > w + l) {
            h++;
            w += l; // previous table always l bits
            // compute minimum size table less than or equal to l bits

            z = g - w;
            z = z > l ? l : z; // table size upper limit

            if ((f = 1 << (j = k - w)) > a + 1) {
              // try a k-w bit table
              // too few codes for
              // k-w bit table
              f -= a + 1; // deduct codes from patterns left

              xp = k;

              if (j < z) {
                while (++j < z) {
                  // try smaller tables up to z bits
                  if ((f <<= 1) <= c[++xp]) break; // enough codes to use up j bits

                  f -= c[xp]; // else deduct codes from patterns
                }
              }
            }

            z = 1 << j; // table entries for j-bit table
            // allocate new table

            if (hn[0] + z > MANY) {
              // (note: doesn't matter for fixed)
              return Z_DATA_ERROR; // overflow of MANY
            }

            u[h] = q =
            /* hp+ */
            hn[0]; // DEBUG

            hn[0] += z; // connect to last table, if there is one

            if (h !== 0) {
              x[h] = i; // save pattern for backing up

              r[0] =
              /* (byte) */
              j; // bits in this table

              r[1] =
              /* (byte) */
              l; // bits to dump before this table

              j = i >>> w - l;
              r[2] =
              /* (int) */
              q - u[h - 1] - j; // offset to this table

              hp.set(r, (u[h - 1] + j) * 3); // to
              // last
              // table
            } else {
              t[0] = q; // first table is returned result
            }
          } // set up table entry in r


          r[1] =
          /* (byte) */
          k - w;

          if (p >= n) {
            r[0] = 128 + 64; // out of values--invalid code
          } else if (v[p] < s) {
            r[0] =
            /* (byte) */
            v[p] < 256 ? 0 : 32 + 64; // 256 is
            // end-of-block

            r[2] = v[p++]; // simple code is just the value
          } else {
            r[0] =
            /* (byte) */
            e[v[p] - s] + 16 + 64; // non-simple--look
            // up in lists

            r[2] = d[v[p++] - s];
          } // fill code-like entries with r


          f = 1 << k - w;

          for (j = i >>> w; j < z; j += f) {
            hp.set(r, (q + j) * 3);
          } // backwards increment the k-bit code i


          for (j = 1 << k - 1; (i & j) !== 0; j >>>= 1) {
            i ^= j;
          }

          i ^= j; // backup over finished tables

          mask = (1 << w) - 1; // needed on HP, cc -O bug

          while ((i & mask) != x[h]) {
            h--; // don't need to update q

            w -= l;
            mask = (1 << w) - 1;
          }
        }
      } // Return Z_BUF_ERROR if we were given an incomplete table


      return y !== 0 && g != 1 ? Z_BUF_ERROR : Z_OK;
    }

    function initWorkArea(vsize) {
      var i;

      if (!hn) {
        hn = []; // []; //new Array(1);

        v = []; // new Array(vsize);

        c = new Int32Array(BMAX + 1); // new Array(BMAX + 1);

        r = []; // new Array(3);

        u = new Int32Array(BMAX); // new Array(BMAX);

        x = new Int32Array(BMAX + 1); // new Array(BMAX + 1);
      }

      if (v.length < vsize) {
        v = []; // new Array(vsize);
      }

      for (i = 0; i < vsize; i++) {
        v[i] = 0;
      }

      for (i = 0; i < BMAX + 1; i++) {
        c[i] = 0;
      }

      for (i = 0; i < 3; i++) {
        r[i] = 0;
      } // for(int i=0; i<BMAX; i++){u[i]=0;}


      u.set(c.subarray(0, BMAX), 0); // for(int i=0; i<BMAX+1; i++){x[i]=0;}

      x.set(c.subarray(0, BMAX + 1), 0);
    }

    that.inflate_trees_bits = function (c, // 19 code lengths
    bb, // bits tree desired/actual depth
    tb, // bits tree result
    hp, // space for trees
    z // for messages
    ) {
      var result;
      initWorkArea(19);
      hn[0] = 0;
      result = huft_build(c, 0, 19, 19, null, null, tb, bb, hp, hn, v);

      if (result == Z_DATA_ERROR) {
        z.msg = "oversubscribed dynamic bit lengths tree";
      } else if (result == Z_BUF_ERROR || bb[0] === 0) {
        z.msg = "incomplete dynamic bit lengths tree";
        result = Z_DATA_ERROR;
      }

      return result;
    };

    that.inflate_trees_dynamic = function (nl, // number of literal/length codes
    nd, // number of distance codes
    c, // that many (total) code lengths
    bl, // literal desired/actual bit depth
    bd, // distance desired/actual bit depth
    tl, // literal/length tree result
    td, // distance tree result
    hp, // space for trees
    z // for messages
    ) {
      var result; // build literal/length tree

      initWorkArea(288);
      hn[0] = 0;
      result = huft_build(c, 0, nl, 257, cplens, cplext, tl, bl, hp, hn, v);

      if (result != Z_OK || bl[0] === 0) {
        if (result == Z_DATA_ERROR) {
          z.msg = "oversubscribed literal/length tree";
        } else if (result != Z_MEM_ERROR) {
          z.msg = "incomplete literal/length tree";
          result = Z_DATA_ERROR;
        }

        return result;
      } // build distance tree


      initWorkArea(288);
      result = huft_build(c, nl, nd, 0, cpdist, cpdext, td, bd, hp, hn, v);

      if (result != Z_OK || bd[0] === 0 && nl > 257) {
        if (result == Z_DATA_ERROR) {
          z.msg = "oversubscribed distance tree";
        } else if (result == Z_BUF_ERROR) {
          z.msg = "incomplete distance tree";
          result = Z_DATA_ERROR;
        } else if (result != Z_MEM_ERROR) {
          z.msg = "empty distance tree with lengths";
          result = Z_DATA_ERROR;
        }

        return result;
      }

      return Z_OK;
    };
  }

  InfTree.inflate_trees_fixed = function (bl, // literal desired/actual bit depth
  bd, // distance desired/actual bit depth
  tl, // literal/length tree result
  td // distance tree result
  ) {
    bl[0] = fixed_bl;
    bd[0] = fixed_bd;
    tl[0] = fixed_tl;
    td[0] = fixed_td;
    return Z_OK;
  }; // InfCodes
  // waiting for "i:"=input,
  // "o:"=output,
  // "x:"=nothing


  var START = 0; // x: set up for LEN

  var LEN = 1; // i: get length/literal/eob next

  var LENEXT = 2; // i: getting length extra (have base)

  var DIST = 3; // i: get distance next

  var DISTEXT = 4; // i: getting distance extra

  var COPY = 5; // o: copying bytes in win, waiting
  // for space

  var LIT = 6; // o: got literal, waiting for output
  // space

  var WASH = 7; // o: got eob, possibly still output
  // waiting

  var END = 8; // x: got eob and all data flushed

  var BADCODE = 9; // x: got error

  function InfCodes() {
    var that = this;
    var mode; // current inflate_codes mode
    // mode dependent information

    var len = 0;
    var tree; // pointer into tree

    var tree_index = 0;
    var need = 0; // bits needed

    var lit = 0; // if EXT or COPY, where and how much

    var get = 0; // bits to get for extra

    var dist = 0; // distance back to copy from

    var lbits = 0; // ltree bits decoded per branch

    var dbits = 0; // dtree bits decoder per branch

    var ltree; // literal/length/eob tree

    var ltree_index = 0; // literal/length/eob tree

    var dtree; // distance tree

    var dtree_index = 0; // distance tree
    // Called with number of bytes left to write in win at least 258
    // (the maximum string length) and number of input bytes available
    // at least ten. The ten bytes are six bytes for the longest length/
    // distance pair plus four bytes for overloading the bit buffer.

    function inflate_fast(bl, bd, tl, tl_index, td, td_index, s, z) {
      var t; // temporary pointer

      var tp; // temporary pointer

      var tp_index; // temporary pointer

      var e; // extra bits or operation

      var b; // bit buffer

      var k; // bits in bit buffer

      var p; // input data pointer

      var n; // bytes available there

      var q; // output win write pointer

      var m; // bytes to end of win or read pointer

      var ml; // mask for literal/length tree

      var md; // mask for distance tree

      var c; // bytes to copy

      var d; // distance back to copy from

      var r; // copy source pointer

      var tp_index_t_3; // (tp_index+t)*3
      // load input, output, bit values

      p = z.next_in_index;
      n = z.avail_in;
      b = s.bitb;
      k = s.bitk;
      q = s.write;
      m = q < s.read ? s.read - q - 1 : s.end - q; // initialize masks

      ml = inflate_mask[bl];
      md = inflate_mask[bd]; // do until not enough input or output space for fast loop

      do {
        // assume called with m >= 258 && n >= 10
        // get literal/length code
        while (k < 20) {
          // max bits for literal/length code
          n--;
          b |= (z.read_byte(p++) & 0xff) << k;
          k += 8;
        }

        t = b & ml;
        tp = tl;
        tp_index = tl_index;
        tp_index_t_3 = (tp_index + t) * 3;

        if ((e = tp[tp_index_t_3]) === 0) {
          b >>= tp[tp_index_t_3 + 1];
          k -= tp[tp_index_t_3 + 1];
          s.win[q++] =
          /* (byte) */
          tp[tp_index_t_3 + 2];
          m--;
          continue;
        }

        do {
          b >>= tp[tp_index_t_3 + 1];
          k -= tp[tp_index_t_3 + 1];

          if ((e & 16) !== 0) {
            e &= 15;
            c = tp[tp_index_t_3 + 2] + (
            /* (int) */
            b & inflate_mask[e]);
            b >>= e;
            k -= e; // decode distance base of block to copy

            while (k < 15) {
              // max bits for distance code
              n--;
              b |= (z.read_byte(p++) & 0xff) << k;
              k += 8;
            }

            t = b & md;
            tp = td;
            tp_index = td_index;
            tp_index_t_3 = (tp_index + t) * 3;
            e = tp[tp_index_t_3];

            do {
              b >>= tp[tp_index_t_3 + 1];
              k -= tp[tp_index_t_3 + 1];

              if ((e & 16) !== 0) {
                // get extra bits to add to distance base
                e &= 15;

                while (k < e) {
                  // get extra bits (up to 13)
                  n--;
                  b |= (z.read_byte(p++) & 0xff) << k;
                  k += 8;
                }

                d = tp[tp_index_t_3 + 2] + (b & inflate_mask[e]);
                b >>= e;
                k -= e; // do the copy

                m -= c;

                if (q >= d) {
                  // offset before dest
                  // just copy
                  r = q - d;

                  if (q - r > 0 && 2 > q - r) {
                    s.win[q++] = s.win[r++]; // minimum
                    // count is
                    // three,

                    s.win[q++] = s.win[r++]; // so unroll
                    // loop a
                    // little

                    c -= 2;
                  } else {
                    s.win.set(s.win.subarray(r, r + 2), q);
                    q += 2;
                    r += 2;
                    c -= 2;
                  }
                } else {
                  // else offset after destination
                  r = q - d;

                  do {
                    r += s.end; // force pointer in win
                  } while (r < 0); // covers invalid distances


                  e = s.end - r;

                  if (c > e) {
                    // if source crosses,
                    c -= e; // wrapped copy

                    if (q - r > 0 && e > q - r) {
                      do {
                        s.win[q++] = s.win[r++];
                      } while (--e !== 0);
                    } else {
                      s.win.set(s.win.subarray(r, r + e), q);
                      q += e;
                      r += e;
                      e = 0;
                    }

                    r = 0; // copy rest from start of win
                  }
                } // copy all or what's left


                if (q - r > 0 && c > q - r) {
                  do {
                    s.win[q++] = s.win[r++];
                  } while (--c !== 0);
                } else {
                  s.win.set(s.win.subarray(r, r + c), q);
                  q += c;
                  r += c;
                  c = 0;
                }

                break;
              } else if ((e & 64) === 0) {
                t += tp[tp_index_t_3 + 2];
                t += b & inflate_mask[e];
                tp_index_t_3 = (tp_index + t) * 3;
                e = tp[tp_index_t_3];
              } else {
                z.msg = "invalid distance code";
                c = z.avail_in - n;
                c = k >> 3 < c ? k >> 3 : c;
                n += c;
                p -= c;
                k -= c << 3;
                s.bitb = b;
                s.bitk = k;
                z.avail_in = n;
                z.total_in += p - z.next_in_index;
                z.next_in_index = p;
                s.write = q;
                return Z_DATA_ERROR;
              } // eslint-disable-next-line no-constant-condition

            } while (true);

            break;
          }

          if ((e & 64) === 0) {
            t += tp[tp_index_t_3 + 2];
            t += b & inflate_mask[e];
            tp_index_t_3 = (tp_index + t) * 3;

            if ((e = tp[tp_index_t_3]) === 0) {
              b >>= tp[tp_index_t_3 + 1];
              k -= tp[tp_index_t_3 + 1];
              s.win[q++] =
              /* (byte) */
              tp[tp_index_t_3 + 2];
              m--;
              break;
            }
          } else if ((e & 32) !== 0) {
            c = z.avail_in - n;
            c = k >> 3 < c ? k >> 3 : c;
            n += c;
            p -= c;
            k -= c << 3;
            s.bitb = b;
            s.bitk = k;
            z.avail_in = n;
            z.total_in += p - z.next_in_index;
            z.next_in_index = p;
            s.write = q;
            return Z_STREAM_END;
          } else {
            z.msg = "invalid literal/length code";
            c = z.avail_in - n;
            c = k >> 3 < c ? k >> 3 : c;
            n += c;
            p -= c;
            k -= c << 3;
            s.bitb = b;
            s.bitk = k;
            z.avail_in = n;
            z.total_in += p - z.next_in_index;
            z.next_in_index = p;
            s.write = q;
            return Z_DATA_ERROR;
          } // eslint-disable-next-line no-constant-condition

        } while (true);
      } while (m >= 258 && n >= 10); // not enough input or output--restore pointers and return


      c = z.avail_in - n;
      c = k >> 3 < c ? k >> 3 : c;
      n += c;
      p -= c;
      k -= c << 3;
      s.bitb = b;
      s.bitk = k;
      z.avail_in = n;
      z.total_in += p - z.next_in_index;
      z.next_in_index = p;
      s.write = q;
      return Z_OK;
    }

    that.init = function (bl, bd, tl, tl_index, td, td_index) {
      mode = START;
      lbits =
      /* (byte) */
      bl;
      dbits =
      /* (byte) */
      bd;
      ltree = tl;
      ltree_index = tl_index;
      dtree = td;
      dtree_index = td_index;
      tree = null;
    };

    that.proc = function (s, z, r) {
      var j; // temporary storage

      var tindex; // temporary pointer

      var e; // extra bits or operation

      var b = 0; // bit buffer

      var k = 0; // bits in bit buffer

      var p = 0; // input data pointer

      var n; // bytes available there

      var q; // output win write pointer

      var m; // bytes to end of win or read pointer

      var f; // pointer to copy strings from
      // copy input/output information to locals (UPDATE macro restores)

      p = z.next_in_index;
      n = z.avail_in;
      b = s.bitb;
      k = s.bitk;
      q = s.write;
      m = q < s.read ? s.read - q - 1 : s.end - q; // process input and output based on current state
      // eslint-disable-next-line no-constant-condition

      while (true) {
        switch (mode) {
          // waiting for "i:"=input, "o:"=output, "x:"=nothing
          case START:
            // x: set up for LEN
            if (m >= 258 && n >= 10) {
              s.bitb = b;
              s.bitk = k;
              z.avail_in = n;
              z.total_in += p - z.next_in_index;
              z.next_in_index = p;
              s.write = q;
              r = inflate_fast(lbits, dbits, ltree, ltree_index, dtree, dtree_index, s, z);
              p = z.next_in_index;
              n = z.avail_in;
              b = s.bitb;
              k = s.bitk;
              q = s.write;
              m = q < s.read ? s.read - q - 1 : s.end - q;

              if (r != Z_OK) {
                mode = r == Z_STREAM_END ? WASH : BADCODE;
                break;
              }
            }

            need = lbits;
            tree = ltree;
            tree_index = ltree_index;
            mode = LEN;

          /* falls through */

          case LEN:
            // i: get length/literal/eob next
            j = need;

            while (k < j) {
              if (n !== 0) r = Z_OK;else {
                s.bitb = b;
                s.bitk = k;
                z.avail_in = n;
                z.total_in += p - z.next_in_index;
                z.next_in_index = p;
                s.write = q;
                return s.inflate_flush(z, r);
              }
              n--;
              b |= (z.read_byte(p++) & 0xff) << k;
              k += 8;
            }

            tindex = (tree_index + (b & inflate_mask[j])) * 3;
            b >>>= tree[tindex + 1];
            k -= tree[tindex + 1];
            e = tree[tindex];

            if (e === 0) {
              // literal
              lit = tree[tindex + 2];
              mode = LIT;
              break;
            }

            if ((e & 16) !== 0) {
              // length
              get = e & 15;
              len = tree[tindex + 2];
              mode = LENEXT;
              break;
            }

            if ((e & 64) === 0) {
              // next table
              need = e;
              tree_index = tindex / 3 + tree[tindex + 2];
              break;
            }

            if ((e & 32) !== 0) {
              // end of block
              mode = WASH;
              break;
            }

            mode = BADCODE; // invalid code

            z.msg = "invalid literal/length code";
            r = Z_DATA_ERROR;
            s.bitb = b;
            s.bitk = k;
            z.avail_in = n;
            z.total_in += p - z.next_in_index;
            z.next_in_index = p;
            s.write = q;
            return s.inflate_flush(z, r);

          case LENEXT:
            // i: getting length extra (have base)
            j = get;

            while (k < j) {
              if (n !== 0) r = Z_OK;else {
                s.bitb = b;
                s.bitk = k;
                z.avail_in = n;
                z.total_in += p - z.next_in_index;
                z.next_in_index = p;
                s.write = q;
                return s.inflate_flush(z, r);
              }
              n--;
              b |= (z.read_byte(p++) & 0xff) << k;
              k += 8;
            }

            len += b & inflate_mask[j];
            b >>= j;
            k -= j;
            need = dbits;
            tree = dtree;
            tree_index = dtree_index;
            mode = DIST;

          /* falls through */

          case DIST:
            // i: get distance next
            j = need;

            while (k < j) {
              if (n !== 0) r = Z_OK;else {
                s.bitb = b;
                s.bitk = k;
                z.avail_in = n;
                z.total_in += p - z.next_in_index;
                z.next_in_index = p;
                s.write = q;
                return s.inflate_flush(z, r);
              }
              n--;
              b |= (z.read_byte(p++) & 0xff) << k;
              k += 8;
            }

            tindex = (tree_index + (b & inflate_mask[j])) * 3;
            b >>= tree[tindex + 1];
            k -= tree[tindex + 1];
            e = tree[tindex];

            if ((e & 16) !== 0) {
              // distance
              get = e & 15;
              dist = tree[tindex + 2];
              mode = DISTEXT;
              break;
            }

            if ((e & 64) === 0) {
              // next table
              need = e;
              tree_index = tindex / 3 + tree[tindex + 2];
              break;
            }

            mode = BADCODE; // invalid code

            z.msg = "invalid distance code";
            r = Z_DATA_ERROR;
            s.bitb = b;
            s.bitk = k;
            z.avail_in = n;
            z.total_in += p - z.next_in_index;
            z.next_in_index = p;
            s.write = q;
            return s.inflate_flush(z, r);

          case DISTEXT:
            // i: getting distance extra
            j = get;

            while (k < j) {
              if (n !== 0) r = Z_OK;else {
                s.bitb = b;
                s.bitk = k;
                z.avail_in = n;
                z.total_in += p - z.next_in_index;
                z.next_in_index = p;
                s.write = q;
                return s.inflate_flush(z, r);
              }
              n--;
              b |= (z.read_byte(p++) & 0xff) << k;
              k += 8;
            }

            dist += b & inflate_mask[j];
            b >>= j;
            k -= j;
            mode = COPY;

          /* falls through */

          case COPY:
            // o: copying bytes in win, waiting for space
            f = q - dist;

            while (f < 0) {
              // modulo win size-"while" instead
              f += s.end; // of "if" handles invalid distances
            }

            while (len !== 0) {
              if (m === 0) {
                if (q == s.end && s.read !== 0) {
                  q = 0;
                  m = q < s.read ? s.read - q - 1 : s.end - q;
                }

                if (m === 0) {
                  s.write = q;
                  r = s.inflate_flush(z, r);
                  q = s.write;
                  m = q < s.read ? s.read - q - 1 : s.end - q;

                  if (q == s.end && s.read !== 0) {
                    q = 0;
                    m = q < s.read ? s.read - q - 1 : s.end - q;
                  }

                  if (m === 0) {
                    s.bitb = b;
                    s.bitk = k;
                    z.avail_in = n;
                    z.total_in += p - z.next_in_index;
                    z.next_in_index = p;
                    s.write = q;
                    return s.inflate_flush(z, r);
                  }
                }
              }

              s.win[q++] = s.win[f++];
              m--;
              if (f == s.end) f = 0;
              len--;
            }

            mode = START;
            break;

          case LIT:
            // o: got literal, waiting for output space
            if (m === 0) {
              if (q == s.end && s.read !== 0) {
                q = 0;
                m = q < s.read ? s.read - q - 1 : s.end - q;
              }

              if (m === 0) {
                s.write = q;
                r = s.inflate_flush(z, r);
                q = s.write;
                m = q < s.read ? s.read - q - 1 : s.end - q;

                if (q == s.end && s.read !== 0) {
                  q = 0;
                  m = q < s.read ? s.read - q - 1 : s.end - q;
                }

                if (m === 0) {
                  s.bitb = b;
                  s.bitk = k;
                  z.avail_in = n;
                  z.total_in += p - z.next_in_index;
                  z.next_in_index = p;
                  s.write = q;
                  return s.inflate_flush(z, r);
                }
              }
            }

            r = Z_OK;
            s.win[q++] =
            /* (byte) */
            lit;
            m--;
            mode = START;
            break;

          case WASH:
            // o: got eob, possibly more output
            if (k > 7) {
              // return unused byte, if any
              k -= 8;
              n++;
              p--; // can always return one
            }

            s.write = q;
            r = s.inflate_flush(z, r);
            q = s.write;
            m = q < s.read ? s.read - q - 1 : s.end - q;

            if (s.read != s.write) {
              s.bitb = b;
              s.bitk = k;
              z.avail_in = n;
              z.total_in += p - z.next_in_index;
              z.next_in_index = p;
              s.write = q;
              return s.inflate_flush(z, r);
            }

            mode = END;

          /* falls through */

          case END:
            r = Z_STREAM_END;
            s.bitb = b;
            s.bitk = k;
            z.avail_in = n;
            z.total_in += p - z.next_in_index;
            z.next_in_index = p;
            s.write = q;
            return s.inflate_flush(z, r);

          case BADCODE:
            // x: got error
            r = Z_DATA_ERROR;
            s.bitb = b;
            s.bitk = k;
            z.avail_in = n;
            z.total_in += p - z.next_in_index;
            z.next_in_index = p;
            s.write = q;
            return s.inflate_flush(z, r);

          default:
            r = Z_STREAM_ERROR;
            s.bitb = b;
            s.bitk = k;
            z.avail_in = n;
            z.total_in += p - z.next_in_index;
            z.next_in_index = p;
            s.write = q;
            return s.inflate_flush(z, r);
        }
      }
    };

    that.free = function () {// ZFREE(z, c);
    };
  } // InfBlocks
  // Table for deflate from PKZIP's appnote.txt.


  var border = [// Order of the bit length code lengths
  16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
  var TYPE = 0; // get type bits (3, including end bit)

  var LENS = 1; // get lengths for stored

  var STORED = 2; // processing stored block

  var TABLE = 3; // get table lengths

  var BTREE = 4; // get bit lengths tree for a dynamic
  // block

  var DTREE = 5; // get length, distance trees for a
  // dynamic block

  var CODES = 6; // processing fixed or dynamic block

  var DRY = 7; // output remaining win bytes

  var DONELOCKS = 8; // finished last block, done

  var BADBLOCKS = 9; // ot a data error--stuck here

  function InfBlocks(z, w) {
    var that = this;
    var mode = TYPE; // current inflate_block mode

    var left = 0; // if STORED, bytes left to copy

    var table = 0; // table lengths (14 bits)

    var index = 0; // index into blens (or border)

    var blens; // bit lengths of codes

    var bb = [0]; // bit length tree depth

    var tb = [0]; // bit length decoding tree

    var codes = new InfCodes(); // if CODES, current state

    var last = 0; // true if this block is the last block

    var hufts = new Int32Array(MANY * 3); // single malloc for tree space

    var check = 0; // check on output

    var inftree = new InfTree();
    that.bitk = 0; // bits in bit buffer

    that.bitb = 0; // bit buffer

    that.win = new Uint8Array(w); // sliding win

    that.end = w; // one byte after sliding win

    that.read = 0; // win read pointer

    that.write = 0; // win write pointer

    that.reset = function (z, c) {
      if (c) c[0] = check; // if (mode == BTREE || mode == DTREE) {
      // }

      if (mode == CODES) {
        codes.free(z);
      }

      mode = TYPE;
      that.bitk = 0;
      that.bitb = 0;
      that.read = that.write = 0;
    };

    that.reset(z, null); // copy as much as possible from the sliding win to the output area

    that.inflate_flush = function (z, r) {
      var n;
      var p;
      var q; // local copies of source and destination pointers

      p = z.next_out_index;
      q = that.read; // compute number of bytes to copy as far as end of win

      n =
      /* (int) */
      (q <= that.write ? that.write : that.end) - q;
      if (n > z.avail_out) n = z.avail_out;
      if (n !== 0 && r == Z_BUF_ERROR) r = Z_OK; // update counters

      z.avail_out -= n;
      z.total_out += n; // copy as far as end of win

      z.next_out.set(that.win.subarray(q, q + n), p);
      p += n;
      q += n; // see if more to copy at beginning of win

      if (q == that.end) {
        // wrap pointers
        q = 0;
        if (that.write == that.end) that.write = 0; // compute bytes to copy

        n = that.write - q;
        if (n > z.avail_out) n = z.avail_out;
        if (n !== 0 && r == Z_BUF_ERROR) r = Z_OK; // update counters

        z.avail_out -= n;
        z.total_out += n; // copy

        z.next_out.set(that.win.subarray(q, q + n), p);
        p += n;
        q += n;
      } // update pointers


      z.next_out_index = p;
      that.read = q; // done

      return r;
    };

    that.proc = function (z, r) {
      var t; // temporary storage

      var b; // bit buffer

      var k; // bits in bit buffer

      var p; // input data pointer

      var n; // bytes available there

      var q; // output win write pointer

      var m; // bytes to end of win or read pointer

      var i; // copy input/output information to locals (UPDATE macro restores)
      // {

      p = z.next_in_index;
      n = z.avail_in;
      b = that.bitb;
      k = that.bitk; // }
      // {

      q = that.write;
      m =
      /* (int) */
      q < that.read ? that.read - q - 1 : that.end - q; // }
      // process input based on current state
      // DEBUG dtree
      // eslint-disable-next-line no-constant-condition

      while (true) {
        var bl = void 0,
            bd = void 0,
            tl = void 0,
            td = void 0,
            bl_ = void 0,
            bd_ = void 0,
            tl_ = void 0,
            td_ = void 0;

        switch (mode) {
          case TYPE:
            while (k < 3) {
              if (n !== 0) {
                r = Z_OK;
              } else {
                that.bitb = b;
                that.bitk = k;
                z.avail_in = n;
                z.total_in += p - z.next_in_index;
                z.next_in_index = p;
                that.write = q;
                return that.inflate_flush(z, r);
              }

              n--;
              b |= (z.read_byte(p++) & 0xff) << k;
              k += 8;
            }

            t =
            /* (int) */
            b & 7;
            last = t & 1;

            switch (t >>> 1) {
              case 0:
                // stored
                // {
                b >>>= 3;
                k -= 3; // }

                t = k & 7; // go to byte boundary
                // {

                b >>>= t;
                k -= t; // }

                mode = LENS; // get length of stored block

                break;

              case 1:
                // fixed
                // {
                bl = []; // new Array(1);

                bd = []; // new Array(1);

                tl = [[]]; // new Array(1);

                td = [[]]; // new Array(1);

                InfTree.inflate_trees_fixed(bl, bd, tl, td);
                codes.init(bl[0], bd[0], tl[0], 0, td[0], 0); // }
                // {

                b >>>= 3;
                k -= 3; // }

                mode = CODES;
                break;

              case 2:
                // dynamic
                // {
                b >>>= 3;
                k -= 3; // }

                mode = TABLE;
                break;

              case 3:
                // illegal
                // {
                b >>>= 3;
                k -= 3; // }

                mode = BADBLOCKS;
                z.msg = "invalid block type";
                r = Z_DATA_ERROR;
                that.bitb = b;
                that.bitk = k;
                z.avail_in = n;
                z.total_in += p - z.next_in_index;
                z.next_in_index = p;
                that.write = q;
                return that.inflate_flush(z, r);
            }

            break;

          case LENS:
            while (k < 32) {
              if (n !== 0) {
                r = Z_OK;
              } else {
                that.bitb = b;
                that.bitk = k;
                z.avail_in = n;
                z.total_in += p - z.next_in_index;
                z.next_in_index = p;
                that.write = q;
                return that.inflate_flush(z, r);
              }

              n--;
              b |= (z.read_byte(p++) & 0xff) << k;
              k += 8;
            }

            if ((~b >>> 16 & 0xffff) != (b & 0xffff)) {
              mode = BADBLOCKS;
              z.msg = "invalid stored block lengths";
              r = Z_DATA_ERROR;
              that.bitb = b;
              that.bitk = k;
              z.avail_in = n;
              z.total_in += p - z.next_in_index;
              z.next_in_index = p;
              that.write = q;
              return that.inflate_flush(z, r);
            }

            left = b & 0xffff;
            b = k = 0; // dump bits

            mode = left !== 0 ? STORED : last !== 0 ? DRY : TYPE;
            break;

          case STORED:
            if (n === 0) {
              that.bitb = b;
              that.bitk = k;
              z.avail_in = n;
              z.total_in += p - z.next_in_index;
              z.next_in_index = p;
              that.write = q;
              return that.inflate_flush(z, r);
            }

            if (m === 0) {
              if (q == that.end && that.read !== 0) {
                q = 0;
                m =
                /* (int) */
                q < that.read ? that.read - q - 1 : that.end - q;
              }

              if (m === 0) {
                that.write = q;
                r = that.inflate_flush(z, r);
                q = that.write;
                m =
                /* (int) */
                q < that.read ? that.read - q - 1 : that.end - q;

                if (q == that.end && that.read !== 0) {
                  q = 0;
                  m =
                  /* (int) */
                  q < that.read ? that.read - q - 1 : that.end - q;
                }

                if (m === 0) {
                  that.bitb = b;
                  that.bitk = k;
                  z.avail_in = n;
                  z.total_in += p - z.next_in_index;
                  z.next_in_index = p;
                  that.write = q;
                  return that.inflate_flush(z, r);
                }
              }
            }

            r = Z_OK;
            t = left;
            if (t > n) t = n;
            if (t > m) t = m;
            that.win.set(z.read_buf(p, t), q);
            p += t;
            n -= t;
            q += t;
            m -= t;
            if ((left -= t) !== 0) break;
            mode = last !== 0 ? DRY : TYPE;
            break;

          case TABLE:
            while (k < 14) {
              if (n !== 0) {
                r = Z_OK;
              } else {
                that.bitb = b;
                that.bitk = k;
                z.avail_in = n;
                z.total_in += p - z.next_in_index;
                z.next_in_index = p;
                that.write = q;
                return that.inflate_flush(z, r);
              }

              n--;
              b |= (z.read_byte(p++) & 0xff) << k;
              k += 8;
            }

            table = t = b & 0x3fff;

            if ((t & 0x1f) > 29 || (t >> 5 & 0x1f) > 29) {
              mode = BADBLOCKS;
              z.msg = "too many length or distance symbols";
              r = Z_DATA_ERROR;
              that.bitb = b;
              that.bitk = k;
              z.avail_in = n;
              z.total_in += p - z.next_in_index;
              z.next_in_index = p;
              that.write = q;
              return that.inflate_flush(z, r);
            }

            t = 258 + (t & 0x1f) + (t >> 5 & 0x1f);

            if (!blens || blens.length < t) {
              blens = []; // new Array(t);
            } else {
              for (i = 0; i < t; i++) {
                blens[i] = 0;
              }
            } // {


            b >>>= 14;
            k -= 14; // }

            index = 0;
            mode = BTREE;

          /* falls through */

          case BTREE:
            while (index < 4 + (table >>> 10)) {
              while (k < 3) {
                if (n !== 0) {
                  r = Z_OK;
                } else {
                  that.bitb = b;
                  that.bitk = k;
                  z.avail_in = n;
                  z.total_in += p - z.next_in_index;
                  z.next_in_index = p;
                  that.write = q;
                  return that.inflate_flush(z, r);
                }

                n--;
                b |= (z.read_byte(p++) & 0xff) << k;
                k += 8;
              }

              blens[border[index++]] = b & 7; // {

              b >>>= 3;
              k -= 3; // }
            }

            while (index < 19) {
              blens[border[index++]] = 0;
            }

            bb[0] = 7;
            t = inftree.inflate_trees_bits(blens, bb, tb, hufts, z);

            if (t != Z_OK) {
              r = t;

              if (r == Z_DATA_ERROR) {
                blens = null;
                mode = BADBLOCKS;
              }

              that.bitb = b;
              that.bitk = k;
              z.avail_in = n;
              z.total_in += p - z.next_in_index;
              z.next_in_index = p;
              that.write = q;
              return that.inflate_flush(z, r);
            }

            index = 0;
            mode = DTREE;

          /* falls through */

          case DTREE:
            // eslint-disable-next-line no-constant-condition
            while (true) {
              t = table;

              if (index >= 258 + (t & 0x1f) + (t >> 5 & 0x1f)) {
                break;
              }

              var j = void 0,
                  c = void 0;
              t = bb[0];

              while (k < t) {
                if (n !== 0) {
                  r = Z_OK;
                } else {
                  that.bitb = b;
                  that.bitk = k;
                  z.avail_in = n;
                  z.total_in += p - z.next_in_index;
                  z.next_in_index = p;
                  that.write = q;
                  return that.inflate_flush(z, r);
                }

                n--;
                b |= (z.read_byte(p++) & 0xff) << k;
                k += 8;
              } // if (tb[0] == -1) {
              // System.err.println("null...");
              // }


              t = hufts[(tb[0] + (b & inflate_mask[t])) * 3 + 1];
              c = hufts[(tb[0] + (b & inflate_mask[t])) * 3 + 2];

              if (c < 16) {
                b >>>= t;
                k -= t;
                blens[index++] = c;
              } else {
                // c == 16..18
                i = c == 18 ? 7 : c - 14;
                j = c == 18 ? 11 : 3;

                while (k < t + i) {
                  if (n !== 0) {
                    r = Z_OK;
                  } else {
                    that.bitb = b;
                    that.bitk = k;
                    z.avail_in = n;
                    z.total_in += p - z.next_in_index;
                    z.next_in_index = p;
                    that.write = q;
                    return that.inflate_flush(z, r);
                  }

                  n--;
                  b |= (z.read_byte(p++) & 0xff) << k;
                  k += 8;
                }

                b >>>= t;
                k -= t;
                j += b & inflate_mask[i];
                b >>>= i;
                k -= i;
                i = index;
                t = table;

                if (i + j > 258 + (t & 0x1f) + (t >> 5 & 0x1f) || c == 16 && i < 1) {
                  blens = null;
                  mode = BADBLOCKS;
                  z.msg = "invalid bit length repeat";
                  r = Z_DATA_ERROR;
                  that.bitb = b;
                  that.bitk = k;
                  z.avail_in = n;
                  z.total_in += p - z.next_in_index;
                  z.next_in_index = p;
                  that.write = q;
                  return that.inflate_flush(z, r);
                }

                c = c == 16 ? blens[i - 1] : 0;

                do {
                  blens[i++] = c;
                } while (--j !== 0);

                index = i;
              }
            }

            tb[0] = -1; // {

            bl_ = []; // new Array(1);

            bd_ = []; // new Array(1);

            tl_ = []; // new Array(1);

            td_ = []; // new Array(1);

            bl_[0] = 9; // must be <= 9 for lookahead assumptions

            bd_[0] = 6; // must be <= 9 for lookahead assumptions

            t = table;
            t = inftree.inflate_trees_dynamic(257 + (t & 0x1f), 1 + (t >> 5 & 0x1f), blens, bl_, bd_, tl_, td_, hufts, z);

            if (t != Z_OK) {
              if (t == Z_DATA_ERROR) {
                blens = null;
                mode = BADBLOCKS;
              }

              r = t;
              that.bitb = b;
              that.bitk = k;
              z.avail_in = n;
              z.total_in += p - z.next_in_index;
              z.next_in_index = p;
              that.write = q;
              return that.inflate_flush(z, r);
            }

            codes.init(bl_[0], bd_[0], hufts, tl_[0], hufts, td_[0]); // }

            mode = CODES;

          /* falls through */

          case CODES:
            that.bitb = b;
            that.bitk = k;
            z.avail_in = n;
            z.total_in += p - z.next_in_index;
            z.next_in_index = p;
            that.write = q;

            if ((r = codes.proc(that, z, r)) != Z_STREAM_END) {
              return that.inflate_flush(z, r);
            }

            r = Z_OK;
            codes.free(z);
            p = z.next_in_index;
            n = z.avail_in;
            b = that.bitb;
            k = that.bitk;
            q = that.write;
            m =
            /* (int) */
            q < that.read ? that.read - q - 1 : that.end - q;

            if (last === 0) {
              mode = TYPE;
              break;
            }

            mode = DRY;

          /* falls through */

          case DRY:
            that.write = q;
            r = that.inflate_flush(z, r);
            q = that.write;
            m =
            /* (int) */
            q < that.read ? that.read - q - 1 : that.end - q;

            if (that.read != that.write) {
              that.bitb = b;
              that.bitk = k;
              z.avail_in = n;
              z.total_in += p - z.next_in_index;
              z.next_in_index = p;
              that.write = q;
              return that.inflate_flush(z, r);
            }

            mode = DONELOCKS;

          /* falls through */

          case DONELOCKS:
            r = Z_STREAM_END;
            that.bitb = b;
            that.bitk = k;
            z.avail_in = n;
            z.total_in += p - z.next_in_index;
            z.next_in_index = p;
            that.write = q;
            return that.inflate_flush(z, r);

          case BADBLOCKS:
            r = Z_DATA_ERROR;
            that.bitb = b;
            that.bitk = k;
            z.avail_in = n;
            z.total_in += p - z.next_in_index;
            z.next_in_index = p;
            that.write = q;
            return that.inflate_flush(z, r);

          default:
            r = Z_STREAM_ERROR;
            that.bitb = b;
            that.bitk = k;
            z.avail_in = n;
            z.total_in += p - z.next_in_index;
            z.next_in_index = p;
            that.write = q;
            return that.inflate_flush(z, r);
        }
      }
    };

    that.free = function (z) {
      that.reset(z, null);
      that.win = null;
      hufts = null; // ZFREE(z, s);
    };

    that.set_dictionary = function (d, start, n) {
      that.win.set(d.subarray(start, start + n), 0);
      that.read = that.write = n;
    }; // Returns true if inflate is currently at the end of a block generated
    // by Z_SYNC_FLUSH or Z_FULL_FLUSH.


    that.sync_point = function () {
      return mode == LENS ? 1 : 0;
    };
  } // Inflate
  // preset dictionary flag in zlib header


  var PRESET_DICT = 0x20;
  var Z_DEFLATED = 8;
  var METHOD = 0; // waiting for method byte

  var FLAG = 1; // waiting for flag byte

  var DICT4 = 2; // four dictionary check bytes to go

  var DICT3 = 3; // three dictionary check bytes to go

  var DICT2 = 4; // two dictionary check bytes to go

  var DICT1 = 5; // one dictionary check byte to go

  var DICT0 = 6; // waiting for inflateSetDictionary

  var BLOCKS = 7; // decompressing blocks

  var DONE = 12; // finished check, done

  var BAD = 13; // got an error--stay here

  var mark = [0, 0, 0xff, 0xff];

  function Inflate$1() {
    var that = this;
    that.mode = 0; // current inflate mode
    // mode dependent information

    that.method = 0; // if FLAGS, method byte
    // if CHECK, check values to compare

    that.was = [0]; // new Array(1); // computed check value

    that.need = 0; // stream check value
    // if BAD, inflateSync's marker bytes count

    that.marker = 0; // mode independent information

    that.wbits = 0; // log2(win size) (8..15, defaults to 15)
    // this.blocks; // current inflate_blocks state

    function inflateReset(z) {
      if (!z || !z.istate) return Z_STREAM_ERROR;
      z.total_in = z.total_out = 0;
      z.msg = null;
      z.istate.mode = BLOCKS;
      z.istate.blocks.reset(z, null);
      return Z_OK;
    }

    that.inflateEnd = function (z) {
      if (that.blocks) that.blocks.free(z);
      that.blocks = null; // ZFREE(z, z->state);

      return Z_OK;
    };

    that.inflateInit = function (z, w) {
      z.msg = null;
      that.blocks = null; // set win size

      if (w < 8 || w > 15) {
        that.inflateEnd(z);
        return Z_STREAM_ERROR;
      }

      that.wbits = w;
      z.istate.blocks = new InfBlocks(z, 1 << w); // reset state

      inflateReset(z);
      return Z_OK;
    };

    that.inflate = function (z, f) {
      var r;
      var b;
      if (!z || !z.istate || !z.next_in) return Z_STREAM_ERROR;
      var istate = z.istate;
      f = f == Z_FINISH ? Z_BUF_ERROR : Z_OK;
      r = Z_BUF_ERROR; // eslint-disable-next-line no-constant-condition

      while (true) {
        switch (istate.mode) {
          case METHOD:
            if (z.avail_in === 0) return r;
            r = f;
            z.avail_in--;
            z.total_in++;

            if (((istate.method = z.read_byte(z.next_in_index++)) & 0xf) != Z_DEFLATED) {
              istate.mode = BAD;
              z.msg = "unknown compression method";
              istate.marker = 5; // can't try inflateSync

              break;
            }

            if ((istate.method >> 4) + 8 > istate.wbits) {
              istate.mode = BAD;
              z.msg = "invalid win size";
              istate.marker = 5; // can't try inflateSync

              break;
            }

            istate.mode = FLAG;

          /* falls through */

          case FLAG:
            if (z.avail_in === 0) return r;
            r = f;
            z.avail_in--;
            z.total_in++;
            b = z.read_byte(z.next_in_index++) & 0xff;

            if (((istate.method << 8) + b) % 31 !== 0) {
              istate.mode = BAD;
              z.msg = "incorrect header check";
              istate.marker = 5; // can't try inflateSync

              break;
            }

            if ((b & PRESET_DICT) === 0) {
              istate.mode = BLOCKS;
              break;
            }

            istate.mode = DICT4;

          /* falls through */

          case DICT4:
            if (z.avail_in === 0) return r;
            r = f;
            z.avail_in--;
            z.total_in++;
            istate.need = (z.read_byte(z.next_in_index++) & 0xff) << 24 & 0xff000000;
            istate.mode = DICT3;

          /* falls through */

          case DICT3:
            if (z.avail_in === 0) return r;
            r = f;
            z.avail_in--;
            z.total_in++;
            istate.need += (z.read_byte(z.next_in_index++) & 0xff) << 16 & 0xff0000;
            istate.mode = DICT2;

          /* falls through */

          case DICT2:
            if (z.avail_in === 0) return r;
            r = f;
            z.avail_in--;
            z.total_in++;
            istate.need += (z.read_byte(z.next_in_index++) & 0xff) << 8 & 0xff00;
            istate.mode = DICT1;

          /* falls through */

          case DICT1:
            if (z.avail_in === 0) return r;
            r = f;
            z.avail_in--;
            z.total_in++;
            istate.need += z.read_byte(z.next_in_index++) & 0xff;
            istate.mode = DICT0;
            return Z_NEED_DICT;

          case DICT0:
            istate.mode = BAD;
            z.msg = "need dictionary";
            istate.marker = 0; // can try inflateSync

            return Z_STREAM_ERROR;

          case BLOCKS:
            r = istate.blocks.proc(z, r);

            if (r == Z_DATA_ERROR) {
              istate.mode = BAD;
              istate.marker = 0; // can try inflateSync

              break;
            }

            if (r == Z_OK) {
              r = f;
            }

            if (r != Z_STREAM_END) {
              return r;
            }

            r = f;
            istate.blocks.reset(z, istate.was);
            istate.mode = DONE;

          /* falls through */

          case DONE:
            z.avail_in = 0;
            return Z_STREAM_END;

          case BAD:
            return Z_DATA_ERROR;

          default:
            return Z_STREAM_ERROR;
        }
      }
    };

    that.inflateSetDictionary = function (z, dictionary, dictLength) {
      var index = 0,
          length = dictLength;
      if (!z || !z.istate || z.istate.mode != DICT0) return Z_STREAM_ERROR;
      var istate = z.istate;

      if (length >= 1 << istate.wbits) {
        length = (1 << istate.wbits) - 1;
        index = dictLength - length;
      }

      istate.blocks.set_dictionary(dictionary, index, length);
      istate.mode = BLOCKS;
      return Z_OK;
    };

    that.inflateSync = function (z) {
      var n; // number of bytes to look at

      var p; // pointer to bytes

      var m; // number of marker bytes found in a row

      var r, w; // temporaries to save total_in and total_out
      // set up

      if (!z || !z.istate) return Z_STREAM_ERROR;
      var istate = z.istate;

      if (istate.mode != BAD) {
        istate.mode = BAD;
        istate.marker = 0;
      }

      if ((n = z.avail_in) === 0) return Z_BUF_ERROR;
      p = z.next_in_index;
      m = istate.marker; // search

      while (n !== 0 && m < 4) {
        if (z.read_byte(p) == mark[m]) {
          m++;
        } else if (z.read_byte(p) !== 0) {
          m = 0;
        } else {
          m = 4 - m;
        }

        p++;
        n--;
      } // restore


      z.total_in += p - z.next_in_index;
      z.next_in_index = p;
      z.avail_in = n;
      istate.marker = m; // return no joy or set up to restart on a new block

      if (m != 4) {
        return Z_DATA_ERROR;
      }

      r = z.total_in;
      w = z.total_out;
      inflateReset(z);
      z.total_in = r;
      z.total_out = w;
      istate.mode = BLOCKS;
      return Z_OK;
    }; // Returns true if inflate is currently at the end of a block generated
    // by Z_SYNC_FLUSH or Z_FULL_FLUSH. This function is used by one PPP
    // implementation to provide an additional safety check. PPP uses
    // Z_SYNC_FLUSH
    // but removes the length bytes of the resulting empty stored block. When
    // decompressing, PPP checks that at the end of input packet, inflate is
    // waiting for these length bytes.


    that.inflateSyncPoint = function (z) {
      if (!z || !z.istate || !z.istate.blocks) return Z_STREAM_ERROR;
      return z.istate.blocks.sync_point();
    };
  } // ZStream


  function ZStream() {}

  ZStream.prototype = {
    inflateInit: function inflateInit(bits) {
      var that = this;
      that.istate = new Inflate$1();
      if (!bits) bits = MAX_BITS;
      return that.istate.inflateInit(that, bits);
    },
    inflate: function inflate(f) {
      var that = this;
      if (!that.istate) return Z_STREAM_ERROR;
      return that.istate.inflate(that, f);
    },
    inflateEnd: function inflateEnd() {
      var that = this;
      if (!that.istate) return Z_STREAM_ERROR;
      var ret = that.istate.inflateEnd(that);
      that.istate = null;
      return ret;
    },
    inflateSync: function inflateSync() {
      var that = this;
      if (!that.istate) return Z_STREAM_ERROR;
      return that.istate.inflateSync(that);
    },
    inflateSetDictionary: function inflateSetDictionary(dictionary, dictLength) {
      var that = this;
      if (!that.istate) return Z_STREAM_ERROR;
      return that.istate.inflateSetDictionary(that, dictionary, dictLength);
    },
    read_byte: function read_byte(start) {
      var that = this;
      return that.next_in[start];
    },
    read_buf: function read_buf(start, size) {
      var that = this;
      return that.next_in.subarray(start, start + size);
    }
  }; // Inflater

  function ZipInflate(options) {
    var that = this;
    var z = new ZStream();
    var bufsize = options && options.chunkSize ? Math.floor(options.chunkSize * 2) : 128 * 1024;
    var flush = Z_NO_FLUSH;
    var buf = new Uint8Array(bufsize);
    var nomoreinput = false;
    z.inflateInit();
    z.next_out = buf;

    that.append = function (data, onprogress) {
      var buffers = [];
      var err,
          array,
          lastIndex = 0,
          bufferIndex = 0,
          bufferSize = 0;
      if (data.length === 0) return;
      z.next_in_index = 0;
      z.next_in = data;
      z.avail_in = data.length;

      do {
        z.next_out_index = 0;
        z.avail_out = bufsize;

        if (z.avail_in === 0 && !nomoreinput) {
          // if buffer is empty and more input is available, refill it
          z.next_in_index = 0;
          nomoreinput = true;
        }

        err = z.inflate(flush);

        if (nomoreinput && err === Z_BUF_ERROR) {
          if (z.avail_in !== 0) throw new Error("inflating: bad input");
        } else if (err !== Z_OK && err !== Z_STREAM_END) throw new Error("inflating: " + z.msg);

        if ((nomoreinput || err === Z_STREAM_END) && z.avail_in === data.length) throw new Error("inflating: bad input");
        if (z.next_out_index) if (z.next_out_index === bufsize) buffers.push(new Uint8Array(buf));else buffers.push(buf.slice(0, z.next_out_index));
        bufferSize += z.next_out_index;

        if (onprogress && z.next_in_index > 0 && z.next_in_index != lastIndex) {
          onprogress(z.next_in_index);
          lastIndex = z.next_in_index;
        }
      } while (z.avail_in > 0 || z.avail_out === 0);

      if (buffers.length > 1) {
        array = new Uint8Array(bufferSize);
        buffers.forEach(function (chunk) {
          array.set(chunk, bufferIndex);
          bufferIndex += chunk.length;
        });
      } else {
        array = buffers[0] || new Uint8Array(0);
      }

      return array;
    };

    that.flush = function () {
      z.inflateEnd();
    };
  }

  var DESCRIPTORS$8 = descriptors;
  var uncurryThis$l = functionUncurryThis;
  var call$f = functionCall;
  var fails$i = fails$H;
  var objectKeys$2 = objectKeys$4;
  var getOwnPropertySymbolsModule$2 = objectGetOwnPropertySymbols;
  var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
  var toObject$4 = toObject$d;
  var IndexedObject = indexedObject;

  // eslint-disable-next-line es-x/no-object-assign -- safe
  var $assign = Object.assign;
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  var defineProperty$7 = Object.defineProperty;
  var concat$2 = uncurryThis$l([].concat);

  // `Object.assign` method
  // https://tc39.es/ecma262/#sec-object.assign
  var objectAssign = !$assign || fails$i(function () {
    // should have correct order of operations (Edge bug)
    if (DESCRIPTORS$8 && $assign({ b: 1 }, $assign(defineProperty$7({}, 'a', {
      enumerable: true,
      get: function () {
        defineProperty$7(this, 'b', {
          value: 3,
          enumerable: false
        });
      }
    }), { b: 2 })).b !== 1) return true;
    // should work with symbols and should have deterministic property order (V8 bug)
    var A = {};
    var B = {};
    // eslint-disable-next-line es-x/no-symbol -- safe
    var symbol = Symbol();
    var alphabet = 'abcdefghijklmnopqrst';
    A[symbol] = 7;
    alphabet.split('').forEach(function (chr) { B[chr] = chr; });
    return $assign({}, A)[symbol] != 7 || objectKeys$2($assign({}, B)).join('') != alphabet;
  }) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
    var T = toObject$4(target);
    var argumentsLength = arguments.length;
    var index = 1;
    var getOwnPropertySymbols = getOwnPropertySymbolsModule$2.f;
    var propertyIsEnumerable = propertyIsEnumerableModule$1.f;
    while (argumentsLength > index) {
      var S = IndexedObject(arguments[index++]);
      var keys = getOwnPropertySymbols ? concat$2(objectKeys$2(S), getOwnPropertySymbols(S)) : objectKeys$2(S);
      var length = keys.length;
      var j = 0;
      var key;
      while (length > j) {
        key = keys[j++];
        if (!DESCRIPTORS$8 || call$f(propertyIsEnumerable, S, key)) T[key] = S[key];
      }
    } return T;
  } : $assign;

  var $$t = _export;
  var assign$1 = objectAssign;

  // `Object.assign` method
  // https://tc39.es/ecma262/#sec-object.assign
  // eslint-disable-next-line es-x/no-object-assign -- required for testing
  $$t({ target: 'Object', stat: true, arity: 2, forced: Object.assign !== assign$1 }, {
    assign: assign$1
  });

  /*
   Copyright (c) 2022 Gildas Lormeau. All rights reserved.

   Redistribution and use in source and binary forms, with or without
   modification, are permitted provided that the following conditions are met:

   1. Redistributions of source code must retain the above copyright notice,
   this list of conditions and the following disclaimer.

   2. Redistributions in binary form must reproduce the above copyright 
   notice, this list of conditions and the following disclaimer in 
   the documentation and/or other materials provided with the distribution.

   3. The names of the authors may not be used to endorse or promote products
   derived from this software without specific prior written permission.

   THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
   INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
   FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
   INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
   INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
   LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
   OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
   EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   */

  /* global navigator */
  var DEFAULT_CONFIGURATION = {
    chunkSize: 512 * 1024,
    maxWorkers: typeof navigator != "undefined" && navigator.hardwareConcurrency || 2,
    terminateWorkerTimeout: 5000,
    useWebWorkers: true,
    workerScripts: undefined
  };
  var config = Object.assign({}, DEFAULT_CONFIGURATION);

  function getConfiguration() {
    return config;
  }

  function configure(configuration) {
    if (configuration.baseURL !== undefined) {
      config.baseURL = configuration.baseURL;
    }

    if (configuration.chunkSize !== undefined) {
      config.chunkSize = configuration.chunkSize;
    }

    if (configuration.maxWorkers !== undefined) {
      config.maxWorkers = configuration.maxWorkers;
    }

    if (configuration.terminateWorkerTimeout !== undefined) {
      config.terminateWorkerTimeout = configuration.terminateWorkerTimeout;
    }

    if (configuration.useWebWorkers !== undefined) {
      config.useWebWorkers = configuration.useWebWorkers;
    }

    if (configuration.Deflate !== undefined) {
      config.Deflate = configuration.Deflate;
    }

    if (configuration.Inflate !== undefined) {
      config.Inflate = configuration.Inflate;
    }

    if (configuration.workerScripts !== undefined) {
      if (configuration.workerScripts.deflate) {
        if (!Array.isArray(configuration.workerScripts.deflate)) {
          throw new Error("workerScripts.deflate must be an array");
        }

        if (!config.workerScripts) {
          config.workerScripts = {};
        }

        config.workerScripts.deflate = configuration.workerScripts.deflate;
      }

      if (configuration.workerScripts.inflate) {
        if (!Array.isArray(configuration.workerScripts.inflate)) {
          throw new Error("workerScripts.inflate must be an array");
        }

        if (!config.workerScripts) {
          config.workerScripts = {};
        }

        config.workerScripts.inflate = configuration.workerScripts.inflate;
      }
    }
  }

  var classof$6 = classof$d;

  var $String = String;

  var toString$a = function (argument) {
    if (classof$6(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
    return $String(argument);
  };

  var anObject$9 = anObject$i;

  // `RegExp.prototype.flags` getter implementation
  // https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
  var regexpFlags$1 = function () {
    var that = anObject$9(this);
    var result = '';
    if (that.hasIndices) result += 'd';
    if (that.global) result += 'g';
    if (that.ignoreCase) result += 'i';
    if (that.multiline) result += 'm';
    if (that.dotAll) result += 's';
    if (that.unicode) result += 'u';
    if (that.sticky) result += 'y';
    return result;
  };

  var fails$h = fails$H;
  var global$m = global$F;

  // babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var $RegExp$2 = global$m.RegExp;

  var UNSUPPORTED_Y$2 = fails$h(function () {
    var re = $RegExp$2('a', 'y');
    re.lastIndex = 2;
    return re.exec('abcd') != null;
  });

  // UC Browser bug
  // https://github.com/zloirock/core-js/issues/1008
  var MISSED_STICKY = UNSUPPORTED_Y$2 || fails$h(function () {
    return !$RegExp$2('a', 'y').sticky;
  });

  var BROKEN_CARET = UNSUPPORTED_Y$2 || fails$h(function () {
    // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
    var re = $RegExp$2('^r', 'gy');
    re.lastIndex = 2;
    return re.exec('str') != null;
  });

  var regexpStickyHelpers = {
    BROKEN_CARET: BROKEN_CARET,
    MISSED_STICKY: MISSED_STICKY,
    UNSUPPORTED_Y: UNSUPPORTED_Y$2
  };

  var fails$g = fails$H;
  var global$l = global$F;

  // babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
  var $RegExp$1 = global$l.RegExp;

  var regexpUnsupportedDotAll = fails$g(function () {
    var re = $RegExp$1('.', 's');
    return !(re.dotAll && re.exec('\n') && re.flags === 's');
  });

  var fails$f = fails$H;
  var global$k = global$F;

  // babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
  var $RegExp = global$k.RegExp;

  var regexpUnsupportedNcg = fails$f(function () {
    var re = $RegExp('(?<a>b)', 'g');
    return re.exec('b').groups.a !== 'b' ||
      'b'.replace(re, '$<a>c') !== 'bc';
  });

  /* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
  /* eslint-disable regexp/no-useless-quantifier -- testing */
  var call$e = functionCall;
  var uncurryThis$k = functionUncurryThis;
  var toString$9 = toString$a;
  var regexpFlags = regexpFlags$1;
  var stickyHelpers$1 = regexpStickyHelpers;
  var shared$3 = shared$7.exports;
  var create$2 = objectCreate;
  var getInternalState$2 = internalState.get;
  var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
  var UNSUPPORTED_NCG = regexpUnsupportedNcg;

  var nativeReplace = shared$3('native-string-replace', String.prototype.replace);
  var nativeExec = RegExp.prototype.exec;
  var patchedExec = nativeExec;
  var charAt$7 = uncurryThis$k(''.charAt);
  var indexOf = uncurryThis$k(''.indexOf);
  var replace$7 = uncurryThis$k(''.replace);
  var stringSlice$8 = uncurryThis$k(''.slice);

  var UPDATES_LAST_INDEX_WRONG = (function () {
    var re1 = /a/;
    var re2 = /b*/g;
    call$e(nativeExec, re1, 'a');
    call$e(nativeExec, re2, 'a');
    return re1.lastIndex !== 0 || re2.lastIndex !== 0;
  })();

  var UNSUPPORTED_Y$1 = stickyHelpers$1.BROKEN_CARET;

  // nonparticipating capturing group, copied from es5-shim's String#split patch.
  var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

  var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1 || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

  if (PATCH) {
    patchedExec = function exec(string) {
      var re = this;
      var state = getInternalState$2(re);
      var str = toString$9(string);
      var raw = state.raw;
      var result, reCopy, lastIndex, match, i, object, group;

      if (raw) {
        raw.lastIndex = re.lastIndex;
        result = call$e(patchedExec, raw, str);
        re.lastIndex = raw.lastIndex;
        return result;
      }

      var groups = state.groups;
      var sticky = UNSUPPORTED_Y$1 && re.sticky;
      var flags = call$e(regexpFlags, re);
      var source = re.source;
      var charsAdded = 0;
      var strCopy = str;

      if (sticky) {
        flags = replace$7(flags, 'y', '');
        if (indexOf(flags, 'g') === -1) {
          flags += 'g';
        }

        strCopy = stringSlice$8(str, re.lastIndex);
        // Support anchored sticky behavior.
        if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt$7(str, re.lastIndex - 1) !== '\n')) {
          source = '(?: ' + source + ')';
          strCopy = ' ' + strCopy;
          charsAdded++;
        }
        // ^(? + rx + ) is needed, in combination with some str slicing, to
        // simulate the 'y' flag.
        reCopy = new RegExp('^(?:' + source + ')', flags);
      }

      if (NPCG_INCLUDED) {
        reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
      }
      if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

      match = call$e(nativeExec, sticky ? reCopy : re, strCopy);

      if (sticky) {
        if (match) {
          match.input = stringSlice$8(match.input, charsAdded);
          match[0] = stringSlice$8(match[0], charsAdded);
          match.index = re.lastIndex;
          re.lastIndex += match[0].length;
        } else re.lastIndex = 0;
      } else if (UPDATES_LAST_INDEX_WRONG && match) {
        re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
      }
      if (NPCG_INCLUDED && match && match.length > 1) {
        // Fix browsers whose `exec` methods don't consistently return `undefined`
        // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
        call$e(nativeReplace, match[0], reCopy, function () {
          for (i = 1; i < arguments.length - 2; i++) {
            if (arguments[i] === undefined) match[i] = undefined;
          }
        });
      }

      if (match && groups) {
        match.groups = object = create$2(null);
        for (i = 0; i < groups.length; i++) {
          group = groups[i];
          object[group[0]] = match[group[1]];
        }
      }

      return match;
    };
  }

  var regexpExec$3 = patchedExec;

  var $$s = _export;
  var exec$4 = regexpExec$3;

  // `RegExp.prototype.exec` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.exec
  $$s({ target: 'RegExp', proto: true, forced: /./.exec !== exec$4 }, {
    exec: exec$4
  });

  // TODO: Remove from `core-js@4` since it's moved to entry points

  var uncurryThis$j = functionUncurryThis;
  var defineBuiltIn$8 = defineBuiltIn$f;
  var regexpExec$2 = regexpExec$3;
  var fails$e = fails$H;
  var wellKnownSymbol$a = wellKnownSymbol$t;
  var createNonEnumerableProperty$2 = createNonEnumerableProperty$a;

  var SPECIES$1 = wellKnownSymbol$a('species');
  var RegExpPrototype = RegExp.prototype;

  var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
    var SYMBOL = wellKnownSymbol$a(KEY);

    var DELEGATES_TO_SYMBOL = !fails$e(function () {
      // String methods call symbol-named RegEp methods
      var O = {};
      O[SYMBOL] = function () { return 7; };
      return ''[KEY](O) != 7;
    });

    var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$e(function () {
      // Symbol-named RegExp methods call .exec
      var execCalled = false;
      var re = /a/;

      if (KEY === 'split') {
        // We can't use real regex here since it causes deoptimization
        // and serious performance degradation in V8
        // https://github.com/zloirock/core-js/issues/306
        re = {};
        // RegExp[@@split] doesn't call the regex's exec method, but first creates
        // a new one. We need to return the patched regex when creating the new one.
        re.constructor = {};
        re.constructor[SPECIES$1] = function () { return re; };
        re.flags = '';
        re[SYMBOL] = /./[SYMBOL];
      }

      re.exec = function () { execCalled = true; return null; };

      re[SYMBOL]('');
      return !execCalled;
    });

    if (
      !DELEGATES_TO_SYMBOL ||
      !DELEGATES_TO_EXEC ||
      FORCED
    ) {
      var uncurriedNativeRegExpMethod = uncurryThis$j(/./[SYMBOL]);
      var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
        var uncurriedNativeMethod = uncurryThis$j(nativeMethod);
        var $exec = regexp.exec;
        if ($exec === regexpExec$2 || $exec === RegExpPrototype.exec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: uncurriedNativeRegExpMethod(regexp, str, arg2) };
          }
          return { done: true, value: uncurriedNativeMethod(str, regexp, arg2) };
        }
        return { done: false };
      });

      defineBuiltIn$8(String.prototype, KEY, methods[0]);
      defineBuiltIn$8(RegExpPrototype, SYMBOL, methods[1]);
    }

    if (SHAM) createNonEnumerableProperty$2(RegExpPrototype[SYMBOL], 'sham', true);
  };

  var isObject$7 = isObject$k;
  var classof$5 = classofRaw$1;
  var wellKnownSymbol$9 = wellKnownSymbol$t;

  var MATCH$1 = wellKnownSymbol$9('match');

  // `IsRegExp` abstract operation
  // https://tc39.es/ecma262/#sec-isregexp
  var isRegexp = function (it) {
    var isRegExp;
    return isObject$7(it) && ((isRegExp = it[MATCH$1]) !== undefined ? !!isRegExp : classof$5(it) == 'RegExp');
  };

  var uncurryThis$i = functionUncurryThis;
  var toIntegerOrInfinity$2 = toIntegerOrInfinity$9;
  var toString$8 = toString$a;
  var requireObjectCoercible$5 = requireObjectCoercible$8;

  var charAt$6 = uncurryThis$i(''.charAt);
  var charCodeAt$3 = uncurryThis$i(''.charCodeAt);
  var stringSlice$7 = uncurryThis$i(''.slice);

  var createMethod$2 = function (CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = toString$8(requireObjectCoercible$5($this));
      var position = toIntegerOrInfinity$2(pos);
      var size = S.length;
      var first, second;
      if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
      first = charCodeAt$3(S, position);
      return first < 0xD800 || first > 0xDBFF || position + 1 === size
        || (second = charCodeAt$3(S, position + 1)) < 0xDC00 || second > 0xDFFF
          ? CONVERT_TO_STRING
            ? charAt$6(S, position)
            : first
          : CONVERT_TO_STRING
            ? stringSlice$7(S, position, position + 2)
            : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
    };
  };

  var stringMultibyte = {
    // `String.prototype.codePointAt` method
    // https://tc39.es/ecma262/#sec-string.prototype.codepointat
    codeAt: createMethod$2(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod$2(true)
  };

  var charAt$5 = stringMultibyte.charAt;

  // `AdvanceStringIndex` abstract operation
  // https://tc39.es/ecma262/#sec-advancestringindex
  var advanceStringIndex$2 = function (S, index, unicode) {
    return index + (unicode ? charAt$5(S, index).length : 1);
  };

  var call$d = functionCall;
  var anObject$8 = anObject$i;
  var isCallable$9 = isCallable$s;
  var classof$4 = classofRaw$1;
  var regexpExec$1 = regexpExec$3;

  var $TypeError$3 = TypeError;

  // `RegExpExec` abstract operation
  // https://tc39.es/ecma262/#sec-regexpexec
  var regexpExecAbstract = function (R, S) {
    var exec = R.exec;
    if (isCallable$9(exec)) {
      var result = call$d(exec, R, S);
      if (result !== null) anObject$8(result);
      return result;
    }
    if (classof$4(R) === 'RegExp') return call$d(regexpExec$1, R, S);
    throw $TypeError$3('RegExp#exec called on incompatible receiver');
  };

  var apply$3 = functionApply;
  var call$c = functionCall;
  var uncurryThis$h = functionUncurryThis;
  var fixRegExpWellKnownSymbolLogic$1 = fixRegexpWellKnownSymbolLogic;
  var isRegExp$1 = isRegexp;
  var anObject$7 = anObject$i;
  var requireObjectCoercible$4 = requireObjectCoercible$8;
  var speciesConstructor$1 = speciesConstructor$4;
  var advanceStringIndex$1 = advanceStringIndex$2;
  var toLength$3 = toLength$a;
  var toString$7 = toString$a;
  var getMethod$2 = getMethod$5;
  var arraySlice$5 = arraySliceSimple;
  var callRegExpExec = regexpExecAbstract;
  var regexpExec = regexpExec$3;
  var stickyHelpers = regexpStickyHelpers;
  var fails$d = fails$H;

  var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
  var MAX_UINT32 = 0xFFFFFFFF;
  var min$4 = Math.min;
  var $push = [].push;
  var exec$3 = uncurryThis$h(/./.exec);
  var push$6 = uncurryThis$h($push);
  var stringSlice$6 = uncurryThis$h(''.slice);

  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  // Weex JS has frozen built-in prototypes, so use try / catch wrapper
  var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails$d(function () {
    // eslint-disable-next-line regexp/no-empty-group -- required for testing
    var re = /(?:)/;
    var originalExec = re.exec;
    re.exec = function () { return originalExec.apply(this, arguments); };
    var result = 'ab'.split(re);
    return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
  });

  // @@split logic
  fixRegExpWellKnownSymbolLogic$1('split', function (SPLIT, nativeSplit, maybeCallNative) {
    var internalSplit;
    if (
      'abbc'.split(/(b)*/)[1] == 'c' ||
      // eslint-disable-next-line regexp/no-empty-group -- required for testing
      'test'.split(/(?:)/, -1).length != 4 ||
      'ab'.split(/(?:ab)*/).length != 2 ||
      '.'.split(/(.?)(.?)/).length != 4 ||
      // eslint-disable-next-line regexp/no-empty-capturing-group, regexp/no-empty-group -- required for testing
      '.'.split(/()()/).length > 1 ||
      ''.split(/.?/).length
    ) {
      // based on es5-shim implementation, need to rework it
      internalSplit = function (separator, limit) {
        var string = toString$7(requireObjectCoercible$4(this));
        var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
        if (lim === 0) return [];
        if (separator === undefined) return [string];
        // If `separator` is not a regex, use native split
        if (!isRegExp$1(separator)) {
          return call$c(nativeSplit, string, separator, lim);
        }
        var output = [];
        var flags = (separator.ignoreCase ? 'i' : '') +
                    (separator.multiline ? 'm' : '') +
                    (separator.unicode ? 'u' : '') +
                    (separator.sticky ? 'y' : '');
        var lastLastIndex = 0;
        // Make `global` and avoid `lastIndex` issues by working with a copy
        var separatorCopy = new RegExp(separator.source, flags + 'g');
        var match, lastIndex, lastLength;
        while (match = call$c(regexpExec, separatorCopy, string)) {
          lastIndex = separatorCopy.lastIndex;
          if (lastIndex > lastLastIndex) {
            push$6(output, stringSlice$6(string, lastLastIndex, match.index));
            if (match.length > 1 && match.index < string.length) apply$3($push, output, arraySlice$5(match, 1));
            lastLength = match[0].length;
            lastLastIndex = lastIndex;
            if (output.length >= lim) break;
          }
          if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
        }
        if (lastLastIndex === string.length) {
          if (lastLength || !exec$3(separatorCopy, '')) push$6(output, '');
        } else push$6(output, stringSlice$6(string, lastLastIndex));
        return output.length > lim ? arraySlice$5(output, 0, lim) : output;
      };
    // Chakra, V8
    } else if ('0'.split(undefined, 0).length) {
      internalSplit = function (separator, limit) {
        return separator === undefined && limit === 0 ? [] : call$c(nativeSplit, this, separator, limit);
      };
    } else internalSplit = nativeSplit;

    return [
      // `String.prototype.split` method
      // https://tc39.es/ecma262/#sec-string.prototype.split
      function split(separator, limit) {
        var O = requireObjectCoercible$4(this);
        var splitter = separator == undefined ? undefined : getMethod$2(separator, SPLIT);
        return splitter
          ? call$c(splitter, separator, O, limit)
          : call$c(internalSplit, toString$7(O), separator, limit);
      },
      // `RegExp.prototype[@@split]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
      //
      // NOTE: This cannot be properly polyfilled in engines that don't support
      // the 'y' flag.
      function (string, limit) {
        var rx = anObject$7(this);
        var S = toString$7(string);
        var res = maybeCallNative(internalSplit, rx, S, limit, internalSplit !== nativeSplit);

        if (res.done) return res.value;

        var C = speciesConstructor$1(rx, RegExp);

        var unicodeMatching = rx.unicode;
        var flags = (rx.ignoreCase ? 'i' : '') +
                    (rx.multiline ? 'm' : '') +
                    (rx.unicode ? 'u' : '') +
                    (UNSUPPORTED_Y ? 'g' : 'y');

        // ^(? + rx + ) is needed, in combination with some S slicing, to
        // simulate the 'y' flag.
        var splitter = new C(UNSUPPORTED_Y ? '^(?:' + rx.source + ')' : rx, flags);
        var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
        if (lim === 0) return [];
        if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
        var p = 0;
        var q = 0;
        var A = [];
        while (q < S.length) {
          splitter.lastIndex = UNSUPPORTED_Y ? 0 : q;
          var z = callRegExpExec(splitter, UNSUPPORTED_Y ? stringSlice$6(S, q) : S);
          var e;
          if (
            z === null ||
            (e = min$4(toLength$3(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)), S.length)) === p
          ) {
            q = advanceStringIndex$1(S, q, unicodeMatching);
          } else {
            push$6(A, stringSlice$6(S, p, q));
            if (A.length === lim) return A;
            for (var i = 1; i <= z.length - 1; i++) {
              push$6(A, z[i]);
              if (A.length === lim) return A;
            }
            q = p = e;
          }
        }
        push$6(A, stringSlice$6(S, p));
        return A;
      }
    ];
  }, !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y);

  /*
   Copyright (c) 2022 Gildas Lormeau. All rights reserved.

   Redistribution and use in source and binary forms, with or without
   modification, are permitted provided that the following conditions are met:

   1. Redistributions of source code must retain the above copyright notice,
   this list of conditions and the following disclaimer.

   2. Redistributions in binary form must reproduce the above copyright 
   notice, this list of conditions and the following disclaimer in 
   the documentation and/or other materials provided with the distribution.

   3. The names of the authors may not be used to endorse or promote products
   derived from this software without specific prior written permission.

   THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
   INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
   FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
   INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
   INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
   LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
   OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
   EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   */

  function getMimeType$1() {
    return "application/octet-stream";
  }

  var table$1 = {
    "application": {
      "andrew-inset": "ez",
      "annodex": "anx",
      "atom+xml": "atom",
      "atomcat+xml": "atomcat",
      "atomserv+xml": "atomsrv",
      "bbolin": "lin",
      "cap": ["cap", "pcap"],
      "cu-seeme": "cu",
      "davmount+xml": "davmount",
      "dsptype": "tsp",
      "ecmascript": ["es", "ecma"],
      "futuresplash": "spl",
      "hta": "hta",
      "java-archive": "jar",
      "java-serialized-object": "ser",
      "java-vm": "class",
      "javascript": "js",
      "m3g": "m3g",
      "mac-binhex40": "hqx",
      "mathematica": ["nb", "ma", "mb"],
      "msaccess": "mdb",
      "msword": ["doc", "dot"],
      "mxf": "mxf",
      "oda": "oda",
      "ogg": "ogx",
      "pdf": "pdf",
      "pgp-keys": "key",
      "pgp-signature": ["asc", "sig"],
      "pics-rules": "prf",
      "postscript": ["ps", "ai", "eps", "epsi", "epsf", "eps2", "eps3"],
      "rar": "rar",
      "rdf+xml": "rdf",
      "rss+xml": "rss",
      "rtf": "rtf",
      "smil": ["smi", "smil"],
      "xhtml+xml": ["xhtml", "xht"],
      "xml": ["xml", "xsl", "xsd"],
      "xspf+xml": "xspf",
      "zip": "zip",
      "vnd.android.package-archive": "apk",
      "vnd.cinderella": "cdy",
      "vnd.google-earth.kml+xml": "kml",
      "vnd.google-earth.kmz": "kmz",
      "vnd.mozilla.xul+xml": "xul",
      "vnd.ms-excel": ["xls", "xlb", "xlt", "xlm", "xla", "xlc", "xlw"],
      "vnd.ms-pki.seccat": "cat",
      "vnd.ms-pki.stl": "stl",
      "vnd.ms-powerpoint": ["ppt", "pps", "pot"],
      "vnd.oasis.opendocument.chart": "odc",
      "vnd.oasis.opendocument.database": "odb",
      "vnd.oasis.opendocument.formula": "odf",
      "vnd.oasis.opendocument.graphics": "odg",
      "vnd.oasis.opendocument.graphics-template": "otg",
      "vnd.oasis.opendocument.image": "odi",
      "vnd.oasis.opendocument.presentation": "odp",
      "vnd.oasis.opendocument.presentation-template": "otp",
      "vnd.oasis.opendocument.spreadsheet": "ods",
      "vnd.oasis.opendocument.spreadsheet-template": "ots",
      "vnd.oasis.opendocument.text": "odt",
      "vnd.oasis.opendocument.text-master": "odm",
      "vnd.oasis.opendocument.text-template": "ott",
      "vnd.oasis.opendocument.text-web": "oth",
      "vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
      "vnd.openxmlformats-officedocument.spreadsheetml.template": "xltx",
      "vnd.openxmlformats-officedocument.presentationml.presentation": "pptx",
      "vnd.openxmlformats-officedocument.presentationml.slideshow": "ppsx",
      "vnd.openxmlformats-officedocument.presentationml.template": "potx",
      "vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
      "vnd.openxmlformats-officedocument.wordprocessingml.template": "dotx",
      "vnd.smaf": "mmf",
      "vnd.stardivision.calc": "sdc",
      "vnd.stardivision.chart": "sds",
      "vnd.stardivision.draw": "sda",
      "vnd.stardivision.impress": "sdd",
      "vnd.stardivision.math": ["sdf", "smf"],
      "vnd.stardivision.writer": ["sdw", "vor"],
      "vnd.stardivision.writer-global": "sgl",
      "vnd.sun.xml.calc": "sxc",
      "vnd.sun.xml.calc.template": "stc",
      "vnd.sun.xml.draw": "sxd",
      "vnd.sun.xml.draw.template": "std",
      "vnd.sun.xml.impress": "sxi",
      "vnd.sun.xml.impress.template": "sti",
      "vnd.sun.xml.math": "sxm",
      "vnd.sun.xml.writer": "sxw",
      "vnd.sun.xml.writer.global": "sxg",
      "vnd.sun.xml.writer.template": "stw",
      "vnd.symbian.install": ["sis", "sisx"],
      "vnd.visio": ["vsd", "vst", "vss", "vsw"],
      "vnd.wap.wbxml": "wbxml",
      "vnd.wap.wmlc": "wmlc",
      "vnd.wap.wmlscriptc": "wmlsc",
      "vnd.wordperfect": "wpd",
      "vnd.wordperfect5.1": "wp5",
      "x-123": "wk",
      "x-7z-compressed": "7z",
      "x-abiword": "abw",
      "x-apple-diskimage": "dmg",
      "x-bcpio": "bcpio",
      "x-bittorrent": "torrent",
      "x-cbr": ["cbr", "cba", "cbt", "cb7"],
      "x-cbz": "cbz",
      "x-cdf": ["cdf", "cda"],
      "x-cdlink": "vcd",
      "x-chess-pgn": "pgn",
      "x-cpio": "cpio",
      "x-csh": "csh",
      "x-debian-package": ["deb", "udeb"],
      "x-director": ["dcr", "dir", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"],
      "x-dms": "dms",
      "x-doom": "wad",
      "x-dvi": "dvi",
      "x-httpd-eruby": "rhtml",
      "x-font": "pcf.Z",
      "x-freemind": "mm",
      "x-gnumeric": "gnumeric",
      "x-go-sgf": "sgf",
      "x-graphing-calculator": "gcf",
      "x-gtar": ["gtar", "taz"],
      "x-hdf": "hdf",
      "x-httpd-php": ["phtml", "pht", "php"],
      "x-httpd-php-source": "phps",
      "x-httpd-php3": "php3",
      "x-httpd-php3-preprocessed": "php3p",
      "x-httpd-php4": "php4",
      "x-httpd-php5": "php5",
      "x-ica": "ica",
      "x-info": "info",
      "x-internet-signup": ["ins", "isp"],
      "x-iphone": "iii",
      "x-iso9660-image": "iso",
      "x-java-jnlp-file": "jnlp",
      "x-jmol": "jmz",
      "x-killustrator": "kil",
      "x-koan": ["skp", "skd", "skt", "skm"],
      "x-kpresenter": ["kpr", "kpt"],
      "x-kword": ["kwd", "kwt"],
      "x-latex": "latex",
      "x-lha": "lha",
      "x-lyx": "lyx",
      "x-lzh": "lzh",
      "x-lzx": "lzx",
      "x-maker": ["frm", "maker", "frame", "fm", "fb", "book", "fbdoc"],
      "x-ms-wmd": "wmd",
      "x-ms-wmz": "wmz",
      "x-msdos-program": ["com", "exe", "bat", "dll"],
      "x-msi": "msi",
      "x-netcdf": ["nc", "cdf"],
      "x-ns-proxy-autoconfig": ["pac", "dat"],
      "x-nwc": "nwc",
      "x-object": "o",
      "x-oz-application": "oza",
      "x-pkcs7-certreqresp": "p7r",
      "x-python-code": ["pyc", "pyo"],
      "x-qgis": ["qgs", "shp", "shx"],
      "x-quicktimeplayer": "qtl",
      "x-redhat-package-manager": "rpm",
      "x-ruby": "rb",
      "x-sh": "sh",
      "x-shar": "shar",
      "x-shockwave-flash": ["swf", "swfl"],
      "x-silverlight": "scr",
      "x-stuffit": "sit",
      "x-sv4cpio": "sv4cpio",
      "x-sv4crc": "sv4crc",
      "x-tar": "tar",
      "x-tcl": "tcl",
      "x-tex-gf": "gf",
      "x-tex-pk": "pk",
      "x-texinfo": ["texinfo", "texi"],
      "x-trash": ["~", "%", "bak", "old", "sik"],
      "x-troff": ["t", "tr", "roff"],
      "x-troff-man": "man",
      "x-troff-me": "me",
      "x-troff-ms": "ms",
      "x-ustar": "ustar",
      "x-wais-source": "src",
      "x-wingz": "wz",
      "x-x509-ca-cert": ["crt", "der", "cer"],
      "x-xcf": "xcf",
      "x-xfig": "fig",
      "x-xpinstall": "xpi",
      "applixware": "aw",
      "atomsvc+xml": "atomsvc",
      "ccxml+xml": "ccxml",
      "cdmi-capability": "cdmia",
      "cdmi-container": "cdmic",
      "cdmi-domain": "cdmid",
      "cdmi-object": "cdmio",
      "cdmi-queue": "cdmiq",
      "docbook+xml": "dbk",
      "dssc+der": "dssc",
      "dssc+xml": "xdssc",
      "emma+xml": "emma",
      "epub+zip": "epub",
      "exi": "exi",
      "font-tdpfr": "pfr",
      "gml+xml": "gml",
      "gpx+xml": "gpx",
      "gxf": "gxf",
      "hyperstudio": "stk",
      "inkml+xml": ["ink", "inkml"],
      "ipfix": "ipfix",
      "json": "json",
      "jsonml+json": "jsonml",
      "lost+xml": "lostxml",
      "mads+xml": "mads",
      "marc": "mrc",
      "marcxml+xml": "mrcx",
      "mathml+xml": "mathml",
      "mbox": "mbox",
      "mediaservercontrol+xml": "mscml",
      "metalink+xml": "metalink",
      "metalink4+xml": "meta4",
      "mets+xml": "mets",
      "mods+xml": "mods",
      "mp21": ["m21", "mp21"],
      "mp4": "mp4s",
      "oebps-package+xml": "opf",
      "omdoc+xml": "omdoc",
      "onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"],
      "oxps": "oxps",
      "patch-ops-error+xml": "xer",
      "pgp-encrypted": "pgp",
      "pkcs10": "p10",
      "pkcs7-mime": ["p7m", "p7c"],
      "pkcs7-signature": "p7s",
      "pkcs8": "p8",
      "pkix-attr-cert": "ac",
      "pkix-crl": "crl",
      "pkix-pkipath": "pkipath",
      "pkixcmp": "pki",
      "pls+xml": "pls",
      "prs.cww": "cww",
      "pskc+xml": "pskcxml",
      "reginfo+xml": "rif",
      "relax-ng-compact-syntax": "rnc",
      "resource-lists+xml": "rl",
      "resource-lists-diff+xml": "rld",
      "rls-services+xml": "rs",
      "rpki-ghostbusters": "gbr",
      "rpki-manifest": "mft",
      "rpki-roa": "roa",
      "rsd+xml": "rsd",
      "sbml+xml": "sbml",
      "scvp-cv-request": "scq",
      "scvp-cv-response": "scs",
      "scvp-vp-request": "spq",
      "scvp-vp-response": "spp",
      "sdp": "sdp",
      "set-payment-initiation": "setpay",
      "set-registration-initiation": "setreg",
      "shf+xml": "shf",
      "sparql-query": "rq",
      "sparql-results+xml": "srx",
      "srgs": "gram",
      "srgs+xml": "grxml",
      "sru+xml": "sru",
      "ssdl+xml": "ssdl",
      "ssml+xml": "ssml",
      "tei+xml": ["tei", "teicorpus"],
      "thraud+xml": "tfi",
      "timestamped-data": "tsd",
      "vnd.3gpp.pic-bw-large": "plb",
      "vnd.3gpp.pic-bw-small": "psb",
      "vnd.3gpp.pic-bw-var": "pvb",
      "vnd.3gpp2.tcap": "tcap",
      "vnd.3m.post-it-notes": "pwn",
      "vnd.accpac.simply.aso": "aso",
      "vnd.accpac.simply.imp": "imp",
      "vnd.acucobol": "acu",
      "vnd.acucorp": ["atc", "acutc"],
      "vnd.adobe.air-application-installer-package+zip": "air",
      "vnd.adobe.formscentral.fcdt": "fcdt",
      "vnd.adobe.fxp": ["fxp", "fxpl"],
      "vnd.adobe.xdp+xml": "xdp",
      "vnd.adobe.xfdf": "xfdf",
      "vnd.ahead.space": "ahead",
      "vnd.airzip.filesecure.azf": "azf",
      "vnd.airzip.filesecure.azs": "azs",
      "vnd.amazon.ebook": "azw",
      "vnd.americandynamics.acc": "acc",
      "vnd.amiga.ami": "ami",
      "vnd.anser-web-certificate-issue-initiation": "cii",
      "vnd.anser-web-funds-transfer-initiation": "fti",
      "vnd.antix.game-component": "atx",
      "vnd.apple.installer+xml": "mpkg",
      "vnd.apple.mpegurl": "m3u8",
      "vnd.aristanetworks.swi": "swi",
      "vnd.astraea-software.iota": "iota",
      "vnd.audiograph": "aep",
      "vnd.blueice.multipass": "mpm",
      "vnd.bmi": "bmi",
      "vnd.businessobjects": "rep",
      "vnd.chemdraw+xml": "cdxml",
      "vnd.chipnuts.karaoke-mmd": "mmd",
      "vnd.claymore": "cla",
      "vnd.cloanto.rp9": "rp9",
      "vnd.clonk.c4group": ["c4g", "c4d", "c4f", "c4p", "c4u"],
      "vnd.cluetrust.cartomobile-config": "c11amc",
      "vnd.cluetrust.cartomobile-config-pkg": "c11amz",
      "vnd.commonspace": "csp",
      "vnd.contact.cmsg": "cdbcmsg",
      "vnd.cosmocaller": "cmc",
      "vnd.crick.clicker": "clkx",
      "vnd.crick.clicker.keyboard": "clkk",
      "vnd.crick.clicker.palette": "clkp",
      "vnd.crick.clicker.template": "clkt",
      "vnd.crick.clicker.wordbank": "clkw",
      "vnd.criticaltools.wbs+xml": "wbs",
      "vnd.ctc-posml": "pml",
      "vnd.cups-ppd": "ppd",
      "vnd.curl.car": "car",
      "vnd.curl.pcurl": "pcurl",
      "vnd.dart": "dart",
      "vnd.data-vision.rdz": "rdz",
      "vnd.dece.data": ["uvf", "uvvf", "uvd", "uvvd"],
      "vnd.dece.ttml+xml": ["uvt", "uvvt"],
      "vnd.dece.unspecified": ["uvx", "uvvx"],
      "vnd.dece.zip": ["uvz", "uvvz"],
      "vnd.denovo.fcselayout-link": "fe_launch",
      "vnd.dna": "dna",
      "vnd.dolby.mlp": "mlp",
      "vnd.dpgraph": "dpg",
      "vnd.dreamfactory": "dfac",
      "vnd.ds-keypoint": "kpxx",
      "vnd.dvb.ait": "ait",
      "vnd.dvb.service": "svc",
      "vnd.dynageo": "geo",
      "vnd.ecowin.chart": "mag",
      "vnd.enliven": "nml",
      "vnd.epson.esf": "esf",
      "vnd.epson.msf": "msf",
      "vnd.epson.quickanime": "qam",
      "vnd.epson.salt": "slt",
      "vnd.epson.ssf": "ssf",
      "vnd.eszigno3+xml": ["es3", "et3"],
      "vnd.ezpix-album": "ez2",
      "vnd.ezpix-package": "ez3",
      "vnd.fdf": "fdf",
      "vnd.fdsn.mseed": "mseed",
      "vnd.fdsn.seed": ["seed", "dataless"],
      "vnd.flographit": "gph",
      "vnd.fluxtime.clip": "ftc",
      "vnd.framemaker": ["fm", "frame", "maker", "book"],
      "vnd.frogans.fnc": "fnc",
      "vnd.frogans.ltf": "ltf",
      "vnd.fsc.weblaunch": "fsc",
      "vnd.fujitsu.oasys": "oas",
      "vnd.fujitsu.oasys2": "oa2",
      "vnd.fujitsu.oasys3": "oa3",
      "vnd.fujitsu.oasysgp": "fg5",
      "vnd.fujitsu.oasysprs": "bh2",
      "vnd.fujixerox.ddd": "ddd",
      "vnd.fujixerox.docuworks": "xdw",
      "vnd.fujixerox.docuworks.binder": "xbd",
      "vnd.fuzzysheet": "fzs",
      "vnd.genomatix.tuxedo": "txd",
      "vnd.geogebra.file": "ggb",
      "vnd.geogebra.tool": "ggt",
      "vnd.geometry-explorer": ["gex", "gre"],
      "vnd.geonext": "gxt",
      "vnd.geoplan": "g2w",
      "vnd.geospace": "g3w",
      "vnd.gmx": "gmx",
      "vnd.grafeq": ["gqf", "gqs"],
      "vnd.groove-account": "gac",
      "vnd.groove-help": "ghf",
      "vnd.groove-identity-message": "gim",
      "vnd.groove-injector": "grv",
      "vnd.groove-tool-message": "gtm",
      "vnd.groove-tool-template": "tpl",
      "vnd.groove-vcard": "vcg",
      "vnd.hal+xml": "hal",
      "vnd.handheld-entertainment+xml": "zmm",
      "vnd.hbci": "hbci",
      "vnd.hhe.lesson-player": "les",
      "vnd.hp-hpgl": "hpgl",
      "vnd.hp-hpid": "hpid",
      "vnd.hp-hps": "hps",
      "vnd.hp-jlyt": "jlt",
      "vnd.hp-pcl": "pcl",
      "vnd.hp-pclxl": "pclxl",
      "vnd.hydrostatix.sof-data": "sfd-hdstx",
      "vnd.ibm.minipay": "mpy",
      "vnd.ibm.modcap": ["afp", "listafp", "list3820"],
      "vnd.ibm.rights-management": "irm",
      "vnd.ibm.secure-container": "sc",
      "vnd.iccprofile": ["icc", "icm"],
      "vnd.igloader": "igl",
      "vnd.immervision-ivp": "ivp",
      "vnd.immervision-ivu": "ivu",
      "vnd.insors.igm": "igm",
      "vnd.intercon.formnet": ["xpw", "xpx"],
      "vnd.intergeo": "i2g",
      "vnd.intu.qbo": "qbo",
      "vnd.intu.qfx": "qfx",
      "vnd.ipunplugged.rcprofile": "rcprofile",
      "vnd.irepository.package+xml": "irp",
      "vnd.is-xpr": "xpr",
      "vnd.isac.fcs": "fcs",
      "vnd.jam": "jam",
      "vnd.jcp.javame.midlet-rms": "rms",
      "vnd.jisp": "jisp",
      "vnd.joost.joda-archive": "joda",
      "vnd.kahootz": ["ktz", "ktr"],
      "vnd.kde.karbon": "karbon",
      "vnd.kde.kchart": "chrt",
      "vnd.kde.kformula": "kfo",
      "vnd.kde.kivio": "flw",
      "vnd.kde.kontour": "kon",
      "vnd.kde.kpresenter": ["kpr", "kpt"],
      "vnd.kde.kspread": "ksp",
      "vnd.kde.kword": ["kwd", "kwt"],
      "vnd.kenameaapp": "htke",
      "vnd.kidspiration": "kia",
      "vnd.kinar": ["kne", "knp"],
      "vnd.koan": ["skp", "skd", "skt", "skm"],
      "vnd.kodak-descriptor": "sse",
      "vnd.las.las+xml": "lasxml",
      "vnd.llamagraphics.life-balance.desktop": "lbd",
      "vnd.llamagraphics.life-balance.exchange+xml": "lbe",
      "vnd.lotus-1-2-3": "123",
      "vnd.lotus-approach": "apr",
      "vnd.lotus-freelance": "pre",
      "vnd.lotus-notes": "nsf",
      "vnd.lotus-organizer": "org",
      "vnd.lotus-screencam": "scm",
      "vnd.lotus-wordpro": "lwp",
      "vnd.macports.portpkg": "portpkg",
      "vnd.mcd": "mcd",
      "vnd.medcalcdata": "mc1",
      "vnd.mediastation.cdkey": "cdkey",
      "vnd.mfer": "mwf",
      "vnd.mfmp": "mfm",
      "vnd.micrografx.flo": "flo",
      "vnd.micrografx.igx": "igx",
      "vnd.mif": "mif",
      "vnd.mobius.daf": "daf",
      "vnd.mobius.dis": "dis",
      "vnd.mobius.mbk": "mbk",
      "vnd.mobius.mqy": "mqy",
      "vnd.mobius.msl": "msl",
      "vnd.mobius.plc": "plc",
      "vnd.mobius.txf": "txf",
      "vnd.mophun.application": "mpn",
      "vnd.mophun.certificate": "mpc",
      "vnd.ms-artgalry": "cil",
      "vnd.ms-cab-compressed": "cab",
      "vnd.ms-excel.addin.macroenabled.12": "xlam",
      "vnd.ms-excel.sheet.binary.macroenabled.12": "xlsb",
      "vnd.ms-excel.sheet.macroenabled.12": "xlsm",
      "vnd.ms-excel.template.macroenabled.12": "xltm",
      "vnd.ms-fontobject": "eot",
      "vnd.ms-htmlhelp": "chm",
      "vnd.ms-ims": "ims",
      "vnd.ms-lrm": "lrm",
      "vnd.ms-officetheme": "thmx",
      "vnd.ms-powerpoint.addin.macroenabled.12": "ppam",
      "vnd.ms-powerpoint.presentation.macroenabled.12": "pptm",
      "vnd.ms-powerpoint.slide.macroenabled.12": "sldm",
      "vnd.ms-powerpoint.slideshow.macroenabled.12": "ppsm",
      "vnd.ms-powerpoint.template.macroenabled.12": "potm",
      "vnd.ms-project": ["mpp", "mpt"],
      "vnd.ms-word.document.macroenabled.12": "docm",
      "vnd.ms-word.template.macroenabled.12": "dotm",
      "vnd.ms-works": ["wps", "wks", "wcm", "wdb"],
      "vnd.ms-wpl": "wpl",
      "vnd.ms-xpsdocument": "xps",
      "vnd.mseq": "mseq",
      "vnd.musician": "mus",
      "vnd.muvee.style": "msty",
      "vnd.mynfc": "taglet",
      "vnd.neurolanguage.nlu": "nlu",
      "vnd.nitf": ["ntf", "nitf"],
      "vnd.noblenet-directory": "nnd",
      "vnd.noblenet-sealer": "nns",
      "vnd.noblenet-web": "nnw",
      "vnd.nokia.n-gage.data": "ngdat",
      "vnd.nokia.n-gage.symbian.install": "n-gage",
      "vnd.nokia.radio-preset": "rpst",
      "vnd.nokia.radio-presets": "rpss",
      "vnd.novadigm.edm": "edm",
      "vnd.novadigm.edx": "edx",
      "vnd.novadigm.ext": "ext",
      "vnd.oasis.opendocument.chart-template": "otc",
      "vnd.oasis.opendocument.formula-template": "odft",
      "vnd.oasis.opendocument.image-template": "oti",
      "vnd.olpc-sugar": "xo",
      "vnd.oma.dd2+xml": "dd2",
      "vnd.openofficeorg.extension": "oxt",
      "vnd.openxmlformats-officedocument.presentationml.slide": "sldx",
      "vnd.osgeo.mapguide.package": "mgp",
      "vnd.osgi.dp": "dp",
      "vnd.osgi.subsystem": "esa",
      "vnd.palm": ["pdb", "pqa", "oprc"],
      "vnd.pawaafile": "paw",
      "vnd.pg.format": "str",
      "vnd.pg.osasli": "ei6",
      "vnd.picsel": "efif",
      "vnd.pmi.widget": "wg",
      "vnd.pocketlearn": "plf",
      "vnd.powerbuilder6": "pbd",
      "vnd.previewsystems.box": "box",
      "vnd.proteus.magazine": "mgz",
      "vnd.publishare-delta-tree": "qps",
      "vnd.pvi.ptid1": "ptid",
      "vnd.quark.quarkxpress": ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"],
      "vnd.realvnc.bed": "bed",
      "vnd.recordare.musicxml": "mxl",
      "vnd.recordare.musicxml+xml": "musicxml",
      "vnd.rig.cryptonote": "cryptonote",
      "vnd.rn-realmedia": "rm",
      "vnd.rn-realmedia-vbr": "rmvb",
      "vnd.route66.link66+xml": "link66",
      "vnd.sailingtracker.track": "st",
      "vnd.seemail": "see",
      "vnd.sema": "sema",
      "vnd.semd": "semd",
      "vnd.semf": "semf",
      "vnd.shana.informed.formdata": "ifm",
      "vnd.shana.informed.formtemplate": "itp",
      "vnd.shana.informed.interchange": "iif",
      "vnd.shana.informed.package": "ipk",
      "vnd.simtech-mindmapper": ["twd", "twds"],
      "vnd.smart.teacher": "teacher",
      "vnd.solent.sdkm+xml": ["sdkm", "sdkd"],
      "vnd.spotfire.dxp": "dxp",
      "vnd.spotfire.sfs": "sfs",
      "vnd.stepmania.package": "smzip",
      "vnd.stepmania.stepchart": "sm",
      "vnd.sus-calendar": ["sus", "susp"],
      "vnd.svd": "svd",
      "vnd.syncml+xml": "xsm",
      "vnd.syncml.dm+wbxml": "bdm",
      "vnd.syncml.dm+xml": "xdm",
      "vnd.tao.intent-module-archive": "tao",
      "vnd.tcpdump.pcap": ["pcap", "cap", "dmp"],
      "vnd.tmobile-livetv": "tmo",
      "vnd.trid.tpt": "tpt",
      "vnd.triscape.mxs": "mxs",
      "vnd.trueapp": "tra",
      "vnd.ufdl": ["ufd", "ufdl"],
      "vnd.uiq.theme": "utz",
      "vnd.umajin": "umj",
      "vnd.unity": "unityweb",
      "vnd.uoml+xml": "uoml",
      "vnd.vcx": "vcx",
      "vnd.visionary": "vis",
      "vnd.vsf": "vsf",
      "vnd.webturbo": "wtb",
      "vnd.wolfram.player": "nbp",
      "vnd.wqd": "wqd",
      "vnd.wt.stf": "stf",
      "vnd.xara": "xar",
      "vnd.xfdl": "xfdl",
      "vnd.yamaha.hv-dic": "hvd",
      "vnd.yamaha.hv-script": "hvs",
      "vnd.yamaha.hv-voice": "hvp",
      "vnd.yamaha.openscoreformat": "osf",
      "vnd.yamaha.openscoreformat.osfpvg+xml": "osfpvg",
      "vnd.yamaha.smaf-audio": "saf",
      "vnd.yamaha.smaf-phrase": "spf",
      "vnd.yellowriver-custom-menu": "cmp",
      "vnd.zul": ["zir", "zirz"],
      "vnd.zzazz.deck+xml": "zaz",
      "voicexml+xml": "vxml",
      "widget": "wgt",
      "winhlp": "hlp",
      "wsdl+xml": "wsdl",
      "wspolicy+xml": "wspolicy",
      "x-ace-compressed": "ace",
      "x-authorware-bin": ["aab", "x32", "u32", "vox"],
      "x-authorware-map": "aam",
      "x-authorware-seg": "aas",
      "x-blorb": ["blb", "blorb"],
      "x-bzip": "bz",
      "x-bzip2": ["bz2", "boz"],
      "x-cfs-compressed": "cfs",
      "x-chat": "chat",
      "x-conference": "nsc",
      "x-dgc-compressed": "dgc",
      "x-dtbncx+xml": "ncx",
      "x-dtbook+xml": "dtb",
      "x-dtbresource+xml": "res",
      "x-eva": "eva",
      "x-font-bdf": "bdf",
      "x-font-ghostscript": "gsf",
      "x-font-linux-psf": "psf",
      "x-font-otf": "otf",
      "x-font-pcf": "pcf",
      "x-font-snf": "snf",
      "x-font-ttf": ["ttf", "ttc"],
      "x-font-type1": ["pfa", "pfb", "pfm", "afm"],
      "x-font-woff": "woff",
      "x-freearc": "arc",
      "x-gca-compressed": "gca",
      "x-glulx": "ulx",
      "x-gramps-xml": "gramps",
      "x-install-instructions": "install",
      "x-lzh-compressed": ["lzh", "lha"],
      "x-mie": "mie",
      "x-mobipocket-ebook": ["prc", "mobi"],
      "x-ms-application": "application",
      "x-ms-shortcut": "lnk",
      "x-ms-xbap": "xbap",
      "x-msbinder": "obd",
      "x-mscardfile": "crd",
      "x-msclip": "clp",
      "x-msdownload": ["exe", "dll", "com", "bat", "msi"],
      "x-msmediaview": ["mvb", "m13", "m14"],
      "x-msmetafile": ["wmf", "wmz", "emf", "emz"],
      "x-msmoney": "mny",
      "x-mspublisher": "pub",
      "x-msschedule": "scd",
      "x-msterminal": "trm",
      "x-mswrite": "wri",
      "x-nzb": "nzb",
      "x-pkcs12": ["p12", "pfx"],
      "x-pkcs7-certificates": ["p7b", "spc"],
      "x-research-info-systems": "ris",
      "x-silverlight-app": "xap",
      "x-sql": "sql",
      "x-stuffitx": "sitx",
      "x-subrip": "srt",
      "x-t3vm-image": "t3",
      "x-tads": "gam",
      "x-tex": "tex",
      "x-tex-tfm": "tfm",
      "x-tgif": "obj",
      "x-xliff+xml": "xlf",
      "x-xz": "xz",
      "x-zmachine": ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"],
      "xaml+xml": "xaml",
      "xcap-diff+xml": "xdf",
      "xenc+xml": "xenc",
      "xml-dtd": "dtd",
      "xop+xml": "xop",
      "xproc+xml": "xpl",
      "xslt+xml": "xslt",
      "xv+xml": ["mxml", "xhvml", "xvml", "xvm"],
      "yang": "yang",
      "yin+xml": "yin",
      "envoy": "evy",
      "fractals": "fif",
      "internet-property-stream": "acx",
      "olescript": "axs",
      "vnd.ms-outlook": "msg",
      "vnd.ms-pkicertstore": "sst",
      "x-compress": "z",
      "x-compressed": "tgz",
      "x-gzip": "gz",
      "x-perfmon": ["pma", "pmc", "pml", "pmr", "pmw"],
      "x-pkcs7-mime": ["p7c", "p7m"],
      "ynd.ms-pkipko": "pko"
    },
    "audio": {
      "amr": "amr",
      "amr-wb": "awb",
      "annodex": "axa",
      "basic": ["au", "snd"],
      "flac": "flac",
      "midi": ["mid", "midi", "kar", "rmi"],
      "mpeg": ["mpga", "mpega", "mp2", "mp3", "m4a", "mp2a", "m2a", "m3a"],
      "mpegurl": "m3u",
      "ogg": ["oga", "ogg", "spx"],
      "prs.sid": "sid",
      "x-aiff": ["aif", "aiff", "aifc"],
      "x-gsm": "gsm",
      "x-ms-wma": "wma",
      "x-ms-wax": "wax",
      "x-pn-realaudio": "ram",
      "x-realaudio": "ra",
      "x-sd2": "sd2",
      "x-wav": "wav",
      "adpcm": "adp",
      "mp4": "mp4a",
      "s3m": "s3m",
      "silk": "sil",
      "vnd.dece.audio": ["uva", "uvva"],
      "vnd.digital-winds": "eol",
      "vnd.dra": "dra",
      "vnd.dts": "dts",
      "vnd.dts.hd": "dtshd",
      "vnd.lucent.voice": "lvp",
      "vnd.ms-playready.media.pya": "pya",
      "vnd.nuera.ecelp4800": "ecelp4800",
      "vnd.nuera.ecelp7470": "ecelp7470",
      "vnd.nuera.ecelp9600": "ecelp9600",
      "vnd.rip": "rip",
      "webm": "weba",
      "x-aac": "aac",
      "x-caf": "caf",
      "x-matroska": "mka",
      "x-pn-realaudio-plugin": "rmp",
      "xm": "xm",
      "mid": ["mid", "rmi"]
    },
    "chemical": {
      "x-alchemy": "alc",
      "x-cache": ["cac", "cache"],
      "x-cache-csf": "csf",
      "x-cactvs-binary": ["cbin", "cascii", "ctab"],
      "x-cdx": "cdx",
      "x-chem3d": "c3d",
      "x-cif": "cif",
      "x-cmdf": "cmdf",
      "x-cml": "cml",
      "x-compass": "cpa",
      "x-crossfire": "bsd",
      "x-csml": ["csml", "csm"],
      "x-ctx": "ctx",
      "x-cxf": ["cxf", "cef"],
      "x-embl-dl-nucleotide": ["emb", "embl"],
      "x-gamess-input": ["inp", "gam", "gamin"],
      "x-gaussian-checkpoint": ["fch", "fchk"],
      "x-gaussian-cube": "cub",
      "x-gaussian-input": ["gau", "gjc", "gjf"],
      "x-gaussian-log": "gal",
      "x-gcg8-sequence": "gcg",
      "x-genbank": "gen",
      "x-hin": "hin",
      "x-isostar": ["istr", "ist"],
      "x-jcamp-dx": ["jdx", "dx"],
      "x-kinemage": "kin",
      "x-macmolecule": "mcm",
      "x-macromodel-input": ["mmd", "mmod"],
      "x-mdl-molfile": "mol",
      "x-mdl-rdfile": "rd",
      "x-mdl-rxnfile": "rxn",
      "x-mdl-sdfile": ["sd", "sdf"],
      "x-mdl-tgf": "tgf",
      "x-mmcif": "mcif",
      "x-mol2": "mol2",
      "x-molconn-Z": "b",
      "x-mopac-graph": "gpt",
      "x-mopac-input": ["mop", "mopcrt", "mpc", "zmt"],
      "x-mopac-out": "moo",
      "x-ncbi-asn1": "asn",
      "x-ncbi-asn1-ascii": ["prt", "ent"],
      "x-ncbi-asn1-binary": ["val", "aso"],
      "x-pdb": ["pdb", "ent"],
      "x-rosdal": "ros",
      "x-swissprot": "sw",
      "x-vamas-iso14976": "vms",
      "x-vmd": "vmd",
      "x-xtel": "xtel",
      "x-xyz": "xyz"
    },
    "image": {
      "gif": "gif",
      "ief": "ief",
      "jpeg": ["jpeg", "jpg", "jpe"],
      "pcx": "pcx",
      "png": "png",
      "svg+xml": ["svg", "svgz"],
      "tiff": ["tiff", "tif"],
      "vnd.djvu": ["djvu", "djv"],
      "vnd.wap.wbmp": "wbmp",
      "x-canon-cr2": "cr2",
      "x-canon-crw": "crw",
      "x-cmu-raster": "ras",
      "x-coreldraw": "cdr",
      "x-coreldrawpattern": "pat",
      "x-coreldrawtemplate": "cdt",
      "x-corelphotopaint": "cpt",
      "x-epson-erf": "erf",
      "x-icon": "ico",
      "x-jg": "art",
      "x-jng": "jng",
      "x-nikon-nef": "nef",
      "x-olympus-orf": "orf",
      "x-photoshop": "psd",
      "x-portable-anymap": "pnm",
      "x-portable-bitmap": "pbm",
      "x-portable-graymap": "pgm",
      "x-portable-pixmap": "ppm",
      "x-rgb": "rgb",
      "x-xbitmap": "xbm",
      "x-xpixmap": "xpm",
      "x-xwindowdump": "xwd",
      "bmp": "bmp",
      "cgm": "cgm",
      "g3fax": "g3",
      "ktx": "ktx",
      "prs.btif": "btif",
      "sgi": "sgi",
      "vnd.dece.graphic": ["uvi", "uvvi", "uvg", "uvvg"],
      "vnd.dwg": "dwg",
      "vnd.dxf": "dxf",
      "vnd.fastbidsheet": "fbs",
      "vnd.fpx": "fpx",
      "vnd.fst": "fst",
      "vnd.fujixerox.edmics-mmr": "mmr",
      "vnd.fujixerox.edmics-rlc": "rlc",
      "vnd.ms-modi": "mdi",
      "vnd.ms-photo": "wdp",
      "vnd.net-fpx": "npx",
      "vnd.xiff": "xif",
      "webp": "webp",
      "x-3ds": "3ds",
      "x-cmx": "cmx",
      "x-freehand": ["fh", "fhc", "fh4", "fh5", "fh7"],
      "x-pict": ["pic", "pct"],
      "x-tga": "tga",
      "cis-cod": "cod",
      "pipeg": "jfif"
    },
    "message": {
      "rfc822": ["eml", "mime", "mht", "mhtml", "nws"]
    },
    "model": {
      "iges": ["igs", "iges"],
      "mesh": ["msh", "mesh", "silo"],
      "vrml": ["wrl", "vrml"],
      "x3d+vrml": ["x3dv", "x3dvz"],
      "x3d+xml": ["x3d", "x3dz"],
      "x3d+binary": ["x3db", "x3dbz"],
      "vnd.collada+xml": "dae",
      "vnd.dwf": "dwf",
      "vnd.gdl": "gdl",
      "vnd.gtw": "gtw",
      "vnd.mts": "mts",
      "vnd.vtu": "vtu"
    },
    "text": {
      "cache-manifest": ["manifest", "appcache"],
      "calendar": ["ics", "icz", "ifb"],
      "css": "css",
      "csv": "csv",
      "h323": "323",
      "html": ["html", "htm", "shtml", "stm"],
      "iuls": "uls",
      "mathml": "mml",
      "plain": ["txt", "text", "brf", "conf", "def", "list", "log", "in", "bas"],
      "richtext": "rtx",
      "scriptlet": ["sct", "wsc"],
      "texmacs": ["tm", "ts"],
      "tab-separated-values": "tsv",
      "vnd.sun.j2me.app-descriptor": "jad",
      "vnd.wap.wml": "wml",
      "vnd.wap.wmlscript": "wmls",
      "x-bibtex": "bib",
      "x-boo": "boo",
      "x-c++hdr": ["h++", "hpp", "hxx", "hh"],
      "x-c++src": ["c++", "cpp", "cxx", "cc"],
      "x-component": "htc",
      "x-dsrc": "d",
      "x-diff": ["diff", "patch"],
      "x-haskell": "hs",
      "x-java": "java",
      "x-literate-haskell": "lhs",
      "x-moc": "moc",
      "x-pascal": ["p", "pas"],
      "x-pcs-gcd": "gcd",
      "x-perl": ["pl", "pm"],
      "x-python": "py",
      "x-scala": "scala",
      "x-setext": "etx",
      "x-tcl": ["tcl", "tk"],
      "x-tex": ["tex", "ltx", "sty", "cls"],
      "x-vcalendar": "vcs",
      "x-vcard": "vcf",
      "n3": "n3",
      "prs.lines.tag": "dsc",
      "sgml": ["sgml", "sgm"],
      "troff": ["t", "tr", "roff", "man", "me", "ms"],
      "turtle": "ttl",
      "uri-list": ["uri", "uris", "urls"],
      "vcard": "vcard",
      "vnd.curl": "curl",
      "vnd.curl.dcurl": "dcurl",
      "vnd.curl.scurl": "scurl",
      "vnd.curl.mcurl": "mcurl",
      "vnd.dvb.subtitle": "sub",
      "vnd.fly": "fly",
      "vnd.fmi.flexstor": "flx",
      "vnd.graphviz": "gv",
      "vnd.in3d.3dml": "3dml",
      "vnd.in3d.spot": "spot",
      "x-asm": ["s", "asm"],
      "x-c": ["c", "cc", "cxx", "cpp", "h", "hh", "dic"],
      "x-fortran": ["f", "for", "f77", "f90"],
      "x-opml": "opml",
      "x-nfo": "nfo",
      "x-sfv": "sfv",
      "x-uuencode": "uu",
      "webviewhtml": "htt"
    },
    "video": {
      "avif": ".avif",
      "3gpp": "3gp",
      "annodex": "axv",
      "dl": "dl",
      "dv": ["dif", "dv"],
      "fli": "fli",
      "gl": "gl",
      "mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v", "mp2", "mpa", "mpv2"],
      "mp4": ["mp4", "mp4v", "mpg4"],
      "quicktime": ["qt", "mov"],
      "ogg": "ogv",
      "vnd.mpegurl": ["mxu", "m4u"],
      "x-flv": "flv",
      "x-la-asf": ["lsf", "lsx"],
      "x-mng": "mng",
      "x-ms-asf": ["asf", "asx", "asr"],
      "x-ms-wm": "wm",
      "x-ms-wmv": "wmv",
      "x-ms-wmx": "wmx",
      "x-ms-wvx": "wvx",
      "x-msvideo": "avi",
      "x-sgi-movie": "movie",
      "x-matroska": ["mpv", "mkv", "mk3d", "mks"],
      "3gpp2": "3g2",
      "h261": "h261",
      "h263": "h263",
      "h264": "h264",
      "jpeg": "jpgv",
      "jpm": ["jpm", "jpgm"],
      "mj2": ["mj2", "mjp2"],
      "vnd.dece.hd": ["uvh", "uvvh"],
      "vnd.dece.mobile": ["uvm", "uvvm"],
      "vnd.dece.pd": ["uvp", "uvvp"],
      "vnd.dece.sd": ["uvs", "uvvs"],
      "vnd.dece.video": ["uvv", "uvvv"],
      "vnd.dvb.file": "dvb",
      "vnd.fvt": "fvt",
      "vnd.ms-playready.media.pyv": "pyv",
      "vnd.uvvu.mp4": ["uvu", "uvvu"],
      "vnd.vivo": "viv",
      "webm": "webm",
      "x-f4v": "f4v",
      "x-m4v": "m4v",
      "x-ms-vob": "vob",
      "x-smv": "smv"
    },
    "x-conference": {
      "x-cooltalk": "ice"
    },
    "x-world": {
      "x-vrml": ["vrm", "vrml", "wrl", "flr", "wrz", "xaf", "xof"]
    }
  };

  var mimeTypes = function () {
    var mimeTypes = {};

    for (var type in table$1) {
      // eslint-disable-next-line no-prototype-builtins
      if (table$1.hasOwnProperty(type)) {
        for (var subtype in table$1[type]) {
          // eslint-disable-next-line no-prototype-builtins
          if (table$1[type].hasOwnProperty(subtype)) {
            var value = table$1[type][subtype];

            if (typeof value == "string") {
              mimeTypes[value] = type + "/" + subtype;
            } else {
              for (var indexMimeType = 0; indexMimeType < value.length; indexMimeType++) {
                mimeTypes[value[indexMimeType]] = type + "/" + subtype;
              }
            }
          }
        }
      }
    }

    return mimeTypes;
  }();

  function getMimeType(filename) {
    return filename && mimeTypes[filename.split(".").pop().toLowerCase()] || getMimeType$1();
  }

  var $$r = _export;
  var $find = arrayIteration.find;
  var addToUnscopables = addToUnscopables$3;

  var FIND = 'find';
  var SKIPS_HOLES = true;

  // Shouldn't skip holes
  if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  $$r({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
    find: function find(callbackfn /* , that = undefined */) {
      return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables(FIND);

  var classof$3 = classofRaw$1;
  var global$j = global$F;

  var engineIsNode = classof$3(global$j.process) == 'process';

  var $TypeError$2 = TypeError;

  var validateArgumentsLength$3 = function (passed, required) {
    if (passed < required) throw $TypeError$2('Not enough arguments');
    return passed;
  };

  var userAgent$2 = engineUserAgent;

  var engineIsIos = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent$2);

  var global$i = global$F;
  var apply$2 = functionApply;
  var bind$7 = functionBindContext;
  var isCallable$8 = isCallable$s;
  var hasOwn$9 = hasOwnProperty_1;
  var fails$c = fails$H;
  var html = html$2;
  var arraySlice$4 = arraySlice$9;
  var createElement = documentCreateElement$2;
  var validateArgumentsLength$2 = validateArgumentsLength$3;
  var IS_IOS$1 = engineIsIos;
  var IS_NODE$2 = engineIsNode;

  var set = global$i.setImmediate;
  var clear = global$i.clearImmediate;
  var process$2 = global$i.process;
  var Dispatch = global$i.Dispatch;
  var Function$1 = global$i.Function;
  var MessageChannel = global$i.MessageChannel;
  var String$1 = global$i.String;
  var counter = 0;
  var queue$1 = {};
  var ONREADYSTATECHANGE = 'onreadystatechange';
  var location, defer, channel, port;

  try {
    // Deno throws a ReferenceError on `location` access without `--location` flag
    location = global$i.location;
  } catch (error) { /* empty */ }

  var run = function (id) {
    if (hasOwn$9(queue$1, id)) {
      var fn = queue$1[id];
      delete queue$1[id];
      fn();
    }
  };

  var runner = function (id) {
    return function () {
      run(id);
    };
  };

  var listener = function (event) {
    run(event.data);
  };

  var post = function (id) {
    // old engines have not location.origin
    global$i.postMessage(String$1(id), location.protocol + '//' + location.host);
  };

  // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
  if (!set || !clear) {
    set = function setImmediate(handler) {
      validateArgumentsLength$2(arguments.length, 1);
      var fn = isCallable$8(handler) ? handler : Function$1(handler);
      var args = arraySlice$4(arguments, 1);
      queue$1[++counter] = function () {
        apply$2(fn, undefined, args);
      };
      defer(counter);
      return counter;
    };
    clear = function clearImmediate(id) {
      delete queue$1[id];
    };
    // Node.js 0.8-
    if (IS_NODE$2) {
      defer = function (id) {
        process$2.nextTick(runner(id));
      };
    // Sphere (JS game engine) Dispatch API
    } else if (Dispatch && Dispatch.now) {
      defer = function (id) {
        Dispatch.now(runner(id));
      };
    // Browsers with MessageChannel, includes WebWorkers
    // except iOS - https://github.com/zloirock/core-js/issues/624
    } else if (MessageChannel && !IS_IOS$1) {
      channel = new MessageChannel();
      port = channel.port2;
      channel.port1.onmessage = listener;
      defer = bind$7(port.postMessage, port);
    // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
    } else if (
      global$i.addEventListener &&
      isCallable$8(global$i.postMessage) &&
      !global$i.importScripts &&
      location && location.protocol !== 'file:' &&
      !fails$c(post)
    ) {
      defer = post;
      global$i.addEventListener('message', listener, false);
    // IE8-
    } else if (ONREADYSTATECHANGE in createElement('script')) {
      defer = function (id) {
        html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
          html.removeChild(this);
          run(id);
        };
      };
    // Rest old browsers
    } else {
      defer = function (id) {
        setTimeout(runner(id), 0);
      };
    }
  }

  var task$1 = {
    set: set,
    clear: clear
  };

  var userAgent$1 = engineUserAgent;
  var global$h = global$F;

  var engineIsIosPebble = /ipad|iphone|ipod/i.test(userAgent$1) && global$h.Pebble !== undefined;

  var userAgent = engineUserAgent;

  var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(userAgent);

  var global$g = global$F;
  var bind$6 = functionBindContext;
  var getOwnPropertyDescriptor$4 = objectGetOwnPropertyDescriptor.f;
  var macrotask = task$1.set;
  var IS_IOS = engineIsIos;
  var IS_IOS_PEBBLE = engineIsIosPebble;
  var IS_WEBOS_WEBKIT = engineIsWebosWebkit;
  var IS_NODE$1 = engineIsNode;

  var MutationObserver = global$g.MutationObserver || global$g.WebKitMutationObserver;
  var document$2 = global$g.document;
  var process$1 = global$g.process;
  var Promise$1 = global$g.Promise;
  // Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
  var queueMicrotaskDescriptor = getOwnPropertyDescriptor$4(global$g, 'queueMicrotask');
  var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

  var flush, head, last, notify$1, toggle, node, promise, then;

  // modern engines have queueMicrotask method
  if (!queueMicrotask) {
    flush = function () {
      var parent, fn;
      if (IS_NODE$1 && (parent = process$1.domain)) parent.exit();
      while (head) {
        fn = head.fn;
        head = head.next;
        try {
          fn();
        } catch (error) {
          if (head) notify$1();
          else last = undefined;
          throw error;
        }
      } last = undefined;
      if (parent) parent.enter();
    };

    // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
    // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
    if (!IS_IOS && !IS_NODE$1 && !IS_WEBOS_WEBKIT && MutationObserver && document$2) {
      toggle = true;
      node = document$2.createTextNode('');
      new MutationObserver(flush).observe(node, { characterData: true });
      notify$1 = function () {
        node.data = toggle = !toggle;
      };
    // environments with maybe non-completely correct, but existent Promise
    } else if (!IS_IOS_PEBBLE && Promise$1 && Promise$1.resolve) {
      // Promise.resolve without an argument throws an error in LG WebOS 2
      promise = Promise$1.resolve(undefined);
      // workaround of WebKit ~ iOS Safari 10.1 bug
      promise.constructor = Promise$1;
      then = bind$6(promise.then, promise);
      notify$1 = function () {
        then(flush);
      };
    // Node.js without promises
    } else if (IS_NODE$1) {
      notify$1 = function () {
        process$1.nextTick(flush);
      };
    // for other environments - macrotask based on:
    // - setImmediate
    // - MessageChannel
    // - window.postMessage
    // - onreadystatechange
    // - setTimeout
    } else {
      // strange IE + webpack dev server bug - use .bind(global)
      macrotask = bind$6(macrotask, global$g);
      notify$1 = function () {
        macrotask(flush);
      };
    }
  }

  var microtask$1 = queueMicrotask || function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify$1();
    } last = task;
  };

  var global$f = global$F;

  var hostReportErrors$1 = function (a, b) {
    var console = global$f.console;
    if (console && console.error) {
      arguments.length == 1 ? console.error(a) : console.error(a, b);
    }
  };

  var perform$3 = function (exec) {
    try {
      return { error: false, value: exec() };
    } catch (error) {
      return { error: true, value: error };
    }
  };

  var Queue$1 = function () {
    this.head = null;
    this.tail = null;
  };

  Queue$1.prototype = {
    add: function (item) {
      var entry = { item: item, next: null };
      if (this.head) this.tail.next = entry;
      else this.head = entry;
      this.tail = entry;
    },
    get: function () {
      var entry = this.head;
      if (entry) {
        this.head = entry.next;
        if (this.tail === entry) this.tail = null;
        return entry.item;
      }
    }
  };

  var queue = Queue$1;

  var global$e = global$F;

  var promiseNativeConstructor = global$e.Promise;

  var engineIsBrowser = typeof window == 'object' && typeof Deno != 'object';

  var global$d = global$F;
  var NativePromiseConstructor$3 = promiseNativeConstructor;
  var isCallable$7 = isCallable$s;
  var isForced$2 = isForced_1;
  var inspectSource = inspectSource$4;
  var wellKnownSymbol$8 = wellKnownSymbol$t;
  var IS_BROWSER = engineIsBrowser;
  var V8_VERSION = engineV8Version;

  NativePromiseConstructor$3 && NativePromiseConstructor$3.prototype;
  var SPECIES = wellKnownSymbol$8('species');
  var SUBCLASSING = false;
  var NATIVE_PROMISE_REJECTION_EVENT$1 = isCallable$7(global$d.PromiseRejectionEvent);

  var FORCED_PROMISE_CONSTRUCTOR$5 = isForced$2('Promise', function () {
    var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(NativePromiseConstructor$3);
    var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(NativePromiseConstructor$3);
    // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
    // We can't detect it synchronously, so just check versions
    if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true;
    // We can't use @@species feature detection in V8 since it causes
    // deoptimization and performance degradation
    // https://github.com/zloirock/core-js/issues/679
    if (V8_VERSION >= 51 && /native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) return false;
    // Detect correctness of subclassing with @@species support
    var promise = new NativePromiseConstructor$3(function (resolve) { resolve(1); });
    var FakePromise = function (exec) {
      exec(function () { /* empty */ }, function () { /* empty */ });
    };
    var constructor = promise.constructor = {};
    constructor[SPECIES] = FakePromise;
    SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
    if (!SUBCLASSING) return true;
    // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return !GLOBAL_CORE_JS_PROMISE && IS_BROWSER && !NATIVE_PROMISE_REJECTION_EVENT$1;
  });

  var promiseConstructorDetection = {
    CONSTRUCTOR: FORCED_PROMISE_CONSTRUCTOR$5,
    REJECTION_EVENT: NATIVE_PROMISE_REJECTION_EVENT$1,
    SUBCLASSING: SUBCLASSING
  };

  var newPromiseCapability$2 = {};

  var aCallable$3 = aCallable$9;

  var PromiseCapability = function (C) {
    var resolve, reject;
    this.promise = new C(function ($$resolve, $$reject) {
      if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
      resolve = $$resolve;
      reject = $$reject;
    });
    this.resolve = aCallable$3(resolve);
    this.reject = aCallable$3(reject);
  };

  // `NewPromiseCapability` abstract operation
  // https://tc39.es/ecma262/#sec-newpromisecapability
  newPromiseCapability$2.f = function (C) {
    return new PromiseCapability(C);
  };

  var $$q = _export;
  var IS_NODE = engineIsNode;
  var global$c = global$F;
  var call$b = functionCall;
  var defineBuiltIn$7 = defineBuiltIn$f;
  var setPrototypeOf = objectSetPrototypeOf;
  var setToStringTag$4 = setToStringTag$8;
  var setSpecies$2 = setSpecies$4;
  var aCallable$2 = aCallable$9;
  var isCallable$6 = isCallable$s;
  var isObject$6 = isObject$k;
  var anInstance$4 = anInstance$7;
  var speciesConstructor = speciesConstructor$4;
  var task = task$1.set;
  var microtask = microtask$1;
  var hostReportErrors = hostReportErrors$1;
  var perform$2 = perform$3;
  var Queue = queue;
  var InternalStateModule$5 = internalState;
  var NativePromiseConstructor$2 = promiseNativeConstructor;
  var PromiseConstructorDetection = promiseConstructorDetection;
  var newPromiseCapabilityModule$3 = newPromiseCapability$2;

  var PROMISE = 'Promise';
  var FORCED_PROMISE_CONSTRUCTOR$4 = PromiseConstructorDetection.CONSTRUCTOR;
  var NATIVE_PROMISE_REJECTION_EVENT = PromiseConstructorDetection.REJECTION_EVENT;
  var NATIVE_PROMISE_SUBCLASSING = PromiseConstructorDetection.SUBCLASSING;
  var getInternalPromiseState = InternalStateModule$5.getterFor(PROMISE);
  var setInternalState$5 = InternalStateModule$5.set;
  var NativePromisePrototype$1 = NativePromiseConstructor$2 && NativePromiseConstructor$2.prototype;
  var PromiseConstructor = NativePromiseConstructor$2;
  var PromisePrototype = NativePromisePrototype$1;
  var TypeError$5 = global$c.TypeError;
  var document$1 = global$c.document;
  var process = global$c.process;
  var newPromiseCapability$1 = newPromiseCapabilityModule$3.f;
  var newGenericPromiseCapability = newPromiseCapability$1;

  var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && global$c.dispatchEvent);
  var UNHANDLED_REJECTION = 'unhandledrejection';
  var REJECTION_HANDLED = 'rejectionhandled';
  var PENDING = 0;
  var FULFILLED = 1;
  var REJECTED = 2;
  var HANDLED = 1;
  var UNHANDLED = 2;

  var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

  // helpers
  var isThenable = function (it) {
    var then;
    return isObject$6(it) && isCallable$6(then = it.then) ? then : false;
  };

  var callReaction = function (reaction, state) {
    var value = state.value;
    var ok = state.state == FULFILLED;
    var handler = ok ? reaction.ok : reaction.fail;
    var resolve = reaction.resolve;
    var reject = reaction.reject;
    var domain = reaction.domain;
    var result, then, exited;
    try {
      if (handler) {
        if (!ok) {
          if (state.rejection === UNHANDLED) onHandleUnhandled(state);
          state.rejection = HANDLED;
        }
        if (handler === true) result = value;
        else {
          if (domain) domain.enter();
          result = handler(value); // can throw
          if (domain) {
            domain.exit();
            exited = true;
          }
        }
        if (result === reaction.promise) {
          reject(TypeError$5('Promise-chain cycle'));
        } else if (then = isThenable(result)) {
          call$b(then, result, resolve, reject);
        } else resolve(result);
      } else reject(value);
    } catch (error) {
      if (domain && !exited) domain.exit();
      reject(error);
    }
  };

  var notify = function (state, isReject) {
    if (state.notified) return;
    state.notified = true;
    microtask(function () {
      var reactions = state.reactions;
      var reaction;
      while (reaction = reactions.get()) {
        callReaction(reaction, state);
      }
      state.notified = false;
      if (isReject && !state.rejection) onUnhandled(state);
    });
  };

  var dispatchEvent = function (name, promise, reason) {
    var event, handler;
    if (DISPATCH_EVENT) {
      event = document$1.createEvent('Event');
      event.promise = promise;
      event.reason = reason;
      event.initEvent(name, false, true);
      global$c.dispatchEvent(event);
    } else event = { promise: promise, reason: reason };
    if (!NATIVE_PROMISE_REJECTION_EVENT && (handler = global$c['on' + name])) handler(event);
    else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
  };

  var onUnhandled = function (state) {
    call$b(task, global$c, function () {
      var promise = state.facade;
      var value = state.value;
      var IS_UNHANDLED = isUnhandled(state);
      var result;
      if (IS_UNHANDLED) {
        result = perform$2(function () {
          if (IS_NODE) {
            process.emit('unhandledRejection', value, promise);
          } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
        });
        // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
        state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
        if (result.error) throw result.value;
      }
    });
  };

  var isUnhandled = function (state) {
    return state.rejection !== HANDLED && !state.parent;
  };

  var onHandleUnhandled = function (state) {
    call$b(task, global$c, function () {
      var promise = state.facade;
      if (IS_NODE) {
        process.emit('rejectionHandled', promise);
      } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
    });
  };

  var bind$5 = function (fn, state, unwrap) {
    return function (value) {
      fn(state, value, unwrap);
    };
  };

  var internalReject = function (state, value, unwrap) {
    if (state.done) return;
    state.done = true;
    if (unwrap) state = unwrap;
    state.value = value;
    state.state = REJECTED;
    notify(state, true);
  };

  var internalResolve = function (state, value, unwrap) {
    if (state.done) return;
    state.done = true;
    if (unwrap) state = unwrap;
    try {
      if (state.facade === value) throw TypeError$5("Promise can't be resolved itself");
      var then = isThenable(value);
      if (then) {
        microtask(function () {
          var wrapper = { done: false };
          try {
            call$b(then, value,
              bind$5(internalResolve, wrapper, state),
              bind$5(internalReject, wrapper, state)
            );
          } catch (error) {
            internalReject(wrapper, error, state);
          }
        });
      } else {
        state.value = value;
        state.state = FULFILLED;
        notify(state, false);
      }
    } catch (error) {
      internalReject({ done: false }, error, state);
    }
  };

  // constructor polyfill
  if (FORCED_PROMISE_CONSTRUCTOR$4) {
    // 25.4.3.1 Promise(executor)
    PromiseConstructor = function Promise(executor) {
      anInstance$4(this, PromisePrototype);
      aCallable$2(executor);
      call$b(Internal, this);
      var state = getInternalPromiseState(this);
      try {
        executor(bind$5(internalResolve, state), bind$5(internalReject, state));
      } catch (error) {
        internalReject(state, error);
      }
    };

    PromisePrototype = PromiseConstructor.prototype;

    // eslint-disable-next-line no-unused-vars -- required for `.length`
    Internal = function Promise(executor) {
      setInternalState$5(this, {
        type: PROMISE,
        done: false,
        notified: false,
        parent: false,
        reactions: new Queue(),
        rejection: false,
        state: PENDING,
        value: undefined
      });
    };

    // `Promise.prototype.then` method
    // https://tc39.es/ecma262/#sec-promise.prototype.then
    Internal.prototype = defineBuiltIn$7(PromisePrototype, 'then', function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability$1(speciesConstructor(this, PromiseConstructor));
      state.parent = true;
      reaction.ok = isCallable$6(onFulfilled) ? onFulfilled : true;
      reaction.fail = isCallable$6(onRejected) && onRejected;
      reaction.domain = IS_NODE ? process.domain : undefined;
      if (state.state == PENDING) state.reactions.add(reaction);
      else microtask(function () {
        callReaction(reaction, state);
      });
      return reaction.promise;
    });

    OwnPromiseCapability = function () {
      var promise = new Internal();
      var state = getInternalPromiseState(promise);
      this.promise = promise;
      this.resolve = bind$5(internalResolve, state);
      this.reject = bind$5(internalReject, state);
    };

    newPromiseCapabilityModule$3.f = newPromiseCapability$1 = function (C) {
      return C === PromiseConstructor || C === PromiseWrapper
        ? new OwnPromiseCapability(C)
        : newGenericPromiseCapability(C);
    };

    if (isCallable$6(NativePromiseConstructor$2) && NativePromisePrototype$1 !== Object.prototype) {
      nativeThen = NativePromisePrototype$1.then;

      if (!NATIVE_PROMISE_SUBCLASSING) {
        // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
        defineBuiltIn$7(NativePromisePrototype$1, 'then', function then(onFulfilled, onRejected) {
          var that = this;
          return new PromiseConstructor(function (resolve, reject) {
            call$b(nativeThen, that, resolve, reject);
          }).then(onFulfilled, onRejected);
        // https://github.com/zloirock/core-js/issues/640
        }, { unsafe: true });
      }

      // make `.constructor === Promise` work for native promise-based APIs
      try {
        delete NativePromisePrototype$1.constructor;
      } catch (error) { /* empty */ }

      // make `instanceof Promise` work for native promise-based APIs
      if (setPrototypeOf) {
        setPrototypeOf(NativePromisePrototype$1, PromisePrototype);
      }
    }
  }

  $$q({ global: true, constructor: true, wrap: true, forced: FORCED_PROMISE_CONSTRUCTOR$4 }, {
    Promise: PromiseConstructor
  });

  setToStringTag$4(PromiseConstructor, PROMISE, false);
  setSpecies$2(PROMISE);

  var call$a = functionCall;
  var anObject$6 = anObject$i;
  var getMethod$1 = getMethod$5;

  var iteratorClose$2 = function (iterator, kind, value) {
    var innerResult, innerError;
    anObject$6(iterator);
    try {
      innerResult = getMethod$1(iterator, 'return');
      if (!innerResult) {
        if (kind === 'throw') throw value;
        return value;
      }
      innerResult = call$a(innerResult, iterator);
    } catch (error) {
      innerError = true;
      innerResult = error;
    }
    if (kind === 'throw') throw value;
    if (innerError) throw innerResult;
    anObject$6(innerResult);
    return value;
  };

  var bind$4 = functionBindContext;
  var call$9 = functionCall;
  var anObject$5 = anObject$i;
  var tryToString$1 = tryToString$7;
  var isArrayIteratorMethod$1 = isArrayIteratorMethod$3;
  var lengthOfArrayLike$2 = lengthOfArrayLike$f;
  var isPrototypeOf$3 = objectIsPrototypeOf;
  var getIterator$2 = getIterator$4;
  var getIteratorMethod$2 = getIteratorMethod$5;
  var iteratorClose$1 = iteratorClose$2;

  var $TypeError$1 = TypeError;

  var Result = function (stopped, result) {
    this.stopped = stopped;
    this.result = result;
  };

  var ResultPrototype = Result.prototype;

  var iterate$5 = function (iterable, unboundFunction, options) {
    var that = options && options.that;
    var AS_ENTRIES = !!(options && options.AS_ENTRIES);
    var IS_ITERATOR = !!(options && options.IS_ITERATOR);
    var INTERRUPTED = !!(options && options.INTERRUPTED);
    var fn = bind$4(unboundFunction, that);
    var iterator, iterFn, index, length, result, next, step;

    var stop = function (condition) {
      if (iterator) iteratorClose$1(iterator, 'normal', condition);
      return new Result(true, condition);
    };

    var callFn = function (value) {
      if (AS_ENTRIES) {
        anObject$5(value);
        return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
      } return INTERRUPTED ? fn(value, stop) : fn(value);
    };

    if (IS_ITERATOR) {
      iterator = iterable;
    } else {
      iterFn = getIteratorMethod$2(iterable);
      if (!iterFn) throw $TypeError$1(tryToString$1(iterable) + ' is not iterable');
      // optimisation for array iterators
      if (isArrayIteratorMethod$1(iterFn)) {
        for (index = 0, length = lengthOfArrayLike$2(iterable); length > index; index++) {
          result = callFn(iterable[index]);
          if (result && isPrototypeOf$3(ResultPrototype, result)) return result;
        } return new Result(false);
      }
      iterator = getIterator$2(iterable, iterFn);
    }

    next = iterator.next;
    while (!(step = call$9(next, iterator)).done) {
      try {
        result = callFn(step.value);
      } catch (error) {
        iteratorClose$1(iterator, 'throw', error);
      }
      if (typeof result == 'object' && result && isPrototypeOf$3(ResultPrototype, result)) return result;
    } return new Result(false);
  };

  var NativePromiseConstructor$1 = promiseNativeConstructor;
  var checkCorrectnessOfIteration$2 = checkCorrectnessOfIteration$4;
  var FORCED_PROMISE_CONSTRUCTOR$3 = promiseConstructorDetection.CONSTRUCTOR;

  var promiseStaticsIncorrectIteration = FORCED_PROMISE_CONSTRUCTOR$3 || !checkCorrectnessOfIteration$2(function (iterable) {
    NativePromiseConstructor$1.all(iterable).then(undefined, function () { /* empty */ });
  });

  var $$p = _export;
  var call$8 = functionCall;
  var aCallable$1 = aCallable$9;
  var newPromiseCapabilityModule$2 = newPromiseCapability$2;
  var perform$1 = perform$3;
  var iterate$4 = iterate$5;
  var PROMISE_STATICS_INCORRECT_ITERATION$1 = promiseStaticsIncorrectIteration;

  // `Promise.all` method
  // https://tc39.es/ecma262/#sec-promise.all
  $$p({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION$1 }, {
    all: function all(iterable) {
      var C = this;
      var capability = newPromiseCapabilityModule$2.f(C);
      var resolve = capability.resolve;
      var reject = capability.reject;
      var result = perform$1(function () {
        var $promiseResolve = aCallable$1(C.resolve);
        var values = [];
        var counter = 0;
        var remaining = 1;
        iterate$4(iterable, function (promise) {
          var index = counter++;
          var alreadyCalled = false;
          remaining++;
          call$8($promiseResolve, C, promise).then(function (value) {
            if (alreadyCalled) return;
            alreadyCalled = true;
            values[index] = value;
            --remaining || resolve(values);
          }, reject);
        });
        --remaining || resolve(values);
      });
      if (result.error) reject(result.value);
      return capability.promise;
    }
  });

  var $$o = _export;
  var FORCED_PROMISE_CONSTRUCTOR$2 = promiseConstructorDetection.CONSTRUCTOR;
  var NativePromiseConstructor = promiseNativeConstructor;
  var getBuiltIn$4 = getBuiltIn$b;
  var isCallable$5 = isCallable$s;
  var defineBuiltIn$6 = defineBuiltIn$f;

  var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;

  // `Promise.prototype.catch` method
  // https://tc39.es/ecma262/#sec-promise.prototype.catch
  $$o({ target: 'Promise', proto: true, forced: FORCED_PROMISE_CONSTRUCTOR$2, real: true }, {
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });

  // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
  if (isCallable$5(NativePromiseConstructor)) {
    var method = getBuiltIn$4('Promise').prototype['catch'];
    if (NativePromisePrototype['catch'] !== method) {
      defineBuiltIn$6(NativePromisePrototype, 'catch', method, { unsafe: true });
    }
  }

  var $$n = _export;
  var call$7 = functionCall;
  var aCallable = aCallable$9;
  var newPromiseCapabilityModule$1 = newPromiseCapability$2;
  var perform = perform$3;
  var iterate$3 = iterate$5;
  var PROMISE_STATICS_INCORRECT_ITERATION = promiseStaticsIncorrectIteration;

  // `Promise.race` method
  // https://tc39.es/ecma262/#sec-promise.race
  $$n({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
    race: function race(iterable) {
      var C = this;
      var capability = newPromiseCapabilityModule$1.f(C);
      var reject = capability.reject;
      var result = perform(function () {
        var $promiseResolve = aCallable(C.resolve);
        iterate$3(iterable, function (promise) {
          call$7($promiseResolve, C, promise).then(capability.resolve, reject);
        });
      });
      if (result.error) reject(result.value);
      return capability.promise;
    }
  });

  var $$m = _export;
  var call$6 = functionCall;
  var newPromiseCapabilityModule = newPromiseCapability$2;
  var FORCED_PROMISE_CONSTRUCTOR$1 = promiseConstructorDetection.CONSTRUCTOR;

  // `Promise.reject` method
  // https://tc39.es/ecma262/#sec-promise.reject
  $$m({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR$1 }, {
    reject: function reject(r) {
      var capability = newPromiseCapabilityModule.f(this);
      call$6(capability.reject, undefined, r);
      return capability.promise;
    }
  });

  var anObject$4 = anObject$i;
  var isObject$5 = isObject$k;
  var newPromiseCapability = newPromiseCapability$2;

  var promiseResolve$1 = function (C, x) {
    anObject$4(C);
    if (isObject$5(x) && x.constructor === C) return x;
    var promiseCapability = newPromiseCapability.f(C);
    var resolve = promiseCapability.resolve;
    resolve(x);
    return promiseCapability.promise;
  };

  var $$l = _export;
  var getBuiltIn$3 = getBuiltIn$b;
  var FORCED_PROMISE_CONSTRUCTOR = promiseConstructorDetection.CONSTRUCTOR;
  var promiseResolve = promiseResolve$1;

  getBuiltIn$3('Promise');

  // `Promise.resolve` method
  // https://tc39.es/ecma262/#sec-promise.resolve
  $$l({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR }, {
    resolve: function resolve(x) {
      return promiseResolve(this, x);
    }
  });

  var $$k = _export;
  var toObject$3 = toObject$d;
  var toAbsoluteIndex = toAbsoluteIndex$8;
  var toIntegerOrInfinity$1 = toIntegerOrInfinity$9;
  var lengthOfArrayLike$1 = lengthOfArrayLike$f;
  var doesNotExceedSafeInteger = doesNotExceedSafeInteger$2;
  var arraySpeciesCreate = arraySpeciesCreate$3;
  var createProperty$2 = createProperty$6;
  var deletePropertyOrThrow = deletePropertyOrThrow$2;
  var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$5;

  var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$1('splice');

  var max$1 = Math.max;
  var min$3 = Math.min;

  // `Array.prototype.splice` method
  // https://tc39.es/ecma262/#sec-array.prototype.splice
  // with adding support of @@species
  $$k({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
    splice: function splice(start, deleteCount /* , ...items */) {
      var O = toObject$3(this);
      var len = lengthOfArrayLike$1(O);
      var actualStart = toAbsoluteIndex(start, len);
      var argumentsLength = arguments.length;
      var insertCount, actualDeleteCount, A, k, from, to;
      if (argumentsLength === 0) {
        insertCount = actualDeleteCount = 0;
      } else if (argumentsLength === 1) {
        insertCount = 0;
        actualDeleteCount = len - actualStart;
      } else {
        insertCount = argumentsLength - 2;
        actualDeleteCount = min$3(max$1(toIntegerOrInfinity$1(deleteCount), 0), len - actualStart);
      }
      doesNotExceedSafeInteger(len + insertCount - actualDeleteCount);
      A = arraySpeciesCreate(O, actualDeleteCount);
      for (k = 0; k < actualDeleteCount; k++) {
        from = actualStart + k;
        if (from in O) createProperty$2(A, k, O[from]);
      }
      A.length = actualDeleteCount;
      if (insertCount < actualDeleteCount) {
        for (k = actualStart; k < len - actualDeleteCount; k++) {
          from = k + actualDeleteCount;
          to = k + insertCount;
          if (from in O) O[to] = O[from];
          else deletePropertyOrThrow(O, to);
        }
        for (k = len; k > len - actualDeleteCount + insertCount; k--) deletePropertyOrThrow(O, k - 1);
      } else if (insertCount > actualDeleteCount) {
        for (k = len - actualDeleteCount; k > actualStart; k--) {
          from = k + actualDeleteCount - 1;
          to = k + insertCount - 1;
          if (from in O) O[to] = O[from];
          else deletePropertyOrThrow(O, to);
        }
      }
      for (k = 0; k < insertCount; k++) {
        O[k + actualStart] = arguments[k + 2];
      }
      O.length = len - actualDeleteCount + insertCount;
      return A;
    }
  });

  var global$b = global$F;

  var globalIsFinite = global$b.isFinite;

  // `Number.isFinite` method
  // https://tc39.es/ecma262/#sec-number.isfinite
  // eslint-disable-next-line es-x/no-number-isfinite -- safe
  var numberIsFinite$1 = Number.isFinite || function isFinite(it) {
    return typeof it == 'number' && globalIsFinite(it);
  };

  var $$j = _export;
  var numberIsFinite = numberIsFinite$1;

  // `Number.isFinite` method
  // https://tc39.es/ecma262/#sec-number.isfinite
  $$j({ target: 'Number', stat: true }, { isFinite: numberIsFinite });

  var uncurryThis$g = functionUncurryThis;

  // `thisNumberValue` abstract operation
  // https://tc39.es/ecma262/#sec-thisnumbervalue
  var thisNumberValue$1 = uncurryThis$g(1.0.valueOf);

  // a string of all valid unicode whitespaces
  var whitespaces$2 = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
    '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

  var uncurryThis$f = functionUncurryThis;
  var requireObjectCoercible$3 = requireObjectCoercible$8;
  var toString$6 = toString$a;
  var whitespaces$1 = whitespaces$2;

  var replace$6 = uncurryThis$f(''.replace);
  var whitespace = '[' + whitespaces$1 + ']';
  var ltrim = RegExp('^' + whitespace + whitespace + '*');
  var rtrim = RegExp(whitespace + whitespace + '*$');

  // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
  var createMethod$1 = function (TYPE) {
    return function ($this) {
      var string = toString$6(requireObjectCoercible$3($this));
      if (TYPE & 1) string = replace$6(string, ltrim, '');
      if (TYPE & 2) string = replace$6(string, rtrim, '');
      return string;
    };
  };

  var stringTrim = {
    // `String.prototype.{ trimLeft, trimStart }` methods
    // https://tc39.es/ecma262/#sec-string.prototype.trimstart
    start: createMethod$1(1),
    // `String.prototype.{ trimRight, trimEnd }` methods
    // https://tc39.es/ecma262/#sec-string.prototype.trimend
    end: createMethod$1(2),
    // `String.prototype.trim` method
    // https://tc39.es/ecma262/#sec-string.prototype.trim
    trim: createMethod$1(3)
  };

  var DESCRIPTORS$7 = descriptors;
  var global$a = global$F;
  var uncurryThis$e = functionUncurryThis;
  var isForced$1 = isForced_1;
  var defineBuiltIn$5 = defineBuiltIn$f;
  var hasOwn$8 = hasOwnProperty_1;
  var inheritIfRequired$1 = inheritIfRequired$3;
  var isPrototypeOf$2 = objectIsPrototypeOf;
  var isSymbol$2 = isSymbol$6;
  var toPrimitive = toPrimitive$3;
  var fails$b = fails$H;
  var getOwnPropertyNames = objectGetOwnPropertyNames.f;
  var getOwnPropertyDescriptor$3 = objectGetOwnPropertyDescriptor.f;
  var defineProperty$6 = objectDefineProperty.f;
  var thisNumberValue = thisNumberValue$1;
  var trim = stringTrim.trim;

  var NUMBER = 'Number';
  var NativeNumber = global$a[NUMBER];
  var NumberPrototype = NativeNumber.prototype;
  var TypeError$4 = global$a.TypeError;
  var arraySlice$3 = uncurryThis$e(''.slice);
  var charCodeAt$2 = uncurryThis$e(''.charCodeAt);

  // `ToNumeric` abstract operation
  // https://tc39.es/ecma262/#sec-tonumeric
  var toNumeric = function (value) {
    var primValue = toPrimitive(value, 'number');
    return typeof primValue == 'bigint' ? primValue : toNumber(primValue);
  };

  // `ToNumber` abstract operation
  // https://tc39.es/ecma262/#sec-tonumber
  var toNumber = function (argument) {
    var it = toPrimitive(argument, 'number');
    var first, third, radix, maxCode, digits, length, index, code;
    if (isSymbol$2(it)) throw TypeError$4('Cannot convert a Symbol value to a number');
    if (typeof it == 'string' && it.length > 2) {
      it = trim(it);
      first = charCodeAt$2(it, 0);
      if (first === 43 || first === 45) {
        third = charCodeAt$2(it, 2);
        if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
      } else if (first === 48) {
        switch (charCodeAt$2(it, 1)) {
          case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
          case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
          default: return +it;
        }
        digits = arraySlice$3(it, 2);
        length = digits.length;
        for (index = 0; index < length; index++) {
          code = charCodeAt$2(digits, index);
          // parseInt parses a string to a first unavailable symbol
          // but ToNumber should return NaN if a string contains unavailable symbols
          if (code < 48 || code > maxCode) return NaN;
        } return parseInt(digits, radix);
      }
    } return +it;
  };

  // `Number` constructor
  // https://tc39.es/ecma262/#sec-number-constructor
  if (isForced$1(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
    var NumberWrapper = function Number(value) {
      var n = arguments.length < 1 ? 0 : NativeNumber(toNumeric(value));
      var dummy = this;
      // check on 1..constructor(foo) case
      return isPrototypeOf$2(NumberPrototype, dummy) && fails$b(function () { thisNumberValue(dummy); })
        ? inheritIfRequired$1(Object(n), dummy, NumberWrapper) : n;
    };
    for (var keys = DESCRIPTORS$7 ? getOwnPropertyNames(NativeNumber) : (
      // ES3:
      'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
      // ES2015 (in case, if modules with ES2015 Number statics required before):
      'EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,' +
      // ESNext
      'fromString,range'
    ).split(','), j$1 = 0, key; keys.length > j$1; j$1++) {
      if (hasOwn$8(NativeNumber, key = keys[j$1]) && !hasOwn$8(NumberWrapper, key)) {
        defineProperty$6(NumberWrapper, key, getOwnPropertyDescriptor$3(NativeNumber, key));
      }
    }
    NumberWrapper.prototype = NumberPrototype;
    NumberPrototype.constructor = NumberWrapper;
    defineBuiltIn$5(global$a, NUMBER, NumberWrapper, { constructor: true });
  }

  var $$i = _export;
  var $filter = arrayIteration.filter;
  var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$5;

  var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');

  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  // with adding support of @@species
  $$i({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
    filter: function filter(callbackfn /* , thisArg */) {
      return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // iterable DOM collections
  // flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
  var domIterables = {
    CSSRuleList: 0,
    CSSStyleDeclaration: 0,
    CSSValueList: 0,
    ClientRectList: 0,
    DOMRectList: 0,
    DOMStringList: 0,
    DOMTokenList: 1,
    DataTransferItemList: 0,
    FileList: 0,
    HTMLAllCollection: 0,
    HTMLCollection: 0,
    HTMLFormElement: 0,
    HTMLSelectElement: 0,
    MediaList: 0,
    MimeTypeArray: 0,
    NamedNodeMap: 0,
    NodeList: 1,
    PaintRequestList: 0,
    Plugin: 0,
    PluginArray: 0,
    SVGLengthList: 0,
    SVGNumberList: 0,
    SVGPathSegList: 0,
    SVGPointList: 0,
    SVGStringList: 0,
    SVGTransformList: 0,
    SourceBufferList: 0,
    StyleSheetList: 0,
    TextTrackCueList: 0,
    TextTrackList: 0,
    TouchList: 0
  };

  // in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
  var documentCreateElement = documentCreateElement$2;

  var classList = documentCreateElement('span').classList;
  var DOMTokenListPrototype$2 = classList && classList.constructor && classList.constructor.prototype;

  var domTokenListPrototype = DOMTokenListPrototype$2 === Object.prototype ? undefined : DOMTokenListPrototype$2;

  var $forEach$1 = arrayIteration.forEach;
  var arrayMethodIsStrict = arrayMethodIsStrict$2;

  var STRICT_METHOD = arrayMethodIsStrict('forEach');

  // `Array.prototype.forEach` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  var arrayForEach = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
    return $forEach$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  // eslint-disable-next-line es-x/no-array-prototype-foreach -- safe
  } : [].forEach;

  var global$9 = global$F;
  var DOMIterables$1 = domIterables;
  var DOMTokenListPrototype$1 = domTokenListPrototype;
  var forEach = arrayForEach;
  var createNonEnumerableProperty$1 = createNonEnumerableProperty$a;

  var handlePrototype$1 = function (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
      createNonEnumerableProperty$1(CollectionPrototype, 'forEach', forEach);
    } catch (error) {
      CollectionPrototype.forEach = forEach;
    }
  };

  for (var COLLECTION_NAME$1 in DOMIterables$1) {
    if (DOMIterables$1[COLLECTION_NAME$1]) {
      handlePrototype$1(global$9[COLLECTION_NAME$1] && global$9[COLLECTION_NAME$1].prototype);
    }
  }

  handlePrototype$1(DOMTokenListPrototype$1);

  // A type of promise-like that resolves synchronously and supports only one observer
  const _Pact = /*#__PURE__*/(function() {
  	function _Pact() {}
  	_Pact.prototype.then = function(onFulfilled, onRejected) {
  		const result = new _Pact();
  		const state = this.s;
  		if (state) {
  			const callback = state & 1 ? onFulfilled : onRejected;
  			if (callback) {
  				try {
  					_settle(result, 1, callback(this.v));
  				} catch (e) {
  					_settle(result, 2, e);
  				}
  				return result;
  			} else {
  				return this;
  			}
  		}
  		this.o = function(_this) {
  			try {
  				const value = _this.v;
  				if (_this.s & 1) {
  					_settle(result, 1, onFulfilled ? onFulfilled(value) : value);
  				} else if (onRejected) {
  					_settle(result, 1, onRejected(value));
  				} else {
  					_settle(result, 2, value);
  				}
  			} catch (e) {
  				_settle(result, 2, e);
  			}
  		};
  		return result;
  	};
  	return _Pact;
  })();

  // Settles a pact synchronously
  function _settle(pact, state, value) {
  	if (!pact.s) {
  		if (value instanceof _Pact) {
  			if (value.s) {
  				if (state & 1) {
  					state = value.s;
  				}
  				value = value.v;
  			} else {
  				value.o = _settle.bind(null, pact, state);
  				return;
  			}
  		}
  		if (value && value.then) {
  			value.then(_settle.bind(null, pact, state), _settle.bind(null, pact, 2));
  			return;
  		}
  		pact.s = state;
  		pact.v = value;
  		const observer = pact.o;
  		if (observer) {
  			observer(pact);
  		}
  	}
  }

  function _isSettledPact(thenable) {
  	return thenable instanceof _Pact && thenable.s & 1;
  }

  // Converts argument to a function that always returns a Promise
  function _async(f) {
  	return function() {
  		for (var args = [], i = 0; i < arguments.length; i++) {
  			args[i] = arguments[i];
  		}
  		try {
  			return Promise.resolve(f.apply(this, args));
  		} catch(e) {
  			return Promise.reject(e);
  		}
  	}
  }

  // Awaits on a value that may or may not be a Promise (equivalent to the await keyword in ES2015, with continuations passed explicitly)
  function _await(value, then, direct) {
  	if (direct) {
  		return then ? then(value) : value;
  	}
  	if (!value || !value.then) {
  		value = Promise.resolve(value);
  	}
  	return then ? value.then(then) : value;
  }

  // Awaits on a value that may or may not be a Promise, then ignores it
  function _awaitIgnored(value, direct) {
  	if (!direct) {
  		return value && value.then ? value.then(_empty) : Promise.resolve();
  	}
  }

  // Proceeds after a value has resolved, or proceeds immediately if the value is not thenable
  function _continue(value, then) {
  	return value && value.then ? value.then(then) : then(value);
  }

  // Proceeds after a value has resolved, or proceeds immediately if the value is not thenable
  function _continueIgnored(value) {
  	if (value && value.then) {
  		return value.then(_empty);
  	}
  }

  // Asynchronously iterate through an object that has a length property, passing the index as the first argument to the callback (even as the length property changes)
  function _forTo(array, body, check) {
  	var i = -1, pact, reject;
  	function _cycle(result) {
  		try {
  			while (++i < array.length && (!check || !check())) {
  				result = body(i);
  				if (result && result.then) {
  					if (_isSettledPact(result)) {
  						result = result.v;
  					} else {
  						result.then(_cycle, reject || (reject = _settle.bind(null, pact = new _Pact(), 2)));
  						return;
  					}
  				}
  			}
  			if (pact) {
  				_settle(pact, 1, result);
  			} else {
  				pact = result;
  			}
  		} catch (e) {
  			_settle(pact || (pact = new _Pact()), 2, e);
  		}
  	}
  	_cycle();
  	return pact;
  }

  const _iteratorSymbol =  typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

  // Asynchronously iterate through an object's values
  // Uses for...of if the runtime supports it, otherwise iterates until length on a copy
  function _forOf(target, body, check) {
  	if (typeof target[_iteratorSymbol] === "function") {
  		var iterator = target[_iteratorSymbol](), step, pact, reject;
  		function _cycle(result) {
  			try {
  				while (!(step = iterator.next()).done && (!check || !check())) {
  					result = body(step.value);
  					if (result && result.then) {
  						if (_isSettledPact(result)) {
  							result = result.v;
  						} else {
  							result.then(_cycle, reject || (reject = _settle.bind(null, pact = new _Pact(), 2)));
  							return;
  						}
  					}
  				}
  				if (pact) {
  					_settle(pact, 1, result);
  				} else {
  					pact = result;
  				}
  			} catch (e) {
  				_settle(pact || (pact = new _Pact()), 2, e);
  			}
  		}
  		_cycle();
  		if (iterator.return) {
  			var _fixup = function(value) {
  				try {
  					if (!step.done) {
  						iterator.return();
  					}
  				} catch(e) {
  				}
  				return value;
  			};
  			if (pact && pact.then) {
  				return pact.then(_fixup, function(e) {
  					throw _fixup(e);
  				});
  			}
  			_fixup();
  		}
  		return pact;
  	}
  	// No support for Symbol.iterator
  	if (!("length" in target)) {
  		throw new TypeError("Object is not iterable");
  	}
  	// Handle live collections properly
  	var values = [];
  	for (var i = 0; i < target.length; i++) {
  		values.push(target[i]);
  	}
  	return _forTo(values, function(i) { return body(values[i]); }, check);
  }

   typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

  // Asynchronously implement a generic for loop
  function _for(test, update, body) {
  	var stage;
  	for (;;) {
  		var shouldContinue = test();
  		if (_isSettledPact(shouldContinue)) {
  			shouldContinue = shouldContinue.v;
  		}
  		if (!shouldContinue) {
  			return result;
  		}
  		if (shouldContinue.then) {
  			stage = 0;
  			break;
  		}
  		var result = body();
  		if (result && result.then) {
  			if (_isSettledPact(result)) {
  				result = result.s;
  			} else {
  				stage = 1;
  				break;
  			}
  		}
  		if (update) {
  			var updateValue = update();
  			if (updateValue && updateValue.then && !_isSettledPact(updateValue)) {
  				stage = 2;
  				break;
  			}
  		}
  	}
  	var pact = new _Pact();
  	var reject = _settle.bind(null, pact, 2);
  	(stage === 0 ? shouldContinue.then(_resumeAfterTest) : stage === 1 ? result.then(_resumeAfterBody) : updateValue.then(_resumeAfterUpdate)).then(void 0, reject);
  	return pact;
  	function _resumeAfterBody(value) {
  		result = value;
  		do {
  			if (update) {
  				updateValue = update();
  				if (updateValue && updateValue.then && !_isSettledPact(updateValue)) {
  					updateValue.then(_resumeAfterUpdate).then(void 0, reject);
  					return;
  				}
  			}
  			shouldContinue = test();
  			if (!shouldContinue || (_isSettledPact(shouldContinue) && !shouldContinue.v)) {
  				_settle(pact, 1, result);
  				return;
  			}
  			if (shouldContinue.then) {
  				shouldContinue.then(_resumeAfterTest).then(void 0, reject);
  				return;
  			}
  			result = body();
  			if (_isSettledPact(result)) {
  				result = result.v;
  			}
  		} while (!result || !result.then);
  		result.then(_resumeAfterBody).then(void 0, reject);
  	}
  	function _resumeAfterTest(shouldContinue) {
  		if (shouldContinue) {
  			result = body();
  			if (result && result.then) {
  				result.then(_resumeAfterBody).then(void 0, reject);
  			} else {
  				_resumeAfterBody(result);
  			}
  		} else {
  			_settle(pact, 1, result);
  		}
  	}
  	function _resumeAfterUpdate() {
  		if (shouldContinue = test()) {
  			if (shouldContinue.then) {
  				shouldContinue.then(_resumeAfterTest).then(void 0, reject);
  			} else {
  				_resumeAfterTest(shouldContinue);
  			}
  		} else {
  			_settle(pact, 1, result);
  		}
  	}
  }

  // Asynchronously implement a do ... while loop
  function _do(body, test) {
  	var awaitBody;
  	do {
  		var result = body();
  		if (result && result.then) {
  			if (_isSettledPact(result)) {
  				result = result.v;
  			} else {
  				awaitBody = true;
  				break;
  			}
  		}
  		var shouldContinue = test();
  		if (_isSettledPact(shouldContinue)) {
  			shouldContinue = shouldContinue.v;
  		}
  		if (!shouldContinue) {
  			return result;
  		}
  	} while (!shouldContinue.then);
  	const pact = new _Pact();
  	const reject = _settle.bind(null, pact, 2);
  	(awaitBody ? result.then(_resumeAfterBody) : shouldContinue.then(_resumeAfterTest)).then(void 0, reject);
  	return pact;
  	function _resumeAfterBody(value) {
  		result = value;
  		for (;;) {
  			shouldContinue = test();
  			if (_isSettledPact(shouldContinue)) {
  				shouldContinue = shouldContinue.v;
  			}
  			if (!shouldContinue) {
  				break;
  			}
  			if (shouldContinue.then) {
  				shouldContinue.then(_resumeAfterTest).then(void 0, reject);
  				return;
  			}
  			result = body();
  			if (result && result.then) {
  				if (_isSettledPact(result)) {
  					result = result.v;
  				} else {
  					result.then(_resumeAfterBody).then(void 0, reject);
  					return;
  				}
  			}
  		}
  		_settle(pact, 1, result);
  	}
  	function _resumeAfterTest(shouldContinue) {
  		if (shouldContinue) {
  			do {
  				result = body();
  				if (result && result.then) {
  					if (_isSettledPact(result)) {
  						result = result.v;
  					} else {
  						result.then(_resumeAfterBody).then(void 0, reject);
  						return;
  					}
  				}
  				shouldContinue = test();
  				if (_isSettledPact(shouldContinue)) {
  					shouldContinue = shouldContinue.v;
  				}
  				if (!shouldContinue) {
  					_settle(pact, 1, result);
  					return;
  				}
  			} while (!shouldContinue.then);
  			shouldContinue.then(_resumeAfterTest).then(void 0, reject);
  		} else {
  			_settle(pact, 1, result);
  		}
  	}
  }

  // Asynchronously call a function and pass the result to explicitly passed continuations
  function _call(body, then, direct) {
  	if (direct) {
  		return then ? then(body()) : body();
  	}
  	try {
  		var result = Promise.resolve(body());
  		return then ? result.then(then) : result;
  	} catch (e) {
  		return Promise.reject(e);
  	}
  }

  // Asynchronously call a function and swallow the result
  function _callIgnored(body, direct) {
  	return _call(body, _empty, direct);
  }

  // Asynchronously call a function and pass the result to explicitly passed continuations
  function _invoke(body, then) {
  	var result = body();
  	if (result && result.then) {
  		return result.then(then);
  	}
  	return then(result);
  }

  // Asynchronously call a function and swallow the result
  function _invokeIgnored(body) {
  	var result = body();
  	if (result && result.then) {
  		return result.then(_empty);
  	}
  }

  // Asynchronously call a function and send errors to recovery continuation
  function _catch(body, recover) {
  	try {
  		var result = body();
  	} catch(e) {
  		return recover(e);
  	}
  	if (result && result.then) {
  		return result.then(void 0, recover);
  	}
  	return result;
  }

  // Asynchronously await a promise and pass the result to a finally continuation
  function _finallyRethrows(body, finalizer) {
  	try {
  		var result = body();
  	} catch (e) {
  		return finalizer(true, e);
  	}
  	if (result && result.then) {
  		return result.then(finalizer.bind(null, false), finalizer.bind(null, true));
  	}
  	return finalizer(false, result);
  }

  // Rethrow or return a value from a finally continuation
  function _rethrow(thrown, value) {
  	if (thrown)
  		throw value;
  	return value;
  }

  // Empty function to implement break and other control flow that ignores asynchronous results
  function _empty() {
  }

  var isRegExp = isRegexp;

  var $TypeError = TypeError;

  var notARegexp = function (it) {
    if (isRegExp(it)) {
      throw $TypeError("The method doesn't accept regular expressions");
    } return it;
  };

  var wellKnownSymbol$7 = wellKnownSymbol$t;

  var MATCH = wellKnownSymbol$7('match');

  var correctIsRegexpLogic = function (METHOD_NAME) {
    var regexp = /./;
    try {
      '/./'[METHOD_NAME](regexp);
    } catch (error1) {
      try {
        regexp[MATCH] = false;
        return '/./'[METHOD_NAME](regexp);
      } catch (error2) { /* empty */ }
    } return false;
  };

  var $$h = _export;
  var uncurryThis$d = functionUncurryThis;
  var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
  var toLength$2 = toLength$a;
  var toString$5 = toString$a;
  var notARegExp$1 = notARegexp;
  var requireObjectCoercible$2 = requireObjectCoercible$8;
  var correctIsRegExpLogic$1 = correctIsRegexpLogic;

  // eslint-disable-next-line es-x/no-string-prototype-startswith -- safe
  var un$StartsWith = uncurryThis$d(''.startsWith);
  var stringSlice$5 = uncurryThis$d(''.slice);
  var min$2 = Math.min;

  var CORRECT_IS_REGEXP_LOGIC$1 = correctIsRegExpLogic$1('startsWith');
  // https://github.com/zloirock/core-js/pull/702
  var MDN_POLYFILL_BUG$1 = !CORRECT_IS_REGEXP_LOGIC$1 && !!function () {
    var descriptor = getOwnPropertyDescriptor$2(String.prototype, 'startsWith');
    return descriptor && !descriptor.writable;
  }();

  // `String.prototype.startsWith` method
  // https://tc39.es/ecma262/#sec-string.prototype.startswith
  $$h({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG$1 && !CORRECT_IS_REGEXP_LOGIC$1 }, {
    startsWith: function startsWith(searchString /* , position = 0 */) {
      var that = toString$5(requireObjectCoercible$2(this));
      notARegExp$1(searchString);
      var index = toLength$2(min$2(arguments.length > 1 ? arguments[1] : undefined, that.length));
      var search = toString$5(searchString);
      return un$StartsWith
        ? un$StartsWith(that, search, index)
        : stringSlice$5(that, index, index + search.length) === search;
    }
  });

  /*
   Copyright (c) 2022 Gildas Lormeau. All rights reserved.

   Redistribution and use in source and binary forms, with or without
   modification, are permitted provided that the following conditions are met:

   1. Redistributions of source code must retain the above copyright notice,
   this list of conditions and the following disclaimer.

   2. Redistributions in binary form must reproduce the above copyright 
   notice, this list of conditions and the following disclaimer in 
   the documentation and/or other materials provided with the distribution.

   3. The names of the authors may not be used to endorse or promote products
   derived from this software without specific prior written permission.

   THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
   INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
   FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
   INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
   INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
   LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
   OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
   EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   */
  var table = [];

  for (var i = 0; i < 256; i++) {
    var t = i;

    for (var j = 0; j < 8; j++) {
      if (t & 1) {
        t = t >>> 1 ^ 0xEDB88320;
      } else {
        t = t >>> 1;
      }
    }

    table[i] = t;
  }

  var Crc32 = /*#__PURE__*/function () {
    function Crc32(crc) {
      _classCallCheck(this, Crc32);

      this.crc = crc || -1;
    }

    _createClass(Crc32, [{
      key: "append",
      value: function append(data) {
        var crc = this.crc | 0;

        for (var offset = 0, length = data.length | 0; offset < length; offset++) {
          crc = crc >>> 8 ^ table[(crc ^ data[offset]) & 0xFF];
        }

        this.crc = crc;
      }
    }, {
      key: "get",
      value: function get() {
        return ~this.crc;
      }
    }]);

    return Crc32;
  }();

  var global$8 = global$F;
  var DOMIterables = domIterables;
  var DOMTokenListPrototype = domTokenListPrototype;
  var ArrayIteratorMethods = es_array_iterator;
  var createNonEnumerableProperty = createNonEnumerableProperty$a;
  var wellKnownSymbol$6 = wellKnownSymbol$t;

  var ITERATOR$2 = wellKnownSymbol$6('iterator');
  var TO_STRING_TAG = wellKnownSymbol$6('toStringTag');
  var ArrayValues = ArrayIteratorMethods.values;

  var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
    if (CollectionPrototype) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[ITERATOR$2] !== ArrayValues) try {
        createNonEnumerableProperty(CollectionPrototype, ITERATOR$2, ArrayValues);
      } catch (error) {
        CollectionPrototype[ITERATOR$2] = ArrayValues;
      }
      if (!CollectionPrototype[TO_STRING_TAG]) {
        createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
      }
      if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
        // some Chrome versions have non-configurable methods on DOMTokenList
        if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
          createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
        } catch (error) {
          CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
        }
      }
    }
  };

  for (var COLLECTION_NAME in DOMIterables) {
    handlePrototype(global$8[COLLECTION_NAME] && global$8[COLLECTION_NAME].prototype, COLLECTION_NAME);
  }

  handlePrototype(DOMTokenListPrototype, 'DOMTokenList');

  var anObject$3 = anObject$i;
  var iteratorClose = iteratorClose$2;

  // call something on iterator step with safe closing on error
  var callWithSafeIterationClosing$1 = function (iterator, fn, value, ENTRIES) {
    try {
      return ENTRIES ? fn(anObject$3(value)[0], value[1]) : fn(value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }
  };

  var bind$3 = functionBindContext;
  var call$5 = functionCall;
  var toObject$2 = toObject$d;
  var callWithSafeIterationClosing = callWithSafeIterationClosing$1;
  var isArrayIteratorMethod = isArrayIteratorMethod$3;
  var isConstructor = isConstructor$4;
  var lengthOfArrayLike = lengthOfArrayLike$f;
  var createProperty$1 = createProperty$6;
  var getIterator$1 = getIterator$4;
  var getIteratorMethod$1 = getIteratorMethod$5;

  var $Array = Array;

  // `Array.from` method implementation
  // https://tc39.es/ecma262/#sec-array.from
  var arrayFrom$1 = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject$2(arrayLike);
    var IS_CONSTRUCTOR = isConstructor(this);
    var argumentsLength = arguments.length;
    var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    if (mapping) mapfn = bind$3(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
    var iteratorMethod = getIteratorMethod$1(O);
    var index = 0;
    var length, result, step, iterator, next, value;
    // if the target is not iterable or it's an array with the default iterator - use a simple case
    if (iteratorMethod && !(this === $Array && isArrayIteratorMethod(iteratorMethod))) {
      iterator = getIterator$1(O, iteratorMethod);
      next = iterator.next;
      result = IS_CONSTRUCTOR ? new this() : [];
      for (;!(step = call$5(next, iterator)).done; index++) {
        value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
        createProperty$1(result, index, value);
      }
    } else {
      length = lengthOfArrayLike(O);
      result = IS_CONSTRUCTOR ? new this(length) : $Array(length);
      for (;length > index; index++) {
        value = mapping ? mapfn(O[index], index) : O[index];
        createProperty$1(result, index, value);
      }
    }
    result.length = index;
    return result;
  };

  var $$g = _export;
  var from = arrayFrom$1;
  var checkCorrectnessOfIteration$1 = checkCorrectnessOfIteration$4;

  var INCORRECT_ITERATION = !checkCorrectnessOfIteration$1(function (iterable) {
    // eslint-disable-next-line es-x/no-array-from -- required for testing
    Array.from(iterable);
  });

  // `Array.from` method
  // https://tc39.es/ecma262/#sec-array.from
  $$g({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
    from: from
  });

  var charAt$4 = stringMultibyte.charAt;
  var toString$4 = toString$a;
  var InternalStateModule$4 = internalState;
  var defineIterator$1 = defineIterator$3;

  var STRING_ITERATOR = 'String Iterator';
  var setInternalState$4 = InternalStateModule$4.set;
  var getInternalState$1 = InternalStateModule$4.getterFor(STRING_ITERATOR);

  // `String.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-string.prototype-@@iterator
  defineIterator$1(String, 'String', function (iterated) {
    setInternalState$4(this, {
      type: STRING_ITERATOR,
      string: toString$4(iterated),
      index: 0
    });
  // `%StringIteratorPrototype%.next` method
  // https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
  }, function next() {
    var state = getInternalState$1(this);
    var string = state.string;
    var index = state.index;
    var point;
    if (index >= string.length) return { value: undefined, done: true };
    point = charAt$4(string, index);
    state.index += point.length;
    return { value: point, done: false };
  });

  function encodeText(value) {
    if (typeof TextEncoder == "undefined") {
      value = unescape(encodeURIComponent(value));
      var result = new Uint8Array(value.length);

      for (var i = 0; i < result.length; i++) {
        result[i] = value.charCodeAt(i);
      }

      return result;
    } else {
      return new TextEncoder().encode(value);
    }
  }

  var createTypedArrayConstructor = typedArrayConstructor.exports;

  // `Uint32Array` constructor
  // https://tc39.es/ecma262/#sec-typedarray-objects
  createTypedArrayConstructor('Uint32', function (init) {
    return function Uint32Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  });

  var $$f = _export;
  var global$7 = global$F;
  var arrayBufferModule = arrayBuffer;
  var setSpecies$1 = setSpecies$4;

  var ARRAY_BUFFER = 'ArrayBuffer';
  var ArrayBuffer$1 = arrayBufferModule[ARRAY_BUFFER];
  var NativeArrayBuffer = global$7[ARRAY_BUFFER];

  // `ArrayBuffer` constructor
  // https://tc39.es/ecma262/#sec-arraybuffer-constructor
  $$f({ global: true, constructor: true, forced: NativeArrayBuffer !== ArrayBuffer$1 }, {
    ArrayBuffer: ArrayBuffer$1
  });

  setSpecies$1(ARRAY_BUFFER);

  // Derived from https://github.com/xqdoo00o/jszip/blob/master/lib/sjcl.js and https://github.com/bitwiseshiftleft/sjcl

  /*
   * SJCL is open. You can use, modify and redistribute it under a BSD
   * license or under the GNU GPL, version 2.0.
   */

  /** @fileOverview Javascript cryptography implementation.
   *
   * Crush to remove comments, shorten variable names and
   * generally reduce transmission size.
   *
   * @author Emily Stark
   * @author Mike Hamburg
   * @author Dan Boneh
   */

  /*jslint indent: 2, bitwise: false, nomen: false, plusplus: false, white: false, regexp: false */

  /** @fileOverview Arrays of bits, encoded as arrays of Numbers.
   *
   * @author Emily Stark
   * @author Mike Hamburg
   * @author Dan Boneh
   */

  /**
   * Arrays of bits, encoded as arrays of Numbers.
   * @namespace
   * @description
   * <p>
   * These objects are the currency accepted by SJCL's crypto functions.
   * </p>
   *
   * <p>
   * Most of our crypto primitives operate on arrays of 4-byte words internally,
   * but many of them can take arguments that are not a multiple of 4 bytes.
   * This library encodes arrays of bits (whose size need not be a multiple of 8
   * bits) as arrays of 32-bit words.  The bits are packed, big-endian, into an
   * array of words, 32 bits at a time.  Since the words are double-precision
   * floating point numbers, they fit some extra data.  We use this (in a private,
   * possibly-changing manner) to encode the number of bits actually  present
   * in the last word of the array.
   * </p>
   *
   * <p>
   * Because bitwise ops clear this out-of-band data, these arrays can be passed
   * to ciphers like AES which want arrays of words.
   * </p>
   */
  var bitArray = {
    /**
     * Concatenate two bit arrays.
     * @param {bitArray} a1 The first array.
     * @param {bitArray} a2 The second array.
     * @return {bitArray} The concatenation of a1 and a2.
     */
    concat: function concat(a1, a2) {
      if (a1.length === 0 || a2.length === 0) {
        return a1.concat(a2);
      }

      var last = a1[a1.length - 1],
          shift = bitArray.getPartial(last);

      if (shift === 32) {
        return a1.concat(a2);
      } else {
        return bitArray._shiftRight(a2, shift, last | 0, a1.slice(0, a1.length - 1));
      }
    },

    /**
     * Find the length of an array of bits.
     * @param {bitArray} a The array.
     * @return {Number} The length of a, in bits.
     */
    bitLength: function bitLength(a) {
      var l = a.length;

      if (l === 0) {
        return 0;
      }

      var x = a[l - 1];
      return (l - 1) * 32 + bitArray.getPartial(x);
    },

    /**
     * Truncate an array.
     * @param {bitArray} a The array.
     * @param {Number} len The length to truncate to, in bits.
     * @return {bitArray} A new array, truncated to len bits.
     */
    clamp: function clamp(a, len) {
      if (a.length * 32 < len) {
        return a;
      }

      a = a.slice(0, Math.ceil(len / 32));
      var l = a.length;
      len = len & 31;

      if (l > 0 && len) {
        a[l - 1] = bitArray.partial(len, a[l - 1] & 0x80000000 >> len - 1, 1);
      }

      return a;
    },

    /**
     * Make a partial word for a bit array.
     * @param {Number} len The number of bits in the word.
     * @param {Number} x The bits.
     * @param {Number} [_end=0] Pass 1 if x has already been shifted to the high side.
     * @return {Number} The partial word.
     */
    partial: function partial(len, x, _end) {
      if (len === 32) {
        return x;
      }

      return (_end ? x | 0 : x << 32 - len) + len * 0x10000000000;
    },

    /**
     * Get the number of bits used by a partial word.
     * @param {Number} x The partial word.
     * @return {Number} The number of bits used by the partial word.
     */
    getPartial: function getPartial(x) {
      return Math.round(x / 0x10000000000) || 32;
    },

    /** Shift an array right.
     * @param {bitArray} a The array to shift.
     * @param {Number} shift The number of bits to shift.
     * @param {Number} [carry=0] A byte to carry in
     * @param {bitArray} [out=[]] An array to prepend to the output.
     * @private
     */
    _shiftRight: function _shiftRight(a, shift, carry, out) {
      if (out === undefined) {
        out = [];
      }

      for (; shift >= 32; shift -= 32) {
        out.push(carry);
        carry = 0;
      }

      if (shift === 0) {
        return out.concat(a);
      }

      for (var i = 0; i < a.length; i++) {
        out.push(carry | a[i] >>> shift);
        carry = a[i] << 32 - shift;
      }

      var last2 = a.length ? a[a.length - 1] : 0;
      var shift2 = bitArray.getPartial(last2);
      out.push(bitArray.partial(shift + shift2 & 31, shift + shift2 > 32 ? carry : out.pop(), 1));
      return out;
    }
  };
  /** @fileOverview Bit array codec implementations.
   *
   * @author Emily Stark
   * @author Mike Hamburg
   * @author Dan Boneh
   */

  /**
   * Arrays of bytes
   * @namespace
   */

  var codec = {
    bytes: {
      /** Convert from a bitArray to an array of bytes. */
      fromBits: function fromBits(arr) {
        var bl = bitArray.bitLength(arr);
        var byteLength = bl / 8;
        var out = new Uint8Array(byteLength);
        var tmp;

        for (var i = 0; i < byteLength; i++) {
          if ((i & 3) === 0) {
            tmp = arr[i / 4];
          }

          out[i] = tmp >>> 24;
          tmp <<= 8;
        }

        return out;
      },

      /** Convert from an array of bytes to a bitArray. */
      toBits: function toBits(bytes) {
        var out = [];
        var i;
        var tmp = 0;

        for (i = 0; i < bytes.length; i++) {
          tmp = tmp << 8 | bytes[i];

          if ((i & 3) === 3) {
            out.push(tmp);
            tmp = 0;
          }
        }

        if (i & 3) {
          out.push(bitArray.partial(8 * (i & 3), tmp));
        }

        return out;
      }
    }
  };
  var hash = {};
  /**
   * Context for a SHA-1 operation in progress.
   * @constructor
   */

  hash.sha1 = function (hash) {
    if (hash) {
      this._h = hash._h.slice(0);
      this._buffer = hash._buffer.slice(0);
      this._length = hash._length;
    } else {
      this.reset();
    }
  };

  hash.sha1.prototype = {
    /**
     * The hash's block size, in bits.
     * @constant
     */
    blockSize: 512,

    /**
     * Reset the hash state.
     * @return this
     */
    reset: function reset() {
      var sha1 = this;
      sha1._h = this._init.slice(0);
      sha1._buffer = [];
      sha1._length = 0;
      return sha1;
    },

    /**
     * Input several words to the hash.
     * @param {bitArray|String} data the data to hash.
     * @return this
     */
    update: function update(data) {
      var sha1 = this;

      if (typeof data === "string") {
        data = codec.utf8String.toBits(data);
      }

      var b = sha1._buffer = bitArray.concat(sha1._buffer, data);
      var ol = sha1._length;
      var nl = sha1._length = ol + bitArray.bitLength(data);

      if (nl > 9007199254740991) {
        throw new Error("Cannot hash more than 2^53 - 1 bits");
      }

      var c = new Uint32Array(b);
      var j = 0;

      for (var i = sha1.blockSize + ol - (sha1.blockSize + ol & sha1.blockSize - 1); i <= nl; i += sha1.blockSize) {
        sha1._block(c.subarray(16 * j, 16 * (j + 1)));

        j += 1;
      }

      b.splice(0, 16 * j);
      return sha1;
    },

    /**
     * Complete hashing and output the hash value.
     * @return {bitArray} The hash value, an array of 5 big-endian words. TODO
     */
    finalize: function finalize() {
      var sha1 = this;
      var b = sha1._buffer;
      var h = sha1._h; // Round out and push the buffer

      b = bitArray.concat(b, [bitArray.partial(1, 1)]); // Round out the buffer to a multiple of 16 words, less the 2 length words.

      for (var i = b.length + 2; i & 15; i++) {
        b.push(0);
      } // append the length


      b.push(Math.floor(sha1._length / 0x100000000));
      b.push(sha1._length | 0);

      while (b.length) {
        sha1._block(b.splice(0, 16));
      }

      sha1.reset();
      return h;
    },

    /**
     * The SHA-1 initialization vector.
     * @private
     */
    _init: [0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0],

    /**
     * The SHA-1 hash key.
     * @private
     */
    _key: [0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xCA62C1D6],

    /**
     * The SHA-1 logical functions f(0), f(1), ..., f(79).
     * @private
     */
    _f: function _f(t, b, c, d) {
      if (t <= 19) {
        return b & c | ~b & d;
      } else if (t <= 39) {
        return b ^ c ^ d;
      } else if (t <= 59) {
        return b & c | b & d | c & d;
      } else if (t <= 79) {
        return b ^ c ^ d;
      }
    },

    /**
     * Circular left-shift operator.
     * @private
     */
    _S: function _S(n, x) {
      return x << n | x >>> 32 - n;
    },

    /**
     * Perform one cycle of SHA-1.
     * @param {Uint32Array|bitArray} words one block of words.
     * @private
     */
    _block: function _block(words) {
      var sha1 = this;
      var h = sha1._h; // When words is passed to _block, it has 16 elements. SHA1 _block
      // function extends words with new elements (at the end there are 80 elements). 
      // The problem is that if we use Uint32Array instead of Array, 
      // the length of Uint32Array cannot be changed. Thus, we replace words with a 
      // normal Array here.

      var w = Array(80); // do not use Uint32Array here as the instantiation is slower

      for (var j = 0; j < 16; j++) {
        w[j] = words[j];
      }

      var a = h[0];
      var b = h[1];
      var c = h[2];
      var d = h[3];
      var e = h[4];

      for (var t = 0; t <= 79; t++) {
        if (t >= 16) {
          w[t] = sha1._S(1, w[t - 3] ^ w[t - 8] ^ w[t - 14] ^ w[t - 16]);
        }

        var tmp = sha1._S(5, a) + sha1._f(t, b, c, d) + e + w[t] + sha1._key[Math.floor(t / 20)] | 0;
        e = d;
        d = c;
        c = sha1._S(30, b);
        b = a;
        a = tmp;
      }

      h[0] = h[0] + a | 0;
      h[1] = h[1] + b | 0;
      h[2] = h[2] + c | 0;
      h[3] = h[3] + d | 0;
      h[4] = h[4] + e | 0;
    }
  };
  /** @fileOverview Low-level AES implementation.
   *
   * This file contains a low-level implementation of AES, optimized for
   * size and for efficiency on several browsers.  It is based on
   * OpenSSL's aes_core.c, a public-domain implementation by Vincent
   * Rijmen, Antoon Bosselaers and Paulo Barreto.
   *
   * An older version of this implementation is available in the public
   * domain, but this one is (c) Emily Stark, Mike Hamburg, Dan Boneh,
   * Stanford University 2008-2010 and BSD-licensed for liability
   * reasons.
   *
   * @author Emily Stark
   * @author Mike Hamburg
   * @author Dan Boneh
   */

  var cipher = {};
  /**
   * Schedule out an AES key for both encryption and decryption.  This
   * is a low-level class.  Use a cipher mode to do bulk encryption.
   *
   * @constructor
   * @param {Array} key The key as an array of 4, 6 or 8 words.
   */

  cipher.aes = /*#__PURE__*/function () {
    function _class(key) {
      _classCallCheck(this, _class);

      /**
       * The expanded S-box and inverse S-box tables.  These will be computed
       * on the client so that we don't have to send them down the wire.
       *
       * There are two tables, _tables[0] is for encryption and
       * _tables[1] is for decryption.
       *
       * The first 4 sub-tables are the expanded S-box with MixColumns.  The
       * last (_tables[01][4]) is the S-box itself.
       *
       * @private
       */
      var aes = this;
      aes._tables = [[[], [], [], [], []], [[], [], [], [], []]];

      if (!aes._tables[0][0][0]) {
        aes._precompute();
      }

      var sbox = aes._tables[0][4];
      var decTable = aes._tables[1];
      var keyLen = key.length;
      var i,
          encKey,
          decKey,
          rcon = 1;

      if (keyLen !== 4 && keyLen !== 6 && keyLen !== 8) {
        throw new Error("invalid aes key size");
      }

      aes._key = [encKey = key.slice(0), decKey = []]; // schedule encryption keys

      for (i = keyLen; i < 4 * keyLen + 28; i++) {
        var tmp = encKey[i - 1]; // apply sbox

        if (i % keyLen === 0 || keyLen === 8 && i % keyLen === 4) {
          tmp = sbox[tmp >>> 24] << 24 ^ sbox[tmp >> 16 & 255] << 16 ^ sbox[tmp >> 8 & 255] << 8 ^ sbox[tmp & 255]; // shift rows and add rcon

          if (i % keyLen === 0) {
            tmp = tmp << 8 ^ tmp >>> 24 ^ rcon << 24;
            rcon = rcon << 1 ^ (rcon >> 7) * 283;
          }
        }

        encKey[i] = encKey[i - keyLen] ^ tmp;
      } // schedule decryption keys


      for (var j = 0; i; j++, i--) {
        var _tmp = encKey[j & 3 ? i : i - 4];

        if (i <= 4 || j < 4) {
          decKey[j] = _tmp;
        } else {
          decKey[j] = decTable[0][sbox[_tmp >>> 24]] ^ decTable[1][sbox[_tmp >> 16 & 255]] ^ decTable[2][sbox[_tmp >> 8 & 255]] ^ decTable[3][sbox[_tmp & 255]];
        }
      }
    } // public

    /* Something like this might appear here eventually
    name: "AES",
    blockSize: 4,
    keySizes: [4,6,8],
    */

    /**
     * Encrypt an array of 4 big-endian words.
     * @param {Array} data The plaintext.
     * @return {Array} The ciphertext.
     */


    _createClass(_class, [{
      key: "encrypt",
      value: function encrypt(data) {
        return this._crypt(data, 0);
      }
      /**
       * Decrypt an array of 4 big-endian words.
       * @param {Array} data The ciphertext.
       * @return {Array} The plaintext.
       */

    }, {
      key: "decrypt",
      value: function decrypt(data) {
        return this._crypt(data, 1);
      }
      /**
       * Expand the S-box tables.
       *
       * @private
       */

    }, {
      key: "_precompute",
      value: function _precompute() {
        var encTable = this._tables[0];
        var decTable = this._tables[1];
        var sbox = encTable[4];
        var sboxInv = decTable[4];
        var d = [];
        var th = [];
        var xInv, x2, x4, x8; // Compute double and third tables

        for (var i = 0; i < 256; i++) {
          th[(d[i] = i << 1 ^ (i >> 7) * 283) ^ i] = i;
        }

        for (var x = xInv = 0; !sbox[x]; x ^= x2 || 1, xInv = th[xInv] || 1) {
          // Compute sbox
          var s = xInv ^ xInv << 1 ^ xInv << 2 ^ xInv << 3 ^ xInv << 4;
          s = s >> 8 ^ s & 255 ^ 99;
          sbox[x] = s;
          sboxInv[s] = x; // Compute MixColumns

          x8 = d[x4 = d[x2 = d[x]]];
          var tDec = x8 * 0x1010101 ^ x4 * 0x10001 ^ x2 * 0x101 ^ x * 0x1010100;
          var tEnc = d[s] * 0x101 ^ s * 0x1010100;

          for (var _i = 0; _i < 4; _i++) {
            encTable[_i][x] = tEnc = tEnc << 24 ^ tEnc >>> 8;
            decTable[_i][s] = tDec = tDec << 24 ^ tDec >>> 8;
          }
        } // Compactify.  Considerable speedup on Firefox.


        for (var _i2 = 0; _i2 < 5; _i2++) {
          encTable[_i2] = encTable[_i2].slice(0);
          decTable[_i2] = decTable[_i2].slice(0);
        }
      }
      /**
       * Encryption and decryption core.
       * @param {Array} input Four words to be encrypted or decrypted.
       * @param dir The direction, 0 for encrypt and 1 for decrypt.
       * @return {Array} The four encrypted or decrypted words.
       * @private
       */

    }, {
      key: "_crypt",
      value: function _crypt(input, dir) {
        if (input.length !== 4) {
          throw new Error("invalid aes block size");
        }

        var key = this._key[dir];
        var nInnerRounds = key.length / 4 - 2;
        var out = [0, 0, 0, 0];
        var table = this._tables[dir]; // load up the tables

        var t0 = table[0];
        var t1 = table[1];
        var t2 = table[2];
        var t3 = table[3];
        var sbox = table[4]; // state variables a,b,c,d are loaded with pre-whitened data

        var a = input[0] ^ key[0];
        var b = input[dir ? 3 : 1] ^ key[1];
        var c = input[2] ^ key[2];
        var d = input[dir ? 1 : 3] ^ key[3];
        var kIndex = 4;
        var a2, b2, c2; // Inner rounds.  Cribbed from OpenSSL.

        for (var i = 0; i < nInnerRounds; i++) {
          a2 = t0[a >>> 24] ^ t1[b >> 16 & 255] ^ t2[c >> 8 & 255] ^ t3[d & 255] ^ key[kIndex];
          b2 = t0[b >>> 24] ^ t1[c >> 16 & 255] ^ t2[d >> 8 & 255] ^ t3[a & 255] ^ key[kIndex + 1];
          c2 = t0[c >>> 24] ^ t1[d >> 16 & 255] ^ t2[a >> 8 & 255] ^ t3[b & 255] ^ key[kIndex + 2];
          d = t0[d >>> 24] ^ t1[a >> 16 & 255] ^ t2[b >> 8 & 255] ^ t3[c & 255] ^ key[kIndex + 3];
          kIndex += 4;
          a = a2;
          b = b2;
          c = c2;
        } // Last round.


        for (var _i3 = 0; _i3 < 4; _i3++) {
          out[dir ? 3 & -_i3 : _i3] = sbox[a >>> 24] << 24 ^ sbox[b >> 16 & 255] << 16 ^ sbox[c >> 8 & 255] << 8 ^ sbox[d & 255] ^ key[kIndex++];
          a2 = a;
          a = b;
          b = c;
          c = d;
          d = a2;
        }

        return out;
      }
    }]);

    return _class;
  }();
  /**
   * Random values
   * @namespace
   */


  var random = {
    /** 
     * Generate random words with pure js, cryptographically not as strong & safe as native implementation.
     * @param {TypedArray} typedArray The array to fill.
     * @return {TypedArray} The random values.
     */
    getRandomValues: function getRandomValues(typedArray) {
      var words = new Uint32Array(typedArray.buffer);

      var r = function r(m_w) {
        var m_z = 0x3ade68b1;
        var mask = 0xffffffff;
        return function () {
          m_z = 0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10) & mask;
          m_w = 0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10) & mask;
          var result = ((m_z << 0x10) + m_w & mask) / 0x100000000 + .5;
          return result * (Math.random() > .5 ? 1 : -1);
        };
      };

      for (var i = 0, rcache; i < typedArray.length; i += 4) {
        var _r = r((rcache || Math.random()) * 0x100000000);

        rcache = _r() * 0x3ade67b7;
        words[i / 4] = _r() * 0x100000000 | 0;
      }

      return typedArray;
    }
  };
  /** @fileOverview CTR mode implementation.
   *
   * Special thanks to Roy Nicholson for pointing out a bug in our
   * implementation.
   *
   * @author Emily Stark
   * @author Mike Hamburg
   * @author Dan Boneh
   */

  /** Brian Gladman's CTR Mode.
  * @constructor
  * @param {Object} _prf The aes instance to generate key.
  * @param {bitArray} _iv The iv for ctr mode, it must be 128 bits.
  */

  var mode = {};
  /**
   * Brian Gladman's CTR Mode.
   * @namespace
   */

  mode.ctrGladman = /*#__PURE__*/function () {
    function _class2(prf, iv) {
      _classCallCheck(this, _class2);

      this._prf = prf;
      this._initIv = iv;
      this._iv = iv;
    }

    _createClass(_class2, [{
      key: "reset",
      value: function reset() {
        this._iv = this._initIv;
      }
      /** Input some data to calculate.
       * @param {bitArray} data the data to process, it must be intergral multiple of 128 bits unless it's the last.
       */

    }, {
      key: "update",
      value: function update(data) {
        return this.calculate(this._prf, data, this._iv);
      }
    }, {
      key: "incWord",
      value: function incWord(word) {
        if ((word >> 24 & 0xff) === 0xff) {
          //overflow
          var b1 = word >> 16 & 0xff;
          var b2 = word >> 8 & 0xff;
          var b3 = word & 0xff;

          if (b1 === 0xff) {
            // overflow b1   
            b1 = 0;

            if (b2 === 0xff) {
              b2 = 0;

              if (b3 === 0xff) {
                b3 = 0;
              } else {
                ++b3;
              }
            } else {
              ++b2;
            }
          } else {
            ++b1;
          }

          word = 0;
          word += b1 << 16;
          word += b2 << 8;
          word += b3;
        } else {
          word += 0x01 << 24;
        }

        return word;
      }
    }, {
      key: "incCounter",
      value: function incCounter(counter) {
        if ((counter[0] = this.incWord(counter[0])) === 0) {
          // encr_data in fileenc.c from  Dr Brian Gladman's counts only with DWORD j < 8
          counter[1] = this.incWord(counter[1]);
        }
      }
    }, {
      key: "calculate",
      value: function calculate(prf, data, iv) {
        var l;

        if (!(l = data.length)) {
          return [];
        }

        var bl = bitArray.bitLength(data);

        for (var i = 0; i < l; i += 4) {
          this.incCounter(iv);
          var e = prf.encrypt(iv);
          data[i] ^= e[0];
          data[i + 1] ^= e[1];
          data[i + 2] ^= e[2];
          data[i + 3] ^= e[3];
        }

        return bitArray.clamp(data, bl);
      }
    }]);

    return _class2;
  }();

  var misc = {
    importKey: function importKey(password) {
      return new misc.hmacSha1(codec.bytes.toBits(password));
    },
    pbkdf2: function pbkdf2(prf, salt, count, length) {
      count = count || 10000;

      if (length < 0 || count < 0) {
        throw new Error("invalid params to pbkdf2");
      }

      var byteLength = (length >> 5) + 1 << 2;
      var u, ui, i, j, k;
      var arrayBuffer = new ArrayBuffer(byteLength);
      var out = new DataView(arrayBuffer);
      var outLength = 0;
      var b = bitArray;
      salt = codec.bytes.toBits(salt);

      for (k = 1; outLength < (byteLength || 1); k++) {
        u = ui = prf.encrypt(b.concat(salt, [k]));

        for (i = 1; i < count; i++) {
          ui = prf.encrypt(ui);

          for (j = 0; j < ui.length; j++) {
            u[j] ^= ui[j];
          }
        }

        for (i = 0; outLength < (byteLength || 1) && i < u.length; i++) {
          out.setInt32(outLength, u[i]);
          outLength += 4;
        }
      }

      return arrayBuffer.slice(0, length / 8);
    }
  };
  /** @fileOverview HMAC implementation.
   *
   * @author Emily Stark
   * @author Mike Hamburg
   * @author Dan Boneh
   */

  /** HMAC with the specified hash function.
   * @constructor
   * @param {bitArray} key the key for HMAC.
   * @param {Object} [Hash=hash.sha1] The hash function to use.
   */

  misc.hmacSha1 = /*#__PURE__*/function () {
    function _class3(key) {
      _classCallCheck(this, _class3);

      var hmac = this;
      var Hash = hmac._hash = hash.sha1;
      var exKey = [[], []];
      var bs = Hash.prototype.blockSize / 32;
      hmac._baseHash = [new Hash(), new Hash()];

      if (key.length > bs) {
        key = Hash.hash(key);
      }

      for (var i = 0; i < bs; i++) {
        exKey[0][i] = key[i] ^ 0x36363636;
        exKey[1][i] = key[i] ^ 0x5C5C5C5C;
      }

      hmac._baseHash[0].update(exKey[0]);

      hmac._baseHash[1].update(exKey[1]);

      hmac._resultHash = new Hash(hmac._baseHash[0]);
    }

    _createClass(_class3, [{
      key: "reset",
      value: function reset() {
        var hmac = this;
        hmac._resultHash = new hmac._hash(hmac._baseHash[0]);
        hmac._updated = false;
      }
    }, {
      key: "update",
      value: function update(data) {
        var hmac = this;
        hmac._updated = true;

        hmac._resultHash.update(data);
      }
    }, {
      key: "digest",
      value: function digest() {
        var hmac = this;

        var w = hmac._resultHash.finalize();

        var result = new hmac._hash(hmac._baseHash[1]).update(w).finalize();
        hmac.reset();
        return result;
      }
    }, {
      key: "encrypt",
      value: function encrypt(data) {
        if (!this._updated) {
          this.update(data);
          return this.digest(data);
        } else {
          throw new Error("encrypt on already updated hmac called!");
        }
      }
    }]);

    return _class3;
  }();

  var deriveBits = _async(function (algorithm, baseKey, length) {
    if (CRYPTO_API_SUPPORTED && SUBTLE_API_SUPPORTED && typeof crypto.subtle.deriveBits == "function") {
      return crypto.subtle.deriveBits(algorithm, baseKey, length);
    } else {
      return misc.pbkdf2(baseKey, algorithm.salt, DERIVED_BITS_ALGORITHM.iterations, length);
    }
  });

  var importKey = _async(function (format, password, algorithm, extractable, keyUsages) {
    if (CRYPTO_API_SUPPORTED && SUBTLE_API_SUPPORTED && typeof crypto.subtle.importKey == "function") {
      return crypto.subtle.importKey(format, password, algorithm, extractable, keyUsages);
    } else {
      return misc.importKey(password);
    }
  });

  var createKeys$1 = _async(function (target, password, salt) {
    var encodedPassword = encodeText(password);
    return _await(importKey(RAW_FORMAT, encodedPassword, BASE_KEY_ALGORITHM, false, DERIVED_BITS_USAGE), function (basekey) {
      return _await(deriveBits(Object.assign({
        salt: salt
      }, DERIVED_BITS_ALGORITHM), basekey, 8 * (KEY_LENGTH[target.strength] * 2 + 2)), function (derivedBits) {
        var compositeKey = new Uint8Array(derivedBits);
        target.keys = {
          key: codecBytes.toBits(subarray(compositeKey, 0, KEY_LENGTH[target.strength])),
          authentication: codecBytes.toBits(subarray(compositeKey, KEY_LENGTH[target.strength], KEY_LENGTH[target.strength] * 2)),
          passwordVerification: subarray(compositeKey, KEY_LENGTH[target.strength] * 2)
        };
      });
    });
  });

  var createEncryptionKeys = _async(function (encrypt, password) {
    var salt = getRandomValues(new Uint8Array(SALT_LENGTH[encrypt.strength]));
    return _await(createKeys$1(encrypt, password, salt), function () {
      return concat$1(salt, encrypt.keys.passwordVerification);
    });
  });

  var createDecryptionKeys = _async(function (decrypt, preambleArray, password) {
    return _await(createKeys$1(decrypt, password, subarray(preambleArray, 0, SALT_LENGTH[decrypt.strength])), function () {
      var passwordVerification = subarray(preambleArray, SALT_LENGTH[decrypt.strength]);
      var passwordVerificationKey = decrypt.keys.passwordVerification;

      if (passwordVerificationKey[0] != passwordVerification[0] || passwordVerificationKey[1] != passwordVerification[1]) {
        throw new Error(ERR_INVALID_PASSWORD);
      }
    });
  });

  var ERR_INVALID_PASSWORD = "Invalid pasword";
  var BLOCK_LENGTH = 16;
  var RAW_FORMAT = "raw";
  var PBKDF2_ALGORITHM = {
    name: "PBKDF2"
  };
  var HASH_ALGORITHM = {
    name: "HMAC"
  };
  var HASH_FUNCTION = "SHA-1";
  var BASE_KEY_ALGORITHM = Object.assign({
    hash: HASH_ALGORITHM
  }, PBKDF2_ALGORITHM);
  var DERIVED_BITS_ALGORITHM = Object.assign({
    iterations: 1000,
    hash: {
      name: HASH_FUNCTION
    }
  }, PBKDF2_ALGORITHM);
  var DERIVED_BITS_USAGE = ["deriveBits"];
  var SALT_LENGTH = [8, 12, 16];
  var KEY_LENGTH = [16, 24, 32];
  var SIGNATURE_LENGTH = 10;
  var COUNTER_DEFAULT_VALUE = [0, 0, 0, 0];
  var CRYPTO_API_SUPPORTED = typeof crypto != "undefined";
  var SUBTLE_API_SUPPORTED = CRYPTO_API_SUPPORTED && typeof crypto.subtle != "undefined";
  var codecBytes = codec.bytes;
  var Aes = cipher.aes;
  var CtrGladman = mode.ctrGladman;
  var HmacSha1 = misc.hmacSha1;

  var AESDecrypt = /*#__PURE__*/function () {
    function AESDecrypt(password, signed, strength) {
      _classCallCheck(this, AESDecrypt);

      Object.assign(this, {
        password: password,
        signed: signed,
        strength: strength - 1,
        pendingInput: new Uint8Array(0)
      });
    }

    _createClass(AESDecrypt, [{
      key: "append",
      value: function append(input) {
        try {
          var _this2 = this;

          var aesCrypto = _this2;
          return _await(_invoke(function () {
            if (aesCrypto.password) {
              var preamble = subarray(input, 0, SALT_LENGTH[aesCrypto.strength] + 2);
              return _await(createDecryptionKeys(aesCrypto, preamble, aesCrypto.password), function () {
                aesCrypto.password = null;
                aesCrypto.aesCtrGladman = new CtrGladman(new Aes(aesCrypto.keys.key), Array.from(COUNTER_DEFAULT_VALUE));
                aesCrypto.hmac = new HmacSha1(aesCrypto.keys.authentication);
                input = subarray(input, SALT_LENGTH[aesCrypto.strength] + 2);
              });
            }
          }, function () {
            var output = new Uint8Array(input.length - SIGNATURE_LENGTH - (input.length - SIGNATURE_LENGTH) % BLOCK_LENGTH);
            return _append(aesCrypto, input, output, 0, SIGNATURE_LENGTH, true);
          }));
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }, {
      key: "flush",
      value: function flush() {
        var aesCrypto = this;
        var pendingInput = aesCrypto.pendingInput;
        var chunkToDecrypt = subarray(pendingInput, 0, pendingInput.length - SIGNATURE_LENGTH);
        var originalSignature = subarray(pendingInput, pendingInput.length - SIGNATURE_LENGTH);
        var decryptedChunkArray = new Uint8Array(0);

        if (chunkToDecrypt.length) {
          var encryptedChunk = codecBytes.toBits(chunkToDecrypt);
          aesCrypto.hmac.update(encryptedChunk);
          var decryptedChunk = aesCrypto.aesCtrGladman.update(encryptedChunk);
          decryptedChunkArray = codecBytes.fromBits(decryptedChunk);
        }

        var valid = true;

        if (aesCrypto.signed) {
          var signature = subarray(codecBytes.fromBits(aesCrypto.hmac.digest()), 0, SIGNATURE_LENGTH);

          for (var indexSignature = 0; indexSignature < SIGNATURE_LENGTH; indexSignature++) {
            if (signature[indexSignature] != originalSignature[indexSignature]) {
              valid = false;
            }
          }
        }

        return {
          valid: valid,
          data: decryptedChunkArray
        };
      }
    }]);

    return AESDecrypt;
  }();

  var AESEncrypt = /*#__PURE__*/function () {
    function AESEncrypt(password, strength) {
      _classCallCheck(this, AESEncrypt);

      Object.assign(this, {
        password: password,
        strength: strength - 1,
        pendingInput: new Uint8Array(0)
      });
    }

    _createClass(AESEncrypt, [{
      key: "append",
      value: function append(input) {
        try {
          var _this4 = this;

          var aesCrypto = _this4;
          var preamble = new Uint8Array(0);
          return _await(_invoke(function () {
            if (aesCrypto.password) {
              return _await(createEncryptionKeys(aesCrypto, aesCrypto.password), function (_createEncryptionKeys) {
                preamble = _createEncryptionKeys;
                aesCrypto.password = null;
                aesCrypto.aesCtrGladman = new CtrGladman(new Aes(aesCrypto.keys.key), Array.from(COUNTER_DEFAULT_VALUE));
                aesCrypto.hmac = new HmacSha1(aesCrypto.keys.authentication);
              });
            }
          }, function () {
            var output = new Uint8Array(preamble.length + input.length - input.length % BLOCK_LENGTH);
            output.set(preamble, 0);
            return _append(aesCrypto, input, output, preamble.length, 0);
          }));
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }, {
      key: "flush",
      value: function flush() {
        var aesCrypto = this;
        var encryptedChunkArray = new Uint8Array(0);

        if (aesCrypto.pendingInput.length) {
          var encryptedChunk = aesCrypto.aesCtrGladman.update(codecBytes.toBits(aesCrypto.pendingInput));
          aesCrypto.hmac.update(encryptedChunk);
          encryptedChunkArray = codecBytes.fromBits(encryptedChunk);
        }

        var signature = subarray(codecBytes.fromBits(aesCrypto.hmac.digest()), 0, SIGNATURE_LENGTH);
        return {
          data: concat$1(encryptedChunkArray, signature),
          signature: signature
        };
      }
    }]);

    return AESEncrypt;
  }();

  function _append(aesCrypto, input, output, paddingStart, paddingEnd, verifySignature) {
    var inputLength = input.length - paddingEnd;

    if (aesCrypto.pendingInput.length) {
      input = concat$1(aesCrypto.pendingInput, input);
      output = expand(output, inputLength - inputLength % BLOCK_LENGTH);
    }

    var offset;

    for (offset = 0; offset <= inputLength - BLOCK_LENGTH; offset += BLOCK_LENGTH) {
      var inputChunk = codecBytes.toBits(subarray(input, offset, offset + BLOCK_LENGTH));

      if (verifySignature) {
        aesCrypto.hmac.update(inputChunk);
      }

      var outputChunk = aesCrypto.aesCtrGladman.update(inputChunk);

      if (!verifySignature) {
        aesCrypto.hmac.update(outputChunk);
      }

      output.set(codecBytes.fromBits(outputChunk), offset + paddingStart);
    }

    aesCrypto.pendingInput = subarray(input, offset);
    return output;
  }

  function getRandomValues(array) {
    if (CRYPTO_API_SUPPORTED && typeof crypto.getRandomValues == "function") {
      return crypto.getRandomValues(array);
    } else {
      return random.getRandomValues(array);
    }
  }

  function concat$1(leftArray, rightArray) {
    var array = leftArray;

    if (leftArray.length + rightArray.length) {
      array = new Uint8Array(leftArray.length + rightArray.length);
      array.set(leftArray, 0);
      array.set(rightArray, leftArray.length);
    }

    return array;
  }

  function expand(inputArray, length) {
    if (length && length > inputArray.length) {
      var array = inputArray;
      inputArray = new Uint8Array(length);
      inputArray.set(array, 0);
    }

    return inputArray;
  }

  function subarray(array, begin, end) {
    return array.subarray(begin, end);
  }

  var $$e = _export;
  var fails$a = fails$H;

  // eslint-disable-next-line es-x/no-math-imul -- required for testing
  var $imul = Math.imul;

  var FORCED$1 = fails$a(function () {
    return $imul(0xFFFFFFFF, 5) != -5 || $imul.length != 2;
  });

  // `Math.imul` method
  // https://tc39.es/ecma262/#sec-math.imul
  // some WebKit versions fails with big numbers, some has wrong arity
  $$e({ target: 'Math', stat: true, forced: FORCED$1 }, {
    imul: function imul(x, y) {
      var UINT16 = 0xFFFF;
      var xn = +x;
      var yn = +y;
      var xl = UINT16 & xn;
      var yl = UINT16 & yn;
      return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
    }
  });

  var HEADER_LENGTH = 12;

  var ZipCryptoDecrypt = /*#__PURE__*/function () {
    function ZipCryptoDecrypt(password, passwordVerification) {
      _classCallCheck(this, ZipCryptoDecrypt);

      var zipCrypto = this;
      Object.assign(zipCrypto, {
        password: password,
        passwordVerification: passwordVerification
      });
      createKeys(zipCrypto, password);
    }

    _createClass(ZipCryptoDecrypt, [{
      key: "append",
      value: function append(input) {
        var zipCrypto = this;

        if (zipCrypto.password) {
          var decryptedHeader = decrypt(zipCrypto, input.subarray(0, HEADER_LENGTH));
          zipCrypto.password = null;

          if (decryptedHeader[HEADER_LENGTH - 1] != zipCrypto.passwordVerification) {
            throw new Error(ERR_INVALID_PASSWORD);
          }

          input = input.subarray(HEADER_LENGTH);
        }

        return decrypt(zipCrypto, input);
      }
    }, {
      key: "flush",
      value: function flush() {
        return {
          valid: true,
          data: new Uint8Array(0)
        };
      }
    }]);

    return ZipCryptoDecrypt;
  }();

  var ZipCryptoEncrypt = /*#__PURE__*/function () {
    function ZipCryptoEncrypt(password, passwordVerification) {
      _classCallCheck(this, ZipCryptoEncrypt);

      var zipCrypto = this;
      Object.assign(zipCrypto, {
        password: password,
        passwordVerification: passwordVerification
      });
      createKeys(zipCrypto, password);
    }

    _createClass(ZipCryptoEncrypt, [{
      key: "append",
      value: function append(input) {
        var zipCrypto = this;
        var output;
        var offset;

        if (zipCrypto.password) {
          zipCrypto.password = null;
          var header = crypto.getRandomValues(new Uint8Array(HEADER_LENGTH));
          header[HEADER_LENGTH - 1] = zipCrypto.passwordVerification;
          output = new Uint8Array(input.length + header.length);
          output.set(encrypt(zipCrypto, header), 0);
          offset = HEADER_LENGTH;
        } else {
          output = new Uint8Array(input.length);
          offset = 0;
        }

        output.set(encrypt(zipCrypto, input), offset);
        return output;
      }
    }, {
      key: "flush",
      value: function flush() {
        return {
          data: new Uint8Array(0)
        };
      }
    }]);

    return ZipCryptoEncrypt;
  }();

  function decrypt(target, input) {
    var output = new Uint8Array(input.length);

    for (var index = 0; index < input.length; index++) {
      output[index] = getByte(target) ^ input[index];
      updateKeys(target, output[index]);
    }

    return output;
  }

  function encrypt(target, input) {
    var output = new Uint8Array(input.length);

    for (var index = 0; index < input.length; index++) {
      output[index] = getByte(target) ^ input[index];
      updateKeys(target, input[index]);
    }

    return output;
  }

  function createKeys(target, password) {
    target.keys = [0x12345678, 0x23456789, 0x34567890];
    target.crcKey0 = new Crc32(target.keys[0]);
    target.crcKey2 = new Crc32(target.keys[2]);

    for (var index = 0; index < password.length; index++) {
      updateKeys(target, password.charCodeAt(index));
    }
  }

  function updateKeys(target, byte) {
    target.crcKey0.append([byte]);
    target.keys[0] = ~target.crcKey0.get();
    target.keys[1] = getInt32(target.keys[1] + getInt8(target.keys[0]));
    target.keys[1] = getInt32(Math.imul(target.keys[1], 134775813) + 1);
    target.crcKey2.append([target.keys[1] >>> 24]);
    target.keys[2] = ~target.crcKey2.get();
  }

  function getByte(target) {
    var temp = target.keys[2] | 2;
    return getInt8(Math.imul(temp, temp ^ 1) >>> 8);
  }

  function getInt8(number) {
    return number & 0xFF;
  }

  function getInt32(number) {
    return number & 0xFFFFFFFF;
  }

  var CODEC_DEFLATE = "deflate";
  var CODEC_INFLATE = "inflate";
  var ERR_INVALID_SIGNATURE = "Invalid signature";

  var Inflate = /*#__PURE__*/function () {
    function Inflate(codecConstructor, _ref, _ref2) {
      var signature = _ref.signature,
          password = _ref.password,
          signed = _ref.signed,
          compressed = _ref.compressed,
          zipCrypto = _ref.zipCrypto,
          passwordVerification = _ref.passwordVerification,
          encryptionStrength = _ref.encryptionStrength;
      var chunkSize = _ref2.chunkSize;

      _classCallCheck(this, Inflate);

      var encrypted = Boolean(password);
      Object.assign(this, {
        signature: signature,
        encrypted: encrypted,
        signed: signed,
        compressed: compressed,
        inflate: compressed && new codecConstructor({
          chunkSize: chunkSize
        }),
        crc32: signed && new Crc32(),
        zipCrypto: zipCrypto,
        decrypt: encrypted && zipCrypto ? new ZipCryptoDecrypt(password, passwordVerification) : new AESDecrypt(password, signed, encryptionStrength)
      });
    }

    _createClass(Inflate, [{
      key: "append",
      value: function append(data) {
        try {
          var _this2 = this;

          var codec = _this2;
          return _await(_invoke(function () {
            if (codec.encrypted && data.length) {
              return _await(codec.decrypt.append(data), function (_codec$decrypt$append) {
                data = _codec$decrypt$append;
              });
            }
          }, function () {
            return _invoke(function () {
              if (codec.compressed && data.length) {
                return _await(codec.inflate.append(data), function (_codec$inflate$append) {
                  data = _codec$inflate$append;
                });
              }
            }, function () {
              if ((!codec.encrypted || codec.zipCrypto) && codec.signed && data.length) {
                codec.crc32.append(data);
              }

              return data;
            });
          }));
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }, {
      key: "flush",
      value: function flush() {
        try {
          var _this4 = this;

          var codec = _this4;
          var signature;
          var data = new Uint8Array(0);

          if (codec.encrypted) {
            var result = codec.decrypt.flush();

            if (!result.valid) {
              throw new Error(ERR_INVALID_SIGNATURE);
            }

            data = result.data;
          }

          if ((!codec.encrypted || codec.zipCrypto) && codec.signed) {
            var dataViewSignature = new DataView(new Uint8Array(4).buffer);
            signature = codec.crc32.get();
            dataViewSignature.setUint32(0, signature);

            if (codec.signature != dataViewSignature.getUint32(0, false)) {
              throw new Error(ERR_INVALID_SIGNATURE);
            }
          }

          return _await(_invoke(function () {
            if (codec.compressed) {
              return _await(codec.inflate.append(data), function (_codec$inflate$append2) {
                data = _codec$inflate$append2 || new Uint8Array(0);
                return _awaitIgnored(codec.inflate.flush());
              });
            }
          }, function () {
            return {
              data: data,
              signature: signature
            };
          }));
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }]);

    return Inflate;
  }();

  var Deflate = /*#__PURE__*/function () {
    function Deflate(codecConstructor, _ref3, _ref4) {
      var encrypted = _ref3.encrypted,
          signed = _ref3.signed,
          compressed = _ref3.compressed,
          level = _ref3.level,
          zipCrypto = _ref3.zipCrypto,
          password = _ref3.password,
          passwordVerification = _ref3.passwordVerification,
          encryptionStrength = _ref3.encryptionStrength;
      var chunkSize = _ref4.chunkSize;

      _classCallCheck(this, Deflate);

      Object.assign(this, {
        encrypted: encrypted,
        signed: signed,
        compressed: compressed,
        deflate: compressed && new codecConstructor({
          level: level || 5,
          chunkSize: chunkSize
        }),
        crc32: signed && new Crc32(),
        zipCrypto: zipCrypto,
        encrypt: encrypted && zipCrypto ? new ZipCryptoEncrypt(password, passwordVerification) : new AESEncrypt(password, encryptionStrength)
      });
    }

    _createClass(Deflate, [{
      key: "append",
      value: function append(inputData) {
        try {
          var _this6 = this;

          var codec = _this6;
          var data = inputData;
          return _await(_invoke(function () {
            if (codec.compressed && inputData.length) {
              return _await(codec.deflate.append(inputData), function (_codec$deflate$append) {
                data = _codec$deflate$append;
              });
            }
          }, function () {
            return _invoke(function () {
              if (codec.encrypted && data.length) {
                return _await(codec.encrypt.append(data), function (_codec$encrypt$append) {
                  data = _codec$encrypt$append;
                });
              }
            }, function () {
              if ((!codec.encrypted || codec.zipCrypto) && codec.signed && inputData.length) {
                codec.crc32.append(inputData);
              }

              return data;
            });
          }));
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }, {
      key: "flush",
      value: function flush() {
        try {
          var _this8 = this;

          var codec = _this8;
          var signature;
          var data = new Uint8Array(0);
          return _await(_invoke(function () {
            if (codec.compressed) {
              return _await(codec.deflate.flush(), function (_codec$deflate$flush) {
                data = _codec$deflate$flush || new Uint8Array(0);
              });
            }
          }, function () {
            return _invoke(function () {
              if (codec.encrypted) {
                return _await(codec.encrypt.append(data), function (_codec$encrypt$append2) {
                  data = _codec$encrypt$append2;
                  var result = codec.encrypt.flush();
                  signature = result.signature;
                  var newData = new Uint8Array(data.length + result.data.length);
                  newData.set(data, 0);
                  newData.set(result.data, data.length);
                  data = newData;
                });
              }
            }, function () {
              if ((!codec.encrypted || codec.zipCrypto) && codec.signed) {
                signature = codec.crc32.get();
              }

              return {
                data: data,
                signature: signature
              };
            });
          }));
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }]);

    return Deflate;
  }();

  function createCodec$1(codecConstructor, options, config) {
    if (options.codecType.startsWith(CODEC_DEFLATE)) {
      return new Deflate(codecConstructor, options, config);
    } else if (options.codecType.startsWith(CODEC_INFLATE)) {
      return new Inflate(codecConstructor, options, config);
    }
  }

  var fails$9 = fails$H;
  var wellKnownSymbol$5 = wellKnownSymbol$t;
  var IS_PURE = isPure;

  var ITERATOR$1 = wellKnownSymbol$5('iterator');

  var nativeUrl = !fails$9(function () {
    // eslint-disable-next-line unicorn/relative-url-style -- required for testing
    var url = new URL('b?a=1&b=2&c=3', 'http://a');
    var searchParams = url.searchParams;
    var result = '';
    url.pathname = 'c%20d';
    searchParams.forEach(function (value, key) {
      searchParams['delete']('b');
      result += key + value;
    });
    return (IS_PURE && !url.toJSON)
      || !searchParams.sort
      || url.href !== 'http://a/c%20d?a=1&c=3'
      || searchParams.get('c') !== '3'
      || String(new URLSearchParams('?a=1')) !== 'a=1'
      || !searchParams[ITERATOR$1]
      // throws in Edge
      || new URL('https://a@b').username !== 'a'
      || new URLSearchParams(new URLSearchParams('a=b')).get('a') !== 'b'
      // not punycoded in Edge
      || new URL('http://тест').host !== 'xn--e1aybc'
      // not escaped in Chrome 62-
      || new URL('http://a#б').hash !== '#%D0%B1'
      // fails in Chrome 66-
      || result !== 'a1c3'
      // throws in Safari
      || new URL('http://x', undefined).host !== 'x';
  });

  var makeBuiltIn = makeBuiltIn$3.exports;
  var defineProperty$5 = objectDefineProperty;

  var defineBuiltInAccessor$1 = function (target, name, descriptor) {
    if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
    if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
    return defineProperty$5.f(target, name, descriptor);
  };

  // based on https://github.com/bestiejs/punycode.js/blob/master/punycode.js
  var uncurryThis$c = functionUncurryThis;

  var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1
  var base = 36;
  var tMin = 1;
  var tMax = 26;
  var skew = 38;
  var damp = 700;
  var initialBias = 72;
  var initialN = 128; // 0x80
  var delimiter = '-'; // '\x2D'
  var regexNonASCII = /[^\0-\u007E]/; // non-ASCII chars
  var regexSeparators = /[.\u3002\uFF0E\uFF61]/g; // RFC 3490 separators
  var OVERFLOW_ERROR = 'Overflow: input needs wider integers to process';
  var baseMinusTMin = base - tMin;

  var $RangeError = RangeError;
  var exec$2 = uncurryThis$c(regexSeparators.exec);
  var floor$2 = Math.floor;
  var fromCharCode = String.fromCharCode;
  var charCodeAt$1 = uncurryThis$c(''.charCodeAt);
  var join$2 = uncurryThis$c([].join);
  var push$5 = uncurryThis$c([].push);
  var replace$5 = uncurryThis$c(''.replace);
  var split$2 = uncurryThis$c(''.split);
  var toLowerCase$1 = uncurryThis$c(''.toLowerCase);

  /**
   * Creates an array containing the numeric code points of each Unicode
   * character in the string. While JavaScript uses UCS-2 internally,
   * this function will convert a pair of surrogate halves (each of which
   * UCS-2 exposes as separate characters) into a single code point,
   * matching UTF-16.
   */
  var ucs2decode = function (string) {
    var output = [];
    var counter = 0;
    var length = string.length;
    while (counter < length) {
      var value = charCodeAt$1(string, counter++);
      if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
        // It's a high surrogate, and there is a next character.
        var extra = charCodeAt$1(string, counter++);
        if ((extra & 0xFC00) == 0xDC00) { // Low surrogate.
          push$5(output, ((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
        } else {
          // It's an unmatched surrogate; only append this code unit, in case the
          // next code unit is the high surrogate of a surrogate pair.
          push$5(output, value);
          counter--;
        }
      } else {
        push$5(output, value);
      }
    }
    return output;
  };

  /**
   * Converts a digit/integer into a basic code point.
   */
  var digitToBasic = function (digit) {
    //  0..25 map to ASCII a..z or A..Z
    // 26..35 map to ASCII 0..9
    return digit + 22 + 75 * (digit < 26);
  };

  /**
   * Bias adaptation function as per section 3.4 of RFC 3492.
   * https://tools.ietf.org/html/rfc3492#section-3.4
   */
  var adapt = function (delta, numPoints, firstTime) {
    var k = 0;
    delta = firstTime ? floor$2(delta / damp) : delta >> 1;
    delta += floor$2(delta / numPoints);
    while (delta > baseMinusTMin * tMax >> 1) {
      delta = floor$2(delta / baseMinusTMin);
      k += base;
    }
    return floor$2(k + (baseMinusTMin + 1) * delta / (delta + skew));
  };

  /**
   * Converts a string of Unicode symbols (e.g. a domain name label) to a
   * Punycode string of ASCII-only symbols.
   */
  var encode = function (input) {
    var output = [];

    // Convert the input in UCS-2 to an array of Unicode code points.
    input = ucs2decode(input);

    // Cache the length.
    var inputLength = input.length;

    // Initialize the state.
    var n = initialN;
    var delta = 0;
    var bias = initialBias;
    var i, currentValue;

    // Handle the basic code points.
    for (i = 0; i < input.length; i++) {
      currentValue = input[i];
      if (currentValue < 0x80) {
        push$5(output, fromCharCode(currentValue));
      }
    }

    var basicLength = output.length; // number of basic code points.
    var handledCPCount = basicLength; // number of code points that have been handled;

    // Finish the basic string with a delimiter unless it's empty.
    if (basicLength) {
      push$5(output, delimiter);
    }

    // Main encoding loop:
    while (handledCPCount < inputLength) {
      // All non-basic code points < n have been handled already. Find the next larger one:
      var m = maxInt;
      for (i = 0; i < input.length; i++) {
        currentValue = input[i];
        if (currentValue >= n && currentValue < m) {
          m = currentValue;
        }
      }

      // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>, but guard against overflow.
      var handledCPCountPlusOne = handledCPCount + 1;
      if (m - n > floor$2((maxInt - delta) / handledCPCountPlusOne)) {
        throw $RangeError(OVERFLOW_ERROR);
      }

      delta += (m - n) * handledCPCountPlusOne;
      n = m;

      for (i = 0; i < input.length; i++) {
        currentValue = input[i];
        if (currentValue < n && ++delta > maxInt) {
          throw $RangeError(OVERFLOW_ERROR);
        }
        if (currentValue == n) {
          // Represent delta as a generalized variable-length integer.
          var q = delta;
          var k = base;
          while (true) {
            var t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
            if (q < t) break;
            var qMinusT = q - t;
            var baseMinusT = base - t;
            push$5(output, fromCharCode(digitToBasic(t + qMinusT % baseMinusT)));
            q = floor$2(qMinusT / baseMinusT);
            k += base;
          }

          push$5(output, fromCharCode(digitToBasic(q)));
          bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
          delta = 0;
          handledCPCount++;
        }
      }

      delta++;
      n++;
    }
    return join$2(output, '');
  };

  var stringPunycodeToAscii = function (input) {
    var encoded = [];
    var labels = split$2(replace$5(toLowerCase$1(input), regexSeparators, '\u002E'), '.');
    var i, label;
    for (i = 0; i < labels.length; i++) {
      label = labels[i];
      push$5(encoded, exec$2(regexNonASCII, label) ? 'xn--' + encode(label) : label);
    }
    return join$2(encoded, '.');
  };

  // TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`

  var $$d = _export;
  var global$6 = global$F;
  var call$4 = functionCall;
  var uncurryThis$b = functionUncurryThis;
  var DESCRIPTORS$6 = descriptors;
  var USE_NATIVE_URL$1 = nativeUrl;
  var defineBuiltIn$4 = defineBuiltIn$f;
  var defineBuiltIns$1 = defineBuiltIns$3;
  var setToStringTag$3 = setToStringTag$8;
  var createIteratorConstructor = createIteratorConstructor$2;
  var InternalStateModule$3 = internalState;
  var anInstance$3 = anInstance$7;
  var isCallable$4 = isCallable$s;
  var hasOwn$7 = hasOwnProperty_1;
  var bind$2 = functionBindContext;
  var classof$2 = classof$d;
  var anObject$2 = anObject$i;
  var isObject$4 = isObject$k;
  var $toString$2 = toString$a;
  var create$1 = objectCreate;
  var createPropertyDescriptor$1 = createPropertyDescriptor$7;
  var getIterator = getIterator$4;
  var getIteratorMethod = getIteratorMethod$5;
  var validateArgumentsLength$1 = validateArgumentsLength$3;
  var wellKnownSymbol$4 = wellKnownSymbol$t;
  var arraySort = arraySort$1;

  var ITERATOR = wellKnownSymbol$4('iterator');
  var URL_SEARCH_PARAMS = 'URLSearchParams';
  var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
  var setInternalState$3 = InternalStateModule$3.set;
  var getInternalParamsState = InternalStateModule$3.getterFor(URL_SEARCH_PARAMS);
  var getInternalIteratorState = InternalStateModule$3.getterFor(URL_SEARCH_PARAMS_ITERATOR);
  // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
  var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

  // Avoid NodeJS experimental warning
  var safeGetBuiltIn = function (name) {
    if (!DESCRIPTORS$6) return global$6[name];
    var descriptor = getOwnPropertyDescriptor$1(global$6, name);
    return descriptor && descriptor.value;
  };

  var nativeFetch = safeGetBuiltIn('fetch');
  var NativeRequest = safeGetBuiltIn('Request');
  var Headers = safeGetBuiltIn('Headers');
  var RequestPrototype = NativeRequest && NativeRequest.prototype;
  var HeadersPrototype = Headers && Headers.prototype;
  var RegExp$1 = global$6.RegExp;
  var TypeError$3 = global$6.TypeError;
  var decodeURIComponent = global$6.decodeURIComponent;
  var encodeURIComponent$1 = global$6.encodeURIComponent;
  var charAt$3 = uncurryThis$b(''.charAt);
  var join$1 = uncurryThis$b([].join);
  var push$4 = uncurryThis$b([].push);
  var replace$4 = uncurryThis$b(''.replace);
  var shift$1 = uncurryThis$b([].shift);
  var splice = uncurryThis$b([].splice);
  var split$1 = uncurryThis$b(''.split);
  var stringSlice$4 = uncurryThis$b(''.slice);

  var plus = /\+/g;
  var sequences = Array(4);

  var percentSequence = function (bytes) {
    return sequences[bytes - 1] || (sequences[bytes - 1] = RegExp$1('((?:%[\\da-f]{2}){' + bytes + '})', 'gi'));
  };

  var percentDecode = function (sequence) {
    try {
      return decodeURIComponent(sequence);
    } catch (error) {
      return sequence;
    }
  };

  var deserialize = function (it) {
    var result = replace$4(it, plus, ' ');
    var bytes = 4;
    try {
      return decodeURIComponent(result);
    } catch (error) {
      while (bytes) {
        result = replace$4(result, percentSequence(bytes--), percentDecode);
      }
      return result;
    }
  };

  var find = /[!'()~]|%20/g;

  var replacements = {
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '~': '%7E',
    '%20': '+'
  };

  var replacer = function (match) {
    return replacements[match];
  };

  var serialize = function (it) {
    return replace$4(encodeURIComponent$1(it), find, replacer);
  };

  var URLSearchParamsIterator = createIteratorConstructor(function Iterator(params, kind) {
    setInternalState$3(this, {
      type: URL_SEARCH_PARAMS_ITERATOR,
      iterator: getIterator(getInternalParamsState(params).entries),
      kind: kind
    });
  }, 'Iterator', function next() {
    var state = getInternalIteratorState(this);
    var kind = state.kind;
    var step = state.iterator.next();
    var entry = step.value;
    if (!step.done) {
      step.value = kind === 'keys' ? entry.key : kind === 'values' ? entry.value : [entry.key, entry.value];
    } return step;
  }, true);

  var URLSearchParamsState = function (init) {
    this.entries = [];
    this.url = null;

    if (init !== undefined) {
      if (isObject$4(init)) this.parseObject(init);
      else this.parseQuery(typeof init == 'string' ? charAt$3(init, 0) === '?' ? stringSlice$4(init, 1) : init : $toString$2(init));
    }
  };

  URLSearchParamsState.prototype = {
    type: URL_SEARCH_PARAMS,
    bindURL: function (url) {
      this.url = url;
      this.update();
    },
    parseObject: function (object) {
      var iteratorMethod = getIteratorMethod(object);
      var iterator, next, step, entryIterator, entryNext, first, second;

      if (iteratorMethod) {
        iterator = getIterator(object, iteratorMethod);
        next = iterator.next;
        while (!(step = call$4(next, iterator)).done) {
          entryIterator = getIterator(anObject$2(step.value));
          entryNext = entryIterator.next;
          if (
            (first = call$4(entryNext, entryIterator)).done ||
            (second = call$4(entryNext, entryIterator)).done ||
            !call$4(entryNext, entryIterator).done
          ) throw TypeError$3('Expected sequence with length 2');
          push$4(this.entries, { key: $toString$2(first.value), value: $toString$2(second.value) });
        }
      } else for (var key in object) if (hasOwn$7(object, key)) {
        push$4(this.entries, { key: key, value: $toString$2(object[key]) });
      }
    },
    parseQuery: function (query) {
      if (query) {
        var attributes = split$1(query, '&');
        var index = 0;
        var attribute, entry;
        while (index < attributes.length) {
          attribute = attributes[index++];
          if (attribute.length) {
            entry = split$1(attribute, '=');
            push$4(this.entries, {
              key: deserialize(shift$1(entry)),
              value: deserialize(join$1(entry, '='))
            });
          }
        }
      }
    },
    serialize: function () {
      var entries = this.entries;
      var result = [];
      var index = 0;
      var entry;
      while (index < entries.length) {
        entry = entries[index++];
        push$4(result, serialize(entry.key) + '=' + serialize(entry.value));
      } return join$1(result, '&');
    },
    update: function () {
      this.entries.length = 0;
      this.parseQuery(this.url.query);
    },
    updateURL: function () {
      if (this.url) this.url.update();
    }
  };

  // `URLSearchParams` constructor
  // https://url.spec.whatwg.org/#interface-urlsearchparams
  var URLSearchParamsConstructor = function URLSearchParams(/* init */) {
    anInstance$3(this, URLSearchParamsPrototype);
    var init = arguments.length > 0 ? arguments[0] : undefined;
    setInternalState$3(this, new URLSearchParamsState(init));
  };

  var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;

  defineBuiltIns$1(URLSearchParamsPrototype, {
    // `URLSearchParams.prototype.append` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-append
    append: function append(name, value) {
      validateArgumentsLength$1(arguments.length, 2);
      var state = getInternalParamsState(this);
      push$4(state.entries, { key: $toString$2(name), value: $toString$2(value) });
      state.updateURL();
    },
    // `URLSearchParams.prototype.delete` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
    'delete': function (name) {
      validateArgumentsLength$1(arguments.length, 1);
      var state = getInternalParamsState(this);
      var entries = state.entries;
      var key = $toString$2(name);
      var index = 0;
      while (index < entries.length) {
        if (entries[index].key === key) splice(entries, index, 1);
        else index++;
      }
      state.updateURL();
    },
    // `URLSearchParams.prototype.get` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-get
    get: function get(name) {
      validateArgumentsLength$1(arguments.length, 1);
      var entries = getInternalParamsState(this).entries;
      var key = $toString$2(name);
      var index = 0;
      for (; index < entries.length; index++) {
        if (entries[index].key === key) return entries[index].value;
      }
      return null;
    },
    // `URLSearchParams.prototype.getAll` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
    getAll: function getAll(name) {
      validateArgumentsLength$1(arguments.length, 1);
      var entries = getInternalParamsState(this).entries;
      var key = $toString$2(name);
      var result = [];
      var index = 0;
      for (; index < entries.length; index++) {
        if (entries[index].key === key) push$4(result, entries[index].value);
      }
      return result;
    },
    // `URLSearchParams.prototype.has` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-has
    has: function has(name) {
      validateArgumentsLength$1(arguments.length, 1);
      var entries = getInternalParamsState(this).entries;
      var key = $toString$2(name);
      var index = 0;
      while (index < entries.length) {
        if (entries[index++].key === key) return true;
      }
      return false;
    },
    // `URLSearchParams.prototype.set` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-set
    set: function set(name, value) {
      validateArgumentsLength$1(arguments.length, 1);
      var state = getInternalParamsState(this);
      var entries = state.entries;
      var found = false;
      var key = $toString$2(name);
      var val = $toString$2(value);
      var index = 0;
      var entry;
      for (; index < entries.length; index++) {
        entry = entries[index];
        if (entry.key === key) {
          if (found) splice(entries, index--, 1);
          else {
            found = true;
            entry.value = val;
          }
        }
      }
      if (!found) push$4(entries, { key: key, value: val });
      state.updateURL();
    },
    // `URLSearchParams.prototype.sort` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
    sort: function sort() {
      var state = getInternalParamsState(this);
      arraySort(state.entries, function (a, b) {
        return a.key > b.key ? 1 : -1;
      });
      state.updateURL();
    },
    // `URLSearchParams.prototype.forEach` method
    forEach: function forEach(callback /* , thisArg */) {
      var entries = getInternalParamsState(this).entries;
      var boundFunction = bind$2(callback, arguments.length > 1 ? arguments[1] : undefined);
      var index = 0;
      var entry;
      while (index < entries.length) {
        entry = entries[index++];
        boundFunction(entry.value, entry.key, this);
      }
    },
    // `URLSearchParams.prototype.keys` method
    keys: function keys() {
      return new URLSearchParamsIterator(this, 'keys');
    },
    // `URLSearchParams.prototype.values` method
    values: function values() {
      return new URLSearchParamsIterator(this, 'values');
    },
    // `URLSearchParams.prototype.entries` method
    entries: function entries() {
      return new URLSearchParamsIterator(this, 'entries');
    }
  }, { enumerable: true });

  // `URLSearchParams.prototype[@@iterator]` method
  defineBuiltIn$4(URLSearchParamsPrototype, ITERATOR, URLSearchParamsPrototype.entries, { name: 'entries' });

  // `URLSearchParams.prototype.toString` method
  // https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior
  defineBuiltIn$4(URLSearchParamsPrototype, 'toString', function toString() {
    return getInternalParamsState(this).serialize();
  }, { enumerable: true });

  setToStringTag$3(URLSearchParamsConstructor, URL_SEARCH_PARAMS);

  $$d({ global: true, constructor: true, forced: !USE_NATIVE_URL$1 }, {
    URLSearchParams: URLSearchParamsConstructor
  });

  // Wrap `fetch` and `Request` for correct work with polyfilled `URLSearchParams`
  if (!USE_NATIVE_URL$1 && isCallable$4(Headers)) {
    var headersHas = uncurryThis$b(HeadersPrototype.has);
    var headersSet = uncurryThis$b(HeadersPrototype.set);

    var wrapRequestOptions = function (init) {
      if (isObject$4(init)) {
        var body = init.body;
        var headers;
        if (classof$2(body) === URL_SEARCH_PARAMS) {
          headers = init.headers ? new Headers(init.headers) : new Headers();
          if (!headersHas(headers, 'content-type')) {
            headersSet(headers, 'content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
          }
          return create$1(init, {
            body: createPropertyDescriptor$1(0, $toString$2(body)),
            headers: createPropertyDescriptor$1(0, headers)
          });
        }
      } return init;
    };

    if (isCallable$4(nativeFetch)) {
      $$d({ global: true, enumerable: true, dontCallGetSet: true, forced: true }, {
        fetch: function fetch(input /* , init */) {
          return nativeFetch(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
        }
      });
    }

    if (isCallable$4(NativeRequest)) {
      var RequestConstructor = function Request(input /* , init */) {
        anInstance$3(this, RequestPrototype);
        return new NativeRequest(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
      };

      RequestPrototype.constructor = RequestConstructor;
      RequestConstructor.prototype = RequestPrototype;

      $$d({ global: true, constructor: true, dontCallGetSet: true, forced: true }, {
        Request: RequestConstructor
      });
    }
  }

  var web_urlSearchParams_constructor = {
    URLSearchParams: URLSearchParamsConstructor,
    getState: getInternalParamsState
  };

  // TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`

  var $$c = _export;
  var DESCRIPTORS$5 = descriptors;
  var USE_NATIVE_URL = nativeUrl;
  var global$5 = global$F;
  var bind$1 = functionBindContext;
  var uncurryThis$a = functionUncurryThis;
  var defineBuiltIn$3 = defineBuiltIn$f;
  var defineBuiltInAccessor = defineBuiltInAccessor$1;
  var anInstance$2 = anInstance$7;
  var hasOwn$6 = hasOwnProperty_1;
  var assign = objectAssign;
  var arrayFrom = arrayFrom$1;
  var arraySlice$2 = arraySliceSimple;
  var codeAt = stringMultibyte.codeAt;
  var toASCII = stringPunycodeToAscii;
  var $toString$1 = toString$a;
  var setToStringTag$2 = setToStringTag$8;
  var validateArgumentsLength = validateArgumentsLength$3;
  var URLSearchParamsModule = web_urlSearchParams_constructor;
  var InternalStateModule$2 = internalState;

  var setInternalState$2 = InternalStateModule$2.set;
  var getInternalURLState = InternalStateModule$2.getterFor('URL');
  var URLSearchParams$1 = URLSearchParamsModule.URLSearchParams;
  var getInternalSearchParamsState = URLSearchParamsModule.getState;

  var NativeURL = global$5.URL;
  var TypeError$2 = global$5.TypeError;
  var parseInt$1 = global$5.parseInt;
  var floor$1 = Math.floor;
  var pow = Math.pow;
  var charAt$2 = uncurryThis$a(''.charAt);
  var exec$1 = uncurryThis$a(/./.exec);
  var join = uncurryThis$a([].join);
  var numberToString$1 = uncurryThis$a(1.0.toString);
  var pop = uncurryThis$a([].pop);
  var push$3 = uncurryThis$a([].push);
  var replace$3 = uncurryThis$a(''.replace);
  var shift = uncurryThis$a([].shift);
  var split = uncurryThis$a(''.split);
  var stringSlice$3 = uncurryThis$a(''.slice);
  var toLowerCase = uncurryThis$a(''.toLowerCase);
  var unshift = uncurryThis$a([].unshift);

  var INVALID_AUTHORITY = 'Invalid authority';
  var INVALID_SCHEME = 'Invalid scheme';
  var INVALID_HOST = 'Invalid host';
  var INVALID_PORT = 'Invalid port';

  var ALPHA = /[a-z]/i;
  // eslint-disable-next-line regexp/no-obscure-range -- safe
  var ALPHANUMERIC = /[\d+-.a-z]/i;
  var DIGIT = /\d/;
  var HEX_START = /^0x/i;
  var OCT = /^[0-7]+$/;
  var DEC = /^\d+$/;
  var HEX = /^[\da-f]+$/i;
  /* eslint-disable regexp/no-control-character -- safe */
  var FORBIDDEN_HOST_CODE_POINT = /[\0\t\n\r #%/:<>?@[\\\]^|]/;
  var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\0\t\n\r #/:<>?@[\\\]^|]/;
  var LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE = /^[\u0000-\u0020]+|[\u0000-\u0020]+$/g;
  var TAB_AND_NEW_LINE = /[\t\n\r]/g;
  /* eslint-enable regexp/no-control-character -- safe */
  var EOF;

  // https://url.spec.whatwg.org/#ipv4-number-parser
  var parseIPv4 = function (input) {
    var parts = split(input, '.');
    var partsLength, numbers, index, part, radix, number, ipv4;
    if (parts.length && parts[parts.length - 1] == '') {
      parts.length--;
    }
    partsLength = parts.length;
    if (partsLength > 4) return input;
    numbers = [];
    for (index = 0; index < partsLength; index++) {
      part = parts[index];
      if (part == '') return input;
      radix = 10;
      if (part.length > 1 && charAt$2(part, 0) == '0') {
        radix = exec$1(HEX_START, part) ? 16 : 8;
        part = stringSlice$3(part, radix == 8 ? 1 : 2);
      }
      if (part === '') {
        number = 0;
      } else {
        if (!exec$1(radix == 10 ? DEC : radix == 8 ? OCT : HEX, part)) return input;
        number = parseInt$1(part, radix);
      }
      push$3(numbers, number);
    }
    for (index = 0; index < partsLength; index++) {
      number = numbers[index];
      if (index == partsLength - 1) {
        if (number >= pow(256, 5 - partsLength)) return null;
      } else if (number > 255) return null;
    }
    ipv4 = pop(numbers);
    for (index = 0; index < numbers.length; index++) {
      ipv4 += numbers[index] * pow(256, 3 - index);
    }
    return ipv4;
  };

  // https://url.spec.whatwg.org/#concept-ipv6-parser
  // eslint-disable-next-line max-statements -- TODO
  var parseIPv6 = function (input) {
    var address = [0, 0, 0, 0, 0, 0, 0, 0];
    var pieceIndex = 0;
    var compress = null;
    var pointer = 0;
    var value, length, numbersSeen, ipv4Piece, number, swaps, swap;

    var chr = function () {
      return charAt$2(input, pointer);
    };

    if (chr() == ':') {
      if (charAt$2(input, 1) != ':') return;
      pointer += 2;
      pieceIndex++;
      compress = pieceIndex;
    }
    while (chr()) {
      if (pieceIndex == 8) return;
      if (chr() == ':') {
        if (compress !== null) return;
        pointer++;
        pieceIndex++;
        compress = pieceIndex;
        continue;
      }
      value = length = 0;
      while (length < 4 && exec$1(HEX, chr())) {
        value = value * 16 + parseInt$1(chr(), 16);
        pointer++;
        length++;
      }
      if (chr() == '.') {
        if (length == 0) return;
        pointer -= length;
        if (pieceIndex > 6) return;
        numbersSeen = 0;
        while (chr()) {
          ipv4Piece = null;
          if (numbersSeen > 0) {
            if (chr() == '.' && numbersSeen < 4) pointer++;
            else return;
          }
          if (!exec$1(DIGIT, chr())) return;
          while (exec$1(DIGIT, chr())) {
            number = parseInt$1(chr(), 10);
            if (ipv4Piece === null) ipv4Piece = number;
            else if (ipv4Piece == 0) return;
            else ipv4Piece = ipv4Piece * 10 + number;
            if (ipv4Piece > 255) return;
            pointer++;
          }
          address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
          numbersSeen++;
          if (numbersSeen == 2 || numbersSeen == 4) pieceIndex++;
        }
        if (numbersSeen != 4) return;
        break;
      } else if (chr() == ':') {
        pointer++;
        if (!chr()) return;
      } else if (chr()) return;
      address[pieceIndex++] = value;
    }
    if (compress !== null) {
      swaps = pieceIndex - compress;
      pieceIndex = 7;
      while (pieceIndex != 0 && swaps > 0) {
        swap = address[pieceIndex];
        address[pieceIndex--] = address[compress + swaps - 1];
        address[compress + --swaps] = swap;
      }
    } else if (pieceIndex != 8) return;
    return address;
  };

  var findLongestZeroSequence = function (ipv6) {
    var maxIndex = null;
    var maxLength = 1;
    var currStart = null;
    var currLength = 0;
    var index = 0;
    for (; index < 8; index++) {
      if (ipv6[index] !== 0) {
        if (currLength > maxLength) {
          maxIndex = currStart;
          maxLength = currLength;
        }
        currStart = null;
        currLength = 0;
      } else {
        if (currStart === null) currStart = index;
        ++currLength;
      }
    }
    if (currLength > maxLength) {
      maxIndex = currStart;
      maxLength = currLength;
    }
    return maxIndex;
  };

  // https://url.spec.whatwg.org/#host-serializing
  var serializeHost = function (host) {
    var result, index, compress, ignore0;
    // ipv4
    if (typeof host == 'number') {
      result = [];
      for (index = 0; index < 4; index++) {
        unshift(result, host % 256);
        host = floor$1(host / 256);
      } return join(result, '.');
    // ipv6
    } else if (typeof host == 'object') {
      result = '';
      compress = findLongestZeroSequence(host);
      for (index = 0; index < 8; index++) {
        if (ignore0 && host[index] === 0) continue;
        if (ignore0) ignore0 = false;
        if (compress === index) {
          result += index ? ':' : '::';
          ignore0 = true;
        } else {
          result += numberToString$1(host[index], 16);
          if (index < 7) result += ':';
        }
      }
      return '[' + result + ']';
    } return host;
  };

  var C0ControlPercentEncodeSet = {};
  var fragmentPercentEncodeSet = assign({}, C0ControlPercentEncodeSet, {
    ' ': 1, '"': 1, '<': 1, '>': 1, '`': 1
  });
  var pathPercentEncodeSet = assign({}, fragmentPercentEncodeSet, {
    '#': 1, '?': 1, '{': 1, '}': 1
  });
  var userinfoPercentEncodeSet = assign({}, pathPercentEncodeSet, {
    '/': 1, ':': 1, ';': 1, '=': 1, '@': 1, '[': 1, '\\': 1, ']': 1, '^': 1, '|': 1
  });

  var percentEncode = function (chr, set) {
    var code = codeAt(chr, 0);
    return code > 0x20 && code < 0x7F && !hasOwn$6(set, chr) ? chr : encodeURIComponent(chr);
  };

  // https://url.spec.whatwg.org/#special-scheme
  var specialSchemes = {
    ftp: 21,
    file: null,
    http: 80,
    https: 443,
    ws: 80,
    wss: 443
  };

  // https://url.spec.whatwg.org/#windows-drive-letter
  var isWindowsDriveLetter = function (string, normalized) {
    var second;
    return string.length == 2 && exec$1(ALPHA, charAt$2(string, 0))
      && ((second = charAt$2(string, 1)) == ':' || (!normalized && second == '|'));
  };

  // https://url.spec.whatwg.org/#start-with-a-windows-drive-letter
  var startsWithWindowsDriveLetter = function (string) {
    var third;
    return string.length > 1 && isWindowsDriveLetter(stringSlice$3(string, 0, 2)) && (
      string.length == 2 ||
      ((third = charAt$2(string, 2)) === '/' || third === '\\' || third === '?' || third === '#')
    );
  };

  // https://url.spec.whatwg.org/#single-dot-path-segment
  var isSingleDot = function (segment) {
    return segment === '.' || toLowerCase(segment) === '%2e';
  };

  // https://url.spec.whatwg.org/#double-dot-path-segment
  var isDoubleDot = function (segment) {
    segment = toLowerCase(segment);
    return segment === '..' || segment === '%2e.' || segment === '.%2e' || segment === '%2e%2e';
  };

  // States:
  var SCHEME_START = {};
  var SCHEME = {};
  var NO_SCHEME = {};
  var SPECIAL_RELATIVE_OR_AUTHORITY = {};
  var PATH_OR_AUTHORITY = {};
  var RELATIVE = {};
  var RELATIVE_SLASH = {};
  var SPECIAL_AUTHORITY_SLASHES = {};
  var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};
  var AUTHORITY = {};
  var HOST = {};
  var HOSTNAME = {};
  var PORT = {};
  var FILE = {};
  var FILE_SLASH = {};
  var FILE_HOST = {};
  var PATH_START = {};
  var PATH = {};
  var CANNOT_BE_A_BASE_URL_PATH = {};
  var QUERY = {};
  var FRAGMENT = {};

  var URLState = function (url, isBase, base) {
    var urlString = $toString$1(url);
    var baseState, failure, searchParams;
    if (isBase) {
      failure = this.parse(urlString);
      if (failure) throw TypeError$2(failure);
      this.searchParams = null;
    } else {
      if (base !== undefined) baseState = new URLState(base, true);
      failure = this.parse(urlString, null, baseState);
      if (failure) throw TypeError$2(failure);
      searchParams = getInternalSearchParamsState(new URLSearchParams$1());
      searchParams.bindURL(this);
      this.searchParams = searchParams;
    }
  };

  URLState.prototype = {
    type: 'URL',
    // https://url.spec.whatwg.org/#url-parsing
    // eslint-disable-next-line max-statements -- TODO
    parse: function (input, stateOverride, base) {
      var url = this;
      var state = stateOverride || SCHEME_START;
      var pointer = 0;
      var buffer = '';
      var seenAt = false;
      var seenBracket = false;
      var seenPasswordToken = false;
      var codePoints, chr, bufferCodePoints, failure;

      input = $toString$1(input);

      if (!stateOverride) {
        url.scheme = '';
        url.username = '';
        url.password = '';
        url.host = null;
        url.port = null;
        url.path = [];
        url.query = null;
        url.fragment = null;
        url.cannotBeABaseURL = false;
        input = replace$3(input, LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE, '');
      }

      input = replace$3(input, TAB_AND_NEW_LINE, '');

      codePoints = arrayFrom(input);

      while (pointer <= codePoints.length) {
        chr = codePoints[pointer];
        switch (state) {
          case SCHEME_START:
            if (chr && exec$1(ALPHA, chr)) {
              buffer += toLowerCase(chr);
              state = SCHEME;
            } else if (!stateOverride) {
              state = NO_SCHEME;
              continue;
            } else return INVALID_SCHEME;
            break;

          case SCHEME:
            if (chr && (exec$1(ALPHANUMERIC, chr) || chr == '+' || chr == '-' || chr == '.')) {
              buffer += toLowerCase(chr);
            } else if (chr == ':') {
              if (stateOverride && (
                (url.isSpecial() != hasOwn$6(specialSchemes, buffer)) ||
                (buffer == 'file' && (url.includesCredentials() || url.port !== null)) ||
                (url.scheme == 'file' && !url.host)
              )) return;
              url.scheme = buffer;
              if (stateOverride) {
                if (url.isSpecial() && specialSchemes[url.scheme] == url.port) url.port = null;
                return;
              }
              buffer = '';
              if (url.scheme == 'file') {
                state = FILE;
              } else if (url.isSpecial() && base && base.scheme == url.scheme) {
                state = SPECIAL_RELATIVE_OR_AUTHORITY;
              } else if (url.isSpecial()) {
                state = SPECIAL_AUTHORITY_SLASHES;
              } else if (codePoints[pointer + 1] == '/') {
                state = PATH_OR_AUTHORITY;
                pointer++;
              } else {
                url.cannotBeABaseURL = true;
                push$3(url.path, '');
                state = CANNOT_BE_A_BASE_URL_PATH;
              }
            } else if (!stateOverride) {
              buffer = '';
              state = NO_SCHEME;
              pointer = 0;
              continue;
            } else return INVALID_SCHEME;
            break;

          case NO_SCHEME:
            if (!base || (base.cannotBeABaseURL && chr != '#')) return INVALID_SCHEME;
            if (base.cannotBeABaseURL && chr == '#') {
              url.scheme = base.scheme;
              url.path = arraySlice$2(base.path);
              url.query = base.query;
              url.fragment = '';
              url.cannotBeABaseURL = true;
              state = FRAGMENT;
              break;
            }
            state = base.scheme == 'file' ? FILE : RELATIVE;
            continue;

          case SPECIAL_RELATIVE_OR_AUTHORITY:
            if (chr == '/' && codePoints[pointer + 1] == '/') {
              state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
              pointer++;
            } else {
              state = RELATIVE;
              continue;
            } break;

          case PATH_OR_AUTHORITY:
            if (chr == '/') {
              state = AUTHORITY;
              break;
            } else {
              state = PATH;
              continue;
            }

          case RELATIVE:
            url.scheme = base.scheme;
            if (chr == EOF) {
              url.username = base.username;
              url.password = base.password;
              url.host = base.host;
              url.port = base.port;
              url.path = arraySlice$2(base.path);
              url.query = base.query;
            } else if (chr == '/' || (chr == '\\' && url.isSpecial())) {
              state = RELATIVE_SLASH;
            } else if (chr == '?') {
              url.username = base.username;
              url.password = base.password;
              url.host = base.host;
              url.port = base.port;
              url.path = arraySlice$2(base.path);
              url.query = '';
              state = QUERY;
            } else if (chr == '#') {
              url.username = base.username;
              url.password = base.password;
              url.host = base.host;
              url.port = base.port;
              url.path = arraySlice$2(base.path);
              url.query = base.query;
              url.fragment = '';
              state = FRAGMENT;
            } else {
              url.username = base.username;
              url.password = base.password;
              url.host = base.host;
              url.port = base.port;
              url.path = arraySlice$2(base.path);
              url.path.length--;
              state = PATH;
              continue;
            } break;

          case RELATIVE_SLASH:
            if (url.isSpecial() && (chr == '/' || chr == '\\')) {
              state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
            } else if (chr == '/') {
              state = AUTHORITY;
            } else {
              url.username = base.username;
              url.password = base.password;
              url.host = base.host;
              url.port = base.port;
              state = PATH;
              continue;
            } break;

          case SPECIAL_AUTHORITY_SLASHES:
            state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
            if (chr != '/' || charAt$2(buffer, pointer + 1) != '/') continue;
            pointer++;
            break;

          case SPECIAL_AUTHORITY_IGNORE_SLASHES:
            if (chr != '/' && chr != '\\') {
              state = AUTHORITY;
              continue;
            } break;

          case AUTHORITY:
            if (chr == '@') {
              if (seenAt) buffer = '%40' + buffer;
              seenAt = true;
              bufferCodePoints = arrayFrom(buffer);
              for (var i = 0; i < bufferCodePoints.length; i++) {
                var codePoint = bufferCodePoints[i];
                if (codePoint == ':' && !seenPasswordToken) {
                  seenPasswordToken = true;
                  continue;
                }
                var encodedCodePoints = percentEncode(codePoint, userinfoPercentEncodeSet);
                if (seenPasswordToken) url.password += encodedCodePoints;
                else url.username += encodedCodePoints;
              }
              buffer = '';
            } else if (
              chr == EOF || chr == '/' || chr == '?' || chr == '#' ||
              (chr == '\\' && url.isSpecial())
            ) {
              if (seenAt && buffer == '') return INVALID_AUTHORITY;
              pointer -= arrayFrom(buffer).length + 1;
              buffer = '';
              state = HOST;
            } else buffer += chr;
            break;

          case HOST:
          case HOSTNAME:
            if (stateOverride && url.scheme == 'file') {
              state = FILE_HOST;
              continue;
            } else if (chr == ':' && !seenBracket) {
              if (buffer == '') return INVALID_HOST;
              failure = url.parseHost(buffer);
              if (failure) return failure;
              buffer = '';
              state = PORT;
              if (stateOverride == HOSTNAME) return;
            } else if (
              chr == EOF || chr == '/' || chr == '?' || chr == '#' ||
              (chr == '\\' && url.isSpecial())
            ) {
              if (url.isSpecial() && buffer == '') return INVALID_HOST;
              if (stateOverride && buffer == '' && (url.includesCredentials() || url.port !== null)) return;
              failure = url.parseHost(buffer);
              if (failure) return failure;
              buffer = '';
              state = PATH_START;
              if (stateOverride) return;
              continue;
            } else {
              if (chr == '[') seenBracket = true;
              else if (chr == ']') seenBracket = false;
              buffer += chr;
            } break;

          case PORT:
            if (exec$1(DIGIT, chr)) {
              buffer += chr;
            } else if (
              chr == EOF || chr == '/' || chr == '?' || chr == '#' ||
              (chr == '\\' && url.isSpecial()) ||
              stateOverride
            ) {
              if (buffer != '') {
                var port = parseInt$1(buffer, 10);
                if (port > 0xFFFF) return INVALID_PORT;
                url.port = (url.isSpecial() && port === specialSchemes[url.scheme]) ? null : port;
                buffer = '';
              }
              if (stateOverride) return;
              state = PATH_START;
              continue;
            } else return INVALID_PORT;
            break;

          case FILE:
            url.scheme = 'file';
            if (chr == '/' || chr == '\\') state = FILE_SLASH;
            else if (base && base.scheme == 'file') {
              if (chr == EOF) {
                url.host = base.host;
                url.path = arraySlice$2(base.path);
                url.query = base.query;
              } else if (chr == '?') {
                url.host = base.host;
                url.path = arraySlice$2(base.path);
                url.query = '';
                state = QUERY;
              } else if (chr == '#') {
                url.host = base.host;
                url.path = arraySlice$2(base.path);
                url.query = base.query;
                url.fragment = '';
                state = FRAGMENT;
              } else {
                if (!startsWithWindowsDriveLetter(join(arraySlice$2(codePoints, pointer), ''))) {
                  url.host = base.host;
                  url.path = arraySlice$2(base.path);
                  url.shortenPath();
                }
                state = PATH;
                continue;
              }
            } else {
              state = PATH;
              continue;
            } break;

          case FILE_SLASH:
            if (chr == '/' || chr == '\\') {
              state = FILE_HOST;
              break;
            }
            if (base && base.scheme == 'file' && !startsWithWindowsDriveLetter(join(arraySlice$2(codePoints, pointer), ''))) {
              if (isWindowsDriveLetter(base.path[0], true)) push$3(url.path, base.path[0]);
              else url.host = base.host;
            }
            state = PATH;
            continue;

          case FILE_HOST:
            if (chr == EOF || chr == '/' || chr == '\\' || chr == '?' || chr == '#') {
              if (!stateOverride && isWindowsDriveLetter(buffer)) {
                state = PATH;
              } else if (buffer == '') {
                url.host = '';
                if (stateOverride) return;
                state = PATH_START;
              } else {
                failure = url.parseHost(buffer);
                if (failure) return failure;
                if (url.host == 'localhost') url.host = '';
                if (stateOverride) return;
                buffer = '';
                state = PATH_START;
              } continue;
            } else buffer += chr;
            break;

          case PATH_START:
            if (url.isSpecial()) {
              state = PATH;
              if (chr != '/' && chr != '\\') continue;
            } else if (!stateOverride && chr == '?') {
              url.query = '';
              state = QUERY;
            } else if (!stateOverride && chr == '#') {
              url.fragment = '';
              state = FRAGMENT;
            } else if (chr != EOF) {
              state = PATH;
              if (chr != '/') continue;
            } break;

          case PATH:
            if (
              chr == EOF || chr == '/' ||
              (chr == '\\' && url.isSpecial()) ||
              (!stateOverride && (chr == '?' || chr == '#'))
            ) {
              if (isDoubleDot(buffer)) {
                url.shortenPath();
                if (chr != '/' && !(chr == '\\' && url.isSpecial())) {
                  push$3(url.path, '');
                }
              } else if (isSingleDot(buffer)) {
                if (chr != '/' && !(chr == '\\' && url.isSpecial())) {
                  push$3(url.path, '');
                }
              } else {
                if (url.scheme == 'file' && !url.path.length && isWindowsDriveLetter(buffer)) {
                  if (url.host) url.host = '';
                  buffer = charAt$2(buffer, 0) + ':'; // normalize windows drive letter
                }
                push$3(url.path, buffer);
              }
              buffer = '';
              if (url.scheme == 'file' && (chr == EOF || chr == '?' || chr == '#')) {
                while (url.path.length > 1 && url.path[0] === '') {
                  shift(url.path);
                }
              }
              if (chr == '?') {
                url.query = '';
                state = QUERY;
              } else if (chr == '#') {
                url.fragment = '';
                state = FRAGMENT;
              }
            } else {
              buffer += percentEncode(chr, pathPercentEncodeSet);
            } break;

          case CANNOT_BE_A_BASE_URL_PATH:
            if (chr == '?') {
              url.query = '';
              state = QUERY;
            } else if (chr == '#') {
              url.fragment = '';
              state = FRAGMENT;
            } else if (chr != EOF) {
              url.path[0] += percentEncode(chr, C0ControlPercentEncodeSet);
            } break;

          case QUERY:
            if (!stateOverride && chr == '#') {
              url.fragment = '';
              state = FRAGMENT;
            } else if (chr != EOF) {
              if (chr == "'" && url.isSpecial()) url.query += '%27';
              else if (chr == '#') url.query += '%23';
              else url.query += percentEncode(chr, C0ControlPercentEncodeSet);
            } break;

          case FRAGMENT:
            if (chr != EOF) url.fragment += percentEncode(chr, fragmentPercentEncodeSet);
            break;
        }

        pointer++;
      }
    },
    // https://url.spec.whatwg.org/#host-parsing
    parseHost: function (input) {
      var result, codePoints, index;
      if (charAt$2(input, 0) == '[') {
        if (charAt$2(input, input.length - 1) != ']') return INVALID_HOST;
        result = parseIPv6(stringSlice$3(input, 1, -1));
        if (!result) return INVALID_HOST;
        this.host = result;
      // opaque host
      } else if (!this.isSpecial()) {
        if (exec$1(FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT, input)) return INVALID_HOST;
        result = '';
        codePoints = arrayFrom(input);
        for (index = 0; index < codePoints.length; index++) {
          result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
        }
        this.host = result;
      } else {
        input = toASCII(input);
        if (exec$1(FORBIDDEN_HOST_CODE_POINT, input)) return INVALID_HOST;
        result = parseIPv4(input);
        if (result === null) return INVALID_HOST;
        this.host = result;
      }
    },
    // https://url.spec.whatwg.org/#cannot-have-a-username-password-port
    cannotHaveUsernamePasswordPort: function () {
      return !this.host || this.cannotBeABaseURL || this.scheme == 'file';
    },
    // https://url.spec.whatwg.org/#include-credentials
    includesCredentials: function () {
      return this.username != '' || this.password != '';
    },
    // https://url.spec.whatwg.org/#is-special
    isSpecial: function () {
      return hasOwn$6(specialSchemes, this.scheme);
    },
    // https://url.spec.whatwg.org/#shorten-a-urls-path
    shortenPath: function () {
      var path = this.path;
      var pathSize = path.length;
      if (pathSize && (this.scheme != 'file' || pathSize != 1 || !isWindowsDriveLetter(path[0], true))) {
        path.length--;
      }
    },
    // https://url.spec.whatwg.org/#concept-url-serializer
    serialize: function () {
      var url = this;
      var scheme = url.scheme;
      var username = url.username;
      var password = url.password;
      var host = url.host;
      var port = url.port;
      var path = url.path;
      var query = url.query;
      var fragment = url.fragment;
      var output = scheme + ':';
      if (host !== null) {
        output += '//';
        if (url.includesCredentials()) {
          output += username + (password ? ':' + password : '') + '@';
        }
        output += serializeHost(host);
        if (port !== null) output += ':' + port;
      } else if (scheme == 'file') output += '//';
      output += url.cannotBeABaseURL ? path[0] : path.length ? '/' + join(path, '/') : '';
      if (query !== null) output += '?' + query;
      if (fragment !== null) output += '#' + fragment;
      return output;
    },
    // https://url.spec.whatwg.org/#dom-url-href
    setHref: function (href) {
      var failure = this.parse(href);
      if (failure) throw TypeError$2(failure);
      this.searchParams.update();
    },
    // https://url.spec.whatwg.org/#dom-url-origin
    getOrigin: function () {
      var scheme = this.scheme;
      var port = this.port;
      if (scheme == 'blob') try {
        return new URLConstructor(scheme.path[0]).origin;
      } catch (error) {
        return 'null';
      }
      if (scheme == 'file' || !this.isSpecial()) return 'null';
      return scheme + '://' + serializeHost(this.host) + (port !== null ? ':' + port : '');
    },
    // https://url.spec.whatwg.org/#dom-url-protocol
    getProtocol: function () {
      return this.scheme + ':';
    },
    setProtocol: function (protocol) {
      this.parse($toString$1(protocol) + ':', SCHEME_START);
    },
    // https://url.spec.whatwg.org/#dom-url-username
    getUsername: function () {
      return this.username;
    },
    setUsername: function (username) {
      var codePoints = arrayFrom($toString$1(username));
      if (this.cannotHaveUsernamePasswordPort()) return;
      this.username = '';
      for (var i = 0; i < codePoints.length; i++) {
        this.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
      }
    },
    // https://url.spec.whatwg.org/#dom-url-password
    getPassword: function () {
      return this.password;
    },
    setPassword: function (password) {
      var codePoints = arrayFrom($toString$1(password));
      if (this.cannotHaveUsernamePasswordPort()) return;
      this.password = '';
      for (var i = 0; i < codePoints.length; i++) {
        this.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
      }
    },
    // https://url.spec.whatwg.org/#dom-url-host
    getHost: function () {
      var host = this.host;
      var port = this.port;
      return host === null ? ''
        : port === null ? serializeHost(host)
        : serializeHost(host) + ':' + port;
    },
    setHost: function (host) {
      if (this.cannotBeABaseURL) return;
      this.parse(host, HOST);
    },
    // https://url.spec.whatwg.org/#dom-url-hostname
    getHostname: function () {
      var host = this.host;
      return host === null ? '' : serializeHost(host);
    },
    setHostname: function (hostname) {
      if (this.cannotBeABaseURL) return;
      this.parse(hostname, HOSTNAME);
    },
    // https://url.spec.whatwg.org/#dom-url-port
    getPort: function () {
      var port = this.port;
      return port === null ? '' : $toString$1(port);
    },
    setPort: function (port) {
      if (this.cannotHaveUsernamePasswordPort()) return;
      port = $toString$1(port);
      if (port == '') this.port = null;
      else this.parse(port, PORT);
    },
    // https://url.spec.whatwg.org/#dom-url-pathname
    getPathname: function () {
      var path = this.path;
      return this.cannotBeABaseURL ? path[0] : path.length ? '/' + join(path, '/') : '';
    },
    setPathname: function (pathname) {
      if (this.cannotBeABaseURL) return;
      this.path = [];
      this.parse(pathname, PATH_START);
    },
    // https://url.spec.whatwg.org/#dom-url-search
    getSearch: function () {
      var query = this.query;
      return query ? '?' + query : '';
    },
    setSearch: function (search) {
      search = $toString$1(search);
      if (search == '') {
        this.query = null;
      } else {
        if ('?' == charAt$2(search, 0)) search = stringSlice$3(search, 1);
        this.query = '';
        this.parse(search, QUERY);
      }
      this.searchParams.update();
    },
    // https://url.spec.whatwg.org/#dom-url-searchparams
    getSearchParams: function () {
      return this.searchParams.facade;
    },
    // https://url.spec.whatwg.org/#dom-url-hash
    getHash: function () {
      var fragment = this.fragment;
      return fragment ? '#' + fragment : '';
    },
    setHash: function (hash) {
      hash = $toString$1(hash);
      if (hash == '') {
        this.fragment = null;
        return;
      }
      if ('#' == charAt$2(hash, 0)) hash = stringSlice$3(hash, 1);
      this.fragment = '';
      this.parse(hash, FRAGMENT);
    },
    update: function () {
      this.query = this.searchParams.serialize() || null;
    }
  };

  // `URL` constructor
  // https://url.spec.whatwg.org/#url-class
  var URLConstructor = function URL(url /* , base */) {
    var that = anInstance$2(this, URLPrototype);
    var base = validateArgumentsLength(arguments.length, 1) > 1 ? arguments[1] : undefined;
    var state = setInternalState$2(that, new URLState(url, false, base));
    if (!DESCRIPTORS$5) {
      that.href = state.serialize();
      that.origin = state.getOrigin();
      that.protocol = state.getProtocol();
      that.username = state.getUsername();
      that.password = state.getPassword();
      that.host = state.getHost();
      that.hostname = state.getHostname();
      that.port = state.getPort();
      that.pathname = state.getPathname();
      that.search = state.getSearch();
      that.searchParams = state.getSearchParams();
      that.hash = state.getHash();
    }
  };

  var URLPrototype = URLConstructor.prototype;

  var accessorDescriptor = function (getter, setter) {
    return {
      get: function () {
        return getInternalURLState(this)[getter]();
      },
      set: setter && function (value) {
        return getInternalURLState(this)[setter](value);
      },
      configurable: true,
      enumerable: true
    };
  };

  if (DESCRIPTORS$5) {
    // `URL.prototype.href` accessors pair
    // https://url.spec.whatwg.org/#dom-url-href
    defineBuiltInAccessor(URLPrototype, 'href', accessorDescriptor('serialize', 'setHref'));
    // `URL.prototype.origin` getter
    // https://url.spec.whatwg.org/#dom-url-origin
    defineBuiltInAccessor(URLPrototype, 'origin', accessorDescriptor('getOrigin'));
    // `URL.prototype.protocol` accessors pair
    // https://url.spec.whatwg.org/#dom-url-protocol
    defineBuiltInAccessor(URLPrototype, 'protocol', accessorDescriptor('getProtocol', 'setProtocol'));
    // `URL.prototype.username` accessors pair
    // https://url.spec.whatwg.org/#dom-url-username
    defineBuiltInAccessor(URLPrototype, 'username', accessorDescriptor('getUsername', 'setUsername'));
    // `URL.prototype.password` accessors pair
    // https://url.spec.whatwg.org/#dom-url-password
    defineBuiltInAccessor(URLPrototype, 'password', accessorDescriptor('getPassword', 'setPassword'));
    // `URL.prototype.host` accessors pair
    // https://url.spec.whatwg.org/#dom-url-host
    defineBuiltInAccessor(URLPrototype, 'host', accessorDescriptor('getHost', 'setHost'));
    // `URL.prototype.hostname` accessors pair
    // https://url.spec.whatwg.org/#dom-url-hostname
    defineBuiltInAccessor(URLPrototype, 'hostname', accessorDescriptor('getHostname', 'setHostname'));
    // `URL.prototype.port` accessors pair
    // https://url.spec.whatwg.org/#dom-url-port
    defineBuiltInAccessor(URLPrototype, 'port', accessorDescriptor('getPort', 'setPort'));
    // `URL.prototype.pathname` accessors pair
    // https://url.spec.whatwg.org/#dom-url-pathname
    defineBuiltInAccessor(URLPrototype, 'pathname', accessorDescriptor('getPathname', 'setPathname'));
    // `URL.prototype.search` accessors pair
    // https://url.spec.whatwg.org/#dom-url-search
    defineBuiltInAccessor(URLPrototype, 'search', accessorDescriptor('getSearch', 'setSearch'));
    // `URL.prototype.searchParams` getter
    // https://url.spec.whatwg.org/#dom-url-searchparams
    defineBuiltInAccessor(URLPrototype, 'searchParams', accessorDescriptor('getSearchParams'));
    // `URL.prototype.hash` accessors pair
    // https://url.spec.whatwg.org/#dom-url-hash
    defineBuiltInAccessor(URLPrototype, 'hash', accessorDescriptor('getHash', 'setHash'));
  }

  // `URL.prototype.toJSON` method
  // https://url.spec.whatwg.org/#dom-url-tojson
  defineBuiltIn$3(URLPrototype, 'toJSON', function toJSON() {
    return getInternalURLState(this).serialize();
  }, { enumerable: true });

  // `URL.prototype.toString` method
  // https://url.spec.whatwg.org/#URL-stringification-behavior
  defineBuiltIn$3(URLPrototype, 'toString', function toString() {
    return getInternalURLState(this).serialize();
  }, { enumerable: true });

  if (NativeURL) {
    var nativeCreateObjectURL = NativeURL.createObjectURL;
    var nativeRevokeObjectURL = NativeURL.revokeObjectURL;
    // `URL.createObjectURL` method
    // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
    if (nativeCreateObjectURL) defineBuiltIn$3(URLConstructor, 'createObjectURL', bind$1(nativeCreateObjectURL, NativeURL));
    // `URL.revokeObjectURL` method
    // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
    if (nativeRevokeObjectURL) defineBuiltIn$3(URLConstructor, 'revokeObjectURL', bind$1(nativeRevokeObjectURL, NativeURL));
  }

  setToStringTag$2(URLConstructor, 'URL');

  $$c({ global: true, constructor: true, forced: !USE_NATIVE_URL, sham: !DESCRIPTORS$5 }, {
    URL: URLConstructor
  });

  var MESSAGE_INIT = "init";
  var MESSAGE_APPEND = "append";
  var MESSAGE_FLUSH = "flush";
  var MESSAGE_EVENT_TYPE = "message";
  var classicWorkersSupported = true;
  var getWorker = (function (workerData, codecConstructor, options, config, _onTaskFinished, webWorker, scripts) {
    Object.assign(workerData, {
      busy: true,
      codecConstructor: codecConstructor,
      options: Object.assign({}, options),
      scripts: scripts,
      terminate: function terminate() {
        if (workerData.worker && !workerData.busy) {
          workerData.worker.terminate();
          workerData.interface = null;
        }
      },
      onTaskFinished: function onTaskFinished() {
        workerData.busy = false;

        _onTaskFinished(workerData);
      }
    });
    return webWorker ? createWebWorkerInterface(workerData, config) : createWorkerInterface(workerData, config);
  });

  function createWorkerInterface(workerData, config) {
    var interfaceCodec = createCodec$1(workerData.codecConstructor, workerData.options, config);
    return {
      append: function append(data) {
        try {
          return _await(_catch(function () {
            return _await(interfaceCodec.append(data));
          }, function (error) {
            workerData.onTaskFinished();
            throw error;
          }));
        } catch (e) {
          return Promise.reject(e);
        }
      },
      flush: function flush() {
        try {
          return _await(_finallyRethrows(function () {
            return _await(interfaceCodec.flush());
          }, function (_wasThrown, _result) {
            workerData.onTaskFinished();
            return _rethrow(_wasThrown, _result);
          }));
        } catch (e) {
          return Promise.reject(e);
        }
      },
      abort: function abort() {
        workerData.onTaskFinished();
      }
    };
  }

  function createWebWorkerInterface(workerData, config) {
    var initAndSendMessage = _async(function (message) {
      return _invoke(function () {
        if (!messageTask) {
          var options = workerData.options;
          var scripts = workerData.scripts.slice(1);
          return _awaitIgnored(sendMessage({
            scripts: scripts,
            type: MESSAGE_INIT,
            options: options,
            config: {
              chunkSize: config.chunkSize
            }
          }));
        }
      }, function () {
        return sendMessage(message);
      });
    });

    var messageTask;
    var workerOptions = {
      type: "module"
    };

    if (!workerData.interface) {
      if (!classicWorkersSupported) {
        workerData.worker = getWorker(workerOptions, config.baseURL);
      } else {
        try {
          workerData.worker = getWorker({}, config.baseURL);
        } catch (error) {
          classicWorkersSupported = false;
          workerData.worker = getWorker(workerOptions, config.baseURL);
        }
      }

      workerData.worker.addEventListener(MESSAGE_EVENT_TYPE, onMessage, false);
      workerData.interface = {
        append: function append(data) {
          return initAndSendMessage({
            type: MESSAGE_APPEND,
            data: data
          });
        },
        flush: function flush() {
          return initAndSendMessage({
            type: MESSAGE_FLUSH
          });
        },
        abort: function abort() {
          workerData.onTaskFinished();
        }
      };
    }

    return workerData.interface;

    function getWorker(options, baseURL) {
      var url, scriptUrl;
      url = workerData.scripts[0];

      if (typeof url == "function") {
        url = url();
      }

      try {
        scriptUrl = new URL(url, baseURL);
      } catch (error) {
        scriptUrl = url;
      }

      return new Worker(scriptUrl, options);
    }

    function sendMessage(message) {
      var worker = workerData.worker;
      var result = new Promise(function (resolve, reject) {
        return messageTask = {
          resolve: resolve,
          reject: reject
        };
      });

      try {
        if (message.data) {
          try {
            message.data = message.data.buffer;
            worker.postMessage(message, [message.data]);
          } catch (error) {
            worker.postMessage(message);
          }
        } else {
          worker.postMessage(message);
        }
      } catch (error) {
        messageTask.reject(error);
        messageTask = null;
        workerData.onTaskFinished();
      }

      return result;
    }

    function onMessage(event) {
      var message = event.data;

      if (messageTask) {
        var reponseError = message.error;
        var type = message.type;

        if (reponseError) {
          var error = new Error(reponseError.message);
          error.stack = reponseError.stack;
          messageTask.reject(error);
          messageTask = null;
          workerData.onTaskFinished();
        } else if (type == MESSAGE_INIT || type == MESSAGE_FLUSH || type == MESSAGE_APPEND) {
          var data = message.data;

          if (type == MESSAGE_FLUSH) {
            messageTask.resolve({
              data: new Uint8Array(data),
              signature: message.signature
            });
            messageTask = null;
            workerData.onTaskFinished();
          } else {
            messageTask.resolve(data && new Uint8Array(data));
          }
        }
      }
    }
  }

  var pool = [];
  var pendingRequests = [];

  function createCodec(codecConstructor, options, config) {
    var streamCopy = !options.compressed && !options.signed && !options.encrypted;
    var webWorker = !streamCopy && (options.useWebWorkers || options.useWebWorkers === undefined && config.useWebWorkers);
    var scripts = webWorker && config.workerScripts ? config.workerScripts[options.codecType] : [];

    if (pool.length < config.maxWorkers) {
      var workerData = {};
      pool.push(workerData);
      return getWorker(workerData, codecConstructor, options, config, onTaskFinished, webWorker, scripts);
    } else {
      var _workerData = pool.find(function (workerData) {
        return !workerData.busy;
      });

      if (_workerData) {
        clearTerminateTimeout(_workerData);
        return getWorker(_workerData, codecConstructor, options, config, onTaskFinished, webWorker, scripts);
      } else {
        return new Promise(function (resolve) {
          return pendingRequests.push({
            resolve: resolve,
            codecConstructor: codecConstructor,
            options: options,
            webWorker: webWorker,
            scripts: scripts
          });
        });
      }
    }

    function onTaskFinished(workerData) {
      if (pendingRequests.length) {
        var _pendingRequests$spli = pendingRequests.splice(0, 1),
            _pendingRequests$spli2 = _slicedToArray(_pendingRequests$spli, 1),
            _pendingRequests$spli3 = _pendingRequests$spli2[0],
            resolve = _pendingRequests$spli3.resolve,
            _codecConstructor = _pendingRequests$spli3.codecConstructor,
            _options = _pendingRequests$spli3.options,
            _webWorker = _pendingRequests$spli3.webWorker,
            _scripts = _pendingRequests$spli3.scripts;

        resolve(getWorker(workerData, _codecConstructor, _options, config, onTaskFinished, _webWorker, _scripts));
      } else if (workerData.worker) {
        clearTerminateTimeout(workerData);

        if (Number.isFinite(config.terminateWorkerTimeout) && config.terminateWorkerTimeout >= 0) {
          workerData.terminateTimeout = setTimeout(function () {
            pool = pool.filter(function (data) {
              return data != workerData;
            });
            workerData.terminate();
          }, config.terminateWorkerTimeout);
        }
      } else {
        pool = pool.filter(function (data) {
          return data != workerData;
        });
      }
    }
  }

  function clearTerminateTimeout(workerData) {
    if (workerData.terminateTimeout) {
      clearTimeout(workerData.terminateTimeout);
      workerData.terminateTimeout = null;
    }
  }

  function terminateWorkers() {
    pool.forEach(function (workerData) {
      clearTerminateTimeout(workerData);
      workerData.terminate();
    });
  }

  var d = function d(_d) {
    if ("function" == typeof URL.createObjectURL) {
      var m = function m() {
        return URL.createObjectURL(new Blob([atob("dmFyIHI9InVuZGVmaW5lZCIhPXR5cGVvZiBnbG9iYWxUaGlzP2dsb2JhbFRoaXM6InVuZGVmaW5lZCIhPXR5cGVvZiB3aW5kb3c/d2luZG93OiJ1bmRlZmluZWQiIT10eXBlb2YgZ2xvYmFsP2dsb2JhbDoidW5kZWZpbmVkIiE9dHlwZW9mIHNlbGY/c2VsZjp7fSx0PWZ1bmN0aW9uKHIpe3JldHVybiByJiZyLk1hdGg9PU1hdGgmJnJ9LG49dCgib2JqZWN0Ij09dHlwZW9mIGdsb2JhbFRoaXMmJmdsb2JhbFRoaXMpfHx0KCJvYmplY3QiPT10eXBlb2Ygd2luZG93JiZ3aW5kb3cpfHx0KCJvYmplY3QiPT10eXBlb2Ygc2VsZiYmc2VsZil8fHQoIm9iamVjdCI9PXR5cGVvZiByJiZyKXx8ZnVuY3Rpb24oKXtyZXR1cm4gdGhpc30oKXx8RnVuY3Rpb24oInJldHVybiB0aGlzIikoKSxlPXt9LGk9ZnVuY3Rpb24ocil7dHJ5e3JldHVybiEhcigpfWNhdGNoKHIpe3JldHVybiEwfX0sbz0haSgoZnVuY3Rpb24oKXtyZXR1cm4gNyE9T2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LDEse2dldDpmdW5jdGlvbigpe3JldHVybiA3fX0pWzFdfSkpLHU9IWkoKGZ1bmN0aW9uKCl7dmFyIHI9ZnVuY3Rpb24oKXt9LmJpbmQoKTtyZXR1cm4iZnVuY3Rpb24iIT10eXBlb2Ygcnx8ci5oYXNPd25Qcm9wZXJ0eSgicHJvdG90eXBlIil9KSksZj1mdW5jdGlvbigpe30uY2FsbCxhPXU/Zi5iaW5kKGYpOmZ1bmN0aW9uKCl7cmV0dXJuIGYuYXBwbHkoZixhcmd1bWVudHMpfSxjPXt9LHM9e30ucHJvcGVydHlJc0VudW1lcmFibGUsdj1PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLGg9diYmIXMuY2FsbCh7MToyfSwxKTtjLmY9aD9mdW5jdGlvbihyKXt2YXIgdD12KHRoaXMscik7cmV0dXJuISF0JiZ0LnR9OnM7dmFyIGwsZCx5PWZ1bmN0aW9uKHIsdCl7cmV0dXJue3Q6ISgxJnIpLGk6ISgyJnIpLHdyaXRhYmxlOiEoNCZyKSx2YWx1ZTp0fX0sdz11LGI9RnVuY3Rpb24ucHJvdG90eXBlLHA9Yi5iaW5kLGc9Yi5jYWxsLG09dyYmcC5iaW5kKGcsZyksUz13P2Z1bmN0aW9uKHIpe3JldHVybiByJiZtKHIpfTpmdW5jdGlvbihyKXtyZXR1cm4gciYmZnVuY3Rpb24oKXtyZXR1cm4gZy5hcHBseShyLGFyZ3VtZW50cyl9fSxBPVMsaj1BKHt9LnRvU3RyaW5nKSxPPUEoIiIuc2xpY2UpLGs9ZnVuY3Rpb24ocil7cmV0dXJuIE8oaihyKSw4LC0xKX0sRT1pLFQ9ayx4PU9iamVjdCxVPVMoIiIuc3BsaXQpLE09RSgoZnVuY3Rpb24oKXtyZXR1cm4heCgieiIpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApfSkpP2Z1bmN0aW9uKHIpe3JldHVybiJTdHJpbmciPT1UKHIpP1UociwiIik6eChyKX06eCxJPVR5cGVFcnJvcixfPWZ1bmN0aW9uKHIpe2lmKG51bGw9PXIpdGhyb3cgSSgiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIityKTtyZXR1cm4gcn0sTD1NLFA9XyxSPWZ1bmN0aW9uKHIpe3JldHVybiBMKFAocikpfSxOPWZ1bmN0aW9uKHIpe3JldHVybiJmdW5jdGlvbiI9PXR5cGVvZiByfSxDPU4sRj1mdW5jdGlvbihyKXtyZXR1cm4ib2JqZWN0Ij09dHlwZW9mIHI/bnVsbCE9PXI6QyhyKX0sQj1uLEQ9TixHPWZ1bmN0aW9uKHIpe3JldHVybiBEKHIpP3I6dm9pZCAwfSxZPWZ1bmN0aW9uKHIsdCl7cmV0dXJuIDI+YXJndW1lbnRzLmxlbmd0aD9HKEJbcl0pOkJbcl0mJkJbcl1bdF19LFY9Uyh7fS5pc1Byb3RvdHlwZU9mKSx6PVkoIm5hdmlnYXRvciIsInVzZXJBZ2VudCIpfHwiIixXPW4sJD16LEg9Vy5wcm9jZXNzLEs9Vy5vLHE9SCYmSC51fHxLJiZLLnZlcnNpb24sSj1xJiZxLnY7SiYmKGQ9KGw9Si5zcGxpdCgiLiIpKVswXT4wJiY0PmxbMF0/MTorKGxbMF0rbFsxXSkpLCFkJiYkJiYoKGw9JC5tYXRjaCgvRWRnZVwvKFxkKykvKSkmJjc0PmxbMV18fChsPSQubWF0Y2goL0Nocm9tZVwvKFxkKykvKSkmJihkPStsWzFdKSk7dmFyIFg9ZCxRPVgsWj0hIU9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMmJiFpKChmdW5jdGlvbigpe3ZhciByPVN5bWJvbCgpO3JldHVybiEocisiIil8fCEoT2JqZWN0KHIpaW5zdGFuY2VvZiBTeW1ib2wpfHwhU3ltYm9sLmgmJlEmJjQxPlF9KSkscnI9WiYmIVN5bWJvbC5oJiYic3ltYm9sIj09dHlwZW9mIFN5bWJvbC5pdGVyYXRvcix0cj1ZLG5yPU4sZXI9Vixpcj1PYmplY3Qsb3I9cnI/ZnVuY3Rpb24ocil7cmV0dXJuInN5bWJvbCI9PXR5cGVvZiByfTpmdW5jdGlvbihyKXt2YXIgdD10cigiU3ltYm9sIik7cmV0dXJuIG5yKHQpJiZlcih0LnByb3RvdHlwZSxpcihyKSl9LHVyPVN0cmluZyxmcj1mdW5jdGlvbihyKXt0cnl7cmV0dXJuIHVyKHIpfWNhdGNoKHIpe3JldHVybiJPYmplY3QifX0sYXI9Tixjcj1mcixzcj1UeXBlRXJyb3IsdnI9ZnVuY3Rpb24ocil7aWYoYXIocikpcmV0dXJuIHI7dGhyb3cgc3IoY3IocikrIiBpcyBub3QgYSBmdW5jdGlvbiIpfSxocj12cixscj1mdW5jdGlvbihyLHQpe3ZhciBuPXJbdF07cmV0dXJuIG51bGw9PW4/dm9pZCAwOmhyKG4pfSxkcj1hLHlyPU4sd3I9Rixicj1UeXBlRXJyb3IscHI9e2V4cG9ydHM6e319LGdyPW4sbXI9T2JqZWN0LmRlZmluZVByb3BlcnR5LFNyPWZ1bmN0aW9uKHIsdCl7dHJ5e21yKGdyLHIse3ZhbHVlOnQsaTohMCx3cml0YWJsZTohMH0pfWNhdGNoKG4pe2dyW3JdPXR9cmV0dXJuIHR9LEFyPVNyLGpyPW5bImwiXXx8QXIoIl9fY29yZS1qc19zaGFyZWRfXyIse30pLE9yPWpyOyhwci5leHBvcnRzPWZ1bmN0aW9uKHIsdCl7cmV0dXJuIE9yW3JdfHwoT3Jbcl09dm9pZCAwIT09dD90Ont9KX0pKCJ2ZXJzaW9ucyIsW10pLnB1c2goe3ZlcnNpb246IjMuMjIuOCIsbW9kZToiZ2xvYmFsIixwOiLCqSAyMDE0LTIwMjIgRGVuaXMgUHVzaGthcmV2ICh6bG9pcm9jay5ydSkiLGc6Imh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2Jsb2IvdjMuMjIuOC9MSUNFTlNFIixzb3VyY2U6Imh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzIn0pO3ZhciBrcj1fLEVyPU9iamVjdCxUcj1mdW5jdGlvbihyKXtyZXR1cm4gRXIoa3IocikpfSx4cj1UcixVcj1TKHt9Lmhhc093blByb3BlcnR5KSxNcj1PYmplY3QuaGFzT3dufHxmdW5jdGlvbihyLHQpe3JldHVybiBVcih4cihyKSx0KX0sSXI9Uyxfcj0wLExyPU1hdGgucmFuZG9tKCksUHI9SXIoMS4udG9TdHJpbmcpLFJyPWZ1bmN0aW9uKHIpe3JldHVybiJTeW1ib2woIisodm9pZCAwPT09cj8iIjpyKSsiKV8iK1ByKCsrX3IrTHIsMzYpfSxOcj1uLENyPXByLmV4cG9ydHMsRnI9TXIsQnI9UnIsRHI9WixHcj1ycixZcj1Dcigid2tzIiksVnI9TnIuU3ltYm9sLHpyPVZyJiZWci5mb3IsV3I9R3I/VnI6VnImJlZyLm18fEJyLCRyPWZ1bmN0aW9uKHIpe2lmKCFGcihZcixyKXx8IURyJiYic3RyaW5nIiE9dHlwZW9mIFlyW3JdKXt2YXIgdD0iU3ltYm9sLiIrcjtEciYmRnIoVnIscik/WXJbcl09VnJbcl06WXJbcl09R3ImJnpyP3pyKHQpOldyKHQpfXJldHVybiBZcltyXX0sSHI9YSxLcj1GLHFyPW9yLEpyPWxyLFhyPVR5cGVFcnJvcixRcj0kcigidG9QcmltaXRpdmUiKSxacj1mdW5jdGlvbihyLHQpe2lmKCFLcihyKXx8cXIocikpcmV0dXJuIHI7dmFyIG4sZT1KcihyLFFyKTtpZihlKXtpZih2b2lkIDA9PT10JiYodD0iZGVmYXVsdCIpLG49SHIoZSxyLHQpLCFLcihuKXx8cXIobikpcmV0dXJuIG47dGhyb3cgWHIoIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZSIpfXJldHVybiB2b2lkIDA9PT10JiYodD0ibnVtYmVyIiksZnVuY3Rpb24ocix0KXt2YXIgbixlO2lmKCJzdHJpbmciPT09dCYmeXIobj1yLnRvU3RyaW5nKSYmIXdyKGU9ZHIobixyKSkpcmV0dXJuIGU7aWYoeXIobj1yLnZhbHVlT2YpJiYhd3IoZT1kcihuLHIpKSlyZXR1cm4gZTtpZigic3RyaW5nIiE9PXQmJnlyKG49ci50b1N0cmluZykmJiF3cihlPWRyKG4scikpKXJldHVybiBlO3Rocm93IGJyKCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWUiKX0ocix0KX0scnQ9WnIsdHQ9b3IsbnQ9ZnVuY3Rpb24ocil7dmFyIHQ9cnQociwic3RyaW5nIik7cmV0dXJuIHR0KHQpP3Q6dCsiIn0sZXQ9RixpdD1uLmRvY3VtZW50LG90PWV0KGl0KSYmZXQoaXQuY3JlYXRlRWxlbWVudCksdXQ9ZnVuY3Rpb24ocil7cmV0dXJuIG90P2l0LmNyZWF0ZUVsZW1lbnQocik6e319LGZ0PXV0LGF0PSFvJiYhaSgoZnVuY3Rpb24oKXtyZXR1cm4gNyE9T2JqZWN0LmRlZmluZVByb3BlcnR5KGZ0KCJkaXYiKSwiYSIse2dldDpmdW5jdGlvbigpe3JldHVybiA3fX0pLmF9KSksY3Q9byxzdD1hLHZ0PWMsaHQ9eSxsdD1SLGR0PW50LHl0PU1yLHd0PWF0LGJ0PU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7ZS5mPWN0P2J0OmZ1bmN0aW9uKHIsdCl7aWYocj1sdChyKSx0PWR0KHQpLHd0KXRyeXtyZXR1cm4gYnQocix0KX1jYXRjaChyKXt9aWYoeXQocix0KSlyZXR1cm4gaHQoIXN0KHZ0LmYscix0KSxyW3RdKX07dmFyIHB0PXt9LGd0PW8mJmkoKGZ1bmN0aW9uKCl7cmV0dXJuIDQyIT1PYmplY3QuZGVmaW5lUHJvcGVydHkoKGZ1bmN0aW9uKCl7fSksInByb3RvdHlwZSIse3ZhbHVlOjQyLHdyaXRhYmxlOiExfSkucHJvdG90eXBlfSkpLG10PUYsU3Q9U3RyaW5nLEF0PVR5cGVFcnJvcixqdD1mdW5jdGlvbihyKXtpZihtdChyKSlyZXR1cm4gcjt0aHJvdyBBdChTdChyKSsiIGlzIG5vdCBhbiBvYmplY3QiKX0sT3Q9byxrdD1hdCxFdD1ndCxUdD1qdCx4dD1udCxVdD1UeXBlRXJyb3IsTXQ9T2JqZWN0LmRlZmluZVByb3BlcnR5LEl0PU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7cHQuZj1PdD9FdD9mdW5jdGlvbihyLHQsbil7aWYoVHQociksdD14dCh0KSxUdChuKSwiZnVuY3Rpb24iPT10eXBlb2YgciYmInByb3RvdHlwZSI9PT10JiYidmFsdWUiaW4gbiYmIndyaXRhYmxlImluIG4mJiFuLndyaXRhYmxlKXt2YXIgZT1JdChyLHQpO2UmJmUud3JpdGFibGUmJihyW3RdPW4udmFsdWUsbj17aToiaSJpbiBuP24uaTplLmksdDoidCJpbiBuP24udDplLnQsd3JpdGFibGU6ITF9KX1yZXR1cm4gTXQocix0LG4pfTpNdDpmdW5jdGlvbihyLHQsbil7aWYoVHQociksdD14dCh0KSxUdChuKSxrdCl0cnl7cmV0dXJuIE10KHIsdCxuKX1jYXRjaChyKXt9aWYoImdldCJpbiBufHwic2V0ImluIG4pdGhyb3cgVXQoIkFjY2Vzc29ycyBub3Qgc3VwcG9ydGVkIik7cmV0dXJuInZhbHVlImluIG4mJihyW3RdPW4udmFsdWUpLHJ9O3ZhciBfdD1wdCxMdD15LFB0PW8/ZnVuY3Rpb24ocix0LG4pe3JldHVybiBfdC5mKHIsdCxMdCgxLG4pKX06ZnVuY3Rpb24ocix0LG4pe3JldHVybiByW3RdPW4scn0sUnQ9e2V4cG9ydHM6e319LE50PW8sQ3Q9RnVuY3Rpb24ucHJvdG90eXBlLEZ0PU50JiZPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLEJ0PU1yKEN0LCJuYW1lIiksRHQ9e1M6QnQsQTpCdCYmITEsajpCdCYmKCFOdHx8TnQmJkZ0KEN0LCJuYW1lIikuaSl9LEd0PU4sWXQ9anIsVnQ9UyhGdW5jdGlvbi50b1N0cmluZyk7R3QoWXQuTyl8fChZdC5PPWZ1bmN0aW9uKHIpe3JldHVybiBWdChyKX0pO3ZhciB6dCxXdCwkdCxIdD1ZdC5PLEt0PU4scXQ9SHQsSnQ9bi5XZWFrTWFwLFh0PUt0KEp0KSYmL25hdGl2ZSBjb2RlLy50ZXN0KHF0KEp0KSksUXQ9cHIuZXhwb3J0cyxadD1Scixybj1RdCgia2V5cyIpLHRuPWZ1bmN0aW9uKHIpe3JldHVybiBybltyXXx8KHJuW3JdPVp0KHIpKX0sbm49e30sZW49WHQsb249bix1bj1TLGZuPUYsYW49UHQsY249TXIsc249anIsdm49dG4saG49bm4sbG49b24uVHlwZUVycm9yLGRuPW9uLldlYWtNYXA7aWYoZW58fHNuLnN0YXRlKXt2YXIgeW49c24uc3RhdGV8fChzbi5zdGF0ZT1uZXcgZG4pLHduPXVuKHluLmdldCksYm49dW4oeW4uaGFzKSxwbj11bih5bi5zZXQpO3p0PWZ1bmN0aW9uKHIsdCl7aWYoYm4oeW4scikpdGhyb3cgbmV3IGxuKCJPYmplY3QgYWxyZWFkeSBpbml0aWFsaXplZCIpO3JldHVybiB0Lms9cixwbih5bixyLHQpLHR9LFd0PWZ1bmN0aW9uKHIpe3JldHVybiB3bih5bixyKXx8e319LCR0PWZ1bmN0aW9uKHIpe3JldHVybiBibih5bixyKX19ZWxzZXt2YXIgZ249dm4oInN0YXRlIik7aG5bZ25dPSEwLHp0PWZ1bmN0aW9uKHIsdCl7aWYoY24ocixnbikpdGhyb3cgbmV3IGxuKCJPYmplY3QgYWxyZWFkeSBpbml0aWFsaXplZCIpO3JldHVybiB0Lms9cixhbihyLGduLHQpLHR9LFd0PWZ1bmN0aW9uKHIpe3JldHVybiBjbihyLGduKT9yW2duXTp7fX0sJHQ9ZnVuY3Rpb24ocil7cmV0dXJuIGNuKHIsZ24pfX12YXIgbW49e3NldDp6dCxnZXQ6V3QsaGFzOiR0LFQ6ZnVuY3Rpb24ocil7cmV0dXJuICR0KHIpP1d0KHIpOnp0KHIse30pfSxVOmZ1bmN0aW9uKHIpe3JldHVybiBmdW5jdGlvbih0KXt2YXIgbjtpZighZm4odCl8fChuPVd0KHQpKS50eXBlIT09cil0aHJvdyBsbigiSW5jb21wYXRpYmxlIHJlY2VpdmVyLCAiK3IrIiByZXF1aXJlZCIpO3JldHVybiBufX19LFNuPU4sQW49TXIsam49byxPbj1EdC5qLGtuPUh0LEVuPW1uLlQsVG49bW4uZ2V0LHhuPU9iamVjdC5kZWZpbmVQcm9wZXJ0eSxVbj1qbiYmIWkoKGZ1bmN0aW9uKCl7cmV0dXJuIDghPT14bigoZnVuY3Rpb24oKXt9KSwibGVuZ3RoIix7dmFsdWU6OH0pLmxlbmd0aH0pKSxNbj0oU3RyaW5nKyIiKS5zcGxpdCgiU3RyaW5nIiksSW49UnQuZXhwb3J0cz1mdW5jdGlvbihyLHQsbil7IlN5bWJvbCgiPT09KHQrIiIpLnNsaWNlKDAsNykmJih0PSJbIisodCsiIikucmVwbGFjZSgvXlN5bWJvbFwoKFteKV0qKVwpLywiJDEiKSsiXSIpLG4mJm4uTSYmKHQ9ImdldCAiK3QpLG4mJm4uSSYmKHQ9InNldCAiK3QpLCghQW4ociwibmFtZSIpfHxPbiYmci5uYW1lIT09dCkmJnhuKHIsIm5hbWUiLHt2YWx1ZTp0LGk6ITB9KSxVbiYmbiYmQW4obiwiYXJpdHkiKSYmci5sZW5ndGghPT1uLl8mJnhuKHIsImxlbmd0aCIse3ZhbHVlOm4uX30pO3RyeXtuJiZBbihuLCJjb25zdHJ1Y3RvciIpJiZuLmNvbnN0cnVjdG9yP2puJiZ4bihyLCJwcm90b3R5cGUiLHt3cml0YWJsZTohMX0pOnIucHJvdG90eXBlJiYoci5wcm90b3R5cGU9dm9pZCAwKX1jYXRjaChyKXt9dmFyIGU9RW4ocik7cmV0dXJuIEFuKGUsInNvdXJjZSIpfHwoZS5zb3VyY2U9TW4uam9pbigic3RyaW5nIj09dHlwZW9mIHQ/dDoiIikpLHJ9O0Z1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZz1JbigoZnVuY3Rpb24oKXtyZXR1cm4gU24odGhpcykmJlRuKHRoaXMpLnNvdXJjZXx8a24odGhpcyl9KSwidG9TdHJpbmciKTt2YXIgX249TixMbj1QdCxQbj1SdC5leHBvcnRzLFJuPVNyLE5uPWZ1bmN0aW9uKHIsdCxuLGUpe2V8fChlPXt9KTt2YXIgaT1lLnQsbz12b2lkIDAhPT1lLm5hbWU/ZS5uYW1lOnQ7cmV0dXJuIF9uKG4pJiZQbihuLG8sZSksZS5nbG9iYWw/aT9yW3RdPW46Um4odCxuKTooZS5MP3JbdF0mJihpPSEwKTpkZWxldGUgclt0XSxpP3JbdF09bjpMbihyLHQsbikpLHJ9LENuPXt9LEZuPU1hdGguY2VpbCxCbj1NYXRoLmZsb29yLERuPU1hdGgudHJ1bmN8fGZ1bmN0aW9uKHIpe3ZhciB0PStyO3JldHVybih0PjA/Qm46Rm4pKHQpfSxHbj1mdW5jdGlvbihyKXt2YXIgdD0rcjtyZXR1cm4gdCE9dHx8MD09PXQ/MDpEbih0KX0sWW49R24sVm49TWF0aC5tYXgsem49TWF0aC5taW4sV249ZnVuY3Rpb24ocix0KXt2YXIgbj1ZbihyKTtyZXR1cm4gMD5uP1ZuKG4rdCwwKTp6bihuLHQpfSwkbj1HbixIbj1NYXRoLm1pbixLbj1mdW5jdGlvbihyKXtyZXR1cm4gcj4wP0huKCRuKHIpLDkwMDcxOTkyNTQ3NDA5OTEpOjB9LHFuPUtuLEpuPWZ1bmN0aW9uKHIpe3JldHVybiBxbihyLmxlbmd0aCl9LFhuPVIsUW49V24sWm49Sm4scmU9ZnVuY3Rpb24ocil7cmV0dXJuIGZ1bmN0aW9uKHQsbixlKXt2YXIgaSxvPVhuKHQpLHU9Wm4obyksZj1RbihlLHUpO2lmKHImJm4hPW4pe2Zvcig7dT5mOylpZigoaT1vW2YrK10pIT1pKXJldHVybiEwfWVsc2UgZm9yKDt1PmY7ZisrKWlmKChyfHxmIGluIG8pJiZvW2ZdPT09bilyZXR1cm4gcnx8Znx8MDtyZXR1cm4hciYmLTF9fSx0ZT17aW5jbHVkZXM6cmUoITApLGluZGV4T2Y6cmUoITEpfSxuZT1NcixlZT1SLGllPXRlLmluZGV4T2Ysb2U9bm4sdWU9UyhbXS5wdXNoKSxmZT1mdW5jdGlvbihyLHQpe3ZhciBuLGU9ZWUociksaT0wLG89W107Zm9yKG4gaW4gZSkhbmUob2UsbikmJm5lKGUsbikmJnVlKG8sbik7Zm9yKDt0Lmxlbmd0aD5pOyluZShlLG49dFtpKytdKSYmKH5pZShvLG4pfHx1ZShvLG4pKTtyZXR1cm4gb30sYWU9WyJjb25zdHJ1Y3RvciIsImhhc093blByb3BlcnR5IiwiaXNQcm90b3R5cGVPZiIsInByb3BlcnR5SXNFbnVtZXJhYmxlIiwidG9Mb2NhbGVTdHJpbmciLCJ0b1N0cmluZyIsInZhbHVlT2YiXSxjZT1mZSxzZT1hZS5jb25jYXQoImxlbmd0aCIsInByb3RvdHlwZSIpO0NuLmY9T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXN8fGZ1bmN0aW9uKHIpe3JldHVybiBjZShyLHNlKX07dmFyIHZlPXt9O3ZlLmY9T2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9sczt2YXIgaGU9WSxsZT1DbixkZT12ZSx5ZT1qdCx3ZT1TKFtdLmNvbmNhdCksYmU9aGUoIlJlZmxlY3QiLCJvd25LZXlzIil8fGZ1bmN0aW9uKHIpe3ZhciB0PWxlLmYoeWUocikpLG49ZGUuZjtyZXR1cm4gbj93ZSh0LG4ocikpOnR9LHBlPU1yLGdlPWJlLG1lPWUsU2U9cHQsQWU9ZnVuY3Rpb24ocix0LG4pe2Zvcih2YXIgZT1nZSh0KSxpPVNlLmYsbz1tZS5mLHU9MDt1PGUubGVuZ3RoO3UrKyl7dmFyIGY9ZVt1XTtwZShyLGYpfHxuJiZwZShuLGYpfHxpKHIsZixvKHQsZikpfX0samU9aSxPZT1OLGtlPS8jfFwucHJvdG90eXBlXC4vLEVlPWZ1bmN0aW9uKHIsdCl7dmFyIG49eGVbVGUocildO3JldHVybiBuPT1NZXx8biE9VWUmJihPZSh0KT9qZSh0KTohIXQpfSxUZT1FZS5ub3JtYWxpemU9ZnVuY3Rpb24ocil7cmV0dXJuKHIrIiIpLnJlcGxhY2Uoa2UsIi4iKS50b0xvd2VyQ2FzZSgpfSx4ZT1FZS5kYXRhPXt9LFVlPUVlLlA9Ik4iLE1lPUVlLlI9IlAiLEllPUVlLF9lPW4sTGU9ZS5mLFBlPVB0LFJlPU5uLE5lPVNyLENlPUFlLEZlPUllLEJlPWZ1bmN0aW9uKHIsdCl7dmFyIG4sZSxpLG8sdSxmPXIudGFyZ2V0LGE9ci5nbG9iYWwsYz1yLk47aWYobj1hP19lOmM/X2VbZl18fE5lKGYse30pOihfZVtmXXx8e30pLnByb3RvdHlwZSlmb3IoZSBpbiB0KXtpZihvPXRbZV0saT1yLkM/KHU9TGUobixlKSkmJnUudmFsdWU6bltlXSwhRmUoYT9lOmYrKGM/Ii4iOiIjIikrZSxyLkYpJiZ2b2lkIDAhPT1pKXtpZih0eXBlb2Ygbz09dHlwZW9mIGkpY29udGludWU7Q2UobyxpKX0oci5ofHxpJiZpLmgpJiZQZShvLCJzaGFtIiwhMCksUmUobixlLG8scil9fSxEZT17fTtEZVskcigidG9TdHJpbmdUYWciKV09InoiO3ZhciBHZSxZZT1EZSsiIj09IltvYmplY3Qgel0iLFZlPVllLHplPU4sV2U9aywkZT0kcigidG9TdHJpbmdUYWciKSxIZT1PYmplY3QsS2U9IkFyZ3VtZW50cyI9PVdlKGZ1bmN0aW9uKCl7cmV0dXJuIGFyZ3VtZW50c30oKSkscWU9VmU/V2U6ZnVuY3Rpb24ocil7dmFyIHQsbixlO3JldHVybiB2b2lkIDA9PT1yPyJVbmRlZmluZWQiOm51bGw9PT1yPyJOdWxsIjoic3RyaW5nIj09dHlwZW9mKG49ZnVuY3Rpb24ocix0KXt0cnl7cmV0dXJuIHJbdF19Y2F0Y2gocil7fX0odD1IZShyKSwkZSkpP246S2U/V2UodCk6Ik9iamVjdCI9PShlPVdlKHQpKSYmemUodC5CKT8iQXJndW1lbnRzIjplfSxKZT1xZSxYZT1TdHJpbmcsUWU9ZnVuY3Rpb24ocil7aWYoIlN5bWJvbCI9PT1KZShyKSl0aHJvdyBUeXBlRXJyb3IoIkNhbm5vdCBjb252ZXJ0IGEgU3ltYm9sIHZhbHVlIHRvIGEgc3RyaW5nIik7cmV0dXJuIFhlKHIpfSxaZT1GLHJpPWssdGk9JHIoIm1hdGNoIiksbmk9VHlwZUVycm9yLGVpPSRyKCJtYXRjaCIpLGlpPUJlLG9pPVMsdWk9ZS5mLGZpPUtuLGFpPVFlLGNpPWZ1bmN0aW9uKHIpe2lmKGZ1bmN0aW9uKHIpe3ZhciB0O3JldHVybiBaZShyKSYmKHZvaWQgMCE9PSh0PXJbdGldKT8hIXQ6IlJlZ0V4cCI9PXJpKHIpKX0ocikpdGhyb3cgbmkoIlRoZSBtZXRob2QgZG9lc24ndCBhY2NlcHQgcmVndWxhciBleHByZXNzaW9ucyIpO3JldHVybiByfSxzaT1fLHZpPW9pKCIiLnN0YXJ0c1dpdGgpLGhpPW9pKCIiLnNsaWNlKSxsaT1NYXRoLm1pbixkaT1mdW5jdGlvbigpe3ZhciByPS8uLzt0cnl7Ii8uLyIuc3RhcnRzV2l0aChyKX1jYXRjaCh0KXt0cnl7cmV0dXJuIHJbZWldPSExLCIvLi8iLnN0YXJ0c1dpdGgocil9Y2F0Y2gocil7fX1yZXR1cm4hMX0oKTtpaSh7dGFyZ2V0OiJTdHJpbmciLEQ6ITAsRjohKCFkaSYmKEdlPXVpKFN0cmluZy5wcm90b3R5cGUsInN0YXJ0c1dpdGgiKSxHZSYmIUdlLndyaXRhYmxlKXx8ZGkpfSx7c3RhcnRzV2l0aDpmdW5jdGlvbihyKXt2YXIgdD1haShzaSh0aGlzKSk7Y2kocik7dmFyIG49ZmkobGkoYXJndW1lbnRzLmxlbmd0aD4xP2FyZ3VtZW50c1sxXTp2b2lkIDAsdC5sZW5ndGgpKSxlPWFpKHIpO3JldHVybiB2aT92aSh0LGUsbik6aGkodCxuLG4rZS5sZW5ndGgpPT09ZX19KTt2YXIgeWk9e30sd2k9ZmUsYmk9YWUscGk9T2JqZWN0LmtleXN8fGZ1bmN0aW9uKHIpe3JldHVybiB3aShyLGJpKX0sZ2k9byxtaT1ndCxTaT1wdCxBaT1qdCxqaT1SLE9pPXBpO3lpLmY9Z2kmJiFtaT9PYmplY3QuZGVmaW5lUHJvcGVydGllczpmdW5jdGlvbihyLHQpe0FpKHIpO2Zvcih2YXIgbixlPWppKHQpLGk9T2kodCksbz1pLmxlbmd0aCx1PTA7bz51OylTaS5mKHIsbj1pW3UrK10sZVtuXSk7cmV0dXJuIHJ9O3ZhciBraSxFaT1ZKCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIpLFRpPWp0LHhpPXlpLFVpPWFlLE1pPW5uLElpPUVpLF9pPXV0LExpPXRuKCJJRV9QUk9UTyIpLFBpPWZ1bmN0aW9uKCl7fSxSaT1mdW5jdGlvbihyKXtyZXR1cm4iPHNjcmlwdD4iK3IrIjxcL3NjcmlwdD4ifSxOaT1mdW5jdGlvbihyKXtyLndyaXRlKFJpKCIiKSksci5jbG9zZSgpO3ZhciB0PXIucGFyZW50V2luZG93Lk9iamVjdDtyZXR1cm4gcj1udWxsLHR9LENpPWZ1bmN0aW9uKCl7dHJ5e2tpPW5ldyBBY3RpdmVYT2JqZWN0KCJodG1sZmlsZSIpfWNhdGNoKHIpe312YXIgcix0O0NpPSJ1bmRlZmluZWQiIT10eXBlb2YgZG9jdW1lbnQ/ZG9jdW1lbnQuZG9tYWluJiZraT9OaShraSk6KCh0PV9pKCJpZnJhbWUiKSkuc3R5bGUuZGlzcGxheT0ibm9uZSIsSWkuYXBwZW5kQ2hpbGQodCksdC5zcmM9ImphdmFzY3JpcHQ6Iiwocj10LmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQpLm9wZW4oKSxyLndyaXRlKFJpKCJkb2N1bWVudC5GPU9iamVjdCIpKSxyLmNsb3NlKCksci5HKTpOaShraSk7Zm9yKHZhciBuPVVpLmxlbmd0aDtuLS07KWRlbGV0ZSBDaS5wcm90b3R5cGVbVWlbbl1dO3JldHVybiBDaSgpfTtNaVtMaV09ITA7dmFyIEZpPU9iamVjdC5jcmVhdGV8fGZ1bmN0aW9uKHIsdCl7dmFyIG47cmV0dXJuIG51bGwhPT1yPyhQaS5wcm90b3R5cGU9VGkociksbj1uZXcgUGksUGkucHJvdG90eXBlPW51bGwsbltMaV09cik6bj1DaSgpLHZvaWQgMD09PXQ/bjp4aS5mKG4sdCl9LEJpPSRyLERpPUZpLEdpPXB0LmYsWWk9QmkoInVuc2NvcGFibGVzIiksVmk9QXJyYXkucHJvdG90eXBlO251bGw9PVZpW1lpXSYmR2koVmksWWkse2k6ITAsdmFsdWU6RGkobnVsbCl9KTt2YXIgemksV2ksJGksSGk9ZnVuY3Rpb24ocil7VmlbWWldW3JdPSEwfSxLaT17fSxxaT0haSgoZnVuY3Rpb24oKXtmdW5jdGlvbiByKCl7fXJldHVybiByLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1udWxsLE9iamVjdC5nZXRQcm90b3R5cGVPZihuZXcgcikhPT1yLnByb3RvdHlwZX0pKSxKaT1NcixYaT1OLFFpPVRyLFppPXFpLHJvPXRuKCJJRV9QUk9UTyIpLHRvPU9iamVjdCxubz10by5wcm90b3R5cGUsZW89Wmk/dG8uZ2V0UHJvdG90eXBlT2Y6ZnVuY3Rpb24ocil7dmFyIHQ9UWkocik7aWYoSmkodCxybykpcmV0dXJuIHRbcm9dO3ZhciBuPXQuY29uc3RydWN0b3I7cmV0dXJuIFhpKG4pJiZ0IGluc3RhbmNlb2Ygbj9uLnByb3RvdHlwZTp0IGluc3RhbmNlb2YgdG8/bm86bnVsbH0saW89aSxvbz1OLHVvPWVvLGZvPU5uLGFvPSRyKCJpdGVyYXRvciIpLGNvPSExO1tdLmtleXMmJigibmV4dCJpbigkaT1bXS5rZXlzKCkpPyhXaT11byh1bygkaSkpKSE9PU9iamVjdC5wcm90b3R5cGUmJih6aT1XaSk6Y289ITApO3ZhciBzbz1udWxsPT16aXx8aW8oKGZ1bmN0aW9uKCl7dmFyIHI9e307cmV0dXJuIHppW2FvXS5jYWxsKHIpIT09cn0pKTtzbyYmKHppPXt9KSxvbyh6aVthb10pfHxmbyh6aSxhbywoZnVuY3Rpb24oKXtyZXR1cm4gdGhpc30pKTt2YXIgdm89e1k6emksVjpjb30saG89cHQuZixsbz1Ncix5bz0kcigidG9TdHJpbmdUYWciKSx3bz1mdW5jdGlvbihyLHQsbil7ciYmIW4mJihyPXIucHJvdG90eXBlKSxyJiYhbG8ocix5bykmJmhvKHIseW8se2k6ITAsdmFsdWU6dH0pfSxibz12by5ZLHBvPUZpLGdvPXksbW89d28sU289S2ksQW89ZnVuY3Rpb24oKXtyZXR1cm4gdGhpc30sam89TixPbz1TdHJpbmcsa289VHlwZUVycm9yLEVvPVMsVG89anQseG89T2JqZWN0LnNldFByb3RvdHlwZU9mfHwoIl9fcHJvdG9fXyJpbnt9P2Z1bmN0aW9uKCl7dmFyIHIsdD0hMSxuPXt9O3RyeXsocj1FbyhPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE9iamVjdC5wcm90b3R5cGUsIl9fcHJvdG9fXyIpLnNldCkpKG4sW10pLHQ9biBpbnN0YW5jZW9mIEFycmF5fWNhdGNoKHIpe31yZXR1cm4gZnVuY3Rpb24obixlKXtyZXR1cm4gVG8obiksZnVuY3Rpb24ocil7aWYoIm9iamVjdCI9PXR5cGVvZiByfHxqbyhyKSlyZXR1cm4gcjt0aHJvdyBrbygiQ2FuJ3Qgc2V0ICIrT28ocikrIiBhcyBhIHByb3RvdHlwZSIpfShlKSx0P3IobixlKTpuLl9fcHJvdG9fXz1lLG59fSgpOnZvaWQgMCksVW89QmUsTW89YSxJbz1OLF9vPWVvLExvPXhvLFBvPXdvLFJvPVB0LE5vPU5uLENvPUtpLEZvPUR0LkEsQm89RHQuaixEbz12by5ZLEdvPXZvLlYsWW89JHIoIml0ZXJhdG9yIiksVm89ZnVuY3Rpb24oKXtyZXR1cm4gdGhpc30sem89ZnVuY3Rpb24ocix0LG4sZSxpLG8sdSl7IWZ1bmN0aW9uKHIsdCxuKXt2YXIgZT10KyIgSXRlcmF0b3IiO3IucHJvdG90eXBlPXBvKGJvLHtuZXh0OmdvKDEsbil9KSxtbyhyLGUsITEpLFNvW2VdPUFvfShuLHQsZSk7dmFyIGYsYSxjLHM9ZnVuY3Rpb24ocil7aWYocj09PWkmJnkpcmV0dXJuIHk7aWYoIUdvJiZyIGluIGwpcmV0dXJuIGxbcl07c3dpdGNoKHIpe2Nhc2Uia2V5cyI6Y2FzZSJ2YWx1ZXMiOmNhc2UiZW50cmllcyI6cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBuKHRoaXMscil9fXJldHVybiBmdW5jdGlvbigpe3JldHVybiBuZXcgbih0aGlzKX19LHY9dCsiIEl0ZXJhdG9yIixoPSExLGw9ci5wcm90b3R5cGUsZD1sW1lvXXx8bFsiQEBpdGVyYXRvciJdfHxpJiZsW2ldLHk9IUdvJiZkfHxzKGkpLHc9IkFycmF5Ij09dCYmbC5lbnRyaWVzfHxkO2lmKHcmJihmPV9vKHcuY2FsbChuZXcgcikpKSE9PU9iamVjdC5wcm90b3R5cGUmJmYubmV4dCYmKF9vKGYpIT09RG8mJihMbz9MbyhmLERvKTpJbyhmW1lvXSl8fE5vKGYsWW8sVm8pKSxQbyhmLHYsITApKSxGbyYmInZhbHVlcyI9PWkmJmQmJiJ2YWx1ZXMiIT09ZC5uYW1lJiYoQm8/Um8obCwibmFtZSIsInZhbHVlcyIpOihoPSEwLHk9ZnVuY3Rpb24oKXtyZXR1cm4gTW8oZCx0aGlzKX0pKSxpKWlmKGE9e3ZhbHVlczpzKCJ2YWx1ZXMiKSxrZXlzOm8/eTpzKCJrZXlzIiksZW50cmllczpzKCJlbnRyaWVzIil9LHUpZm9yKGMgaW4gYSkoR298fGh8fCEoYyBpbiBsKSkmJk5vKGwsYyxhW2NdKTtlbHNlIFVvKHt0YXJnZXQ6dCxEOiEwLEY6R298fGh9LGEpO3JldHVybiBsW1lvXSE9PXkmJk5vKGwsWW8seSx7bmFtZTppfSksQ29bdF09eSxhfSxXbz1SLCRvPUhpLEhvPUtpLEtvPW1uLHFvPXB0LmYsSm89em8sWG89byxRbz1Lby5zZXQsWm89S28uVSgiQXJyYXkgSXRlcmF0b3IiKSxydT1KbyhBcnJheSwiQXJyYXkiLChmdW5jdGlvbihyLHQpe1FvKHRoaXMse3R5cGU6IkFycmF5IEl0ZXJhdG9yIix0YXJnZXQ6V28ociksaW5kZXg6MCxraW5kOnR9KX0pLChmdW5jdGlvbigpe3ZhciByPVpvKHRoaXMpLHQ9ci50YXJnZXQsbj1yLmtpbmQsZT1yLmluZGV4Kys7cmV0dXJuIHQmJmU8dC5sZW5ndGg/ImtleXMiPT1uP3t2YWx1ZTplLGRvbmU6ITF9OiJ2YWx1ZXMiPT1uP3t2YWx1ZTp0W2VdLGRvbmU6ITF9Ont2YWx1ZTpbZSx0W2VdXSxkb25lOiExfTooci50YXJnZXQ9dm9pZCAwLHt2YWx1ZTp2b2lkIDAsZG9uZTohMH0pfSksInZhbHVlcyIpLHR1PUhvLlc9SG8uQXJyYXk7aWYoJG8oImtleXMiKSwkbygidmFsdWVzIiksJG8oImVudHJpZXMiKSxYbyYmInZhbHVlcyIhPT10dS5uYW1lKXRyeXtxbyh0dSwibmFtZSIse3ZhbHVlOiJ2YWx1ZXMifSl9Y2F0Y2gocil7fXZhciBudT0idW5kZWZpbmVkIiE9dHlwZW9mIEFycmF5QnVmZmVyJiYidW5kZWZpbmVkIiE9dHlwZW9mIERhdGFWaWV3LGV1PU5uLGl1PVYsb3U9VHlwZUVycm9yLHV1PWZ1bmN0aW9uKHIsdCl7aWYoaXUodCxyKSlyZXR1cm4gcjt0aHJvdyBvdSgiSW5jb3JyZWN0IGludm9jYXRpb24iKX0sZnU9R24sYXU9S24sY3U9UmFuZ2VFcnJvcixzdT1mdW5jdGlvbihyKXtpZih2b2lkIDA9PT1yKXJldHVybiAwO3ZhciB0PWZ1KHIpLG49YXUodCk7aWYodCE9PW4pdGhyb3cgY3UoIldyb25nIGxlbmd0aCBvciBpbmRleCIpO3JldHVybiBufSx2dT1BcnJheSxodT1NYXRoLmFicyxsdT1NYXRoLnBvdyxkdT1NYXRoLmZsb29yLHl1PU1hdGgubG9nLHd1PVRyLGJ1PVduLHB1PUpuLGd1PWZ1bmN0aW9uKHIpe2Zvcih2YXIgdD13dSh0aGlzKSxuPXB1KHQpLGU9YXJndW1lbnRzLmxlbmd0aCxpPWJ1KGU+MT9hcmd1bWVudHNbMV06dm9pZCAwLG4pLG89ZT4yP2FyZ3VtZW50c1syXTp2b2lkIDAsdT12b2lkIDA9PT1vP246YnUobyxuKTt1Pmk7KXRbaSsrXT1yO3JldHVybiB0fSxtdT1udCxTdT1wdCxBdT15LGp1PWZ1bmN0aW9uKHIsdCxuKXt2YXIgZT1tdSh0KTtlIGluIHI/U3UuZihyLGUsQXUoMCxuKSk6cltlXT1ufSxPdT1XbixrdT1KbixFdT1qdSxUdT1BcnJheSx4dT1NYXRoLm1heCxVdT1mdW5jdGlvbihyLHQsbil7Zm9yKHZhciBlPWt1KHIpLGk9T3UodCxlKSxvPU91KHZvaWQgMD09PW4/ZTpuLGUpLHU9VHUoeHUoby1pLDApKSxmPTA7bz5pO2krKyxmKyspRXUodSxmLHJbaV0pO3JldHVybiB1Lmxlbmd0aD1mLHV9LE11PW4sSXU9UyxfdT1vLEx1PW51LFB1PUR0LFJ1PVB0LE51PWZ1bmN0aW9uKHIsdCxuKXtmb3IodmFyIGUgaW4gdClldShyLGUsdFtlXSxuKTtyZXR1cm4gcn0sQ3U9aSxGdT11dSxCdT1HbixEdT1LbixHdT1zdSxZdT1lbyxWdT14byx6dT1Dbi5mLFd1PXB0LmYsJHU9Z3UsSHU9VXUsS3U9d28scXU9UHUuQSxKdT1QdS5qLFh1PW1uLmdldCxRdT1tbi5zZXQsWnU9TXUuQXJyYXlCdWZmZXIscmY9WnUsdGY9cmYmJnJmLnByb3RvdHlwZSxuZj1NdS5EYXRhVmlldyxlZj1uZiYmbmYucHJvdG90eXBlLG9mPU9iamVjdC5wcm90b3R5cGUsdWY9TXUuQXJyYXksZmY9TXUuUmFuZ2VFcnJvcixhZj1JdSgkdSksY2Y9SXUoW10ucmV2ZXJzZSksc2Y9ZnVuY3Rpb24ocix0LG4pe3ZhciBlLGksbyx1PXZ1KG4pLGY9OCpuLXQtMSxhPSgxPDxmKS0xLGM9YT4+MSxzPTIzPT09dD9sdSgyLC0yNCktbHUoMiwtNzcpOjAsdj0wPnJ8fDA9PT1yJiYwPjEvcj8xOjAsaD0wO2Zvcigocj1odShyKSkhPXJ8fHI9PT0xLzA/KGk9ciE9cj8xOjAsZT1hKTooZT1kdSh5dShyKS8uNjkzMTQ3MTgwNTU5OTQ1MyksMT5yKihvPWx1KDIsLWUpKSYmKGUtLSxvKj0yKSwyPihyKz0xPmUrYz9zKmx1KDIsMS1jKTpzL28pKm98fChlKyssby89MiksYT5lK2M/MT5lK2M/KGk9cipsdSgyLGMtMSkqbHUoMix0KSxlPTApOihpPShyKm8tMSkqbHUoMix0KSxlKz1jKTooaT0wLGU9YSkpO3Q+PTg7KXVbaCsrXT0yNTUmaSxpLz0yNTYsdC09ODtmb3IoZT1lPDx0fGksZis9dDtmPjA7KXVbaCsrXT0yNTUmZSxlLz0yNTYsZi09ODtyZXR1cm4gdVstLWhdfD0xMjgqdix1fSx2Zj1mdW5jdGlvbihyLHQpe3ZhciBuLGU9ci5sZW5ndGgsaT04KmUtdC0xLG89KDE8PGkpLTEsdT1vPj4xLGY9aS03LGE9ZS0xLGM9clthLS1dLHM9MTI3JmM7Zm9yKGM+Pj03O2Y+MDspcz0yNTYqcytyW2EtLV0sZi09ODtmb3Iobj1zJigxPDwtZiktMSxzPj49LWYsZis9dDtmPjA7KW49MjU2Km4rclthLS1dLGYtPTg7aWYoMD09PXMpcz0xLXU7ZWxzZXtpZihzPT09bylyZXR1cm4gbj9OYU46Yz8tMS8wOjEvMDtuKz1sdSgyLHQpLHMtPXV9cmV0dXJuKGM/LTE6MSkqbipsdSgyLHMtdCl9LGhmPWZ1bmN0aW9uKHIpe3JldHVyblsyNTUmcl19LGxmPWZ1bmN0aW9uKHIpe3JldHVyblsyNTUmcixyPj44JjI1NV19LGRmPWZ1bmN0aW9uKHIpe3JldHVyblsyNTUmcixyPj44JjI1NSxyPj4xNiYyNTUscj4+MjQmMjU1XX0seWY9ZnVuY3Rpb24ocil7cmV0dXJuIHJbM108PDI0fHJbMl08PDE2fHJbMV08PDh8clswXX0sd2Y9ZnVuY3Rpb24ocil7cmV0dXJuIHNmKHIsMjMsNCl9LGJmPWZ1bmN0aW9uKHIpe3JldHVybiBzZihyLDUyLDgpfSxwZj1mdW5jdGlvbihyLHQpe1d1KHIucHJvdG90eXBlLHQse2dldDpmdW5jdGlvbigpe3JldHVybiBYdSh0aGlzKVt0XX19KX0sZ2Y9ZnVuY3Rpb24ocix0LG4sZSl7dmFyIGk9R3Uobiksbz1YdShyKTtpZihpK3Q+by5ieXRlTGVuZ3RoKXRocm93IGZmKCJXcm9uZyBpbmRleCIpO3ZhciB1PVh1KG8uYnVmZmVyKS4kLGY9aStvLmJ5dGVPZmZzZXQsYT1IdSh1LGYsZit0KTtyZXR1cm4gZT9hOmNmKGEpfSxtZj1mdW5jdGlvbihyLHQsbixlLGksbyl7dmFyIHU9R3UobiksZj1YdShyKTtpZih1K3Q+Zi5ieXRlTGVuZ3RoKXRocm93IGZmKCJXcm9uZyBpbmRleCIpO2Zvcih2YXIgYT1YdShmLmJ1ZmZlcikuJCxjPXUrZi5ieXRlT2Zmc2V0LHM9ZSgraSksdj0wO3Q+djt2KyspYVtjK3ZdPXNbbz92OnQtdi0xXX07aWYoTHUpe3ZhciBTZj1xdSYmIkFycmF5QnVmZmVyIiE9PVp1Lm5hbWU7aWYoQ3UoKGZ1bmN0aW9uKCl7WnUoMSl9KSkmJkN1KChmdW5jdGlvbigpe25ldyBadSgtMSl9KSkmJiFDdSgoZnVuY3Rpb24oKXtyZXR1cm4gbmV3IFp1LG5ldyBadSgxLjUpLG5ldyBadShOYU4pLFNmJiYhSnV9KSkpU2YmJkp1JiZSdShadSwibmFtZSIsIkFycmF5QnVmZmVyIik7ZWxzZXsocmY9ZnVuY3Rpb24ocil7cmV0dXJuIEZ1KHRoaXMsdGYpLG5ldyBadShHdShyKSl9KS5wcm90b3R5cGU9dGY7Zm9yKHZhciBBZixqZj16dShadSksT2Y9MDtqZi5sZW5ndGg+T2Y7KShBZj1qZltPZisrXSlpbiByZnx8UnUocmYsQWYsWnVbQWZdKTt0Zi5jb25zdHJ1Y3Rvcj1yZn1WdSYmWXUoZWYpIT09b2YmJlZ1KGVmLG9mKTt2YXIga2Y9bmV3IG5mKG5ldyByZigyKSksRWY9SXUoZWYuc2V0SW50OCk7a2Yuc2V0SW50OCgwLDIxNDc0ODM2NDgpLGtmLnNldEludDgoMSwyMTQ3NDgzNjQ5KSwha2YuZ2V0SW50OCgwKSYma2YuZ2V0SW50OCgxKXx8TnUoZWYse3NldEludDg6ZnVuY3Rpb24ocix0KXtFZih0aGlzLHIsdDw8MjQ+PjI0KX0sc2V0VWludDg6ZnVuY3Rpb24ocix0KXtFZih0aGlzLHIsdDw8MjQ+PjI0KX19LHtMOiEwfSl9ZWxzZSB0Zj0ocmY9ZnVuY3Rpb24ocil7RnUodGhpcyx0Zik7dmFyIHQ9R3Uocik7UXUodGhpcyx7JDphZih1Zih0KSwwKSxieXRlTGVuZ3RoOnR9KSxfdXx8KHRoaXMuYnl0ZUxlbmd0aD10KX0pLnByb3RvdHlwZSxlZj0obmY9ZnVuY3Rpb24ocix0LG4pe0Z1KHRoaXMsZWYpLEZ1KHIsdGYpO3ZhciBlPVh1KHIpLmJ5dGVMZW5ndGgsaT1CdSh0KTtpZigwPml8fGk+ZSl0aHJvdyBmZigiV3Jvbmcgb2Zmc2V0Iik7aWYoaSsobj12b2lkIDA9PT1uP2UtaTpEdShuKSk+ZSl0aHJvdyBmZigiV3JvbmcgbGVuZ3RoIik7UXUodGhpcyx7YnVmZmVyOnIsYnl0ZUxlbmd0aDpuLGJ5dGVPZmZzZXQ6aX0pLF91fHwodGhpcy5idWZmZXI9cix0aGlzLmJ5dGVMZW5ndGg9bix0aGlzLmJ5dGVPZmZzZXQ9aSl9KS5wcm90b3R5cGUsX3UmJihwZihyZiwiYnl0ZUxlbmd0aCIpLHBmKG5mLCJidWZmZXIiKSxwZihuZiwiYnl0ZUxlbmd0aCIpLHBmKG5mLCJieXRlT2Zmc2V0IikpLE51KGVmLHtnZXRJbnQ4OmZ1bmN0aW9uKHIpe3JldHVybiBnZih0aGlzLDEscilbMF08PDI0Pj4yNH0sZ2V0VWludDg6ZnVuY3Rpb24ocil7cmV0dXJuIGdmKHRoaXMsMSxyKVswXX0sZ2V0SW50MTY6ZnVuY3Rpb24ocil7dmFyIHQ9Z2YodGhpcywyLHIsYXJndW1lbnRzLmxlbmd0aD4xP2FyZ3VtZW50c1sxXTp2b2lkIDApO3JldHVybih0WzFdPDw4fHRbMF0pPDwxNj4+MTZ9LGdldFVpbnQxNjpmdW5jdGlvbihyKXt2YXIgdD1nZih0aGlzLDIscixhcmd1bWVudHMubGVuZ3RoPjE/YXJndW1lbnRzWzFdOnZvaWQgMCk7cmV0dXJuIHRbMV08PDh8dFswXX0sZ2V0SW50MzI6ZnVuY3Rpb24ocil7cmV0dXJuIHlmKGdmKHRoaXMsNCxyLGFyZ3VtZW50cy5sZW5ndGg+MT9hcmd1bWVudHNbMV06dm9pZCAwKSl9LGdldFVpbnQzMjpmdW5jdGlvbihyKXtyZXR1cm4geWYoZ2YodGhpcyw0LHIsYXJndW1lbnRzLmxlbmd0aD4xP2FyZ3VtZW50c1sxXTp2b2lkIDApKT4+PjB9LGdldEZsb2F0MzI6ZnVuY3Rpb24ocil7cmV0dXJuIHZmKGdmKHRoaXMsNCxyLGFyZ3VtZW50cy5sZW5ndGg+MT9hcmd1bWVudHNbMV06dm9pZCAwKSwyMyl9LGdldEZsb2F0NjQ6ZnVuY3Rpb24ocil7cmV0dXJuIHZmKGdmKHRoaXMsOCxyLGFyZ3VtZW50cy5sZW5ndGg+MT9hcmd1bWVudHNbMV06dm9pZCAwKSw1Mil9LHNldEludDg6ZnVuY3Rpb24ocix0KXttZih0aGlzLDEscixoZix0KX0sc2V0VWludDg6ZnVuY3Rpb24ocix0KXttZih0aGlzLDEscixoZix0KX0sc2V0SW50MTY6ZnVuY3Rpb24ocix0KXttZih0aGlzLDIscixsZix0LGFyZ3VtZW50cy5sZW5ndGg+Mj9hcmd1bWVudHNbMl06dm9pZCAwKX0sc2V0VWludDE2OmZ1bmN0aW9uKHIsdCl7bWYodGhpcywyLHIsbGYsdCxhcmd1bWVudHMubGVuZ3RoPjI/YXJndW1lbnRzWzJdOnZvaWQgMCl9LHNldEludDMyOmZ1bmN0aW9uKHIsdCl7bWYodGhpcyw0LHIsZGYsdCxhcmd1bWVudHMubGVuZ3RoPjI/YXJndW1lbnRzWzJdOnZvaWQgMCl9LHNldFVpbnQzMjpmdW5jdGlvbihyLHQpe21mKHRoaXMsNCxyLGRmLHQsYXJndW1lbnRzLmxlbmd0aD4yP2FyZ3VtZW50c1syXTp2b2lkIDApfSxzZXRGbG9hdDMyOmZ1bmN0aW9uKHIsdCl7bWYodGhpcyw0LHIsd2YsdCxhcmd1bWVudHMubGVuZ3RoPjI/YXJndW1lbnRzWzJdOnZvaWQgMCl9LHNldEZsb2F0NjQ6ZnVuY3Rpb24ocix0KXttZih0aGlzLDgscixiZix0LGFyZ3VtZW50cy5sZW5ndGg+Mj9hcmd1bWVudHNbMl06dm9pZCAwKX19KTtLdShyZiwiQXJyYXlCdWZmZXIiKSxLdShuZiwiRGF0YVZpZXciKTt2YXIgVGY9e0FycmF5QnVmZmVyOnJmLERhdGFWaWV3Om5mfSx4Zj1TLFVmPWksTWY9TixJZj1xZSxfZj1IdCxMZj1mdW5jdGlvbigpe30sUGY9W10sUmY9WSgiUmVmbGVjdCIsImNvbnN0cnVjdCIpLE5mPS9eXHMqKD86Y2xhc3N8ZnVuY3Rpb24pXGIvLENmPXhmKE5mLmV4ZWMpLEZmPSFOZi5leGVjKExmKSxCZj1mdW5jdGlvbihyKXtpZighTWYocikpcmV0dXJuITE7dHJ5e3JldHVybiBSZihMZixQZixyKSwhMH1jYXRjaChyKXtyZXR1cm4hMX19LERmPWZ1bmN0aW9uKHIpe2lmKCFNZihyKSlyZXR1cm4hMTtzd2l0Y2goSWYocikpe2Nhc2UiQXN5bmNGdW5jdGlvbiI6Y2FzZSJHZW5lcmF0b3JGdW5jdGlvbiI6Y2FzZSJBc3luY0dlbmVyYXRvckZ1bmN0aW9uIjpyZXR1cm4hMX10cnl7cmV0dXJuIEZmfHwhIUNmKE5mLF9mKHIpKX1jYXRjaChyKXtyZXR1cm4hMH19O0RmLmg9ITA7dmFyIEdmPSFSZnx8VWYoKGZ1bmN0aW9uKCl7dmFyIHI7cmV0dXJuIEJmKEJmLmNhbGwpfHwhQmYoT2JqZWN0KXx8IUJmKChmdW5jdGlvbigpe3I9ITB9KSl8fHJ9KSk/RGY6QmYsWWY9R2YsVmY9ZnIsemY9VHlwZUVycm9yLFdmPWZ1bmN0aW9uKHIpe2lmKFlmKHIpKXJldHVybiByO3Rocm93IHpmKFZmKHIpKyIgaXMgbm90IGEgY29uc3RydWN0b3IiKX0sJGY9anQsSGY9V2YsS2Y9JHIoInNwZWNpZXMiKSxxZj1mdW5jdGlvbihyLHQpe3ZhciBuLGU9JGYocikuY29uc3RydWN0b3I7cmV0dXJuIHZvaWQgMD09PWV8fG51bGw9PShuPSRmKGUpW0tmXSk/dDpIZihuKX0sSmY9QmUsWGY9UyxRZj1pLFpmPWp0LHJhPVduLHRhPUtuLG5hPXFmLGVhPVRmLkFycmF5QnVmZmVyLGlhPVRmLkRhdGFWaWV3LG9hPWlhLnByb3RvdHlwZSx1YT1YZihlYS5wcm90b3R5cGUuc2xpY2UpLGZhPVhmKG9hLmdldFVpbnQ4KSxhYT1YZihvYS5zZXRVaW50OCk7SmYoe3RhcmdldDoiQXJyYXlCdWZmZXIiLEQ6ITAsTDohMCxGOlFmKChmdW5jdGlvbigpe3JldHVybiFuZXcgZWEoMikuc2xpY2UoMSx2b2lkIDApLmJ5dGVMZW5ndGh9KSl9LHtzbGljZTpmdW5jdGlvbihyLHQpe2lmKHVhJiZ2b2lkIDA9PT10KXJldHVybiB1YShaZih0aGlzKSxyKTtmb3IodmFyIG49WmYodGhpcykuYnl0ZUxlbmd0aCxlPXJhKHIsbiksaT1yYSh2b2lkIDA9PT10P246dCxuKSxvPW5ldyhuYSh0aGlzLGVhKSkodGEoaS1lKSksdT1uZXcgaWEodGhpcyksZj1uZXcgaWEobyksYT0wO2k+ZTspYWEoZixhKyssZmEodSxlKyspKTtyZXR1cm4gb319KTt2YXIgY2E9cWU7WWV8fE5uKE9iamVjdC5wcm90b3R5cGUsInRvU3RyaW5nIixZZT97fS50b1N0cmluZzpmdW5jdGlvbigpe3JldHVybiJbb2JqZWN0ICIrY2EodGhpcykrIl0ifSx7TDohMH0pO3ZhciBzYT17ZXhwb3J0czp7fX0sdmE9JHIoIml0ZXJhdG9yIiksaGE9ITE7dHJ5e3ZhciBsYT0wLGRhPXtuZXh0OmZ1bmN0aW9uKCl7cmV0dXJue2RvbmU6ISFsYSsrfX0sSDpmdW5jdGlvbigpe2hhPSEwfX07ZGFbdmFdPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXN9LEFycmF5LmZyb20oZGEsKGZ1bmN0aW9uKCl7dGhyb3cgMn0pKX1jYXRjaChyKXt9dmFyIHlhLHdhLGJhLHBhPWZ1bmN0aW9uKHIsdCl7aWYoIXQmJiFoYSlyZXR1cm4hMTt2YXIgbj0hMTt0cnl7dmFyIGU9e307ZVt2YV09ZnVuY3Rpb24oKXtyZXR1cm57bmV4dDpmdW5jdGlvbigpe3JldHVybntkb25lOm49ITB9fX19LHIoZSl9Y2F0Y2gocil7fXJldHVybiBufSxnYT1udSxtYT1vLFNhPW4sQWE9TixqYT1GLE9hPU1yLGthPXFlLEVhPWZyLFRhPVB0LHhhPU5uLFVhPXB0LmYsTWE9VixJYT1lbyxfYT14byxMYT0kcixQYT1ScixSYT1TYS5JbnQ4QXJyYXksTmE9UmEmJlJhLnByb3RvdHlwZSxDYT1TYS5VaW50OENsYW1wZWRBcnJheSxGYT1DYSYmQ2EucHJvdG90eXBlLEJhPVJhJiZJYShSYSksRGE9TmEmJklhKE5hKSxHYT1PYmplY3QucHJvdG90eXBlLFlhPVNhLlR5cGVFcnJvcixWYT1MYSgidG9TdHJpbmdUYWciKSx6YT1QYSgiVFlQRURfQVJSQVlfVEFHIiksV2E9UGEoIlRZUEVEX0FSUkFZX0NPTlNUUlVDVE9SIiksJGE9Z2EmJiEhX2EmJiJPcGVyYSIhPT1rYShTYS5vcGVyYSksSGE9ITEsS2E9e0ludDhBcnJheToxLFVpbnQ4QXJyYXk6MSxVaW50OENsYW1wZWRBcnJheToxLEludDE2QXJyYXk6MixVaW50MTZBcnJheToyLEludDMyQXJyYXk6NCxVaW50MzJBcnJheTo0LEZsb2F0MzJBcnJheTo0LEZsb2F0NjRBcnJheTo4fSxxYT17QmlnSW50NjRBcnJheTo4LEJpZ1VpbnQ2NEFycmF5Ojh9LEphPWZ1bmN0aW9uKHIpe2lmKCFqYShyKSlyZXR1cm4hMTt2YXIgdD1rYShyKTtyZXR1cm4gT2EoS2EsdCl8fE9hKHFhLHQpfTtmb3IoeWEgaW4gS2EpKGJhPSh3YT1TYVt5YV0pJiZ3YS5wcm90b3R5cGUpP1RhKGJhLFdhLHdhKTokYT0hMTtmb3IoeWEgaW4gcWEpKGJhPSh3YT1TYVt5YV0pJiZ3YS5wcm90b3R5cGUpJiZUYShiYSxXYSx3YSk7aWYoKCEkYXx8IUFhKEJhKXx8QmE9PT1GdW5jdGlvbi5wcm90b3R5cGUpJiYoQmE9ZnVuY3Rpb24oKXt0aHJvdyBZYSgiSW5jb3JyZWN0IGludm9jYXRpb24iKX0sJGEpKWZvcih5YSBpbiBLYSlTYVt5YV0mJl9hKFNhW3lhXSxCYSk7aWYoKCEkYXx8IURhfHxEYT09PUdhKSYmKERhPUJhLnByb3RvdHlwZSwkYSkpZm9yKHlhIGluIEthKVNhW3lhXSYmX2EoU2FbeWFdLnByb3RvdHlwZSxEYSk7aWYoJGEmJklhKEZhKSE9PURhJiZfYShGYSxEYSksbWEmJiFPYShEYSxWYSkpZm9yKHlhIGluIEhhPSEwLFVhKERhLFZhLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gamEodGhpcyk/dGhpc1t6YV06dm9pZCAwfX0pLEthKVNhW3lhXSYmVGEoU2FbeWFdLHphLHlhKTt2YXIgWGE9e0s6JGEscTpXYSxKOkhhJiZ6YSxYOmZ1bmN0aW9uKHIpe2lmKEphKHIpKXJldHVybiByO3Rocm93IFlhKCJUYXJnZXQgaXMgbm90IGEgdHlwZWQgYXJyYXkiKX0sWjpmdW5jdGlvbihyKXtpZihBYShyKSYmKCFfYXx8TWEoQmEscikpKXJldHVybiByO3Rocm93IFlhKEVhKHIpKyIgaXMgbm90IGEgdHlwZWQgYXJyYXkgY29uc3RydWN0b3IiKX0scnI6ZnVuY3Rpb24ocix0LG4sZSl7aWYobWEpe2lmKG4pZm9yKHZhciBpIGluIEthKXt2YXIgbz1TYVtpXTtpZihvJiZPYShvLnByb3RvdHlwZSxyKSl0cnl7ZGVsZXRlIG8ucHJvdG90eXBlW3JdfWNhdGNoKG4pe3RyeXtvLnByb3RvdHlwZVtyXT10fWNhdGNoKHIpe319fURhW3JdJiYhbnx8eGEoRGEscixuP3Q6JGEmJk5hW3JdfHx0LGUpfX0sdHI6ZnVuY3Rpb24ocix0LG4pe3ZhciBlLGk7aWYobWEpe2lmKF9hKXtpZihuKWZvcihlIGluIEthKWlmKChpPVNhW2VdKSYmT2EoaSxyKSl0cnl7ZGVsZXRlIGlbcl19Y2F0Y2gocil7fWlmKEJhW3JdJiYhbilyZXR1cm47dHJ5e3JldHVybiB4YShCYSxyLG4/dDokYSYmQmFbcl18fHQpfWNhdGNoKHIpe319Zm9yKGUgaW4gS2EpIShpPVNhW2VdKXx8aVtyXSYmIW58fHhhKGkscix0KX19LGlzVmlldzpmdW5jdGlvbihyKXtpZighamEocikpcmV0dXJuITE7dmFyIHQ9a2Eocik7cmV0dXJuIkRhdGFWaWV3Ij09PXR8fE9hKEthLHQpfHxPYShxYSx0KX0sbnI6SmEsZXI6QmEsaXI6RGF9LFFhPW4sWmE9aSxyYz1wYSx0Yz1YYS5LLG5jPVFhLkFycmF5QnVmZmVyLGVjPVFhLkludDhBcnJheSxpYz0hdGN8fCFaYSgoZnVuY3Rpb24oKXtlYygxKX0pKXx8IVphKChmdW5jdGlvbigpe25ldyBlYygtMSl9KSl8fCFyYygoZnVuY3Rpb24ocil7bmV3IGVjLG5ldyBlYyhudWxsKSxuZXcgZWMoMS41KSxuZXcgZWMocil9KSwhMCl8fFphKChmdW5jdGlvbigpe3JldHVybiAxIT09bmV3IGVjKG5ldyBuYygyKSwxLHZvaWQgMCkubGVuZ3RofSkpLG9jPUYsdWM9TWF0aC5mbG9vcixmYz1OdW1iZXIuaXNJbnRlZ2VyfHxmdW5jdGlvbihyKXtyZXR1cm4hb2MocikmJmlzRmluaXRlKHIpJiZ1YyhyKT09PXJ9LGFjPUduLGNjPVJhbmdlRXJyb3Isc2M9UmFuZ2VFcnJvcix2Yz1mdW5jdGlvbihyLHQpe3ZhciBuPWZ1bmN0aW9uKHIpe3ZhciB0PWFjKHIpO2lmKDA+dCl0aHJvdyBjYygiVGhlIGFyZ3VtZW50IGNhbid0IGJlIGxlc3MgdGhhbiAwIik7cmV0dXJuIHR9KHIpO2lmKG4ldCl0aHJvdyBzYygiV3Jvbmcgb2Zmc2V0Iik7cmV0dXJuIG59LGhjPXZyLGxjPXUsZGM9UyhTLmJpbmQpLHljPWZ1bmN0aW9uKHIsdCl7cmV0dXJuIGhjKHIpLHZvaWQgMD09PXQ/cjpsYz9kYyhyLHQpOmZ1bmN0aW9uKCl7cmV0dXJuIHIuYXBwbHkodCxhcmd1bWVudHMpfX0sd2M9cWUsYmM9bHIscGM9S2ksZ2M9JHIoIml0ZXJhdG9yIiksbWM9ZnVuY3Rpb24ocil7aWYobnVsbCE9cilyZXR1cm4gYmMocixnYyl8fGJjKHIsIkBAaXRlcmF0b3IiKXx8cGNbd2MocildfSxTYz1hLEFjPXZyLGpjPWp0LE9jPWZyLGtjPW1jLEVjPVR5cGVFcnJvcixUYz1mdW5jdGlvbihyLHQpe3ZhciBuPTI+YXJndW1lbnRzLmxlbmd0aD9rYyhyKTp0O2lmKEFjKG4pKXJldHVybiBqYyhTYyhuLHIpKTt0aHJvdyBFYyhPYyhyKSsiIGlzIG5vdCBpdGVyYWJsZSIpfSx4Yz1LaSxVYz0kcigiaXRlcmF0b3IiKSxNYz1BcnJheS5wcm90b3R5cGUsSWM9ZnVuY3Rpb24ocil7cmV0dXJuIHZvaWQgMCE9PXImJih4Yy5BcnJheT09PXJ8fE1jW1VjXT09PXIpfSxfYz15YyxMYz1hLFBjPVdmLFJjPVRyLE5jPUpuLENjPVRjLEZjPW1jLEJjPUljLERjPVhhLlosR2M9ayxZYz1BcnJheS5pc0FycmF5fHxmdW5jdGlvbihyKXtyZXR1cm4iQXJyYXkiPT1HYyhyKX0sVmM9WWMsemM9R2YsV2M9RiwkYz0kcigic3BlY2llcyIpLEhjPUFycmF5LEtjPWZ1bmN0aW9uKHIsdCl7cmV0dXJuIG5ldyhmdW5jdGlvbihyKXt2YXIgdDtyZXR1cm4gVmMocikmJih0PXIuY29uc3RydWN0b3IsKHpjKHQpJiYodD09PUhjfHxWYyh0LnByb3RvdHlwZSkpfHxXYyh0KSYmbnVsbD09PSh0PXRbJGNdKSkmJih0PXZvaWQgMCkpLHZvaWQgMD09PXQ/SGM6dH0ocikpKDA9PT10PzA6dCl9LHFjPXljLEpjPU0sWGM9VHIsUWM9Sm4sWmM9S2MscnM9UyhbXS5wdXNoKSx0cz1mdW5jdGlvbihyKXt2YXIgdD0xPT1yLG49Mj09cixlPTM9PXIsaT00PT1yLG89Nj09cix1PTc9PXIsZj01PT1yfHxvO3JldHVybiBmdW5jdGlvbihhLGMscyx2KXtmb3IodmFyIGgsbCxkPVhjKGEpLHk9SmMoZCksdz1xYyhjLHMpLGI9UWMoeSkscD0wLGc9dnx8WmMsbT10P2coYSxiKTpufHx1P2coYSwwKTp2b2lkIDA7Yj5wO3ArKylpZigoZnx8cCBpbiB5KSYmKGw9dyhoPXlbcF0scCxkKSxyKSlpZih0KW1bcF09bDtlbHNlIGlmKGwpc3dpdGNoKHIpe2Nhc2UgMzpyZXR1cm4hMDtjYXNlIDU6cmV0dXJuIGg7Y2FzZSA2OnJldHVybiBwO2Nhc2UgMjpycyhtLGgpfWVsc2Ugc3dpdGNoKHIpe2Nhc2UgNDpyZXR1cm4hMTtjYXNlIDc6cnMobSxoKX1yZXR1cm4gbz8tMTplfHxpP2k6bX19LG5zPXtmb3JFYWNoOnRzKDApLG1hcDp0cygxKSxmaWx0ZXI6dHMoMiksc29tZTp0cygzKSxldmVyeTp0cyg0KSxmaW5kOnRzKDUpLGZpbmRJbmRleDp0cyg2KSx1cjp0cyg3KX0sZXM9WSxpcz1wdCxvcz1vLHVzPSRyKCJzcGVjaWVzIiksZnM9ZnVuY3Rpb24ocil7dmFyIHQ9ZXMociksbj1pcy5mO29zJiZ0JiYhdFt1c10mJm4odCx1cyx7aTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpc319KX0sYXM9Tixjcz1GLHNzPXhvLHZzPUJlLGhzPW4sbHM9YSxkcz1vLHlzPWljLHdzPVhhLGJzPVRmLHBzPXV1LGdzPXksbXM9UHQsU3M9ZmMsQXM9S24sanM9c3UsT3M9dmMsa3M9bnQsRXM9TXIsVHM9cWUseHM9RixVcz1vcixNcz1GaSxJcz1WLF9zPXhvLExzPUNuLmYsUHM9ZnVuY3Rpb24ocil7dmFyIHQsbixlLGksbyx1LGY9UGModGhpcyksYT1SYyhyKSxjPWFyZ3VtZW50cy5sZW5ndGgscz1jPjE/YXJndW1lbnRzWzFdOnZvaWQgMCx2PXZvaWQgMCE9PXMsaD1GYyhhKTtpZihoJiYhQmMoaCkpZm9yKHU9KG89Q2MoYSxoKSkubmV4dCxhPVtdOyEoaT1MYyh1LG8pKS5kb25lOylhLnB1c2goaS52YWx1ZSk7Zm9yKHYmJmM+MiYmKHM9X2Mocyxhcmd1bWVudHNbMl0pKSxuPU5jKGEpLGU9bmV3KERjKGYpKShuKSx0PTA7bj50O3QrKyllW3RdPXY/cyhhW3RdLHQpOmFbdF07cmV0dXJuIGV9LFJzPW5zLmZvckVhY2gsTnM9ZnMsQ3M9cHQsRnM9ZSxCcz1tbi5nZXQsRHM9bW4uc2V0LEdzPUNzLmYsWXM9RnMuZixWcz1NYXRoLnJvdW5kLHpzPWhzLlJhbmdlRXJyb3IsV3M9YnMuQXJyYXlCdWZmZXIsJHM9V3MucHJvdG90eXBlLEhzPWJzLkRhdGFWaWV3LEtzPXdzLksscXM9d3MucSxKcz13cy5KLFhzPXdzLmVyLFFzPXdzLmlyLFpzPXdzLloscnY9d3MubnIsdHY9ZnVuY3Rpb24ocix0KXtacyhyKTtmb3IodmFyIG49MCxlPXQubGVuZ3RoLGk9bmV3IHIoZSk7ZT5uOylpW25dPXRbbisrXTtyZXR1cm4gaX0sbnY9ZnVuY3Rpb24ocix0KXtHcyhyLHQse2dldDpmdW5jdGlvbigpe3JldHVybiBCcyh0aGlzKVt0XX19KX0sZXY9ZnVuY3Rpb24ocil7dmFyIHQ7cmV0dXJuIElzKCRzLHIpfHwiQXJyYXlCdWZmZXIiPT0odD1UcyhyKSl8fCJTaGFyZWRBcnJheUJ1ZmZlciI9PXR9LGl2PWZ1bmN0aW9uKHIsdCl7cmV0dXJuIHJ2KHIpJiYhVXModCkmJnQgaW4gciYmU3MoK3QpJiZ0Pj0wfSxvdj1mdW5jdGlvbihyLHQpe3JldHVybiB0PWtzKHQpLGl2KHIsdCk/Z3MoMixyW3RdKTpZcyhyLHQpfSx1dj1mdW5jdGlvbihyLHQsbil7cmV0dXJuIHQ9a3ModCksIShpdihyLHQpJiZ4cyhuKSYmRXMobiwidmFsdWUiKSl8fEVzKG4sImdldCIpfHxFcyhuLCJzZXQiKXx8bi5pfHxFcyhuLCJ3cml0YWJsZSIpJiYhbi53cml0YWJsZXx8RXMobiwiZW51bWVyYWJsZSIpJiYhbi50P0dzKHIsdCxuKTooclt0XT1uLnZhbHVlLHIpfTtkcz8oS3N8fChGcy5mPW92LENzLmY9dXYsbnYoUXMsImJ1ZmZlciIpLG52KFFzLCJieXRlT2Zmc2V0IiksbnYoUXMsImJ5dGVMZW5ndGgiKSxudihRcywibGVuZ3RoIikpLHZzKHt0YXJnZXQ6Ik9iamVjdCIsTjohMCxGOiFLc30se2dldE93blByb3BlcnR5RGVzY3JpcHRvcjpvdixkZWZpbmVQcm9wZXJ0eTp1dn0pLHNhLmV4cG9ydHM9ZnVuY3Rpb24ocix0LG4pe3ZhciBlPXIubWF0Y2goL1xkKyQvKVswXS84LGk9cisobj8iQ2xhbXBlZCI6IiIpKyJBcnJheSIsbz0iZ2V0IityLHU9InNldCIrcixmPWhzW2ldLGE9ZixjPWEmJmEucHJvdG90eXBlLHM9e30sdj1mdW5jdGlvbihyLHQpe0dzKHIsdCx7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGZ1bmN0aW9uKHIsdCl7dmFyIG49QnMocik7cmV0dXJuIG4udmlld1tvXSh0KmUrbi5ieXRlT2Zmc2V0LCEwKX0odGhpcyx0KX0sc2V0OmZ1bmN0aW9uKHIpe3JldHVybiBmdW5jdGlvbihyLHQsaSl7dmFyIG89QnMocik7biYmKGk9MD4oaT1WcyhpKSk/MDppPjI1NT8yNTU6MjU1JmkpLG8udmlld1t1XSh0KmUrby5ieXRlT2Zmc2V0LGksITApfSh0aGlzLHQscil9LHQ6ITB9KX07S3M/eXMmJihhPXQoKGZ1bmN0aW9uKHIsdCxuLGkpe3JldHVybiBwcyhyLGMpLGZ1bmN0aW9uKHIsdCxuKXt2YXIgZSxpO3JldHVybiBzcyYmYXMoZT10LmNvbnN0cnVjdG9yKSYmZSE9PW4mJmNzKGk9ZS5wcm90b3R5cGUpJiZpIT09bi5wcm90b3R5cGUmJnNzKHIsaSkscn0oeHModCk/ZXYodCk/dm9pZCAwIT09aT9uZXcgZih0LE9zKG4sZSksaSk6dm9pZCAwIT09bj9uZXcgZih0LE9zKG4sZSkpOm5ldyBmKHQpOnJ2KHQpP3R2KGEsdCk6bHMoUHMsYSx0KTpuZXcgZihqcyh0KSkscixhKX0pKSxfcyYmX3MoYSxYcyksUnMoTHMoZiksKGZ1bmN0aW9uKHIpe3IgaW4gYXx8bXMoYSxyLGZbcl0pfSkpLGEucHJvdG90eXBlPWMpOihhPXQoKGZ1bmN0aW9uKHIsdCxuLGkpe3BzKHIsYyk7dmFyIG8sdSxmLHM9MCxoPTA7aWYoeHModCkpe2lmKCFldih0KSlyZXR1cm4gcnYodCk/dHYoYSx0KTpscyhQcyxhLHQpO289dCxoPU9zKG4sZSk7dmFyIGw9dC5ieXRlTGVuZ3RoO2lmKHZvaWQgMD09PWkpe2lmKGwlZSl0aHJvdyB6cygiV3JvbmcgbGVuZ3RoIik7aWYoMD4odT1sLWgpKXRocm93IHpzKCJXcm9uZyBsZW5ndGgiKX1lbHNlIGlmKCh1PUFzKGkpKmUpK2g+bCl0aHJvdyB6cygiV3JvbmcgbGVuZ3RoIik7Zj11L2V9ZWxzZSBmPWpzKHQpLG89bmV3IFdzKHU9ZiplKTtmb3IoRHMocix7YnVmZmVyOm8sYnl0ZU9mZnNldDpoLGJ5dGVMZW5ndGg6dSxsZW5ndGg6Zix2aWV3Om5ldyBIcyhvKX0pO2Y+czspdihyLHMrKyl9KSksX3MmJl9zKGEsWHMpLGM9YS5wcm90b3R5cGU9TXMoUXMpKSxjLmNvbnN0cnVjdG9yIT09YSYmbXMoYywiY29uc3RydWN0b3IiLGEpLG1zKGMscXMsYSksSnMmJm1zKGMsSnMsaSk7dmFyIGg9YSE9ZjtzW2ldPWEsdnMoe2dsb2JhbDohMCxjb25zdHJ1Y3RvcjohMCxGOmgsaDohS3N9LHMpLCJCWVRFU19QRVJfRUxFTUVOVCJpbiBhfHxtcyhhLCJCWVRFU19QRVJfRUxFTUVOVCIsZSksIkJZVEVTX1BFUl9FTEVNRU5UImluIGN8fG1zKGMsIkJZVEVTX1BFUl9FTEVNRU5UIixlKSxOcyhpKX0pOnNhLmV4cG9ydHM9ZnVuY3Rpb24oKXt9LCgwLHNhLmV4cG9ydHMpKCJVaW50OCIsKGZ1bmN0aW9uKHIpe3JldHVybiBmdW5jdGlvbih0LG4sZSl7cmV0dXJuIHIodGhpcyx0LG4sZSl9fSkpO3ZhciBmdj1mcixhdj1UeXBlRXJyb3IsY3Y9ZnVuY3Rpb24ocix0KXtpZighZGVsZXRlIHJbdF0pdGhyb3cgYXYoIkNhbm5vdCBkZWxldGUgcHJvcGVydHkgIitmdih0KSsiIG9mICIrZnYocikpfSxzdj1Ucix2dj1Xbixodj1Kbixsdj1jdixkdj1NYXRoLm1pbix5dj1YYSx3dj1TKFtdLmNvcHlXaXRoaW58fGZ1bmN0aW9uKHIsdCl7dmFyIG49c3YodGhpcyksZT1odihuKSxpPXZ2KHIsZSksbz12dih0LGUpLHU9YXJndW1lbnRzLmxlbmd0aD4yP2FyZ3VtZW50c1syXTp2b2lkIDAsZj1kdigodm9pZCAwPT09dT9lOnZ2KHUsZSkpLW8sZS1pKSxhPTE7Zm9yKGk+byYmbytmPmkmJihhPS0xLG8rPWYtMSxpKz1mLTEpO2YtLSA+MDspbyBpbiBuP25baV09bltvXTpsdihuLGkpLGkrPWEsbys9YTtyZXR1cm4gbn0pLGJ2PXl2Llg7KDAseXYucnIpKCJjb3B5V2l0aGluIiwoZnVuY3Rpb24ocix0KXtyZXR1cm4gd3YoYnYodGhpcykscix0LGFyZ3VtZW50cy5sZW5ndGg+Mj9hcmd1bWVudHNbMl06dm9pZCAwKX0pKTt2YXIgcHY9bnMuZXZlcnksZ3Y9WGEuWDsoMCxYYS5ycikoImV2ZXJ5IiwoZnVuY3Rpb24ocil7cmV0dXJuIHB2KGd2KHRoaXMpLHIsYXJndW1lbnRzLmxlbmd0aD4xP2FyZ3VtZW50c1sxXTp2b2lkIDApfSkpO3ZhciBtdj1acixTdj1UeXBlRXJyb3IsQXY9Z3UsanY9ZnVuY3Rpb24ocil7dmFyIHQ9bXYociwibnVtYmVyIik7aWYoIm51bWJlciI9PXR5cGVvZiB0KXRocm93IFN2KCJDYW4ndCBjb252ZXJ0IG51bWJlciB0byBiaWdpbnQiKTtyZXR1cm4gQmlnSW50KHQpfSxPdj1xZSxrdj1hLEV2PWksVHY9WGEuWCx4dj1YYS5ycixVdj1TKCIiLnNsaWNlKTt4digiZmlsbCIsKGZ1bmN0aW9uKHIpe3ZhciB0PWFyZ3VtZW50cy5sZW5ndGg7VHYodGhpcyk7dmFyIG49IkJpZyI9PT1VdihPdih0aGlzKSwwLDMpP2p2KHIpOityO3JldHVybiBrdihBdix0aGlzLG4sdD4xP2FyZ3VtZW50c1sxXTp2b2lkIDAsdD4yP2FyZ3VtZW50c1syXTp2b2lkIDApfSksRXYoKGZ1bmN0aW9uKCl7dmFyIHI9MDtyZXR1cm4gbmV3IEludDhBcnJheSgyKS5maWxsKHt2YWx1ZU9mOmZ1bmN0aW9uKCl7cmV0dXJuIHIrK319KSwxIT09cn0pKSk7dmFyIE12PUpuLEl2PXFmLF92PVhhLnEsTHY9WGEuWixQdj1mdW5jdGlvbihyKXtyZXR1cm4gTHYoSXYocixyW192XSkpfSxSdj1QdixOdj1ucy5maWx0ZXIsQ3Y9ZnVuY3Rpb24ocix0KXtyZXR1cm4gZnVuY3Rpb24ocix0KXtmb3IodmFyIG49MCxlPU12KHQpLGk9bmV3IHIoZSk7ZT5uOylpW25dPXRbbisrXTtyZXR1cm4gaX0oUnYociksdCl9LEZ2PVhhLlg7KDAsWGEucnIpKCJmaWx0ZXIiLChmdW5jdGlvbihyKXt2YXIgdD1OdihGdih0aGlzKSxyLGFyZ3VtZW50cy5sZW5ndGg+MT9hcmd1bWVudHNbMV06dm9pZCAwKTtyZXR1cm4gQ3YodGhpcyx0KX0pKTt2YXIgQnY9bnMuZmluZCxEdj1YYS5YOygwLFhhLnJyKSgiZmluZCIsKGZ1bmN0aW9uKHIpe3JldHVybiBCdihEdih0aGlzKSxyLGFyZ3VtZW50cy5sZW5ndGg+MT9hcmd1bWVudHNbMV06dm9pZCAwKX0pKTt2YXIgR3Y9bnMuZmluZEluZGV4LFl2PVhhLlg7KDAsWGEucnIpKCJmaW5kSW5kZXgiLChmdW5jdGlvbihyKXtyZXR1cm4gR3YoWXYodGhpcykscixhcmd1bWVudHMubGVuZ3RoPjE/YXJndW1lbnRzWzFdOnZvaWQgMCl9KSk7dmFyIFZ2PW5zLmZvckVhY2gsenY9WGEuWDsoMCxYYS5ycikoImZvckVhY2giLChmdW5jdGlvbihyKXtWdih6dih0aGlzKSxyLGFyZ3VtZW50cy5sZW5ndGg+MT9hcmd1bWVudHNbMV06dm9pZCAwKX0pKTt2YXIgV3Y9dGUuaW5jbHVkZXMsJHY9WGEuWDsoMCxYYS5ycikoImluY2x1ZGVzIiwoZnVuY3Rpb24ocil7cmV0dXJuIFd2KCR2KHRoaXMpLHIsYXJndW1lbnRzLmxlbmd0aD4xP2FyZ3VtZW50c1sxXTp2b2lkIDApfSkpO3ZhciBIdj10ZS5pbmRleE9mLEt2PVhhLlg7KDAsWGEucnIpKCJpbmRleE9mIiwoZnVuY3Rpb24ocil7cmV0dXJuIEh2KEt2KHRoaXMpLHIsYXJndW1lbnRzLmxlbmd0aD4xP2FyZ3VtZW50c1sxXTp2b2lkIDApfSkpO3ZhciBxdj1uLEp2PWksWHY9UyxRdj1YYSxadj1ydSxyaD0kcigiaXRlcmF0b3IiKSx0aD1xdi5VaW50OEFycmF5LG5oPVh2KFp2LnZhbHVlcyksZWg9WHYoWnYua2V5cyksaWg9WHYoWnYuZW50cmllcyksb2g9UXYuWCx1aD1Rdi5ycixmaD10aCYmdGgucHJvdG90eXBlLGFoPSFKdigoZnVuY3Rpb24oKXtmaFtyaF0uY2FsbChbMV0pfSkpLGNoPSEhZmgmJmZoLnZhbHVlcyYmZmhbcmhdPT09ZmgudmFsdWVzJiYidmFsdWVzIj09PWZoLnZhbHVlcy5uYW1lLHNoPWZ1bmN0aW9uKCl7cmV0dXJuIG5oKG9oKHRoaXMpKX07dWgoImVudHJpZXMiLChmdW5jdGlvbigpe3JldHVybiBpaChvaCh0aGlzKSl9KSxhaCksdWgoImtleXMiLChmdW5jdGlvbigpe3JldHVybiBlaChvaCh0aGlzKSl9KSxhaCksdWgoInZhbHVlcyIsc2gsYWh8fCFjaCx7bmFtZToidmFsdWVzIn0pLHVoKHJoLHNoLGFofHwhY2gse25hbWU6InZhbHVlcyJ9KTt2YXIgdmg9WGEuWCxoaD1YYS5ycixsaD1TKFtdLmpvaW4pO2hoKCJqb2luIiwoZnVuY3Rpb24ocil7cmV0dXJuIGxoKHZoKHRoaXMpLHIpfSkpO3ZhciBkaD11LHloPUZ1bmN0aW9uLnByb3RvdHlwZSx3aD15aC5hcHBseSxiaD15aC5jYWxsLHBoPSJvYmplY3QiPT10eXBlb2YgUmVmbGVjdCYmUmVmbGVjdC5hcHBseXx8KGRoP2JoLmJpbmQod2gpOmZ1bmN0aW9uKCl7cmV0dXJuIGJoLmFwcGx5KHdoLGFyZ3VtZW50cyl9KSxnaD1pLG1oPWZ1bmN0aW9uKHIsdCl7dmFyIG49W11bcl07cmV0dXJuISFuJiZnaCgoZnVuY3Rpb24oKXtuLmNhbGwobnVsbCx0fHxmdW5jdGlvbigpe3JldHVybiAxfSwxKX0pKX0sU2g9cGgsQWg9UixqaD1HbixPaD1KbixraD1NYXRoLm1pbixFaD1bXS5sYXN0SW5kZXhPZixUaD0hIUVoJiYhMSx4aD1taCgibGFzdEluZGV4T2YiKSxVaD1waCxNaD1UaHx8IXhoP2Z1bmN0aW9uKHIpe2lmKFRoKXJldHVybiBTaChFaCx0aGlzLGFyZ3VtZW50cyl8fDA7dmFyIHQ9QWgodGhpcyksbj1PaCh0KSxlPW4tMTtmb3IoYXJndW1lbnRzLmxlbmd0aD4xJiYoZT1raChlLGpoKGFyZ3VtZW50c1sxXSkpKSwwPmUmJihlPW4rZSk7ZT49MDtlLS0paWYoZSBpbiB0JiZ0W2VdPT09cilyZXR1cm4gZXx8MDtyZXR1cm4tMX06RWgsSWg9WGEuWDsoMCxYYS5ycikoImxhc3RJbmRleE9mIiwoZnVuY3Rpb24ocil7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aDtyZXR1cm4gVWgoTWgsSWgodGhpcyksdD4xP1tyLGFyZ3VtZW50c1sxXV06W3JdKX0pKTt2YXIgX2g9bnMubWFwLExoPVB2LFBoPVhhLlg7KDAsWGEucnIpKCJtYXAiLChmdW5jdGlvbihyKXtyZXR1cm4gX2goUGgodGhpcykscixhcmd1bWVudHMubGVuZ3RoPjE/YXJndW1lbnRzWzFdOnZvaWQgMCwoZnVuY3Rpb24ocix0KXtyZXR1cm4gbmV3KExoKHIpKSh0KX0pKX0pKTt2YXIgUmg9dnIsTmg9VHIsQ2g9TSxGaD1KbixCaD1UeXBlRXJyb3IsRGg9ZnVuY3Rpb24ocil7cmV0dXJuIGZ1bmN0aW9uKHQsbixlLGkpe1JoKG4pO3ZhciBvPU5oKHQpLHU9Q2gobyksZj1GaChvKSxhPXI/Zi0xOjAsYz1yPy0xOjE7aWYoMj5lKWZvcig7Oyl7aWYoYSBpbiB1KXtpPXVbYV0sYSs9YzticmVha31pZihhKz1jLHI/MD5hOmE+PWYpdGhyb3cgQmgoIlJlZHVjZSBvZiBlbXB0eSBhcnJheSB3aXRoIG5vIGluaXRpYWwgdmFsdWUiKX1mb3IoO3I/YT49MDpmPmE7YSs9YylhIGluIHUmJihpPW4oaSx1W2FdLGEsbykpO3JldHVybiBpfX0sR2g9e2xlZnQ6RGgoITEpLHJpZ2h0OkRoKCEwKX0sWWg9R2gubGVmdCxWaD1YYS5YOygwLFhhLnJyKSgicmVkdWNlIiwoZnVuY3Rpb24ocil7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aDtyZXR1cm4gWWgoVmgodGhpcykscix0LHQ+MT9hcmd1bWVudHNbMV06dm9pZCAwKX0pKTt2YXIgemg9R2gucmlnaHQsV2g9WGEuWDsoMCxYYS5ycikoInJlZHVjZVJpZ2h0IiwoZnVuY3Rpb24ocil7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aDtyZXR1cm4gemgoV2godGhpcykscix0LHQ+MT9hcmd1bWVudHNbMV06dm9pZCAwKX0pKTt2YXIgJGg9WGEuWCxIaD1NYXRoLmZsb29yOygwLFhhLnJyKSgicmV2ZXJzZSIsKGZ1bmN0aW9uKCl7Zm9yKHZhciByLHQ9dGhpcyxuPSRoKHQpLmxlbmd0aCxlPUhoKG4vMiksaT0wO2U+aTspcj10W2ldLHRbaSsrXT10Wy0tbl0sdFtuXT1yO3JldHVybiB0fSkpO3ZhciBLaD1uLHFoPWEsSmg9WGEsWGg9Sm4sUWg9dmMsWmg9VHIscmw9aSx0bD1LaC5SYW5nZUVycm9yLG5sPUtoLkludDhBcnJheSxlbD1ubCYmbmwucHJvdG90eXBlLGlsPWVsJiZlbC5zZXQsb2w9SmguWCx1bD1KaC5ycixmbD0hcmwoKGZ1bmN0aW9uKCl7dmFyIHI9bmV3IFVpbnQ4Q2xhbXBlZEFycmF5KDIpO3JldHVybiBxaChpbCxyLHtsZW5ndGg6MSwwOjN9LDEpLDMhPT1yWzFdfSkpLGFsPWZsJiZKaC5LJiZybCgoZnVuY3Rpb24oKXt2YXIgcj1uZXcgbmwoMik7cmV0dXJuIHIuc2V0KDEpLHIuc2V0KCIyIiwxKSwwIT09clswXXx8MiE9PXJbMV19KSk7dWwoInNldCIsKGZ1bmN0aW9uKHIpe29sKHRoaXMpO3ZhciB0PVFoKGFyZ3VtZW50cy5sZW5ndGg+MT9hcmd1bWVudHNbMV06dm9pZCAwLDEpLG49Wmgocik7aWYoZmwpcmV0dXJuIHFoKGlsLHRoaXMsbix0KTt2YXIgZT10aGlzLmxlbmd0aCxpPVhoKG4pLG89MDtpZihpK3Q+ZSl0aHJvdyB0bCgiV3JvbmcgbGVuZ3RoIik7Zm9yKDtpPm87KXRoaXNbdCtvXT1uW28rK119KSwhZmx8fGFsKTt2YXIgY2w9UyhbXS5zbGljZSksc2w9UHYsdmw9Y2wsaGw9WGEuWDsoMCxYYS5ycikoInNsaWNlIiwoZnVuY3Rpb24ocix0KXtmb3IodmFyIG49dmwoaGwodGhpcykscix0KSxlPXNsKHRoaXMpLGk9MCxvPW4ubGVuZ3RoLHU9bmV3IGUobyk7bz5pOyl1W2ldPW5baSsrXTtyZXR1cm4gdX0pLGkoKGZ1bmN0aW9uKCl7bmV3IEludDhBcnJheSgxKS5zbGljZSgpfSkpKTt2YXIgbGw9bnMuc29tZSxkbD1YYS5YOygwLFhhLnJyKSgic29tZSIsKGZ1bmN0aW9uKHIpe3JldHVybiBsbChkbCh0aGlzKSxyLGFyZ3VtZW50cy5sZW5ndGg+MT9hcmd1bWVudHNbMV06dm9pZCAwKX0pKTt2YXIgeWw9VXUsd2w9TWF0aC5mbG9vcixibD1mdW5jdGlvbihyLHQpe3ZhciBuPXIubGVuZ3RoLGU9d2wobi8yKTtyZXR1cm4gOD5uP3BsKHIsdCk6Z2wocixibCh5bChyLDAsZSksdCksYmwoeWwocixlKSx0KSx0KX0scGw9ZnVuY3Rpb24ocix0KXtmb3IodmFyIG4sZSxpPXIubGVuZ3RoLG89MTtpPm87KXtmb3IoZT1vLG49cltvXTtlJiZ0KHJbZS0xXSxuKT4wOylyW2VdPXJbLS1lXTtlIT09bysrJiYocltlXT1uKX1yZXR1cm4gcn0sZ2w9ZnVuY3Rpb24ocix0LG4sZSl7Zm9yKHZhciBpPXQubGVuZ3RoLG89bi5sZW5ndGgsdT0wLGY9MDtpPnV8fG8+Zjspclt1K2ZdPWk+dSYmbz5mP2UodFt1XSxuW2ZdKT4wP25bZisrXTp0W3UrK106aT51P3RbdSsrXTpuW2YrK107cmV0dXJuIHJ9LG1sPWJsLFNsPXoubWF0Y2goL2ZpcmVmb3hcLyhcZCspL2kpLEFsPSEhU2wmJitTbFsxXSxqbD0vTVNJRXxUcmlkZW50Ly50ZXN0KHopLE9sPXoubWF0Y2goL0FwcGxlV2ViS2l0XC8oXGQrKVwuLyksa2w9ISFPbCYmK09sWzFdLEVsPVMsVGw9aSx4bD12cixVbD1tbCxNbD1BbCxJbD1qbCxfbD1YLExsPWtsLFBsPVhhLlgsUmw9WGEucnIsTmw9bi5VaW50MTZBcnJheSxDbD1ObCYmRWwoTmwucHJvdG90eXBlLnNvcnQpLEZsPSEoIUNsfHxUbCgoZnVuY3Rpb24oKXtDbChuZXcgTmwoMiksbnVsbCl9KSkmJlRsKChmdW5jdGlvbigpe0NsKG5ldyBObCgyKSx7fSl9KSkpLEJsPSEhQ2wmJiFUbCgoZnVuY3Rpb24oKXtpZihfbClyZXR1cm4gNzQ+X2w7aWYoTWwpcmV0dXJuIDY3Pk1sO2lmKElsKXJldHVybiEwO2lmKExsKXJldHVybiA2MDI+TGw7dmFyIHIsdCxuPW5ldyBObCg1MTYpLGU9QXJyYXkoNTE2KTtmb3Iocj0wOzUxNj5yO3IrKyl0PXIlNCxuW3JdPTUxNS1yLGVbcl09ci0yKnQrMztmb3IoQ2wobiwoZnVuY3Rpb24ocix0KXtyZXR1cm4oci80fDApLSh0LzR8MCl9KSkscj0wOzUxNj5yO3IrKylpZihuW3JdIT09ZVtyXSlyZXR1cm4hMH0pKTtSbCgic29ydCIsKGZ1bmN0aW9uKHIpe3JldHVybiB2b2lkIDAhPT1yJiZ4bChyKSxCbD9DbCh0aGlzLHIpOlVsKFBsKHRoaXMpLGZ1bmN0aW9uKHIpe3JldHVybiBmdW5jdGlvbih0LG4pe3JldHVybiB2b2lkIDAhPT1yPytyKHQsbil8fDA6biE9bj8tMTp0IT10PzE6MD09PXQmJjA9PT1uPzEvdD4wJiYwPjEvbj8xOi0xOnQ+bn19KHIpKX0pLCFCbHx8RmwpO3ZhciBEbD1LbixHbD1XbixZbD1QdixWbD1YYS5YOygwLFhhLnJyKSgic3ViYXJyYXkiLChmdW5jdGlvbihyLHQpe3ZhciBuPVZsKHRoaXMpLGU9bi5sZW5ndGgsaT1HbChyLGUpO3JldHVybiBuZXcoWWwobikpKG4uYnVmZmVyLG4uYnl0ZU9mZnNldCtpKm4uQllURVNfUEVSX0VMRU1FTlQsRGwoKHZvaWQgMD09PXQ/ZTpHbCh0LGUpKS1pKSl9KSk7dmFyIHpsPXBoLFdsPVhhLCRsPWksSGw9Y2wsS2w9bi5JbnQ4QXJyYXkscWw9V2wuWCxKbD1XbC5ycixYbD1bXS50b0xvY2FsZVN0cmluZyxRbD0hIUtsJiYkbCgoZnVuY3Rpb24oKXtYbC5jYWxsKG5ldyBLbCgxKSl9KSk7SmwoInRvTG9jYWxlU3RyaW5nIiwoZnVuY3Rpb24oKXtyZXR1cm4gemwoWGwsUWw/SGwocWwodGhpcykpOnFsKHRoaXMpLEhsKGFyZ3VtZW50cykpfSksJGwoKGZ1bmN0aW9uKCl7cmV0dXJuWzEsMl0udG9Mb2NhbGVTdHJpbmcoKSE9bmV3IEtsKFsxLDJdKS50b0xvY2FsZVN0cmluZygpfSkpfHwhJGwoKGZ1bmN0aW9uKCl7S2wucHJvdG90eXBlLnRvTG9jYWxlU3RyaW5nLmNhbGwoWzEsMl0pfSkpKTt2YXIgWmw9WGEucnIscmQ9aSx0ZD1TLG5kPW4uVWludDhBcnJheSxlZD1uZCYmbmQucHJvdG90eXBlfHx7fSxpZD1bXS50b1N0cmluZyxvZD10ZChbXS5qb2luKTtyZCgoZnVuY3Rpb24oKXtpZC5jYWxsKHt9KX0pKSYmKGlkPWZ1bmN0aW9uKCl7cmV0dXJuIG9kKHRoaXMpfSk7dmFyIHVkPWVkLnRvU3RyaW5nIT1pZDtabCgidG9TdHJpbmciLGlkLHVkKTt2YXIgZmQsYWQsY2Qsc2QsdmQ9InByb2Nlc3MiPT1rKG4ucHJvY2VzcyksaGQ9VHlwZUVycm9yLGxkPS8oPzppcGFkfGlwaG9uZXxpcG9kKS4qYXBwbGV3ZWJraXQvaS50ZXN0KHopLGRkPW4seWQ9cGgsd2Q9eWMsYmQ9TixwZD1NcixnZD1pLG1kPUVpLFNkPWNsLEFkPXV0LGpkPWZ1bmN0aW9uKHIsdCl7aWYodD5yKXRocm93IGhkKCJOb3QgZW5vdWdoIGFyZ3VtZW50cyIpO3JldHVybiByfSxPZD1sZCxrZD12ZCxFZD1kZC5zZXRJbW1lZGlhdGUsVGQ9ZGQuY2xlYXJJbW1lZGlhdGUseGQ9ZGQucHJvY2VzcyxVZD1kZC5hcixNZD1kZC5GdW5jdGlvbixJZD1kZC5NZXNzYWdlQ2hhbm5lbCxfZD1kZC5TdHJpbmcsTGQ9MCxQZD17fTt0cnl7ZmQ9ZGQubG9jYXRpb259Y2F0Y2gocil7fXZhciBSZD1mdW5jdGlvbihyKXtpZihwZChQZCxyKSl7dmFyIHQ9UGRbcl07ZGVsZXRlIFBkW3JdLHQoKX19LE5kPWZ1bmN0aW9uKHIpe3JldHVybiBmdW5jdGlvbigpe1JkKHIpfX0sQ2Q9ZnVuY3Rpb24ocil7UmQoci5kYXRhKX0sRmQ9ZnVuY3Rpb24ocil7ZGQucG9zdE1lc3NhZ2UoX2QociksZmQucHJvdG9jb2wrIi8vIitmZC5ob3N0KX07RWQmJlRkfHwoRWQ9ZnVuY3Rpb24ocil7amQoYXJndW1lbnRzLmxlbmd0aCwxKTt2YXIgdD1iZChyKT9yOk1kKHIpLG49U2QoYXJndW1lbnRzLDEpO3JldHVybiBQZFsrK0xkXT1mdW5jdGlvbigpe3lkKHQsdm9pZCAwLG4pfSxhZChMZCksTGR9LFRkPWZ1bmN0aW9uKHIpe2RlbGV0ZSBQZFtyXX0sa2Q/YWQ9ZnVuY3Rpb24ocil7eGQuY3IoTmQocikpfTpVZCYmVWQubm93P2FkPWZ1bmN0aW9uKHIpe1VkLm5vdyhOZChyKSl9OklkJiYhT2Q/KHNkPShjZD1uZXcgSWQpLnBvcnQyLGNkLnBvcnQxLm9ubWVzc2FnZT1DZCxhZD13ZChzZC5wb3N0TWVzc2FnZSxzZCkpOmRkLmFkZEV2ZW50TGlzdGVuZXImJmJkKGRkLnBvc3RNZXNzYWdlKSYmIWRkLnNyJiZmZCYmImZpbGU6IiE9PWZkLnByb3RvY29sJiYhZ2QoRmQpPyhhZD1GZCxkZC5hZGRFdmVudExpc3RlbmVyKCJtZXNzYWdlIixDZCwhMSkpOmFkPSJvbnJlYWR5c3RhdGVjaGFuZ2UiaW4gQWQoInNjcmlwdCIpP2Z1bmN0aW9uKHIpe21kLmFwcGVuZENoaWxkKEFkKCJzY3JpcHQiKSkub25yZWFkeXN0YXRlY2hhbmdlPWZ1bmN0aW9uKCl7bWQucmVtb3ZlQ2hpbGQodGhpcyksUmQocil9fTpmdW5jdGlvbihyKXtzZXRUaW1lb3V0KE5kKHIpLDApfSk7dmFyIEJkLERkLEdkLFlkLFZkLHpkLFdkLCRkLEhkPXtzZXQ6RWQsY2xlYXI6VGR9LEtkPW4scWQ9L2lwYWR8aXBob25lfGlwb2QvaS50ZXN0KHopJiZ2b2lkIDAhPT1LZC52cixKZD0vd2ViMHMoPyEuKmNocm9tZSkvaS50ZXN0KHopLFhkPW4sUWQ9eWMsWmQ9ZS5mLHJ5PUhkLnNldCx0eT1sZCxueT1xZCxleT1KZCxpeT12ZCxveT1YZC5NdXRhdGlvbk9ic2VydmVyfHxYZC5XZWJLaXRNdXRhdGlvbk9ic2VydmVyLHV5PVhkLmRvY3VtZW50LGZ5PVhkLnByb2Nlc3MsYXk9WGQuUHJvbWlzZSxjeT1aZChYZCwicXVldWVNaWNyb3Rhc2siKSxzeT1jeSYmY3kudmFsdWU7c3l8fChCZD1mdW5jdGlvbigpe3ZhciByLHQ7Zm9yKGl5JiYocj1meS5kb21haW4pJiZyLmhyKCk7RGQ7KXt0PURkLmxyLERkPURkLm5leHQ7dHJ5e3QoKX1jYXRjaChyKXt0aHJvdyBEZD9ZZCgpOkdkPXZvaWQgMCxyfX1HZD12b2lkIDAsciYmci5kcigpfSx0eXx8aXl8fGV5fHwhb3l8fCF1eT8hbnkmJmF5JiZheS5yZXNvbHZlPygoV2Q9YXkucmVzb2x2ZSh2b2lkIDApKS5jb25zdHJ1Y3Rvcj1heSwkZD1RZChXZC50aGVuLFdkKSxZZD1mdW5jdGlvbigpeyRkKEJkKX0pOml5P1lkPWZ1bmN0aW9uKCl7ZnkuY3IoQmQpfToocnk9UWQocnksWGQpLFlkPWZ1bmN0aW9uKCl7cnkoQmQpfSk6KFZkPSEwLHpkPXV5LmNyZWF0ZVRleHROb2RlKCIiKSxuZXcgb3koQmQpLm9ic2VydmUoemQse2NoYXJhY3RlckRhdGE6ITB9KSxZZD1mdW5jdGlvbigpe3pkLmRhdGE9VmQ9IVZkfSkpO3ZhciB2eT1zeXx8ZnVuY3Rpb24ocil7dmFyIHQ9e2xyOnIsbmV4dDp2b2lkIDB9O0dkJiYoR2QubmV4dD10KSxEZHx8KERkPXQsWWQoKSksR2Q9dH0saHk9bixseT1mdW5jdGlvbihyKXt0cnl7cmV0dXJue2Vycm9yOiExLHZhbHVlOnIoKX19Y2F0Y2gocil7cmV0dXJue2Vycm9yOiEwLHZhbHVlOnJ9fX0sZHk9ZnVuY3Rpb24oKXt0aGlzLmhlYWQ9bnVsbCx0aGlzLnlyPW51bGx9O2R5LnByb3RvdHlwZT17YWRkOmZ1bmN0aW9uKHIpe3ZhciB0PXtpdGVtOnIsbmV4dDpudWxsfTt0aGlzLmhlYWQ/dGhpcy55ci5uZXh0PXQ6dGhpcy5oZWFkPXQsdGhpcy55cj10fSxnZXQ6ZnVuY3Rpb24oKXt2YXIgcj10aGlzLmhlYWQ7aWYocilyZXR1cm4gdGhpcy5oZWFkPXIubmV4dCx0aGlzLnlyPT09ciYmKHRoaXMueXI9bnVsbCksci5pdGVtfX07dmFyIHl5PWR5LHd5PW4uUHJvbWlzZSxieT0ib2JqZWN0Ij09dHlwZW9mIHdpbmRvdyYmIm9iamVjdCIhPXR5cGVvZiBEZW5vLHB5PW4sZ3k9d3ksbXk9TixTeT1JZSxBeT1IdCxqeT0kcixPeT1ieSxreT1YO2d5JiZneS5wcm90b3R5cGU7dmFyIEV5PWp5KCJzcGVjaWVzIiksVHk9ITEseHk9bXkocHkuUHJvbWlzZVJlamVjdGlvbkV2ZW50KSxVeT1TeSgiUHJvbWlzZSIsKGZ1bmN0aW9uKCl7dmFyIHI9QXkoZ3kpLHQ9ciE9PWd5KyIiO2lmKCF0JiY2Nj09PWt5KXJldHVybiEwO2lmKGt5Pj01MSYmL25hdGl2ZSBjb2RlLy50ZXN0KHIpKXJldHVybiExO3ZhciBuPW5ldyBneSgoZnVuY3Rpb24ocil7cigxKX0pKSxlPWZ1bmN0aW9uKHIpe3IoKGZ1bmN0aW9uKCl7fSksKGZ1bmN0aW9uKCl7fSkpfTtyZXR1cm4obi5jb25zdHJ1Y3Rvcj17fSlbRXldPWUsIShUeT1uLnRoZW4oKGZ1bmN0aW9uKCl7fSkpaW5zdGFuY2VvZiBlKXx8IXQmJk95JiYheHl9KSksTXk9e3dyOlV5LGJyOnh5LHByOlR5fSxJeT17fSxfeT12cixMeT1mdW5jdGlvbihyKXt2YXIgdCxuO3RoaXMucHJvbWlzZT1uZXcgcigoZnVuY3Rpb24ocixlKXtpZih2b2lkIDAhPT10fHx2b2lkIDAhPT1uKXRocm93IFR5cGVFcnJvcigiQmFkIFByb21pc2UgY29uc3RydWN0b3IiKTt0PXIsbj1lfSkpLHRoaXMucmVzb2x2ZT1feSh0KSx0aGlzLnJlamVjdD1feShuKX07SXkuZj1mdW5jdGlvbihyKXtyZXR1cm4gbmV3IEx5KHIpfTt2YXIgUHksUnksTnksQ3k9QmUsRnk9dmQsQnk9bixEeT1hLEd5PU5uLFl5PXhvLFZ5PXdvLHp5PWZzLFd5PXZyLCR5PU4sSHk9RixLeT11dSxxeT1xZixKeT1IZC5zZXQsWHk9dnksUXk9bHksWnk9eXkscnc9bW4sdHc9d3ksbnc9SXksZXc9TXkud3IsaXc9TXkuYnIsb3c9TXkucHIsdXc9cncuVSgiUHJvbWlzZSIpLGZ3PXJ3LnNldCxhdz10dyYmdHcucHJvdG90eXBlLGN3PXR3LHN3PWF3LHZ3PUJ5LlR5cGVFcnJvcixodz1CeS5kb2N1bWVudCxsdz1CeS5wcm9jZXNzLGR3PW53LmYseXc9ZHcsd3c9ISEoaHcmJmh3LmNyZWF0ZUV2ZW50JiZCeS5kaXNwYXRjaEV2ZW50KSxidz1mdW5jdGlvbihyKXt2YXIgdDtyZXR1cm4hKCFIeShyKXx8ISR5KHQ9ci50aGVuKSkmJnR9LHB3PWZ1bmN0aW9uKHIsdCl7dmFyIG4sZSxpLG89dC52YWx1ZSx1PTE9PXQuc3RhdGUsZj11P3Iub2s6ci5ncixhPXIucmVzb2x2ZSxjPXIucmVqZWN0LHM9ci5kb21haW47dHJ5e2Y/KHV8fCgyPT09dC5tciYmancodCksdC5tcj0xKSwhMD09PWY/bj1vOihzJiZzLmRyKCksbj1mKG8pLHMmJihzLmhyKCksaT0hMCkpLG49PT1yLnByb21pc2U/Yyh2dygiUHJvbWlzZS1jaGFpbiBjeWNsZSIpKTooZT1idyhuKSk/RHkoZSxuLGEsYyk6YShuKSk6YyhvKX1jYXRjaChyKXtzJiYhaSYmcy5ocigpLGMocil9fSxndz1mdW5jdGlvbihyLHQpe3IuU3J8fChyLlNyPSEwLFh5KChmdW5jdGlvbigpe2Zvcih2YXIgbixlPXIuQXI7bj1lLmdldCgpOylwdyhuLHIpO3IuU3I9ITEsdCYmIXIubXImJlN3KHIpfSkpKX0sbXc9ZnVuY3Rpb24ocix0LG4pe3ZhciBlLGk7d3c/KChlPWh3LmNyZWF0ZUV2ZW50KCJFdmVudCIpKS5wcm9taXNlPXQsZS5yZWFzb249bixlLmluaXRFdmVudChyLCExLCEwKSxCeS5kaXNwYXRjaEV2ZW50KGUpKTplPXtwcm9taXNlOnQscmVhc29uOm59LCFpdyYmKGk9QnlbIm9uIityXSk/aShlKToidW5oYW5kbGVkcmVqZWN0aW9uIj09PXImJmZ1bmN0aW9uKHIsdCl7dmFyIG49aHkuY29uc29sZTtuJiZuLmVycm9yJiYoMT09YXJndW1lbnRzLmxlbmd0aD9uLmVycm9yKHIpOm4uZXJyb3Iocix0KSl9KCJVbmhhbmRsZWQgcHJvbWlzZSByZWplY3Rpb24iLG4pfSxTdz1mdW5jdGlvbihyKXtEeShKeSxCeSwoZnVuY3Rpb24oKXt2YXIgdCxuPXIuayxlPXIudmFsdWU7aWYoQXcocikmJih0PVF5KChmdW5jdGlvbigpe0Z5P2x3LmpyKCJ1bmhhbmRsZWRSZWplY3Rpb24iLGUsbik6bXcoInVuaGFuZGxlZHJlamVjdGlvbiIsbixlKX0pKSxyLm1yPUZ5fHxBdyhyKT8yOjEsdC5lcnJvcikpdGhyb3cgdC52YWx1ZX0pKX0sQXc9ZnVuY3Rpb24ocil7cmV0dXJuIDEhPT1yLm1yJiYhci5wYXJlbnR9LGp3PWZ1bmN0aW9uKHIpe0R5KEp5LEJ5LChmdW5jdGlvbigpe3ZhciB0PXIuaztGeT9sdy5qcigicmVqZWN0aW9uSGFuZGxlZCIsdCk6bXcoInJlamVjdGlvbmhhbmRsZWQiLHQsci52YWx1ZSl9KSl9LE93PWZ1bmN0aW9uKHIsdCxuKXtyZXR1cm4gZnVuY3Rpb24oZSl7cih0LGUsbil9fSxrdz1mdW5jdGlvbihyLHQsbil7ci5kb25lfHwoci5kb25lPSEwLG4mJihyPW4pLHIudmFsdWU9dCxyLnN0YXRlPTIsZ3cociwhMCkpfSxFdz1mdW5jdGlvbihyLHQsbil7aWYoIXIuZG9uZSl7ci5kb25lPSEwLG4mJihyPW4pO3RyeXtpZihyLms9PT10KXRocm93IHZ3KCJQcm9taXNlIGNhbid0IGJlIHJlc29sdmVkIGl0c2VsZiIpO3ZhciBlPWJ3KHQpO2U/WHkoKGZ1bmN0aW9uKCl7dmFyIG49e2RvbmU6ITF9O3RyeXtEeShlLHQsT3coRXcsbixyKSxPdyhrdyxuLHIpKX1jYXRjaCh0KXtrdyhuLHQscil9fSkpOihyLnZhbHVlPXQsci5zdGF0ZT0xLGd3KHIsITEpKX1jYXRjaCh0KXtrdyh7ZG9uZTohMX0sdCxyKX19fTtpZihldyYmKHN3PShjdz1mdW5jdGlvbihyKXtLeSh0aGlzLHN3KSxXeShyKSxEeShQeSx0aGlzKTt2YXIgdD11dyh0aGlzKTt0cnl7cihPdyhFdyx0KSxPdyhrdyx0KSl9Y2F0Y2gocil7a3codCxyKX19KS5wcm90b3R5cGUsKFB5PWZ1bmN0aW9uKCl7ZncodGhpcyx7dHlwZToiUHJvbWlzZSIsZG9uZTohMSxTcjohMSxwYXJlbnQ6ITEsQXI6bmV3IFp5LG1yOiExLHN0YXRlOjAsdmFsdWU6dm9pZCAwfSl9KS5wcm90b3R5cGU9R3koc3csInRoZW4iLChmdW5jdGlvbihyLHQpe3ZhciBuPXV3KHRoaXMpLGU9ZHcocXkodGhpcyxjdykpO3JldHVybiBuLnBhcmVudD0hMCxlLm9rPSEkeShyKXx8cixlLmdyPSR5KHQpJiZ0LGUuZG9tYWluPUZ5P2x3LmRvbWFpbjp2b2lkIDAsMD09bi5zdGF0ZT9uLkFyLmFkZChlKTpYeSgoZnVuY3Rpb24oKXtwdyhlLG4pfSkpLGUucHJvbWlzZX0pKSxSeT1mdW5jdGlvbigpe3ZhciByPW5ldyBQeSx0PXV3KHIpO3RoaXMucHJvbWlzZT1yLHRoaXMucmVzb2x2ZT1PdyhFdyx0KSx0aGlzLnJlamVjdD1Pdyhrdyx0KX0sbncuZj1kdz1mdW5jdGlvbihyKXtyZXR1cm4gcj09PWN3fHx2b2lkIDA9PT1yP25ldyBSeShyKTp5dyhyKX0sJHkodHcpJiZhdyE9PU9iamVjdC5wcm90b3R5cGUpKXtOeT1hdy50aGVuLG93fHxHeShhdywidGhlbiIsKGZ1bmN0aW9uKHIsdCl7dmFyIG49dGhpcztyZXR1cm4gbmV3IGN3KChmdW5jdGlvbihyLHQpe0R5KE55LG4scix0KX0pKS50aGVuKHIsdCl9KSx7TDohMH0pO3RyeXtkZWxldGUgYXcuY29uc3RydWN0b3J9Y2F0Y2gocil7fVl5JiZZeShhdyxzdyl9Q3koe2dsb2JhbDohMCxjb25zdHJ1Y3RvcjohMCx3cmFwOiEwLEY6ZXd9LHtQcm9taXNlOmN3fSksVnkoY3csIlByb21pc2UiLCExKSx6eSgiUHJvbWlzZSIpO3ZhciBUdz1hLHh3PWp0LFV3PWxyLE13PWZ1bmN0aW9uKHIsdCxuKXt2YXIgZSxpO3h3KHIpO3RyeXtpZighKGU9VXcociwicmV0dXJuIikpKXtpZigidGhyb3ciPT09dCl0aHJvdyBuO3JldHVybiBufWU9VHcoZSxyKX1jYXRjaChyKXtpPSEwLGU9cn1pZigidGhyb3ciPT09dCl0aHJvdyBuO2lmKGkpdGhyb3cgZTtyZXR1cm4geHcoZSksbn0sSXc9eWMsX3c9YSxMdz1qdCxQdz1mcixSdz1JYyxOdz1KbixDdz1WLEZ3PVRjLEJ3PW1jLER3PU13LEd3PVR5cGVFcnJvcixZdz1mdW5jdGlvbihyLHQpe3RoaXMuc3RvcHBlZD1yLHRoaXMucmVzdWx0PXR9LFZ3PVl3LnByb3RvdHlwZSx6dz1mdW5jdGlvbihyLHQsbil7dmFyIGUsaSxvLHUsZixhLGMscz1uJiZuLk9yLHY9ISghbnx8IW4ua3IpLGg9ISghbnx8IW4uRXIpLGw9ISghbnx8IW4uVHIpLGQ9SXcodCxzKSx5PWZ1bmN0aW9uKHIpe3JldHVybiBlJiZEdyhlLCJub3JtYWwiLHIpLG5ldyBZdyghMCxyKX0sdz1mdW5jdGlvbihyKXtyZXR1cm4gdj8oTHcociksbD9kKHJbMF0sclsxXSx5KTpkKHJbMF0sclsxXSkpOmw/ZChyLHkpOmQocil9O2lmKGgpZT1yO2Vsc2V7aWYoIShpPUJ3KHIpKSl0aHJvdyBHdyhQdyhyKSsiIGlzIG5vdCBpdGVyYWJsZSIpO2lmKFJ3KGkpKXtmb3Iobz0wLHU9Tncocik7dT5vO28rKylpZigoZj13KHJbb10pKSYmQ3coVncsZikpcmV0dXJuIGY7cmV0dXJuIG5ldyBZdyghMSl9ZT1GdyhyLGkpfWZvcihhPWUubmV4dDshKGM9X3coYSxlKSkuZG9uZTspe3RyeXtmPXcoYy52YWx1ZSl9Y2F0Y2gocil7RHcoZSwidGhyb3ciLHIpfWlmKCJvYmplY3QiPT10eXBlb2YgZiYmZiYmQ3coVncsZikpcmV0dXJuIGZ9cmV0dXJuIG5ldyBZdyghMSl9LFd3PXd5LCR3PU15LndyfHwhcGEoKGZ1bmN0aW9uKHIpe1d3LmFsbChyKS50aGVuKHZvaWQgMCwoZnVuY3Rpb24oKXt9KSl9KSksSHc9YSxLdz12cixxdz1JeSxKdz1seSxYdz16dztCZSh7dGFyZ2V0OiJQcm9taXNlIixOOiEwLEY6JHd9LHthbGw6ZnVuY3Rpb24ocil7dmFyIHQ9dGhpcyxuPXF3LmYodCksZT1uLnJlc29sdmUsaT1uLnJlamVjdCxvPUp3KChmdW5jdGlvbigpe3ZhciBuPUt3KHQucmVzb2x2ZSksbz1bXSx1PTAsZj0xO1h3KHIsKGZ1bmN0aW9uKHIpe3ZhciBhPXUrKyxjPSExO2YrKyxIdyhuLHQscikudGhlbigoZnVuY3Rpb24ocil7Y3x8KGM9ITAsb1thXT1yLC0tZnx8ZShvKSl9KSxpKX0pKSwtLWZ8fGUobyl9KSk7cmV0dXJuIG8uZXJyb3ImJmkoby52YWx1ZSksbi5wcm9taXNlfX0pO3ZhciBRdz1CZSxadz1NeS53cixyYj13eSx0Yj1ZLG5iPU4sZWI9Tm4saWI9cmImJnJiLnByb3RvdHlwZTtpZihRdyh7dGFyZ2V0OiJQcm9taXNlIixEOiEwLEY6WncsVXI6ITB9LHtjYXRjaDpmdW5jdGlvbihyKXtyZXR1cm4gdGhpcy50aGVuKHZvaWQgMCxyKX19KSxuYihyYikpe3ZhciBvYj10YigiUHJvbWlzZSIpLnByb3RvdHlwZS5jYXRjaDtpYi5jYXRjaCE9PW9iJiZlYihpYiwiY2F0Y2giLG9iLHtMOiEwfSl9dmFyIHViPWEsZmI9dnIsYWI9SXksY2I9bHksc2I9enc7QmUoe3RhcmdldDoiUHJvbWlzZSIsTjohMCxGOiR3fSx7cmFjZTpmdW5jdGlvbihyKXt2YXIgdD10aGlzLG49YWIuZih0KSxlPW4ucmVqZWN0LGk9Y2IoKGZ1bmN0aW9uKCl7dmFyIGk9ZmIodC5yZXNvbHZlKTtzYihyLChmdW5jdGlvbihyKXt1YihpLHQscikudGhlbihuLnJlc29sdmUsZSl9KSl9KSk7cmV0dXJuIGkuZXJyb3ImJmUoaS52YWx1ZSksbi5wcm9taXNlfX0pO3ZhciB2Yj1hLGhiPUl5O0JlKHt0YXJnZXQ6IlByb21pc2UiLE46ITAsRjpNeS53cn0se3JlamVjdDpmdW5jdGlvbihyKXt2YXIgdD1oYi5mKHRoaXMpO3JldHVybiB2Yih0LnJlamVjdCx2b2lkIDAsciksdC5wcm9taXNlfX0pO3ZhciBsYj1qdCxkYj1GLHliPUl5LHdiPUJlLGJiPU15LndyO1koIlByb21pc2UiKSx3Yih7dGFyZ2V0OiJQcm9taXNlIixOOiEwLEY6YmJ9LHtyZXNvbHZlOmZ1bmN0aW9uKHIpe3JldHVybiBmdW5jdGlvbihyLHQpe2lmKGxiKHIpLGRiKHQpJiZ0LmNvbnN0cnVjdG9yPT09cilyZXR1cm4gdDt2YXIgbj15Yi5mKHIpO3JldHVybigwLG4ucmVzb2x2ZSkodCksbi5wcm9taXNlfSh0aGlzLHIpfX0pO3ZhciBwYj17fSxnYj1rLG1iPVIsU2I9Q24uZixBYj1VdSxqYj0ib2JqZWN0Ij09dHlwZW9mIHdpbmRvdyYmd2luZG93JiZPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcz9PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh3aW5kb3cpOltdO3BiLmY9ZnVuY3Rpb24ocil7cmV0dXJuIGpiJiYiV2luZG93Ij09Z2Iocik/ZnVuY3Rpb24ocil7dHJ5e3JldHVybiBTYihyKX1jYXRjaChyKXtyZXR1cm4gQWIoamIpfX0ocik6U2IobWIocikpfTt2YXIgT2I9e30sa2I9JHI7T2IuZj1rYjt2YXIgRWI9bixUYj1Ncix4Yj1PYixVYj1wdC5mLE1iPWZ1bmN0aW9uKHIpe3ZhciB0PUViLlN5bWJvbHx8KEViLlN5bWJvbD17fSk7VGIodCxyKXx8VWIodCxyLHt2YWx1ZTp4Yi5mKHIpfSl9LEliPWEsX2I9WSxMYj0kcixQYj1ObixSYj1CZSxOYj1uLENiPWEsRmI9UyxCYj1vLERiPVosR2I9aSxZYj1NcixWYj1WLHpiPWp0LFdiPVIsJGI9bnQsSGI9UWUsS2I9eSxxYj1GaSxKYj1waSxYYj1DbixRYj1wYixaYj12ZSxycD1lLHRwPXB0LG5wPXlpLGVwPWMsaXA9Tm4sb3A9cHIuZXhwb3J0cyx1cD1ubixmcD1ScixhcD0kcixjcD1PYixzcD1NYix2cD13byxocD1tbixscD1ucy5mb3JFYWNoLGRwPXRuKCJoaWRkZW4iKSx5cD1ocC5zZXQsd3A9aHAuVSgiU3ltYm9sIiksYnA9T2JqZWN0LnByb3RvdHlwZSxwcD1OYi5TeW1ib2wsZ3A9cHAmJnBwLnByb3RvdHlwZSxtcD1OYi5UeXBlRXJyb3IsU3A9TmIuTXIsQXA9cnAuZixqcD10cC5mLE9wPVFiLmYsa3A9ZXAuZixFcD1GYihbXS5wdXNoKSxUcD1vcCgic3ltYm9scyIpLHhwPW9wKCJvcC1zeW1ib2xzIiksVXA9b3AoIndrcyIpLE1wPSFTcHx8IVNwLnByb3RvdHlwZXx8IVNwLnByb3RvdHlwZS5JcixJcD1CYiYmR2IoKGZ1bmN0aW9uKCl7cmV0dXJuIDchPXFiKGpwKHt9LCJhIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGpwKHRoaXMsImEiLHt2YWx1ZTo3fSkuYX19KSkuYX0pKT9mdW5jdGlvbihyLHQsbil7dmFyIGU9QXAoYnAsdCk7ZSYmZGVsZXRlIGJwW3RdLGpwKHIsdCxuKSxlJiZyIT09YnAmJmpwKGJwLHQsZSl9OmpwLF9wPWZ1bmN0aW9uKHIsdCl7dmFyIG49VHBbcl09cWIoZ3ApO3JldHVybiB5cChuLHt0eXBlOiJTeW1ib2wiLHRhZzpyLGRlc2NyaXB0aW9uOnR9KSxCYnx8KG4uZGVzY3JpcHRpb249dCksbn0sTHA9ZnVuY3Rpb24ocix0LG4pe3I9PT1icCYmTHAoeHAsdCxuKSx6YihyKTt2YXIgZT0kYih0KTtyZXR1cm4gemIobiksWWIoVHAsZSk/KG4udD8oWWIocixkcCkmJnJbZHBdW2VdJiYocltkcF1bZV09ITEpLG49cWIobix7dDpLYigwLCExKX0pKTooWWIocixkcCl8fGpwKHIsZHAsS2IoMSx7fSkpLHJbZHBdW2VdPSEwKSxJcChyLGUsbikpOmpwKHIsZSxuKX0sUHA9ZnVuY3Rpb24ocix0KXt6YihyKTt2YXIgbj1XYih0KSxlPUpiKG4pLmNvbmNhdChGcChuKSk7cmV0dXJuIGxwKGUsKGZ1bmN0aW9uKHQpe0JiJiYhQ2IoUnAsbix0KXx8THAocix0LG5bdF0pfSkpLHJ9LFJwPWZ1bmN0aW9uKHIpe3ZhciB0PSRiKHIpLG49Q2Ioa3AsdGhpcyx0KTtyZXR1cm4hKHRoaXM9PT1icCYmWWIoVHAsdCkmJiFZYih4cCx0KSkmJighKG58fCFZYih0aGlzLHQpfHwhWWIoVHAsdCl8fFliKHRoaXMsZHApJiZ0aGlzW2RwXVt0XSl8fG4pfSxOcD1mdW5jdGlvbihyLHQpe3ZhciBuPVdiKHIpLGU9JGIodCk7aWYobiE9PWJwfHwhWWIoVHAsZSl8fFliKHhwLGUpKXt2YXIgaT1BcChuLGUpO3JldHVybiFpfHwhWWIoVHAsZSl8fFliKG4sZHApJiZuW2RwXVtlXXx8KGkudD0hMCksaX19LENwPWZ1bmN0aW9uKHIpe3ZhciB0PU9wKFdiKHIpKSxuPVtdO3JldHVybiBscCh0LChmdW5jdGlvbihyKXtZYihUcCxyKXx8WWIodXAscil8fEVwKG4scil9KSksbn0sRnA9ZnVuY3Rpb24ocil7dmFyIHQ9cj09PWJwLG49T3AodD94cDpXYihyKSksZT1bXTtyZXR1cm4gbHAobiwoZnVuY3Rpb24ocil7IVliKFRwLHIpfHx0JiYhWWIoYnAscil8fEVwKGUsVHBbcl0pfSkpLGV9O0RifHwoaXAoZ3A9KHBwPWZ1bmN0aW9uKCl7aWYoVmIoZ3AsdGhpcykpdGhyb3cgbXAoIlN5bWJvbCBpcyBub3QgYSBjb25zdHJ1Y3RvciIpO3ZhciByPWFyZ3VtZW50cy5sZW5ndGgmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9IYihhcmd1bWVudHNbMF0pOnZvaWQgMCx0PWZwKHIpLG49ZnVuY3Rpb24ocil7dGhpcz09PWJwJiZDYihuLHhwLHIpLFliKHRoaXMsZHApJiZZYih0aGlzW2RwXSx0KSYmKHRoaXNbZHBdW3RdPSExKSxJcCh0aGlzLHQsS2IoMSxyKSl9O3JldHVybiBCYiYmTXAmJklwKGJwLHQse2k6ITAsc2V0Om59KSxfcCh0LHIpfSkucHJvdG90eXBlLCJ0b1N0cmluZyIsKGZ1bmN0aW9uKCl7cmV0dXJuIHdwKHRoaXMpLnRhZ30pKSxpcChwcCwid2l0aG91dFNldHRlciIsKGZ1bmN0aW9uKHIpe3JldHVybiBfcChmcChyKSxyKX0pKSxlcC5mPVJwLHRwLmY9THAsbnAuZj1QcCxycC5mPU5wLFhiLmY9UWIuZj1DcCxaYi5mPUZwLGNwLmY9ZnVuY3Rpb24ocil7cmV0dXJuIF9wKGFwKHIpLHIpfSxCYiYmKGpwKGdwLCJkZXNjcmlwdGlvbiIse2k6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHdwKHRoaXMpLmRlc2NyaXB0aW9ufX0pLGlwKGJwLCJwcm9wZXJ0eUlzRW51bWVyYWJsZSIsUnAse0w6ITB9KSkpLFJiKHtnbG9iYWw6ITAsY29uc3RydWN0b3I6ITAsd3JhcDohMCxGOiFEYixoOiFEYn0se1N5bWJvbDpwcH0pLGxwKEpiKFVwKSwoZnVuY3Rpb24ocil7c3Aocil9KSksUmIoe3RhcmdldDoiU3ltYm9sIixOOiEwLEY6IURifSx7X3I6ZnVuY3Rpb24oKXtNcD0hMH0sTHI6ZnVuY3Rpb24oKXtNcD0hMX19KSxSYih7dGFyZ2V0OiJPYmplY3QiLE46ITAsRjohRGIsaDohQmJ9LHtjcmVhdGU6ZnVuY3Rpb24ocix0KXtyZXR1cm4gdm9pZCAwPT09dD9xYihyKTpQcChxYihyKSx0KX0sZGVmaW5lUHJvcGVydHk6THAsZGVmaW5lUHJvcGVydGllczpQcCxnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I6TnB9KSxSYih7dGFyZ2V0OiJPYmplY3QiLE46ITAsRjohRGJ9LHtnZXRPd25Qcm9wZXJ0eU5hbWVzOkNwfSksZnVuY3Rpb24oKXt2YXIgcj1fYigiU3ltYm9sIiksdD1yJiZyLnByb3RvdHlwZSxuPXQmJnQudmFsdWVPZixlPUxiKCJ0b1ByaW1pdGl2ZSIpO3QmJiF0W2VdJiZQYih0LGUsKGZ1bmN0aW9uKCl7cmV0dXJuIEliKG4sdGhpcyl9KSx7XzoxfSl9KCksdnAocHAsIlN5bWJvbCIpLHVwW2RwXT0hMDt2YXIgQnA9WiYmISFTeW1ib2wuZm9yJiYhIVN5bWJvbC5rZXlGb3IsRHA9QmUsR3A9WSxZcD1NcixWcD1RZSx6cD1wci5leHBvcnRzLFdwPUJwLCRwPXpwKCJzdHJpbmctdG8tc3ltYm9sLXJlZ2lzdHJ5IiksSHA9enAoInN5bWJvbC10by1zdHJpbmctcmVnaXN0cnkiKTtEcCh7dGFyZ2V0OiJTeW1ib2wiLE46ITAsRjohV3B9LHtmb3I6ZnVuY3Rpb24ocil7dmFyIHQ9VnAocik7aWYoWXAoJHAsdCkpcmV0dXJuICRwW3RdO3ZhciBuPUdwKCJTeW1ib2wiKSh0KTtyZXR1cm4gJHBbdF09bixIcFtuXT10LG59fSk7dmFyIEtwPUJlLHFwPU1yLEpwPW9yLFhwPWZyLFFwPUJwLFpwPSgwLHByLmV4cG9ydHMpKCJzeW1ib2wtdG8tc3RyaW5nLXJlZ2lzdHJ5Iik7S3Aoe3RhcmdldDoiU3ltYm9sIixOOiEwLEY6IVFwfSx7a2V5Rm9yOmZ1bmN0aW9uKHIpe2lmKCFKcChyKSl0aHJvdyBUeXBlRXJyb3IoWHAocikrIiBpcyBub3QgYSBzeW1ib2wiKTtpZihxcChacCxyKSlyZXR1cm4gWnBbcl19fSk7dmFyIHJnPUJlLHRnPVksbmc9cGgsZWc9YSxpZz1TLG9nPWksdWc9WWMsZmc9TixhZz1GLGNnPW9yLHNnPWNsLHZnPVosaGc9dGcoIkpTT04iLCJzdHJpbmdpZnkiKSxsZz1pZygvLi8uZXhlYyksZGc9aWcoIiIuY2hhckF0KSx5Zz1pZygiIi5jaGFyQ29kZUF0KSx3Zz1pZygiIi5yZXBsYWNlKSxiZz1pZygxLi50b1N0cmluZykscGc9L1tcdUQ4MDAtXHVERkZGXS9nLGdnPS9eW1x1RDgwMC1cdURCRkZdJC8sbWc9L15bXHVEQzAwLVx1REZGRl0kLyxTZz0hdmd8fG9nKChmdW5jdGlvbigpe3ZhciByPXRnKCJTeW1ib2wiKSgpO3JldHVybiJbbnVsbF0iIT1oZyhbcl0pfHwie30iIT1oZyh7YTpyfSl8fCJ7fSIhPWhnKE9iamVjdChyKSl9KSksQWc9b2coKGZ1bmN0aW9uKCl7cmV0dXJuJyJcXHVkZjA2XFx1ZDgzNCInIT09aGcoIlx1ZGYwNlx1ZDgzNCIpfHwnIlxcdWRlYWQiJyE9PWhnKCJcdWRlYWQiKX0pKSxqZz1mdW5jdGlvbihyLHQpe3ZhciBuPXNnKGFyZ3VtZW50cyksZT10O2lmKChhZyh0KXx8dm9pZCAwIT09cikmJiFjZyhyKSlyZXR1cm4gdWcodCl8fCh0PWZ1bmN0aW9uKHIsdCl7aWYoZmcoZSkmJih0PWVnKGUsdGhpcyxyLHQpKSwhY2codCkpcmV0dXJuIHR9KSxuWzFdPXQsbmcoaGcsbnVsbCxuKX0sT2c9ZnVuY3Rpb24ocix0LG4pe3ZhciBlPWRnKG4sdC0xKSxpPWRnKG4sdCsxKTtyZXR1cm4gbGcoZ2cscikmJiFsZyhtZyxpKXx8bGcobWcscikmJiFsZyhnZyxlKT8iXFx1IitiZyh5ZyhyLDApLDE2KTpyfTtoZyYmcmcoe3RhcmdldDoiSlNPTiIsTjohMCxfOjMsRjpTZ3x8QWd9LHtzdHJpbmdpZnk6ZnVuY3Rpb24ocix0LG4pe3ZhciBlPXNnKGFyZ3VtZW50cyksaT1uZyhTZz9qZzpoZyxudWxsLGUpO3JldHVybiBBZyYmInN0cmluZyI9PXR5cGVvZiBpP3dnKGkscGcsT2cpOml9fSk7dmFyIGtnPXZlLEVnPVRyO0JlKHt0YXJnZXQ6Ik9iamVjdCIsTjohMCxGOiFafHxpKChmdW5jdGlvbigpe2tnLmYoMSl9KSl9LHtnZXRPd25Qcm9wZXJ0eVN5bWJvbHM6ZnVuY3Rpb24ocil7dmFyIHQ9a2cuZjtyZXR1cm4gdD90KEVnKHIpKTpbXX19KTt2YXIgVGc9QmUseGc9byxVZz1uLE1nPVMsSWc9TXIsX2c9TixMZz1WLFBnPVFlLFJnPXB0LmYsTmc9QWUsQ2c9VWcuU3ltYm9sLEZnPUNnJiZDZy5wcm90b3R5cGU7aWYoeGcmJl9nKENnKSYmKCEoImRlc2NyaXB0aW9uImluIEZnKXx8dm9pZCAwIT09Q2coKS5kZXNjcmlwdGlvbikpe3ZhciBCZz17fSxEZz1mdW5jdGlvbigpe3ZhciByPTE+YXJndW1lbnRzLmxlbmd0aHx8dm9pZCAwPT09YXJndW1lbnRzWzBdP3ZvaWQgMDpQZyhhcmd1bWVudHNbMF0pLHQ9TGcoRmcsdGhpcyk/bmV3IENnKHIpOnZvaWQgMD09PXI/Q2coKTpDZyhyKTtyZXR1cm4iIj09PXImJihCZ1t0XT0hMCksdH07TmcoRGcsQ2cpLERnLnByb3RvdHlwZT1GZyxGZy5jb25zdHJ1Y3Rvcj1EZzt2YXIgR2c9Q2coInRlc3QiKSsiIj09IlN5bWJvbCh0ZXN0KSIsWWc9TWcoRmcudG9TdHJpbmcpLFZnPU1nKEZnLnZhbHVlT2YpLHpnPS9eU3ltYm9sXCgoLiopXClbXildKyQvLFdnPU1nKCIiLnJlcGxhY2UpLCRnPU1nKCIiLnNsaWNlKTtSZyhGZywiZGVzY3JpcHRpb24iLHtpOiEwLGdldDpmdW5jdGlvbigpe3ZhciByPVZnKHRoaXMpLHQ9WWcocik7aWYoSWcoQmcscikpcmV0dXJuIiI7dmFyIG49R2c/JGcodCw3LC0xKTpXZyh0LHpnLCIkMSIpO3JldHVybiIiPT09bj92b2lkIDA6bn19KSxUZyh7Z2xvYmFsOiEwLGNvbnN0cnVjdG9yOiEwLEY6ITB9LHtTeW1ib2w6RGd9KX1NYigiaXRlcmF0b3IiKTt2YXIgSGc9UyxLZz1HbixxZz1RZSxKZz1fLFhnPUhnKCIiLmNoYXJBdCksUWc9SGcoIiIuY2hhckNvZGVBdCksWmc9SGcoIiIuc2xpY2UpLHJtPWZ1bmN0aW9uKHIpe3JldHVybiBmdW5jdGlvbih0LG4pe3ZhciBlLGksbz1xZyhKZyh0KSksdT1LZyhuKSxmPW8ubGVuZ3RoO3JldHVybiAwPnV8fHU+PWY/cj8iIjp2b2lkIDA6NTUyOTY+KGU9UWcobyx1KSl8fGU+NTYzMTl8fHUrMT09PWZ8fDU2MzIwPihpPVFnKG8sdSsxKSl8fGk+NTczNDM/cj9YZyhvLHUpOmU6cj9aZyhvLHUsdSsyKTppLTU2MzIwKyhlLTU1Mjk2PDwxMCkrNjU1MzZ9fSx0bT0ocm0oITEpLHJtKCEwKSksbm09UWUsZW09bW4saW09em8sb209ZW0uc2V0LHVtPWVtLlUoIlN0cmluZyBJdGVyYXRvciIpO2ltKFN0cmluZywiU3RyaW5nIiwoZnVuY3Rpb24ocil7b20odGhpcyx7dHlwZToiU3RyaW5nIEl0ZXJhdG9yIixzdHJpbmc6bm0ociksaW5kZXg6MH0pfSksKGZ1bmN0aW9uKCl7dmFyIHIsdD11bSh0aGlzKSxuPXQuc3RyaW5nLGU9dC5pbmRleDtyZXR1cm4gZTxuLmxlbmd0aD8ocj10bShuLGUpLHQuaW5kZXgrPXIubGVuZ3RoLHt2YWx1ZTpyLGRvbmU6ITF9KTp7dmFsdWU6dm9pZCAwLGRvbmU6ITB9fSkpO3ZhciBmbT17Q1NTUnVsZUxpc3Q6MCxDU1NTdHlsZURlY2xhcmF0aW9uOjAsQ1NTVmFsdWVMaXN0OjAsQ2xpZW50UmVjdExpc3Q6MCxET01SZWN0TGlzdDowLERPTVN0cmluZ0xpc3Q6MCxET01Ub2tlbkxpc3Q6MSxEYXRhVHJhbnNmZXJJdGVtTGlzdDowLEZpbGVMaXN0OjAsSFRNTEFsbENvbGxlY3Rpb246MCxIVE1MQ29sbGVjdGlvbjowLEhUTUxGb3JtRWxlbWVudDowLEhUTUxTZWxlY3RFbGVtZW50OjAsTWVkaWFMaXN0OjAsTWltZVR5cGVBcnJheTowLE5hbWVkTm9kZU1hcDowLE5vZGVMaXN0OjEsUGFpbnRSZXF1ZXN0TGlzdDowLFBsdWdpbjowLFBsdWdpbkFycmF5OjAsU1ZHTGVuZ3RoTGlzdDowLFNWR051bWJlckxpc3Q6MCxTVkdQYXRoU2VnTGlzdDowLFNWR1BvaW50TGlzdDowLFNWR1N0cmluZ0xpc3Q6MCxTVkdUcmFuc2Zvcm1MaXN0OjAsU291cmNlQnVmZmVyTGlzdDowLFN0eWxlU2hlZXRMaXN0OjAsVGV4dFRyYWNrQ3VlTGlzdDowLFRleHRUcmFja0xpc3Q6MCxUb3VjaExpc3Q6MH0sYW09dXQoInNwYW4iKS5jbGFzc0xpc3QsY209YW0mJmFtLmNvbnN0cnVjdG9yJiZhbS5jb25zdHJ1Y3Rvci5wcm90b3R5cGUsc209Y209PT1PYmplY3QucHJvdG90eXBlP3ZvaWQgMDpjbSx2bT1uLGhtPWZtLGxtPXNtLGRtPXJ1LHltPVB0LHdtPSRyLGJtPXdtKCJpdGVyYXRvciIpLHBtPXdtKCJ0b1N0cmluZ1RhZyIpLGdtPWRtLnZhbHVlcyxtbT1mdW5jdGlvbihyLHQpe2lmKHIpe2lmKHJbYm1dIT09Z20pdHJ5e3ltKHIsYm0sZ20pfWNhdGNoKHQpe3JbYm1dPWdtfWlmKHJbcG1dfHx5bShyLHBtLHQpLGhtW3RdKWZvcih2YXIgbiBpbiBkbSlpZihyW25dIT09ZG1bbl0pdHJ5e3ltKHIsbixkbVtuXSl9Y2F0Y2godCl7cltuXT1kbVtuXX19fTtmb3IodmFyIFNtIGluIGhtKW1tKHZtW1NtXSYmdm1bU21dLnByb3RvdHlwZSxTbSk7bW0obG0sIkRPTVRva2VuTGlzdCIpLE1iKCJhc3luY0l0ZXJhdG9yIik7dmFyIEFtPVksam09d287TWIoInRvU3RyaW5nVGFnIiksam0oQW0oIlN5bWJvbCIpLCJTeW1ib2wiKSx3byhuLkpTT04sIkpTT04iLCEwKSx3byhNYXRoLCJNYXRoIiwhMCk7dmFyIE9tPVRyLGttPWVvLEVtPXFpO0JlKHt0YXJnZXQ6Ik9iamVjdCIsTjohMCxGOmkoKGZ1bmN0aW9uKCl7a20oMSl9KSksaDohRW19LHtnZXRQcm90b3R5cGVPZjpmdW5jdGlvbihyKXtyZXR1cm4ga20oT20ocikpfX0pO3ZhciBUbT1ucy5mb3JFYWNoLHhtPW4sVW09Zm0sTW09c20sSW09bWgoImZvckVhY2giKT9bXS5mb3JFYWNoOmZ1bmN0aW9uKHIpe3JldHVybiBUbSh0aGlzLHIsYXJndW1lbnRzLmxlbmd0aD4xP2FyZ3VtZW50c1sxXTp2b2lkIDApfSxfbT1QdCxMbT1mdW5jdGlvbihyKXtpZihyJiZyLmZvckVhY2ghPT1JbSl0cnl7X20ociwiZm9yRWFjaCIsSW0pfWNhdGNoKHQpe3IuZm9yRWFjaD1JbX19O2Zvcih2YXIgUG0gaW4gVW0pVW1bUG1dJiZMbSh4bVtQbV0mJnhtW1BtXS5wcm90b3R5cGUpO0xtKE1tKTt2YXIgUm09byxObT1EdC5TLENtPVMsRm09cHQuZixCbT1GdW5jdGlvbi5wcm90b3R5cGUsRG09Q20oQm0udG9TdHJpbmcpLEdtPS9mdW5jdGlvblxiKD86XHN8XC9cKltcU1xzXSo/XCpcL3xcL1wvW15cblxyXSpbXG5ccl0rKSooW15ccygvXSopLyxZbT1DbShHbS5leGVjKTtSbSYmIU5tJiZGbShCbSwibmFtZSIse2k6ITAsZ2V0OmZ1bmN0aW9uKCl7dHJ5e3JldHVybiBZbShHbSxEbSh0aGlzKSlbMV19Y2F0Y2gocil7cmV0dXJuIiJ9fX0pO3ZhciBWbT1CZSx6bT1ZYyxXbT1TKFtdLnJldmVyc2UpLCRtPVsxLDJdO1ZtKHt0YXJnZXQ6IkFycmF5IixEOiEwLEY6JG0rIiI9PSRtLnJldmVyc2UoKSsiIn0se3JldmVyc2U6ZnVuY3Rpb24oKXtyZXR1cm4gem0odGhpcykmJih0aGlzLmxlbmd0aD10aGlzLmxlbmd0aCksV20odGhpcyl9fSk7dmFyIEhtPWksS209WCxxbT0kcigic3BlY2llcyIpLEptPWZ1bmN0aW9uKHIpe3JldHVybiBLbT49NTF8fCFIbSgoZnVuY3Rpb24oKXt2YXIgdD1bXTtyZXR1cm4odC5jb25zdHJ1Y3Rvcj17fSlbcW1dPWZ1bmN0aW9uKCl7cmV0dXJue1ByOjF9fSwxIT09dFtyXShCb29sZWFuKS5Qcn0pKX0sWG09QmUsUW09WWMsWm09R2YsclM9Rix0Uz1XbixuUz1KbixlUz1SLGlTPWp1LG9TPSRyLHVTPWNsLGZTPUptKCJzbGljZSIpLGFTPW9TKCJzcGVjaWVzIiksY1M9QXJyYXksc1M9TWF0aC5tYXg7WG0oe3RhcmdldDoiQXJyYXkiLEQ6ITAsRjohZlN9LHtzbGljZTpmdW5jdGlvbihyLHQpe3ZhciBuLGUsaSxvPWVTKHRoaXMpLHU9blMobyksZj10UyhyLHUpLGE9dFModm9pZCAwPT09dD91OnQsdSk7aWYoUW0obykmJihuPW8uY29uc3RydWN0b3IsKFptKG4pJiYobj09PWNTfHxRbShuLnByb3RvdHlwZSkpfHxyUyhuKSYmbnVsbD09PShuPW5bYVNdKSkmJihuPXZvaWQgMCksbj09PWNTfHx2b2lkIDA9PT1uKSlyZXR1cm4gdVMobyxmLGEpO2ZvcihlPW5ldyh2b2lkIDA9PT1uP2NTOm4pKHNTKGEtZiwwKSksaT0wO2E+ZjtmKyssaSsrKWYgaW4gbyYmaVMoZSxpLG9bZl0pO3JldHVybiBlLmxlbmd0aD1pLGV9fSk7dmFyIHZTPW8saFM9YSxsUz1pLGRTPXBpLHlTPXZlLHdTPWMsYlM9VHIscFM9TSxnUz1PYmplY3QuYXNzaWduLG1TPU9iamVjdC5kZWZpbmVQcm9wZXJ0eSxTUz1TKFtdLmNvbmNhdCksQVM9IWdTfHxsUygoZnVuY3Rpb24oKXtpZih2UyYmMSE9PWdTKHtiOjF9LGdTKG1TKHt9LCJhIix7dDohMCxnZXQ6ZnVuY3Rpb24oKXttUyh0aGlzLCJiIix7dmFsdWU6Myx0OiExfSl9fSkse2I6Mn0pKS5iKXJldHVybiEwO3ZhciByPXt9LHQ9e30sbj1TeW1ib2woKSxlPSJhYmNkZWZnaGlqa2xtbm9wcXJzdCI7cmV0dXJuIHJbbl09NyxlLnNwbGl0KCIiKS5mb3JFYWNoKChmdW5jdGlvbihyKXt0W3JdPXJ9KSksNyE9Z1Moe30scilbbl18fGRTKGdTKHt9LHQpKS5qb2luKCIiKSE9ZX0pKT9mdW5jdGlvbihyLHQpe2Zvcih2YXIgbj1iUyhyKSxlPWFyZ3VtZW50cy5sZW5ndGgsaT0xLG89eVMuZix1PXdTLmY7ZT5pOylmb3IodmFyIGYsYT1wUyhhcmd1bWVudHNbaSsrXSksYz1vP1NTKGRTKGEpLG8oYSkpOmRTKGEpLHM9Yy5sZW5ndGgsdj0wO3M+djspZj1jW3YrK10sdlMmJiFoUyh1LGEsZil8fChuW2ZdPWFbZl0pO3JldHVybiBufTpnUztCZSh7dGFyZ2V0OiJPYmplY3QiLE46ITAsXzoyLEY6T2JqZWN0LmFzc2lnbiE9PUFTfSx7YXNzaWduOkFTfSk7Zm9yKHZhciBqUz1bXSxPUz0wOzI1Nj5PUztPUysrKXtmb3IodmFyIGtTPU9TLEVTPTA7OD5FUztFUysrKTEma1M/a1M9a1M+Pj4xXjM5ODgyOTIzODQ6a1M+Pj49MTtqU1tPU109a1N9dmFyIFRTPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gcih0KXshZnVuY3Rpb24ocix0KXtpZighKHIgaW5zdGFuY2VvZiB0KSl0aHJvdyBuZXcgVHlwZUVycm9yKCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24iKX0odGhpcyxyKSx0aGlzLlJyPXR8fC0xfXJldHVybiBmdW5jdGlvbihyLHQpe3QmJmZ1bmN0aW9uKHIsdCl7Zm9yKHZhciBuPTA7bjx0Lmxlbmd0aDtuKyspe3ZhciBlPXRbbl07ZS50PWUudHx8ITEsZS5pPSEwLCJ2YWx1ZSJpbiBlJiYoZS53cml0YWJsZT0hMCksT2JqZWN0LmRlZmluZVByb3BlcnR5KHIsZS5rZXksZSl9fShyLnByb3RvdHlwZSx0KSxPYmplY3QuZGVmaW5lUHJvcGVydHkociwicHJvdG90eXBlIix7d3JpdGFibGU6ITF9KX0ocixbe2tleToiYXBwZW5kIix2YWx1ZTpmdW5jdGlvbihyKXtmb3IodmFyIHQ9MHx0aGlzLlJyLG49MCxlPTB8ci5sZW5ndGg7ZT5uO24rKyl0PXQ+Pj44XmpTWzI1NSYodF5yW25dKV07dGhpcy5Scj10fX0se2tleToiZ2V0Iix2YWx1ZTpmdW5jdGlvbigpe3JldHVybn50aGlzLlJyfX1dKSxyfSgpLHhTPWp0LFVTPU13LE1TPXljLElTPWEsX1M9VHIsTFM9ZnVuY3Rpb24ocix0LG4sZSl7dHJ5e3JldHVybiBlP3QoeFMobilbMF0sblsxXSk6dChuKX1jYXRjaCh0KXtVUyhyLCJ0aHJvdyIsdCl9fSxQUz1JYyxSUz1HZixOUz1KbixDUz1qdSxGUz1UYyxCUz1tYyxEUz1BcnJheTtmdW5jdGlvbiBHUyhyKXtpZigidW5kZWZpbmVkIj09dHlwZW9mIFRleHRFbmNvZGVyKXtyPXVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChyKSk7Zm9yKHZhciB0PW5ldyBVaW50OEFycmF5KHIubGVuZ3RoKSxuPTA7bjx0Lmxlbmd0aDtuKyspdFtuXT1yLmNoYXJDb2RlQXQobik7cmV0dXJuIHR9cmV0dXJuKG5ldyBUZXh0RW5jb2RlcikuZW5jb2RlKHIpfUJlKHt0YXJnZXQ6IkFycmF5IixOOiEwLEY6IXBhKChmdW5jdGlvbihyKXtBcnJheS5mcm9tKHIpfSkpfSx7ZnJvbTpmdW5jdGlvbihyKXt2YXIgdD1fUyhyKSxuPVJTKHRoaXMpLGU9YXJndW1lbnRzLmxlbmd0aCxpPWU+MT9hcmd1bWVudHNbMV06dm9pZCAwLG89dm9pZCAwIT09aTtvJiYoaT1NUyhpLGU+Mj9hcmd1bWVudHNbMl06dm9pZCAwKSk7dmFyIHUsZixhLGMscyx2LGg9QlModCksbD0wO2lmKCFofHx0aGlzPT09RFMmJlBTKGgpKWZvcih1PU5TKHQpLGY9bj9uZXcgdGhpcyh1KTpEUyh1KTt1Pmw7bCsrKXY9bz9pKHRbbF0sbCk6dFtsXSxDUyhmLGwsdik7ZWxzZSBmb3Iocz0oYz1GUyh0LGgpKS5uZXh0LGY9bj9uZXcgdGhpczpbXTshKGE9SVMocyxjKSkuZG9uZTtsKyspdj1vP0xTKGMsaSxbYS52YWx1ZSxsXSwhMCk6YS52YWx1ZSxDUyhmLGwsdik7cmV0dXJuIGYubGVuZ3RoPWwsZn19KTt2YXIgWVM9VHlwZUVycm9yLFZTPWZ1bmN0aW9uKHIpe2lmKHI+OTAwNzE5OTI1NDc0MDk5MSl0aHJvdyBZUygiTWF4aW11bSBhbGxvd2VkIGluZGV4IGV4Y2VlZGVkIik7cmV0dXJuIHJ9LHpTPUJlLFdTPWksJFM9WWMsSFM9RixLUz1UcixxUz1KbixKUz1WUyxYUz1qdSxRUz1LYyxaUz1KbSxyQT1YLHRBPSRyKCJpc0NvbmNhdFNwcmVhZGFibGUiKSxuQT1yQT49NTF8fCFXUygoZnVuY3Rpb24oKXt2YXIgcj1bXTtyZXR1cm4gclt0QV09ITEsci5jb25jYXQoKVswXSE9PXJ9KSksZUE9WlMoImNvbmNhdCIpLGlBPWZ1bmN0aW9uKHIpe2lmKCFIUyhyKSlyZXR1cm4hMTt2YXIgdD1yW3RBXTtyZXR1cm4gdm9pZCAwIT09dD8hIXQ6JFMocil9O3pTKHt0YXJnZXQ6IkFycmF5IixEOiEwLF86MSxGOiFuQXx8IWVBfSx7Y29uY2F0OmZ1bmN0aW9uKHIpe3ZhciB0LG4sZSxpLG8sdT1LUyh0aGlzKSxmPVFTKHUsMCksYT0wO2Zvcih0PS0xLGU9YXJndW1lbnRzLmxlbmd0aDtlPnQ7dCsrKWlmKGlBKG89LTE9PT10P3U6YXJndW1lbnRzW3RdKSlmb3IoaT1xUyhvKSxKUyhhK2kpLG49MDtpPm47bisrLGErKyluIGluIG8mJlhTKGYsYSxvW25dKTtlbHNlIEpTKGErMSksWFMoZixhKyssbyk7cmV0dXJuIGYubGVuZ3RoPWEsZn19KSwoMCxzYS5leHBvcnRzKSgiVWludDMyIiwoZnVuY3Rpb24ocil7cmV0dXJuIGZ1bmN0aW9uKHQsbixlKXtyZXR1cm4gcih0aGlzLHQsbixlKX19KSk7dmFyIG9BPUJlLHVBPVRyLGZBPVduLGFBPUduLGNBPUpuLHNBPVZTLHZBPUtjLGhBPWp1LGxBPWN2LGRBPUptKCJzcGxpY2UiKSx5QT1NYXRoLm1heCx3QT1NYXRoLm1pbjtvQSh7dGFyZ2V0OiJBcnJheSIsRDohMCxGOiFkQX0se3NwbGljZTpmdW5jdGlvbihyLHQpe3ZhciBuLGUsaSxvLHUsZixhPXVBKHRoaXMpLGM9Y0EoYSkscz1mQShyLGMpLHY9YXJndW1lbnRzLmxlbmd0aDtmb3IoMD09PXY/bj1lPTA6MT09PXY/KG49MCxlPWMtcyk6KG49di0yLGU9d0EoeUEoYUEodCksMCksYy1zKSksc0EoYytuLWUpLGk9dkEoYSxlKSxvPTA7ZT5vO28rKykodT1zK28paW4gYSYmaEEoaSxvLGFbdV0pO2lmKGkubGVuZ3RoPWUsZT5uKXtmb3Iobz1zO2MtZT5vO28rKylmPW8rbiwodT1vK2UpaW4gYT9hW2ZdPWFbdV06bEEoYSxmKTtmb3Iobz1jO28+Yy1lK247by0tKWxBKGEsby0xKX1lbHNlIGlmKG4+ZSlmb3Iobz1jLWU7bz5zO28tLSlmPW8rbi0xLCh1PW8rZS0xKWluIGE/YVtmXT1hW3VdOmxBKGEsZik7Zm9yKG89MDtuPm87bysrKWFbbytzXT1hcmd1bWVudHNbbysyXTtyZXR1cm4gYS5sZW5ndGg9Yy1lK24saX19KTt2YXIgYkE9ZnMscEE9VGYuQXJyYXlCdWZmZXI7ZnVuY3Rpb24gZ0Eocix0KXtpZighKHIgaW5zdGFuY2VvZiB0KSl0aHJvdyBuZXcgVHlwZUVycm9yKCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24iKX1mdW5jdGlvbiBtQShyLHQpe2Zvcih2YXIgbj0wO248dC5sZW5ndGg7bisrKXt2YXIgZT10W25dO2UudD1lLnR8fCExLGUuaT0hMCwidmFsdWUiaW4gZSYmKGUud3JpdGFibGU9ITApLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyLGUua2V5LGUpfX1mdW5jdGlvbiBTQShyLHQsbil7cmV0dXJuIHQmJm1BKHIucHJvdG90eXBlLHQpLG4mJm1BKHIsbiksT2JqZWN0LmRlZmluZVByb3BlcnR5KHIsInByb3RvdHlwZSIse3dyaXRhYmxlOiExfSkscn1CZSh7Z2xvYmFsOiEwLGNvbnN0cnVjdG9yOiEwLEY6bi5BcnJheUJ1ZmZlciE9PXBBfSx7QXJyYXlCdWZmZXI6cEF9KSxiQSgiQXJyYXlCdWZmZXIiKTt2YXIgQUE9e2NvbmNhdDpmdW5jdGlvbihyLHQpe2lmKDA9PT1yLmxlbmd0aHx8MD09PXQubGVuZ3RoKXJldHVybiByLmNvbmNhdCh0KTt2YXIgbj1yW3IubGVuZ3RoLTFdLGU9QUEuTnIobik7cmV0dXJuIDMyPT09ZT9yLmNvbmNhdCh0KTpBQS5Dcih0LGUsMHxuLHIuc2xpY2UoMCxyLmxlbmd0aC0xKSl9LEZyOmZ1bmN0aW9uKHIpe3ZhciB0PXIubGVuZ3RoO2lmKDA9PT10KXJldHVybiAwO3ZhciBuPXJbdC0xXTtyZXR1cm4gMzIqKHQtMSkrQUEuTnIobil9LEJyOmZ1bmN0aW9uKHIsdCl7aWYoMzIqci5sZW5ndGg8dClyZXR1cm4gcjt2YXIgbj0ocj1yLnNsaWNlKDAsTWF0aC5jZWlsKHQvMzIpKSkubGVuZ3RoO3JldHVybiB0Jj0zMSxuPjAmJnQmJihyW24tMV09QUEuRHIodCxyW24tMV0mMjE0NzQ4MzY0OD4+dC0xLDEpKSxyfSxEcjpmdW5jdGlvbihyLHQsbil7cmV0dXJuIDMyPT09cj90OihuPzB8dDp0PDwzMi1yKSsxMDk5NTExNjI3Nzc2KnJ9LE5yOmZ1bmN0aW9uKHIpe3JldHVybiBNYXRoLnJvdW5kKHIvMTA5OTUxMTYyNzc3Nil8fDMyfSxDcjpmdW5jdGlvbihyLHQsbixlKXtmb3Iodm9pZCAwPT09ZSYmKGU9W10pO3Q+PTMyO3QtPTMyKWUucHVzaChuKSxuPTA7aWYoMD09PXQpcmV0dXJuIGUuY29uY2F0KHIpO2Zvcih2YXIgaT0wO2k8ci5sZW5ndGg7aSsrKWUucHVzaChufHJbaV0+Pj50KSxuPXJbaV08PDMyLXQ7dmFyIG89ci5sZW5ndGg/cltyLmxlbmd0aC0xXTowLHU9QUEuTnIobyk7cmV0dXJuIGUucHVzaChBQS5Ecih0K3UmMzEsdCt1PjMyP246ZS5wb3AoKSwxKSksZX19LGpBPXskOntHcjpmdW5jdGlvbihyKXtmb3IodmFyIHQsbj1BQS5GcihyKS84LGU9bmV3IFVpbnQ4QXJyYXkobiksaT0wO24+aTtpKyspMD09KDMmaSkmJih0PXJbaS80XSksZVtpXT10Pj4+MjQsdDw8PTg7cmV0dXJuIGV9LFlyOmZ1bmN0aW9uKHIpe3ZhciB0LG49W10sZT0wO2Zvcih0PTA7dDxyLmxlbmd0aDt0KyspZT1lPDw4fHJbdF0sMz09KDMmdCkmJihuLnB1c2goZSksZT0wKTtyZXR1cm4gMyZ0JiZuLnB1c2goQUEuRHIoOCooMyZ0KSxlKSksbn19fSxPQT17VnI6ZnVuY3Rpb24ocil7cj8odGhpcy56cj1yLnpyLnNsaWNlKDApLHRoaXMuV3I9ci5Xci5zbGljZSgwKSx0aGlzLiRyPXIuJHIpOnRoaXMucmVzZXQoKX19O09BLlZyLnByb3RvdHlwZT17YmxvY2tTaXplOjUxMixyZXNldDpmdW5jdGlvbigpe3ZhciByPXRoaXM7cmV0dXJuIHIuenI9dGhpcy5Ici5zbGljZSgwKSxyLldyPVtdLHIuJHI9MCxyfSx1cGRhdGU6ZnVuY3Rpb24ocil7dmFyIHQ9dGhpczsic3RyaW5nIj09dHlwZW9mIHImJihyPWpBLktyLllyKHIpKTt2YXIgbj10LldyPUFBLmNvbmNhdCh0LldyLHIpLGU9dC4kcixpPXQuJHI9ZStBQS5GcihyKTtpZihpPjkwMDcxOTkyNTQ3NDA5OTEpdGhyb3cgRXJyb3IoIkNhbm5vdCBoYXNoIG1vcmUgdGhhbiAyXjUzIC0gMSBiaXRzIik7Zm9yKHZhciBvPW5ldyBVaW50MzJBcnJheShuKSx1PTAsZj10LmJsb2NrU2l6ZStlLSh0LmJsb2NrU2l6ZStlJnQuYmxvY2tTaXplLTEpO2k+PWY7Zis9dC5ibG9ja1NpemUpdC5xcihvLnN1YmFycmF5KDE2KnUsMTYqKHUrMSkpKSx1Kz0xO3JldHVybiBuLnNwbGljZSgwLDE2KnUpLHR9LEpyOmZ1bmN0aW9uKCl7Zm9yKHZhciByPXRoaXMsdD1yLldyLG49ci56cixlPSh0PUFBLmNvbmNhdCh0LFtBQS5EcigxLDEpXSkpLmxlbmd0aCsyOzE1JmU7ZSsrKXQucHVzaCgwKTtmb3IodC5wdXNoKE1hdGguZmxvb3Ioci4kci80Mjk0OTY3Mjk2KSksdC5wdXNoKDB8ci4kcik7dC5sZW5ndGg7KXIucXIodC5zcGxpY2UoMCwxNikpO3JldHVybiByLnJlc2V0KCksbn0sSHI6WzE3MzI1ODQxOTMsNDAyMzIzMzQxNywyNTYyMzgzMTAyLDI3MTczMzg3OCwzMjg1Mzc3NTIwXSxYcjpbMTUxODUwMDI0OSwxODU5Nzc1MzkzLDI0MDA5NTk3MDgsMzM5NTQ2OTc4Ml0sUXI6ZnVuY3Rpb24ocix0LG4sZSl7cmV0dXJuIHI+MTk/cj4zOT9yPjU5P3I+Nzk/dm9pZCAwOnRebl5lOnQmbnx0JmV8biZlOnRebl5lOnQmbnx+dCZlfSxacjpmdW5jdGlvbihyLHQpe3JldHVybiB0PDxyfHQ+Pj4zMi1yfSxxcjpmdW5jdGlvbihyKXtmb3IodmFyIHQ9dGhpcyxuPXQuenIsZT1BcnJheSg4MCksaT0wOzE2Pmk7aSsrKWVbaV09cltpXTtmb3IodmFyIG89blswXSx1PW5bMV0sZj1uWzJdLGE9blszXSxjPW5bNF0scz0wOzc5Pj1zO3MrKyl7MTY+c3x8KGVbc109dC5acigxLGVbcy0zXV5lW3MtOF1eZVtzLTE0XV5lW3MtMTZdKSk7dmFyIHY9dC5acig1LG8pK3QuUXIocyx1LGYsYSkrYytlW3NdK3QuWHJbTWF0aC5mbG9vcihzLzIwKV18MDtjPWEsYT1mLGY9dC5acigzMCx1KSx1PW8sbz12fW5bMF09blswXStvfDAsblsxXT1uWzFdK3V8MCxuWzJdPW5bMl0rZnwwLG5bM109blszXSthfDAsbls0XT1uWzRdK2N8MH19O3ZhciBrQT17fTtrQS5ydD1mdW5jdGlvbigpe2Z1bmN0aW9uIHIodCl7Z0EodGhpcyxyKTt2YXIgbj10aGlzO24udHQ9W1tbXSxbXSxbXSxbXSxbXV0sW1tdLFtdLFtdLFtdLFtdXV0sbi50dFswXVswXVswXXx8bi5udCgpO3ZhciBlLGksbyx1PW4udHRbMF1bNF0sZj1uLnR0WzFdLGE9dC5sZW5ndGgsYz0xO2lmKDQhPT1hJiY2IT09YSYmOCE9PWEpdGhyb3cgRXJyb3IoImludmFsaWQgYWVzIGtleSBzaXplIik7Zm9yKG4uWHI9W2k9dC5zbGljZSgwKSxvPVtdXSxlPWE7NCphKzI4PmU7ZSsrKXt2YXIgcz1pW2UtMV07KGUlYT09MHx8OD09PWEmJmUlYT09NCkmJihzPXVbcz4+PjI0XTw8MjRedVtzPj4xNiYyNTVdPDwxNl51W3M+PjgmMjU1XTw8OF51WzI1NSZzXSxlJWE9PTAmJihzPXM8PDhecz4+PjI0XmM8PDI0LGM9Yzw8MV4yODMqKGM+PjcpKSksaVtlXT1pW2UtYV1ec31mb3IodmFyIHY9MDtlO3YrKyxlLS0pe3ZhciBoPWlbMyZ2P2U6ZS00XTtvW3ZdPTQ+PWV8fDQ+dj9oOmZbMF1bdVtoPj4+MjRdXV5mWzFdW3VbaD4+MTYmMjU1XV1eZlsyXVt1W2g+PjgmMjU1XV1eZlszXVt1WzI1NSZoXV19fXJldHVybiBTQShyLFt7a2V5OiJlbmNyeXB0Iix2YWx1ZTpmdW5jdGlvbihyKXtyZXR1cm4gdGhpcy5ldChyLDApfX0se2tleToiZGVjcnlwdCIsdmFsdWU6ZnVuY3Rpb24ocil7cmV0dXJuIHRoaXMuZXQociwxKX19LHtrZXk6Il9wcmVjb21wdXRlIix2YWx1ZTpmdW5jdGlvbigpe2Zvcih2YXIgcix0LG4sZT10aGlzLnR0WzBdLGk9dGhpcy50dFsxXSxvPWVbNF0sdT1pWzRdLGY9W10sYT1bXSxjPTA7MjU2PmM7YysrKWFbKGZbY109Yzw8MV4yODMqKGM+PjcpKV5jXT1jO2Zvcih2YXIgcz1yPTA7IW9bc107c149dHx8MSxyPWFbcl18fDEpe3ZhciB2PXJecjw8MV5yPDwyXnI8PDNecjw8NDt2PXY+PjheMjU1JnZeOTksb1tzXT12LHVbdl09cztmb3IodmFyIGg9MTY4NDMwMDkqZltuPWZbdD1mW3NdXV1eNjU1Mzcqbl4yNTcqdF4xNjg0MzAwOCpzLGw9MjU3KmZbdl1eMTY4NDMwMDgqdixkPTA7ND5kO2QrKyllW2RdW3NdPWw9bDw8MjRebD4+PjgsaVtkXVt2XT1oPWg8PDI0Xmg+Pj44fWZvcih2YXIgeT0wOzU+eTt5KyspZVt5XT1lW3ldLnNsaWNlKDApLGlbeV09aVt5XS5zbGljZSgwKX19LHtrZXk6Il9jcnlwdCIsdmFsdWU6ZnVuY3Rpb24ocix0KXtpZig0IT09ci5sZW5ndGgpdGhyb3cgRXJyb3IoImludmFsaWQgYWVzIGJsb2NrIHNpemUiKTtmb3IodmFyIG4sZSxpLG89dGhpcy5Yclt0XSx1PW8ubGVuZ3RoLzQtMixmPVswLDAsMCwwXSxhPXRoaXMudHRbdF0sYz1hWzBdLHM9YVsxXSx2PWFbMl0saD1hWzNdLGw9YVs0XSxkPXJbMF1eb1swXSx5PXJbdD8zOjFdXm9bMV0sdz1yWzJdXm9bMl0sYj1yW3Q/MTozXV5vWzNdLHA9NCxnPTA7dT5nO2crKyluPWNbZD4+PjI0XV5zW3k+PjE2JjI1NV1edlt3Pj44JjI1NV1eaFsyNTUmYl1eb1twXSxlPWNbeT4+PjI0XV5zW3c+PjE2JjI1NV1edltiPj44JjI1NV1eaFsyNTUmZF1eb1twKzFdLGk9Y1t3Pj4+MjRdXnNbYj4+MTYmMjU1XV52W2Q+PjgmMjU1XV5oWzI1NSZ5XV5vW3ArMl0sYj1jW2I+Pj4yNF1ec1tkPj4xNiYyNTVdXnZbeT4+OCYyNTVdXmhbMjU1JnddXm9bcCszXSxwKz00LGQ9bix5PWUsdz1pO2Zvcih2YXIgbT0wOzQ+bTttKyspZlt0PzMmLW06bV09bFtkPj4+MjRdPDwyNF5sW3k+PjE2JjI1NV08PDE2Xmxbdz4+OCYyNTVdPDw4XmxbMjU1JmJdXm9bcCsrXSxuPWQsZD15LHk9dyx3PWIsYj1uO3JldHVybiBmfX1dKSxyfSgpO3ZhciBFQT17fTtFQS5pdD1mdW5jdGlvbigpe2Z1bmN0aW9uIHIodCxuKXtnQSh0aGlzLHIpLHRoaXMub3Q9dCx0aGlzLnV0PW4sdGhpcy5mdD1ufXJldHVybiBTQShyLFt7a2V5OiJyZXNldCIsdmFsdWU6ZnVuY3Rpb24oKXt0aGlzLmZ0PXRoaXMudXR9fSx7a2V5OiJ1cGRhdGUiLHZhbHVlOmZ1bmN0aW9uKHIpe3JldHVybiB0aGlzLmN0KHRoaXMub3Qscix0aGlzLmZ0KX19LHtrZXk6ImluY1dvcmQiLHZhbHVlOmZ1bmN0aW9uKHIpe2lmKDI1NT09KHI+PjI0JjI1NSkpe3ZhciB0PXI+PjE2JjI1NSxuPXI+PjgmMjU1LGU9MjU1JnI7MjU1PT09dD8odD0wLDI1NT09PW4/KG49MCwyNTU9PT1lP2U9MDorK2UpOisrbik6Kyt0LHI9MCxyKz10PDwxNixyKz1uPDw4LHIrPWV9ZWxzZSByKz0xPDwyNDtyZXR1cm4gcn19LHtrZXk6ImluY0NvdW50ZXIiLHZhbHVlOmZ1bmN0aW9uKHIpezA9PT0oclswXT10aGlzLnN0KHJbMF0pKSYmKHJbMV09dGhpcy5zdChyWzFdKSl9fSx7a2V5OiJjYWxjdWxhdGUiLHZhbHVlOmZ1bmN0aW9uKHIsdCxuKXt2YXIgZTtpZighKGU9dC5sZW5ndGgpKXJldHVybltdO2Zvcih2YXIgaT1BQS5Gcih0KSxvPTA7ZT5vO28rPTQpe3RoaXMudnQobik7dmFyIHU9ci5lbmNyeXB0KG4pO3Rbb11ePXVbMF0sdFtvKzFdXj11WzFdLHRbbysyXV49dVsyXSx0W28rM11ePXVbM119cmV0dXJuIEFBLkJyKHQsaSl9fV0pLHJ9KCk7dmFyIFRBPXtpbXBvcnRLZXk6ZnVuY3Rpb24ocil7cmV0dXJuIG5ldyBUQS5odChqQS4kLllyKHIpKX0sbHQ6ZnVuY3Rpb24ocix0LG4sZSl7aWYobj1ufHwxZTQsMD5lfHwwPm4pdGhyb3cgRXJyb3IoImludmFsaWQgcGFyYW1zIHRvIHBia2RmMiIpO3ZhciBpLG8sdSxmLGEsYz0xKyhlPj41KTw8MixzPW5ldyBBcnJheUJ1ZmZlcihjKSx2PW5ldyBEYXRhVmlldyhzKSxoPTAsbD1BQTtmb3IodD1qQS4kLllyKHQpLGE9MTsoY3x8MSk+aDthKyspe2ZvcihpPW89ci5lbmNyeXB0KGwuY29uY2F0KHQsW2FdKSksdT0xO24+dTt1KyspZm9yKG89ci5lbmNyeXB0KG8pLGY9MDtmPG8ubGVuZ3RoO2YrKylpW2ZdXj1vW2ZdO2Zvcih1PTA7KGN8fDEpPmgmJnU8aS5sZW5ndGg7dSsrKXYuc2V0SW50MzIoaCxpW3VdKSxoKz00fXJldHVybiBzLnNsaWNlKDAsZS84KX19O2Z1bmN0aW9uIHhBKHIpe3JldHVybiB4QT0iZnVuY3Rpb24iPT10eXBlb2YgU3ltYm9sJiYic3ltYm9sIj09dHlwZW9mIFN5bWJvbC5pdGVyYXRvcj9mdW5jdGlvbihyKXtyZXR1cm4gdHlwZW9mIHJ9OmZ1bmN0aW9uKHIpe3JldHVybiByJiYiZnVuY3Rpb24iPT10eXBlb2YgU3ltYm9sJiZyLmNvbnN0cnVjdG9yPT09U3ltYm9sJiZyIT09U3ltYm9sLnByb3RvdHlwZT8ic3ltYm9sIjp0eXBlb2Ygcn0seEEocil9ZnVuY3Rpb24gVUEoKXsvKiEgcmVnZW5lcmF0b3ItcnVudGltZSAtLSBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy4gLS0gbGljZW5zZSAoTUlUKTogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2Jsb2IvbWFpbi9MSUNFTlNFICovVUE9ZnVuY3Rpb24oKXtyZXR1cm4gcn07dmFyIHI9e30sdD1PYmplY3QucHJvdG90eXBlLG49dC5oYXNPd25Qcm9wZXJ0eSxlPSJmdW5jdGlvbiI9PXR5cGVvZiBTeW1ib2w/U3ltYm9sOnt9LGk9ZS5pdGVyYXRvcnx8IkBAaXRlcmF0b3IiLG89ZS5hc3luY0l0ZXJhdG9yfHwiQEBhc3luY0l0ZXJhdG9yIix1PWUudG9TdHJpbmdUYWd8fCJAQHRvU3RyaW5nVGFnIjtmdW5jdGlvbiBmKHIsdCxuKXtyZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHIsdCx7dmFsdWU6bix0OiEwLGk6ITAsd3JpdGFibGU6ITB9KSxyW3RdfXRyeXtmKHt9LCIiKX1jYXRjaChyKXtmPWZ1bmN0aW9uKHIsdCxuKXtyZXR1cm4gclt0XT1ufX1mdW5jdGlvbiBhKHIsdCxuLGUpe3ZhciBpPXQmJnQucHJvdG90eXBlIGluc3RhbmNlb2Ygdj90OnYsbz1PYmplY3QuY3JlYXRlKGkucHJvdG90eXBlKSx1PW5ldyBqKGV8fFtdKTtyZXR1cm4gby5kdD1mdW5jdGlvbihyLHQsbil7dmFyIGU9InN1c3BlbmRlZFN0YXJ0IjtyZXR1cm4gZnVuY3Rpb24oaSxvKXtpZigiZXhlY3V0aW5nIj09PWUpdGhyb3cgRXJyb3IoIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmciKTtpZigiY29tcGxldGVkIj09PWUpe2lmKCJ0aHJvdyI9PT1pKXRocm93IG87cmV0dXJue3ZhbHVlOnZvaWQgMCxkb25lOiEwfX1mb3Iobi5tZXRob2Q9aSxuLnl0PW87Oyl7dmFyIHU9bi53dDtpZih1KXt2YXIgZj1tKHUsbik7aWYoZil7aWYoZj09PXMpY29udGludWU7cmV0dXJuIGZ9fWlmKCJuZXh0Ij09PW4ubWV0aG9kKW4uYnQ9bi5ndD1uLnl0O2Vsc2UgaWYoInRocm93Ij09PW4ubWV0aG9kKXtpZigic3VzcGVuZGVkU3RhcnQiPT09ZSl0aHJvdyBlPSJjb21wbGV0ZWQiLG4ueXQ7bi5TdChuLnl0KX1lbHNlInJldHVybiI9PT1uLm1ldGhvZCYmbi5BdCgicmV0dXJuIixuLnl0KTtlPSJleGVjdXRpbmciO3ZhciBhPWMocix0LG4pO2lmKCJub3JtYWwiPT09YS50eXBlKXtpZihlPW4uZG9uZT8iY29tcGxldGVkIjoic3VzcGVuZGVkWWllbGQiLGEueXQ9PT1zKWNvbnRpbnVlO3JldHVybnt2YWx1ZTphLnl0LGRvbmU6bi5kb25lfX0idGhyb3ciPT09YS50eXBlJiYoZT0iY29tcGxldGVkIixuLm1ldGhvZD0idGhyb3ciLG4ueXQ9YS55dCl9fX0ocixuLHUpLG99ZnVuY3Rpb24gYyhyLHQsbil7dHJ5e3JldHVybnt0eXBlOiJub3JtYWwiLHl0OnIuY2FsbCh0LG4pfX1jYXRjaChyKXtyZXR1cm57dHlwZToidGhyb3ciLHl0OnJ9fX1yLndyYXA9YTt2YXIgcz17fTtmdW5jdGlvbiB2KCl7fWZ1bmN0aW9uIGgoKXt9ZnVuY3Rpb24gbCgpe312YXIgZD17fTtmKGQsaSwoZnVuY3Rpb24oKXtyZXR1cm4gdGhpc30pKTt2YXIgeT1PYmplY3QuZ2V0UHJvdG90eXBlT2Ysdz15JiZ5KHkoTyhbXSkpKTt3JiZ3IT09dCYmbi5jYWxsKHcsaSkmJihkPXcpO3ZhciBiPWwucHJvdG90eXBlPXYucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoZCk7ZnVuY3Rpb24gcChyKXtbIm5leHQiLCJ0aHJvdyIsInJldHVybiJdLmZvckVhY2goKGZ1bmN0aW9uKHQpe2Yocix0LChmdW5jdGlvbihyKXtyZXR1cm4gdGhpcy5kdCh0LHIpfSkpfSkpfWZ1bmN0aW9uIGcocix0KXtmdW5jdGlvbiBlKGksbyx1LGYpe3ZhciBhPWMocltpXSxyLG8pO2lmKCJ0aHJvdyIhPT1hLnR5cGUpe3ZhciBzPWEueXQsdj1zLnZhbHVlO3JldHVybiB2JiYib2JqZWN0Ij09eEEodikmJm4uY2FsbCh2LCJfX2F3YWl0Iik/dC5yZXNvbHZlKHYuanQpLnRoZW4oKGZ1bmN0aW9uKHIpe2UoIm5leHQiLHIsdSxmKX0pLChmdW5jdGlvbihyKXtlKCJ0aHJvdyIscix1LGYpfSkpOnQucmVzb2x2ZSh2KS50aGVuKChmdW5jdGlvbihyKXtzLnZhbHVlPXIsdShzKX0pLChmdW5jdGlvbihyKXtyZXR1cm4gZSgidGhyb3ciLHIsdSxmKX0pKX1mKGEueXQpfXZhciBpO3RoaXMuZHQ9ZnVuY3Rpb24ocixuKXtmdW5jdGlvbiBvKCl7cmV0dXJuIG5ldyB0KChmdW5jdGlvbih0LGkpe2UocixuLHQsaSl9KSl9cmV0dXJuIGk9aT9pLnRoZW4obyxvKTpvKCl9fWZ1bmN0aW9uIG0ocix0KXt2YXIgbj1yLml0ZXJhdG9yW3QubWV0aG9kXTtpZih2b2lkIDA9PT1uKXtpZih0Lnd0PW51bGwsInRocm93Ij09PXQubWV0aG9kKXtpZihyLml0ZXJhdG9yLkgmJih0Lm1ldGhvZD0icmV0dXJuIix0Lnl0PXZvaWQgMCxtKHIsdCksInRocm93Ij09PXQubWV0aG9kKSlyZXR1cm4gczt0Lm1ldGhvZD0idGhyb3ciLHQueXQ9bmV3IFR5cGVFcnJvcigiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAndGhyb3cnIG1ldGhvZCIpfXJldHVybiBzfXZhciBlPWMobixyLml0ZXJhdG9yLHQueXQpO2lmKCJ0aHJvdyI9PT1lLnR5cGUpcmV0dXJuIHQubWV0aG9kPSJ0aHJvdyIsdC55dD1lLnl0LHQud3Q9bnVsbCxzO3ZhciBpPWUueXQ7cmV0dXJuIGk/aS5kb25lPyh0W3IuT3RdPWkudmFsdWUsdC5uZXh0PXIua3QsInJldHVybiIhPT10Lm1ldGhvZCYmKHQubWV0aG9kPSJuZXh0Iix0Lnl0PXZvaWQgMCksdC53dD1udWxsLHMpOmk6KHQubWV0aG9kPSJ0aHJvdyIsdC55dD1uZXcgVHlwZUVycm9yKCJpdGVyYXRvciByZXN1bHQgaXMgbm90IGFuIG9iamVjdCIpLHQud3Q9bnVsbCxzKX1mdW5jdGlvbiBTKHIpe3ZhciB0PXtFdDpyWzBdfTsxIGluIHImJih0LlR0PXJbMV0pLDIgaW4gciYmKHQueHQ9clsyXSx0LlV0PXJbM10pLHRoaXMuTXQucHVzaCh0KX1mdW5jdGlvbiBBKHIpe3ZhciB0PXIuSXR8fHt9O3QudHlwZT0ibm9ybWFsIixkZWxldGUgdC55dCxyLkl0PXR9ZnVuY3Rpb24gaihyKXt0aGlzLk10PVt7RXQ6InJvb3QifV0sci5mb3JFYWNoKFMsdGhpcyksdGhpcy5yZXNldCghMCl9ZnVuY3Rpb24gTyhyKXtpZihyKXt2YXIgdD1yW2ldO2lmKHQpcmV0dXJuIHQuY2FsbChyKTtpZigiZnVuY3Rpb24iPT10eXBlb2Ygci5uZXh0KXJldHVybiByO2lmKCFpc05hTihyLmxlbmd0aCkpe3ZhciBlPS0xLG89ZnVuY3Rpb24gdCgpe2Zvcig7KytlPHIubGVuZ3RoOylpZihuLmNhbGwocixlKSlyZXR1cm4gdC52YWx1ZT1yW2VdLHQuZG9uZT0hMSx0O3JldHVybiB0LnZhbHVlPXZvaWQgMCx0LmRvbmU9ITAsdH07cmV0dXJuIG8ubmV4dD1vfX1yZXR1cm57bmV4dDprfX1mdW5jdGlvbiBrKCl7cmV0dXJue3ZhbHVlOnZvaWQgMCxkb25lOiEwfX1yZXR1cm4gaC5wcm90b3R5cGU9bCxmKGIsImNvbnN0cnVjdG9yIixsKSxmKGwsImNvbnN0cnVjdG9yIixoKSxoLmRpc3BsYXlOYW1lPWYobCx1LCJHZW5lcmF0b3JGdW5jdGlvbiIpLHIuX3Q9ZnVuY3Rpb24ocil7dmFyIHQ9ImZ1bmN0aW9uIj09dHlwZW9mIHImJnIuY29uc3RydWN0b3I7cmV0dXJuISF0JiYodD09PWh8fCJHZW5lcmF0b3JGdW5jdGlvbiI9PT0odC5kaXNwbGF5TmFtZXx8dC5uYW1lKSl9LHIubWFyaz1mdW5jdGlvbihyKXtyZXR1cm4gT2JqZWN0LnNldFByb3RvdHlwZU9mP09iamVjdC5zZXRQcm90b3R5cGVPZihyLGwpOihyLl9fcHJvdG9fXz1sLGYocix1LCJHZW5lcmF0b3JGdW5jdGlvbiIpKSxyLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKGIpLHJ9LHIuTHQ9ZnVuY3Rpb24ocil7cmV0dXJue2p0OnJ9fSxwKGcucHJvdG90eXBlKSxmKGcucHJvdG90eXBlLG8sKGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXN9KSksci5QdD1nLHIuYXN5bmM9ZnVuY3Rpb24odCxuLGUsaSxvKXt2b2lkIDA9PT1vJiYobz1Qcm9taXNlKTt2YXIgdT1uZXcgZyhhKHQsbixlLGkpLG8pO3JldHVybiByLl90KG4pP3U6dS5uZXh0KCkudGhlbigoZnVuY3Rpb24ocil7cmV0dXJuIHIuZG9uZT9yLnZhbHVlOnUubmV4dCgpfSkpfSxwKGIpLGYoYix1LCJHZW5lcmF0b3IiKSxmKGIsaSwoZnVuY3Rpb24oKXtyZXR1cm4gdGhpc30pKSxmKGIsInRvU3RyaW5nIiwoZnVuY3Rpb24oKXtyZXR1cm4iW29iamVjdCBHZW5lcmF0b3JdIn0pKSxyLmtleXM9ZnVuY3Rpb24ocil7dmFyIHQ9W107Zm9yKHZhciBuIGluIHIpdC5wdXNoKG4pO3JldHVybiB0LnJldmVyc2UoKSxmdW5jdGlvbiBuKCl7Zm9yKDt0Lmxlbmd0aDspe3ZhciBlPXQucG9wKCk7aWYoZSBpbiByKXJldHVybiBuLnZhbHVlPWUsbi5kb25lPSExLG59cmV0dXJuIG4uZG9uZT0hMCxufX0sci52YWx1ZXM9TyxqLnByb3RvdHlwZT17Y29uc3RydWN0b3I6aixyZXNldDpmdW5jdGlvbihyKXtpZih0aGlzLlJ0PTAsdGhpcy5uZXh0PTAsdGhpcy5idD10aGlzLmd0PXZvaWQgMCx0aGlzLmRvbmU9ITEsdGhpcy53dD1udWxsLHRoaXMubWV0aG9kPSJuZXh0Iix0aGlzLnl0PXZvaWQgMCx0aGlzLk10LmZvckVhY2goQSksIXIpZm9yKHZhciB0IGluIHRoaXMpInQiPT09dC5jaGFyQXQoMCkmJm4uY2FsbCh0aGlzLHQpJiYhaXNOYU4oK3Quc2xpY2UoMSkpJiYodGhpc1t0XT12b2lkIDApfSxzdG9wOmZ1bmN0aW9uKCl7dGhpcy5kb25lPSEwO3ZhciByPXRoaXMuTXRbMF0uSXQ7aWYoInRocm93Ij09PXIudHlwZSl0aHJvdyByLnl0O3JldHVybiB0aGlzLk50fSxTdDpmdW5jdGlvbihyKXtpZih0aGlzLmRvbmUpdGhyb3cgcjt2YXIgdD10aGlzO2Z1bmN0aW9uIGUobixlKXtyZXR1cm4gdS50eXBlPSJ0aHJvdyIsdS55dD1yLHQubmV4dD1uLGUmJih0Lm1ldGhvZD0ibmV4dCIsdC55dD12b2lkIDApLCEhZX1mb3IodmFyIGk9dGhpcy5NdC5sZW5ndGgtMTtpPj0wOy0taSl7dmFyIG89dGhpcy5NdFtpXSx1PW8uSXQ7aWYoInJvb3QiPT09by5FdClyZXR1cm4gZSgiZW5kIik7aWYoby5FdDw9dGhpcy5SdCl7dmFyIGY9bi5jYWxsKG8sImNhdGNoTG9jIiksYT1uLmNhbGwobywiZmluYWxseUxvYyIpO2lmKGYmJmEpe2lmKHRoaXMuUnQ8by5UdClyZXR1cm4gZShvLlR0LCEwKTtpZih0aGlzLlJ0PG8ueHQpcmV0dXJuIGUoby54dCl9ZWxzZSBpZihmKXtpZih0aGlzLlJ0PG8uVHQpcmV0dXJuIGUoby5UdCwhMCl9ZWxzZXtpZighYSl0aHJvdyBFcnJvcigidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHkiKTtpZih0aGlzLlJ0PG8ueHQpcmV0dXJuIGUoby54dCl9fX19LEF0OmZ1bmN0aW9uKHIsdCl7Zm9yKHZhciBlPXRoaXMuTXQubGVuZ3RoLTE7ZT49MDstLWUpe3ZhciBpPXRoaXMuTXRbZV07aWYoaS5FdDw9dGhpcy5SdCYmbi5jYWxsKGksImZpbmFsbHlMb2MiKSYmdGhpcy5SdDxpLnh0KXt2YXIgbz1pO2JyZWFrfX1vJiYoImJyZWFrIj09PXJ8fCJjb250aW51ZSI9PT1yKSYmby5FdDw9dCYmdDw9by54dCYmKG89bnVsbCk7dmFyIHU9bz9vLkl0Ont9O3JldHVybiB1LnR5cGU9cix1Lnl0PXQsbz8odGhpcy5tZXRob2Q9Im5leHQiLHRoaXMubmV4dD1vLnh0LHMpOnRoaXMuY29tcGxldGUodSl9LGNvbXBsZXRlOmZ1bmN0aW9uKHIsdCl7aWYoInRocm93Ij09PXIudHlwZSl0aHJvdyByLnl0O3JldHVybiJicmVhayI9PT1yLnR5cGV8fCJjb250aW51ZSI9PT1yLnR5cGU/dGhpcy5uZXh0PXIueXQ6InJldHVybiI9PT1yLnR5cGU/KHRoaXMuTnQ9dGhpcy55dD1yLnl0LHRoaXMubWV0aG9kPSJyZXR1cm4iLHRoaXMubmV4dD0iZW5kIik6Im5vcm1hbCI9PT1yLnR5cGUmJnQmJih0aGlzLm5leHQ9dCksc30sZmluaXNoOmZ1bmN0aW9uKHIpe2Zvcih2YXIgdD10aGlzLk10Lmxlbmd0aC0xO3Q+PTA7LS10KXt2YXIgbj10aGlzLk10W3RdO2lmKG4ueHQ9PT1yKXJldHVybiB0aGlzLmNvbXBsZXRlKG4uSXQsbi5VdCksQShuKSxzfX0sY2F0Y2g6ZnVuY3Rpb24ocil7Zm9yKHZhciB0PXRoaXMuTXQubGVuZ3RoLTE7dD49MDstLXQpe3ZhciBuPXRoaXMuTXRbdF07aWYobi5FdD09PXIpe3ZhciBlPW4uSXQ7aWYoInRocm93Ij09PWUudHlwZSl7dmFyIGk9ZS55dDtBKG4pfXJldHVybiBpfX10aHJvdyBFcnJvcigiaWxsZWdhbCBjYXRjaCBhdHRlbXB0Iil9LEN0OmZ1bmN0aW9uKHIsdCxuKXtyZXR1cm4gdGhpcy53dD17aXRlcmF0b3I6TyhyKSxPdDp0LGt0Om59LCJuZXh0Ij09PXRoaXMubWV0aG9kJiYodGhpcy55dD12b2lkIDApLHN9fSxyfWZ1bmN0aW9uIE1BKHIsdCxuLGUsaSxvLHUpe3RyeXt2YXIgZj1yW29dKHUpLGE9Zi52YWx1ZX1jYXRjaChyKXtyZXR1cm4gdm9pZCBuKHIpfWYuZG9uZT90KGEpOlByb21pc2UucmVzb2x2ZShhKS50aGVuKGUsaSl9ZnVuY3Rpb24gSUEocil7cmV0dXJuIGZ1bmN0aW9uKCl7dmFyIHQ9dGhpcyxuPWFyZ3VtZW50cztyZXR1cm4gbmV3IFByb21pc2UoKGZ1bmN0aW9uKGUsaSl7dmFyIG89ci5hcHBseSh0LG4pO2Z1bmN0aW9uIHUocil7TUEobyxlLGksdSxmLCJuZXh0IixyKX1mdW5jdGlvbiBmKHIpe01BKG8sZSxpLHUsZiwidGhyb3ciLHIpfXUodm9pZCAwKX0pKX19ZnVuY3Rpb24gX0Eocix0KXtpZighKHIgaW5zdGFuY2VvZiB0KSl0aHJvdyBuZXcgVHlwZUVycm9yKCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24iKX1mdW5jdGlvbiBMQShyLHQpe2Zvcih2YXIgbj0wO248dC5sZW5ndGg7bisrKXt2YXIgZT10W25dO2UudD1lLnR8fCExLGUuaT0hMCwidmFsdWUiaW4gZSYmKGUud3JpdGFibGU9ITApLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyLGUua2V5LGUpfX1mdW5jdGlvbiBQQShyLHQsbil7cmV0dXJuIHQmJkxBKHIucHJvdG90eXBlLHQpLG4mJkxBKHIsbiksT2JqZWN0LmRlZmluZVByb3BlcnR5KHIsInByb3RvdHlwZSIse3dyaXRhYmxlOiExfSkscn1UQS5odD1mdW5jdGlvbigpe2Z1bmN0aW9uIHIodCl7Z0EodGhpcyxyKTt2YXIgbj10aGlzLGU9bi5GdD1PQS5WcixpPVtbXSxbXV0sbz1lLnByb3RvdHlwZS5ibG9ja1NpemUvMzI7bi5CdD1bbmV3IGUsbmV3IGVdLHQubGVuZ3RoPm8mJih0PWUuaGFzaCh0KSk7Zm9yKHZhciB1PTA7bz51O3UrKylpWzBdW3VdPTkwOTUyMjQ4Nl50W3VdLGlbMV1bdV09MTU0OTU1NjgyOF50W3VdO24uQnRbMF0udXBkYXRlKGlbMF0pLG4uQnRbMV0udXBkYXRlKGlbMV0pLG4uRHQ9bmV3IGUobi5CdFswXSl9cmV0dXJuIFNBKHIsW3trZXk6InJlc2V0Iix2YWx1ZTpmdW5jdGlvbigpe3ZhciByPXRoaXM7ci5EdD1uZXcgci5GdChyLkJ0WzBdKSxyLkd0PSExfX0se2tleToidXBkYXRlIix2YWx1ZTpmdW5jdGlvbihyKXt0aGlzLkd0PSEwLHRoaXMuRHQudXBkYXRlKHIpfX0se2tleToiZGlnZXN0Iix2YWx1ZTpmdW5jdGlvbigpe3ZhciByPXRoaXMsdD1yLkR0LkpyKCksbj1uZXcgci5GdChyLkJ0WzFdKS51cGRhdGUodCkuSnIoKTtyZXR1cm4gci5yZXNldCgpLG59fSx7a2V5OiJlbmNyeXB0Iix2YWx1ZTpmdW5jdGlvbihyKXtpZih0aGlzLkd0KXRocm93IEVycm9yKCJlbmNyeXB0IG9uIGFscmVhZHkgdXBkYXRlZCBobWFjIGNhbGxlZCEiKTtyZXR1cm4gdGhpcy51cGRhdGUociksdGhpcy5kaWdlc3Qocil9fV0pLHJ9KCk7dmFyIFJBPXtuYW1lOiJQQktERjIifSxOQT1PYmplY3QuYXNzaWduKHtoYXNoOntuYW1lOiJITUFDIn19LFJBKSxDQT1PYmplY3QuYXNzaWduKHtpdGVyYXRpb25zOjFlMyxoYXNoOntuYW1lOiJTSEEtMSJ9fSxSQSksRkE9WyJkZXJpdmVCaXRzIl0sQkE9WzgsMTIsMTZdLERBPVsxNiwyNCwzMl0sR0E9WzAsMCwwLDBdLFlBPSJ1bmRlZmluZWQiIT10eXBlb2YgY3J5cHRvLFZBPVlBJiZ2b2lkIDAhPT1jcnlwdG8uc3VidGxlLHpBPWpBLiQsV0E9a0EucnQsJEE9RUEuaXQsSEE9VEEuaHQsS0E9ZnVuY3Rpb24oKXtmdW5jdGlvbiByKHQsbixlKXtfQSh0aGlzLHIpLE9iamVjdC5hc3NpZ24odGhpcyx7cGFzc3dvcmQ6dCxzaWduZWQ6bixZdDplLTEsVnQ6bmV3IFVpbnQ4QXJyYXkoMCl9KX12YXIgdDtyZXR1cm4gUEEocixbe2tleToiYXBwZW5kIix2YWx1ZToodD1JQShVQSgpLm1hcmsoKGZ1bmN0aW9uIHIodCl7dmFyIG4sZSxpO3JldHVybiBVQSgpLndyYXAoKGZ1bmN0aW9uKHIpe2Zvcig7Oylzd2l0Y2goci5SdD1yLm5leHQpe2Nhc2UgMDppZighKG49dGhpcykucGFzc3dvcmQpe3IubmV4dD05O2JyZWFrfXJldHVybiBlPWNqKHQsMCxCQVtuLll0XSsyKSxyLm5leHQ9NSxYQShuLGUsbi5wYXNzd29yZCk7Y2FzZSA1Om4ucGFzc3dvcmQ9bnVsbCxuLnp0PW5ldyAkQShuZXcgV0Eobi5rZXlzLmtleSksQXJyYXkuZnJvbShHQSkpLG4uV3Q9bmV3IEhBKG4ua2V5cy4kdCksdD1jaih0LEJBW24uWXRdKzIpO2Nhc2UgOTpyZXR1cm4gaT1uZXcgVWludDhBcnJheSh0Lmxlbmd0aC0xMC0odC5sZW5ndGgtMTApJTE2KSxyLkF0KCJyZXR1cm4iLEpBKG4sdCxpLDAsMTAsITApKTtjYXNlIDExOmNhc2UiZW5kIjpyZXR1cm4gci5zdG9wKCl9fSkscix0aGlzKX0pKSksZnVuY3Rpb24ocil7cmV0dXJuIHQuYXBwbHkodGhpcyxhcmd1bWVudHMpfSl9LHtrZXk6ImZsdXNoIix2YWx1ZTpmdW5jdGlvbigpe3ZhciByPXRoaXMsdD1yLlZ0LG49Y2oodCwwLHQubGVuZ3RoLTEwKSxlPWNqKHQsdC5sZW5ndGgtMTApLGk9bmV3IFVpbnQ4QXJyYXkoMCk7aWYobi5sZW5ndGgpe3ZhciBvPXpBLllyKG4pO3IuV3QudXBkYXRlKG8pO3ZhciB1PXIuenQudXBkYXRlKG8pO2k9ekEuR3IodSl9dmFyIGY9ITA7aWYoci5zaWduZWQpZm9yKHZhciBhPWNqKHpBLkdyKHIuV3QuZGlnZXN0KCkpLDAsMTApLGM9MDsxMD5jO2MrKylhW2NdIT1lW2NdJiYoZj0hMSk7cmV0dXJue3ZhbGlkOmYsZGF0YTppfX19XSkscn0oKSxxQT1mdW5jdGlvbigpe2Z1bmN0aW9uIHIodCxuKXtfQSh0aGlzLHIpLE9iamVjdC5hc3NpZ24odGhpcyx7cGFzc3dvcmQ6dCxZdDpuLTEsVnQ6bmV3IFVpbnQ4QXJyYXkoMCl9KX12YXIgdDtyZXR1cm4gUEEocixbe2tleToiYXBwZW5kIix2YWx1ZToodD1JQShVQSgpLm1hcmsoKGZ1bmN0aW9uIHIodCl7dmFyIG4sZSxpO3JldHVybiBVQSgpLndyYXAoKGZ1bmN0aW9uKHIpe2Zvcig7Oylzd2l0Y2goci5SdD1yLm5leHQpe2Nhc2UgMDppZihuPXRoaXMsZT1uZXcgVWludDhBcnJheSgwKSwhbi5wYXNzd29yZCl7ci5uZXh0PTk7YnJlYWt9cmV0dXJuIHIubmV4dD01LFpBKG4sbi5wYXNzd29yZCk7Y2FzZSA1OmU9ci5idCxuLnBhc3N3b3JkPW51bGwsbi56dD1uZXcgJEEobmV3IFdBKG4ua2V5cy5rZXkpLEFycmF5LmZyb20oR0EpKSxuLld0PW5ldyBIQShuLmtleXMuJHQpO2Nhc2UgOTpyZXR1cm4oaT1uZXcgVWludDhBcnJheShlLmxlbmd0aCt0Lmxlbmd0aC10Lmxlbmd0aCUxNikpLnNldChlLDApLHIuQXQoInJldHVybiIsSkEobix0LGksZS5sZW5ndGgsMCkpO2Nhc2UgMTI6Y2FzZSJlbmQiOnJldHVybiByLnN0b3AoKX19KSxyLHRoaXMpfSkpKSxmdW5jdGlvbihyKXtyZXR1cm4gdC5hcHBseSh0aGlzLGFyZ3VtZW50cyl9KX0se2tleToiZmx1c2giLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIHI9dGhpcyx0PW5ldyBVaW50OEFycmF5KDApO2lmKHIuVnQubGVuZ3RoKXt2YXIgbj1yLnp0LnVwZGF0ZSh6QS5ZcihyLlZ0KSk7ci5XdC51cGRhdGUobiksdD16QS5HcihuKX12YXIgZT1jaih6QS5HcihyLld0LmRpZ2VzdCgpKSwwLDEwKTtyZXR1cm57ZGF0YTphaih0LGUpLHNpZ25hdHVyZTplfX19XSkscn0oKTtmdW5jdGlvbiBKQShyLHQsbixlLGksbyl7dmFyIHUsZj10Lmxlbmd0aC1pO2ZvcihyLlZ0Lmxlbmd0aCYmKHQ9YWooci5WdCx0KSxuPWZ1bmN0aW9uKHIsdCl7aWYodCYmdD5yLmxlbmd0aCl7dmFyIG49cjsocj1uZXcgVWludDhBcnJheSh0KSkuc2V0KG4sMCl9cmV0dXJuIHJ9KG4sZi1mJTE2KSksdT0wO2YtMTY+PXU7dSs9MTYpe3ZhciBhPXpBLllyKGNqKHQsdSx1KzE2KSk7byYmci5XdC51cGRhdGUoYSk7dmFyIGM9ci56dC51cGRhdGUoYSk7b3x8ci5XdC51cGRhdGUoYyksbi5zZXQoekEuR3IoYyksdStlKX1yZXR1cm4gci5WdD1jaih0LHUpLG59ZnVuY3Rpb24gWEEocix0LG4pe3JldHVybiBRQS5hcHBseSh0aGlzLGFyZ3VtZW50cyl9ZnVuY3Rpb24gUUEoKXtyZXR1cm4gUUE9SUEoVUEoKS5tYXJrKChmdW5jdGlvbiByKHQsbixlKXt2YXIgaSxvO3JldHVybiBVQSgpLndyYXAoKGZ1bmN0aW9uKHIpe2Zvcig7Oylzd2l0Y2goci5SdD1yLm5leHQpe2Nhc2UgMDpyZXR1cm4gci5uZXh0PTIsdGoodCxlLGNqKG4sMCxCQVt0Lll0XSkpO2Nhc2UgMjppZihpPWNqKG4sQkFbdC5ZdF0pLChvPXQua2V5cy5wYXNzd29yZFZlcmlmaWNhdGlvbilbMF09PWlbMF0mJm9bMV09PWlbMV0pe3IubmV4dD02O2JyZWFrfXRocm93IEVycm9yKCJJbnZhbGlkIHBhc3dvcmQiKTtjYXNlIDY6Y2FzZSJlbmQiOnJldHVybiByLnN0b3AoKX19KSxyKX0pKSksUUEuYXBwbHkodGhpcyxhcmd1bWVudHMpfWZ1bmN0aW9uIFpBKHIsdCl7cmV0dXJuIHJqLmFwcGx5KHRoaXMsYXJndW1lbnRzKX1mdW5jdGlvbiByaigpe3JldHVybiByaj1JQShVQSgpLm1hcmsoKGZ1bmN0aW9uIHIodCxuKXt2YXIgZTtyZXR1cm4gVUEoKS53cmFwKChmdW5jdGlvbihyKXtmb3IoOzspc3dpdGNoKHIuUnQ9ci5uZXh0KXtjYXNlIDA6cmV0dXJuIGU9ZWoobmV3IFVpbnQ4QXJyYXkoQkFbdC5ZdF0pKSxyLm5leHQ9Myx0aih0LG4sZSk7Y2FzZSAzOnJldHVybiByLkF0KCJyZXR1cm4iLGFqKGUsdC5rZXlzLnBhc3N3b3JkVmVyaWZpY2F0aW9uKSk7Y2FzZSA0OmNhc2UiZW5kIjpyZXR1cm4gci5zdG9wKCl9fSkscil9KSkpLHJqLmFwcGx5KHRoaXMsYXJndW1lbnRzKX1mdW5jdGlvbiB0aihyLHQsbil7cmV0dXJuIG5qLmFwcGx5KHRoaXMsYXJndW1lbnRzKX1mdW5jdGlvbiBuaigpe3JldHVybihuaj1JQShVQSgpLm1hcmsoKGZ1bmN0aW9uIHIodCxuLGUpe3ZhciBpLG8sdSxmO3JldHVybiBVQSgpLndyYXAoKGZ1bmN0aW9uKHIpe2Zvcig7Oylzd2l0Y2goci5SdD1yLm5leHQpe2Nhc2UgMDpyZXR1cm4gaT1HUyhuKSxyLm5leHQ9MyxpaigicmF3IixpLE5BLCExLEZBKTtjYXNlIDM6cmV0dXJuIG89ci5idCxyLm5leHQ9Nix1aihPYmplY3QuYXNzaWduKHtzYWx0OmV9LENBKSxvLDgqKDIqREFbdC5ZdF0rMikpO2Nhc2UgNjp1PXIuYnQsZj1uZXcgVWludDhBcnJheSh1KSx0LmtleXM9e2tleTp6QS5ZcihjaihmLDAsREFbdC5ZdF0pKSwkdDp6QS5ZcihjaihmLERBW3QuWXRdLDIqREFbdC5ZdF0pKSxwYXNzd29yZFZlcmlmaWNhdGlvbjpjaihmLDIqREFbdC5ZdF0pfTtjYXNlIDk6Y2FzZSJlbmQiOnJldHVybiByLnN0b3AoKX19KSxyKX0pKSkpLmFwcGx5KHRoaXMsYXJndW1lbnRzKX1mdW5jdGlvbiBlaihyKXtyZXR1cm4gWUEmJiJmdW5jdGlvbiI9PXR5cGVvZiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzP2NyeXB0by5nZXRSYW5kb21WYWx1ZXMocik6ZnVuY3Rpb24ocil7Zm9yKHZhciB0LG49bmV3IFVpbnQzMkFycmF5KHIuYnVmZmVyKSxlPWZ1bmN0aW9uKHIpe3ZhciB0PTk4NzY1NDMyMSxuPTQyOTQ5NjcyOTU7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuKCgoKHQ9MzY5NjkqKDY1NTM1JnQpKyh0Pj4xNikmbik8PDE2KSsocj0xOGUzKig2NTUzNSZyKSsocj4+MTYpJm4pJm4pLzQyOTQ5NjcyOTYrLjUpKihNYXRoLnJhbmRvbSgpPi41PzE6LTEpfX0saT0wO2k8ci5sZW5ndGg7aSs9NCl7dmFyIG89ZSg0Mjk0OTY3Mjk2Kih0fHxNYXRoLnJhbmRvbSgpKSk7dD05ODc2NTQwNzEqbygpLG5baS80XT00Mjk0OTY3Mjk2Km8oKXwwfXJldHVybiByfShyKX1mdW5jdGlvbiBpaihyLHQsbixlLGkpe3JldHVybiBvai5hcHBseSh0aGlzLGFyZ3VtZW50cyl9ZnVuY3Rpb24gb2ooKXtyZXR1cm4ob2o9SUEoVUEoKS5tYXJrKChmdW5jdGlvbiByKHQsbixlLGksbyl7cmV0dXJuIFVBKCkud3JhcCgoZnVuY3Rpb24ocil7Zm9yKDs7KXN3aXRjaChyLlJ0PXIubmV4dCl7Y2FzZSAwOmlmKCFZQXx8IVZBfHwiZnVuY3Rpb24iIT10eXBlb2YgY3J5cHRvLnN1YnRsZS5pbXBvcnRLZXkpe3IubmV4dD00O2JyZWFrfXJldHVybiByLkF0KCJyZXR1cm4iLGNyeXB0by5zdWJ0bGUuaW1wb3J0S2V5KHQsbixlLGksbykpO2Nhc2UgNDpyZXR1cm4gci5BdCgicmV0dXJuIixUQS5pbXBvcnRLZXkobikpO2Nhc2UgNTpjYXNlImVuZCI6cmV0dXJuIHIuc3RvcCgpfX0pLHIpfSkpKSkuYXBwbHkodGhpcyxhcmd1bWVudHMpfWZ1bmN0aW9uIHVqKHIsdCxuKXtyZXR1cm4gZmouYXBwbHkodGhpcyxhcmd1bWVudHMpfWZ1bmN0aW9uIGZqKCl7cmV0dXJuKGZqPUlBKFVBKCkubWFyaygoZnVuY3Rpb24gcih0LG4sZSl7cmV0dXJuIFVBKCkud3JhcCgoZnVuY3Rpb24ocil7Zm9yKDs7KXN3aXRjaChyLlJ0PXIubmV4dCl7Y2FzZSAwOmlmKCFZQXx8IVZBfHwiZnVuY3Rpb24iIT10eXBlb2YgY3J5cHRvLnN1YnRsZS5kZXJpdmVCaXRzKXtyLm5leHQ9NjticmVha31yZXR1cm4gci5uZXh0PTMsY3J5cHRvLnN1YnRsZS5kZXJpdmVCaXRzKHQsbixlKTtjYXNlIDM6cmV0dXJuIHIuQXQoInJldHVybiIsci5idCk7Y2FzZSA2OnJldHVybiByLkF0KCJyZXR1cm4iLFRBLmx0KG4sdC5zYWx0LENBLml0ZXJhdGlvbnMsZSkpO2Nhc2UgNzpjYXNlImVuZCI6cmV0dXJuIHIuc3RvcCgpfX0pLHIpfSkpKSkuYXBwbHkodGhpcyxhcmd1bWVudHMpfWZ1bmN0aW9uIGFqKHIsdCl7dmFyIG49cjtyZXR1cm4gci5sZW5ndGgrdC5sZW5ndGgmJigobj1uZXcgVWludDhBcnJheShyLmxlbmd0aCt0Lmxlbmd0aCkpLnNldChyLDApLG4uc2V0KHQsci5sZW5ndGgpKSxufWZ1bmN0aW9uIGNqKHIsdCxuKXtyZXR1cm4gci5zdWJhcnJheSh0LG4pfXZhciBzaj1NYXRoLmltdWw7ZnVuY3Rpb24gdmoocix0KXtpZighKHIgaW5zdGFuY2VvZiB0KSl0aHJvdyBuZXcgVHlwZUVycm9yKCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24iKX1mdW5jdGlvbiBoaihyLHQpe2Zvcih2YXIgbj0wO248dC5sZW5ndGg7bisrKXt2YXIgZT10W25dO2UudD1lLnR8fCExLGUuaT0hMCwidmFsdWUiaW4gZSYmKGUud3JpdGFibGU9ITApLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyLGUua2V5LGUpfX1mdW5jdGlvbiBsaihyLHQsbil7cmV0dXJuIHQmJmhqKHIucHJvdG90eXBlLHQpLG4mJmhqKHIsbiksT2JqZWN0LmRlZmluZVByb3BlcnR5KHIsInByb3RvdHlwZSIse3dyaXRhYmxlOiExfSkscn1CZSh7dGFyZ2V0OiJNYXRoIixOOiEwLEY6aSgoZnVuY3Rpb24oKXtyZXR1cm4tNSE9c2ooNDI5NDk2NzI5NSw1KXx8MiE9c2oubGVuZ3RofSkpfSx7aW11bDpmdW5jdGlvbihyLHQpe3ZhciBuPTY1NTM1LGU9K3IsaT0rdCxvPW4mZSx1PW4maTtyZXR1cm4gMHxvKnUrKChuJmU+Pj4xNikqdStvKihuJmk+Pj4xNik8PDE2Pj4+MCl9fSk7dmFyIGRqPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gcih0LG4pe3ZqKHRoaXMsciksT2JqZWN0LmFzc2lnbih0aGlzLHtwYXNzd29yZDp0LHBhc3N3b3JkVmVyaWZpY2F0aW9uOm59KSxwaih0aGlzLHQpfXJldHVybiBsaihyLFt7a2V5OiJhcHBlbmQiLHZhbHVlOmZ1bmN0aW9uKHIpe3ZhciB0PXRoaXM7aWYodC5wYXNzd29yZCl7dmFyIG49d2oodCxyLnN1YmFycmF5KDAsMTIpKTtpZih0LnBhc3N3b3JkPW51bGwsblsxMV0hPXQucGFzc3dvcmRWZXJpZmljYXRpb24pdGhyb3cgRXJyb3IoIkludmFsaWQgcGFzd29yZCIpO3I9ci5zdWJhcnJheSgxMil9cmV0dXJuIHdqKHQscil9fSx7a2V5OiJmbHVzaCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm57dmFsaWQ6ITAsZGF0YTpuZXcgVWludDhBcnJheSgwKX19fV0pLHJ9KCkseWo9ZnVuY3Rpb24oKXtmdW5jdGlvbiByKHQsbil7dmoodGhpcyxyKSxPYmplY3QuYXNzaWduKHRoaXMse3Bhc3N3b3JkOnQscGFzc3dvcmRWZXJpZmljYXRpb246bn0pLHBqKHRoaXMsdCl9cmV0dXJuIGxqKHIsW3trZXk6ImFwcGVuZCIsdmFsdWU6ZnVuY3Rpb24ocil7dmFyIHQsbixlPXRoaXM7aWYoZS5wYXNzd29yZCl7ZS5wYXNzd29yZD1udWxsO3ZhciBpPWNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoMTIpKTtpWzExXT1lLnBhc3N3b3JkVmVyaWZpY2F0aW9uLCh0PW5ldyBVaW50OEFycmF5KHIubGVuZ3RoK2kubGVuZ3RoKSkuc2V0KGJqKGUsaSksMCksbj0xMn1lbHNlIHQ9bmV3IFVpbnQ4QXJyYXkoci5sZW5ndGgpLG49MDtyZXR1cm4gdC5zZXQoYmooZSxyKSxuKSx0fX0se2tleToiZmx1c2giLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJue2RhdGE6bmV3IFVpbnQ4QXJyYXkoMCl9fX1dKSxyfSgpO2Z1bmN0aW9uIHdqKHIsdCl7Zm9yKHZhciBuPW5ldyBVaW50OEFycmF5KHQubGVuZ3RoKSxlPTA7ZTx0Lmxlbmd0aDtlKyspbltlXT1taihyKV50W2VdLGdqKHIsbltlXSk7cmV0dXJuIG59ZnVuY3Rpb24gYmoocix0KXtmb3IodmFyIG49bmV3IFVpbnQ4QXJyYXkodC5sZW5ndGgpLGU9MDtlPHQubGVuZ3RoO2UrKyluW2VdPW1qKHIpXnRbZV0sZ2oocix0W2VdKTtyZXR1cm4gbn1mdW5jdGlvbiBwaihyLHQpe3Iua2V5cz1bMzA1NDE5ODk2LDU5MTc1MTA0OSw4NzgwODIxOTJdLHIuSHQ9bmV3IFRTKHIua2V5c1swXSksci5LdD1uZXcgVFMoci5rZXlzWzJdKTtmb3IodmFyIG49MDtuPHQubGVuZ3RoO24rKylnaihyLHQuY2hhckNvZGVBdChuKSl9ZnVuY3Rpb24gZ2oocix0KXtyLkh0LmFwcGVuZChbdF0pLHIua2V5c1swXT1+ci5IdC5nZXQoKSxyLmtleXNbMV09QWooci5rZXlzWzFdK1NqKHIua2V5c1swXSkpLHIua2V5c1sxXT1BaihNYXRoLmltdWwoci5rZXlzWzFdLDEzNDc3NTgxMykrMSksci5LdC5hcHBlbmQoW3Iua2V5c1sxXT4+PjI0XSksci5rZXlzWzJdPX5yLkt0LmdldCgpfWZ1bmN0aW9uIG1qKHIpe3ZhciB0PTJ8ci5rZXlzWzJdO3JldHVybiBTaihNYXRoLmltdWwodCwxXnQpPj4+OCl9ZnVuY3Rpb24gU2oocil7cmV0dXJuIDI1NSZyfWZ1bmN0aW9uIEFqKHIpe3JldHVybiA0Mjk0OTY3Mjk1JnJ9ZnVuY3Rpb24gamoocil7cmV0dXJuIGpqPSJmdW5jdGlvbiI9PXR5cGVvZiBTeW1ib2wmJiJzeW1ib2wiPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKHIpe3JldHVybiB0eXBlb2Ygcn06ZnVuY3Rpb24ocil7cmV0dXJuIHImJiJmdW5jdGlvbiI9PXR5cGVvZiBTeW1ib2wmJnIuY29uc3RydWN0b3I9PT1TeW1ib2wmJnIhPT1TeW1ib2wucHJvdG90eXBlPyJzeW1ib2wiOnR5cGVvZiByfSxqaihyKX1mdW5jdGlvbiBPaigpey8qISByZWdlbmVyYXRvci1ydW50aW1lIC0tIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLiAtLSBsaWNlbnNlIChNSVQpOiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvYmxvYi9tYWluL0xJQ0VOU0UgKi9Paj1mdW5jdGlvbigpe3JldHVybiByfTt2YXIgcj17fSx0PU9iamVjdC5wcm90b3R5cGUsbj10Lmhhc093blByb3BlcnR5LGU9ImZ1bmN0aW9uIj09dHlwZW9mIFN5bWJvbD9TeW1ib2w6e30saT1lLml0ZXJhdG9yfHwiQEBpdGVyYXRvciIsbz1lLmFzeW5jSXRlcmF0b3J8fCJAQGFzeW5jSXRlcmF0b3IiLHU9ZS50b1N0cmluZ1RhZ3x8IkBAdG9TdHJpbmdUYWciO2Z1bmN0aW9uIGYocix0LG4pe3JldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkocix0LHt2YWx1ZTpuLHQ6ITAsaTohMCx3cml0YWJsZTohMH0pLHJbdF19dHJ5e2Yoe30sIiIpfWNhdGNoKHIpe2Y9ZnVuY3Rpb24ocix0LG4pe3JldHVybiByW3RdPW59fWZ1bmN0aW9uIGEocix0LG4sZSl7dmFyIGk9dCYmdC5wcm90b3R5cGUgaW5zdGFuY2VvZiB2P3Q6dixvPU9iamVjdC5jcmVhdGUoaS5wcm90b3R5cGUpLHU9bmV3IGooZXx8W10pO3JldHVybiBvLmR0PWZ1bmN0aW9uKHIsdCxuKXt2YXIgZT0ic3VzcGVuZGVkU3RhcnQiO3JldHVybiBmdW5jdGlvbihpLG8pe2lmKCJleGVjdXRpbmciPT09ZSl0aHJvdyBFcnJvcigiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZyIpO2lmKCJjb21wbGV0ZWQiPT09ZSl7aWYoInRocm93Ij09PWkpdGhyb3cgbztyZXR1cm57dmFsdWU6dm9pZCAwLGRvbmU6ITB9fWZvcihuLm1ldGhvZD1pLG4ueXQ9bzs7KXt2YXIgdT1uLnd0O2lmKHUpe3ZhciBmPW0odSxuKTtpZihmKXtpZihmPT09cyljb250aW51ZTtyZXR1cm4gZn19aWYoIm5leHQiPT09bi5tZXRob2Qpbi5idD1uLmd0PW4ueXQ7ZWxzZSBpZigidGhyb3ciPT09bi5tZXRob2Qpe2lmKCJzdXNwZW5kZWRTdGFydCI9PT1lKXRocm93IGU9ImNvbXBsZXRlZCIsbi55dDtuLlN0KG4ueXQpfWVsc2UicmV0dXJuIj09PW4ubWV0aG9kJiZuLkF0KCJyZXR1cm4iLG4ueXQpO2U9ImV4ZWN1dGluZyI7dmFyIGE9YyhyLHQsbik7aWYoIm5vcm1hbCI9PT1hLnR5cGUpe2lmKGU9bi5kb25lPyJjb21wbGV0ZWQiOiJzdXNwZW5kZWRZaWVsZCIsYS55dD09PXMpY29udGludWU7cmV0dXJue3ZhbHVlOmEueXQsZG9uZTpuLmRvbmV9fSJ0aHJvdyI9PT1hLnR5cGUmJihlPSJjb21wbGV0ZWQiLG4ubWV0aG9kPSJ0aHJvdyIsbi55dD1hLnl0KX19fShyLG4sdSksb31mdW5jdGlvbiBjKHIsdCxuKXt0cnl7cmV0dXJue3R5cGU6Im5vcm1hbCIseXQ6ci5jYWxsKHQsbil9fWNhdGNoKHIpe3JldHVybnt0eXBlOiJ0aHJvdyIseXQ6cn19fXIud3JhcD1hO3ZhciBzPXt9O2Z1bmN0aW9uIHYoKXt9ZnVuY3Rpb24gaCgpe31mdW5jdGlvbiBsKCl7fXZhciBkPXt9O2YoZCxpLChmdW5jdGlvbigpe3JldHVybiB0aGlzfSkpO3ZhciB5PU9iamVjdC5nZXRQcm90b3R5cGVPZix3PXkmJnkoeShPKFtdKSkpO3cmJnchPT10JiZuLmNhbGwodyxpKSYmKGQ9dyk7dmFyIGI9bC5wcm90b3R5cGU9di5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShkKTtmdW5jdGlvbiBwKHIpe1sibmV4dCIsInRocm93IiwicmV0dXJuIl0uZm9yRWFjaCgoZnVuY3Rpb24odCl7ZihyLHQsKGZ1bmN0aW9uKHIpe3JldHVybiB0aGlzLmR0KHQscil9KSl9KSl9ZnVuY3Rpb24gZyhyLHQpe2Z1bmN0aW9uIGUoaSxvLHUsZil7dmFyIGE9YyhyW2ldLHIsbyk7aWYoInRocm93IiE9PWEudHlwZSl7dmFyIHM9YS55dCx2PXMudmFsdWU7cmV0dXJuIHYmJiJvYmplY3QiPT1qaih2KSYmbi5jYWxsKHYsIl9fYXdhaXQiKT90LnJlc29sdmUodi5qdCkudGhlbigoZnVuY3Rpb24ocil7ZSgibmV4dCIscix1LGYpfSksKGZ1bmN0aW9uKHIpe2UoInRocm93IixyLHUsZil9KSk6dC5yZXNvbHZlKHYpLnRoZW4oKGZ1bmN0aW9uKHIpe3MudmFsdWU9cix1KHMpfSksKGZ1bmN0aW9uKHIpe3JldHVybiBlKCJ0aHJvdyIscix1LGYpfSkpfWYoYS55dCl9dmFyIGk7dGhpcy5kdD1mdW5jdGlvbihyLG4pe2Z1bmN0aW9uIG8oKXtyZXR1cm4gbmV3IHQoKGZ1bmN0aW9uKHQsaSl7ZShyLG4sdCxpKX0pKX1yZXR1cm4gaT1pP2kudGhlbihvLG8pOm8oKX19ZnVuY3Rpb24gbShyLHQpe3ZhciBuPXIuaXRlcmF0b3JbdC5tZXRob2RdO2lmKHZvaWQgMD09PW4pe2lmKHQud3Q9bnVsbCwidGhyb3ciPT09dC5tZXRob2Qpe2lmKHIuaXRlcmF0b3IuSCYmKHQubWV0aG9kPSJyZXR1cm4iLHQueXQ9dm9pZCAwLG0ocix0KSwidGhyb3ciPT09dC5tZXRob2QpKXJldHVybiBzO3QubWV0aG9kPSJ0aHJvdyIsdC55dD1uZXcgVHlwZUVycm9yKCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICd0aHJvdycgbWV0aG9kIil9cmV0dXJuIHN9dmFyIGU9YyhuLHIuaXRlcmF0b3IsdC55dCk7aWYoInRocm93Ij09PWUudHlwZSlyZXR1cm4gdC5tZXRob2Q9InRocm93Iix0Lnl0PWUueXQsdC53dD1udWxsLHM7dmFyIGk9ZS55dDtyZXR1cm4gaT9pLmRvbmU/KHRbci5PdF09aS52YWx1ZSx0Lm5leHQ9ci5rdCwicmV0dXJuIiE9PXQubWV0aG9kJiYodC5tZXRob2Q9Im5leHQiLHQueXQ9dm9pZCAwKSx0Lnd0PW51bGwscyk6aToodC5tZXRob2Q9InRocm93Iix0Lnl0PW5ldyBUeXBlRXJyb3IoIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0IiksdC53dD1udWxsLHMpfWZ1bmN0aW9uIFMocil7dmFyIHQ9e0V0OnJbMF19OzEgaW4gciYmKHQuVHQ9clsxXSksMiBpbiByJiYodC54dD1yWzJdLHQuVXQ9clszXSksdGhpcy5NdC5wdXNoKHQpfWZ1bmN0aW9uIEEocil7dmFyIHQ9ci5JdHx8e307dC50eXBlPSJub3JtYWwiLGRlbGV0ZSB0Lnl0LHIuSXQ9dH1mdW5jdGlvbiBqKHIpe3RoaXMuTXQ9W3tFdDoicm9vdCJ9XSxyLmZvckVhY2goUyx0aGlzKSx0aGlzLnJlc2V0KCEwKX1mdW5jdGlvbiBPKHIpe2lmKHIpe3ZhciB0PXJbaV07aWYodClyZXR1cm4gdC5jYWxsKHIpO2lmKCJmdW5jdGlvbiI9PXR5cGVvZiByLm5leHQpcmV0dXJuIHI7aWYoIWlzTmFOKHIubGVuZ3RoKSl7dmFyIGU9LTEsbz1mdW5jdGlvbiB0KCl7Zm9yKDsrK2U8ci5sZW5ndGg7KWlmKG4uY2FsbChyLGUpKXJldHVybiB0LnZhbHVlPXJbZV0sdC5kb25lPSExLHQ7cmV0dXJuIHQudmFsdWU9dm9pZCAwLHQuZG9uZT0hMCx0fTtyZXR1cm4gby5uZXh0PW99fXJldHVybntuZXh0Omt9fWZ1bmN0aW9uIGsoKXtyZXR1cm57dmFsdWU6dm9pZCAwLGRvbmU6ITB9fXJldHVybiBoLnByb3RvdHlwZT1sLGYoYiwiY29uc3RydWN0b3IiLGwpLGYobCwiY29uc3RydWN0b3IiLGgpLGguZGlzcGxheU5hbWU9ZihsLHUsIkdlbmVyYXRvckZ1bmN0aW9uIiksci5fdD1mdW5jdGlvbihyKXt2YXIgdD0iZnVuY3Rpb24iPT10eXBlb2YgciYmci5jb25zdHJ1Y3RvcjtyZXR1cm4hIXQmJih0PT09aHx8IkdlbmVyYXRvckZ1bmN0aW9uIj09PSh0LmRpc3BsYXlOYW1lfHx0Lm5hbWUpKX0sci5tYXJrPWZ1bmN0aW9uKHIpe3JldHVybiBPYmplY3Quc2V0UHJvdG90eXBlT2Y/T2JqZWN0LnNldFByb3RvdHlwZU9mKHIsbCk6KHIuX19wcm90b19fPWwsZihyLHUsIkdlbmVyYXRvckZ1bmN0aW9uIikpLHIucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoYikscn0sci5MdD1mdW5jdGlvbihyKXtyZXR1cm57anQ6cn19LHAoZy5wcm90b3R5cGUpLGYoZy5wcm90b3R5cGUsbywoZnVuY3Rpb24oKXtyZXR1cm4gdGhpc30pKSxyLlB0PWcsci5hc3luYz1mdW5jdGlvbih0LG4sZSxpLG8pe3ZvaWQgMD09PW8mJihvPVByb21pc2UpO3ZhciB1PW5ldyBnKGEodCxuLGUsaSksbyk7cmV0dXJuIHIuX3Qobik/dTp1Lm5leHQoKS50aGVuKChmdW5jdGlvbihyKXtyZXR1cm4gci5kb25lP3IudmFsdWU6dS5uZXh0KCl9KSl9LHAoYiksZihiLHUsIkdlbmVyYXRvciIpLGYoYixpLChmdW5jdGlvbigpe3JldHVybiB0aGlzfSkpLGYoYiwidG9TdHJpbmciLChmdW5jdGlvbigpe3JldHVybiJbb2JqZWN0IEdlbmVyYXRvcl0ifSkpLHIua2V5cz1mdW5jdGlvbihyKXt2YXIgdD1bXTtmb3IodmFyIG4gaW4gcil0LnB1c2gobik7cmV0dXJuIHQucmV2ZXJzZSgpLGZ1bmN0aW9uIG4oKXtmb3IoO3QubGVuZ3RoOyl7dmFyIGU9dC5wb3AoKTtpZihlIGluIHIpcmV0dXJuIG4udmFsdWU9ZSxuLmRvbmU9ITEsbn1yZXR1cm4gbi5kb25lPSEwLG59fSxyLnZhbHVlcz1PLGoucHJvdG90eXBlPXtjb25zdHJ1Y3RvcjpqLHJlc2V0OmZ1bmN0aW9uKHIpe2lmKHRoaXMuUnQ9MCx0aGlzLm5leHQ9MCx0aGlzLmJ0PXRoaXMuZ3Q9dm9pZCAwLHRoaXMuZG9uZT0hMSx0aGlzLnd0PW51bGwsdGhpcy5tZXRob2Q9Im5leHQiLHRoaXMueXQ9dm9pZCAwLHRoaXMuTXQuZm9yRWFjaChBKSwhcilmb3IodmFyIHQgaW4gdGhpcykidCI9PT10LmNoYXJBdCgwKSYmbi5jYWxsKHRoaXMsdCkmJiFpc05hTigrdC5zbGljZSgxKSkmJih0aGlzW3RdPXZvaWQgMCl9LHN0b3A6ZnVuY3Rpb24oKXt0aGlzLmRvbmU9ITA7dmFyIHI9dGhpcy5NdFswXS5JdDtpZigidGhyb3ciPT09ci50eXBlKXRocm93IHIueXQ7cmV0dXJuIHRoaXMuTnR9LFN0OmZ1bmN0aW9uKHIpe2lmKHRoaXMuZG9uZSl0aHJvdyByO3ZhciB0PXRoaXM7ZnVuY3Rpb24gZShuLGUpe3JldHVybiB1LnR5cGU9InRocm93Iix1Lnl0PXIsdC5uZXh0PW4sZSYmKHQubWV0aG9kPSJuZXh0Iix0Lnl0PXZvaWQgMCksISFlfWZvcih2YXIgaT10aGlzLk10Lmxlbmd0aC0xO2k+PTA7LS1pKXt2YXIgbz10aGlzLk10W2ldLHU9by5JdDtpZigicm9vdCI9PT1vLkV0KXJldHVybiBlKCJlbmQiKTtpZihvLkV0PD10aGlzLlJ0KXt2YXIgZj1uLmNhbGwobywiY2F0Y2hMb2MiKSxhPW4uY2FsbChvLCJmaW5hbGx5TG9jIik7aWYoZiYmYSl7aWYodGhpcy5SdDxvLlR0KXJldHVybiBlKG8uVHQsITApO2lmKHRoaXMuUnQ8by54dClyZXR1cm4gZShvLnh0KX1lbHNlIGlmKGYpe2lmKHRoaXMuUnQ8by5UdClyZXR1cm4gZShvLlR0LCEwKX1lbHNle2lmKCFhKXRocm93IEVycm9yKCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseSIpO2lmKHRoaXMuUnQ8by54dClyZXR1cm4gZShvLnh0KX19fX0sQXQ6ZnVuY3Rpb24ocix0KXtmb3IodmFyIGU9dGhpcy5NdC5sZW5ndGgtMTtlPj0wOy0tZSl7dmFyIGk9dGhpcy5NdFtlXTtpZihpLkV0PD10aGlzLlJ0JiZuLmNhbGwoaSwiZmluYWxseUxvYyIpJiZ0aGlzLlJ0PGkueHQpe3ZhciBvPWk7YnJlYWt9fW8mJigiYnJlYWsiPT09cnx8ImNvbnRpbnVlIj09PXIpJiZvLkV0PD10JiZ0PD1vLnh0JiYobz1udWxsKTt2YXIgdT1vP28uSXQ6e307cmV0dXJuIHUudHlwZT1yLHUueXQ9dCxvPyh0aGlzLm1ldGhvZD0ibmV4dCIsdGhpcy5uZXh0PW8ueHQscyk6dGhpcy5jb21wbGV0ZSh1KX0sY29tcGxldGU6ZnVuY3Rpb24ocix0KXtpZigidGhyb3ciPT09ci50eXBlKXRocm93IHIueXQ7cmV0dXJuImJyZWFrIj09PXIudHlwZXx8ImNvbnRpbnVlIj09PXIudHlwZT90aGlzLm5leHQ9ci55dDoicmV0dXJuIj09PXIudHlwZT8odGhpcy5OdD10aGlzLnl0PXIueXQsdGhpcy5tZXRob2Q9InJldHVybiIsdGhpcy5uZXh0PSJlbmQiKToibm9ybWFsIj09PXIudHlwZSYmdCYmKHRoaXMubmV4dD10KSxzfSxmaW5pc2g6ZnVuY3Rpb24ocil7Zm9yKHZhciB0PXRoaXMuTXQubGVuZ3RoLTE7dD49MDstLXQpe3ZhciBuPXRoaXMuTXRbdF07aWYobi54dD09PXIpcmV0dXJuIHRoaXMuY29tcGxldGUobi5JdCxuLlV0KSxBKG4pLHN9fSxjYXRjaDpmdW5jdGlvbihyKXtmb3IodmFyIHQ9dGhpcy5NdC5sZW5ndGgtMTt0Pj0wOy0tdCl7dmFyIG49dGhpcy5NdFt0XTtpZihuLkV0PT09cil7dmFyIGU9bi5JdDtpZigidGhyb3ciPT09ZS50eXBlKXt2YXIgaT1lLnl0O0Eobil9cmV0dXJuIGl9fXRocm93IEVycm9yKCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHQiKX0sQ3Q6ZnVuY3Rpb24ocix0LG4pe3JldHVybiB0aGlzLnd0PXtpdGVyYXRvcjpPKHIpLE90OnQsa3Q6bn0sIm5leHQiPT09dGhpcy5tZXRob2QmJih0aGlzLnl0PXZvaWQgMCksc319LHJ9ZnVuY3Rpb24ga2oocix0LG4sZSxpLG8sdSl7dHJ5e3ZhciBmPXJbb10odSksYT1mLnZhbHVlfWNhdGNoKHIpe3JldHVybiB2b2lkIG4ocil9Zi5kb25lP3QoYSk6UHJvbWlzZS5yZXNvbHZlKGEpLnRoZW4oZSxpKX1mdW5jdGlvbiBFaihyKXtyZXR1cm4gZnVuY3Rpb24oKXt2YXIgdD10aGlzLG49YXJndW1lbnRzO3JldHVybiBuZXcgUHJvbWlzZSgoZnVuY3Rpb24oZSxpKXt2YXIgbz1yLmFwcGx5KHQsbik7ZnVuY3Rpb24gdShyKXtraihvLGUsaSx1LGYsIm5leHQiLHIpfWZ1bmN0aW9uIGYocil7a2oobyxlLGksdSxmLCJ0aHJvdyIscil9dSh2b2lkIDApfSkpfX1mdW5jdGlvbiBUaihyLHQpe2lmKCEociBpbnN0YW5jZW9mIHQpKXRocm93IG5ldyBUeXBlRXJyb3IoIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbiIpfWZ1bmN0aW9uIHhqKHIsdCl7Zm9yKHZhciBuPTA7bjx0Lmxlbmd0aDtuKyspe3ZhciBlPXRbbl07ZS50PWUudHx8ITEsZS5pPSEwLCJ2YWx1ZSJpbiBlJiYoZS53cml0YWJsZT0hMCksT2JqZWN0LmRlZmluZVByb3BlcnR5KHIsZS5rZXksZSl9fWZ1bmN0aW9uIFVqKHIsdCxuKXtyZXR1cm4gdCYmeGooci5wcm90b3R5cGUsdCksbiYmeGoocixuKSxPYmplY3QuZGVmaW5lUHJvcGVydHkociwicHJvdG90eXBlIix7d3JpdGFibGU6ITF9KSxyfXZhciBNaj1mdW5jdGlvbigpe2Z1bmN0aW9uIHIodCxuLGUpe3ZhciBpPW4uc2lnbmF0dXJlLG89bi5wYXNzd29yZCx1PW4uc2lnbmVkLGY9bi5jb21wcmVzc2VkLGE9bi56aXBDcnlwdG8sYz1uLnBhc3N3b3JkVmVyaWZpY2F0aW9uLHM9bi5lbmNyeXB0aW9uU3RyZW5ndGgsdj1lLnF0O1RqKHRoaXMscik7dmFyIGg9ISFvO09iamVjdC5hc3NpZ24odGhpcyx7c2lnbmF0dXJlOmksZW5jcnlwdGVkOmgsc2lnbmVkOnUsY29tcHJlc3NlZDpmLEp0OmYmJm5ldyB0KHtxdDp2fSksWHQ6dSYmbmV3IFRTLHppcENyeXB0bzphLGRlY3J5cHQ6aCYmYT9uZXcgZGoobyxjKTpuZXcgS0Eobyx1LHMpfSl9dmFyIHQ7cmV0dXJuIFVqKHIsW3trZXk6ImFwcGVuZCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgcj1FaihPaigpLm1hcmsoKGZ1bmN0aW9uIHIodCl7dmFyIG47cmV0dXJuIE9qKCkud3JhcCgoZnVuY3Rpb24ocil7Zm9yKDs7KXN3aXRjaChyLlJ0PXIubmV4dCl7Y2FzZSAwOmlmKCEobj10aGlzKS5lbmNyeXB0ZWR8fCF0Lmxlbmd0aCl7ci5uZXh0PTU7YnJlYWt9cmV0dXJuIHIubmV4dD00LG4uZGVjcnlwdC5hcHBlbmQodCk7Y2FzZSA0OnQ9ci5idDtjYXNlIDU6aWYoIW4uY29tcHJlc3NlZHx8IXQubGVuZ3RoKXtyLm5leHQ9OTticmVha31yZXR1cm4gci5uZXh0PTgsbi5KdC5hcHBlbmQodCk7Y2FzZSA4OnQ9ci5idDtjYXNlIDk6cmV0dXJuKCFuLmVuY3J5cHRlZHx8bi56aXBDcnlwdG8pJiZuLnNpZ25lZCYmdC5sZW5ndGgmJm4uWHQuYXBwZW5kKHQpLHIuQXQoInJldHVybiIsdCk7Y2FzZSAxMTpjYXNlImVuZCI6cmV0dXJuIHIuc3RvcCgpfX0pLHIsdGhpcyl9KSkpO3JldHVybiBmdW5jdGlvbih0KXtyZXR1cm4gci5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fSgpfSx7a2V5OiJmbHVzaCIsdmFsdWU6KHQ9RWooT2ooKS5tYXJrKChmdW5jdGlvbiByKCl7dmFyIHQsbixlLGksbztyZXR1cm4gT2ooKS53cmFwKChmdW5jdGlvbihyKXtmb3IoOzspc3dpdGNoKHIuUnQ9ci5uZXh0KXtjYXNlIDA6aWYodD10aGlzLGU9bmV3IFVpbnQ4QXJyYXkoMCksIXQuZW5jcnlwdGVkKXtyLm5leHQ9NzticmVha31pZigoaT10LmRlY3J5cHQuZmx1c2goKSkudmFsaWQpe3IubmV4dD02O2JyZWFrfXRocm93IEVycm9yKCJJbnZhbGlkIHNpZ25hdHVyZSIpO2Nhc2UgNjplPWkuZGF0YTtjYXNlIDc6aWYodC5lbmNyeXB0ZWQmJiF0LnppcENyeXB0b3x8IXQuc2lnbmVkKXtyLm5leHQ9MTM7YnJlYWt9aWYobz1uZXcgRGF0YVZpZXcobmV3IFVpbnQ4QXJyYXkoNCkuYnVmZmVyKSxuPXQuWHQuZ2V0KCksby5zZXRVaW50MzIoMCxuKSx0LnNpZ25hdHVyZT09by5nZXRVaW50MzIoMCwhMSkpe3IubmV4dD0xMzticmVha310aHJvdyBFcnJvcigiSW52YWxpZCBzaWduYXR1cmUiKTtjYXNlIDEzOmlmKCF0LmNvbXByZXNzZWQpe3IubmV4dD0yMjticmVha31yZXR1cm4gci5uZXh0PTE2LHQuSnQuYXBwZW5kKGUpO2Nhc2UgMTY6aWYoci5RdD1yLmJ0LHIuUXQpe3IubmV4dD0xOTticmVha31yLlF0PW5ldyBVaW50OEFycmF5KDApO2Nhc2UgMTk6cmV0dXJuIGU9ci5RdCxyLm5leHQ9MjIsdC5KdC5mbHVzaCgpO2Nhc2UgMjI6cmV0dXJuIHIuQXQoInJldHVybiIse2RhdGE6ZSxzaWduYXR1cmU6bn0pO2Nhc2UgMjM6Y2FzZSJlbmQiOnJldHVybiByLnN0b3AoKX19KSxyLHRoaXMpfSkpKSxmdW5jdGlvbigpe3JldHVybiB0LmFwcGx5KHRoaXMsYXJndW1lbnRzKX0pfV0pLHJ9KCksSWo9ZnVuY3Rpb24oKXtmdW5jdGlvbiByKHQsbixlKXt2YXIgaT1uLmVuY3J5cHRlZCxvPW4uc2lnbmVkLHU9bi5jb21wcmVzc2VkLGY9bi5sZXZlbCxhPW4uemlwQ3J5cHRvLGM9bi5wYXNzd29yZCxzPW4ucGFzc3dvcmRWZXJpZmljYXRpb24sdj1uLmVuY3J5cHRpb25TdHJlbmd0aCxoPWUucXQ7VGoodGhpcyxyKSxPYmplY3QuYXNzaWduKHRoaXMse2VuY3J5cHRlZDppLHNpZ25lZDpvLGNvbXByZXNzZWQ6dSxadDp1JiZuZXcgdCh7bGV2ZWw6Znx8NSxxdDpofSksWHQ6byYmbmV3IFRTLHppcENyeXB0bzphLGVuY3J5cHQ6aSYmYT9uZXcgeWooYyxzKTpuZXcgcUEoYyx2KX0pfXZhciB0LG47cmV0dXJuIFVqKHIsW3trZXk6ImFwcGVuZCIsdmFsdWU6KG49RWooT2ooKS5tYXJrKChmdW5jdGlvbiByKHQpe3ZhciBuLGU7cmV0dXJuIE9qKCkud3JhcCgoZnVuY3Rpb24ocil7Zm9yKDs7KXN3aXRjaChyLlJ0PXIubmV4dCl7Y2FzZSAwOmlmKGU9dCwhKG49dGhpcykuY29tcHJlc3NlZHx8IXQubGVuZ3RoKXtyLm5leHQ9NjticmVha31yZXR1cm4gci5uZXh0PTUsbi5adC5hcHBlbmQodCk7Y2FzZSA1OmU9ci5idDtjYXNlIDY6aWYoIW4uZW5jcnlwdGVkfHwhZS5sZW5ndGgpe3IubmV4dD0xMDticmVha31yZXR1cm4gci5uZXh0PTksbi5lbmNyeXB0LmFwcGVuZChlKTtjYXNlIDk6ZT1yLmJ0O2Nhc2UgMTA6cmV0dXJuKCFuLmVuY3J5cHRlZHx8bi56aXBDcnlwdG8pJiZuLnNpZ25lZCYmdC5sZW5ndGgmJm4uWHQuYXBwZW5kKHQpLHIuQXQoInJldHVybiIsZSk7Y2FzZSAxMjpjYXNlImVuZCI6cmV0dXJuIHIuc3RvcCgpfX0pLHIsdGhpcyl9KSkpLGZ1bmN0aW9uKHIpe3JldHVybiBuLmFwcGx5KHRoaXMsYXJndW1lbnRzKX0pfSx7a2V5OiJmbHVzaCIsdmFsdWU6KHQ9RWooT2ooKS5tYXJrKChmdW5jdGlvbiByKCl7dmFyIHQsbixlLGksbztyZXR1cm4gT2ooKS53cmFwKChmdW5jdGlvbihyKXtmb3IoOzspc3dpdGNoKHIuUnQ9ci5uZXh0KXtjYXNlIDA6aWYodD10aGlzLGU9bmV3IFVpbnQ4QXJyYXkoMCksIXQuY29tcHJlc3NlZCl7ci5uZXh0PTk7YnJlYWt9cmV0dXJuIHIubmV4dD01LHQuWnQuZmx1c2goKTtjYXNlIDU6aWYoci5RdD1yLmJ0LHIuUXQpe3IubmV4dD04O2JyZWFrfXIuUXQ9bmV3IFVpbnQ4QXJyYXkoMCk7Y2FzZSA4OmU9ci5RdDtjYXNlIDk6aWYoIXQuZW5jcnlwdGVkKXtyLm5leHQ9MTk7YnJlYWt9cmV0dXJuIHIubmV4dD0xMix0LmVuY3J5cHQuYXBwZW5kKGUpO2Nhc2UgMTI6ZT1yLmJ0LGk9dC5lbmNyeXB0LmZsdXNoKCksbj1pLnNpZ25hdHVyZSwobz1uZXcgVWludDhBcnJheShlLmxlbmd0aCtpLmRhdGEubGVuZ3RoKSkuc2V0KGUsMCksby5zZXQoaS5kYXRhLGUubGVuZ3RoKSxlPW87Y2FzZSAxOTpyZXR1cm4gdC5lbmNyeXB0ZWQmJiF0LnppcENyeXB0b3x8IXQuc2lnbmVkfHwobj10Llh0LmdldCgpKSxyLkF0KCJyZXR1cm4iLHtkYXRhOmUsc2lnbmF0dXJlOm59KTtjYXNlIDIxOmNhc2UiZW5kIjpyZXR1cm4gci5zdG9wKCl9fSkscix0aGlzKX0pKSksZnVuY3Rpb24oKXtyZXR1cm4gdC5hcHBseSh0aGlzLGFyZ3VtZW50cyl9KX1dKSxyfSgpO2Z1bmN0aW9uIF9qKHIpe3JldHVybiBfaj0iZnVuY3Rpb24iPT10eXBlb2YgU3ltYm9sJiYic3ltYm9sIj09dHlwZW9mIFN5bWJvbC5pdGVyYXRvcj9mdW5jdGlvbihyKXtyZXR1cm4gdHlwZW9mIHJ9OmZ1bmN0aW9uKHIpe3JldHVybiByJiYiZnVuY3Rpb24iPT10eXBlb2YgU3ltYm9sJiZyLmNvbnN0cnVjdG9yPT09U3ltYm9sJiZyIT09U3ltYm9sLnByb3RvdHlwZT8ic3ltYm9sIjp0eXBlb2Ygcn0sX2oocil9ZnVuY3Rpb24gTGooKXsvKiEgcmVnZW5lcmF0b3ItcnVudGltZSAtLSBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy4gLS0gbGljZW5zZSAoTUlUKTogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2Jsb2IvbWFpbi9MSUNFTlNFICovTGo9ZnVuY3Rpb24oKXtyZXR1cm4gcn07dmFyIHI9e30sdD1PYmplY3QucHJvdG90eXBlLG49dC5oYXNPd25Qcm9wZXJ0eSxlPSJmdW5jdGlvbiI9PXR5cGVvZiBTeW1ib2w/U3ltYm9sOnt9LGk9ZS5pdGVyYXRvcnx8IkBAaXRlcmF0b3IiLG89ZS5hc3luY0l0ZXJhdG9yfHwiQEBhc3luY0l0ZXJhdG9yIix1PWUudG9TdHJpbmdUYWd8fCJAQHRvU3RyaW5nVGFnIjtmdW5jdGlvbiBmKHIsdCxuKXtyZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHIsdCx7dmFsdWU6bix0OiEwLGk6ITAsd3JpdGFibGU6ITB9KSxyW3RdfXRyeXtmKHt9LCIiKX1jYXRjaChyKXtmPWZ1bmN0aW9uKHIsdCxuKXtyZXR1cm4gclt0XT1ufX1mdW5jdGlvbiBhKHIsdCxuLGUpe3ZhciBpPXQmJnQucHJvdG90eXBlIGluc3RhbmNlb2Ygdj90OnYsbz1PYmplY3QuY3JlYXRlKGkucHJvdG90eXBlKSx1PW5ldyBqKGV8fFtdKTtyZXR1cm4gby5kdD1mdW5jdGlvbihyLHQsbil7dmFyIGU9InN1c3BlbmRlZFN0YXJ0IjtyZXR1cm4gZnVuY3Rpb24oaSxvKXtpZigiZXhlY3V0aW5nIj09PWUpdGhyb3cgRXJyb3IoIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmciKTtpZigiY29tcGxldGVkIj09PWUpe2lmKCJ0aHJvdyI9PT1pKXRocm93IG87cmV0dXJue3ZhbHVlOnZvaWQgMCxkb25lOiEwfX1mb3Iobi5tZXRob2Q9aSxuLnl0PW87Oyl7dmFyIHU9bi53dDtpZih1KXt2YXIgZj1tKHUsbik7aWYoZil7aWYoZj09PXMpY29udGludWU7cmV0dXJuIGZ9fWlmKCJuZXh0Ij09PW4ubWV0aG9kKW4uYnQ9bi5ndD1uLnl0O2Vsc2UgaWYoInRocm93Ij09PW4ubWV0aG9kKXtpZigic3VzcGVuZGVkU3RhcnQiPT09ZSl0aHJvdyBlPSJjb21wbGV0ZWQiLG4ueXQ7bi5TdChuLnl0KX1lbHNlInJldHVybiI9PT1uLm1ldGhvZCYmbi5BdCgicmV0dXJuIixuLnl0KTtlPSJleGVjdXRpbmciO3ZhciBhPWMocix0LG4pO2lmKCJub3JtYWwiPT09YS50eXBlKXtpZihlPW4uZG9uZT8iY29tcGxldGVkIjoic3VzcGVuZGVkWWllbGQiLGEueXQ9PT1zKWNvbnRpbnVlO3JldHVybnt2YWx1ZTphLnl0LGRvbmU6bi5kb25lfX0idGhyb3ciPT09YS50eXBlJiYoZT0iY29tcGxldGVkIixuLm1ldGhvZD0idGhyb3ciLG4ueXQ9YS55dCl9fX0ocixuLHUpLG99ZnVuY3Rpb24gYyhyLHQsbil7dHJ5e3JldHVybnt0eXBlOiJub3JtYWwiLHl0OnIuY2FsbCh0LG4pfX1jYXRjaChyKXtyZXR1cm57dHlwZToidGhyb3ciLHl0OnJ9fX1yLndyYXA9YTt2YXIgcz17fTtmdW5jdGlvbiB2KCl7fWZ1bmN0aW9uIGgoKXt9ZnVuY3Rpb24gbCgpe312YXIgZD17fTtmKGQsaSwoZnVuY3Rpb24oKXtyZXR1cm4gdGhpc30pKTt2YXIgeT1PYmplY3QuZ2V0UHJvdG90eXBlT2Ysdz15JiZ5KHkoTyhbXSkpKTt3JiZ3IT09dCYmbi5jYWxsKHcsaSkmJihkPXcpO3ZhciBiPWwucHJvdG90eXBlPXYucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoZCk7ZnVuY3Rpb24gcChyKXtbIm5leHQiLCJ0aHJvdyIsInJldHVybiJdLmZvckVhY2goKGZ1bmN0aW9uKHQpe2Yocix0LChmdW5jdGlvbihyKXtyZXR1cm4gdGhpcy5kdCh0LHIpfSkpfSkpfWZ1bmN0aW9uIGcocix0KXtmdW5jdGlvbiBlKGksbyx1LGYpe3ZhciBhPWMocltpXSxyLG8pO2lmKCJ0aHJvdyIhPT1hLnR5cGUpe3ZhciBzPWEueXQsdj1zLnZhbHVlO3JldHVybiB2JiYib2JqZWN0Ij09X2oodikmJm4uY2FsbCh2LCJfX2F3YWl0Iik/dC5yZXNvbHZlKHYuanQpLnRoZW4oKGZ1bmN0aW9uKHIpe2UoIm5leHQiLHIsdSxmKX0pLChmdW5jdGlvbihyKXtlKCJ0aHJvdyIscix1LGYpfSkpOnQucmVzb2x2ZSh2KS50aGVuKChmdW5jdGlvbihyKXtzLnZhbHVlPXIsdShzKX0pLChmdW5jdGlvbihyKXtyZXR1cm4gZSgidGhyb3ciLHIsdSxmKX0pKX1mKGEueXQpfXZhciBpO3RoaXMuZHQ9ZnVuY3Rpb24ocixuKXtmdW5jdGlvbiBvKCl7cmV0dXJuIG5ldyB0KChmdW5jdGlvbih0LGkpe2UocixuLHQsaSl9KSl9cmV0dXJuIGk9aT9pLnRoZW4obyxvKTpvKCl9fWZ1bmN0aW9uIG0ocix0KXt2YXIgbj1yLml0ZXJhdG9yW3QubWV0aG9kXTtpZih2b2lkIDA9PT1uKXtpZih0Lnd0PW51bGwsInRocm93Ij09PXQubWV0aG9kKXtpZihyLml0ZXJhdG9yLkgmJih0Lm1ldGhvZD0icmV0dXJuIix0Lnl0PXZvaWQgMCxtKHIsdCksInRocm93Ij09PXQubWV0aG9kKSlyZXR1cm4gczt0Lm1ldGhvZD0idGhyb3ciLHQueXQ9bmV3IFR5cGVFcnJvcigiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAndGhyb3cnIG1ldGhvZCIpfXJldHVybiBzfXZhciBlPWMobixyLml0ZXJhdG9yLHQueXQpO2lmKCJ0aHJvdyI9PT1lLnR5cGUpcmV0dXJuIHQubWV0aG9kPSJ0aHJvdyIsdC55dD1lLnl0LHQud3Q9bnVsbCxzO3ZhciBpPWUueXQ7cmV0dXJuIGk/aS5kb25lPyh0W3IuT3RdPWkudmFsdWUsdC5uZXh0PXIua3QsInJldHVybiIhPT10Lm1ldGhvZCYmKHQubWV0aG9kPSJuZXh0Iix0Lnl0PXZvaWQgMCksdC53dD1udWxsLHMpOmk6KHQubWV0aG9kPSJ0aHJvdyIsdC55dD1uZXcgVHlwZUVycm9yKCJpdGVyYXRvciByZXN1bHQgaXMgbm90IGFuIG9iamVjdCIpLHQud3Q9bnVsbCxzKX1mdW5jdGlvbiBTKHIpe3ZhciB0PXtFdDpyWzBdfTsxIGluIHImJih0LlR0PXJbMV0pLDIgaW4gciYmKHQueHQ9clsyXSx0LlV0PXJbM10pLHRoaXMuTXQucHVzaCh0KX1mdW5jdGlvbiBBKHIpe3ZhciB0PXIuSXR8fHt9O3QudHlwZT0ibm9ybWFsIixkZWxldGUgdC55dCxyLkl0PXR9ZnVuY3Rpb24gaihyKXt0aGlzLk10PVt7RXQ6InJvb3QifV0sci5mb3JFYWNoKFMsdGhpcyksdGhpcy5yZXNldCghMCl9ZnVuY3Rpb24gTyhyKXtpZihyKXt2YXIgdD1yW2ldO2lmKHQpcmV0dXJuIHQuY2FsbChyKTtpZigiZnVuY3Rpb24iPT10eXBlb2Ygci5uZXh0KXJldHVybiByO2lmKCFpc05hTihyLmxlbmd0aCkpe3ZhciBlPS0xLG89ZnVuY3Rpb24gdCgpe2Zvcig7KytlPHIubGVuZ3RoOylpZihuLmNhbGwocixlKSlyZXR1cm4gdC52YWx1ZT1yW2VdLHQuZG9uZT0hMSx0O3JldHVybiB0LnZhbHVlPXZvaWQgMCx0LmRvbmU9ITAsdH07cmV0dXJuIG8ubmV4dD1vfX1yZXR1cm57bmV4dDprfX1mdW5jdGlvbiBrKCl7cmV0dXJue3ZhbHVlOnZvaWQgMCxkb25lOiEwfX1yZXR1cm4gaC5wcm90b3R5cGU9bCxmKGIsImNvbnN0cnVjdG9yIixsKSxmKGwsImNvbnN0cnVjdG9yIixoKSxoLmRpc3BsYXlOYW1lPWYobCx1LCJHZW5lcmF0b3JGdW5jdGlvbiIpLHIuX3Q9ZnVuY3Rpb24ocil7dmFyIHQ9ImZ1bmN0aW9uIj09dHlwZW9mIHImJnIuY29uc3RydWN0b3I7cmV0dXJuISF0JiYodD09PWh8fCJHZW5lcmF0b3JGdW5jdGlvbiI9PT0odC5kaXNwbGF5TmFtZXx8dC5uYW1lKSl9LHIubWFyaz1mdW5jdGlvbihyKXtyZXR1cm4gT2JqZWN0LnNldFByb3RvdHlwZU9mP09iamVjdC5zZXRQcm90b3R5cGVPZihyLGwpOihyLl9fcHJvdG9fXz1sLGYocix1LCJHZW5lcmF0b3JGdW5jdGlvbiIpKSxyLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKGIpLHJ9LHIuTHQ9ZnVuY3Rpb24ocil7cmV0dXJue2p0OnJ9fSxwKGcucHJvdG90eXBlKSxmKGcucHJvdG90eXBlLG8sKGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXN9KSksci5QdD1nLHIuYXN5bmM9ZnVuY3Rpb24odCxuLGUsaSxvKXt2b2lkIDA9PT1vJiYobz1Qcm9taXNlKTt2YXIgdT1uZXcgZyhhKHQsbixlLGkpLG8pO3JldHVybiByLl90KG4pP3U6dS5uZXh0KCkudGhlbigoZnVuY3Rpb24ocil7cmV0dXJuIHIuZG9uZT9yLnZhbHVlOnUubmV4dCgpfSkpfSxwKGIpLGYoYix1LCJHZW5lcmF0b3IiKSxmKGIsaSwoZnVuY3Rpb24oKXtyZXR1cm4gdGhpc30pKSxmKGIsInRvU3RyaW5nIiwoZnVuY3Rpb24oKXtyZXR1cm4iW29iamVjdCBHZW5lcmF0b3JdIn0pKSxyLmtleXM9ZnVuY3Rpb24ocil7dmFyIHQ9W107Zm9yKHZhciBuIGluIHIpdC5wdXNoKG4pO3JldHVybiB0LnJldmVyc2UoKSxmdW5jdGlvbiBuKCl7Zm9yKDt0Lmxlbmd0aDspe3ZhciBlPXQucG9wKCk7aWYoZSBpbiByKXJldHVybiBuLnZhbHVlPWUsbi5kb25lPSExLG59cmV0dXJuIG4uZG9uZT0hMCxufX0sci52YWx1ZXM9TyxqLnByb3RvdHlwZT17Y29uc3RydWN0b3I6aixyZXNldDpmdW5jdGlvbihyKXtpZih0aGlzLlJ0PTAsdGhpcy5uZXh0PTAsdGhpcy5idD10aGlzLmd0PXZvaWQgMCx0aGlzLmRvbmU9ITEsdGhpcy53dD1udWxsLHRoaXMubWV0aG9kPSJuZXh0Iix0aGlzLnl0PXZvaWQgMCx0aGlzLk10LmZvckVhY2goQSksIXIpZm9yKHZhciB0IGluIHRoaXMpInQiPT09dC5jaGFyQXQoMCkmJm4uY2FsbCh0aGlzLHQpJiYhaXNOYU4oK3Quc2xpY2UoMSkpJiYodGhpc1t0XT12b2lkIDApfSxzdG9wOmZ1bmN0aW9uKCl7dGhpcy5kb25lPSEwO3ZhciByPXRoaXMuTXRbMF0uSXQ7aWYoInRocm93Ij09PXIudHlwZSl0aHJvdyByLnl0O3JldHVybiB0aGlzLk50fSxTdDpmdW5jdGlvbihyKXtpZih0aGlzLmRvbmUpdGhyb3cgcjt2YXIgdD10aGlzO2Z1bmN0aW9uIGUobixlKXtyZXR1cm4gdS50eXBlPSJ0aHJvdyIsdS55dD1yLHQubmV4dD1uLGUmJih0Lm1ldGhvZD0ibmV4dCIsdC55dD12b2lkIDApLCEhZX1mb3IodmFyIGk9dGhpcy5NdC5sZW5ndGgtMTtpPj0wOy0taSl7dmFyIG89dGhpcy5NdFtpXSx1PW8uSXQ7aWYoInJvb3QiPT09by5FdClyZXR1cm4gZSgiZW5kIik7aWYoby5FdDw9dGhpcy5SdCl7dmFyIGY9bi5jYWxsKG8sImNhdGNoTG9jIiksYT1uLmNhbGwobywiZmluYWxseUxvYyIpO2lmKGYmJmEpe2lmKHRoaXMuUnQ8by5UdClyZXR1cm4gZShvLlR0LCEwKTtpZih0aGlzLlJ0PG8ueHQpcmV0dXJuIGUoby54dCl9ZWxzZSBpZihmKXtpZih0aGlzLlJ0PG8uVHQpcmV0dXJuIGUoby5UdCwhMCl9ZWxzZXtpZighYSl0aHJvdyBFcnJvcigidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHkiKTtpZih0aGlzLlJ0PG8ueHQpcmV0dXJuIGUoby54dCl9fX19LEF0OmZ1bmN0aW9uKHIsdCl7Zm9yKHZhciBlPXRoaXMuTXQubGVuZ3RoLTE7ZT49MDstLWUpe3ZhciBpPXRoaXMuTXRbZV07aWYoaS5FdDw9dGhpcy5SdCYmbi5jYWxsKGksImZpbmFsbHlMb2MiKSYmdGhpcy5SdDxpLnh0KXt2YXIgbz1pO2JyZWFrfX1vJiYoImJyZWFrIj09PXJ8fCJjb250aW51ZSI9PT1yKSYmby5FdDw9dCYmdDw9by54dCYmKG89bnVsbCk7dmFyIHU9bz9vLkl0Ont9O3JldHVybiB1LnR5cGU9cix1Lnl0PXQsbz8odGhpcy5tZXRob2Q9Im5leHQiLHRoaXMubmV4dD1vLnh0LHMpOnRoaXMuY29tcGxldGUodSl9LGNvbXBsZXRlOmZ1bmN0aW9uKHIsdCl7aWYoInRocm93Ij09PXIudHlwZSl0aHJvdyByLnl0O3JldHVybiJicmVhayI9PT1yLnR5cGV8fCJjb250aW51ZSI9PT1yLnR5cGU/dGhpcy5uZXh0PXIueXQ6InJldHVybiI9PT1yLnR5cGU/KHRoaXMuTnQ9dGhpcy55dD1yLnl0LHRoaXMubWV0aG9kPSJyZXR1cm4iLHRoaXMubmV4dD0iZW5kIik6Im5vcm1hbCI9PT1yLnR5cGUmJnQmJih0aGlzLm5leHQ9dCksc30sZmluaXNoOmZ1bmN0aW9uKHIpe2Zvcih2YXIgdD10aGlzLk10Lmxlbmd0aC0xO3Q+PTA7LS10KXt2YXIgbj10aGlzLk10W3RdO2lmKG4ueHQ9PT1yKXJldHVybiB0aGlzLmNvbXBsZXRlKG4uSXQsbi5VdCksQShuKSxzfX0sY2F0Y2g6ZnVuY3Rpb24ocil7Zm9yKHZhciB0PXRoaXMuTXQubGVuZ3RoLTE7dD49MDstLXQpe3ZhciBuPXRoaXMuTXRbdF07aWYobi5FdD09PXIpe3ZhciBlPW4uSXQ7aWYoInRocm93Ij09PWUudHlwZSl7dmFyIGk9ZS55dDtBKG4pfXJldHVybiBpfX10aHJvdyBFcnJvcigiaWxsZWdhbCBjYXRjaCBhdHRlbXB0Iil9LEN0OmZ1bmN0aW9uKHIsdCxuKXtyZXR1cm4gdGhpcy53dD17aXRlcmF0b3I6TyhyKSxPdDp0LGt0Om59LCJuZXh0Ij09PXRoaXMubWV0aG9kJiYodGhpcy55dD12b2lkIDApLHN9fSxyfWZ1bmN0aW9uIFBqKHIsdCxuLGUsaSxvLHUpe3RyeXt2YXIgZj1yW29dKHUpLGE9Zi52YWx1ZX1jYXRjaChyKXtyZXR1cm4gdm9pZCBuKHIpfWYuZG9uZT90KGEpOlByb21pc2UucmVzb2x2ZShhKS50aGVuKGUsaSl9ZnVuY3Rpb24gUmoocil7cmV0dXJuIGZ1bmN0aW9uKCl7dmFyIHQ9dGhpcyxuPWFyZ3VtZW50cztyZXR1cm4gbmV3IFByb21pc2UoKGZ1bmN0aW9uKGUsaSl7dmFyIG89ci5hcHBseSh0LG4pO2Z1bmN0aW9uIHUocil7UGoobyxlLGksdSxmLCJuZXh0IixyKX1mdW5jdGlvbiBmKHIpe1BqKG8sZSxpLHUsZiwidGhyb3ciLHIpfXUodm9pZCAwKX0pKX19dmFyIE5qLENqPXtpbml0OmZ1bmN0aW9uKHIpe3Iuc2NyaXB0cyYmci5zY3JpcHRzLmxlbmd0aCYmaW1wb3J0U2NyaXB0cy5hcHBseSh2b2lkIDAsci5zY3JpcHRzKTt2YXIgdCxuPXIub3B0aW9ucztzZWxmLmluaXRDb2RlYyYmc2VsZi5pbml0Q29kZWMoKSxuLmNvZGVjVHlwZS5zdGFydHNXaXRoKCJkZWZsYXRlIik/dD1zZWxmLkRlZmxhdGU6bi5jb2RlY1R5cGUuc3RhcnRzV2l0aCgiaW5mbGF0ZSIpJiYodD1zZWxmLkluZmxhdGUpLE5qPWZ1bmN0aW9uKHIsdCxuKXtyZXR1cm4gdC5jb2RlY1R5cGUuc3RhcnRzV2l0aCgiZGVmbGF0ZSIpP25ldyBJaihyLHQsbik6dC5jb2RlY1R5cGUuc3RhcnRzV2l0aCgiaW5mbGF0ZSIpP25ldyBNaihyLHQsbik6dm9pZCAwfSh0LG4sci5jb25maWcpfSxhcHBlbmQ6ZnVuY3Rpb24ocil7cmV0dXJuIFJqKExqKCkubWFyaygoZnVuY3Rpb24gdCgpe3JldHVybiBMaigpLndyYXAoKGZ1bmN0aW9uKHQpe2Zvcig7Oylzd2l0Y2godC5SdD10Lm5leHQpe2Nhc2UgMDpyZXR1cm4gdC5uZXh0PTIsTmouYXBwZW5kKHIuZGF0YSk7Y2FzZSAyOnJldHVybiB0LlF0PXQuYnQsdC5BdCgicmV0dXJuIix7ZGF0YTp0LlF0fSk7Y2FzZSA0OmNhc2UiZW5kIjpyZXR1cm4gdC5zdG9wKCl9fSksdCl9KSkpKCl9LGZsdXNoOmZ1bmN0aW9uKCl7cmV0dXJuIE5qLmZsdXNoKCl9fTthZGRFdmVudExpc3RlbmVyKCJtZXNzYWdlIixmdW5jdGlvbigpe3ZhciByPVJqKExqKCkubWFyaygoZnVuY3Rpb24gcih0KXt2YXIgbixlLGksbztyZXR1cm4gTGooKS53cmFwKChmdW5jdGlvbihyKXtmb3IoOzspc3dpdGNoKHIuUnQ9ci5uZXh0KXtjYXNlIDA6aWYobj10LmRhdGEsZT1uLnR5cGUsIShpPUNqW2VdKSl7ci5uZXh0PTE5O2JyZWFrfXJldHVybiByLlJ0PTQsbi5kYXRhJiYobi5kYXRhPW5ldyBVaW50OEFycmF5KG4uZGF0YSkpLHIubmV4dD04LGkobik7Y2FzZSA4OmlmKHIuUXQ9ci5idCxyLlF0KXtyLm5leHQ9MTE7YnJlYWt9ci5RdD17fTtjYXNlIDExOmlmKChvPXIuUXQpLnR5cGU9ZSxvLmRhdGEpdHJ5e28uZGF0YT1vLmRhdGEuYnVmZmVyLHBvc3RNZXNzYWdlKG8sW28uZGF0YV0pfWNhdGNoKHIpe3Bvc3RNZXNzYWdlKG8pfWVsc2UgcG9zdE1lc3NhZ2Uobyk7ci5uZXh0PTE5O2JyZWFrO2Nhc2UgMTY6ci5SdD0xNixyLnJuPXIuY2F0Y2goNCkscG9zdE1lc3NhZ2Uoe3R5cGU6ZSxlcnJvcjp7bWVzc2FnZTpyLnJuLm1lc3NhZ2Usc3RhY2s6ci5ybi5zdGFja319KTtjYXNlIDE5OmNhc2UiZW5kIjpyZXR1cm4gci5zdG9wKCl9fSkscixudWxsLFtbNCwxNl1dKX0pKSk7cmV0dXJuIGZ1bmN0aW9uKHQpe3JldHVybiByLmFwcGx5KHRoaXMsYXJndW1lbnRzKX19KCkpO3ZhciBGaj1ucy5tYXA7QmUoe3RhcmdldDoiQXJyYXkiLEQ6ITAsRjohSm0oIm1hcCIpfSx7bWFwOmZ1bmN0aW9uKHIpe3JldHVybiBGaih0aGlzLHIsYXJndW1lbnRzLmxlbmd0aD4xP2FyZ3VtZW50c1sxXTp2b2lkIDApfX0pO3ZhciBCaj1IaTtCZSh7dGFyZ2V0OiJBcnJheSIsRDohMH0se2ZpbGw6Z3V9KSxCaigiZmlsbCIpLCgwLHNhLmV4cG9ydHMpKCJVaW50MTYiLChmdW5jdGlvbihyKXtyZXR1cm4gZnVuY3Rpb24odCxuLGUpe3JldHVybiByKHRoaXMsdCxuLGUpfX0pKTt2YXIgRGosR2osWWosVmosemo9anQsV2o9aSwkaj1uLlJlZ0V4cCxIaj1XaigoZnVuY3Rpb24oKXt2YXIgcj0kaigiYSIsInkiKTtyZXR1cm4gci5sYXN0SW5kZXg9MixudWxsIT1yLmV4ZWMoImFiY2QiKX0pKSxLaj1Ianx8V2ooKGZ1bmN0aW9uKCl7cmV0dXJuISRqKCJhIiwieSIpLnN0aWNreX0pKSxxaj17dG46SGp8fFdqKChmdW5jdGlvbigpe3ZhciByPSRqKCJeciIsImd5Iik7cmV0dXJuIHIubGFzdEluZGV4PTIsbnVsbCE9ci5leGVjKCJzdHIiKX0pKSxubjpLaixlbjpIan0sSmo9aSxYaj1uLlJlZ0V4cCxRaj1KaigoZnVuY3Rpb24oKXt2YXIgcj1YaigiLiIsInMiKTtyZXR1cm4hKHIuZG90QWxsJiZyLmV4ZWMoIlxuIikmJiJzIj09PXIuZmxhZ3MpfSkpLFpqPWksck89bi5SZWdFeHAsdE89WmooKGZ1bmN0aW9uKCl7dmFyIHI9ck8oIig/PGE+YikiLCJnIik7cmV0dXJuImIiIT09ci5leGVjKCJiIikub24uYXx8ImJjIiE9PSJiIi5yZXBsYWNlKHIsIiQ8YT5jIil9KSksbk89YSxlTz1TLGlPPVFlLG9PPWZ1bmN0aW9uKCl7dmFyIHI9emoodGhpcyksdD0iIjtyZXR1cm4gci5oYXNJbmRpY2VzJiYodCs9ImQiKSxyLmdsb2JhbCYmKHQrPSJnIiksci5pZ25vcmVDYXNlJiYodCs9ImkiKSxyLm11bHRpbGluZSYmKHQrPSJtIiksci5kb3RBbGwmJih0Kz0icyIpLHIudW5pY29kZSYmKHQrPSJ1Iiksci5zdGlja3kmJih0Kz0ieSIpLHR9LHVPPXFqLGZPPXByLmV4cG9ydHMsYU89RmksY089bW4uZ2V0LHNPPVFqLHZPPXRPLGhPPWZPKCJuYXRpdmUtc3RyaW5nLXJlcGxhY2UiLCIiLnJlcGxhY2UpLGxPPS90Ly5leGVjLGRPPWxPLHlPPWVPKCIiLmNoYXJBdCksd089ZU8oIiIuaW5kZXhPZiksYk89ZU8oIiIucmVwbGFjZSkscE89ZU8oIiIuc2xpY2UpLGdPPShHaj0vYiovZyxuTyhsTyxEaj0vYS8sImEiKSxuTyhsTyxHaiwiYSIpLDAhPT1Eai5sYXN0SW5kZXh8fDAhPT1Hai5sYXN0SW5kZXgpLG1PPXVPLnRuLFNPPXZvaWQgMCE9PS8oKT8/Ly5leGVjKCIiKVsxXTtmdW5jdGlvbiBBTyhyKXtyZXR1cm4gZnVuY3Rpb24ocil7aWYoQXJyYXkuaXNBcnJheShyKSlyZXR1cm4gT08ocil9KHIpfHxmdW5jdGlvbihyKXtpZigidW5kZWZpbmVkIiE9dHlwZW9mIFN5bWJvbCYmbnVsbCE9cltTeW1ib2wuaXRlcmF0b3JdfHxudWxsIT1yWyJAQGl0ZXJhdG9yIl0pcmV0dXJuIEFycmF5LmZyb20ocil9KHIpfHxqTyhyKXx8ZnVuY3Rpb24oKXt0aHJvdyBuZXcgVHlwZUVycm9yKCJJbnZhbGlkIGF0dGVtcHQgdG8gc3ByZWFkIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC4iKX0oKX1mdW5jdGlvbiBqTyhyLHQpe2lmKHIpe2lmKCJzdHJpbmciPT10eXBlb2YgcilyZXR1cm4gT08ocix0KTt2YXIgbj17fS50b1N0cmluZy5jYWxsKHIpLnNsaWNlKDgsLTEpO3JldHVybiJPYmplY3QiPT09biYmci5jb25zdHJ1Y3RvciYmKG49ci5jb25zdHJ1Y3Rvci5uYW1lKSwiTWFwIj09PW58fCJTZXQiPT09bj9BcnJheS5mcm9tKHIpOiJBcmd1bWVudHMiPT09bnx8L14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3Qobik/T08ocix0KTp2b2lkIDB9fWZ1bmN0aW9uIE9PKHIsdCl7KG51bGw9PXR8fHQ+ci5sZW5ndGgpJiYodD1yLmxlbmd0aCk7Zm9yKHZhciBuPTAsZT1BcnJheSh0KTt0Pm47bisrKWVbbl09cltuXTtyZXR1cm4gZX1mdW5jdGlvbiBrTyhyKXtyZXR1cm4gRU8oci5tYXAoKGZ1bmN0aW9uKHIpe3ZhciB0LG49ZnVuY3Rpb24ocil7aWYoQXJyYXkuaXNBcnJheShyKSlyZXR1cm4gcn0odD1yKXx8ZnVuY3Rpb24ocil7dmFyIHQ9bnVsbD09cj9udWxsOiJ1bmRlZmluZWQiIT10eXBlb2YgU3ltYm9sJiZyW1N5bWJvbC5pdGVyYXRvcl18fHJbIkBAaXRlcmF0b3IiXTtpZihudWxsIT10KXt2YXIgbixlLGk9W10sbz0hMCx1PSExO3RyeXtmb3IodD10LmNhbGwocik7IShvPShuPXQubmV4dCgpKS5kb25lKSYmKGkucHVzaChuLnZhbHVlKSwyIT09aS5sZW5ndGgpO289ITApO31jYXRjaChyKXt1PSEwLGU9cn1maW5hbGx5e3RyeXtvfHxudWxsPT10Lkh8fHQuSCgpfWZpbmFsbHl7aWYodSl0aHJvdyBlfX1yZXR1cm4gaX19KHQpfHxqTyh0LDIpfHxmdW5jdGlvbigpe3Rocm93IG5ldyBUeXBlRXJyb3IoIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuIil9KCksZT1uWzBdLGk9blsxXTtyZXR1cm4gQXJyYXkoZSkuZmlsbChpLDAsZSl9KSkpfWZ1bmN0aW9uIEVPKHIpe3JldHVybiByLnJlZHVjZSgoZnVuY3Rpb24ocix0KXtyZXR1cm4gci5jb25jYXQoQXJyYXkuaXNBcnJheSh0KT9FTyh0KTp0KX0pLFtdKX0oZ098fFNPfHxtT3x8c098fHZPKSYmKGRPPWZ1bmN0aW9uKHIpe3ZhciB0LG4sZSxpLG8sdSxmLGE9dGhpcyxjPWNPKGEpLHM9aU8ociksdj1jLnJhdztpZih2KXJldHVybiB2Lmxhc3RJbmRleD1hLmxhc3RJbmRleCx0PW5PKGRPLHYscyksYS5sYXN0SW5kZXg9di5sYXN0SW5kZXgsdDt2YXIgaD1jLm9uLGw9bU8mJmEuc3RpY2t5LGQ9bk8ob08sYSkseT1hLnNvdXJjZSx3PTAsYj1zO2lmKGwmJihkPWJPKGQsInkiLCIiKSwtMT09PXdPKGQsImciKSYmKGQrPSJnIiksYj1wTyhzLGEubGFzdEluZGV4KSxhLmxhc3RJbmRleD4wJiYoIWEubXVsdGlsaW5lfHxhLm11bHRpbGluZSYmIlxuIiE9PXlPKHMsYS5sYXN0SW5kZXgtMSkpJiYoeT0iKD86ICIreSsiKSIsYj0iICIrYix3KyspLG49UmVnRXhwKCJeKD86Iit5KyIpIixkKSksU08mJihuPVJlZ0V4cCgiXiIreSsiJCg/IVxccykiLGQpKSxnTyYmKGU9YS5sYXN0SW5kZXgpLGk9bk8obE8sbD9uOmEsYiksbD9pPyhpLmlucHV0PXBPKGkuaW5wdXQsdyksaVswXT1wTyhpWzBdLHcpLGkuaW5kZXg9YS5sYXN0SW5kZXgsYS5sYXN0SW5kZXgrPWlbMF0ubGVuZ3RoKTphLmxhc3RJbmRleD0wOmdPJiZpJiYoYS5sYXN0SW5kZXg9YS5nbG9iYWw/aS5pbmRleCtpWzBdLmxlbmd0aDplKSxTTyYmaSYmaS5sZW5ndGg+MSYmbk8oaE8saVswXSxuLChmdW5jdGlvbigpe2ZvcihvPTE7YXJndW1lbnRzLmxlbmd0aC0yPm87bysrKXZvaWQgMD09PWFyZ3VtZW50c1tvXSYmKGlbb109dm9pZCAwKX0pKSxpJiZoKWZvcihpLm9uPXU9YU8obnVsbCksbz0wO288aC5sZW5ndGg7bysrKXVbKGY9aFtvXSlbMF1dPWlbZlsxXV07cmV0dXJuIGl9KSxCZSh7dGFyZ2V0OiJSZWdFeHAiLEQ6ITAsRjovLi8uZXhlYyE9PWRPfSx7ZXhlYzpkT30pO3ZhciBUTz0oWWo9WzAsMSwyLDNdKS5jb25jYXQuYXBwbHkoWWosQU8oa08oW1syLDRdLFsyLDVdLFs0LDZdLFs0LDddLFs4LDhdLFs4LDldLFsxNiwxMF0sWzE2LDExXSxbMzIsMTJdLFszMiwxM10sWzY0LDE0XSxbNjQsMTVdLFsyLDBdLFsxLDE2XSxbMSwxN10sWzIsMThdLFsyLDE5XSxbNCwyMF0sWzQsMjFdLFs4LDIyXSxbOCwyM10sWzE2LDI0XSxbMTYsMjVdLFszMiwyNl0sWzMyLDI3XSxbNjQsMjhdLFs2NCwyOV1dKSkpO2Z1bmN0aW9uIHhPKCl7dmFyIHI9dGhpcztmdW5jdGlvbiB0KHIsdCl7dmFyIG49MDtkb3tufD0xJnIscj4+Pj0xLG48PD0xfXdoaWxlKC0tdD4wKTtyZXR1cm4gbj4+PjF9ci51bj1mdW5jdGlvbihuKXt2YXIgZSxpLG8sdT1yLmZuLGY9ci5jbi5hbixhPXIuY24uc24sYz0tMTtmb3Iobi52bj0wLG4uaG49NTczLGU9MDthPmU7ZSsrKTAhPT11WzIqZV0/KG4ubG5bKytuLnZuXT1jPWUsbi5kbltlXT0wKTp1WzIqZSsxXT0wO2Zvcig7Mj5uLnZuOyl1WzIqKG89bi5sblsrK24udm5dPTI+Yz8rK2M6MCldPTEsbi5kbltvXT0wLG4ueW4tLSxmJiYobi53bi09ZlsyKm8rMV0pO2ZvcihyLmJuPWMsZT1NYXRoLmZsb29yKG4udm4vMik7ZT49MTtlLS0pbi5wbih1LGUpO289YTtkb3tlPW4ubG5bMV0sbi5sblsxXT1uLmxuW24udm4tLV0sbi5wbih1LDEpLGk9bi5sblsxXSxuLmxuWy0tbi5obl09ZSxuLmxuWy0tbi5obl09aSx1WzIqb109dVsyKmVdK3VbMippXSxuLmRuW29dPU1hdGgubWF4KG4uZG5bZV0sbi5kbltpXSkrMSx1WzIqZSsxXT11WzIqaSsxXT1vLG4ubG5bMV09bysrLG4ucG4odSwxKX13aGlsZShuLnZuPj0yKTtuLmxuWy0tbi5obl09bi5sblsxXSxmdW5jdGlvbih0KXt2YXIgbixlLGksbyx1LGYsYT1yLmZuLGM9ci5jbi5hbixzPXIuY24uZ24sdj1yLmNuLm1uLGg9ci5jbi5TbixsPTA7Zm9yKG89MDsxNT49bztvKyspdC5BbltvXT0wO2ZvcihhWzIqdC5sblt0LmhuXSsxXT0wLG49dC5obisxOzU3Mz5uO24rKykobz1hWzIqYVsyKihlPXQubG5bbl0pKzFdKzFdKzEpPmgmJihvPWgsbCsrKSxhWzIqZSsxXT1vLGU+ci5ibnx8KHQuQW5bb10rKyx1PTAsdj5lfHwodT1zW2Utdl0pLGY9YVsyKmVdLHQueW4rPWYqKG8rdSksYyYmKHQud24rPWYqKGNbMiplKzFdK3UpKSk7aWYoMCE9PWwpe2Rve2ZvcihvPWgtMTswPT09dC5BbltvXTspby0tO3QuQW5bb10tLSx0LkFuW28rMV0rPTIsdC5BbltoXS0tLGwtPTJ9d2hpbGUobD4wKTtmb3Iobz1oOzAhPT1vO28tLSlmb3IoZT10LkFuW29dOzAhPT1lOykoaT10LmxuWy0tbl0pPnIuYm58fChhWzIqaSsxXSE9byYmKHQueW4rPShvLWFbMippKzFdKSphWzIqaV0sYVsyKmkrMV09byksZS0tKX19KG4pLGZ1bmN0aW9uKHIsbixlKXt2YXIgaSxvLHUsZj1bXSxhPTA7Zm9yKGk9MTsxNT49aTtpKyspZltpXT1hPWErZVtpLTFdPDwxO2ZvcihvPTA7bj49bztvKyspMCE9PSh1PXJbMipvKzFdKSYmKHJbMipvXT10KGZbdV0rKyx1KSl9KHUsci5ibixuLkFuKX19ZnVuY3Rpb24gVU8ocix0LG4sZSxpKXt2YXIgbz10aGlzO28uYW49cixvLmduPXQsby5tbj1uLG8uc249ZSxvLlNuPWl9eE8uam49KFZqPVswLDEsMiwzLDQsNSw2LDddKS5jb25jYXQuYXBwbHkoVmosQU8oa08oW1syLDhdLFsyLDldLFsyLDEwXSxbMiwxMV0sWzQsMTJdLFs0LDEzXSxbNCwxNF0sWzQsMTVdLFs4LDE2XSxbOCwxN10sWzgsMThdLFs4LDE5XSxbMTYsMjBdLFsxNiwyMV0sWzE2LDIyXSxbMTYsMjNdLFszMiwyNF0sWzMyLDI1XSxbMzIsMjZdLFszMSwyN10sWzEsMjhdXSkpKSx4Ty5Pbj1bMCwxLDIsMyw0LDUsNiw3LDgsMTAsMTIsMTQsMTYsMjAsMjQsMjgsMzIsNDAsNDgsNTYsNjQsODAsOTYsMTEyLDEyOCwxNjAsMTkyLDIyNCwwXSx4Ty5rbj1bMCwxLDIsMyw0LDYsOCwxMiwxNiwyNCwzMiw0OCw2NCw5NiwxMjgsMTkyLDI1NiwzODQsNTEyLDc2OCwxMDI0LDE1MzYsMjA0OCwzMDcyLDQwOTYsNjE0NCw4MTkyLDEyMjg4LDE2Mzg0LDI0NTc2XSx4Ty5Fbj1mdW5jdGlvbihyKXtyZXR1cm4gMjU2PnI/VE9bcl06VE9bMjU2KyhyPj4+NyldfSx4Ty5Ubj1bMCwwLDAsMCwwLDAsMCwwLDEsMSwxLDEsMiwyLDIsMiwzLDMsMywzLDQsNCw0LDQsNSw1LDUsNSwwXSx4Ty54bj1bMCwwLDAsMCwxLDEsMiwyLDMsMyw0LDQsNSw1LDYsNiw3LDcsOCw4LDksOSwxMCwxMCwxMSwxMSwxMiwxMiwxMywxM10seE8uVW49WzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMiwzLDddLHhPLk1uPVsxNiwxNywxOCwwLDgsNyw5LDYsMTAsNSwxMSw0LDEyLDMsMTMsMiwxNCwxLDE1XTt2YXIgTU89a08oW1sxNDQsOF0sWzExMiw5XSxbMjQsN10sWzgsOF1dKTtVTy5Jbj1FTyhbMTIsMTQwLDc2LDIwNCw0NCwxNzIsMTA4LDIzNiwyOCwxNTYsOTIsMjIwLDYwLDE4OCwxMjQsMjUyLDIsMTMwLDY2LDE5NCwzNCwxNjIsOTgsMjI2LDE4LDE0Niw4MiwyMTAsNTAsMTc4LDExNCwyNDIsMTAsMTM4LDc0LDIwMiw0MiwxNzAsMTA2LDIzNCwyNiwxNTQsOTAsMjE4LDU4LDE4NiwxMjIsMjUwLDYsMTM0LDcwLDE5OCwzOCwxNjYsMTAyLDIzMCwyMiwxNTAsODYsMjE0LDU0LDE4MiwxMTgsMjQ2LDE0LDE0Miw3OCwyMDYsNDYsMTc0LDExMCwyMzgsMzAsMTU4LDk0LDIyMiw2MiwxOTAsMTI2LDI1NCwxLDEyOSw2NSwxOTMsMzMsMTYxLDk3LDIyNSwxNywxNDUsODEsMjA5LDQ5LDE3NywxMTMsMjQxLDksMTM3LDczLDIwMSw0MSwxNjksMTA1LDIzMywyNSwxNTMsODksMjE3LDU3LDE4NSwxMjEsMjQ5LDUsMTMzLDY5LDE5NywzNywxNjUsMTAxLDIyOSwyMSwxNDksODUsMjEzLDUzLDE4MSwxMTcsMjQ1LDEzLDE0MSw3NywyMDUsNDUsMTczLDEwOSwyMzcsMjksMTU3LDkzLDIyMSw2MSwxODksMTI1LDI1MywxOSwyNzUsMTQ3LDQwMyw4MywzMzksMjExLDQ2Nyw1MSwzMDcsMTc5LDQzNSwxMTUsMzcxLDI0Myw0OTksMTEsMjY3LDEzOSwzOTUsNzUsMzMxLDIwMyw0NTksNDMsMjk5LDE3MSw0MjcsMTA3LDM2MywyMzUsNDkxLDI3LDI4MywxNTUsNDExLDkxLDM0NywyMTksNDc1LDU5LDMxNSwxODcsNDQzLDEyMywzNzksMjUxLDUwNyw3LDI2MywxMzUsMzkxLDcxLDMyNywxOTksNDU1LDM5LDI5NSwxNjcsNDIzLDEwMywzNTksMjMxLDQ4NywyMywyNzksMTUxLDQwNyw4NywzNDMsMjE1LDQ3MSw1NSwzMTEsMTgzLDQzOSwxMTksMzc1LDI0Nyw1MDMsMTUsMjcxLDE0MywzOTksNzksMzM1LDIwNyw0NjMsNDcsMzAzLDE3NSw0MzEsMTExLDM2NywyMzksNDk1LDMxLDI4NywxNTksNDE1LDk1LDM1MSwyMjMsNDc5LDYzLDMxOSwxOTEsNDQ3LDEyNywzODMsMjU1LDUxMSwwLDY0LDMyLDk2LDE2LDgwLDQ4LDExMiw4LDcyLDQwLDEwNCwyNCw4OCw1NiwxMjAsNCw2OCwzNiwxMDAsMjAsODQsNTIsMTE2LDMsMTMxLDY3LDE5NSwzNSwxNjMsOTksMjI3XS5tYXAoKGZ1bmN0aW9uKHIsdCl7cmV0dXJuW3IsTU9bdF1dfSkpKTt2YXIgSU89a08oW1szMCw1XV0pO2Z1bmN0aW9uIF9PKHIsdCxuLGUsaSl7dmFyIG89dGhpcztvLl9uPXIsby5Mbj10LG8uUG49bixvLlJuPWUsby5Obj1pfVVPLkNuPUVPKFswLDE2LDgsMjQsNCwyMCwxMiwyOCwyLDE4LDEwLDI2LDYsMjIsMTQsMzAsMSwxNyw5LDI1LDUsMjEsMTMsMjksMywxOSwxMSwyNyw3LDIzXS5tYXAoKGZ1bmN0aW9uKHIsdCl7cmV0dXJuW3IsSU9bdF1dfSkpKSxVTy5Gbj1uZXcgVU8oVU8uSW4seE8uVG4sMjU3LDI4NiwxNSksVU8uQm49bmV3IFVPKFVPLkNuLHhPLnhuLDAsMzAsMTUpLFVPLkRuPW5ldyBVTyhudWxsLHhPLlVuLDAsMTksNyk7dmFyIExPPVtuZXcgX08oMCwwLDAsMCwwKSxuZXcgX08oNCw0LDgsNCwxKSxuZXcgX08oNCw1LDE2LDgsMSksbmV3IF9PKDQsNiwzMiwzMiwxKSxuZXcgX08oNCw0LDE2LDE2LDIpLG5ldyBfTyg4LDE2LDMyLDMyLDIpLG5ldyBfTyg4LDE2LDEyOCwxMjgsMiksbmV3IF9PKDgsMzIsMTI4LDI1NiwyKSxuZXcgX08oMzIsMTI4LDI1OCwxMDI0LDIpLG5ldyBfTygzMiwyNTgsMjU4LDQwOTYsMildLFBPPVsibmVlZCBkaWN0aW9uYXJ5Iiwic3RyZWFtIGVuZCIsIiIsIiIsInN0cmVhbSBlcnJvciIsImRhdGEgZXJyb3IiLCIiLCJidWZmZXIgZXJyb3IiLCIiLCIiXTtmdW5jdGlvbiBSTyhyLHQsbixlKXt2YXIgaT1yWzIqdF0sbz1yWzIqbl07cmV0dXJuIG8+aXx8aT09byYmZVt0XTw9ZVtuXX1mdW5jdGlvbiBOTygpe3ZhciByLHQsbixlLGksbyx1LGYsYSxjLHMsdixoLGwsZCx5LHcsYixwLGcsbSxTLEEsaixPLGssRSxULHgsVSxNLEksXyxMLFAsUixOLEMsRixCPXRoaXMsRD1uZXcgeE8sRz1uZXcgeE8sWT1uZXcgeE87ZnVuY3Rpb24gVigpe3ZhciByO2ZvcihyPTA7Mjg2PnI7cisrKU1bMipyXT0wO2ZvcihyPTA7MzA+cjtyKyspSVsyKnJdPTA7Zm9yKHI9MDsxOT5yO3IrKylfWzIqcl09MDtNWzUxMl09MSxCLnluPUIud249MCxQPVI9MH1mdW5jdGlvbiB6KHIsdCl7dmFyIG4sZT0tMSxpPXJbMV0sbz0wLHU9NyxmPTQ7MD09PWkmJih1PTEzOCxmPTMpLHJbMioodCsxKSsxXT02NTUzNTtmb3IodmFyIGE9MDt0Pj1hO2ErKyluPWksaT1yWzIqKGErMSkrMV0sKytvPHUmJm49PWl8fChmPm8/X1syKm5dKz1vOjAhPT1uPyhuIT1lJiZfWzIqbl0rKyxfWzMyXSsrKTpvPjEwP19bMzZdKys6X1szNF0rKyxvPTAsZT1uLDA9PT1pPyh1PTEzOCxmPTMpOm49PWk/KHU9NixmPTMpOih1PTcsZj00KSl9ZnVuY3Rpb24gVyhyKXtCLkduW0IucGVuZGluZysrXT1yfWZ1bmN0aW9uICQocil7VygyNTUmciksVyhyPj4+OCYyNTUpfWZ1bmN0aW9uIEgocix0KXt2YXIgbixlPXQ7Rj4xNi1lPygkKEN8PShuPXIpPDxGJjY1NTM1KSxDPW4+Pj4xNi1GLEYrPWUtMTYpOihDfD1yPDxGJjY1NTM1LEYrPWUpfWZ1bmN0aW9uIEsocix0KXt2YXIgbj0yKnI7SCg2NTUzNSZ0W25dLDY1NTM1JnRbbisxXSl9ZnVuY3Rpb24gcShyLHQpe3ZhciBuLGUsaT0tMSxvPXJbMV0sdT0wLGY9NyxhPTQ7Zm9yKDA9PT1vJiYoZj0xMzgsYT0zKSxuPTA7dD49bjtuKyspaWYoZT1vLG89clsyKihuKzEpKzFdLCsrdT49Znx8ZSE9byl7aWYoYT51KWRve0soZSxfKX13aGlsZSgwIT0tLXUpO2Vsc2UgMCE9PWU/KGUhPWkmJihLKGUsXyksdS0tKSxLKDE2LF8pLEgodS0zLDIpKTp1PjEwPyhLKDE4LF8pLEgodS0xMSw3KSk6KEsoMTcsXyksSCh1LTMsMykpO3U9MCxpPWUsMD09PW8/KGY9MTM4LGE9Myk6ZT09bz8oZj02LGE9Myk6KGY9NyxhPTQpfX1mdW5jdGlvbiBKKCl7MTY9PUY/KCQoQyksQz0wLEY9MCk6OD5GfHwoVygyNTUmQyksQz4+Pj04LEYtPTgpfWZ1bmN0aW9uIFgocix0KXt2YXIgbixlLGk7aWYoQi5ZbltQXT1yLEIuVm5bUF09MjU1JnQsUCsrLDA9PT1yP01bMip0XSsrOihSKyssci0tLE1bMiooeE8uam5bdF0rMjU2KzEpXSsrLElbMip4Ty5FbihyKV0rKyksMD09KDgxOTEmUCkmJkU+Mil7Zm9yKG49OCpQLGU9bS13LGk9MDszMD5pO2krKyluKz1JWzIqaV0qKDUreE8ueG5baV0pO2lmKG4+Pj49MyxNYXRoLmZsb29yKFAvMik+UiYmTWF0aC5mbG9vcihlLzIpPm4pcmV0dXJuITB9cmV0dXJuIFA9PUwtMX1mdW5jdGlvbiBRKHIsdCl7dmFyIG4sZSxpLG8sdT0wO2lmKDAhPT1QKWRve249Qi5Zblt1XSxlPUIuVm5bdV0sdSsrLDA9PT1uP0soZSxyKTooSygoaT14Ty5qbltlXSkrMjU2KzEsciksMCE9PShvPXhPLlRuW2ldKSYmSChlLT14Ty5PbltpXSxvKSxuLS0sSyhpPXhPLkVuKG4pLHQpLDAhPT0obz14Ty54bltpXSkmJkgobi09eE8ua25baV0sbykpfXdoaWxlKFA+dSk7SygyNTYsciksTj1yWzUxM119ZnVuY3Rpb24gWigpe0Y+OD8kKEMpOkY+MCYmVygyNTUmQyksQz0wLEY9MH1mdW5jdGlvbiBycihyLHQsbil7SCgwKyhuPzE6MCksMyksZnVuY3Rpb24ocix0KXtaKCksTj04LCQodCksJCh+dCksQi5Hbi5zZXQoZi5zdWJhcnJheShyLHIrdCksQi5wZW5kaW5nKSxCLnBlbmRpbmcrPXR9KHIsdCl9ZnVuY3Rpb24gdHIodCl7KGZ1bmN0aW9uKHIsdCxuKXt2YXIgZSxpLG89MDtFPjA/KEQudW4oQiksRy51bihCKSxvPWZ1bmN0aW9uKCl7dmFyIHI7Zm9yKHooTSxELmJuKSx6KEksRy5ibiksWS51bihCKSxyPTE4O3I+PTMmJjA9PT1fWzIqeE8uTW5bcl0rMV07ci0tKTtyZXR1cm4gQi55bis9MTQrMyoocisxKSxyfSgpLGU9Qi55biszKzc+Pj4zLChpPUIud24rMys3Pj4+Myk+ZXx8KGU9aSkpOmU9aT10KzUsdCs0PmV8fC0xPT1yP2k9PWU/KEgoMisobj8xOjApLDMpLFEoVU8uSW4sVU8uQ24pKTooSCg0KyhuPzE6MCksMyksZnVuY3Rpb24ocix0LG4pe3ZhciBlO2ZvcihIKHItMjU3LDUpLEgodC0xLDUpLEgobi00LDQpLGU9MDtuPmU7ZSsrKUgoX1syKnhPLk1uW2VdKzFdLDMpO3EoTSxyLTEpLHEoSSx0LTEpfShELmJuKzEsRy5ibisxLG8rMSksUShNLEkpKTpycihyLHQsbiksVigpLG4mJlooKX0pKDA+dz8tMTp3LG0tdyx0KSx3PW0sci56bigpfWZ1bmN0aW9uIG5yKCl7dmFyIHQsbixlLG87ZG97aWYoMD09KG89YS1BLW0pJiYwPT09bSYmMD09PUEpbz1pO2Vsc2UgaWYoLTE9PW8pby0tO2Vsc2UgaWYobT49aStpLTI2Mil7Zi5zZXQoZi5zdWJhcnJheShpLGkraSksMCksUy09aSxtLT1pLHctPWksZT10PWg7ZG97bj02NTUzNSZzWy0tZV0sc1tlXT1pPm4/MDpuLWl9d2hpbGUoMCE9LS10KTtlPXQ9aTtkb3tuPTY1NTM1JmNbLS1lXSxjW2VdPWk+bj8wOm4taX13aGlsZSgwIT0tLXQpO28rPWl9aWYoMD09PXIuV24pcmV0dXJuO3Q9ci4kbihmLG0rQSxvKSwzPihBKz10KXx8KHY9KCh2PTI1NSZmW21dKTw8eV4yNTUmZlttKzFdKSZkKX13aGlsZSgyNjI+QSYmMCE9PXIuV24pfWZ1bmN0aW9uIGVyKHIpe3ZhciB0LG4sZT1PLG89bSxhPWoscz1tPmktMjYyP20tKGktMjYyKTowLHY9VSxoPXUsbD1tKzI1OCxkPWZbbythLTFdLHk9ZltvK2FdO3g+anx8KGU+Pj0yKSx2PkEmJih2PUEpO2Rve2lmKGZbKHQ9cikrYV09PXkmJmZbdCthLTFdPT1kJiZmW3RdPT1mW29dJiZmWysrdF09PWZbbysxXSl7bys9Mix0Kys7ZG97fXdoaWxlKGZbKytvXT09ZlsrK3RdJiZmWysrb109PWZbKyt0XSYmZlsrK29dPT1mWysrdF0mJmZbKytvXT09ZlsrK3RdJiZmWysrb109PWZbKyt0XSYmZlsrK29dPT1mWysrdF0mJmZbKytvXT09ZlsrK3RdJiZmWysrb109PWZbKyt0XSYmbD5vKTtpZihuPTI1OC0obC1vKSxvPWwtMjU4LG4+YSl7aWYoUz1yLGE9bixuPj12KWJyZWFrO2Q9ZltvK2EtMV0seT1mW28rYV19fX13aGlsZSgocj02NTUzNSZjW3ImaF0pPnMmJjAhPS0tZSk7cmV0dXJuIGE+QT9BOmF9Qi5kbj1bXSxCLkFuPVtdLEIubG49W10sTT1bXSxJPVtdLF89W10sQi5wbj1mdW5jdGlvbihyLHQpe2Zvcih2YXIgbj1CLmxuLGU9blt0XSxpPXQ8PDE7aTw9Qi52biYmKGk8Qi52biYmUk8ocixuW2krMV0sbltpXSxCLmRuKSYmaSsrLCFSTyhyLGUsbltpXSxCLmRuKSk7KW5bdF09bltpXSx0PWksaTw8PTE7blt0XT1lfSxCLkhuPWZ1bmN0aW9uKHIscCxTLFAsUix6KXtyZXR1cm4gUHx8KFA9OCksUnx8KFI9OCksenx8KHo9MCksci5Lbj1udWxsLC0xPT1wJiYocD02KSwxPlJ8fFI+OXx8OCE9UHx8OT5TfHxTPjE1fHwwPnB8fHA+OXx8MD56fHx6PjI/LTI6KHIucW49Qix1PShpPTE8PChvPVMpKS0xLGQ9KGg9MTw8KGw9Uis3KSktMSx5PU1hdGguZmxvb3IoKGwrMy0xKS8zKSxmPW5ldyBVaW50OEFycmF5KDIqaSksYz1bXSxzPVtdLEw9MTw8Uis2LEIuR249bmV3IFVpbnQ4QXJyYXkoNCpMKSxuPTQqTCxCLlluPW5ldyBVaW50MTZBcnJheShMKSxCLlZuPW5ldyBVaW50OEFycmF5KEwpLEU9cCxUPXosZnVuY3Rpb24ocil7cmV0dXJuIHIuSm49ci5Ybj0wLHIuS249bnVsbCxCLnBlbmRpbmc9MCxCLlFuPTAsdD0xMTMsZT0wLEQuZm49TSxELmNuPVVPLkZuLEcuZm49SSxHLmNuPVVPLkJuLFkuZm49XyxZLmNuPVVPLkRuLEM9MCxGPTAsTj04LFYoKSxmdW5jdGlvbigpe2E9MippLHNbaC0xXT0wO2Zvcih2YXIgcj0wO2gtMT5yO3IrKylzW3JdPTA7az1MT1tFXS5Mbix4PUxPW0VdLl9uLFU9TE9bRV0uUG4sTz1MT1tFXS5SbixtPTAsdz0wLEE9MCxiPWo9MixnPTAsdj0wfSgpLDB9KHIpKX0sQi5abj1mdW5jdGlvbigpe3JldHVybiA0MiE9dCYmMTEzIT10JiY2NjYhPXQ/LTI6KEIuVm49bnVsbCxCLlluPW51bGwsQi5Hbj1udWxsLHM9bnVsbCxjPW51bGwsZj1udWxsLEIucW49bnVsbCwxMTM9PXQ/LTM6MCl9LEIucmU9ZnVuY3Rpb24ocix0LG4pe3ZhciBlPTA7cmV0dXJuLTE9PXQmJih0PTYpLDA+dHx8dD45fHwwPm58fG4+Mj8tMjooTE9bRV0uTm4hPUxPW3RdLk5uJiYwIT09ci5KbiYmKGU9ci5adCgxKSksRSE9dCYmKGs9TE9bRT10XS5Mbix4PUxPW0VdLl9uLFU9TE9bRV0uUG4sTz1MT1tFXS5SbiksVD1uLGUpfSxCLnRlPWZ1bmN0aW9uKHIsbixlKXt2YXIgbyxhPWUsaD0wO2lmKCFufHw0MiE9dClyZXR1cm4tMjtpZigzPmEpcmV0dXJuIDA7Zm9yKGE+aS0yNjImJihoPWUtKGE9aS0yNjIpKSxmLnNldChuLnN1YmFycmF5KGgsaCthKSwwKSxtPWEsdz1hLHY9KCh2PTI1NSZmWzBdKTw8eV4yNTUmZlsxXSkmZCxvPTA7YS0zPj1vO28rKyl2PSh2PDx5XjI1NSZmW28rMl0pJmQsY1tvJnVdPXNbdl0sc1t2XT1vO3JldHVybiAwfSxCLlp0PWZ1bmN0aW9uKGEsbCl7dmFyIE8seCxVLE0sSSxfO2lmKGw+NHx8MD5sKXJldHVybi0yO2lmKCFhLm5lfHwhYS5lZSYmMCE9PWEuV258fDY2Nj09dCYmNCE9bClyZXR1cm4gYS5Lbj1QT1s0XSwtMjtpZigwPT09YS5pZSlyZXR1cm4gYS5Lbj1QT1s3XSwtNTtpZihyPWEsTT1lLGU9bCw0Mj09dCYmKHg9OCsoby04PDw0KTw8OCwoVT0oRS0xJjI1NSk+PjEpPjMmJihVPTMpLHh8PVU8PDYsMCE9PW0mJih4fD0zMiksdD0xMTMsVygoXz14Kz0zMS14JTMxKT4+OCYyNTUpLFcoMjU1Jl8pKSwwIT09Qi5wZW5kaW5nKXtpZihyLnpuKCksMD09PXIuaWUpcmV0dXJuIGU9LTEsMH1lbHNlIGlmKDA9PT1yLlduJiZNPj1sJiY0IT1sKXJldHVybiByLktuPVBPWzddLC01O2lmKDY2Nj09dCYmMCE9PXIuV24pcmV0dXJuIGEuS249UE9bN10sLTU7aWYoMCE9PXIuV258fDAhPT1BfHwwIT1sJiY2NjYhPXQpe3N3aXRjaChJPS0xLExPW0VdLk5uKXtjYXNlIDA6ST1mdW5jdGlvbih0KXt2YXIgZSxvPTY1NTM1O2ZvcihvPm4tNSYmKG89bi01KTs7KXtpZigxPj1BKXtpZihucigpLDA9PT1BJiYwPT10KXJldHVybiAwO2lmKDA9PT1BKWJyZWFrfWlmKG0rPUEsQT0wLGU9dytvLCgwPT09bXx8bT49ZSkmJihBPW0tZSxtPWUsdHIoITEpLDA9PT1yLmllKSlyZXR1cm4gMDtpZihtLXc+PWktMjYyJiYodHIoITEpLDA9PT1yLmllKSlyZXR1cm4gMH1yZXR1cm4gdHIoND09dCksMD09PXIuaWU/ND09dD8yOjA6ND09dD8zOjF9KGwpO2JyZWFrO2Nhc2UgMTpJPWZ1bmN0aW9uKHQpe2Zvcih2YXIgbixlPTA7Oyl7aWYoMjYyPkEpe2lmKG5yKCksMjYyPkEmJjA9PXQpcmV0dXJuIDA7aWYoMD09PUEpYnJlYWt9aWYoMz5BfHwodj0odjw8eV4yNTUmZlttKzJdKSZkLGU9NjU1MzUmc1t2XSxjW20mdV09c1t2XSxzW3ZdPW0pLDA9PT1lfHwobS1lJjY1NTM1KT5pLTI2Mnx8MiE9VCYmKGI9ZXIoZSkpLDM+YiluPVgoMCwyNTUmZlttXSksQS0tLG0rKztlbHNlIGlmKG49WChtLVMsYi0zKSxBLT1iLGI+a3x8Mz5BKW0rPWIsYj0wLHY9KCh2PTI1NSZmW21dKTw8eV4yNTUmZlttKzFdKSZkO2Vsc2V7Yi0tO2Rve20rKyx2PSh2PDx5XjI1NSZmW20rMl0pJmQsZT02NTUzNSZzW3ZdLGNbbSZ1XT1zW3ZdLHNbdl09bX13aGlsZSgwIT0tLWIpO20rK31pZihuJiYodHIoITEpLDA9PT1yLmllKSlyZXR1cm4gMH1yZXR1cm4gdHIoND09dCksMD09PXIuaWU/ND09dD8yOjA6ND09dD8zOjF9KGwpO2JyZWFrO2Nhc2UgMjpJPWZ1bmN0aW9uKHQpe2Zvcih2YXIgbixlLG89MDs7KXtpZigyNjI+QSl7aWYobnIoKSwyNjI+QSYmMD09dClyZXR1cm4gMDtpZigwPT09QSlicmVha31pZigzPkF8fCh2PSh2PDx5XjI1NSZmW20rMl0pJmQsbz02NTUzNSZzW3ZdLGNbbSZ1XT1zW3ZdLHNbdl09bSksaj1iLHA9UyxiPTIsMCE9PW8mJms+aiYmaS0yNjI+PShtLW8mNjU1MzUpJiYoMiE9VCYmKGI9ZXIobykpLDU+PWImJigxPT1UfHwzPT1iJiZtLVM+NDA5NikmJihiPTIpKSwzPmp8fGI+ailpZigwIT09Zyl7aWYoKG49WCgwLDI1NSZmW20tMV0pKSYmdHIoITEpLG0rKyxBLS0sMD09PXIuaWUpcmV0dXJuIDB9ZWxzZSBnPTEsbSsrLEEtLTtlbHNle2U9bStBLTMsbj1YKG0tMS1wLGotMyksQS09ai0xLGotPTI7ZG97KyttPmV8fCh2PSh2PDx5XjI1NSZmW20rMl0pJmQsbz02NTUzNSZzW3ZdLGNbbSZ1XT1zW3ZdLHNbdl09bSl9d2hpbGUoMCE9LS1qKTtpZihnPTAsYj0yLG0rKyxuJiYodHIoITEpLDA9PT1yLmllKSlyZXR1cm4gMH19cmV0dXJuIDAhPT1nJiYobj1YKDAsMjU1JmZbbS0xXSksZz0wKSx0cig0PT10KSwwPT09ci5pZT80PT10PzI6MDo0PT10PzM6MX0obCl9aWYoMiE9SSYmMyE9SXx8KHQ9NjY2KSwwPT1JfHwyPT1JKXJldHVybiAwPT09ci5pZSYmKGU9LTEpLDA7aWYoMT09SSl7aWYoMT09bClIKDIsMyksSygyNTYsVU8uSW4pLEooKSw5PjErTisxMC1GJiYoSCgyLDMpLEsoMjU2LFVPLkluKSxKKCkpLE49NztlbHNlIGlmKHJyKDAsMCwhMSksMz09bClmb3IoTz0wO2g+TztPKyspc1tPXT0wO2lmKHIuem4oKSwwPT09ci5pZSlyZXR1cm4gZT0tMSwwfX1yZXR1cm4gNCE9bD8wOjF9fWZ1bmN0aW9uIENPKCl7dmFyIHI9dGhpcztyLm9lPTAsci51ZT0wLHIuV249MCxyLkpuPTAsci5pZT0wLHIuWG49MH1mdW5jdGlvbiBGTyhyKXt2YXIgdCxuPW5ldyBDTyxlPSh0PXImJnIucXQ/ci5xdDo2NTUzNikrNSooTWF0aC5mbG9vcih0LzE2MzgzKSsxKSxpPW5ldyBVaW50OEFycmF5KGUpLG89cj9yLmxldmVsOi0xO3ZvaWQgMD09PW8mJihvPS0xKSxuLkhuKG8pLG4ubmU9aSx0aGlzLmFwcGVuZD1mdW5jdGlvbihyLHQpe3ZhciBvLHU9MCxmPTAsYT0wLGM9W107aWYoci5sZW5ndGgpe24ub2U9MCxuLmVlPXIsbi5Xbj1yLmxlbmd0aDtkb3tpZihuLnVlPTAsbi5pZT1lLDAhPW4uWnQoMCkpdGhyb3cgRXJyb3IoImRlZmxhdGluZzogIituLktuKTtuLnVlJiYobi51ZT09ZT9jLnB1c2gobmV3IFVpbnQ4QXJyYXkoaSkpOmMucHVzaChpLnNsaWNlKDAsbi51ZSkpKSxhKz1uLnVlLHQmJm4ub2U+MCYmbi5vZSE9dSYmKHQobi5vZSksdT1uLm9lKX13aGlsZShuLlduPjB8fDA9PT1uLmllKTtyZXR1cm4gYy5sZW5ndGg+MT8obz1uZXcgVWludDhBcnJheShhKSxjLmZvckVhY2goKGZ1bmN0aW9uKHIpe28uc2V0KHIsZiksZis9ci5sZW5ndGh9KSkpOm89Y1swXXx8bmV3IFVpbnQ4QXJyYXkoMCksb319LHRoaXMuZmx1c2g9ZnVuY3Rpb24oKXt2YXIgcix0LG89MCx1PTAsZj1bXTtkb3tpZihuLnVlPTAsbi5pZT1lLDEhPShyPW4uWnQoNCkpJiYwIT1yKXRocm93IEVycm9yKCJkZWZsYXRpbmc6ICIrbi5Lbik7ZS1uLmllPjAmJmYucHVzaChpLnNsaWNlKDAsbi51ZSkpLHUrPW4udWV9d2hpbGUobi5Xbj4wfHwwPT09bi5pZSk7cmV0dXJuIG4uWm4oKSx0PW5ldyBVaW50OEFycmF5KHUpLGYuZm9yRWFjaCgoZnVuY3Rpb24ocil7dC5zZXQocixvKSxvKz1yLmxlbmd0aH0pKSx0fX1DTy5wcm90b3R5cGU9e0huOmZ1bmN0aW9uKHIsdCl7dmFyIG49dGhpcztyZXR1cm4gbi5xbj1uZXcgTk8sdHx8KHQ9MTUpLG4ucW4uSG4obixyLHQpfSxadDpmdW5jdGlvbihyKXt2YXIgdD10aGlzO3JldHVybiB0LnFuP3QucW4uWnQodCxyKTotMn0sWm46ZnVuY3Rpb24oKXt2YXIgcj10aGlzO2lmKCFyLnFuKXJldHVybi0yO3ZhciB0PXIucW4uWm4oKTtyZXR1cm4gci5xbj1udWxsLHR9LHJlOmZ1bmN0aW9uKHIsdCl7dmFyIG49dGhpcztyZXR1cm4gbi5xbj9uLnFuLnJlKG4scix0KTotMn0sdGU6ZnVuY3Rpb24ocix0KXt2YXIgbj10aGlzO3JldHVybiBuLnFuP24ucW4udGUobixyLHQpOi0yfSwkbjpmdW5jdGlvbihyLHQsbil7dmFyIGU9dGhpcyxpPWUuV247cmV0dXJuIGk+biYmKGk9biksMD09PWk/MDooZS5Xbi09aSxyLnNldChlLmVlLnN1YmFycmF5KGUub2UsZS5vZStpKSx0KSxlLm9lKz1pLGUuSm4rPWksaSl9LHpuOmZ1bmN0aW9uKCl7dmFyIHI9dGhpcyx0PXIucW4ucGVuZGluZzt0PnIuaWUmJih0PXIuaWUpLDAhPT10JiYoci5uZS5zZXQoci5xbi5Hbi5zdWJhcnJheShyLnFuLlFuLHIucW4uUW4rdCksci51ZSksci51ZSs9dCxyLnFuLlFuKz10LHIuWG4rPXQsci5pZS09dCxyLnFuLnBlbmRpbmctPXQsMD09PXIucW4ucGVuZGluZyYmKHIucW4uUW49MCkpfX0sKDAsc2EuZXhwb3J0cykoIkludDMyIiwoZnVuY3Rpb24ocil7cmV0dXJuIGZ1bmN0aW9uKHQsbixlKXtyZXR1cm4gcih0aGlzLHQsbixlKX19KSk7dmFyIEJPPVswLDEsMyw3LDE1LDMxLDYzLDEyNywyNTUsNTExLDEwMjMsMjA0Nyw0MDk1LDgxOTEsMTYzODMsMzI3NjcsNjU1MzVdLERPPVs5Niw3LDI1NiwwLDgsODAsMCw4LDE2LDg0LDgsMTE1LDgyLDcsMzEsMCw4LDExMiwwLDgsNDgsMCw5LDE5Miw4MCw3LDEwLDAsOCw5NiwwLDgsMzIsMCw5LDE2MCwwLDgsMCwwLDgsMTI4LDAsOCw2NCwwLDksMjI0LDgwLDcsNiwwLDgsODgsMCw4LDI0LDAsOSwxNDQsODMsNyw1OSwwLDgsMTIwLDAsOCw1NiwwLDksMjA4LDgxLDcsMTcsMCw4LDEwNCwwLDgsNDAsMCw5LDE3NiwwLDgsOCwwLDgsMTM2LDAsOCw3MiwwLDksMjQwLDgwLDcsNCwwLDgsODQsMCw4LDIwLDg1LDgsMjI3LDgzLDcsNDMsMCw4LDExNiwwLDgsNTIsMCw5LDIwMCw4MSw3LDEzLDAsOCwxMDAsMCw4LDM2LDAsOSwxNjgsMCw4LDQsMCw4LDEzMiwwLDgsNjgsMCw5LDIzMiw4MCw3LDgsMCw4LDkyLDAsOCwyOCwwLDksMTUyLDg0LDcsODMsMCw4LDEyNCwwLDgsNjAsMCw5LDIxNiw4Miw3LDIzLDAsOCwxMDgsMCw4LDQ0LDAsOSwxODQsMCw4LDEyLDAsOCwxNDAsMCw4LDc2LDAsOSwyNDgsODAsNywzLDAsOCw4MiwwLDgsMTgsODUsOCwxNjMsODMsNywzNSwwLDgsMTE0LDAsOCw1MCwwLDksMTk2LDgxLDcsMTEsMCw4LDk4LDAsOCwzNCwwLDksMTY0LDAsOCwyLDAsOCwxMzAsMCw4LDY2LDAsOSwyMjgsODAsNyw3LDAsOCw5MCwwLDgsMjYsMCw5LDE0OCw4NCw3LDY3LDAsOCwxMjIsMCw4LDU4LDAsOSwyMTIsODIsNywxOSwwLDgsMTA2LDAsOCw0MiwwLDksMTgwLDAsOCwxMCwwLDgsMTM4LDAsOCw3NCwwLDksMjQ0LDgwLDcsNSwwLDgsODYsMCw4LDIyLDE5Miw4LDAsODMsNyw1MSwwLDgsMTE4LDAsOCw1NCwwLDksMjA0LDgxLDcsMTUsMCw4LDEwMiwwLDgsMzgsMCw5LDE3MiwwLDgsNiwwLDgsMTM0LDAsOCw3MCwwLDksMjM2LDgwLDcsOSwwLDgsOTQsMCw4LDMwLDAsOSwxNTYsODQsNyw5OSwwLDgsMTI2LDAsOCw2MiwwLDksMjIwLDgyLDcsMjcsMCw4LDExMCwwLDgsNDYsMCw5LDE4OCwwLDgsMTQsMCw4LDE0MiwwLDgsNzgsMCw5LDI1Miw5Niw3LDI1NiwwLDgsODEsMCw4LDE3LDg1LDgsMTMxLDgyLDcsMzEsMCw4LDExMywwLDgsNDksMCw5LDE5NCw4MCw3LDEwLDAsOCw5NywwLDgsMzMsMCw5LDE2MiwwLDgsMSwwLDgsMTI5LDAsOCw2NSwwLDksMjI2LDgwLDcsNiwwLDgsODksMCw4LDI1LDAsOSwxNDYsODMsNyw1OSwwLDgsMTIxLDAsOCw1NywwLDksMjEwLDgxLDcsMTcsMCw4LDEwNSwwLDgsNDEsMCw5LDE3OCwwLDgsOSwwLDgsMTM3LDAsOCw3MywwLDksMjQyLDgwLDcsNCwwLDgsODUsMCw4LDIxLDgwLDgsMjU4LDgzLDcsNDMsMCw4LDExNywwLDgsNTMsMCw5LDIwMiw4MSw3LDEzLDAsOCwxMDEsMCw4LDM3LDAsOSwxNzAsMCw4LDUsMCw4LDEzMywwLDgsNjksMCw5LDIzNCw4MCw3LDgsMCw4LDkzLDAsOCwyOSwwLDksMTU0LDg0LDcsODMsMCw4LDEyNSwwLDgsNjEsMCw5LDIxOCw4Miw3LDIzLDAsOCwxMDksMCw4LDQ1LDAsOSwxODYsMCw4LDEzLDAsOCwxNDEsMCw4LDc3LDAsOSwyNTAsODAsNywzLDAsOCw4MywwLDgsMTksODUsOCwxOTUsODMsNywzNSwwLDgsMTE1LDAsOCw1MSwwLDksMTk4LDgxLDcsMTEsMCw4LDk5LDAsOCwzNSwwLDksMTY2LDAsOCwzLDAsOCwxMzEsMCw4LDY3LDAsOSwyMzAsODAsNyw3LDAsOCw5MSwwLDgsMjcsMCw5LDE1MCw4NCw3LDY3LDAsOCwxMjMsMCw4LDU5LDAsOSwyMTQsODIsNywxOSwwLDgsMTA3LDAsOCw0MywwLDksMTgyLDAsOCwxMSwwLDgsMTM5LDAsOCw3NSwwLDksMjQ2LDgwLDcsNSwwLDgsODcsMCw4LDIzLDE5Miw4LDAsODMsNyw1MSwwLDgsMTE5LDAsOCw1NSwwLDksMjA2LDgxLDcsMTUsMCw4LDEwMywwLDgsMzksMCw5LDE3NCwwLDgsNywwLDgsMTM1LDAsOCw3MSwwLDksMjM4LDgwLDcsOSwwLDgsOTUsMCw4LDMxLDAsOSwxNTgsODQsNyw5OSwwLDgsMTI3LDAsOCw2MywwLDksMjIyLDgyLDcsMjcsMCw4LDExMSwwLDgsNDcsMCw5LDE5MCwwLDgsMTUsMCw4LDE0MywwLDgsNzksMCw5LDI1NCw5Niw3LDI1NiwwLDgsODAsMCw4LDE2LDg0LDgsMTE1LDgyLDcsMzEsMCw4LDExMiwwLDgsNDgsMCw5LDE5Myw4MCw3LDEwLDAsOCw5NiwwLDgsMzIsMCw5LDE2MSwwLDgsMCwwLDgsMTI4LDAsOCw2NCwwLDksMjI1LDgwLDcsNiwwLDgsODgsMCw4LDI0LDAsOSwxNDUsODMsNyw1OSwwLDgsMTIwLDAsOCw1NiwwLDksMjA5LDgxLDcsMTcsMCw4LDEwNCwwLDgsNDAsMCw5LDE3NywwLDgsOCwwLDgsMTM2LDAsOCw3MiwwLDksMjQxLDgwLDcsNCwwLDgsODQsMCw4LDIwLDg1LDgsMjI3LDgzLDcsNDMsMCw4LDExNiwwLDgsNTIsMCw5LDIwMSw4MSw3LDEzLDAsOCwxMDAsMCw4LDM2LDAsOSwxNjksMCw4LDQsMCw4LDEzMiwwLDgsNjgsMCw5LDIzMyw4MCw3LDgsMCw4LDkyLDAsOCwyOCwwLDksMTUzLDg0LDcsODMsMCw4LDEyNCwwLDgsNjAsMCw5LDIxNyw4Miw3LDIzLDAsOCwxMDgsMCw4LDQ0LDAsOSwxODUsMCw4LDEyLDAsOCwxNDAsMCw4LDc2LDAsOSwyNDksODAsNywzLDAsOCw4MiwwLDgsMTgsODUsOCwxNjMsODMsNywzNSwwLDgsMTE0LDAsOCw1MCwwLDksMTk3LDgxLDcsMTEsMCw4LDk4LDAsOCwzNCwwLDksMTY1LDAsOCwyLDAsOCwxMzAsMCw4LDY2LDAsOSwyMjksODAsNyw3LDAsOCw5MCwwLDgsMjYsMCw5LDE0OSw4NCw3LDY3LDAsOCwxMjIsMCw4LDU4LDAsOSwyMTMsODIsNywxOSwwLDgsMTA2LDAsOCw0MiwwLDksMTgxLDAsOCwxMCwwLDgsMTM4LDAsOCw3NCwwLDksMjQ1LDgwLDcsNSwwLDgsODYsMCw4LDIyLDE5Miw4LDAsODMsNyw1MSwwLDgsMTE4LDAsOCw1NCwwLDksMjA1LDgxLDcsMTUsMCw4LDEwMiwwLDgsMzgsMCw5LDE3MywwLDgsNiwwLDgsMTM0LDAsOCw3MCwwLDksMjM3LDgwLDcsOSwwLDgsOTQsMCw4LDMwLDAsOSwxNTcsODQsNyw5OSwwLDgsMTI2LDAsOCw2MiwwLDksMjIxLDgyLDcsMjcsMCw4LDExMCwwLDgsNDYsMCw5LDE4OSwwLDgsMTQsMCw4LDE0MiwwLDgsNzgsMCw5LDI1Myw5Niw3LDI1NiwwLDgsODEsMCw4LDE3LDg1LDgsMTMxLDgyLDcsMzEsMCw4LDExMywwLDgsNDksMCw5LDE5NSw4MCw3LDEwLDAsOCw5NywwLDgsMzMsMCw5LDE2MywwLDgsMSwwLDgsMTI5LDAsOCw2NSwwLDksMjI3LDgwLDcsNiwwLDgsODksMCw4LDI1LDAsOSwxNDcsODMsNyw1OSwwLDgsMTIxLDAsOCw1NywwLDksMjExLDgxLDcsMTcsMCw4LDEwNSwwLDgsNDEsMCw5LDE3OSwwLDgsOSwwLDgsMTM3LDAsOCw3MywwLDksMjQzLDgwLDcsNCwwLDgsODUsMCw4LDIxLDgwLDgsMjU4LDgzLDcsNDMsMCw4LDExNywwLDgsNTMsMCw5LDIwMyw4MSw3LDEzLDAsOCwxMDEsMCw4LDM3LDAsOSwxNzEsMCw4LDUsMCw4LDEzMywwLDgsNjksMCw5LDIzNSw4MCw3LDgsMCw4LDkzLDAsOCwyOSwwLDksMTU1LDg0LDcsODMsMCw4LDEyNSwwLDgsNjEsMCw5LDIxOSw4Miw3LDIzLDAsOCwxMDksMCw4LDQ1LDAsOSwxODcsMCw4LDEzLDAsOCwxNDEsMCw4LDc3LDAsOSwyNTEsODAsNywzLDAsOCw4MywwLDgsMTksODUsOCwxOTUsODMsNywzNSwwLDgsMTE1LDAsOCw1MSwwLDksMTk5LDgxLDcsMTEsMCw4LDk5LDAsOCwzNSwwLDksMTY3LDAsOCwzLDAsOCwxMzEsMCw4LDY3LDAsOSwyMzEsODAsNyw3LDAsOCw5MSwwLDgsMjcsMCw5LDE1MSw4NCw3LDY3LDAsOCwxMjMsMCw4LDU5LDAsOSwyMTUsODIsNywxOSwwLDgsMTA3LDAsOCw0MywwLDksMTgzLDAsOCwxMSwwLDgsMTM5LDAsOCw3NSwwLDksMjQ3LDgwLDcsNSwwLDgsODcsMCw4LDIzLDE5Miw4LDAsODMsNyw1MSwwLDgsMTE5LDAsOCw1NSwwLDksMjA3LDgxLDcsMTUsMCw4LDEwMywwLDgsMzksMCw5LDE3NSwwLDgsNywwLDgsMTM1LDAsOCw3MSwwLDksMjM5LDgwLDcsOSwwLDgsOTUsMCw4LDMxLDAsOSwxNTksODQsNyw5OSwwLDgsMTI3LDAsOCw2MywwLDksMjIzLDgyLDcsMjcsMCw4LDExMSwwLDgsNDcsMCw5LDE5MSwwLDgsMTUsMCw4LDE0MywwLDgsNzksMCw5LDI1NV0sR089WzgwLDUsMSw4Nyw1LDI1Nyw4Myw1LDE3LDkxLDUsNDA5Nyw4MSw1LDUsODksNSwxMDI1LDg1LDUsNjUsOTMsNSwxNjM4NSw4MCw1LDMsODgsNSw1MTMsODQsNSwzMyw5Miw1LDgxOTMsODIsNSw5LDkwLDUsMjA0OSw4Niw1LDEyOSwxOTIsNSwyNDU3Nyw4MCw1LDIsODcsNSwzODUsODMsNSwyNSw5MSw1LDYxNDUsODEsNSw3LDg5LDUsMTUzNyw4NSw1LDk3LDkzLDUsMjQ1NzcsODAsNSw0LDg4LDUsNzY5LDg0LDUsNDksOTIsNSwxMjI4OSw4Miw1LDEzLDkwLDUsMzA3Myw4Niw1LDE5MywxOTIsNSwyNDU3N10sWU89WzMsNCw1LDYsNyw4LDksMTAsMTEsMTMsMTUsMTcsMTksMjMsMjcsMzEsMzUsNDMsNTEsNTksNjcsODMsOTksMTE1LDEzMSwxNjMsMTk1LDIyNywyNTgsMCwwXSxWTz1bMCwwLDAsMCwwLDAsMCwwLDEsMSwxLDEsMiwyLDIsMiwzLDMsMywzLDQsNCw0LDQsNSw1LDUsNSwwLDExMiwxMTJdLHpPPVsxLDIsMyw0LDUsNyw5LDEzLDE3LDI1LDMzLDQ5LDY1LDk3LDEyOSwxOTMsMjU3LDM4NSw1MTMsNzY5LDEwMjUsMTUzNywyMDQ5LDMwNzMsNDA5Nyw2MTQ1LDgxOTMsMTIyODksMTYzODUsMjQ1NzddLFdPPVswLDAsMCwwLDEsMSwyLDIsMywzLDQsNCw1LDUsNiw2LDcsNyw4LDgsOSw5LDEwLDEwLDExLDExLDEyLDEyLDEzLDEzXTtmdW5jdGlvbiAkTygpe3ZhciByLHQsbixlLGksbztmdW5jdGlvbiB1KHIsdCx1LGYsYSxjLHMsdixoLGwsZCl7dmFyIHksdyxiLHAsZyxtLFMsQSxqLE8sayxFLFQseCxVO089MCxnPXU7ZG97bltyW3QrT11dKyssTysrLGctLX13aGlsZSgwIT09Zyk7aWYoblswXT09dSlyZXR1cm4gc1swXT0tMSx2WzBdPTAsMDtmb3IoQT12WzBdLG09MTsxNT49bSYmMD09PW5bbV07bSsrKTtmb3IoUz1tLG0+QSYmKEE9bSksZz0xNTswIT09ZyYmMD09PW5bZ107Zy0tKTtmb3IoYj1nLEE+ZyYmKEE9ZyksdlswXT1BLHg9MTw8bTtnPm07bSsrLHg8PD0xKWlmKDA+KHgtPW5bbV0pKXJldHVybi0zO2lmKDA+KHgtPW5bZ10pKXJldHVybi0zO2ZvcihuW2ddKz14LG9bMV09bT0wLE89MSxUPTI7MCE9LS1nOylvW1RdPW0rPW5bT10sVCsrLE8rKztnPTAsTz0wO2RvezAhPT0obT1yW3QrT10pJiYoZFtvW21dKytdPWcpLE8rK313aGlsZSgrK2c8dSk7Zm9yKHU9b1tiXSxvWzBdPWc9MCxPPTAscD0tMSxFPS1BLGlbMF09MCxrPTAsVT0wO2I+PVM7UysrKWZvcih5PW5bU107MCE9eS0tOyl7Zm9yKDtTPkUrQTspe2lmKHArKyxVPShVPWItKEUrPUEpKT5BP0E6VSwodz0xPDwobT1TLUUpKT55KzEmJih3LT15KzEsVD1TLFU+bSkpZm9yKDsrK208VSYmKHc8PD0xKT5uWysrVF07KXctPW5bVF07aWYoVT0xPDxtLGxbMF0rVT4xNDQwKXJldHVybi0zO2lbcF09az1sWzBdLGxbMF0rPVUsMCE9PXA/KG9bcF09ZyxlWzBdPW0sZVsxXT1BLG09Zz4+PkUtQSxlWzJdPWstaVtwLTFdLW0saC5zZXQoZSwzKihpW3AtMV0rbSkpKTpzWzBdPWt9Zm9yKGVbMV09Uy1FLHU+Tz9kW09dPGY/KGVbMF09MjU2PmRbT10/MDo5NixlWzJdPWRbTysrXSk6KGVbMF09Y1tkW09dLWZdKzE2KzY0LGVbMl09YVtkW08rK10tZl0pOmVbMF09MTkyLHc9MTw8Uy1FLG09Zz4+PkU7VT5tO20rPXcpaC5zZXQoZSwzKihrK20pKTtmb3IobT0xPDxTLTE7MCE9KGcmbSk7bT4+Pj0xKWdePW07Zm9yKGdePW0saj0oMTw8RSktMTsoZyZqKSE9b1twXTspcC0tLGo9KDE8PChFLT1BKSktMX1yZXR1cm4gMCE9PXgmJjEhPWI/LTU6MH1mdW5jdGlvbiBmKHUpe3ZhciBmO2ZvcihyfHwocj1bXSx0PVtdLG49bmV3IEludDMyQXJyYXkoMTYpLGU9W10saT1uZXcgSW50MzJBcnJheSgxNSksbz1uZXcgSW50MzJBcnJheSgxNikpLHQubGVuZ3RoPHUmJih0PVtdKSxmPTA7dT5mO2YrKyl0W2ZdPTA7Zm9yKGY9MDsxNj5mO2YrKyluW2ZdPTA7Zm9yKGY9MDszPmY7ZisrKWVbZl09MDtpLnNldChuLnN1YmFycmF5KDAsMTUpLDApLG8uc2V0KG4uc3ViYXJyYXkoMCwxNiksMCl9dGhpcy5mZT1mdW5jdGlvbihuLGUsaSxvLGEpe3ZhciBjO3JldHVybiBmKDE5KSxyWzBdPTAsLTM9PShjPXUobiwwLDE5LDE5LG51bGwsbnVsbCxpLGUsbyxyLHQpKT9hLktuPSJvdmVyc3Vic2NyaWJlZCBkeW5hbWljIGJpdCBsZW5ndGhzIHRyZWUiOi01IT1jJiYwIT09ZVswXXx8KGEuS249ImluY29tcGxldGUgZHluYW1pYyBiaXQgbGVuZ3RocyB0cmVlIixjPS0zKSxjfSx0aGlzLmFlPWZ1bmN0aW9uKG4sZSxpLG8sYSxjLHMsdixoKXt2YXIgbDtyZXR1cm4gZigyODgpLHJbMF09MCwwIT0obD11KGksMCxuLDI1NyxZTyxWTyxjLG8sdixyLHQpKXx8MD09PW9bMF0/KC0zPT1sP2guS249Im92ZXJzdWJzY3JpYmVkIGxpdGVyYWwvbGVuZ3RoIHRyZWUiOi00IT1sJiYoaC5Lbj0iaW5jb21wbGV0ZSBsaXRlcmFsL2xlbmd0aCB0cmVlIixsPS0zKSxsKTooZigyODgpLDAhPShsPXUoaSxuLGUsMCx6TyxXTyxzLGEsdixyLHQpKXx8MD09PWFbMF0mJm4+MjU3PygtMz09bD9oLktuPSJvdmVyc3Vic2NyaWJlZCBkaXN0YW5jZSB0cmVlIjotNT09bD8oaC5Lbj0iaW5jb21wbGV0ZSBkaXN0YW5jZSB0cmVlIixsPS0zKTotNCE9bCYmKGguS249ImVtcHR5IGRpc3RhbmNlIHRyZWUgd2l0aCBsZW5ndGhzIixsPS0zKSxsKTowKX19ZnVuY3Rpb24gSE8oKXt2YXIgcix0LG4sZSxpPXRoaXMsbz0wLHU9MCxmPTAsYT0wLGM9MCxzPTAsdj0wLGg9MCxsPTAsZD0wO2Z1bmN0aW9uIHkocix0LG4sZSxpLG8sdSxmKXt2YXIgYSxjLHMsdixoLGwsZCx5LHcsYixwLGcsbSxTLEEsajtkPWYub2UseT1mLlduLGg9dS5jZSxsPXUuc2UsYj0odz11LndyaXRlKTx1LnJlYWQ/dS5yZWFkLXctMTp1LmVuZC13LHA9Qk9bcl0sZz1CT1t0XTtkb3tmb3IoOzIwPmw7KXktLSxofD0oMjU1JmYudmUoZCsrKSk8PGwsbCs9ODtpZigwIT09KHY9KGM9bilbaj0zKigocz1lKSsoYT1oJnApKV0pKWZvcig7Oyl7aWYoaD4+PWNbaisxXSxsLT1jW2orMV0sMCE9KDE2JnYpKXtmb3IodiY9MTUsbT1jW2orMl0rKGgmQk9bdl0pLGg+Pj12LGwtPXY7MTU+bDspeS0tLGh8PSgyNTUmZi52ZShkKyspKTw8bCxsKz04O2Zvcih2PShjPWkpW2o9MyooKHM9bykrKGE9aCZnKSldOzspe2lmKGg+Pj1jW2orMV0sbC09Y1tqKzFdLDAhPSgxNiZ2KSl7Zm9yKHYmPTE1O3Y+bDspeS0tLGh8PSgyNTUmZi52ZShkKyspKTw8bCxsKz04O2lmKFM9Y1tqKzJdKyhoJkJPW3ZdKSxoPj49dixsLT12LGItPW0sUz53KXtBPXctUztkb3tBKz11LmVuZH13aGlsZSgwPkEpO2lmKG0+KHY9dS5lbmQtQSkpe2lmKG0tPXYsdy1BPjAmJnY+dy1BKWRve3UuaGVbdysrXT11LmhlW0ErK119d2hpbGUoMCE9LS12KTtlbHNlIHUuaGUuc2V0KHUuaGUuc3ViYXJyYXkoQSxBK3YpLHcpLHcrPXYsQSs9dix2PTA7QT0wfX1lbHNlIHctKEE9dy1TKT4wJiYyPnctQT8odS5oZVt3KytdPXUuaGVbQSsrXSx1LmhlW3crK109dS5oZVtBKytdLG0tPTIpOih1LmhlLnNldCh1LmhlLnN1YmFycmF5KEEsQSsyKSx3KSx3Kz0yLEErPTIsbS09Mik7aWYody1BPjAmJm0+dy1BKWRve3UuaGVbdysrXT11LmhlW0ErK119d2hpbGUoMCE9LS1tKTtlbHNlIHUuaGUuc2V0KHUuaGUuc3ViYXJyYXkoQSxBK20pLHcpLHcrPW0sQSs9bSxtPTA7YnJlYWt9aWYoMCE9KDY0JnYpKXJldHVybiBmLktuPSJpbnZhbGlkIGRpc3RhbmNlIGNvZGUiLHkrPW09KG09Zi5Xbi15KT5sPj4zP2w+PjM6bSxkLT1tLGwtPW08PDMsdS5jZT1oLHUuc2U9bCxmLlduPXksZi5Kbis9ZC1mLm9lLGYub2U9ZCx1LndyaXRlPXcsLTM7YSs9Y1tqKzJdLHY9Y1tqPTMqKHMrKGErPWgmQk9bdl0pKV19YnJlYWt9aWYoMCE9KDY0JnYpKXJldHVybiAwIT0oMzImdik/KHkrPW09KG09Zi5Xbi15KT5sPj4zP2w+PjM6bSxkLT1tLGwtPW08PDMsdS5jZT1oLHUuc2U9bCxmLlduPXksZi5Kbis9ZC1mLm9lLGYub2U9ZCx1LndyaXRlPXcsMSk6KGYuS249ImludmFsaWQgbGl0ZXJhbC9sZW5ndGggY29kZSIseSs9bT0obT1mLlduLXkpPmw+PjM/bD4+MzptLGQtPW0sbC09bTw8Myx1LmNlPWgsdS5zZT1sLGYuV249eSxmLkpuKz1kLWYub2UsZi5vZT1kLHUud3JpdGU9dywtMyk7aWYoYSs9Y1tqKzJdLDA9PT0odj1jW2o9MyoocysoYSs9aCZCT1t2XSkpXSkpe2g+Pj1jW2orMV0sbC09Y1tqKzFdLHUuaGVbdysrXT1jW2orMl0sYi0tO2JyZWFrfX1lbHNlIGg+Pj1jW2orMV0sbC09Y1tqKzFdLHUuaGVbdysrXT1jW2orMl0sYi0tfXdoaWxlKGI+PTI1OCYmeT49MTApO3JldHVybiB5Kz1tPShtPWYuV24teSk+bD4+Mz9sPj4zOm0sZC09bSxsLT1tPDwzLHUuY2U9aCx1LnNlPWwsZi5Xbj15LGYuSm4rPWQtZi5vZSxmLm9lPWQsdS53cml0ZT13LDB9aS5pbml0PWZ1bmN0aW9uKGksbyx1LGYsYSxjKXtyPTAsdj1pLGg9byxuPXUsbD1mLGU9YSxkPWMsdD1udWxsfSxpLmxlPWZ1bmN0aW9uKGksdyxiKXt2YXIgcCxnLG0sUyxBLGosTyxrPTAsRT0wLFQ9MDtmb3IoVD13Lm9lLFM9dy5XbixrPWkuY2UsRT1pLnNlLGo9KEE9aS53cml0ZSk8aS5yZWFkP2kucmVhZC1BLTE6aS5lbmQtQTs7KXN3aXRjaChyKXtjYXNlIDA6aWYoaj49MjU4JiZTPj0xMCYmKGkuY2U9ayxpLnNlPUUsdy5Xbj1TLHcuSm4rPVQtdy5vZSx3Lm9lPVQsaS53cml0ZT1BLGI9eSh2LGgsbixsLGUsZCxpLHcpLFQ9dy5vZSxTPXcuV24saz1pLmNlLEU9aS5zZSxqPShBPWkud3JpdGUpPGkucmVhZD9pLnJlYWQtQS0xOmkuZW5kLUEsMCE9Yikpe3I9MT09Yj83Ojk7YnJlYWt9Zj12LHQ9bix1PWwscj0xO2Nhc2UgMTpmb3IocD1mO3A+RTspe2lmKDA9PT1TKXJldHVybiBpLmNlPWssaS5zZT1FLHcuV249Uyx3LkpuKz1ULXcub2Usdy5vZT1ULGkud3JpdGU9QSxpLmRlKHcsYik7Yj0wLFMtLSxrfD0oMjU1JncudmUoVCsrKSk8PEUsRSs9OH1pZihrPj4+PXRbMSsoZz0zKih1KyhrJkJPW3BdKSkpXSxFLT10W2crMV0sMD09PShtPXRbZ10pKXthPXRbZysyXSxyPTY7YnJlYWt9aWYoMCE9KDE2Jm0pKXtjPTE1Jm0sbz10W2crMl0scj0yO2JyZWFrfWlmKDA9PSg2NCZtKSl7Zj1tLHU9Zy8zK3RbZysyXTticmVha31pZigwIT0oMzImbSkpe3I9NzticmVha31yZXR1cm4gcj05LHcuS249ImludmFsaWQgbGl0ZXJhbC9sZW5ndGggY29kZSIsYj0tMyxpLmNlPWssaS5zZT1FLHcuV249Uyx3LkpuKz1ULXcub2Usdy5vZT1ULGkud3JpdGU9QSxpLmRlKHcsYik7Y2FzZSAyOmZvcihwPWM7cD5FOyl7aWYoMD09PVMpcmV0dXJuIGkuY2U9ayxpLnNlPUUsdy5Xbj1TLHcuSm4rPVQtdy5vZSx3Lm9lPVQsaS53cml0ZT1BLGkuZGUodyxiKTtiPTAsUy0tLGt8PSgyNTUmdy52ZShUKyspKTw8RSxFKz04fW8rPWsmQk9bcF0saz4+PXAsRS09cCxmPWgsdD1lLHU9ZCxyPTM7Y2FzZSAzOmZvcihwPWY7cD5FOyl7aWYoMD09PVMpcmV0dXJuIGkuY2U9ayxpLnNlPUUsdy5Xbj1TLHcuSm4rPVQtdy5vZSx3Lm9lPVQsaS53cml0ZT1BLGkuZGUodyxiKTtiPTAsUy0tLGt8PSgyNTUmdy52ZShUKyspKTw8RSxFKz04fWlmKGs+Pj10WzErKGc9MyoodSsoayZCT1twXSkpKV0sRS09dFtnKzFdLDAhPSgxNiYobT10W2ddKSkpe2M9MTUmbSxzPXRbZysyXSxyPTQ7YnJlYWt9aWYoMD09KDY0Jm0pKXtmPW0sdT1nLzMrdFtnKzJdO2JyZWFrfXJldHVybiByPTksdy5Lbj0iaW52YWxpZCBkaXN0YW5jZSBjb2RlIixiPS0zLGkuY2U9ayxpLnNlPUUsdy5Xbj1TLHcuSm4rPVQtdy5vZSx3Lm9lPVQsaS53cml0ZT1BLGkuZGUodyxiKTtjYXNlIDQ6Zm9yKHA9YztwPkU7KXtpZigwPT09UylyZXR1cm4gaS5jZT1rLGkuc2U9RSx3LlduPVMsdy5Kbis9VC13Lm9lLHcub2U9VCxpLndyaXRlPUEsaS5kZSh3LGIpO2I9MCxTLS0sa3w9KDI1NSZ3LnZlKFQrKykpPDxFLEUrPTh9cys9ayZCT1twXSxrPj49cCxFLT1wLHI9NTtjYXNlIDU6Zm9yKE89QS1zOzA+TzspTys9aS5lbmQ7Zm9yKDswIT09bzspe2lmKDA9PT1qJiYoQT09aS5lbmQmJjAhPT1pLnJlYWQmJihqPShBPTApPGkucmVhZD9pLnJlYWQtQS0xOmkuZW5kLUEpLDA9PT1qJiYoaS53cml0ZT1BLGI9aS5kZSh3LGIpLGo9KEE9aS53cml0ZSk8aS5yZWFkP2kucmVhZC1BLTE6aS5lbmQtQSxBPT1pLmVuZCYmMCE9PWkucmVhZCYmKGo9KEE9MCk8aS5yZWFkP2kucmVhZC1BLTE6aS5lbmQtQSksMD09PWopKSlyZXR1cm4gaS5jZT1rLGkuc2U9RSx3LlduPVMsdy5Kbis9VC13Lm9lLHcub2U9VCxpLndyaXRlPUEsaS5kZSh3LGIpO2kuaGVbQSsrXT1pLmhlW08rK10sai0tLE89PWkuZW5kJiYoTz0wKSxvLS19cj0wO2JyZWFrO2Nhc2UgNjppZigwPT09aiYmKEE9PWkuZW5kJiYwIT09aS5yZWFkJiYoaj0oQT0wKTxpLnJlYWQ/aS5yZWFkLUEtMTppLmVuZC1BKSwwPT09aiYmKGkud3JpdGU9QSxiPWkuZGUodyxiKSxqPShBPWkud3JpdGUpPGkucmVhZD9pLnJlYWQtQS0xOmkuZW5kLUEsQT09aS5lbmQmJjAhPT1pLnJlYWQmJihqPShBPTApPGkucmVhZD9pLnJlYWQtQS0xOmkuZW5kLUEpLDA9PT1qKSkpcmV0dXJuIGkuY2U9ayxpLnNlPUUsdy5Xbj1TLHcuSm4rPVQtdy5vZSx3Lm9lPVQsaS53cml0ZT1BLGkuZGUodyxiKTtiPTAsaS5oZVtBKytdPWEsai0tLHI9MDticmVhaztjYXNlIDc6aWYoRT43JiYoRS09OCxTKyssVC0tKSxpLndyaXRlPUEsYj1pLmRlKHcsYiksaj0oQT1pLndyaXRlKTxpLnJlYWQ/aS5yZWFkLUEtMTppLmVuZC1BLGkucmVhZCE9aS53cml0ZSlyZXR1cm4gaS5jZT1rLGkuc2U9RSx3LlduPVMsdy5Kbis9VC13Lm9lLHcub2U9VCxpLndyaXRlPUEsaS5kZSh3LGIpO3I9ODtjYXNlIDg6cmV0dXJuIGI9MSxpLmNlPWssaS5zZT1FLHcuV249Uyx3LkpuKz1ULXcub2Usdy5vZT1ULGkud3JpdGU9QSxpLmRlKHcsYik7Y2FzZSA5OnJldHVybiBiPS0zLGkuY2U9ayxpLnNlPUUsdy5Xbj1TLHcuSm4rPVQtdy5vZSx3Lm9lPVQsaS53cml0ZT1BLGkuZGUodyxiKTtkZWZhdWx0OnJldHVybiBiPS0yLGkuY2U9ayxpLnNlPUUsdy5Xbj1TLHcuSm4rPVQtdy5vZSx3Lm9lPVQsaS53cml0ZT1BLGkuZGUodyxiKX19LGkueWU9ZnVuY3Rpb24oKXt9fSRPLndlPWZ1bmN0aW9uKHIsdCxuLGUpe3JldHVybiByWzBdPTksdFswXT01LG5bMF09RE8sZVswXT1HTywwfTt2YXIgS089WzE2LDE3LDE4LDAsOCw3LDksNiwxMCw1LDExLDQsMTIsMywxMywyLDE0LDEsMTVdO2Z1bmN0aW9uIHFPKHIsdCl7dmFyIG4sZT10aGlzLGk9MCxvPTAsdT0wLGY9MCxhPVswXSxjPVswXSxzPW5ldyBITyx2PTAsaD1uZXcgSW50MzJBcnJheSg0MzIwKSxsPW5ldyAkTztlLnNlPTAsZS5jZT0wLGUuaGU9bmV3IFVpbnQ4QXJyYXkodCksZS5lbmQ9dCxlLnJlYWQ9MCxlLndyaXRlPTAsZS5yZXNldD1mdW5jdGlvbihyLHQpe3QmJih0WzBdPTApLDY9PWkmJnMueWUociksaT0wLGUuc2U9MCxlLmNlPTAsZS5yZWFkPWUud3JpdGU9MH0sZS5yZXNldChyLG51bGwpLGUuZGU9ZnVuY3Rpb24ocix0KXt2YXIgbixpLG87cmV0dXJuIGk9ci51ZSwobj0oKG89ZS5yZWFkKT5lLndyaXRlP2UuZW5kOmUud3JpdGUpLW8pPnIuaWUmJihuPXIuaWUpLDAhPT1uJiYtNT09dCYmKHQ9MCksci5pZS09bixyLlhuKz1uLHIubmUuc2V0KGUuaGUuc3ViYXJyYXkobyxvK24pLGkpLGkrPW4sKG8rPW4pPT1lLmVuZCYmKG89MCxlLndyaXRlPT1lLmVuZCYmKGUud3JpdGU9MCksKG49ZS53cml0ZS1vKT5yLmllJiYobj1yLmllKSwwIT09biYmLTU9PXQmJih0PTApLHIuaWUtPW4sci5Ybis9bixyLm5lLnNldChlLmhlLnN1YmFycmF5KG8sbytuKSxpKSxpKz1uLG8rPW4pLHIudWU9aSxlLnJlYWQ9byx0fSxlLmxlPWZ1bmN0aW9uKHIsdCl7dmFyIGQseSx3LGIscCxnLG0sUztmb3IoYj1yLm9lLHA9ci5Xbix5PWUuY2Usdz1lLnNlLG09KGc9ZS53cml0ZSk8ZS5yZWFkP2UucmVhZC1nLTE6ZS5lbmQtZzs7KXt2YXIgQT12b2lkIDAsaj12b2lkIDAsTz12b2lkIDAsaz12b2lkIDAsRT12b2lkIDAsVD12b2lkIDAseD12b2lkIDAsVT12b2lkIDA7c3dpdGNoKGkpe2Nhc2UgMDpmb3IoOzM+dzspe2lmKDA9PT1wKXJldHVybiBlLmNlPXksZS5zZT13LHIuV249cCxyLkpuKz1iLXIub2Usci5vZT1iLGUud3JpdGU9ZyxlLmRlKHIsdCk7dD0wLHAtLSx5fD0oMjU1JnIudmUoYisrKSk8PHcsdys9OH1zd2l0Y2godj0xJihkPTcmeSksZD4+PjEpe2Nhc2UgMDp5Pj4+PTMseT4+Pj1kPTcmKHctPTMpLHctPWQsaT0xO2JyZWFrO2Nhc2UgMTpBPVtdLGo9W10sTz1bW11dLGs9W1tdXSwkTy53ZShBLGosTyxrKSxzLmluaXQoQVswXSxqWzBdLE9bMF0sMCxrWzBdLDApLHk+Pj49Myx3LT0zLGk9NjticmVhaztjYXNlIDI6eT4+Pj0zLHctPTMsaT0zO2JyZWFrO2Nhc2UgMzpyZXR1cm4geT4+Pj0zLHctPTMsaT05LHIuS249ImludmFsaWQgYmxvY2sgdHlwZSIsdD0tMyxlLmNlPXksZS5zZT13LHIuV249cCxyLkpuKz1iLXIub2Usci5vZT1iLGUud3JpdGU9ZyxlLmRlKHIsdCl9YnJlYWs7Y2FzZSAxOmZvcig7MzI+dzspe2lmKDA9PT1wKXJldHVybiBlLmNlPXksZS5zZT13LHIuV249cCxyLkpuKz1iLXIub2Usci5vZT1iLGUud3JpdGU9ZyxlLmRlKHIsdCk7dD0wLHAtLSx5fD0oMjU1JnIudmUoYisrKSk8PHcsdys9OH1pZigofnk+Pj4xNiY2NTUzNSkhPSg2NTUzNSZ5KSlyZXR1cm4gaT05LHIuS249ImludmFsaWQgc3RvcmVkIGJsb2NrIGxlbmd0aHMiLHQ9LTMsZS5jZT15LGUuc2U9dyxyLlduPXAsci5Kbis9Yi1yLm9lLHIub2U9YixlLndyaXRlPWcsZS5kZShyLHQpO289NjU1MzUmeSx5PXc9MCxpPTAhPT1vPzI6MCE9PXY/NzowO2JyZWFrO2Nhc2UgMjppZigwPT09cClyZXR1cm4gZS5jZT15LGUuc2U9dyxyLlduPXAsci5Kbis9Yi1yLm9lLHIub2U9YixlLndyaXRlPWcsZS5kZShyLHQpO2lmKDA9PT1tJiYoZz09ZS5lbmQmJjAhPT1lLnJlYWQmJihtPShnPTApPGUucmVhZD9lLnJlYWQtZy0xOmUuZW5kLWcpLDA9PT1tJiYoZS53cml0ZT1nLHQ9ZS5kZShyLHQpLG09KGc9ZS53cml0ZSk8ZS5yZWFkP2UucmVhZC1nLTE6ZS5lbmQtZyxnPT1lLmVuZCYmMCE9PWUucmVhZCYmKG09KGc9MCk8ZS5yZWFkP2UucmVhZC1nLTE6ZS5lbmQtZyksMD09PW0pKSlyZXR1cm4gZS5jZT15LGUuc2U9dyxyLlduPXAsci5Kbis9Yi1yLm9lLHIub2U9YixlLndyaXRlPWcsZS5kZShyLHQpO2lmKHQ9MCwoZD1vKT5wJiYoZD1wKSxkPm0mJihkPW0pLGUuaGUuc2V0KHIuJG4oYixkKSxnKSxiKz1kLHAtPWQsZys9ZCxtLT1kLDAhPShvLT1kKSlicmVhaztpPTAhPT12Pzc6MDticmVhaztjYXNlIDM6Zm9yKDsxND53Oyl7aWYoMD09PXApcmV0dXJuIGUuY2U9eSxlLnNlPXcsci5Xbj1wLHIuSm4rPWItci5vZSxyLm9lPWIsZS53cml0ZT1nLGUuZGUocix0KTt0PTAscC0tLHl8PSgyNTUmci52ZShiKyspKTw8dyx3Kz04fWlmKHU9ZD0xNjM4MyZ5LCgzMSZkKT4yOXx8KGQ+PjUmMzEpPjI5KXJldHVybiBpPTksci5Lbj0idG9vIG1hbnkgbGVuZ3RoIG9yIGRpc3RhbmNlIHN5bWJvbHMiLHQ9LTMsZS5jZT15LGUuc2U9dyxyLlduPXAsci5Kbis9Yi1yLm9lLHIub2U9YixlLndyaXRlPWcsZS5kZShyLHQpO2lmKGQ9MjU4KygzMSZkKSsoZD4+NSYzMSksIW58fG4ubGVuZ3RoPGQpbj1bXTtlbHNlIGZvcihTPTA7ZD5TO1MrKyluW1NdPTA7eT4+Pj0xNCx3LT0xNCxmPTAsaT00O2Nhc2UgNDpmb3IoOzQrKHU+Pj4xMCk+Zjspe2Zvcig7Mz53Oyl7aWYoMD09PXApcmV0dXJuIGUuY2U9eSxlLnNlPXcsci5Xbj1wLHIuSm4rPWItci5vZSxyLm9lPWIsZS53cml0ZT1nLGUuZGUocix0KTt0PTAscC0tLHl8PSgyNTUmci52ZShiKyspKTw8dyx3Kz04fW5bS09bZisrXV09NyZ5LHk+Pj49Myx3LT0zfWZvcig7MTk+ZjspbltLT1tmKytdXT0wO2lmKGFbMF09NywwIT0oZD1sLmZlKG4sYSxjLGgscikpKXJldHVybi0zPT0odD1kKSYmKG49bnVsbCxpPTkpLGUuY2U9eSxlLnNlPXcsci5Xbj1wLHIuSm4rPWItci5vZSxyLm9lPWIsZS53cml0ZT1nLGUuZGUocix0KTtmPTAsaT01O2Nhc2UgNTpmb3IoO2Y8MjU4KygzMSYoZD11KSkrKGQ+PjUmMzEpOyl7dmFyIE09dm9pZCAwLEk9dm9pZCAwO2ZvcihkPWFbMF07ZD53Oyl7aWYoMD09PXApcmV0dXJuIGUuY2U9eSxlLnNlPXcsci5Xbj1wLHIuSm4rPWItci5vZSxyLm9lPWIsZS53cml0ZT1nLGUuZGUocix0KTt0PTAscC0tLHl8PSgyNTUmci52ZShiKyspKTw8dyx3Kz04fWlmKGQ9aFszKihjWzBdKyh5JkJPW2RdKSkrMV0sMTY+KEk9aFszKihjWzBdKyh5JkJPW2RdKSkrMl0pKXk+Pj49ZCx3LT1kLG5bZisrXT1JO2Vsc2V7Zm9yKFM9MTg9PUk/NzpJLTE0LE09MTg9PUk/MTE6MztkK1M+dzspe2lmKDA9PT1wKXJldHVybiBlLmNlPXksZS5zZT13LHIuV249cCxyLkpuKz1iLXIub2Usci5vZT1iLGUud3JpdGU9ZyxlLmRlKHIsdCk7dD0wLHAtLSx5fD0oMjU1JnIudmUoYisrKSk8PHcsdys9OH1pZih3LT1kLE0rPSh5Pj4+PWQpJkJPW1NdLHk+Pj49Uyx3LT1TLChTPWYpK00+MjU4KygzMSYoZD11KSkrKGQ+PjUmMzEpfHwxNj09SSYmMT5TKXJldHVybiBuPW51bGwsaT05LHIuS249ImludmFsaWQgYml0IGxlbmd0aCByZXBlYXQiLHQ9LTMsZS5jZT15LGUuc2U9dyxyLlduPXAsci5Kbis9Yi1yLm9lLHIub2U9YixlLndyaXRlPWcsZS5kZShyLHQpO0k9MTY9PUk/bltTLTFdOjA7ZG97bltTKytdPUl9d2hpbGUoMCE9LS1NKTtmPVN9fWlmKGNbMF09LTEsVD1bXSx4PVtdLFU9W10sKEU9W10pWzBdPTksVFswXT02LGQ9dSwwIT0oZD1sLmFlKDI1NysoMzEmZCksMSsoZD4+NSYzMSksbixFLFQseCxVLGgscikpKXJldHVybi0zPT1kJiYobj1udWxsLGk9OSksdD1kLGUuY2U9eSxlLnNlPXcsci5Xbj1wLHIuSm4rPWItci5vZSxyLm9lPWIsZS53cml0ZT1nLGUuZGUocix0KTtzLmluaXQoRVswXSxUWzBdLGgseFswXSxoLFVbMF0pLGk9NjtjYXNlIDY6aWYoZS5jZT15LGUuc2U9dyxyLlduPXAsci5Kbis9Yi1yLm9lLHIub2U9YixlLndyaXRlPWcsMSE9KHQ9cy5sZShlLHIsdCkpKXJldHVybiBlLmRlKHIsdCk7aWYodD0wLHMueWUociksYj1yLm9lLHA9ci5Xbix5PWUuY2Usdz1lLnNlLG09KGc9ZS53cml0ZSk8ZS5yZWFkP2UucmVhZC1nLTE6ZS5lbmQtZywwPT09dil7aT0wO2JyZWFrfWk9NztjYXNlIDc6aWYoZS53cml0ZT1nLHQ9ZS5kZShyLHQpLG09KGc9ZS53cml0ZSk8ZS5yZWFkP2UucmVhZC1nLTE6ZS5lbmQtZyxlLnJlYWQhPWUud3JpdGUpcmV0dXJuIGUuY2U9eSxlLnNlPXcsci5Xbj1wLHIuSm4rPWItci5vZSxyLm9lPWIsZS53cml0ZT1nLGUuZGUocix0KTtpPTg7Y2FzZSA4OnJldHVybiB0PTEsZS5jZT15LGUuc2U9dyxyLlduPXAsci5Kbis9Yi1yLm9lLHIub2U9YixlLndyaXRlPWcsZS5kZShyLHQpO2Nhc2UgOTpyZXR1cm4gdD0tMyxlLmNlPXksZS5zZT13LHIuV249cCxyLkpuKz1iLXIub2Usci5vZT1iLGUud3JpdGU9ZyxlLmRlKHIsdCk7ZGVmYXVsdDpyZXR1cm4gdD0tMixlLmNlPXksZS5zZT13LHIuV249cCxyLkpuKz1iLXIub2Usci5vZT1iLGUud3JpdGU9ZyxlLmRlKHIsdCl9fX0sZS55ZT1mdW5jdGlvbihyKXtlLnJlc2V0KHIsbnVsbCksZS5oZT1udWxsLGg9bnVsbH0sZS5iZT1mdW5jdGlvbihyLHQsbil7ZS5oZS5zZXQoci5zdWJhcnJheSh0LHQrbiksMCksZS5yZWFkPWUud3JpdGU9bn0sZS5wZT1mdW5jdGlvbigpe3JldHVybiAxPT1pPzE6MH19dmFyIEpPPVswLDAsMjU1LDI1NV07ZnVuY3Rpb24gWE8oKXt2YXIgcj10aGlzO2Z1bmN0aW9uIHQocil7cmV0dXJuIHImJnIuZ2U/KHIuSm49ci5Ybj0wLHIuS249bnVsbCxyLmdlLm1vZGU9NyxyLmdlLm1lLnJlc2V0KHIsbnVsbCksMCk6LTJ9ci5tb2RlPTAsci5tZXRob2Q9MCxyLlNlPVswXSxyLkFlPTAsci5tYXJrZXI9MCxyLmplPTAsci5PZT1mdW5jdGlvbih0KXtyZXR1cm4gci5tZSYmci5tZS55ZSh0KSxyLm1lPW51bGwsMH0sci5rZT1mdW5jdGlvbihuLGUpe3JldHVybiBuLktuPW51bGwsci5tZT1udWxsLDg+ZXx8ZT4xNT8oci5PZShuKSwtMik6KHIuamU9ZSxuLmdlLm1lPW5ldyBxTyhuLDE8PGUpLHQobiksMCl9LHIuSnQ9ZnVuY3Rpb24ocix0KXt2YXIgbixlO2lmKCFyfHwhci5nZXx8IXIuZWUpcmV0dXJuLTI7dmFyIGk9ci5nZTtmb3IodD00PT10Py01OjAsbj0tNTs7KXN3aXRjaChpLm1vZGUpe2Nhc2UgMDppZigwPT09ci5XbilyZXR1cm4gbjtpZihuPXQsci5Xbi0tLHIuSm4rKyw4IT0oMTUmKGkubWV0aG9kPXIudmUoci5vZSsrKSkpKXtpLm1vZGU9MTMsci5Lbj0idW5rbm93biBjb21wcmVzc2lvbiBtZXRob2QiLGkubWFya2VyPTU7YnJlYWt9aWYoOCsoaS5tZXRob2Q+PjQpPmkuamUpe2kubW9kZT0xMyxyLktuPSJpbnZhbGlkIHdpbiBzaXplIixpLm1hcmtlcj01O2JyZWFrfWkubW9kZT0xO2Nhc2UgMTppZigwPT09ci5XbilyZXR1cm4gbjtpZihuPXQsci5Xbi0tLHIuSm4rKyxlPTI1NSZyLnZlKHIub2UrKyksKChpLm1ldGhvZDw8OCkrZSklMzEhPTApe2kubW9kZT0xMyxyLktuPSJpbmNvcnJlY3QgaGVhZGVyIGNoZWNrIixpLm1hcmtlcj01O2JyZWFrfWlmKDA9PSgzMiZlKSl7aS5tb2RlPTc7YnJlYWt9aS5tb2RlPTI7Y2FzZSAyOmlmKDA9PT1yLlduKXJldHVybiBuO249dCxyLlduLS0sci5KbisrLGkuQWU9KDI1NSZyLnZlKHIub2UrKykpPDwyNCY0Mjc4MTkwMDgwLGkubW9kZT0zO2Nhc2UgMzppZigwPT09ci5XbilyZXR1cm4gbjtuPXQsci5Xbi0tLHIuSm4rKyxpLkFlKz0oMjU1JnIudmUoci5vZSsrKSk8PDE2JjE2NzExNjgwLGkubW9kZT00O2Nhc2UgNDppZigwPT09ci5XbilyZXR1cm4gbjtuPXQsci5Xbi0tLHIuSm4rKyxpLkFlKz0oMjU1JnIudmUoci5vZSsrKSk8PDgmNjUyODAsaS5tb2RlPTU7Y2FzZSA1OnJldHVybiAwPT09ci5Xbj9uOihuPXQsci5Xbi0tLHIuSm4rKyxpLkFlKz0yNTUmci52ZShyLm9lKyspLGkubW9kZT02LDIpO2Nhc2UgNjpyZXR1cm4gaS5tb2RlPTEzLHIuS249Im5lZWQgZGljdGlvbmFyeSIsaS5tYXJrZXI9MCwtMjtjYXNlIDc6aWYoLTM9PShuPWkubWUubGUocixuKSkpe2kubW9kZT0xMyxpLm1hcmtlcj0wO2JyZWFrfWlmKDA9PW4mJihuPXQpLDEhPW4pcmV0dXJuIG47bj10LGkubWUucmVzZXQocixpLlNlKSxpLm1vZGU9MTI7Y2FzZSAxMjpyZXR1cm4gci5Xbj0wLDE7Y2FzZSAxMzpyZXR1cm4tMztkZWZhdWx0OnJldHVybi0yfX0sci5FZT1mdW5jdGlvbihyLHQsbil7dmFyIGU9MCxpPW47aWYoIXJ8fCFyLmdlfHw2IT1yLmdlLm1vZGUpcmV0dXJuLTI7dmFyIG89ci5nZTtyZXR1cm4gaTwxPDxvLmplfHwoZT1uLShpPSgxPDxvLmplKS0xKSksby5tZS5iZSh0LGUsaSksby5tb2RlPTcsMH0sci5UZT1mdW5jdGlvbihyKXt2YXIgbixlLGksbyx1O2lmKCFyfHwhci5nZSlyZXR1cm4tMjt2YXIgZj1yLmdlO2lmKDEzIT1mLm1vZGUmJihmLm1vZGU9MTMsZi5tYXJrZXI9MCksMD09PShuPXIuV24pKXJldHVybi01O2ZvcihlPXIub2UsaT1mLm1hcmtlcjswIT09biYmND5pOylyLnZlKGUpPT1KT1tpXT9pKys6aT0wIT09ci52ZShlKT8wOjQtaSxlKyssbi0tO3JldHVybiByLkpuKz1lLXIub2Usci5vZT1lLHIuV249bixmLm1hcmtlcj1pLDQhPWk/LTM6KG89ci5Kbix1PXIuWG4sdChyKSxyLkpuPW8sci5Ybj11LGYubW9kZT03LDApfSxyLnhlPWZ1bmN0aW9uKHIpe3JldHVybiByJiZyLmdlJiZyLmdlLm1lP3IuZ2UubWUucGUoKTotMn19ZnVuY3Rpb24gUU8oKXt9ZnVuY3Rpb24gWk8ocil7dmFyIHQ9bmV3IFFPLG49ciYmci5xdD9NYXRoLmZsb29yKDIqci5xdCk6MTMxMDcyLGU9bmV3IFVpbnQ4QXJyYXkobiksaT0hMTt0LmtlKCksdC5uZT1lLHRoaXMuYXBwZW5kPWZ1bmN0aW9uKHIsbyl7dmFyIHUsZixhPVtdLGM9MCxzPTAsdj0wO2lmKDAhPT1yLmxlbmd0aCl7dC5vZT0wLHQuZWU9cix0LlduPXIubGVuZ3RoO2Rve2lmKHQudWU9MCx0LmllPW4sMCE9PXQuV258fGl8fCh0Lm9lPTAsaT0hMCksdT10Lkp0KDApLGkmJi01PT09dSl7aWYoMCE9PXQuV24pdGhyb3cgRXJyb3IoImluZmxhdGluZzogYmFkIGlucHV0Iil9ZWxzZSBpZigwIT09dSYmMSE9PXUpdGhyb3cgRXJyb3IoImluZmxhdGluZzogIit0LktuKTtpZigoaXx8MT09PXUpJiZ0LlduPT09ci5sZW5ndGgpdGhyb3cgRXJyb3IoImluZmxhdGluZzogYmFkIGlucHV0Iik7dC51ZSYmKHQudWU9PT1uP2EucHVzaChuZXcgVWludDhBcnJheShlKSk6YS5wdXNoKGUuc2xpY2UoMCx0LnVlKSkpLHYrPXQudWUsbyYmdC5vZT4wJiZ0Lm9lIT1jJiYobyh0Lm9lKSxjPXQub2UpfXdoaWxlKHQuV24+MHx8MD09PXQuaWUpO3JldHVybiBhLmxlbmd0aD4xPyhmPW5ldyBVaW50OEFycmF5KHYpLGEuZm9yRWFjaCgoZnVuY3Rpb24ocil7Zi5zZXQocixzKSxzKz1yLmxlbmd0aH0pKSk6Zj1hWzBdfHxuZXcgVWludDhBcnJheSgwKSxmfX0sdGhpcy5mbHVzaD1mdW5jdGlvbigpe3QuT2UoKX19UU8ucHJvdG90eXBlPXtrZTpmdW5jdGlvbihyKXt2YXIgdD10aGlzO3JldHVybiB0LmdlPW5ldyBYTyxyfHwocj0xNSksdC5nZS5rZSh0LHIpfSxKdDpmdW5jdGlvbihyKXt2YXIgdD10aGlzO3JldHVybiB0LmdlP3QuZ2UuSnQodCxyKTotMn0sT2U6ZnVuY3Rpb24oKXt2YXIgcj10aGlzO2lmKCFyLmdlKXJldHVybi0yO3ZhciB0PXIuZ2UuT2Uocik7cmV0dXJuIHIuZ2U9bnVsbCx0fSxUZTpmdW5jdGlvbigpe3ZhciByPXRoaXM7cmV0dXJuIHIuZ2U/ci5nZS5UZShyKTotMn0sRWU6ZnVuY3Rpb24ocix0KXt2YXIgbj10aGlzO3JldHVybiBuLmdlP24uZ2UuRWUobixyLHQpOi0yfSx2ZTpmdW5jdGlvbihyKXtyZXR1cm4gdGhpcy5lZVtyXX0sJG46ZnVuY3Rpb24ocix0KXtyZXR1cm4gdGhpcy5lZS5zdWJhcnJheShyLHIrdCl9fSxzZWxmLmluaXRDb2RlYz1mdW5jdGlvbigpe3NlbGYuRGVmbGF0ZT1GTyxzZWxmLkluZmxhdGU9Wk99Owo=")], {
          type: "text/javascript"
        }));
      };

      _d({
        workerScripts: {
          inflate: [m],
          deflate: [m]
        }
      });
    }
  };

  /*
   Copyright (c) 2022 Gildas Lormeau. All rights reserved.

   Redistribution and use in source and binary forms, with or without
   modification, are permitted provided that the following conditions are met:

   1. Redistributions of source code must retain the above copyright notice,
   this list of conditions and the following disclaimer.

   2. Redistributions in binary form must reproduce the above copyright 
   notice, this list of conditions and the following disclaimer in 
   the documentation and/or other materials provided with the distribution.

   3. The names of the authors may not be used to endorse or promote products
   derived from this software without specific prior written permission.

   THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
   INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
   FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
   INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
   INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
   LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
   OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
   EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   */
  var streamCodecShim = (function (library) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var registerDataHandler = arguments.length > 2 ? arguments[2] : undefined;
    return {
      Deflate: createCodecClass(library.Deflate, options.deflate, registerDataHandler),
      Inflate: createCodecClass(library.Inflate, options.inflate, registerDataHandler)
    };
  });

  function createCodecClass(constructor, constructorOptions, registerDataHandler) {
    return /*#__PURE__*/function () {
      function _class(options) {
        _classCallCheck(this, _class);

        var codecAdapter = this;

        var onData = function onData(data) {
          if (codecAdapter.pendingData) {
            var pendingData = codecAdapter.pendingData;
            codecAdapter.pendingData = new Uint8Array(pendingData.length + data.length);
            codecAdapter.pendingData.set(pendingData, 0);
            codecAdapter.pendingData.set(data, pendingData.length);
          } else {
            codecAdapter.pendingData = new Uint8Array(data);
          }
        };

        codecAdapter.codec = new constructor(Object.assign({}, constructorOptions, options));
        registerDataHandler(codecAdapter.codec, onData);
      }

      _createClass(_class, [{
        key: "append",
        value: function append(data) {
          try {
            var _this2 = this;

            _this2.codec.push(data);

            return _await(getResponse(_this2));
          } catch (e) {
            return Promise.reject(e);
          }
        }
      }, {
        key: "flush",
        value: function flush() {
          try {
            var _this4 = this;

            _this4.codec.push(new Uint8Array(0), true);

            return _await(getResponse(_this4));
          } catch (e) {
            return Promise.reject(e);
          }
        }
      }]);

      return _class;
    }();

    function getResponse(codec) {
      if (codec.pendingData) {
        var output = codec.pendingData;
        codec.pendingData = null;
        return output;
      } else {
        return new Uint8Array(0);
      }
    }
  }

  var global$4 = global$F;

  var path$1 = global$4;

  var wellKnownSymbolWrapped = {};

  var wellKnownSymbol$3 = wellKnownSymbol$t;

  wellKnownSymbolWrapped.f = wellKnownSymbol$3;

  var path = path$1;
  var hasOwn$5 = hasOwnProperty_1;
  var wrappedWellKnownSymbolModule$1 = wellKnownSymbolWrapped;
  var defineProperty$4 = objectDefineProperty.f;

  var defineWellKnownSymbol$2 = function (NAME) {
    var Symbol = path.Symbol || (path.Symbol = {});
    if (!hasOwn$5(Symbol, NAME)) defineProperty$4(Symbol, NAME, {
      value: wrappedWellKnownSymbolModule$1.f(NAME)
    });
  };

  var defineWellKnownSymbol$1 = defineWellKnownSymbol$2;

  // `Symbol.iterator` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.iterator
  defineWellKnownSymbol$1('iterator');

  var objectGetOwnPropertyNamesExternal = {};

  /* eslint-disable es-x/no-object-getownpropertynames -- safe */

  var classof$1 = classofRaw$1;
  var toIndexedObject$2 = toIndexedObject$b;
  var $getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
  var arraySlice$1 = arraySliceSimple;

  var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
    ? Object.getOwnPropertyNames(window) : [];

  var getWindowNames = function (it) {
    try {
      return $getOwnPropertyNames$1(it);
    } catch (error) {
      return arraySlice$1(windowNames);
    }
  };

  // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
  objectGetOwnPropertyNamesExternal.f = function getOwnPropertyNames(it) {
    return windowNames && classof$1(it) == 'Window'
      ? getWindowNames(it)
      : $getOwnPropertyNames$1(toIndexedObject$2(it));
  };

  var call$3 = functionCall;
  var getBuiltIn$2 = getBuiltIn$b;
  var wellKnownSymbol$2 = wellKnownSymbol$t;
  var defineBuiltIn$2 = defineBuiltIn$f;

  var symbolDefineToPrimitive = function () {
    var Symbol = getBuiltIn$2('Symbol');
    var SymbolPrototype = Symbol && Symbol.prototype;
    var valueOf = SymbolPrototype && SymbolPrototype.valueOf;
    var TO_PRIMITIVE = wellKnownSymbol$2('toPrimitive');

    if (SymbolPrototype && !SymbolPrototype[TO_PRIMITIVE]) {
      // `Symbol.prototype[@@toPrimitive]` method
      // https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
      // eslint-disable-next-line no-unused-vars -- required for .length
      defineBuiltIn$2(SymbolPrototype, TO_PRIMITIVE, function (hint) {
        return call$3(valueOf, this);
      }, { arity: 1 });
    }
  };

  var $$b = _export;
  var global$3 = global$F;
  var call$2 = functionCall;
  var uncurryThis$9 = functionUncurryThis;
  var DESCRIPTORS$4 = descriptors;
  var NATIVE_SYMBOL$4 = nativeSymbol;
  var fails$8 = fails$H;
  var hasOwn$4 = hasOwnProperty_1;
  var isPrototypeOf$1 = objectIsPrototypeOf;
  var anObject$1 = anObject$i;
  var toIndexedObject$1 = toIndexedObject$b;
  var toPropertyKey = toPropertyKey$5;
  var $toString = toString$a;
  var createPropertyDescriptor = createPropertyDescriptor$7;
  var nativeObjectCreate = objectCreate;
  var objectKeys$1 = objectKeys$4;
  var getOwnPropertyNamesModule$1 = objectGetOwnPropertyNames;
  var getOwnPropertyNamesExternal = objectGetOwnPropertyNamesExternal;
  var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
  var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
  var definePropertyModule = objectDefineProperty;
  var definePropertiesModule = objectDefineProperties;
  var propertyIsEnumerableModule = objectPropertyIsEnumerable;
  var defineBuiltIn$1 = defineBuiltIn$f;
  var shared$2 = shared$7.exports;
  var sharedKey = sharedKey$4;
  var hiddenKeys$1 = hiddenKeys$6;
  var uid$1 = uid$5;
  var wellKnownSymbol$1 = wellKnownSymbol$t;
  var wrappedWellKnownSymbolModule = wellKnownSymbolWrapped;
  var defineWellKnownSymbol = defineWellKnownSymbol$2;
  var defineSymbolToPrimitive = symbolDefineToPrimitive;
  var setToStringTag$1 = setToStringTag$8;
  var InternalStateModule$1 = internalState;
  var $forEach = arrayIteration.forEach;

  var HIDDEN = sharedKey('hidden');
  var SYMBOL = 'Symbol';
  var PROTOTYPE = 'prototype';

  var setInternalState$1 = InternalStateModule$1.set;
  var getInternalState = InternalStateModule$1.getterFor(SYMBOL);

  var ObjectPrototype = Object[PROTOTYPE];
  var $Symbol = global$3.Symbol;
  var SymbolPrototype$1 = $Symbol && $Symbol[PROTOTYPE];
  var TypeError$1 = global$3.TypeError;
  var QObject = global$3.QObject;
  var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  var nativeDefineProperty = definePropertyModule.f;
  var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
  var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
  var push$2 = uncurryThis$9([].push);

  var AllSymbols = shared$2('symbols');
  var ObjectPrototypeSymbols = shared$2('op-symbols');
  var WellKnownSymbolsStore = shared$2('wks');

  // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
  var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

  // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
  var setSymbolDescriptor = DESCRIPTORS$4 && fails$8(function () {
    return nativeObjectCreate(nativeDefineProperty({}, 'a', {
      get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
    })).a != 7;
  }) ? function (O, P, Attributes) {
    var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
    if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
    nativeDefineProperty(O, P, Attributes);
    if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
      nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
    }
  } : nativeDefineProperty;

  var wrap = function (tag, description) {
    var symbol = AllSymbols[tag] = nativeObjectCreate(SymbolPrototype$1);
    setInternalState$1(symbol, {
      type: SYMBOL,
      tag: tag,
      description: description
    });
    if (!DESCRIPTORS$4) symbol.description = description;
    return symbol;
  };

  var $defineProperty = function defineProperty(O, P, Attributes) {
    if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
    anObject$1(O);
    var key = toPropertyKey(P);
    anObject$1(Attributes);
    if (hasOwn$4(AllSymbols, key)) {
      if (!Attributes.enumerable) {
        if (!hasOwn$4(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
        O[HIDDEN][key] = true;
      } else {
        if (hasOwn$4(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
        Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
      } return setSymbolDescriptor(O, key, Attributes);
    } return nativeDefineProperty(O, key, Attributes);
  };

  var $defineProperties = function defineProperties(O, Properties) {
    anObject$1(O);
    var properties = toIndexedObject$1(Properties);
    var keys = objectKeys$1(properties).concat($getOwnPropertySymbols(properties));
    $forEach(keys, function (key) {
      if (!DESCRIPTORS$4 || call$2($propertyIsEnumerable$1, properties, key)) $defineProperty(O, key, properties[key]);
    });
    return O;
  };

  var $create = function create(O, Properties) {
    return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
  };

  var $propertyIsEnumerable$1 = function propertyIsEnumerable(V) {
    var P = toPropertyKey(V);
    var enumerable = call$2(nativePropertyIsEnumerable, this, P);
    if (this === ObjectPrototype && hasOwn$4(AllSymbols, P) && !hasOwn$4(ObjectPrototypeSymbols, P)) return false;
    return enumerable || !hasOwn$4(this, P) || !hasOwn$4(AllSymbols, P) || hasOwn$4(this, HIDDEN) && this[HIDDEN][P]
      ? enumerable : true;
  };

  var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
    var it = toIndexedObject$1(O);
    var key = toPropertyKey(P);
    if (it === ObjectPrototype && hasOwn$4(AllSymbols, key) && !hasOwn$4(ObjectPrototypeSymbols, key)) return;
    var descriptor = nativeGetOwnPropertyDescriptor(it, key);
    if (descriptor && hasOwn$4(AllSymbols, key) && !(hasOwn$4(it, HIDDEN) && it[HIDDEN][key])) {
      descriptor.enumerable = true;
    }
    return descriptor;
  };

  var $getOwnPropertyNames = function getOwnPropertyNames(O) {
    var names = nativeGetOwnPropertyNames(toIndexedObject$1(O));
    var result = [];
    $forEach(names, function (key) {
      if (!hasOwn$4(AllSymbols, key) && !hasOwn$4(hiddenKeys$1, key)) push$2(result, key);
    });
    return result;
  };

  var $getOwnPropertySymbols = function (O) {
    var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
    var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject$1(O));
    var result = [];
    $forEach(names, function (key) {
      if (hasOwn$4(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || hasOwn$4(ObjectPrototype, key))) {
        push$2(result, AllSymbols[key]);
      }
    });
    return result;
  };

  // `Symbol` constructor
  // https://tc39.es/ecma262/#sec-symbol-constructor
  if (!NATIVE_SYMBOL$4) {
    $Symbol = function Symbol() {
      if (isPrototypeOf$1(SymbolPrototype$1, this)) throw TypeError$1('Symbol is not a constructor');
      var description = !arguments.length || arguments[0] === undefined ? undefined : $toString(arguments[0]);
      var tag = uid$1(description);
      var setter = function (value) {
        if (this === ObjectPrototype) call$2(setter, ObjectPrototypeSymbols, value);
        if (hasOwn$4(this, HIDDEN) && hasOwn$4(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
        setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
      };
      if (DESCRIPTORS$4 && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
      return wrap(tag, description);
    };

    SymbolPrototype$1 = $Symbol[PROTOTYPE];

    defineBuiltIn$1(SymbolPrototype$1, 'toString', function toString() {
      return getInternalState(this).tag;
    });

    defineBuiltIn$1($Symbol, 'withoutSetter', function (description) {
      return wrap(uid$1(description), description);
    });

    propertyIsEnumerableModule.f = $propertyIsEnumerable$1;
    definePropertyModule.f = $defineProperty;
    definePropertiesModule.f = $defineProperties;
    getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
    getOwnPropertyNamesModule$1.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
    getOwnPropertySymbolsModule$1.f = $getOwnPropertySymbols;

    wrappedWellKnownSymbolModule.f = function (name) {
      return wrap(wellKnownSymbol$1(name), name);
    };

    if (DESCRIPTORS$4) {
      // https://github.com/tc39/proposal-Symbol-description
      nativeDefineProperty(SymbolPrototype$1, 'description', {
        configurable: true,
        get: function description() {
          return getInternalState(this).description;
        }
      });
      {
        defineBuiltIn$1(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable$1, { unsafe: true });
      }
    }
  }

  $$b({ global: true, constructor: true, wrap: true, forced: !NATIVE_SYMBOL$4, sham: !NATIVE_SYMBOL$4 }, {
    Symbol: $Symbol
  });

  $forEach(objectKeys$1(WellKnownSymbolsStore), function (name) {
    defineWellKnownSymbol(name);
  });

  $$b({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL$4 }, {
    useSetter: function () { USE_SETTER = true; },
    useSimple: function () { USE_SETTER = false; }
  });

  $$b({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL$4, sham: !DESCRIPTORS$4 }, {
    // `Object.create` method
    // https://tc39.es/ecma262/#sec-object.create
    create: $create,
    // `Object.defineProperty` method
    // https://tc39.es/ecma262/#sec-object.defineproperty
    defineProperty: $defineProperty,
    // `Object.defineProperties` method
    // https://tc39.es/ecma262/#sec-object.defineproperties
    defineProperties: $defineProperties,
    // `Object.getOwnPropertyDescriptor` method
    // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
    getOwnPropertyDescriptor: $getOwnPropertyDescriptor
  });

  $$b({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL$4 }, {
    // `Object.getOwnPropertyNames` method
    // https://tc39.es/ecma262/#sec-object.getownpropertynames
    getOwnPropertyNames: $getOwnPropertyNames
  });

  // `Symbol.prototype[@@toPrimitive]` method
  // https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
  defineSymbolToPrimitive();

  // `Symbol.prototype[@@toStringTag]` property
  // https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
  setToStringTag$1($Symbol, SYMBOL);

  hiddenKeys$1[HIDDEN] = true;

  var NATIVE_SYMBOL$3 = nativeSymbol;

  /* eslint-disable es-x/no-symbol -- safe */
  var nativeSymbolRegistry = NATIVE_SYMBOL$3 && !!Symbol['for'] && !!Symbol.keyFor;

  var $$a = _export;
  var getBuiltIn$1 = getBuiltIn$b;
  var hasOwn$3 = hasOwnProperty_1;
  var toString$3 = toString$a;
  var shared$1 = shared$7.exports;
  var NATIVE_SYMBOL_REGISTRY$1 = nativeSymbolRegistry;

  var StringToSymbolRegistry = shared$1('string-to-symbol-registry');
  var SymbolToStringRegistry$1 = shared$1('symbol-to-string-registry');

  // `Symbol.for` method
  // https://tc39.es/ecma262/#sec-symbol.for
  $$a({ target: 'Symbol', stat: true, forced: !NATIVE_SYMBOL_REGISTRY$1 }, {
    'for': function (key) {
      var string = toString$3(key);
      if (hasOwn$3(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
      var symbol = getBuiltIn$1('Symbol')(string);
      StringToSymbolRegistry[string] = symbol;
      SymbolToStringRegistry$1[symbol] = string;
      return symbol;
    }
  });

  var $$9 = _export;
  var hasOwn$2 = hasOwnProperty_1;
  var isSymbol$1 = isSymbol$6;
  var tryToString = tryToString$7;
  var shared = shared$7.exports;
  var NATIVE_SYMBOL_REGISTRY = nativeSymbolRegistry;

  var SymbolToStringRegistry = shared('symbol-to-string-registry');

  // `Symbol.keyFor` method
  // https://tc39.es/ecma262/#sec-symbol.keyfor
  $$9({ target: 'Symbol', stat: true, forced: !NATIVE_SYMBOL_REGISTRY }, {
    keyFor: function keyFor(sym) {
      if (!isSymbol$1(sym)) throw TypeError(tryToString(sym) + ' is not a symbol');
      if (hasOwn$2(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
    }
  });

  var $$8 = _export;
  var getBuiltIn = getBuiltIn$b;
  var apply$1 = functionApply;
  var call$1 = functionCall;
  var uncurryThis$8 = functionUncurryThis;
  var fails$7 = fails$H;
  var isArray = isArray$4;
  var isCallable$3 = isCallable$s;
  var isObject$3 = isObject$k;
  var isSymbol = isSymbol$6;
  var arraySlice = arraySlice$9;
  var NATIVE_SYMBOL$2 = nativeSymbol;

  var $stringify = getBuiltIn('JSON', 'stringify');
  var exec = uncurryThis$8(/./.exec);
  var charAt$1 = uncurryThis$8(''.charAt);
  var charCodeAt = uncurryThis$8(''.charCodeAt);
  var replace$2 = uncurryThis$8(''.replace);
  var numberToString = uncurryThis$8(1.0.toString);

  var tester = /[\uD800-\uDFFF]/g;
  var low = /^[\uD800-\uDBFF]$/;
  var hi = /^[\uDC00-\uDFFF]$/;

  var WRONG_SYMBOLS_CONVERSION = !NATIVE_SYMBOL$2 || fails$7(function () {
    var symbol = getBuiltIn('Symbol')();
    // MS Edge converts symbol values to JSON as {}
    return $stringify([symbol]) != '[null]'
      // WebKit converts symbol values to JSON as null
      || $stringify({ a: symbol }) != '{}'
      // V8 throws on boxed symbols
      || $stringify(Object(symbol)) != '{}';
  });

  // https://github.com/tc39/proposal-well-formed-stringify
  var ILL_FORMED_UNICODE = fails$7(function () {
    return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"'
      || $stringify('\uDEAD') !== '"\\udead"';
  });

  var stringifyWithSymbolsFix = function (it, replacer) {
    var args = arraySlice(arguments);
    var $replacer = replacer;
    if (!isObject$3(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (isCallable$3($replacer)) value = call$1($replacer, this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return apply$1($stringify, null, args);
  };

  var fixIllFormed = function (match, offset, string) {
    var prev = charAt$1(string, offset - 1);
    var next = charAt$1(string, offset + 1);
    if ((exec(low, match) && !exec(hi, next)) || (exec(hi, match) && !exec(low, prev))) {
      return '\\u' + numberToString(charCodeAt(match, 0), 16);
    } return match;
  };

  if ($stringify) {
    // `JSON.stringify` method
    // https://tc39.es/ecma262/#sec-json.stringify
    $$8({ target: 'JSON', stat: true, arity: 3, forced: WRONG_SYMBOLS_CONVERSION || ILL_FORMED_UNICODE }, {
      // eslint-disable-next-line no-unused-vars -- required for `.length`
      stringify: function stringify(it, replacer, space) {
        var args = arraySlice(arguments);
        var result = apply$1(WRONG_SYMBOLS_CONVERSION ? stringifyWithSymbolsFix : $stringify, null, args);
        return ILL_FORMED_UNICODE && typeof result == 'string' ? replace$2(result, tester, fixIllFormed) : result;
      }
    });
  }

  var $$7 = _export;
  var NATIVE_SYMBOL$1 = nativeSymbol;
  var fails$6 = fails$H;
  var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
  var toObject$1 = toObject$d;

  // V8 ~ Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
  // https://bugs.chromium.org/p/v8/issues/detail?id=3443
  var FORCED = !NATIVE_SYMBOL$1 || fails$6(function () { getOwnPropertySymbolsModule.f(1); });

  // `Object.getOwnPropertySymbols` method
  // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
  $$7({ target: 'Object', stat: true, forced: FORCED }, {
    getOwnPropertySymbols: function getOwnPropertySymbols(it) {
      var $getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
      return $getOwnPropertySymbols ? $getOwnPropertySymbols(toObject$1(it)) : [];
    }
  });

  var $$6 = _export;
  var DESCRIPTORS$3 = descriptors;
  var global$2 = global$F;
  var uncurryThis$7 = functionUncurryThis;
  var hasOwn$1 = hasOwnProperty_1;
  var isCallable$2 = isCallable$s;
  var isPrototypeOf = objectIsPrototypeOf;
  var toString$2 = toString$a;
  var defineProperty$3 = objectDefineProperty.f;
  var copyConstructorProperties = copyConstructorProperties$2;

  var NativeSymbol = global$2.Symbol;
  var SymbolPrototype = NativeSymbol && NativeSymbol.prototype;

  if (DESCRIPTORS$3 && isCallable$2(NativeSymbol) && (!('description' in SymbolPrototype) ||
    // Safari 12 bug
    NativeSymbol().description !== undefined
  )) {
    var EmptyStringDescriptionStore = {};
    // wrap Symbol constructor for correct work with undefined description
    var SymbolWrapper = function Symbol() {
      var description = arguments.length < 1 || arguments[0] === undefined ? undefined : toString$2(arguments[0]);
      var result = isPrototypeOf(SymbolPrototype, this)
        ? new NativeSymbol(description)
        // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
        : description === undefined ? NativeSymbol() : NativeSymbol(description);
      if (description === '') EmptyStringDescriptionStore[result] = true;
      return result;
    };

    copyConstructorProperties(SymbolWrapper, NativeSymbol);
    SymbolWrapper.prototype = SymbolPrototype;
    SymbolPrototype.constructor = SymbolWrapper;

    var NATIVE_SYMBOL = String(NativeSymbol('test')) == 'Symbol(test)';
    var symbolToString = uncurryThis$7(SymbolPrototype.toString);
    var symbolValueOf = uncurryThis$7(SymbolPrototype.valueOf);
    var regexp = /^Symbol\((.*)\)[^)]+$/;
    var replace$1 = uncurryThis$7(''.replace);
    var stringSlice$2 = uncurryThis$7(''.slice);

    defineProperty$3(SymbolPrototype, 'description', {
      configurable: true,
      get: function description() {
        var symbol = symbolValueOf(this);
        var string = symbolToString(symbol);
        if (hasOwn$1(EmptyStringDescriptionStore, symbol)) return '';
        var desc = NATIVE_SYMBOL ? stringSlice$2(string, 7, -1) : replace$1(string, regexp, '$1');
        return desc === '' ? undefined : desc;
      }
    });

    $$6({ global: true, constructor: true, forced: true }, {
      Symbol: SymbolWrapper
    });
  }

  var $$5 = _export;
  var iterate$2 = iterate$5;
  var createProperty = createProperty$6;

  // `Object.fromEntries` method
  // https://github.com/tc39/proposal-object-from-entries
  $$5({ target: 'Object', stat: true }, {
    fromEntries: function fromEntries(iterable) {
      var obj = {};
      iterate$2(iterable, function (k, v) {
        createProperty(obj, k, v);
      }, { AS_ENTRIES: true });
      return obj;
    }
  });

  var PROPER_FUNCTION_NAME = functionName.PROPER;
  var fails$5 = fails$H;
  var whitespaces = whitespaces$2;

  var non = '\u200B\u0085\u180E';

  // check that a method works with the correct list
  // of whitespaces and has a correct name
  var stringTrimForced = function (METHOD_NAME) {
    return fails$5(function () {
      return !!whitespaces[METHOD_NAME]()
        || non[METHOD_NAME]() !== non
        || (PROPER_FUNCTION_NAME && whitespaces[METHOD_NAME].name !== METHOD_NAME);
    });
  };

  var $$4 = _export;
  var $trim = stringTrim.trim;
  var forcedStringTrimMethod = stringTrimForced;

  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  $$4({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
    trim: function trim() {
      return $trim(this);
    }
  });

  var uncurryThis$6 = functionUncurryThis;
  var toObject = toObject$d;

  var floor = Math.floor;
  var charAt = uncurryThis$6(''.charAt);
  var replace = uncurryThis$6(''.replace);
  var stringSlice$1 = uncurryThis$6(''.slice);
  var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
  var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

  // `GetSubstitution` abstract operation
  // https://tc39.es/ecma262/#sec-getsubstitution
  var getSubstitution$1 = function (matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return replace(replacement, symbols, function (match, ch) {
      var capture;
      switch (charAt(ch, 0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return stringSlice$1(str, 0, position);
        case "'": return stringSlice$1(str, tailPos);
        case '<':
          capture = namedCaptures[stringSlice$1(ch, 1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? charAt(ch, 1) : captures[f - 1] + charAt(ch, 1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  };

  var apply = functionApply;
  var call = functionCall;
  var uncurryThis$5 = functionUncurryThis;
  var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
  var fails$4 = fails$H;
  var anObject = anObject$i;
  var isCallable$1 = isCallable$s;
  var toIntegerOrInfinity = toIntegerOrInfinity$9;
  var toLength$1 = toLength$a;
  var toString$1 = toString$a;
  var requireObjectCoercible$1 = requireObjectCoercible$8;
  var advanceStringIndex = advanceStringIndex$2;
  var getMethod = getMethod$5;
  var getSubstitution = getSubstitution$1;
  var regExpExec$1 = regexpExecAbstract;
  var wellKnownSymbol = wellKnownSymbol$t;

  var REPLACE = wellKnownSymbol('replace');
  var max = Math.max;
  var min$1 = Math.min;
  var concat = uncurryThis$5([].concat);
  var push$1 = uncurryThis$5([].push);
  var stringIndexOf = uncurryThis$5(''.indexOf);
  var stringSlice = uncurryThis$5(''.slice);

  var maybeToString = function (it) {
    return it === undefined ? it : String(it);
  };

  // IE <= 11 replaces $0 with the whole match, as if it was $&
  // https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
  var REPLACE_KEEPS_$0 = (function () {
    // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
    return 'a'.replace(/./, '$0') === '$0';
  })();

  // Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
    if (/./[REPLACE]) {
      return /./[REPLACE]('a', '$0') === '';
    }
    return false;
  })();

  var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$4(function () {
    var re = /./;
    re.exec = function () {
      var result = [];
      result.groups = { a: '7' };
      return result;
    };
    // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
    return ''.replace(re, '$<a>') !== '7';
  });

  // @@replace logic
  fixRegExpWellKnownSymbolLogic('replace', function (_, nativeReplace, maybeCallNative) {
    var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

    return [
      // `String.prototype.replace` method
      // https://tc39.es/ecma262/#sec-string.prototype.replace
      function replace(searchValue, replaceValue) {
        var O = requireObjectCoercible$1(this);
        var replacer = searchValue == undefined ? undefined : getMethod(searchValue, REPLACE);
        return replacer
          ? call(replacer, searchValue, O, replaceValue)
          : call(nativeReplace, toString$1(O), searchValue, replaceValue);
      },
      // `RegExp.prototype[@@replace]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
      function (string, replaceValue) {
        var rx = anObject(this);
        var S = toString$1(string);

        if (
          typeof replaceValue == 'string' &&
          stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
          stringIndexOf(replaceValue, '$<') === -1
        ) {
          var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
          if (res.done) return res.value;
        }

        var functionalReplace = isCallable$1(replaceValue);
        if (!functionalReplace) replaceValue = toString$1(replaceValue);

        var global = rx.global;
        if (global) {
          var fullUnicode = rx.unicode;
          rx.lastIndex = 0;
        }
        var results = [];
        while (true) {
          var result = regExpExec$1(rx, S);
          if (result === null) break;

          push$1(results, result);
          if (!global) break;

          var matchStr = toString$1(result[0]);
          if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength$1(rx.lastIndex), fullUnicode);
        }

        var accumulatedResult = '';
        var nextSourcePosition = 0;
        for (var i = 0; i < results.length; i++) {
          result = results[i];

          var matched = toString$1(result[0]);
          var position = max(min$1(toIntegerOrInfinity(result.index), S.length), 0);
          var captures = [];
          // NOTE: This is equivalent to
          //   captures = result.slice(1).map(maybeToString)
          // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
          // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
          // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
          for (var j = 1; j < result.length; j++) push$1(captures, maybeToString(result[j]));
          var namedCaptures = result.groups;
          if (functionalReplace) {
            var replacerArgs = concat([matched], captures, position, S);
            if (namedCaptures !== undefined) push$1(replacerArgs, namedCaptures);
            var replacement = toString$1(apply(replaceValue, undefined, replacerArgs));
          } else {
            replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
          }
          if (position >= nextSourcePosition) {
            accumulatedResult += stringSlice(S, nextSourcePosition, position) + replacement;
            nextSourcePosition = position + matched.length;
          }
        }
        return accumulatedResult + stringSlice(S, nextSourcePosition);
      }
    ];
  }, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

  var internalMetadata = {exports: {}};

  // FF26- bug: ArrayBuffers are non-extensible, but Object.isExtensible does not report it
  var fails$3 = fails$H;

  var arrayBufferNonExtensible = fails$3(function () {
    if (typeof ArrayBuffer == 'function') {
      var buffer = new ArrayBuffer(8);
      // eslint-disable-next-line es-x/no-object-isextensible, es-x/no-object-defineproperty -- safe
      if (Object.isExtensible(buffer)) Object.defineProperty(buffer, 'a', { value: 8 });
    }
  });

  var fails$2 = fails$H;
  var isObject$2 = isObject$k;
  var classof = classofRaw$1;
  var ARRAY_BUFFER_NON_EXTENSIBLE = arrayBufferNonExtensible;

  // eslint-disable-next-line es-x/no-object-isextensible -- safe
  var $isExtensible = Object.isExtensible;
  var FAILS_ON_PRIMITIVES = fails$2(function () { $isExtensible(1); });

  // `Object.isExtensible` method
  // https://tc39.es/ecma262/#sec-object.isextensible
  var objectIsExtensible = (FAILS_ON_PRIMITIVES || ARRAY_BUFFER_NON_EXTENSIBLE) ? function isExtensible(it) {
    if (!isObject$2(it)) return false;
    if (ARRAY_BUFFER_NON_EXTENSIBLE && classof(it) == 'ArrayBuffer') return false;
    return $isExtensible ? $isExtensible(it) : true;
  } : $isExtensible;

  var fails$1 = fails$H;

  var freezing = !fails$1(function () {
    // eslint-disable-next-line es-x/no-object-isextensible, es-x/no-object-preventextensions -- required for testing
    return Object.isExtensible(Object.preventExtensions({}));
  });

  var $$3 = _export;
  var uncurryThis$4 = functionUncurryThis;
  var hiddenKeys = hiddenKeys$6;
  var isObject$1 = isObject$k;
  var hasOwn = hasOwnProperty_1;
  var defineProperty$2 = objectDefineProperty.f;
  var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
  var getOwnPropertyNamesExternalModule = objectGetOwnPropertyNamesExternal;
  var isExtensible = objectIsExtensible;
  var uid = uid$5;
  var FREEZING = freezing;

  var REQUIRED = false;
  var METADATA = uid('meta');
  var id = 0;

  var setMetadata = function (it) {
    defineProperty$2(it, METADATA, { value: {
      objectID: 'O' + id++, // object ID
      weakData: {}          // weak collections IDs
    } });
  };

  var fastKey$1 = function (it, create) {
    // return a primitive with prefix
    if (!isObject$1(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
    if (!hasOwn(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return 'F';
      // not necessary to add metadata
      if (!create) return 'E';
      // add missing metadata
      setMetadata(it);
    // return object ID
    } return it[METADATA].objectID;
  };

  var getWeakData = function (it, create) {
    if (!hasOwn(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return true;
      // not necessary to add metadata
      if (!create) return false;
      // add missing metadata
      setMetadata(it);
    // return the store of weak collections IDs
    } return it[METADATA].weakData;
  };

  // add metadata on freeze-family methods calling
  var onFreeze = function (it) {
    if (FREEZING && REQUIRED && isExtensible(it) && !hasOwn(it, METADATA)) setMetadata(it);
    return it;
  };

  var enable = function () {
    meta.enable = function () { /* empty */ };
    REQUIRED = true;
    var getOwnPropertyNames = getOwnPropertyNamesModule.f;
    var splice = uncurryThis$4([].splice);
    var test = {};
    test[METADATA] = 1;

    // prevent exposing of metadata key
    if (getOwnPropertyNames(test).length) {
      getOwnPropertyNamesModule.f = function (it) {
        var result = getOwnPropertyNames(it);
        for (var i = 0, length = result.length; i < length; i++) {
          if (result[i] === METADATA) {
            splice(result, i, 1);
            break;
          }
        } return result;
      };

      $$3({ target: 'Object', stat: true, forced: true }, {
        getOwnPropertyNames: getOwnPropertyNamesExternalModule.f
      });
    }
  };

  var meta = internalMetadata.exports = {
    enable: enable,
    fastKey: fastKey$1,
    getWeakData: getWeakData,
    onFreeze: onFreeze
  };

  hiddenKeys[METADATA] = true;

  var $$2 = _export;
  var global$1 = global$F;
  var uncurryThis$3 = functionUncurryThis;
  var isForced = isForced_1;
  var defineBuiltIn = defineBuiltIn$f;
  var InternalMetadataModule = internalMetadata.exports;
  var iterate$1 = iterate$5;
  var anInstance$1 = anInstance$7;
  var isCallable = isCallable$s;
  var isObject = isObject$k;
  var fails = fails$H;
  var checkCorrectnessOfIteration = checkCorrectnessOfIteration$4;
  var setToStringTag = setToStringTag$8;
  var inheritIfRequired = inheritIfRequired$3;

  var collection$1 = function (CONSTRUCTOR_NAME, wrapper, common) {
    var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
    var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
    var ADDER = IS_MAP ? 'set' : 'add';
    var NativeConstructor = global$1[CONSTRUCTOR_NAME];
    var NativePrototype = NativeConstructor && NativeConstructor.prototype;
    var Constructor = NativeConstructor;
    var exported = {};

    var fixMethod = function (KEY) {
      var uncurriedNativeMethod = uncurryThis$3(NativePrototype[KEY]);
      defineBuiltIn(NativePrototype, KEY,
        KEY == 'add' ? function add(value) {
          uncurriedNativeMethod(this, value === 0 ? 0 : value);
          return this;
        } : KEY == 'delete' ? function (key) {
          return IS_WEAK && !isObject(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
        } : KEY == 'get' ? function get(key) {
          return IS_WEAK && !isObject(key) ? undefined : uncurriedNativeMethod(this, key === 0 ? 0 : key);
        } : KEY == 'has' ? function has(key) {
          return IS_WEAK && !isObject(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
        } : function set(key, value) {
          uncurriedNativeMethod(this, key === 0 ? 0 : key, value);
          return this;
        }
      );
    };

    var REPLACE = isForced(
      CONSTRUCTOR_NAME,
      !isCallable(NativeConstructor) || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
        new NativeConstructor().entries().next();
      }))
    );

    if (REPLACE) {
      // create collection constructor
      Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
      InternalMetadataModule.enable();
    } else if (isForced(CONSTRUCTOR_NAME, true)) {
      var instance = new Constructor();
      // early implementations not supports chaining
      var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
      // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
      var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      // eslint-disable-next-line no-new -- required for testing
      var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
      // for early implementations -0 and +0 not the same
      var BUGGY_ZERO = !IS_WEAK && fails(function () {
        // V8 ~ Chromium 42- fails only with 5+ elements
        var $instance = new NativeConstructor();
        var index = 5;
        while (index--) $instance[ADDER](index, index);
        return !$instance.has(-0);
      });

      if (!ACCEPT_ITERABLES) {
        Constructor = wrapper(function (dummy, iterable) {
          anInstance$1(dummy, NativePrototype);
          var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
          if (iterable != undefined) iterate$1(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
          return that;
        });
        Constructor.prototype = NativePrototype;
        NativePrototype.constructor = Constructor;
      }

      if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
        fixMethod('delete');
        fixMethod('has');
        IS_MAP && fixMethod('get');
      }

      if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

      // weak collections should not contains .clear method
      if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
    }

    exported[CONSTRUCTOR_NAME] = Constructor;
    $$2({ global: true, constructor: true, forced: Constructor != NativeConstructor }, exported);

    setToStringTag(Constructor, CONSTRUCTOR_NAME);

    if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

    return Constructor;
  };

  var defineProperty$1 = objectDefineProperty.f;
  var create = objectCreate;
  var defineBuiltIns = defineBuiltIns$3;
  var bind = functionBindContext;
  var anInstance = anInstance$7;
  var iterate = iterate$5;
  var defineIterator = defineIterator$3;
  var setSpecies = setSpecies$4;
  var DESCRIPTORS$2 = descriptors;
  var fastKey = internalMetadata.exports.fastKey;
  var InternalStateModule = internalState;

  var setInternalState = InternalStateModule.set;
  var internalStateGetterFor = InternalStateModule.getterFor;

  var collectionStrong$1 = {
    getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
      var Constructor = wrapper(function (that, iterable) {
        anInstance(that, Prototype);
        setInternalState(that, {
          type: CONSTRUCTOR_NAME,
          index: create(null),
          first: undefined,
          last: undefined,
          size: 0
        });
        if (!DESCRIPTORS$2) that.size = 0;
        if (iterable != undefined) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
      });

      var Prototype = Constructor.prototype;

      var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

      var define = function (that, key, value) {
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        var previous, index;
        // change existing entry
        if (entry) {
          entry.value = value;
        // create new entry
        } else {
          state.last = entry = {
            index: index = fastKey(key, true),
            key: key,
            value: value,
            previous: previous = state.last,
            next: undefined,
            removed: false
          };
          if (!state.first) state.first = entry;
          if (previous) previous.next = entry;
          if (DESCRIPTORS$2) state.size++;
          else that.size++;
          // add to index
          if (index !== 'F') state.index[index] = entry;
        } return that;
      };

      var getEntry = function (that, key) {
        var state = getInternalState(that);
        // fast case
        var index = fastKey(key);
        var entry;
        if (index !== 'F') return state.index[index];
        // frozen object case
        for (entry = state.first; entry; entry = entry.next) {
          if (entry.key == key) return entry;
        }
      };

      defineBuiltIns(Prototype, {
        // `{ Map, Set }.prototype.clear()` methods
        // https://tc39.es/ecma262/#sec-map.prototype.clear
        // https://tc39.es/ecma262/#sec-set.prototype.clear
        clear: function clear() {
          var that = this;
          var state = getInternalState(that);
          var data = state.index;
          var entry = state.first;
          while (entry) {
            entry.removed = true;
            if (entry.previous) entry.previous = entry.previous.next = undefined;
            delete data[entry.index];
            entry = entry.next;
          }
          state.first = state.last = undefined;
          if (DESCRIPTORS$2) state.size = 0;
          else that.size = 0;
        },
        // `{ Map, Set }.prototype.delete(key)` methods
        // https://tc39.es/ecma262/#sec-map.prototype.delete
        // https://tc39.es/ecma262/#sec-set.prototype.delete
        'delete': function (key) {
          var that = this;
          var state = getInternalState(that);
          var entry = getEntry(that, key);
          if (entry) {
            var next = entry.next;
            var prev = entry.previous;
            delete state.index[entry.index];
            entry.removed = true;
            if (prev) prev.next = next;
            if (next) next.previous = prev;
            if (state.first == entry) state.first = next;
            if (state.last == entry) state.last = prev;
            if (DESCRIPTORS$2) state.size--;
            else that.size--;
          } return !!entry;
        },
        // `{ Map, Set }.prototype.forEach(callbackfn, thisArg = undefined)` methods
        // https://tc39.es/ecma262/#sec-map.prototype.foreach
        // https://tc39.es/ecma262/#sec-set.prototype.foreach
        forEach: function forEach(callbackfn /* , that = undefined */) {
          var state = getInternalState(this);
          var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
          var entry;
          while (entry = entry ? entry.next : state.first) {
            boundFunction(entry.value, entry.key, this);
            // revert to the last existing entry
            while (entry && entry.removed) entry = entry.previous;
          }
        },
        // `{ Map, Set}.prototype.has(key)` methods
        // https://tc39.es/ecma262/#sec-map.prototype.has
        // https://tc39.es/ecma262/#sec-set.prototype.has
        has: function has(key) {
          return !!getEntry(this, key);
        }
      });

      defineBuiltIns(Prototype, IS_MAP ? {
        // `Map.prototype.get(key)` method
        // https://tc39.es/ecma262/#sec-map.prototype.get
        get: function get(key) {
          var entry = getEntry(this, key);
          return entry && entry.value;
        },
        // `Map.prototype.set(key, value)` method
        // https://tc39.es/ecma262/#sec-map.prototype.set
        set: function set(key, value) {
          return define(this, key === 0 ? 0 : key, value);
        }
      } : {
        // `Set.prototype.add(value)` method
        // https://tc39.es/ecma262/#sec-set.prototype.add
        add: function add(value) {
          return define(this, value = value === 0 ? 0 : value, value);
        }
      });
      if (DESCRIPTORS$2) defineProperty$1(Prototype, 'size', {
        get: function () {
          return getInternalState(this).size;
        }
      });
      return Constructor;
    },
    setStrong: function (Constructor, CONSTRUCTOR_NAME, IS_MAP) {
      var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
      var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
      var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
      // `{ Map, Set }.prototype.{ keys, values, entries, @@iterator }()` methods
      // https://tc39.es/ecma262/#sec-map.prototype.entries
      // https://tc39.es/ecma262/#sec-map.prototype.keys
      // https://tc39.es/ecma262/#sec-map.prototype.values
      // https://tc39.es/ecma262/#sec-map.prototype-@@iterator
      // https://tc39.es/ecma262/#sec-set.prototype.entries
      // https://tc39.es/ecma262/#sec-set.prototype.keys
      // https://tc39.es/ecma262/#sec-set.prototype.values
      // https://tc39.es/ecma262/#sec-set.prototype-@@iterator
      defineIterator(Constructor, CONSTRUCTOR_NAME, function (iterated, kind) {
        setInternalState(this, {
          type: ITERATOR_NAME,
          target: iterated,
          state: getInternalCollectionState(iterated),
          kind: kind,
          last: undefined
        });
      }, function () {
        var state = getInternalIteratorState(this);
        var kind = state.kind;
        var entry = state.last;
        // revert to the last existing entry
        while (entry && entry.removed) entry = entry.previous;
        // get next entry
        if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
          // or finish the iteration
          state.target = undefined;
          return { value: undefined, done: true };
        }
        // return step by kind
        if (kind == 'keys') return { value: entry.key, done: false };
        if (kind == 'values') return { value: entry.value, done: false };
        return { value: [entry.key, entry.value], done: false };
      }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

      // `{ Map, Set }.prototype[@@species]` accessors
      // https://tc39.es/ecma262/#sec-get-map-@@species
      // https://tc39.es/ecma262/#sec-get-set-@@species
      setSpecies(CONSTRUCTOR_NAME);
    }
  };

  var collection = collection$1;
  var collectionStrong = collectionStrong$1;

  // `Map` constructor
  // https://tc39.es/ecma262/#sec-map-objects
  collection('Map', function (init) {
    return function Map() { return init(this, arguments.length ? arguments[0] : undefined); };
  }, collectionStrong);

  var DESCRIPTORS$1 = descriptors;
  var uncurryThis$2 = functionUncurryThis;
  var objectKeys = objectKeys$4;
  var toIndexedObject = toIndexedObject$b;
  var $propertyIsEnumerable = objectPropertyIsEnumerable.f;

  var propertyIsEnumerable = uncurryThis$2($propertyIsEnumerable);
  var push = uncurryThis$2([].push);

  // `Object.{ entries, values }` methods implementation
  var createMethod = function (TO_ENTRIES) {
    return function (it) {
      var O = toIndexedObject(it);
      var keys = objectKeys(O);
      var length = keys.length;
      var i = 0;
      var result = [];
      var key;
      while (length > i) {
        key = keys[i++];
        if (!DESCRIPTORS$1 || propertyIsEnumerable(O, key)) {
          push(result, TO_ENTRIES ? [key, O[key]] : O[key]);
        }
      }
      return result;
    };
  };

  var objectToArray = {
    // `Object.entries` method
    // https://tc39.es/ecma262/#sec-object.entries
    entries: createMethod(true),
    // `Object.values` method
    // https://tc39.es/ecma262/#sec-object.values
    values: createMethod(false)
  };

  var $$1 = _export;
  var $entries = objectToArray.entries;

  // `Object.entries` method
  // https://tc39.es/ecma262/#sec-object.entries
  $$1({ target: 'Object', stat: true }, {
    entries: function entries(O) {
      return $entries(O);
    }
  });

  var sendFetchRequest = _async(function (method, _ref2, headers) {
    var options = _ref2.options,
        url = _ref2.url;
    return _await(fetch(url, Object.assign({}, options, {
      method: method,
      headers: headers
    })), function (response) {
      if (response.status < 400) {
        return response;
      } else {
        throw new Error(ERR_HTTP_STATUS + (response.statusText || response.status));
      }
    });
  });

  var getContentLength = _async(function (httpReader, sendRequest, getRequestData) {
    return _invokeIgnored(function () {
      if (httpReader.preventHeadRequest) {
        return _awaitIgnored(getRequestData(httpReader, httpReader.options));
      } else {
        return _await(sendRequest(HTTP_METHOD_HEAD, httpReader, getHeaders(httpReader)), function (response) {
          var contentLength = response.headers.get(HTTP_HEADER_CONTENT_LENGTH);
          return _invokeIgnored(function () {
            if (contentLength) {
              httpReader.size = Number(contentLength);
            } else {
              return _awaitIgnored(getRequestData(httpReader, httpReader.options));
            }
          });
        });
      }
    });
  });

  var getRequestData = _async(function (httpReader, sendRequest) {
    return _await(sendRequest(HTTP_METHOD_GET, httpReader, getHeaders(httpReader)), function (response) {
      return _await(response.arrayBuffer(), function (_response$arrayBuffer2) {
        httpReader.data = new Uint8Array(_response$arrayBuffer2);

        if (!httpReader.size) {
          httpReader.size = httpReader.data.length;
        }
      });
    });
  });

  var getXMLHttpRequestData = _async(function (httpReader) {
    return _awaitIgnored(getRequestData(httpReader, sendXMLHttpRequest));
  });

  var getFetchRequestData = _async(function (httpReader) {
    return _awaitIgnored(getRequestData(httpReader, sendFetchRequest));
  });

  var readUint8ArrayHttpReader = _async(function (httpReader, index, length, sendRequest, getRequestData) {
    if (httpReader.useRangeHeader || httpReader.forceRangeRequests) {
      return _await(sendRequest(HTTP_METHOD_GET, httpReader, getRangeHeaders(httpReader, index, length)), function (response) {
        if (response.status != 206) {
          throw new Error(ERR_HTTP_RANGE);
        }

        return _await(response.arrayBuffer(), function (_response$arrayBuffer) {
          return new Uint8Array(_response$arrayBuffer);
        });
      });
    } else {
      return _invoke(function () {
        if (!httpReader.data) {
          return _awaitIgnored(getRequestData(httpReader, httpReader.options));
        }
      }, function () {
        return new Uint8Array(httpReader.data.subarray(index, index + length));
      });
    }
  });

  var initHttpReader = _async(function (httpReader, sendRequest, getRequestData) {
    return function () {
      if (isHttpFamily(httpReader.url) && (httpReader.useRangeHeader || httpReader.forceRangeRequests)) {
        return _await(sendRequest(HTTP_METHOD_GET, httpReader, getRangeHeaders(httpReader)), function (response) {
          return function () {
            if (!httpReader.forceRangeRequests && response.headers.get(HTTP_HEADER_ACCEPT_RANGES) != HTTP_RANGE_UNIT) {
              throw new Error(ERR_HTTP_RANGE);
            } else {
              var contentSize;
              var contentRangeHeader = response.headers.get(HTTP_HEADER_CONTENT_RANGE);

              if (contentRangeHeader) {
                var splitHeader = contentRangeHeader.trim().split(/\s*\/\s*/);

                if (splitHeader.length) {
                  var headerValue = splitHeader[1];

                  if (headerValue && headerValue != "*") {
                    contentSize = Number(headerValue);
                  }
                }
              }

              return _invokeIgnored(function () {
                if (contentSize === undefined) {
                  return _awaitIgnored(getContentLength(httpReader, sendRequest, getRequestData));
                } else {
                  httpReader.size = contentSize;
                }
              });
            }
          }();
        });
      } else {
        return _awaitIgnored(getContentLength(httpReader, sendRequest, getRequestData));
      }
    }();
  });

  /*
   Copyright (c) 2022 Gildas Lormeau. All rights reserved.

   Redistribution and use in source and binary forms, with or without
   modification, are permitted provided that the following conditions are met:

   1. Redistributions of source code must retain the above copyright notice,
   this list of conditions and the following disclaimer.

   2. Redistributions in binary form must reproduce the above copyright 
   notice, this list of conditions and the following disclaimer in 
   the documentation and/or other materials provided with the distribution.

   3. The names of the authors may not be used to endorse or promote products
   derived from this software without specific prior written permission.

   THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
   INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
   FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
   INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
   INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
   LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
   OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
   EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   */

  /* global Blob, FileReader, atob, btoa, XMLHttpRequest, document, fetch */
  var ERR_HTTP_STATUS = "HTTP error ";
  var ERR_HTTP_RANGE = "HTTP Range not supported";
  var CONTENT_TYPE_TEXT_PLAIN = "text/plain";
  var HTTP_HEADER_CONTENT_LENGTH = "Content-Length";
  var HTTP_HEADER_CONTENT_RANGE = "Content-Range";
  var HTTP_HEADER_ACCEPT_RANGES = "Accept-Ranges";
  var HTTP_HEADER_RANGE = "Range";
  var HTTP_METHOD_HEAD = "HEAD";
  var HTTP_METHOD_GET = "GET";
  var HTTP_RANGE_UNIT = "bytes";

  var Stream = /*#__PURE__*/function () {
    function Stream() {
      _classCallCheck(this, Stream);

      this.size = 0;
    }

    _createClass(Stream, [{
      key: "init",
      value: function init() {
        this.initialized = true;
      }
    }]);

    return Stream;
  }();

  var Reader = /*#__PURE__*/function (_Stream) {
    _inherits(Reader, _Stream);

    var _super = _createSuper(Reader);

    function Reader() {
      _classCallCheck(this, Reader);

      return _super.apply(this, arguments);
    }

    return _createClass(Reader);
  }(Stream);

  var Writer = /*#__PURE__*/function (_Stream2) {
    _inherits(Writer, _Stream2);

    var _super2 = _createSuper(Writer);

    function Writer() {
      _classCallCheck(this, Writer);

      return _super2.apply(this, arguments);
    }

    _createClass(Writer, [{
      key: "writeUint8Array",
      value: function writeUint8Array(array) {
        this.size += array.length;
      }
    }]);

    return Writer;
  }(Stream);

  var TextReader = /*#__PURE__*/function (_Reader) {
    _inherits(TextReader, _Reader);

    var _super3 = _createSuper(TextReader);

    function TextReader(text) {
      var _this;

      _classCallCheck(this, TextReader);

      _this = _super3.call(this);
      _this.blobReader = new BlobReader(new Blob([text], {
        type: CONTENT_TYPE_TEXT_PLAIN
      }));
      return _this;
    }

    _createClass(TextReader, [{
      key: "init",
      value: function init() {
        try {
          var _this3 = this;

          _get(_getPrototypeOf(TextReader.prototype), "init", _this3).call(_this3);

          _this3.blobReader.init();

          _this3.size = _this3.blobReader.size;
          return _await();
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }, {
      key: "readUint8Array",
      value: function readUint8Array(offset, length) {
        try {
          var _this5 = this;

          return _await(_this5.blobReader.readUint8Array(offset, length));
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }]);

    return TextReader;
  }(Reader);

  var TextWriter = /*#__PURE__*/function (_Writer) {
    _inherits(TextWriter, _Writer);

    var _super4 = _createSuper(TextWriter);

    function TextWriter(encoding) {
      var _this6;

      _classCallCheck(this, TextWriter);

      _this6 = _super4.call(this);
      _this6.encoding = encoding;
      _this6.blob = new Blob([], {
        type: CONTENT_TYPE_TEXT_PLAIN
      });
      return _this6;
    }

    _createClass(TextWriter, [{
      key: "writeUint8Array",
      value: function writeUint8Array(array) {
        try {
          var _this8 = this;

          _get(_getPrototypeOf(TextWriter.prototype), "writeUint8Array", _this8).call(_this8, array);

          _this8.blob = new Blob([_this8.blob, array.buffer], {
            type: CONTENT_TYPE_TEXT_PLAIN
          });
          return _await();
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }, {
      key: "getData",
      value: function getData() {
        var _this9 = this;

        if (this.blob.text) {
          return this.blob.text();
        } else {
          var reader = new FileReader();
          return new Promise(function (resolve, reject) {
            reader.onload = function (event) {
              return resolve(event.target.result);
            };

            reader.onerror = function () {
              return reject(reader.error);
            };

            reader.readAsText(_this9.blob, _this9.encoding);
          });
        }
      }
    }]);

    return TextWriter;
  }(Writer);

  var Data64URIReader = /*#__PURE__*/function (_Reader2) {
    _inherits(Data64URIReader, _Reader2);

    var _super5 = _createSuper(Data64URIReader);

    function Data64URIReader(dataURI) {
      var _this10;

      _classCallCheck(this, Data64URIReader);

      _this10 = _super5.call(this);
      _this10.dataURI = dataURI;
      var dataEnd = dataURI.length;

      while (dataURI.charAt(dataEnd - 1) == "=") {
        dataEnd--;
      }

      _this10.dataStart = dataURI.indexOf(",") + 1;
      _this10.size = Math.floor((dataEnd - _this10.dataStart) * 0.75);
      return _this10;
    }

    _createClass(Data64URIReader, [{
      key: "readUint8Array",
      value: function readUint8Array(offset, length) {
        try {
          var _this12 = this;

          var dataArray = new Uint8Array(length);
          var start = Math.floor(offset / 3) * 4;
          var bytes = atob(_this12.dataURI.substring(start + _this12.dataStart, Math.ceil((offset + length) / 3) * 4 + _this12.dataStart));
          var delta = offset - Math.floor(start / 4) * 3;

          for (var indexByte = delta; indexByte < delta + length; indexByte++) {
            dataArray[indexByte - delta] = bytes.charCodeAt(indexByte);
          }

          return _await(dataArray);
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }]);

    return Data64URIReader;
  }(Reader);

  var Data64URIWriter = /*#__PURE__*/function (_Writer2) {
    _inherits(Data64URIWriter, _Writer2);

    var _super6 = _createSuper(Data64URIWriter);

    function Data64URIWriter(contentType) {
      var _this13;

      _classCallCheck(this, Data64URIWriter);

      _this13 = _super6.call(this);
      _this13.data = "data:" + (contentType || "") + ";base64,";
      _this13.pending = [];
      return _this13;
    }

    _createClass(Data64URIWriter, [{
      key: "writeUint8Array",
      value: function writeUint8Array(array) {
        try {
          var _this15 = this;

          _get(_getPrototypeOf(Data64URIWriter.prototype), "writeUint8Array", _this15).call(_this15, array);

          var indexArray = 0;
          var dataString = _this15.pending;
          var delta = _this15.pending.length;
          _this15.pending = "";

          for (indexArray = 0; indexArray < Math.floor((delta + array.length) / 3) * 3 - delta; indexArray++) {
            dataString += String.fromCharCode(array[indexArray]);
          }

          for (; indexArray < array.length; indexArray++) {
            _this15.pending += String.fromCharCode(array[indexArray]);
          }

          if (dataString.length > 2) {
            _this15.data += btoa(dataString);
          } else {
            _this15.pending = dataString;
          }

          return _await();
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }, {
      key: "getData",
      value: function getData() {
        return this.data + btoa(this.pending);
      }
    }]);

    return Data64URIWriter;
  }(Writer);

  var BlobReader = /*#__PURE__*/function (_Reader3) {
    _inherits(BlobReader, _Reader3);

    var _super7 = _createSuper(BlobReader);

    function BlobReader(blob) {
      var _this16;

      _classCallCheck(this, BlobReader);

      _this16 = _super7.call(this);
      _this16.blob = blob;
      _this16.size = blob.size;
      return _this16;
    }

    _createClass(BlobReader, [{
      key: "readUint8Array",
      value: function readUint8Array(offset, length) {
        try {
          var _this18 = this;

          if (_this18.blob.arrayBuffer) {
            return _await(_this18.blob.slice(offset, offset + length).arrayBuffer(), function (_this17$blob$slice$ar) {
              return new Uint8Array(_this17$blob$slice$ar);
            });
          } else {
            var reader = new FileReader();
            return _await(new Promise(function (resolve, reject) {
              reader.onload = function (event) {
                return resolve(new Uint8Array(event.target.result));
              };

              reader.onerror = function () {
                return reject(reader.error);
              };

              reader.readAsArrayBuffer(_this18.blob.slice(offset, offset + length));
            }));
          }
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }]);

    return BlobReader;
  }(Reader);

  var BlobWriter = /*#__PURE__*/function (_Writer3) {
    _inherits(BlobWriter, _Writer3);

    var _super8 = _createSuper(BlobWriter);

    function BlobWriter(contentType) {
      var _this19;

      _classCallCheck(this, BlobWriter);

      _this19 = _super8.call(this);
      _this19.contentType = contentType;
      _this19.arrayBuffersMaxlength = 8;
      initArrayBuffers(_assertThisInitialized(_this19));
      return _this19;
    }

    _createClass(BlobWriter, [{
      key: "writeUint8Array",
      value: function writeUint8Array(array) {
        try {
          var _this21 = this;

          _get(_getPrototypeOf(BlobWriter.prototype), "writeUint8Array", _this21).call(_this21, array);

          if (_this21.arrayBuffers.length == _this21.arrayBuffersMaxlength) {
            flushArrayBuffers(_this21);
          }

          _this21.arrayBuffers.push(array.buffer);

          return _await();
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }, {
      key: "getData",
      value: function getData() {
        if (!this.blob) {
          if (this.arrayBuffers.length) {
            flushArrayBuffers(this);
          }

          this.blob = this.pendingBlob;
          initArrayBuffers(this);
        }

        return this.blob;
      }
    }]);

    return BlobWriter;
  }(Writer);

  function initArrayBuffers(blobWriter) {
    blobWriter.pendingBlob = new Blob([], {
      type: blobWriter.contentType
    });
    blobWriter.arrayBuffers = [];
  }

  function flushArrayBuffers(blobWriter) {
    blobWriter.pendingBlob = new Blob([blobWriter.pendingBlob].concat(_toConsumableArray(blobWriter.arrayBuffers)), {
      type: blobWriter.contentType
    });
    blobWriter.arrayBuffers = [];
  }

  var WritableStreamWriter = /*#__PURE__*/function (_Writer4) {
    _inherits(WritableStreamWriter, _Writer4);

    var _super9 = _createSuper(WritableStreamWriter);

    function WritableStreamWriter(writableStream) {
      var _this22;

      _classCallCheck(this, WritableStreamWriter);

      _this22 = _super9.call(this);
      _this22.writableStream = writableStream;
      _this22.writer = writableStream.getWriter();
      return _this22;
    }

    _createClass(WritableStreamWriter, [{
      key: "writeUint8Array",
      value: function writeUint8Array(array) {
        try {
          var _this24 = this;

          return _await(_this24.writer.ready, function () {
            return _this24.writer.write(array);
          });
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }, {
      key: "getData",
      value: function getData() {
        try {
          var _this26 = this;

          return _await(_this26.writer.ready, function () {
            return _await(_this26.writer.close(), function () {
              return _this26.writableStream;
            });
          });
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }]);

    return WritableStreamWriter;
  }(Writer);

  var FetchReader = /*#__PURE__*/function (_Reader4) {
    _inherits(FetchReader, _Reader4);

    var _super10 = _createSuper(FetchReader);

    function FetchReader(url, options) {
      var _this27;

      _classCallCheck(this, FetchReader);

      _this27 = _super10.call(this);
      _this27.url = url;
      _this27.preventHeadRequest = options.preventHeadRequest;
      _this27.useRangeHeader = options.useRangeHeader;
      _this27.forceRangeRequests = options.forceRangeRequests;
      _this27.options = Object.assign({}, options);
      delete _this27.options.preventHeadRequest;
      delete _this27.options.useRangeHeader;
      delete _this27.options.forceRangeRequests;
      delete _this27.options.useXHR;
      return _this27;
    }

    _createClass(FetchReader, [{
      key: "init",
      value: function init() {
        try {
          var _this29 = this;

          _get(_getPrototypeOf(FetchReader.prototype), "init", _this29).call(_this29);

          return _await(_awaitIgnored(initHttpReader(_this29, sendFetchRequest, getFetchRequestData)));
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }, {
      key: "readUint8Array",
      value: function readUint8Array(index, length) {
        var _this30 = this;

        return readUint8ArrayHttpReader(_this30, index, length, sendFetchRequest, getFetchRequestData);
      }
    }]);

    return FetchReader;
  }(Reader);

  var XHRReader = /*#__PURE__*/function (_Reader5) {
    _inherits(XHRReader, _Reader5);

    var _super11 = _createSuper(XHRReader);

    function XHRReader(url, options) {
      var _this31;

      _classCallCheck(this, XHRReader);

      _this31 = _super11.call(this);
      _this31.url = url;
      _this31.preventHeadRequest = options.preventHeadRequest;
      _this31.useRangeHeader = options.useRangeHeader;
      _this31.forceRangeRequests = options.forceRangeRequests;
      _this31.options = options;
      return _this31;
    }

    _createClass(XHRReader, [{
      key: "init",
      value: function init() {
        try {
          var _this33 = this;

          _get(_getPrototypeOf(XHRReader.prototype), "init", _this33).call(_this33);

          return _await(_awaitIgnored(initHttpReader(_this33, sendXMLHttpRequest, getXMLHttpRequestData)));
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }, {
      key: "readUint8Array",
      value: function readUint8Array(index, length) {
        var _this34 = this;

        return readUint8ArrayHttpReader(_this34, index, length, sendXMLHttpRequest, getXMLHttpRequestData);
      }
    }]);

    return XHRReader;
  }(Reader);

  function getRangeHeaders(httpReader) {
    var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var length = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    return Object.assign({}, getHeaders(httpReader), _defineProperty({}, HTTP_HEADER_RANGE, HTTP_RANGE_UNIT + "=" + index + "-" + (index + length - 1)));
  }

  function getHeaders(httpReader) {
    var headers = httpReader.options.headers;

    if (headers) {
      if (Symbol.iterator in headers) {
        return Object.fromEntries(headers);
      } else {
        return headers;
      }
    }
  }

  function sendXMLHttpRequest(method, _ref, headers) {
    var url = _ref.url;
    return new Promise(function (resolve, reject) {
      var request = new XMLHttpRequest();
      request.addEventListener("load", function () {
        if (request.status < 400) {
          var _headers = [];
          request.getAllResponseHeaders().trim().split(/[\r\n]+/).forEach(function (header) {
            var splitHeader = header.trim().split(/\s*:\s*/);
            splitHeader[0] = splitHeader[0].trim().replace(/^[a-z]|-[a-z]/g, function (value) {
              return value.toUpperCase();
            });

            _headers.push(splitHeader);
          });
          resolve({
            status: request.status,
            arrayBuffer: function arrayBuffer() {
              return request.response;
            },
            headers: new Map(_headers)
          });
        } else {
          reject(new Error(ERR_HTTP_STATUS + (request.statusText || request.status)));
        }
      }, false);
      request.addEventListener("error", function (event) {
        return reject(event.detail.error);
      }, false);
      request.open(method, url);

      if (headers) {
        for (var _i = 0, _Object$entries = Object.entries(headers); _i < _Object$entries.length; _i++) {
          var entry = _Object$entries[_i];
          request.setRequestHeader(entry[0], entry[1]);
        }
      }

      request.responseType = "arraybuffer";
      request.send();
    });
  }

  var HttpReader = /*#__PURE__*/function (_Reader6) {
    _inherits(HttpReader, _Reader6);

    var _super12 = _createSuper(HttpReader);

    function HttpReader(url) {
      var _this35;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, HttpReader);

      _this35 = _super12.call(this);
      _this35.url = url;

      if (options.useXHR) {
        _this35.reader = new XHRReader(url, options);
      } else {
        _this35.reader = new FetchReader(url, options);
      }

      return _this35;
    }

    _createClass(HttpReader, [{
      key: "size",
      get: function get() {
        return this.reader.size;
      },
      set: function set(value) {// ignored
      }
    }, {
      key: "init",
      value: function init() {
        try {
          var _this37 = this;

          _get(_getPrototypeOf(HttpReader.prototype), "init", _this37).call(_this37);

          return _await(_awaitIgnored(_this37.reader.init()));
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }, {
      key: "readUint8Array",
      value: function readUint8Array(index, length) {
        try {
          var _this39 = this;

          return _await(_this39.reader.readUint8Array(index, length));
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }]);

    return HttpReader;
  }(Reader);

  var HttpRangeReader = /*#__PURE__*/function (_HttpReader) {
    _inherits(HttpRangeReader, _HttpReader);

    var _super13 = _createSuper(HttpRangeReader);

    function HttpRangeReader(url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, HttpRangeReader);

      options.useRangeHeader = true;
      return _super13.call(this, url, options);
    }

    return _createClass(HttpRangeReader);
  }(HttpReader);

  var Uint8ArrayReader = /*#__PURE__*/function (_Reader7) {
    _inherits(Uint8ArrayReader, _Reader7);

    var _super14 = _createSuper(Uint8ArrayReader);

    function Uint8ArrayReader(array) {
      var _this40;

      _classCallCheck(this, Uint8ArrayReader);

      _this40 = _super14.call(this);
      _this40.array = array;
      _this40.size = array.length;
      return _this40;
    }

    _createClass(Uint8ArrayReader, [{
      key: "readUint8Array",
      value: function readUint8Array(index, length) {
        try {
          var _this42 = this;

          return _await(_this42.array.slice(index, index + length));
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }]);

    return Uint8ArrayReader;
  }(Reader);

  var Uint8ArrayWriter = /*#__PURE__*/function (_Writer5) {
    _inherits(Uint8ArrayWriter, _Writer5);

    var _super15 = _createSuper(Uint8ArrayWriter);

    function Uint8ArrayWriter() {
      var _this43;

      _classCallCheck(this, Uint8ArrayWriter);

      _this43 = _super15.call(this);
      _this43.array = new Uint8Array(0);
      return _this43;
    }

    _createClass(Uint8ArrayWriter, [{
      key: "writeUint8Array",
      value: function writeUint8Array(array) {
        try {
          var _this45 = this;

          _get(_getPrototypeOf(Uint8ArrayWriter.prototype), "writeUint8Array", _this45).call(_this45, array);

          var previousArray = _this45.array;
          _this45.array = new Uint8Array(previousArray.length + array.length);

          _this45.array.set(previousArray);

          _this45.array.set(array, previousArray.length);

          return _await();
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }, {
      key: "getData",
      value: function getData() {
        return this.array;
      }
    }]);

    return Uint8ArrayWriter;
  }(Writer);

  function isHttpFamily(url) {
    if (typeof document != "undefined") {
      var anchor = document.createElement("a");
      anchor.href = url;
      return anchor.protocol == "http:" || anchor.protocol == "https:";
    } else {
      return /^https?:\/\//i.test(url);
    }
  }

  var $ = _export;
  var uncurryThis$1 = functionUncurryThis;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  var toLength = toLength$a;
  var toString = toString$a;
  var notARegExp = notARegexp;
  var requireObjectCoercible = requireObjectCoercible$8;
  var correctIsRegExpLogic = correctIsRegexpLogic;

  // eslint-disable-next-line es-x/no-string-prototype-endswith -- safe
  var un$EndsWith = uncurryThis$1(''.endsWith);
  var slice = uncurryThis$1(''.slice);
  var min = Math.min;

  var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('endsWith');
  // https://github.com/zloirock/core-js/pull/702
  var MDN_POLYFILL_BUG = !CORRECT_IS_REGEXP_LOGIC && !!function () {
    var descriptor = getOwnPropertyDescriptor(String.prototype, 'endsWith');
    return descriptor && !descriptor.writable;
  }();

  // `String.prototype.endsWith` method
  // https://tc39.es/ecma262/#sec-string.prototype.endswith
  $({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
    endsWith: function endsWith(searchString /* , endPosition = @length */) {
      var that = toString(requireObjectCoercible(this));
      notARegExp(searchString);
      var endPosition = arguments.length > 1 ? arguments[1] : undefined;
      var len = that.length;
      var end = endPosition === undefined ? len : min(toLength(endPosition), len);
      var search = toString(searchString);
      return un$EndsWith
        ? un$EndsWith(that, search, end)
        : slice(that, end - search.length, end) === search;
    }
  });

  /*
   Copyright (c) 2022 Gildas Lormeau. All rights reserved.

   Redistribution and use in source and binary forms, with or without
   modification, are permitted provided that the following conditions are met:

   1. Redistributions of source code must retain the above copyright notice,
   this list of conditions and the following disclaimer.

   2. Redistributions in binary form must reproduce the above copyright 
   notice, this list of conditions and the following disclaimer in 
   the documentation and/or other materials provided with the distribution.

   3. The names of the authors may not be used to endorse or promote products
   derived from this software without specific prior written permission.

   THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
   INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
   FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
   INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
   INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
   LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
   OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
   EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   */
  var MAX_32_BITS = 0xffffffff;
  var MAX_16_BITS = 0xffff;
  var COMPRESSION_METHOD_DEFLATE = 0x08;
  var COMPRESSION_METHOD_STORE = 0x00;
  var COMPRESSION_METHOD_AES = 0x63;
  var LOCAL_FILE_HEADER_SIGNATURE = 0x04034b50;
  var DATA_DESCRIPTOR_RECORD_SIGNATURE = 0x08074b50;
  var CENTRAL_FILE_HEADER_SIGNATURE = 0x02014b50;
  var END_OF_CENTRAL_DIR_SIGNATURE = 0x06054b50;
  var ZIP64_END_OF_CENTRAL_DIR_SIGNATURE = 0x06064b50;
  var ZIP64_END_OF_CENTRAL_DIR_LOCATOR_SIGNATURE = 0x07064b50;
  var END_OF_CENTRAL_DIR_LENGTH = 22;
  var ZIP64_END_OF_CENTRAL_DIR_LOCATOR_LENGTH = 20;
  var ZIP64_END_OF_CENTRAL_DIR_LENGTH = 56;
  var ZIP64_END_OF_CENTRAL_DIR_TOTAL_LENGTH = END_OF_CENTRAL_DIR_LENGTH + ZIP64_END_OF_CENTRAL_DIR_LOCATOR_LENGTH + ZIP64_END_OF_CENTRAL_DIR_LENGTH;
  var ZIP64_TOTAL_NUMBER_OF_DISKS = 1;
  var EXTRAFIELD_TYPE_ZIP64 = 0x0001;
  var EXTRAFIELD_TYPE_AES = 0x9901;
  var EXTRAFIELD_TYPE_NTFS = 0x000a;
  var EXTRAFIELD_TYPE_NTFS_TAG1 = 0x0001;
  var EXTRAFIELD_TYPE_EXTENDED_TIMESTAMP = 0x5455;
  var EXTRAFIELD_TYPE_UNICODE_PATH = 0x7075;
  var EXTRAFIELD_TYPE_UNICODE_COMMENT = 0x6375;
  var BITFLAG_ENCRYPTED = 0x01;
  var BITFLAG_LEVEL = 0x06;
  var BITFLAG_DATA_DESCRIPTOR = 0x0008;
  var BITFLAG_LANG_ENCODING_FLAG = 0x0800;
  var FILE_ATTR_MSDOS_DIR_MASK = 0x10;
  var VERSION_DEFLATE = 0x14;
  var VERSION_ZIP64 = 0x2D;
  var VERSION_AES = 0x33;
  var DIRECTORY_SIGNATURE = "/";
  var MAX_DATE = new Date(2107, 11, 31);
  var MIN_DATE = new Date(1980, 0, 1);

  /*
   Copyright (c) 2022 Gildas Lormeau. All rights reserved.

   Redistribution and use in source and binary forms, with or without
   modification, are permitted provided that the following conditions are met:

   1. Redistributions of source code must retain the above copyright notice,
   this list of conditions and the following disclaimer.

   2. Redistributions in binary form must reproduce the above copyright 
   notice, this list of conditions and the following disclaimer in 
   the documentation and/or other materials provided with the distribution.

   3. The names of the authors may not be used to endorse or promote products
   derived from this software without specific prior written permission.

   THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
   INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
   FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
   INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
   INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
   LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
   OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
   EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   */
  var CP437 = "\0☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼ !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~⌂ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ".split("");
  var decodeCP437 = (function (stringValue) {
    var result = "";

    for (var indexCharacter = 0; indexCharacter < stringValue.length; indexCharacter++) {
      result += CP437[stringValue[indexCharacter]];
    }

    return result;
  });

  var decodeText = _async(function (value, encoding) {
    if (encoding && encoding.trim().toLowerCase() == "cp437") {
      return decodeCP437(value);
    } else if (typeof TextDecoder == "undefined") {
      var fileReader = new FileReader();
      return new Promise(function (resolve, reject) {
        fileReader.onload = function (event) {
          return resolve(event.target.result);
        };

        fileReader.onerror = function () {
          return reject(fileReader.error);
        };

        fileReader.readAsText(new Blob([value]));
      });
    } else {
      return new TextDecoder(encoding).decode(value);
    }
  });

  var writeData = _async(function (writer, data) {
    return _invoke(function () {
      if (data.length) {
        return _awaitIgnored(writer.writeUint8Array(data));
      }
    }, function () {
      return data.length;
    });
  });

  var processData = _async(function (codec, reader, writer, offset, inputLength, config, options) {
    var processChunk = _async(function () {
      var chunkOffset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var outputLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var signal = options.signal;

      if (chunkOffset < inputLength) {
        testAborted(signal, codec);
        return _await(reader.readUint8Array(chunkOffset + offset, Math.min(chunkSize, inputLength - chunkOffset)), function (inputData) {
          var chunkLength = inputData.length;
          testAborted(signal, codec);
          return _await(codec.append(inputData), function (data) {
            testAborted(signal, codec);
            return _await(writeData(writer, data), function (_writeData) {
              outputLength += _writeData;

              if (options.onprogress) {
                try {
                  options.onprogress(chunkOffset + chunkLength, inputLength);
                } catch (error) {// ignored
                }
              }

              return processChunk(chunkOffset + chunkSize, outputLength);
            });
          });
        });
      } else {
        return _await(codec.flush(), function (result) {
          return _await(writeData(writer, result.data), function (_writeData2) {
            outputLength += _writeData2;
            return {
              signature: result.signature,
              length: outputLength
            };
          });
        });
      }
    });

    var chunkSize = Math.max(config.chunkSize, MINIMUM_CHUNK_SIZE);
    return processChunk();
  });

  /*
   Copyright (c) 2022 Gildas Lormeau. All rights reserved.

   Redistribution and use in source and binary forms, with or without
   modification, are permitted provided that the following conditions are met:

   1. Redistributions of source code must retain the above copyright notice,
   this list of conditions and the following disclaimer.

   2. Redistributions in binary form must reproduce the above copyright 
   notice, this list of conditions and the following disclaimer in 
   the documentation and/or other materials provided with the distribution.

   3. The names of the authors may not be used to endorse or promote products
   derived from this software without specific prior written permission.

   THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
   INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
   FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
   INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
   INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
   LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
   OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
   EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   */
  var MINIMUM_CHUNK_SIZE = 64;
  var ERR_ABORT = "Abort error";

  function testAborted(signal, codec) {
    if (signal && signal.aborted) {
      codec.abort();
      throw new Error(ERR_ABORT);
    }
  }

  /*
   Copyright (c) 2022 Gildas Lormeau. All rights reserved.

   Redistribution and use in source and binary forms, with or without
   modification, are permitted provided that the following conditions are met:

   1. Redistributions of source code must retain the above copyright notice,
   this list of conditions and the following disclaimer.

   2. Redistributions in binary form must reproduce the above copyright 
   notice, this list of conditions and the following disclaimer in 
   the documentation and/or other materials provided with the distribution.

   3. The names of the authors may not be used to endorse or promote products
   derived from this software without specific prior written permission.

   THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
   INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
   FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
   INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
   INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
   LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
   OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
   EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   */
  var PROPERTY_NAMES = ["filename", "rawFilename", "directory", "encrypted", "compressedSize", "uncompressedSize", "lastModDate", "rawLastModDate", "comment", "rawComment", "signature", "extraField", "rawExtraField", "bitFlag", "extraFieldZip64", "extraFieldUnicodePath", "extraFieldUnicodeComment", "extraFieldAES", "filenameUTF8", "commentUTF8", "offset", "zip64", "compressionMethod", "extraFieldNTFS", "lastAccessDate", "creationDate", "extraFieldExtendedTimestamp", "version", "versionMadeBy", "msDosCompatible", "internalFileAttribute", "externalFileAttribute"];

  var Entry = /*#__PURE__*/_createClass(function Entry(data) {
    var _this = this;

    _classCallCheck(this, Entry);

    PROPERTY_NAMES.forEach(function (name) {
      return _this[name] = data[name];
    });
  });

  var seekSignature = _async(function (reader, signature, startOffset, minimumBytes, maximumLength) {
    var seek = _async(function (length) {
      var offset = startOffset - length;
      return _await(readUint8Array(reader, offset, length), function (bytes) {
        for (var indexByte = bytes.length - minimumBytes; indexByte >= 0; indexByte--) {
          if (bytes[indexByte] == signatureArray[0] && bytes[indexByte + 1] == signatureArray[1] && bytes[indexByte + 2] == signatureArray[2] && bytes[indexByte + 3] == signatureArray[3]) {
            return {
              offset: offset + indexByte,
              buffer: bytes.slice(indexByte, indexByte + minimumBytes).buffer
            };
          }
        }
      });
    });

    var signatureArray = new Uint8Array(4);
    var signatureView = getDataView$1(signatureArray);
    setUint32$1(signatureView, 0, signature);
    var maximumBytes = minimumBytes + maximumLength;
    return _await(seek(minimumBytes), function (_seek) {
      return _await(_seek || seek(Math.min(maximumBytes, startOffset)), void 0, _seek);
    });
  });

  var readExtraFieldUnicode = _async(function (extraFieldUnicode, propertyName, rawPropertyName, directory, fileEntry) {
    var extraFieldView = getDataView$1(extraFieldUnicode.data);
    extraFieldUnicode.version = getUint8(extraFieldView, 0);
    extraFieldUnicode.signature = getUint32(extraFieldView, 1);
    var crc32 = new Crc32();
    crc32.append(fileEntry[rawPropertyName]);
    var dataViewSignature = getDataView$1(new Uint8Array(4));
    dataViewSignature.setUint32(0, crc32.get(), true);
    return _await(decodeText(extraFieldUnicode.data.subarray(5)), function (_decodeText) {
      extraFieldUnicode[propertyName] = _decodeText;
      extraFieldUnicode.valid = !fileEntry.bitFlag.languageEncodingFlag && extraFieldUnicode.signature == getUint32(dataViewSignature, 0);

      if (extraFieldUnicode.valid) {
        directory[propertyName] = extraFieldUnicode[propertyName];
        directory[propertyName + "UTF8"] = true;
      }
    });
  });

  var readCommonFooter = _async(function (fileEntry, directory, dataView, offset) {
    var rawExtraField = directory.rawExtraField;
    var extraField = directory.extraField = new Map();
    var rawExtraFieldView = getDataView$1(new Uint8Array(rawExtraField));
    var offsetExtraField = 0;

    try {
      while (offsetExtraField < rawExtraField.length) {
        var type = getUint16(rawExtraFieldView, offsetExtraField);
        var size = getUint16(rawExtraFieldView, offsetExtraField + 2);
        extraField.set(type, {
          type: type,
          data: rawExtraField.slice(offsetExtraField + 4, offsetExtraField + 4 + size)
        });
        offsetExtraField += 4 + size;
      }
    } catch (error) {// ignored
    }

    var compressionMethod = getUint16(dataView, offset + 4);
    directory.signature = getUint32(dataView, offset + 10);
    directory.uncompressedSize = getUint32(dataView, offset + 18);
    directory.compressedSize = getUint32(dataView, offset + 14);
    var extraFieldZip64 = extraField.get(EXTRAFIELD_TYPE_ZIP64);

    if (extraFieldZip64) {
      readExtraFieldZip64(extraFieldZip64, directory);
      directory.extraFieldZip64 = extraFieldZip64;
    }

    var extraFieldUnicodePath = extraField.get(EXTRAFIELD_TYPE_UNICODE_PATH);
    return _invoke(function () {
      if (extraFieldUnicodePath) {
        return _await(readExtraFieldUnicode(extraFieldUnicodePath, "filename", "rawFilename", directory, fileEntry), function () {
          directory.extraFieldUnicodePath = extraFieldUnicodePath;
        });
      }
    }, function () {
      var extraFieldUnicodeComment = extraField.get(EXTRAFIELD_TYPE_UNICODE_COMMENT);
      return _invoke(function () {
        if (extraFieldUnicodeComment) {
          return _await(readExtraFieldUnicode(extraFieldUnicodeComment, "comment", "rawComment", directory, fileEntry), function () {
            directory.extraFieldUnicodeComment = extraFieldUnicodeComment;
          });
        }
      }, function () {
        var extraFieldAES = extraField.get(EXTRAFIELD_TYPE_AES);

        if (extraFieldAES) {
          readExtraFieldAES(extraFieldAES, directory, compressionMethod);
          directory.extraFieldAES = extraFieldAES;
        } else {
          directory.compressionMethod = compressionMethod;
        }

        var extraFieldNTFS = extraField.get(EXTRAFIELD_TYPE_NTFS);

        if (extraFieldNTFS) {
          readExtraFieldNTFS(extraFieldNTFS, directory);
          directory.extraFieldNTFS = extraFieldNTFS;
        }

        var extraFieldExtendedTimestamp = extraField.get(EXTRAFIELD_TYPE_EXTENDED_TIMESTAMP);

        if (extraFieldExtendedTimestamp) {
          readExtraFieldExtendedTimestamp(extraFieldExtendedTimestamp, directory);
          directory.extraFieldExtendedTimestamp = extraFieldExtendedTimestamp;
        }
      });
    });
  });

  var ERR_BAD_FORMAT = "File format is not recognized";
  var ERR_EOCDR_NOT_FOUND = "End of central directory not found";
  var ERR_EOCDR_ZIP64_NOT_FOUND = "End of Zip64 central directory not found";
  var ERR_EOCDR_LOCATOR_ZIP64_NOT_FOUND = "End of Zip64 central directory locator not found";
  var ERR_CENTRAL_DIRECTORY_NOT_FOUND = "Central directory header not found";
  var ERR_LOCAL_FILE_HEADER_NOT_FOUND = "Local file header not found";
  var ERR_EXTRAFIELD_ZIP64_NOT_FOUND = "Zip64 extra field not found";
  var ERR_ENCRYPTED = "File contains encrypted entry";
  var ERR_UNSUPPORTED_ENCRYPTION = "Encryption method not supported";
  var ERR_UNSUPPORTED_COMPRESSION = "Compression method not supported";
  var CHARSET_UTF8 = "utf-8";
  var CHARSET_CP437 = "cp437";
  var ZIP64_PROPERTIES = ["uncompressedSize", "compressedSize", "offset"];

  var ZipReader = /*#__PURE__*/function () {
    function ZipReader(reader) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, ZipReader);

      Object.assign(this, {
        reader: reader,
        options: options,
        config: getConfiguration()
      });
    }

    _createClass(ZipReader, [{
      key: "getEntriesGenerator",
      value: function getEntriesGenerator() {
        var _this = this;

        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return _wrapAsyncGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var zipReader, reader, endOfDirectoryInfo, endOfDirectoryView, directoryDataLength, directoryDataOffset, prependedDataLength, endOfDirectoryLocatorArray, endOfDirectoryLocatorView, endOfDirectoryArray, _endOfDirectoryView, expectedDirectoryDataOffset, originalDirectoryDataOffset, offset, directoryArray, directoryView, _expectedDirectoryDataOffset, _originalDirectoryDataOffset, _loop, indexFile;

          return _regeneratorRuntime().wrap(function _callee$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  zipReader = _this;
                  reader = zipReader.reader;

                  if (reader.initialized) {
                    _context2.next = 5;
                    break;
                  }

                  _context2.next = 5;
                  return _awaitAsyncGenerator(reader.init());

                case 5:
                  if (!(reader.size < END_OF_CENTRAL_DIR_LENGTH)) {
                    _context2.next = 7;
                    break;
                  }

                  throw new Error(ERR_BAD_FORMAT);

                case 7:
                  _context2.next = 9;
                  return _awaitAsyncGenerator(seekSignature(reader, END_OF_CENTRAL_DIR_SIGNATURE, reader.size, END_OF_CENTRAL_DIR_LENGTH, MAX_16_BITS * 16));

                case 9:
                  endOfDirectoryInfo = _context2.sent;

                  if (endOfDirectoryInfo) {
                    _context2.next = 12;
                    break;
                  }

                  throw new Error(ERR_EOCDR_NOT_FOUND);

                case 12:
                  endOfDirectoryView = getDataView$1(endOfDirectoryInfo);
                  directoryDataLength = getUint32(endOfDirectoryView, 12);
                  directoryDataOffset = getUint32(endOfDirectoryView, 16);
                  _this.filesLength = getUint16(endOfDirectoryView, 8);
                  prependedDataLength = 0;

                  if (!(directoryDataOffset == MAX_32_BITS || directoryDataLength == MAX_32_BITS || _this.filesLength == MAX_16_BITS)) {
                    _context2.next = 43;
                    break;
                  }

                  _context2.next = 20;
                  return _awaitAsyncGenerator(readUint8Array(reader, endOfDirectoryInfo.offset - ZIP64_END_OF_CENTRAL_DIR_LOCATOR_LENGTH, ZIP64_END_OF_CENTRAL_DIR_LOCATOR_LENGTH));

                case 20:
                  endOfDirectoryLocatorArray = _context2.sent;
                  endOfDirectoryLocatorView = getDataView$1(endOfDirectoryLocatorArray);

                  if (!(getUint32(endOfDirectoryLocatorView, 0) != ZIP64_END_OF_CENTRAL_DIR_LOCATOR_SIGNATURE)) {
                    _context2.next = 24;
                    break;
                  }

                  throw new Error(ERR_EOCDR_ZIP64_NOT_FOUND);

                case 24:
                  directoryDataOffset = getBigUint64(endOfDirectoryLocatorView, 8);
                  _context2.next = 27;
                  return _awaitAsyncGenerator(readUint8Array(reader, directoryDataOffset, ZIP64_END_OF_CENTRAL_DIR_LENGTH));

                case 27:
                  endOfDirectoryArray = _context2.sent;
                  _endOfDirectoryView = getDataView$1(endOfDirectoryArray);
                  expectedDirectoryDataOffset = endOfDirectoryInfo.offset - ZIP64_END_OF_CENTRAL_DIR_LOCATOR_LENGTH - ZIP64_END_OF_CENTRAL_DIR_LENGTH;

                  if (!(getUint32(_endOfDirectoryView, 0) != ZIP64_END_OF_CENTRAL_DIR_SIGNATURE && directoryDataOffset != expectedDirectoryDataOffset)) {
                    _context2.next = 38;
                    break;
                  }

                  originalDirectoryDataOffset = directoryDataOffset;
                  directoryDataOffset = expectedDirectoryDataOffset;
                  prependedDataLength = directoryDataOffset - originalDirectoryDataOffset;
                  _context2.next = 36;
                  return _awaitAsyncGenerator(readUint8Array(reader, directoryDataOffset, ZIP64_END_OF_CENTRAL_DIR_LENGTH));

                case 36:
                  endOfDirectoryArray = _context2.sent;
                  _endOfDirectoryView = getDataView$1(endOfDirectoryArray);

                case 38:
                  if (!(getUint32(_endOfDirectoryView, 0) != ZIP64_END_OF_CENTRAL_DIR_SIGNATURE)) {
                    _context2.next = 40;
                    break;
                  }

                  throw new Error(ERR_EOCDR_LOCATOR_ZIP64_NOT_FOUND);

                case 40:
                  _this.filesLength = getBigUint64(_endOfDirectoryView, 32);
                  directoryDataLength = getBigUint64(_endOfDirectoryView, 40);
                  directoryDataOffset -= directoryDataLength;

                case 43:
                  if (!(directoryDataOffset < 0 || directoryDataOffset >= reader.size)) {
                    _context2.next = 45;
                    break;
                  }

                  throw new Error(ERR_BAD_FORMAT);

                case 45:
                  offset = 0;
                  _context2.next = 48;
                  return _awaitAsyncGenerator(readUint8Array(reader, directoryDataOffset, directoryDataLength));

                case 48:
                  directoryArray = _context2.sent;
                  directoryView = getDataView$1(directoryArray);

                  if (!directoryDataLength) {
                    _context2.next = 60;
                    break;
                  }

                  _expectedDirectoryDataOffset = endOfDirectoryInfo.offset - directoryDataLength;

                  if (!(getUint32(directoryView, offset) != CENTRAL_FILE_HEADER_SIGNATURE && directoryDataOffset != _expectedDirectoryDataOffset)) {
                    _context2.next = 60;
                    break;
                  }

                  _originalDirectoryDataOffset = directoryDataOffset;
                  directoryDataOffset = _expectedDirectoryDataOffset;
                  prependedDataLength = directoryDataOffset - _originalDirectoryDataOffset;
                  _context2.next = 58;
                  return _awaitAsyncGenerator(readUint8Array(reader, directoryDataOffset, directoryDataLength));

                case 58:
                  directoryArray = _context2.sent;
                  directoryView = getDataView$1(directoryArray);

                case 60:
                  if (!(directoryDataOffset < 0 || directoryDataOffset >= reader.size)) {
                    _context2.next = 62;
                    break;
                  }

                  throw new Error(ERR_BAD_FORMAT);

                case 62:
                  _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop(indexFile) {
                    var fileEntry, languageEncodingFlag, filenameOffset, extraFieldOffset, commentOffset, versionMadeBy, msDosCompatible, endOffset, filenameEncoding, commentEncoding, _yield$_awaitAsyncGen, _yield$_awaitAsyncGen2, filename, comment, entry;

                    return _regeneratorRuntime().wrap(function _loop$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            fileEntry = new ZipEntry$1(reader, zipReader.config, zipReader.options);

                            if (!(getUint32(directoryView, offset) != CENTRAL_FILE_HEADER_SIGNATURE)) {
                              _context.next = 3;
                              break;
                            }

                            throw new Error(ERR_CENTRAL_DIRECTORY_NOT_FOUND);

                          case 3:
                            readCommonHeader(fileEntry, directoryView, offset + 6);
                            languageEncodingFlag = Boolean(fileEntry.bitFlag.languageEncodingFlag);
                            filenameOffset = offset + 46;
                            extraFieldOffset = filenameOffset + fileEntry.filenameLength;
                            commentOffset = extraFieldOffset + fileEntry.extraFieldLength;
                            versionMadeBy = getUint16(directoryView, offset + 4);
                            msDosCompatible = (versionMadeBy & 0) == 0;
                            Object.assign(fileEntry, {
                              versionMadeBy: versionMadeBy,
                              msDosCompatible: msDosCompatible,
                              compressedSize: 0,
                              uncompressedSize: 0,
                              commentLength: getUint16(directoryView, offset + 32),
                              directory: msDosCompatible && (getUint8(directoryView, offset + 38) & FILE_ATTR_MSDOS_DIR_MASK) == FILE_ATTR_MSDOS_DIR_MASK,
                              offset: getUint32(directoryView, offset + 42) + prependedDataLength,
                              internalFileAttribute: getUint32(directoryView, offset + 34),
                              externalFileAttribute: getUint32(directoryView, offset + 38),
                              rawFilename: directoryArray.subarray(filenameOffset, extraFieldOffset),
                              filenameUTF8: languageEncodingFlag,
                              commentUTF8: languageEncodingFlag,
                              rawExtraField: directoryArray.subarray(extraFieldOffset, commentOffset)
                            });
                            endOffset = commentOffset + fileEntry.commentLength;
                            fileEntry.rawComment = directoryArray.subarray(commentOffset, endOffset);
                            filenameEncoding = getOptionValue$1(zipReader, options, "filenameEncoding");
                            commentEncoding = getOptionValue$1(zipReader, options, "commentEncoding");
                            _context.next = 17;
                            return _awaitAsyncGenerator(Promise.all([decodeText(fileEntry.rawFilename, fileEntry.filenameUTF8 ? CHARSET_UTF8 : filenameEncoding || CHARSET_CP437), decodeText(fileEntry.rawComment, fileEntry.commentUTF8 ? CHARSET_UTF8 : commentEncoding || CHARSET_CP437)]));

                          case 17:
                            _yield$_awaitAsyncGen = _context.sent;
                            _yield$_awaitAsyncGen2 = _slicedToArray(_yield$_awaitAsyncGen, 2);
                            filename = _yield$_awaitAsyncGen2[0];
                            comment = _yield$_awaitAsyncGen2[1];
                            fileEntry.filename = filename;
                            fileEntry.comment = comment;

                            if (!fileEntry.directory && fileEntry.filename.endsWith(DIRECTORY_SIGNATURE)) {
                              fileEntry.directory = true;
                            }

                            _context.next = 26;
                            return _awaitAsyncGenerator(readCommonFooter(fileEntry, fileEntry, directoryView, offset + 6));

                          case 26:
                            entry = new Entry(fileEntry);

                            entry.getData = function (writer, options) {
                              return fileEntry.getData(writer, entry, options);
                            };

                            offset = endOffset;

                            if (options.onprogress) {
                              try {
                                options.onprogress(indexFile + 1, _this.filesLength, new Entry(fileEntry));
                              } catch (error) {// ignored
                              }
                            }

                            _context.next = 32;
                            return entry;

                          case 32:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _loop);
                  });
                  indexFile = 0;

                case 64:
                  if (!(indexFile < _this.filesLength)) {
                    _context2.next = 69;
                    break;
                  }

                  return _context2.delegateYield(_loop(indexFile), "t0", 66);

                case 66:
                  indexFile++;
                  _context2.next = 64;
                  break;

                case 69:
                  return _context2.abrupt("return", true);

                case 70:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee);
        }))();
      }
    }, {
      key: "getEntries",
      value: function getEntries() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        try {
          var _this3 = this;

          var entries = [];

          var iter = _this3.getEntriesGenerator(options);

          var curr = iter.next();
          return _await(_continue(_for(function () {
            return _await(!!curr, function (_curr) {
              return !_curr.done;
            });
          }, void 0, function () {
            var _push = entries.push;
            return _await(curr, function (_curr2) {
              _push.call(entries, _curr2.value);

              curr = iter.next();
            });
          }), function () {
            return entries;
          }));
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }, {
      key: "close",
      value: function close() {
        return _await();
      }
    }]);

    return ZipReader;
  }();

  var ZipEntry$1 = /*#__PURE__*/function () {
    function ZipEntry(reader, config, options) {
      _classCallCheck(this, ZipEntry);

      Object.assign(this, {
        reader: reader,
        config: config,
        options: options
      });
    }

    _createClass(ZipEntry, [{
      key: "getData",
      value: function getData(writer, fileEntry) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        try {
          var _this5 = this;

          var zipEntry = _this5;
          var reader = zipEntry.reader,
              offset = zipEntry.offset,
              extraFieldAES = zipEntry.extraFieldAES,
              compressionMethod = zipEntry.compressionMethod,
              config = zipEntry.config,
              bitFlag = zipEntry.bitFlag,
              signature = zipEntry.signature,
              rawLastModDate = zipEntry.rawLastModDate,
              compressedSize = zipEntry.compressedSize;
          var localDirectory = zipEntry.localDirectory = {};
          return _await(_invoke(function () {
            if (!reader.initialized) {
              return _awaitIgnored(reader.init());
            }
          }, function () {
            return _await(readUint8Array(reader, offset, 30), function (dataArray) {
              var dataView = getDataView$1(dataArray);
              var password = getOptionValue$1(zipEntry, options, "password");
              password = password && password.length && password;

              if (extraFieldAES) {
                if (extraFieldAES.originalCompressionMethod != COMPRESSION_METHOD_AES) {
                  throw new Error(ERR_UNSUPPORTED_COMPRESSION);
                }
              }

              if (compressionMethod != COMPRESSION_METHOD_STORE && compressionMethod != COMPRESSION_METHOD_DEFLATE) {
                throw new Error(ERR_UNSUPPORTED_COMPRESSION);
              }

              if (getUint32(dataView, 0) != LOCAL_FILE_HEADER_SIGNATURE) {
                throw new Error(ERR_LOCAL_FILE_HEADER_NOT_FOUND);
              }

              readCommonHeader(localDirectory, dataView, 4);
              return _await(readUint8Array(reader, offset, 30 + localDirectory.filenameLength + localDirectory.extraFieldLength), function (_readUint8Array) {
                dataArray = _readUint8Array;
                localDirectory.rawExtraField = dataArray.subarray(30 + localDirectory.filenameLength);
                return _await(readCommonFooter(zipEntry, localDirectory, dataView, 4), function () {
                  fileEntry.lastAccessDate = localDirectory.lastAccessDate;
                  fileEntry.creationDate = localDirectory.creationDate;
                  var encrypted = zipEntry.encrypted && localDirectory.encrypted;
                  var zipCrypto = encrypted && !extraFieldAES;

                  if (encrypted) {
                    if (!zipCrypto && extraFieldAES.strength === undefined) {
                      throw new Error(ERR_UNSUPPORTED_ENCRYPTION);
                    } else if (!password) {
                      throw new Error(ERR_ENCRYPTED);
                    }
                  }

                  return _await(createCodec(config.Inflate, {
                    codecType: CODEC_INFLATE,
                    password: password,
                    zipCrypto: zipCrypto,
                    encryptionStrength: extraFieldAES && extraFieldAES.strength,
                    signed: getOptionValue$1(zipEntry, options, "checkSignature"),
                    passwordVerification: zipCrypto && (bitFlag.dataDescriptor ? rawLastModDate >>> 8 & 0xFF : signature >>> 24 & 0xFF),
                    signature: signature,
                    compressed: compressionMethod != 0,
                    encrypted: encrypted,
                    useWebWorkers: getOptionValue$1(zipEntry, options, "useWebWorkers")
                  }, config), function (codec) {
                    return _invoke(function () {
                      if (!writer.initialized) {
                        return _awaitIgnored(writer.init());
                      }
                    }, function () {
                      var signal = getOptionValue$1(zipEntry, options, "signal");
                      var dataOffset = offset + 30 + localDirectory.filenameLength + localDirectory.extraFieldLength;
                      return _await(processData(codec, reader, writer, dataOffset, compressedSize, config, {
                        onprogress: options.onprogress,
                        signal: signal
                      }), function () {
                        return writer.getData();
                      });
                    });
                  });
                });
              });
            });
          }));
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }]);

    return ZipEntry;
  }();

  function readCommonHeader(directory, dataView, offset) {
    var rawBitFlag = directory.rawBitFlag = getUint16(dataView, offset + 2);
    var encrypted = (rawBitFlag & BITFLAG_ENCRYPTED) == BITFLAG_ENCRYPTED;
    var rawLastModDate = getUint32(dataView, offset + 6);
    Object.assign(directory, {
      encrypted: encrypted,
      version: getUint16(dataView, offset),
      bitFlag: {
        level: (rawBitFlag & BITFLAG_LEVEL) >> 1,
        dataDescriptor: (rawBitFlag & BITFLAG_DATA_DESCRIPTOR) == BITFLAG_DATA_DESCRIPTOR,
        languageEncodingFlag: (rawBitFlag & BITFLAG_LANG_ENCODING_FLAG) == BITFLAG_LANG_ENCODING_FLAG
      },
      rawLastModDate: rawLastModDate,
      lastModDate: getDate(rawLastModDate),
      filenameLength: getUint16(dataView, offset + 22),
      extraFieldLength: getUint16(dataView, offset + 24)
    });
  }

  function readExtraFieldZip64(extraFieldZip64, directory) {
    directory.zip64 = true;
    var extraFieldView = getDataView$1(extraFieldZip64.data);
    extraFieldZip64.values = [];

    for (var indexValue = 0; indexValue < Math.floor(extraFieldZip64.data.length / 8); indexValue++) {
      extraFieldZip64.values.push(getBigUint64(extraFieldView, 0 + indexValue * 8));
    }

    var missingProperties = ZIP64_PROPERTIES.filter(function (propertyName) {
      return directory[propertyName] == MAX_32_BITS;
    });

    for (var indexMissingProperty = 0; indexMissingProperty < missingProperties.length; indexMissingProperty++) {
      extraFieldZip64[missingProperties[indexMissingProperty]] = extraFieldZip64.values[indexMissingProperty];
    }

    ZIP64_PROPERTIES.forEach(function (propertyName) {
      if (directory[propertyName] == MAX_32_BITS) {
        if (extraFieldZip64[propertyName] !== undefined) {
          directory[propertyName] = extraFieldZip64[propertyName];
        } else {
          throw new Error(ERR_EXTRAFIELD_ZIP64_NOT_FOUND);
        }
      }
    });
  }

  function readExtraFieldAES(extraFieldAES, directory, compressionMethod) {
    var extraFieldView = getDataView$1(extraFieldAES.data);
    extraFieldAES.vendorVersion = getUint8(extraFieldView, 0);
    extraFieldAES.vendorId = getUint8(extraFieldView, 2);
    var strength = getUint8(extraFieldView, 4);
    extraFieldAES.strength = strength;
    extraFieldAES.originalCompressionMethod = compressionMethod;
    directory.compressionMethod = extraFieldAES.compressionMethod = getUint16(extraFieldView, 5);
  }

  function readExtraFieldNTFS(extraFieldNTFS, directory) {
    var extraFieldView = getDataView$1(extraFieldNTFS.data);
    var offsetExtraField = 4;
    var tag1Data;

    try {
      while (offsetExtraField < extraFieldNTFS.data.length && !tag1Data) {
        var tagValue = getUint16(extraFieldView, offsetExtraField);
        var attributeSize = getUint16(extraFieldView, offsetExtraField + 2);

        if (tagValue == EXTRAFIELD_TYPE_NTFS_TAG1) {
          tag1Data = extraFieldNTFS.data.slice(offsetExtraField + 4, offsetExtraField + 4 + attributeSize);
        }

        offsetExtraField += 4 + attributeSize;
      }
    } catch (error) {// ignored
    }

    try {
      if (tag1Data && tag1Data.length == 24) {
        var tag1View = getDataView$1(tag1Data);
        var rawLastModDate = tag1View.getBigUint64(0, true);
        var rawLastAccessDate = tag1View.getBigUint64(8, true);
        var rawCreationDate = tag1View.getBigUint64(16, true);
        Object.assign(extraFieldNTFS, {
          rawLastModDate: rawLastModDate,
          rawLastAccessDate: rawLastAccessDate,
          rawCreationDate: rawCreationDate
        });
        var lastModDate = getDateNTFS(rawLastModDate);
        var lastAccessDate = getDateNTFS(rawLastAccessDate);
        var creationDate = getDateNTFS(rawCreationDate);
        var extraFieldData = {
          lastModDate: lastModDate,
          lastAccessDate: lastAccessDate,
          creationDate: creationDate
        };
        Object.assign(extraFieldNTFS, extraFieldData);
        Object.assign(directory, extraFieldData);
      }
    } catch (error) {// ignored
    }
  }

  function readExtraFieldExtendedTimestamp(extraFieldExtendedTimestamp, directory) {
    var extraFieldView = getDataView$1(extraFieldExtendedTimestamp.data);
    var flags = getUint8(extraFieldView, 0);
    var timeProperties = [];
    var timeRawProperties = [];

    if ((flags & 0x1) == 0x1) {
      timeProperties.push("lastModDate");
      timeRawProperties.push("rawLastModDate");
    }

    if ((flags & 0x2) == 0x2) {
      timeProperties.push("lastAccessDate");
      timeRawProperties.push("rawLastAccessDate");
    }

    if ((flags & 0x4) == 0x4) {
      timeProperties.push("creationDate");
      timeRawProperties.push("rawCreationDate");
    }

    var offset = 1;
    timeProperties.forEach(function (propertyName, indexProperty) {
      if (extraFieldExtendedTimestamp.data.length >= offset + 4) {
        var time = getUint32(extraFieldView, offset);
        directory[propertyName] = extraFieldExtendedTimestamp[propertyName] = new Date(time * 1000);
        var rawPropertyName = timeRawProperties[indexProperty];
        extraFieldExtendedTimestamp[rawPropertyName] = time;
      }

      offset += 4;
    });
  }

  function getOptionValue$1(zipReader, options, name) {
    return options[name] === undefined ? zipReader.options[name] : options[name];
  }

  function getDate(timeRaw) {
    var date = (timeRaw & 0xffff0000) >> 16,
        time = timeRaw & 0x0000ffff;

    try {
      return new Date(1980 + ((date & 0xFE00) >> 9), ((date & 0x01E0) >> 5) - 1, date & 0x001F, (time & 0xF800) >> 11, (time & 0x07E0) >> 5, (time & 0x001F) * 2, 0);
    } catch (error) {// ignored
    }
  }

  function getDateNTFS(timeRaw) {
    return new Date(Number(timeRaw / BigInt(10000) - BigInt(11644473600000)));
  }

  function getUint8(view, offset) {
    return view.getUint8(offset);
  }

  function getUint16(view, offset) {
    return view.getUint16(offset, true);
  }

  function getUint32(view, offset) {
    return view.getUint32(offset, true);
  }

  function getBigUint64(view, offset) {
    return Number(view.getBigUint64(offset, true));
  }

  function setUint32$1(view, offset, value) {
    view.setUint32(offset, value, true);
  }

  function getDataView$1(array) {
    return new DataView(array.buffer);
  }

  function readUint8Array(reader, offset, size) {
    return reader.readUint8Array(offset, size);
  }

  var DESCRIPTORS = descriptors;
  var FUNCTION_NAME_EXISTS = functionName.EXISTS;
  var uncurryThis = functionUncurryThis;
  var defineProperty = objectDefineProperty.f;

  var FunctionPrototype = Function.prototype;
  var functionToString = uncurryThis(FunctionPrototype.toString);
  var nameRE = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/;
  var regExpExec = uncurryThis(nameRE.exec);
  var NAME = 'name';

  // Function instances `.name` property
  // https://tc39.es/ecma262/#sec-function-instances-name
  if (DESCRIPTORS && !FUNCTION_NAME_EXISTS) {
    defineProperty(FunctionPrototype, NAME, {
      configurable: true,
      get: function () {
        try {
          return regExpExec(nameRE, functionToString(this))[1];
        } catch (error) {
          return '';
        }
      }
    });
  }

  var writeBlob = _async(function (writer, blob) {
    var writeSlice = _async(function () {
      return _invokeIgnored(function () {
        if (start < blob.size) {
          return _await(sliceAsArrayBuffer(blob, start, start + blockSize), function (arrayBuffer) {
            return _await(writer.writeUint8Array(new Uint8Array(arrayBuffer)), function () {
              start += blockSize;
              return _callIgnored(writeSlice);
            });
          });
        }
      });
    });

    var start = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var blockSize = 512 * 1024 * 1024;
    return _callIgnored(writeSlice);
  });

  var closeFile = _async(function (zipWriter, comment, options) {
    var writer = zipWriter.writer;
    var files = zipWriter.files;
    var offset = 0;
    var directoryDataLength = 0;
    var directoryOffset = zipWriter.offset;
    var filesLength = files.size;

    var _iterator = _createForOfIteratorHelper(files),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _step$value = _slicedToArray(_step.value, 2),
            fileEntry = _step$value[1];

        directoryDataLength += 46 + fileEntry.rawFilename.length + fileEntry.rawComment.length + fileEntry.rawExtraFieldZip64.length + fileEntry.rawExtraFieldAES.length + fileEntry.rawExtraFieldExtendedTimestamp.length + fileEntry.rawExtraFieldNTFS.length + fileEntry.rawExtraField.length;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    var zip64 = options.zip64 || zipWriter.options.zip64 || false;

    if (directoryOffset >= MAX_32_BITS || directoryDataLength >= MAX_32_BITS || filesLength >= MAX_16_BITS) {
      if (options.zip64 === false || zipWriter.options.zip64 === false) {
        throw new Error(ERR_UNSUPPORTED_FORMAT);
      } else {
        zip64 = true;
      }
    }

    var directoryArray = new Uint8Array(directoryDataLength + (zip64 ? ZIP64_END_OF_CENTRAL_DIR_TOTAL_LENGTH : END_OF_CENTRAL_DIR_LENGTH));
    var directoryView = getDataView(directoryArray);

    if (comment && comment.length) {
      if (comment.length <= MAX_16_BITS) {
        setUint16(directoryView, offset + 20, comment.length);
      } else {
        throw new Error(ERR_INVALID_COMMENT);
      }
    }

    var _iterator2 = _createForOfIteratorHelper(Array.from(files.values()).entries()),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _step2$value = _slicedToArray(_step2.value, 2),
            indexFileEntry = _step2$value[0],
            _fileEntry = _step2$value[1];

        var rawFilename = _fileEntry.rawFilename,
            rawExtraFieldZip64 = _fileEntry.rawExtraFieldZip64,
            rawExtraFieldAES = _fileEntry.rawExtraFieldAES,
            rawExtraField = _fileEntry.rawExtraField,
            rawComment = _fileEntry.rawComment,
            versionMadeBy = _fileEntry.versionMadeBy,
            headerArray = _fileEntry.headerArray,
            directory = _fileEntry.directory,
            _zip = _fileEntry.zip64,
            msDosCompatible = _fileEntry.msDosCompatible,
            internalFileAttribute = _fileEntry.internalFileAttribute,
            externalFileAttribute = _fileEntry.externalFileAttribute;
        var rawExtraFieldExtendedTimestamp = void 0;
        var rawExtraFieldNTFS = void 0;

        if (_fileEntry.extendedTimestamp) {
          rawExtraFieldNTFS = _fileEntry.rawExtraFieldNTFS;
          rawExtraFieldExtendedTimestamp = new Uint8Array(9);
          var extraFieldExtendedTimestampView = getDataView(rawExtraFieldExtendedTimestamp);
          setUint16(extraFieldExtendedTimestampView, 0, EXTRAFIELD_TYPE_EXTENDED_TIMESTAMP);
          setUint16(extraFieldExtendedTimestampView, 2, rawExtraFieldExtendedTimestamp.length - 4);
          setUint8(extraFieldExtendedTimestampView, 4, 0x1);
          setUint32(extraFieldExtendedTimestampView, 5, Math.floor(_fileEntry.lastModDate.getTime() / 1000));
        } else {
          rawExtraFieldNTFS = rawExtraFieldExtendedTimestamp = new Uint8Array(0);
        }

        var extraFieldLength = rawExtraFieldZip64.length + rawExtraFieldAES.length + rawExtraFieldExtendedTimestamp.length + rawExtraFieldNTFS.length + rawExtraField.length;
        setUint32(directoryView, offset, CENTRAL_FILE_HEADER_SIGNATURE);
        setUint16(directoryView, offset + 4, versionMadeBy);
        arraySet(directoryArray, headerArray, offset + 6);
        setUint16(directoryView, offset + 30, extraFieldLength);
        setUint16(directoryView, offset + 32, rawComment.length);
        setUint32(directoryView, offset + 34, internalFileAttribute);

        if (externalFileAttribute) {
          setUint32(directoryView, offset + 38, externalFileAttribute);
        } else if (directory && msDosCompatible) {
          setUint8(directoryView, offset + 38, FILE_ATTR_MSDOS_DIR_MASK);
        }

        if (_zip) {
          setUint32(directoryView, offset + 42, MAX_32_BITS);
        } else {
          setUint32(directoryView, offset + 42, _fileEntry.offset);
        }

        arraySet(directoryArray, rawFilename, offset + 46);
        arraySet(directoryArray, rawExtraFieldZip64, offset + 46 + rawFilename.length);
        arraySet(directoryArray, rawExtraFieldAES, offset + 46 + rawFilename.length + rawExtraFieldZip64.length);
        arraySet(directoryArray, rawExtraFieldExtendedTimestamp, offset + 46 + rawFilename.length + rawExtraFieldZip64.length + rawExtraFieldAES.length);
        arraySet(directoryArray, rawExtraFieldNTFS, offset + 46 + rawFilename.length + rawExtraFieldZip64.length + rawExtraFieldAES.length + rawExtraFieldExtendedTimestamp.length);
        arraySet(directoryArray, rawExtraField, offset + 46 + rawFilename.length + rawExtraFieldZip64.length + rawExtraFieldAES.length + rawExtraFieldExtendedTimestamp.length + rawExtraFieldNTFS.length);
        arraySet(directoryArray, rawComment, offset + 46 + rawFilename.length + extraFieldLength);
        offset += 46 + rawFilename.length + extraFieldLength + rawComment.length;

        if (options.onprogress) {
          try {
            options.onprogress(indexFileEntry + 1, files.size, new Entry(_fileEntry));
          } catch (error) {// ignored
          }
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    if (zip64) {
      setUint32(directoryView, offset, ZIP64_END_OF_CENTRAL_DIR_SIGNATURE);
      setBigUint64(directoryView, offset + 4, BigInt(44));
      setUint16(directoryView, offset + 12, 45);
      setUint16(directoryView, offset + 14, 45);
      setBigUint64(directoryView, offset + 24, BigInt(filesLength));
      setBigUint64(directoryView, offset + 32, BigInt(filesLength));
      setBigUint64(directoryView, offset + 40, BigInt(directoryDataLength));
      setBigUint64(directoryView, offset + 48, BigInt(directoryOffset));
      setUint32(directoryView, offset + 56, ZIP64_END_OF_CENTRAL_DIR_LOCATOR_SIGNATURE);
      setBigUint64(directoryView, offset + 64, BigInt(directoryOffset) + BigInt(directoryDataLength));
      setUint32(directoryView, offset + 72, ZIP64_TOTAL_NUMBER_OF_DISKS);
      filesLength = MAX_16_BITS;
      directoryOffset = MAX_32_BITS;
      directoryDataLength = MAX_32_BITS;
      offset += 76;
    }

    setUint32(directoryView, offset, END_OF_CENTRAL_DIR_SIGNATURE);
    setUint16(directoryView, offset + 8, filesLength);
    setUint16(directoryView, offset + 10, filesLength);
    setUint32(directoryView, offset + 12, directoryDataLength);
    setUint32(directoryView, offset + 16, directoryOffset);
    return _await(writer.writeUint8Array(directoryArray), function () {
      return _invokeIgnored(function () {
        if (comment && comment.length) {
          return _awaitIgnored(writer.writeUint8Array(comment));
        }
      });
    });
  });

  var createFileEntry = _async(function (reader, writer, config, options) {
    var rawFilename = options.rawFilename,
        lastAccessDate = options.lastAccessDate,
        creationDate = options.creationDate,
        password = options.password,
        level = options.level,
        zip64 = options.zip64,
        zipCrypto = options.zipCrypto,
        dataDescriptor = options.dataDescriptor,
        dataDescriptorSignature = options.dataDescriptorSignature,
        directory = options.directory,
        version = options.version,
        versionMadeBy = options.versionMadeBy,
        rawComment = options.rawComment,
        rawExtraField = options.rawExtraField,
        useWebWorkers = options.useWebWorkers,
        onprogress = options.onprogress,
        signal = options.signal,
        encryptionStrength = options.encryptionStrength,
        extendedTimestamp = options.extendedTimestamp,
        msDosCompatible = options.msDosCompatible,
        internalFileAttribute = options.internalFileAttribute,
        externalFileAttribute = options.externalFileAttribute;
    var encrypted = Boolean(password && password.length);
    var compressed = level !== 0 && !directory;
    var rawExtraFieldAES;

    if (encrypted && !zipCrypto) {
      rawExtraFieldAES = new Uint8Array(EXTRAFIELD_DATA_AES.length + 2);
      var extraFieldAESView = getDataView(rawExtraFieldAES);
      setUint16(extraFieldAESView, 0, EXTRAFIELD_TYPE_AES);
      arraySet(rawExtraFieldAES, EXTRAFIELD_DATA_AES, 2);
      setUint8(extraFieldAESView, 8, encryptionStrength);
    } else {
      rawExtraFieldAES = new Uint8Array(0);
    }

    var rawExtraFieldNTFS;
    var rawExtraFieldExtendedTimestamp;

    if (extendedTimestamp) {
      rawExtraFieldExtendedTimestamp = new Uint8Array(9 + (lastAccessDate ? 4 : 0) + (creationDate ? 4 : 0));
      var extraFieldExtendedTimestampView = getDataView(rawExtraFieldExtendedTimestamp);
      setUint16(extraFieldExtendedTimestampView, 0, EXTRAFIELD_TYPE_EXTENDED_TIMESTAMP);
      setUint16(extraFieldExtendedTimestampView, 2, rawExtraFieldExtendedTimestamp.length - 4);
      var extraFieldExtendedTimestampFlag = 0x1 + (lastAccessDate ? 0x2 : 0) + (creationDate ? 0x4 : 0);
      setUint8(extraFieldExtendedTimestampView, 4, extraFieldExtendedTimestampFlag);
      setUint32(extraFieldExtendedTimestampView, 5, Math.floor(options.lastModDate.getTime() / 1000));

      if (lastAccessDate) {
        setUint32(extraFieldExtendedTimestampView, 9, Math.floor(lastAccessDate.getTime() / 1000));
      }

      if (creationDate) {
        setUint32(extraFieldExtendedTimestampView, 13, Math.floor(creationDate.getTime() / 1000));
      }

      try {
        rawExtraFieldNTFS = new Uint8Array(36);
        var extraFieldNTFSView = getDataView(rawExtraFieldNTFS);
        var lastModTimeNTFS = getTimeNTFS(options.lastModDate);
        setUint16(extraFieldNTFSView, 0, EXTRAFIELD_TYPE_NTFS);
        setUint16(extraFieldNTFSView, 2, 32);
        setUint16(extraFieldNTFSView, 8, EXTRAFIELD_TYPE_NTFS_TAG1);
        setUint16(extraFieldNTFSView, 10, 24);
        setBigUint64(extraFieldNTFSView, 12, lastModTimeNTFS);
        setBigUint64(extraFieldNTFSView, 20, getTimeNTFS(lastAccessDate) || lastModTimeNTFS);
        setBigUint64(extraFieldNTFSView, 28, getTimeNTFS(creationDate) || lastModTimeNTFS);
      } catch (error) {
        rawExtraFieldNTFS = new Uint8Array(0);
      }
    } else {
      rawExtraFieldNTFS = rawExtraFieldExtendedTimestamp = new Uint8Array(0);
    }

    var fileEntry = {
      version: version || VERSION_DEFLATE,
      versionMadeBy: versionMadeBy,
      zip64: zip64,
      directory: Boolean(directory),
      filenameUTF8: true,
      rawFilename: rawFilename,
      commentUTF8: true,
      rawComment: rawComment,
      rawExtraFieldZip64: zip64 ? new Uint8Array(EXTRAFIELD_LENGTH_ZIP64 + 4) : new Uint8Array(0),
      rawExtraFieldExtendedTimestamp: rawExtraFieldExtendedTimestamp,
      rawExtraFieldNTFS: rawExtraFieldNTFS,
      rawExtraFieldAES: rawExtraFieldAES,
      rawExtraField: rawExtraField,
      extendedTimestamp: extendedTimestamp,
      msDosCompatible: msDosCompatible,
      internalFileAttribute: internalFileAttribute,
      externalFileAttribute: externalFileAttribute
    };
    var uncompressedSize = fileEntry.uncompressedSize = 0;
    var bitFlag = BITFLAG_LANG_ENCODING_FLAG;

    if (dataDescriptor) {
      bitFlag = bitFlag | BITFLAG_DATA_DESCRIPTOR;
    }

    var compressionMethod = COMPRESSION_METHOD_STORE;

    if (compressed) {
      compressionMethod = COMPRESSION_METHOD_DEFLATE;
    }

    if (zip64) {
      fileEntry.version = fileEntry.version > VERSION_ZIP64 ? fileEntry.version : VERSION_ZIP64;
    }

    if (encrypted) {
      bitFlag = bitFlag | BITFLAG_ENCRYPTED;

      if (!zipCrypto) {
        fileEntry.version = fileEntry.version > VERSION_AES ? fileEntry.version : VERSION_AES;
        compressionMethod = COMPRESSION_METHOD_AES;

        if (compressed) {
          fileEntry.rawExtraFieldAES[9] = COMPRESSION_METHOD_DEFLATE;
        }
      }
    }

    fileEntry.compressionMethod = compressionMethod;
    var headerArray = fileEntry.headerArray = new Uint8Array(26);
    var headerView = getDataView(headerArray);
    setUint16(headerView, 0, fileEntry.version);
    setUint16(headerView, 2, bitFlag);
    setUint16(headerView, 4, compressionMethod);
    var dateArray = new Uint32Array(1);
    var dateView = getDataView(dateArray);
    var lastModDate;

    if (options.lastModDate < MIN_DATE) {
      lastModDate = MIN_DATE;
    } else if (options.lastModDate > MAX_DATE) {
      lastModDate = MAX_DATE;
    } else {
      lastModDate = options.lastModDate;
    }

    setUint16(dateView, 0, (lastModDate.getHours() << 6 | lastModDate.getMinutes()) << 5 | lastModDate.getSeconds() / 2);
    setUint16(dateView, 2, (lastModDate.getFullYear() - 1980 << 4 | lastModDate.getMonth() + 1) << 5 | lastModDate.getDate());
    var rawLastModDate = dateArray[0];
    setUint32(headerView, 6, rawLastModDate);
    setUint16(headerView, 22, rawFilename.length);
    var extraFieldLength = rawExtraFieldAES.length + rawExtraFieldExtendedTimestamp.length + rawExtraFieldNTFS.length + fileEntry.rawExtraField.length;
    setUint16(headerView, 24, extraFieldLength);
    var localHeaderArray = new Uint8Array(30 + rawFilename.length + extraFieldLength);
    var localHeaderView = getDataView(localHeaderArray);
    setUint32(localHeaderView, 0, LOCAL_FILE_HEADER_SIGNATURE);
    arraySet(localHeaderArray, headerArray, 4);
    arraySet(localHeaderArray, rawFilename, 30);
    arraySet(localHeaderArray, rawExtraFieldAES, 30 + rawFilename.length);
    arraySet(localHeaderArray, rawExtraFieldExtendedTimestamp, 30 + rawFilename.length + rawExtraFieldAES.length);
    arraySet(localHeaderArray, rawExtraFieldNTFS, 30 + rawFilename.length + rawExtraFieldAES.length + rawExtraFieldExtendedTimestamp.length);
    arraySet(localHeaderArray, fileEntry.rawExtraField, 30 + rawFilename.length + rawExtraFieldAES.length + rawExtraFieldExtendedTimestamp.length + rawExtraFieldNTFS.length);
    var result;
    var compressedSize = 0;
    return _invoke(function () {
      if (reader) {
        uncompressedSize = fileEntry.uncompressedSize = reader.size;
        return _await(createCodec(config.Deflate, {
          codecType: CODEC_DEFLATE,
          level: level,
          password: password,
          encryptionStrength: encryptionStrength,
          zipCrypto: encrypted && zipCrypto,
          passwordVerification: encrypted && zipCrypto && rawLastModDate >> 8 & 0xFF,
          signed: true,
          compressed: compressed,
          encrypted: encrypted,
          useWebWorkers: useWebWorkers
        }, config), function (codec) {
          return _await(writer.writeUint8Array(localHeaderArray), function () {
            fileEntry.dataWritten = true;
            return _await(processData(codec, reader, writer, 0, uncompressedSize, config, {
              onprogress: onprogress,
              signal: signal
            }), function (_processData) {
              result = _processData;
              compressedSize = result.length;
            });
          });
        });
      } else {
        return _await(writer.writeUint8Array(localHeaderArray), function () {
          fileEntry.dataWritten = true;
        });
      }
    }, function () {
      var dataDescriptorArray = new Uint8Array(0);
      var dataDescriptorView,
          dataDescriptorOffset = 0;

      if (dataDescriptor) {
        dataDescriptorArray = new Uint8Array(zip64 ? dataDescriptorSignature ? 24 : 20 : dataDescriptorSignature ? 16 : 12);
        dataDescriptorView = getDataView(dataDescriptorArray);

        if (dataDescriptorSignature) {
          dataDescriptorOffset = 4;
          setUint32(dataDescriptorView, 0, DATA_DESCRIPTOR_RECORD_SIGNATURE);
        }
      }

      if (reader) {
        var signature = result.signature;

        if ((!encrypted || zipCrypto) && signature !== undefined) {
          setUint32(headerView, 10, signature);
          fileEntry.signature = signature;

          if (dataDescriptor) {
            setUint32(dataDescriptorView, dataDescriptorOffset, signature);
          }
        }

        if (zip64) {
          var rawExtraFieldZip64View = getDataView(fileEntry.rawExtraFieldZip64);
          setUint16(rawExtraFieldZip64View, 0, EXTRAFIELD_TYPE_ZIP64);
          setUint16(rawExtraFieldZip64View, 2, EXTRAFIELD_LENGTH_ZIP64);
          setUint32(headerView, 14, MAX_32_BITS);
          setBigUint64(rawExtraFieldZip64View, 12, BigInt(compressedSize));
          setUint32(headerView, 18, MAX_32_BITS);
          setBigUint64(rawExtraFieldZip64View, 4, BigInt(uncompressedSize));

          if (dataDescriptor) {
            setBigUint64(dataDescriptorView, dataDescriptorOffset + 4, BigInt(compressedSize));
            setBigUint64(dataDescriptorView, dataDescriptorOffset + 12, BigInt(uncompressedSize));
          }
        } else {
          setUint32(headerView, 14, compressedSize);
          setUint32(headerView, 18, uncompressedSize);

          if (dataDescriptor) {
            setUint32(dataDescriptorView, dataDescriptorOffset + 4, compressedSize);
            setUint32(dataDescriptorView, dataDescriptorOffset + 8, uncompressedSize);
          }
        }
      }

      return _invoke(function () {
        if (dataDescriptor) {
          return _awaitIgnored(writer.writeUint8Array(dataDescriptorArray));
        }
      }, function () {
        var length = localHeaderArray.length + compressedSize + dataDescriptorArray.length;
        Object.assign(fileEntry, {
          compressedSize: compressedSize,
          lastModDate: lastModDate,
          rawLastModDate: rawLastModDate,
          creationDate: creationDate,
          lastAccessDate: lastAccessDate,
          encrypted: encrypted,
          length: length
        });
        return fileEntry;
      });
    });
  });

  var getFileEntry = _async(function (zipWriter, name, reader, options) {
    var files = zipWriter.files;
    var writer = zipWriter.writer;
    var previousFileEntry = Array.from(files.values()).pop();
    var fileEntry = {};
    var bufferedWrite;
    var resolveLockUnbufferedWrite;
    var resolveLockCurrentFileEntry;
    files.set(name, fileEntry);
    return _finallyRethrows(function () {
      return _catch(function () {
        var lockPreviousFileEntry;
        var fileWriter;
        var lockCurrentFileEntry;

        if (options.keepOrder) {
          lockPreviousFileEntry = previousFileEntry && previousFileEntry.lock;
        }

        fileEntry.lock = lockCurrentFileEntry = new Promise(function (resolve) {
          return resolveLockCurrentFileEntry = resolve;
        });
        return _invoke(function () {
          if (options.bufferedWrite || zipWriter.lockWrite || !options.dataDescriptor) {
            fileWriter = new BlobWriter();
            fileWriter.init();
            bufferedWrite = true;
          } else {
            zipWriter.lockWrite = new Promise(function (resolve) {
              return resolveLockUnbufferedWrite = resolve;
            });
            return _invoke(function () {
              if (!writer.initialized) {
                return _awaitIgnored(writer.init());
              }
            }, function () {
              fileWriter = writer;
            });
          }
        }, function () {
          return _await(createFileEntry(reader, fileWriter, zipWriter.config, options), function (_createFileEntry) {
            fileEntry = _createFileEntry;
            fileEntry.lock = lockCurrentFileEntry;
            files.set(name, fileEntry);
            fileEntry.filename = name;
            return _invoke(function () {
              if (bufferedWrite) {
                var indexWrittenData = 0;
                var blob = fileWriter.getData();
                return _await(Promise.all([zipWriter.lockWrite, lockPreviousFileEntry]), function () {
                  var pendingFileEntry;
                  return _continue(_do(function () {
                    pendingFileEntry = Array.from(files.values()).find(function (fileEntry) {
                      return fileEntry.writingBufferedData;
                    });
                    return _invokeIgnored(function () {
                      if (pendingFileEntry) {
                        return _awaitIgnored(pendingFileEntry.lock);
                      }
                    });
                  }, function () {
                    return !!pendingFileEntry && !!pendingFileEntry.lock;
                  }), function () {
                    fileEntry.writingBufferedData = true;
                    return _invoke(function () {
                      if (!options.dataDescriptor) {
                        var headerLength = 26;
                        return _await(sliceAsArrayBuffer(blob, 0, headerLength), function (arrayBuffer) {
                          var arrayBufferView = new DataView(arrayBuffer);

                          if (!fileEntry.encrypted || options.zipCrypto) {
                            setUint32(arrayBufferView, 14, fileEntry.signature);
                          }

                          if (fileEntry.zip64) {
                            setUint32(arrayBufferView, 18, MAX_32_BITS);
                            setUint32(arrayBufferView, 22, MAX_32_BITS);
                          } else {
                            setUint32(arrayBufferView, 18, fileEntry.compressedSize);
                            setUint32(arrayBufferView, 22, fileEntry.uncompressedSize);
                          }

                          return _await(writer.writeUint8Array(new Uint8Array(arrayBuffer)), function () {
                            indexWrittenData = headerLength;
                          });
                        });
                      }
                    }, function () {
                      return _await(writeBlob(writer, blob, indexWrittenData), function () {
                        delete fileEntry.writingBufferedData;
                      });
                    });
                  });
                });
              }
            }, function () {
              fileEntry.offset = zipWriter.offset;

              if (fileEntry.zip64) {
                var rawExtraFieldZip64View = getDataView(fileEntry.rawExtraFieldZip64);
                setBigUint64(rawExtraFieldZip64View, 20, BigInt(fileEntry.offset));
              } else if (fileEntry.offset >= MAX_32_BITS) {
                throw new Error(ERR_UNSUPPORTED_FORMAT);
              }

              zipWriter.offset += fileEntry.length;
              return fileEntry;
            });
          });
        });
      }, function (error) {
        if (bufferedWrite && fileEntry.writingBufferedData || !bufferedWrite && fileEntry.dataWritten) {
          error.corruptedEntry = zipWriter.hasCorruptedEntries = true;

          if (fileEntry.uncompressedSize) {
            zipWriter.offset += fileEntry.uncompressedSize;
          }
        }

        files.delete(name);
        throw error;
      });
    }, function (_wasThrown2, _result3) {
      resolveLockCurrentFileEntry();

      if (resolveLockUnbufferedWrite) {
        resolveLockUnbufferedWrite();
      }

      return _rethrow(_wasThrown2, _result3);
    });
  });

  var addFile = _async(function (zipWriter, name, reader, options) {
    name = name.trim();

    if (options.directory && !name.endsWith(DIRECTORY_SIGNATURE)) {
      name += DIRECTORY_SIGNATURE;
    } else {
      options.directory = name.endsWith(DIRECTORY_SIGNATURE);
    }

    if (zipWriter.files.has(name)) {
      throw new Error(ERR_DUPLICATED_NAME);
    }

    var rawFilename = encodeText(name);

    if (rawFilename.length > MAX_16_BITS) {
      throw new Error(ERR_INVALID_ENTRY_NAME);
    }

    var comment = options.comment || "";
    var rawComment = encodeText(comment);

    if (rawComment.length > MAX_16_BITS) {
      throw new Error(ERR_INVALID_ENTRY_COMMENT);
    }

    var version = zipWriter.options.version || options.version || 0;

    if (version > MAX_16_BITS) {
      throw new Error(ERR_INVALID_VERSION);
    }

    var versionMadeBy = zipWriter.options.versionMadeBy || options.versionMadeBy || 20;

    if (versionMadeBy > MAX_16_BITS) {
      throw new Error(ERR_INVALID_VERSION);
    }

    var lastModDate = getOptionValue(zipWriter, options, "lastModDate") || new Date();
    var lastAccessDate = getOptionValue(zipWriter, options, "lastAccessDate");
    var creationDate = getOptionValue(zipWriter, options, "creationDate");
    var password = getOptionValue(zipWriter, options, "password");
    var encryptionStrength = getOptionValue(zipWriter, options, "encryptionStrength") || 3;
    var zipCrypto = getOptionValue(zipWriter, options, "zipCrypto");

    if (password !== undefined && encryptionStrength !== undefined && (encryptionStrength < 1 || encryptionStrength > 3)) {
      throw new Error(ERR_INVALID_ENCRYPTION_STRENGTH);
    }

    var rawExtraField = new Uint8Array(0);
    var extraField = options.extraField;

    if (extraField) {
      var extraFieldSize = 0;
      var offset = 0;
      extraField.forEach(function (data) {
        return extraFieldSize += 4 + data.length;
      });
      rawExtraField = new Uint8Array(extraFieldSize);
      extraField.forEach(function (data, type) {
        if (type > MAX_16_BITS) {
          throw new Error(ERR_INVALID_EXTRAFIELD_TYPE);
        }

        if (data.length > MAX_16_BITS) {
          throw new Error(ERR_INVALID_EXTRAFIELD_DATA);
        }

        arraySet(rawExtraField, new Uint16Array([type]), offset);
        arraySet(rawExtraField, new Uint16Array([data.length]), offset + 2);
        arraySet(rawExtraField, data, offset + 4);
        offset += 4 + data.length;
      });
    }

    var extendedTimestamp = getOptionValue(zipWriter, options, "extendedTimestamp");

    if (extendedTimestamp === undefined) {
      extendedTimestamp = true;
    }

    var maximumCompressedSize = 0;
    var keepOrder = getOptionValue(zipWriter, options, "keepOrder");

    if (keepOrder === undefined) {
      keepOrder = true;
    }

    var uncompressedSize = 0;
    var msDosCompatible = getOptionValue(zipWriter, options, "msDosCompatible");

    if (msDosCompatible === undefined) {
      msDosCompatible = true;
    }

    var internalFileAttribute = getOptionValue(zipWriter, options, "internalFileAttribute") || 0;
    var externalFileAttribute = getOptionValue(zipWriter, options, "externalFileAttribute") || 0;
    return _invoke(function () {
      if (reader) {
        return _invoke(function () {
          if (!reader.initialized) {
            return _awaitIgnored(reader.init());
          }
        }, function () {
          uncompressedSize = reader.size;
          maximumCompressedSize = getMaximumCompressedSize(uncompressedSize);
        });
      }
    }, function () {
      var zip64 = options.zip64 || zipWriter.options.zip64 || false;

      if (zipWriter.offset + zipWriter.pendingCompressedSize >= MAX_32_BITS || uncompressedSize >= MAX_32_BITS || maximumCompressedSize >= MAX_32_BITS) {
        if (options.zip64 === false || zipWriter.options.zip64 === false || !keepOrder) {
          throw new Error(ERR_UNSUPPORTED_FORMAT);
        } else {
          zip64 = true;
        }
      }

      zipWriter.pendingCompressedSize += maximumCompressedSize;
      return _await(Promise.resolve(), function () {
        var level = getOptionValue(zipWriter, options, "level");
        var useWebWorkers = getOptionValue(zipWriter, options, "useWebWorkers");
        var bufferedWrite = getOptionValue(zipWriter, options, "bufferedWrite");
        var dataDescriptor = getOptionValue(zipWriter, options, "dataDescriptor");
        var dataDescriptorSignature = getOptionValue(zipWriter, options, "dataDescriptorSignature");
        var signal = getOptionValue(zipWriter, options, "signal");

        if (dataDescriptor === undefined) {
          dataDescriptor = true;
        }

        if (dataDescriptor && dataDescriptorSignature === undefined) {
          dataDescriptorSignature = true;
        }

        return _await(getFileEntry(zipWriter, name, reader, Object.assign({}, options, {
          rawFilename: rawFilename,
          rawComment: rawComment,
          version: version,
          versionMadeBy: versionMadeBy,
          lastModDate: lastModDate,
          lastAccessDate: lastAccessDate,
          creationDate: creationDate,
          rawExtraField: rawExtraField,
          zip64: zip64,
          password: password,
          level: level,
          useWebWorkers: useWebWorkers,
          encryptionStrength: encryptionStrength,
          extendedTimestamp: extendedTimestamp,
          zipCrypto: zipCrypto,
          bufferedWrite: bufferedWrite,
          keepOrder: keepOrder,
          dataDescriptor: dataDescriptor,
          dataDescriptorSignature: dataDescriptorSignature,
          signal: signal,
          msDosCompatible: msDosCompatible,
          internalFileAttribute: internalFileAttribute,
          externalFileAttribute: externalFileAttribute
        })), function (fileEntry) {
          if (maximumCompressedSize) {
            zipWriter.pendingCompressedSize -= maximumCompressedSize;
          }

          Object.assign(fileEntry, {
            name: name,
            comment: comment,
            extraField: extraField
          });
          return new Entry(fileEntry);
        });
      });
    });
  });

  var ERR_DUPLICATED_NAME = "File already exists";
  var ERR_INVALID_COMMENT = "Zip file comment exceeds 64KB";
  var ERR_INVALID_ENTRY_COMMENT = "File entry comment exceeds 64KB";
  var ERR_INVALID_ENTRY_NAME = "File entry name exceeds 64KB";
  var ERR_INVALID_VERSION = "Version exceeds 65535";
  var ERR_INVALID_ENCRYPTION_STRENGTH = "The strength must equal 1, 2, or 3";
  var ERR_INVALID_EXTRAFIELD_TYPE = "Extra field type exceeds 65535";
  var ERR_INVALID_EXTRAFIELD_DATA = "Extra field data exceeds 64KB";
  var ERR_UNSUPPORTED_FORMAT = "Zip64 is not supported";
  var EXTRAFIELD_DATA_AES = new Uint8Array([0x07, 0x00, 0x02, 0x00, 0x41, 0x45, 0x03, 0x00, 0x00]);
  var EXTRAFIELD_LENGTH_ZIP64 = 24;
  var workers = 0;

  var ZipWriter = /*#__PURE__*/function () {
    function ZipWriter(writer) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, ZipWriter);

      Object.assign(this, {
        writer: writer,
        options: options,
        config: getConfiguration(),
        files: new Map(),
        offset: writer.size,
        pendingCompressedSize: 0,
        pendingEntries: []
      });
    }

    _createClass(ZipWriter, [{
      key: "add",
      value: function add() {
        var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
        var reader = arguments.length > 1 ? arguments[1] : undefined;
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        try {
          var _this2 = this;

          var zipWriter = _this2;
          return _await(function () {
            if (workers < zipWriter.config.maxWorkers) {
              workers++;
              return _finallyRethrows(function () {
                return _await(addFile(zipWriter, name, reader, options));
              }, function (_wasThrown, _result) {
                workers--;
                var pendingEntry = zipWriter.pendingEntries.shift();

                if (pendingEntry) {
                  zipWriter.add(pendingEntry.name, pendingEntry.reader, pendingEntry.options).then(pendingEntry.resolve).catch(pendingEntry.reject);
                }

                return _rethrow(_wasThrown, _result);
              });
            } else {
              return new Promise(function (resolve, reject) {
                return zipWriter.pendingEntries.push({
                  name: name,
                  reader: reader,
                  options: options,
                  resolve: resolve,
                  reject: reject
                });
              });
            }
          }());
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }, {
      key: "close",
      value: function close(comment) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        try {
          var _this4 = this;

          if (comment === undefined) comment = new Uint8Array(0);
          return _await(closeFile(_this4, comment, options), function () {
            return _this4.writer.getData();
          });
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }]);

    return ZipWriter;
  }();

  function sliceAsArrayBuffer(blob, start, end) {
    if (blob.arrayBuffer) {
      if (start || end) {
        return blob.slice(start, end).arrayBuffer();
      } else {
        return blob.arrayBuffer();
      }
    } else {
      var fileReader = new FileReader();
      return new Promise(function (resolve, reject) {
        fileReader.onload = function (event) {
          return resolve(event.target.result);
        };

        fileReader.onerror = function () {
          return reject(fileReader.error);
        };

        fileReader.readAsArrayBuffer(start || end ? blob.slice(start, end) : blob);
      });
    }
  }

  function getTimeNTFS(date) {
    if (date) {
      return (BigInt(date.getTime()) + BigInt(11644473600000)) * BigInt(10000);
    }
  }

  function getOptionValue(zipWriter, options, name) {
    return options[name] === undefined ? zipWriter.options[name] : options[name];
  }

  function getMaximumCompressedSize(uncompressedSize) {
    return uncompressedSize + 5 * (Math.floor(uncompressedSize / 16383) + 1);
  }

  function setUint8(view, offset, value) {
    view.setUint8(offset, value);
  }

  function setUint16(view, offset, value) {
    view.setUint16(offset, value, true);
  }

  function setUint32(view, offset, value) {
    view.setUint32(offset, value, true);
  }

  function setBigUint64(view, offset, value) {
    view.setBigUint64(offset, value, true);
  }

  function arraySet(array, typedArray, offset) {
    array.set(typedArray, offset);
  }

  function getDataView(array) {
    return new DataView(array.buffer);
  }

  var pipe = function pipe(reader, writer) {
    var copyChunk = _async(function () {
      var chunkIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var index = chunkIndex * CHUNK_SIZE;

      if (index < reader.size) {
        return _await(reader.readUint8Array(index, Math.min(CHUNK_SIZE, reader.size - index)), function (array) {
          return _await(writer.writeUint8Array(array), function () {
            return copyChunk(chunkIndex + 1);
          });
        });
      } else {
        return writer.getData();
      }
    });

    return copyChunk();
  };

  var _addFileSystemEntry = _async(function (zipEntry, fileSystemEntry) {
    var addDirectory = _async(function (zipEntry, fileEntry) {
      return _await(getChildren(fileEntry), function (children) {
        return _continueIgnored(_forOf(children, function (child) {
          return _invokeIgnored(function () {
            if (child.isDirectory) {
              return _awaitIgnored(addDirectory(zipEntry.addDirectory(child.name), child));
            } else {
              return _awaitIgnored(new Promise(function (resolve, reject) {
                child.file(function (file) {
                  var childZipEntry = zipEntry.addBlob(child.name, file);
                  childZipEntry.uncompressedSize = file.size;
                  resolve(childZipEntry);
                }, reject);
              }));
            }
          });
        }));
      });
    });

    function getChildren(fileEntry) {
      return new Promise(function (resolve, reject) {
        var entries = [];

        if (fileEntry.isDirectory) {
          readEntries(fileEntry.createReader());
        }

        if (fileEntry.isFile) {
          resolve(entries);
        }

        function readEntries(directoryReader) {
          directoryReader.readEntries(function (temporaryEntries) {
            if (!temporaryEntries.length) {
              resolve(entries);
            } else {
              entries = entries.concat(temporaryEntries);
              readEntries(directoryReader);
            }
          }, reject);
        }
      });
    }

    if (fileSystemEntry.isDirectory) {
      var entry = zipEntry.addDirectory(fileSystemEntry.name);
      return _await(addDirectory(entry, fileSystemEntry), function () {
        return entry;
      });
    } else {
      return new Promise(function (resolve, reject) {
        return fileSystemEntry.file(function (file) {
          return resolve(zipEntry.addBlob(fileSystemEntry.name, file));
        }, reject);
      });
    }
  });

  var _exportZip = _async(function (zipWriter, entry, totalSize, options) {
    var process = _async(function (zipWriter, entry) {
      var processChild = _async(function (child) {
        var name = options.relativePath ? child.getRelativeName(selectedEntry) : child.getFullname();
        return _await(zipWriter.add(name, child.reader, Object.assign({
          directory: child.directory
        }, Object.assign({}, options, {
          onprogress: function onprogress(indexProgress) {
            if (options.onprogress) {
              entryOffsets.set(name, indexProgress);

              try {
                options.onprogress(Array.from(entryOffsets.values()).reduce(function (previousValue, currentValue) {
                  return previousValue + currentValue;
                }), totalSize);
              } catch (error) {// ignored
              }
            }
          }
        }))), function () {
          return _awaitIgnored(process(zipWriter, child));
        });
      });

      var exportChild = _async(function () {
        return _invokeIgnored(function () {
          if (options.bufferedWrite) {
            return _awaitIgnored(Promise.all(entry.children.map(processChild)));
          } else {
            return _continueIgnored(_forOf(entry.children, function (child) {
              return _awaitIgnored(processChild(child));
            }));
          }
        });
      });

      return _callIgnored(exportChild);
    });

    var selectedEntry = entry;
    var entryOffsets = new Map();
    return _awaitIgnored(process(zipWriter, entry));
  });

  var initReaders = _async(function (entry) {
    return _invokeIgnored(function () {
      if (entry.children.length) {
        return _continueIgnored(_forOf(entry.children, function (child) {
          return _invokeIgnored(function () {
            if (child.directory) {
              return _awaitIgnored(initReaders(child));
            } else {
              child.reader = new child.Reader(child.data);
              return _await(child.reader.init(), function () {
                child.uncompressedSize = child.reader.size;
              });
            }
          });
        }));
      }
    });
  });
  var CHUNK_SIZE = 512 * 1024;

  var ZipEntry = /*#__PURE__*/function () {
    function ZipEntry(fs, name, params, parent) {
      _classCallCheck(this, ZipEntry);

      var zipEntry = this;

      if (fs.root && parent && parent.getChildByName(name)) {
        throw new Error("Entry filename already exists");
      }

      if (!params) {
        params = {};
      }

      Object.assign(zipEntry, {
        fs: fs,
        name: name,
        data: params.data,
        id: fs.entries.length,
        parent: parent,
        children: [],
        uncompressedSize: 0
      });
      fs.entries.push(zipEntry);

      if (parent) {
        zipEntry.parent.children.push(zipEntry);
      }
    }

    _createClass(ZipEntry, [{
      key: "moveTo",
      value: function moveTo(target) {
        // deprecated
        var zipEntry = this;
        zipEntry.fs.move(zipEntry, target);
      }
    }, {
      key: "getFullname",
      value: function getFullname() {
        return this.getRelativeName();
      }
    }, {
      key: "getRelativeName",
      value: function getRelativeName() {
        var ancestor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.fs.root;
        var zipEntry = this;
        var relativeName = zipEntry.name;
        var entry = zipEntry.parent;

        while (entry && entry != ancestor) {
          relativeName = (entry.name ? entry.name + "/" : "") + relativeName;
          entry = entry.parent;
        }

        return relativeName;
      }
    }, {
      key: "isDescendantOf",
      value: function isDescendantOf(ancestor) {
        var entry = this.parent;

        while (entry && entry.id != ancestor.id) {
          entry = entry.parent;
        }

        return Boolean(entry);
      }
    }]);

    return ZipEntry;
  }();

  var ZipFileEntry = /*#__PURE__*/function (_ZipEntry) {
    _inherits(ZipFileEntry, _ZipEntry);

    var _super = _createSuper(ZipFileEntry);

    function ZipFileEntry(fs, name, params, parent) {
      var _this;

      _classCallCheck(this, ZipFileEntry);

      _this = _super.call(this, fs, name, params, parent);

      var zipEntry = _assertThisInitialized(_this);

      zipEntry.Reader = params.Reader;
      zipEntry.Writer = params.Writer;

      if (params.getData) {
        zipEntry.getData = params.getData;
      }

      return _this;
    }

    _createClass(ZipFileEntry, [{
      key: "getData",
      value: function getData(writer) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        try {
          var _this3 = this;

          var zipEntry = _this3;

          if (!writer || writer.constructor == zipEntry.Writer && zipEntry.data) {
            return _await(zipEntry.data);
          } else {
            zipEntry.reader = new zipEntry.Reader(zipEntry.data, options);
            return _await(zipEntry.reader.init(), function () {
              return _invoke(function () {
                if (!writer.initialized) {
                  return _awaitIgnored(writer.init());
                }
              }, function () {
                zipEntry.uncompressedSize = zipEntry.reader.size;
                return pipe(zipEntry.reader, writer);
              });
            });
          }
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }, {
      key: "getText",
      value: function getText(encoding, options) {
        return this.getData(new TextWriter(encoding), options);
      }
    }, {
      key: "getBlob",
      value: function getBlob(mimeType, options) {
        return this.getData(new BlobWriter(mimeType), options);
      }
    }, {
      key: "getData64URI",
      value: function getData64URI(mimeType, options) {
        return this.getData(new Data64URIWriter(mimeType), options);
      }
    }, {
      key: "getUint8Array",
      value: function getUint8Array(options) {
        return this.getData(new Uint8ArrayWriter(), options);
      }
    }, {
      key: "replaceBlob",
      value: function replaceBlob(blob) {
        Object.assign(this, {
          data: blob,
          Reader: BlobReader,
          Writer: BlobWriter,
          reader: null
        });
      }
    }, {
      key: "replaceText",
      value: function replaceText(text) {
        Object.assign(this, {
          data: text,
          Reader: TextReader,
          Writer: TextWriter,
          reader: null
        });
      }
    }, {
      key: "replaceData64URI",
      value: function replaceData64URI(dataURI) {
        Object.assign(this, {
          data: dataURI,
          Reader: Data64URIReader,
          Writer: Data64URIWriter,
          reader: null
        });
      }
    }, {
      key: "replaceUint8Array",
      value: function replaceUint8Array(array) {
        Object.assign(this, {
          data: array,
          Reader: Uint8ArrayReader,
          Writer: Uint8ArrayWriter,
          reader: null
        });
      }
    }]);

    return ZipFileEntry;
  }(ZipEntry);

  var ZipDirectoryEntry = /*#__PURE__*/function (_ZipEntry2) {
    _inherits(ZipDirectoryEntry, _ZipEntry2);

    var _super2 = _createSuper(ZipDirectoryEntry);

    function ZipDirectoryEntry(fs, name, params, parent) {
      var _this4;

      _classCallCheck(this, ZipDirectoryEntry);

      _this4 = _super2.call(this, fs, name, params, parent);
      _this4.directory = true;
      return _this4;
    }

    _createClass(ZipDirectoryEntry, [{
      key: "addDirectory",
      value: function addDirectory(name) {
        return addChild(this, name, null, true);
      }
    }, {
      key: "addText",
      value: function addText(name, text) {
        return addChild(this, name, {
          data: text,
          Reader: TextReader,
          Writer: TextWriter
        });
      }
    }, {
      key: "addBlob",
      value: function addBlob(name, blob) {
        return addChild(this, name, {
          data: blob,
          Reader: BlobReader,
          Writer: BlobWriter
        });
      }
    }, {
      key: "addData64URI",
      value: function addData64URI(name, dataURI) {
        return addChild(this, name, {
          data: dataURI,
          Reader: Data64URIReader,
          Writer: Data64URIWriter
        });
      }
    }, {
      key: "addUint8Array",
      value: function addUint8Array(name, array) {
        return addChild(this, name, {
          data: array,
          Reader: Uint8ArrayReader,
          Writer: Uint8ArrayWriter
        });
      }
    }, {
      key: "addHttpContent",
      value: function addHttpContent(name, url) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        return addChild(this, name, {
          data: url,
          Reader: /*#__PURE__*/function (_HttpReader) {
            _inherits(Reader, _HttpReader);

            var _super3 = _createSuper(Reader);

            function Reader(url) {
              _classCallCheck(this, Reader);

              return _super3.call(this, url, options);
            }

            return _createClass(Reader);
          }(HttpReader)
        });
      }
    }, {
      key: "addFileSystemEntry",
      value: function addFileSystemEntry(fileSystemEntry) {
        var _this5 = this;

        return _addFileSystemEntry(_this5, fileSystemEntry);
      }
    }, {
      key: "addData",
      value: function addData(name, params) {
        try {
          var _this7 = this;

          return _await(addChild(_this7, name, params));
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }, {
      key: "importBlob",
      value: function importBlob(blob) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        try {
          var _this9 = this;

          return _await(_awaitIgnored(_this9.importZip(new BlobReader(blob), options)));
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }, {
      key: "importData64URI",
      value: function importData64URI(dataURI) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        try {
          var _this11 = this;

          return _await(_awaitIgnored(_this11.importZip(new Data64URIReader(dataURI), options)));
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }, {
      key: "importUint8Array",
      value: function importUint8Array(array) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        try {
          var _this13 = this;

          return _await(_awaitIgnored(_this13.importZip(new Uint8ArrayReader(array), options)));
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }, {
      key: "importHttpContent",
      value: function importHttpContent(url) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        try {
          var _this15 = this;

          return _await(_awaitIgnored(_this15.importZip(new HttpReader(url, options), options)));
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }, {
      key: "exportBlob",
      value: function exportBlob() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        try {
          var _this17 = this;

          return _await(_this17.exportZip(new BlobWriter("application/zip"), options));
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }, {
      key: "exportData64URI",
      value: function exportData64URI() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        try {
          var _this19 = this;

          return _await(_this19.exportZip(new Data64URIWriter("application/zip"), options));
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }, {
      key: "exportUint8Array",
      value: function exportUint8Array() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        try {
          var _this21 = this;

          return _await(_this21.exportZip(new Uint8ArrayWriter(), options));
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }, {
      key: "importZip",
      value: function importZip(reader, options) {
        try {
          var _this23 = this;

          return _await(_invoke(function () {
            if (!reader.initialized) {
              return _awaitIgnored(reader.init());
            }
          }, function () {
            var zipReader = new ZipReader(reader, options);
            return _await(zipReader.getEntries(), function (entries) {
              entries.forEach(function (entry) {
                var parent = _this23;
                var path = entry.filename.split("/");
                var name = path.pop();
                path.forEach(function (pathPart) {
                  return parent = parent.getChildByName(pathPart) || new ZipDirectoryEntry(_this23.fs, pathPart, null, parent);
                });

                if (!entry.directory) {
                  addChild(parent, name, {
                    data: entry,
                    Reader: getZipBlobReader(Object.assign({}, options))
                  });
                }
              });
            });
          }));
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }, {
      key: "exportZip",
      value: function exportZip(writer, options) {
        var _this24 = this;

        var zipEntry = _this24;
        return _await(initReaders(zipEntry), function () {
          return _await(writer.init(), function () {
            var zipWriter = new ZipWriter(writer, options);
            return _await(_exportZip(zipWriter, zipEntry, getTotalSize([zipEntry], "uncompressedSize"), options), function () {
              return _await(zipWriter.close(), function () {
                return writer.getData();
              });
            });
          });
        });
      }
    }, {
      key: "getChildByName",
      value: function getChildByName(name) {
        var children = this.children;

        for (var childIndex = 0; childIndex < children.length; childIndex++) {
          var child = children[childIndex];

          if (child.name == name) {
            return child;
          }
        }
      }
    }]);

    return ZipDirectoryEntry;
  }(ZipEntry);

  var FS = /*#__PURE__*/function () {
    function FS() {
      _classCallCheck(this, FS);

      resetFS(this);
    }

    _createClass(FS, [{
      key: "children",
      get: function get() {
        return this.root.children;
      }
    }, {
      key: "remove",
      value: function remove(entry) {
        detach(entry);
        this.entries[entry.id] = null;
      }
    }, {
      key: "move",
      value: function move(entry, destination) {
        if (entry == this.root) {
          throw new Error("Root directory cannot be moved");
        } else {
          if (destination.directory) {
            if (!destination.isDescendantOf(entry)) {
              if (entry != destination) {
                if (destination.getChildByName(entry.name)) {
                  throw new Error("Entry filename already exists");
                }

                detach(entry);
                entry.parent = destination;
                destination.children.push(entry);
              }
            } else {
              throw new Error("Entry is a ancestor of target entry");
            }
          } else {
            throw new Error("Target entry is not a directory");
          }
        }
      }
    }, {
      key: "find",
      value: function find(fullname) {
        var path = fullname.split("/");
        var node = this.root;

        for (var index = 0; node && index < path.length; index++) {
          node = node.getChildByName(path[index]);
        }

        return node;
      }
    }, {
      key: "getById",
      value: function getById(id) {
        return this.entries[id];
      }
    }, {
      key: "getChildByName",
      value: function getChildByName(name) {
        return this.root.getChildByName(name);
      }
    }, {
      key: "addDirectory",
      value: function addDirectory(name) {
        return this.root.addDirectory(name);
      }
    }, {
      key: "addText",
      value: function addText(name, text) {
        return this.root.addText(name, text);
      }
    }, {
      key: "addBlob",
      value: function addBlob(name, blob) {
        return this.root.addBlob(name, blob);
      }
    }, {
      key: "addData64URI",
      value: function addData64URI(name, dataURI) {
        return this.root.addData64URI(name, dataURI);
      }
    }, {
      key: "addHttpContent",
      value: function addHttpContent(name, url, options) {
        return this.root.addHttpContent(name, url, options);
      }
    }, {
      key: "addFileSystemEntry",
      value: function addFileSystemEntry(fileSystemEntry) {
        try {
          var _this26 = this;

          return _await(_this26.root.addFileSystemEntry(fileSystemEntry));
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }, {
      key: "addData",
      value: function addData(name, params) {
        try {
          var _this28 = this;

          return _await(_this28.root.addData(name, params));
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }, {
      key: "importBlob",
      value: function importBlob(blob, options) {
        try {
          var _this30 = this;

          resetFS(_this30);
          return _await(_awaitIgnored(_this30.root.importBlob(blob, options)));
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }, {
      key: "importData64URI",
      value: function importData64URI(dataURI, options) {
        try {
          var _this32 = this;

          resetFS(_this32);
          return _await(_awaitIgnored(_this32.root.importData64URI(dataURI, options)));
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }, {
      key: "importHttpContent",
      value: function importHttpContent(url, options) {
        try {
          var _this34 = this;

          resetFS(_this34);
          return _await(_awaitIgnored(_this34.root.importHttpContent(url, options)));
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }, {
      key: "exportBlob",
      value: function exportBlob(options) {
        try {
          var _this36 = this;

          return _await(_this36.root.exportBlob(options));
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }, {
      key: "exportData64URI",
      value: function exportData64URI(options) {
        try {
          var _this38 = this;

          return _await(_this38.root.exportData64URI(options));
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }]);

    return FS;
  }();

  var fs = {
    FS: FS,
    ZipDirectoryEntry: ZipDirectoryEntry,
    ZipFileEntry: ZipFileEntry
  };

  function getTotalSize(entries, propertyName) {
    var size = 0;
    entries.forEach(process);
    return size;

    function process(entry) {
      size += entry[propertyName];

      if (entry.children) {
        entry.children.forEach(process);
      }
    }
  }

  function getZipBlobReader(options) {
    return /*#__PURE__*/function (_Reader) {
      _inherits(_class, _Reader);

      var _super4 = _createSuper(_class);

      function _class(entry) {
        var _this39;

        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, _class);

        _this39 = _super4.call(this);
        _this39.entry = entry;
        _this39.options = options;
        return _this39;
      }

      _createClass(_class, [{
        key: "init",
        value: function init() {
          try {
            var _this41 = this;

            var zipBlobReader = _this41;
            zipBlobReader.size = zipBlobReader.entry.uncompressedSize;
            return _await(zipBlobReader.entry.getData(new BlobWriter(), Object.assign({}, zipBlobReader.options, options)), function (data) {
              zipBlobReader.data = data;
              zipBlobReader.blobReader = new BlobReader(data);
            });
          } catch (e) {
            return Promise.reject(e);
          }
        }
      }, {
        key: "readUint8Array",
        value: function readUint8Array(index, length) {
          try {
            var _this43 = this;

            return _await(_this43.blobReader.readUint8Array(index, length));
          } catch (e) {
            return Promise.reject(e);
          }
        }
      }]);

      return _class;
    }(Reader);
  }

  function detach(entry) {
    var children = entry.parent.children;
    children.forEach(function (child, index) {
      if (child.id == entry.id) {
        children.splice(index, 1);
      }
    });
  }

  function resetFS(fs) {
    fs.entries = [];
    fs.root = new ZipDirectoryEntry(fs);
  }

  function addChild(parent, name, params, directory) {
    if (parent.directory) {
      return directory ? new ZipDirectoryEntry(parent.fs, name, params, parent) : new ZipFileEntry(parent.fs, name, params, parent);
    } else {
      throw new Error("Parent entry is not a directory");
    }
  }

  /*
   Copyright (c) 2022 Gildas Lormeau. All rights reserved.

   Redistribution and use in source and binary forms, with or without
   modification, are permitted provided that the following conditions are met:

   1. Redistributions of source code must retain the above copyright notice,
   this list of conditions and the following disclaimer.

   2. Redistributions in binary form must reproduce the above copyright 
   notice, this list of conditions and the following disclaimer in 
   the documentation and/or other materials provided with the distribution.

   3. The names of the authors may not be used to endorse or promote products
   derived from this software without specific prior written permission.

   THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
   INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
   FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
   INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
   INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
   LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
   OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
   EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   */
  var baseURL;

  try {
    baseURL = (typeof document === 'undefined' && typeof location === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : typeof document === 'undefined' ? location.href : (document.currentScript && document.currentScript.src || new URL('zip-fs-full-es5.js', document.baseURI).href));
  } catch (error) {// ignored
  }

  configure({
    baseURL: baseURL
  });
  d(configure);

  /*
   Copyright (c) 2022 Gildas Lormeau. All rights reserved.

   Redistribution and use in source and binary forms, with or without
   modification, are permitted provided that the following conditions are met:

   1. Redistributions of source code must retain the above copyright notice,
   this list of conditions and the following disclaimer.

   2. Redistributions in binary form must reproduce the above copyright 
   notice, this list of conditions and the following disclaimer in 
   the documentation and/or other materials provided with the distribution.

   3. The names of the authors may not be used to endorse or promote products
   derived from this software without specific prior written permission.

   THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
   INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
   FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
   INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
   INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
   LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
   OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
   EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   */
  configure({
    Deflate: ZipDeflate,
    Inflate: ZipInflate
  });

  exports.BlobReader = BlobReader;
  exports.BlobWriter = BlobWriter;
  exports.Data64URIReader = Data64URIReader;
  exports.Data64URIWriter = Data64URIWriter;
  exports.ERR_ABORT = ERR_ABORT;
  exports.ERR_BAD_FORMAT = ERR_BAD_FORMAT;
  exports.ERR_CENTRAL_DIRECTORY_NOT_FOUND = ERR_CENTRAL_DIRECTORY_NOT_FOUND;
  exports.ERR_DUPLICATED_NAME = ERR_DUPLICATED_NAME;
  exports.ERR_ENCRYPTED = ERR_ENCRYPTED;
  exports.ERR_EOCDR_LOCATOR_ZIP64_NOT_FOUND = ERR_EOCDR_LOCATOR_ZIP64_NOT_FOUND;
  exports.ERR_EOCDR_NOT_FOUND = ERR_EOCDR_NOT_FOUND;
  exports.ERR_EOCDR_ZIP64_NOT_FOUND = ERR_EOCDR_ZIP64_NOT_FOUND;
  exports.ERR_EXTRAFIELD_ZIP64_NOT_FOUND = ERR_EXTRAFIELD_ZIP64_NOT_FOUND;
  exports.ERR_HTTP_RANGE = ERR_HTTP_RANGE;
  exports.ERR_INVALID_COMMENT = ERR_INVALID_COMMENT;
  exports.ERR_INVALID_ENCRYPTION_STRENGTH = ERR_INVALID_ENCRYPTION_STRENGTH;
  exports.ERR_INVALID_ENTRY_COMMENT = ERR_INVALID_ENTRY_COMMENT;
  exports.ERR_INVALID_ENTRY_NAME = ERR_INVALID_ENTRY_NAME;
  exports.ERR_INVALID_EXTRAFIELD_DATA = ERR_INVALID_EXTRAFIELD_DATA;
  exports.ERR_INVALID_EXTRAFIELD_TYPE = ERR_INVALID_EXTRAFIELD_TYPE;
  exports.ERR_INVALID_PASSWORD = ERR_INVALID_PASSWORD;
  exports.ERR_INVALID_SIGNATURE = ERR_INVALID_SIGNATURE;
  exports.ERR_INVALID_VERSION = ERR_INVALID_VERSION;
  exports.ERR_LOCAL_FILE_HEADER_NOT_FOUND = ERR_LOCAL_FILE_HEADER_NOT_FOUND;
  exports.ERR_UNSUPPORTED_COMPRESSION = ERR_UNSUPPORTED_COMPRESSION;
  exports.ERR_UNSUPPORTED_ENCRYPTION = ERR_UNSUPPORTED_ENCRYPTION;
  exports.ERR_UNSUPPORTED_FORMAT = ERR_UNSUPPORTED_FORMAT;
  exports.HttpRangeReader = HttpRangeReader;
  exports.HttpReader = HttpReader;
  exports.Reader = Reader;
  exports.TextReader = TextReader;
  exports.TextWriter = TextWriter;
  exports.Uint8ArrayReader = Uint8ArrayReader;
  exports.Uint8ArrayWriter = Uint8ArrayWriter;
  exports.WritableStreamWriter = WritableStreamWriter;
  exports.Writer = Writer;
  exports.ZipReader = ZipReader;
  exports.ZipWriter = ZipWriter;
  exports.configure = configure;
  exports.fs = fs;
  exports.getMimeType = getMimeType;
  exports.initShimAsyncCodec = streamCodecShim;
  exports.terminateWorkers = terminateWorkers;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
