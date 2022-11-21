/**
 * @license
 *
 * Copyright 2022 Coveo Solutions Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var OC = Object.create
var Ei = Object.defineProperty
var qC = Object.getOwnPropertyDescriptor
var TC = Object.getOwnPropertyNames
var kC = Object.getPrototypeOf
var DC = Object.prototype.hasOwnProperty
var Ip = (e) => Ei(e, '__esModule', { value: !0 })
var fe = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports)
var Xu = (e, t) => {
  Ip(e)
  for (var r in t) Ei(e, r, { get: t[r], enumerable: !0 })
}
var v = (e, t, r) => {
  if ((t && typeof t === 'object') || typeof t === 'function') {
    for (const a of TC(t)) {
      !DC.call(e, a) && a !== 'default' && Ei(e, a, { get: () => t[a], enumerable: !(r = qC(t, a)) || r.enumerable })
    }
  }
  return e
}
var ve = (e) =>
  v(
    Ip(
      Ei(
        e != null ? OC(kC(e)) : {},
        'default',
        e && e.__esModule && 'default' in e ? { get: () => e.default, enumerable: !0 } : { value: e, enumerable: !0 }
      )
    ),
    e
  )
var wp = fe((Dw, Ep) => {
  Ep.exports = fetch
})
var Op = fe((Po) => {
  var wi =
    (Po && Po.__assign) ||
    function () {
      return (
        (wi =
          Object.assign ||
          function (e) {
            for (var t, r = 1, a = arguments.length; r < a; r++) {
              t = arguments[r]
              for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
            }
            return e
          }),
        wi.apply(this, arguments)
      )
    }
  Object.defineProperty(Po, '__esModule', { value: !0 })
  var VC = {
    delayFirstAttempt: !1,
    jitter: 'none',
    maxDelay: 1 / 0,
    numOfAttempts: 10,
    retry: function () {
      return !0
    },
    startingDelay: 100,
    timeMultiple: 2,
  }
  function NC (e) {
    var t = wi(wi({}, VC), e)
    return t.numOfAttempts < 1 && (t.numOfAttempts = 1), t
  }
  Po.getSanitizedOptions = NC
})
var qp = fe((Zu) => {
  Object.defineProperty(Zu, '__esModule', { value: !0 })
  function MC (e) {
    var t = Math.random() * e
    return Math.round(t)
  }
  Zu.fullJitter = MC
})
var Tp = fe((el) => {
  Object.defineProperty(el, '__esModule', { value: !0 })
  function QC (e) {
    return e
  }
  el.noJitter = QC
})
var kp = fe((tl) => {
  Object.defineProperty(tl, '__esModule', { value: !0 })
  var LC = qp()
  var jC = Tp()
  function BC (e) {
    switch (e.jitter) {
      case 'full':
        return LC.fullJitter
      case 'none':
      default:
        return jC.noJitter
    }
  }
  tl.JitterFactory = BC
})
var al = fe((rl) => {
  Object.defineProperty(rl, '__esModule', { value: !0 })
  var UC = kp()
  var _C = (function () {
    function e (t) {
      ;(this.options = t), (this.attempt = 0)
    }
    return (
      (e.prototype.apply = function () {
        var t = this
        return new Promise(function (r) {
          return setTimeout(r, t.jitteredDelay)
        })
      }),
      (e.prototype.setAttemptNumber = function (t) {
        this.attempt = t
      }),
      Object.defineProperty(e.prototype, 'jitteredDelay', {
        get: function () {
          var t = UC.JitterFactory(this.options)
          return t(this.delay)
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(e.prototype, 'delay', {
        get: function () {
          var t = this.options.startingDelay
          var r = this.options.timeMultiple
          var a = this.numOfDelayedAttempts
          var n = t * Math.pow(r, a)
          return Math.min(n, this.options.maxDelay)
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(e.prototype, 'numOfDelayedAttempts', {
        get: function () {
          return this.attempt
        },
        enumerable: !0,
        configurable: !0,
      }),
      e
    )
  })()
  rl.Delay = _C
})
var Dp = fe((cr) => {
  var $C =
    (cr && cr.__extends) ||
    (function () {
      var e = function (t, r) {
        return (
          (e =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (a, n) {
                a.__proto__ = n
              }) ||
            function (a, n) {
              for (var o in n) n.hasOwnProperty(o) && (a[o] = n[o])
            }),
          e(t, r)
        )
      }
      return function (t, r) {
        e(t, r)
        function a () {
          this.constructor = t
        }
        t.prototype = r === null ? Object.create(r) : ((a.prototype = r.prototype), new a())
      }
    })()
  var HC =
    (cr && cr.__awaiter) ||
    function (e, t, r, a) {
      function n (o) {
        return o instanceof r
          ? o
          : new r(function (i) {
            i(o)
          })
      }
      return new (r || (r = Promise))(function (o, i) {
        function s (l) {
          try {
            c(a.next(l))
          } catch (d) {
            i(d)
          }
        }
        function u (l) {
          try {
            c(a.throw(l))
          } catch (d) {
            i(d)
          }
        }
        function c (l) {
          l.done ? o(l.value) : n(l.value).then(s, u)
        }
        c((a = a.apply(e, t || [])).next())
      })
    }
  var zC =
    (cr && cr.__generator) ||
    function (e, t) {
      var r = {
        label: 0,
        sent: function () {
          if (o[0] & 1) throw o[1]
          return o[1]
        },
        trys: [],
        ops: [],
      }
      var a
      var n
      var o
      var i
      return (
        (i = { next: s(0), throw: s(1), return: s(2) }),
        typeof Symbol === 'function' &&
          (i[Symbol.iterator] = function () {
            return this
          }),
        i
      )
      function s (c) {
        return function (l) {
          return u([c, l])
        }
      }
      function u (c) {
        if (a) throw new TypeError('Generator is already executing.')
        for (; r;) {
          try {
            if (
              ((a = 1),
              n &&
                (o = c[0] & 2 ? n.return : c[0] ? n.throw || ((o = n.return) && o.call(n), 0) : n.next) &&
                !(o = o.call(n, c[1])).done)
            ) {
              return o
            }
            switch (((n = 0), o && (c = [c[0] & 2, o.value]), c[0])) {
              case 0:
              case 1:
                o = c
                break
              case 4:
                return r.label++, { value: c[1], done: !1 }
              case 5:
                r.label++, (n = c[1]), (c = [0])
                continue
              case 7:
                ;(c = r.ops.pop()), r.trys.pop()
                continue
              default:
                if (((o = r.trys), !(o = o.length > 0 && o[o.length - 1]) && (c[0] === 6 || c[0] === 2))) {
                  r = 0
                  continue
                }
                if (c[0] === 3 && (!o || (c[1] > o[0] && c[1] < o[3]))) {
                  r.label = c[1]
                  break
                }
                if (c[0] === 6 && r.label < o[1]) {
                  ;(r.label = o[1]), (o = c)
                  break
                }
                if (o && r.label < o[2]) {
                  ;(r.label = o[2]), r.ops.push(c)
                  break
                }
                o[2] && r.ops.pop(), r.trys.pop()
                continue
            }
            c = t.call(e, r)
          } catch (l) {
            ;(c = [6, l]), (n = 0)
          } finally {
            a = o = 0
          }
        }
        if (c[0] & 5) throw c[1]
        return { value: c[0] ? c[1] : void 0, done: !0 }
      }
    }
  Object.defineProperty(cr, '__esModule', { value: !0 })
  var WC = al()
  var YC = (function (e) {
    $C(t, e)
    function t () {
      return (e !== null && e.apply(this, arguments)) || this
    }
    return (
      (t.prototype.apply = function () {
        return HC(this, void 0, void 0, function () {
          return zC(this, function (r) {
            return [2, this.isFirstAttempt ? !0 : e.prototype.apply.call(this)]
          })
        })
      }),
      Object.defineProperty(t.prototype, 'isFirstAttempt', {
        get: function () {
          return this.attempt === 0
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, 'numOfDelayedAttempts', {
        get: function () {
          return this.attempt - 1
        },
        enumerable: !0,
        configurable: !0,
      }),
      t
    )
  })(WC.Delay)
  cr.SkipFirstDelay = YC
})
var Vp = fe((Io) => {
  var KC =
    (Io && Io.__extends) ||
    (function () {
      var e = function (t, r) {
        return (
          (e =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (a, n) {
                a.__proto__ = n
              }) ||
            function (a, n) {
              for (var o in n) n.hasOwnProperty(o) && (a[o] = n[o])
            }),
          e(t, r)
        )
      }
      return function (t, r) {
        e(t, r)
        function a () {
          this.constructor = t
        }
        t.prototype = r === null ? Object.create(r) : ((a.prototype = r.prototype), new a())
      }
    })()
  Object.defineProperty(Io, '__esModule', { value: !0 })
  var GC = al()
  var JC = (function (e) {
    KC(t, e)
    function t () {
      return (e !== null && e.apply(this, arguments)) || this
    }
    return t
  })(GC.Delay)
  Io.AlwaysDelay = JC
})
var Np = fe((nl) => {
  Object.defineProperty(nl, '__esModule', { value: !0 })
  var XC = Dp()
  var ZC = Vp()
  function ex (e, t) {
    var r = tx(e)
    return r.setAttemptNumber(t), r
  }
  nl.DelayFactory = ex
  function tx (e) {
    return e.delayFirstAttempt ? new ZC.AlwaysDelay(e) : new XC.SkipFirstDelay(e)
  }
})
var Mp = fe((ua) => {
  var ol =
    (ua && ua.__awaiter) ||
    function (e, t, r, a) {
      function n (o) {
        return o instanceof r
          ? o
          : new r(function (i) {
            i(o)
          })
      }
      return new (r || (r = Promise))(function (o, i) {
        function s (l) {
          try {
            c(a.next(l))
          } catch (d) {
            i(d)
          }
        }
        function u (l) {
          try {
            c(a.throw(l))
          } catch (d) {
            i(d)
          }
        }
        function c (l) {
          l.done ? o(l.value) : n(l.value).then(s, u)
        }
        c((a = a.apply(e, t || [])).next())
      })
    }
  var il =
    (ua && ua.__generator) ||
    function (e, t) {
      var r = {
        label: 0,
        sent: function () {
          if (o[0] & 1) throw o[1]
          return o[1]
        },
        trys: [],
        ops: [],
      }
      var a
      var n
      var o
      var i
      return (
        (i = { next: s(0), throw: s(1), return: s(2) }),
        typeof Symbol === 'function' &&
          (i[Symbol.iterator] = function () {
            return this
          }),
        i
      )
      function s (c) {
        return function (l) {
          return u([c, l])
        }
      }
      function u (c) {
        if (a) throw new TypeError('Generator is already executing.')
        for (; r;) {
          try {
            if (
              ((a = 1),
              n &&
                (o = c[0] & 2 ? n.return : c[0] ? n.throw || ((o = n.return) && o.call(n), 0) : n.next) &&
                !(o = o.call(n, c[1])).done)
            ) {
              return o
            }
            switch (((n = 0), o && (c = [c[0] & 2, o.value]), c[0])) {
              case 0:
              case 1:
                o = c
                break
              case 4:
                return r.label++, { value: c[1], done: !1 }
              case 5:
                r.label++, (n = c[1]), (c = [0])
                continue
              case 7:
                ;(c = r.ops.pop()), r.trys.pop()
                continue
              default:
                if (((o = r.trys), !(o = o.length > 0 && o[o.length - 1]) && (c[0] === 6 || c[0] === 2))) {
                  r = 0
                  continue
                }
                if (c[0] === 3 && (!o || (c[1] > o[0] && c[1] < o[3]))) {
                  r.label = c[1]
                  break
                }
                if (c[0] === 6 && r.label < o[1]) {
                  ;(r.label = o[1]), (o = c)
                  break
                }
                if (o && r.label < o[2]) {
                  ;(r.label = o[2]), r.ops.push(c)
                  break
                }
                o[2] && r.ops.pop(), r.trys.pop()
                continue
            }
            c = t.call(e, r)
          } catch (l) {
            ;(c = [6, l]), (n = 0)
          } finally {
            a = o = 0
          }
        }
        if (c[0] & 5) throw c[1]
        return { value: c[0] ? c[1] : void 0, done: !0 }
      }
    }
  Object.defineProperty(ua, '__esModule', { value: !0 })
  var rx = Op()
  var ax = Np()
  function nx (e, t) {
    return (
      t === void 0 && (t = {}),
      ol(this, void 0, void 0, function () {
        var r, a
        return il(this, function (n) {
          switch (n.label) {
            case 0:
              return (r = rx.getSanitizedOptions(t)), (a = new ox(e, r)), [4, a.execute()]
            case 1:
              return [2, n.sent()]
          }
        })
      })
    )
  }
  ua.backOff = nx
  var ox = (function () {
    function e (t, r) {
      ;(this.request = t), (this.options = r), (this.attemptNumber = 0)
    }
    return (
      (e.prototype.execute = function () {
        return ol(this, void 0, void 0, function () {
          var t, r
          return il(this, function (a) {
            switch (a.label) {
              case 0:
                if (this.attemptLimitReached) return [3, 7]
                a.label = 1
              case 1:
                return a.trys.push([1, 4, , 6]), [4, this.applyDelay()]
              case 2:
                return a.sent(), [4, this.request()]
              case 3:
                return [2, a.sent()]
              case 4:
                return (t = a.sent()), this.attemptNumber++, [4, this.options.retry(t, this.attemptNumber)]
              case 5:
                if (((r = a.sent()), !r || this.attemptLimitReached)) throw t
                return [3, 6]
              case 6:
                return [3, 0]
              case 7:
                throw new Error('Something went wrong.')
            }
          })
        })
      }),
      Object.defineProperty(e.prototype, 'attemptLimitReached', {
        get: function () {
          return this.attemptNumber >= this.options.numOfAttempts
        },
        enumerable: !0,
        configurable: !0,
      }),
      (e.prototype.applyDelay = function () {
        return ol(this, void 0, void 0, function () {
          var t
          return il(this, function (r) {
            switch (r.label) {
              case 0:
                return (t = ax.DelayFactory(this.options, this.attemptNumber)), [4, t.apply()]
              case 1:
                return r.sent(), [2]
            }
          })
        })
      }),
      e
    )
  })()
})
var qi = fe((cl, ul) => {
  ;(function (e, t) {
    typeof cl === 'object' && typeof ul !== 'undefined'
      ? (ul.exports = t())
      : typeof define === 'function' && define.amd
        ? define(t)
        : ((e = typeof globalThis !== 'undefined' ? globalThis : e || self).dayjs = t())
  })(cl, function () {
    var e = 1e3
    var t = 6e4
    var r = 36e5
    var a = 'millisecond'
    var n = 'second'
    var o = 'minute'
    var i = 'hour'
    var s = 'day'
    var u = 'week'
    var c = 'month'
    var l = 'quarter'
    var d = 'year'
    var m = 'date'
    var p = 'Invalid Date'
    var f = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/
    var h = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g
    var C = {
      name: 'en',
      weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
      months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
    }
    var x = function (M, A, T) {
      var L = String(M)
      return !L || L.length >= A ? M : '' + Array(A + 1 - L.length).join(T) + M
    }
    var R = {
      s: x,
      z: function (M) {
        var A = -M.utcOffset()
        var T = Math.abs(A)
        var L = Math.floor(T / 60)
        var E = T % 60
        return (A <= 0 ? '+' : '-') + x(L, 2, '0') + ':' + x(E, 2, '0')
      },
      m: function M (A, T) {
        if (A.date() < T.date()) return -M(T, A)
        var L = 12 * (T.year() - A.year()) + (T.month() - A.month())
        var E = A.clone().add(L, c)
        var $ = T - E < 0
        var H = A.clone().add(L + ($ ? -1 : 1), c)
        return +(-(L + (T - E) / ($ ? E - H : H - E)) || 0)
      },
      a: function (M) {
        return M < 0 ? Math.ceil(M) || 0 : Math.floor(M)
      },
      p: function (M) {
        return (
          { M: c, y: d, w: u, d: s, D: m, h: i, m: o, s: n, ms: a, Q: l }[M] ||
          String(M || '')
            .toLowerCase()
            .replace(/s$/, '')
        )
      },
      u: function (M) {
        return M === void 0
      },
    }
    var F = 'en'
    var P = {}
    P[F] = C
    var U = function (M) {
      return M instanceof _
    }
    var X = function M (A, T, L) {
      var E
      if (!A) return F
      if (typeof A === 'string') {
        var $ = A.toLowerCase()
        P[$] && (E = $), T && ((P[$] = T), (E = $))
        var H = A.split('-')
        if (!E && H.length > 1) return M(H[0])
      } else {
        var re = A.name
        ;(P[re] = A), (E = re)
      }
      return !L && E && (F = E), E || (!L && F)
    }
    var z = function (M, A) {
      if (U(M)) return M.clone()
      var T = typeof A === 'object' ? A : {}
      return (T.date = M), (T.args = arguments), new _(T)
    }
    var I = R
    ;(I.l = X),
    (I.i = U),
    (I.w = function (M, A) {
      return z(M, { locale: A.$L, utc: A.$u, x: A.$x, $offset: A.$offset })
    })
    var _ = (function () {
      function M (T) {
        ;(this.$L = X(T.locale, null, !0)), this.parse(T)
      }
      var A = M.prototype
      return (
        (A.parse = function (T) {
          ;(this.$d = (function (L) {
            var E = L.date
            var $ = L.utc
            if (E === null) return new Date(NaN)
            if (I.u(E)) return new Date()
            if (E instanceof Date) return new Date(E)
            if (typeof E === 'string' && !/Z$/i.test(E)) {
              var H = E.match(f)
              if (H) {
                var re = H[2] - 1 || 0
                var le = (H[7] || '0').substring(0, 3)
                return $
                  ? new Date(Date.UTC(H[1], re, H[3] || 1, H[4] || 0, H[5] || 0, H[6] || 0, le))
                  : new Date(H[1], re, H[3] || 1, H[4] || 0, H[5] || 0, H[6] || 0, le)
              }
            }
            return new Date(E)
          })(T)),
          (this.$x = T.x || {}),
          this.init()
        }),
        (A.init = function () {
          var T = this.$d
          ;(this.$y = T.getFullYear()),
          (this.$M = T.getMonth()),
          (this.$D = T.getDate()),
          (this.$W = T.getDay()),
          (this.$H = T.getHours()),
          (this.$m = T.getMinutes()),
          (this.$s = T.getSeconds()),
          (this.$ms = T.getMilliseconds())
        }),
        (A.$utils = function () {
          return I
        }),
        (A.isValid = function () {
          return this.$d.toString() !== p
        }),
        (A.isSame = function (T, L) {
          var E = z(T)
          return this.startOf(L) <= E && E <= this.endOf(L)
        }),
        (A.isAfter = function (T, L) {
          return z(T) < this.startOf(L)
        }),
        (A.isBefore = function (T, L) {
          return this.endOf(L) < z(T)
        }),
        (A.$g = function (T, L, E) {
          return I.u(T) ? this[L] : this.set(E, T)
        }),
        (A.unix = function () {
          return Math.floor(this.valueOf() / 1e3)
        }),
        (A.valueOf = function () {
          return this.$d.getTime()
        }),
        (A.startOf = function (T, L) {
          var E = this
          var $ = !!I.u(L) || L
          var H = I.p(T)
          var re = function (wt, Ie) {
            var Ze = I.w(E.$u ? Date.UTC(E.$y, Ie, wt) : new Date(E.$y, Ie, wt), E)
            return $ ? Ze : Ze.endOf(s)
          }
          var le = function (wt, Ie) {
            return I.w(E.toDate()[wt].apply(E.toDate('s'), ($ ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(Ie)), E)
          }
          var he = this.$W
          var Pe = this.$M
          var Et = this.$D
          var yt = 'set' + (this.$u ? 'UTC' : '')
          switch (H) {
            case d:
              return $ ? re(1, 0) : re(31, 11)
            case c:
              return $ ? re(1, Pe) : re(0, Pe + 1)
            case u:
              var ca = this.$locale().weekStart || 0
              var vr = (he < ca ? he + 7 : he) - ca
              return re($ ? Et - vr : Et + (6 - vr), Pe)
            case s:
            case m:
              return le(yt + 'Hours', 0)
            case i:
              return le(yt + 'Minutes', 1)
            case o:
              return le(yt + 'Seconds', 2)
            case n:
              return le(yt + 'Milliseconds', 3)
            default:
              return this.clone()
          }
        }),
        (A.endOf = function (T) {
          return this.startOf(T, !1)
        }),
        (A.$set = function (T, L) {
          var E
          var $ = I.p(T)
          var H = 'set' + (this.$u ? 'UTC' : '')
          var re = ((E = {}),
          (E[s] = H + 'Date'),
          (E[m] = H + 'Date'),
          (E[c] = H + 'Month'),
          (E[d] = H + 'FullYear'),
          (E[i] = H + 'Hours'),
          (E[o] = H + 'Minutes'),
          (E[n] = H + 'Seconds'),
          (E[a] = H + 'Milliseconds'),
          E)[$]
          var le = $ === s ? this.$D + (L - this.$W) : L
          if ($ === c || $ === d) {
            var he = this.clone().set(m, 1)
            he.$d[re](le), he.init(), (this.$d = he.set(m, Math.min(this.$D, he.daysInMonth())).$d)
          } else re && this.$d[re](le)
          return this.init(), this
        }),
        (A.set = function (T, L) {
          return this.clone().$set(T, L)
        }),
        (A.get = function (T) {
          return this[I.p(T)]()
        }),
        (A.add = function (T, L) {
          var E
          var $ = this
          T = Number(T)
          var H = I.p(L)
          var re = function (Pe) {
            var Et = z($)
            return I.w(Et.date(Et.date() + Math.round(Pe * T)), $)
          }
          if (H === c) return this.set(c, this.$M + T)
          if (H === d) return this.set(d, this.$y + T)
          if (H === s) return re(1)
          if (H === u) return re(7)
          var le = ((E = {}), (E[o] = t), (E[i] = r), (E[n] = e), E)[H] || 1
          var he = this.$d.getTime() + T * le
          return I.w(he, this)
        }),
        (A.subtract = function (T, L) {
          return this.add(-1 * T, L)
        }),
        (A.format = function (T) {
          var L = this
          var E = this.$locale()
          if (!this.isValid()) return E.invalidDate || p
          var $ = T || 'YYYY-MM-DDTHH:mm:ssZ'
          var H = I.z(this)
          var re = this.$H
          var le = this.$m
          var he = this.$M
          var Pe = E.weekdays
          var Et = E.months
          var yt = function (Ie, Ze, br, Fr) {
            return (Ie && (Ie[Ze] || Ie(L, $))) || br[Ze].slice(0, Fr)
          }
          var ca = function (Ie) {
            return I.s(re % 12 || 12, Ie, '0')
          }
          var vr =
            E.meridiem ||
            function (Ie, Ze, br) {
              var Fr = Ie < 12 ? 'AM' : 'PM'
              return br ? Fr.toLowerCase() : Fr
            }
          var wt = {
            YY: String(this.$y).slice(-2),
            YYYY: this.$y,
            M: he + 1,
            MM: I.s(he + 1, 2, '0'),
            MMM: yt(E.monthsShort, he, Et, 3),
            MMMM: yt(Et, he),
            D: this.$D,
            DD: I.s(this.$D, 2, '0'),
            d: String(this.$W),
            dd: yt(E.weekdaysMin, this.$W, Pe, 2),
            ddd: yt(E.weekdaysShort, this.$W, Pe, 3),
            dddd: Pe[this.$W],
            H: String(re),
            HH: I.s(re, 2, '0'),
            h: ca(1),
            hh: ca(2),
            a: vr(re, le, !0),
            A: vr(re, le, !1),
            m: String(le),
            mm: I.s(le, 2, '0'),
            s: String(this.$s),
            ss: I.s(this.$s, 2, '0'),
            SSS: I.s(this.$ms, 3, '0'),
            Z: H,
          }
          return $.replace(h, function (Ie, Ze) {
            return Ze || wt[Ie] || H.replace(':', '')
          })
        }),
        (A.utcOffset = function () {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15)
        }),
        (A.diff = function (T, L, E) {
          var $
          var H = I.p(L)
          var re = z(T)
          var le = (re.utcOffset() - this.utcOffset()) * t
          var he = this - re
          var Pe = I.m(this, re)
          return (
            (Pe =
              (($ = {}),
              ($[d] = Pe / 12),
              ($[c] = Pe),
              ($[l] = Pe / 3),
              ($[u] = (he - le) / 6048e5),
              ($[s] = (he - le) / 864e5),
              ($[i] = he / r),
              ($[o] = he / t),
              ($[n] = he / e),
              $)[H] || he),
            E ? Pe : I.a(Pe)
          )
        }),
        (A.daysInMonth = function () {
          return this.endOf(c).$D
        }),
        (A.$locale = function () {
          return P[this.$L]
        }),
        (A.locale = function (T, L) {
          if (!T) return this.$L
          var E = this.clone()
          var $ = X(T, L, !0)
          return $ && (E.$L = $), E
        }),
        (A.clone = function () {
          return I.w(this.$d, this)
        }),
        (A.toDate = function () {
          return new Date(this.valueOf())
        }),
        (A.toJSON = function () {
          return this.isValid() ? this.toISOString() : null
        }),
        (A.toISOString = function () {
          return this.$d.toISOString()
        }),
        (A.toString = function () {
          return this.$d.toUTCString()
        }),
        M
      )
    })()
    var ne = _.prototype
    return (
      (z.prototype = ne),
      [
        ['$ms', a],
        ['$s', n],
        ['$m', o],
        ['$H', i],
        ['$W', s],
        ['$M', c],
        ['$y', d],
        ['$D', m],
      ].forEach(function (M) {
        ne[M[1]] = function (A) {
          return this.$g(A, M[0], M[1])
        }
      }),
      (z.extend = function (M, A) {
        return M.$i || (M(A, _, z), (M.$i = !0)), z
      }),
      (z.locale = X),
      (z.isDayjs = U),
      (z.unix = function (M) {
        return z(1e3 * M)
      }),
      (z.en = P[F]),
      (z.Ls = P),
      (z.p = {}),
      z
    )
  })
})
var $p = fe((ll, dl) => {
  ;(function (e, t) {
    typeof ll === 'object' && typeof dl !== 'undefined'
      ? (dl.exports = t())
      : typeof define === 'function' && define.amd
        ? define(t)
        : ((e = typeof globalThis !== 'undefined' ? globalThis : e || self).dayjs_plugin_utc = t())
  })(ll, function () {
    var e = 'minute'
    var t = /[+-]\d\d(?::?\d\d)?/g
    var r = /([+-]|\d\d)/g
    return function (a, n, o) {
      var i = n.prototype
      ;(o.utc = function (p) {
        var f = { date: p, utc: !0, args: arguments }
        return new n(f)
      }),
      (i.utc = function (p) {
        var f = o(this.toDate(), { locale: this.$L, utc: !0 })
        return p ? f.add(this.utcOffset(), e) : f
      }),
      (i.local = function () {
        return o(this.toDate(), { locale: this.$L, utc: !1 })
      })
      var s = i.parse
      i.parse = function (p) {
        p.utc && (this.$u = !0), this.$utils().u(p.$offset) || (this.$offset = p.$offset), s.call(this, p)
      }
      var u = i.init
      i.init = function () {
        if (this.$u) {
          var p = this.$d
          ;(this.$y = p.getUTCFullYear()),
          (this.$M = p.getUTCMonth()),
          (this.$D = p.getUTCDate()),
          (this.$W = p.getUTCDay()),
          (this.$H = p.getUTCHours()),
          (this.$m = p.getUTCMinutes()),
          (this.$s = p.getUTCSeconds()),
          (this.$ms = p.getUTCMilliseconds())
        } else u.call(this)
      }
      var c = i.utcOffset
      i.utcOffset = function (p, f) {
        var h = this.$utils().u
        if (h(p)) return this.$u ? 0 : h(this.$offset) ? c.call(this) : this.$offset
        if (
          typeof p === 'string' &&
          ((p = (function (F) {
            F === void 0 && (F = '')
            var P = F.match(t)
            if (!P) return null
            var U = ('' + P[0]).match(r) || ['-', 0, 0]
            var X = U[0]
            var z = 60 * +U[1] + +U[2]
            return z === 0 ? 0 : X === '+' ? z : -z
          })(p)),
          p === null)
        ) {
          return this
        }
        var C = Math.abs(p) <= 16 ? 60 * p : p
        var x = this
        if (f) return (x.$offset = C), (x.$u = p === 0), x
        if (p !== 0) {
          var R = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset()
          ;((x = this.local().add(C + R, e)).$offset = C), (x.$x.$localOffset = R)
        } else x = this.utc()
        return x
      }
      var l = i.format
      ;(i.format = function (p) {
        var f = p || (this.$u ? 'YYYY-MM-DDTHH:mm:ss[Z]' : '')
        return l.call(this, f)
      }),
      (i.valueOf = function () {
        var p = this.$utils().u(this.$offset)
          ? 0
          : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset())
        return this.$d.valueOf() - 6e4 * p
      }),
      (i.isUTC = function () {
        return !!this.$u
      }),
      (i.toISOString = function () {
        return this.toDate().toISOString()
      }),
      (i.toString = function () {
        return this.toDate().toUTCString()
      })
      var d = i.toDate
      i.toDate = function (p) {
        return p === 's' && this.$offset ? o(this.format('YYYY-MM-DD HH:mm:ss:SSS')).toDate() : d.call(this)
      }
      var m = i.diff
      i.diff = function (p, f, h) {
        if (p && this.$u === p.$u) return m.call(this, p, f, h)
        var C = this.local()
        var x = o(p).local()
        return m.call(C, x, f, h)
      }
    }
  })
})
var Hp = fe((pl, fl) => {
  ;(function (e, t) {
    typeof pl === 'object' && typeof fl !== 'undefined'
      ? (fl.exports = t())
      : typeof define === 'function' && define.amd
        ? define(t)
        : ((e = typeof globalThis !== 'undefined' ? globalThis : e || self).dayjs_plugin_timezone = t())
  })(pl, function () {
    var e = { year: 0, month: 1, day: 2, hour: 3, minute: 4, second: 5 }
    var t = {}
    return function (r, a, n) {
      var o
      var i = function (l, d, m) {
        m === void 0 && (m = {})
        var p = new Date(l)
        var f = (function (h, C) {
          C === void 0 && (C = {})
          var x = C.timeZoneName || 'short'
          var R = h + '|' + x
          var F = t[R]
          return (
            F ||
              ((F = new Intl.DateTimeFormat('en-US', {
                hour12: !1,
                timeZone: h,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZoneName: x,
              })),
              (t[R] = F)),
            F
          )
        })(d, m)
        return f.formatToParts(p)
      }
      var s = function (l, d) {
        for (var m = i(l, d), p = [], f = 0; f < m.length; f += 1) {
          var h = m[f]
          var C = h.type
          var x = h.value
          var R = e[C]
          R >= 0 && (p[R] = parseInt(x, 10))
        }
        var F = p[3]
        var P = F === 24 ? 0 : F
        var U = p[0] + '-' + p[1] + '-' + p[2] + ' ' + P + ':' + p[4] + ':' + p[5] + ':000'
        var X = +l
        return (n.utc(U).valueOf() - (X -= X % 1e3)) / 6e4
      }
      var u = a.prototype
      ;(u.tz = function (l, d) {
        l === void 0 && (l = o)
        var m = this.utcOffset()
        var p = this.toDate()
        var f = p.toLocaleString('en-US', { timeZone: l })
        var h = Math.round((p - new Date(f)) / 1e3 / 60)
        var C = n(f)
          .$set('millisecond', this.$ms)
          .utcOffset(15 * -Math.round(p.getTimezoneOffset() / 15) - h, !0)
        if (d) {
          var x = C.utcOffset()
          C = C.add(m - x, 'minute')
        }
        return (C.$x.$timezone = l), C
      }),
      (u.offsetName = function (l) {
        var d = this.$x.$timezone || n.tz.guess()
        var m = i(this.valueOf(), d, { timeZoneName: l }).find(function (p) {
          return p.type.toLowerCase() === 'timezonename'
        })
        return m && m.value
      })
      var c = u.startOf
      ;(u.startOf = function (l, d) {
        if (!this.$x || !this.$x.$timezone) return c.call(this, l, d)
        var m = n(this.format('YYYY-MM-DD HH:mm:ss:SSS'))
        return c.call(m, l, d).tz(this.$x.$timezone, !0)
      }),
      (n.tz = function (l, d, m) {
        var p = m && d
        var f = m || d || o
        var h = s(+n(), f)
        if (typeof l !== 'string') return n(l).tz(f)
        var C = (function (P, U, X) {
          var z = P - 60 * U * 1e3
          var I = s(z, X)
          if (U === I) return [z, U]
          var _ = s((z -= 60 * (I - U) * 1e3), X)
          return I === _ ? [z, I] : [P - 60 * Math.min(I, _) * 1e3, Math.max(I, _)]
        })(n.utc(l, p).valueOf(), h, f)
        var x = C[0]
        var R = C[1]
        var F = n(x).utcOffset(R)
        return (F.$x.$timezone = f), F
      }),
      (n.tz.guess = function () {
        return Intl.DateTimeFormat().resolvedOptions().timeZone
      }),
      (n.tz.setDefault = function (l) {
        o = l
      })
    }
  })
})
var ef = fe((Qq, Do) => {
  function Sx (e, t, r) {
    return (
      t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r), e
    )
  }
  ;(Do.exports = Sx), (Do.exports.__esModule = !0), (Do.exports.default = Do.exports)
})
var rf = fe((Lq, Vo) => {
  var Cx = ef()
  function tf (e, t) {
    var r = Object.keys(e)
    if (Object.getOwnPropertySymbols) {
      var a = Object.getOwnPropertySymbols(e)
      t &&
        (a = a.filter(function (n) {
          return Object.getOwnPropertyDescriptor(e, n).enumerable
        })),
      r.push.apply(r, a)
    }
    return r
  }
  function xx (e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t] != null ? arguments[t] : {}
      t % 2
        ? tf(Object(r), !0).forEach(function (a) {
          Cx(e, a, r[a])
        })
        : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
          : tf(Object(r)).forEach(function (a) {
            Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(r, a))
          })
    }
    return e
  }
  ;(Vo.exports = xx), (Vo.exports.__esModule = !0), (Vo.exports.default = Vo.exports)
})
var Mo = fe((dr) => {
  Object.defineProperty(dr, '__esModule', { value: !0 })
  var Rx = rf()
  function vx (e) {
    return e && typeof e === 'object' && 'default' in e ? e : { default: e }
  }
  var af = vx(Rx)
  function Ne (e) {
    return (
      'Minified Redux error #' +
      e +
      '; visit https://redux.js.org/Errors?code=' +
      e +
      ' for the full message or use the non-minified dev environment for full errors. '
    )
  }
  var nf = (function () {
    return (typeof Symbol === 'function' && Symbol.observable) || '@@observable'
  })()
  var Rl = function () {
    return Math.random().toString(36).substring(7).split('').join('.')
  }
  var No = {
    INIT: '@@redux/INIT' + Rl(),
    REPLACE: '@@redux/REPLACE' + Rl(),
    PROBE_UNKNOWN_ACTION: function () {
      return '@@redux/PROBE_UNKNOWN_ACTION' + Rl()
    },
  }
  function bx (e) {
    if (typeof e !== 'object' || e === null) return !1
    for (var t = e; Object.getPrototypeOf(t) !== null;) t = Object.getPrototypeOf(t)
    return Object.getPrototypeOf(e) === t
  }
  function vl (e, t, r) {
    var a
    if (
      (typeof t === 'function' && typeof r === 'function') ||
      (typeof r === 'function' && typeof arguments[3] === 'function')
    ) {
      throw new Error(Ne(0))
    }
    if ((typeof t === 'function' && typeof r === 'undefined' && ((r = t), (t = void 0)), typeof r !== 'undefined')) {
      if (typeof r !== 'function') throw new Error(Ne(1))
      return r(vl)(e, t)
    }
    if (typeof e !== 'function') throw new Error(Ne(2))
    var n = e
    var o = t
    var i = []
    var s = i
    var u = !1
    function c () {
      s === i && (s = i.slice())
    }
    function l () {
      if (u) throw new Error(Ne(3))
      return o
    }
    function d (h) {
      if (typeof h !== 'function') throw new Error(Ne(4))
      if (u) throw new Error(Ne(5))
      var C = !0
      return (
        c(),
        s.push(h),
        function () {
          if (C) {
            if (u) throw new Error(Ne(6))
            ;(C = !1), c()
            var R = s.indexOf(h)
            s.splice(R, 1), (i = null)
          }
        }
      )
    }
    function m (h) {
      if (!bx(h)) throw new Error(Ne(7))
      if (typeof h.type === 'undefined') throw new Error(Ne(8))
      if (u) throw new Error(Ne(9))
      try {
        ;(u = !0), (o = n(o, h))
      } finally {
        u = !1
      }
      for (var C = (i = s), x = 0; x < C.length; x++) {
        var R = C[x]
        R()
      }
      return h
    }
    function p (h) {
      if (typeof h !== 'function') throw new Error(Ne(10))
      ;(n = h), m({ type: No.REPLACE })
    }
    function f () {
      var h
      var C = d
      return (
        (h = {
          subscribe: function (R) {
            if (typeof R !== 'object' || R === null) throw new Error(Ne(11))
            function F () {
              R.next && R.next(l())
            }
            F()
            var P = C(F)
            return { unsubscribe: P }
          },
        }),
        (h[nf] = function () {
          return this
        }),
        h
      )
    }
    return m({ type: No.INIT }), (a = { dispatch: m, subscribe: d, getState: l, replaceReducer: p }), (a[nf] = f), a
  }
  var Fx = vl
  function Ax (e) {
    Object.keys(e).forEach(function (t) {
      var r = e[t]
      var a = r(void 0, { type: No.INIT })
      if (typeof a === 'undefined') throw new Error(Ne(12))
      if (typeof r(void 0, { type: No.PROBE_UNKNOWN_ACTION() }) === 'undefined') throw new Error(Ne(13))
    })
  }
  function Px (e) {
    for (var t = Object.keys(e), r = {}, a = 0; a < t.length; a++) {
      var n = t[a]
      typeof e[n] === 'function' && (r[n] = e[n])
    }
    var o = Object.keys(r)
    var s
    try {
      Ax(r)
    } catch (u) {
      s = u
    }
    return function (c, l) {
      if ((c === void 0 && (c = {}), s)) throw s
      for (var m = !1, p = {}, f = 0; f < o.length; f++) {
        var h = o[f]
        var C = r[h]
        var x = c[h]
        var R = C(x, l)
        if (typeof R === 'undefined') {
          throw new Error(Ne(14))
        }
        ;(p[h] = R), (m = m || R !== x)
      }
      return (m = m || o.length !== Object.keys(c).length), m ? p : c
    }
  }
  function of (e, t) {
    return function () {
      return t(e.apply(this, arguments))
    }
  }
  function Ix (e, t) {
    if (typeof e === 'function') return of(e, t)
    if (typeof e !== 'object' || e === null) throw new Error(Ne(16))
    var r = {}
    for (var a in e) {
      var n = e[a]
      typeof n === 'function' && (r[a] = of(n, t))
    }
    return r
  }
  function sf () {
    for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r]
    return t.length === 0
      ? function (a) {
        return a
      }
      : t.length === 1
        ? t[0]
        : t.reduce(function (a, n) {
          return function () {
            return a(n.apply(void 0, arguments))
          }
        })
  }
  function Ex () {
    for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r]
    return function (a) {
      return function () {
        var n = a.apply(void 0, arguments)
        var o = function () {
          throw new Error(Ne(15))
        }
        var i = {
          getState: n.getState,
          dispatch: function () {
            return o.apply(void 0, arguments)
          },
        }
        var s = t.map(function (u) {
          return u(i)
        })
        return (o = sf.apply(void 0, s)(n.dispatch)), af.default(af.default({}, n), {}, { dispatch: o })
      }
    }
  }
  dr.__DO_NOT_USE__ActionTypes = No
  dr.applyMiddleware = Ex
  dr.bindActionCreators = Ix
  dr.combineReducers = Px
  dr.compose = sf
  dr.createStore = vl
  dr.legacy_createStore = Fx
})
var df = fe((Bq, lf) => {
  var wx = '[object Object]'
  function Ox (e) {
    var t = !1
    if (e != null && typeof e.toString !== 'function') {
      try {
        t = !!(e + '')
      } catch {}
    }
    return t
  }
  function qx (e, t) {
    return function (r) {
      return e(t(r))
    }
  }
  var Tx = Function.prototype
  var cf = Object.prototype
  var uf = Tx.toString
  var kx = cf.hasOwnProperty
  var Dx = uf.call(Object)
  var Vx = cf.toString
  var Nx = qx(Object.getPrototypeOf, Object)
  function Mx (e) {
    return !!e && typeof e === 'object'
  }
  function Qx (e) {
    if (!Mx(e) || Vx.call(e) != wx || Ox(e)) return !1
    var t = Nx(e)
    if (t === null) return !0
    var r = kx.call(t, 'constructor') && t.constructor
    return typeof r === 'function' && r instanceof r && uf.call(r) == Dx
  }
  lf.exports = Qx
})
var pf = fe((Fl) => {
  Object.defineProperty(Fl, '__esModule', { value: !0 })
  Fl.default = $x
  var Lx = Mo()
  var jx = df()
  var Bx = Ux(jx)
  function Ux (e) {
    return e && e.__esModule ? e : { default: e }
  }
  function _x (e) {
    if (Array.isArray(e)) {
      for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t]
      return r
    } else return Array.from(e)
  }
  var bl = function (t) {
    return typeof t === 'function'
  }
  function $x () {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []
    return function () {
      var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}
      function a () {
        var o = []
        var i = []
        var s = {
          getState: function () {
            return bl(r) ? r(o) : r
          },
          getActions: function () {
            return o
          },
          dispatch: function (c) {
            if (!(0, Bx.default)(c)) {
              throw new Error('Actions must be plain objects. Use custom middleware for async actions.')
            }
            if (typeof c.type === 'undefined') {
              throw new Error(
                'Actions may not have an undefined "type" property. Have you misspelled a constant? Action: ' +
                  JSON.stringify(c)
              )
            }
            o.push(c)
            for (var l = 0; l < i.length; l++) i[l]()
            return c
          },
          clearActions: function () {
            o = []
          },
          subscribe: function (c) {
            return (
              bl(c) && i.push(c),
              function () {
                var l = i.indexOf(c)
                l < 0 || i.splice(l, 1)
              }
            )
          },
          replaceReducer: function (c) {
            if (!bl(c)) throw new Error('Expected the nextReducer to be a function.')
          },
        }
        return s
      }
      var n = Lx.applyMiddleware.apply(void 0, _x(e))(a)
      return n()
    }
  }
})
var Hm = fe((ZT, pd) => {
  var ls = typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : void 0
  if (!ls) throw new Error('Unable to find global scope. Are you sure this is running in the browser?')
  if (!ls.AbortController) {
    throw new Error('Could not find "AbortController" in the global scope. You need to polyfill it first')
  }
  pd.exports = ls.AbortController
  pd.exports.default = ls.AbortController
})
var Km = fe((Ck, Ym) => {
  function Ib (e) {
    if (arguments.length === 0) throw new TypeError('1 argument required, but only 0 present.')
    if (
      ((e = `${e}`),
      (e = e.replace(/[ \t\n\f\r]/g, '')),
      e.length % 4 == 0 && (e = e.replace(/==?$/, '')),
      e.length % 4 == 1 || /[^+/0-9A-Za-z]/.test(e))
    ) {
      return null
    }
    let t = ''
    let r = 0
    let a = 0
    for (let n = 0; n < e.length; n++) {
      ;(r <<= 6),
      (r |= wb(e[n])),
      (a += 6),
      a === 24 &&
          ((t += String.fromCharCode((r & 16711680) >> 16)),
          (t += String.fromCharCode((r & 65280) >> 8)),
          (t += String.fromCharCode(r & 255)),
          (r = a = 0))
    }
    return (
      a === 12
        ? ((r >>= 4), (t += String.fromCharCode(r)))
        : a === 18 && ((r >>= 2), (t += String.fromCharCode((r & 65280) >> 8)), (t += String.fromCharCode(r & 255))),
      t
    )
  }
  var Eb = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  function wb (e) {
    const t = Eb.indexOf(e)
    return t < 0 ? void 0 : t
  }
  Ym.exports = Ib
})
var Jm = fe((xk, Gm) => {
  function Ob (e) {
    if (arguments.length === 0) throw new TypeError('1 argument required, but only 0 present.')
    let t
    for (e = `${e}`, t = 0; t < e.length; t++) if (e.charCodeAt(t) > 255) return null
    let r = ''
    for (t = 0; t < e.length; t += 3) {
      const a = [void 0, void 0, void 0, void 0]
      ;(a[0] = e.charCodeAt(t) >> 2),
      (a[1] = (e.charCodeAt(t) & 3) << 4),
      e.length > t + 1 && ((a[1] |= e.charCodeAt(t + 1) >> 4), (a[2] = (e.charCodeAt(t + 1) & 15) << 2)),
      e.length > t + 2 && ((a[2] |= e.charCodeAt(t + 2) >> 6), (a[3] = e.charCodeAt(t + 2) & 63))
      for (let n = 0; n < a.length; n++) typeof a[n] === 'undefined' ? (r += '=') : (r += Tb(a[n]))
    }
    return r
  }
  var qb = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  function Tb (e) {
    if (e >= 0 && e < 64) return qb[e]
  }
  Gm.exports = Ob
})
var gd = fe((Rk, Xm) => {
  var kb = Km()
  var Db = Jm()
  Xm.exports = { atob: kb, btoa: Db }
})
var cg = fe((hd, yd) => {
  ;(function (e, t) {
    typeof hd === 'object' && typeof yd !== 'undefined'
      ? (yd.exports = t())
      : typeof define === 'function' && define.amd
        ? define(t)
        : ((e = typeof globalThis !== 'undefined' ? globalThis : e || self).dayjs_plugin_customParseFormat = t())
  })(hd, function () {
    var e = {
      LTS: 'h:mm:ss A',
      LT: 'h:mm A',
      L: 'MM/DD/YYYY',
      LL: 'MMMM D, YYYY',
      LLL: 'MMMM D, YYYY h:mm A',
      LLLL: 'dddd, MMMM D, YYYY h:mm A',
    }
    var t = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g
    var r = /\d\d/
    var a = /\d\d?/
    var n = /\d*[^-_:/,()\s\d]+/
    var o = {}
    var i = function (p) {
      return (p = +p) + (p > 68 ? 1900 : 2e3)
    }
    var s = function (p) {
      return function (f) {
        this[p] = +f
      }
    }
    var u = [
      /[+-]\d\d:?(\d\d)?|Z/,
      function (p) {
        ;(this.zone || (this.zone = {})).offset = (function (f) {
          if (!f || f === 'Z') return 0
          var h = f.match(/([+-]|\d\d)/g)
          var C = 60 * h[1] + (+h[2] || 0)
          return C === 0 ? 0 : h[0] === '+' ? -C : C
        })(p)
      },
    ]
    var c = function (p) {
      var f = o[p]
      return f && (f.indexOf ? f : f.s.concat(f.f))
    }
    var l = function (p, f) {
      var h
      var C = o.meridiem
      if (C) {
        for (var x = 1; x <= 24; x += 1) {
          if (p.indexOf(C(x, 0, f)) > -1) {
            h = x > 12
            break
          }
        }
      } else h = p === (f ? 'pm' : 'PM')
      return h
    }
    var d = {
      A: [
        n,
        function (p) {
          this.afternoon = l(p, !1)
        },
      ],
      a: [
        n,
        function (p) {
          this.afternoon = l(p, !0)
        },
      ],
      S: [
        /\d/,
        function (p) {
          this.milliseconds = 100 * +p
        },
      ],
      SS: [
        r,
        function (p) {
          this.milliseconds = 10 * +p
        },
      ],
      SSS: [
        /\d{3}/,
        function (p) {
          this.milliseconds = +p
        },
      ],
      s: [a, s('seconds')],
      ss: [a, s('seconds')],
      m: [a, s('minutes')],
      mm: [a, s('minutes')],
      H: [a, s('hours')],
      h: [a, s('hours')],
      HH: [a, s('hours')],
      hh: [a, s('hours')],
      D: [a, s('day')],
      DD: [r, s('day')],
      Do: [
        n,
        function (p) {
          var f = o.ordinal
          var h = p.match(/\d+/)
          if (((this.day = h[0]), f)) {
            for (var C = 1; C <= 31; C += 1) f(C).replace(/\[|\]/g, '') === p && (this.day = C)
          }
        },
      ],
      M: [a, s('month')],
      MM: [r, s('month')],
      MMM: [
        n,
        function (p) {
          var f = c('months')
          var h =
            (
              c('monthsShort') ||
              f.map(function (C) {
                return C.slice(0, 3)
              })
            ).indexOf(p) + 1
          if (h < 1) throw new Error()
          this.month = h % 12 || h
        },
      ],
      MMMM: [
        n,
        function (p) {
          var f = c('months').indexOf(p) + 1
          if (f < 1) throw new Error()
          this.month = f % 12 || f
        },
      ],
      Y: [/[+-]?\d+/, s('year')],
      YY: [
        r,
        function (p) {
          this.year = i(p)
        },
      ],
      YYYY: [/\d{4}/, s('year')],
      Z: u,
      ZZ: u,
    }
    function m (p) {
      var f, h
      ;(f = p), (h = o && o.formats)
      for (
        var C = (p = f.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function (z, I, _) {
            var ne = _ && _.toUpperCase()
            return (
              I ||
              h[_] ||
              e[_] ||
              h[ne].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function (M, A, T) {
                return A || T.slice(1)
              })
            )
          })).match(t),
          x = C.length,
          R = 0;
        R < x;
        R += 1
      ) {
        var F = C[R]
        var P = d[F]
        var U = P && P[0]
        var X = P && P[1]
        C[R] = X ? { regex: U, parser: X } : F.replace(/^\[|\]$/g, '')
      }
      return function (z) {
        for (var I = {}, _ = 0, ne = 0; _ < x; _ += 1) {
          var M = C[_]
          if (typeof M === 'string') ne += M.length
          else {
            var A = M.regex
            var T = M.parser
            var L = z.slice(ne)
            var E = A.exec(L)[0]
            T.call(I, E), (z = z.replace(E, ''))
          }
        }
        return (
          (function ($) {
            var H = $.afternoon
            if (H !== void 0) {
              var re = $.hours
              H ? re < 12 && ($.hours += 12) : re === 12 && ($.hours = 0), delete $.afternoon
            }
          })(I),
          I
        )
      }
    }
    return function (p, f, h) {
      ;(h.p.customParseFormat = !0), p && p.parseTwoDigitYear && (i = p.parseTwoDigitYear)
      var C = f.prototype
      var x = C.parse
      C.parse = function (R) {
        var F = R.date
        var P = R.utc
        var U = R.args
        this.$u = P
        var X = U[1]
        if (typeof X === 'string') {
          var z = U[2] === !0
          var I = U[3] === !0
          var _ = z || I
          var ne = U[2]
          I && (ne = U[2]),
          (o = this.$locale()),
          !z && ne && (o = h.Ls[ne]),
          (this.$d = (function (L, E, $) {
            try {
              if (['x', 'X'].indexOf(E) > -1) return new Date((E === 'X' ? 1e3 : 1) * L)
              var H = m(E)(L)
              var re = H.year
              var le = H.month
              var he = H.day
              var Pe = H.hours
              var Et = H.minutes
              var yt = H.seconds
              var ca = H.milliseconds
              var vr = H.zone
              var wt = new Date()
              var Ie = he || (re || le ? 1 : wt.getDate())
              var Ze = re || wt.getFullYear()
              var br = 0
                ;(re && !le) || (br = le > 0 ? le - 1 : wt.getMonth())
              var Fr = Pe || 0
              var Ku = Et || 0
              var Gu = yt || 0
              var Ju = ca || 0
              return vr
                ? new Date(Date.UTC(Ze, br, Ie, Fr, Ku, Gu, Ju + 60 * vr.offset * 1e3))
                : $
                  ? new Date(Date.UTC(Ze, br, Ie, Fr, Ku, Gu, Ju))
                  : new Date(Ze, br, Ie, Fr, Ku, Gu, Ju)
            } catch {
              return new Date('')
            }
          })(F, X, P)),
          this.init(),
          ne && ne !== !0 && (this.$L = this.locale(ne).$L),
          _ && F != this.format(X) && (this.$d = new Date('')),
          (o = {})
        } else if (X instanceof Array) {
          for (var M = X.length, A = 1; A <= M; A += 1) {
            U[1] = X[A - 1]
            var T = h.apply(this, U)
            if (T.isValid()) {
              ;(this.$d = T.$d), (this.$L = T.$L), this.init()
              break
            }
            A === M && (this.$d = new Date(''))
          }
        } else x.call(this, R)
      }
    }
  })
})
var dg = fe((Cd, xd) => {
  ;(function (e, t) {
    typeof Cd === 'object' && typeof xd !== 'undefined'
      ? (xd.exports = t())
      : typeof define === 'function' && define.amd
        ? define(t)
        : ((e = typeof globalThis !== 'undefined' ? globalThis : e || self).dayjs_plugin_quarterOfYear = t())
  })(Cd, function () {
    var e = 'month'
    var t = 'quarter'
    return function (r, a) {
      var n = a.prototype
      n.quarter = function (s) {
        return this.$utils().u(s) ? Math.ceil((this.month() + 1) / 3) : this.month((this.month() % 3) + 3 * (s - 1))
      }
      var o = n.add
      n.add = function (s, u) {
        return (s = Number(s)), this.$utils().p(u) === t ? this.add(3 * s, e) : o.bind(this)(s, u)
      }
      var i = n.startOf
      n.startOf = function (s, u) {
        var c = this.$utils()
        var l = !!c.u(u) || u
        if (c.p(s) === t) {
          var d = this.quarter() - 1
          return l
            ? this.month(3 * d)
              .startOf(e)
              .startOf('day')
            : this.month(3 * d + 2)
              .endOf(e)
              .endOf('day')
        }
        return i.bind(this)(s, u)
      }
    }
  })
})
var Lg = fe((WN, Qg) => {
  function mF (e) {
    try {
      return JSON.stringify(e)
    } catch {
      return '"[Circular]"'
    }
  }
  Qg.exports = gF
  function gF (e, t, r) {
    var a = (r && r.stringify) || mF
    var n = 1
    if (typeof e === 'object' && e !== null) {
      var o = t.length + n
      if (o === 1) return e
      var i = new Array(o)
      i[0] = a(e)
      for (var s = 1; s < o; s++) i[s] = a(t[s])
      return i.join(' ')
    }
    if (typeof e !== 'string') return e
    var u = t.length
    if (u === 0) return e
    for (var c = '', l = 1 - n, d = -1, m = (e && e.length) || 0, p = 0; p < m;) {
      if (e.charCodeAt(p) === 37 && p + 1 < m) {
        switch (((d = d > -1 ? d : 0), e.charCodeAt(p + 1))) {
          case 100:
          case 102:
            if (l >= u || t[l] == null) break
            d < p && (c += e.slice(d, p)), (c += Number(t[l])), (d = p + 2), p++
            break
          case 105:
            if (l >= u || t[l] == null) break
            d < p && (c += e.slice(d, p)), (c += Math.floor(Number(t[l]))), (d = p + 2), p++
            break
          case 79:
          case 111:
          case 106:
            if (l >= u || t[l] === void 0) break
            d < p && (c += e.slice(d, p))
            var f = typeof t[l]
            if (f === 'string') {
              ;(c += "'" + t[l] + "'"), (d = p + 2), p++
              break
            }
            if (f === 'function') {
              ;(c += t[l].name || '<anonymous>'), (d = p + 2), p++
              break
            }
            ;(c += a(t[l])), (d = p + 2), p++
            break
          case 115:
            if (l >= u) break
            d < p && (c += e.slice(d, p)), (c += String(t[l])), (d = p + 2), p++
            break
          case 37:
            d < p && (c += e.slice(d, p)), (c += '%'), (d = p + 2), p++, l--
            break
        }
        ++l
      }
      ++p
    }
    return d === -1 ? e : (d < m && (c += e.slice(d)), c)
  }
})
var hi = fe((YN, _g) => {
  var jg = Lg()
  _g.exports = _t
  var mi = AF().console || {}
  var hF = {
    mapHttpRequest: Vs,
    mapHttpResponse: Vs,
    wrapRequestSerializer: Id,
    wrapResponseSerializer: Id,
    wrapErrorSerializer: Id,
    req: Vs,
    res: Vs,
    err: RF,
  }
  function yF (e, t) {
    return Array.isArray(e)
      ? e.filter(function (a) {
        return a !== '!stdSerializers.err'
      })
      : e === !0
        ? Object.keys(t)
        : !1
  }
  function _t (e) {
    ;(e = e || {}), (e.browser = e.browser || {})
    const t = e.browser.transmit
    if (t && typeof t.send !== 'function') throw Error('pino: transmit option must have a send function')
    const r = e.browser.write || mi
    e.browser.write && (e.browser.asObject = !0)
    const a = e.serializers || {}
    const n = yF(e.browser.serialize, a)
    let o = e.browser.serialize
    Array.isArray(e.browser.serialize) && e.browser.serialize.indexOf('!stdSerializers.err') > -1 && (o = !1)
    const i = ['error', 'fatal', 'warn', 'info', 'debug', 'trace']
    typeof r === 'function' && (r.error = r.fatal = r.warn = r.info = r.debug = r.trace = r),
    e.enabled === !1 && (e.level = 'silent')
    const s = e.level || 'info'
    const u = Object.create(r)
    u.log || (u.log = gi),
    Object.defineProperty(u, 'levelVal', { get: l }),
    Object.defineProperty(u, 'level', { get: d, set: m })
    const c = { transmit: t, serialize: n, asObject: e.browser.asObject, levels: i, timestamp: vF(e) }
    ;(u.levels = _t.levels),
    (u.level = s),
    (u.setMaxListeners =
        u.getMaxListeners =
        u.emit =
        u.addListener =
        u.on =
        u.prependListener =
        u.once =
        u.prependOnceListener =
        u.removeListener =
        u.removeAllListeners =
        u.listeners =
        u.listenerCount =
        u.eventNames =
        u.write =
        u.flush =
          gi),
    (u.serializers = a),
    (u._serialize = n),
    (u._stdErrSerialize = o),
    (u.child = p),
    t && (u._logEvent = Pd())
    function l () {
      return this.level === 'silent' ? 1 / 0 : this.levels.values[this.level]
    }
    function d () {
      return this._level
    }
    function m (f) {
      if (f !== 'silent' && !this.levels.values[f]) throw Error('unknown level ' + f)
      ;(this._level = f),
      gn(c, u, 'error', 'log'),
      gn(c, u, 'fatal', 'error'),
      gn(c, u, 'warn', 'error'),
      gn(c, u, 'info', 'log'),
      gn(c, u, 'debug', 'log'),
      gn(c, u, 'trace', 'log')
    }
    function p (f, h) {
      if (!f) throw new Error('missing bindings for child Pino')
      ;(h = h || {}), n && f.serializers && (h.serializers = f.serializers)
      const C = h.serializers
      if (n && C) {
        var x = Object.assign({}, a, C)
        var R = e.browser.serialize === !0 ? Object.keys(x) : n
        delete f.serializers, Ds([f], R, x, this._stdErrSerialize)
      }
      function F (P) {
        ;(this._childLevel = (P._childLevel | 0) + 1),
        (this.error = hn(P, f, 'error')),
        (this.fatal = hn(P, f, 'fatal')),
        (this.warn = hn(P, f, 'warn')),
        (this.info = hn(P, f, 'info')),
        (this.debug = hn(P, f, 'debug')),
        (this.trace = hn(P, f, 'trace')),
        x && ((this.serializers = x), (this._serialize = R)),
        t && (this._logEvent = Pd([].concat(P._logEvent.bindings, f)))
      }
      return (F.prototype = this), new F(this)
    }
    return u
  }
  _t.levels = {
    values: { fatal: 60, error: 50, warn: 40, info: 30, debug: 20, trace: 10 },
    labels: { 10: 'trace', 20: 'debug', 30: 'info', 40: 'warn', 50: 'error', 60: 'fatal' },
  }
  _t.stdSerializers = hF
  _t.stdTimeFunctions = Object.assign({}, { nullTime: Bg, epochTime: Ug, unixTime: bF, isoTime: FF })
  function gn (e, t, r, a) {
    const n = Object.getPrototypeOf(t)
    ;(t[r] = t.levelVal > t.levels.values[r] ? gi : n[r] ? n[r] : mi[r] || mi[a] || gi), SF(e, t, r)
  }
  function SF (e, t, r) {
    ;(!e.transmit && t[r] === gi) ||
      (t[r] = (function (a) {
        return function () {
          const o = e.timestamp()
          const i = new Array(arguments.length)
          const s = Object.getPrototypeOf && Object.getPrototypeOf(this) === mi ? mi : this
          for (var u = 0; u < i.length; u++) i[u] = arguments[u]
          if (
            (e.serialize && !e.asObject && Ds(i, this._serialize, this.serializers, this._stdErrSerialize),
            e.asObject ? a.call(s, CF(this, r, i, o)) : a.apply(s, i),
            e.transmit)
          ) {
            const c = e.transmit.level || t.level
            const l = _t.levels.values[c]
            const d = _t.levels.values[r]
            if (d < l) return
            xF(
              this,
              {
                ts: o,
                methodLevel: r,
                methodValue: d,
                transmitLevel: c,
                transmitValue: _t.levels.values[e.transmit.level || t.level],
                send: e.transmit.send,
                val: t.levelVal,
              },
              i
            )
          }
        }
      })(t[r]))
  }
  function CF (e, t, r, a) {
    e._serialize && Ds(r, e._serialize, e.serializers, e._stdErrSerialize)
    const n = r.slice()
    let o = n[0]
    const i = {}
    a && (i.time = a), (i.level = _t.levels.values[t])
    let s = (e._childLevel | 0) + 1
    if ((s < 1 && (s = 1), o !== null && typeof o === 'object')) {
      for (; s-- && typeof n[0] === 'object';) Object.assign(i, n.shift())
      o = n.length ? jg(n.shift(), n) : void 0
    } else typeof o === 'string' && (o = jg(n.shift(), n))
    return o !== void 0 && (i.msg = o), i
  }
  function Ds (e, t, r, a) {
    for (const n in e) {
      if (a && e[n] instanceof Error) e[n] = _t.stdSerializers.err(e[n])
      else if (typeof e[n] === 'object' && !Array.isArray(e[n])) {
        for (const o in e[n]) t && t.indexOf(o) > -1 && o in r && (e[n][o] = r[o](e[n][o]))
      }
    }
  }
  function hn (e, t, r) {
    return function () {
      const a = new Array(1 + arguments.length)
      a[0] = t
      for (var n = 1; n < a.length; n++) a[n] = arguments[n - 1]
      return e[r].apply(this, a)
    }
  }
  function xF (e, t, r) {
    const a = t.send
    const n = t.ts
    const o = t.methodLevel
    const i = t.methodValue
    const s = t.val
    const u = e._logEvent.bindings
    Ds(
      r,
      e._serialize || Object.keys(e.serializers),
      e.serializers,
      e._stdErrSerialize === void 0 ? !0 : e._stdErrSerialize
    ),
    (e._logEvent.ts = n),
    (e._logEvent.messages = r.filter(function (c) {
      return u.indexOf(c) === -1
    })),
    (e._logEvent.level.label = o),
    (e._logEvent.level.value = i),
    a(o, e._logEvent, s),
    (e._logEvent = Pd(u))
  }
  function Pd (e) {
    return { ts: 0, messages: [], bindings: e || [], level: { label: '', value: 0 } }
  }
  function RF (e) {
    const t = { type: e.constructor.name, msg: e.message, stack: e.stack }
    for (const r in e) t[r] === void 0 && (t[r] = e[r])
    return t
  }
  function vF (e) {
    return typeof e.timestamp === 'function' ? e.timestamp : e.timestamp === !1 ? Bg : Ug
  }
  function Vs () {
    return {}
  }
  function Id (e) {
    return e
  }
  function gi () {}
  function Bg () {
    return !1
  }
  function Ug () {
    return Date.now()
  }
  function bF () {
    return Math.round(Date.now() / 1e3)
  }
  function FF () {
    return new Date(Date.now()).toISOString()
  }
  function AF () {
    function e (t) {
      return typeof t !== 'undefined' && t
    }
    try {
      return (
        typeof globalThis !== 'undefined' ||
          Object.defineProperty(Object.prototype, 'globalThis', {
            get: function () {
              return delete Object.prototype.globalThis, (this.globalThis = this)
            },
            configurable: !0,
          }),
        globalThis
      )
    } catch {
      return e(self) || e(window) || e(this) || {}
    }
  }
})
var Yh = fe((bc, Wh) => {
  ;(function (e, t) {
    typeof bc === 'object' && typeof Wh !== 'undefined'
      ? t(bc)
      : typeof define === 'function' && define.amd
        ? define(['exports'], t)
        : ((e = typeof globalThis !== 'undefined' ? globalThis : e || self), t((e['fast-equals'] = {})))
  })(bc, function (e) {
    var t = typeof WeakSet === 'function'
    var r = Object.keys
    function a (I, _) {
      return I === _ || (I !== I && _ !== _)
    }
    function n (I) {
      return I.constructor === Object || I.constructor == null
    }
    function o (I) {
      return !!I && typeof I.then === 'function'
    }
    function i (I) {
      return !!(I && I.$$typeof)
    }
    function s () {
      var I = []
      return {
        add: function (_) {
          I.push(_)
        },
        has: function (_) {
          return I.indexOf(_) !== -1
        },
      }
    }
    var u = (function (I) {
      return I
        ? function () {
          return new WeakSet()
        }
        : s
    })(t)
    function c (I) {
      return function (ne) {
        var M = I || ne
        return function (T, L, E) {
          E === void 0 && (E = u())
          var $ = !!T && typeof T === 'object'
          var H = !!L && typeof L === 'object'
          if ($ || H) {
            var re = $ && E.has(T)
            var le = H && E.has(L)
            if (re || le) return re && le
            $ && E.add(T), H && E.add(L)
          }
          return M(T, L, E)
        }
      }
    }
    function l (I, _, ne, M) {
      var A = I.length
      if (_.length !== A) return !1
      for (; A-- > 0;) if (!ne(I[A], _[A], M)) return !1
      return !0
    }
    function d (I, _, ne, M) {
      var A = I.size === _.size
      if (A && I.size) {
        var T = {}
        I.forEach(function (L, E) {
          if (A) {
            var $ = !1
            var H = 0
            _.forEach(function (re, le) {
              !$ && !T[H] && (($ = ne(E, le, M) && ne(L, re, M)), $ && (T[H] = !0)), H++
            }),
            (A = $)
          }
        })
      }
      return A
    }
    var m = '_owner'
    var p = Function.prototype.bind.call(Function.prototype.call, Object.prototype.hasOwnProperty)
    function f (I, _, ne, M) {
      var A = r(I)
      var T = A.length
      if (r(_).length !== T) return !1
      if (T) {
        for (var L = void 0; T-- > 0;) {
          if (((L = A[T]), L === m)) {
            var E = i(I)
            var $ = i(_)
            if ((E || $) && E !== $) return !1
          }
          if (!p(_, L) || !ne(I[L], _[L], M)) return !1
        }
      }
      return !0
    }
    function h (I, _) {
      return (
        I.source === _.source &&
        I.global === _.global &&
        I.ignoreCase === _.ignoreCase &&
        I.multiline === _.multiline &&
        I.unicode === _.unicode &&
        I.sticky === _.sticky &&
        I.lastIndex === _.lastIndex
      )
    }
    function C (I, _, ne, M) {
      var A = I.size === _.size
      if (A && I.size) {
        var T = {}
        I.forEach(function (L) {
          if (A) {
            var E = !1
            var $ = 0
            _.forEach(function (H) {
              !E && !T[$] && ((E = ne(L, H, M)), E && (T[$] = !0)), $++
            }),
            (A = E)
          }
        })
      }
      return A
    }
    var x = typeof Map === 'function'
    var R = typeof Set === 'function'
    function F (I) {
      var _ = typeof I === 'function' ? I(ne) : ne
      function ne (M, A, T) {
        if (M === A) return !0
        if (M && A && typeof M === 'object' && typeof A === 'object') {
          if (n(M) && n(A)) return f(M, A, _, T)
          var L = Array.isArray(M)
          var E = Array.isArray(A)
          return L || E
            ? L === E && l(M, A, _, T)
            : ((L = M instanceof Date),
            (E = A instanceof Date),
            L || E
              ? L === E && a(M.getTime(), A.getTime())
              : ((L = M instanceof RegExp),
              (E = A instanceof RegExp),
              L || E
                ? L === E && h(M, A)
                : o(M) || o(A)
                  ? M === A
                  : x && ((L = M instanceof Map), (E = A instanceof Map), L || E)
                    ? L === E && d(M, A, _, T)
                    : R && ((L = M instanceof Set), (E = A instanceof Set), L || E)
                      ? L === E && C(M, A, _, T)
                      : f(M, A, _, T)))
        }
        return M !== M && A !== A
      }
      return ne
    }
    var P = F()
    var U = F(function () {
      return a
    })
    var X = F(c())
    var z = F(c(a))
    ;(e.circularDeepEqual = X),
    (e.circularShallowEqual = z),
    (e.createCustomEqual = F),
    (e.deepEqual = P),
    (e.sameValueZeroEqual = a),
    (e.shallowEqual = U),
    Object.defineProperty(e, '__esModule', { value: !0 })
  })
})
var oh = {}
Xu(oh, {
  buildMockCaseAssistEngine: () => rh,
  buildMockProductListingEngine: () => th,
  buildMockProductRecommendationsAppEngine: () => eh,
  buildMockRaw: () => zs,
  buildMockRecommendationAppEngine: () => Zg,
  buildMockResult: () => nh,
  buildMockSearchAppEngine: () => Xg,
  createMockState: () => $i,
})
var jp = ve(wp())
var Bp = ve(Mp())
var Eo = class extends Error {
  constructor () {
    super()
    ;(this.name = 'ExpiredToken'), (this.message = 'The token being used to perform the request is expired.')
  }
}
var Va = class extends Error {
  constructor (t, r) {
    super()
    ;(this.name = 'Disconnected'),
    (this.message = `Client could not connect to the following URL: ${t}`),
    (this.statusCode = r != null ? r : 0)
  }
}
function Qp (e) {
  const t = []
  for (const r in e) {
    const a = encodeURIComponent(r)
    const n = encodeURIComponent(e[r])
    t.push(`${a}=${n}`)
  }
  return t.join('&')
}
function Lp (e) {
  return typeof e !== 'object' || !e ? !1 : Object.values(e).every(ix)
}
function ix (e) {
  return typeof e === 'string' || typeof e === 'number' || typeof e === 'boolean'
}
function Up (e) {
  return e === 429
}
var et = class {
  static async call (t) {
    const r = sx(t)
    const { preprocessRequest: a, logger: n, requestMetadata: o } = t
    const i = { ...r, ...(a ? await a(r, 'searchApiFetch', o) : {}) }
    n.info(i, 'Platform request')
    const { url: s, ...u } = i
    const c = async () => {
      const l = await (0, jp.default)(s, u)
      if (Up(l.status)) throw l
      return l
    }
    try {
      const l = await (0, Bp.backOff)(c, {
        retry: (d) => {
          const m = d && Up(d.status)
          return m && n.info('Platform retrying request'), m
        },
      })
      if (l.status === 419) throw (n.info('Platform renewing token'), new Eo())
      if (l.status === 404) throw new Va(s, l.status)
      return n.info({ response: l, requestInfo: i }, 'Platform response'), l
    } catch (l) {
      return l.message === 'Failed to fetch' ? new Va(s) : l
    }
  }
}
function _p (e, t) {
  const r = !t || !t.environment || t.environment === 'prod' ? '' : t.environment
  const a = !t || !t.region || t.region === 'us' ? '' : `-${t.region}`
  return `https://${e}${r}${a}.cloud.coveo.com`
}
function Oi (e) {
  return (e == null ? void 0 : e.multiRegionSubDomain)
    ? `https://${e.multiRegionSubDomain}.org.coveo.com`
    : _p('platform', e)
}
function sl (e) {
  return _p('analytics', e)
}
function sx (e) {
  const { url: t, method: r, requestParams: a, contentType: n, accessToken: o, signal: i } = e
  const s = e.method === 'POST' || e.method === 'PUT'
  const u = cx(a, n)
  return {
    url: t,
    method: r,
    headers: { 'Content-Type': n, Authorization: `Bearer ${o}`, ...e.headers },
    ...(s && { body: u }),
    signal: i,
  }
}
function cx (e, t) {
  return t === 'application/x-www-form-urlencoded' ? (Lp(e) ? Qp(e) : '') : JSON.stringify(e)
}
var Ti = ve(qi())
var zp = ve($p())
var Wp = ve(Hp())
Ti.default.extend(zp.default)
Ti.default.extend(Wp.default)
var ml = '/rest/search/v2'
var ki = '/rest/ua'
var De = () => ({
  organizationId: '',
  accessToken: '',
  platformUrl: Oi(),
  search: {
    apiBaseUrl: `${Oi()}${ml}`,
    locale: 'en-US',
    timezone: Ti.default.tz.guess(),
    authenticationProviders: [],
  },
  analytics: {
    enabled: !0,
    apiBaseUrl: `${sl()}${ki}`,
    originContext: 'Search',
    originLevel2: 'default',
    originLevel3: 'default',
    anonymous: !1,
    deviceId: '',
    userDisplayName: '',
    documentLocation: '',
  },
})
var ye = () => ({ q: '', enableQuerySyntax: !1 })
var Di = () => ({ redirectTo: null })
function la () {
  return {}
}
function gl () {
  return {
    answerSnippet: '',
    documentId: { contentIdKey: '', contentIdValue: '' },
    question: '',
    relatedQuestions: [],
    score: 0,
  }
}
function Ee () {
  return {
    response: {
      results: [],
      searchUid: '',
      totalCountFiltered: 0,
      facets: [],
      queryCorrections: [],
      triggers: [],
      questionAnswer: gl(),
      pipeline: '',
      splitTestRun: '',
    },
    duration: 0,
    queryExecuted: '',
    error: null,
    automaticallyCorrected: !1,
    isLoading: !1,
    results: [],
    searchResponseId: '',
    requestId: '',
  }
}
function Ve () {
  return { firstResult: 0, defaultNumberOfResults: 10, numberOfResults: 10, totalCountFiltered: 0 }
}
function ux (e, t) {
  const r = `
  The following properties are invalid:

    ${e.join(`
	`)}
  
  ${t}
  `
  return new wo(r)
}
var wo = class extends Error {
  constructor (e) {
    super(e)
    this.name = 'SchemaValidationError'
  }
}
var K = class {
  constructor (e) {
    this.definition = e
  }

  validate (e = {}, t = '') {
    const r = { ...this.default, ...e }
    const a = []
    for (const n in this.definition) {
      const o = this.definition[n].validate(r[n])
      o && a.push(`${n}: ${o}`)
    }
    if (a.length) throw ux(a, t)
    return r
  }

  get default () {
    const e = {}
    for (const t in this.definition) {
      const r = this.definition[t].default
      r !== void 0 && (e[t] = r)
    }
    return e
  }
}
var me = class {
  constructor (e = {}) {
    this.baseConfig = e
  }

  validate (e) {
    return this.baseConfig.required && ae(e) ? 'value is required.' : null
  }

  get default () {
    return this.baseConfig.default instanceof Function ? this.baseConfig.default() : this.baseConfig.default
  }

  get required () {
    return this.baseConfig.required === !0
  }
}
function Fe (e) {
  return e === void 0
}
function lx (e) {
  return e === null
}
function ae (e) {
  return Fe(e) || lx(e)
}
var j = class {
  constructor (e = {}) {
    ;(this.config = e), (this.value = new me(e))
  }

  validate (e) {
    const t = this.value.validate(e)
    return (
      t ||
      (dx(e)
        ? e < this.config.min
          ? `minimum value of ${this.config.min} not respected.`
          : e > this.config.max
            ? `maximum value of ${this.config.max} not respected.`
            : null
        : 'value is not a number.')
    )
  }

  get default () {
    return this.value.default
  }

  get required () {
    return this.value.required
  }
}
function dx (e) {
  return Fe(e) || Yp(e)
}
function Yp (e) {
  return typeof e === 'number' && !isNaN(e)
}
var G = class {
  constructor (e = {}) {
    this.value = new me(e)
  }

  validate (e) {
    const t = this.value.validate(e)
    return t || (px(e) ? null : 'value is not a boolean.')
  }

  get default () {
    return this.value.default
  }

  get required () {
    return this.value.required
  }
}
function px (e) {
  return Fe(e) || Kp(e)
}
function Kp (e) {
  return typeof e === 'boolean'
}
var fx =
  /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
var w = class {
  constructor (e = {}) {
    ;(this.config = { emptyAllowed: !0, url: !1, ...e }), (this.value = new me(this.config))
  }

  validate (e) {
    const { emptyAllowed: t, url: r, regex: a, constrainTo: n } = this.config
    const o = this.value.validate(e)
    return (
      o ||
      (Fe(e)
        ? null
        : Na(e)
          ? !t && !e.length
            ? 'value is an empty string.'
            : r && !fx.test(e)
              ? 'value is not a valid URL.'
              : a && !a.test(e)
                ? `value did not match provided regex ${a}`
                : n && !n.includes(e)
                  ? `value should be one of: ${n.join(', ')}.`
                  : null
          : 'value is not a string.')
    )
  }

  get default () {
    return this.value.default
  }

  get required () {
    return this.value.required
  }
}
function Na (e) {
  return Object.prototype.toString.call(e) === '[object String]'
}
var Q = class {
  constructor (e = {}) {
    this.config = { options: { required: !1 }, values: {}, ...e }
  }

  validate (e) {
    if (Fe(e)) return this.config.options.required ? 'value is required and is currently undefined' : null
    if (!Gp(e)) return 'value is not an object'
    for (const [r, a] of Object.entries(this.config.values)) {
      if (a.required && ae(e[r])) return `value does not contain ${r}`
    }
    let t = ''
    for (const [r, a] of Object.entries(this.config.values)) {
      const n = e[r]
      const o = a.validate(n)
      o !== null && (t += ' ' + o)
    }
    return t === '' ? null : t
  }

  get default () {}
  get required () {
    return !!this.config.options.required
  }
}
function Gp (e) {
  return e !== void 0 && typeof e === 'object'
}
var Y = class {
  constructor (e = {}) {
    ;(this.config = e), (this.value = new me(this.config))
  }

  validate (e) {
    if (!ae(e) && !Array.isArray(e)) return 'value is not an array'
    const t = this.value.validate(e)
    if (t !== null) return t
    if (ae(e)) return null
    if (this.config.max !== void 0 && e.length > this.config.max) return `value contains more than ${this.config.max}`
    if (this.config.min !== void 0 && e.length < this.config.min) return `value contains less than ${this.config.min}`
    if (this.config.each !== void 0) {
      let r = ''
      return (
        e.forEach((a) => {
          this.config.each.required && ae(a) && (r = `value is null or undefined: ${e.join(',')}`)
          const n = this.validatePrimitiveValue(a, this.config.each)
          n !== null && (r += ' ' + n)
        }),
        r === '' ? null : r
      )
    }
    return null
  }

  validatePrimitiveValue (e, t) {
    return Kp(e) || Na(e) || Yp(e) || Gp(e) ? t.validate(e) : 'value is not a primitive value'
  }

  get default () {}
  get required () {
    return this.value.required
  }
}
function Ma (e) {
  return Array.isArray(e)
}
var Ot = class {
  constructor (e) {
    ;(this.config = e), (this.value = new me(e))
  }

  validate (e) {
    const t = this.value.validate(e)
    return t !== null
      ? t
      : Fe(e) || Object.values(this.config.enum).find((a) => a === e)
        ? null
        : 'value is not in enum.'
  }

  get default () {
    return this.value.default
  }

  get required () {
    return this.value.required
  }
}
var Ar = ((r) => ((r.Ascending = 'ascending'), (r.Descending = 'descending'), r))(Ar || {})
var qt = ((o) => (
  (o.Relevancy = 'relevancy'), (o.QRE = 'qre'), (o.Date = 'date'), (o.Field = 'field'), (o.NoSort = 'nosort'), o
))(qt || {})
var ur = (e) => {
  if (Ma(e)) return e.map((t) => ur(t)).join(',')
  switch (e.by) {
    case 'relevancy':
    case 'qre':
    case 'nosort':
      return e.by
    case 'date':
      return `date ${e.order}`
    case 'field':
      return `@${e.field} ${e.order}`
    default:
      return ''
  }
}
var Oo = () => ({ by: 'relevancy' })
var hl = (e) => ({ by: 'date', order: e })
var yl = (e, t) => ({ by: 'field', order: t, field: e })
var Sl = () => ({ by: 'qre' })
var Cl = () => ({ by: 'nosort' })
var Jp = new Q({ values: { by: new Ot({ enum: qt, required: !0 }), order: new Ot({ enum: Ar }), field: new w() } })
function Ke () {
  return ur(Oo())
}
function St () {
  return {}
}
function tt () {
  return { contextValues: {} }
}
var Vi = () => ({ correctedQuery: '', wordCorrections: [], originalQuery: '' })
function qo () {
  return {
    enableDidYouMean: !1,
    wasCorrectedTo: '',
    wasAutomaticallyCorrected: !1,
    queryCorrection: Vi(),
    originalQuery: '',
  }
}
function Ct () {
  return {}
}
function xt () {
  return {}
}
var xl = ['author', 'language', 'urihash', 'objecttype', 'collection', 'source', 'permanentid']
var Xp = [...xl, 'date', 'filetype', 'parents']
var mx = [
  ...Xp,
  'ec_price',
  'ec_name',
  'ec_description',
  'ec_brand',
  'ec_category',
  'ec_item_group_id',
  'ec_shortdesc',
  'ec_thumbnails',
  'ec_images',
  'ec_promo_price',
  'ec_in_stock',
  'ec_rating',
]
var da = () => ({ fieldsToInclude: xl, fetchAllFields: !1, fieldsDescription: [] })
var rt = () => ''
var Ni = (e) => ({ past: [], present: e, future: [] })
var gx = (e) => {
  const { past: t, present: r, future: a } = e
  if (!r || t.length === 0) return e
  const n = t[t.length - 1]
  return { past: t.slice(0, t.length - 1), present: n, future: [r, ...a] }
}
var hx = (e) => {
  const { past: t, present: r, future: a } = e
  if (!r || a.length === 0) return e
  const n = a[0]
  const o = a.slice(1)
  return { past: [...t, r], present: n, future: o }
}
var yx = (e) => {
  const { action: t, state: r, reducer: a } = e
  const { past: n, present: o } = r
  const i = a(o, t)
  return o ? (o === i ? r : { past: [...n, o], present: i, future: [] }) : Ni(i)
}
var Zp = (e) => {
  const { actionTypes: t, reducer: r } = e
  const a = Ni()
  return (n = a, o) => {
    switch (o.type) {
      case t.undo:
        return gx(n)
      case t.redo:
        return hx(n)
      case t.snapshot:
        return yx({ state: n, reducer: r, action: o })
      default:
        return n
    }
  }
}
var we = () => 'default'
function Rt () {
  return {}
}
function pa () {
  return {}
}
function Qa () {
  return {}
}
var _e = () => ({
  cq: '',
  cqWasSet: !1,
  aq: '',
  aqWasSet: !1,
  lq: '',
  lqWasSet: !1,
  dq: '',
  dqWasSet: !1,
  defaultFilters: { cq: '', aq: '', lq: '', dq: '' },
})
function La () {
  return { enabled: !0 }
}
function lr () {
  return { freezeFacetOrder: !1, facets: {} }
}
var $e = () => !1
function Tt () {
  return { contextValues: {} }
}
function Pr () {
  return []
}
function ja () {
  return {}
}
function Mi (e) {
  return e ? e.expiresAt && Date.now() >= e.expiresAt : !1
}
function fa () {
  return {}
}
function ma () {
  return {}
}
function Qi () {
  return To({})
}
function To (e) {
  var t, r
  return {
    context: e.context || tt(),
    dictionaryFieldContext: e.dictionaryFieldContext || Tt(),
    facetSet: e.facetSet || St(),
    numericFacetSet: e.numericFacetSet || xt(),
    dateFacetSet: e.dateFacetSet || Ct(),
    categoryFacetSet: e.categoryFacetSet || Rt(),
    pagination: e.pagination || Ve(),
    query: e.query || ye(),
    tabSet: e.tabSet || ma(),
    advancedSearchQueries: e.advancedSearchQueries || _e(),
    staticFilterSet: e.staticFilterSet || fa(),
    querySet: e.querySet || la(),
    instantResults: e.instantResults || ja(),
    sortCriteria: e.sortCriteria || Ke(),
    pipeline: e.pipeline || rt(),
    searchHub: e.searchHub || we(),
    facetOptions: e.facetOptions || lr(),
    facetOrder: (t = e.facetOrder) != null ? t : Pr(),
    debug: (r = e.debug) != null ? r : $e(),
  }
}
function ga () {
  return { uniqueId: '', content: '', isLoading: !1 }
}
var Ba = () => ({
  enabled: !1,
  fields: { collection: 'foldingcollection', parent: 'foldingparent', child: 'foldingchild' },
  filterFieldRange: 2,
  collections: {},
})
var Li = () => ({
  redirectTo: '',
  query: '',
  execute: { functionName: '', params: [] },
  executions: [],
  notification: '',
  notifications: [],
  queryModification: { originalQuery: '', newQuery: '', queryToIgnore: '' },
})
var ko = () => ({ liked: !1, disliked: !1, expanded: !1, feedbackModalOpen: !1, relatedQuestions: [] })
function ji () {
  return {}
}
function Bi () {
  return { results: [], maxLength: 10 }
}
function Ui () {
  return { queries: [], maxLength: 10 }
}
function _i () {
  return { length: void 0 }
}
function $i (e = {}) {
  return {
    configuration: De(),
    advancedSearchQueries: _e(),
    staticFilterSet: fa(),
    facetSet: St(),
    dateFacetSet: Ct(),
    numericFacetSet: xt(),
    categoryFacetSet: Rt(),
    facetSearchSet: pa(),
    categoryFacetSearchSet: Qa(),
    facetOptions: lr(),
    pagination: Ve(),
    query: ye(),
    querySet: la(),
    instantResults: ja(),
    tabSet: ma(),
    querySuggest: {},
    redirection: Di(),
    search: Ee(),
    sortCriteria: Ke(),
    context: tt(),
    dictionaryFieldContext: Tt(),
    didYouMean: qo(),
    fields: da(),
    history: Ni(Qi()),
    pipeline: rt(),
    facetOrder: Pr(),
    searchHub: we(),
    debug: $e(),
    resultPreview: ga(),
    version: 'unit-testing-version',
    folding: Ba(),
    triggers: Li(),
    questionAnswering: ko(),
    standaloneSearchBoxSet: ji(),
    recentResults: Bi(),
    recentQueries: Ui(),
    excerptLength: _i(),
    ...e,
  }
}
var Gg = ve(pf())
var g = {}
Xu(g, {
  MiddlewareArray: () => kf,
  TaskAbortError: () => Ko,
  addListener: () => om,
  clearAllListeners: () => im,
  configureStore: () => _l,
  createAction: () => y,
  createAsyncThunk: () => ee,
  createDraftSafeSelector: () => pr,
  createEntityAdapter: () => qR,
  createImmutableStateInvariantMiddleware: () => hR,
  createListenerMiddleware: () => YR,
  createNextState: () => wr,
  createReducer: () => O,
  createSelector: () => Ki,
  createSerializableStateInvariantMiddleware: () => yR,
  createSlice: () => AR,
  current: () => Lo,
  findNonSerializableValue: () => Ji,
  freeze: () => Qo,
  getDefaultMiddleware: () => Xi,
  getType: () => vR,
  isAllOf: () => zl,
  isAnyOf: () => Wo,
  isAsyncThunkAction: () => Kf,
  isDraft: () => Me,
  isFulfilled: () => Yf,
  isImmutableDefault: () => Nf,
  isPending: () => zf,
  isPlain: () => Bl,
  isPlainObject: () => Gi,
  isRejected: () => es,
  isRejectedWithValue: () => Wf,
  miniSerializeError: () => _f,
  nanoid: () => $l,
  original: () => ff,
  removeListener: () => sm,
  unwrapResult: () => $f,
})
function Ge (e) {
  for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++) r[a - 1] = arguments[a]
  throw Error(
    '[Immer] minified error nr: ' +
      e +
      (r.length
        ? ' ' +
          r
            .map(function (i) {
              return "'" + i + "'"
            })
            .join(',')
        : '') +
      '. Find the full error at: https://bit.ly/3cXEKWf'
  )
}
function Me (e) {
  return !!e && !!e[ge]
}
function vt (e) {
  return (
    !!e &&
    ((function (t) {
      if (!t || typeof t !== 'object') return !1
      var r = Object.getPrototypeOf(t)
      if (r === null) return !0
      var a = Object.hasOwnProperty.call(r, 'constructor') && r.constructor
      return a === Object || (typeof a === 'function' && Function.toString.call(a) === Jx)
    })(e) ||
      Array.isArray(e) ||
      !!e[Ff] ||
      !!e.constructor[Ff] ||
      Al(e) ||
      Pl(e))
  )
}
function ff (e) {
  return Me(e) || Ge(23, e), e[ge].t
}
function ha (e, t, r) {
  r === void 0 && (r = !1),
  Ua(e) === 0
    ? (r ? Object.keys : $a)(e).forEach(function (a) {
      ;(r && typeof a === 'symbol') || t(a, e[a], e)
    })
    : e.forEach(function (a, n) {
      return t(n, a, e)
    })
}
function Ua (e) {
  var t = e[ge]
  return t ? (t.i > 3 ? t.i - 4 : t.i) : Array.isArray(e) ? 1 : Al(e) ? 2 : Pl(e) ? 3 : 0
}
function _a (e, t) {
  return Ua(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t)
}
function Hx (e, t) {
  return Ua(e) === 2 ? e.get(t) : e[t]
}
function mf (e, t, r) {
  var a = Ua(e)
  a === 2 ? e.set(t, r) : a === 3 ? (e.delete(t), e.add(r)) : (e[t] = r)
}
function gf (e, t) {
  return e === t ? e !== 0 || 1 / e == 1 / t : e != e && t != t
}
function Al (e) {
  return Kx && e instanceof Map
}
function Pl (e) {
  return Gx && e instanceof Set
}
function Ir (e) {
  return e.o || e.t
}
function Il (e) {
  if (Array.isArray(e)) return Array.prototype.slice.call(e)
  var t = Af(e)
  delete t[ge]
  for (var r = $a(t), a = 0; a < r.length; a++) {
    var n = r[a]
    var o = t[n]
    o.writable === !1 && ((o.writable = !0), (o.configurable = !0)),
    (o.get || o.set) && (t[n] = { configurable: !0, writable: !0, enumerable: o.enumerable, value: e[n] })
  }
  return Object.create(Object.getPrototypeOf(e), t)
}
function Qo (e, t) {
  return (
    t === void 0 && (t = !1),
    El(e) ||
      Me(e) ||
      !vt(e) ||
      (Ua(e) > 1 && (e.set = e.add = e.clear = e.delete = zx),
      Object.freeze(e),
      t &&
        ha(
          e,
          function (r, a) {
            return Qo(a, !0)
          },
          !0
        )),
    e
  )
}
function zx () {
  Ge(2)
}
function El (e) {
  return e == null || typeof e !== 'object' || Object.isFrozen(e)
}
function kt (e) {
  var t = Ml[e]
  return t || Ge(18, e), t
}
function Wx (e, t) {
  Ml[e] || (Ml[e] = t)
}
function wl () {
  return jo
}
function Ol (e, t) {
  t && (kt('Patches'), (e.u = []), (e.s = []), (e.v = t))
}
function Hi (e) {
  ql(e), e.p.forEach(Yx), (e.p = null)
}
function ql (e) {
  e === jo && (jo = e.l)
}
function hf (e) {
  return (jo = { p: [], l: jo, h: e, m: !0, _: 0 })
}
function Yx (e) {
  var t = e[ge]
  t.i === 0 || t.i === 1 ? t.j() : (t.O = !0)
}
function Tl (e, t) {
  t._ = t.p.length
  var r = t.p[0]
  var a = e !== void 0 && e !== r
  return (
    t.h.g || kt('ES5').S(t, e, a),
    a
      ? (r[ge].P && (Hi(t), Ge(4)),
      vt(e) && ((e = zi(t, e)), t.l || Wi(t, e)),
      t.u && kt('Patches').M(r[ge].t, e, t.u, t.s))
      : (e = zi(t, r, [])),
    Hi(t),
    t.u && t.v(t.u, t.s),
    e !== bf ? e : void 0
  )
}
function zi (e, t, r) {
  if (El(t)) return t
  var a = t[ge]
  if (!a) {
    return (
      ha(
        t,
        function (o, i) {
          return yf(e, a, t, o, i, r)
        },
        !0
      ),
      t
    )
  }
  if (a.A !== e) return t
  if (!a.P) return Wi(e, a.t, !0), a.t
  if (!a.I) {
    ;(a.I = !0), a.A._--
    var n = a.i === 4 || a.i === 5 ? (a.o = Il(a.k)) : a.o
    ha(a.i === 3 ? new Set(n) : n, function (o, i) {
      return yf(e, a, n, o, i, r)
    }),
    Wi(e, n, !1),
    r && e.u && kt('Patches').R(a, r, e.u, e.s)
  }
  return a.o
}
function yf (e, t, r, a, n, o) {
  if (Me(n)) {
    var i = zi(e, n, o && t && t.i !== 3 && !_a(t.D, a) ? o.concat(a) : void 0)
    if ((mf(r, a, i), !Me(i))) return
    e.m = !1
  }
  if (vt(n) && !El(n)) {
    if (!e.h.F && e._ < 1) return
    zi(e, n), (t && t.A.l) || Wi(e, n)
  }
}
function Wi (e, t, r) {
  r === void 0 && (r = !1), e.h.F && e.m && Qo(t, r)
}
function kl (e, t) {
  var r = e[ge]
  return (r ? Ir(r) : e)[t]
}
function Sf (e, t) {
  if (t in e) {
    for (var r = Object.getPrototypeOf(e); r;) {
      var a = Object.getOwnPropertyDescriptor(r, t)
      if (a) return a
      r = Object.getPrototypeOf(r)
    }
  }
}
function Er (e) {
  e.P || ((e.P = !0), e.l && Er(e.l))
}
function Dl (e) {
  e.o || (e.o = Il(e.t))
}
function Vl (e, t, r) {
  var a = Al(t)
    ? kt('MapSet').N(t, r)
    : Pl(t)
      ? kt('MapSet').T(t, r)
      : e.g
        ? (function (n, o) {
          var i = Array.isArray(n)
          var s = { i: i ? 1 : 0, A: o ? o.A : wl(), P: !1, I: !1, D: {}, l: o, t: n, k: null, o: null, j: null, C: !1 }
          var u = s
          var c = Bo
          i && ((u = [s]), (c = Uo))
          var l = Proxy.revocable(u, c)
          var d = l.revoke
          var m = l.proxy
          return (s.k = m), (s.j = d), m
        })(t, r)
        : kt('ES5').J(t, r)
  return (r ? r.A : wl()).p.push(a), a
}
function Lo (e) {
  return (
    Me(e) || Ge(22, e),
    (function t (r) {
      if (!vt(r)) return r
      var a
      var n = r[ge]
      var o = Ua(r)
      if (n) {
        if (!n.P && (n.i < 4 || !kt('ES5').K(n))) return n.t
        ;(n.I = !0), (a = Cf(r, o)), (n.I = !1)
      } else a = Cf(r, o)
      return (
        ha(a, function (i, s) {
          ;(n && Hx(n.t, i) === s) || mf(a, i, t(s))
        }),
        o === 3 ? new Set(a) : a
      )
    })(e)
  )
}
function Cf (e, t) {
  switch (t) {
    case 2:
      return new Map(e)
    case 3:
      return Array.from(e)
  }
  return Il(e)
}
function xf () {
  function e (i, s) {
    var u = o[i]
    return (
      u
        ? (u.enumerable = s)
        : (o[i] = u =
            {
              configurable: !0,
              enumerable: s,
              get: function () {
                var c = this[ge]
                return Bo.get(c, i)
              },
              set: function (c) {
                var l = this[ge]
                Bo.set(l, i, c)
              },
            }),
      u
    )
  }
  function t (i) {
    for (var s = i.length - 1; s >= 0; s--) {
      var u = i[s][ge]
      if (!u.P) {
        switch (u.i) {
          case 5:
            a(u) && Er(u)
            break
          case 4:
            r(u) && Er(u)
        }
      }
    }
  }
  function r (i) {
    for (var s = i.t, u = i.k, c = $a(u), l = c.length - 1; l >= 0; l--) {
      var d = c[l]
      if (d !== ge) {
        var m = s[d]
        if (m === void 0 && !_a(s, d)) return !0
        var p = u[d]
        var f = p && p[ge]
        if (f ? f.t !== m : !gf(p, m)) return !0
      }
    }
    var h = !!s[ge]
    return c.length !== $a(s).length + (h ? 0 : 1)
  }
  function a (i) {
    var s = i.k
    if (s.length !== i.t.length) return !0
    var u = Object.getOwnPropertyDescriptor(s, s.length - 1)
    if (u && !u.get) return !0
    for (var c = 0; c < s.length; c++) if (!s.hasOwnProperty(c)) return !0
    return !1
  }
  var o = {}
  Wx('ES5', {
    J: function (i, s) {
      var u = Array.isArray(i)
      var c = (function (d, m) {
        if (d) {
          for (var p = Array(m.length), f = 0; f < m.length; f++) Object.defineProperty(p, '' + f, e(f, !0))
          return p
        }
        var h = Af(m)
        delete h[ge]
        for (var C = $a(h), x = 0; x < C.length; x++) {
          var R = C[x]
          h[R] = e(R, d || !!h[R].enumerable)
        }
        return Object.create(Object.getPrototypeOf(m), h)
      })(u, i)
      var l = { i: u ? 5 : 4, A: s ? s.A : wl(), P: !1, I: !1, D: {}, l: s, t: i, k: c, o: null, O: !1, C: !1 }
      return Object.defineProperty(c, ge, { value: l, writable: !0 }), c
    },
    S: function (i, s, u) {
      u
        ? Me(s) && s[ge].A === i && t(i.p)
        : (i.u &&
            (function c (l) {
              if (l && typeof l === 'object') {
                var d = l[ge]
                if (d) {
                  var m = d.t
                  var p = d.k
                  var f = d.D
                  var h = d.i
                  if (h === 4) {
                    ha(p, function (P) {
                      P !== ge && (m[P] !== void 0 || _a(m, P) ? f[P] || c(p[P]) : ((f[P] = !0), Er(d)))
                    }),
                    ha(m, function (P) {
                      p[P] !== void 0 || _a(p, P) || ((f[P] = !1), Er(d))
                    })
                  } else if (h === 5) {
                    if ((a(d) && (Er(d), (f.length = !0)), p.length < m.length)) {
                      for (var C = p.length; C < m.length; C++) f[C] = !1
                    } else for (var x = m.length; x < p.length; x++) f[x] = !0
                    for (var R = Math.min(p.length, m.length), F = 0; F < R; F++) {
                      p.hasOwnProperty(F) || (f[F] = !0), f[F] === void 0 && c(p[F])
                    }
                  }
                }
              }
            })(i.p[0]),
        t(i.p))
    },
    K: function (i) {
      return i.i === 4 ? r(i) : a(i)
    },
  })
}
var Rf
var jo
var Nl = typeof Symbol !== 'undefined' && typeof Symbol('x') === 'symbol'
var Kx = typeof Map !== 'undefined'
var Gx = typeof Set !== 'undefined'
var vf = typeof Proxy !== 'undefined' && Proxy.revocable !== void 0 && typeof Reflect !== 'undefined'
var bf = Nl ? Symbol.for('immer-nothing') : (((Rf = {})['immer-nothing'] = !0), Rf)
var Ff = Nl ? Symbol.for('immer-draftable') : '__$immer_draftable'
var ge = Nl ? Symbol.for('immer-state') : '__$immer_state'
var Jx = '' + Object.prototype.constructor
var $a =
  typeof Reflect !== 'undefined' && Reflect.ownKeys
    ? Reflect.ownKeys
    : Object.getOwnPropertySymbols !== void 0
      ? function (e) {
        return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))
      }
      : Object.getOwnPropertyNames
var Af =
  Object.getOwnPropertyDescriptors ||
  function (e) {
    var t = {}
    return (
      $a(e).forEach(function (r) {
        t[r] = Object.getOwnPropertyDescriptor(e, r)
      }),
      t
    )
  }
var Ml = {}
var Bo = {
  get: function (e, t) {
    if (t === ge) return e
    var r = Ir(e)
    if (!_a(r, t)) {
      return (function (n, o, i) {
        var s
        var u = Sf(o, i)
        return u ? ('value' in u ? u.value : (s = u.get) === null || s === void 0 ? void 0 : s.call(n.k)) : void 0
      })(e, r, t)
    }
    var a = r[t]
    return e.I || !vt(a) ? a : a === kl(e.t, t) ? (Dl(e), (e.o[t] = Vl(e.A.h, a, e))) : a
  },
  has: function (e, t) {
    return t in Ir(e)
  },
  ownKeys: function (e) {
    return Reflect.ownKeys(Ir(e))
  },
  set: function (e, t, r) {
    var a = Sf(Ir(e), t)
    if (a == null ? void 0 : a.set) return a.set.call(e.k, r), !0
    if (!e.P) {
      var n = kl(Ir(e), t)
      var o = n == null ? void 0 : n[ge]
      if (o && o.t === r) return (e.o[t] = r), (e.D[t] = !1), !0
      if (gf(r, n) && (r !== void 0 || _a(e.t, t))) return !0
      Dl(e), Er(e)
    }
    return (e.o[t] === r && typeof r !== 'number' && (r !== void 0 || t in e.o)) || ((e.o[t] = r), (e.D[t] = !0), !0)
  },
  deleteProperty: function (e, t) {
    return kl(e.t, t) !== void 0 || t in e.t ? ((e.D[t] = !1), Dl(e), Er(e)) : delete e.D[t], e.o && delete e.o[t], !0
  },
  getOwnPropertyDescriptor: function (e, t) {
    var r = Ir(e)
    var a = Reflect.getOwnPropertyDescriptor(r, t)
    return a && { writable: !0, configurable: e.i !== 1 || t !== 'length', enumerable: a.enumerable, value: r[t] }
  },
  defineProperty: function () {
    Ge(11)
  },
  getPrototypeOf: function (e) {
    return Object.getPrototypeOf(e.t)
  },
  setPrototypeOf: function () {
    Ge(12)
  },
}
var Uo = {}
ha(Bo, function (e, t) {
  Uo[e] = function () {
    return (arguments[0] = arguments[0][0]), t.apply(this, arguments)
  }
}),
(Uo.deleteProperty = function (e, t) {
  return Uo.set.call(this, e, t, void 0)
}),
(Uo.set = function (e, t, r) {
  return Bo.set.call(this, e[0], t, r, e[0])
})
var Xx = (function () {
  function e (r) {
    var a = this
    ;(this.g = vf),
    (this.F = !0),
    (this.produce = function (n, o, i) {
      if (typeof n === 'function' && typeof o !== 'function') {
        var s = o
        o = n
        var u = a
        return function (h) {
          var C = this
          h === void 0 && (h = s)
          for (var x = arguments.length, R = Array(x > 1 ? x - 1 : 0), F = 1; F < x; F++) R[F - 1] = arguments[F]
          return u.produce(h, function (P) {
            var U
            return (U = o).call.apply(U, [C, P].concat(R))
          })
        }
      }
      var c
      if ((typeof o !== 'function' && Ge(6), i !== void 0 && typeof i !== 'function' && Ge(7), vt(n))) {
        var l = hf(a)
        var d = Vl(a, n, void 0)
        var m = !0
        try {
          ;(c = o(d)), (m = !1)
        } finally {
          m ? Hi(l) : ql(l)
        }
        return typeof Promise !== 'undefined' && c instanceof Promise
          ? c.then(
            function (h) {
              return Ol(l, i), Tl(h, l)
            },
            function (h) {
              throw (Hi(l), h)
            }
          )
          : (Ol(l, i), Tl(c, l))
      }
      if (!n || typeof n !== 'object') {
        if (((c = o(n)) === void 0 && (c = n), c === bf && (c = void 0), a.F && Qo(c, !0), i)) {
          var p = []
          var f = []
          kt('Patches').M(n, c, p, f), i(p, f)
        }
        return c
      }
      Ge(21, n)
    }),
    (this.produceWithPatches = function (n, o) {
      if (typeof n === 'function') {
        return function (c) {
          for (var l = arguments.length, d = Array(l > 1 ? l - 1 : 0), m = 1; m < l; m++) d[m - 1] = arguments[m]
          return a.produceWithPatches(c, function (p) {
            return n.apply(void 0, [p].concat(d))
          })
        }
      }
      var i
      var s
      var u = a.produce(n, o, function (c, l) {
        ;(i = c), (s = l)
      })
      return typeof Promise !== 'undefined' && u instanceof Promise
        ? u.then(function (c) {
          return [c, i, s]
        })
        : [u, i, s]
    }),
    typeof (r == null ? void 0 : r.useProxies) === 'boolean' && this.setUseProxies(r.useProxies),
    typeof (r == null ? void 0 : r.autoFreeze) === 'boolean' && this.setAutoFreeze(r.autoFreeze)
  }
  var t = e.prototype
  return (
    (t.createDraft = function (r) {
      vt(r) || Ge(8), Me(r) && (r = Lo(r))
      var a = hf(this)
      var n = Vl(this, r, void 0)
      return (n[ge].C = !0), ql(a), n
    }),
    (t.finishDraft = function (r, a) {
      var n = r && r[ge]
      var o = n.A
      return Ol(o, a), Tl(void 0, o)
    }),
    (t.setAutoFreeze = function (r) {
      this.F = r
    }),
    (t.setUseProxies = function (r) {
      r && !vf && Ge(20), (this.g = r)
    }),
    (t.applyPatches = function (r, a) {
      var n
      for (n = a.length - 1; n >= 0; n--) {
        var o = a[n]
        if (o.path.length === 0 && o.op === 'replace') {
          r = o.value
          break
        }
      }
      n > -1 && (a = a.slice(n + 1))
      var i = kt('Patches').$
      return Me(r)
        ? i(r, a)
        : this.produce(r, function (s) {
          return i(s, a)
        })
    }),
    e
  )
})()
var Je = new Xx()
var Zx = Je.produce
Je.produceWithPatches.bind(Je)
Je.setAutoFreeze.bind(Je)
Je.setUseProxies.bind(Je)
Je.applyPatches.bind(Je)
Je.createDraft.bind(Je)
Je.finishDraft.bind(Je)
var wr = Zx
v(g, ve(Mo()))
var Yi = 'NOT_FOUND'
function eR (e) {
  var t
  return {
    get: function (a) {
      return t && e(t.key, a) ? t.value : Yi
    },
    put: function (a, n) {
      t = { key: a, value: n }
    },
    getEntries: function () {
      return t ? [t] : []
    },
    clear: function () {
      t = void 0
    },
  }
}
function tR (e, t) {
  var r = []
  function a (s) {
    var u = r.findIndex(function (l) {
      return t(s, l.key)
    })
    if (u > -1) {
      var c = r[u]
      return u > 0 && (r.splice(u, 1), r.unshift(c)), c.value
    }
    return Yi
  }
  function n (s, u) {
    a(s) === Yi && (r.unshift({ key: s, value: u }), r.length > e && r.pop())
  }
  function o () {
    return r
  }
  function i () {
    r = []
  }
  return { get: a, put: n, getEntries: o, clear: i }
}
var Pf = function (t, r) {
  return t === r
}
function rR (e) {
  return function (r, a) {
    if (r === null || a === null || r.length !== a.length) return !1
    for (var n = r.length, o = 0; o < n; o++) if (!e(r[o], a[o])) return !1
    return !0
  }
}
function If (e, t) {
  var r = typeof t === 'object' ? t : { equalityCheck: t }
  var a = r.equalityCheck
  var n = a === void 0 ? Pf : a
  var o = r.maxSize
  var i = o === void 0 ? 1 : o
  var s = r.resultEqualityCheck
  var u = rR(n)
  var c = i === 1 ? eR(u) : tR(i, u)
  function l () {
    var d = c.get(arguments)
    if (d === Yi) {
      if (((d = e.apply(null, arguments)), s)) {
        var m = c.getEntries()
        var p = m.find(function (f) {
          return s(f.value, d)
        })
        p && (d = p.value)
      }
      c.put(arguments, d)
    }
    return d
  }
  return (
    (l.clearCache = function () {
      return c.clear()
    }),
    l
  )
}
function aR (e) {
  var t = Array.isArray(e[0]) ? e[0] : e
  if (
    !t.every(function (a) {
      return typeof a === 'function'
    })
  ) {
    var r = t
      .map(function (a) {
        return typeof a === 'function' ? 'function ' + (a.name || 'unnamed') + '()' : typeof a
      })
      .join(', ')
    throw new Error(
      'createSelector expects all input-selectors to be functions, but received the following types: [' + r + ']'
    )
  }
  return t
}
function nR (e) {
  for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++) r[a - 1] = arguments[a]
  var n = function () {
    for (var i = arguments.length, s = new Array(i), u = 0; u < i; u++) s[u] = arguments[u]
    var c = 0
    var l
    var d = { memoizeOptions: void 0 }
    var m = s.pop()
    if ((typeof m === 'object' && ((d = m), (m = s.pop())), typeof m !== 'function')) {
      throw new Error('createSelector expects an output function after the inputs, but received: [' + typeof m + ']')
    }
    var p = d
    var f = p.memoizeOptions
    var h = f === void 0 ? r : f
    var C = Array.isArray(h) ? h : [h]
    var x = aR(s)
    var R = e.apply(
      void 0,
      [
        function () {
          return c++, m.apply(null, arguments)
        },
      ].concat(C)
    )
    var F = e(function () {
      for (var U = [], X = x.length, z = 0; z < X; z++) U.push(x[z].apply(null, arguments))
      return (l = R.apply(null, U)), l
    })
    return (
      Object.assign(F, {
        resultFunc: m,
        memoizedResultFunc: R,
        dependencies: x,
        lastResult: function () {
          return l
        },
        recomputations: function () {
          return c
        },
        resetRecomputations: function () {
          return (c = 0)
        },
      }),
      F
    )
  }
  return n
}
var Ki = nR(If)
var Or = ve(Mo())
var Ll = ve(Mo())
function Ef (e) {
  var t = function (a) {
    var n = a.dispatch
    var o = a.getState
    return function (i) {
      return function (s) {
        return typeof s === 'function' ? s(n, o, e) : i(s)
      }
    }
  }
  return t
}
var wf = Ef()
wf.withExtraArgument = Ef
var _o = wf
var oR = (function () {
  var e = function (t, r) {
    return (
      (e =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (a, n) {
            a.__proto__ = n
          }) ||
        function (a, n) {
          for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (a[o] = n[o])
        }),
      e(t, r)
    )
  }
  return function (t, r) {
    if (typeof r !== 'function' && r !== null) {
      throw new TypeError('Class extends value ' + String(r) + ' is not a constructor or null')
    }
    e(t, r)
    function a () {
      this.constructor = t
    }
    t.prototype = r === null ? Object.create(r) : ((a.prototype = r.prototype), new a())
  }
})()
var $o = function (e, t) {
  var r = {
    label: 0,
    sent: function () {
      if (o[0] & 1) throw o[1]
      return o[1]
    },
    trys: [],
    ops: [],
  }
  var a
  var n
  var o
  var i
  return (
    (i = { next: s(0), throw: s(1), return: s(2) }),
    typeof Symbol === 'function' &&
      (i[Symbol.iterator] = function () {
        return this
      }),
    i
  )
  function s (c) {
    return function (l) {
      return u([c, l])
    }
  }
  function u (c) {
    if (a) throw new TypeError('Generator is already executing.')
    for (; r;) {
      try {
        if (
          ((a = 1),
          n &&
            (o = c[0] & 2 ? n.return : c[0] ? n.throw || ((o = n.return) && o.call(n), 0) : n.next) &&
            !(o = o.call(n, c[1])).done)
        ) {
          return o
        }
        switch (((n = 0), o && (c = [c[0] & 2, o.value]), c[0])) {
          case 0:
          case 1:
            o = c
            break
          case 4:
            return r.label++, { value: c[1], done: !1 }
          case 5:
            r.label++, (n = c[1]), (c = [0])
            continue
          case 7:
            ;(c = r.ops.pop()), r.trys.pop()
            continue
          default:
            if (((o = r.trys), !(o = o.length > 0 && o[o.length - 1]) && (c[0] === 6 || c[0] === 2))) {
              r = 0
              continue
            }
            if (c[0] === 3 && (!o || (c[1] > o[0] && c[1] < o[3]))) {
              r.label = c[1]
              break
            }
            if (c[0] === 6 && r.label < o[1]) {
              ;(r.label = o[1]), (o = c)
              break
            }
            if (o && r.label < o[2]) {
              ;(r.label = o[2]), r.ops.push(c)
              break
            }
            o[2] && r.ops.pop(), r.trys.pop()
            continue
        }
        c = t.call(e, r)
      } catch (l) {
        ;(c = [6, l]), (n = 0)
      } finally {
        a = o = 0
      }
    }
    if (c[0] & 5) throw c[1]
    return { value: c[0] ? c[1] : void 0, done: !0 }
  }
}
var Ha = function (e, t) {
  for (var r = 0, a = t.length, n = e.length; r < a; r++, n++) e[n] = t[r]
  return e
}
var iR = Object.defineProperty
var sR = Object.defineProperties
var cR = Object.getOwnPropertyDescriptors
var Of = Object.getOwnPropertySymbols
var uR = Object.prototype.hasOwnProperty
var lR = Object.prototype.propertyIsEnumerable
var qf = function (e, t, r) {
  return t in e ? iR(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[t] = r)
}
var He = function (e, t) {
  for (var r in t || (t = {})) uR.call(t, r) && qf(e, r, t[r])
  if (Of) {
    for (var a = 0, n = Of(t); a < n.length; a++) {
      var r = n[a]
      lR.call(t, r) && qf(e, r, t[r])
    }
  }
  return e
}
var Ql = function (e, t) {
  return sR(e, cR(t))
}
var Ho = function (e, t, r) {
  return new Promise(function (a, n) {
    var o = function (u) {
      try {
        s(r.next(u))
      } catch (c) {
        n(c)
      }
    }
    var i = function (u) {
      try {
        s(r.throw(u))
      } catch (c) {
        n(c)
      }
    }
    var s = function (u) {
      return u.done ? a(u.value) : Promise.resolve(u.value).then(o, i)
    }
    s((r = r.apply(e, t)).next())
  })
}
var pr = function () {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t]
  var r = Ki.apply(void 0, e)
  var a = function (n) {
    for (var o = [], i = 1; i < arguments.length; i++) o[i - 1] = arguments[i]
    return r.apply(void 0, Ha([Me(n) ? Lo(n) : n], o))
  }
  return a
}
var dR =
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : function () {
      if (arguments.length !== 0) {
        return typeof arguments[0] === 'object' ? Ll.compose : Ll.compose.apply(null, arguments)
      }
    }
function Gi (e) {
  if (typeof e !== 'object' || e === null) return !1
  var t = Object.getPrototypeOf(e)
  if (t === null) return !0
  for (var r = t; Object.getPrototypeOf(r) !== null;) r = Object.getPrototypeOf(r)
  return t === r
}
var kf = (function (e) {
  oR(t, e)
  function t () {
    for (var r = [], a = 0; a < arguments.length; a++) r[a] = arguments[a]
    var n = e.apply(this, r) || this
    return Object.setPrototypeOf(n, t.prototype), n
  }
  return (
    Object.defineProperty(t, Symbol.species, {
      get: function () {
        return t
      },
      enumerable: !1,
      configurable: !0,
    }),
    (t.prototype.concat = function () {
      for (var r = [], a = 0; a < arguments.length; a++) r[a] = arguments[a]
      return e.prototype.concat.apply(this, r)
    }),
    (t.prototype.prepend = function () {
      for (var r = [], a = 0; a < arguments.length; a++) r[a] = arguments[a]
      return r.length === 1 && Array.isArray(r[0])
        ? new (t.bind.apply(t, Ha([void 0], r[0].concat(this))))()
        : new (t.bind.apply(t, Ha([void 0], r.concat(this))))()
    }),
    t
  )
})(Array)
function jl (e) {
  return vt(e) ? wr(e, function () {}) : e
}
function Nf (e) {
  return typeof e !== 'object' || e == null || Object.isFrozen(e)
}
function hR (e) {
  return function () {
    return function (u) {
      return function (c) {
        return u(c)
      }
    }
  }
}
function Bl (e) {
  var t = typeof e
  return e == null || t === 'string' || t === 'boolean' || t === 'number' || Array.isArray(e) || Gi(e)
}
function Ji (e, t, r, a, n) {
  t === void 0 && (t = ''), r === void 0 && (r = Bl), n === void 0 && (n = [])
  var o
  if (!r(e)) return { keyPath: t || '<root>', value: e }
  if (typeof e !== 'object' || e === null) return !1
  for (var i = a != null ? a(e) : Object.entries(e), s = n.length > 0, u = 0, c = i; u < c.length; u++) {
    var l = c[u]
    var d = l[0]
    var m = l[1]
    var p = t ? t + '.' + d : d
    if (!(s && n.indexOf(p) >= 0)) {
      if (!r(m)) return { keyPath: p, value: m }
      if (typeof m === 'object' && ((o = Ji(m, p, r, a, n)), o)) return o
    }
  }
  return !1
}
function yR (e) {
  return function () {
    return function (C) {
      return function (x) {
        return C(x)
      }
    }
  }
}
function SR (e) {
  return typeof e === 'boolean'
}
function CR () {
  return function (t) {
    return Xi(t)
  }
}
function Xi (e) {
  e === void 0 && (e = {})
  var t = e.thunk
  var r = t === void 0 ? !0 : t
  var s = new kf()
  if ((r && (SR(r) ? s.push(_o) : s.push(_o.withExtraArgument(r.extraArgument))), !1));
  return s
}
var Ul = !0
function _l (e) {
  var t = CR()
  var r = e || {}
  var a = r.reducer
  var n = a === void 0 ? void 0 : a
  var o = r.middleware
  var i = o === void 0 ? t() : o
  var s = r.devTools
  var u = s === void 0 ? !0 : s
  var c = r.preloadedState
  var l = c === void 0 ? void 0 : c
  var d = r.enhancers
  var m = d === void 0 ? void 0 : d
  var p
  if (typeof n === 'function') p = n
  else if (Gi(n)) p = (0, Or.combineReducers)(n)
  else {
    throw new Error(
      '"reducer" is a required argument, and must be a function or an object of functions that can be passed to combineReducers'
    )
  }
  var f = i
  if (typeof f === 'function' && ((f = f(t)), !Ul)) {
    throw new Error('when using a middleware builder function, an array of middleware must be returned')
  }
  var h = Or.applyMiddleware.apply(void 0, f)
  var C = Or.compose
  u && (C = dR(He({ trace: !Ul }, typeof u === 'object' && u)))
  var x = [h]
  Array.isArray(m) ? (x = Ha([h], m)) : typeof m === 'function' && (x = m(x))
  var R = C.apply(void 0, x)
  return (0, Or.createStore)(p, l, R)
}
function y (e, t) {
  function r () {
    for (var a = [], n = 0; n < arguments.length; n++) a[n] = arguments[n]
    if (t) {
      var o = t.apply(void 0, a)
      if (!o) throw new Error('prepareAction did not return an object')
      return He(
        He({ type: e, payload: o.payload }, 'meta' in o && { meta: o.meta }),
        'error' in o && { error: o.error }
      )
    }
    return { type: e, payload: a[0] }
  }
  return (
    (r.toString = function () {
      return '' + e
    }),
    (r.type = e),
    (r.match = function (a) {
      return a.type === e
    }),
    r
  )
}
function xR (e) {
  return Gi(e) && typeof e.type === 'string' && Object.keys(e).every(RR)
}
function RR (e) {
  return ['type', 'payload', 'error', 'meta'].indexOf(e) > -1
}
function vR (e) {
  return '' + e
}
function Lf (e) {
  var t = {}
  var r = []
  var a
  var n = {
    addCase: function (o, i) {
      var s = typeof o === 'string' ? o : o.type
      if (s in t) throw new Error('addCase cannot be called with two reducers for the same action type')
      return (t[s] = i), n
    },
    addMatcher: function (o, i) {
      return r.push({ matcher: o, reducer: i }), n
    },
    addDefaultCase: function (o) {
      return (a = o), n
    },
  }
  return e(n), [t, r, a]
}
function bR (e) {
  return typeof e === 'function'
}
function O (e, t, r, a) {
  r === void 0 && (r = [])
  var n = typeof t === 'function' ? Lf(t) : [t, r, a]
  var o = n[0]
  var i = n[1]
  var s = n[2]
  var u
  if (bR(e)) {
    u = function () {
      return jl(e())
    }
  } else {
    var c = jl(e)
    u = function () {
      return c
    }
  }
  function l (d, m) {
    d === void 0 && (d = u())
    var p = Ha(
      [o[m.type]],
      i
        .filter(function (f) {
          var h = f.matcher
          return h(m)
        })
        .map(function (f) {
          var h = f.reducer
          return h
        })
    )
    return (
      p.filter(function (f) {
        return !!f
      }).length === 0 && (p = [s]),
      p.reduce(function (f, h) {
        if (h) {
          if (Me(f)) {
            var C = f
            var x = h(C, m)
            return x === void 0 ? f : x
          } else {
            if (vt(f)) {
              return wr(f, function (R) {
                return h(R, m)
              })
            }
            var x = h(f, m)
            if (x === void 0) {
              if (f === null) return f
              throw Error('A case reducer on a non-draftable value must not return undefined')
            }
            return x
          }
        }
        return f
      }, d)
    )
  }
  return (l.getInitialState = u), l
}
function FR (e, t) {
  return e + '/' + t
}
function AR (e) {
  var t = e.name
  if (!t) throw new Error('`name` is a required option for createSlice')
  var r = typeof e.initialState === 'function' ? e.initialState : jl(e.initialState)
  var a = e.reducers || {}
  var n = Object.keys(a)
  var o = {}
  var i = {}
  var s = {}
  n.forEach(function (l) {
    var d = a[l]
    var m = FR(t, l)
    var p
    var f
    'reducer' in d ? ((p = d.reducer), (f = d.prepare)) : (p = d), (o[l] = p), (i[m] = p), (s[l] = f ? y(m, f) : y(m))
  })
  function u () {
    var l = typeof e.extraReducers === 'function' ? Lf(e.extraReducers) : [e.extraReducers]
    var d = l[0]
    var m = d === void 0 ? {} : d
    var p = l[1]
    var f = p === void 0 ? [] : p
    var h = l[2]
    var C = h === void 0 ? void 0 : h
    var x = He(He({}, m), i)
    return O(r, x, f, C)
  }
  var c
  return {
    name: t,
    reducer: function (l, d) {
      return c || (c = u()), c(l, d)
    },
    actions: s,
    caseReducers: o,
    getInitialState: function () {
      return c || (c = u()), c.getInitialState()
    },
  }
}
function PR () {
  return { ids: [], entities: {} }
}
function IR () {
  function e (t) {
    return t === void 0 && (t = {}), Object.assign(PR(), t)
  }
  return { getInitialState: e }
}
function ER () {
  function e (t) {
    var r = function (c) {
      return c.ids
    }
    var a = function (c) {
      return c.entities
    }
    var n = pr(r, a, function (c, l) {
      return c.map(function (d) {
        return l[d]
      })
    })
    var o = function (c, l) {
      return l
    }
    var i = function (c, l) {
      return c[l]
    }
    var s = pr(r, function (c) {
      return c.length
    })
    if (!t) return { selectIds: r, selectEntities: a, selectAll: n, selectTotal: s, selectById: pr(a, o, i) }
    var u = pr(t, a)
    return {
      selectIds: pr(t, r),
      selectEntities: u,
      selectAll: pr(t, n),
      selectTotal: pr(t, s),
      selectById: pr(u, o, i),
    }
  }
  return { getSelectors: e }
}
function wR (e) {
  var t = xe(function (r, a) {
    return e(a)
  })
  return function (a) {
    return t(a, void 0)
  }
}
function xe (e) {
  return function (r, a) {
    function n (i) {
      return xR(i)
    }
    var o = function (i) {
      n(a) ? e(a.payload, i) : e(a, i)
    }
    return Me(r) ? (o(r), r) : wr(r, o)
  }
}
function zo (e, t) {
  var r = t(e)
  return r
}
function ya (e) {
  return Array.isArray(e) || (e = Object.values(e)), e
}
function jf (e, t, r) {
  e = ya(e)
  for (var a = [], n = [], o = 0, i = e; o < i.length; o++) {
    var s = i[o]
    var u = zo(s, t)
    u in r.entities ? n.push({ id: u, changes: s }) : a.push(s)
  }
  return [a, n]
}
function Bf (e) {
  function t (f, h) {
    var C = zo(f, e)
    C in h.entities || (h.ids.push(C), (h.entities[C] = f))
  }
  function r (f, h) {
    f = ya(f)
    for (var C = 0, x = f; C < x.length; C++) {
      var R = x[C]
      t(R, h)
    }
  }
  function a (f, h) {
    var C = zo(f, e)
    C in h.entities || h.ids.push(C), (h.entities[C] = f)
  }
  function n (f, h) {
    f = ya(f)
    for (var C = 0, x = f; C < x.length; C++) {
      var R = x[C]
      a(R, h)
    }
  }
  function o (f, h) {
    ;(f = ya(f)), (h.ids = []), (h.entities = {}), r(f, h)
  }
  function i (f, h) {
    return s([f], h)
  }
  function s (f, h) {
    var C = !1
    f.forEach(function (x) {
      x in h.entities && (delete h.entities[x], (C = !0))
    }),
    C &&
        (h.ids = h.ids.filter(function (x) {
          return x in h.entities
        }))
  }
  function u (f) {
    Object.assign(f, { ids: [], entities: {} })
  }
  function c (f, h, C) {
    var x = C.entities[h.id]
    var R = Object.assign({}, x, h.changes)
    var F = zo(R, e)
    var P = F !== h.id
    return P && ((f[h.id] = F), delete C.entities[h.id]), (C.entities[F] = R), P
  }
  function l (f, h) {
    return d([f], h)
  }
  function d (f, h) {
    var C = {}
    var x = {}
    f.forEach(function (P) {
      P.id in h.entities && (x[P.id] = { id: P.id, changes: He(He({}, x[P.id] ? x[P.id].changes : null), P.changes) })
    }),
    (f = Object.values(x))
    var R = f.length > 0
    if (R) {
      var F =
        f.filter(function (P) {
          return c(C, P, h)
        }).length > 0
      F && (h.ids = Object.keys(h.entities))
    }
  }
  function m (f, h) {
    return p([f], h)
  }
  function p (f, h) {
    var C = jf(f, e, h)
    var x = C[0]
    var R = C[1]
    d(R, h), r(x, h)
  }
  return {
    removeAll: wR(u),
    addOne: xe(t),
    addMany: xe(r),
    setOne: xe(a),
    setMany: xe(n),
    setAll: xe(o),
    updateOne: xe(l),
    updateMany: xe(d),
    upsertOne: xe(m),
    upsertMany: xe(p),
    removeOne: xe(i),
    removeMany: xe(s),
  }
}
function OR (e, t) {
  var r = Bf(e)
  var a = r.removeOne
  var n = r.removeMany
  var o = r.removeAll
  function i (R, F) {
    return s([R], F)
  }
  function s (R, F) {
    R = ya(R)
    var P = R.filter(function (U) {
      return !(zo(U, e) in F.entities)
    })
    P.length !== 0 && C(P, F)
  }
  function u (R, F) {
    return c([R], F)
  }
  function c (R, F) {
    ;(R = ya(R)), R.length !== 0 && C(R, F)
  }
  function l (R, F) {
    ;(R = ya(R)), (F.entities = {}), (F.ids = []), s(R, F)
  }
  function d (R, F) {
    return m([R], F)
  }
  function m (R, F) {
    for (var P = !1, U = 0, X = R; U < X.length; U++) {
      var z = X[U]
      var I = F.entities[z.id]
      if (I) {
        ;(P = !0), Object.assign(I, z.changes)
        var _ = e(I)
        z.id !== _ && (delete F.entities[z.id], (F.entities[_] = I))
      }
    }
    P && x(F)
  }
  function p (R, F) {
    return f([R], F)
  }
  function f (R, F) {
    var P = jf(R, e, F)
    var U = P[0]
    var X = P[1]
    m(X, F), s(U, F)
  }
  function h (R, F) {
    if (R.length !== F.length) return !1
    for (var P = 0; P < R.length && P < F.length; P++) if (R[P] !== F[P]) return !1
    return !0
  }
  function C (R, F) {
    R.forEach(function (P) {
      F.entities[e(P)] = P
    }),
    x(F)
  }
  function x (R) {
    var F = Object.values(R.entities)
    F.sort(t)
    var P = F.map(e)
    var U = R.ids
    h(U, P) || (R.ids = P)
  }
  return {
    removeOne: a,
    removeMany: n,
    removeAll: o,
    addOne: xe(i),
    updateOne: xe(d),
    upsertOne: xe(p),
    setOne: xe(u),
    setMany: xe(c),
    setAll: xe(l),
    addMany: xe(s),
    updateMany: xe(m),
    upsertMany: xe(f),
  }
}
function qR (e) {
  e === void 0 && (e = {})
  var t = He(
    {
      sortComparer: !1,
      selectId: function (s) {
        return s.id
      },
    },
    e
  )
  var r = t.selectId
  var a = t.sortComparer
  var n = IR()
  var o = ER()
  var i = a ? OR(r, a) : Bf(r)
  return He(He(He({ selectId: r, sortComparer: a }, n), o), i)
}
var TR = 'ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW'
var $l = function (e) {
  e === void 0 && (e = 21)
  for (var t = '', r = e; r--;) t += TR[(Math.random() * 64) | 0]
  return t
}
var kR = ['name', 'message', 'stack', 'code']
var Hl = (function () {
  function e (t, r) {
    ;(this.payload = t), (this.meta = r)
  }
  return e
})()
var Uf = (function () {
  function e (t, r) {
    ;(this.payload = t), (this.meta = r)
  }
  return e
})()
var _f = function (e) {
  if (typeof e === 'object' && e !== null) {
    for (var t = {}, r = 0, a = kR; r < a.length; r++) {
      var n = a[r]
      typeof e[n] === 'string' && (t[n] = e[n])
    }
    return t
  }
  return { message: String(e) }
}
function ee (e, t, r) {
  var a = y(e + '/fulfilled', function (c, l, d, m) {
    return { payload: c, meta: Ql(He({}, m || {}), { arg: d, requestId: l, requestStatus: 'fulfilled' }) }
  })
  var n = y(e + '/pending', function (c, l, d) {
    return { payload: void 0, meta: Ql(He({}, d || {}), { arg: l, requestId: c, requestStatus: 'pending' }) }
  })
  var o = y(e + '/rejected', function (c, l, d, m, p) {
    return {
      payload: m,
      error: ((r && r.serializeError) || _f)(c || 'Rejected'),
      meta: Ql(He({}, p || {}), {
        arg: d,
        requestId: l,
        rejectedWithValue: !!m,
        requestStatus: 'rejected',
        aborted: (c == null ? void 0 : c.name) === 'AbortError',
        condition: (c == null ? void 0 : c.name) === 'ConditionError',
      }),
    }
  })
  var s =
    typeof AbortController !== 'undefined'
      ? AbortController
      : (function () {
        function c () {
          this.signal = {
            aborted: !1,
            addEventListener: function () {},
            dispatchEvent: function () {
              return !1
            },
            onabort: function () {},
            removeEventListener: function () {},
            reason: void 0,
            throwIfAborted: function () {},
          }
        }
        return (c.prototype.abort = function () {}), c
      })()
  function u (c) {
    return function (l, d, m) {
      var p = (r == null ? void 0 : r.idGenerator) ? r.idGenerator(c) : $l()
      var f = new s()
      var h
      var C = new Promise(function (P, U) {
        return f.signal.addEventListener('abort', function () {
          return U({ name: 'AbortError', message: h || 'Aborted' })
        })
      })
      var x = !1
      function R (P) {
        x && ((h = P), f.abort())
      }
      var F = (function () {
        return Ho(this, null, function () {
          var P, U, X, z, I, _
          return $o(this, function (ne) {
            switch (ne.label) {
              case 0:
                return (
                  ne.trys.push([0, 4, , 5]),
                  (z =
                    (P = r == null ? void 0 : r.condition) == null ? void 0 : P.call(r, c, { getState: d, extra: m })),
                  DR(z) ? [4, z] : [3, 2]
                )
              case 1:
                ;(z = ne.sent()), (ne.label = 2)
              case 2:
                if (z === !1) {
                  throw { name: 'ConditionError', message: 'Aborted due to condition callback returning false.' }
                }
                return (
                  (x = !0),
                  l(
                    n(
                      p,
                      c,
                      (U = r == null ? void 0 : r.getPendingMeta) == null
                        ? void 0
                        : U.call(r, { requestId: p, arg: c }, { getState: d, extra: m })
                    )
                  ),
                  [
                    4,
                    Promise.race([
                      C,
                      Promise.resolve(
                        t(c, {
                          dispatch: l,
                          getState: d,
                          extra: m,
                          requestId: p,
                          signal: f.signal,
                          rejectWithValue: function (M, A) {
                            return new Hl(M, A)
                          },
                          fulfillWithValue: function (M, A) {
                            return new Uf(M, A)
                          },
                        })
                      ).then(function (M) {
                        if (M instanceof Hl) throw M
                        return M instanceof Uf ? a(M.payload, p, c, M.meta) : a(M, p, c)
                      }),
                    ]),
                  ]
                )
              case 3:
                return (X = ne.sent()), [3, 5]
              case 4:
                return (I = ne.sent()), (X = I instanceof Hl ? o(null, p, c, I.payload, I.meta) : o(I, p, c)), [3, 5]
              case 5:
                return (_ = r && !r.dispatchConditionRejection && o.match(X) && X.meta.condition), _ || l(X), [2, X]
            }
          })
        })
      })()
      return Object.assign(F, {
        abort: R,
        requestId: p,
        arg: c,
        unwrap: function () {
          return F.then($f)
        },
      })
    }
  }
  return Object.assign(u, { pending: n, rejected: o, fulfilled: a, typePrefix: e })
}
function $f (e) {
  if (e.meta && e.meta.rejectedWithValue) throw e.payload
  if (e.error) throw e.error
  return e.payload
}
function DR (e) {
  return e !== null && typeof e === 'object' && typeof e.then === 'function'
}
var VR = function (e) {
  return e && typeof e.match === 'function'
}
var Hf = function (e, t) {
  return VR(e) ? e.match(t) : e(t)
}
function Wo () {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t]
  return function (r) {
    return e.some(function (a) {
      return Hf(a, r)
    })
  }
}
function zl () {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t]
  return function (r) {
    return e.every(function (a) {
      return Hf(a, r)
    })
  }
}
function Zi (e, t) {
  if (!e || !e.meta) return !1
  var r = typeof e.meta.requestId === 'string'
  var a = t.indexOf(e.meta.requestStatus) > -1
  return r && a
}
function Yo (e) {
  return typeof e[0] === 'function' && 'pending' in e[0] && 'fulfilled' in e[0] && 'rejected' in e[0]
}
function zf () {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t]
  return e.length === 0
    ? function (r) {
      return Zi(r, ['pending'])
    }
    : Yo(e)
      ? function (r) {
        var a = e.map(function (o) {
          return o.pending
        })
        var n = Wo.apply(void 0, a)
        return n(r)
      }
      : zf()(e[0])
}
function es () {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t]
  return e.length === 0
    ? function (r) {
      return Zi(r, ['rejected'])
    }
    : Yo(e)
      ? function (r) {
        var a = e.map(function (o) {
          return o.rejected
        })
        var n = Wo.apply(void 0, a)
        return n(r)
      }
      : es()(e[0])
}
function Wf () {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t]
  var r = function (a) {
    return a && a.meta && a.meta.rejectedWithValue
  }
  return e.length === 0
    ? function (a) {
      var n = zl(es.apply(void 0, e), r)
      return n(a)
    }
    : Yo(e)
      ? function (a) {
        var n = zl(es.apply(void 0, e), r)
        return n(a)
      }
      : Wf()(e[0])
}
function Yf () {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t]
  return e.length === 0
    ? function (r) {
      return Zi(r, ['fulfilled'])
    }
    : Yo(e)
      ? function (r) {
        var a = e.map(function (o) {
          return o.fulfilled
        })
        var n = Wo.apply(void 0, a)
        return n(r)
      }
      : Yf()(e[0])
}
function Kf () {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t]
  return e.length === 0
    ? function (r) {
      return Zi(r, ['pending', 'fulfilled', 'rejected'])
    }
    : Yo(e)
      ? function (r) {
        for (var a = [], n = 0, o = e; n < o.length; n++) {
          var i = o[n]
          a.push(i.pending, i.rejected, i.fulfilled)
        }
        var s = Wo.apply(void 0, a)
        return s(r)
      }
      : Kf()(e[0])
}
var Wl = function (e, t) {
  if (typeof e !== 'function') throw new TypeError(t + ' is not a function')
}
var NR = function () {}
var Yl = function (e, t) {
  return t === void 0 && (t = NR), e.catch(t), e
}
var Gf = function (e, t) {
  e.addEventListener('abort', t, { once: !0 })
}
var za = function (e, t) {
  var r = e.signal
  r.aborted ||
    ('reason' in r || Object.defineProperty(r, 'reason', { enumerable: !0, value: t, configurable: !0, writable: !0 }),
    e.abort(t))
}
var MR = 'task'
var Jf = 'listener'
var Xf = 'completed'
var Kl = 'cancelled'
var QR = 'task-' + Kl
var LR = 'task-' + Xf
var Zf = Jf + '-' + Kl
var jR = Jf + '-' + Xf
var Ko = (function () {
  function e (t) {
    ;(this.code = t), (this.name = 'TaskAbortError'), (this.message = MR + ' ' + Kl + ' (reason: ' + t + ')')
  }
  return e
})()
var Wa = function (e) {
  if (e.aborted) throw new Ko(e.reason)
}
var em = function (e) {
  return Yl(
    new Promise(function (t, r) {
      var a = function () {
        return r(new Ko(e.reason))
      }
      e.aborted ? a() : Gf(e, a)
    })
  )
}
var BR = function (e, t) {
  return Ho(void 0, null, function () {
    var r, a
    return $o(this, function (n) {
      switch (n.label) {
        case 0:
          return n.trys.push([0, 3, 4, 5]), [4, Promise.resolve()]
        case 1:
          return n.sent(), [4, e()]
        case 2:
          return (r = n.sent()), [2, { status: 'ok', value: r }]
        case 3:
          return (a = n.sent()), [2, { status: a instanceof Ko ? 'cancelled' : 'rejected', error: a }]
        case 4:
          return t == null || t(), [7]
        case 5:
          return [2]
      }
    })
  })
}
var ts = function (e) {
  return function (t) {
    return Yl(
      Promise.race([em(e), t]).then(function (r) {
        return Wa(e), r
      })
    )
  }
}
var tm = function (e) {
  var t = ts(e)
  return function (r) {
    return t(
      new Promise(function (a) {
        return setTimeout(a, r)
      })
    )
  }
}
var UR = Object.assign
var rm = {}
var Go = 'listenerMiddleware'
var _R = function (e) {
  var t = function (r) {
    return Gf(e, function () {
      return za(r, e.reason)
    })
  }
  return function (r) {
    Wl(r, 'taskExecutor')
    var a = new AbortController()
    t(a)
    var n = BR(
      function () {
        return Ho(void 0, null, function () {
          var o
          return $o(this, function (i) {
            switch (i.label) {
              case 0:
                return Wa(e), Wa(a.signal), [4, r({ pause: ts(a.signal), delay: tm(a.signal), signal: a.signal })]
              case 1:
                return (o = i.sent()), Wa(a.signal), [2, o]
            }
          })
        })
      },
      function () {
        return za(a, LR)
      }
    )
    return {
      result: ts(e)(n),
      cancel: function () {
        za(a, QR)
      },
    }
  }
}
var $R = function (e, t) {
  var r = function (a, n) {
    return Ho(void 0, null, function () {
      var o, i, s, u
      return $o(this, function (c) {
        switch (c.label) {
          case 0:
            Wa(t),
            (o = function () {}),
            (i = new Promise(function (l) {
              o = e({
                predicate: a,
                effect: function (d, m) {
                  m.unsubscribe(), l([d, m.getState(), m.getOriginalState()])
                },
              })
            })),
            (s = [em(t), i]),
            n != null &&
                s.push(
                  new Promise(function (l) {
                    return setTimeout(l, n, null)
                  })
                ),
            (c.label = 1)
          case 1:
            return c.trys.push([1, , 3, 4]), [4, Promise.race(s)]
          case 2:
            return (u = c.sent()), Wa(t), [2, u]
          case 3:
            return o(), [7]
          case 4:
            return [2]
        }
      })
    })
  }
  return function (a, n) {
    return Yl(r(a, n))
  }
}
var am = function (e) {
  var t = e.type
  var r = e.actionCreator
  var a = e.matcher
  var n = e.predicate
  var o = e.effect
  if (t) n = y(t).match
  else if (r) (t = r.type), (n = r.match)
  else if (a) n = a
  else if (!n) {
    throw new Error('Creating or removing a listener requires one of the known fields for matching an action')
  }
  return Wl(o, 'options.listener'), { predicate: n, type: t, effect: o }
}
var HR = function (e) {
  var t = am(e)
  var r = t.type
  var a = t.predicate
  var n = t.effect
  var o = $l()
  var i = {
    id: o,
    effect: n,
    type: r,
    predicate: a,
    pending: new Set(),
    unsubscribe: function () {
      throw new Error('Unsubscribe not initialized')
    },
  }
  return i
}
var zR = function (e) {
  return function () {
    e.forEach(Gl), e.clear()
  }
}
var nm = function (e, t, r) {
  try {
    e(t, r)
  } catch (a) {
    setTimeout(function () {
      throw a
    }, 0)
  }
}
var om = y(Go + '/add')
var im = y(Go + '/removeAll')
var sm = y(Go + '/remove')
var WR = function () {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t]
  console.error.apply(console, Ha([Go + '/error'], e))
}
var Gl = function (e) {
  e.pending.forEach(function (t) {
    za(t, Zf)
  })
}
function YR (e) {
  var t = this
  e === void 0 && (e = {})
  var r = new Map()
  var a = e.extra
  var n = e.onError
  var o = n === void 0 ? WR : n
  Wl(o, 'onError')
  var i = function (p) {
    return (
      (p.unsubscribe = function () {
        return r.delete(p.id)
      }),
      r.set(p.id, p),
      function (f) {
        p.unsubscribe(), (f == null ? void 0 : f.cancelActive) && Gl(p)
      }
    )
  }
  var s = function (p) {
    for (var f = 0, h = Array.from(r.values()); f < h.length; f++) {
      var C = h[f]
      if (p(C)) return C
    }
  }
  var u = function (p) {
    var f = s(function (h) {
      return h.effect === p.effect
    })
    return f || (f = HR(p)), i(f)
  }
  var c = function (p) {
    var f = am(p)
    var h = f.type
    var C = f.effect
    var x = f.predicate
    var R = s(function (F) {
      var P = typeof h === 'string' ? F.type === h : F.predicate === x
      return P && F.effect === C
    })
    return R && (R.unsubscribe(), p.cancelActive && Gl(R)), !!R
  }
  var l = function (p, f, h, C) {
    return Ho(t, null, function () {
      var x, R, F
      return $o(this, function (P) {
        switch (P.label) {
          case 0:
            ;(x = new AbortController()), (R = $R(u, x.signal)), (P.label = 1)
          case 1:
            return (
              P.trys.push([1, 3, 4, 5]),
              p.pending.add(x),
              [
                4,
                Promise.resolve(
                  p.effect(
                    f,
                    UR({}, h, {
                      getOriginalState: C,
                      condition: function (U, X) {
                        return R(U, X).then(Boolean)
                      },
                      take: R,
                      delay: tm(x.signal),
                      pause: ts(x.signal),
                      extra: a,
                      signal: x.signal,
                      fork: _R(x.signal),
                      unsubscribe: p.unsubscribe,
                      subscribe: function () {
                        r.set(p.id, p)
                      },
                      cancelActiveListeners: function () {
                        p.pending.forEach(function (U, X, z) {
                          U !== x && (za(U, Zf), z.delete(U))
                        })
                      },
                    })
                  )
                ),
              ]
            )
          case 2:
            return P.sent(), [3, 5]
          case 3:
            return (F = P.sent()), F instanceof Ko || nm(o, F, { raisedBy: 'effect' }), [3, 5]
          case 4:
            return za(x, jR), p.pending.delete(x), [7]
          case 5:
            return [2]
        }
      })
    })
  }
  var d = zR(r)
  var m = function (p) {
    return function (f) {
      return function (h) {
        if (om.match(h)) return u(h.payload)
        if (im.match(h)) {
          d()
          return
        }
        if (sm.match(h)) return c(h.payload)
        var C = p.getState()
        var x = function () {
          if (C === rm) throw new Error(Go + ': getOriginalState can only be called synchronously')
          return C
        }
        var R
        try {
          if (((R = f(h)), r.size > 0)) {
            for (var F = p.getState(), P = Array.from(r.values()), U = 0, X = P; U < X.length; U++) {
              var z = X[U]
              var I = !1
              try {
                I = z.predicate(h, F, C)
              } catch (_) {
                ;(I = !1), nm(o, _, { raisedBy: 'predicate' })
              }
              !I || l(z, h, p, x)
            }
          }
        } finally {
          C = rm
        }
        return R
      }
    }
  }
  return { middleware: m, startListening: u, stopListening: c, clearListeners: d }
}
xf()
function rs (e, t) {
  var r = {}
  for (var a in e) Object.prototype.hasOwnProperty.call(e, a) && t.indexOf(a) < 0 && (r[a] = e[a])
  if (e != null && typeof Object.getOwnPropertySymbols === 'function') {
    for (var n = 0, a = Object.getOwnPropertySymbols(e); n < a.length; n++) {
      t.indexOf(a[n]) < 0 && Object.prototype.propertyIsEnumerable.call(e, a[n]) && (r[a[n]] = e[a[n]])
    }
  }
  return r
}
function te (e, t, r, a) {
  function n (o) {
    return o instanceof r
      ? o
      : new r(function (i) {
        i(o)
      })
  }
  return new (r || (r = Promise))(function (o, i) {
    function s (l) {
      try {
        c(a.next(l))
      } catch (d) {
        i(d)
      }
    }
    function u (l) {
      try {
        c(a.throw(l))
      } catch (d) {
        i(d)
      }
    }
    function c (l) {
      l.done ? o(l.value) : n(l.value).then(s, u)
    }
    c((a = a.apply(e, t || [])).next())
  })
}
var Ce
;(function (e) {
  ;(e.search = 'search'), (e.click = 'click'), (e.custom = 'custom'), (e.view = 'view'), (e.collect = 'collect')
})(Ce || (Ce = {}))
function KR () {
  return typeof window !== 'undefined'
}
function Jl () {
  return typeof navigator !== 'undefined'
}
function cm () {
  return typeof document !== 'undefined'
}
function Xl () {
  try {
    return typeof localStorage !== 'undefined'
  } catch {
    return !1
  }
}
function GR () {
  try {
    return typeof sessionStorage !== 'undefined'
  } catch {
    return !1
  }
}
function um () {
  return Jl() && navigator.cookieEnabled
}
function JR () {
  return typeof crypto !== 'undefined'
}
function XR () {
  return JR() && typeof crypto.getRandomValues !== 'undefined'
}
var ZR = [Ce.click, Ce.custom, Ce.search, Ce.view]
var ev = (e, t) =>
  ZR.indexOf(e) !== -1
    ? Object.assign(
      {
        language: cm() ? document.documentElement.lang : 'unknown',
        userAgent: Jl() ? navigator.userAgent : 'unknown',
      },
      t
    )
    : t
var qr = class {
  static set (t, r, a) {
    var n, o, i, s, u
    a ? ((i = new Date()), i.setTime(i.getTime() + a), (s = '; expires=' + i.toGMTString())) : (s = ''),
    (u = location.hostname),
    u.indexOf('.') === -1
      ? (document.cookie = t + '=' + r + s + '; path=/')
      : ((o = u.split('.')),
      o.shift(),
      (n = '.' + o.join('.')),
      lm({ name: t, value: r, expires: s, domain: n }),
      (qr.get(t) == null || qr.get(t) != r) && ((n = '.' + u), lm({ name: t, value: r, expires: s, domain: n })))
  }

  static get (t) {
    for (var r = t + '=', a = document.cookie.split(';'), n = 0; n < a.length; n++) {
      var o = a[n]
      if (((o = o.replace(/^\s+/, '')), o.indexOf(r) == 0)) return o.substring(r.length, o.length)
    }
    return null
  }

  static erase (t) {
    qr.set(t, '', -1)
  }
}
function lm (e) {
  const { name: t, value: r, expires: a, domain: n } = e
  document.cookie = `${t}=${r}${a}; path=/; domain=${n}; SameSite=Lax`
}
function tv () {
  return Xl() ? localStorage : um() ? new Tr() : GR() ? sessionStorage : new Ya()
}
var Tr = class {
  getItem (t) {
    return qr.get(`${Tr.prefix}${t}`)
  }

  removeItem (t) {
    qr.erase(`${Tr.prefix}${t}`)
  }

  setItem (t, r) {
    qr.set(`${Tr.prefix}${t}`, r)
  }
}
Tr.prefix = 'coveo_'
var dm = class {
  constructor () {
    this.cookieStorage = new Tr()
  }

  getItem (t) {
    return localStorage.getItem(t) || this.cookieStorage.getItem(t)
  }

  removeItem (t) {
    this.cookieStorage.removeItem(t), localStorage.removeItem(t)
  }

  setItem (t, r) {
    localStorage.setItem(t, r), this.cookieStorage.setItem(t, r)
  }
}
var Ya = class {
  getItem (t) {
    return null
  }

  removeItem (t) {}
  setItem (t, r) {}
}
var Jo = '__coveo.analytics.history'
var pm = 20
var fm = 1e3 * 60
var mm = 75
var Xo = class {
  constructor (t) {
    this.store = t || tv()
  }

  addElement (t) {
    ;(t.internalTime = new Date().getTime()), (t = this.cropQueryElement(this.stripEmptyQuery(t)))
    const r = this.getHistoryWithInternalTime()
    r != null ? this.isValidEntry(t) && this.setHistory([t].concat(r)) : this.setHistory([t])
  }

  addElementAsync (t) {
    return te(this, void 0, void 0, function * () {
      ;(t.internalTime = new Date().getTime()), (t = this.cropQueryElement(this.stripEmptyQuery(t)))
      const r = yield this.getHistoryWithInternalTimeAsync()
      r != null ? this.isValidEntry(t) && this.setHistory([t].concat(r)) : this.setHistory([t])
    })
  }

  getHistory () {
    const t = this.getHistoryWithInternalTime()
    return this.stripEmptyQueries(this.stripInternalTime(t))
  }

  getHistoryAsync () {
    return te(this, void 0, void 0, function * () {
      const t = yield this.getHistoryWithInternalTimeAsync()
      return this.stripEmptyQueries(this.stripInternalTime(t))
    })
  }

  getHistoryWithInternalTime () {
    try {
      const t = this.store.getItem(Jo)
      return t && typeof t === 'string' ? JSON.parse(t) : []
    } catch {
      return []
    }
  }

  getHistoryWithInternalTimeAsync () {
    return te(this, void 0, void 0, function * () {
      try {
        const t = yield this.store.getItem(Jo)
        return t ? JSON.parse(t) : []
      } catch {
        return []
      }
    })
  }

  setHistory (t) {
    try {
      this.store.setItem(Jo, JSON.stringify(t.slice(0, pm)))
    } catch {}
  }

  clear () {
    try {
      this.store.removeItem(Jo)
    } catch {}
  }

  getMostRecentElement () {
    const t = this.getHistoryWithInternalTime()
    return t != null ? t.sort((a, n) => (n.internalTime || 0) - (a.internalTime || 0))[0] : null
  }

  cropQueryElement (t) {
    return t.name && t.value && t.name.toLowerCase() === 'query' && (t.value = t.value.slice(0, mm)), t
  }

  isValidEntry (t) {
    const r = this.getMostRecentElement()
    return r && r.value == t.value ? (t.internalTime || 0) - (r.internalTime || 0) > fm : !0
  }

  stripInternalTime (t) {
    return t.map((r) => {
      const { name: a, time: n, value: o } = r
      return { name: a, time: n, value: o }
    })
  }

  stripEmptyQuery (t) {
    const { name: r, time: a, value: n } = t
    return r && typeof n === 'string' && r.toLowerCase() === 'query' && n.trim() === '' ? { name: r, time: a } : t
  }

  stripEmptyQueries (t) {
    return t.map((r) => this.stripEmptyQuery(r))
  }
}
var as = Object.freeze({
  __proto__: null,
  STORE_KEY: Jo,
  MAX_NUMBER_OF_HISTORY_ELEMENTS: pm,
  MIN_THRESHOLD_FOR_DUPLICATE_VALUE: fm,
  MAX_VALUE_SIZE: mm,
  HistoryStore: Xo,
  default: Xo,
})
var rv = (e, t) =>
  te(void 0, void 0, void 0, function * () {
    return e === Ce.view
      ? (yield av(t.contentIdValue),
      Object.assign({ location: window.location.toString(), referrer: document.referrer, title: document.title }, t))
      : t
  })
var av = (e) =>
  te(void 0, void 0, void 0, function * () {
    const t = new Xo()
    const r = { name: 'PageView', value: e, time: JSON.stringify(new Date()) }
    yield t.addElementAsync(r)
  })
var Ka = (e) =>
  e
    ? (Number(e) ^ (nv(new Uint8Array(1))[0] % 16 >> (Number(e) / 4))).toString(16)
    : (`${1e7}` + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, Ka)
var nv = (e) => {
  if (XR()) return crypto.getRandomValues(e)
  for (var t = 0, r = 0; t < e.length; t++) {
    ;(t & 3) == 0 && (r = Math.random() * 4294967296), (e[t] = (r >>> ((t & 3) << 3)) & 255)
  }
  return e
}
var at = Object.keys
var Zl = {
  id: 'svc_ticket_id',
  subject: 'svc_ticket_subject',
  description: 'svc_ticket_description',
  category: 'svc_ticket_category',
  productId: 'svc_ticket_product_id',
  custom: 'svc_ticket_custom',
}
var ov = at(Zl).map((e) => Zl[e])
var iv = [...ov].join('|')
var sv = new RegExp(`^(${iv}$)`)
var cv = { svcAction: 'svc_action', svcActionData: 'svc_action_data' }
var lv = (e) => sv.test(e)
var dv = [lv]
var gm = {
  id: 'id',
  name: 'nm',
  brand: 'br',
  category: 'ca',
  variant: 'va',
  price: 'pr',
  quantity: 'qt',
  coupon: 'cc',
  position: 'ps',
  group: 'group',
}
var hm = {
  id: 'id',
  name: 'nm',
  brand: 'br',
  category: 'ca',
  variant: 'va',
  position: 'ps',
  price: 'pr',
  group: 'group',
}
var Qe = { action: 'pa', list: 'pal', listSource: 'pls' }
var ns = {
  id: 'ti',
  revenue: 'tr',
  tax: 'tt',
  shipping: 'ts',
  coupon: 'tcc',
  affiliation: 'ta',
  step: 'cos',
  option: 'col',
}
var pv = [
  'loyaltyCardId',
  'loyaltyTier',
  'thirdPartyPersona',
  'companyName',
  'favoriteStore',
  'storeName',
  'userIndustry',
  'userRole',
  'userDepartment',
  'businessUnit',
]
var ed = { id: 'quoteId', affiliation: 'quoteAffiliation' }
var td = { id: 'reviewId', rating: 'reviewRating', comment: 'reviewComment' }
var fv = {
  add: Qe,
  bookmark_add: Qe,
  bookmark_remove: Qe,
  click: Qe,
  checkout: Qe,
  checkout_option: Qe,
  detail: Qe,
  impression: Qe,
  remove: Qe,
  refund: Object.assign(Object.assign({}, Qe), ns),
  purchase: Object.assign(Object.assign({}, Qe), ns),
  quickview: Qe,
  quote: Object.assign(Object.assign({}, Qe), ed),
  review: Object.assign(Object.assign({}, Qe), td),
}
var mv = at(gm).map((e) => gm[e])
var gv = at(hm).map((e) => hm[e])
var hv = at(Qe).map((e) => Qe[e])
var yv = at(ns).map((e) => ns[e])
var Sv = at(td).map((e) => td[e])
var Cv = at(ed).map((e) => ed[e])
var xv = [...mv, 'custom'].join('|')
var Rv = [...gv, 'custom'].join('|')
var ym = '(pr[0-9]+)'
var Sm = '(il[0-9]+pi[0-9]+)'
var vv = new RegExp(`^${ym}(${xv})$`)
var bv = new RegExp(`^(${Sm}(${Rv}))|(il[0-9]+nm)$`)
var Fv = new RegExp(`^(${hv.join('|')})$`)
var Av = new RegExp(`^(${yv.join('|')})$`)
var Pv = new RegExp(`^${ym}custom$`)
var Iv = new RegExp(`^${Sm}custom$`)
var Ev = new RegExp(`^(${[...pv, ...Sv, ...Cv].join('|')})$`)
var wv = (e) => vv.test(e)
var Ov = (e) => bv.test(e)
var qv = (e) => Fv.test(e)
var Tv = (e) => Av.test(e)
var kv = (e) => Ev.test(e)
var Dv = [Ov, wv, qv, Tv, kv]
var Vv = [Pv, Iv]
var Nv = { anonymizeIp: 'aip' }
var Mv = {
  eventCategory: 'ec',
  eventAction: 'ea',
  eventLabel: 'el',
  eventValue: 'ev',
  page: 'dp',
  visitorId: 'cid',
  clientId: 'cid',
  userId: 'uid',
  currencyCode: 'cu',
}
var Qv = {
  hitType: 't',
  pageViewId: 'pid',
  encoding: 'de',
  location: 'dl',
  referrer: 'dr',
  screenColor: 'sd',
  screenResolution: 'sr',
  title: 'dt',
  userAgent: 'ua',
  language: 'ul',
  eventId: 'z',
  time: 'tm',
}
var Lv = ['contentId', 'contentIdKey', 'contentType', 'searchHub', 'tab', 'searchUid', 'permanentId', 'contentLocale']
var jv = Object.assign(
  Object.assign(Object.assign(Object.assign({}, Nv), Mv), Qv),
  Lv.reduce((e, t) => Object.assign(Object.assign({}, e), { [t]: t }), {})
)
var rd = Object.assign(Object.assign({}, jv), cv)
var Bv = (e) => {
  const t = (!!e.action && fv[e.action]) || {}
  return at(e).reduce((r, a) => {
    const n = t[a] || rd[a] || a
    return Object.assign(Object.assign({}, r), { [n]: e[a] })
  }, {})
}
var Uv = at(rd).map((e) => rd[e])
var _v = (e) => Uv.indexOf(e) !== -1
var $v = (e) => e === 'custom'
var Hv = (e) => [...Dv, ...dv, _v, $v].some((t) => t(e))
var zv = (e) =>
  at(e).reduce((t, r) => {
    const a = Wv(r)
    return a ? Object.assign(Object.assign({}, t), Yv(a, e[r])) : Object.assign(Object.assign({}, t), { [r]: e[r] })
  }, {})
var Wv = (e) => {
  let t
  return (
    [...Vv].every((r) => {
      var a
      return (t = (a = r.exec(e)) === null || a === void 0 ? void 0 : a[1]), !t
    }),
    t
  )
}
var Yv = (e, t) => at(t).reduce((r, a) => Object.assign(Object.assign({}, r), { [`${e}${a}`]: t[a] }), {})
var Cm = class {
  constructor (t) {
    this.opts = t
  }

  sendEvent (t, r) {
    return te(this, void 0, void 0, function * () {
      if (!navigator.sendBeacon) {
        throw new Error(
          'navigator.sendBeacon is not supported in this browser. Consider adding a polyfill like "sendbeacon-polyfill".'
        )
      }
      const { baseUrl: a, preprocessRequest: n } = this.opts
      const o = this.encodeForEventType(t, r)
      const i = yield this.getQueryParamsForEventType(t)
      const s = { url: `${a}/analytics/${t}?${i}`, body: new Blob([o], { type: 'application/x-www-form-urlencoded' }) }
      const { url: u, body: c } = Object.assign(Object.assign({}, s), n ? yield n(s, 'analyticsBeacon') : {})
      console.log(`Sending beacon for "${t}" with: `, JSON.stringify(r)), navigator.sendBeacon(u, c)
    })
  }

  deleteHttpCookieVisitorId () {
    return Promise.resolve()
  }

  encodeForEventType (t, r) {
    return this.isEventTypeLegacy(t)
      ? this.encodeForLegacyType(t, r)
      : this.encodeForFormUrlEncoded(Object.assign({ access_token: this.opts.token }, r))
  }

  getQueryParamsForEventType (t) {
    return te(this, void 0, void 0, function * () {
      const { token: r, visitorIdProvider: a } = this.opts
      const n = yield a.getCurrentVisitorId()
      return [
        r && this.isEventTypeLegacy(t) ? `access_token=${r}` : '',
        n ? `visitorId=${n}` : '',
        'discardVisitInfo=true',
      ]
        .filter((o) => !!o)
        .join('&')
    })
  }

  isEventTypeLegacy (t) {
    return [Ce.click, Ce.custom, Ce.search, Ce.view].indexOf(t) !== -1
  }

  encodeForLegacyType (t, r) {
    return `${t}Event=${encodeURIComponent(JSON.stringify(r))}`
  }

  encodeForFormUrlEncoded (t) {
    return Object.keys(t)
      .filter((r) => !!t[r])
      .map((r) => `${encodeURIComponent(r)}=${encodeURIComponent(this.encodeValue(t[r]))}`)
      .join('&')
  }

  encodeValue (t) {
    return typeof t === 'number' || typeof t === 'string' || typeof t === 'boolean' ? t : JSON.stringify(t)
  }
}
var xm = class {
  sendEvent (t, r) {
    return te(this, void 0, void 0, function * () {
      return Promise.resolve()
    })
  }

  deleteHttpCookieVisitorId () {
    return te(this, void 0, void 0, function * () {
      return Promise.resolve()
    })
  }
}
var Rm = window.fetch
var ad = class {
  constructor (t) {
    this.opts = t
  }

  sendEvent (t, r) {
    return te(this, void 0, void 0, function * () {
      const { baseUrl: a, visitorIdProvider: n, preprocessRequest: o } = this.opts
      const i = this.shouldAppendVisitorId(t) ? yield this.getVisitorIdParam() : ''
      const s = {
        url: `${a}/analytics/${t}${i}`,
        credentials: 'include',
        mode: 'cors',
        headers: this.getHeaders(),
        method: 'POST',
        body: JSON.stringify(r),
      }
      const u = Object.assign(Object.assign({}, s), o ? yield o(s, 'analyticsFetch') : {})
      const { url: c } = u
      const l = rs(u, ['url'])
      const d = yield Rm(c, l)
      if (d.ok) {
        const m = yield d.json()
        return m.visitorId && n.setCurrentVisitorId(m.visitorId), m
      } else {
        try {
          d.json()
        } catch {}
        throw (
          (console.error(`An error has occured when sending the "${t}" event.`, d, r),
          new Error(`An error has occurred when sending the "${t}" event. Check the console logs for more details.`))
        )
      }
    })
  }

  deleteHttpCookieVisitorId () {
    return te(this, void 0, void 0, function * () {
      const { baseUrl: t } = this.opts
      const r = `${t}/analytics/visit`
      yield Rm(r, { headers: this.getHeaders(), method: 'DELETE' })
    })
  }

  shouldAppendVisitorId (t) {
    return [Ce.click, Ce.custom, Ce.search, Ce.view].indexOf(t) !== -1
  }

  getVisitorIdParam () {
    return te(this, void 0, void 0, function * () {
      const { visitorIdProvider: t } = this.opts
      const r = yield t.getCurrentVisitorId()
      return r ? `?visitor=${r}` : ''
    })
  }

  getHeaders () {
    const { token: t } = this.opts
    return Object.assign(Object.assign({}, t ? { Authorization: `Bearer ${t}` } : {}), {
      'Content-Type': 'application/json',
    })
  }
}
var vm = class {
  constructor (t, r) {
    Xl() && um()
      ? (this.storage = new dm())
      : Xl()
        ? (this.storage = localStorage)
        : (console.warn('BrowserRuntime detected no valid storage available.', this), (this.storage = new Ya())),
    (this.client = new ad(t)),
    (this.beaconClient = new Cm(t)),
    window.addEventListener('beforeunload', () => {
      const a = r()
      for (const { eventType: n, payload: o } of a) this.beaconClient.sendEvent(n, o)
    })
  }
}
var bm = class {
  constructor (t, r) {
    ;(this.storage = r || new Ya()), (this.client = new ad(t))
  }
}
var Fm = class {
  constructor () {
    ;(this.storage = new Ya()), (this.client = new xm())
  }
}
var Kv = 'xx'
var Gv = (e) => (e == null ? void 0 : e.startsWith(Kv)) || !1
var Jv = `
        We've detected you're using React Native but have not provided the corresponding runtime, 
        for an optimal experience please install @react-native-async-storage/async-storage and instantiate 
        your analytics client as follows:
        
        import {ReactNativeRuntime} from 'coveo.analytics/src/react-native';
        
        const analytics = new CoveoAnalyticsClient({
            ...your options,
            runtimeEnvironment: new ReactNativeRuntime({
                baseUrl: '...',
            });
        })
    `
function Xv () {
  return typeof navigator !== 'undefined' && navigator.product == 'ReactNative'
}
var Zv = ['1', 1, 'yes', !0]
function nd () {
  return (
    Jl() &&
    [navigator.globalPrivacyControl, navigator.doNotTrack, navigator.msDoNotTrack, window.doNotTrack].some(
      (e) => Zv.indexOf(e) !== -1
    )
  )
}
var eb = 'v15'
var tb = {
  default: 'https://analytics.cloud.coveo.com/rest/ua',
  production: 'https://analytics.cloud.coveo.com/rest/ua',
  hipaa: 'https://analyticshipaa.cloud.coveo.com/rest/ua',
}
var nt = class {
  constructor (t) {
    if (!t) throw new Error('You have to pass options to this constructor')
    ;(this.options = Object.assign(Object.assign({}, this.defaultOptions), t)),
    (this.visitorId = ''),
    (this.bufferedRequests = []),
    (this.beforeSendHooks = [rv, ev].concat(this.options.beforeSendHooks)),
    (this.afterSendHooks = this.options.afterSendHooks),
    (this.eventTypeMapping = {})
    const r = {
      baseUrl: this.baseUrl,
      token: this.options.token,
      visitorIdProvider: this,
      preprocessRequest: this.options.preprocessRequest,
    }
    ;(this.runtime = this.options.runtimeEnvironment || this.initRuntime(r)),
    nd() && (this.clear(), (this.runtime.storage = new Ya()))
  }

  get defaultOptions () {
    return { endpoint: tb.default, token: '', version: eb, beforeSendHooks: [], afterSendHooks: [] }
  }

  initRuntime (t) {
    return KR() && cm()
      ? new vm(t, () => {
        const r = [...this.bufferedRequests]
        return (this.bufferedRequests = []), r
      })
      : (Xv() && console.warn(Jv), new bm(t))
  }

  get storage () {
    return this.runtime.storage
  }

  determineVisitorId () {
    return te(this, void 0, void 0, function * () {
      try {
        return (yield this.storage.getItem('visitorId')) || Ka()
      } catch (t) {
        return (
          console.log(
            'Could not get visitor ID from the current runtime environment storage. Using a random ID instead.',
            t
          ),
          Ka()
        )
      }
    })
  }

  getCurrentVisitorId () {
    return te(this, void 0, void 0, function * () {
      if (!this.visitorId) {
        const t = yield this.determineVisitorId()
        yield this.setCurrentVisitorId(t)
      }
      return this.visitorId
    })
  }

  setCurrentVisitorId (t) {
    return te(this, void 0, void 0, function * () {
      ;(this.visitorId = t), yield this.storage.setItem('visitorId', t)
    })
  }

  getParameters (t, ...r) {
    return te(this, void 0, void 0, function * () {
      return yield this.resolveParameters(t, ...r)
    })
  }

  getPayload (t, ...r) {
    return te(this, void 0, void 0, function * () {
      const a = yield this.resolveParameters(t, ...r)
      return yield this.resolvePayloadForParameters(t, a)
    })
  }

  get currentVisitorId () {
    return (
      typeof (this.visitorId || this.storage.getItem('visitorId')) !== 'string' && this.setCurrentVisitorId(Ka()),
      this.visitorId
    )
  }

  set currentVisitorId (t) {
    ;(this.visitorId = t), this.storage.setItem('visitorId', t)
  }

  resolveParameters (t, ...r) {
    return te(this, void 0, void 0, function * () {
      const {
        variableLengthArgumentsNames: a = [],
        addVisitorIdParameter: n = !1,
        usesMeasurementProtocol: o = !1,
        addClientIdParameter: i = !1,
      } = this.eventTypeMapping[t] || {}
      return yield [
        (p) => (a.length > 0 ? this.parseVariableArgumentsPayload(a, p) : p[0]),
        (p) =>
          te(this, void 0, void 0, function * () {
            return Object.assign(Object.assign({}, p), { visitorId: n ? yield this.getCurrentVisitorId() : '' })
          }),
        (p) =>
          te(this, void 0, void 0, function * () {
            return i ? Object.assign(Object.assign({}, p), { clientId: yield this.getCurrentVisitorId() }) : p
          }),
        (p) => (o ? this.ensureAnonymousUserWhenUsingApiKey(p) : p),
        (p) =>
          this.beforeSendHooks.reduce(
            (f, h) =>
              te(this, void 0, void 0, function * () {
                const C = yield f
                return yield h(t, C)
              }),
            p
          ),
      ].reduce(
        (p, f) =>
          te(this, void 0, void 0, function * () {
            const h = yield p
            return yield f(h)
          }),
        Promise.resolve(r)
      )
    })
  }

  resolvePayloadForParameters (t, r) {
    return te(this, void 0, void 0, function * () {
      const { usesMeasurementProtocol: a = !1 } = this.eventTypeMapping[t] || {}
      return yield [
        (l) => this.removeEmptyPayloadValues(l, t),
        (l) => this.validateParams(l),
        (l) => (a ? Bv(l) : l),
        (l) => (a ? this.removeUnknownParameters(l) : l),
        (l) => (a ? this.processCustomParameters(l) : l),
      ].reduce(
        (l, d) =>
          te(this, void 0, void 0, function * () {
            const m = yield l
            return yield d(m)
          }),
        Promise.resolve(r)
      )
    })
  }

  sendEvent (t, ...r) {
    return te(this, void 0, void 0, function * () {
      const { newEventType: a = t } = this.eventTypeMapping[t] || {}
      const n = yield this.resolveParameters(t, ...r)
      const o = yield this.resolvePayloadForParameters(t, n)
      return (
        this.bufferedRequests.push({ eventType: a, payload: o }),
        yield Promise.all(this.afterSendHooks.map((i) => i(t, n))),
        yield this.deferExecution(),
        yield this.sendFromBufferWithFetch()
      )
    })
  }

  deferExecution () {
    return new Promise((t) => setTimeout(t, 0))
  }

  sendFromBufferWithFetch () {
    return te(this, void 0, void 0, function * () {
      const t = this.bufferedRequests.shift()
      if (t) {
        const { eventType: r, payload: a } = t
        return this.runtime.client.sendEvent(r, a)
      }
    })
  }

  clear () {
    this.storage.removeItem('visitorId'), new Xo().clear()
  }

  deleteHttpOnlyVisitorId () {
    this.runtime.client.deleteHttpCookieVisitorId()
  }

  sendSearchEvent (t) {
    return te(this, void 0, void 0, function * () {
      return this.sendEvent(Ce.search, t)
    })
  }

  sendClickEvent (t) {
    return te(this, void 0, void 0, function * () {
      return this.sendEvent(Ce.click, t)
    })
  }

  sendCustomEvent (t) {
    return te(this, void 0, void 0, function * () {
      return this.sendEvent(Ce.custom, t)
    })
  }

  sendViewEvent (t) {
    return te(this, void 0, void 0, function * () {
      return this.sendEvent(Ce.view, t)
    })
  }

  getVisit () {
    return te(this, void 0, void 0, function * () {
      const r = yield (yield fetch(`${this.baseUrl}/analytics/visit`)).json()
      return (this.visitorId = r.visitorId), r
    })
  }

  getHealth () {
    return te(this, void 0, void 0, function * () {
      return yield (yield fetch(`${this.baseUrl}/analytics/monitoring/health`)).json()
    })
  }

  registerBeforeSendEventHook (t) {
    this.beforeSendHooks.push(t)
  }

  registerAfterSendEventHook (t) {
    this.afterSendHooks.push(t)
  }

  addEventTypeMapping (t, r) {
    this.eventTypeMapping[t] = r
  }

  parseVariableArgumentsPayload (t, r) {
    const a = {}
    for (let n = 0, o = r.length; n < o; n++) {
      const i = r[n]
      if (typeof i === 'string') a[t[n]] = i
      else if (typeof i === 'object') return Object.assign(Object.assign({}, a), i)
    }
    return a
  }

  isKeyAllowedEmpty (t, r) {
    return ({ [Ce.search]: ['queryText'] }[t] || []).indexOf(r) !== -1
  }

  removeEmptyPayloadValues (t, r) {
    const a = (n) => typeof n !== 'undefined' && n !== null && n !== ''
    return Object.keys(t)
      .filter((n) => this.isKeyAllowedEmpty(r, n) || a(t[n]))
      .reduce((n, o) => Object.assign(Object.assign({}, n), { [o]: t[o] }), {})
  }

  removeUnknownParameters (t) {
    return Object.keys(t)
      .filter((a) => {
        if (Hv(a)) return !0
        console.log(a, 'is not processed by coveoua')
      })
      .reduce((a, n) => Object.assign(Object.assign({}, a), { [n]: t[n] }), {})
  }

  processCustomParameters (t) {
    const { custom: r } = t
    const a = rs(t, ['custom'])
    const n = this.lowercaseKeys(r)
    const o = zv(a)
    return Object.assign(Object.assign({}, n), o)
  }

  lowercaseKeys (t) {
    return Object.keys(t || {}).reduce((a, n) => Object.assign(Object.assign({}, a), { [n.toLowerCase()]: t[n] }), {})
  }

  validateParams (t) {
    const { anonymizeIp: r } = t
    const a = rs(t, ['anonymizeIp'])
    return (
      r !== void 0 &&
        ['0', 'false', 'undefined', 'null', '{}', '[]', ''].indexOf(`${r}`.toLowerCase()) == -1 &&
        (a.anonymizeIp = 1),
      a
    )
  }

  ensureAnonymousUserWhenUsingApiKey (t) {
    const { userId: r } = t
    const a = rs(t, ['userId'])
    return Gv(this.options.token) && !r ? ((a.userId = 'anonymous'), a) : t
  }

  get baseUrl () {
    const { version: t, endpoint: r } = this.options
    const a = r.indexOf('.cloud.coveo.com') !== -1
    return `${r}${a ? '' : '/rest'}/${t}`
  }
}
var Zo
;(function (e) {
  ;(e.contextChanged = 'contextChanged'), (e.expandToFullUI = 'expandToFullUI')
})(Zo || (Zo = {}))
var b
;(function (e) {
  ;(e.interfaceLoad = 'interfaceLoad'),
  (e.interfaceChange = 'interfaceChange'),
  (e.didyoumeanAutomatic = 'didyoumeanAutomatic'),
  (e.didyoumeanClick = 'didyoumeanClick'),
  (e.resultsSort = 'resultsSort'),
  (e.searchboxSubmit = 'searchboxSubmit'),
  (e.searchboxClear = 'searchboxClear'),
  (e.searchboxAsYouType = 'searchboxAsYouType'),
  (e.breadcrumbFacet = 'breadcrumbFacet'),
  (e.breadcrumbResetAll = 'breadcrumbResetAll'),
  (e.documentQuickview = 'documentQuickview'),
  (e.documentOpen = 'documentOpen'),
  (e.omniboxAnalytics = 'omniboxAnalytics'),
  (e.omniboxFromLink = 'omniboxFromLink'),
  (e.searchFromLink = 'searchFromLink'),
  (e.triggerNotify = 'notify'),
  (e.triggerExecute = 'execute'),
  (e.triggerQuery = 'query'),
  (e.undoTriggerQuery = 'undoQuery'),
  (e.triggerRedirect = 'redirect'),
  (e.pagerResize = 'pagerResize'),
  (e.pagerNumber = 'pagerNumber'),
  (e.pagerNext = 'pagerNext'),
  (e.pagerPrevious = 'pagerPrevious'),
  (e.pagerScrolling = 'pagerScrolling'),
  (e.staticFilterClearAll = 'staticFilterClearAll'),
  (e.staticFilterSelect = 'staticFilterSelect'),
  (e.staticFilterDeselect = 'staticFilterDeselect'),
  (e.facetClearAll = 'facetClearAll'),
  (e.facetSearch = 'facetSearch'),
  (e.facetSelect = 'facetSelect'),
  (e.facetSelectAll = 'facetSelectAll'),
  (e.facetDeselect = 'facetDeselect'),
  (e.facetExclude = 'facetExclude'),
  (e.facetUnexclude = 'facetUnexclude'),
  (e.facetUpdateSort = 'facetUpdateSort'),
  (e.facetShowMore = 'showMoreFacetResults'),
  (e.facetShowLess = 'showLessFacetResults'),
  (e.queryError = 'query'),
  (e.queryErrorBack = 'errorBack'),
  (e.queryErrorClear = 'errorClearQuery'),
  (e.queryErrorRetry = 'errorRetry'),
  (e.recommendation = 'recommendation'),
  (e.recommendationInterfaceLoad = 'recommendationInterfaceLoad'),
  (e.recommendationOpen = 'recommendationOpen'),
  (e.likeSmartSnippet = 'likeSmartSnippet'),
  (e.dislikeSmartSnippet = 'dislikeSmartSnippet'),
  (e.expandSmartSnippet = 'expandSmartSnippet'),
  (e.collapseSmartSnippet = 'collapseSmartSnippet'),
  (e.openSmartSnippetFeedbackModal = 'openSmartSnippetFeedbackModal'),
  (e.closeSmartSnippetFeedbackModal = 'closeSmartSnippetFeedbackModal'),
  (e.sendSmartSnippetReason = 'sendSmartSnippetReason'),
  (e.expandSmartSnippetSuggestion = 'expandSmartSnippetSuggestion'),
  (e.collapseSmartSnippetSuggestion = 'collapseSmartSnippetSuggestion'),
  (e.showMoreSmartSnippetSuggestion = 'showMoreSmartSnippetSuggestion'),
  (e.showLessSmartSnippetSuggestion = 'showLessSmartSnippetSuggestion'),
  (e.openSmartSnippetSource = 'openSmartSnippetSource'),
  (e.openSmartSnippetSuggestionSource = 'openSmartSnippetSuggestionSource'),
  (e.openSmartSnippetInlineLink = 'openSmartSnippetInlineLink'),
  (e.openSmartSnippetSuggestionInlineLink = 'openSmartSnippetSuggestionInlineLink'),
  (e.recentQueryClick = 'recentQueriesClick'),
  (e.clearRecentQueries = 'clearRecentQueries'),
  (e.recentResultClick = 'recentResultClick'),
  (e.clearRecentResults = 'clearRecentResults'),
  (e.noResultsBack = 'noResultsBack'),
  (e.showMoreFoldedResults = 'showMoreFoldedResults'),
  (e.showLessFoldedResults = 'showLessFoldedResults')
})(b || (b = {}))
var Am = {
  [b.triggerNotify]: 'queryPipelineTriggers',
  [b.triggerExecute]: 'queryPipelineTriggers',
  [b.triggerQuery]: 'queryPipelineTriggers',
  [b.triggerRedirect]: 'queryPipelineTriggers',
  [b.queryError]: 'errors',
  [b.queryErrorBack]: 'errors',
  [b.queryErrorClear]: 'errors',
  [b.queryErrorRetry]: 'errors',
  [b.pagerNext]: 'getMoreResults',
  [b.pagerPrevious]: 'getMoreResults',
  [b.pagerNumber]: 'getMoreResults',
  [b.pagerResize]: 'getMoreResults',
  [b.pagerScrolling]: 'getMoreResults',
  [b.facetSearch]: 'facet',
  [b.facetShowLess]: 'facet',
  [b.facetShowMore]: 'facet',
  [b.recommendation]: 'recommendation',
  [b.likeSmartSnippet]: 'smartSnippet',
  [b.dislikeSmartSnippet]: 'smartSnippet',
  [b.expandSmartSnippet]: 'smartSnippet',
  [b.collapseSmartSnippet]: 'smartSnippet',
  [b.openSmartSnippetFeedbackModal]: 'smartSnippet',
  [b.closeSmartSnippetFeedbackModal]: 'smartSnippet',
  [b.sendSmartSnippetReason]: 'smartSnippet',
  [b.expandSmartSnippetSuggestion]: 'smartSnippetSuggestions',
  [b.collapseSmartSnippetSuggestion]: 'smartSnippetSuggestions',
  [b.showMoreSmartSnippetSuggestion]: 'smartSnippetSuggestions',
  [b.showLessSmartSnippetSuggestion]: 'smartSnippetSuggestions',
  [b.clearRecentQueries]: 'recentQueries',
  [b.recentResultClick]: 'recentlyClickedDocuments',
  [b.clearRecentResults]: 'recentlyClickedDocuments',
  [b.showLessFoldedResults]: 'folding',
  [Zo.expandToFullUI]: 'interface',
}
var ei = class {
  constructor () {
    ;(this.runtime = new Fm()), (this.currentVisitorId = '')
  }

  getPayload () {
    return Promise.resolve()
  }

  getParameters () {
    return Promise.resolve()
  }

  sendEvent () {
    return Promise.resolve()
  }

  sendSearchEvent () {
    return Promise.resolve()
  }

  sendClickEvent () {
    return Promise.resolve()
  }

  sendCustomEvent () {
    return Promise.resolve()
  }

  sendViewEvent () {
    return Promise.resolve()
  }

  getVisit () {
    return Promise.resolve({ id: '', visitorId: '' })
  }

  getHealth () {
    return Promise.resolve({ status: '' })
  }

  registerBeforeSendEventHook () {}
  registerAfterSendEventHook () {}
  addEventTypeMapping () {}
}
function rb (e) {
  let t = ''
  return e.filter((r) => {
    const a = r !== t
    return (t = r), a
  })
}
function ab (e) {
  return e.map((t) => t.replace(/;/g, ''))
}
function Pm (e) {
  const t = 256
  const r = e.join(';')
  return r.length <= t ? r : Pm(e.slice(1))
}
var Im = (e) => {
  const t = ab(e)
  const r = rb(t)
  return Pm(r)
}
function Em (e) {
  const t = typeof e.partialQueries === 'string' ? e.partialQueries : Im(e.partialQueries)
  const r = typeof e.suggestions === 'string' ? e.suggestions : Im(e.suggestions)
  return Object.assign(Object.assign({}, e), { partialQueries: t, suggestions: r })
}
var od = class {
  constructor (t, r) {
    ;(this.opts = t), (this.provider = r)
    const a = t.enableAnalytics === !1 || nd()
    this.coveoAnalyticsClient = a ? new ei() : new nt(t)
  }

  disable () {
    this.coveoAnalyticsClient instanceof nt && this.coveoAnalyticsClient.clear(), (this.coveoAnalyticsClient = new ei())
  }

  enable () {
    this.coveoAnalyticsClient = new nt(this.opts)
  }

  logInterfaceLoad () {
    return this.logSearchEvent(b.interfaceLoad)
  }

  logRecommendationInterfaceLoad () {
    return this.logSearchEvent(b.recommendationInterfaceLoad)
  }

  logRecommendation () {
    return this.logCustomEvent(b.recommendation)
  }

  logRecommendationOpen (t, r) {
    return this.logClickEvent(b.recommendationOpen, t, r)
  }

  logStaticFilterClearAll (t) {
    return this.logSearchEvent(b.staticFilterClearAll, t)
  }

  logStaticFilterSelect (t) {
    return this.logSearchEvent(b.staticFilterSelect, t)
  }

  logStaticFilterDeselect (t) {
    return this.logSearchEvent(b.staticFilterDeselect, t)
  }

  logFetchMoreResults () {
    return this.logCustomEvent(b.pagerScrolling, { type: 'getMoreResults' })
  }

  logInterfaceChange (t) {
    return this.logSearchEvent(b.interfaceChange, t)
  }

  logDidYouMeanAutomatic () {
    return this.logSearchEvent(b.didyoumeanAutomatic)
  }

  logDidYouMeanClick () {
    return this.logSearchEvent(b.didyoumeanClick)
  }

  logResultsSort (t) {
    return this.logSearchEvent(b.resultsSort, t)
  }

  logSearchboxSubmit () {
    return this.logSearchEvent(b.searchboxSubmit)
  }

  logSearchboxClear () {
    return this.logSearchEvent(b.searchboxClear)
  }

  logSearchboxAsYouType () {
    return this.logSearchEvent(b.searchboxAsYouType)
  }

  logBreadcrumbFacet (t) {
    return this.logSearchEvent(b.breadcrumbFacet, t)
  }

  logBreadcrumbResetAll () {
    return this.logSearchEvent(b.breadcrumbResetAll)
  }

  logDocumentQuickview (t, r) {
    return this.logClickEvent(b.documentQuickview, t, r)
  }

  logDocumentOpen (t, r) {
    return this.logClickEvent(b.documentOpen, t, r)
  }

  logOmniboxAnalytics (t) {
    return this.logSearchEvent(b.omniboxAnalytics, Em(t))
  }

  logOmniboxFromLink (t) {
    return this.logSearchEvent(b.omniboxFromLink, Em(t))
  }

  logSearchFromLink () {
    return this.logSearchEvent(b.searchFromLink)
  }

  logTriggerNotify (t) {
    return this.logCustomEvent(b.triggerNotify, t)
  }

  logTriggerExecute (t) {
    return this.logCustomEvent(b.triggerExecute, t)
  }

  logTriggerQuery () {
    const t = { query: this.provider.getSearchEventRequestPayload().queryText }
    return this.logCustomEvent(b.triggerQuery, t, 'queryPipelineTriggers')
  }

  logUndoTriggerQuery (t) {
    return this.logSearchEvent(b.undoTriggerQuery, t)
  }

  logTriggerRedirect (t) {
    const r = Object.assign(Object.assign({}, t), { query: this.provider.getSearchEventRequestPayload().queryText })
    return this.logCustomEvent(b.triggerRedirect, r)
  }

  logPagerResize (t) {
    return this.logCustomEvent(b.pagerResize, t)
  }

  logPagerNumber (t) {
    return this.logCustomEvent(b.pagerNumber, t)
  }

  logPagerNext (t) {
    return this.logCustomEvent(b.pagerNext, t)
  }

  logPagerPrevious (t) {
    return this.logCustomEvent(b.pagerPrevious, t)
  }

  logPagerScrolling () {
    return this.logCustomEvent(b.pagerScrolling)
  }

  logFacetClearAll (t) {
    return this.logSearchEvent(b.facetClearAll, t)
  }

  logFacetSearch (t) {
    return this.logSearchEvent(b.facetSearch, t)
  }

  logFacetSelect (t) {
    return this.logSearchEvent(b.facetSelect, t)
  }

  logFacetDeselect (t) {
    return this.logSearchEvent(b.facetDeselect, t)
  }

  logFacetExclude (t) {
    return this.logSearchEvent(b.facetExclude, t)
  }

  logFacetUnexclude (t) {
    return this.logSearchEvent(b.facetUnexclude, t)
  }

  logFacetSelectAll (t) {
    return this.logSearchEvent(b.facetSelectAll, t)
  }

  logFacetUpdateSort (t) {
    return this.logSearchEvent(b.facetUpdateSort, t)
  }

  logFacetShowMore (t) {
    return this.logCustomEvent(b.facetShowMore, t)
  }

  logFacetShowLess (t) {
    return this.logCustomEvent(b.facetShowLess, t)
  }

  logQueryError (t) {
    return this.logCustomEvent(b.queryError, t)
  }

  logQueryErrorBack () {
    return te(this, void 0, void 0, function * () {
      return yield this.logCustomEvent(b.queryErrorBack), this.logSearchEvent(b.queryErrorBack)
    })
  }

  logQueryErrorRetry () {
    return te(this, void 0, void 0, function * () {
      return yield this.logCustomEvent(b.queryErrorRetry), this.logSearchEvent(b.queryErrorRetry)
    })
  }

  logQueryErrorClear () {
    return te(this, void 0, void 0, function * () {
      return yield this.logCustomEvent(b.queryErrorClear), this.logSearchEvent(b.queryErrorClear)
    })
  }

  logLikeSmartSnippet () {
    return this.logCustomEvent(b.likeSmartSnippet)
  }

  logDislikeSmartSnippet () {
    return this.logCustomEvent(b.dislikeSmartSnippet)
  }

  logExpandSmartSnippet () {
    return this.logCustomEvent(b.expandSmartSnippet)
  }

  logCollapseSmartSnippet () {
    return this.logCustomEvent(b.collapseSmartSnippet)
  }

  logOpenSmartSnippetFeedbackModal () {
    return this.logCustomEvent(b.openSmartSnippetFeedbackModal)
  }

  logCloseSmartSnippetFeedbackModal () {
    return this.logCustomEvent(b.closeSmartSnippetFeedbackModal)
  }

  logSmartSnippetFeedbackReason (t, r) {
    return this.logCustomEvent(b.sendSmartSnippetReason, { reason: t, details: r })
  }

  logExpandSmartSnippetSuggestion (t) {
    return this.logCustomEvent(b.expandSmartSnippetSuggestion, 'documentId' in t ? t : { documentId: t })
  }

  logCollapseSmartSnippetSuggestion (t) {
    return this.logCustomEvent(b.collapseSmartSnippetSuggestion, 'documentId' in t ? t : { documentId: t })
  }

  logShowMoreSmartSnippetSuggestion (t) {
    return this.logCustomEvent(b.showMoreSmartSnippetSuggestion, t)
  }

  logShowLessSmartSnippetSuggestion (t) {
    return this.logCustomEvent(b.showLessSmartSnippetSuggestion, t)
  }

  logOpenSmartSnippetSource (t, r) {
    return this.logClickEvent(b.openSmartSnippetSource, t, r)
  }

  logOpenSmartSnippetSuggestionSource (t, r) {
    return this.logClickEvent(
      b.openSmartSnippetSuggestionSource,
      t,
      { contentIDKey: r.documentId.contentIdKey, contentIDValue: r.documentId.contentIdValue },
      r
    )
  }

  logOpenSmartSnippetInlineLink (t, r) {
    return this.logClickEvent(
      b.openSmartSnippetInlineLink,
      t,
      { contentIDKey: r.contentIDKey, contentIDValue: r.contentIDValue },
      r
    )
  }

  logOpenSmartSnippetSuggestionInlineLink (t, r) {
    return this.logClickEvent(
      b.openSmartSnippetSuggestionInlineLink,
      t,
      { contentIDKey: r.documentId.contentIdKey, contentIDValue: r.documentId.contentIdValue },
      r
    )
  }

  logRecentQueryClick () {
    return this.logSearchEvent(b.recentQueryClick)
  }

  logClearRecentQueries () {
    return this.logCustomEvent(b.clearRecentQueries)
  }

  logRecentResultClick (t, r) {
    return this.logCustomEvent(b.recentResultClick, { info: t, identifier: r })
  }

  logClearRecentResults () {
    return this.logCustomEvent(b.clearRecentResults)
  }

  logNoResultsBack () {
    return this.logSearchEvent(b.noResultsBack)
  }

  logShowMoreFoldedResults (t, r) {
    return this.logClickEvent(b.showMoreFoldedResults, t, r)
  }

  logShowLessFoldedResults () {
    return this.logCustomEvent(b.showLessFoldedResults)
  }

  logCustomEvent (t, r, a = Am[t]) {
    return te(this, void 0, void 0, function * () {
      const n = Object.assign(Object.assign({}, this.provider.getBaseMetadata()), r)
      const o = Object.assign(Object.assign({}, yield this.getBaseCustomEventRequest(n)), {
        eventType: a,
        eventValue: t,
      })
      return this.coveoAnalyticsClient.sendCustomEvent(o)
    })
  }

  logCustomEventWithType (t, r, a) {
    return te(this, void 0, void 0, function * () {
      const n = Object.assign(Object.assign({}, this.provider.getBaseMetadata()), a)
      const o = Object.assign(Object.assign({}, yield this.getBaseCustomEventRequest(n)), {
        eventType: r,
        eventValue: t,
      })
      return this.coveoAnalyticsClient.sendCustomEvent(o)
    })
  }

  logSearchEvent (t, r) {
    return te(this, void 0, void 0, function * () {
      return this.coveoAnalyticsClient.sendSearchEvent(yield this.getBaseSearchEventRequest(t, r))
    })
  }

  logClickEvent (t, r, a, n) {
    return te(this, void 0, void 0, function * () {
      const o = Object.assign(
        Object.assign(Object.assign({}, r), yield this.getBaseEventRequest(Object.assign(Object.assign({}, a), n))),
        { searchQueryUid: this.provider.getSearchUID(), queryPipeline: this.provider.getPipeline(), actionCause: t }
      )
      return this.coveoAnalyticsClient.sendClickEvent(o)
    })
  }

  getBaseSearchEventRequest (t, r) {
    return te(this, void 0, void 0, function * () {
      return Object.assign(
        Object.assign(
          Object.assign({}, yield this.getBaseEventRequest(r)),
          this.provider.getSearchEventRequestPayload()
        ),
        { searchQueryUid: this.provider.getSearchUID(), queryPipeline: this.provider.getPipeline(), actionCause: t }
      )
    })
  }

  getBaseCustomEventRequest (t) {
    return te(this, void 0, void 0, function * () {
      return Object.assign(Object.assign({}, yield this.getBaseEventRequest(t)), {
        lastSearchQueryUid: this.provider.getSearchUID(),
      })
    })
  }

  getBaseEventRequest (t) {
    return te(this, void 0, void 0, function * () {
      const r = Object.assign(Object.assign({}, this.provider.getBaseMetadata()), t)
      return Object.assign(Object.assign(Object.assign({}, this.getOrigins()), this.getSplitTestRun()), {
        customData: r,
        language: this.provider.getLanguage(),
        facetState: this.provider.getFacetState ? this.provider.getFacetState() : [],
        anonymous: this.provider.getIsAnonymous(),
        clientId: yield this.getClientId(),
      })
    })
  }

  getOrigins () {
    var t, r
    return {
      originContext: (r = (t = this.provider).getOriginContext) === null || r === void 0 ? void 0 : r.call(t),
      originLevel1: this.provider.getOriginLevel1(),
      originLevel2: this.provider.getOriginLevel2(),
      originLevel3: this.provider.getOriginLevel3(),
    }
  }

  getClientId () {
    return this.coveoAnalyticsClient instanceof nt ? this.coveoAnalyticsClient.getCurrentVisitorId() : void 0
  }

  getSplitTestRun () {
    const t = this.provider.getSplitTestRunName ? this.provider.getSplitTestRunName() : ''
    const r = this.provider.getSplitTestRunVersion ? this.provider.getSplitTestRunVersion() : ''
    return Object.assign(Object.assign({}, t && { splitTestRunName: t }), r && { splitTestRunVersion: r })
  }
}
var ti = { pageview: 'pageview', event: 'event' }
var os = Object.assign({}, ti)
Object.keys(os).map((e) => os[e])
var km
;(function (e) {
  ;(e.click = 'click'), (e.flowStart = 'flowStart')
})(km || (km = {}))
var Dm
;(function (e) {
  ;(e.enterInterface = 'ticket_create_start'),
  (e.fieldUpdate = 'ticket_field_update'),
  (e.fieldSuggestionClick = 'ticket_classification_click'),
  (e.suggestionClick = 'suggestion_click'),
  (e.suggestionRate = 'suggestion_rate'),
  (e.nextCaseStep = 'ticket_next_stage'),
  (e.caseCancelled = 'ticket_cancel'),
  (e.caseSolved = 'ticket_cancel'),
  (e.caseCreated = 'ticket_create')
})(Dm || (Dm = {}))
var Vm
;(function (e) {
  ;(e.quit = 'Quit'), (e.solved = 'Solved')
})(Vm || (Vm = {}))
var Nm = (e) => {
  const t = {}
  return (
    Object.keys(e.caseContext).forEach((r) => {
      const a = `context_${r}`
      t[a] = e.caseContext[r]
    }),
    t
  )
}
var id = class {
  constructor (t, r) {
    ;(this.opts = t), (this.provider = r)
    const a = t.enableAnalytics === !1 || nd()
    this.coveoAnalyticsClient = a ? new ei() : new nt(t)
  }

  disable () {
    this.coveoAnalyticsClient instanceof nt && this.coveoAnalyticsClient.clear(), (this.coveoAnalyticsClient = new ei())
  }

  enable () {
    this.coveoAnalyticsClient = new nt(this.opts)
  }

  logInterfaceLoad () {
    return this.logSearchEvent(b.interfaceLoad)
  }

  logInterfaceChange (t) {
    return this.logSearchEvent(b.interfaceChange, t)
  }

  logStaticFilterDeselect (t) {
    return this.logSearchEvent(b.staticFilterDeselect, t)
  }

  logFetchMoreResults () {
    return this.logCustomEvent(b.pagerScrolling, { type: 'getMoreResults' })
  }

  logBreadcrumbFacet (t) {
    return this.logSearchEvent(b.breadcrumbFacet, t)
  }

  logBreadcrumbResetAll () {
    return this.logSearchEvent(b.breadcrumbResetAll)
  }

  logFacetSelect (t) {
    return this.logSearchEvent(b.facetSelect, t)
  }

  logFacetDeselect (t) {
    return this.logSearchEvent(b.facetDeselect, t)
  }

  logFacetUpdateSort (t) {
    return this.logSearchEvent(b.facetUpdateSort, t)
  }

  logFacetClearAll (t) {
    return this.logSearchEvent(b.facetClearAll, t)
  }

  logFacetShowMore (t) {
    return this.logCustomEvent(b.facetShowMore, t)
  }

  logFacetShowLess (t) {
    return this.logCustomEvent(b.facetShowLess, t)
  }

  logQueryError (t) {
    return this.logCustomEvent(b.queryError, t)
  }

  logCustomEvent (t, r) {
    return te(this, void 0, void 0, function * () {
      const a = Object.assign(Object.assign({}, this.provider.getBaseMetadata()), r)
      const n = Object.assign(Object.assign({}, yield this.getBaseCustomEventRequest(a)), {
        eventType: Am[t],
        eventValue: t,
      })
      return this.coveoAnalyticsClient.sendCustomEvent(n)
    })
  }

  logSearchEvent (t, r) {
    return te(this, void 0, void 0, function * () {
      return this.coveoAnalyticsClient.sendSearchEvent(yield this.getBaseSearchEventRequest(t, r))
    })
  }

  logPagerNumber (t) {
    return this.logCustomEvent(b.pagerNumber, t)
  }

  logPagerNext (t) {
    return this.logCustomEvent(b.pagerNext, t)
  }

  logPagerPrevious (t) {
    return this.logCustomEvent(b.pagerPrevious, t)
  }

  logDidYouMeanAutomatic () {
    return this.logSearchEvent(b.didyoumeanAutomatic)
  }

  logDidYouMeanClick () {
    return this.logSearchEvent(b.didyoumeanClick)
  }

  logResultsSort (t) {
    return this.logSearchEvent(b.resultsSort, t)
  }

  logSearchboxSubmit () {
    return this.logSearchEvent(b.searchboxSubmit)
  }

  logContextChanged (t) {
    const r = Nm(t)
    const { caseId: a, caseNumber: n } = t
    const o = Object.assign(
      Object.assign({ CaseId: a, CaseNumber: n }, !!r.context_Case_Subject && { CaseSubject: r.context_Case_Subject }),
      r
    )
    return this.logSearchEvent(Zo.contextChanged, o)
  }

  logExpandToFullUI (t) {
    const r = Nm(t)
    const { caseId: a, caseNumber: n, triggeredBy: o, fullSearchComponentName: i } = t
    const s = Object.assign(
      { CaseId: a, CaseNumber: n, triggeredBy: o, fullSearchComponentName: i },
      !!r.context_Case_Subject && { CaseSubject: r.context_Case_Subject }
    )
    return this.logCustomEvent(Zo.expandToFullUI, s)
  }

  getBaseCustomEventRequest (t) {
    return te(this, void 0, void 0, function * () {
      return Object.assign(Object.assign({}, yield this.getBaseEventRequest(t)), {
        lastSearchQueryUid: this.provider.getSearchUID(),
      })
    })
  }

  getBaseSearchEventRequest (t, r) {
    return te(this, void 0, void 0, function * () {
      return Object.assign(
        Object.assign(
          Object.assign({}, yield this.getBaseEventRequest(r)),
          this.provider.getSearchEventRequestPayload()
        ),
        { searchQueryUid: this.provider.getSearchUID(), queryPipeline: this.provider.getPipeline(), actionCause: t }
      )
    })
  }

  getBaseEventRequest (t) {
    return te(this, void 0, void 0, function * () {
      const r = Object.assign(Object.assign({}, this.provider.getBaseMetadata()), t)
      return Object.assign(Object.assign({}, this.getOrigins()), {
        customData: r,
        language: this.provider.getLanguage(),
        facetState: this.provider.getFacetState ? this.provider.getFacetState() : [],
        anonymous: this.provider.getIsAnonymous(),
        clientId: yield this.getClientId(),
      })
    })
  }

  getOrigins () {
    var t, r
    return {
      originContext: (r = (t = this.provider).getOriginContext) === null || r === void 0 ? void 0 : r.call(t),
      originLevel1: this.provider.getOriginLevel1(),
      originLevel2: this.provider.getOriginLevel2(),
      originLevel3: this.provider.getOriginLevel3(),
    }
  }

  getClientId () {
    return this.coveoAnalyticsClient instanceof nt ? this.coveoAnalyticsClient.getCurrentVisitorId() : void 0
  }
}
var ri = '1.103.5'
var nb = (e) => {
  const t = e.configuration.search.locale.split('-')[0]
  return !t || t.length !== 2 ? 'en' : t
}
var fr = class {
  constructor (t) {
    this.stateNeededByBaseAnalyticsProvider = t
  }

  getLanguage () {
    return nb(this.stateNeededByBaseAnalyticsProvider)
  }

  getBaseMetadata () {
    const { context: t } = this.stateNeededByBaseAnalyticsProvider
    const r = (t == null ? void 0 : t.contextValues) || {}
    const a = {}
    for (const [n, o] of Object.entries(r)) {
      const i = `context_${n}`
      a[i] = o
    }
    return (a.coveoHeadlessVersion = ri), a
  }

  getOriginContext () {
    return this.stateNeededByBaseAnalyticsProvider.configuration.analytics.originContext
  }

  getOriginLevel1 () {
    return this.stateNeededByBaseAnalyticsProvider.searchHub || we()
  }

  getOriginLevel2 () {
    return this.stateNeededByBaseAnalyticsProvider.configuration.analytics.originLevel2
  }

  getOriginLevel3 () {
    return this.stateNeededByBaseAnalyticsProvider.configuration.analytics.originLevel3
  }

  getIsAnonymous () {
    return this.stateNeededByBaseAnalyticsProvider.configuration.analytics.anonymous
  }
}
var Dt = (e, t) => {
  if ('productListing' in e && e.productListing) return e.productListing.facets.results.find((r) => r.facetId === t)
  if ('search' in e && e.search) return e.search.response.facets.find((r) => r.facetId === t)
}
var sd = (e, t) => e.facetSet[t]
function ob (e, t) {
  return !!t && t.facetId in e.facetSet
}
var is = (e, t) => {
  const r = Dt(e, t)
  if (ob(e, r)) return r
}
var cd = (e, t) => {
  const r = is(e, t)
  return r ? r.values.filter((a) => a.state === 'selected') : []
}
var Vt = (e) => ('productListing' in e ? e.productListing.isLoading : e.search.isLoading)
function ot (e) {
  if (!e) return { parents: [], values: [] }
  let t = []
  let r = e
  for (; r.length && r[0].children.length;) (t = [...t, ...r]), (r = r[0].children)
  const a = r.find((n) => n.state === 'selected')
  return a && ((t = [...t, a]), (r = [])), { parents: t, values: r }
}
function ib (e, t) {
  return !!t && t.facetId in e.categoryFacetSet
}
var ud = (e, t) => {
  const r = Dt(e, t)
  if (ib(e, r)) return r
}
var Mm = (e, t) => {
  var r
  return (r = e.categoryFacetSet[t]) == null ? void 0 : r.request
}
var ai = (e, t) => {
  const r = ud(e, t)
  return ot(r == null ? void 0 : r.values).parents
}
var Ga = () => ({
  url: '',
  clientId: '',
  additionalFields: [],
  advancedParameters: { debug: !1 },
  products: [],
  facets: { results: [] },
  error: null,
  isLoading: !1,
  responseId: '',
})
var Sa = (e, t) => {
  const r = Lm(t, e)
  const a = r ? r.field : ''
  const n = `${a}_${e}`
  return { facetId: e, facetField: a, facetTitle: n }
}
function ss (e, t) {
  const { facetId: r, facetValue: a } = e
  const n = Sa(r, t)
  const o = jm(t, r)
  return { ...n, facetValue: o === 'hierarchical' ? Qm(t, r) : a }
}
function Xe (e) {
  return {
    facetSet: e.facetSet || St(),
    categoryFacetSet: e.categoryFacetSet || Rt(),
    dateFacetSet: e.dateFacetSet || Ct(),
    numericFacetSet: e.numericFacetSet || xt(),
    ...('search' in e && { search: e.search ? e.search : Ee() }),
    ...('productListing' in e && { productListing: e.productListing ? e.productListing : Ga() }),
  }
}
var cs = (e) => {
  const t = []
  return (
    sb(e).forEach((r, a) => {
      const n = jm(e, r.facetId)
      const o = pb(r, a + 1)
      if (n === 'hierarchical') {
        if (!ai(e, r.facetId).length) return
        t.push({ ...o, ...db(e, r.facetId), facetType: n, state: 'selected' })
        return
      }
      r.values.forEach((i, s) => {
        if (i.state === 'idle') return
        const u = cb(i, s + 1, n)
        const c = n === 'specific' ? lb(i) : ub(i)
        t.push({ ...o, ...u, ...c })
      })
    }),
    t
  )
}
var sb = (e) =>
  'productListing' in e && e.productListing
    ? e.productListing.facets.results
    : 'search' in e && e.search
      ? e.search.response.facets
      : []
var cb = (e, t, r) => ({ state: e.state, valuePosition: t, facetType: r })
var ub = (e) => ({
  displayValue: `${e.start}..${e.end}`,
  value: `${e.start}..${e.end}`,
  start: e.start,
  end: e.end,
  endInclusive: e.endInclusive,
})
var lb = (e) => ({ displayValue: e.value, value: e.value })
var Qm = (e, t) =>
  ai(e, t)
    .map((a) => a.value)
    .join(';')
var db = (e, t) => {
  const r = 1
  const a = Qm(e, t)
  return { value: a, valuePosition: r, displayValue: a }
}
var pb = (e, t) => ({ title: `${e.field}_${e.facetId}`, field: e.field, id: e.facetId, facetPosition: t })
var Lm = (e, t) => {
  var r
  return (
    e.facetSet[t] ||
    ((r = e.categoryFacetSet[t]) == null ? void 0 : r.request) ||
    e.dateFacetSet[t] ||
    e.numericFacetSet[t]
  )
}
var jm = (e, t) => {
  const r = Lm(e, t)
  return r ? r.type : 'specific'
}
var us = class extends fr {
  constructor (t) {
    super(t)
    this.state = t
  }

  getFacetState () {
    return cs(Xe(this.state))
  }

  getPipeline () {
    var t
    return (
      this.state.pipeline || ((t = this.state.search) == null ? void 0 : t.response.pipeline) || us.fallbackPipelineName
    )
  }

  getSearchEventRequestPayload () {
    return {
      queryText: this.queryText,
      responseTime: this.responseTime,
      results: this.mapResultsToAnalyticsDocument(),
      numberOfResults: this.numberOfResults,
    }
  }

  getSearchUID () {
    var t, r
    return (
      ((t = this.state.search) == null ? void 0 : t.searchResponseId) ||
      ((r = this.state.search) == null ? void 0 : r.response.searchUid) ||
      Ee().response.searchUid
    )
  }

  getSplitTestRunName () {
    var t
    return (t = this.state.search) == null ? void 0 : t.response.splitTestRun
  }

  getSplitTestRunVersion () {
    var a
    const t = !!this.getSplitTestRunName()
    const r =
      ((a = this.state.search) == null ? void 0 : a.response.pipeline) || this.state.pipeline || us.fallbackPipelineName
    return t ? r : void 0
  }

  mapResultsToAnalyticsDocument () {
    var t
    return (t = this.state.search) == null
      ? void 0
      : t.response.results.map((r) => ({ documentUri: r.uri, documentUriHash: r.raw.urihash }))
  }

  get queryText () {
    var t
    return ((t = this.state.query) == null ? void 0 : t.q) || ye().q
  }

  get responseTime () {
    var t
    return ((t = this.state.search) == null ? void 0 : t.duration) || Ee().duration
  }

  get numberOfResults () {
    var t
    return ((t = this.state.search) == null ? void 0 : t.response.results.length) || Ee().response.results.length
  }
}
var ni = us
ni.fallbackPipelineName = 'default'
var Bm = ({
  logger: e,
  state: t,
  analyticsClientMiddleware: r = (o, i) => i,
  preprocessRequest: a,
  provider: n = new ni(t),
}) => {
  const o = t.configuration.accessToken
  const i = t.configuration.analytics.apiBaseUrl
  const s = t.configuration.analytics.runtimeEnvironment
  const u = t.configuration.analytics.enabled
  const c = new od(
    {
      token: o,
      endpoint: i,
      runtimeEnvironment: s,
      preprocessRequest: a,
      beforeSendHooks: [r, (l, d) => (e.info({ ...d, type: l, endpoint: i, token: o }, 'Analytics request'), d)],
    },
    n
  )
  return u || c.disable(), c
}
var be = (e) => new nt(e).getCurrentVisitorId()
var ld = (e) => {
  const t = new nt(e)
  t.clear(), t.deleteHttpOnlyVisitorId()
}
var bt = new as.HistoryStore()
var dd = () => {
  const t = bt
    .getHistory()
    .reverse()
    .find((r) => r.name === 'PageView' && r.value)
  return t ? t.value : ''
}
function fb (e) {
  return { statusCode: e.statusCode, type: e.name, message: e.message }
}
function mb (e) {
  return { statusCode: e.code, type: e.name, message: e.message, ignored: !0 }
}
function oi (e, t) {
  if (t && e.name === 'AbortError') return { error: mb(e) }
  if (e instanceof Va) return { error: fb(e) }
  throw e
}
var Nt = (e, t, r, a) => ({
  accessToken: e.accessToken,
  method: t,
  contentType: r,
  url: `${e.url}${a}?${gb(e)}${e.authentication ? `&${hb(e)}` : ''}`,
})
var gb = (e) => `organizationId=${e.organizationId}`
var hb = (e) => `authentication=${encodeURIComponent(e.authentication)}`
function Um (e) {
  return (
    ((e.headers.get('content-type') || '').split(';').find((a) => a.indexOf('charset=') !== -1) || '').split('=')[1] ||
    'UTF-8'
  )
}
var _m = TextDecoder
function Mt (e) {
  const { url: t, accessToken: r, organizationId: a, authentication: n, ...o } = e
  return o
}
var mr = (e) => {
  const { response: t } = e
  return t.body ? yb(e) : Sb(t)
}
var yb = (e) => (xb(e) ? Rb(e) : Cb(e) ? e.body : { message: 'unknown', statusCode: 0, type: 'unknown' })
var Sb = (e) => {
  const t = JSON.parse(JSON.stringify(e, Object.getOwnPropertyNames(e)))
  return { ...t, message: `Client side error: ${t.message || ''}`, statusCode: 400, type: 'ClientError' }
}
function Cb (e) {
  return e.body.statusCode !== void 0
}
function xb (e) {
  return e.body.exception !== void 0
}
var Rb = (e) => ({ message: e.body.exception.code, statusCode: e.response.status, type: e.body.exception.code })
var $m = async (e, t) => {
  const r = await et.call({
    ...Nt(e, 'POST', 'application/x-www-form-urlencoded', '/html'),
    requestParams: Mt(e),
    requestMetadata: { method: 'html' },
    ...t,
  })
  if (r instanceof Error) throw r
  const a = Um(r)
  const n = await r.arrayBuffer()
  const i = new _m(a).decode(n)
  return vb(i) ? { success: i } : { error: mr({ response: r, body: i }) }
}
function vb (e) {
  return typeof e === 'string'
}
var ii = class {
  constructor (t) {
    this.options = t
    this.searchAbortController = null
  }

  async plan (t) {
    const r = await et.call({
      ...Nt(t, 'POST', 'application/json', '/plan'),
      requestParams: Mt(t),
      requestMetadata: { method: 'plan' },
      ...this.options,
    })
    if (r instanceof Error) return oi(r)
    const a = await r.json()
    return Fb(a) ? { success: a } : { error: mr({ response: r, body: a }) }
  }

  async querySuggest (t) {
    const r = await et.call({
      ...Nt(t, 'POST', 'application/json', '/querySuggest'),
      requestMetadata: { method: 'querySuggest' },
      requestParams: Mt(t),
      ...this.options,
    })
    if (r instanceof Error) return oi(r)
    const a = await r.json()
    const n = { response: r, body: a }
    return bb(a)
      ? { success: (await this.options.postprocessQuerySuggestResponseMiddleware(n)).body }
      : { error: mr(n) }
  }

  async search (t, r) {
    var i
    this.searchAbortController &&
      (!(r == null ? void 0 : r.disableAbortWarning) &&
        this.options.logger.warn('Cancelling current pending search query'),
      this.searchAbortController.abort()),
    (this.searchAbortController = this.getAbortControllerInstanceIfAvailable())
    const a = await et.call({
      ...Nt(t, 'POST', 'application/json', ''),
      requestParams: Mt(t),
      requestMetadata: { method: 'search', origin: r == null ? void 0 : r.origin },
      ...this.options,
      signal: (i = this.searchAbortController) == null ? void 0 : i.signal,
    })
    if (a instanceof Error) return oi(a, r == null ? void 0 : r.disableAbortWarning)
    this.searchAbortController = null
    const n = await a.json()
    const o = { response: a, body: n }
    return fd(n)
      ? ((o.body = Pb(n)), { success: (await this.options.postprocessSearchResponseMiddleware(o)).body })
      : { error: mr(o) }
  }

  async facetSearch (t) {
    const r = await et.call({
      ...Nt(t, 'POST', 'application/json', '/facet'),
      requestParams: Mt(t),
      requestMetadata: { method: 'facetSearch' },
      ...this.options,
    })
    if (r instanceof Error) throw r
    const a = await r.json()
    const n = { response: r, body: a }
    return (await this.options.postprocessFacetSearchResponseMiddleware(n)).body
  }

  async recommendations (t) {
    const r = await et.call({
      ...Nt(t, 'POST', 'application/json', ''),
      requestParams: Mt(t),
      requestMetadata: { method: 'recommendations' },
      ...this.options,
    })
    if (r instanceof Error) throw r
    const a = await r.json()
    return fd(a) ? { success: a } : { error: mr({ response: r, body: a }) }
  }

  async html (t) {
    return $m(t, { ...this.options })
  }

  async productRecommendations (t) {
    const r = await et.call({
      ...Nt(t, 'POST', 'application/json', ''),
      requestParams: Mt(t),
      requestMetadata: { method: 'productRecommendations' },
      ...this.options,
    })
    if (r instanceof Error) throw r
    const a = await r.json()
    return fd(a) ? { success: a } : { error: mr({ response: r, body: a }) }
  }

  async fieldDescriptions (t) {
    const r = await et.call({
      ...Nt(t, 'GET', 'application/json', '/fields'),
      requestParams: {},
      requestMetadata: { method: 'fieldDescriptions' },
      ...this.options,
    })
    if (r instanceof Error) throw r
    const a = await r.json()
    return Ab(a) ? { success: a } : { error: mr({ response: r, body: a }) }
  }

  getAbortControllerInstanceIfAvailable () {
    if (typeof window === 'undefined') {
      const t = Hm()
      return new t()
    }
    return typeof AbortController === 'undefined' ? null : new AbortController()
  }
}
var zm = (e) => e.success !== void 0
var de = (e) => e.error !== void 0
function bb (e) {
  return e.completions !== void 0
}
function Fb (e) {
  return e.preprocessingOutput !== void 0
}
function Ab (e) {
  return e.fields !== void 0
}
function fd (e) {
  return e.results !== void 0
}
function Pb (e) {
  const t = gl()
  return ae(e.questionAnswer) ? ((e.questionAnswer = t), e) : ((e.questionAnswer = { ...t, ...e.questionAnswer }), e)
}
var q = new w({ required: !0, emptyAllowed: !1 })
var ue = new w({ required: !1, emptyAllowed: !1 })
var oe = new w({ required: !0, emptyAllowed: !0 })
var gr = ({ message: e, name: t, stack: r }) => ({ message: e, name: t, stack: r })
var ze = (e, t) => {
  if ('required' in t) return { payload: new K({ value: t }).validate({ value: e }).value }
  const n = new Q({ options: { required: !0 }, values: t }).validate(e)
  if (n) throw new wo(n)
  return { payload: e }
}
var S = (e, t) => {
  try {
    return ze(e, t)
  } catch (r) {
    return { payload: e, error: gr(r) }
  }
}
var Oe = (e, t, r, a) => {
  const n = `Check the initialState of ${a}`
  return Wm(e, t, r, n, 'Controller initialization error')
}
var pe = (e, t, r, a) => {
  const n = `Check the options of ${a}`
  return Wm(e, t, r, n, 'Controller initialization error')
}
var Wm = (e, t, r, a, n) => {
  try {
    return t.validate(r, a)
  } catch (o) {
    throw (e.logger.error(o, n), o)
  }
}
var kr = () => ({
  duration: 0,
  error: null,
  isLoading: !1,
  id: 'Recommendation',
  recommendations: [],
  searchUid: '',
  splitTestRun: '',
  pipeline: '',
})
var md = class extends fr {
  constructor (t) {
    super(t)
    this.state = t
  }

  getPipeline () {
    var t
    return this.state.pipeline || ((t = this.state.recommendation) == null ? void 0 : t.pipeline) || 'default'
  }

  getSearchEventRequestPayload () {
    return {
      queryText: ye().q,
      responseTime: this.responseTime,
      results: this.mapResultsToAnalyticsDocument(),
      numberOfResults: this.numberOfResults,
    }
  }

  getSearchUID () {
    var t
    return ((t = this.state.recommendation) == null ? void 0 : t.searchUid) || kr().searchUid
  }

  getSplitTestRunName () {
    var t
    return (t = this.state.recommendation) == null ? void 0 : t.splitTestRun
  }

  getSplitTestRunVersion () {
    var a
    const t = !!this.getSplitTestRunName()
    const r = ((a = this.state.recommendation) == null ? void 0 : a.pipeline) || this.state.pipeline || 'default'
    return t ? r : void 0
  }

  get responseTime () {
    var t
    return ((t = this.state.recommendation) == null ? void 0 : t.duration) || kr().duration
  }

  mapResultsToAnalyticsDocument () {
    var t
    return (t = this.state.recommendation) == null
      ? void 0
      : t.recommendations.map((r) => ({ documentUri: r.uri, documentUriHash: r.raw.urihash }))
  }

  get numberOfResults () {
    var t
    return ((t = this.state.recommendation) == null ? void 0 : t.recommendations.length) || kr().recommendations.length
  }
}
var Zm = ve(gd())
var Ja = (e, t = 5) =>
  e +
  Math.random()
    .toString(36)
    .substring(2, 2 + t)
function ds (e) {
  return Array.isArray(e)
}
function ps (e) {
  return e.trim() === ''
}
function eg (e, t) {
  return Object.values(e.reduce((r, a, n) => ({ ...r, [t(a, n)]: a }), {}))
}
function Vb (e) {
  return (typeof btoa !== 'undefined' ? btoa : Zm.btoa)(encodeURI(e))
}
function fs (e, t) {
  const { [e]: r, ...a } = t
  return a
}
function ms (e) {
  return Vb(JSON.stringify(e))
}
function gs (e) {
  const t = tg(e)
  const r = [e, ...t].filter((n) => n.parentResult).map((n) => n.parentResult)
  return eg([e, ...t, ...r], (n) => n.uniqueId)
}
function tg (e) {
  return e.childResults ? e.childResults.flatMap((t) => [t, ...tg(t)]) : []
}
var hs = class extends fr {
  constructor (t) {
    super(t)
    this.state = t
  }

  getSearchUID () {
    var t, r
    return (
      ((t = this.state.search) == null ? void 0 : t.searchResponseId) ||
      ((r = this.state.search) == null ? void 0 : r.response.searchUid) ||
      Ee().response.searchUid
    )
  }

  getPipeline () {
    var t
    return this.state.pipeline || ((t = this.state.search) == null ? void 0 : t.response.pipeline) || 'default'
  }

  getSearchEventRequestPayload () {
    return {
      queryText: this.queryText,
      responseTime: this.responseTime,
      results: this.mapResultsToAnalyticsDocument(),
      numberOfResults: this.numberOfResults,
    }
  }

  getFacetState () {
    return cs(Xe(this.state))
  }

  get queryText () {
    var t
    return ((t = this.state.query) == null ? void 0 : t.q) || ye().q
  }

  get responseTime () {
    var t
    return ((t = this.state.search) == null ? void 0 : t.duration) || Ee().duration
  }

  mapResultsToAnalyticsDocument () {
    var t
    return (t = this.state.search) == null
      ? void 0
      : t.response.results.map((r) => ({ documentUri: r.uri, documentUriHash: r.raw.urihash }))
  }

  get numberOfResults () {
    var t
    return ((t = this.state.search) == null ? void 0 : t.response.results.length) || Ee().response.results.length
  }
}
var rg = ({
  logger: e,
  state: t,
  analyticsClientMiddleware: r = (o, i) => i,
  preprocessRequest: a,
  provider: n = new hs(t),
}) => {
  const o = t.configuration.accessToken
  const i = t.configuration.analytics.apiBaseUrl
  const s = t.configuration.analytics.runtimeEnvironment
  const u = t.configuration.analytics.enabled
  const c = new id(
    {
      enableAnalytics: u,
      token: o,
      endpoint: i,
      runtimeEnvironment: s,
      preprocessRequest: a,
      beforeSendHooks: [r, (l, d) => (e.info({ ...d, type: l, endpoint: i, token: o }, 'Analytics request'), d)],
    },
    n
  )
  return u || c.disable(), c
}
new as.HistoryStore()
var D = ((a) => ((a[(a.Search = 0)] = 'Search'), (a[(a.Custom = 1)] = 'Custom'), (a[(a.Click = 2)] = 'Click'), a))(
  D || {}
)
var Nb = (e) => e()
var N = (e, t, r, a = (n) => new ni(n)) =>
  ee(e, async (n, { getState: o, extra: { analyticsClientMiddleware: i, preprocessRequest: s, logger: u } }) => {
    const c = Nb(o)
    const l = Bm({ state: c, logger: u, analyticsClientMiddleware: i, preprocessRequest: s, provider: a(c) })
    const d = await r(l, c)
    return u.info({ client: l.coveoAnalyticsClient, response: d }, 'Analytics response'), { analyticsType: t }
  })
var Mb = (e) => ee('analytics/noop', async () => ({ analyticsType: e }))
Mb(0)
var ys = (e, t, r, a = (n) => new hs(n)) =>
  ee(e, async (n, { getState: o, extra: { analyticsClientMiddleware: i, preprocessRequest: s, logger: u } }) => {
    const c = o()
    const l = rg({ state: c, logger: u, analyticsClientMiddleware: i, preprocessRequest: s, provider: a(c) })
    const d = await r(l, c)
    return u.info({ client: l.coveoAnalyticsClient, response: d }, 'Analytics response'), { analyticsType: t }
  })
var Be = (e, t) => {
  var o
  const r = (i) => {
    var s, u
    return i + ((u = (s = t.pagination) == null ? void 0 : s.firstResult) != null ? u : 0)
  }
  let a = -1
  const n = (o = t.search) == null ? void 0 : o.results
  return (a = ng(e, n)), a < 0 && (a = _b(e, n)), a < 0 && (a = 0), Qb(e, r(a), t)
}
function Qb (e, t, r) {
  const a = e.raw.collection
  return {
    collectionName: typeof a === 'string' ? a : 'default',
    documentAuthor: Bb(e),
    documentPosition: t + 1,
    documentTitle: e.title,
    documentUri: e.uri,
    documentUriHash: e.raw.urihash,
    documentUrl: e.clickUri,
    rankingModifier: e.rankingModifier || '',
    sourceName: Ub(e),
    queryPipeline: r.pipeline || rt(),
  }
}
var We = (e) => (
  e.raw.permanentid ||
    console.warn(
      'Missing field permanentid on result. This might cause many issues with your Coveo deployment. See https://docs.coveo.com/en/1913 and https://docs.coveo.com/en/1640 for more information.',
      e
    ),
  { contentIDKey: 'permanentid', contentIDValue: e.raw.permanentid || '' }
)
var ag = { urihash: new w(), sourcetype: new w(), permanentid: new w() }
var si = {
  uniqueId: q,
  raw: new Q({ values: ag }),
  title: q,
  uri: q,
  clickUri: q,
  rankingModifier: new w({ required: !1, emptyAllowed: !0 }),
}
function Lb (e) {
  return Object.assign({}, ...Object.keys(ag).map((t) => ({ [t]: e[t] })))
}
function jb (e) {
  return Object.assign({}, ...Object.keys(si).map((t) => ({ [t]: e[t] })), { raw: Lb(e.raw) })
}
function Bb (e) {
  const t = e.raw.author
  return ae(t) ? 'unknown' : Array.isArray(t) ? t.join(';') : `${t}`
}
function Ub (e) {
  const t = e.raw.source
  return ae(t) ? 'unknown' : t
}
var Ue = (e) => new K(si).validate(jb(e))
function _b (e, t) {
  for (const [r, a] of t.entries()) {
    const n = gs(a)
    if (ng(e, n) !== -1) return r
  }
  return -1
}
function ng (e, t = []) {
  return t.findIndex(({ uniqueId: r }) => r === e.uniqueId)
}
var og = N(
  'analytics/recommendation/update',
  D.Search,
  (e) => e.logRecommendationInterfaceLoad(),
  (e) => new md(e)
)
var Dr = async (e) => ({
  analytics: {
    clientId: await be(e),
    clientTimestamp: new Date().toISOString(),
    documentReferrer: e.originLevel3,
    originContext: e.originContext,
    ...(e.userDisplayName && { userDisplayName: e.userDisplayName }),
    ...(e.documentLocation && { documentLocation: e.documentLocation }),
    ...(e.deviceId && { deviceId: e.deviceId }),
    ...(dd() && { pageId: dd() }),
  },
})
var ig = y('recommendation/set', (e) => S(e, { id: q }))
var Xa = ee('recommendation/get', async (e, { getState: t, rejectWithValue: r, extra: { apiClient: a } }) => {
  const n = t()
  const o = new Date().getTime()
  const i = await a.recommendations(await $b(n))
  const s = new Date().getTime() - o
  return de(i)
    ? r(i.error)
    : {
      recommendations: i.success.results,
      analyticsAction: og(),
      duration: s,
      searchUid: i.success.searchUid,
      splitTestRun: i.success.splitTestRun,
      pipeline: i.success.pipeline,
    }
})
var $b = async (e) => ({
  accessToken: e.configuration.accessToken,
  organizationId: e.configuration.organizationId,
  url: e.configuration.search.apiBaseUrl,
  recommendation: e.recommendation.id,
  tab: e.configuration.analytics.originLevel2,
  referrer: e.configuration.analytics.originLevel3,
  timezone: e.configuration.search.timezone,
  locale: e.configuration.search.locale,
  actionsHistory: e.configuration.analytics.enabled ? bt.getHistory() : [],
  ...(e.advancedSearchQueries && { aq: e.advancedSearchQueries.aq, cq: e.advancedSearchQueries.cq }),
  ...(e.pipeline && { pipeline: e.pipeline }),
  ...(e.searchHub && { searchHub: e.searchHub }),
  ...(e.context && { context: e.context.contextValues }),
  ...(e.dictionaryFieldContext && { dictionaryFieldContext: e.dictionaryFieldContext.contextValues }),
  ...(e.fields && { fieldsToInclude: e.fields.fieldsToInclude }),
  ...(e.configuration.analytics.enabled && { visitorId: await be(e.configuration.analytics) }),
  ...(e.configuration.analytics.enabled && (await Dr(e.configuration.analytics))),
  ...(e.configuration.search.authenticationProviders.length && {
    authentication: e.configuration.search.authenticationProviders.join(','),
  }),
})
var it = y('query/updateQuery', (e) => S(e, { q: new w(), enableQuerySyntax: new G() }))
var sg = N('search/logFetchMoreResults', D.Search, (e) => e.logFetchMoreResults())
var Za = (e) =>
  N('search/queryError', D.Search, (t, r) => {
    var a, n, o
    return t.logQueryError({
      query: ((a = r.query) == null ? void 0 : a.q) || ye().q,
      aq: ((n = r.advancedSearchQueries) == null ? void 0 : n.aq) || _e().aq,
      cq: ((o = r.advancedSearchQueries) == null ? void 0 : o.cq) || _e().cq,
      dq: '',
      errorType: e.type,
      errorMessage: e.message,
    })
  })()
var li = ve(qi())
var Ss = ve(qi())
var ug = ve(cg())
Ss.default.extend(ug.default)
var ci = 'YYYY/MM/DD@HH:mm:ss'
var Hb = '1401-01-01'
function Ca (e, t) {
  const r = (0, Ss.default)(e, t)
  return !r.isValid() && !t ? (0, Ss.default)(e, ci) : r
}
function ui (e) {
  return e.format(ci)
}
function lg (e) {
  return ui(Ca(e)) === e
}
function Cs (e, t) {
  const r = Ca(e, t)
  if (!r.isValid()) {
    const a =
      '. Please provide a date format string in the configuration options. See https://day.js.org/docs/en/parse/string-format for more information.'
    const n = ` with the format "${t}""`
    throw new Error(`Could not parse the provided date "${e}"${t ? n : a}`)
  }
  Sd(r)
}
function Sd (e) {
  if (e.isBefore(Hb)) throw new Error(`Date is before year 1401, which is unsupported by the API: ${e}`)
}
var pg = ve(dg())
li.default.extend(pg.default)
var fg = ['past', 'now', 'next']
var mg = ['minute', 'hour', 'day', 'week', 'month', 'quarter', 'year']
var zb = (e) => {
  const t = e === 'now'
  return {
    amount: new j({ required: !t, min: 1 }),
    unit: new w({ required: !t, constrainTo: mg }),
    period: new w({ required: !0, constrainTo: fg }),
  }
}
function xa (e) {
  if (typeof e === 'string' && !Qt(e)) {
    throw new Error(`The value "${e}" is not respecting the relative date format "period-amount-unit"`)
  }
  const t = typeof e === 'string' ? Rd(e) : e
  new K(zb(t.period)).validate(t)
  const r = hg(t)
  const a = JSON.stringify(t)
  if (!r.isValid()) throw new Error(`Date is invalid: ${a}`)
  Sd(r)
}
function gg (e) {
  const { period: t, amount: r, unit: a } = e
  switch (t) {
    case 'past':
    case 'next':
      return `${t}-${r}-${a}`
    case 'now':
      return t
  }
}
function hg (e) {
  const { period: t, amount: r, unit: a } = e
  switch (t) {
    case 'past':
      return (0, li.default)().subtract(r, a)
    case 'next':
      return (0, li.default)().add(r, a)
    case 'now':
      return (0, li.default)()
  }
}
function di (e) {
  return ui(hg(Rd(e)))
}
function yg (e) {
  return e.toLocaleLowerCase().split('-')
}
function Qt (e) {
  const [t, r, a] = yg(e)
  if (t === 'now') return !0
  if (!fg.includes(t) || !mg.includes(a)) return !1
  const n = parseInt(r)
  return !(isNaN(n) || n <= 0)
}
function Sg (e) {
  return !!e && typeof e === 'object' && 'period' in e
}
function Rd (e) {
  const [t, r, a] = yg(e)
  return t === 'now' ? { period: 'now' } : { period: t, amount: r ? parseInt(r) : void 0, unit: a || void 0 }
}
function Wb (e) {
  return xa(e), Rd(e)
}
var xs = ['score', 'alphanumeric', 'occurrences', 'automatic']
function Cg (e) {
  return e.hasBreadcrumbs !== void 0
}
function xg (e) {
  return e.type === 'dateRange'
}
function Rg (e) {
  return `start${e}`
}
function vg (e) {
  return `end${e}`
}
var Yb = () => ({ dateFacetValueMap: {} })
function Kb (e, t, r) {
  let a = e.start
  let n = e.end
  return (
    Qt(a) && ((a = di(a)), (r.dateFacetValueMap[t][Rg(a)] = e.start)),
    Qt(n) && ((n = di(n)), (r.dateFacetValueMap[t][vg(n)] = e.end)),
    { ...e, start: a, end: n }
  )
}
function Gb (e, t) {
  if (xg(e)) {
    const { facetId: r, currentValues: a } = e
    return (t.dateFacetValueMap[r] = {}), { ...e, currentValues: a.map((n) => Kb(n, r, t)) }
  }
  if (Cg(e)) {
    const { hasBreadcrumbs: r, ...a } = e
    return a
  }
  return e
}
function Rs (e) {
  var a
  const t = Yb()
  return { request: { ...e, facets: (a = e.facets) == null ? void 0 : a.map((n) => Gb(n, t)) }, mappings: t }
}
function Jb (e, t, r) {
  return {
    ...e,
    start: r.dateFacetValueMap[t][Rg(e.start)] || e.start,
    end: r.dateFacetValueMap[t][vg(e.end)] || e.end,
  }
}
function Xb (e, t) {
  return e.facetId in t.dateFacetValueMap
}
function Zb (e, t) {
  return Xb(e, t) ? { ...e, values: e.values.map((r) => Jb(r, e.facetId, t)) } : e
}
function bg (e, t) {
  var r
  return 'success' in e
    ? { success: { ...e.success, facets: (r = e.success.facets) == null ? void 0 : r.map((n) => Zb(n, t)) } }
    : e
}
var vs = new j({ required: !0, min: 0 })
var en = y('pagination/registerNumberOfResults', (e) => S(e, vs))
var tn = y('pagination/updateNumberOfResults', (e) => S(e, vs))
var rn = y('pagination/registerPage', (e) => S(e, vs))
var Lt = y('pagination/updatePage', (e) => S(e, vs))
var an = y('pagination/nextPage')
var nn = y('pagination/previousPage')
function on (e, t) {
  const r = {}
  e.forEach((o) => (r[o.facetId] = o))
  const a = []
  t.forEach((o) => {
    o in r && (a.push(r[o]), delete r[o])
  })
  const n = Object.values(r)
  return [...a, ...n]
}
var Ra = 1
var pi = 5e3
var sn = async (e) => {
  var t, r, a, n
  return {
    accessToken: e.configuration.accessToken,
    organizationId: e.configuration.organizationId,
    url: e.configuration.search.apiBaseUrl,
    locale: e.configuration.search.locale,
    debug: e.debug,
    tab: e.configuration.analytics.originLevel2,
    referrer: e.configuration.analytics.originLevel3,
    timezone: e.configuration.search.timezone,
    ...(e.configuration.analytics.enabled && {
      visitorId: await be(e.configuration.analytics),
      actionsHistory: bt.getHistory(),
    }),
    ...(((t = e.advancedSearchQueries) == null ? void 0 : t.aq) && { aq: e.advancedSearchQueries.aq }),
    ...(((r = e.advancedSearchQueries) == null ? void 0 : r.cq) && { cq: e.advancedSearchQueries.cq }),
    ...(((a = e.advancedSearchQueries) == null ? void 0 : a.lq) && { lq: e.advancedSearchQueries.lq }),
    ...(((n = e.advancedSearchQueries) == null ? void 0 : n.dq) && { dq: e.advancedSearchQueries.dq }),
    ...(e.context && { context: e.context.contextValues }),
    ...(e.fields && !e.fields.fetchAllFields && { fieldsToInclude: e.fields.fieldsToInclude }),
    ...(e.dictionaryFieldContext && { dictionaryFieldContext: e.dictionaryFieldContext.contextValues }),
    ...(e.pipeline && { pipeline: e.pipeline }),
    ...(e.query && { q: e.query.q, enableQuerySyntax: e.query.enableQuerySyntax }),
    ...(e.searchHub && { searchHub: e.searchHub }),
    ...(e.sortCriteria && { sortCriteria: e.sortCriteria }),
    ...(e.configuration.analytics.enabled && (await Dr(e.configuration.analytics))),
    ...(e.excerptLength && !ae(e.excerptLength.length) && { excerptLength: e.excerptLength.length }),
    ...(e.configuration.search.authenticationProviders.length && {
      authentication: e.configuration.search.authenticationProviders.join(','),
    }),
  }
}
var st = async (e) => {
  var o
  const t = oF(e)
  const r = eF(e)
  const a = await sn(e)
  const n = () =>
    e.pagination
      ? e.pagination.firstResult + e.pagination.numberOfResults > pi
        ? pi - e.pagination.firstResult
        : e.pagination.numberOfResults
      : void 0
  return Rs({
    ...a,
    ...(e.didYouMean && { enableDidYouMean: e.didYouMean.enableDidYouMean }),
    ...(t && { cq: t }),
    ...(r.length && { facets: r }),
    ...(e.pagination && { numberOfResults: n(), firstResult: e.pagination.firstResult }),
    ...(e.facetOptions && { facetOptions: { freezeFacetOrder: e.facetOptions.freezeFacetOrder } }),
    ...(((o = e.folding) == null ? void 0 : o.enabled) && {
      filterField: e.folding.fields.collection,
      childField: e.folding.fields.parent,
      parentField: e.folding.fields.child,
      filterFieldRange: e.folding.filterFieldRange,
    }),
  })
}
function eF (e) {
  var t
  return on(tF(e), (t = e.facetOrder) != null ? t : [])
}
function tF (e) {
  return rF(e).filter(({ facetId: t }) => {
    var r, a, n
    return (n = (a = (r = e.facetOptions) == null ? void 0 : r.facets[t]) == null ? void 0 : a.enabled) != null ? n : !0
  })
}
function rF (e) {
  return [...nF(e.facetSet), ...Fg(e.numericFacetSet), ...Fg(e.dateFacetSet), ...aF(e.categoryFacetSet)]
}
function aF (e) {
  return Object.values(e || {}).map((t) => t.request)
}
function nF (e = {}) {
  return Object.keys(e).map((t) => e[t])
}
function Fg (e = {}) {
  return Object.keys(e).map((t) => {
    const r = e[t]
    const n = r.currentValues.find(({ state: o }) => o === 'selected')
    return r.generateAutomaticRanges && !n ? { ...r, currentValues: [] } : r
  })
}
function oF (e) {
  var o
  const t = ((o = e.advancedSearchQueries) == null ? void 0 : o.cq.trim()) || ''
  const r = Object.values(e.tabSet || {}).find((i) => i.isActive)
  const a = (r == null ? void 0 : r.expression.trim()) || ''
  const n = iF(e)
  return [t, a, ...n].filter((i) => !!i).join(' AND ')
}
function iF (e) {
  return Object.values(e.staticFilterSet || {}).map((r) => {
    const a = r.values.filter((o) => o.state === 'selected' && !!o.expression.trim())
    const n = a.map((o) => o.expression).join(' OR ')
    return a.length > 1 ? `(${n})` : n
  })
}
var qe = y('breadcrumb/deselectAll')
var cn = y('breadcrumb/deselectAllNonBreadcrumbs')
var ct = y('facet/deselectAllFacets')
var jt = y('facet/updateFacetAutoSelection', (e) => S(e, { allow: new G({ required: !0 }) }))
var vd = { id: q }
var sF = { ...vd, q: oe }
var un = y('instantResults/register', (e) => S(e, vd))
var Vr = y('instantResults/updateQuery', (e) => S(e, sF))
var ln = y('instantResults/clearExpired', (e) => S(e, vd))
var dn = y('didYouMean/enable')
var bs = y('didYouMean/disable')
var Bt = y('didYouMean/correction', (e) => S(e, q))
var Fs = N('analytics/didyoumean/click', D.Search, (e) => e.logDidYouMeanClick())
var Ag = N('analytics/didyoumean/automatic', D.Search, (e) => e.logDidYouMeanAutomatic())
var bd = y('history/undo')
var Fd = y('history/redo')
var Nr = y('history/snapshot')
var fi = ee('history/back', async (e, { dispatch: t }) => {
  t(bd()), await t(ce())
})
var As = ee('history/forward', async (e, { dispatch: t }) => {
  t(Fd()), await t(ce())
})
var ce = ee('history/change', async (e, { getState: t }) => t().history.present)
var cF = new Q({ values: { undoneQuery: oe }, options: { required: !0 } })
var Ps = N('analytics/trigger/query', D.Search, (e, t) => {
  var r
  if ((r = t.triggers) == null ? void 0 : r.queryModification.newQuery) return e.logTriggerQuery()
})
var Is = (e) =>
  N('analytics/trigger/query/undo', D.Search, (t) => {
    S(e, cF), t.logUndoTriggerQuery(e)
  })()
var Es = N('analytics/trigger/notify', D.Search, (e, t) => {
  var r
  if ((r = t.triggers) == null ? void 0 : r.notification) {
    return e.logTriggerNotify({ notification: t.triggers.notification })
  }
})
N('analytics/trigger/redirect', D.Search, (e, t) => {
  var r
  if ((r = t.triggers) == null ? void 0 : r.redirectTo) {
    return e.logTriggerRedirect({ redirectedTo: t.triggers.redirectTo })
  }
})
N('analytics/trigger/execute', D.Search, (e, t) => {
  var r
  if ((r = t.triggers) == null ? void 0 : r.execute) {
    return e.logTriggerExecute({ executed: t.triggers.execute.functionName })
  }
})
var pn = y('trigger/query/ignore', (e) => S(e, new w({ emptyAllowed: !0, required: !0 })))
var qs = y('trigger/query/modification', (e) => S(e, new Q({ values: { originalQuery: ue, modification: ue } })))
var va = class {
  constructor (
    t,
    r = (a) => {
      this.dispatch(it({ q: a }))
    }
  ) {
    this.config = t
    this.onUpdateQueryForCorrection = r
  }

  async fetchFromAPI ({ mappings: t, request: r }, a) {
    var u
    const n = new Date().getTime()
    const o = bg(await this.extra.apiClient.search(r, { origin: a }), t)
    const i = new Date().getTime() - n
    const s = ((u = this.getState().query) == null ? void 0 : u.q) || ''
    return { response: o, duration: i, queryExecuted: s, requestExecuted: r }
  }

  async process (t) {
    var r, a, n
    return (n =
      (a = (r = this.processQueryErrorOrContinue(t)) != null ? r : await this.processQueryCorrectionsOrContinue(t)) !=
      null
        ? a
        : await this.processQueryTriggersOrContinue(t)) != null
      ? n
      : this.processSuccessReponse(t)
  }

  processQueryErrorOrContinue (t) {
    return de(t.response) ? (this.dispatch(Za(t.response.error)), this.rejectWithValue(t.response.error)) : null
  }

  async processQueryCorrectionsOrContinue (t) {
    var i
    const r = this.getState()
    const a = this.getSuccessResponse(t)
    if (
      !a ||
      ((i = r.didYouMean) == null ? void 0 : i.enableDidYouMean) === !1 ||
      a.results.length !== 0 ||
      a.queryCorrections.length === 0
    ) {
      return null
    }
    const { correctedQuery: n } = a.queryCorrections[0]
    const o = await this.automaticallyRetryQueryWithCorrection(n)
    return de(o.response)
      ? (this.dispatch(Za(o.response.error)), this.rejectWithValue(o.response.error))
      : (this.analyticsAction &&
          this.analyticsAction(
            this.dispatch,
            () => this.getStateAfterResponse(t.queryExecuted, t.duration, r, a),
            this.extra
          ),
      this.dispatch(Nr(To(this.getState()))),
      {
        ...o,
        response: { ...o.response.success, queryCorrections: a.queryCorrections },
        automaticallyCorrected: !0,
        originalQuery: this.getOriginalQuery(),
        analyticsAction: Ag(),
      })
  }

  async processQueryTriggersOrContinue (t) {
    var i, s
    const r = this.getSuccessResponse(t)
    if (!r) return null
    const a = ((i = r.triggers.find((u) => u.type === 'query')) == null ? void 0 : i.content) || ''
    if (!a) return null
    if (((s = this.getState().triggers) == null ? void 0 : s.queryModification.queryToIgnore) === a) {
      return this.dispatch(pn('')), null
    }
    this.analyticsAction && (await this.dispatch(this.analyticsAction))
    const o = await this.automaticallyRetryQueryWithTriggerModification(a)
    return de(o.response)
      ? (this.dispatch(Za(o.response.error)), this.rejectWithValue(o.response.error))
      : (this.dispatch(Nr(To(this.getState()))),
      {
        ...o,
        response: { ...o.response.success },
        automaticallyCorrected: !1,
        originalQuery: this.getOriginalQuery(),
        analyticsAction: Ps(),
      })
  }

  processSuccessReponse (t) {
    return (
      this.dispatch(Nr(To(this.getState()))),
      {
        ...t,
        response: this.getSuccessResponse(t),
        automaticallyCorrected: !1,
        originalQuery: this.getOriginalQuery(),
        analyticsAction: this.analyticsAction,
      }
    )
  }

  getSuccessResponse (t) {
    return zm(t.response) ? t.response.success : null
  }

  async automaticallyRetryQueryWithCorrection (t) {
    this.onUpdateQueryForCorrection(t)
    const r = await this.fetchFromAPI(await st(this.getState()), 'mainSearch')
    return this.dispatch(Bt(t)), r
  }

  async automaticallyRetryQueryWithTriggerModification (t) {
    return (
      this.dispatch(qs({ newQuery: t, originalQuery: this.getOriginalQuery() })),
      this.onUpdateQueryForCorrection(t),
      await this.fetchFromAPI(await st(this.getState()), 'mainSearch')
    )
  }

  getStateAfterResponse (t, r, a, n) {
    var o, i
    return {
      ...a,
      query: {
        q: t,
        enableQuerySyntax:
          (i = (o = a.query) == null ? void 0 : o.enableQuerySyntax) != null ? i : ye().enableQuerySyntax,
      },
      search: { ...Ee(), duration: r, response: n, results: n.results },
    }
  }

  getOriginalQuery () {
    var r
    const t = this.getState()
    return ((r = t.query) == null ? void 0 : r.q) !== void 0 ? t.query.q : ''
  }

  get extra () {
    return this.config.extra
  }

  getState () {
    return this.config.getState()
  }

  get dispatch () {
    return this.config.dispatch
  }

  get analyticsAction () {
    return this.config.analyticsAction
  }

  get rejectWithValue () {
    return this.config.rejectWithValue
  }
}
var Ts = ee('search/prepareForSearchWithQuery', (e, t) => {
  const { dispatch: r } = t
  S(e, { q: new w(), enableQuerySyntax: new G(), clearFilters: new G() }),
  e.clearFilters && (r(qe()), r(cn())),
  r(jt({ allow: !0 })),
  r(it({ q: e.q, enableQuerySyntax: e.enableQuerySyntax })),
  r(Lt(1))
})
var k = ee('search/executeSearch', async (e, t) => {
  const r = t.getState()
  Pg(r)
  const a = new va({ ...t, analyticsAction: e })
  const n = await st(r)
  const o = await a.fetchFromAPI(n, 'mainSearch')
  return await a.process(o)
})
var ut = ee('search/fetchPage', async (e, t) => {
  const r = t.getState()
  Pg(r)
  const a = new va({ ...t, analyticsAction: e })
  const n = await st(r)
  const o = await a.fetchFromAPI(n, 'mainSearch')
  return await a.process(o)
})
var Ut = ee('search/fetchMoreResults', async (e, t) => {
  const r = t.getState()
  const a = new va({ ...t, analyticsAction: sg() })
  const n = await uF(r)
  const o = await a.fetchFromAPI(n, 'mainSearch')
  return await a.process(o)
})
var Ye = ee('search/fetchFacetValues', async (e, t) => {
  const r = t.getState()
  const a = new va({ ...t, analyticsAction: e })
  const n = await dF(r)
  const o = await a.fetchFromAPI(n, 'facetValues')
  return await a.process(o)
})
var Mr = ee('search/fetchInstantResults', async (e, t) => {
  S(e, { id: q, q, maxResultsPerQuery: new j({ required: !0, min: 1 }), cacheTimeout: new j() })
  const { q: r, maxResultsPerQuery: a } = e
  const n = t.getState()
  const o = new va({ ...t, analyticsAction: null }, (c) => t.dispatch(Vr({ q: c, id: e.id })))
  const i = await lF(n, r, a)
  const s = await o.fetchFromAPI(i, 'instantResults')
  const u = await o.process(s)
  return 'response' in u ? { results: u.response.results } : u
})
var uF = async (e) => {
  var r, a, n, o
  const t = await st(e)
  return (
    (t.request = {
      ...t.request,
      firstResult:
        ((a = (r = e.pagination) == null ? void 0 : r.firstResult) != null ? a : 0) +
        ((o = (n = e.search) == null ? void 0 : n.results.length) != null ? o : 0),
    }),
    t
  )
}
var lF = async (e, t, r) => {
  const a = await sn(e)
  return Rs({
    ...a,
    ...(e.didYouMean && { enableDidYouMean: e.didYouMean.enableDidYouMean }),
    numberOfResults: r,
    q: t,
  })
}
var dF = async (e) => {
  const t = await st(e)
  return (t.request.numberOfResults = 0), t
}
var Pg = (e) => {
  var t
  e.configuration.analytics.enabled &&
    bt.addElement({
      name: 'Query',
      ...(((t = e.query) == null ? void 0 : t.q) && { value: e.query.q }),
      time: JSON.stringify(new Date()),
    })
}
var Ig = [
  'uri',
  'urihash',
  'permanentid',
  'ec_name',
  'ec_brand',
  'ec_category',
  'ec_item_group_id',
  'ec_price',
  'ec_promo_price',
  'ec_shortdesc',
  'ec_thumbnails',
  'ec_images',
  'ec_in_stock',
  'ec_rating',
  'childResults',
  'totalNumberOfChildResults',
]
var fn = () => ({
  id: '',
  skus: [],
  maxNumberOfRecommendations: 5,
  filter: { brand: '', category: '' },
  additionalFields: [],
  recommendations: [],
  error: null,
  isLoading: !1,
  searchUid: '',
  duration: 0,
})
var Ad = class extends fr {
  constructor (t) {
    super(t)
    this.state = t
    this.initialState = fn()
  }

  getPipeline () {
    return ''
  }

  getSearchEventRequestPayload () {
    return {
      queryText: '',
      responseTime: this.responseTime,
      results: this.mapResultsToAnalyticsDocument(),
      numberOfResults: this.numberOfResults,
    }
  }

  getSearchUID () {
    var t
    return ((t = this.state.productRecommendations) == null ? void 0 : t.searchUid) || this.initialState.searchUid
  }

  mapResultsToAnalyticsDocument () {
    var t
    return (t = this.state.productRecommendations) == null
      ? void 0
      : t.recommendations.map((r) => ({
        documentUri: r.documentUri,
        documentUriHash: r.documentUriHash,
        permanentid: r.permanentid,
      }))
  }

  get responseTime () {
    var t
    return ((t = this.state.productRecommendations) == null ? void 0 : t.duration) || this.initialState.duration
  }

  get numberOfResults () {
    var t
    return (
      ((t = this.state.productRecommendations) == null ? void 0 : t.recommendations.length) ||
      this.initialState.recommendations.length
    )
  }
}
var Eg = N(
  'analytics/productRecommendations/load',
  D.Search,
  (e) => e.logRecommendationInterfaceLoad(),
  (e) => new Ad(e)
)
function pF (e) {
  return e && 'childResults' in e && 'totalNumberOfChildResults' in e
}
var wg = y('productrecommendations/setId', (e) => S(e, { id: q }))
var Og = y('productrecommendations/setSku', (e) => S(e, { skus: new Y({ required: !0, min: 1, each: ue }) }))
var qg = y('productrecommendations/setBrand', (e) => S(e, { brand: new w({ required: !0, emptyAllowed: !0 }) }))
var Tg = y('productrecommendations/setCategory', (e) => S(e, { category: new w({ required: !0, emptyAllowed: !0 }) }))
var kg = y('productrecommendations/setAdditionalFields', (e) =>
  S(e, { additionalFields: new Y({ required: !0, each: ue }) })
)
var Dg = y('productrecommendations/setMaxNumberOfRecommendations', (e) =>
  S(e, { number: new j({ required: !0, max: 50, min: 1 }) })
)
var mn = ee('productRecommendations/get', async (e, { getState: t, rejectWithValue: r, extra: { apiClient: a } }) => {
  const n = t()
  const o = new Date().getTime()
  const i = await a.productRecommendations(await fF(n))
  const s = new Date().getTime() - o
  if (de(i)) return r(i.error)
  const u = n.productRecommendations.additionalFields || []
  return {
    recommendations: i.success.results.map((c) => Vg(c, { additionalFields: u })),
    analyticsAction: Eg(),
    searchUid: i.success.searchUid,
    duration: s,
  }
})
var Vg = (e, { additionalFields: t }) => {
  const r = e.raw.ec_price
  const a = e.raw.ec_promo_price
  const n = e.raw.ec_in_stock
  const o = {
    documentUri: e.uri,
    documentUriHash: e.raw.urihash,
    permanentid: e.raw.permanentid,
    clickUri: e.clickUri,
    ec_name: e.raw.ec_name,
    ec_brand: e.raw.ec_brand,
    ec_category: e.raw.ec_category,
    ec_item_group_id: e.raw.ec_item_group_id,
    ec_price: r,
    ec_shortdesc: e.raw.ec_shortdesc,
    ec_thumbnails: e.raw.ec_thumbnails,
    ec_images: e.raw.ec_images,
    ec_promo_price: a === void 0 || (r !== void 0 && a >= r) ? void 0 : a,
    ec_in_stock: n === void 0 ? void 0 : n.toLowerCase() === 'yes' || n.toLowerCase() === 'true',
    ec_rating: e.raw.ec_rating,
    additionalFields: t.reduce((i, s) => ({ ...i, [s]: e.raw[s] }), {}),
    childResults: [],
    totalNumberOfChildResults: 0,
  }
  return (
    pF(e) &&
      ((o.childResults = e.childResults.map((i) => Vg(i, { additionalFields: t }))),
      (o.totalNumberOfChildResults = e.totalNumberOfChildResults)),
    o
  )
}
var fF = async (e) => ({
  accessToken: e.configuration.accessToken,
  organizationId: e.configuration.organizationId,
  url: e.configuration.search.apiBaseUrl,
  locale: e.configuration.search.locale,
  timezone: e.configuration.search.timezone,
  ...(e.configuration.analytics.enabled && { visitorId: await be(e.configuration.analytics) }),
  recommendation: e.productRecommendations.id,
  numberOfResults: e.productRecommendations.maxNumberOfRecommendations,
  fieldsToInclude: [...Ig, ...(e.productRecommendations.additionalFields || [])],
  mlParameters: {
    ...(e.productRecommendations.skus &&
      e.productRecommendations.skus.length > 0 && { itemIds: e.productRecommendations.skus }),
    ...(e.productRecommendations.filter.brand && { brandFilter: e.productRecommendations.filter.brand }),
    ...(e.productRecommendations.filter.category && { categoryFilter: e.productRecommendations.filter.category }),
  },
  actionsHistory: e.configuration.analytics.enabled ? bt.getHistory() : [],
  ...(e.context && { context: e.context.contextValues }),
  ...(e.dictionaryFieldContext && { dictionaryFieldContext: e.dictionaryFieldContext.contextValues }),
  ...(e.searchHub && { searchHub: e.searchHub }),
})
var ks = (e) => (t) => (r) => {
  var o, i
  const a = (o = r.payload) == null ? void 0 : o.analyticsAction
  a !== void 0 && ((i = r.payload) == null || delete i.analyticsAction)
  const n = t(r)
  return (
    r.type === k.fulfilled.type && a === void 0 && console.error('No analytics action associated with search:', r),
    r.type === Xa.fulfilled && a === void 0 && console.error('No analytics action associated with recommendation:', r),
    r.type === mn.fulfilled &&
      a === void 0 &&
      console.error('No analytics action associated with product recommendation:', r),
    a !== void 0 && e.dispatch(a),
    n
  )
}
function Ng (e = {}) {
  return {
    configuration: De(),
    advancedSearchQueries: _e(),
    context: tt(),
    dictionaryFieldContext: Tt(),
    fields: da(),
    searchHub: we(),
    pipeline: rt(),
    recommendation: kr(),
    debug: $e(),
    version: 'unit-testing-version',
    ...e,
  }
}
function Mg (e = {}) {
  return {
    configuration: De(),
    context: tt(),
    dictionaryFieldContext: Tt(),
    searchHub: we(),
    productRecommendations: fn(),
    version: 'unit-testing-version',
    ...e,
  }
}
var Jg = ve(hi())
var Ns = (e) => () => (t) => (r) => {
  var n
  if (!r.error) return t(r)
  const a = r.error
  if (
    (((n = r.payload) == null ? void 0 : n.ignored) ||
      e.error(a.stack || a.message || a.name || 'Error', `Action dispatch error ${r.type}`, r),
    r.error.name !== 'SchemaValidationError')
  ) {
    return t(r)
  }
}
var Ms = (e) => (t) => (r) => (a) => (
  e.debug({ action: a, nextState: t.getState() }, `Action dispatched: ${a.type}`), r(a)
)
var $g = ve(hi())
var ba = (e) => e
var Qs = (e) => e
var Ls = (e) => e
var js = (e) => e
function Ed (e) {
  return new ii({
    logger: (0, $g.default)({ level: 'silent' }),
    preprocessRequest: ba,
    postprocessSearchResponseMiddleware: Qs,
    postprocessFacetSearchResponseMiddleware: Ls,
    postprocessQuerySuggestResponseMiddleware: js,
    ...e,
  })
}
var Fa = ((r) => ((r.Relevance = 'relevance'), (r.Fields = 'fields'), r))(Fa || {})
var Hg = ((r) => ((r.Ascending = 'asc'), (r.Descending = 'desc'), r))(Hg || {})
var zg = () => ({ by: 'relevance' })
function Bs () {
  return zg()
}
function Wg (e = {}) {
  return {
    configuration: De(),
    productListing: Ga(),
    sort: Bs(),
    facetSearchSet: pa(),
    categoryFacetSet: Rt(),
    categoryFacetSearchSet: Qa(),
    dateFacetSet: Ct(),
    facetOptions: lr(),
    facetOrder: Pr(),
    facetSet: St(),
    numericFacetSet: xt(),
    pagination: Ve(),
    version: 'unit-testing-version',
    context: tt(),
    ...e,
  }
}
var Us = () => ({ caseAssistId: '', locale: 'en-US' })
var _s = () => ({ status: { loading: !1, error: null, lastResponseId: '' }, fields: {} })
var $s = () => ({})
var Hs = () => ({ status: { loading: !1, error: null, lastResponseId: '' }, documents: [] })
function Yg (e = {}) {
  return {
    configuration: De(),
    caseAssistConfiguration: Us(),
    caseField: _s(),
    caseInput: $s(),
    documentSuggestion: Hs(),
    debug: $e(),
    version: 'unit-testing-version',
    resultPreview: ga(),
    searchHub: we(),
    ...e,
  }
}
var wd = () => ({ caseContext: {} })
var Od = () => ({ insightId: '' })
var qd = () => ({ loading: !1, config: void 0 })
var Td = () => ({})
ve(hi())
function Xg (e = {}) {
  const t = yi(e, $i)
  return {
    ...t,
    executeFirstSearch: jest.fn(),
    executeFirstSearchAfterStandaloneSearchBoxRedirect: jest.fn(),
    apiClient: t.apiClient,
  }
}
function Zg (e = {}) {
  return yi(e, Ng)
}
function eh (e = {}) {
  return yi(e, Mg)
}
function th (e = {}) {
  return yi(e, Wg)
}
function rh (e = {}) {
  return yi(e, Yg)
}
function yi (e = {}, t, r = EF) {
  const a = (0, Jg.default)({ level: 'silent' })
  const n = ah(e, t)
  const { store: o, apiClient: i } = r(a, n)
  const s = o(n)
  const u = () => {}
  const { state: c, ...l } = e
  return {
    store: s,
    apiClient: i,
    state: ah(e, t),
    subscribe: jest.fn(() => u),
    get dispatch () {
      return s.dispatch
    },
    get actions () {
      return s.getActions()
    },
    findAsyncAction (d) {
      const m = this.actions.find((p) => p.type === d.type)
      return wF(m) ? m : void 0
    },
    logger: a,
    addReducers: jest.fn(),
    enableAnalytics: jest.fn(),
    disableAnalytics: jest.fn(),
    ...l,
  }
}
function ah (e, t) {
  const r = e.state || t()
  return (r.configuration.analytics.enabled = !1), r
}
var EF = (e) => {
  const t = { searchAPIClient: Ed({ logger: e }), apiClient: Ed({ logger: e }), validatePayload: ze, logger: e }
  return { store: (0, Gg.default)([Ns(e), ks, _o.withExtraArgument(t), ...Xi(), Ms(e)]), apiClient: t.apiClient }
}
function wF (e) {
  return e ? 'meta' in e : !1
}
function zs (e = {}) {
  return {
    urihash: '',
    parents: '',
    sfid: '',
    sfparentid: '',
    sfinsertedbyid: '',
    documenttype: '',
    sfcreatedbyid: '',
    permanentid: '',
    date: 0,
    objecttype: '',
    sourcetype: '',
    sftitle: '',
    size: 0,
    sffeeditemid: '',
    clickableuri: '',
    sfcreatedby: '',
    source: '',
    collection: '',
    connectortype: '',
    filetype: '',
    sfcreatedbyname: '',
    sflikecount: 0,
    language: [],
    ...e,
  }
}
function nh (e = {}) {
  return {
    title: '',
    uri: '',
    printableUri: '',
    clickUri: '',
    uniqueId: '',
    excerpt: '',
    firstSentences: '',
    summary: null,
    flags: '',
    hasHtmlVersion: !1,
    score: 0,
    percentScore: 0,
    rankingInfo: null,
    isTopResult: !1,
    isRecommendation: !1,
    titleHighlights: [],
    firstSentencesHighlights: [],
    excerptHighlights: [],
    printableUriHighlights: [],
    summaryHighlights: [],
    absentTerms: [],
    raw: zs(),
    ...e,
  }
}
var ih = {}
Xu(ih, { escape: () => yn, getHighlightedSuggestion: () => kd, highlightString: () => OF })
function OF (e) {
  if (ps(e.openingDelimiter) || ps(e.closingDelimiter)) throw Error('delimiters should be a non-empty string')
  if (ae(e.content) || ps(e.content)) return e.content
  if (e.highlights.length === 0) return yn(e.content)
  const t = e.content.length
  let r = ''
  let a = 0
  for (let n = 0; n < e.highlights.length; n++) {
    const o = e.highlights[n]
    const i = o.offset
    const s = i + o.length
    if (s > t) break
    ;(r += yn(e.content.slice(a, i))),
    (r += e.openingDelimiter),
    (r += yn(e.content.slice(i, s))),
    (r += e.closingDelimiter),
    (a = s)
  }
  return a !== t && (r += yn(e.content.slice(a))), r
}
function kd (e, t) {
  return (
    (e = yn(e)),
    e.replace(/\[(.*?)\]|\{(.*?)\}|\((.*?)\)/g, (r, a, n, o) =>
      a ? Dd(a, t.notMatchDelimiters) : n ? Dd(n, t.exactMatchDelimiters) : o ? Dd(o, t.correctionDelimiters) : r
    )
  )
}
function Dd (e, t) {
  return t ? t.open + e + t.close : e
}
function yn (e) {
  return e
    .replace(/&/g, '&amp')
    .replace(/</g, '&lt')
    .replace(/>/g, '&gt')
    .replace(/"/g, '&quot')
    .replace(/`/g, '&#96')
    .replace(/'/g, '&#x27')
}
var Vd = () => ue
var sh = () => q
var Qr = y('configuration/updateBasicConfiguration', (e) =>
  S(e, { accessToken: ue, organizationId: ue, platformUrl: ue })
)
var lt = y('configuration/updateSearchConfiguration', (e) =>
  S(e, {
    apiBaseUrl: ue,
    pipeline: ue,
    searchHub: ue,
    timezone: ue,
    locale: ue,
    authenticationProviders: new Y({ required: !1, each: q }),
  })
)
var Lr = y('configuration/updateAnalyticsConfiguration', (e) =>
  S(e, {
    enabled: new G({ default: !0 }),
    originContext: Vd(),
    originLevel2: Vd(),
    originLevel3: Vd(),
    apiBaseUrl: ue,
    runtimeEnvironment: new me(),
    anonymous: new G({ default: !1 }),
    deviceId: ue,
    userDisplayName: ue,
    documentLocation: ue,
  })
)
var Sn = y('configuration/analytics/disable')
var Cn = y('configuration/analytics/enable')
var Ws = y('configuration/analytics/originlevel2', (e) => S(e, { originLevel2: sh() }))
var Ys = y('configuration/analytics/originlevel3', (e) => S(e, { originLevel3: sh() }))
function ch (e) {
  const t = { ...e }
  let r
  const a = (n) => (o, i) => {
    const s = n(o, i)
    return r ? r(s, i) : s
  }
  return {
    get combinedReducer () {
      return a((0, g.combineReducers)(t))
    },
    containsAll (n) {
      return Object.keys(n).every((i) => i in t)
    },
    add (n) {
      Object.keys(n)
        .filter((o) => !(o in t))
        .forEach((o) => (t[o] = n[o]))
    },
    addCrossReducer (n) {
      r = n
    },
  }
}
function uh ({ reducer: e, preloadedState: t, middlewares: r = [], thunkExtraArguments: a, name: n }) {
  return _l({
    reducer: e,
    preloadedState: t,
    devTools: { stateSanitizer: (o) => (o.history ? { ...o, history: '<<OMIT>>' } : o), name: n, shouldHotReload: !1 },
    middleware: (o) => [...r, ...o({ thunk: { extraArgument: a } }), Ms(a.logger)],
  })
}
var jr = () => new w({ required: !1, emptyAllowed: !0 })
var Ks = y('advancedSearchQueries/update', (e) => S(e, { aq: jr(), cq: jr(), lq: jr(), dq: jr() }))
var Gs = y('advancedSearchQueries/register', (e) => S(e, { aq: jr(), cq: jr(), lq: jr(), dq: jr() }))
var Js = {
  q: new w(),
  enableQuerySyntax: new G(),
  aq: new w(),
  cq: new w(),
  firstResult: new j({ min: 0 }),
  numberOfResults: new j({ min: 0 }),
  sortCriteria: new w(),
  f: new Q(),
  cf: new Q(),
  nf: new Q(),
  df: new Q(),
  debug: new G(),
  sf: new Q(),
  tab: new w(),
}
var se = y('searchParameters/restore', (e) => S(e, Js))
O(_e(), (e) => {
  e.addCase(Ks, (t, r) => {
    const { aq: a, cq: n, lq: o, dq: i } = r.payload
    Fe(a) || ((t.aq = a), (t.aqWasSet = !0)),
    Fe(n) || ((t.cq = n), (t.cqWasSet = !0)),
    Fe(o) || ((t.lq = o), (t.lqWasSet = !0)),
    Fe(i) || ((t.dq = i), (t.dqWasSet = !0))
  })
    .addCase(Gs, (t, r) => {
      const { aq: a, cq: n, lq: o, dq: i } = r.payload
      Fe(a) || ((t.defaultFilters.aq = a), t.aqWasSet || (t.aq = a)),
      Fe(n) || ((t.defaultFilters.cq = n), t.cqWasSet || (t.cq = n)),
      Fe(o) || ((t.defaultFilters.lq = o), t.lqWasSet || (t.lq = o)),
      Fe(i) || ((t.defaultFilters.dq = i), t.dqWasSet || (t.dq = i))
    })
    .addCase(ce.fulfilled, (t, r) => {
      var a, n
      return (n = (a = r.payload) == null ? void 0 : a.advancedSearchQueries) != null ? n : t
    })
    .addCase(se, (t, r) => {
      const { aq: a, cq: n } = r.payload
      Fe(a) || ((t.aq = a), (t.aqWasSet = !0)), Fe(n) || ((t.cq = n), (t.cqWasSet = !0))
    })
})
var Xs = y('tab/register', (e) => {
  const t = new Q({ values: { id: q, expression: oe } })
  return S(e, t)
})
var Aa = y('tab/updateActiveTab', (e) => S(e, q))
function qF (e, t) {
  if (/^https:\/\/platform(dev|stg|hipaa)?(-)?(eu|au)?\.cloud\.coveo\.com/.test(e)) {
    return e.replace(/^(https:\/\/)platform/, '$1analytics') + ki
  }
  const a = e.match(new RegExp(`^https://(${t}\\.org)\\.coveo.com`))
  return a ? e.replace(a[1], 'analytics.cloud') + ki : e
}
var dh = O(De(), (e) =>
  e
    .addCase(Qr, (t, r) => {
      r.payload.accessToken && (t.accessToken = r.payload.accessToken),
      r.payload.organizationId && (t.organizationId = r.payload.organizationId),
      r.payload.platformUrl &&
          ((t.platformUrl = r.payload.platformUrl),
          (t.search.apiBaseUrl = `${r.payload.platformUrl}${ml}`),
          (t.analytics.apiBaseUrl = qF(r.payload.platformUrl, t.organizationId)))
    })
    .addCase(lt, (t, r) => {
      r.payload.apiBaseUrl && (t.search.apiBaseUrl = r.payload.apiBaseUrl),
      r.payload.locale && (t.search.locale = r.payload.locale),
      r.payload.timezone && (t.search.timezone = r.payload.timezone),
      r.payload.authenticationProviders && (t.search.authenticationProviders = r.payload.authenticationProviders)
    })
    .addCase(Lr, (t, r) => {
      ae(r.payload.enabled) ||
        (!r.payload.enabled && t.analytics.enabled && ld(t.analytics), (t.analytics.enabled = r.payload.enabled)),
      ae(r.payload.originContext) || (t.analytics.originContext = r.payload.originContext),
      ae(r.payload.originLevel2) || (t.analytics.originLevel2 = r.payload.originLevel2),
      ae(r.payload.originLevel3) || (t.analytics.originLevel3 = r.payload.originLevel3),
      ae(r.payload.apiBaseUrl) || (t.analytics.apiBaseUrl = r.payload.apiBaseUrl),
      ae(r.payload.runtimeEnvironment) || (t.analytics.runtimeEnvironment = r.payload.runtimeEnvironment),
      ae(r.payload.anonymous) || (t.analytics.anonymous = r.payload.anonymous),
      ae(r.payload.deviceId) || (t.analytics.deviceId = r.payload.deviceId),
      ae(r.payload.userDisplayName) || (t.analytics.userDisplayName = r.payload.userDisplayName),
      ae(r.payload.documentLocation) || (t.analytics.documentLocation = r.payload.documentLocation)
    })
    .addCase(Sn, (t) => {
      ;(t.analytics.enabled = !1), ld(t.analytics)
    })
    .addCase(Cn, (t) => {
      t.analytics.enabled = !0
    })
    .addCase(Ws, (t, r) => {
      t.analytics.originLevel2 = r.payload.originLevel2
    })
    .addCase(Ys, (t, r) => {
      t.analytics.originLevel3 = r.payload.originLevel3
    })
    .addCase(Aa, (t, r) => {
      t.analytics.originLevel2 = r.payload
    })
    .addCase(se, (t, r) => {
      t.analytics.originLevel2 = r.payload.tab || t.analytics.originLevel2
    })
)
var TF = new Y({ each: q, required: !0 })
var ph = (e, t) => (S(e, q), Na(t) ? S(t, q) : S(t, TF), { payload: { contextKey: e, contextValue: t } })
var xn = y('context/set', (e) => {
  for (const [t, r] of Object.entries(e)) ph(t, r)
  return { payload: e }
})
var Rn = y('context/add', (e) => ph(e.contextKey, e.contextValue))
var vn = y('context/remove', (e) => S(e, q))
O(tt(), (e) => {
  e.addCase(xn, (t, r) => {
    t.contextValues = r.payload
  })
    .addCase(Rn, (t, r) => {
      t.contextValues[r.payload.contextKey] = r.payload.contextValue
    })
    .addCase(vn, (t, r) => {
      delete t.contextValues[r.payload]
    })
    .addCase(ce.fulfilled, (t, r) => {
      !r.payload || (t.contextValues = r.payload.context.contextValues)
    })
})
var Br = y('debug/enable')
var bn = y('debug/disable')
var mh = O($e(), (e) => {
  e.addCase(Br, () => !0)
    .addCase(bn, () => !1)
    .addCase(se, (t, r) => {
      var a
      return (a = r.payload.debug) != null ? a : t
    })
})
var gh = O(ri, (e) => e)
var hh = O(qo(), (e) => {
  e.addCase(dn, (t) => {
    t.enableDidYouMean = !0
  })
    .addCase(bs, (t) => {
      t.enableDidYouMean = !1
    })
    .addCase(k.pending, (t) => {
      ;(t.queryCorrection = Vi()), (t.wasAutomaticallyCorrected = !1), (t.wasCorrectedTo = '')
    })
    .addCase(k.fulfilled, (t, r) => {
      ;(t.queryCorrection = r.payload.response.queryCorrections[0] || Vi()),
      (t.originalQuery = r.payload.originalQuery),
      (t.wasAutomaticallyCorrected = r.payload.automaticallyCorrected)
    })
    .addCase(Bt, (t, r) => {
      t.wasCorrectedTo = r.payload
    })
})
var J = q
var kF = {
  state: new me({ required: !0 }),
  numberOfResults: new j({ required: !0, min: 0 }),
  value: new w({ required: !0, emptyAllowed: !0 }),
  path: new Y({ required: !0, each: q }),
  moreValuesAvailable: new G({ required: !1 }),
}
function Nd (e) {
  e.children.forEach((t) => {
    Nd(t)
  }),
  ze(
    {
      state: e.state,
      numberOfResults: e.numberOfResults,
      value: e.value,
      path: e.path,
      moreValuesAvailable: e.moreValuesAvailable,
    },
    kF
  )
}
var DF = {
  facetId: J,
  field: q,
  delimitingCharacter: new w({ required: !1, emptyAllowed: !0 }),
  filterFacetCount: new G({ required: !1 }),
  injectionDepth: new j({ required: !1, min: 0 }),
  numberOfValues: new j({ required: !1, min: 1 }),
  sortCriteria: new me({ required: !1 }),
  basePath: new Y({ required: !1, each: q }),
  filterByBasePath: new G({ required: !1 }),
}
var Ur = y('categoryFacet/register', (e) => S(e, DF))
var _r = y('categoryFacet/toggleSelectValue', (e) => {
  try {
    return ze(e.facetId, q), Nd(e.selection), { payload: e, error: null }
  } catch (t) {
    return { payload: e, error: gr(t) }
  }
})
var $t = y('categoryFacet/deselectAll', (e) => S(e, J))
var Pa = y('categoryFacet/updateNumberOfValues', (e) =>
  S(e, { facetId: J, numberOfValues: new j({ required: !0, min: 1 }) })
)
var Fn = y('categoryFacet/updateSortCriterion', (e) => S(e, { facetId: J, criterion: new me() }))
var Zs = { value: q, numberOfResults: new j({ min: 0 }), state: q }
var Ht = new w({ regex: /^[a-zA-Z0-9-_]+$/ })
var zt = new w({ required: !0 })
var yh = new Y({ each: new w() })
var An = new w()
var Sh = new G()
var Wt = new G()
var Yt = new j({ min: 0 })
var Ft = new j({ min: 1 })
var ec = new G({ required: !0 })
var VF = new Q()
var NF = new w()
var MF = { captions: VF, numberOfValues: Ft, query: NF }
var Pn = new Q({ values: MF })
var tc = new Q({
  options: { required: !1 },
  values: {
    type: new w({ constrainTo: ['simple'], emptyAllowed: !1, required: !0 }),
    values: new Y({ required: !0, max: 25, each: new w({ emptyAllowed: !1, required: !0 }) }),
  },
})
var Ch = new G()
var QF = {
  facetId: J,
  field: new w({ required: !0, emptyAllowed: !0 }),
  delimitingCharacter: new w({ required: !1, emptyAllowed: !0 }),
  filterFacetCount: new G({ required: !1 }),
  injectionDepth: new j({ required: !1, min: 0 }),
  numberOfValues: new j({ required: !1, min: 1 }),
  sortCriteria: new me({ required: !1 }),
  allowedValues: tc,
}
var $r = y('facet/register', (e) => S(e, QF))
var Kt = y('facet/toggleSelectValue', (e) => S(e, { facetId: J, selection: new Q({ values: Zs }) }))
var Re = y('facet/deselectAll', (e) => S(e, J))
var In = y('facet/updateSortCriterion', (e) => S(e, { facetId: J, criterion: new me({ required: !0 }) }))
var Ia = y('facet/updateNumberOfValues', (e) => S(e, { facetId: J, numberOfValues: new j({ required: !0, min: 1 }) }))
var Ea = y('facet/updateIsFieldExpanded', (e) => S(e, { facetId: J, isFieldExpanded: new G({ required: !0 }) }))
var Hr = y('facet/updateFreezeCurrentValues', (e) => S(e, { facetId: J, freezeCurrentValues: new G({ required: !0 }) }))
var En = {
  state: q,
  start: new j({ required: !0 }),
  end: new j({ required: !0 }),
  endInclusive: new G({ required: !0 }),
  numberOfResults: new j({ required: !0, min: 0 }),
}
var wn = {
  start: q,
  end: q,
  endInclusive: new G({ required: !0 }),
  state: q,
  numberOfResults: new j({ required: !0, min: 0 }),
}
var On = (e) => ({ facetId: J, selection: typeof e.start === 'string' ? new Q({ values: wn }) : new Q({ values: En }) })
var qn = y('rangeFacet/updateSortCriterion', (e) => S(e, { facetId: J, criterion: new me({ required: !0 }) }))
function wa (e) {
  var o, i
  Fe(e.useLocalTime) ||
    console.warn(
      'The "useLocalTime" option for "buildDateRange" is deprecated. Please use the "timezone" engine configuration option instead.'
    )
  const t = xh(e.start, e)
  const r = xh(e.end, e)
  const a = (o = e.endInclusive) != null ? o : !1
  const n = (i = e.state) != null ? i : 'idle'
  return { start: t, end: r, endInclusive: a, state: n }
}
function xh (e, t) {
  const { dateFormat: r } = t
  return Sg(e) ? (xa(e), gg(e)) : typeof e === 'string' && Qt(e) ? (xa(e), e) : (Cs(e, r), ui(Ca(e, r)))
}
var LF = { start: q, end: q, endInclusive: new G({ required: !0 }), state: q }
var jF = {
  facetId: J,
  field: q,
  currentValues: new Y({ required: !1, each: new Q({ values: LF }) }),
  generateAutomaticRanges: new G({ required: !0 }),
  filterFacetCount: new G({ required: !1 }),
  injectionDepth: new j({ required: !1, min: 0 }),
  numberOfValues: new j({ required: !1, min: 1 }),
  sortCriteria: new me({ required: !1 }),
  rangeAlgorithm: new me({ required: !1 }),
}
function Rh (e) {
  return Qt(e) ? di(e) : e
}
function rc (e) {
  !e.currentValues ||
    e.currentValues.forEach((t) => {
      const { start: r, end: a } = wa(t)
      if (Ca(Rh(r)).isAfter(Ca(Rh(a)))) {
        throw new Error(`The start value is greater than the end value for the date range ${t.start} to ${t.end}`)
      }
    })
}
var Gt = y('dateFacet/register', (e) => {
  try {
    return ze(e, jF), rc(e), { payload: e, error: null }
  } catch (t) {
    return { payload: e, error: gr(t) }
  }
})
var Jt = y('dateFacet/toggleSelectValue', (e) => S(e, { facetId: J, selection: new Q({ values: wn }) }))
var hr = y('dateFacet/updateFacetValues', (e) => {
  try {
    return (
      ze(e, { facetId: J, values: new Y({ each: new Q({ values: wn }) }) }),
      rc({ currentValues: e.values }),
      { payload: e, error: null }
    )
  } catch (t) {
    return { payload: e, error: gr(t) }
  }
})
var ac = qn
var nc = Re
var BF = {
  state: q,
  start: new j({ required: !0 }),
  end: new j({ required: !0 }),
  endInclusive: new G({ required: !0 }),
}
var UF = {
  facetId: J,
  field: q,
  currentValues: new Y({ required: !1, each: new Q({ values: BF }) }),
  generateAutomaticRanges: new G({ required: !0 }),
  filterFacetCount: new G({ required: !1 }),
  injectionDepth: new j({ required: !1, min: 0 }),
  numberOfValues: new j({ required: !1, min: 1 }),
  sortCriteria: new me({ required: !1 }),
  rangeAlgorithm: new me({ required: !1 }),
}
function oc (e) {
  !e.currentValues ||
    e.currentValues.forEach(({ start: t, end: r }) => {
      if (t > r) throw new Error(`The start value is greater than the end value for the numeric range ${t} to ${r}`)
    })
}
var Xt = y('numericFacet/register', (e) => {
  try {
    return S(e, UF), oc(e), { payload: e, error: null }
  } catch (t) {
    return { payload: e, error: gr(t) }
  }
})
var Zt = y('numericFacet/toggleSelectValue', (e) => S(e, { facetId: J, selection: new Q({ values: En }) }))
var yr = y('numericFacet/updateFacetValues', (e) => {
  try {
    return (
      ze(e, { facetId: J, values: new Y({ each: new Q({ values: En }) }) }),
      oc({ currentValues: e.values }),
      { payload: e, error: null }
    )
  } catch (t) {
    return { payload: e, error: gr(t) }
  }
})
var ic = qn
var sc = Re
var ie = y('facetOptions/update', (e) => S(e, { freezeFacetOrder: new G({ required: !1 }) }))
var Le = y('facetOptions/facet/enable', (e) => S(e, J))
var Se = y('facetOptions/facet/disable', (e) => S(e, J))
var vh = O(lr(), (e) => {
  e.addCase(ie, (t, r) => ({ ...t, ...r.payload }))
    .addCase(k.fulfilled, (t) => {
      t.freezeFacetOrder = !1
    })
    .addCase(k.rejected, (t) => {
      t.freezeFacetOrder = !1
    })
    .addCase(ce.fulfilled, (t, r) => {
      var a, n
      return (n = (a = r.payload) == null ? void 0 : a.facetOptions) != null ? n : t
    })
    .addCase(Ur, (t, r) => {
      t.facets[r.payload.facetId] = La()
    })
    .addCase($r, (t, r) => {
      t.facets[r.payload.facetId] = La()
    })
    .addCase(Gt, (t, r) => {
      t.facets[r.payload.facetId] = La()
    })
    .addCase(Xt, (t, r) => {
      t.facets[r.payload.facetId] = La()
    })
    .addCase(Le, (t, r) => {
      t.facets[r.payload].enabled = !0
    })
    .addCase(Se, (t, r) => {
      t.facets[r.payload].enabled = !1
    })
    .addCase(se, (t, r) => {
      var a, n, o, i
      ;[
        ...Object.keys((a = r.payload.f) != null ? a : {}),
        ...Object.keys((n = r.payload.cf) != null ? n : {}),
        ...Object.keys((o = r.payload.nf) != null ? o : {}),
        ...Object.keys((i = r.payload.df) != null ? i : {}),
      ].forEach((s) => {
        s in t || (t.facets[s] = La()), (t.facets[s].enabled = !0)
      })
    })
})
function Tn (e, t) {
  const { facetId: r, criterion: a } = t
  const n = e[r]
  !n || (n.sortCriteria = a)
}
function kn (e) {
  !e || ((e.currentValues = e.currentValues.map((t) => ({ ...t, state: 'idle' }))), (e.preventAutoSelect = !0))
}
function cc (e, t) {
  !e || (e.numberOfValues = t)
}
var Si = {
  facetId: J,
  captions: new Q({ options: { required: !1 } }),
  numberOfValues: new j({ required: !1, min: 1 }),
  query: new w({ required: !1, emptyAllowed: !0 }),
}
var _F = {
  path: new Y({ required: !0, each: q }),
  displayValue: oe,
  rawValue: oe,
  count: new j({ required: !0, min: 0 }),
}
var Dn = y('categoryFacet/selectSearchResult', (e) => S(e, { facetId: J, value: new Q({ values: _F }) }))
var Vn = y('categoryFacetSearch/register', (e) => S(e, Si))
function Ci (e, t) {
  const r = e[t]
  !r ||
    ((r.request.numberOfValues = r.initialNumberOfValues),
    (r.request.currentValues = []),
    (r.request.preventAutoSelect = !0))
}
function Md (e, t, r) {
  ;(e.currentValues = $F(t, r)), (e.numberOfValues = t.length ? 1 : r), (e.preventAutoSelect = !0)
}
function $F (e, t) {
  if (!e.length) return []
  const r = bh(e[0], t)
  let a = r
  for (const n of e.splice(1)) {
    const o = bh(n, t)
    a.children.push(o), (a = o)
  }
  return (a.state = 'selected'), (a.retrieveChildren = !0), [r]
}
function bh (e, t) {
  return { value: e, retrieveCount: t, children: [], state: 'idle', retrieveChildren: !1 }
}
var Fh = O(Rt(), (e) => {
  e.addCase(Ur, (t, r) => {
    const a = r.payload
    const { facetId: n } = a
    if (n in t) return
    const o = zF(a)
    const i = o.numberOfValues
    t[n] = { request: o, initialNumberOfValues: i }
  })
    .addCase(ce.fulfilled, (t, r) => {
      var a, n
      return (n = (a = r.payload) == null ? void 0 : a.categoryFacetSet) != null ? n : t
    })
    .addCase(se, (t, r) => {
      const a = r.payload.cf || {}
      Object.keys(t).forEach((n) => {
        const o = t[n].request
        const i = a[n] || []
        ;(i.length || o.currentValues.length) && Md(o, i, t[n].initialNumberOfValues)
      })
    })
    .addCase(Fn, (t, r) => {
      var i
      const { facetId: a, criterion: n } = r.payload
      const o = (i = t[a]) == null ? void 0 : i.request
      !o || (o.sortCriteria = n)
    })
    .addCase(_r, (t, r) => {
      var d
      const { facetId: a, selection: n, retrieveCount: o } = r.payload
      const i = (d = t[a]) == null ? void 0 : d.request
      if (!i) return
      const { path: s } = n
      const u = s.slice(0, s.length - 1)
      const c = HF(i, u, o)
      if (c.length) {
        const m = c[0]
        ;(m.retrieveChildren = !0), (m.state = 'selected'), (m.children = [])
        return
      }
      const l = Ah(n.value, o)
      ;(l.state = 'selected'), c.push(l), (i.numberOfValues = 1)
    })
    .addCase($t, (t, r) => {
      const a = r.payload
      Ci(t, a)
    })
    .addCase(ct, (t) => {
      Object.keys(t).forEach((r) => Ci(t, r))
    })
    .addCase(qe, (t) => {
      Object.keys(t).forEach((r) => Ci(t, r))
    })
    .addCase(jt, (t, r) =>
      Object.keys(t).forEach((a) => {
        t[a].request.preventAutoSelect = !r.payload.allow
      })
    )
    .addCase(Pa, (t, r) => {
      var i
      const { facetId: a, numberOfValues: n } = r.payload
      const o = (i = t[a]) == null ? void 0 : i.request
      if (o) {
        if (!o.currentValues.length) return cc(o, n)
        WF(t, r.payload)
      }
    })
    .addCase(Dn, (t, r) => {
      const { facetId: a, value: n } = r.payload
      const o = t[a]
      if (!o) return
      const i = [...n.path, n.rawValue]
      Md(o.request, i, o.initialNumberOfValues)
    })
    .addCase(Ye.fulfilled, (t, r) => {
      Ph(t, r.payload.response.facets)
    })
    .addCase(k.fulfilled, (t, r) => {
      Ph(t, r.payload.response.facets)
    })
    .addCase(Se, (t, r) => {
      Ci(t, r.payload)
    })
})
var Qd = {
  delimitingCharacter: ';',
  filterFacetCount: !0,
  injectionDepth: 1e3,
  numberOfValues: 5,
  sortCriteria: 'occurrences',
  basePath: [],
  filterByBasePath: !0,
}
function HF (e, t, r) {
  let a = e.currentValues
  for (const n of t) {
    let o = a[0]
    ;(!o || n !== o.value) && ((o = Ah(n, r)), (a.length = 0), a.push(o)),
    (o.retrieveChildren = !1),
    (o.state = 'idle'),
    (a = o.children)
  }
  return a
}
function zF (e) {
  return { ...Qd, currentValues: [], preventAutoSelect: !1, type: 'hierarchical', ...e }
}
function Ah (e, t) {
  return { value: e, state: 'idle', children: [], retrieveChildren: !0, retrieveCount: t }
}
function Ph (e, t) {
  t.forEach((r) => {
    var i
    if (!YF(e, r)) return
    const a = r.facetId
    const n = (i = e[a]) == null ? void 0 : i.request
    if (!n) return
    const o = KF(n, r)
    ;(n.currentValues = o ? [] : n.currentValues), (n.preventAutoSelect = !1)
  })
}
function WF (e, t) {
  var o
  const { facetId: r, numberOfValues: a } = t
  let n = (o = e[r]) == null ? void 0 : o.request.currentValues[0]
  if (n) {
    for (; n.children.length && (n == null ? void 0 : n.state) !== 'selected';) n = n.children[0]
    n.retrieveCount = a
  }
}
function YF (e, t) {
  return t.facetId in e
}
function KF (e, t) {
  const r = ot(e.currentValues).parents
  const a = ot(t.values).parents
  return r.length !== a.length
}
var Ih = O(Pr(), (e) => {
  e.addCase(k.fulfilled, (t, r) => r.payload.response.facets.map((a) => a.facetId)).addCase(ce.fulfilled, (t, r) => {
    var a, n
    return (n = (a = r.payload) == null ? void 0 : a.facetOrder) != null ? n : t
  })
})
function uc (e, t, r) {
  const { facetId: a } = t
  if (e[a]) return
  const n = !1
  const o = { ...er, ...t }
  const i = r()
  e[a] = { options: o, isLoading: n, response: i, initialNumberOfValues: o.numberOfValues, requestId: '' }
}
function lc (e, t) {
  const { facetId: r, ...a } = t
  const n = e[r]
  !n || (n.options = { ...n.options, ...a })
}
function dc (e, t, r) {
  const a = e[t]
  !a || ((a.requestId = r), (a.isLoading = !0))
}
function pc (e, t) {
  const r = e[t]
  !r || (r.isLoading = !1)
}
function fc (e, t, r) {
  const { facetId: a, response: n } = t
  const o = e[a]
  !o || (o.requestId === r && ((o.isLoading = !1), (o.response = n)))
}
function xi (e, t, r) {
  const { facetId: a } = t
  const n = e[a]
  !n ||
    ((n.requestId = ''),
    (n.isLoading = !1),
    (n.response = r()),
    (n.options.numberOfValues = n.initialNumberOfValues),
    (n.options.query = er.query))
}
function mc (e, t) {
  Object.keys(e).forEach((r) => xi(e, { facetId: r }, t))
}
var er = { captions: {}, numberOfValues: 10, query: '' }
var GF = {
  facetId: J,
  value: new Q({ values: { displayValue: oe, rawValue: oe, count: new j({ required: !0, min: 0 }) } }),
}
var gc = y('facetSearch/register', (e) => S(e, Si))
var zr = y('facetSearch/update', (e) => S(e, Si))
var Oa = y('facetSearch/toggleSelectValue', (e) => S(e, GF))
var Nn = (e) =>
  N('analytics/facet/showMore', D.Search, (t, r) => {
    S(e, J)
    const a = Sa(e, Xe(r))
    return t.logFacetShowMore(a)
  })()
var Mn = (e) =>
  N('analytics/facet/showLess', D.Search, (t, r) => {
    S(e, J)
    const a = Sa(e, Xe(r))
    return t.logFacetShowLess(a)
  })()
var Eh = (e) =>
  N('analytics/facet/search', D.Search, (t, r) => {
    S(e, J)
    const a = Xe(r)
    const n = Sa(e, a)
    return t.logFacetSearch(n)
  })()
var tr = (e) =>
  N('analytics/facet/sortChange', D.Search, (t, r) => {
    S(e, { facetId: J, criterion: new me({ required: !0 }) })
    const { facetId: a, criterion: n } = e
    const o = Xe(r)
    const s = { ...Sa(a, o), criteria: n }
    return t.logFacetUpdateSort(s)
  })()
var je = (e) =>
  N('analytics/facet/reset', D.Search, (t, r) => {
    S(e, J)
    const a = Xe(r)
    const n = Sa(e, a)
    return t.logFacetClearAll(n)
  })()
var Ae = (e) =>
  N('analytics/facet/select', D.Search, (t, r) => {
    S(e, { facetId: J, facetValue: q })
    const a = Xe(r)
    const n = ss(e, a)
    return t.logFacetSelect(n)
  })()
var At = (e) =>
  N('analytics/facet/deselect', D.Search, (t, r) => {
    S(e, { facetId: J, facetValue: q })
    const a = Xe(r)
    const n = ss(e, a)
    return t.logFacetDeselect(n)
  })()
var hc = (e) =>
  N('analytics/facet/breadcrumb', D.Search, (t, r) => {
    S(e, { facetId: J, facetValue: q })
    const a = ss(e, Xe(r))
    return t.logBreadcrumbFacet(a)
  })()
var wh = async (e, t) => {
  const { captions: r, query: a, numberOfValues: n } = t.facetSearchSet[e].options
  const { field: o, currentValues: i, filterFacetCount: s } = t.facetSet[e]
  const u = (await st(t)).request
  const c = i.filter((d) => d.state !== 'idle').map((d) => d.value)
  const l = `*${a}*`
  return {
    url: t.configuration.search.apiBaseUrl,
    accessToken: t.configuration.accessToken,
    organizationId: t.configuration.organizationId,
    ...(t.configuration.search.authenticationProviders && {
      authentication: t.configuration.search.authenticationProviders.join(','),
    }),
    captions: r,
    numberOfValues: n,
    query: l,
    field: o,
    ignoreValues: c,
    searchContext: u,
    filterFacetCount: s,
    type: 'specific',
  }
}
var Oh = async (e, t) => {
  const r = t.categoryFacetSearchSet[e].options
  const a = t.categoryFacetSet[e].request
  const { captions: n, query: o, numberOfValues: i } = r
  const { field: s, delimitingCharacter: u, basePath: c, filterFacetCount: l } = a
  const d = (await st(t)).request
  const m = JF(a)
  const p = m.length ? [m] : []
  const f = `*${o}*`
  return {
    url: t.configuration.search.apiBaseUrl,
    accessToken: t.configuration.accessToken,
    organizationId: t.configuration.organizationId,
    ...(t.configuration.search.authenticationProviders.length && {
      authentication: t.configuration.search.authenticationProviders.join(','),
    }),
    basePath: c,
    captions: n,
    numberOfValues: i,
    query: f,
    field: s,
    delimitingCharacter: u,
    ignorePaths: p,
    searchContext: d,
    filterFacetCount: l,
    type: 'hierarchical',
  }
}
var JF = (e) => {
  const t = []
  let r = e.currentValues[0]
  for (; r;) t.push(r.value), (r = r.children[0])
  return t
}
var Pt = ee(
  'facetSearch/executeSearch',
  async (e, { dispatch: t, getState: r, extra: { apiClient: a, validatePayload: n } }) => {
    const o = r()
    let i
    n(e, q), XF(o, e) ? (i = await wh(e, o)) : (i = await Oh(e, o))
    const s = await a.facetSearch(i)
    return t(Eh(e)), { facetId: e, response: s }
  }
)
var Qn = y('facetSearch/clearResults', (e) => S(e, { facetId: J }))
var XF = (e, t) => e.facetSearchSet !== void 0 && e.facetSet !== void 0 && e.facetSet[t] !== void 0
var qh = O(Qa(), (e) => {
  e.addCase(Vn, (t, r) => {
    const a = r.payload
    uc(t, a, Ld)
  })
    .addCase(zr, (t, r) => {
      lc(t, r.payload)
    })
    .addCase(Pt.pending, (t, r) => {
      const a = r.meta.arg
      dc(t, a, r.meta.requestId)
    })
    .addCase(Pt.rejected, (t, r) => {
      const a = r.meta.arg
      pc(t, a)
    })
    .addCase(Pt.fulfilled, (t, r) => {
      fc(t, r.payload, r.meta.requestId)
    })
    .addCase(Qn, (t, { payload: { facetId: r } }) => {
      xi(t, { facetId: r }, Ld)
    })
    .addCase(k.fulfilled, (t) => {
      mc(t, Ld)
    })
})
function Ld () {
  return { moreValuesAvailable: !1, values: [] }
}
var Th = O(pa(), (e) => {
  e.addCase(gc, (t, r) => {
    const a = r.payload
    uc(t, a, jd)
  })
    .addCase(zr, (t, r) => {
      lc(t, r.payload)
    })
    .addCase(Pt.pending, (t, r) => {
      const a = r.meta.arg
      dc(t, a, r.meta.requestId)
    })
    .addCase(Pt.rejected, (t, r) => {
      const a = r.meta.arg
      pc(t, a)
    })
    .addCase(Pt.fulfilled, (t, r) => {
      fc(t, r.payload, r.meta.requestId)
    })
    .addCase(Qn, (t, { payload: r }) => {
      xi(t, r, jd)
    })
    .addCase(k.fulfilled, (t) => {
      mc(t, jd)
    })
})
function jd () {
  return { moreValuesAvailable: !1, values: [] }
}
var kh = y('productlisting/setUrl', (e) => S(e, { url: new w({ required: !0, url: !0 }) }))
var Dh = y('productlisting/setAdditionalFields', (e) =>
  S(e, { additionalFields: new Y({ required: !0, each: new w({ required: !0, emptyAllowed: !1 }) }) })
)
var Wr = ee('productlisting/fetch', async (e, { getState: t, dispatch: r, rejectWithValue: a, extra: n }) => {
  const o = t()
  const { apiClient: i } = n
  const s = await i.getProducts(await ZF(o))
  return de(s) ? (r(Za(s.error)), a(s.error)) : { response: s.success }
})
var ZF = async (e) => {
  var a, n, o
  const t = tA(e)
  const r = await be(e.configuration.analytics)
  return {
    accessToken: e.configuration.accessToken,
    organizationId: e.configuration.organizationId,
    platformUrl: e.configuration.platformUrl,
    url: (a = e.productListing) == null ? void 0 : a.url,
    ...(e.configuration.analytics.enabled && r ? { clientId: r } : {}),
    ...(((n = e.productListing.additionalFields) == null ? void 0 : n.length)
      ? { additionalFields: e.productListing.additionalFields }
      : {}),
    ...(e.productListing.advancedParameters && eA(e.productListing.advancedParameters)
      ? { advancedParameters: e.productListing.advancedParameters || {} }
      : {}),
    ...(t.length && { facets: { requests: t } }),
    ...(e.pagination && {
      pagination: {
        numberOfValues: e.pagination.numberOfResults,
        page: Math.ceil(e.pagination.firstResult / (e.pagination.numberOfResults || 1)) + 1,
      },
    }),
    ...((((o = e.sort) == null ? void 0 : o.by) || Fa.Relevance) !== Fa.Relevance && { sort: e.sort }),
    ...(e.context && { userContext: e.context.contextValues }),
  }
}
function eA (e) {
  return e.debug
}
function tA (e) {
  var t
  return on(rA(e), (t = e.facetOrder) != null ? t : [])
}
function rA (e) {
  return [...Bd(e.facetSet), ...Bd(e.numericFacetSet), ...Bd(e.dateFacetSet), ...aA(e.categoryFacetSet)]
}
function aA (e) {
  return Object.values(e || {}).map((t) => t.request)
}
function Bd (e = {}) {
  return Object.keys(e).map((t) => e[t])
}
var Vh = O(St(), (e) => {
  e.addCase($r, (t, r) => {
    const { facetId: a } = r.payload
    a in t || (t[a] = nA(r.payload))
  })
    .addCase(ce.fulfilled, (t, r) => {
      if (!!r.payload && Object.keys(r.payload.facetSet).length !== 0) return r.payload.facetSet
    })
    .addCase(se, (t, r) => {
      const a = r.payload.f || {}
      Object.keys(t).forEach((o) => {
        const i = t[o]
        const s = a[o] || []
        const u = i.currentValues.filter((c) => !s.includes(c.value))
        ;(i.currentValues = [...s.map(Mh), ...u.map(iA)]),
        (i.preventAutoSelect = s.length > 0),
        (i.numberOfValues = Math.max(s.length, i.numberOfValues))
      })
    })
    .addCase(Kt, (t, r) => {
      const { facetId: a, selection: n } = r.payload
      const o = t[a]
      if (!o) return
      o.preventAutoSelect = !0
      const i = o.currentValues.find((u) => u.value === n.value)
      if (!i) {
        Nh(o, n)
        return
      }
      const s = i.state === 'selected'
      ;(i.state = s ? 'idle' : 'selected'), (o.freezeCurrentValues = !0)
    })
    .addCase(Hr, (t, r) => {
      const { facetId: a, freezeCurrentValues: n } = r.payload
      const o = t[a]
      !o || (o.freezeCurrentValues = n)
    })
    .addCase(Re, (t, r) => {
      const a = t[r.payload]
      kn(a)
    })
    .addCase(ct, (t) => {
      Object.keys(t).forEach((r) => {
        const a = t[r]
        kn(a)
      })
    })
    .addCase(qe, (t) => {
      Object.values(t)
        .filter((r) => r.hasBreadcrumbs)
        .forEach((r) => {
          const a = t[r.facetId]
          kn(a)
        })
    })
    .addCase(cn, (t) => {
      Object.values(t)
        .filter((r) => !r.hasBreadcrumbs)
        .forEach((r) => {
          const a = t[r.facetId]
          kn(a)
        })
    })
    .addCase(jt, (t, r) =>
      Object.keys(t).forEach((a) => {
        t[a].preventAutoSelect = !r.payload.allow
      })
    )
    .addCase(In, (t, r) => {
      Tn(t, r.payload)
    })
    .addCase(Ia, (t, r) => {
      const { facetId: a, numberOfValues: n } = r.payload
      cc(t[a], n)
    })
    .addCase(Ea, (t, r) => {
      const { facetId: a, isFieldExpanded: n } = r.payload
      const o = t[a]
      !o || (o.isFieldExpanded = n)
    })
    .addCase(k.fulfilled, (t, r) => {
      r.payload.response.facets.forEach((n) => Ud(t[n.facetId], n))
    })
    .addCase(Wr.fulfilled, (t, r) => {
      var n, o
      ;(((o = (n = r.payload.response) == null ? void 0 : n.facets) == null ? void 0 : o.results) || []).forEach((i) =>
        Ud(t[i.facetId], i)
      )
    })
    .addCase(Ye.fulfilled, (t, r) => {
      r.payload.response.facets.forEach((n) => Ud(t[n.facetId], n))
    })
    .addCase(Oa, (t, r) => {
      const { facetId: a, value: n } = r.payload
      const o = t[a]
      if (!o) return
      const { rawValue: i } = n
      const { currentValues: s } = o
      const u = s.find((l) => l.value === i)
      if (u) {
        u.state = 'selected'
        return
      }
      const c = Mh(i)
      Nh(o, c), (o.freezeCurrentValues = !0), (o.preventAutoSelect = !0)
    })
    .addCase(Se, (t, r) => {
      if (!(r.payload in t)) return
      const a = t[r.payload]
      kn(a)
    })
})
function Nh (e, t) {
  const { currentValues: r } = e
  const a = r.findIndex((s) => s.state === 'idle')
  const n = a === -1 ? r.length : a
  const o = r.slice(0, n)
  const i = r.slice(n + 1)
  ;(e.currentValues = [...o, t, ...i]), (e.numberOfValues = e.currentValues.length)
}
function Ud (e, t) {
  !e || ((e.currentValues = t.values.map(oA)), (e.freezeCurrentValues = !1), (e.preventAutoSelect = !1))
}
var _d = {
  delimitingCharacter: '>',
  filterFacetCount: !0,
  injectionDepth: 1e3,
  numberOfValues: 8,
  sortCriteria: 'automatic',
}
function nA (e) {
  return {
    ..._d,
    type: 'specific',
    currentValues: [],
    freezeCurrentValues: !1,
    isFieldExpanded: !1,
    preventAutoSelect: !1,
    hasBreadcrumbs: !0,
    ...e,
  }
}
function oA (e) {
  const { value: t, state: r } = e
  return { value: t, state: r }
}
function Mh (e) {
  return { value: e, state: 'selected' }
}
function iA (e) {
  return { ...e, state: 'idle' }
}
var yc = {
  filterFacetCount: !0,
  injectionDepth: 1e3,
  numberOfValues: 8,
  sortCriteria: 'ascending',
  rangeAlgorithm: 'even',
}
function Sc (e, t) {
  const { facetId: r } = t
  if (r in e) return
  const a = Qh(t)
  e[r] = { ...t, numberOfValues: a }
}
function Cc (e, t, r) {
  const a = e[t]
  !a || ((a.currentValues = r), (a.numberOfValues = Qh(a)))
}
function xc (e, t, r) {
  const a = e[t]
  if (!a) return
  const n = $d(a.currentValues, r)
  if (!n) return
  const o = n.state === 'selected'
  ;(n.state = o ? 'idle' : 'selected'), (a.preventAutoSelect = !0)
}
function rr (e, t) {
  const r = e[t]
  !r || r.currentValues.forEach((a) => (a.state = 'idle'))
}
function Rc (e, t) {
  Object.entries(e).forEach(([r, a]) => {
    const n = t[r] || []
    a.currentValues.forEach((s) => {
      const u = !!$d(n, s)
      return (s.state = u ? 'selected' : 'idle'), s
    })
    const o = n.filter((s) => !$d(a.currentValues, s))
    const i = a.currentValues
    i.push(...o), (a.numberOfValues = Math.max(a.numberOfValues, i.length))
  })
}
function vc (e, t, r) {
  t.forEach((a) => {
    const n = a.facetId
    const o = e[n]
    if (!o) return
    const i = r(a.values)
    ;(o.currentValues = i), (o.preventAutoSelect = !1)
  })
}
function $d (e, t) {
  const { start: r, end: a } = t
  return e.find((n) => n.start === r && n.end === a)
}
function Qh (e) {
  const { generateAutomaticRanges: t, currentValues: r, numberOfValues: a } = e
  return t ? Math.max(a, r.length) : r.length
}
var Lh = O(Ct(), (e) => {
  e.addCase(Gt, (t, r) => {
    const { payload: a } = r
    const n = sA(a)
    Sc(t, n)
  })
    .addCase(ce.fulfilled, (t, r) => {
      var a, n
      return (n = (a = r.payload) == null ? void 0 : a.dateFacetSet) != null ? n : t
    })
    .addCase(se, (t, r) => {
      const a = r.payload.df || {}
      Rc(t, a)
    })
    .addCase(Jt, (t, r) => {
      const { facetId: a, selection: n } = r.payload
      xc(t, a, n)
    })
    .addCase(hr, (t, r) => {
      const { facetId: a, values: n } = r.payload
      Cc(t, a, n)
    })
    .addCase(nc, (t, r) => {
      rr(t, r.payload)
    })
    .addCase(ct, (t) => {
      Object.keys(t).forEach((r) => {
        rr(t, r)
      })
    })
    .addCase(qe, (t) => {
      Object.keys(t).forEach((r) => {
        rr(t, r)
      })
    })
    .addCase(ac, (t, r) => {
      Tn(t, r.payload)
    })
    .addCase(k.fulfilled, (t, r) => {
      const a = r.payload.response.facets
      vc(t, a, cA)
    })
    .addCase(Se, (t, r) => {
      rr(t, r.payload)
    })
})
function sA (e) {
  return { ...yc, currentValues: [], preventAutoSelect: !1, type: 'dateRange', ...e }
}
function cA (e) {
  return e.map((t) => {
    const { numberOfResults: r, ...a } = t
    return a
  })
}
var jh = O(xt(), (e) => {
  e.addCase(Xt, (t, r) => {
    const { payload: a } = r
    const n = uA(a)
    Sc(t, n)
  })
    .addCase(ce.fulfilled, (t, r) => {
      var a, n
      return (n = (a = r.payload) == null ? void 0 : a.numericFacetSet) != null ? n : t
    })
    .addCase(se, (t, r) => {
      const a = r.payload.nf || {}
      Rc(t, a)
    })
    .addCase(Zt, (t, r) => {
      const { facetId: a, selection: n } = r.payload
      xc(t, a, n)
    })
    .addCase(yr, (t, r) => {
      const { facetId: a, values: n } = r.payload
      Cc(t, a, n)
    })
    .addCase(sc, (t, r) => {
      rr(t, r.payload)
    })
    .addCase(ct, (t) => {
      Object.keys(t).forEach((r) => {
        rr(t, r)
      })
    })
    .addCase(qe, (t) => {
      Object.keys(t).forEach((r) => {
        rr(t, r)
      })
    })
    .addCase(ic, (t, r) => {
      Tn(t, r.payload)
    })
    .addCase(k.fulfilled, (t, r) => {
      const a = r.payload.response.facets
      vc(t, a, lA)
    })
    .addCase(Se, (t, r) => {
      rr(t, r.payload)
    })
})
function uA (e) {
  return { ...yc, currentValues: [], preventAutoSelect: !1, type: 'numericalRange', ...e }
}
function lA (e) {
  return e.map((t) => {
    const { numberOfResults: r, ...a } = t
    return a
  })
}
var dA = new Y({ each: q, required: !0 })
var Yr = y('fields/registerFieldsToInclude', (e) => S(e, dA))
var Ln = y('fields/fetchall/enable')
var qa = y('fields/fetchall/disable')
var jn = ee('fields/fetchDescription', async (e, { extra: t, getState: r, rejectWithValue: a }) => {
  const n = r()
  const { accessToken: o, organizationId: i } = n.configuration
  const { apiBaseUrl: s } = n.configuration.search
  const u = await t.apiClient.fieldDescriptions({ accessToken: o, organizationId: i, url: s })
  return de(u) ? a(u.error) : u.success.fields
})
var Hd = {
  collectionField: new w({ emptyAllowed: !1, required: !1 }),
  parentField: new w({ emptyAllowed: !1, required: !1 }),
  childField: new w({ emptyAllowed: !1, required: !1 }),
  numberOfFoldedResults: new j({ min: 0, required: !1 }),
}
var Kr = y('folding/register', (e) => S(e, Hd))
var Gr = ee('folding/loadCollection', async (e, { getState: t, rejectWithValue: r, extra: { apiClient: a } }) => {
  const n = t()
  const o = await sn(n)
  const i = await a.search(
    {
      ...o,
      q: pA(n),
      enableQuerySyntax: !0,
      cq: `@${n.folding.fields.collection}=${e}`,
      filterField: n.folding.fields.collection,
      childField: n.folding.fields.parent,
      parentField: n.folding.fields.child,
      filterFieldRange: 100,
    },
    { origin: 'foldingCollection' }
  )
  return de(i)
    ? r(i.error)
    : { collectionId: e, results: i.success.results, rootResult: n.folding.collections[e].result }
})
function pA (e) {
  return e.query.q === '' ? '' : e.query.enableQuerySyntax ? `${e.query.q} OR @uri` : `( <@- ${e.query.q} -@> ) OR @uri`
}
var zd = (e) =>
  N('analytics/folding/showMore', D.Click, (t, r) => (Ue(e), t.logShowMoreFoldedResults(Be(e, r), We(e))))()
var Bh = N('analytics/folding/showLess', D.Custom, (e) => e.logShowLessFoldedResults())
var Uh = O(da(), (e) =>
  e
    .addCase(Yr, (t, r) => {
      t.fieldsToInclude = [...new Set(t.fieldsToInclude.concat(r.payload))]
    })
    .addCase(Ln, (t) => {
      t.fetchAllFields = !0
    })
    .addCase(qa, (t) => {
      t.fetchAllFields = !1
    })
    .addCase(jn.fulfilled, (t, { payload: r }) => {
      t.fieldsDescription = r
    })
    .addCase(Kr, (t, { payload: r }) => {
      var n, o, i
      const a = Ba().fields
      t.fieldsToInclude.push(
        (n = r.collectionField) != null ? n : a.collection,
        (o = r.parentField) != null ? o : a.parent,
        (i = r.childField) != null ? i : a.child
      )
    })
)
function fA (e, t) {
  return e.raw[t.collection]
}
function Wd (e, t) {
  return e.raw[t.parent]
}
function Ri (e, t) {
  const r = e.raw[t.child]
  return ds(r) ? r[0] : r
}
function mA (e, t) {
  return (e || t) !== void 0 && e === t
}
function _h (e, t, r, a = []) {
  const n = Ri(e, r)
  return n
    ? a.indexOf(n) !== -1
      ? []
      : t
        .filter((o) => {
          const i = Ri(o, r) === Ri(e, r)
          return Wd(o, r) === n && !i
        })
        .map((o) => ({ result: o, children: _h(o, t, r, [...a, n]) }))
    : []
}
function gA (e, t) {
  return e.find((r) => {
    const a = Wd(r, t) === void 0
    const n = mA(Wd(r, t), Ri(r, t))
    return a || n
  })
}
function $h (e) {
  return e.parentResult ? $h(e.parentResult) : e
}
function hA (e, t, r) {
  var o
  const a = gs(e)
  const n = (o = r != null ? r : gA(a, t)) != null ? o : $h(e)
  return { result: n, children: _h(n, a, t), moreResultsAvailable: !0, isLoadingMoreResults: !1 }
}
function Yd (e, t, r) {
  const a = {}
  return (
    e.forEach((n) => {
      const o = fA(n, t)
      !o || (!Ri(n, t) && !n.parentResult) || (a[o] = hA(n, t, r))
    }),
    a
  )
}
function Hh (e, t) {
  if (!e.collections[t]) {
    throw new Error(
      `Missing collection ${t} from ${Object.keys(e.collections)}: Folding most probably in an invalid state...`
    )
  }
  return e.collections[t]
}
var zh = O(Ba(), (e) =>
  e
    .addCase(k.fulfilled, (t, { payload: r }) => {
      t.collections = t.enabled ? Yd(r.response.results, t.fields) : {}
    })
    .addCase(Ut.fulfilled, (t, { payload: r }) => {
      t.collections = t.enabled ? { ...t.collections, ...Yd(r.response.results, t.fields) } : {}
    })
    .addCase(Kr, (t, { payload: r }) => {
      var a, n, o, i
      return t.enabled
        ? t
        : {
          enabled: !0,
          collections: {},
          fields: {
            collection: (a = r.collectionField) != null ? a : t.fields.collection,
            parent: (n = r.parentField) != null ? n : t.fields.parent,
            child: (o = r.childField) != null ? o : t.fields.child,
          },
          filterFieldRange: (i = r.numberOfFoldedResults) != null ? i : t.filterFieldRange,
        }
    })
    .addCase(Gr.pending, (t, { meta: r }) => {
      const a = r.arg
      Hh(t, a).isLoadingMoreResults = !0
    })
    .addCase(Gr.rejected, (t, { meta: r }) => {
      const a = r.arg
      Hh(t, a).isLoadingMoreResults = !1
    })
    .addCase(Gr.fulfilled, (t, { payload: { collectionId: r, results: a, rootResult: n } }) => {
      const o = Yd(a, t.fields, n)
      if (!o || !o[r]) {
        throw new Error(
          `Unable to create collection ${r} from received results: ${JSON.stringify(
            a
          )}. Folding most probably in an invalid state... `
        )
      }
      ;(t.collections[r] = o[r]), (t.collections[r].moreResultsAvailable = !1)
    })
)
var Kh = ve(Yh())
function Ta (e, t, r = (a, n) => a === n) {
  return e.length === t.length && e.findIndex((a, n) => !r(t[n], a)) === -1
}
var Fc = (0, Kh.createCustomEqual)(
  (e) => (t, r) =>
    Array.isArray(t) && Array.isArray(r)
      ? t.length !== r.length
        ? !1
        : t.every((a) => r.findIndex((n) => e(a, n)) !== -1)
      : e(t, r)
)
var Gh = O(Qi(), (e) => {
  e.addCase(Nr, (t, r) => (yA(t, r.payload) ? void 0 : r.payload))
})
var yA = (e, t) =>
  SA(e.context, t.context) &&
  CA(e.dictionaryFieldContext, t.dictionaryFieldContext) &&
  AA(e.advancedSearchQueries, t.advancedSearchQueries) &&
  xA(e.tabSet, t.tabSet) &&
  RA(e.staticFilterSet, t.staticFilterSet) &&
  Kd(e.facetSet, t.facetSet) &&
  Kd(e.dateFacetSet, t.dateFacetSet) &&
  Kd(e.numericFacetSet, t.numericFacetSet) &&
  vA(e.categoryFacetSet, t.categoryFacetSet) &&
  bA(e.pagination, t.pagination) &&
  FA(e.query, t.query) &&
  PA(e, t) &&
  IA(e.pipeline, t.pipeline) &&
  EA(e.searchHub, t.searchHub) &&
  wA(e.facetOrder, t.facetOrder) &&
  OA(e.debug, t.debug)
var SA = (e, t) => JSON.stringify(e.contextValues) === JSON.stringify(t.contextValues)
var CA = (e, t) => JSON.stringify(e.contextValues) === JSON.stringify(t.contextValues)
var xA = (e, t) => {
  const r = Jh(e)
  const a = Jh(t)
  return (r == null ? void 0 : r.id) === (a == null ? void 0 : a.id)
}
var Jh = (e) => Object.values(e).find((t) => t.isActive)
var RA = (e, t) => {
  for (const [r, a] of Object.entries(t)) {
    if (!e[r]) return !1
    const n = Xh(e[r])
    const o = Xh(a)
    if (JSON.stringify(n) !== JSON.stringify(o)) return !1
  }
  return !0
}
var Xh = (e) => e.values.filter((t) => t.state !== 'idle')
var Kd = (e, t) => {
  for (const [r, a] of Object.entries(t)) {
    if (!e[r]) return !1
    const n = e[r].currentValues.filter((i) => i.state === 'selected')
    const o = a.currentValues.filter((i) => i.state === 'selected')
    if (JSON.stringify(n) !== JSON.stringify(o)) return !1
  }
  return !0
}
var vA = (e, t) => {
  var r
  for (const [a, n] of Object.entries(t)) {
    if (!e[a]) return !1
    const o = ot((r = e[a]) == null ? void 0 : r.request.currentValues).parents.map(({ value: s }) => s)
    const i = ot(n == null ? void 0 : n.request.currentValues).parents.map(({ value: s }) => s)
    if (JSON.stringify(o) !== JSON.stringify(i)) return !1
  }
  return !0
}
var bA = (e, t) => e.firstResult === t.firstResult && e.numberOfResults === t.numberOfResults
var FA = (e, t) => JSON.stringify(e) === JSON.stringify(t)
var AA = (e, t) => JSON.stringify(e) === JSON.stringify(t)
var PA = (e, t) => e.sortCriteria === t.sortCriteria
var IA = (e, t) => e === t
var EA = (e, t) => e === t
var wA = (e, t) => Ta(e, t)
var OA = (e, t) => e === t
var Zh = O(Ve(), (e) => {
  e.addCase(en, (t, r) => {
    const a = Gd(t)
    const n = r.payload
    ;(t.defaultNumberOfResults = t.numberOfResults = n), (t.firstResult = vi(a, n))
  })
    .addCase(tn, (t, r) => {
      ;(t.numberOfResults = r.payload), (t.firstResult = 0)
    })
    .addCase(rn, (t, r) => {
      const a = r.payload
      t.firstResult = vi(a, t.numberOfResults)
    })
    .addCase(Lt, (t, r) => {
      const a = r.payload
      t.firstResult = vi(a, t.numberOfResults)
    })
    .addCase(nn, (t) => {
      const r = Gd(t)
      const a = Math.max(r - 1, Ra)
      t.firstResult = vi(a, t.numberOfResults)
    })
    .addCase(an, (t) => {
      const r = Gd(t)
      const a = qA(t)
      const n = Math.min(r + 1, a)
      t.firstResult = vi(n, t.numberOfResults)
    })
    .addCase(ce.fulfilled, (t, r) => {
      r.payload &&
        ((t.numberOfResults = r.payload.pagination.numberOfResults), (t.firstResult = r.payload.pagination.firstResult))
    })
    .addCase(se, (t, r) => {
      var a, n
      ;(t.firstResult = (a = r.payload.firstResult) != null ? a : t.firstResult),
      (t.numberOfResults = (n = r.payload.numberOfResults) != null ? n : t.defaultNumberOfResults)
    })
    .addCase(k.fulfilled, (t, r) => {
      const { response: a } = r.payload
      t.totalCountFiltered = a.totalCountFiltered
    })
    .addCase(Wr.fulfilled, (t, r) => {
      const { response: a } = r.payload
      t.totalCountFiltered = a.pagination.totalCount
    })
    .addCase(Re, (t) => {
      dt(t)
    })
    .addCase(Kt, (t) => {
      dt(t)
    })
    .addCase($t, (t) => {
      dt(t)
    })
    .addCase(_r, (t) => {
      dt(t)
    })
    .addCase(Dn, (t) => {
      dt(t)
    })
    .addCase(Jt, (t) => {
      dt(t)
    })
    .addCase(Zt, (t) => {
      dt(t)
    })
    .addCase(ct, (t) => {
      dt(t)
    })
    .addCase(qe, (t) => {
      dt(t)
    })
    .addCase(hr, (t) => {
      dt(t)
    })
    .addCase(yr, (t) => {
      dt(t)
    })
    .addCase(Oa, (t) => {
      dt(t)
    })
})
function dt (e) {
  e.firstResult = Ve().firstResult
}
function Gd (e) {
  const { firstResult: t, numberOfResults: r } = e
  return Jd(t, r)
}
function qA (e) {
  const { totalCountFiltered: t, numberOfResults: r } = e
  return Xd(t, r)
}
function vi (e, t) {
  return (e - 1) * t
}
function Jd (e, t) {
  return Math.round(e / t) + 1
}
function Xd (e, t) {
  const r = Math.min(e, pi)
  return Math.ceil(r / t)
}
var Bn = y('pipeline/set', (e) => S(e, new w({ required: !0, emptyAllowed: !0 })))
var ey = O(rt(), (e) => {
  e.addCase(Bn, (t, r) => r.payload)
    .addCase(ce.fulfilled, (t, r) => {
      var a, n
      return (n = (a = r.payload) == null ? void 0 : a.pipeline) != null ? n : t
    })
    .addCase(lt, (t, r) => r.payload.pipeline || t)
})
O(Ga(), (e) => {
  e.addCase(kh, (t, r) => {
    t.url = r.payload.url
  })
    .addCase(Dh, (t, r) => {
      t.additionalFields = r.payload.additionalFields
    })
    .addCase(Wr.rejected, (t, r) => {
      ;(t.error = r.payload ? r.payload : null), (t.isLoading = !1)
    })
    .addCase(Wr.fulfilled, (t, r) => {
      ;(t.error = null),
      (t.facets = r.payload.response.facets),
      (t.products = r.payload.response.products),
      (t.responseId = r.payload.response.responseId),
      (t.isLoading = !1)
    })
    .addCase(Wr.pending, (t) => {
      t.isLoading = !0
    })
})
O(fn(), (e) => {
  e.addCase(wg, (t, r) => {
    t.id = r.payload.id
  })
    .addCase(Og, (t, r) => {
      t.skus = r.payload.skus
    })
    .addCase(qg, (t, r) => {
      t.filter.brand = r.payload.brand
    })
    .addCase(Tg, (t, r) => {
      t.filter.category = r.payload.category
    })
    .addCase(Dg, (t, r) => {
      t.maxNumberOfRecommendations = r.payload.number
    })
    .addCase(kg, (t, r) => {
      t.additionalFields = r.payload.additionalFields
    })
    .addCase(mn.rejected, (t, r) => {
      ;(t.error = r.payload ? r.payload : null), (t.isLoading = !1)
    })
    .addCase(mn.fulfilled, (t, r) => {
      ;(t.error = null),
      (t.searchUid = r.payload.searchUid),
      (t.recommendations = r.payload.recommendations),
      (t.isLoading = !1)
    })
    .addCase(mn.pending, (t) => {
      t.isLoading = !0
    })
})
var ty = { id: q, query: oe }
var Un = y('querySet/register', (e) => S(e, ty))
var Sr = y('querySet/update', (e) => S(e, ty))
var bi = { id: q }
var _n = y('querySuggest/register', (e) => S(e, { ...bi, q: new w(), count: new j({ min: 0 }) }))
var ry = y('querySuggest/unregister', (e) => S(e, bi))
var pt = y('querySuggest/selectSuggestion', (e) => S(e, { ...bi, expression: oe }))
var Jr = y('querySuggest/clear', (e) => S(e, bi))
var Xr = ee(
  'querySuggest/fetch',
  async (e, { getState: t, rejectWithValue: r, extra: { apiClient: a, validatePayload: n } }) => {
    n(e, bi)
    const o = e.id
    const i = await DA(o, t())
    const s = await a.querySuggest(i)
    return de(s) ? r(s.error) : { id: o, q: i.q, ...s.success }
  }
)
var DA = async (e, t) => {
  var r
  return {
    accessToken: t.configuration.accessToken,
    organizationId: t.configuration.organizationId,
    url: t.configuration.search.apiBaseUrl,
    count: t.querySuggest[e].count,
    q: (r = t.querySet) == null ? void 0 : r[e],
    locale: t.configuration.search.locale,
    timezone: t.configuration.search.timezone,
    actionsHistory: t.configuration.analytics.enabled ? bt.getHistory() : [],
    ...(t.context && { context: t.context.contextValues }),
    ...(t.pipeline && { pipeline: t.pipeline }),
    ...(t.searchHub && { searchHub: t.searchHub }),
    ...(t.configuration.analytics.enabled && {
      visitorId: await be(t.configuration.analytics),
      ...(t.configuration.analytics.enabled && (await Dr(t.configuration.analytics))),
    }),
    ...(t.configuration.search.authenticationProviders.length && {
      authentication: t.configuration.search.authenticationProviders.join(','),
    }),
  }
}
var ay = O(la(), (e) => {
  e.addCase(Un, (t, r) => {
    const { id: a, query: n } = r.payload
    a in t || (t[a] = n)
  })
    .addCase(Sr, (t, r) => {
      const { id: a, query: n } = r.payload
      Zd(t, a, n)
    })
    .addCase(pt, (t, r) => {
      const { id: a, expression: n } = r.payload
      Zd(t, a, n)
    })
    .addCase(k.fulfilled, (t, r) => {
      const { queryExecuted: a } = r.payload
      ny(t, a)
    })
    .addCase(se, (t, r) => {
      ae(r.payload.q) || ny(t, r.payload.q)
    })
    .addCase(ce.fulfilled, (t, r) => {
      if (r.payload) for (const [a, n] of Object.entries(r.payload.querySet)) Zd(t, a, n)
    })
})
function ny (e, t) {
  Object.keys(e).forEach((r) => (e[r] = t))
}
var Zd = (e, t, r) => {
  t in e && (e[t] = r)
}
var oy = O(Td(), (e) =>
  e
    .addCase(_n, (t, r) => {
      const a = r.payload.id
      a in t || (t[a] = VA(r.payload))
    })
    .addCase(ry, (t, r) => {
      delete t[r.payload.id]
    })
    .addCase(Xr.pending, (t, r) => {
      const a = t[r.meta.arg.id]
      !a || ((a.currentRequestId = r.meta.requestId), (a.isLoading = !0))
    })
    .addCase(Xr.fulfilled, (t, r) => {
      const a = t[r.meta.arg.id]
      if (!a || r.meta.requestId !== a.currentRequestId) return
      const { q: n } = r.payload
      n && a.partialQueries.push(n.replace(/;/, encodeURIComponent(';'))),
      (a.responseId = r.payload.responseId),
      (a.completions = r.payload.completions),
      (a.isLoading = !1),
      (a.error = null)
    })
    .addCase(Xr.rejected, (t, r) => {
      const a = t[r.meta.arg.id]
      !a || ((a.error = r.payload || null), (a.isLoading = !1))
    })
    .addCase(Sr, (t, r) => {
      const { id: a, query: n } = r.payload
      a in t && iy(t[a], n)
    })
    .addCase(Jr, (t, r) => {
      const a = t[r.payload.id]
      !a || ((a.responseId = ''), (a.completions = []), (a.partialQueries = []))
    })
    .addCase(pt, (t, r) => {
      const { id: a, expression: n } = r.payload
      const o = t[a]
      !o || (o.q = n)
    })
    .addCase(se, (t, r) => {
      ae(r.payload.q) || sy(t, r.payload.q)
    })
    .addCase(k.fulfilled, (t, r) => {
      const { queryExecuted: a } = r.payload
      sy(t, a)
    })
)
function iy (e, t) {
  e.q = t
}
function sy (e, t) {
  Object.keys(e).forEach((r) => iy(e[r], t))
}
function VA (e) {
  return {
    id: '',
    completions: [],
    responseId: '',
    count: 5,
    q: '',
    currentRequestId: '',
    error: null,
    partialQueries: [],
    isLoading: !1,
    ...e,
  }
}
var cy = O(ye(), (e) =>
  e
    .addCase(it, (t, r) => ({ ...t, ...r.payload }))
    .addCase(Bt, (t, r) => {
      t.q = r.payload
    })
    .addCase(pt, (t, r) => {
      t.q = r.payload.expression
    })
    .addCase(ce.fulfilled, (t, r) => {
      var a, n
      return (n = (a = r.payload) == null ? void 0 : a.query) != null ? n : t
    })
    .addCase(se, (t, r) => {
      var a, n
      ;(t.q = (a = r.payload.q) != null ? a : t.q),
      (t.enableQuerySyntax = (n = r.payload.enableQuerySyntax) != null ? n : t.enableQuerySyntax)
    })
)
var NA = () =>
  new Q({
    values: { documentId: new Q({ values: { contentIdKey: q, contentIdValue: q } }) },
    options: { required: !0 },
  })
var Ac = () => new Q({ values: { questionAnswerId: q }, options: { required: !0 } })
var ep = () => new Q({ values: { linkText: oe, linkURL: oe }, options: { required: !0 } })
function $n (e) {
  return !('contentIdKey' in e || 'contentIdValue' in e)
}
function Hn (e) {
  return $n(e) ? S(e, Ac()) : S(e, NA())
}
var zn = y('smartSnippet/expand')
var Wn = y('smartSnippet/collapse')
var Yn = y('smartSnippet/like')
var Kn = y('smartSnippet/dislike')
var Gn = y('smartSnippet/feedbackModal/open')
var Zr = y('smartSnippet/feedbackModal/close')
var Jn = y('smartSnippet/related/expand', (e) => Hn(e))
var Xn = y('smartSnippet/related/collapse', (e) => Hn(e))
var uy = (e, t) =>
  e.findIndex((r) =>
    $n(t)
      ? r.questionAnswerId === t.questionAnswerId
      : r.contentIdValue === t.contentIdValue && r.contentIdKey === t.contentIdKey
  )
function ly ({ question: e, answerSnippet: t, documentId: { contentIdKey: r, contentIdValue: a } }) {
  return ms({ question: e, answerSnippet: t, contentIdKey: r, contentIdValue: a })
}
function MA (e, t) {
  const r = ly(e)
  return t && r === t.questionAnswerId
    ? t
    : {
      contentIdKey: e.documentId.contentIdKey,
      contentIdValue: e.documentId.contentIdValue,
      expanded: !1,
      questionAnswerId: r,
    }
}
var dy = O(ko(), (e) =>
  e
    .addCase(zn, (t) => {
      t.expanded = !0
    })
    .addCase(Wn, (t) => {
      t.expanded = !1
    })
    .addCase(Yn, (t) => {
      ;(t.liked = !0), (t.disliked = !1), (t.feedbackModalOpen = !1)
    })
    .addCase(Kn, (t) => {
      ;(t.liked = !1), (t.disliked = !0)
    })
    .addCase(Gn, (t) => {
      t.feedbackModalOpen = !0
    })
    .addCase(Zr, (t) => {
      t.feedbackModalOpen = !1
    })
    .addCase(k.fulfilled, (t, r) => {
      const a = r.payload.response.questionAnswer.relatedQuestions.map((o, i) => MA(o, t.relatedQuestions[i]))
      const n = ly(r.payload.response.questionAnswer)
      return t.questionAnswerId === n
        ? { ...t, relatedQuestions: a }
        : { ...ko(), relatedQuestions: a, questionAnswerId: n }
    })
    .addCase(Jn, (t, r) => {
      const a = uy(t.relatedQuestions, r.payload)
      a !== -1 && (t.relatedQuestions[a].expanded = !0)
    })
    .addCase(Xn, (t, r) => {
      const a = uy(t.relatedQuestions, r.payload)
      a !== -1 && (t.relatedQuestions[a].expanded = !1)
    })
)
var QA = {
  results: new Y({ required: !0, each: new Q({ values: si }) }),
  maxLength: new j({ required: !0, min: 1, default: 10 }),
}
var Zn = y('recentResults/registerRecentResults', (e) => S(e, QA))
var ar = y('recentResults/pushRecentResult', (e) => (Ue(e), { payload: e }))
var eo = y('recentResults/clearRecentResults')
O(Bi(), (e) => {
  e.addCase(Zn, (t, r) => {
    ;(t.results = r.payload.results.slice(0, r.payload.maxLength)), (t.maxLength = r.payload.maxLength)
  })
    .addCase(eo, (t) => {
      t.results = []
    })
    .addCase(ar, (t, r) => {
      const a = r.payload
      t.results = t.results.filter((o) => o.uniqueId !== a.uniqueId)
      const n = t.results.slice(0, t.maxLength - 1)
      t.results = [a, ...n]
    })
})
var LA = {
  queries: new Y({ required: !0, each: new w({ emptyAllowed: !1 }) }),
  maxLength: new j({ required: !0, min: 1, default: 10 }),
}
var to = y('recentQueries/registerRecentQueries', (e) => S(e, LA))
var ro = y('recentQueries/clearRecentQueries')
var fy = O(Ui(), (e) => {
  e.addCase(to, (t, r) => {
    ;(t.queries = r.payload.queries.slice(0, r.payload.maxLength)), (t.maxLength = r.payload.maxLength)
  })
    .addCase(ro, (t) => {
      t.queries = []
    })
    .addCase(k.fulfilled, (t, r) => {
      const a = r.payload.queryExecuted.trim()
      const n = r.payload.response.results
      if (!a.length || !n.length) return
      t.queries = t.queries.filter((i) => i !== a)
      const o = t.queries.slice(0, t.maxLength - 1)
      t.queries = [a, ...o]
    })
})
O(kr(), (e) => {
  e.addCase(ig, (t, r) => {
    t.id = r.payload.id
  })
    .addCase(Xa.rejected, (t, r) => {
      ;(t.error = r.payload ? r.payload : null), (t.isLoading = !1)
    })
    .addCase(Xa.fulfilled, (t, r) => {
      ;(t.error = null),
      (t.recommendations = r.payload.recommendations),
      (t.duration = r.payload.duration),
      (t.isLoading = !1),
      (t.searchUid = r.payload.searchUid),
      (t.splitTestRun = r.payload.splitTestRun),
      (t.pipeline = r.payload.pipeline)
    })
    .addCase(Xa.pending, (t) => {
      t.isLoading = !0
    })
})
function my (e) {
  return e.type === 'redirect'
}
var Fi = class {
  constructor (t) {
    this.response = t
  }

  get basicExpression () {
    return this.response.parsedInput.basicExpression
  }

  get largeExpression () {
    return this.response.parsedInput.largeExpression
  }

  get redirectionUrl () {
    const t = this.response.preprocessingOutput.triggers.filter(my)
    return t.length ? t[0].content : null
  }
}
var gy = N('analytics/redirection', D.Search, (e, t) => {
  var r
  if ((r = t.redirection) == null ? void 0 : r.redirectTo) {
    return e.logTriggerRedirect({ redirectedTo: t.redirection.redirectTo })
  }
})
var ao = y('standaloneSearchBox/register', (e) => S(e, { id: q, redirectionUrl: q }))
var no = y('standaloneSearchBox/reset', (e) => S(e, { id: q }))
var oo = y('standaloneSearchBox/updateAnalyticsToSearchFromLink', (e) => S(e, { id: q }))
var io = y('standaloneSearchBox/updateAnalyticsToOmniboxFromLink')
var ea = ee(
  'standaloneSearchBox/fetchRedirect',
  async (e, { dispatch: t, getState: r, rejectWithValue: a, extra: { apiClient: n, validatePayload: o } }) => {
    o(e, { id: new w({ emptyAllowed: !1 }) })
    const i = await tp(r())
    const s = await n.plan(i)
    if (de(s)) return a(s.error)
    const { redirectionUrl: u } = new Fi(s.success)
    return u && t(BA(u)), u || ''
  }
)
var BA = (e) =>
  N('analytics/standaloneSearchBox/redirect', D.Custom, (t) => t.logTriggerRedirect({ redirectedTo: e }))()
var tp = async (e) => ({
  accessToken: e.configuration.accessToken,
  organizationId: e.configuration.organizationId,
  url: e.configuration.search.apiBaseUrl,
  locale: e.configuration.search.locale,
  timezone: e.configuration.search.timezone,
  q: e.query.q,
  ...(e.context && { context: e.context.contextValues }),
  ...(e.pipeline && { pipeline: e.pipeline }),
  ...(e.searchHub && { searchHub: e.searchHub }),
  ...(e.configuration.analytics.enabled && { visitorId: await be(e.configuration.analytics) }),
  ...(e.configuration.analytics.enabled && (await Dr(e.configuration.analytics))),
  ...(e.configuration.search.authenticationProviders.length && {
    authentication: e.configuration.search.authenticationProviders.join(','),
  }),
})
var Pc = ee(
  'redirection/check',
  async (e, { dispatch: t, getState: r, rejectWithValue: a, extra: { apiClient: n, validatePayload: o } }) => {
    o(e, { defaultRedirectionUrl: new w({ emptyAllowed: !1 }) })
    const i = await n.plan(await tp(r()))
    if (de(i)) return a(i.error)
    const s = new Fi(i.success).redirectionUrl
    return s && t(gy()), s || e.defaultRedirectionUrl
  }
)
O(Di(), (e) =>
  e.addCase(Pc.fulfilled, (t, r) => {
    t.redirectTo = r.payload
  })
)
async function yy (e, t) {
  var s
  const { search: r, accessToken: a, organizationId: n, analytics: o } = e.configuration
  const i = ((s = e.query) == null ? void 0 : s.q) || ''
  return {
    url: r.apiBaseUrl,
    accessToken: a,
    organizationId: n,
    enableNavigation: !1,
    ...(o.enabled && { visitorId: await be(e.configuration.analytics) }),
    q: i,
    ...t,
    requestedOutputSize: t.requestedOutputSize || 0,
    ...(r.authenticationProviders.length && { authentication: r.authenticationProviders.join(',') }),
  }
}
var Ai = ee('resultPreview/fetchResultContent', async (e, { extra: t, getState: r, rejectWithValue: a }) => {
  const n = r()
  const o = await yy(n, e)
  const i = await t.apiClient.html(o)
  return de(i) ? a(i.error) : { content: i.success, uniqueId: e.uniqueId }
})
O(ga(), (e) => {
  e.addCase(Ai.pending, (t) => {
    t.isLoading = !0
  }).addCase(Ai.fulfilled, (t, r) => {
    const { content: a, uniqueId: n } = r.payload
    ;(t.content = a), (t.uniqueId = n), (t.isLoading = !1)
  })
})
var ta = y('searchHub/set', (e) => S(e, new w({ required: !0, emptyAllowed: !0 })))
var Cy = O(we(), (e) => {
  e.addCase(ta, (t, r) => r.payload)
    .addCase(ce.fulfilled, (t, r) => {
      var a, n
      return (n = (a = r.payload) == null ? void 0 : a.searchHub) != null ? n : t
    })
    .addCase(lt, (t, r) => r.payload.searchHub || t)
})
function rp (e, t) {
  var a
  const r = (a = t.payload) != null ? a : null
  r && ((e.response = Ee().response), (e.results = [])), (e.error = r), (e.isLoading = !1)
}
function ap (e, t) {
  ;(e.error = null),
  (e.response = t.payload.response),
  (e.queryExecuted = t.payload.queryExecuted),
  (e.duration = t.payload.duration),
  (e.isLoading = !1)
}
function np (e, t) {
  ;(e.isLoading = !0), (e.requestId = t.meta.requestId)
}
var xy = O(Ee(), (e) => {
  e.addCase(k.rejected, (t, r) => rp(t, r)),
  e.addCase(Ut.rejected, (t, r) => rp(t, r)),
  e.addCase(ut.rejected, (t, r) => rp(t, r)),
  e.addCase(k.fulfilled, (t, r) => {
    ap(t, r), (t.results = r.payload.response.results), (t.searchResponseId = r.payload.response.searchUid)
  }),
  e.addCase(Ut.fulfilled, (t, r) => {
    ap(t, r), (t.results = [...t.results, ...r.payload.response.results])
  }),
  e.addCase(ut.fulfilled, (t, r) => {
    ap(t, r), (t.results = r.payload.response.results)
  }),
  e.addCase(Ye.fulfilled, (t, r) => {
    ;(t.response.facets = r.payload.response.facets), (t.response.searchUid = r.payload.response.searchUid)
  }),
  e.addCase(k.pending, np),
  e.addCase(Ut.pending, np),
  e.addCase(ut.pending, np)
})
var Ry = { by: new Ot({ enum: qt, required: !0 }) }
var so = y('sortCriteria/register', (e) => vy(e))
var co = y('sortCriteria/update', (e) => vy(e))
var vy = (e) => (Ma(e) ? (e.forEach((t) => S(t, Ry)), { payload: e }) : S(e, Ry))
var by = O(Ke(), (e) => {
  e.addCase(so, (t, r) => ur(r.payload))
    .addCase(co, (t, r) => ur(r.payload))
    .addCase(ce.fulfilled, (t, r) => {
      var a, n
      return (n = (a = r.payload) == null ? void 0 : a.sortCriteria) != null ? n : t
    })
    .addCase(se, (t, r) => {
      var a
      return (a = r.payload.sortCriteria) != null ? a : t
    })
})
var Fy = O(ji(), (e) =>
  e
    .addCase(ao, (t, r) => {
      const { id: a, redirectionUrl: n } = r.payload
      a in t || (t[a] = Ay(n))
    })
    .addCase(no, (t, r) => {
      const { id: a } = r.payload
      const n = t[a]
      if (n) {
        t[a] = Ay(n.defaultRedirectionUrl)
      }
    })
    .addCase(ea.pending, (t, r) => {
      const a = t[r.meta.arg.id]
      !a || (a.isLoading = !0)
    })
    .addCase(ea.fulfilled, (t, r) => {
      const a = r.payload
      const n = t[r.meta.arg.id]
      !n || ((n.redirectTo = a || n.defaultRedirectionUrl), (n.isLoading = !1))
    })
    .addCase(ea.rejected, (t, r) => {
      const a = t[r.meta.arg.id]
      !a || (a.isLoading = !1)
    })
    .addCase(oo, (t, r) => {
      const a = t[r.payload.id]
      !a || (a.analytics.cause = 'searchFromLink')
    })
    .addCase(io, (t, r) => {
      const a = t[r.payload.id]
      !a || ((a.analytics.cause = 'omniboxFromLink'), (a.analytics.metadata = r.payload.metadata))
    })
)
function Ay (e) {
  return { defaultRedirectionUrl: e, redirectTo: '', isLoading: !1, analytics: { cause: '', metadata: null } }
}
var Py = O(Li(), (e) =>
  e
    .addCase(k.pending, (t) => {
      ;(t.query = ''),
      (t.queryModification = { originalQuery: '', newQuery: '', queryToIgnore: t.queryModification.queryToIgnore })
    })
    .addCase(k.fulfilled, (t, r) => {
      var s, u, c
      const a = []
      const o = []
      const i = []
      r.payload.response.triggers.forEach((l) => {
        switch (l.type) {
          case 'redirect':
            a.push(l.content)
            break
          case 'query':
            break
          case 'execute':
            o.push({ functionName: l.content.name, params: l.content.params })
            break
          case 'notify':
            i.push(l.content)
            break
        }
      }),
      (t.redirectTo = (s = a[0]) != null ? s : ''),
      (t.query = t.queryModification.newQuery),
      (t.execute = (u = o[0]) != null ? u : { functionName: '', params: [] }),
      (t.executions = o),
      (t.notification = (c = i[0]) != null ? c : ''),
      (t.notifications = i)
    })
    .addCase(qs, (t, r) => {
      t.queryModification = { ...r.payload, queryToIgnore: '' }
    })
    .addCase(pn, (t, r) => {
      t.queryModification.queryToIgnore = r.payload
    })
)
var UA = { by: new Ot({ enum: Fa, required: !0 }) }
var Iy = y('sort/register', (e) => wy(e))
var Ey = y('sort/update', (e) => wy(e))
var wy = (e) => S(e, UA)
O(Bs(), (e) => {
  e.addCase(Iy, (t, r) => r.payload).addCase(Ey, (t, r) => r.payload)
})
var uo = y('dictionaryFieldContext/set', (e) => {
  const t = new Q({ options: { required: !0 } })
  const r = S(e, t).error
  if (r) return { payload: e, error: r }
  const a = Object.values(e)
  const n = new Y({ each: oe })
  const o = S(a, n).error
  return o ? { payload: e, error: o } : { payload: e }
})
var lo = y('dictionaryFieldContext/add', (e) => {
  const t = new Q({ options: { required: !0 }, values: { field: oe, key: oe } })
  return S(e, t)
})
var po = y('dictionaryFieldContext/remove', (e) => S(e, oe))
O(Tt(), (e) => {
  e.addCase(uo, (t, r) => {
    t.contextValues = r.payload
  })
    .addCase(lo, (t, r) => {
      const { field: a, key: n } = r.payload
      t.contextValues[a] = n
    })
    .addCase(po, (t, r) => {
      delete t.contextValues[r.payload]
    })
    .addCase(ce.fulfilled, (t, r) => {
      !r.payload || (t.contextValues = r.payload.dictionaryFieldContext.contextValues)
    })
})
O(ma(), (e) => {
  e.addCase(Xs, (t, r) => {
    const a = r.payload
    const { id: n } = a
    n in t || (t[n] = { ...a, isActive: !1 })
  })
    .addCase(Aa, (t, r) => {
      const a = r.payload
      Ty(t, a)
    })
    .addCase(se, (t, r) => {
      const a = r.payload.tab || ''
      Ty(t, a)
    })
})
function Ty (e, t) {
  t in e &&
    Object.keys(e).forEach((a) => {
      e[a].isActive = a === t
    })
}
var fo = q
var op = new Q({
  options: { required: !0 },
  values: { caption: oe, expression: oe, state: new w({ constrainTo: ['idle', 'selected'] }) },
})
var Ic = new Y({ required: !0, each: op })
var mo = y('staticFilter/register', (e) => S(e, { id: fo, values: Ic }))
var Cr = y('staticFilter/toggleSelect', (e) => S(e, { id: fo, value: op }))
var ka = y('staticFilter/deselectAllFilterValues', (e) => S(e, fo))
var go = (e) => N('analytics/staticFilter/deselect', D.Search, (t) => t.logStaticFilterDeselect(e))()
O(fa(), (e) =>
  e
    .addCase(mo, (t, r) => {
      const a = r.payload
      const { id: n } = a
      n in t || (t[n] = a)
    })
    .addCase(Cr, (t, r) => {
      const { id: a, value: n } = r.payload
      const o = t[a]
      if (!o) return
      const i = o.values.find((u) => u.caption === n.caption)
      if (!i) return
      const s = i.state === 'selected'
      i.state = s ? 'idle' : 'selected'
    })
    .addCase(ka, (t, r) => {
      const a = r.payload
      const n = t[a]
      !n || n.values.forEach((o) => (o.state = 'idle'))
    })
    .addCase(qe, (t) => {
      Object.values(t).forEach((r) => {
        r.values.forEach((a) => (a.state = 'idle'))
      })
    })
    .addCase(se, (t, r) => {
      const a = r.payload.sf || {}
      Object.entries(t).forEach(([n, o]) => {
        const i = a[n] || []
        o.values.forEach((s) => {
          s.state = i.includes(s.caption) ? 'selected' : 'idle'
        })
      })
    })
)
var Dy = y('caseAssistConfiguration/set', (e) => S(e, { caseAssistId: q, locale: ue }))
O(Us(), (e) => {
  e.addCase(Dy, (t, r) => {
    ;(t.caseAssistId = r.payload.caseAssistId), (t.locale = r.payload.locale)
  })
})
var Vy = y('caseAssist/caseInput/update', (e) => S(e, { fieldName: q, fieldValue: oe }))
O($s(), (e) => {
  e.addCase(Vy, (t, r) => {
    t[r.payload.fieldName] = { value: r.payload.fieldValue }
  })
})
var Oc = (e) =>
  Object.keys(e)
    .filter((t) => e[t].value !== '')
    .reduce((t, r) => ({ ...t, [r]: e[r].value }), {})
var Ny = y('caseAssist/caseField/register', (e) => S(e, { fieldName: q, fieldValue: oe }))
var My = y('caseAssist/caseField/update', (e) => S(e, { fieldName: q, fieldValue: oe }))
var qc = ee(
  'caseAssist/classifications/fetch',
  async (e, { getState: t, rejectWithValue: r, extra: { apiClient: a } }) => {
    const n = t()
    const o = await a.getCaseClassifications(await zA(n))
    return de(o) ? r(o.error) : { response: o.success }
  }
)
var zA = async (e) => ({
  accessToken: e.configuration.accessToken,
  organizationId: e.configuration.organizationId,
  url: e.configuration.platformUrl,
  caseAssistId: e.caseAssistConfiguration.caseAssistId,
  ...(e.configuration.analytics.enabled && { visitorId: await be(e.configuration.analytics) }),
  fields: e.caseInput,
  context: e.caseField ? Oc(e.caseField.fields) : void 0,
  locale: e.caseAssistConfiguration.locale,
  debug: e.debug,
})
O(_s(), (e) => {
  e.addCase(Ny, (t, r) => {
    const { fieldName: a, fieldValue: n } = r.payload
    t.fields[a] = { value: n, suggestions: [] }
  })
    .addCase(My, (t, r) => {
      const { fieldName: a, fieldValue: n } = r.payload
      t.fields[a].value = n
    })
    .addCase(qc.rejected, (t, r) => {
      var a
      ;(t.status.error = (a = r.payload) != null ? a : null), (t.status.loading = !1)
    })
    .addCase(qc.fulfilled, (t, r) => {
      const a = { value: '', suggestions: [] }
      Object.entries(r.payload.response.fields).forEach(([n, o]) => {
        t.fields[n] || (t.fields[n] = { ...a }), (t.fields[n].suggestions = o.predictions)
      }),
      (t.status.lastResponseId = r.payload.response.responseId),
      (t.status.error = null),
      (t.status.loading = !1)
    })
    .addCase(qc.pending, (t) => {
      t.status.loading = !0
    })
})
var Tc = ee(
  'caseAssist/documentSuggestions/fetch',
  async (e, { getState: t, rejectWithValue: r, extra: { apiClient: a } }) => {
    const n = t()
    const o = await a.getDocumentSuggestions(await YA(n))
    return de(o) ? r(o.error) : { response: o.success }
  }
)
var YA = async (e) => ({
  accessToken: e.configuration.accessToken,
  organizationId: e.configuration.organizationId,
  url: e.configuration.platformUrl,
  caseAssistId: e.caseAssistConfiguration.caseAssistId,
  ...(e.configuration.analytics.enabled && { visitorId: await be(e.configuration.analytics) }),
  fields: e.caseInput,
  context: e.caseField ? Oc(e.caseField.fields) : void 0,
  locale: e.caseAssistConfiguration.locale,
  debug: e.debug,
})
O(Hs(), (e) => {
  e.addCase(Tc.rejected, (t, r) => {
    var a
    ;(t.status.error = (a = r.payload) != null ? a : null), (t.status.loading = !1)
  })
    .addCase(Tc.fulfilled, (t, r) => {
      ;(t.documents = r.payload.response.documents),
      (t.status.lastResponseId = r.payload.response.responseId),
      (t.status.error = null),
      (t.status.loading = !1)
    })
    .addCase(Tc.pending, (t) => {
      t.status.loading = !0
    })
})
var kc = y('excerptLength/set', (e) => S(e, new j({ min: 0, required: !0 })))
O(_i(), (e) => {
  e.addCase(kc, (t, r) => {
    t.length = r.payload
  })
})
var Ly = O(ja(), (e) => {
  e.addCase(un, (t, r) => {
    const { id: a } = r.payload
    t[a] || (t[a] = { q: '', cache: {} })
  }),
  e.addCase(Vr, (t, r) => {
    const { q: a, id: n } = r.payload
    !a || (t[n].q = a)
  }),
  e.addCase(ln, (t, r) => {
    const { id: a } = r.payload
    Object.entries(t[a].cache).forEach(([n, o]) => {
      Mi(o) && delete t[a].cache[n]
    })
  }),
  e.addCase(Mr.pending, (t, r) => {
    if (!Dc(t, r.meta)) GA(t, r.meta)
    else {
      const a = Dc(t, r.meta)
        ;(a.isLoading = !0), (a.error = null)
    }
  }),
  e.addCase(Mr.fulfilled, (t, r) => {
    const { results: a } = r.payload
    const { cacheTimeout: n } = r.meta.arg
    const o = Dc(t, r.meta)
      ;(o.isLoading = !1), (o.error = null), (o.results = a), (o.expiresAt = n ? n + Date.now() : 0)
  }),
  e.addCase(Mr.rejected, (t, r) => {
    const a = Dc(t, r.meta)
      ;(a.error = r.error || null), (a.isLoading = !1)
  })
})
var GA = (e, t) => {
  const { q: r, id: a } = t.arg
  e[a].cache[r] = { isLoading: !0, error: null, results: [], expiresAt: 0 }
}
var Dc = (e, t) => {
  const { q: r, id: a } = t.arg
  return e[a].cache[r] || null
}
var jy = y('insightConfiguration/set', (e) => S(e, { insightId: q }))
O(Od(), (e) => {
  e.addCase(jy, (t, r) => {
    t.insightId = r.payload.insightId
  })
})
var Vc = ee(
  'insight/interface/fetch',
  async (e, { getState: t, dispatch: r, rejectWithValue: a, extra: { apiClient: n } }) => {
    const o = t()
    const i = await n.getInterface(XA(o))
    return de(i) ? a(i.error) : (r(ta(i.success.searchHub)), { response: i.success })
  }
)
var XA = (e) => ({
  accessToken: e.configuration.accessToken,
  organizationId: e.configuration.organizationId,
  url: e.configuration.platformUrl,
  insightId: e.insightConfiguration.insightId,
})
O(qd(), (e) => {
  e.addCase(Vc.pending, (t) => {
    ;(t.loading = !0), (t.error = void 0)
  })
    .addCase(Vc.rejected, (t, r) => {
      ;(t.loading = !1), (t.error = r.payload)
    })
    .addCase(Vc.fulfilled, (t, r) => {
      ;(t.loading = !1), (t.error = void 0)
      const { searchHub: a, ...n } = r.payload.response
      t.config = n
    })
})
var By = y('insight/caseContext/set', (e) => {
  const t = new Q({ options: { required: !0 } })
  const r = S(e, t).error
  if (r) return { payload: e, error: r }
  const a = Object.values(e)
  const n = new Y({ each: oe })
  const o = S(a, n).error
  return o ? { payload: e, error: o } : { payload: e }
})
O(wd(), (e) => {
  e.addCase(By, (t, r) => {
    t.caseContext = r.payload
  })
})
var W = dh
var nr = Zh
var ra = Vh
var Nc = Th
var Z = xy
var Mc = zh
var or = Lh
var Qc = Ih
var ft = jh
var aa = Fh
var Te = vh
var Lc = qh
var mt = cy
var Bc = ay
var Uc = Ly
var ho = oy
var _c = by
var zc = hh
var na = Uh
var yo = ey
var So = Cy
var Co = mh
var zy = gh
var oa = Py
var ir = dy
var Wc = Fy
var Kc = fy
var Gc = Zp({ actionTypes: { redo: Fd.type, undo: bd.type, snapshot: Nr.type }, reducer: Gh })
function Jc (e, t, r) {
  var a, n, o
  t === void 0 && (t = 50), r === void 0 && (r = {})
  var i = (a = r.isImmediate) != null && a
  var s = (n = r.callback) != null && n
  var u = r.maxWait
  var c = Date.now()
  var l = []
  function d () {
    if (u !== void 0) {
      var p = Date.now() - c
      if (p + t >= u) return u - p
    }
    return t
  }
  var m = function () {
    var p = [].slice.call(arguments)
    var f = this
    return new Promise(function (h, C) {
      var x = i && o === void 0
      if (
        (o !== void 0 && clearTimeout(o),
        (o = setTimeout(function () {
          if (((o = void 0), (c = Date.now()), !i)) {
            var F = e.apply(f, p)
            s && s(F),
            l.forEach(function (P) {
              return (0, P.resolve)(F)
            }),
            (l = [])
          }
        }, d())),
        x)
      ) {
        var R = e.apply(f, p)
        return s && s(R), h(R)
      }
      l.push({ resolve: h, reject: C })
    })
  }
  return (
    (m.cancel = function (p) {
      o !== void 0 && clearTimeout(o),
      l.forEach(function (f) {
        return (0, f.reject)(p)
      }),
      (l = [])
    }),
    m
  )
}
function Yy (e, t) {
  let r = 0
  const a = Jc(() => (r = 0), 500)
  return (n) => (o) => async (i) => {
    if (!(typeof i === 'function')) return o(i)
    const u = await o(i)
    if (!tP(u)) return u
    if (typeof t !== 'function') {
      return (
        e.warn(
          'Unable to renew the expired token because a renew function was not provided. Please specify the #renewAccessToken option when initializing the engine.'
        ),
        u
      )
    }
    if (r >= 5) {
      return (
        e.warn('Attempted to renew the token but was not successful. Please check the #renewAccessToken function.'), u
      )
    }
    r++, a()
    const c = await rP(t)
    n.dispatch(Qr({ accessToken: c })), n.dispatch(i)
  }
}
function tP (e) {
  var t
  return ((t = e.error) == null ? void 0 : t.name) === new Eo().name
}
async function rP (e) {
  try {
    return await e()
  } catch (t) {
    return ''
  }
}
var aP = { configuration: W, version: zy }
function Ky (e, t) {
  const r = nP(e, t)
  const { accessToken: a, organizationId: n, platformUrl: o, analytics: i } = e.configuration
  if ((r.dispatch(Qr({ accessToken: a, organizationId: n, platformUrl: o })), i)) {
    const { analyticsClientMiddleware: s, ...u } = i
    r.dispatch(Lr(u))
  }
  return r
}
function nP (e, t) {
  const { reducers: r } = e
  const a = ch({ ...aP, ...r })
  e.crossReducer && a.addCrossReducer(e.crossReducer)
  const n = t.logger
  const o = oP(e, t, a)
  return {
    addReducers (i) {
      a.containsAll(i) || (a.add(i), o.replaceReducer(a.combinedReducer))
    },
    dispatch: o.dispatch,
    subscribe: o.subscribe,
    enableAnalytics () {
      o.dispatch(Cn())
    },
    disableAnalytics () {
      o.dispatch(Sn())
    },
    get state () {
      return o.getState()
    },
    logger: n,
    store: o,
  }
}
function oP (e, t, r) {
  const { preloadedState: a, configuration: n } = e
  const o = n.name || 'coveo-headless'
  const i = iP(e, t.logger)
  return uh({ preloadedState: a, reducer: r.combinedReducer, middlewares: i, thunkExtraArguments: t, name: o })
}
function iP (e, t) {
  const { renewAccessToken: r } = e.configuration
  return [Yy(t, r), Ns(t), ks].concat(e.middlewares || [])
}
var Gy = ve(hi())
function Jy (e) {
  return (0, Gy.default)({
    name: '@coveo/headless',
    level: (e == null ? void 0 : e.level) || 'warn',
    formatters: { log: e == null ? void 0 : e.logFormatter },
    browser: { transmit: { send: (e == null ? void 0 : e.browserPostLogHook) || (() => {}) } },
  })
}
function Xy (e, t) {
  const r = sP(e)
  const a = ze
  const n = cP(e)
  return { analyticsClientMiddleware: r, validatePayload: a, preprocessRequest: n, logger: t }
}
function sP (e) {
  const { analytics: t } = e
  const r = (a, n) => n
  return (t == null ? void 0 : t.analyticsClientMiddleware) || r
}
function cP (e) {
  return e.preprocessRequest || ba
}
var Zy = {
  organizationId: q,
  accessToken: q,
  platformUrl: new w({ required: !1, emptyAllowed: !1 }),
  name: new w({ required: !1, emptyAllowed: !1 }),
  analytics: new Q({
    options: { required: !1 },
    values: {
      enabled: new G({ required: !1 }),
      originContext: new w({ required: !1 }),
      originLevel2: new w({ required: !1 }),
      originLevel3: new w({ required: !1 }),
    },
  }),
}
var tS = new K({
  ...Zy,
  search: new Q({
    options: { required: !1 },
    values: {
      pipeline: ue,
      searchHub: ue,
      locale: ue,
      timezone: ue,
      authenticationProviders: new Y({ required: !1, each: q }),
    },
  }),
})
var Xc = N('analytics/interface/load', D.Search, (e) => e.logInterfaceLoad())
ys('analytics/interface/load', D.Search, (e) => e.logInterfaceLoad())
var ia = N('analytics/interface/change', D.Search, (e, t) =>
  e.logInterfaceChange({ interfaceChangeTo: t.configuration.analytics.originLevel2 })
)
ys('analytics/interface/change', D.Search, (e, t) =>
  e.logInterfaceChange({ interfaceChangeTo: t.configuration.analytics.originLevel2 })
)
var Zc = N('analytics/interface/searchFromLink', D.Search, (e) => e.logSearchFromLink())
var eu = (e) => N('analytics/interface/omniboxFromLink', D.Search, (t) => t.logOmniboxFromLink(e))()
var xr = (e, t) => {
  const r = e
  return ae(r[t]) ? (ae(e.raw[t]) ? null : e.raw[t]) : r[t]
}
var iS = (e) => (t) => e.every((r) => !ae(xr(t, r)))
var sS = (e) => (t) => e.every((r) => ae(xr(t, r)))
var cS = (e, t) => (r) => {
  const a = lS(e, r)
  return t.some((n) => a.some((o) => `${o}`.toLowerCase() === n.toLowerCase()))
}
var uS = (e, t) => (r) => {
  const a = lS(e, r)
  return t.every((n) => a.every((o) => `${o}`.toLowerCase() !== n.toLowerCase()))
}
var lS = (e, t) => {
  const r = xr(t, e)
  return ds(r) ? r : [r]
}
function tu (e) {
  return e.search.response.searchUid !== ''
}
function dS (e, t, r) {
  return e.search.results.find((a) => xr(a, t) === r)
}
var pS = ve(gd())
var sp = (e, t, r, a, n, o) => {
  const i = e[t]
  ae(i) ||
    (r !== i &&
      (ae(n) ||
        (n !== i &&
          n !== a &&
          (o.warn(`Mismatch on access token (JWT Token) ${t} and engine configuration.`),
          o.warn(
            `To remove this warning, make sure that access token value [${i}] matches engine configuration value [${r}]`
          )))))
}
var cp = (e, t) => !(ae(e) || t === e)
var ru = (e) => {
  try {
    const t = typeof atob !== 'undefined' ? atob : pS.atob
    const a = e.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    const n = t(a)
    if (!n) return !1
    const o = decodeURIComponent(
      n
        .split('')
        .map((i) => '%' + ('00' + i.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(o)
  } catch (t) {
    return !1
  }
}
var fS = (e, t, r, a) => (
  sp(e, 'searchHub', t.searchHub, we(), r, a), cp(e.searchHub, t.searchHub) && (t.searchHub = e.searchHub), t
)
var mS = (e, t, r, a) => (
  sp(e, 'pipeline', t.pipeline, rt(), r, a), cp(e.pipeline, t.pipeline) && (t.pipeline = e.pipeline), t
)
var uP = (e, t, r, a) => (
  sp(e, 'userDisplayName', t.configuration.analytics.userDisplayName, De().analytics.userDisplayName, r, a),
  cp(e.userDisplayName, t.configuration.analytics.userDisplayName) &&
    (t.configuration.analytics.userDisplayName = e.userDisplayName),
  t
)
var gS = (e) =>
  O({}, (t) => {
    t.addCase(ta, (r, a) => {
      const n = ru(r.configuration.accessToken)
      return n ? fS(n, r, a.payload, e) : r
    })
      .addCase(Bn, (r, a) => {
        const n = ru(r.configuration.accessToken)
        return n ? mS(n, r, a.payload, e) : r
      })
      .addCase(lt, (r, a) => {
        var s
        const n = ru(r.configuration.accessToken)
        if (!n) return r
        const o = fS(n, r, a.payload.searchHub, e)
        return mS(n, o, (s = a.payload) == null ? void 0 : s.pipeline, e)
      })
      .addCase(Lr, (r, a) => {
        const n = ru(r.configuration.accessToken)
        return n ? uP(n, r, a.payload.userDisplayName, e) : r
      })
  })
var lP = { debug: Co, pipeline: yo, searchHub: So, search: Z }
function dP (e) {
  const t = Jy(e.loggerOptions)
  pP(e.configuration, t)
  const r = fP(e.configuration, t)
  const a = { ...Xy(e.configuration, t), searchAPIClient: r, apiClient: r }
  const n = { ...e, reducers: lP, crossReducer: gS(t) }
  const o = Ky(n, a)
  const { search: i } = e.configuration
  return (
    i && o.dispatch(lt(i)),
    {
      ...o,
      get state () {
        return o.state
      },
      executeFirstSearch (s = Xc()) {
        if (tu(o.state)) return
        const c = k(s)
        o.dispatch(c)
      },
      executeFirstSearchAfterStandaloneSearchBoxRedirect (s) {
        const { cause: u, metadata: c } = s
        const l = c && u === 'omniboxFromLink' ? eu(c) : Zc()
        this.executeFirstSearch(l)
      },
    }
  )
}
function pP (e, t) {
  try {
    tS.validate(e)
  } catch (r) {
    throw (t.error(r, 'Search engine configuration error'), r)
  }
}
function fP (e, t) {
  const { search: r } = e
  return new ii({
    logger: t,
    preprocessRequest: e.preprocessRequest || ba,
    postprocessSearchResponseMiddleware: (r == null ? void 0 : r.preprocessSearchResponseMiddleware) || Qs,
    postprocessFacetSearchResponseMiddleware: (r == null ? void 0 : r.preprocessFacetSearchResponseMiddleware) || Ls,
    postprocessQuerySuggestResponseMiddleware: (r == null ? void 0 : r.preprocessQuerySuggestResponseMiddleware) || js,
  })
}
function B (e) {
  let t
  const r = new Map()
  const a = () => r.size === 0
  const n = (o) => {
    try {
      const i = JSON.stringify(o)
      const s = t !== i
      return (t = i), s
    } catch (i) {
      return console.warn('Could not detect if state has changed, check the controller "get state method"', i), !0
    }
  }
  return {
    subscribe (o) {
      o()
      const i = Symbol()
      let s
      return (
        a() &&
          ((t = JSON.stringify(this.state)),
          (s = e.subscribe(() => {
            n(this.state) && r.forEach((u) => u())
          }))),
        r.set(i, o),
        () => {
          r.delete(i), a() && s && s()
        }
      )
    },
    get state () {
      return {}
    },
  }
}
var hS = (e) => {
  const t = /Document weights:\n((?:.)*?)\n+/g
  const r = /Terms weights:\n((?:.|\n)*)\n+/g
  const a = /Total weight: ([0-9]+)/g
  if (!e) return null
  const n = t.exec(e)
  const o = r.exec(e)
  const i = a.exec(e)
  const s = gP(e)
  const u = yS(n ? n[1] : null)
  const c = mP(o)
  const l = i ? Number(i[1]) : null
  return { documentWeights: u, termsWeight: c, totalWeight: l, qreWeights: s }
}
var yS = (e) => {
  const t = /(\w+(?:\s\w+)*): ([-0-9]+)/g
  const r = /^(\w+(?:\s\w+)*): ([-0-9]+)$/
  if (!e) return null
  const a = e.match(t)
  if (!a) return null
  const n = {}
  for (const o of a) {
    const i = o.match(r)
    if (i) {
      const s = i[1]
      const u = i[2]
      n[s] = Number(u)
    }
  }
  return n
}
var SS = (e, t) => {
  const r = []
  let a
  for (; (a = t.exec(e)) !== null;) r.push(a)
  return r
}
var mP = (e) => {
  const t = /((?:[^:]+: [0-9]+, [0-9]+; )+)\n((?:\w+: [0-9]+; )+)/g
  const r = /([^:]+): ([0-9]+), ([0-9]+); /g
  if (!e || !e[1]) return null
  const a = SS(e[1], t)
  if (!a) return null
  const n = {}
  for (const o of a) {
    const i = SS(o[1], r)
    const s = {}
    for (const c of i) s[c[1]] = { Correlation: Number(c[2]), 'TF-IDF': Number(c[3]) }
    const u = yS(o[2])
    n[Object.keys(s).join(', ')] = { terms: s, Weights: u }
  }
  return n
}
var gP = (e) => {
  const t = /(Expression:\s".*")\sScore:\s(?!0)([-0-9]+)\n+/g
  let r = t.exec(e)
  const a = []
  for (; r;) a.push({ expression: r[1], score: parseInt(r[2], 10) }), (r = t.exec(e))
  return a
}
function CS (e) {
  return e.search.response.results.map((r) => {
    const a = hS(r.rankingInfo)
    return { result: r, ranking: a }
  })
}
var hP = new K({ enabled: new G({ default: !1 }) })
function yP (e, t = {}) {
  if (!SP(e));
  const r = B(e)
  const { dispatch: a } = e
  const n = () => e.state
  Oe(e, hP, t.initialState, 'buildRelevanceInspector').enabled && a(Br())
  const i = (s) => {
    e.logger.warn(
      `Flag [ ${s} ] is now activated. This should *not* be used in any production environment as it negatively impact performance.`
    )
  }
  return {
    ...r,
    get state () {
      const s = n()
      const u = s.debug
      if (!s.debug) return { isEnabled: u }
      const {
        executionReport: c,
        basicExpression: l,
        advancedExpression: d,
        constantExpression: m,
        userIdentities: p,
        rankingExpressions: f,
      } = s.search.response
      const { fieldsDescription: h, fetchAllFields: C } = s.fields
      return {
        isEnabled: u,
        rankingInformation: CS(s),
        executionReport: c,
        expressions: { basicExpression: l, advancedExpression: d, constantExpression: m },
        userIdentities: p,
        rankingExpressions: f,
        fieldsDescription: h,
        fetchAllFields: C,
      }
    },
    enable () {
      a(Br()), i('debug')
    },
    disable () {
      a(bn()), a(qa())
    },
    enableFetchAllFields () {
      a(Ln()), i('fetchAllFields')
    },
    disableFetchAllFields () {
      a(qa())
    },
    fetchFieldsDescription () {
      !this.state.isEnabled && a(Br()),
      a(jn()),
      i('fieldsDescription'),
      e.logger
        .warn(`For production environment, please specify the necessary fields either when instantiating a ResultList controller, or by dispatching a registerFieldsToInclude action.
        
        https://docs.coveo.com/en/headless/latest/reference/search/controllers/result-list/#resultlistoptions
        https://docs.coveo.com/en/headless/latest/reference/search/actions/field/#registerfieldstoinclude`)
    },
    fetchFieldDescriptions () {
      this.fetchFieldsDescription()
    },
  }
}
function SP (e) {
  return e.addReducers({ debug: Co, search: Z, configuration: W, fields: na }), !0
}
function RS (e) {
  if (!bP(e));
  const t = B(e)
  const { dispatch: r } = e
  r(dn())
  const a = () => e.state
  return {
    ...t,
    get state () {
      const n = a()
      return {
        originalQuery: n.didYouMean.originalQuery,
        wasCorrectedTo: n.didYouMean.wasCorrectedTo,
        wasAutomaticallyCorrected: n.didYouMean.wasAutomaticallyCorrected,
        queryCorrection: n.didYouMean.queryCorrection,
        hasQueryCorrection: n.didYouMean.queryCorrection.correctedQuery !== '' || n.didYouMean.wasCorrectedTo !== '',
      }
    },
    applyCorrection () {
      r(Bt(this.state.queryCorrection.correctedQuery))
    },
  }
}
function bP (e) {
  return e.addReducers({ configuration: W, didYouMean: zc }), !0
}
function FP (e) {
  const t = RS(e)
  const { dispatch: r } = e
  return {
    ...t,
    get state () {
      return t.state
    },
    applyCorrection () {
      t.applyCorrection(), r(k(Fs()))
    },
  }
}
var vS = ['alphanumeric', 'occurrences']
var bS = new K({
  field: zt,
  basePath: yh,
  delimitingCharacter: An,
  facetId: Ht,
  facetSearch: Pn,
  filterByBasePath: Sh,
  filterFacetCount: Wt,
  injectionDepth: Yt,
  numberOfValues: Ft,
  sortCriteria: new w({ constrainTo: vS }),
})
function FS (e, t) {
  const { field: r, state: a } = e
  if (!AP(e)) return r
  const n = `${r}_`
  const o = PP(n, a)
  return EP(r, t), `${n}${o}`
}
function AP (e) {
  const { field: t, state: r } = e
  return AS(r).some((n) => n && t in n)
}
function PP (e, t) {
  const a = AS(t)
    .map((n) => Object.keys(n || {}))
    .reduce((n, o) => n.concat(o), [])
  return IP(a, e) + 1
}
function AS (e) {
  const { facetSet: t, numericFacetSet: r, dateFacetSet: a, categoryFacetSet: n } = e
  return [t, r, a, n]
}
function IP (e, t) {
  const r = 0
  const n = e
    .map((o) => {
      const i = o.split(t)[1]
      const s = parseInt(i, 10)
      return Number.isNaN(s) ? r : s
    })
    .sort()
    .pop()
  return n != null ? n : r
}
function EP (e, t) {
  const r = `A facet with field "${e}" already exists.
  To avoid unexpected behaviour, configure the #id option on the facet controller.`
  t.warn(r)
}
function gt (e, t) {
  const { state: r, logger: a } = e
  const { field: n, facetId: o } = t
  return o || FS({ field: n, state: r }, a)
}
var sr = (e, t) => {
  var r, a
  return (a = (r = e.facetOptions.facets[t]) == null ? void 0 : r.enabled) != null ? a : !0
}
function PS (e, t) {
  if (!wP(e));
  const r = B(e)
  const { dispatch: a } = e
  const n = gt(e, t.options)
  const o = { ...Qd, ...fs('facetSearch', t.options), field: t.options.field, facetId: n }
  const i = { facetSearch: { ...er, ...t.options.facetSearch }, ...o }
  pe(e, bS, i, 'buildCategoryFacet')
  const s = () => Mm(e.state, n)
  const u = () => ud(e.state, n)
  const c = () => Vt(e.state)
  const l = () => sr(e.state, n)
  return (
    a(Ur(o)),
    {
      ...r,
      toggleSelect (d) {
        const m = i.numberOfValues
        a(_r({ facetId: n, selection: d, retrieveCount: m })), a(ie({ freezeFacetOrder: !0 }))
      },
      deselectAll () {
        a($t(n)), a(ie({ freezeFacetOrder: !0 }))
      },
      sortBy (d) {
        a(Fn({ facetId: n, criterion: d })), a(ie({ freezeFacetOrder: !0 }))
      },
      isSortedBy (d) {
        return s().sortCriteria === d
      },
      showMoreValues () {
        const { numberOfValues: d } = i
        const { values: m } = this.state
        const p = m.length + d
        a(Pa({ facetId: n, numberOfValues: p })), a(ie({ freezeFacetOrder: !0 }))
      },
      showLessValues () {
        const { numberOfValues: d } = i
        a(Pa({ facetId: n, numberOfValues: d })), a(ie({ freezeFacetOrder: !0 }))
      },
      enable () {
        a(Le(n))
      },
      disable () {
        a(Se(n))
      },
      get state () {
        const d = s()
        const m = u()
        const p = c()
        const f = l()
        const { parents: h, values: C } = ot(m == null ? void 0 : m.values)
        const x = h.length !== 0
        const R =
          h.length > 0 ? h[h.length - 1].moreValuesAvailable : (m == null ? void 0 : m.moreValuesAvailable) || !1
        const F = C.length > i.numberOfValues
        return {
          facetId: n,
          parents: h,
          values: C,
          isLoading: p,
          hasActiveValues: x,
          canShowMoreValues: R,
          canShowLessValues: F,
          sortCriteria: d.sortCriteria,
          enabled: f,
        }
      },
    }
  )
}
function wP (e) {
  return (
    e.addReducers({ categoryFacetSet: aa, categoryFacetSearchSet: Lc, facetOptions: Te, configuration: W, search: Z }),
    !0
  )
}
function xo (e, t) {
  const r = e.dispatch
  const { options: a, getFacetSearch: n } = t
  const { facetId: o } = a
  return {
    updateText (i) {
      r(zr({ facetId: o, query: i, numberOfValues: n().initialNumberOfValues }))
    },
    showMoreResults () {
      const { initialNumberOfValues: i, options: s } = n()
      r(zr({ facetId: o, numberOfValues: s.numberOfValues + i })), r(Pt(o))
    },
    search () {
      r(Pt(o))
    },
    clear () {
      r(Qn({ facetId: o }))
    },
    updateCaptions (i) {
      r(zr({ facetId: o, captions: i }))
    },
    get state () {
      const { response: i, isLoading: s, options: u } = n()
      const { query: c } = u
      const l = i.values
      return { ...i, values: l, isLoading: s, query: c }
    },
  }
}
function IS (e, t) {
  const { dispatch: r } = e
  const a = { ...er, ...t.options }
  const { facetId: n } = a
  const o = () => e.state.categoryFacetSearchSet[n]
  r(Vn(a))
  const i = xo(e, { options: a, getFacetSearch: o })
  return {
    ...i,
    select (s) {
      r(Dn({ facetId: n, value: s }))
    },
    get state () {
      return i.state
    },
  }
}
function ES (e, t) {
  const { dispatch: r } = e
  const a = { ...er, ...t.options }
  const { facetId: n } = a
  const o = () => e.state.categoryFacetSearchSet[n]
  const i = IS(e, { options: { ...a } })
  r(Vn(a))
  const s = xo(e, { options: a, getFacetSearch: o })
  return {
    ...s,
    ...i,
    select: (u) => {
      i.select(u), r(ie({ freezeFacetOrder: !0 })), r(k(Ae({ facetId: n, facetValue: u.rawValue })))
    },
    get state () {
      return { ...s.state, ...i.state }
    },
  }
}
function up (e, t) {
  if (!OP(e));
  const r = PS(e, t)
  const { dispatch: a } = e
  const n = () => r.state.facetId
  const o = ES(e, { options: { facetId: n(), ...t.options.facetSearch } })
  const { state: i, ...s } = o
  return {
    ...r,
    facetSearch: s,
    toggleSelect (u) {
      r.toggleSelect(u)
      const c = qP(n(), u)
      a(k(c))
    },
    deselectAll () {
      r.deselectAll(), a(k(je(n())))
    },
    sortBy (u) {
      r.sortBy(u), a(k(tr({ facetId: n(), criterion: u })))
    },
    showMoreValues () {
      r.showMoreValues(), a(Ye(Nn(n())))
    },
    showLessValues () {
      r.showLessValues(), a(Ye(Mn(n())))
    },
    get state () {
      return { ...r.state, facetSearch: o.state }
    },
  }
}
function OP (e) {
  return e.addReducers({ categoryFacetSet: aa, categoryFacetSearchSet: Lc, configuration: W, search: Z }), !0
}
function qP (e, t) {
  const r = { facetId: e, facetValue: t.value }
  return t.state === 'selected' ? At(r) : Ae(r)
}
var wS = new K({
  facetId: Ht,
  field: zt,
  delimitingCharacter: An,
  filterFacetCount: Wt,
  injectionDepth: Yt,
  numberOfValues: Ft,
  sortCriteria: new w({ constrainTo: xs }),
  facetSearch: Pn,
  allowedValues: tc,
  hasBreadcrumbs: Ch,
})
var lp = (e) => e.state === 'selected'
var OS = (e, t) => {
  const r = { facetId: e, facetValue: t.value }
  return lp(t) ? At(r) : Ae(r)
}
var TP = { facetId: J, selection: new Q({ values: Zs }) }
var qS = ee('facet/executeToggleSelect', ({ facetId: e, selection: t }, r) => {
  const {
    dispatch: a,
    extra: { validatePayload: n },
  } = r
  n({ facetId: e, selection: t }, TP), a(Kt({ facetId: e, selection: t })), a(ie({ freezeFacetOrder: !0 }))
})
var TS = new K({
  facetId: Ht,
  field: zt,
  delimitingCharacter: An,
  filterFacetCount: Wt,
  injectionDepth: Yt,
  numberOfValues: Ft,
  sortCriteria: new w({ constrainTo: xs }),
  facetSearch: Pn,
})
function kS (e, t, r = TS) {
  if (!kP(e));
  const { dispatch: a } = e
  const n = B(e)
  const o = gt(e, t.options)
  const i = { ..._d, ...fs('facetSearch', t.options), field: t.options.field, facetId: o }
  const s = { facetSearch: { ...er, ...t.options.facetSearch }, ...i }
  pe(e, r, s, 'buildFacet')
  const u = () => sd(e.state, o)
  const c = () => is(e.state, o)
  const l = () => Vt(e.state)
  const d = () => sr(e.state, o)
  const m = () => {
    const { currentValues: f } = u()
    return f.filter((h) => h.state !== 'idle').length
  }
  const p = () => {
    const { currentValues: f } = u()
    const h = s.numberOfValues
    const C = !!f.find((x) => x.state === 'idle')
    return h < f.length && C
  }
  return (
    a($r(i)),
    {
      ...n,
      toggleSelect: (f) => a(qS({ facetId: s.facetId, selection: f })),
      toggleSingleSelect: function (f) {
        f.state === 'idle' && a(Re(o)), this.toggleSelect(f)
      },
      isValueSelected: lp,
      deselectAll () {
        a(Re(o)), a(ie({ freezeFacetOrder: !0 }))
      },
      sortBy (f) {
        a(In({ facetId: o, criterion: f })), a(ie({ freezeFacetOrder: !0 }))
      },
      isSortedBy (f) {
        return this.state.sortCriterion === f
      },
      showMoreValues () {
        const f = u().numberOfValues
        const h = s.numberOfValues
        const C = h - (f % h)
        const x = f + C
        a(Ia({ facetId: o, numberOfValues: x })),
        a(Ea({ facetId: o, isFieldExpanded: !0 })),
        a(ie({ freezeFacetOrder: !0 }))
      },
      showLessValues () {
        const f = s.numberOfValues
        const h = Math.max(f, m())
        a(Ia({ facetId: o, numberOfValues: h })),
        a(Ea({ facetId: o, isFieldExpanded: !1 })),
        a(ie({ freezeFacetOrder: !0 }))
      },
      enable () {
        a(Le(o))
      },
      disable () {
        a(Se(o))
      },
      get state () {
        const f = u()
        const h = c()
        const C = l()
        const x = d()
        const R = f.sortCriteria
        const F = h ? h.values : []
        const P = F.some((X) => X.state !== 'idle')
        const U = h ? h.moreValuesAvailable : !1
        return {
          facetId: o,
          values: F,
          sortCriterion: R,
          isLoading: C,
          hasActiveValues: P,
          canShowMoreValues: U,
          canShowLessValues: p(),
          enabled: x,
        }
      },
    }
  )
}
function kP (e) {
  return e.addReducers({ facetSet: ra, facetOptions: Te, configuration: W, facetSearchSet: Nc }), !0
}
function DS (e, t) {
  const { dispatch: r } = e
  const { options: a, select: n } = t
  const { facetId: o } = a
  const i = () => e.state.facetSearchSet[o]
  r(gc(a))
  const s = xo(e, { options: a, getFacetSearch: i })
  return {
    ...s,
    select (u) {
      r(Oa({ facetId: o, value: u })), n(u)
    },
    singleSelect (u) {
      r(Re(o)), r(Oa({ facetId: o, value: u })), n(u)
    },
    get state () {
      const { values: u } = s.state
      return {
        ...s.state,
        values: u.map(({ count: c, displayValue: l, rawValue: d }) => ({ count: c, displayValue: l, rawValue: d })),
      }
    },
  }
}
function dp (e, t) {
  if (!DP(e));
  const { dispatch: r } = e
  const a = kS(
    e,
    {
      ...t,
      options: {
        ...t.options,
        ...(t.options.allowedValues && { allowedValues: { type: 'simple', values: t.options.allowedValues } }),
      },
    },
    wS
  )
  const n = () => a.state.facetId
  const i = (() => {
    const { facetSearch: c } = t.options
    return DS(e, {
      options: { facetId: n(), ...c },
      select: (l) => {
        r(ie({ freezeFacetOrder: !0 })), r(k(Ae({ facetId: n(), facetValue: l.rawValue })))
      },
    })
  })()
  const { state: s, ...u } = i
  return {
    ...a,
    facetSearch: u,
    toggleSelect (c) {
      a.toggleSelect(c), r(k(OS(n(), c)))
    },
    deselectAll () {
      a.deselectAll(), r(k(je(n())))
    },
    sortBy (c) {
      a.sortBy(c), r(k(tr({ facetId: n(), criterion: c })))
    },
    isSortedBy (c) {
      return this.state.sortCriterion === c
    },
    showMoreValues () {
      a.showMoreValues(), r(Ye(Nn(n())))
    },
    showLessValues () {
      a.showLessValues(), r(Ye(Mn(n())))
    },
    get state () {
      return { ...a.state, facetSearch: i.state }
    },
  }
}
function DP (e) {
  return e.addReducers({ facetSet: ra, configuration: W, facetSearchSet: Nc, search: Z }), !0
}
var pp = (e) => e.state === 'selected'
var au = (e, t) => {
  const r = `${t.start}..${t.end}`
  const a = { facetId: e, facetValue: r }
  return pp(t) ? At(a) : Ae(a)
}
function nu (e, t) {
  const { facetId: r, getRequest: a } = t
  const n = B(e)
  const o = e.dispatch
  const i = () => sr(e.state, r)
  return {
    ...n,
    isValueSelected: pp,
    deselectAll () {
      o(Re(r)), o(ie({ freezeFacetOrder: !0 }))
    },
    sortBy (s) {
      o(qn({ facetId: r, criterion: s })), o(ie({ freezeFacetOrder: !0 }))
    },
    isSortedBy (s) {
      return this.state.sortCriterion === s
    },
    enable () {
      o(Le(r))
    },
    disable () {
      o(Se(r))
    },
    get state () {
      const s = a()
      const u = Dt(e.state, r)
      const c = s.sortCriteria
      const l = u ? u.values : []
      const d = Vt(e.state)
      const m = i()
      const p = l.some((f) => f.state !== 'idle')
      return { facetId: r, values: l, sortCriterion: c, hasActiveValues: p, isLoading: d, enabled: m }
    },
  }
}
function ou (e, t) {
  if (!e.generateAutomaticRanges && e.currentValues === void 0) {
    const r = `currentValues should be specified for ${t} when generateAutomaticRanges is false.`
    throw new Error(r)
  }
}
var iu = y('rangeFacet/executeToggleSelect', (e) => S(e, On(e.selection)))
var VP = { facetId: J, selection: new Q({ values: wn }) }
var VS = ee('dateFacet/executeToggleSelect', (e, { dispatch: t, extra: { validatePayload: r } }) => {
  r(e, VP), t(Jt(e)), t(iu(e)), t(ie({ freezeFacetOrder: !0 }))
})
var su = ['idle', 'selected']
var cu = ['ascending', 'descending']
var uu = ['even', 'equiprobable']
var NP = { start: new w(), end: new w(), endInclusive: new G(), state: new w({ constrainTo: su }) }
var MP = new K({
  facetId: Ht,
  field: zt,
  generateAutomaticRanges: ec,
  filterFacetCount: Wt,
  injectionDepth: Yt,
  numberOfValues: Ft,
  currentValues: new Y({ each: new Q({ values: NP }) }),
  sortCriteria: new w({ constrainTo: cu }),
  rangeAlgorithm: new w({ constrainTo: uu }),
})
function lu (e, t) {
  pe(e, MP, t, 'buildDateFacet'), rc(t)
}
function NS (e, t) {
  if (!QP(e));
  ou(t.options, 'buildDateFacet')
  const r = e.dispatch
  const a = gt(e, t.options)
  const n = { currentValues: [], ...t.options, facetId: a }
  lu(e, n), r(Gt(n))
  const o = nu(e, { facetId: a, getRequest: () => e.state.dateFacetSet[a] })
  return {
    ...o,
    toggleSelect: (i) => r(VS({ facetId: a, selection: i })),
    toggleSingleSelect: function (i) {
      i.state === 'idle' && r(Re(a)), this.toggleSelect(i)
    },
    get state () {
      return o.state
    },
  }
}
function QP (e) {
  return e.addReducers({ configuration: W, search: Z, dateFacetSet: or, facetOptions: Te }), !0
}
function LP (e, t) {
  const r = NS(e, t)
  const a = e.dispatch
  const n = () => r.state.facetId
  return {
    ...r,
    deselectAll () {
      r.deselectAll(), a(k(je(n())))
    },
    sortBy (o) {
      r.sortBy(o), a(k(tr({ facetId: n(), criterion: o })))
    },
    toggleSelect: (o) => {
      r.toggleSelect(o), a(k(au(n(), o)))
    },
    get state () {
      return r.state
    },
  }
}
var jP = { facetId: J, selection: new Q({ values: En }) }
var BP = 'numericFacet/executeToggleSelect'
var MS = ee(BP, (e, { dispatch: t, extra: { validatePayload: r } }) => {
  r(e, jP), t(Zt(e)), t(iu(e)), t(ie({ freezeFacetOrder: !0 }))
})
var UP = { start: new j(), end: new j(), endInclusive: new G(), state: new w({ constrainTo: su }) }
var _P = new K({
  facetId: Ht,
  field: zt,
  generateAutomaticRanges: ec,
  filterFacetCount: Wt,
  injectionDepth: Yt,
  numberOfValues: Ft,
  currentValues: new Y({ each: new Q({ values: UP }) }),
  sortCriteria: new w({ constrainTo: cu }),
  rangeAlgorithm: new w({ constrainTo: uu }),
})
function du (e, t) {
  pe(e, _P, t, 'buildNumericFacet'), oc(t)
}
function Pi (e) {
  return { endInclusive: !1, state: 'idle', ...e }
}
function QS (e, t) {
  if (!$P(e));
  ou(t.options, 'buildNumericFacet')
  const r = e.dispatch
  const a = gt(e, t.options)
  const n = { currentValues: [], ...t.options, facetId: a }
  du(e, n), r(Xt(n))
  const o = nu(e, { facetId: a, getRequest: () => e.state.numericFacetSet[a] })
  return {
    ...o,
    toggleSelect: (i) => r(MS({ facetId: a, selection: i })),
    toggleSingleSelect (i) {
      i.state === 'idle' && r(Re(a)), this.toggleSelect(i)
    },
    get state () {
      return o.state
    },
  }
}
function $P (e) {
  return e.addReducers({ numericFacetSet: ft, facetOptions: Te, configuration: W, search: Z }), !0
}
function HP (e, t) {
  if (!zP(e));
  const r = QS(e, t)
  const a = e.dispatch
  const n = () => r.state.facetId
  return {
    ...r,
    deselectAll () {
      r.deselectAll(), a(k(je(n())))
    },
    sortBy (o) {
      r.sortBy(o), a(k(tr({ facetId: n(), criterion: o })))
    },
    toggleSelect: (o) => {
      r.toggleSelect(o), a(k(au(n(), o)))
    },
    get state () {
      return { ...r.state }
    },
  }
}
function zP (e) {
  return e.addReducers({ numericFacetSet: ft, configuration: W, search: Z }), !0
}
function WP (e, t) {
  return !!t && t.facetId in e.numericFacetSet
}
var YP = (e, t) => {
  const r = Dt(e, t)
  if (WP(e, r)) return r
}
var pu = (e, t) => {
  const r = YP(e, t)
  return r ? r.values.filter((a) => a.state === 'selected') : []
}
function LS (e, t) {
  var u
  if (!KP(e));
  const r = B(e)
  const { dispatch: a } = e
  const n = () => e.state
  const o = gt(e, t.options)
  const i = {
    ...t.options,
    currentValues: ((u = t.initialState) == null ? void 0 : u.range)
      ? [{ ...t.initialState.range, endInclusive: !0, state: 'selected' }]
      : [],
    generateAutomaticRanges: !1,
    facetId: o,
  }
  du(e, i), a(Xt(i))
  const s = () => sr(e.state, o)
  return {
    ...r,
    clear: () => {
      a(yr({ facetId: o, values: [] })), a(ie({ freezeFacetOrder: !0 }))
    },
    setRange: (c) => {
      const l = { ...c, state: 'selected', numberOfResults: 0, endInclusive: !0 }
      const d = yr({ facetId: o, values: [l] })
      return d.error ? !1 : (a(d), a(ie({ freezeFacetOrder: !0 })), !0)
    },
    enable () {
      a(Le(o))
    },
    disable () {
      a(Se(o))
    },
    get state () {
      const c = Vt(n())
      const l = s()
      const d = pu(n(), o)
      const m = d.length ? d[0] : void 0
      return { facetId: o, isLoading: c, range: m, enabled: l }
    },
  }
}
function KP (e) {
  return e.addReducers({ numericFacetSet: ft, facetOptions: Te, configuration: W, search: Z }), !0
}
function GP (e, t) {
  if (!JP(e));
  const r = LS(e, t)
  const { dispatch: a } = e
  const n = () => r.state.facetId
  return {
    ...r,
    clear: () => {
      r.clear(), a(k(je(n())))
    },
    setRange: (o) => {
      const i = r.setRange(o)
      return i && a(k(Ae({ facetId: n(), facetValue: `${o.start}..${o.end}` }))), i
    },
    get state () {
      return { ...r.state }
    },
  }
}
function JP (e) {
  return e.addReducers({ numericFacetSet: ft, configuration: W, search: Z }), !0
}
function XP (e, t) {
  return !!t && t.facetId in e.dateFacetSet
}
var ZP = (e, t) => {
  const r = Dt(e, t)
  if (XP(e, r)) return r
}
var fu = (e, t) => {
  const r = ZP(e, t)
  return r ? r.values.filter((a) => a.state === 'selected') : []
}
function jS (e, t) {
  var u
  if (!eI(e));
  const r = B(e)
  const { dispatch: a } = e
  const n = () => e.state
  const o = gt(e, t.options)
  const i = {
    ...t.options,
    currentValues: ((u = t.initialState) == null ? void 0 : u.range)
      ? [{ ...t.initialState.range, endInclusive: !0, state: 'selected' }]
      : [],
    generateAutomaticRanges: !1,
    facetId: o,
  }
  lu(e, i), a(Gt(i))
  const s = () => sr(e.state, o)
  return {
    ...r,
    clear: () => {
      a(hr({ facetId: o, values: [] })), a(ie({ freezeFacetOrder: !0 }))
    },
    setRange: (c) => {
      const l = { ...c, state: 'selected', numberOfResults: 0, endInclusive: !0 }
      const d = hr({ facetId: o, values: [l] })
      return d.error ? !1 : (a(d), a(ie({ freezeFacetOrder: !0 })), !0)
    },
    enable () {
      a(Le(o))
    },
    disable () {
      a(Se(o))
    },
    get state () {
      const c = Vt(n())
      const l = s()
      const d = fu(n(), o)
      const m = d.length ? d[0] : void 0
      return { facetId: o, isLoading: c, range: m, enabled: l }
    },
  }
}
function eI (e) {
  return e.addReducers({ dateFacetSet: or, facetOptions: Te, configuration: W, search: Z }), !0
}
function tI (e, t) {
  if (!rI(e));
  const r = jS(e, t)
  const { dispatch: a } = e
  const n = () => r.state.facetId
  return {
    ...r,
    clear: () => {
      r.clear(), a(k(je(n())))
    },
    setRange: (o) => {
      const i = r.setRange(o)
      return i && a(k(Ae({ facetId: n(), facetValue: `${o.start}..${o.end}` }))), i
    },
    get state () {
      return { ...r.state }
    },
  }
}
function rI (e) {
  return e.addReducers({ dateFacetSet: or, configuration: W, search: Z }), !0
}
var mu = N('history/analytics/forward', D.Search, (e) => e.logSearchEvent('historyForward'))
var gu = N('history/analytics/backward', D.Search, (e) => e.logSearchEvent('historyBackward'))
var hu = N('history/analytics/noresultsback', D.Search, (e) => e.logNoResultsBack())
function aI (e) {
  if (!nI(e));
  const t = B(e)
  const { dispatch: r } = e
  const a = () => e.state
  const n = (o) => o.past.length > 0 && !ae(o.present)
  return {
    ...t,
    get state () {
      return a().history
    },
    async back () {
      !n(this.state) || (await r(fi()), r(k(gu())))
    },
    async forward () {
      !this.state.future.length || !this.state.present || (await r(As()), r(k(mu())))
    },
    async backOnNoResults () {
      !n(this.state) || (await r(fi()), r(k(hu())))
    },
  }
}
function nI (e) {
  return e.addReducers({ history: Gc, configuration: W, facetOrder: Qc }), !0
}
function oI (e) {
  return e.pagination.firstResult
}
function BS (e) {
  return e.pagination.numberOfResults
}
function iI (e) {
  return e.pagination.totalCountFiltered
}
var sa = (e) => {
  const t = oI(e)
  const r = BS(e)
  return Jd(t, r)
}
var yu = (e) => {
  const t = iI(e)
  const r = BS(e)
  return Xd(t, r)
}
var fp = (e, t) => {
  const r = sa(e)
  const a = yu(e)
  let n = sI(r, t)
  return (n = cI(n)), (n = uI(n, a)), lI(n)
}
function sI (e, t) {
  const r = t % 2 == 0
  const a = Math.floor(t / 2)
  const n = r ? a - 1 : a
  const o = e - a
  const i = e + n
  return { start: o, end: i }
}
function cI (e) {
  const t = Math.max(Ra - e.start, 0)
  const r = e.start + t
  const a = e.end + t
  return { start: r, end: a }
}
function uI (e, t) {
  const r = Math.max(e.end - t, 0)
  const a = Math.max(e.start - r, Ra)
  const n = e.end - r
  return { start: a, end: n }
}
function lI (e) {
  const t = []
  for (let r = e.start; r <= e.end; ++r) t.push(r)
  return t
}
var Ro = N('analytics/pager/resize', D.Search, (e, t) => {
  var r
  return e.logPagerResize({
    currentResultsPerPage: ((r = t.pagination) == null ? void 0 : r.numberOfResults) || Ve().numberOfResults,
  })
})
var vo = N('analytics/pager/number', D.Search, (e, t) => e.logPagerNumber({ pagerNumber: sa(t) }))
var Su = N('analytics/pager/next', D.Search, (e, t) => e.logPagerNext({ pagerNumber: sa(t) }))
var Cu = N('analytics/pager/previous', D.Search, (e, t) => e.logPagerPrevious({ pagerNumber: sa(t) }))
var dI = new K({ numberOfPages: new j({ default: 5, min: 0 }) })
var pI = new K({ page: new j({ min: 1 }) })
function US (e, t = {}) {
  if (!fI(e));
  const r = B(e)
  const { dispatch: a } = e
  const n = pe(e, dI, t.options, 'buildPager')
  const i = Oe(e, pI, t.initialState, 'buildPager').page
  i && a(rn(i))
  const s = () => sa(e.state)
  const u = () => {
    const { numberOfPages: l } = n
    return fp(e.state, l)
  }
  const c = () => yu(e.state)
  return {
    ...r,
    get state () {
      const l = s()
      const d = c()
      const m = l > Ra && d > 0
      const p = l < d
      return { currentPage: l, currentPages: u(), maxPage: d, hasPreviousPage: m, hasNextPage: p }
    },
    selectPage (l) {
      a(Lt(l))
    },
    nextPage () {
      a(an())
    },
    previousPage () {
      a(nn())
    },
    isCurrentPage (l) {
      return l === this.state.currentPage
    },
  }
}
function fI (e) {
  return e.addReducers({ configuration: W, pagination: nr }), !0
}
function mI (e, t = {}) {
  const { dispatch: r } = e
  const a = US(e, t)
  return {
    ...a,
    get state () {
      return a.state
    },
    selectPage (n) {
      a.selectPage(n), r(ut(vo()))
    },
    nextPage () {
      a.nextPage(), r(ut(Su()))
    },
    previousPage () {
      a.previousPage(), r(ut(Cu()))
    },
  }
}
function _S (e) {
  if (!gI(e));
  const t = B(e)
  const r = () => e.state
  return {
    ...t,
    get state () {
      return { hasError: r().search.error !== null, error: r().search.error }
    },
  }
}
function gI (e) {
  return e.addReducers({ search: Z }), !0
}
function hI (e) {
  return _S(e)
}
function bo (e) {
  if (!yI(e));
  const t = B(e)
  const r = () => e.state
  return {
    ...t,
    get state () {
      const a = r()
      return {
        hasError: a.search.error !== null,
        isLoading: a.search.isLoading,
        hasResults: !!a.search.results.length,
        firstSearchExecuted: tu(a),
      }
    },
  }
}
function yI (e) {
  return e.addReducers({ search: Z }), !0
}
function mp (e) {
  if (!SI(e));
  const t = B(e)
  const r = bo(e)
  const a = () => e.state
  const n = () => {
    const o = a().search.duration / 1e3
    return Math.round((o + Number.EPSILON) * 100) / 100
  }
  return {
    ...t,
    get state () {
      return {
        ...r.state,
        durationInMilliseconds: a().search.duration,
        durationInSeconds: n(),
        firstResult: a().pagination.firstResult + 1,
        hasDuration: a().search.duration !== 0,
        hasQuery: a().search.queryExecuted !== '',
        lastResult: a().pagination.firstResult + a().search.results.length,
        query: a().search.queryExecuted,
        total: a().pagination.totalCountFiltered,
      }
    },
  }
}
function SI (e) {
  return e.addReducers({ search: Z, pagination: nr }), !0
}
function CI (e) {
  return mp(e)
}
var xI = new K({ fieldsToInclude: new Y({ required: !1, each: new w({ required: !0, emptyAllowed: !1 }) }) })
function $S (e, t) {
  if (!RI(e));
  const r = B(e)
  const a = bo(e)
  const { dispatch: n } = e
  const o = () => e.state
  const i = pe(e, xI, t == null ? void 0 : t.options, 'buildCoreResultList')
  i.fieldsToInclude && n(Yr(i.fieldsToInclude))
  const s = () => e.state.search.results.length < e.state.search.response.totalCountFiltered
  let u = 0
  let c = 0
  const l = 5
  const d = 200
  let m = !1
  return {
    ...r,
    get state () {
      const f = o()
      return {
        ...a.state,
        results: f.search.results,
        searchUid: f.search.response.searchUid,
        moreResultsAvailable: s(),
        searchResponseId: f.search.searchResponseId,
      }
    },
    fetchMoreResults: () => {
      if (e.state.search.isLoading) return
      if (!s()) {
        e.logger.info('No more results are available for the result list to fetch.')
        return
      }
      if (Date.now() - u < d) {
        if ((c++, c >= l)) {
          ;(u = Date.now()),
          !m &&
              e.logger.error(
                `The result list method "fetchMoreResults" execution prevented because it has been triggered consecutively ${l} times, with little delay. Please verify the conditions under which the function is called.`
              ),
          (m = !0)
          return
        }
      } else c = 0
      ;(m = !1),
      (t == null ? void 0 : t.fetchMoreResultsActionCreator) &&
          n(t == null ? void 0 : t.fetchMoreResultsActionCreator()).then(() => (u = Date.now()))
    },
  }
}
function RI (e) {
  return e.addReducers({ search: Z, configuration: W, fields: na }), !0
}
function gp (e, t) {
  return $S(e, { ...t, fetchMoreResultsActionCreator: Ut })
}
var vI = (e) => N('analytics/result/open', D.Click, (t, r) => (Ue(e), t.logDocumentOpen(Be(e, r), We(e))))
var xu = (e) => vI(e)()
function It (e, t, r) {
  if (!bI(e));
  const a = 1e3
  const n = { selectionDelay: a, debounceWait: a, ...t.options }
  let o
  return {
    select: Jc(r, n.debounceWait, { isImmediate: !0 }),
    beginDelayedSelect () {
      o = setTimeout(r, n.selectionDelay)
    },
    cancelPendingSelect () {
      o && clearTimeout(o)
    },
  }
}
function bI (e) {
  return e.addReducers({ configuration: W }), !0
}
function FI (e, t) {
  let r = !1
  const a = () => {
    r || ((r = !0), e.dispatch(xu(t.options.result)))
  }
  return It(e, t, () => {
    a(), e.dispatch(ar(t.options.result))
  })
}
var AI = new K({ numberOfResults: new j({ min: 0 }) })
function HS (e, t = {}) {
  if (!PI(e));
  const r = B(e)
  const { dispatch: a } = e
  const n = () => e.state
  const i = Oe(e, AI, t.initialState, 'buildResultsPerPage').numberOfResults
  return (
    i !== void 0 && a(en(i)),
    {
      ...r,
      get state () {
        return { numberOfResults: n().pagination.numberOfResults }
      },
      set (s) {
        a(tn(s))
      },
      isSetTo (s) {
        return s === this.state.numberOfResults
      },
    }
  )
}
function PI (e) {
  return e.addReducers({ pagination: nr, configuration: W }), !0
}
function II (e, t = {}) {
  if (!EI(e));
  const r = HS(e, t)
  const { dispatch: a } = e
  return {
    ...r,
    get state () {
      return { ...r.state }
    },
    set (n) {
      r.set(n), a(ut(Ro()))
    },
  }
}
function EI (e) {
  return e.addReducers({ pagination: nr, configuration: W }), !0
}
var Ru = { enableQuerySyntax: !1, numberOfSuggestions: 5, clearFilters: !0 }
var hp = { open: new w(), close: new w() }
var yp = {
  id: q,
  numberOfSuggestions: new j({ min: 0 }),
  enableQuerySyntax: new G(),
  highlightOptions: new Q({
    values: {
      notMatchDelimiters: new Q({ values: hp }),
      exactMatchDelimiters: new Q({ values: hp }),
      correctionDelimiters: new Q({ values: hp }),
    },
  }),
  clearFilters: new G(),
}
var zS = new K(yp)
var vu = (e) =>
  N('analytics/querySuggest', D.Search, (t, r) => {
    const a = Sp(r, e)
    return t.logOmniboxAnalytics(a)
  })()
function Sp (e, t) {
  const { id: r, suggestion: a } = t
  const n = e.querySuggest && e.querySuggest[r]
  if (!n) {
    throw new Error(
      `Unable to determine the query suggest analytics metadata to send because no query suggest with id "${r}" was found. Please check the sent #id.`
    )
  }
  const o = n.completions.map((c) => c.expression)
  const i = n.partialQueries.length - 1
  const s = n.partialQueries[i] || ''
  const u = n.responseId
  return {
    suggestionRanking: o.indexOf(a),
    partialQuery: s,
    partialQueries: n.partialQueries,
    suggestions: o,
    querySuggestResponseId: u,
  }
}
var Fo = N('analytics/searchbox/submit', D.Search, (e) => e.logSearchboxSubmit())
function WS (e, t) {
  var c, l
  if (!OI(e));
  const r = B(e)
  const { dispatch: a } = e
  const n = () => e.state
  const o = ((c = t.options) == null ? void 0 : c.id) || Ja('search_box')
  const i = {
    id: o,
    highlightOptions: { ...((l = t.options) == null ? void 0 : l.highlightOptions) },
    ...Ru,
    ...t.options,
  }
  pe(e, zS, i, 'buildSearchBox'),
  a(Un({ id: o, query: e.state.query.q })),
  i.numberOfSuggestions && a(_n({ id: o, q: e.state.query.q, count: i.numberOfSuggestions }))
  const s = () => e.state.querySet[i.id]
  const u = async (d) => {
    const { enableQuerySyntax: m, clearFilters: p } = i
    a(Ts({ q: s(), enableQuerySyntax: m, clearFilters: p })), await a(t.executeSearchActionCreator(d))
  }
  return {
    ...r,
    updateText (d) {
      a(Sr({ id: o, query: d })), this.showSuggestions()
    },
    clear () {
      a(Sr({ id: o, query: '' })), a(Jr({ id: o }))
    },
    showSuggestions () {
      i.numberOfSuggestions && a(t.fetchQuerySuggestionsActionCreator({ id: o }))
    },
    selectSuggestion (d) {
      a(pt({ id: o, expression: d })),
      u(vu({ id: o, suggestion: d })).then(() => {
        a(Jr({ id: o }))
      })
    },
    submit () {
      u(Fo()), a(Jr({ id: o }))
    },
    get state () {
      const d = n()
      const m = d.querySuggest[i.id]
      const p = wI(m, i.highlightOptions)
      const f = m ? m.isLoading : !1
      return { value: s(), suggestions: p, isLoading: d.search.isLoading, isLoadingSuggestions: f }
    },
  }
}
function wI (e, t) {
  return e ? e.completions.map((r) => ({ highlightedValue: kd(r.highlighted, t), rawValue: r.expression })) : []
}
function OI (e) {
  return e.addReducers({ query: mt, querySuggest: ho, configuration: W, querySet: Bc, search: Z }), !0
}
function Cp (e, t = {}) {
  return WS(e, { ...t, executeSearchActionCreator: k, fetchQuerySuggestionsActionCreator: Xr })
}
var qI = { searchBoxId: ue, maxResultsPerQuery: new j({ required: !0, min: 1 }), cacheTimeout: new j() }
var YS = new K(qI)
function TI (e, t) {
  if (!kI(e));
  const r = B(e)
  const { dispatch: a } = e
  const n = () => e.state
  const o = {
    searchBoxId: t.options.searchBoxId || Ja('instant-results-'),
    cacheTimeout: t.options.cacheTimeout || 6e4,
    maxResultsPerQuery: t.options.maxResultsPerQuery,
  }
  pe(e, YS, o, 'buildInstantResults')
  const i = o.searchBoxId
  a(un({ id: i }))
  const s = () => n().instantResults[i]
  const u = (d) => s().cache[d]
  const c = () => s().q
  const l = () => {
    const d = u(c())
    return d ? (d.isLoading ? [] : d.results) : []
  }
  return {
    ...r,
    updateQuery (d) {
      if (!d) return
      const m = u(d)
      ;(!m || (!m.isLoading && (m.error || Mi(m)))) &&
        a(Mr({ id: i, q: d, maxResultsPerQuery: o.maxResultsPerQuery, cacheTimeout: o.cacheTimeout })),
      a(Vr({ id: i, q: d }))
    },
    clearExpired () {
      a(ln({ id: i }))
    },
    get state () {
      const d = c()
      const m = u(d)
      return {
        q: d,
        isLoading: (m == null ? void 0 : m.isLoading) || !1,
        error: (m == null ? void 0 : m.error) || null,
        results: l(),
      }
    },
  }
}
function kI (e) {
  return e.addReducers({ instantResults: Uc }), !0
}
var Ao = N('analytics/sort/results', D.Search, (e, t) => e.logResultsSort({ resultsSortBy: t.sortCriteria || Ke() }))
function DI (e, t) {
  if (!t) return
  const r = new K({ criterion: new Y({ each: Jp }) })
  const a = VI(t)
  const n = { ...t, criterion: a }
  Oe(e, r, n, 'buildSort')
}
function VI (e) {
  return e.criterion ? (Ma(e.criterion) ? e.criterion : [e.criterion]) : []
}
function KS (e, t) {
  var i
  if (!NI(e));
  const r = B(e)
  const { dispatch: a } = e
  const n = () => e.state
  DI(e, t.initialState)
  const o = (i = t.initialState) == null ? void 0 : i.criterion
  return (
    o && a(so(o)),
    {
      ...r,
      sortBy (s) {
        a(co(s)), a(Lt(1))
      },
      isSortedBy (s) {
        return this.state.sortCriteria === ur(s)
      },
      get state () {
        return { sortCriteria: n().sortCriteria }
      },
    }
  )
}
function NI (e) {
  return e.addReducers({ configuration: W, sortCriteria: _c }), !0
}
function MI (e, t = {}) {
  const { dispatch: r } = e
  const a = KS(e, t)
  const n = () => r(k(Ao()))
  return {
    ...a,
    get state () {
      return a.state
    },
    sortBy (o) {
      a.sortBy(o), n()
    },
  }
}
function ZS (e) {
  if (!zI(e));
  const t = B(e)
  const r = () => e.state
  return {
    ...t,
    sort (a) {
      return on(a, this.state.facetIds)
    },
    get state () {
      return { facetIds: r().search.response.facets.map((o) => o.facetId) }
    },
  }
}
function zI (e) {
  return e.addReducers({ search: Z, facetOptions: Te }), !0
}
function WI (e) {
  return ZS(e)
}
var YI = { categoryFacetId: J, categoryFacetPath: new Y({ required: !0, each: q }) }
var KI = (e, { categoryFacetId: t, categoryFacetPath: r }) => {
  const a = e.categoryFacetSet[t]
  const n = a == null ? void 0 : a.request.field
  const o = `${n}_${t}`
  return { categoryFacetId: t, categoryFacetPath: r, categoryFacetField: n, categoryFacetTitle: o }
}
var bu = (e) =>
  N('analytics/categoryFacet/breadcrumb', D.Search, (t, r) => (S(e, YI), t.logBreadcrumbFacet(KI(r, e))))()
var Fu = () => N('analytics/facet/deselectAllBreadcrumbs', D.Search, (e) => e.logBreadcrumbResetAll())()
var Au = (e, { facetId: t, selection: r }) => {
  const a = e.dateFacetSet[t] || e.numericFacetSet[t]
  const n = a.field
  const o = `${a.field}_${t}`
  return {
    facetId: t,
    facetField: n,
    facetTitle: o,
    facetRangeEndInclusive: r.endInclusive,
    facetRangeEnd: `${r.end}`,
    facetRangeStart: `${r.start}`,
  }
}
var Pu = (e) =>
  N('analytics/dateFacet/breadcrumb', D.Search, (t, r) => {
    S(e, On(e.selection))
    const a = Au(r, e)
    return t.logBreadcrumbFacet(a)
  })()
var Iu = (e) =>
  N('analytics/numericFacet/breadcrumb', D.Search, (t, r) => {
    S(e, On(e.selection))
    const a = Au(r, e)
    return t.logBreadcrumbFacet(a)
  })()
var Eu = (e, t, r, a) =>
  Object.keys(t)
    .map((n) => {
      const o = a(e.state, n).map((i) => ({ value: i, deselect: () => r({ facetId: n, selection: i }) }))
      return { facetId: n, field: t[n].field, values: o }
    })
    .filter((n) => n.values.length)
function eC (e) {
  const t = B(e)
  const { dispatch: r } = e
  return {
    ...t,
    get state () {
      return {
        facetBreadcrumbs: [],
        categoryFacetBreadcrumbs: [],
        numericFacetBreadcrumbs: [],
        dateFacetBreadcrumbs: [],
        staticFilterBreadcrumbs: [],
        hasBreadcrumbs: !1,
      }
    },
    deselectAll: () => {
      r(qe())
    },
    deselectBreadcrumb (a) {
      a.deselect()
    },
  }
}
function GI (e) {
  if (!JI(e));
  const t = eC(e)
  const { dispatch: r } = e
  const a = () => e.state
  const n = () =>
    Eu(
      e,
      a().facetSet,
      ({ facetId: p, selection: f }) => {
        const h = hc({ facetId: p, facetValue: f.value })
        r(Kt({ facetId: p, selection: f })), r(Hr({ facetId: p, freezeCurrentValues: !1 })), r(k(h))
      },
      cd
    )
  const o = () =>
    Eu(
      e,
      a().numericFacetSet,
      (p) => {
        r(Zt(p)), r(k(Iu(p)))
      },
      pu
    )
  const i = () =>
    Eu(
      e,
      a().dateFacetSet,
      (p) => {
        r(Jt(p)), r(k(Pu(p)))
      },
      fu
    )
  const s = (p) => {
    const f = ai(a(), p)
    return {
      facetId: p,
      field: a().categoryFacetSet[p].request.field,
      path: f,
      deselect: () => {
        r($t(p)), r(k(bu({ categoryFacetPath: f.map((h) => h.value), categoryFacetId: p })))
      },
    }
  }
  const u = () =>
    Object.keys(a().categoryFacetSet)
      .map(s)
      .filter((p) => p.path.length)
  const c = () => {
    const p = a().staticFilterSet || {}
    return Object.values(p).map(l)
  }
  const l = (p) => {
    const { id: f, values: h } = p
    const C = h.filter((x) => x.state === 'selected').map((x) => d(f, x))
    return { id: f, values: C }
  }
  const d = (p, f) => ({
    value: f,
    deselect: () => {
      const { caption: h, expression: C } = f
      const x = go({ staticFilterId: p, staticFilterValue: { caption: h, expression: C } })
      r(Cr({ id: p, value: f })), r(k(x))
    },
  })
  function m () {
    return !![...n(), ...o(), ...i(), ...u(), ...c()].length
  }
  return {
    ...t,
    get state () {
      return {
        facetBreadcrumbs: n(),
        categoryFacetBreadcrumbs: u(),
        numericFacetBreadcrumbs: o(),
        dateFacetBreadcrumbs: i(),
        staticFilterBreadcrumbs: c(),
        hasBreadcrumbs: m(),
      }
    },
    deselectAll: () => {
      t.deselectAll(), r(k(Fu()))
    },
  }
}
function JI (e) {
  return (
    e.addReducers({
      configuration: W,
      search: Z,
      facetSet: ra,
      numericFacetSet: ft,
      dateFacetSet: or,
      categoryFacetSet: aa,
    }),
    !0
  )
}
var tC = new K({ ...yp, redirectionUrl: new w({ required: !0, emptyAllowed: !1 }) })
function XI (e, t) {
  if (!ZI(e));
  const { dispatch: r } = e
  const a = () => e.state
  const n = t.options.id || Ja('standalone_search_box')
  const o = { id: n, highlightOptions: { ...t.options.highlightOptions }, ...Ru, ...t.options }
  pe(e, tC, o, 'buildStandaloneSearchBox')
  const i = Cp(e, { options: o })
  return (
    r(ao({ id: n, redirectionUrl: o.redirectionUrl })),
    {
      ...i,
      updateText (s) {
        i.updateText(s), r(oo({ id: n }))
      },
      selectSuggestion (s) {
        const u = Sp(a(), { id: n, suggestion: s })
        r(pt({ id: n, expression: s })), r(io({ id: n, metadata: u })), this.submit()
      },
      afterRedirection () {
        r(no({ id: n }))
      },
      submit () {
        r(it({ q: this.state.value, enableQuerySyntax: o.enableQuerySyntax })), r(ea({ id: n }))
      },
      get state () {
        const u = a().standaloneSearchBoxSet[n]
        return { ...i.state, isLoading: u.isLoading, redirectTo: u.redirectTo, analytics: u.analytics }
      },
    }
  )
}
function ZI (e) {
  return e.addReducers({ standaloneSearchBoxSet: Wc, configuration: W, query: mt, querySuggest: ho }), !0
}
function rC (e, t) {
  return e.q !== t.q
    ? Fo()
    : e.sortCriteria !== t.sortCriteria
      ? Ao()
      : e.firstResult !== t.firstResult
        ? vo()
        : e.numberOfResults !== t.numberOfResults
          ? Ro()
          : wu(e.f, t.f)
            ? xp(e.f, t.f)
            : wu(e.cf, t.cf)
              ? xp(e.cf, t.cf)
              : wu(e.nf, t.nf)
                ? nC(e.nf, t.nf)
                : wu(e.df, t.df)
                  ? nC(e.df, t.df)
                  : ia()
}
function wu (e = {}, t = {}) {
  return JSON.stringify(e) !== JSON.stringify(t)
}
function aC (e) {
  const t = {}
  return Object.keys(e).forEach((r) => (t[r] = e[r].map((a) => `${a.start}..${a.end}`))), t
}
function xp (e = {}, t = {}) {
  const r = Object.keys(e)
  const a = Object.keys(t)
  const n = r.filter((d) => !a.includes(d))
  if (n.length) {
    const d = n[0]
    return e[d].length > 1 ? je(d) : At({ facetId: d, facetValue: e[d][0] })
  }
  const o = a.filter((d) => !r.includes(d))
  if (o.length) {
    const d = o[0]
    return Ae({ facetId: d, facetValue: t[d][0] })
  }
  const i = a.find((d) => t[d].filter((m) => e[d].includes(m)))
  if (!i) return ia()
  const s = e[i]
  const u = t[i]
  const c = u.filter((d) => !s.includes(d))
  if (c.length) return Ae({ facetId: i, facetValue: c[0] })
  const l = s.filter((d) => !u.includes(d))
  return l.length ? At({ facetId: i, facetValue: l[0] }) : ia()
}
function nC (e = {}, t = {}) {
  return xp(aC(e), aC(t))
}
function oC (e) {
  var t, r, a, n, o, i
  return {
    q: ye().q,
    enableQuerySyntax: ye().enableQuerySyntax,
    aq: (r = (t = e.advancedSearchQueries) == null ? void 0 : t.defaultFilters.aq) != null ? r : _e().defaultFilters.aq,
    cq: (n = (a = e.advancedSearchQueries) == null ? void 0 : a.defaultFilters.cq) != null ? n : _e().defaultFilters.cq,
    firstResult: Ve().firstResult,
    numberOfResults:
      (i = (o = e.pagination) == null ? void 0 : o.defaultNumberOfResults) != null ? i : Ve().defaultNumberOfResults,
    sortCriteria: Ke(),
    f: {},
    cf: {},
    nf: {},
    df: {},
    debug: $e(),
    sf: {},
    tab: '',
  }
}
var eE = new K({ parameters: new Q({ options: { required: !0 }, values: Js }) })
function iC (e, t) {
  const { dispatch: r } = e
  const a = B(e)
  return (
    Oe(e, eE, t.initialState, 'buildSearchParameterManager'),
    r(se(t.initialState.parameters)),
    {
      ...a,
      synchronize (n) {
        const o = Ou(e, n)
        r(se(o))
      },
      get state () {
        return { parameters: Rp(e) }
      },
    }
  )
}
function Ou (e, t) {
  return { ...oC(e.state), ...t }
}
function Rp (e) {
  const t = e.state
  return { ...tE(t), ...rE(t), ...aE(t), ...nE(t), ...iE(t), ...sE(t), ...cE(t) }
}
function tE (e) {
  if (e.query === void 0) return {}
  const t = e.query.q
  return t !== ye().q ? { q: t } : {}
}
function rE (e) {
  const t = Object.values(e.tabSet || {}).find((r) => r.isActive)
  return t ? { tab: t.id } : {}
}
function aE (e) {
  if (e.sortCriteria === void 0) return {}
  const t = e.sortCriteria
  return t !== Ke() ? { sortCriteria: t } : {}
}
function nE (e) {
  if (e.facetSet === void 0) return {}
  const t = Object.entries(e.facetSet)
    .filter(([r]) => {
      var a, n, o
      return (o = (n = (a = e.facetOptions) == null ? void 0 : a.facets[r]) == null ? void 0 : n.enabled) != null
        ? o
        : !0
    })
    .map(([r, a]) => {
      const n = oE(a.currentValues)
      return n.length ? { [r]: n } : {}
    })
    .reduce((r, a) => ({ ...r, ...a }), {})
  return Object.keys(t).length ? { f: t } : {}
}
function oE (e) {
  return e.filter((t) => t.state === 'selected').map((t) => t.value)
}
function iE (e) {
  if (e.categoryFacetSet === void 0) return {}
  const t = Object.entries(e.categoryFacetSet)
    .filter(([r]) => {
      var a, n, o
      return (o = (n = (a = e.facetOptions) == null ? void 0 : a.facets[r]) == null ? void 0 : n.enabled) != null
        ? o
        : !0
    })
    .map(([r, a]) => {
      const { parents: n } = ot(a.request.currentValues)
      const o = n.map((i) => i.value)
      return o.length ? { [r]: o } : {}
    })
    .reduce((r, a) => ({ ...r, ...a }), {})
  return Object.keys(t).length ? { cf: t } : {}
}
function sE (e) {
  if (e.numericFacetSet === void 0) return {}
  const t = Object.entries(e.numericFacetSet)
    .filter(([r]) => {
      var a, n, o
      return (o = (n = (a = e.facetOptions) == null ? void 0 : a.facets[r]) == null ? void 0 : n.enabled) != null
        ? o
        : !0
    })
    .map(([r, a]) => {
      const n = sC(a.currentValues)
      return n.length ? { [r]: n } : {}
    })
    .reduce((r, a) => ({ ...r, ...a }), {})
  return Object.keys(t).length ? { nf: t } : {}
}
function cE (e) {
  if (e.dateFacetSet === void 0) return {}
  const t = Object.entries(e.dateFacetSet)
    .filter(([r]) => {
      var a, n, o
      return (o = (n = (a = e.facetOptions) == null ? void 0 : a.facets[r]) == null ? void 0 : n.enabled) != null
        ? o
        : !0
    })
    .map(([r, a]) => {
      const n = sC(a.currentValues)
      return n.length ? { [r]: n } : {}
    })
    .reduce((r, a) => ({ ...r, ...a }), {})
  return Object.keys(t).length ? { df: t } : {}
}
function sC (e) {
  return e.filter((t) => t.state === 'selected')
}
function vp (e, t) {
  const { dispatch: r } = e
  const a = iC(e, t)
  return {
    ...a,
    synchronize (n) {
      const o = cC(e)
      const i = Ou(e, o)
      const s = Ou(e, n)
      Fc(i, s) || (a.synchronize(n), r(k(rC(i, s))))
    },
    get state () {
      return { parameters: cC(e) }
    },
  }
}
function cC (e) {
  const t = e.state
  return { ...Rp(e), ...uE(t), ...lE(t), ...dE(t), ...pE(t), ...fE(t), ...hE(t), ...mE(t) }
}
function uE (e) {
  if (e.query === void 0) return {}
  const t = e.query.enableQuerySyntax
  return t !== void 0 && t !== ye().enableQuerySyntax ? { enableQuerySyntax: t } : {}
}
function lE (e) {
  if (e.advancedSearchQueries === void 0) return {}
  const { aq: t, defaultFilters: r } = e.advancedSearchQueries
  return t !== r.aq ? { aq: t } : {}
}
function dE (e) {
  if (e.advancedSearchQueries === void 0) return {}
  const { cq: t, defaultFilters: r } = e.advancedSearchQueries
  return t !== r.cq ? { cq: t } : {}
}
function pE (e) {
  if (e.pagination === void 0) return {}
  const t = e.pagination.firstResult
  return t !== Ve().firstResult ? { firstResult: t } : {}
}
function fE (e) {
  if (e.pagination === void 0) return {}
  const { numberOfResults: t, defaultNumberOfResults: r } = e.pagination
  return t !== r ? { numberOfResults: t } : {}
}
function mE (e) {
  if (e.staticFilterSet === void 0) return {}
  const t = Object.entries(e.staticFilterSet)
    .map(([r, a]) => {
      const n = gE(a.values)
      return n.length ? { [r]: n } : {}
    })
    .reduce((r, a) => ({ ...r, ...a }), {})
  return Object.keys(t).length ? { sf: t } : {}
}
function gE (e) {
  return e.filter((t) => t.state === 'selected').map((t) => t.caption)
}
function hE (e) {
  if (e.debug === void 0) return {}
  const t = e.debug
  return t !== $e() ? { debug: t } : {}
}
var qu = '&'
var Ii = '='
var bp = '..'
function Tu () {
  return { serialize: yE, deserialize: bE }
}
function yE (e) {
  return Object.entries(e)
    .map(SE)
    .filter((t) => t)
    .join(qu)
}
function SE (e) {
  const [t, r] = e
  return lC(t)
    ? t === 'f' || t === 'cf' || t === 'sf'
      ? CE(r)
        ? RE(t, r)
        : ''
      : t === 'nf' || t === 'df'
        ? xE(r)
          ? vE(t, r)
          : ''
        : `${t}${Ii}${encodeURIComponent(r)}`
    : ''
}
function CE (e) {
  return Fp(e) ? uC(e, (r) => typeof r === 'string') : !1
}
function xE (e) {
  return Fp(e) ? uC(e, (r) => Fp(r) && 'start' in r && 'end' in r) : !1
}
function Fp (e) {
  return !!(e && typeof e === 'object')
}
function uC (e, t) {
  return (
    Object.entries(e).filter((a) => {
      const n = a[1]
      return !Array.isArray(n) || !n.every(t)
    }).length === 0
  )
}
function RE (e, t) {
  return Object.entries(t)
    .map(([r, a]) => `${e}[${r}]${Ii}${a.map((n) => encodeURIComponent(n)).join(',')}`)
    .join(qu)
}
function vE (e, t) {
  return Object.entries(t)
    .map(([r, a]) => {
      const n = a.map(({ start: o, end: i }) => `${o}${bp}${i}`).join(',')
      return `${e}[${r}]${Ii}${n}`
    })
    .join(qu)
}
function bE (e) {
  return e
    .split(qu)
    .map((a) => FE(a))
    .map(AE)
    .filter(OE)
    .map(qE)
    .reduce((a, n) => {
      const [o, i] = n
      if (dC(o)) {
        const s = { ...a[o], ...i }
        return { ...a, [o]: s }
      }
      return { ...a, [o]: i }
    }, {})
}
function FE (e) {
  const [t, ...r] = e.split(Ii)
  const a = r.join(Ii)
  return [t, a]
}
function AE (e) {
  const [t, r] = e
  const n = /^(f|cf|nf|df|sf)\[(.+)\]$/.exec(t)
  if (!n) return e
  const o = n[1]
  const i = n[2]
  const s = r.split(',')
  const u = PE(o, s)
  const c = { [i]: u }
  return [o, JSON.stringify(c)]
}
function PE (e, t) {
  return e === 'nf' ? IE(t) : e === 'df' ? wE(t) : t
}
function IE (e) {
  return e
    .map((t) => t.split(bp).map(parseFloat))
    .filter((t) => t.length === 2 && t.every(Number.isFinite))
    .map(([t, r]) => Pi({ start: t, end: r, state: 'selected' }))
}
function EE (e) {
  try {
    return lg(e) ? (Cs(e, ci), !0) : Qt(e) ? (xa(e), !0) : !1
  } catch (t) {
    return !1
  }
}
function wE (e) {
  return e
    .map((t) => t.split(bp))
    .filter((t) => t.length === 2 && t.every((r) => EE(r)))
    .map(([t, r]) => wa({ start: t, end: r, state: 'selected' }))
}
function OE (e) {
  const t = lC(e[0])
  const r = e.length === 2
  return t && r
}
function lC (e) {
  return (
    e in
    {
      q: !0,
      aq: !0,
      cq: !0,
      enableQuerySyntax: !0,
      firstResult: !0,
      numberOfResults: !0,
      sortCriteria: !0,
      f: !0,
      cf: !0,
      nf: !0,
      df: !0,
      debug: !0,
      sf: !0,
      tab: !0,
    }
  )
}
function qE (e) {
  const [t, r] = e
  return t === 'enableQuerySyntax'
    ? [t, r === 'true']
    : t === 'debug'
      ? [t, r === 'true']
      : t === 'firstResult'
        ? [t, parseInt(r)]
        : t === 'numberOfResults'
          ? [t, parseInt(r)]
          : dC(t)
            ? [t, TE(r)]
            : [t, decodeURIComponent(r)]
}
function TE (e) {
  const t = JSON.parse(e)
  const r = {}
  return (
    Object.entries(t).forEach((a) => {
      const [n, o] = a
      r[n] = o.map((i) => (Na(i) ? decodeURIComponent(i) : i))
    }),
    r
  )
}
function dC (e) {
  return ['f', 'cf', 'nf', 'df', 'sf'].includes(e)
}
var kE = new K({ fragment: new w() })
function DE (e, t) {
  let r
  function a () {
    r = e.state.search.requestId
  }
  function n () {
    return r !== e.state.search.requestId
  }
  if (!NE(e));
  Oe(e, kE, t.initialState, 'buildUrlManager')
  const o = B(e)
  let i = t.initialState.fragment
  a()
  const s = vp(e, { initialState: { parameters: ku(i) } })
  return {
    ...o,
    subscribe (u) {
      const c = () => {
        const l = this.state.fragment
        !VE(i, l) && n() && ((i = l), u()), a()
      }
      return c(), e.subscribe(c)
    },
    get state () {
      return { fragment: Tu().serialize(s.state.parameters) }
    },
    synchronize (u) {
      i = u
      const c = ku(u)
      s.synchronize(c)
    },
  }
}
function VE (e, t) {
  if (e === t) return !0
  const r = ku(e)
  const a = ku(t)
  return Fc(r, a)
}
function ku (e) {
  return Tu().deserialize(e)
}
function NE (e) {
  return e.addReducers({ configuration: W }), !0
}
function ME (e) {
  return bo(e)
}
var BE = new K(Hd)
function UE (e, t = {}) {
  var i
  if (!_E(e));
  const r = gp(e, t)
  const { dispatch: a } = e
  const n = () => e.state
  const o = ((i = t.options) == null ? void 0 : i.folding) ? pe(e, BE, t.options.folding, 'buildFoldedResultList') : {}
  return (
    a(Kr({ ...o })),
    {
      ...r,
      loadCollection: (s) => {
        a(Gr(s.result.raw[e.state.folding.fields.collection])), a(zd(s.result))
      },
      logShowMoreFoldedResults: (s) => {
        a(zd(s))
      },
      logShowLessFoldedResults: () => {
        a(Bh())
      },
      findResultById (s) {
        return Pp(this.state.results, (u) => u.result.uniqueId === s.result.uniqueId)
      },
      findResultByCollection (s) {
        return Pp(this.state.results, (u) => u.result.raw.foldingcollection === s.result.raw.foldingcollection)
      },
      get state () {
        const s = n()
        return {
          ...r.state,
          results: r.state.results.map((u) => {
            const c = u.raw[s.folding.fields.collection]
            return !c || !s.folding.collections[c]
              ? { result: u, moreResultsAvailable: !1, isLoadingMoreResults: !1, children: [] }
              : s.folding.collections[c]
          }),
        }
      },
    }
  )
}
function _E (e) {
  return e.addReducers({ search: Z, configuration: W, folding: Mc, query: mt }), !0
}
function Pp (e, t) {
  for (let r = 0; r < e.length; r++) {
    const a = e[r]
    if (t(a)) return a
    if (a.children.length) {
      const n = Pp(a.children, t)
      if (n) return n
    }
  }
  return null
}
function zE (e) {
  if (!WE(e));
  const t = B(e)
  const { dispatch: r } = e
  const a = () => e.state
  const n = () => a().triggers.queryModification.newQuery
  const o = () => a().triggers.queryModification.originalQuery
  return {
    ...t,
    get state () {
      return { newQuery: n(), originalQuery: o(), wasQueryModified: n() !== '' }
    },
    undo () {
      r(pn(n())), r(it({ q: o() })), r(k(Is({ undoneQuery: n() })))
    },
  }
}
function WE (e) {
  return e.addReducers({ triggers: oa, query: mt }), !0
}
function GE (e) {
  if (!JE(e));
  const t = B(e)
  const { dispatch: r } = e
  const a = () => e.state
  let n = a().triggers.notifications
  return {
    ...t,
    subscribe (o) {
      const i = () => {
        const s = !Ta(n, this.state.notifications)
        ;(n = this.state.notifications), s && (o(), r(Es()))
      }
      return i(), e.subscribe(i)
    },
    get state () {
      return { notification: a().triggers.notification, notifications: a().triggers.notifications }
    },
  }
}
function JE (e) {
  return e.addReducers({ triggers: oa }), !0
}
function Rr (e, t) {
  var a, n, o
  const r =
    t != null
      ? t
      : (o = (n = (a = e.search) == null ? void 0 : a.response) == null ? void 0 : n.questionAnswer) == null
        ? void 0
        : o.documentId
  return r && e.search && dS(e, r.contentIdKey, r.contentIdValue)
}
function Da (e, t) {
  var n, o, i, s, u, c
  const r =
    (o = (n = e.questionAnswering) == null ? void 0 : n.relatedQuestions.findIndex((l) => l.questionAnswerId === t)) !=
    null
      ? o
      : -1
  if (r === -1) return null
  const a =
    (c =
      (u = (s = (i = e.search) == null ? void 0 : i.response) == null ? void 0 : s.questionAnswer) == null
        ? void 0
        : u.relatedQuestions) == null
      ? void 0
      : c[r]
  return a != null ? a : null
}
var Du = N('analytics/smartSnippet/expand', D.Custom, (e) => e.logExpandSmartSnippet())
var Vu = N('analytics/smartSnippet/collapse', D.Custom, (e) => e.logCollapseSmartSnippet())
var Nu = N('analytics/smartSnippet/like', D.Custom, (e) => e.logLikeSmartSnippet())
var Mu = N('analytics/smartSnippet/dislike', D.Custom, (e) => e.logDislikeSmartSnippet())
function Qu (e) {
  return N('analytics/smartSnippet/source/open', D.Click, (t, r) => {
    e && Ue(e)
    const a = e != null ? e : Rr(r)
    return t.logOpenSmartSnippetSource(Be(a, r), We(a))
  })()
}
var Lu = (e) =>
  N('analytics/smartSnippet/source/open', D.Click, (t, r) => {
    S(e, ep())
    const a = Rr(r)
    return t.logOpenSmartSnippetInlineLink(Be(a, r), { ...We(a), ...e })
  })()
var ju = N('analytics/smartSnippet/feedbackModal/open', D.Custom, (e) => e.logOpenSmartSnippetFeedbackModal())
var Bu = N('analytics/smartSnippet/feedbackModal/close', D.Custom, (e) => e.logCloseSmartSnippetFeedbackModal())
var Uu = (e) => N('analytics/smartSnippet/sendFeedback', D.Custom, (t) => t.logSmartSnippetFeedbackReason(e))()
var _u = (e) => N('analytics/smartSnippet/sendFeedback', D.Custom, (t) => t.logSmartSnippetFeedbackReason('other', e))()
var $u = (e) =>
  N('analytics/smartSnippetSuggestion/expand', D.Custom, (t, r) => {
    if ((Hn(e), !$n(e))) return t.logExpandSmartSnippetSuggestion(e)
    const a = Da(r, e.questionAnswerId)
    if (a) {
      return t.logExpandSmartSnippetSuggestion({
        question: a.question,
        answerSnippet: a.answerSnippet,
        documentId: a.documentId,
      })
    }
  })()
var Hu = (e) =>
  N('analytics/smartSnippetSuggestion/expand', D.Custom, (t, r) => {
    if ((Hn(e), !$n(e))) return t.logCollapseSmartSnippetSuggestion(e)
    const a = Da(r, e.questionAnswerId)
    if (a) {
      return t.logCollapseSmartSnippetSuggestion({
        question: a.question,
        answerSnippet: a.answerSnippet,
        documentId: a.documentId,
      })
    }
  })()
var zu = (e) =>
  N('analytics/smartSnippet/source/open', D.Click, (t, r) => {
    S(e, Ac())
    const a = Da(r, e.questionAnswerId)
    if (!a) return
    const n = Rr(r, a.documentId)
    if (n) {
      return t.logOpenSmartSnippetSuggestionSource(Be(n, r), {
        question: a.question,
        answerSnippet: a.answerSnippet,
        documentId: a.documentId,
      })
    }
  })()
var Wu = (e, t) =>
  N('analytics/smartSnippet/source/open', D.Click, (r, a) => {
    S(e, Ac()), S(t, ep())
    const n = Da(a, e.questionAnswerId)
    if (!n) return
    const o = Rr(a, n.documentId)
    if (o) {
      return r.logOpenSmartSnippetSuggestionInlineLink(Be(o, a), {
        question: n.question,
        answerSnippet: n.answerSnippet,
        documentId: n.documentId,
        linkText: t.linkText,
        linkURL: t.linkURL,
      })
    }
  })()
function Yu (e, t) {
  if (!XE(e));
  const r = () => e.state
  const a = new Set()
  const n = (l) => (a.has(l) ? !0 : (a.add(l), !1))
  let o = null
  const i = (l) => {
    o !== l && ((o = l), (u = {}), a.clear())
  }
  const s = (l, d, m) => {
    var p
    return It(
      e,
      { options: { selectionDelay: (p = t == null ? void 0 : t.options) == null ? void 0 : p.selectionDelay } },
      () => {
        n(d) || e.dispatch(m ? Wu({ questionAnswerId: m }, l) : Lu(l))
      }
    )
  }
  let u = {}
  const c = (l, d) => {
    const { searchResponseId: m } = r().search
    i(m)
    const p = ms({ ...l, questionAnswerId: d })
    return p in u || (u[p] = s(l, p, d)), u[p]
  }
  return {
    selectInlineLink (l, d) {
      var m
      ;(m = c(l, d)) == null || m.select()
    },
    beginDelayedSelectInlineLink (l, d) {
      var m
      ;(m = c(l, d)) == null || m.beginDelayedSelect()
    },
    cancelPendingSelectInlineLink (l, d) {
      var m
      ;(m = c(l, d)) == null || m.cancelPendingSelect()
    },
  }
}
function XE (e) {
  return e.addReducers({ search: Z, questionAnswering: ir }), !0
}
function ZE (e, t) {
  var u, c
  if (!ew(e));
  const r = B(e)
  const a = () => e.state
  const n = () => Rr(a())
  let o = null
  const i = It(
    e,
    { options: { selectionDelay: (u = t == null ? void 0 : t.options) == null ? void 0 : u.selectionDelay } },
    () => {
      const l = n()
      if (!l) {
        o = null
        return
      }
      const { searchResponseId: d } = a().search
      o !== d && ((o = d), e.dispatch(Qu()), e.dispatch(ar(l)))
    }
  )
  const s = Yu(e, {
    options: { selectionDelay: (c = t == null ? void 0 : t.options) == null ? void 0 : c.selectionDelay },
  })
  return {
    ...r,
    get state () {
      const l = a()
      return {
        question: l.search.response.questionAnswer.question,
        answer: l.search.response.questionAnswer.answerSnippet,
        documentId: l.search.response.questionAnswer.documentId,
        expanded: l.questionAnswering.expanded,
        answerFound: l.search.response.questionAnswer.answerSnippet !== '',
        liked: l.questionAnswering.liked,
        disliked: l.questionAnswering.disliked,
        feedbackModalOpen: l.questionAnswering.feedbackModalOpen,
        source: n(),
      }
    },
    expand () {
      e.dispatch(Du()), e.dispatch(zn())
    },
    collapse () {
      e.dispatch(Vu()), e.dispatch(Wn())
    },
    like () {
      e.dispatch(Nu()), e.dispatch(Yn())
    },
    dislike () {
      e.dispatch(Mu()), e.dispatch(Kn())
    },
    openFeedbackModal () {
      e.dispatch(ju()), e.dispatch(Gn())
    },
    closeFeedbackModal () {
      e.dispatch(Bu()), e.dispatch(Zr())
    },
    sendFeedback (l) {
      e.dispatch(Uu(l)), e.dispatch(Zr())
    },
    sendDetailedFeedback (l) {
      e.dispatch(_u(l)), e.dispatch(Zr())
    },
    selectSource () {
      i.select()
    },
    beginDelayedSelectSource () {
      i.beginDelayedSelect()
    },
    cancelPendingSelectSource () {
      i.cancelPendingSelect()
    },
    selectInlineLink (l) {
      s.selectInlineLink(l)
    },
    beginDelayedSelectInlineLink (l) {
      s.beginDelayedSelectInlineLink(l)
    },
    cancelPendingSelectInlineLink (l) {
      s.cancelPendingSelectInlineLink(l)
    },
  }
}
function ew (e) {
  return e.addReducers({ search: Z, questionAnswering: ir }), !0
}
function fC (e, t) {
  if (!tw(e));
  const r = () => e.state
  const a = (d) => {
    const m = r()
    const p = Da(m, d)
    return p ? Rr(m, p.documentId) : null
  }
  const n = new Set()
  const o = (d) => (n.has(d) ? !0 : (n.add(d), !1))
  let i = null
  const s = (d) => {
    i !== d && ((i = d), (c = {}), n.clear())
  }
  const u = (d, m) => {
    var p
    return It(
      e,
      { options: { selectionDelay: (p = t == null ? void 0 : t.options) == null ? void 0 : p.selectionDelay } },
      () => {
        o(m) || (e.dispatch(zu({ questionAnswerId: m })), e.dispatch(ar(d)))
      }
    )
  }
  let c = {}
  const l = (d) => {
    const { searchResponseId: m } = r().search
    s(m)
    const p = a(d)
    return p ? (d in c || (c[d] = u(p, d)), c[d]) : null
  }
  return {
    selectSource (d) {
      var m
      ;(m = l(d)) == null || m.select()
    },
    beginDelayedSelectSource (d) {
      var m
      ;(m = l(d)) == null || m.beginDelayedSelect()
    },
    cancelPendingSelectSource (d) {
      var m
      ;(m = l(d)) == null || m.cancelPendingSelect()
    },
  }
}
function tw (e) {
  return e.addReducers({ search: Z, questionAnswering: ir }), !0
}
function rw (e, t) {
  var u, c
  if (!aw(e));
  const r = B(e)
  const a = () => e.state
  const n = (l) => {
    const { contentIdKey: d, contentIdValue: m } = l
    return e.state.search.results.find((p) => xr(p, d) === m)
  }
  const o = fC(e, {
    options: { selectionDelay: (u = t == null ? void 0 : t.options) == null ? void 0 : u.selectionDelay },
  })
  const i = Yu(e, {
    options: { selectionDelay: (c = t == null ? void 0 : t.options) == null ? void 0 : c.selectionDelay },
  })
  const s = (l) => (typeof l === 'string' ? { questionAnswerId: l } : l)
  return {
    ...r,
    get state () {
      const l = a()
      return {
        questions: l.search.response.questionAnswer.relatedQuestions.map((d, m) => ({
          question: d.question,
          answer: d.answerSnippet,
          documentId: d.documentId,
          questionAnswerId: l.questionAnswering.relatedQuestions[m].questionAnswerId,
          expanded: l.questionAnswering.relatedQuestions[m].expanded,
          source: n(d.documentId),
        })),
      }
    },
    expand (l) {
      const d = s(l)
      e.dispatch($u(d)), e.dispatch(Jn(d))
    },
    collapse (l) {
      const d = s(l)
      e.dispatch(Hu(d)), e.dispatch(Xn(d))
    },
    selectSource (l) {
      o.selectSource(l)
    },
    beginDelayedSelectSource (l) {
      o.beginDelayedSelectSource(l)
    },
    cancelPendingSelectSource (l) {
      o.cancelPendingSelectSource(l)
    },
    selectInlineLink (l, d) {
      i.selectInlineLink(d, l)
    },
    beginDelayedSelectInlineLink (l, d) {
      i.beginDelayedSelectInlineLink(d, l)
    },
    cancelPendingSelectInlineLink (l, d) {
      i.cancelPendingSelectInlineLink(d, l)
    },
  }
}
function aw (e) {
  return e.addReducers({ search: Z, questionAnswering: ir }), !0
}
var mC = N('analytics/recentQueries/clear', D.Custom, (e) => e.logClearRecentQueries())
var gC = N('analytics/recentQueries/click', D.Search, (e) => e.logRecentQueryClick())
var nw = { queries: [] }
var ow = { maxLength: 10, clearFilters: !0 }
var iw = new K({ queries: new Y({ required: !0 }) })
var sw = new K({ maxLength: new j({ required: !0, min: 1 }), clearFilters: new G() })
function cw (e, t) {
  pe(e, sw, t == null ? void 0 : t.options, 'buildRecentQueriesList'),
  Oe(e, iw, t == null ? void 0 : t.initialState, 'buildRecentQueriesList')
}
function uw (e, t) {
  if (!lw(e));
  const r = B(e)
  const { dispatch: a } = e
  const n = () => e.state
  const o = { ...ow, ...(t == null ? void 0 : t.options) }
  const i = { ...nw, ...(t == null ? void 0 : t.initialState) }
  cw(e, { options: o, initialState: i })
  const s = { queries: i.queries, maxLength: o.maxLength }
  return (
    a(to(s)),
    {
      ...r,
      get state () {
        const u = n()
        return { ...u.recentQueries, analyticsEnabled: u.configuration.analytics.enabled }
      },
      clear () {
        a(mC()), a(ro())
      },
      executeRecentQuery (u) {
        const c = new j({ required: !0, min: 0, max: this.state.queries.length }).validate(u)
        if (c) throw new Error(c)
        a(Ts({ q: this.state.queries[u], clearFilters: o.clearFilters })), a(k(gC()))
      },
    }
  )
}
function lw (e) {
  return e.addReducers({ search: Z, recentQueries: Kc }), !0
}
N('analytics/recentResults/clear', D.Custom, (e) => e.logClearRecentResults())
function Cw (e, t) {
  if (!xw(e));
  const r = {}
  const a = (l) => {
    var d, m
    return (m = (d = e.state.facetOptions.facets[l]) == null ? void 0 : d.enabled) != null ? m : !0
  }
  const n = (l) =>
    e.state.facetSet && l in e.state.facetSet
      ? e.state.facetSet[l].currentValues
      : e.state.categoryFacetSet && l in e.state.categoryFacetSet
        ? e.state.categoryFacetSet[l].request.currentValues
        : e.state.numericFacetSet && l in e.state.numericFacetSet
          ? e.state.numericFacetSet[l].currentValues
          : e.state.dateFacetSet && l in e.state.dateFacetSet
            ? e.state.dateFacetSet[l].currentValues
            : null
  const o = () => {
    let l = !1
    return (
      Object.keys(r).forEach((d) => {
        const m = JSON.stringify(n(d))
        m !== r[d] && ((r[d] = m), (l = !0))
      }),
      l
    )
  }
  const i = () =>
    t.conditions.some((l) => {
      if (!a(l.parentFacetId)) return !1
      const d = n(l.parentFacetId)
      return d === null ? !1 : l.condition(d)
    })
  const s = () => {
    e.state.facetSet &&
      Object.entries(e.state.facetSet).forEach(
        ([l, d]) => d.freezeCurrentValues && e.dispatch(Hr({ facetId: l, freezeCurrentValues: !1 }))
      )
  }
  const u = () => {
    const l = a(t.facetId)
    const d = i()
    l !== d && (e.dispatch(d ? Le(t.facetId) : Se(t.facetId)), s())
  }
  t.conditions.forEach((l) => {
    l.parentFacetId in r || (r[l.parentFacetId] = JSON.stringify(n(l.parentFacetId)))
  })
  const c = t.conditions.length
    ? e.subscribe(() => {
      o() && u()
    })
    : () => {}
  return (
    t.conditions.length && u(),
    {
      stopWatching () {
        c()
      },
    }
  )
}
function xw (e) {
  return e.addReducers({ facetOptions: Te }), !0
}
function Aoe (e) {
  return e.addReducers({ configuration: W, pipeline: yo, searchHub: So }), { updateSearchConfiguration: lt }
}
function Woe (e) {
  return (
    e.addReducers({ dateFacetSet: or }),
    {
      deselectAllDateFacetValues: nc,
      registerDateFacet: Gt,
      toggleSelectDateFacetValue: Jt,
      updateDateFacetSortCriterion: ac,
      updateDateFacetValues: hr,
    }
  )
}
function xie (e) {
  return (
    e.addReducers({ numericFacetSet: ft }),
    {
      deselectAllNumericFacetValues: sc,
      registerNumericFacet: Xt,
      toggleSelectNumericFacetValue: Zt,
      updateNumericFacetSortCriterion: ic,
      updateNumericFacetValues: yr,
    }
  )
}
function jie (e) {
  return e.addReducers({ query: mt }), { updateQuery: it }
}
function zie (e) {
  return e.addReducers({ querySet: Bc }), { registerQuerySetQuery: Un, updateQuerySetQuery: Sr }
}
function dse (e) {
  return (
    e.addReducers({ querySuggest: ho }),
    { clearQuerySuggest: Jr, fetchQuerySuggestions: Xr, registerQuerySuggest: _n, selectQuerySuggestion: pt }
  )
}
var bw = new K({ priority: new j({ required: !1, default: 0, min: 0 }), fields: new Y({ required: !1, each: q }) })
function Fw (e) {
  if (!Aw(e));
  const t = []
  const r = (a) => {
    a.forEach((n) => {
      if (
        (bw.validate(n, 'Check the arguments of registerTemplates'), !n.conditions.every((i) => i instanceof Function))
      ) {
        throw new wo(
          'Each result template conditions should be a function that takes a result as an argument and returns a boolean'
        )
      }
    })
  }
  return {
    registerTemplates (...a) {
      const n = []
      try {
        r(a)
      } catch (o) {
        e.logger.error(o, 'Result template manager error')
        return
      }
      a.forEach((o) => {
        const i = { ...o, priority: o.priority || 0, fields: o.fields || [] }
        t.push(i), n.push(...i.fields)
      }),
      t.sort((o, i) => i.priority - o.priority),
      n.length && e.dispatch(Yr(n))
    },
    selectTemplate (a) {
      const n = t.find((o) => o.conditions.every((i) => i(a)))
      return n ? n.content : null
    },
  }
}
function Aw (e) {
  return e.addReducers({ fields: na }), !0
}
var SC
;((o) => {
  ;(o.getResultProperty = xr),
  (o.fieldsMustBeDefined = iS),
  (o.fieldsMustNotBeDefined = sS),
  (o.fieldMustMatch = cS),
  (o.fieldMustNotMatch = uS)
})(SC || (SC = {}))
function Pw (e) {
  const { by: t, order: r } = e
  switch (t) {
    case qt.Relevancy:
      return Oo()
    case qt.QRE:
      return Sl()
    case qt.NoSort:
      return Cl()
    case qt.Date:
      if (!r) {
        throw new Error(
          'An order (i.e., ascending or descending) should be specified for a sort criterion sorted by "date"'
        )
      }
      return hl(r)
    default:
      if (!r) {
        throw new Error(
          `An order (i.e., ascending or descending) should be specified for a sort criterion sorted by a field, such as "${t}"`
        )
      }
      return yl(t, r)
  }
}
function Iw (e) {
  return e === void 0 || e === Ar.Ascending || e === Ar.Descending
}
function Ew (e) {
  const t = e.split(',')
  const r = new Error(`Wrong criterion expression format for "${e}"`)
  if (!t.length) throw r
  return t.map((a) => {
    const n = a.trim().split(' ')
    const o = n[0].toLowerCase()
    const i = n[1] && n[1].toLowerCase()
    if (n.length > 2 || o === '') throw r
    if (!Iw(i)) {
      throw new Error(
        `Wrong criterion sort order "${i}" in expression "${e}". Order should either be "${Ar.Ascending}" or "${Ar.Descending}"`
      )
    }
    return Pw({ by: o, order: i })
  })
} /*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

/**
 * Binds the logging of document
 * @returns An unbind function for the events
 * @param engine A headless search engine instance.
 * @param result The result object
 * @param resultElement Parent result element
 * @param selector Optional. Css selector that selects all links to the document. Default: "a" tags with the clickUri as "href" parameter.
 */
function bindLogDocumentOpenOnResult (engine, result, resultElement, selector) {
  const interactiveResult = FI(engine, {
    options: { result },
  })
  const eventsMap = {
    contextmenu: () => interactiveResult.select(),
    click: () => interactiveResult.select(),
    mouseup: () => interactiveResult.select(),
    mousedown: () => interactiveResult.select(),
    touchstart: () => interactiveResult.beginDelayedSelect(),
    touchend: () => interactiveResult.cancelPendingSelect(),
  }
  const elements = resultElement.querySelectorAll(selector || 'a')
  elements.forEach((element) => {
    Object.keys(eventsMap).forEach((key) => element.addEventListener(key, eventsMap[key]))
  })
  return () => {
    elements.forEach((element) => {
      Object.keys(eventsMap).forEach((key) => element.removeEventListener(key, eventsMap[key]))
    })
  }
}
function buildStringTemplateFromResult (template, result, bindings) {
  return template.replace(/\${(.*?)}/g, (value) => {
    const key = value.substring(2, value.length - 1)
    let newValue = readFromObject(result, key)
    if (!newValue) {
      newValue = readFromObject(window, key)
    }
    if (!newValue) {
      bindings.engine.logger.warn(`${key} used in the href template is undefined for this result: ${result.uniqueId}`)
      return ''
    }
    return newValue
  })
}
function getStringValueFromResultOrNull (result, field) {
  const value = SC.getResultProperty(result, field)
  if (typeof value !== 'string' || value.trim() === '') {
    return null
  }
  return value
}
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
function readFromObject (object, key) {
  const firstPeriodIndex = key.indexOf('.')
  if (object && firstPeriodIndex !== -1) {
    const newKey = key.substring(firstPeriodIndex + 1)
    key = key.substring(0, firstPeriodIndex)
    return readFromObject(object[key], newKey)
  }
  return object ? object[key] : undefined
}

function buildCustomEvent (name, detail) {
  return new CustomEvent(name, {
    detail,
    // Event will bubble up the DOM until it is caught
    bubbles: true,
    // Allows to verify if event is caught (cancelled). If it's not caught, it won't be initialized.
    cancelable: true,
    // Allows to compose Atomic components inside one another, event will go across DOM/Shadow DOM
    composed: true,
  })
}
function listenOnce (element, type, listener, options) {
  const _listener = (evt) => {
    element.removeEventListener(type, _listener, options)
    typeof listener === 'object' ? listener.handleEvent.call(element, evt) : listener.call(element, evt)
  }
  element.addEventListener(type, _listener, options)
}

const NAMESPACE = 'atomic'

let scopeId
let contentRef
let hostTagName
let useNativeShadowDom = false
let checkSlotFallbackVisibility = false
let checkSlotRelocate = false
const isSvgMode = false
let renderingRef = null
let queuePending = false
const win = typeof window !== 'undefined' ? window : {}
const doc = win.document || { head: {} }
const plt = {
  $flags$: 0,
  $resourcesUrl$: '',
  jmp: (h) => h(),
  raf: (h) => requestAnimationFrame(h),
  ael: (el, eventName, listener, opts) => el.addEventListener(eventName, listener, opts),
  rel: (el, eventName, listener, opts) => el.removeEventListener(eventName, listener, opts),
  ce: (eventName, opts) => new CustomEvent(eventName, opts),
}
const promiseResolve = (v) => Promise.resolve(v)
const supportsConstructableStylesheets = /*@__PURE__*/ (() => {
  try {
    new CSSStyleSheet()
    return typeof new CSSStyleSheet().replaceSync === 'function'
  } catch (e) {}
  return false
})()
const addHostEventListeners = (elm, hostRef, listeners, attachParentListeners) => {
  if (listeners) {
    listeners.map(([flags, name, method]) => {
      const target = getHostListenerTarget(elm, flags)
      const handler = hostListenerProxy(hostRef, method)
      const opts = hostListenerOpts(flags)
      plt.ael(target, name, handler, opts)
      ;(hostRef.$rmListeners$ = hostRef.$rmListeners$ || []).push(() => plt.rel(target, name, handler, opts))
    })
  }
}
const hostListenerProxy = (hostRef, methodName) => (ev) => {
  try {
    {
      if (hostRef.$flags$ & 256 /* isListenReady */) {
        // instance is ready, let's call it's member method for this event
        hostRef.$lazyInstance$[methodName](ev)
      } else {
        ;(hostRef.$queuedListeners$ = hostRef.$queuedListeners$ || []).push([methodName, ev])
      }
    }
  } catch (e) {
    consoleError(e)
  }
}
const getHostListenerTarget = (elm, flags) => {
  if (flags & 4 /* TargetDocument */) return doc
  if (flags & 8 /* TargetWindow */) return win
  return elm
}
// prettier-ignore
const hostListenerOpts = (flags) => (flags & 2 /* Capture */) !== 0
const HYDRATED_CSS = '{visibility:hidden}.hydrated{visibility:inherit}'
const XLINK_NS = 'http://www.w3.org/1999/xlink'
const createTime = (fnName, tagName = '') => {
  {
    return () => {}
  }
}
const uniqueTime = (key, measureText) => {
  {
    return () => {}
  }
}
const rootAppliedStyles = new WeakMap()
const registerStyle = (scopeId, cssText, allowCS) => {
  let style = styles.get(scopeId)
  if (supportsConstructableStylesheets && allowCS) {
    style = style || new CSSStyleSheet()
    if (typeof style === 'string') {
      style = cssText
    } else {
      style.replaceSync(cssText)
    }
  } else {
    style = cssText
  }
  styles.set(scopeId, style)
}
const addStyle = (styleContainerNode, cmpMeta, mode, hostElm) => {
  const scopeId = getScopeId(cmpMeta)
  const style = styles.get(scopeId)
  // if an element is NOT connected then getRootNode() will return the wrong root node
  // so the fallback is to always use the document for the root node in those cases
  styleContainerNode = styleContainerNode.nodeType === 11 /* DocumentFragment */ ? styleContainerNode : doc
  if (style) {
    if (typeof style === 'string') {
      styleContainerNode = styleContainerNode.head || styleContainerNode
      let appliedStyles = rootAppliedStyles.get(styleContainerNode)
      let styleElm
      if (!appliedStyles) {
        rootAppliedStyles.set(styleContainerNode, (appliedStyles = new Set()))
      }
      if (!appliedStyles.has(scopeId)) {
        {
          {
            styleElm = doc.createElement('style')
            styleElm.innerHTML = style
          }
          styleContainerNode.insertBefore(styleElm, styleContainerNode.querySelector('link'))
        }
        if (appliedStyles) {
          appliedStyles.add(scopeId)
        }
      }
    } else if (!styleContainerNode.adoptedStyleSheets.includes(style)) {
      styleContainerNode.adoptedStyleSheets = [...styleContainerNode.adoptedStyleSheets, style]
    }
  }
  return scopeId
}
const attachStyles = (hostRef) => {
  const cmpMeta = hostRef.$cmpMeta$
  const elm = hostRef.$hostElement$
  const flags = cmpMeta.$flags$
  const endAttachStyles = createTime('attachStyles', cmpMeta.$tagName$)
  const scopeId = addStyle(elm.shadowRoot ? elm.shadowRoot : elm.getRootNode(), cmpMeta)
  if (flags & 10 /* needsScopedEncapsulation */) {
    // only required when we're NOT using native shadow dom (slot)
    // or this browser doesn't support native shadow dom
    // and this host element was NOT created with SSR
    // let's pick out the inner content for slot projection
    // create a node to represent where the original
    // content was first placed, which is useful later on
    // DOM WRITE!!
    elm['s-sc'] = scopeId
    elm.classList.add(scopeId + '-h')
  }
  endAttachStyles()
}
const getScopeId = (cmp, mode) => 'sc-' + cmp.$tagName$
/**
 * Default style mode id
 */
/**
 * Reusable empty obj/array
 * Don't add values to these!!
 */
const EMPTY_OBJ = {}
const isDef = (v) => v != null
const isComplexType = (o) => {
  // https://jsperf.com/typeof-fn-object/5
  o = typeof o
  return o === 'object' || o === 'function'
}
/**
 * Production h() function based on Preact by
 * Jason Miller (@developit)
 * Licensed under the MIT License
 * https://github.com/developit/preact/blob/master/LICENSE
 *
 * Modified for Stencil's compiler and vdom
 */
// const stack: any[] = [];
// export function h(nodeName: string | d.FunctionalComponent, vnodeData: d.PropsType, child?: d.ChildType): d.VNode;
// export function h(nodeName: string | d.FunctionalComponent, vnodeData: d.PropsType, ...children: d.ChildType[]): d.VNode;
const h = (nodeName, vnodeData, ...children) => {
  let child = null
  let key = null
  let slotName = null
  let simple = false
  let lastSimple = false
  const vNodeChildren = []
  const walk = (c) => {
    for (let i = 0; i < c.length; i++) {
      child = c[i]
      if (Array.isArray(child)) {
        walk(child)
      } else if (child != null && typeof child !== 'boolean') {
        if ((simple = typeof nodeName !== 'function' && !isComplexType(child))) {
          child = String(child)
        }
        if (simple && lastSimple) {
          // If the previous child was simple (string), we merge both
          vNodeChildren[vNodeChildren.length - 1].$text$ += child
        } else {
          // Append a new vNode, if it's text, we create a text vNode
          vNodeChildren.push(simple ? newVNode(null, child) : child)
        }
        lastSimple = simple
      }
    }
  }
  walk(children)
  if (vnodeData) {
    // normalize class / classname attributes
    if (vnodeData.key) {
      key = vnodeData.key
    }
    if (vnodeData.name) {
      slotName = vnodeData.name
    }
    {
      const classData = vnodeData.className || vnodeData.class
      if (classData) {
        vnodeData.class =
          typeof classData !== 'object'
            ? classData
            : Object.keys(classData)
              .filter((k) => classData[k])
              .join(' ')
      }
    }
  }
  if (typeof nodeName === 'function') {
    // nodeName is a functional component
    return nodeName(vnodeData === null ? {} : vnodeData, vNodeChildren, vdomFnUtils)
  }
  const vnode = newVNode(nodeName, null)
  vnode.$attrs$ = vnodeData
  if (vNodeChildren.length > 0) {
    vnode.$children$ = vNodeChildren
  }
  {
    vnode.$key$ = key
  }
  {
    vnode.$name$ = slotName
  }
  return vnode
}
const newVNode = (tag, text) => {
  const vnode = {
    $flags$: 0,
    $tag$: tag,
    $text$: text,
    $elm$: null,
    $children$: null,
  }
  {
    vnode.$attrs$ = null
  }
  {
    vnode.$key$ = null
  }
  {
    vnode.$name$ = null
  }
  return vnode
}
const Host = {}
const isHost = (node) => node && node.$tag$ === Host
const vdomFnUtils = {
  forEach: (children, cb) => children.map(convertToPublic).forEach(cb),
  map: (children, cb) => children.map(convertToPublic).map(cb).map(convertToPrivate),
}
const convertToPublic = (node) => ({
  vattrs: node.$attrs$,
  vchildren: node.$children$,
  vkey: node.$key$,
  vname: node.$name$,
  vtag: node.$tag$,
  vtext: node.$text$,
})
const convertToPrivate = (node) => {
  if (typeof node.vtag === 'function') {
    const vnodeData = Object.assign({}, node.vattrs)
    if (node.vkey) {
      vnodeData.key = node.vkey
    }
    if (node.vname) {
      vnodeData.name = node.vname
    }
    return h(node.vtag, vnodeData, ...(node.vchildren || []))
  }
  const vnode = newVNode(node.vtag, node.vtext)
  vnode.$attrs$ = node.vattrs
  vnode.$children$ = node.vchildren
  vnode.$key$ = node.vkey
  vnode.$name$ = node.vname
  return vnode
}
/**
 * Production setAccessor() function based on Preact by
 * Jason Miller (@developit)
 * Licensed under the MIT License
 * https://github.com/developit/preact/blob/master/LICENSE
 *
 * Modified for Stencil's compiler and vdom
 */
const setAccessor = (elm, memberName, oldValue, newValue, isSvg, flags) => {
  if (oldValue !== newValue) {
    let isProp = isMemberInElement(elm, memberName)
    let ln = memberName.toLowerCase()
    if (memberName === 'class') {
      const classList = elm.classList
      const oldClasses = parseClassList(oldValue)
      const newClasses = parseClassList(newValue)
      classList.remove(...oldClasses.filter((c) => c && !newClasses.includes(c)))
      classList.add(...newClasses.filter((c) => c && !oldClasses.includes(c)))
    } else if (memberName === 'style') {
      // update style attribute, css properties and values
      {
        for (const prop in oldValue) {
          if (!newValue || newValue[prop] == null) {
            if (prop.includes('-')) {
              elm.style.removeProperty(prop)
            } else {
              elm.style[prop] = ''
            }
          }
        }
      }
      for (const prop in newValue) {
        if (!oldValue || newValue[prop] !== oldValue[prop]) {
          if (prop.includes('-')) {
            elm.style.setProperty(prop, newValue[prop])
          } else {
            elm.style[prop] = newValue[prop]
          }
        }
      }
    } else if (memberName === 'key');
    else if (memberName === 'ref') {
      // minifier will clean this up
      if (newValue) {
        newValue(elm)
      }
    } else if (!isProp && memberName[0] === 'o' && memberName[1] === 'n') {
      // Event Handlers
      // so if the member name starts with "on" and the 3rd characters is
      // a capital letter, and it's not already a member on the element,
      // then we're assuming it's an event listener
      if (memberName[2] === '-') {
        // on- prefixed events
        // allows to be explicit about the dom event to listen without any magic
        // under the hood:
        // <my-cmp on-click> // listens for "click"
        // <my-cmp on-Click> // listens for "Click"
        // <my-cmp on-ionChange> // listens for "ionChange"
        // <my-cmp on-EVENTS> // listens for "EVENTS"
        memberName = memberName.slice(3)
      } else if (isMemberInElement(win, ln)) {
        // standard event
        // the JSX attribute could have been "onMouseOver" and the
        // member name "onmouseover" is on the window's prototype
        // so let's add the listener "mouseover", which is all lowercased
        memberName = ln.slice(2)
      } else {
        // custom event
        // the JSX attribute could have been "onMyCustomEvent"
        // so let's trim off the "on" prefix and lowercase the first character
        // and add the listener "myCustomEvent"
        // except for the first character, we keep the event name case
        memberName = ln[2] + memberName.slice(3)
      }
      if (oldValue) {
        plt.rel(elm, memberName, oldValue, false)
      }
      if (newValue) {
        plt.ael(elm, memberName, newValue, false)
      }
    } else {
      // Set property if it exists and it's not a SVG
      const isComplex = isComplexType(newValue)
      if ((isProp || (isComplex && newValue !== null)) && !isSvg) {
        try {
          if (!elm.tagName.includes('-')) {
            const n = newValue == null ? '' : newValue
            // Workaround for Safari, moving the <input> caret when re-assigning the same valued
            if (memberName === 'list') {
              isProp = false
            } else if (oldValue == null || elm[memberName] != n) {
              elm[memberName] = n
            }
          } else {
            elm[memberName] = newValue
          }
        } catch (e) {}
      }
      /**
       * Need to manually update attribute if:
       * - memberName is not an attribute
       * - if we are rendering the host element in order to reflect attribute
       * - if it's a SVG, since properties might not work in <svg>
       * - if the newValue is null/undefined or 'false'.
       */
      let xlink = false
      {
        if (ln !== (ln = ln.replace(/^xlink\:?/, ''))) {
          memberName = ln
          xlink = true
        }
      }
      if (newValue == null || newValue === false) {
        if (newValue !== false || elm.getAttribute(memberName) === '') {
          if (xlink) {
            elm.removeAttributeNS(XLINK_NS, memberName)
          } else {
            elm.removeAttribute(memberName)
          }
        }
      } else if ((!isProp || flags & 4 /* isHost */ || isSvg) && !isComplex) {
        newValue = newValue === true ? '' : newValue
        if (xlink) {
          elm.setAttributeNS(XLINK_NS, memberName, newValue)
        } else {
          elm.setAttribute(memberName, newValue)
        }
      }
    }
  }
}
const parseClassListRegex = /\s/
const parseClassList = (value) => (!value ? [] : value.split(parseClassListRegex))
const updateElement = (oldVnode, newVnode, isSvgMode, memberName) => {
  // if the element passed in is a shadow root, which is a document fragment
  // then we want to be adding attrs/props to the shadow root's "host" element
  // if it's not a shadow root, then we add attrs/props to the same element
  const elm =
    newVnode.$elm$.nodeType === 11 /* DocumentFragment */ && newVnode.$elm$.host ? newVnode.$elm$.host : newVnode.$elm$
  const oldVnodeAttrs = (oldVnode && oldVnode.$attrs$) || EMPTY_OBJ
  const newVnodeAttrs = newVnode.$attrs$ || EMPTY_OBJ
  {
    // remove attributes no longer present on the vnode by setting them to undefined
    for (memberName in oldVnodeAttrs) {
      if (!(memberName in newVnodeAttrs)) {
        setAccessor(elm, memberName, oldVnodeAttrs[memberName], undefined, isSvgMode, newVnode.$flags$)
      }
    }
  }
  // add new & update changed attributes
  for (memberName in newVnodeAttrs) {
    setAccessor(elm, memberName, oldVnodeAttrs[memberName], newVnodeAttrs[memberName], isSvgMode, newVnode.$flags$)
  }
}
const createElm = (oldParentVNode, newParentVNode, childIndex, parentElm) => {
  // tslint:disable-next-line: prefer-const
  const newVNode = newParentVNode.$children$[childIndex]
  let i = 0
  let elm
  let childNode
  let oldVNode
  if (!useNativeShadowDom) {
    // remember for later we need to check to relocate nodes
    checkSlotRelocate = true
    if (newVNode.$tag$ === 'slot') {
      if (scopeId) {
        // scoped css needs to add its scoped id to the parent element
        parentElm.classList.add(scopeId + '-s')
      }
      newVNode.$flags$ |= newVNode.$children$
        ? // slot element has fallback content
        2 /* isSlotFallback */
        : // slot element does not have fallback content
        1 /* isSlotReference */
    }
  }
  if (newVNode.$text$ !== null) {
    // create text node
    elm = newVNode.$elm$ = doc.createTextNode(newVNode.$text$)
  } else if (newVNode.$flags$ & 1 /* isSlotReference */) {
    // create a slot reference node
    elm = newVNode.$elm$ = doc.createTextNode('')
  } else {
    // create element
    elm = newVNode.$elm$ = doc.createElement(newVNode.$flags$ & 2 /* isSlotFallback */ ? 'slot-fb' : newVNode.$tag$)
    // add css classes, attrs, props, listeners, etc.
    {
      updateElement(null, newVNode, isSvgMode)
    }
    if (isDef(scopeId) && elm['s-si'] !== scopeId) {
      // if there is a scopeId and this is the initial render
      // then let's add the scopeId as a css class
      elm.classList.add((elm['s-si'] = scopeId))
    }
    if (newVNode.$children$) {
      for (i = 0; i < newVNode.$children$.length; ++i) {
        // create the node
        childNode = createElm(oldParentVNode, newVNode, i, elm)
        // return node could have been null
        if (childNode) {
          // append our new node
          elm.appendChild(childNode)
        }
      }
    }
  }
  {
    elm['s-hn'] = hostTagName
    if (newVNode.$flags$ & (2 /* isSlotFallback */ | 1) /* isSlotReference */) {
      // remember the content reference comment
      elm['s-sr'] = true
      // remember the content reference comment
      elm['s-cr'] = contentRef
      // remember the slot name, or empty string for default slot
      elm['s-sn'] = newVNode.$name$ || ''
      // check if we've got an old vnode for this slot
      oldVNode = oldParentVNode && oldParentVNode.$children$ && oldParentVNode.$children$[childIndex]
      if (oldVNode && oldVNode.$tag$ === newVNode.$tag$ && oldParentVNode.$elm$) {
        // we've got an old slot vnode and the wrapper is being replaced
        // so let's move the old slot content back to it's original location
        putBackInOriginalLocation(oldParentVNode.$elm$, false)
      }
    }
  }
  return elm
}
const putBackInOriginalLocation = (parentElm, recursive) => {
  plt.$flags$ |= 1 /* isTmpDisconnected */
  const oldSlotChildNodes = parentElm.childNodes
  for (let i = oldSlotChildNodes.length - 1; i >= 0; i--) {
    const childNode = oldSlotChildNodes[i]
    if (childNode['s-hn'] !== hostTagName && childNode['s-ol']) {
      // // this child node in the old element is from another component
      // // remove this node from the old slot's parent
      // childNode.remove();
      // and relocate it back to it's original location
      parentReferenceNode(childNode).insertBefore(childNode, referenceNode(childNode))
      // remove the old original location comment entirely
      // later on the patch function will know what to do
      // and move this to the correct spot in need be
      childNode['s-ol'].remove()
      childNode['s-ol'] = undefined
      checkSlotRelocate = true
    }
    if (recursive) {
      putBackInOriginalLocation(childNode, recursive)
    }
  }
  plt.$flags$ &= ~1 /* isTmpDisconnected */
}
const addVnodes = (parentElm, before, parentVNode, vnodes, startIdx, endIdx) => {
  let containerElm = (parentElm['s-cr'] && parentElm['s-cr'].parentNode) || parentElm
  let childNode
  if (containerElm.shadowRoot && containerElm.tagName === hostTagName) {
    containerElm = containerElm.shadowRoot
  }
  for (; startIdx <= endIdx; ++startIdx) {
    if (vnodes[startIdx]) {
      childNode = createElm(null, parentVNode, startIdx, parentElm)
      if (childNode) {
        vnodes[startIdx].$elm$ = childNode
        containerElm.insertBefore(childNode, referenceNode(before))
      }
    }
  }
}
const removeVnodes = (vnodes, startIdx, endIdx, vnode, elm) => {
  for (; startIdx <= endIdx; ++startIdx) {
    if ((vnode = vnodes[startIdx])) {
      elm = vnode.$elm$
      callNodeRefs(vnode)
      {
        // we're removing this element
        // so it's possible we need to show slot fallback content now
        checkSlotFallbackVisibility = true
        if (elm['s-ol']) {
          // remove the original location comment
          elm['s-ol'].remove()
        } else {
          // it's possible that child nodes of the node
          // that's being removed are slot nodes
          putBackInOriginalLocation(elm, true)
        }
      }
      // remove the vnode's element from the dom
      elm.remove()
    }
  }
}
const updateChildren = (parentElm, oldCh, newVNode, newCh) => {
  let oldStartIdx = 0
  let newStartIdx = 0
  let idxInOld = 0
  let i = 0
  let oldEndIdx = oldCh.length - 1
  let oldStartVnode = oldCh[0]
  let oldEndVnode = oldCh[oldEndIdx]
  let newEndIdx = newCh.length - 1
  let newStartVnode = newCh[0]
  let newEndVnode = newCh[newEndIdx]
  let node
  let elmToMove
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (oldStartVnode == null) {
      // Vnode might have been moved left
      oldStartVnode = oldCh[++oldStartIdx]
    } else if (oldEndVnode == null) {
      oldEndVnode = oldCh[--oldEndIdx]
    } else if (newStartVnode == null) {
      newStartVnode = newCh[++newStartIdx]
    } else if (newEndVnode == null) {
      newEndVnode = newCh[--newEndIdx]
    } else if (isSameVnode(oldStartVnode, newStartVnode)) {
      patch(oldStartVnode, newStartVnode)
      oldStartVnode = oldCh[++oldStartIdx]
      newStartVnode = newCh[++newStartIdx]
    } else if (isSameVnode(oldEndVnode, newEndVnode)) {
      patch(oldEndVnode, newEndVnode)
      oldEndVnode = oldCh[--oldEndIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (isSameVnode(oldStartVnode, newEndVnode)) {
      // Vnode moved right
      if (oldStartVnode.$tag$ === 'slot' || newEndVnode.$tag$ === 'slot') {
        putBackInOriginalLocation(oldStartVnode.$elm$.parentNode, false)
      }
      patch(oldStartVnode, newEndVnode)
      parentElm.insertBefore(oldStartVnode.$elm$, oldEndVnode.$elm$.nextSibling)
      oldStartVnode = oldCh[++oldStartIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (isSameVnode(oldEndVnode, newStartVnode)) {
      // Vnode moved left
      if (oldStartVnode.$tag$ === 'slot' || newEndVnode.$tag$ === 'slot') {
        putBackInOriginalLocation(oldEndVnode.$elm$.parentNode, false)
      }
      patch(oldEndVnode, newStartVnode)
      parentElm.insertBefore(oldEndVnode.$elm$, oldStartVnode.$elm$)
      oldEndVnode = oldCh[--oldEndIdx]
      newStartVnode = newCh[++newStartIdx]
    } else {
      // createKeyToOldIdx
      idxInOld = -1
      {
        for (i = oldStartIdx; i <= oldEndIdx; ++i) {
          if (oldCh[i] && oldCh[i].$key$ !== null && oldCh[i].$key$ === newStartVnode.$key$) {
            idxInOld = i
            break
          }
        }
      }
      if (idxInOld >= 0) {
        elmToMove = oldCh[idxInOld]
        if (elmToMove.$tag$ !== newStartVnode.$tag$) {
          node = createElm(oldCh && oldCh[newStartIdx], newVNode, idxInOld, parentElm)
        } else {
          patch(elmToMove, newStartVnode)
          oldCh[idxInOld] = undefined
          node = elmToMove.$elm$
        }
        newStartVnode = newCh[++newStartIdx]
      } else {
        // new element
        node = createElm(oldCh && oldCh[newStartIdx], newVNode, newStartIdx, parentElm)
        newStartVnode = newCh[++newStartIdx]
      }
      if (node) {
        {
          parentReferenceNode(oldStartVnode.$elm$).insertBefore(node, referenceNode(oldStartVnode.$elm$))
        }
      }
    }
  }
  if (oldStartIdx > oldEndIdx) {
    addVnodes(
      parentElm,
      newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].$elm$,
      newVNode,
      newCh,
      newStartIdx,
      newEndIdx
    )
  } else if (newStartIdx > newEndIdx) {
    removeVnodes(oldCh, oldStartIdx, oldEndIdx)
  }
}
const isSameVnode = (vnode1, vnode2) => {
  // compare if two vnode to see if they're "technically" the same
  // need to have the same element tag, and same key to be the same
  if (vnode1.$tag$ === vnode2.$tag$) {
    if (vnode1.$tag$ === 'slot') {
      return vnode1.$name$ === vnode2.$name$
    }
    {
      return vnode1.$key$ === vnode2.$key$
    }
  }
  return false
}
const referenceNode = (node) => {
  // this node was relocated to a new location in the dom
  // because of some other component's slot
  // but we still have an html comment in place of where
  // it's original location was according to it's original vdom
  return (node && node['s-ol']) || node
}
const parentReferenceNode = (node) => (node['s-ol'] ? node['s-ol'] : node).parentNode
const patch = (oldVNode, newVNode) => {
  const elm = (newVNode.$elm$ = oldVNode.$elm$)
  const oldChildren = oldVNode.$children$
  const newChildren = newVNode.$children$
  const tag = newVNode.$tag$
  const text = newVNode.$text$
  let defaultHolder
  if (text === null) {
    // element node
    {
      if (tag === 'slot');
      else {
        // either this is the first render of an element OR it's an update
        // AND we already know it's possible it could have changed
        // this updates the element's css classes, attrs, props, listeners, etc.
        updateElement(oldVNode, newVNode, isSvgMode)
      }
    }
    if (oldChildren !== null && newChildren !== null) {
      // looks like there's child vnodes for both the old and new vnodes
      updateChildren(elm, oldChildren, newVNode, newChildren)
    } else if (newChildren !== null) {
      // no old child vnodes, but there are new child vnodes to add
      if (oldVNode.$text$ !== null) {
        // the old vnode was text, so be sure to clear it out
        elm.textContent = ''
      }
      // add the new vnode children
      addVnodes(elm, null, newVNode, newChildren, 0, newChildren.length - 1)
    } else if (oldChildren !== null) {
      // no new child vnodes, but there are old child vnodes to remove
      removeVnodes(oldChildren, 0, oldChildren.length - 1)
    }
  } else if ((defaultHolder = elm['s-cr'])) {
    // this element has slotted content
    defaultHolder.parentNode.textContent = text
  } else if (oldVNode.$text$ !== text) {
    // update the text content for the text only vnode
    // and also only if the text is different than before
    elm.data = text
  }
}
const updateFallbackSlotVisibility = (elm) => {
  // tslint:disable-next-line: prefer-const
  const childNodes = elm.childNodes
  let childNode
  let i
  let ilen
  let j
  let slotNameAttr
  let nodeType
  for (i = 0, ilen = childNodes.length; i < ilen; i++) {
    childNode = childNodes[i]
    if (childNode.nodeType === 1 /* ElementNode */) {
      if (childNode['s-sr']) {
        // this is a slot fallback node
        // get the slot name for this slot reference node
        slotNameAttr = childNode['s-sn']
        // by default always show a fallback slot node
        // then hide it if there are other slots in the light dom
        childNode.hidden = false
        for (j = 0; j < ilen; j++) {
          nodeType = childNodes[j].nodeType
          if (childNodes[j]['s-hn'] !== childNode['s-hn'] || slotNameAttr !== '') {
            // this sibling node is from a different component OR is a named fallback slot node
            if (nodeType === 1 /* ElementNode */ && slotNameAttr === childNodes[j].getAttribute('slot')) {
              childNode.hidden = true
              break
            }
          } else {
            // this is a default fallback slot node
            // any element or text node (with content)
            // should hide the default fallback slot node
            if (
              nodeType === 1 /* ElementNode */ ||
              (nodeType === 3 /* TextNode */ && childNodes[j].textContent.trim() !== '')
            ) {
              childNode.hidden = true
              break
            }
          }
        }
      }
      // keep drilling down
      updateFallbackSlotVisibility(childNode)
    }
  }
}
const relocateNodes = []
const relocateSlotContent = (elm) => {
  // tslint:disable-next-line: prefer-const
  let childNode
  let node
  let hostContentNodes
  let slotNameAttr
  let relocateNodeData
  let j
  let i = 0
  const childNodes = elm.childNodes
  const ilen = childNodes.length
  for (; i < ilen; i++) {
    childNode = childNodes[i]
    if (childNode['s-sr'] && (node = childNode['s-cr']) && node.parentNode) {
      // first got the content reference comment node
      // then we got it's parent, which is where all the host content is in now
      hostContentNodes = node.parentNode.childNodes
      slotNameAttr = childNode['s-sn']
      for (j = hostContentNodes.length - 1; j >= 0; j--) {
        node = hostContentNodes[j]
        if (!node['s-cn'] && !node['s-nr'] && node['s-hn'] !== childNode['s-hn']) {
          // let's do some relocating to its new home
          // but never relocate a content reference node
          // that is suppose to always represent the original content location
          if (isNodeLocatedInSlot(node, slotNameAttr)) {
            // it's possible we've already decided to relocate this node
            relocateNodeData = relocateNodes.find((r) => r.$nodeToRelocate$ === node)
            // made some changes to slots
            // let's make sure we also double check
            // fallbacks are correctly hidden or shown
            checkSlotFallbackVisibility = true
            node['s-sn'] = node['s-sn'] || slotNameAttr
            if (relocateNodeData) {
              // previously we never found a slot home for this node
              // but turns out we did, so let's remember it now
              relocateNodeData.$slotRefNode$ = childNode
            } else {
              // add to our list of nodes to relocate
              relocateNodes.push({
                $slotRefNode$: childNode,
                $nodeToRelocate$: node,
              })
            }
            if (node['s-sr']) {
              relocateNodes.map((relocateNode) => {
                if (isNodeLocatedInSlot(relocateNode.$nodeToRelocate$, node['s-sn'])) {
                  relocateNodeData = relocateNodes.find((r) => r.$nodeToRelocate$ === node)
                  if (relocateNodeData && !relocateNode.$slotRefNode$) {
                    relocateNode.$slotRefNode$ = relocateNodeData.$slotRefNode$
                  }
                }
              })
            }
          } else if (!relocateNodes.some((r) => r.$nodeToRelocate$ === node)) {
            // so far this element does not have a slot home, not setting slotRefNode on purpose
            // if we never find a home for this element then we'll need to hide it
            relocateNodes.push({
              $nodeToRelocate$: node,
            })
          }
        }
      }
    }
    if (childNode.nodeType === 1 /* ElementNode */) {
      relocateSlotContent(childNode)
    }
  }
}
const isNodeLocatedInSlot = (nodeToRelocate, slotNameAttr) => {
  if (nodeToRelocate.nodeType === 1 /* ElementNode */) {
    if (nodeToRelocate.getAttribute('slot') === null && slotNameAttr === '') {
      return true
    }
    if (nodeToRelocate.getAttribute('slot') === slotNameAttr) {
      return true
    }
    return false
  }
  if (nodeToRelocate['s-sn'] === slotNameAttr) {
    return true
  }
  return slotNameAttr === ''
}
const callNodeRefs = (vNode) => {
  {
    vNode.$attrs$ && vNode.$attrs$.ref && vNode.$attrs$.ref(null)
    vNode.$children$ && vNode.$children$.map(callNodeRefs)
  }
}
const renderVdom = (hostRef, renderFnResults) => {
  const hostElm = hostRef.$hostElement$
  const cmpMeta = hostRef.$cmpMeta$
  const oldVNode = hostRef.$vnode$ || newVNode(null, null)
  const rootVnode = isHost(renderFnResults) ? renderFnResults : h(null, null, renderFnResults)
  hostTagName = hostElm.tagName
  if (cmpMeta.$attrsToReflect$) {
    rootVnode.$attrs$ = rootVnode.$attrs$ || {}
    cmpMeta.$attrsToReflect$.map(([propName, attribute]) => (rootVnode.$attrs$[attribute] = hostElm[propName]))
  }
  rootVnode.$tag$ = null
  rootVnode.$flags$ |= 4 /* isHost */
  hostRef.$vnode$ = rootVnode
  rootVnode.$elm$ = oldVNode.$elm$ = hostElm.shadowRoot || hostElm
  {
    scopeId = hostElm['s-sc']
  }
  {
    contentRef = hostElm['s-cr']
    useNativeShadowDom = (cmpMeta.$flags$ & 1) /* shadowDomEncapsulation */ !== 0
    // always reset
    checkSlotFallbackVisibility = false
  }
  // synchronous patch
  patch(oldVNode, rootVnode)
  {
    // while we're moving nodes around existing nodes, temporarily disable
    // the disconnectCallback from working
    plt.$flags$ |= 1 /* isTmpDisconnected */
    if (checkSlotRelocate) {
      relocateSlotContent(rootVnode.$elm$)
      let relocateData
      let nodeToRelocate
      let orgLocationNode
      let parentNodeRef
      let insertBeforeNode
      let refNode
      let i = 0
      for (; i < relocateNodes.length; i++) {
        relocateData = relocateNodes[i]
        nodeToRelocate = relocateData.$nodeToRelocate$
        if (!nodeToRelocate['s-ol']) {
          // add a reference node marking this node's original location
          // keep a reference to this node for later lookups
          orgLocationNode = doc.createTextNode('')
          orgLocationNode['s-nr'] = nodeToRelocate
          nodeToRelocate.parentNode.insertBefore((nodeToRelocate['s-ol'] = orgLocationNode), nodeToRelocate)
        }
      }
      for (i = 0; i < relocateNodes.length; i++) {
        relocateData = relocateNodes[i]
        nodeToRelocate = relocateData.$nodeToRelocate$
        if (relocateData.$slotRefNode$) {
          // by default we're just going to insert it directly
          // after the slot reference node
          parentNodeRef = relocateData.$slotRefNode$.parentNode
          insertBeforeNode = relocateData.$slotRefNode$.nextSibling
          orgLocationNode = nodeToRelocate['s-ol']
          while ((orgLocationNode = orgLocationNode.previousSibling)) {
            refNode = orgLocationNode['s-nr']
            if (refNode && refNode['s-sn'] === nodeToRelocate['s-sn'] && parentNodeRef === refNode.parentNode) {
              refNode = refNode.nextSibling
              if (!refNode || !refNode['s-nr']) {
                insertBeforeNode = refNode
                break
              }
            }
          }
          if (
            (!insertBeforeNode && parentNodeRef !== nodeToRelocate.parentNode) ||
            nodeToRelocate.nextSibling !== insertBeforeNode
          ) {
            // we've checked that it's worth while to relocate
            // since that the node to relocate
            // has a different next sibling or parent relocated
            if (nodeToRelocate !== insertBeforeNode) {
              if (!nodeToRelocate['s-hn'] && nodeToRelocate['s-ol']) {
                // probably a component in the index.html that doesn't have it's hostname set
                nodeToRelocate['s-hn'] = nodeToRelocate['s-ol'].parentNode.nodeName
              }
              // add it back to the dom but in its new home
              parentNodeRef.insertBefore(nodeToRelocate, insertBeforeNode)
            }
          }
        } else {
          // this node doesn't have a slot home to go to, so let's hide it
          if (nodeToRelocate.nodeType === 1 /* ElementNode */) {
            nodeToRelocate.hidden = true
          }
        }
      }
    }
    if (checkSlotFallbackVisibility) {
      updateFallbackSlotVisibility(rootVnode.$elm$)
    }
    // done moving nodes around
    // allow the disconnect callback to work again
    plt.$flags$ &= ~1 /* isTmpDisconnected */
    // always reset
    relocateNodes.length = 0
  }
}
const getElement = (ref) => getHostRef(ref).$hostElement$
const createEvent = (ref, name, flags) => {
  const elm = getElement(ref)
  return {
    emit: (detail) => {
      return emitEvent(elm, name, {
        bubbles: !!((flags & 4) /* Bubbles */),
        composed: !!((flags & 2) /* Composed */),
        cancelable: !!((flags & 1) /* Cancellable */),
        detail,
      })
    },
  }
}
/**
 * Helper function to create & dispatch a custom Event on a provided target
 * @param elm the target of the Event
 * @param name the name to give the custom Event
 * @param opts options for configuring a custom Event
 * @returns the custom Event
 */
const emitEvent = (elm, name, opts) => {
  const ev = plt.ce(name, opts)
  elm.dispatchEvent(ev)
  return ev
}
const attachToAncestor = (hostRef, ancestorComponent) => {
  if (ancestorComponent && !hostRef.$onRenderResolve$ && ancestorComponent['s-p']) {
    ancestorComponent['s-p'].push(new Promise((r) => (hostRef.$onRenderResolve$ = r)))
  }
}
const scheduleUpdate = (hostRef, isInitialLoad) => {
  {
    hostRef.$flags$ |= 16 /* isQueuedForUpdate */
  }
  if (hostRef.$flags$ & 4 /* isWaitingForChildren */) {
    hostRef.$flags$ |= 512 /* needsRerender */
    return
  }
  attachToAncestor(hostRef, hostRef.$ancestorComponent$)
  // there is no ancestor component or the ancestor component
  // has already fired off its lifecycle update then
  // fire off the initial update
  const dispatch = () => dispatchHooks(hostRef, isInitialLoad)
  return writeTask(dispatch)
}
const dispatchHooks = (hostRef, isInitialLoad) => {
  const endSchedule = createTime('scheduleUpdate', hostRef.$cmpMeta$.$tagName$)
  const instance = hostRef.$lazyInstance$
  let promise
  if (isInitialLoad) {
    {
      hostRef.$flags$ |= 256 /* isListenReady */
      if (hostRef.$queuedListeners$) {
        hostRef.$queuedListeners$.map(([methodName, event]) => safeCall(instance, methodName, event))
        hostRef.$queuedListeners$ = null
      }
    }
    {
      promise = safeCall(instance, 'componentWillLoad')
    }
  } else {
    {
      promise = safeCall(instance, 'componentWillUpdate')
    }
  }
  {
    promise = then(promise, () => safeCall(instance, 'componentWillRender'))
  }
  endSchedule()
  return then(promise, () => updateComponent(hostRef, instance, isInitialLoad))
}
const updateComponent = async (hostRef, instance, isInitialLoad) => {
  // updateComponent
  const elm = hostRef.$hostElement$
  const endUpdate = createTime('update', hostRef.$cmpMeta$.$tagName$)
  const rc = elm['s-rc']
  if (isInitialLoad) {
    // DOM WRITE!
    attachStyles(hostRef)
  }
  const endRender = createTime('render', hostRef.$cmpMeta$.$tagName$)
  {
    callRender(hostRef, instance)
  }
  if (rc) {
    // ok, so turns out there are some child host elements
    // waiting on this parent element to load
    // let's fire off all update callbacks waiting
    rc.map((cb) => cb())
    elm['s-rc'] = undefined
  }
  endRender()
  endUpdate()
  {
    const childrenPromises = elm['s-p']
    const postUpdate = () => postUpdateComponent(hostRef)
    if (childrenPromises.length === 0) {
      postUpdate()
    } else {
      Promise.all(childrenPromises).then(postUpdate)
      hostRef.$flags$ |= 4 /* isWaitingForChildren */
      childrenPromises.length = 0
    }
  }
}
const callRender = (hostRef, instance, elm) => {
  try {
    renderingRef = instance
    instance = instance.render && instance.render()
    {
      hostRef.$flags$ &= ~16 /* isQueuedForUpdate */
    }
    {
      hostRef.$flags$ |= 2 /* hasRendered */
    }
    {
      {
        // looks like we've got child nodes to render into this host element
        // or we need to update the css class/attrs on the host element
        // DOM WRITE!
        {
          renderVdom(hostRef, instance)
        }
      }
    }
  } catch (e) {
    consoleError(e, hostRef.$hostElement$)
  }
  renderingRef = null
  return null
}
const getRenderingRef = () => renderingRef
const postUpdateComponent = (hostRef) => {
  const tagName = hostRef.$cmpMeta$.$tagName$
  const elm = hostRef.$hostElement$
  const endPostUpdate = createTime('postUpdate', tagName)
  const instance = hostRef.$lazyInstance$
  const ancestorComponent = hostRef.$ancestorComponent$
  {
    safeCall(instance, 'componentDidRender')
  }
  if (!((hostRef.$flags$ & 64) /* hasLoadedComponent */)) {
    hostRef.$flags$ |= 64 /* hasLoadedComponent */
    {
      // DOM WRITE!
      addHydratedFlag(elm)
    }
    {
      safeCall(instance, 'componentDidLoad')
    }
    endPostUpdate()
    {
      hostRef.$onReadyResolve$(elm)
      if (!ancestorComponent) {
        appDidLoad()
      }
    }
  } else {
    {
      safeCall(instance, 'componentDidUpdate')
    }
    endPostUpdate()
  }
  {
    hostRef.$onInstanceResolve$(elm)
  }
  // load events fire from bottom to top
  // the deepest elements load first then bubbles up
  {
    if (hostRef.$onRenderResolve$) {
      hostRef.$onRenderResolve$()
      hostRef.$onRenderResolve$ = undefined
    }
    if (hostRef.$flags$ & 512 /* needsRerender */) {
      nextTick(() => scheduleUpdate(hostRef, false))
    }
    hostRef.$flags$ &= ~((4 /* isWaitingForChildren */ | 512) /* needsRerender */)
  }
  // ( •_•)
  // ( •_•)>⌐■-■
  // (⌐■_■)
}
const forceUpdate = (ref) => {
  {
    const hostRef = getHostRef(ref)
    const isConnected = hostRef.$hostElement$.isConnected
    if (isConnected && (hostRef.$flags$ & (2 /* hasRendered */ | 16)) /* isQueuedForUpdate */ === 2 /* hasRendered */) {
      scheduleUpdate(hostRef, false)
    }
    // Returns "true" when the forced update was successfully scheduled
    return isConnected
  }
}
const appDidLoad = (who) => {
  // on appload
  // we have finish the first big initial render
  {
    addHydratedFlag(doc.documentElement)
  }
  nextTick(() => emitEvent(win, 'appload', { detail: { namespace: NAMESPACE } }))
}
const safeCall = (instance, method, arg) => {
  if (instance && instance[method]) {
    try {
      return instance[method](arg)
    } catch (e) {
      consoleError(e)
    }
  }
  return undefined
}
const then = (promise, thenFn) => {
  return promise && promise.then ? promise.then(thenFn) : thenFn()
}
const addHydratedFlag = (elm) => elm.classList.add('hydrated')
/**
 * Parse a new property value for a given property type.
 *
 * While the prop value can reasonably be expected to be of `any` type as far as TypeScript's type checker is concerned,
 * it is not safe to assume that the string returned by evaluating `typeof propValue` matches:
 *   1. `any`, the type given to `propValue` in the function signature
 *   2. the type stored from `propType`.
 *
 * This function provides the capability to parse/coerce a property's value to potentially any other JavaScript type.
 *
 * Property values represented in TSX preserve their type information. In the example below, the number 0 is passed to
 * a component. This `propValue` will preserve its type information (`typeof propValue === 'number'`). Note that is
 * based on the type of the value being passed in, not the type declared of the class member decorated with `@Prop`.
 * ```tsx
 * <my-cmp prop-val={0}></my-cmp>
 * ```
 *
 * HTML prop values on the other hand, will always a string
 *
 * @param propValue the new value to coerce to some type
 * @param propType the type of the prop, expressed as a binary number
 * @returns the parsed/coerced value
 */
const parsePropertyValue = (propValue, propType) => {
  // ensure this value is of the correct prop type
  if (propValue != null && !isComplexType(propValue)) {
    if (propType & 4 /* Boolean */) {
      // per the HTML spec, any string value means it is a boolean true value
      // but we'll cheat here and say that the string "false" is the boolean false
      return propValue === 'false' ? false : propValue === '' || !!propValue
    }
    if (propType & 2 /* Number */) {
      // force it to be a number
      return parseFloat(propValue)
    }
    if (propType & 1 /* String */) {
      // could have been passed as a number or boolean
      // but we still want it as a string
      return String(propValue)
    }
    // redundant return here for better minification
    return propValue
  }
  // not sure exactly what type we want
  // so no need to change to a different type
  return propValue
}
const getValue = (ref, propName) => getHostRef(ref).$instanceValues$.get(propName)
const setValue = (ref, propName, newVal, cmpMeta) => {
  // check our new property value against our internal value
  const hostRef = getHostRef(ref)
  const elm = hostRef.$hostElement$
  const oldVal = hostRef.$instanceValues$.get(propName)
  const flags = hostRef.$flags$
  const instance = hostRef.$lazyInstance$
  newVal = parsePropertyValue(newVal, cmpMeta.$members$[propName][0])
  // explicitly check for NaN on both sides, as `NaN === NaN` is always false
  const areBothNaN = Number.isNaN(oldVal) && Number.isNaN(newVal)
  const didValueChange = newVal !== oldVal && !areBothNaN
  if ((!((flags & 8) /* isConstructingInstance */) || oldVal === undefined) && didValueChange) {
    // gadzooks! the property's value has changed!!
    // set our new value!
    hostRef.$instanceValues$.set(propName, newVal)
    if (instance) {
      // get an array of method names of watch functions to call
      if (cmpMeta.$watchers$ && flags & 128 /* isWatchReady */) {
        const watchMethods = cmpMeta.$watchers$[propName]
        if (watchMethods) {
          // this instance is watching for when this property changed
          watchMethods.map((watchMethodName) => {
            try {
              // fire off each of the watch methods that are watching this property
              instance[watchMethodName](newVal, oldVal, propName)
            } catch (e) {
              consoleError(e, elm)
            }
          })
        }
      }
      if ((flags & (2 /* hasRendered */ | 16)) /* isQueuedForUpdate */ === 2 /* hasRendered */) {
        if (instance.componentShouldUpdate) {
          if (instance.componentShouldUpdate(newVal, oldVal, propName) === false) {
            return
          }
        }
        // looks like this value actually changed, so we've got work to do!
        // but only if we've already rendered, otherwise just chill out
        // queue that we need to do an update, but don't worry about queuing
        // up millions cuz this function ensures it only runs once
        scheduleUpdate(hostRef, false)
      }
    }
  }
}
const proxyComponent = (Cstr, cmpMeta, flags) => {
  if (cmpMeta.$members$) {
    if (Cstr.watchers) {
      cmpMeta.$watchers$ = Cstr.watchers
    }
    // It's better to have a const than two Object.entries()
    const members = Object.entries(cmpMeta.$members$)
    const prototype = Cstr.prototype
    members.map(([memberName, [memberFlags]]) => {
      if (memberFlags & 31 /* Prop */ || (flags & 2 /* proxyState */ && memberFlags & 32) /* State */) {
        // proxyComponent - prop
        Object.defineProperty(prototype, memberName, {
          get () {
            // proxyComponent, get value
            return getValue(this, memberName)
          },
          set (newValue) {
            // proxyComponent, set value
            setValue(this, memberName, newValue, cmpMeta)
          },
          configurable: true,
          enumerable: true,
        })
      } else if (flags & 1 /* isElementConstructor */ && memberFlags & 64 /* Method */) {
        // proxyComponent - method
        Object.defineProperty(prototype, memberName, {
          value (...args) {
            const ref = getHostRef(this)
            return ref.$onInstancePromise$.then(() => ref.$lazyInstance$[memberName](...args))
          },
        })
      }
    })
    if (flags & 1 /* isElementConstructor */) {
      const attrNameToPropName = new Map()
      prototype.attributeChangedCallback = function (attrName, _oldValue, newValue) {
        plt.jmp(() => {
          const propName = attrNameToPropName.get(attrName)
          //  In a web component lifecycle the attributeChangedCallback runs prior to connectedCallback
          //  in the case where an attribute was set inline.
          //  ```html
          //    <my-component some-attribute="some-value"></my-component>
          //  ```
          //
          //  There is an edge case where a developer sets the attribute inline on a custom element and then
          //  programmatically changes it before it has been upgraded as shown below:
          //
          //  ```html
          //    <!-- this component has _not_ been upgraded yet -->
          //    <my-component id="test" some-attribute="some-value"></my-component>
          //    <script>
          //      // grab non-upgraded component
          //      el = document.querySelector("#test");
          //      el.someAttribute = "another-value";
          //      // upgrade component
          //      customElements.define('my-component', MyComponent);
          //    </script>
          //  ```
          //  In this case if we do not unshadow here and use the value of the shadowing property, attributeChangedCallback
          //  will be called with `newValue = "some-value"` and will set the shadowed property (this.someAttribute = "another-value")
          //  to the value that was set inline i.e. "some-value" from above example. When
          //  the connectedCallback attempts to unshadow it will use "some-value" as the initial value rather than "another-value"
          //
          //  The case where the attribute was NOT set inline but was not set programmatically shall be handled/unshadowed
          //  by connectedCallback as this attributeChangedCallback will not fire.
          //
          //  https://developers.google.com/web/fundamentals/web-components/best-practices#lazy-properties
          //
          //  TODO(STENCIL-16) we should think about whether or not we actually want to be reflecting the attributes to
          //  properties here given that this goes against best practices outlined here
          //  https://developers.google.com/web/fundamentals/web-components/best-practices#avoid-reentrancy
          if (this.hasOwnProperty(propName)) {
            newValue = this[propName]
            delete this[propName]
          } else if (
            prototype.hasOwnProperty(propName) &&
            typeof this[propName] === 'number' &&
            this[propName] == newValue
          ) {
            // if the propName exists on the prototype of `Cstr`, this update may be a result of Stencil using native
            // APIs to reflect props as attributes. Calls to `setAttribute(someElement, propName)` will result in
            // `propName` to be converted to a `DOMString`, which may not be what we want for other primitive props.
            return
          }
          this[propName] = newValue === null && typeof this[propName] === 'boolean' ? false : newValue
        })
      }
      // create an array of attributes to observe
      // and also create a map of html attribute name to js property name
      Cstr.observedAttributes = members
        .filter(([_, m]) => m[0] & 15 /* HasAttribute */) // filter to only keep props that should match attributes
        .map(([propName, m]) => {
          const attrName = m[1] || propName
          attrNameToPropName.set(attrName, propName)
          if (m[0] & 512 /* ReflectAttr */) {
            cmpMeta.$attrsToReflect$.push([propName, attrName])
          }
          return attrName
        })
    }
  }
  return Cstr
}
const initializeComponent = async (elm, hostRef, cmpMeta, hmrVersionId, Cstr) => {
  // initializeComponent
  if ((hostRef.$flags$ & 32) /* hasInitializedComponent */ === 0) {
    {
      // we haven't initialized this element yet
      hostRef.$flags$ |= 32 /* hasInitializedComponent */
      // lazy loaded components
      // request the component's implementation to be
      // wired up with the host element
      Cstr = loadModule(cmpMeta)
      if (Cstr.then) {
        // Await creates a micro-task avoid if possible
        const endLoad = uniqueTime()
        Cstr = await Cstr
        endLoad()
      }
      if (!Cstr.isProxied) {
        // we've never proxied this Constructor before
        // let's add the getters/setters to its prototype before
        // the first time we create an instance of the implementation
        {
          cmpMeta.$watchers$ = Cstr.watchers
        }
        proxyComponent(Cstr, cmpMeta, 2 /* proxyState */)
        Cstr.isProxied = true
      }
      const endNewInstance = createTime('createInstance', cmpMeta.$tagName$)
      // ok, time to construct the instance
      // but let's keep track of when we start and stop
      // so that the getters/setters don't incorrectly step on data
      {
        hostRef.$flags$ |= 8 /* isConstructingInstance */
      }
      // construct the lazy-loaded component implementation
      // passing the hostRef is very important during
      // construction in order to directly wire together the
      // host element and the lazy-loaded instance
      try {
        new Cstr(hostRef)
      } catch (e) {
        consoleError(e)
      }
      {
        hostRef.$flags$ &= ~8 /* isConstructingInstance */
      }
      {
        hostRef.$flags$ |= 128 /* isWatchReady */
      }
      endNewInstance()
      fireConnectedCallback(hostRef.$lazyInstance$)
    }
    if (Cstr.style) {
      // this component has styles but we haven't registered them yet
      const style = Cstr.style
      const scopeId = getScopeId(cmpMeta)
      if (!styles.has(scopeId)) {
        const endRegisterStyles = createTime('registerStyles', cmpMeta.$tagName$)
        registerStyle(scopeId, style, !!((cmpMeta.$flags$ & 1) /* shadowDomEncapsulation */))
        endRegisterStyles()
      }
    }
  }
  // we've successfully created a lazy instance
  const ancestorComponent = hostRef.$ancestorComponent$
  const schedule = () => scheduleUpdate(hostRef, true)
  if (ancestorComponent && ancestorComponent['s-rc']) {
    // this is the initial load and this component it has an ancestor component
    // but the ancestor component has NOT fired its will update lifecycle yet
    // so let's just cool our jets and wait for the ancestor to continue first
    // this will get fired off when the ancestor component
    // finally gets around to rendering its lazy self
    // fire off the initial update
    ancestorComponent['s-rc'].push(schedule)
  } else {
    schedule()
  }
}
const fireConnectedCallback = (instance) => {
  {
    safeCall(instance, 'connectedCallback')
  }
}
const connectedCallback = (elm) => {
  if ((plt.$flags$ & 1) /* isTmpDisconnected */ === 0) {
    const hostRef = getHostRef(elm)
    const cmpMeta = hostRef.$cmpMeta$
    const endConnected = createTime('connectedCallback', cmpMeta.$tagName$)
    if (!((hostRef.$flags$ & 1) /* hasConnected */)) {
      // first time this component has connected
      hostRef.$flags$ |= 1 /* hasConnected */
      {
        // initUpdate
        // if the slot polyfill is required we'll need to put some nodes
        // in here to act as original content anchors as we move nodes around
        // host element has been connected to the DOM
        if (cmpMeta.$flags$ & (4 /* hasSlotRelocation */ | 8) /* needsShadowDomShim */) {
          setContentReference(elm)
        }
      }
      {
        // find the first ancestor component (if there is one) and register
        // this component as one of the actively loading child components for its ancestor
        let ancestorComponent = elm
        while ((ancestorComponent = ancestorComponent.parentNode || ancestorComponent.host)) {
          // climb up the ancestors looking for the first
          // component that hasn't finished its lifecycle update yet
          if (ancestorComponent['s-p']) {
            // we found this components first ancestor component
            // keep a reference to this component's ancestor component
            attachToAncestor(hostRef, (hostRef.$ancestorComponent$ = ancestorComponent))
            break
          }
        }
      }
      // Lazy properties
      // https://developers.google.com/web/fundamentals/web-components/best-practices#lazy-properties
      if (cmpMeta.$members$) {
        Object.entries(cmpMeta.$members$).map(([memberName, [memberFlags]]) => {
          if (memberFlags & 31 /* Prop */ && elm.hasOwnProperty(memberName)) {
            const value = elm[memberName]
            delete elm[memberName]
            elm[memberName] = value
          }
        })
      }
      {
        initializeComponent(elm, hostRef, cmpMeta)
      }
    } else {
      // not the first time this has connected
      // reattach any event listeners to the host
      // since they would have been removed when disconnected
      addHostEventListeners(elm, hostRef, cmpMeta.$listeners$)
      // fire off connectedCallback() on component instance
      fireConnectedCallback(hostRef.$lazyInstance$)
    }
    endConnected()
  }
}
const setContentReference = (elm) => {
  // only required when we're NOT using native shadow dom (slot)
  // or this browser doesn't support native shadow dom
  // and this host element was NOT created with SSR
  // let's pick out the inner content for slot projection
  // create a node to represent where the original
  // content was first placed, which is useful later on
  const contentRefElm = (elm['s-cr'] = doc.createComment(''))
  contentRefElm['s-cn'] = true
  elm.insertBefore(contentRefElm, elm.firstChild)
}
const disconnectedCallback = (elm) => {
  if ((plt.$flags$ & 1) /* isTmpDisconnected */ === 0) {
    const hostRef = getHostRef(elm)
    const instance = hostRef.$lazyInstance$
    {
      if (hostRef.$rmListeners$) {
        hostRef.$rmListeners$.map((rmListener) => rmListener())
        hostRef.$rmListeners$ = undefined
      }
    }
    {
      safeCall(instance, 'disconnectedCallback')
    }
  }
}
const bootstrapLazy = (lazyBundles, options = {}) => {
  const endBootstrap = createTime()
  const cmpTags = []
  const exclude = options.exclude || []
  const customElements = win.customElements
  const head = doc.head
  const metaCharset = /*@__PURE__*/ head.querySelector('meta[charset]')
  const visibilityStyle = /*@__PURE__*/ doc.createElement('style')
  const deferredConnectedCallbacks = []
  let appLoadFallback
  let isBootstrapping = true
  Object.assign(plt, options)
  plt.$resourcesUrl$ = new URL(options.resourcesUrl || './', doc.baseURI).href
  lazyBundles.map((lazyBundle) => {
    lazyBundle[1].map((compactMeta) => {
      const cmpMeta = {
        $flags$: compactMeta[0],
        $tagName$: compactMeta[1],
        $members$: compactMeta[2],
        $listeners$: compactMeta[3],
      }
      {
        cmpMeta.$members$ = compactMeta[2]
      }
      {
        cmpMeta.$listeners$ = compactMeta[3]
      }
      {
        cmpMeta.$attrsToReflect$ = []
      }
      {
        cmpMeta.$watchers$ = {}
      }
      const tagName = cmpMeta.$tagName$
      const HostElement = class extends HTMLElement {
        // StencilLazyHost
        constructor (self) {
          // @ts-ignore
          super(self)
          self = this
          registerHost(self, cmpMeta)
          if (cmpMeta.$flags$ & 1 /* shadowDomEncapsulation */) {
            // this component is using shadow dom
            // and this browser supports shadow dom
            // add the read-only property "shadowRoot" to the host element
            // adding the shadow root build conditionals to minimize runtime
            {
              {
                self.attachShadow({ mode: 'open' })
              }
            }
          }
        }

        connectedCallback () {
          if (appLoadFallback) {
            clearTimeout(appLoadFallback)
            appLoadFallback = null
          }
          if (isBootstrapping) {
            // connectedCallback will be processed once all components have been registered
            deferredConnectedCallbacks.push(this)
          } else {
            plt.jmp(() => connectedCallback(this))
          }
        }

        disconnectedCallback () {
          plt.jmp(() => disconnectedCallback(this))
        }

        componentOnReady () {
          return getHostRef(this).$onReadyPromise$
        }
      }
      cmpMeta.$lazyBundleId$ = lazyBundle[0]
      if (!exclude.includes(tagName) && !customElements.get(tagName)) {
        cmpTags.push(tagName)
        customElements.define(tagName, proxyComponent(HostElement, cmpMeta, 1 /* isElementConstructor */))
      }
    })
  })
  {
    visibilityStyle.innerHTML = cmpTags + HYDRATED_CSS
    visibilityStyle.setAttribute('data-styles', '')
    head.insertBefore(visibilityStyle, metaCharset ? metaCharset.nextSibling : head.firstChild)
  }
  // Process deferred connectedCallbacks now all components have been registered
  isBootstrapping = false
  if (deferredConnectedCallbacks.length) {
    deferredConnectedCallbacks.map((host) => host.connectedCallback())
  } else {
    {
      plt.jmp(() => (appLoadFallback = setTimeout(appDidLoad, 30)))
    }
  }
  // Fallback appLoad event
  endBootstrap()
}
const getAssetPath = (path) => {
  const assetUrl = new URL(path, plt.$resourcesUrl$)
  return assetUrl.origin !== win.location.origin ? assetUrl.href : assetUrl.pathname
}
const Fragment = (_, children) => children
const hostRefs = new WeakMap()
const getHostRef = (ref) => hostRefs.get(ref)
const registerInstance = (lazyInstance, hostRef) => hostRefs.set((hostRef.$lazyInstance$ = lazyInstance), hostRef)
const registerHost = (elm, cmpMeta) => {
  const hostRef = {
    $flags$: 0,
    $hostElement$: elm,
    $cmpMeta$: cmpMeta,
    $instanceValues$: new Map(),
  }
  {
    hostRef.$onInstancePromise$ = new Promise((r) => (hostRef.$onInstanceResolve$ = r))
  }
  {
    hostRef.$onReadyPromise$ = new Promise((r) => (hostRef.$onReadyResolve$ = r))
    elm['s-p'] = []
    elm['s-rc'] = []
  }
  addHostEventListeners(elm, hostRef, cmpMeta.$listeners$)
  return hostRefs.set(elm, hostRef)
}
const isMemberInElement = (elm, memberName) => memberName in elm
const consoleError = (e, el) => (0, console.error)(e, el)
const cmpModules = /*@__PURE__*/ new Map()
const loadModule = (cmpMeta, hostRef, hmrVersionId) => {
  // loadModuleImport
  const exportName = cmpMeta.$tagName$.replace(/-/g, '_')
  const bundleId = cmpMeta.$lazyBundleId$
  const module = cmpModules.get(bundleId)
  if (module) {
    return module[exportName]
  }
  /*!__STENCIL_STATIC_IMPORT_SWITCH__*/
  return import(
    /* @vite-ignore */
    /* webpackInclude: /\.entry\.js$/ */
    /* webpackExclude: /\.system\.entry\.js$/ */
    /* webpackMode: "lazy" */
    `./${bundleId}.entry.js${''}`
  ).then((importedModule) => {
    {
      cmpModules.set(bundleId, importedModule)
    }
    return importedModule[exportName]
  }, consoleError)
}
const styles = new Map()
const queueDomReads = []
const queueDomWrites = []
const queueTask = (queue, write) => (cb) => {
  queue.push(cb)
  if (!queuePending) {
    queuePending = true
    if (write && plt.$flags$ & 4 /* queueSync */) {
      nextTick(flush)
    } else {
      plt.raf(flush)
    }
  }
}
const consume = (queue) => {
  for (let i = 0; i < queue.length; i++) {
    try {
      queue[i](performance.now())
    } catch (e) {
      consoleError(e)
    }
  }
  queue.length = 0
}
const flush = () => {
  // always force a bunch of medium callbacks to run, but still have
  // a throttle on how many can run in a certain time
  // DOM READS!!!
  consume(queueDomReads)
  // DOM WRITES!!!
  {
    consume(queueDomWrites)
    if ((queuePending = queueDomReads.length > 0)) {
      // still more to do yet, but we've run out of time
      // let's let this thing cool off and try again in the next tick
      plt.raf(flush)
    }
  }
}
const nextTick = /*@__PURE__*/ (cb) => promiseResolve().then(cb)
const writeTask = /*@__PURE__*/ queueTask(queueDomWrites, true)

var commonjsGlobal =
  typeof globalThis !== 'undefined'
    ? globalThis
    : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
        ? global
        : typeof self !== 'undefined'
          ? self
          : {}

function getDefaultExportFromCjs (x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x
}

function createCommonjsModule (fn, basedir, module) {
  return (
    (module = {
      path: basedir,
      exports: {},
      require: function (path, base) {
        return commonjsRequire()
      },
    }),
    fn(module, module.exports),
    module.exports
  )
}

function commonjsRequire () {
  throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs')
}

var purify = createCommonjsModule(function (module, exports) {
  /*! @license DOMPurify 2.3.10 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/2.3.10/LICENSE */

  ;(function (global, factory) {
    module.exports = factory()
  })(commonjsGlobal, function () {
    function _typeof (obj) {
      '@babel/helpers - typeof'

      return (
        (_typeof =
          typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
            ? function (obj) {
              return typeof obj
            }
            : function (obj) {
              return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype
                ? 'symbol'
                : typeof obj
            }),
        _typeof(obj)
      )
    }

    function _setPrototypeOf (o, p) {
      _setPrototypeOf =
        Object.setPrototypeOf ||
        function _setPrototypeOf (o, p) {
          o.__proto__ = p
          return o
        }

      return _setPrototypeOf(o, p)
    }

    function _isNativeReflectConstruct () {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false
      if (Reflect.construct.sham) return false
      if (typeof Proxy === 'function') return true

      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}))
        return true
      } catch (e) {
        return false
      }
    }

    function _construct (Parent, args, Class) {
      if (_isNativeReflectConstruct()) {
        _construct = Reflect.construct
      } else {
        _construct = function _construct (Parent, args, Class) {
          var a = [null]
          a.push.apply(a, args)
          var Constructor = Function.bind.apply(Parent, a)
          var instance = new Constructor()
          if (Class) _setPrototypeOf(instance, Class.prototype)
          return instance
        }
      }

      return _construct.apply(null, arguments)
    }

    function _toConsumableArray (arr) {
      return (
        _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread()
      )
    }

    function _arrayWithoutHoles (arr) {
      if (Array.isArray(arr)) return _arrayLikeToArray(arr)
    }

    function _iterableToArray (iter) {
      if ((typeof Symbol !== 'undefined' && iter[Symbol.iterator] != null) || iter['@@iterator'] != null) {
        return Array.from(iter)
      }
    }

    function _unsupportedIterableToArray (o, minLen) {
      if (!o) return
      if (typeof o === 'string') return _arrayLikeToArray(o, minLen)
      var n = Object.prototype.toString.call(o).slice(8, -1)
      if (n === 'Object' && o.constructor) n = o.constructor.name
      if (n === 'Map' || n === 'Set') return Array.from(o)
      if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen)
    }

    function _arrayLikeToArray (arr, len) {
      if (len == null || len > arr.length) len = arr.length

      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]

      return arr2
    }

    function _nonIterableSpread () {
      throw new TypeError(
        'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
      )
    }

    var hasOwnProperty = Object.hasOwnProperty
    var setPrototypeOf = Object.setPrototypeOf
    var isFrozen = Object.isFrozen
    var getPrototypeOf = Object.getPrototypeOf
    var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor
    var freeze = Object.freeze
    var seal = Object.seal
    var create = Object.create // eslint-disable-line import/no-mutable-exports

    var _ref = typeof Reflect !== 'undefined' && Reflect
    var apply = _ref.apply
    var construct = _ref.construct

    if (!apply) {
      apply = function apply (fun, thisValue, args) {
        return fun.apply(thisValue, args)
      }
    }

    if (!freeze) {
      freeze = function freeze (x) {
        return x
      }
    }

    if (!seal) {
      seal = function seal (x) {
        return x
      }
    }

    if (!construct) {
      construct = function construct (Func, args) {
        return _construct(Func, _toConsumableArray(args))
      }
    }

    var arrayForEach = unapply(Array.prototype.forEach)
    var arrayPop = unapply(Array.prototype.pop)
    var arrayPush = unapply(Array.prototype.push)
    var stringToLowerCase = unapply(String.prototype.toLowerCase)
    var stringMatch = unapply(String.prototype.match)
    var stringReplace = unapply(String.prototype.replace)
    var stringIndexOf = unapply(String.prototype.indexOf)
    var stringTrim = unapply(String.prototype.trim)
    var regExpTest = unapply(RegExp.prototype.test)
    var typeErrorCreate = unconstruct(TypeError)
    function unapply (func) {
      return function (thisArg) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key]
        }

        return apply(func, thisArg, args)
      }
    }
    function unconstruct (func) {
      return function () {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2]
        }

        return construct(func, args)
      }
    }
    /* Add properties to a lookup table */

    function addToSet (set, array, transformCaseFunc) {
      transformCaseFunc = transformCaseFunc || stringToLowerCase

      if (setPrototypeOf) {
        // Make 'in' and truthy checks like Boolean(set.constructor)
        // independent of any properties defined on Object.prototype.
        // Prevent prototype setters from intercepting set as a this value.
        setPrototypeOf(set, null)
      }

      var l = array.length

      while (l--) {
        var element = array[l]

        if (typeof element === 'string') {
          var lcElement = transformCaseFunc(element)

          if (lcElement !== element) {
            // Config presets (e.g. tags.js, attrs.js) are immutable.
            if (!isFrozen(array)) {
              array[l] = lcElement
            }

            element = lcElement
          }
        }

        set[element] = true
      }

      return set
    }
    /* Shallow clone an object */

    function clone (object) {
      var newObject = create(null)
      var property

      for (property in object) {
        if (apply(hasOwnProperty, object, [property])) {
          newObject[property] = object[property]
        }
      }

      return newObject
    }
    /* IE10 doesn't support __lookupGetter__ so lets'
     * simulate it. It also automatically checks
     * if the prop is function or getter and behaves
     * accordingly. */

    function lookupGetter (object, prop) {
      while (object !== null) {
        var desc = getOwnPropertyDescriptor(object, prop)

        if (desc) {
          if (desc.get) {
            return unapply(desc.get)
          }

          if (typeof desc.value === 'function') {
            return unapply(desc.value)
          }
        }

        object = getPrototypeOf(object)
      }

      function fallbackValue (element) {
        console.warn('fallback value for', element)
        return null
      }

      return fallbackValue
    }

    var html$1 = freeze([
      'a',
      'abbr',
      'acronym',
      'address',
      'area',
      'article',
      'aside',
      'audio',
      'b',
      'bdi',
      'bdo',
      'big',
      'blink',
      'blockquote',
      'body',
      'br',
      'button',
      'canvas',
      'caption',
      'center',
      'cite',
      'code',
      'col',
      'colgroup',
      'content',
      'data',
      'datalist',
      'dd',
      'decorator',
      'del',
      'details',
      'dfn',
      'dialog',
      'dir',
      'div',
      'dl',
      'dt',
      'element',
      'em',
      'fieldset',
      'figcaption',
      'figure',
      'font',
      'footer',
      'form',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'head',
      'header',
      'hgroup',
      'hr',
      'html',
      'i',
      'img',
      'input',
      'ins',
      'kbd',
      'label',
      'legend',
      'li',
      'main',
      'map',
      'mark',
      'marquee',
      'menu',
      'menuitem',
      'meter',
      'nav',
      'nobr',
      'ol',
      'optgroup',
      'option',
      'output',
      'p',
      'picture',
      'pre',
      'progress',
      'q',
      'rp',
      'rt',
      'ruby',
      's',
      'samp',
      'section',
      'select',
      'shadow',
      'small',
      'source',
      'spacer',
      'span',
      'strike',
      'strong',
      'style',
      'sub',
      'summary',
      'sup',
      'table',
      'tbody',
      'td',
      'template',
      'textarea',
      'tfoot',
      'th',
      'thead',
      'time',
      'tr',
      'track',
      'tt',
      'u',
      'ul',
      'var',
      'video',
      'wbr',
    ]) // SVG

    var svg$1 = freeze([
      'svg',
      'a',
      'altglyph',
      'altglyphdef',
      'altglyphitem',
      'animatecolor',
      'animatemotion',
      'animatetransform',
      'circle',
      'clippath',
      'defs',
      'desc',
      'ellipse',
      'filter',
      'font',
      'g',
      'glyph',
      'glyphref',
      'hkern',
      'image',
      'line',
      'lineargradient',
      'marker',
      'mask',
      'metadata',
      'mpath',
      'path',
      'pattern',
      'polygon',
      'polyline',
      'radialgradient',
      'rect',
      'stop',
      'style',
      'switch',
      'symbol',
      'text',
      'textpath',
      'title',
      'tref',
      'tspan',
      'view',
      'vkern',
    ])
    var svgFilters = freeze([
      'feBlend',
      'feColorMatrix',
      'feComponentTransfer',
      'feComposite',
      'feConvolveMatrix',
      'feDiffuseLighting',
      'feDisplacementMap',
      'feDistantLight',
      'feFlood',
      'feFuncA',
      'feFuncB',
      'feFuncG',
      'feFuncR',
      'feGaussianBlur',
      'feImage',
      'feMerge',
      'feMergeNode',
      'feMorphology',
      'feOffset',
      'fePointLight',
      'feSpecularLighting',
      'feSpotLight',
      'feTile',
      'feTurbulence',
    ]) // List of SVG elements that are disallowed by default.
    // We still need to know them so that we can do namespace
    // checks properly in case one wants to add them to
    // allow-list.

    var svgDisallowed = freeze([
      'animate',
      'color-profile',
      'cursor',
      'discard',
      'fedropshadow',
      'font-face',
      'font-face-format',
      'font-face-name',
      'font-face-src',
      'font-face-uri',
      'foreignobject',
      'hatch',
      'hatchpath',
      'mesh',
      'meshgradient',
      'meshpatch',
      'meshrow',
      'missing-glyph',
      'script',
      'set',
      'solidcolor',
      'unknown',
      'use',
    ])
    var mathMl$1 = freeze([
      'math',
      'menclose',
      'merror',
      'mfenced',
      'mfrac',
      'mglyph',
      'mi',
      'mlabeledtr',
      'mmultiscripts',
      'mn',
      'mo',
      'mover',
      'mpadded',
      'mphantom',
      'mroot',
      'mrow',
      'ms',
      'mspace',
      'msqrt',
      'mstyle',
      'msub',
      'msup',
      'msubsup',
      'mtable',
      'mtd',
      'mtext',
      'mtr',
      'munder',
      'munderover',
    ]) // Similarly to SVG, we want to know all MathML elements,
    // even those that we disallow by default.

    var mathMlDisallowed = freeze([
      'maction',
      'maligngroup',
      'malignmark',
      'mlongdiv',
      'mscarries',
      'mscarry',
      'msgroup',
      'mstack',
      'msline',
      'msrow',
      'semantics',
      'annotation',
      'annotation-xml',
      'mprescripts',
      'none',
    ])
    var text = freeze(['#text'])

    var html = freeze([
      'accept',
      'action',
      'align',
      'alt',
      'autocapitalize',
      'autocomplete',
      'autopictureinpicture',
      'autoplay',
      'background',
      'bgcolor',
      'border',
      'capture',
      'cellpadding',
      'cellspacing',
      'checked',
      'cite',
      'class',
      'clear',
      'color',
      'cols',
      'colspan',
      'controls',
      'controlslist',
      'coords',
      'crossorigin',
      'datetime',
      'decoding',
      'default',
      'dir',
      'disabled',
      'disablepictureinpicture',
      'disableremoteplayback',
      'download',
      'draggable',
      'enctype',
      'enterkeyhint',
      'face',
      'for',
      'headers',
      'height',
      'hidden',
      'high',
      'href',
      'hreflang',
      'id',
      'inputmode',
      'integrity',
      'ismap',
      'kind',
      'label',
      'lang',
      'list',
      'loading',
      'loop',
      'low',
      'max',
      'maxlength',
      'media',
      'method',
      'min',
      'minlength',
      'multiple',
      'muted',
      'name',
      'nonce',
      'noshade',
      'novalidate',
      'nowrap',
      'open',
      'optimum',
      'pattern',
      'placeholder',
      'playsinline',
      'poster',
      'preload',
      'pubdate',
      'radiogroup',
      'readonly',
      'rel',
      'required',
      'rev',
      'reversed',
      'role',
      'rows',
      'rowspan',
      'spellcheck',
      'scope',
      'selected',
      'shape',
      'size',
      'sizes',
      'span',
      'srclang',
      'start',
      'src',
      'srcset',
      'step',
      'style',
      'summary',
      'tabindex',
      'title',
      'translate',
      'type',
      'usemap',
      'valign',
      'value',
      'width',
      'xmlns',
      'slot',
    ])
    var svg = freeze([
      'accent-height',
      'accumulate',
      'additive',
      'alignment-baseline',
      'ascent',
      'attributename',
      'attributetype',
      'azimuth',
      'basefrequency',
      'baseline-shift',
      'begin',
      'bias',
      'by',
      'class',
      'clip',
      'clippathunits',
      'clip-path',
      'clip-rule',
      'color',
      'color-interpolation',
      'color-interpolation-filters',
      'color-profile',
      'color-rendering',
      'cx',
      'cy',
      'd',
      'dx',
      'dy',
      'diffuseconstant',
      'direction',
      'display',
      'divisor',
      'dur',
      'edgemode',
      'elevation',
      'end',
      'fill',
      'fill-opacity',
      'fill-rule',
      'filter',
      'filterunits',
      'flood-color',
      'flood-opacity',
      'font-family',
      'font-size',
      'font-size-adjust',
      'font-stretch',
      'font-style',
      'font-variant',
      'font-weight',
      'fx',
      'fy',
      'g1',
      'g2',
      'glyph-name',
      'glyphref',
      'gradientunits',
      'gradienttransform',
      'height',
      'href',
      'id',
      'image-rendering',
      'in',
      'in2',
      'k',
      'k1',
      'k2',
      'k3',
      'k4',
      'kerning',
      'keypoints',
      'keysplines',
      'keytimes',
      'lang',
      'lengthadjust',
      'letter-spacing',
      'kernelmatrix',
      'kernelunitlength',
      'lighting-color',
      'local',
      'marker-end',
      'marker-mid',
      'marker-start',
      'markerheight',
      'markerunits',
      'markerwidth',
      'maskcontentunits',
      'maskunits',
      'max',
      'mask',
      'media',
      'method',
      'mode',
      'min',
      'name',
      'numoctaves',
      'offset',
      'operator',
      'opacity',
      'order',
      'orient',
      'orientation',
      'origin',
      'overflow',
      'paint-order',
      'path',
      'pathlength',
      'patterncontentunits',
      'patterntransform',
      'patternunits',
      'points',
      'preservealpha',
      'preserveaspectratio',
      'primitiveunits',
      'r',
      'rx',
      'ry',
      'radius',
      'refx',
      'refy',
      'repeatcount',
      'repeatdur',
      'restart',
      'result',
      'rotate',
      'scale',
      'seed',
      'shape-rendering',
      'specularconstant',
      'specularexponent',
      'spreadmethod',
      'startoffset',
      'stddeviation',
      'stitchtiles',
      'stop-color',
      'stop-opacity',
      'stroke-dasharray',
      'stroke-dashoffset',
      'stroke-linecap',
      'stroke-linejoin',
      'stroke-miterlimit',
      'stroke-opacity',
      'stroke',
      'stroke-width',
      'style',
      'surfacescale',
      'systemlanguage',
      'tabindex',
      'targetx',
      'targety',
      'transform',
      'transform-origin',
      'text-anchor',
      'text-decoration',
      'text-rendering',
      'textlength',
      'type',
      'u1',
      'u2',
      'unicode',
      'values',
      'viewbox',
      'visibility',
      'version',
      'vert-adv-y',
      'vert-origin-x',
      'vert-origin-y',
      'width',
      'word-spacing',
      'wrap',
      'writing-mode',
      'xchannelselector',
      'ychannelselector',
      'x',
      'x1',
      'x2',
      'xmlns',
      'y',
      'y1',
      'y2',
      'z',
      'zoomandpan',
    ])
    var mathMl = freeze([
      'accent',
      'accentunder',
      'align',
      'bevelled',
      'close',
      'columnsalign',
      'columnlines',
      'columnspan',
      'denomalign',
      'depth',
      'dir',
      'display',
      'displaystyle',
      'encoding',
      'fence',
      'frame',
      'height',
      'href',
      'id',
      'largeop',
      'length',
      'linethickness',
      'lspace',
      'lquote',
      'mathbackground',
      'mathcolor',
      'mathsize',
      'mathvariant',
      'maxsize',
      'minsize',
      'movablelimits',
      'notation',
      'numalign',
      'open',
      'rowalign',
      'rowlines',
      'rowspacing',
      'rowspan',
      'rspace',
      'rquote',
      'scriptlevel',
      'scriptminsize',
      'scriptsizemultiplier',
      'selection',
      'separator',
      'separators',
      'stretchy',
      'subscriptshift',
      'supscriptshift',
      'symmetric',
      'voffset',
      'width',
      'xmlns',
    ])
    var xml = freeze(['xlink:href', 'xml:id', 'xlink:title', 'xml:space', 'xmlns:xlink'])

    var MUSTACHE_EXPR = seal(/\{\{[\w\W]*|[\w\W]*\}\}/gm) // Specify template detection regex for SAFE_FOR_TEMPLATES mode

    var ERB_EXPR = seal(/<%[\w\W]*|[\w\W]*%>/gm)
    var DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]/) // eslint-disable-line no-useless-escape

    var ARIA_ATTR = seal(/^aria-[\-\w]+$/) // eslint-disable-line no-useless-escape

    var IS_ALLOWED_URI = seal(
      /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i // eslint-disable-line no-useless-escape
    )
    var IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i)
    var ATTR_WHITESPACE = seal(
      /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g // eslint-disable-line no-control-regex
    )
    var DOCTYPE_NAME = seal(/^html$/i)

    var getGlobal = function getGlobal () {
      return typeof window === 'undefined' ? null : window
    }
    /**
     * Creates a no-op policy for internal use only.
     * Don't export this function outside this module!
     * @param {?TrustedTypePolicyFactory} trustedTypes The policy factory.
     * @param {Document} document The document object (to determine policy name suffix)
     * @return {?TrustedTypePolicy} The policy created (or null, if Trusted Types
     * are not supported).
     */

    var _createTrustedTypesPolicy = function _createTrustedTypesPolicy (trustedTypes, document) {
      if (_typeof(trustedTypes) !== 'object' || typeof trustedTypes.createPolicy !== 'function') {
        return null
      } // Allow the callers to control the unique policy name
      // by adding a data-tt-policy-suffix to the script element with the DOMPurify.
      // Policy creation with duplicate names throws in Trusted Types.

      var suffix = null
      var ATTR_NAME = 'data-tt-policy-suffix'

      if (document.currentScript && document.currentScript.hasAttribute(ATTR_NAME)) {
        suffix = document.currentScript.getAttribute(ATTR_NAME)
      }

      var policyName = 'dompurify' + (suffix ? '#' + suffix : '')

      try {
        return trustedTypes.createPolicy(policyName, {
          createHTML: function createHTML (html) {
            return html
          },
          createScriptURL: function createScriptURL (scriptUrl) {
            return scriptUrl
          },
        })
      } catch (_) {
        // Policy creation failed (most likely another DOMPurify script has
        // already run). Skip creating the policy, as this will only cause errors
        // if TT are enforced.
        console.warn('TrustedTypes policy ' + policyName + ' could not be created.')
        return null
      }
    }

    function createDOMPurify () {
      var window = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getGlobal()

      var DOMPurify = function DOMPurify (root) {
        return createDOMPurify(root)
      }
      /**
       * Version label, exposed for easier checks
       * if DOMPurify is up to date or not
       */

      DOMPurify.version = '2.3.10'
      /**
       * Array of elements that DOMPurify removed during sanitation.
       * Empty if nothing was removed.
       */

      DOMPurify.removed = []

      if (!window || !window.document || window.document.nodeType !== 9) {
        // Not running in a browser, provide a factory function
        // so that you can pass your own Window
        DOMPurify.isSupported = false
        return DOMPurify
      }

      var originalDocument = window.document
      var document = window.document
      var DocumentFragment = window.DocumentFragment
      var HTMLTemplateElement = window.HTMLTemplateElement
      var Node = window.Node
      var Element = window.Element
      var NodeFilter = window.NodeFilter
      var _window$NamedNodeMap = window.NamedNodeMap
      var NamedNodeMap =
        _window$NamedNodeMap === void 0 ? window.NamedNodeMap || window.MozNamedAttrMap : _window$NamedNodeMap
      var HTMLFormElement = window.HTMLFormElement
      var DOMParser = window.DOMParser
      var trustedTypes = window.trustedTypes
      var ElementPrototype = Element.prototype
      var cloneNode = lookupGetter(ElementPrototype, 'cloneNode')
      var getNextSibling = lookupGetter(ElementPrototype, 'nextSibling')
      var getChildNodes = lookupGetter(ElementPrototype, 'childNodes')
      var getParentNode = lookupGetter(ElementPrototype, 'parentNode') // As per issue #47, the web-components registry is inherited by a
      // new document created via createHTMLDocument. As per the spec
      // (http://w3c.github.io/webcomponents/spec/custom/#creating-and-passing-registries)
      // a new empty registry is used when creating a template contents owner
      // document, so we use that as our parent document to ensure nothing
      // is inherited.

      if (typeof HTMLTemplateElement === 'function') {
        var template = document.createElement('template')

        if (template.content && template.content.ownerDocument) {
          document = template.content.ownerDocument
        }
      }

      var trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, originalDocument)

      var emptyHTML = trustedTypesPolicy ? trustedTypesPolicy.createHTML('') : ''
      var _document = document
      var implementation = _document.implementation
      var createNodeIterator = _document.createNodeIterator
      var createDocumentFragment = _document.createDocumentFragment
      var getElementsByTagName = _document.getElementsByTagName
      var importNode = originalDocument.importNode
      var documentMode = {}

      try {
        documentMode = clone(document).documentMode ? document.documentMode : {}
      } catch (_) {}

      var hooks = {}
      /**
       * Expose whether this browser supports running the full DOMPurify.
       */

      DOMPurify.isSupported =
        typeof getParentNode === 'function' &&
        implementation &&
        typeof implementation.createHTMLDocument !== 'undefined' &&
        documentMode !== 9
      var MUSTACHE_EXPR$1 = MUSTACHE_EXPR
      var ERB_EXPR$1 = ERB_EXPR
      var DATA_ATTR$1 = DATA_ATTR
      var ARIA_ATTR$1 = ARIA_ATTR
      var IS_SCRIPT_OR_DATA$1 = IS_SCRIPT_OR_DATA
      var ATTR_WHITESPACE$1 = ATTR_WHITESPACE
      var IS_ALLOWED_URI$1 = IS_ALLOWED_URI
      /**
       * We consider the elements and attributes below to be safe. Ideally
       * don't add any new ones but feel free to remove unwanted ones.
       */

      /* allowed element names */

      var ALLOWED_TAGS = null
      var DEFAULT_ALLOWED_TAGS = addToSet(
        {},
        [].concat(
          _toConsumableArray(html$1),
          _toConsumableArray(svg$1),
          _toConsumableArray(svgFilters),
          _toConsumableArray(mathMl$1),
          _toConsumableArray(text)
        )
      )
      /* Allowed attribute names */

      var ALLOWED_ATTR = null
      var DEFAULT_ALLOWED_ATTR = addToSet(
        {},
        [].concat(
          _toConsumableArray(html),
          _toConsumableArray(svg),
          _toConsumableArray(mathMl),
          _toConsumableArray(xml)
        )
      )
      /*
       * Configure how DOMPUrify should handle custom elements and their attributes as well as customized built-in elements.
       * @property {RegExp|Function|null} tagNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any custom elements)
       * @property {RegExp|Function|null} attributeNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any attributes not on the allow list)
       * @property {boolean} allowCustomizedBuiltInElements allow custom elements derived from built-ins if they pass CUSTOM_ELEMENT_HANDLING.tagNameCheck. Default: `false`.
       */

      var CUSTOM_ELEMENT_HANDLING = Object.seal(
        Object.create(null, {
          tagNameCheck: {
            writable: true,
            configurable: false,
            enumerable: true,
            value: null,
          },
          attributeNameCheck: {
            writable: true,
            configurable: false,
            enumerable: true,
            value: null,
          },
          allowCustomizedBuiltInElements: {
            writable: true,
            configurable: false,
            enumerable: true,
            value: false,
          },
        })
      )
      /* Explicitly forbidden tags (overrides ALLOWED_TAGS/ADD_TAGS) */

      var FORBID_TAGS = null
      /* Explicitly forbidden attributes (overrides ALLOWED_ATTR/ADD_ATTR) */

      var FORBID_ATTR = null
      /* Decide if ARIA attributes are okay */

      var ALLOW_ARIA_ATTR = true
      /* Decide if custom data attributes are okay */

      var ALLOW_DATA_ATTR = true
      /* Decide if unknown protocols are okay */

      var ALLOW_UNKNOWN_PROTOCOLS = false
      /* Output should be safe for common template engines.
       * This means, DOMPurify removes data attributes, mustaches and ERB
       */

      var SAFE_FOR_TEMPLATES = false
      /* Decide if document with <html>... should be returned */

      var WHOLE_DOCUMENT = false
      /* Track whether config is already set on this instance of DOMPurify. */

      var SET_CONFIG = false
      /* Decide if all elements (e.g. style, script) must be children of
       * document.body. By default, browsers might move them to document.head */

      var FORCE_BODY = false
      /* Decide if a DOM `HTMLBodyElement` should be returned, instead of a html
       * string (or a TrustedHTML object if Trusted Types are supported).
       * If `WHOLE_DOCUMENT` is enabled a `HTMLHtmlElement` will be returned instead
       */

      var RETURN_DOM = false
      /* Decide if a DOM `DocumentFragment` should be returned, instead of a html
       * string  (or a TrustedHTML object if Trusted Types are supported) */

      var RETURN_DOM_FRAGMENT = false
      /* Try to return a Trusted Type object instead of a string, return a string in
       * case Trusted Types are not supported  */

      var RETURN_TRUSTED_TYPE = false
      /* Output should be free from DOM clobbering attacks? */

      var SANITIZE_DOM = true
      /* Keep element content when removing element? */

      var KEEP_CONTENT = true
      /* If a `Node` is passed to sanitize(), then performs sanitization in-place instead
       * of importing it into a new Document and returning a sanitized copy */

      var IN_PLACE = false
      /* Allow usage of profiles like html, svg and mathMl */

      var USE_PROFILES = {}
      /* Tags to ignore content of when KEEP_CONTENT is true */

      var FORBID_CONTENTS = null
      var DEFAULT_FORBID_CONTENTS = addToSet({}, [
        'annotation-xml',
        'audio',
        'colgroup',
        'desc',
        'foreignobject',
        'head',
        'iframe',
        'math',
        'mi',
        'mn',
        'mo',
        'ms',
        'mtext',
        'noembed',
        'noframes',
        'noscript',
        'plaintext',
        'script',
        'style',
        'svg',
        'template',
        'thead',
        'title',
        'video',
        'xmp',
      ])
      /* Tags that are safe for data: URIs */

      var DATA_URI_TAGS = null
      var DEFAULT_DATA_URI_TAGS = addToSet({}, ['audio', 'video', 'img', 'source', 'image', 'track'])
      /* Attributes safe for values like "javascript:" */

      var URI_SAFE_ATTRIBUTES = null
      var DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, [
        'alt',
        'class',
        'for',
        'id',
        'label',
        'name',
        'pattern',
        'placeholder',
        'role',
        'summary',
        'title',
        'value',
        'style',
        'xmlns',
      ])
      var MATHML_NAMESPACE = 'http://www.w3.org/1998/Math/MathML'
      var SVG_NAMESPACE = 'http://www.w3.org/2000/svg'
      var HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml'
      /* Document namespace */

      var NAMESPACE = HTML_NAMESPACE
      var IS_EMPTY_INPUT = false
      /* Parsing of strict XHTML documents */

      var PARSER_MEDIA_TYPE
      var SUPPORTED_PARSER_MEDIA_TYPES = ['application/xhtml+xml', 'text/html']
      var DEFAULT_PARSER_MEDIA_TYPE = 'text/html'
      var transformCaseFunc
      /* Keep a reference to config to pass to hooks */

      var CONFIG = null
      /* Ideally, do not touch anything below this line */

      /* ______________________________________________ */

      var formElement = document.createElement('form')

      var isRegexOrFunction = function isRegexOrFunction (testValue) {
        return testValue instanceof RegExp || testValue instanceof Function
      }
      /**
       * _parseConfig
       *
       * @param  {Object} cfg optional config literal
       */
      // eslint-disable-next-line complexity

      var _parseConfig = function _parseConfig (cfg) {
        if (CONFIG && CONFIG === cfg) {
          return
        }
        /* Shield configuration object from tampering */

        if (!cfg || _typeof(cfg) !== 'object') {
          cfg = {}
        }
        /* Shield configuration object from prototype pollution */

        cfg = clone(cfg)
        PARSER_MEDIA_TYPE = // eslint-disable-next-line unicorn/prefer-includes
          SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1
            ? (PARSER_MEDIA_TYPE = DEFAULT_PARSER_MEDIA_TYPE)
            : (PARSER_MEDIA_TYPE = cfg.PARSER_MEDIA_TYPE) // HTML tags and attributes are not case-sensitive, converting to lowercase. Keeping XHTML as is.

        transformCaseFunc =
          PARSER_MEDIA_TYPE === 'application/xhtml+xml'
            ? function (x) {
              return x
            }
            : stringToLowerCase
        /* Set configuration parameters */

        ALLOWED_TAGS = 'ALLOWED_TAGS' in cfg ? addToSet({}, cfg.ALLOWED_TAGS, transformCaseFunc) : DEFAULT_ALLOWED_TAGS
        ALLOWED_ATTR = 'ALLOWED_ATTR' in cfg ? addToSet({}, cfg.ALLOWED_ATTR, transformCaseFunc) : DEFAULT_ALLOWED_ATTR
        URI_SAFE_ATTRIBUTES =
          'ADD_URI_SAFE_ATTR' in cfg
            ? addToSet(
                clone(DEFAULT_URI_SAFE_ATTRIBUTES), // eslint-disable-line indent
                cfg.ADD_URI_SAFE_ATTR, // eslint-disable-line indent
                transformCaseFunc // eslint-disable-line indent
              ) // eslint-disable-line indent
            : DEFAULT_URI_SAFE_ATTRIBUTES
        DATA_URI_TAGS =
          'ADD_DATA_URI_TAGS' in cfg
            ? addToSet(
                clone(DEFAULT_DATA_URI_TAGS), // eslint-disable-line indent
                cfg.ADD_DATA_URI_TAGS, // eslint-disable-line indent
                transformCaseFunc // eslint-disable-line indent
              ) // eslint-disable-line indent
            : DEFAULT_DATA_URI_TAGS
        FORBID_CONTENTS =
          'FORBID_CONTENTS' in cfg ? addToSet({}, cfg.FORBID_CONTENTS, transformCaseFunc) : DEFAULT_FORBID_CONTENTS
        FORBID_TAGS = 'FORBID_TAGS' in cfg ? addToSet({}, cfg.FORBID_TAGS, transformCaseFunc) : {}
        FORBID_ATTR = 'FORBID_ATTR' in cfg ? addToSet({}, cfg.FORBID_ATTR, transformCaseFunc) : {}
        USE_PROFILES = 'USE_PROFILES' in cfg ? cfg.USE_PROFILES : false
        ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false // Default true

        ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false // Default true

        ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false // Default false

        SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false // Default false

        WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false // Default false

        RETURN_DOM = cfg.RETURN_DOM || false // Default false

        RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false // Default false

        RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false // Default false

        FORCE_BODY = cfg.FORCE_BODY || false // Default false

        SANITIZE_DOM = cfg.SANITIZE_DOM !== false // Default true

        KEEP_CONTENT = cfg.KEEP_CONTENT !== false // Default true

        IN_PLACE = cfg.IN_PLACE || false // Default false

        IS_ALLOWED_URI$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI$1
        NAMESPACE = cfg.NAMESPACE || HTML_NAMESPACE

        if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck)) {
          CUSTOM_ELEMENT_HANDLING.tagNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck
        }

        if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)) {
          CUSTOM_ELEMENT_HANDLING.attributeNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck
        }

        if (
          cfg.CUSTOM_ELEMENT_HANDLING &&
          typeof cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements === 'boolean'
        ) {
          CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements =
            cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements
        }

        if (SAFE_FOR_TEMPLATES) {
          ALLOW_DATA_ATTR = false
        }

        if (RETURN_DOM_FRAGMENT) {
          RETURN_DOM = true
        }
        /* Parse profile info */

        if (USE_PROFILES) {
          ALLOWED_TAGS = addToSet({}, _toConsumableArray(text))
          ALLOWED_ATTR = []

          if (USE_PROFILES.html === true) {
            addToSet(ALLOWED_TAGS, html$1)
            addToSet(ALLOWED_ATTR, html)
          }

          if (USE_PROFILES.svg === true) {
            addToSet(ALLOWED_TAGS, svg$1)
            addToSet(ALLOWED_ATTR, svg)
            addToSet(ALLOWED_ATTR, xml)
          }

          if (USE_PROFILES.svgFilters === true) {
            addToSet(ALLOWED_TAGS, svgFilters)
            addToSet(ALLOWED_ATTR, svg)
            addToSet(ALLOWED_ATTR, xml)
          }

          if (USE_PROFILES.mathMl === true) {
            addToSet(ALLOWED_TAGS, mathMl$1)
            addToSet(ALLOWED_ATTR, mathMl)
            addToSet(ALLOWED_ATTR, xml)
          }
        }
        /* Merge configuration parameters */

        if (cfg.ADD_TAGS) {
          if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
            ALLOWED_TAGS = clone(ALLOWED_TAGS)
          }

          addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc)
        }

        if (cfg.ADD_ATTR) {
          if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
            ALLOWED_ATTR = clone(ALLOWED_ATTR)
          }

          addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc)
        }

        if (cfg.ADD_URI_SAFE_ATTR) {
          addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR, transformCaseFunc)
        }

        if (cfg.FORBID_CONTENTS) {
          if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
            FORBID_CONTENTS = clone(FORBID_CONTENTS)
          }

          addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS, transformCaseFunc)
        }
        /* Add #text in case KEEP_CONTENT is set to true */

        if (KEEP_CONTENT) {
          ALLOWED_TAGS['#text'] = true
        }
        /* Add html, head and body to ALLOWED_TAGS in case WHOLE_DOCUMENT is true */

        if (WHOLE_DOCUMENT) {
          addToSet(ALLOWED_TAGS, ['html', 'head', 'body'])
        }
        /* Add tbody to ALLOWED_TAGS in case tables are permitted, see #286, #365 */

        if (ALLOWED_TAGS.table) {
          addToSet(ALLOWED_TAGS, ['tbody'])
          delete FORBID_TAGS.tbody
        } // Prevent further manipulation of configuration.
        // Not available in IE8, Safari 5, etc.

        if (freeze) {
          freeze(cfg)
        }

        CONFIG = cfg
      }

      var MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, ['mi', 'mo', 'mn', 'ms', 'mtext'])
      var HTML_INTEGRATION_POINTS = addToSet({}, ['foreignobject', 'desc', 'title', 'annotation-xml']) // Certain elements are allowed in both SVG and HTML
      // namespace. We need to specify them explicitly
      // so that they don't get erroneously deleted from
      // HTML namespace.

      var COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, ['title', 'style', 'font', 'a', 'script'])
      /* Keep track of all possible SVG and MathML tags
       * so that we can perform the namespace checks
       * correctly. */

      var ALL_SVG_TAGS = addToSet({}, svg$1)
      addToSet(ALL_SVG_TAGS, svgFilters)
      addToSet(ALL_SVG_TAGS, svgDisallowed)
      var ALL_MATHML_TAGS = addToSet({}, mathMl$1)
      addToSet(ALL_MATHML_TAGS, mathMlDisallowed)
      /**
       *
       *
       * @param  {Element} element a DOM element whose namespace is being checked
       * @returns {boolean} Return false if the element has a
       *  namespace that a spec-compliant parser would never
       *  return. Return true otherwise.
       */

      var _checkValidNamespace = function _checkValidNamespace (element) {
        var parent = getParentNode(element) // In JSDOM, if we're inside shadow DOM, then parentNode
        // can be null. We just simulate parent in this case.

        if (!parent || !parent.tagName) {
          parent = {
            namespaceURI: HTML_NAMESPACE,
            tagName: 'template',
          }
        }

        var tagName = stringToLowerCase(element.tagName)
        var parentTagName = stringToLowerCase(parent.tagName)

        if (element.namespaceURI === SVG_NAMESPACE) {
          // The only way to switch from HTML namespace to SVG
          // is via <svg>. If it happens via any other tag, then
          // it should be killed.
          if (parent.namespaceURI === HTML_NAMESPACE) {
            return tagName === 'svg'
          } // The only way to switch from MathML to SVG is via
          // svg if parent is either <annotation-xml> or MathML
          // text integration points.

          if (parent.namespaceURI === MATHML_NAMESPACE) {
            return (
              tagName === 'svg' && (parentTagName === 'annotation-xml' || MATHML_TEXT_INTEGRATION_POINTS[parentTagName])
            )
          } // We only allow elements that are defined in SVG
          // spec. All others are disallowed in SVG namespace.

          return Boolean(ALL_SVG_TAGS[tagName])
        }

        if (element.namespaceURI === MATHML_NAMESPACE) {
          // The only way to switch from HTML namespace to MathML
          // is via <math>. If it happens via any other tag, then
          // it should be killed.
          if (parent.namespaceURI === HTML_NAMESPACE) {
            return tagName === 'math'
          } // The only way to switch from SVG to MathML is via
          // <math> and HTML integration points

          if (parent.namespaceURI === SVG_NAMESPACE) {
            return tagName === 'math' && HTML_INTEGRATION_POINTS[parentTagName]
          } // We only allow elements that are defined in MathML
          // spec. All others are disallowed in MathML namespace.

          return Boolean(ALL_MATHML_TAGS[tagName])
        }

        if (element.namespaceURI === HTML_NAMESPACE) {
          // The only way to switch from SVG to HTML is via
          // HTML integration points, and from MathML to HTML
          // is via MathML text integration points
          if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) {
            return false
          }

          if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) {
            return false
          } // We disallow tags that are specific for MathML
          // or SVG and should never appear in HTML namespace

          return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName])
        } // The code should never reach this place (this means
        // that the element somehow got namespace that is not
        // HTML, SVG or MathML). Return false just in case.

        return false
      }
      /**
       * _forceRemove
       *
       * @param  {Node} node a DOM node
       */

      var _forceRemove = function _forceRemove (node) {
        arrayPush(DOMPurify.removed, {
          element: node,
        })

        try {
          // eslint-disable-next-line unicorn/prefer-dom-node-remove
          node.parentNode.removeChild(node)
        } catch (_) {
          try {
            node.outerHTML = emptyHTML
          } catch (_) {
            node.remove()
          }
        }
      }
      /**
       * _removeAttribute
       *
       * @param  {String} name an Attribute name
       * @param  {Node} node a DOM node
       */

      var _removeAttribute = function _removeAttribute (name, node) {
        try {
          arrayPush(DOMPurify.removed, {
            attribute: node.getAttributeNode(name),
            from: node,
          })
        } catch (_) {
          arrayPush(DOMPurify.removed, {
            attribute: null,
            from: node,
          })
        }

        node.removeAttribute(name) // We void attribute values for unremovable "is"" attributes

        if (name === 'is' && !ALLOWED_ATTR[name]) {
          if (RETURN_DOM || RETURN_DOM_FRAGMENT) {
            try {
              _forceRemove(node)
            } catch (_) {}
          } else {
            try {
              node.setAttribute(name, '')
            } catch (_) {}
          }
        }
      }
      /**
       * _initDocument
       *
       * @param  {String} dirty a string of dirty markup
       * @return {Document} a DOM, filled with the dirty markup
       */

      var _initDocument = function _initDocument (dirty) {
        /* Create a HTML document */
        var doc
        var leadingWhitespace

        if (FORCE_BODY) {
          dirty = '<remove></remove>' + dirty
        } else {
          /* If FORCE_BODY isn't used, leading whitespace needs to be preserved manually */
          var matches = stringMatch(dirty, /^[\r\n\t ]+/)
          leadingWhitespace = matches && matches[0]
        }

        if (PARSER_MEDIA_TYPE === 'application/xhtml+xml') {
          // Root of XHTML doc must contain xmlns declaration (see https://www.w3.org/TR/xhtml1/normative.html#strict)
          dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + '</body></html>'
        }

        var dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty
        /*
         * Use the DOMParser API by default, fallback later if needs be
         * DOMParser not work for svg when has multiple root element.
         */

        if (NAMESPACE === HTML_NAMESPACE) {
          try {
            doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE)
          } catch (_) {}
        }
        /* Use createHTMLDocument in case DOMParser is not available */

        if (!doc || !doc.documentElement) {
          doc = implementation.createDocument(NAMESPACE, 'template', null)

          try {
            doc.documentElement.innerHTML = IS_EMPTY_INPUT ? '' : dirtyPayload
          } catch (_) {
            // Syntax error if dirtyPayload is invalid xml
          }
        }

        var body = doc.body || doc.documentElement

        if (dirty && leadingWhitespace) {
          body.insertBefore(document.createTextNode(leadingWhitespace), body.childNodes[0] || null)
        }
        /* Work on whole document or just its body */

        if (NAMESPACE === HTML_NAMESPACE) {
          return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? 'html' : 'body')[0]
        }

        return WHOLE_DOCUMENT ? doc.documentElement : body
      }
      /**
       * _createIterator
       *
       * @param  {Document} root document/fragment to create iterator for
       * @return {Iterator} iterator instance
       */

      var _createIterator = function _createIterator (root) {
        return createNodeIterator.call(
          root.ownerDocument || root,
          root, // eslint-disable-next-line no-bitwise
          NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT,
          null,
          false
        )
      }
      /**
       * _isClobbered
       *
       * @param  {Node} elm element to check for clobbering attacks
       * @return {Boolean} true if clobbered, false if safe
       */

      var _isClobbered = function _isClobbered (elm) {
        return (
          elm instanceof HTMLFormElement &&
          (typeof elm.nodeName !== 'string' ||
            typeof elm.textContent !== 'string' ||
            typeof elm.removeChild !== 'function' ||
            !(elm.attributes instanceof NamedNodeMap) ||
            typeof elm.removeAttribute !== 'function' ||
            typeof elm.setAttribute !== 'function' ||
            typeof elm.namespaceURI !== 'string' ||
            typeof elm.insertBefore !== 'function')
        )
      }
      /**
       * _isNode
       *
       * @param  {Node} obj object to check whether it's a DOM node
       * @return {Boolean} true is object is a DOM node
       */

      var _isNode = function _isNode (object) {
        return _typeof(Node) === 'object'
          ? object instanceof Node
          : object &&
              _typeof(object) === 'object' &&
              typeof object.nodeType === 'number' &&
              typeof object.nodeName === 'string'
      }
      /**
       * _executeHook
       * Execute user configurable hooks
       *
       * @param  {String} entryPoint  Name of the hook's entry point
       * @param  {Node} currentNode node to work on with the hook
       * @param  {Object} data additional hook parameters
       */

      var _executeHook = function _executeHook (entryPoint, currentNode, data) {
        if (!hooks[entryPoint]) {
          return
        }

        arrayForEach(hooks[entryPoint], function (hook) {
          hook.call(DOMPurify, currentNode, data, CONFIG)
        })
      }
      /**
       * _sanitizeElements
       *
       * @protect nodeName
       * @protect textContent
       * @protect removeChild
       *
       * @param   {Node} currentNode to check for permission to exist
       * @return  {Boolean} true if node was killed, false if left alive
       */

      var _sanitizeElements = function _sanitizeElements (currentNode) {
        var content
        /* Execute a hook if present */

        _executeHook('beforeSanitizeElements', currentNode, null)
        /* Check if element is clobbered or can clobber */

        if (_isClobbered(currentNode)) {
          _forceRemove(currentNode)

          return true
        }
        /* Check if tagname contains Unicode */

        if (regExpTest(/[\u0080-\uFFFF]/, currentNode.nodeName)) {
          _forceRemove(currentNode)

          return true
        }
        /* Now let's check the element's type and name */

        var tagName = transformCaseFunc(currentNode.nodeName)
        /* Execute a hook if present */

        _executeHook('uponSanitizeElement', currentNode, {
          tagName: tagName,
          allowedTags: ALLOWED_TAGS,
        })
        /* Detect mXSS attempts abusing namespace confusion */

        if (
          currentNode.hasChildNodes() &&
          !_isNode(currentNode.firstElementChild) &&
          (!_isNode(currentNode.content) || !_isNode(currentNode.content.firstElementChild)) &&
          regExpTest(/<[/\w]/g, currentNode.innerHTML) &&
          regExpTest(/<[/\w]/g, currentNode.textContent)
        ) {
          _forceRemove(currentNode)

          return true
        }
        /* Mitigate a problem with templates inside select */

        if (tagName === 'select' && regExpTest(/<template/i, currentNode.innerHTML)) {
          _forceRemove(currentNode)

          return true
        }
        /* Remove element if anything forbids its presence */

        if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
          /* Check if we have a custom element to handle */
          if (!FORBID_TAGS[tagName] && _basicCustomElementTest(tagName)) {
            if (
              CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp &&
              regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)
            ) {
              return false
            }
            if (
              CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function &&
              CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName)
            ) {
              return false
            }
          }
          /* Keep content except for bad-listed elements */

          if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
            var parentNode = getParentNode(currentNode) || currentNode.parentNode
            var childNodes = getChildNodes(currentNode) || currentNode.childNodes

            if (childNodes && parentNode) {
              var childCount = childNodes.length

              for (var i = childCount - 1; i >= 0; --i) {
                parentNode.insertBefore(cloneNode(childNodes[i], true), getNextSibling(currentNode))
              }
            }
          }

          _forceRemove(currentNode)

          return true
        }
        /* Check whether element has a valid namespace */

        if (currentNode instanceof Element && !_checkValidNamespace(currentNode)) {
          _forceRemove(currentNode)

          return true
        }

        if (
          (tagName === 'noscript' || tagName === 'noembed') &&
          regExpTest(/<\/no(script|embed)/i, currentNode.innerHTML)
        ) {
          _forceRemove(currentNode)

          return true
        }
        /* Sanitize element content to be template-safe */

        if (SAFE_FOR_TEMPLATES && currentNode.nodeType === 3) {
          /* Get the element's text content */
          content = currentNode.textContent
          content = stringReplace(content, MUSTACHE_EXPR$1, ' ')
          content = stringReplace(content, ERB_EXPR$1, ' ')

          if (currentNode.textContent !== content) {
            arrayPush(DOMPurify.removed, {
              element: currentNode.cloneNode(),
            })
            currentNode.textContent = content
          }
        }
        /* Execute a hook if present */

        _executeHook('afterSanitizeElements', currentNode, null)

        return false
      }
      /**
       * _isValidAttribute
       *
       * @param  {string} lcTag Lowercase tag name of containing element.
       * @param  {string} lcName Lowercase attribute name.
       * @param  {string} value Attribute value.
       * @return {Boolean} Returns true if `value` is valid, otherwise false.
       */
      // eslint-disable-next-line complexity

      var _isValidAttribute = function _isValidAttribute (lcTag, lcName, value) {
        /* Make sure attribute cannot clobber */
        if (SANITIZE_DOM && (lcName === 'id' || lcName === 'name') && (value in document || value in formElement)) {
          return false
        }
        /* Allow valid data-* attributes: At least one character after "-"
          (https://html.spec.whatwg.org/multipage/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes)
          XML-compatible (https://html.spec.whatwg.org/multipage/infrastructure.html#xml-compatible and http://www.w3.org/TR/xml/#d0e804)
          We don't need to check the value; it's always URI safe. */

        if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR$1, lcName));
        else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR$1, lcName));
        else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
          if (
            // First condition does a very basic check if a) it's basically a valid custom element tagname AND
            // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
            (_basicCustomElementTest(lcTag) &&
              ((CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp &&
                regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag)) ||
                (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function &&
                  CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag))) &&
              ((CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp &&
                regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName)) ||
                (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function &&
                  CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName)))) || // Alternative, second condition checks if it's an `is`-attribute, AND
            // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            (lcName === 'is' &&
              CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements &&
              ((CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp &&
                regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value)) ||
                (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function &&
                  CUSTOM_ELEMENT_HANDLING.tagNameCheck(value))))
          );
          else {
            return false
          }
          /* Check value is safe. First, is attr inert? If so, is safe */
        } else if (URI_SAFE_ATTRIBUTES[lcName]);
        else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE$1, '')));
        else if (
          (lcName === 'src' || lcName === 'xlink:href' || lcName === 'href') &&
          lcTag !== 'script' &&
          stringIndexOf(value, 'data:') === 0 &&
          DATA_URI_TAGS[lcTag]
        );
        else if (
          ALLOW_UNKNOWN_PROTOCOLS &&
          !regExpTest(IS_SCRIPT_OR_DATA$1, stringReplace(value, ATTR_WHITESPACE$1, ''))
        );
        else if (!value);
        else {
          return false
        }

        return true
      }
      /**
       * _basicCustomElementCheck
       * checks if at least one dash is included in tagName, and it's not the first char
       * for more sophisticated checking see https://github.com/sindresorhus/validate-element-name
       * @param {string} tagName name of the tag of the node to sanitize
       */

      var _basicCustomElementTest = function _basicCustomElementTest (tagName) {
        return tagName.indexOf('-') > 0
      }
      /**
       * _sanitizeAttributes
       *
       * @protect attributes
       * @protect nodeName
       * @protect removeAttribute
       * @protect setAttribute
       *
       * @param  {Node} currentNode to sanitize
       */

      var _sanitizeAttributes = function _sanitizeAttributes (currentNode) {
        var attr
        var value
        var lcName
        var l
        /* Execute a hook if present */

        _executeHook('beforeSanitizeAttributes', currentNode, null)

        var attributes = currentNode.attributes
        /* Check if we have attributes; if not we might have a text node */

        if (!attributes) {
          return
        }

        var hookEvent = {
          attrName: '',
          attrValue: '',
          keepAttr: true,
          allowedAttributes: ALLOWED_ATTR,
        }
        l = attributes.length
        /* Go backwards over all attributes; safely remove bad ones */

        while (l--) {
          attr = attributes[l]
          var _attr = attr
          var name = _attr.name
          var namespaceURI = _attr.namespaceURI
          value = name === 'value' ? attr.value : stringTrim(attr.value)
          lcName = transformCaseFunc(name)
          /* Execute a hook if present */

          hookEvent.attrName = lcName
          hookEvent.attrValue = value
          hookEvent.keepAttr = true
          hookEvent.forceKeepAttr = undefined // Allows developers to see this is a property they can set

          _executeHook('uponSanitizeAttribute', currentNode, hookEvent)

          value = hookEvent.attrValue
          /* Did the hooks approve of the attribute? */

          if (hookEvent.forceKeepAttr) {
            continue
          }
          /* Remove attribute */

          _removeAttribute(name, currentNode)
          /* Did the hooks approve of the attribute? */

          if (!hookEvent.keepAttr) {
            continue
          }
          /* Work around a security issue in jQuery 3.0 */

          if (regExpTest(/\/>/i, value)) {
            _removeAttribute(name, currentNode)

            continue
          }
          /* Sanitize attribute content to be template-safe */

          if (SAFE_FOR_TEMPLATES) {
            value = stringReplace(value, MUSTACHE_EXPR$1, ' ')
            value = stringReplace(value, ERB_EXPR$1, ' ')
          }
          /* Is `value` valid for this attribute? */

          var lcTag = transformCaseFunc(currentNode.nodeName)

          if (!_isValidAttribute(lcTag, lcName, value)) {
            continue
          }
          /* Handle attributes that require Trusted Types */

          if (
            trustedTypesPolicy &&
            _typeof(trustedTypes) === 'object' &&
            typeof trustedTypes.getAttributeType === 'function'
          ) {
            if (namespaceURI);
            else {
              switch (trustedTypes.getAttributeType(lcTag, lcName)) {
                case 'TrustedHTML':
                  value = trustedTypesPolicy.createHTML(value)
                  break

                case 'TrustedScriptURL':
                  value = trustedTypesPolicy.createScriptURL(value)
                  break
              }
            }
          }
          /* Handle invalid data-* attribute set by try-catching it */

          try {
            if (namespaceURI) {
              currentNode.setAttributeNS(namespaceURI, name, value)
            } else {
              /* Fallback to setAttribute() for browser-unrecognized namespaces e.g. "x-schema". */
              currentNode.setAttribute(name, value)
            }

            arrayPop(DOMPurify.removed)
          } catch (_) {}
        }
        /* Execute a hook if present */

        _executeHook('afterSanitizeAttributes', currentNode, null)
      }
      /**
       * _sanitizeShadowDOM
       *
       * @param  {DocumentFragment} fragment to iterate over recursively
       */

      var _sanitizeShadowDOM = function _sanitizeShadowDOM (fragment) {
        var shadowNode

        var shadowIterator = _createIterator(fragment)
        /* Execute a hook if present */

        _executeHook('beforeSanitizeShadowDOM', fragment, null)

        while ((shadowNode = shadowIterator.nextNode())) {
          /* Execute a hook if present */
          _executeHook('uponSanitizeShadowNode', shadowNode, null)
          /* Sanitize tags and elements */

          if (_sanitizeElements(shadowNode)) {
            continue
          }
          /* Deep shadow DOM detected */

          if (shadowNode.content instanceof DocumentFragment) {
            _sanitizeShadowDOM(shadowNode.content)
          }
          /* Check attributes, sanitize if necessary */

          _sanitizeAttributes(shadowNode)
        }
        /* Execute a hook if present */

        _executeHook('afterSanitizeShadowDOM', fragment, null)
      }
      /**
       * Sanitize
       * Public method providing core sanitation functionality
       *
       * @param {String|Node} dirty string or DOM node
       * @param {Object} configuration object
       */
      // eslint-disable-next-line complexity

      DOMPurify.sanitize = function (dirty, cfg) {
        var body
        var importedNode
        var currentNode
        var oldNode
        var returnNode
        /* Make sure we have a string to sanitize.
        DO NOT return early, as this will return the wrong type if
        the user has requested a DOM object rather than a string */

        IS_EMPTY_INPUT = !dirty

        if (IS_EMPTY_INPUT) {
          dirty = '<!-->'
        }
        /* Stringify, in case dirty is an object */

        if (typeof dirty !== 'string' && !_isNode(dirty)) {
          // eslint-disable-next-line no-negated-condition
          if (typeof dirty.toString !== 'function') {
            throw typeErrorCreate('toString is not a function')
          } else {
            dirty = dirty.toString()

            if (typeof dirty !== 'string') {
              throw typeErrorCreate('dirty is not a string, aborting')
            }
          }
        }
        /* Check we can run. Otherwise fall back or ignore */

        if (!DOMPurify.isSupported) {
          if (_typeof(window.toStaticHTML) === 'object' || typeof window.toStaticHTML === 'function') {
            if (typeof dirty === 'string') {
              return window.toStaticHTML(dirty)
            }

            if (_isNode(dirty)) {
              return window.toStaticHTML(dirty.outerHTML)
            }
          }

          return dirty
        }
        /* Assign config vars */

        if (!SET_CONFIG) {
          _parseConfig(cfg)
        }
        /* Clean up removed elements */

        DOMPurify.removed = []
        /* Check if dirty is correctly typed for IN_PLACE */

        if (typeof dirty === 'string') {
          IN_PLACE = false
        }

        if (IN_PLACE) {
          /* Do some early pre-sanitization to avoid unsafe root nodes */
          if (dirty.nodeName) {
            var tagName = transformCaseFunc(dirty.nodeName)

            if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
              throw typeErrorCreate('root node is forbidden and cannot be sanitized in-place')
            }
          }
        } else if (dirty instanceof Node) {
          /* If dirty is a DOM element, append to an empty document to avoid
           elements being stripped by the parser */
          body = _initDocument('<!---->')
          importedNode = body.ownerDocument.importNode(dirty, true)

          if (importedNode.nodeType === 1 && importedNode.nodeName === 'BODY') {
            /* Node is already a body, use as is */
            body = importedNode
          } else if (importedNode.nodeName === 'HTML') {
            body = importedNode
          } else {
            // eslint-disable-next-line unicorn/prefer-dom-node-append
            body.appendChild(importedNode)
          }
        } else {
          /* Exit directly if we have nothing to do */
          if (
            !RETURN_DOM &&
            !SAFE_FOR_TEMPLATES &&
            !WHOLE_DOCUMENT && // eslint-disable-next-line unicorn/prefer-includes
            dirty.indexOf('<') === -1
          ) {
            return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty
          }
          /* Initialize the document to work on */

          body = _initDocument(dirty)
          /* Check we have a DOM node from the data */

          if (!body) {
            return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : ''
          }
        }
        /* Remove first element node (ours) if FORCE_BODY is set */

        if (body && FORCE_BODY) {
          _forceRemove(body.firstChild)
        }
        /* Get node iterator */

        var nodeIterator = _createIterator(IN_PLACE ? dirty : body)
        /* Now start iterating over the created document */

        while ((currentNode = nodeIterator.nextNode())) {
          /* Fix IE's strange behavior with manipulated textNodes #89 */
          if (currentNode.nodeType === 3 && currentNode === oldNode) {
            continue
          }
          /* Sanitize tags and elements */

          if (_sanitizeElements(currentNode)) {
            continue
          }
          /* Shadow DOM detected, sanitize it */

          if (currentNode.content instanceof DocumentFragment) {
            _sanitizeShadowDOM(currentNode.content)
          }
          /* Check attributes, sanitize if necessary */

          _sanitizeAttributes(currentNode)

          oldNode = currentNode
        }

        oldNode = null
        /* If we sanitized `dirty` in-place, return it. */

        if (IN_PLACE) {
          return dirty
        }
        /* Return sanitized string or DOM */

        if (RETURN_DOM) {
          if (RETURN_DOM_FRAGMENT) {
            returnNode = createDocumentFragment.call(body.ownerDocument)

            while (body.firstChild) {
              // eslint-disable-next-line unicorn/prefer-dom-node-append
              returnNode.appendChild(body.firstChild)
            }
          } else {
            returnNode = body
          }

          if (ALLOWED_ATTR.shadowroot) {
            /*
            AdoptNode() is not used because internal state is not reset
            (e.g. the past names map of a HTMLFormElement), this is safe
            in theory but we would rather not risk another attack vector.
            The state that is cloned by importNode() is explicitly defined
            by the specs.
          */
            returnNode = importNode.call(originalDocument, returnNode, true)
          }

          return returnNode
        }

        var serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML
        /* Serialize doctype if allowed */

        if (
          WHOLE_DOCUMENT &&
          ALLOWED_TAGS['!doctype'] &&
          body.ownerDocument &&
          body.ownerDocument.doctype &&
          body.ownerDocument.doctype.name &&
          regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)
        ) {
          serializedHTML = '<!DOCTYPE ' + body.ownerDocument.doctype.name + '>\n' + serializedHTML
        }
        /* Sanitize final string template-safe */

        if (SAFE_FOR_TEMPLATES) {
          serializedHTML = stringReplace(serializedHTML, MUSTACHE_EXPR$1, ' ')
          serializedHTML = stringReplace(serializedHTML, ERB_EXPR$1, ' ')
        }

        return trustedTypesPolicy && RETURN_TRUSTED_TYPE
          ? trustedTypesPolicy.createHTML(serializedHTML)
          : serializedHTML
      }
      /**
       * Public method to set the configuration once
       * setConfig
       *
       * @param {Object} cfg configuration object
       */

      DOMPurify.setConfig = function (cfg) {
        _parseConfig(cfg)

        SET_CONFIG = true
      }
      /**
       * Public method to remove the configuration
       * clearConfig
       *
       */

      DOMPurify.clearConfig = function () {
        CONFIG = null
        SET_CONFIG = false
      }
      /**
       * Public method to check if an attribute value is valid.
       * Uses last set config, if any. Otherwise, uses config defaults.
       * isValidAttribute
       *
       * @param  {string} tag Tag name of containing element.
       * @param  {string} attr Attribute name.
       * @param  {string} value Attribute value.
       * @return {Boolean} Returns true if `value` is valid. Otherwise, returns false.
       */

      DOMPurify.isValidAttribute = function (tag, attr, value) {
        /* Initialize shared config vars if necessary. */
        if (!CONFIG) {
          _parseConfig({})
        }

        var lcTag = transformCaseFunc(tag)
        var lcName = transformCaseFunc(attr)
        return _isValidAttribute(lcTag, lcName, value)
      }
      /**
       * AddHook
       * Public method to add DOMPurify hooks
       *
       * @param {String} entryPoint entry point for the hook to add
       * @param {Function} hookFunction function to execute
       */

      DOMPurify.addHook = function (entryPoint, hookFunction) {
        if (typeof hookFunction !== 'function') {
          return
        }

        hooks[entryPoint] = hooks[entryPoint] || []
        arrayPush(hooks[entryPoint], hookFunction)
      }
      /**
       * RemoveHook
       * Public method to remove a DOMPurify hook at a given entryPoint
       * (pops it from the stack of hooks if more are present)
       *
       * @param {String} entryPoint entry point for the hook to remove
       * @return {Function} removed(popped) hook
       */

      DOMPurify.removeHook = function (entryPoint) {
        if (hooks[entryPoint]) {
          return arrayPop(hooks[entryPoint])
        }
      }
      /**
       * RemoveHooks
       * Public method to remove all DOMPurify hooks at a given entryPoint
       *
       * @param  {String} entryPoint entry point for the hooks to remove
       */

      DOMPurify.removeHooks = function (entryPoint) {
        if (hooks[entryPoint]) {
          hooks[entryPoint] = []
        }
      }
      /**
       * RemoveAllHooks
       * Public method to remove all DOMPurify hooks
       *
       */

      DOMPurify.removeAllHooks = function () {
        hooks = {}
      }

      return DOMPurify
    }

    var purify = createDOMPurify()

    return purify
  })
  //# sourceMappingURL=purify.js.map
})

/**
 * Returns a function that can be executed only once
 */
function once (fn) {
  let result
  return function (...args) {
    if (fn) {
      result = fn.apply(this, args)
      fn = () => {}
    }
    return result
  }
}
function camelToKebab (value) {
  return value.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
}
function kebabToCamel (value) {
  return value.replace(/-./g, (x) => x[1].toUpperCase())
}
function snakeToCamel (value) {
  return value.toLowerCase().replace(/([_][a-z])/g, (group) => group.toUpperCase().replace('_', ''))
}
function titleToKebab (value) {
  return value.replace(/\s/g, '-').toLowerCase()
}
function randomID (prepend, length = 5) {
  const randomStr = Math.random()
    .toString(36)
    .substring(2, 2 + length)
  if (!prepend) {
    return randomStr
  }
  return prepend + randomStr
}
function getRandomArbitrary (min, max) {
  return Math.random() * (max - min) + min
}
function parseXML (string) {
  return new window.DOMParser().parseFromString(string, 'text/xml')
}
function containsVisualElement (node) {
  var _a
  for (let i = 0; i < node.childNodes.length; i++) {
    const child = node.childNodes.item(i)
    if (
      child.nodeType === 1 /* ELEMENT_NODE */ ||
      (child.nodeType === 3 /* TEXT_NODE */ &&
        ((_a = child.textContent) === null || _a === void 0 ? void 0 : _a.trim()))
    ) {
      return true
    }
  }
  return false
}
function parseAssetURL (url, assetPath = './assets') {
  const [, protocol, remainder] = url.match(/^([a-z]+):\/\/(.*?)(\.svg)?$/) || []
  if (!protocol) {
    if (url.startsWith('./') || url.startsWith('../')) {
      return url
    }
    return null
  }
  if (protocol === 'http' || protocol === 'https') {
    return url
  }
  if (protocol === 'assets') {
    return getAssetPath(`${assetPath}/${remainder}.svg`)
  }
  return null
}
// TODO: add tests
function elementHasAncestorTag (el, tagName) {
  const parentElement = el.parentElement
  if (!parentElement) {
    return false
  }
  if (parentElement.tagName === tagName.toUpperCase()) {
    return true
  }
  return elementHasAncestorTag(parentElement, tagName)
}
function closest (element, selector) {
  if (!element) {
    return null
  }
  if (element.matches(selector)) {
    return element
  }
  if (element.parentNode instanceof ShadowRoot) {
    return closest(element.parentNode.host, selector)
  }
  return closest(element.parentElement, selector)
}
function sanitizeStyle (style) {
  var _a
  const purifiedOuterHTML = purify.sanitize(`<style>${style}</style>`, {
    ALLOWED_TAGS: ['style'],
    ALLOWED_ATTR: [],
    FORCE_BODY: true,
  })
  const wrapperEl = document.createElement('div')
  // deepcode ignore ReactSetInnerHtml: sanitized by dompurify
  wrapperEl.innerHTML = purifiedOuterHTML
  return (_a = wrapperEl.querySelector('style')) === null || _a === void 0 ? void 0 : _a.innerHTML
}
function getFocusedElement (rootElement = document) {
  var _a
  const activeElement = rootElement.activeElement
  if (activeElement === null || activeElement === void 0 ? void 0 : activeElement.shadowRoot) {
    return (_a = getFocusedElement(activeElement.shadowRoot)) !== null && _a !== void 0 ? _a : activeElement
  }
  return activeElement
}
async function defer () {
  return new Promise((resolve) => setTimeout(resolve))
}
// https://terodox.tech/how-to-tell-if-an-element-is-in-the-dom-including-the-shadow-dom/
function isInDocument (element) {
  let currentElement = element
  while (currentElement && currentElement.parentNode) {
    if (currentElement.parentNode === document) {
      return true
    } else if (currentElement.parentNode instanceof ShadowRoot) {
      currentElement = currentElement.parentNode.host
    } else {
      currentElement = currentElement.parentNode
    }
  }
  return false
}
function isPropValuesEqual (subject, target, propNames) {
  return propNames.every((propName) => subject[propName] === target[propName])
}
function getUniqueItemsByProperties (items, propNames) {
  return items.filter(
    (item, index, self) => index === self.findIndex((foundItem) => isPropValuesEqual(foundItem, item, propNames))
  )
}
function getParent (element) {
  if (element.parentNode) {
    return element.parentNode
  }
  if (element instanceof ShadowRoot) {
    return element.host
  }
  return null
}
function isAncestorOf (ancestor, element) {
  if (element === ancestor) {
    return true
  }
  if (element instanceof HTMLElement && element.assignedSlot && isAncestorOf(ancestor, element.assignedSlot)) {
    return true
  }
  const parent = getParent(element)
  return parent === null ? false : isAncestorOf(ancestor, parent)
}

const Hidden = () => h(Host, { class: 'atomic-hidden' })

const initializeEventName = 'atomic/initializeComponent'
const initializableElements = ['atomic-search-interface', 'atomic-insight-interface', 'atomic-external']
/**
 * Retrieves `Bindings` on a configured parent search interface.
 * @param event Element on which to dispatch the event, which must be the child of a configured "atomic-search-interface" or "atomic-external" element.
 * @returns A promise that resolves on initialization of the parent "atomic-search-interface" or "atomic-external" element, and rejects when it's not the case.
 */
function initializeBindings$1 (element) {
  return new Promise((resolve, reject) => {
    const event = buildCustomEvent(initializeEventName, (bindings) => resolve(bindings))
    element.dispatchEvent(event)
    if (!closest(element, initializableElements.join(', '))) {
      reject(new MissingInterfaceParentError(element.nodeName.toLowerCase()))
    }
  })
}
class MissingInterfaceParentError extends Error {
  constructor (elementName) {
    super(
      `The "${elementName}" element must be the child of the following elements: ${initializableElements.join(', ')}`
    )
  }
}
/**
 * Makes Shadow Dom elements compatible with the focus-visible polyfill https://github.com/WICG/focus-visible
 * Necessary for Safari under version 15.4.
 */
function applyFocusVisiblePolyfill (element) {
  if (!element.shadowRoot) {
    return
  }
  if (window.applyFocusVisiblePolyfill) {
    window.applyFocusVisiblePolyfill(element.shadowRoot)
    return
  }
  window.addEventListener(
    'focus-visible-polyfill-ready',
    () => {
      var _a
      return (_a = window.applyFocusVisiblePolyfill) === null || _a === void 0
        ? void 0
        : _a.call(window, element.shadowRoot)
    },
    { once: true }
  )
}
const renderedAttribute = 'data-atomic-rendered'
const loadedAttribute = 'data-atomic-loaded'
/**
 * A [StencilJS property decorator](https://stenciljs.com/) to be used on a property named `bindings`.
 * This will automatically fetch the `Bindings` from the parent `atomic-search-interface` or `atomic-external` components.
 *
 * Once a component is bound, the `initialize` method is called.
 * In the event of an initialization error, the `error` property will be set and an `atomic-component-error` will be rendered.
 *
 * In order for a component using this decorator to render properly, it should have an internal state bound to one of the properties from `bindings`.
 * This is possible by using the `BindStateToController` decorator.
 *
 * @example
 * @InitializeBindings() public bindings!: Bindings;
 *
 * For more information and examples, view the "Utilities" section of the readme.
 */
function InitializeBindings ({ forceUpdate: forceUpdate$1 } = {}) {
  return (component, bindingsProperty) => {
    const { componentWillLoad, render, componentDidRender, componentDidLoad, disconnectedCallback } = component
    let unsubscribeLanguage = () => {}
    if (bindingsProperty !== 'bindings') {
      return console.error(
        `The InitializeBindings decorator should be used on a property called "bindings", and not "${bindingsProperty}"`,
        component
      )
    }
    component.componentWillLoad = function () {
      const element = getElement(this)
      element.setAttribute(renderedAttribute, 'false')
      element.setAttribute(loadedAttribute, 'false')
      const event = buildCustomEvent(initializeEventName, (bindings) => {
        this.bindings = bindings
        const updateLanguage = () => forceUpdate(this)
        this.bindings.i18n.on('languageChanged', updateLanguage)
        unsubscribeLanguage = () => this.bindings.i18n.off('languageChanged', updateLanguage)
        try {
          // When no controller is initialized, updating a property with a State() decorator, there will be no re-render.
          // In this case, we have to manually trigger it.
          if (this.initialize) {
            this.initialize()
            if (forceUpdate$1) {
              forceUpdate(this)
            }
          } else {
            forceUpdate(this)
          }
        } catch (e) {
          this.error = e
        }
      })
      const canceled = element.dispatchEvent(event)
      if (canceled) {
        this.error = new MissingInterfaceParentError(element.nodeName.toLowerCase())
        return
      }
      return componentWillLoad && componentWillLoad.call(this)
    }
    component.render = function () {
      if (this.error) {
        return h('atomic-component-error', { element: getElement(this), error: this.error })
      }
      if (!this.bindings) {
        return h(Hidden, null)
      }
      getElement(this).setAttribute(renderedAttribute, 'true')
      return render && render.call(this)
    }
    component.disconnectedCallback = function () {
      const element = getElement(this)
      element.setAttribute(renderedAttribute, 'false')
      element.setAttribute(loadedAttribute, 'false')
      unsubscribeLanguage()
      disconnectedCallback && disconnectedCallback.call(this)
    }
    component.componentDidRender = function () {
      const element = getElement(this)
      if (element.getAttribute(renderedAttribute) === 'false') {
        return
      }
      componentDidRender && componentDidRender.call(this)
      if (element.getAttribute(loadedAttribute) === 'false') {
        element.setAttribute(loadedAttribute, 'true')
        applyFocusVisiblePolyfill(getElement(this))
        componentDidLoad && componentDidLoad.call(this)
      }
    }
    component.componentDidLoad = function () {}
  }
}
/**
 * A [StencilJS property decorator](https://stenciljs.com/) is used together with the [State decorator](https://stenciljs.com/docs/state#state-decorator).
 * This allows the Stencil component state property to automatically get updates from a [Coveo Headless controller](https://docs.coveo.com/en/headless/latest/usage/#use-headless-controllers).
 *
 * @example
 * @BindStateToController('pager') @State() private pagerState!: PagerState;
 *
 * For more information and examples, view the "Utilities" section of the readme.
 *
 * @param controllerProperty The controller property to subscribe to. The controller has to be created inside of the `initialize` method.
 * @param options The configurable `BindStateToController` options.
 */
function BindStateToController (controllerProperty, options) {
  return (component, stateProperty) => {
    const { disconnectedCallback, initialize } = component
    let unsubscribeController = () => {}
    component.initialize = function () {
      initialize && initialize.call(this)
      if (!initialize) {
        return console.error(
          `ControllerState: The "initialize" method has to be defined and instanciate a controller for the property ${controllerProperty}`,
          component
        )
      }
      if (!this[controllerProperty]) {
        return
      }
      if (
        (options === null || options === void 0 ? void 0 : options.onUpdateCallbackMethod) &&
        !this[options.onUpdateCallbackMethod]
      ) {
        return console.error(
          `ControllerState: The onUpdateCallbackMethod property "${options.onUpdateCallbackMethod}" is not defined`,
          component
        )
      }
      unsubscribeController = this[controllerProperty].subscribe(() => {
        this[stateProperty] = this[controllerProperty].state
        ;(options === null || options === void 0 ? void 0 : options.onUpdateCallbackMethod) &&
          this[options.onUpdateCallbackMethod]()
      })
    }
    component.disconnectedCallback = function () {
      !getElement(this).isConnected && unsubscribeController()
      disconnectedCallback && disconnectedCallback.call(this)
    }
  }
}

class MissingResultParentError extends Error {
  constructor (elementName) {
    super(`The "${elementName}" element must be the child of an "atomic-result" element.`)
  }
}
/**
 * A [StencilJS property decorator](https://stenciljs.com/) to be used for result template components.
 * This allows the Stencil component to fetch the current result from its rendered parent, the `atomic-result` component.
 *
 *
 * @example
 * @ResultContext() private result!: Result;
 *
 * For more information and examples, view the "Utilities" section of the readme.
 */
function ResultContext (opts = { folded: false }) {
  return (component, resultVariable) => {
    const { connectedCallback, componentWillRender, render } = component
    component.connectedCallback = function () {
      const element = getElement(this)
      const event = buildCustomEvent(resultContextEventName, (result) => {
        if (opts.folded) {
          if (isFolded(result)) {
            this[resultVariable] = result
          } else {
            this[resultVariable] = { children: [], result }
          }
        } else {
          this[resultVariable] = isFolded(result) ? result.result : result
        }
      })
      const canceled = element.dispatchEvent(event)
      if (canceled) {
        this.error = new MissingResultParentError(element.nodeName.toLowerCase())
        return
      }
      return connectedCallback && connectedCallback.call(this)
    }
    component.componentWillRender = function () {
      if (this.error) {
        return
      }
      return componentWillRender && componentWillRender.call(this)
    }
    component.render = function () {
      if (this.error) {
        const element = getElement(this)
        element.remove()
        console.error('Result component is in error and has been removed from the DOM', this.error, this, element)
        return
      }
      return render && render.call(this)
    }
  }
}
const resultContextEventName = 'atomic/resolveResult'
/**
 * Retrieves `Result` on a rendered `atomic-result`.
 *
 * This method is useful for building custom result template elements, see [Create a Result List](https://docs.coveo.com/en/atomic/latest/usage/create-a-result-list/) for more information.
 *
 * You should use the method in the [connectedCallback lifecycle method](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks).
 *
 * @param element The element that the event is dispatched to, which must be the child of a rendered "atomic-result".
 * @returns A promise that resolves on initialization of the parent "atomic-result" element, or rejects when there is no parent "atomic-result" element.
 */
function resultContext (element) {
  return new Promise((resolve, reject) => {
    const event = buildCustomEvent(resultContextEventName, (result) => {
      return resolve(result)
    })
    element.dispatchEvent(event)
    if (!closest(element, 'atomic-result')) {
      reject(new MissingResultParentError(element.nodeName.toLowerCase()))
    }
  })
}
function isFolded (result) {
  return 'children' in result
}
const childTemplatesContextEventName = 'atomic/resolveChildTemplates'
/**
 * A [StencilJS property decorator](https://stenciljs.com/) to be used for children result templates.
 * This allows the Stencil component to fetch children templates defined a level above.
 */
function ChildTemplatesContext () {
  return (component, resultVariable) => {
    const { componentWillRender } = component
    component.componentWillRender = function () {
      const element = getElement(this)
      const event = buildCustomEvent(childTemplatesContextEventName, (result) => {
        var _a
        const resultListManager =
          (_a = this.resultListCommon) === null || _a === void 0 ? void 0 : _a.resultTemplatesManager
        this[resultVariable] = resultListManager !== result ? result : null
      })
      const canceled = element.dispatchEvent(event)
      if (canceled) {
        this[resultVariable] = null
        return
      }
      return componentWillRender && componentWillRender.call(this)
    }
  }
}
const resultDisplayConfigContextEventName = 'atomic/resolveResultDisplayConfig'
/**
 * A [StencilJS property decorator](https://stenciljs.com/) to fetch display properties for a result.
 */
function ResultDisplayConfigContext () {
  return (component, resultVariable) => {
    const { componentWillRender } = component
    component.componentWillRender = function () {
      const element = getElement(this)
      const event = buildCustomEvent(resultDisplayConfigContextEventName, (config) => {
        this[resultVariable] = config
      })
      const canceled = element.dispatchEvent(event)
      if (canceled) {
        return
      }
      return componentWillRender && componentWillRender.call(this)
    }
  }
}

const dispatchSearchBoxSuggestionsEvent = (event, element) => {
  element.dispatchEvent(buildCustomEvent('atomic/searchBoxSuggestion/register', event))
  const hasParentSearchBox = closest(element, 'atomic-search-box')
  if (!hasParentSearchBox) {
    throw new Error(
      `The "${element.nodeName.toLowerCase()}" component was not handled, as it is not a child of an "atomic-search-box" component`
    )
  }
}
function elementHasNoQuery (el) {
  return !el.query
}
function elementHasQuery (el) {
  return !!el.query
}

function initializeBindings (element) {
  return initializeBindings$1(element)
}

export { initializeBindings as i, resultContext as r }
