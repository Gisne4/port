/*!
 * Copyright (c) 2017 NAVER Corp.
 * @egjs/jquery-transform project is licensed under the MIT license
 *
 * @egjs/jquery-transform JavaScript library
 *
 *
 * @version 2.0.0
 */
!(function (e, r) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = r(require("jquery")))
    : "function" == typeof define && define.amd
    ? define("$Transform", ["jquery"], r)
    : "object" == typeof exports
    ? (exports.$Transform = r(require("jquery")))
    : ((e.eg = e.eg || {}), (e.eg.$Transform = r(e.jQuery)));
})(this, function (e) {
  return (function (e) {
    function __webpack_require__(t) {
      if (r[t]) return r[t].exports;
      var n = (r[t] = { i: t, l: !1, exports: {} });
      return (
        e[t].call(n.exports, n, n.exports, __webpack_require__),
        (n.l = !0),
        n.exports
      );
    }
    var r = {};
    return (
      (__webpack_require__.m = e),
      (__webpack_require__.c = r),
      (__webpack_require__.i = function (e) {
        return e;
      }),
      (__webpack_require__.d = function (e, r, t) {
        __webpack_require__.o(e, r) ||
          Object.defineProperty(e, r, {
            configurable: !1,
            enumerable: !0,
            get: t,
          });
      }),
      (__webpack_require__.n = function (e) {
        var r =
          e && e.__esModule
            ? function () {
                return e["default"];
              }
            : function () {
                return e;
              };
        return __webpack_require__.d(r, "a", r), r;
      }),
      (__webpack_require__.o = function (e, r) {
        return Object.prototype.hasOwnProperty.call(e, r);
      }),
      (__webpack_require__.p = ""),
      __webpack_require__((__webpack_require__.s = 2))
    );
  })([
    function (r, t) {
      r.exports = e;
    },
    function (e, r, t) {
      "use strict";
      function toMatrixArray(e) {
        if (!e || "none" === e)
          return ["matrix", ["1", "0", "0", "1", "0", "0"]];
        var r = e.replace(/\s/g, "").match(/(matrix)(3d)*\((.*)\)/);
        return [r[1] + (r[2] || ""), r[3].split(",")];
      }
      function toMatrix3d(e) {
        var r = e[0],
          t = e[1];
        return "matrix3d" === r
          ? e
          : [
              r + "3d",
              [
                t[0],
                t[1],
                "0",
                "0",
                t[2],
                t[3],
                "0",
                "0",
                "0",
                "0",
                "1",
                "0",
                t[4],
                t[5],
                "0",
                "1",
              ],
            ];
      }
      function unit(e) {
        return e.indexOf("translate") >= 0
          ? "px"
          : e.indexOf("rotate") >= 0
          ? "deg"
          : "";
      }
      function getConverted(e, r) {
        var t = e,
          n = e.match(/((-|\+)*[0-9]+)%/);
        return (
          n && n.length >= 1
            ? (t = r * (parseFloat(n[1]) / 100) + "px")
            : -1 === e.indexOf("px") && (t = e + "px"),
          t
        );
      }
      function toParsedFloat(e) {
        var r = e.match(/((-|\+)*[\d|.]+)(px|deg|rad)*/),
          t = void 0;
        return (
          r && r.length >= 1 && (t = { num: parseFloat(r[1]), unit: r[3] }), t
        );
      }
      function correctUnit(e, r, t) {
        for (
          var n = void 0, a = "", o = e.split(")"), i = 0, u = o.length - 1;
          i < u;
          i++
        ) {
          var c = o[i];
          if (
            (n = c.match(/(translate([XYZ]|3d)?|rotate)\(([^)]*)/)) &&
            n.length > 1
          )
            if ("rotate" === n[1])
              -1 === n[3].indexOf("deg") && (c = n[1] + "(" + n[3] + "deg");
            else {
              var f = n[3].split(","),
                _ = [r, t, 100];
              switch (n[2]) {
                case "X":
                  c = n[1] + "(" + getConverted(n[3], r);
                  break;
                case "Y":
                  c = n[1] + "(" + getConverted(n[3], t);
                  break;
                case "Z":
                  break;
                default:
                  for (var s = 0, d = f.length; s < d; s++)
                    f[s] = getConverted(f[s], _[s]);
                  c = n[1] + "(" + f.join(",");
              }
            }
          (c = " " + c + ")"), (a += c);
        }
        return (a = a.replace("%", "").replace("+=", ""));
      }
      function parseStyle(e) {
        var r = e.match(/(\b\w+?)\((\s*[^)]+)/),
          t = void 0,
          n = void 0,
          a = ["", ""];
        return (
          r &&
            r.length > 2 &&
            ((t = r[1]),
            (n = r[2].split(",")),
            (n = o.map(n, function (e) {
              return o.trim(e);
            })),
            (a = [o.trim(t), n])),
          a
        );
      }
      function getTransformGenerateFunction(e) {
        for (
          var r = e.split(")"), t = [], n = 0, a = r.length - 1;
          n < a;
          n++
        ) {
          var i = parseStyle(r[n]);
          (i[1] = o.map(i[1], toParsedFloat)), t.push(i);
        }
        return function (e) {
          var r = "",
            n = 0;
          return (
            o.each(t, function (a) {
              n = t[a][0].indexOf("scale") >= 0 ? 1 : 0;
              var i = o
                .map(t[a][1], function (r) {
                  var t = r.num;
                  return 1 === n && (t -= 1), n + t * e + (r.unit || "");
                })
                .join(",");
              r += t[a][0] + "(" + i + ") ";
            }),
            r
          );
        };
      }
      function data2String(e) {
        var r = void 0,
          t = [];
        if (o.isArray(e)) {
          r = e[0];
          return r + "(" + e[1].join(unit(r) + ",") + unit(r) + ")";
        }
        for (r in e) t.push(r);
        return o
          .map(t, function (r) {
            return r + "(" + e[r] + unit(r) + ")";
          })
          .join(" ");
      }
      function rateFn(e, r, t) {
        var n = t.indexOf("+=") >= 0,
          a = void 0,
          i = void 0,
          u = void 0,
          c = correctUnit(
            t,
            parseFloat(o.css(e, "width")) || 0,
            parseFloat(o.css(e, "height")) || 0
          );
        return (
          n
            ? ((a = r && "none" !== r ? r : "matrix(1, 0, 0, 1, 0, 0)"),
              (i = getTransformGenerateFunction(c)))
            : ((a = toMatrixArray(r)),
              (u = toMatrixArray("none")),
              a[1].length < u[1].length
                ? (a = toMatrix3d(a))
                : a[1].length > u[1].length && (u = toMatrix3d(u)),
              (i = getTransformGenerateFunction(c))),
          function (e) {
            var r = [],
              t = "";
            if (n) return a + i(e);
            if (1 === e) t = data2String(u);
            else {
              for (var o, c, f = 0, _ = a[1].length; f < _; f++)
                (o = parseFloat(a[1][f])),
                  (c = parseFloat(u[1][f])),
                  r.push(o + (c - o) * e);
              t = data2String([a[0], r]);
            }
            return t + i(e);
          }
        );
      }
      (r.__esModule = !0), (r.rateFn = r.toMatrix = r.toMatrix3d = undefined);
      var n = t(0),
        a = (function (e) {
          return e && e.__esModule ? e : { default: e };
        })(n),
        o = a["default"];
      (r.toMatrix3d = toMatrix3d),
        (r.toMatrix = toMatrixArray),
        (r.rateFn = rateFn);
    },
    function (e, r, t) {
      "use strict";
      r.__esModule = !0;
      var n = t(0),
        a = (function (e) {
          return e && e.__esModule ? e : { default: e };
        })(n),
        o = t(1),
        i = a["default"];
      i
        ? (i.fx.step.transform = function (e) {
            (e.rateFn = e.rateFn || (0, o.rateFn)(e.elem, e.start, e.end)),
              i.style(e.elem, "transform", e.rateFn(e.pos));
          })
        : console.warn("jQuery is not defined."),
        (r["default"] = i),
        (e.exports = r["default"]);
    },
  ]);
});
