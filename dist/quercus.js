var Quercus = (function () {
  'use strict';

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
    return Constructor;
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
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null) return null;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
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
    }

    return _assertThisInitialized(self);
  }

  /**
   * Checks if the value has a certain type-string.
   *
   * @function isTypeOf
   * @memberof Is
   * @since 1.0.0
   * @param {any} val
   * @param {string} type
   * @returns {boolean}
   * @example
   * isTypeOf({}, "object")
   * // => true
   *
   * isTypeOf([], "object")
   * // => true
   *
   * isTypeOf("foo", "string")
   * // => true
   *
   * @example
   * isTypeOf("foo", "number")
   * // => false
   */
  /**
   * Checks if the value is an instance of a target constructor.
   *
   * @function isInstanceOf
   * @memberof Is
   * @since 1.0.0
   * @param {any} val
   * @param {Class} target
   * @returns {boolean}
   * @example
   * isInstanceOf({}, Object)
   * // => true
   *
   * isInstanceOf([], Object)
   * // => true
   *
   * isInstanceOf([], Array)
   * // => true
   *
   * @example
   * isInstanceOf({}, Array)
   * // => false
   *
   * isInstanceOf([], Map)
   * // => false
   */

  const isInstanceOf = (val, target) => val instanceof target;

  /**
   * Resolves path through Quercus instances.
   *
   * @private
   * @since 1.0.0
   * @param {Quercus} targetOld starting target for resolving.
   * @param {any[]} path path to resolve.
   * @param {boolean} [createMissing=false] if requested instances should be created if they don't exist.
   * @returns {object} resolved path object.
   * @example
   * const q = new Quercus([["foo", "bar"], 5]);
   *
   * resolvePath(q, ["foo", "bar"])
   * // => {target: Quercus{"bar": 5}, key: "bar", success: true}
   */

  var resolvePath = function resolvePath(targetOld, path) {
    var createMissing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var target = targetOld;
    var key = path[0];
    var success = true;

    if (path.length > 1) {
      var sub = targetOld.get(key);
      /**
       * Does the key exist on the target?
       *     true  -> assign it
       *     false ->
       *         Is createMissing truthy?
       *             true  -> Create a new Quercus; assign it and set it on the parent
       *             false -> declare unsuccessful, abort
       */

      if (targetOld.has(key) && Quercus.isQuercus(sub)) {
        target = sub;
      } else {
        if (createMissing) {
          target = new Quercus();
          targetOld.set(key, target);
        } else {
          success = false;
        }
      } // Assign the next key


      key = path[1];
    }

    if (path.length > 2 && success) {
      return resolvePath(target, path.slice(1), createMissing);
    }

    return {
      target: target,
      key: key,
      success: success
    };
  };

  /**
   * Quercus main class.
   *
   * @class
   * @since 1.0.0
   * @extends Map
   */

  var Quercus =
  /*#__PURE__*/
  function (_Map) {
    _inherits(Quercus, _Map);

    _createClass(Quercus, null, [{
      key: "isQuercus",

      /**
       * Checks if a value is a Quercus instance.
       *
       * @static
       * @since 1.0.0
       * @param {any} val value to check.
       * @returns {boolean} if the value is a Quercus instance.
       * @example
       * const q = new Quercus([["foo", "bar"], 5]);
       *
       * Quercus.isQuercus(q)
       * // => true
       *
       * Quercus.isQuercus(q.getPath(["foo"]))
       * // => true
       *
       * Quercus.isQuercus("foo")
       * // => false
       */
      value: function isQuercus(val) {
        return isInstanceOf(val, Quercus);
      }
      /**
       * Quercus main class constructor.
       *
       * @constructor
       * @since 1.0.0
       * @param {Array<Array<any>, any>} [pairArr=[]] Optional array of path-value pairs to init.
       * @example
       * // Empty tree
       * const q = new Quercus();
       *
       * // Tree initialized with a path-value pair
       * const q2 = new Quercus([["foo", bar], 5]);
       */

    }]);

    function Quercus() {
      var _this;

      var pairArr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      _classCallCheck(this, Quercus);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Quercus).call(this));
      pairArr.forEach(function (pair) {
        return _this.setPath(pair[0], pair[1]);
      });
      return _this;
    }
    /**
     * Checks if a given path exists.
     *
     * @since 1.0.0
     * @param {any[]} path path to check.
     * @param {boolean} [quercusNodesAreTruthy=false] if nodes should be considered t be truthy.
     * @returns {boolean} if the given path exists.
     * @example
     * const q = new Quercus([
     *       [["foo", "bar"], 5],
     *       [["foo", "bizz"], 12],
     *       [["bar", "fazz"], 560]
     *   ]);
     *
     * q.hasPath(["foo", "bar"]);
     * // => true
     *
     * q.hasPath(["foo"]);
     * // => false
     *
     * q.hasPath(["foo"], true);
     * // => true
     */


    _createClass(Quercus, [{
      key: "hasPath",
      value: function hasPath$$1(path) {
        var quercusNodesAreTruthy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        if (path.length === 0) {
          return quercusNodesAreTruthy;
        }

        var _resolvePath = resolvePath(this, path),
            target = _resolvePath.target,
            key = _resolvePath.key,
            success = _resolvePath.success;

        if (success && target.has(key)) {
          if (!quercusNodesAreTruthy) {
            return !Quercus.isQuercus(target.get(key));
          }

          return true;
        }

        return false;
      }
      /**
       * Returns value of a given path.
       *
       * If the path could not be found, null is returned.
       *
       * @since 1.0.0
       * @param {any[]} path path to get.
       * @returns {any|null} value of the node, or null if it is not found.
       * @example
       * const q = new Quercus([
       *       [["foo", "bar"], 5],
       *       [["foo", "bizz"], 12],
       *       [["bar", "fazz"], 560]
       *   ]);
       *
       * q.getPath(["foo", "bar"]);
       * // => 5
       *
       * q.getPath(["bar"]);
       * // => Quercus{"fazz": 560}
       *
       * q.getPath(["lorem"]);
       * // => null
       */

    }, {
      key: "getPath",
      value: function getPath$$1(path) {
        if (path.length === 0) {
          return this;
        }

        var _resolvePath2 = resolvePath(this, path),
            target = _resolvePath2.target,
            key = _resolvePath2.key,
            success = _resolvePath2.success;

        return success && target.has(key) ? target.get(key) : null;
      }
      /**
       * Sets value of a given path.
       *
       * If the given path is empty, null is returned.
       * If the value was set successfully, the value's Node is returned.
       *
       * @since 1.0.0
       * @param {any[]} path path to set.
       * @param {any} val value to set.
       * @returns {Quercus|null} the node that was set on, or null if it could not be set.
       * @example
       * const q = new Quercus();
       *
       * q.setPath(["foo", "bar"], 5);
       * // => Quercus{"bar": 5}
       *
       * q.setPath(["bar", "fazz"], 560);
       * // => Quercus{"fazz": 560}
       *
       * q.setPath([], "foo");
       * // => null
       */

    }, {
      key: "setPath",
      value: function setPath(path, val) {
        if (path.length === 0) {
          return null;
        }

        var _resolvePath3 = resolvePath(this, path, true),
            target = _resolvePath3.target,
            key = _resolvePath3.key;

        target.set(key, val);
        return target;
      }
    }]);

    return Quercus;
  }(_wrapNativeSuper(Map));

  return Quercus;

}());
//# sourceMappingURL=quercus.js.map
