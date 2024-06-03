var nn = Object.defineProperty;
var sn = (e, t, n) => t in e ? nn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var $ = (e, t, n) => (sn(e, typeof t != "symbol" ? t + "" : t, n), n);
import { render as ct } from "vue";
/**
* @vue/shared v3.4.27
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
function rn(e, t) {
  const n = new Set(e.split(","));
  return t ? (s) => n.has(s.toLowerCase()) : (s) => n.has(s);
}
const L = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {};
process.env.NODE_ENV !== "production" && Object.freeze([]);
const G = () => {
}, on = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), P = Object.assign, cn = Object.prototype.hasOwnProperty, E = (e, t) => cn.call(e, t), h = Array.isArray, Q = (e) => Ve(e) === "[object Map]", ln = (e) => Ve(e) === "[object Set]", w = (e) => typeof e == "function", V = (e) => typeof e == "string", ue = (e) => typeof e == "symbol", x = (e) => e !== null && typeof e == "object", an = (e) => (x(e) || w(e)) && w(e.then) && w(e.catch), un = Object.prototype.toString, Ve = (e) => un.call(e), St = (e) => Ve(e).slice(8, -1), fn = (e) => Ve(e) === "[object Object]", Be = (e) => V(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, qe = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, pn = /-(\w)/g, Te = qe((e) => e.replace(pn, (t, n) => n ? n.toUpperCase() : "")), dn = /\B([A-Z])/g, te = qe(
  (e) => e.replace(dn, "-$1").toLowerCase()
), hn = qe((e) => e.charAt(0).toUpperCase() + e.slice(1)), k = (e, t) => !Object.is(e, t), _n = (e, t, n, s = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
}, lt = (e) => {
  const t = V(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let at;
const yt = () => at || (at = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Ge(e) {
  if (h(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = V(s) ? bn(s) : Ge(s);
      if (r)
        for (const o in r)
          t[o] = r[o];
    }
    return t;
  } else if (V(e) || x(e))
    return e;
}
const gn = /;(?![^(]*\))/g, mn = /:([^]+)/, En = /\/\*[^]*?\*\//g;
function bn(e) {
  const t = {};
  return e.replace(En, "").split(gn).forEach((n) => {
    if (n) {
      const s = n.split(mn);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function Je(e) {
  let t = "";
  if (V(e))
    t = e;
  else if (h(e))
    for (let n = 0; n < e.length; n++) {
      const s = Je(e[n]);
      s && (t += s + " ");
    }
  else if (x(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
/**
* @vue/reactivity v3.4.27
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function le(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let wn;
function Nn(e, t = wn) {
  t && t.active && t.effects.push(e);
}
let re;
class vn {
  constructor(t, n, s, r) {
    this.fn = t, this.trigger = n, this.scheduler = s, this.active = !0, this.deps = [], this._dirtyLevel = 4, this._trackId = 0, this._runnings = 0, this._shouldSchedule = !1, this._depsLength = 0, Nn(this, r);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1, xe();
      for (let t = 0; t < this._depsLength; t++) {
        const n = this.deps[t];
        if (n.computed && (On(n.computed), this._dirtyLevel >= 4))
          break;
      }
      this._dirtyLevel === 1 && (this._dirtyLevel = 0), Pe();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(t) {
    this._dirtyLevel = t ? 4 : 0;
  }
  run() {
    if (this._dirtyLevel = 0, !this.active)
      return this.fn();
    let t = z, n = re;
    try {
      return z = !0, re = this, this._runnings++, ut(this), this.fn();
    } finally {
      ft(this), this._runnings--, re = n, z = t;
    }
  }
  stop() {
    this.active && (ut(this), ft(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function On(e) {
  return e.value;
}
function ut(e) {
  e._trackId++, e._depsLength = 0;
}
function ft(e) {
  if (e.deps.length > e._depsLength) {
    for (let t = e._depsLength; t < e.deps.length; t++)
      Vt(e.deps[t], e);
    e.deps.length = e._depsLength;
  }
}
function Vt(e, t) {
  const n = e.get(t);
  n !== void 0 && t._trackId !== n && (e.delete(t), e.size === 0 && e.cleanup());
}
let z = !0, Ae = 0;
const xt = [];
function xe() {
  xt.push(z), z = !1;
}
function Pe() {
  const e = xt.pop();
  z = e === void 0 ? !0 : e;
}
function Ye() {
  Ae++;
}
function Ze() {
  for (Ae--; !Ae && Me.length; )
    Me.shift()();
}
function Sn(e, t, n) {
  var s;
  if (t.get(e) !== e._trackId) {
    t.set(e, e._trackId);
    const r = e.deps[e._depsLength];
    r !== t ? (r && Vt(r, e), e.deps[e._depsLength++] = t) : e._depsLength++, process.env.NODE_ENV !== "production" && ((s = e.onTrack) == null || s.call(e, P({ effect: e }, n)));
  }
}
const Me = [];
function yn(e, t, n) {
  var s;
  Ye();
  for (const r of e.keys()) {
    let o;
    r._dirtyLevel < t && (o ?? (o = e.get(r) === r._trackId)) && (r._shouldSchedule || (r._shouldSchedule = r._dirtyLevel === 0), r._dirtyLevel = t), r._shouldSchedule && (o ?? (o = e.get(r) === r._trackId)) && (process.env.NODE_ENV !== "production" && ((s = r.onTrigger) == null || s.call(r, P({ effect: r }, n))), r.trigger(), (!r._runnings || r.allowRecurse) && r._dirtyLevel !== 2 && (r._shouldSchedule = !1, r.scheduler && Me.push(r.scheduler)));
  }
  Ze();
}
const Vn = (e, t) => {
  const n = /* @__PURE__ */ new Map();
  return n.cleanup = e, n.computed = t, n;
}, je = /* @__PURE__ */ new WeakMap(), U = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), Le = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
function N(e, t, n) {
  if (z && re) {
    let s = je.get(e);
    s || je.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || s.set(n, r = Vn(() => s.delete(n))), Sn(
      re,
      r,
      process.env.NODE_ENV !== "production" ? {
        target: e,
        type: t,
        key: n
      } : void 0
    );
  }
}
function K(e, t, n, s, r, o) {
  const i = je.get(e);
  if (!i)
    return;
  let c = [];
  if (t === "clear")
    c = [...i.values()];
  else if (n === "length" && h(e)) {
    const l = Number(s);
    i.forEach((a, u) => {
      (u === "length" || !ue(u) && u >= l) && c.push(a);
    });
  } else
    switch (n !== void 0 && c.push(i.get(n)), t) {
      case "add":
        h(e) ? Be(n) && c.push(i.get("length")) : (c.push(i.get(U)), Q(e) && c.push(i.get(Le)));
        break;
      case "delete":
        h(e) || (c.push(i.get(U)), Q(e) && c.push(i.get(Le)));
        break;
      case "set":
        Q(e) && c.push(i.get(U));
        break;
    }
  Ye();
  for (const l of c)
    l && yn(
      l,
      4,
      process.env.NODE_ENV !== "production" ? {
        target: e,
        type: t,
        key: n,
        newValue: s,
        oldValue: r,
        oldTarget: o
      } : void 0
    );
  Ze();
}
const xn = /* @__PURE__ */ rn("__proto__,__v_isRef,__isVue"), Pt = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(ue)
), pt = /* @__PURE__ */ Pn();
function Pn() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const s = p(this);
      for (let o = 0, i = this.length; o < i; o++)
        N(s, "get", o + "");
      const r = s[t](...n);
      return r === -1 || r === !1 ? s[t](...n.map(p)) : r;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      xe(), Ye();
      const s = p(this)[t].apply(this, n);
      return Ze(), Pe(), s;
    };
  }), e;
}
function Rn(e) {
  ue(e) || (e = String(e));
  const t = p(this);
  return N(t, "has", e), t.hasOwnProperty(e);
}
class Rt {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, s) {
    const r = this._isReadonly, o = this._isShallow;
    if (n === "__v_isReactive")
      return !r;
    if (n === "__v_isReadonly")
      return r;
    if (n === "__v_isShallow")
      return o;
    if (n === "__v_raw")
      return s === (r ? o ? $t : Ct : o ? zn : Tt).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const i = h(t);
    if (!r) {
      if (i && E(pt, n))
        return Reflect.get(pt, n, s);
      if (n === "hasOwnProperty")
        return Rn;
    }
    const c = Reflect.get(t, n, s);
    return (ue(n) ? Pt.has(n) : xn(n)) || (r || N(t, "get", n), o) ? c : D(c) ? i && Be(n) ? c : c.value : x(c) ? r ? Mt(c) : At(c) : c;
  }
}
class Dn extends Rt {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, r) {
    let o = t[n];
    if (!this._isShallow) {
      const l = Ne(o);
      if (!He(s) && !Ne(s) && (o = p(o), s = p(s)), !h(t) && D(o) && !D(s))
        return l ? !1 : (o.value = s, !0);
    }
    const i = h(t) && Be(n) ? Number(n) < t.length : E(t, n), c = Reflect.set(t, n, s, r);
    return t === p(r) && (i ? k(s, o) && K(t, "set", n, s, o) : K(t, "add", n, s)), c;
  }
  deleteProperty(t, n) {
    const s = E(t, n), r = t[n], o = Reflect.deleteProperty(t, n);
    return o && s && K(t, "delete", n, void 0, r), o;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!ue(n) || !Pt.has(n)) && N(t, "has", n), s;
  }
  ownKeys(t) {
    return N(
      t,
      "iterate",
      h(t) ? "length" : U
    ), Reflect.ownKeys(t);
  }
}
class Dt extends Rt {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return process.env.NODE_ENV !== "production" && le(
      `Set operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, n) {
    return process.env.NODE_ENV !== "production" && le(
      `Delete operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const In = /* @__PURE__ */ new Dn(), Tn = /* @__PURE__ */ new Dt(), Cn = /* @__PURE__ */ new Dt(!0), Qe = (e) => e, Re = (e) => Reflect.getPrototypeOf(e);
function fe(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const r = p(e), o = p(t);
  n || (k(t, o) && N(r, "get", t), N(r, "get", o));
  const { has: i } = Re(r), c = s ? Qe : n ? tt : et;
  if (i.call(r, t))
    return c(e.get(t));
  if (i.call(r, o))
    return c(e.get(o));
  e !== r && e.get(t);
}
function pe(e, t = !1) {
  const n = this.__v_raw, s = p(n), r = p(e);
  return t || (k(e, r) && N(s, "has", e), N(s, "has", r)), e === r ? n.has(e) : n.has(e) || n.has(r);
}
function de(e, t = !1) {
  return e = e.__v_raw, !t && N(p(e), "iterate", U), Reflect.get(e, "size", e);
}
function dt(e) {
  e = p(e);
  const t = p(this);
  return Re(t).has.call(t, e) || (t.add(e), K(t, "add", e, e)), this;
}
function ht(e, t) {
  t = p(t);
  const n = p(this), { has: s, get: r } = Re(n);
  let o = s.call(n, e);
  o ? process.env.NODE_ENV !== "production" && It(n, s, e) : (e = p(e), o = s.call(n, e));
  const i = r.call(n, e);
  return n.set(e, t), o ? k(t, i) && K(n, "set", e, t, i) : K(n, "add", e, t), this;
}
function _t(e) {
  const t = p(this), { has: n, get: s } = Re(t);
  let r = n.call(t, e);
  r ? process.env.NODE_ENV !== "production" && It(t, n, e) : (e = p(e), r = n.call(t, e));
  const o = s ? s.call(t, e) : void 0, i = t.delete(e);
  return r && K(t, "delete", e, void 0, o), i;
}
function gt() {
  const e = p(this), t = e.size !== 0, n = process.env.NODE_ENV !== "production" ? Q(e) ? new Map(e) : new Set(e) : void 0, s = e.clear();
  return t && K(e, "clear", void 0, void 0, n), s;
}
function he(e, t) {
  return function(s, r) {
    const o = this, i = o.__v_raw, c = p(i), l = t ? Qe : e ? tt : et;
    return !e && N(c, "iterate", U), i.forEach((a, u) => s.call(r, l(a), l(u), o));
  };
}
function _e(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, o = p(r), i = Q(o), c = e === "entries" || e === Symbol.iterator && i, l = e === "keys" && i, a = r[e](...s), u = n ? Qe : t ? tt : et;
    return !t && N(
      o,
      "iterate",
      l ? Le : U
    ), {
      // iterator protocol
      next() {
        const { value: _, done: O } = a.next();
        return O ? { value: _, done: O } : {
          value: c ? [u(_[0]), u(_[1])] : u(_),
          done: O
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function j(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      le(
        `${hn(e)} operation ${n}failed: target is readonly.`,
        p(this)
      );
    }
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function $n() {
  const e = {
    get(o) {
      return fe(this, o);
    },
    get size() {
      return de(this);
    },
    has: pe,
    add: dt,
    set: ht,
    delete: _t,
    clear: gt,
    forEach: he(!1, !1)
  }, t = {
    get(o) {
      return fe(this, o, !1, !0);
    },
    get size() {
      return de(this);
    },
    has: pe,
    add: dt,
    set: ht,
    delete: _t,
    clear: gt,
    forEach: he(!1, !0)
  }, n = {
    get(o) {
      return fe(this, o, !0);
    },
    get size() {
      return de(this, !0);
    },
    has(o) {
      return pe.call(this, o, !0);
    },
    add: j("add"),
    set: j("set"),
    delete: j("delete"),
    clear: j("clear"),
    forEach: he(!0, !1)
  }, s = {
    get(o) {
      return fe(this, o, !0, !0);
    },
    get size() {
      return de(this, !0);
    },
    has(o) {
      return pe.call(this, o, !0);
    },
    add: j("add"),
    set: j("set"),
    delete: j("delete"),
    clear: j("clear"),
    forEach: he(!0, !0)
  };
  return [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((o) => {
    e[o] = _e(o, !1, !1), n[o] = _e(o, !0, !1), t[o] = _e(o, !1, !0), s[o] = _e(
      o,
      !0,
      !0
    );
  }), [
    e,
    n,
    t,
    s
  ];
}
const [
  An,
  Mn,
  jn,
  Ln
] = /* @__PURE__ */ $n();
function Xe(e, t) {
  const n = t ? e ? Ln : jn : e ? Mn : An;
  return (s, r, o) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(
    E(n, r) && r in s ? n : s,
    r,
    o
  );
}
const Hn = {
  get: /* @__PURE__ */ Xe(!1, !1)
}, Fn = {
  get: /* @__PURE__ */ Xe(!0, !1)
}, Kn = {
  get: /* @__PURE__ */ Xe(!0, !0)
};
function It(e, t, n) {
  const s = p(n);
  if (s !== n && t.call(e, s)) {
    const r = St(e);
    le(
      `Reactive ${r} contains both the raw and reactive versions of the same object${r === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const Tt = /* @__PURE__ */ new WeakMap(), zn = /* @__PURE__ */ new WeakMap(), Ct = /* @__PURE__ */ new WeakMap(), $t = /* @__PURE__ */ new WeakMap();
function Un(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Wn(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Un(St(e));
}
function At(e) {
  return Ne(e) ? e : ke(
    e,
    !1,
    In,
    Hn,
    Tt
  );
}
function Mt(e) {
  return ke(
    e,
    !0,
    Tn,
    Fn,
    Ct
  );
}
function ge(e) {
  return ke(
    e,
    !0,
    Cn,
    Kn,
    $t
  );
}
function ke(e, t, n, s, r) {
  if (!x(e))
    return process.env.NODE_ENV !== "production" && le(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = r.get(e);
  if (o)
    return o;
  const i = Wn(e);
  if (i === 0)
    return e;
  const c = new Proxy(
    e,
    i === 2 ? s : n
  );
  return r.set(e, c), c;
}
function oe(e) {
  return Ne(e) ? oe(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Ne(e) {
  return !!(e && e.__v_isReadonly);
}
function He(e) {
  return !!(e && e.__v_isShallow);
}
function Fe(e) {
  return e ? !!e.__v_raw : !1;
}
function p(e) {
  const t = e && e.__v_raw;
  return t ? p(t) : e;
}
function Bn(e) {
  return Object.isExtensible(e) && _n(e, "__v_skip", !0), e;
}
const et = (e) => x(e) ? At(e) : e, tt = (e) => x(e) ? Mt(e) : e;
function D(e) {
  return !!(e && e.__v_isRef === !0);
}
function qn(e) {
  return D(e) ? e.value : e;
}
const Gn = {
  get: (e, t, n) => qn(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return D(r) && !D(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function Jn(e) {
  return oe(e) ? e : new Proxy(e, Gn);
}
/**
* @vue/runtime-core v3.4.27
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const W = [];
function Yn(e) {
  W.push(e);
}
function Zn() {
  W.pop();
}
function g(e, ...t) {
  xe();
  const n = W.length ? W[W.length - 1].component : null, s = n && n.appContext.config.warnHandler, r = Qn();
  if (s)
    B(
      s,
      n,
      11,
      [
        e + t.map((o) => {
          var i, c;
          return (c = (i = o.toString) == null ? void 0 : i.call(o)) != null ? c : JSON.stringify(o);
        }).join(""),
        n && n.proxy,
        r.map(
          ({ vnode: o }) => `at <${kt(n, o.type)}>`
        ).join(`
`),
        r
      ]
    );
  else {
    const o = [`[Vue warn]: ${e}`, ...t];
    r.length && o.push(`
`, ...Xn(r)), console.warn(...o);
  }
  Pe();
}
function Qn() {
  let e = W[W.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const s = e.component && e.component.parent;
    e = s && s.vnode;
  }
  return t;
}
function Xn(e) {
  const t = [];
  return e.forEach((n, s) => {
    t.push(...s === 0 ? [] : [`
`], ...kn(n));
  }), t;
}
function kn({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", s = e.component ? e.component.parent == null : !1, r = ` at <${kt(
    e.component,
    e.type,
    s
  )}`, o = ">" + n;
  return e.props ? [r, ...es(e.props), o] : [r + o];
}
function es(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((s) => {
    t.push(...jt(s, e[s]));
  }), n.length > 3 && t.push(" ..."), t;
}
function jt(e, t, n) {
  return V(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : D(t) ? (t = jt(e, p(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : w(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = p(t), n ? t : [`${e}=`, t]);
}
const Lt = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  [0]: "setup function",
  [1]: "render function",
  [2]: "watcher getter",
  [3]: "watcher callback",
  [4]: "watcher cleanup function",
  [5]: "native event handler",
  [6]: "component event handler",
  [7]: "vnode hook",
  [8]: "directive hook",
  [9]: "transition hook",
  [10]: "app errorHandler",
  [11]: "app warnHandler",
  [12]: "ref function",
  [13]: "async component loader",
  [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://github.com/vuejs/core ."
};
function B(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (r) {
    nt(r, t, n);
  }
}
function be(e, t, n, s) {
  if (w(e)) {
    const r = B(e, t, n, s);
    return r && an(r) && r.catch((o) => {
      nt(o, t, n);
    }), r;
  }
  if (h(e)) {
    const r = [];
    for (let o = 0; o < e.length; o++)
      r.push(be(e[o], t, n, s));
    return r;
  } else
    process.env.NODE_ENV !== "production" && g(
      `Invalid value type passed to callWithAsyncErrorHandling(): ${typeof e}`
    );
}
function nt(e, t, n, s = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const i = t.proxy, c = process.env.NODE_ENV !== "production" ? Lt[n] : `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; o; ) {
      const a = o.ec;
      if (a) {
        for (let u = 0; u < a.length; u++)
          if (a[u](e, i, c) === !1)
            return;
      }
      o = o.parent;
    }
    const l = t.appContext.config.errorHandler;
    if (l) {
      xe(), B(
        l,
        null,
        10,
        [e, i, c]
      ), Pe();
      return;
    }
  }
  ts(e, n, r, s);
}
function ts(e, t, n, s = !0) {
  if (process.env.NODE_ENV !== "production") {
    const r = Lt[t];
    if (n && Yn(n), g(`Unhandled error${r ? ` during execution of ${r}` : ""}`), n && Zn(), s)
      throw e;
    console.error(e);
  } else
    console.error(e);
}
let ve = !1, Ke = !1;
const R = [];
let F = 0;
const X = [];
let A = null, H = 0;
const Ht = /* @__PURE__ */ Promise.resolve();
let st = null;
const ns = 100;
function Ft(e) {
  const t = st || Ht;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function ss(e) {
  let t = F + 1, n = R.length;
  for (; t < n; ) {
    const s = t + n >>> 1, r = R[s], o = ae(r);
    o < e || o === e && r.pre ? t = s + 1 : n = s;
  }
  return t;
}
function rt(e) {
  (!R.length || !R.includes(
    e,
    ve && e.allowRecurse ? F + 1 : F
  )) && (e.id == null ? R.push(e) : R.splice(ss(e.id), 0, e), Kt());
}
function Kt() {
  !ve && !Ke && (Ke = !0, st = Ht.then(Ut));
}
function zt(e) {
  h(e) ? X.push(...e) : (!A || !A.includes(
    e,
    e.allowRecurse ? H + 1 : H
  )) && X.push(e), Kt();
}
function rs(e) {
  if (X.length) {
    const t = [...new Set(X)].sort(
      (n, s) => ae(n) - ae(s)
    );
    if (X.length = 0, A) {
      A.push(...t);
      return;
    }
    for (A = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), H = 0; H < A.length; H++)
      process.env.NODE_ENV !== "production" && Wt(e, A[H]) || A[H]();
    A = null, H = 0;
  }
}
const ae = (e) => e.id == null ? 1 / 0 : e.id, os = (e, t) => {
  const n = ae(e) - ae(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function Ut(e) {
  Ke = !1, ve = !0, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), R.sort(os);
  const t = process.env.NODE_ENV !== "production" ? (n) => Wt(e, n) : G;
  try {
    for (F = 0; F < R.length; F++) {
      const n = R[F];
      if (n && n.active !== !1) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        B(n, null, 14);
      }
    }
  } finally {
    F = 0, R.length = 0, rs(e), ve = !1, st = null, (R.length || X.length) && Ut(e);
  }
}
function Wt(e, t) {
  if (!e.has(t))
    e.set(t, 1);
  else {
    const n = e.get(t);
    if (n > ns) {
      const s = t.ownerInstance, r = s && Xt(s.type);
      return nt(
        `Maximum recursive updates exceeded${r ? ` in component <${r}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
        null,
        10
      ), !0;
    } else
      e.set(t, n + 1);
  }
}
const ne = /* @__PURE__ */ new Set();
process.env.NODE_ENV !== "production" && (yt().__VUE_HMR_RUNTIME__ = {
  createRecord: Ce(is),
  rerender: Ce(cs),
  reload: Ce(ls)
});
const Oe = /* @__PURE__ */ new Map();
function is(e, t) {
  return Oe.has(e) ? !1 : (Oe.set(e, {
    initialDef: ie(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function ie(e) {
  return en(e) ? e.__vccOpts : e;
}
function cs(e, t) {
  const n = Oe.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((s) => {
    t && (s.render = t, ie(s.type).render = t), s.renderCache = [], s.effect.dirty = !0, s.update();
  }));
}
function ls(e, t) {
  const n = Oe.get(e);
  if (!n)
    return;
  t = ie(t), mt(n.initialDef, t);
  const s = [...n.instances];
  for (const r of s) {
    const o = ie(r.type);
    ne.has(o) || (o !== n.initialDef && mt(o, t), ne.add(o)), r.appContext.propsCache.delete(r.type), r.appContext.emitsCache.delete(r.type), r.appContext.optionsCache.delete(r.type), r.ceReload ? (ne.add(o), r.ceReload(t.styles), ne.delete(o)) : r.parent ? (r.parent.effect.dirty = !0, rt(r.parent.update)) : r.appContext.reload ? r.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    );
  }
  zt(() => {
    for (const r of s)
      ne.delete(
        ie(r.type)
      );
  });
}
function mt(e, t) {
  P(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function Ce(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (s) {
      console.error(s), console.warn(
        "[HMR] Something went wrong during Vue component hot-reload. Full reload required."
      );
    }
  };
}
let q, me = [];
function Bt(e, t) {
  var n, s;
  q = e, q ? (q.enabled = !0, me.forEach(({ event: r, args: o }) => q.emit(r, ...o)), me = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  !((s = (n = window.navigator) == null ? void 0 : n.userAgent) != null && s.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((o) => {
    Bt(o, t);
  }), setTimeout(() => {
    q || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, me = []);
  }, 3e3)) : me = [];
}
let M = null, as = null;
const us = Symbol.for("v-ndc"), fs = (e) => e.__isSuspense;
function ps(e, t) {
  t && t.pendingBranch ? h(e) ? t.effects.push(...e) : t.effects.push(e) : zt(e);
}
const ds = Symbol.for("v-scx"), hs = () => {
  {
    const e = ys(ds);
    return e || process.env.NODE_ENV !== "production" && g(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), e;
  }
}, Ee = {};
function _s(e, t, {
  immediate: n,
  deep: s,
  flush: r,
  once: o,
  onTrack: i,
  onTrigger: c
} = L) {
  if (t && o) {
    const f = t;
    t = (...Ie) => {
      f(...Ie), y();
    };
  }
  process.env.NODE_ENV !== "production" && s !== void 0 && typeof s == "number" && g(
    'watch() "deep" option with number value will be used as watch depth in future versions. Please use a boolean instead to avoid potential breakage.'
  ), process.env.NODE_ENV !== "production" && !t && (n !== void 0 && g(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), s !== void 0 && g(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ), o !== void 0 && g(
    'watch() "once" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const l = (f) => {
    g(
      "Invalid watch source: ",
      f,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, a = De, u = (f) => s === !0 ? f : (
    // for deep: false, only traverse root-level properties
    J(f, s === !1 ? 1 : void 0)
  );
  let _, O = !1, S = !1;
  if (D(e) ? (_ = () => e.value, O = He(e)) : oe(e) ? (_ = () => u(e), O = !0) : h(e) ? (S = !0, O = e.some((f) => oe(f) || He(f)), _ = () => e.map((f) => {
    if (D(f))
      return f.value;
    if (oe(f))
      return u(f);
    if (w(f))
      return B(f, a, 2);
    process.env.NODE_ENV !== "production" && l(f);
  })) : w(e) ? t ? _ = () => B(e, a, 2) : _ = () => (b && b(), be(
    e,
    a,
    3,
    [T]
  )) : (_ = G, process.env.NODE_ENV !== "production" && l(e)), t && s) {
    const f = _;
    _ = () => J(f());
  }
  let b, T = (f) => {
    b = d.onStop = () => {
      B(f, a, 4), b = d.onStop = void 0;
    };
  }, ee;
  if (Qt)
    if (T = G, t ? n && be(t, a, 3, [
      _(),
      S ? [] : void 0,
      T
    ]) : _(), r === "sync") {
      const f = hs();
      ee = f.__watcherHandles || (f.__watcherHandles = []);
    } else
      return G;
  let C = S ? new Array(e.length).fill(Ee) : Ee;
  const I = () => {
    if (!(!d.active || !d.dirty))
      if (t) {
        const f = d.run();
        (s || O || (S ? f.some((Ie, tn) => k(Ie, C[tn])) : k(f, C))) && (b && b(), be(t, a, 3, [
          f,
          // pass undefined as the old value when it's changed for the first time
          C === Ee ? void 0 : S && C[0] === Ee ? [] : C,
          T
        ]), C = f);
      } else
        d.run();
  };
  I.allowRecurse = !!t;
  let m;
  r === "sync" ? m = I : r === "post" ? m = () => Ot(I, a && a.suspense) : (I.pre = !0, a && (I.id = a.uid), m = () => rt(I));
  const d = new vn(_, G, m), y = () => {
    d.stop();
  };
  return process.env.NODE_ENV !== "production" && (d.onTrack = i, d.onTrigger = c), t ? n ? I() : C = d.run() : r === "post" ? Ot(
    d.run.bind(d),
    a && a.suspense
  ) : d.run(), ee && ee.push(y), y;
}
function gs(e, t, n) {
  const s = this.proxy, r = V(e) ? e.includes(".") ? ms(s, e) : () => s[e] : e.bind(s, s);
  let o;
  w(t) ? o = t : (o = t.handler, n = t);
  const i = As(this), c = _s(r, o.bind(s), n);
  return i(), c;
}
function ms(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
function J(e, t = 1 / 0, n) {
  if (t <= 0 || !x(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Set(), n.has(e)))
    return e;
  if (n.add(e), t--, D(e))
    J(e.value, t, n);
  else if (h(e))
    for (let s = 0; s < e.length; s++)
      J(e[s], t, n);
  else if (ln(e) || Q(e))
    e.forEach((s) => {
      J(s, t, n);
    });
  else if (fn(e))
    for (const s in e)
      J(e[s], t, n);
  return e;
}
/*! #__NO_SIDE_EFFECTS__ */
function Es(e, t) {
  return w(e) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => P({ name: e.name }, t, { setup: e }))()
  ) : e;
}
const ze = (e) => e ? Ms(e) ? js(e) || e.proxy : ze(e.parent) : null, ce = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ P(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => process.env.NODE_ENV !== "production" ? ge(e.props) : e.props,
    $attrs: (e) => process.env.NODE_ENV !== "production" ? ge(e.attrs) : e.attrs,
    $slots: (e) => process.env.NODE_ENV !== "production" ? ge(e.slots) : e.slots,
    $refs: (e) => process.env.NODE_ENV !== "production" ? ge(e.refs) : e.refs,
    $parent: (e) => ze(e.parent),
    $root: (e) => ze(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Ns(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      e.effect.dirty = !0, rt(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Ft.bind(e.proxy)),
    $watch: (e) => gs.bind(e)
  })
), bs = (e) => e === "_" || e === "$", $e = (e, t) => e !== L && !e.__isScriptSetup && E(e, t), ws = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: s, data: r, props: o, accessCache: i, type: c, appContext: l } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let a;
    if (t[0] !== "$") {
      const S = i[t];
      if (S !== void 0)
        switch (S) {
          case 1:
            return s[t];
          case 2:
            return r[t];
          case 4:
            return n[t];
          case 3:
            return o[t];
        }
      else {
        if ($e(s, t))
          return i[t] = 1, s[t];
        if (r !== L && E(r, t))
          return i[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (a = e.propsOptions[0]) && E(a, t)
        )
          return i[t] = 3, o[t];
        if (n !== L && E(n, t))
          return i[t] = 4, n[t];
        i[t] = 0;
      }
    }
    const u = ce[t];
    let _, O;
    if (u)
      return t === "$attrs" ? (N(e.attrs, "get", ""), process.env.NODE_ENV !== "production" && void 0) : process.env.NODE_ENV !== "production" && t === "$slots" && N(e, "get", t), u(e);
    if (
      // css module (injected by vue-loader)
      (_ = c.__cssModules) && (_ = _[t])
    )
      return _;
    if (n !== L && E(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      O = l.config.globalProperties, E(O, t)
    )
      return O[t];
    process.env.NODE_ENV !== "production" && M && (!V(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (r !== L && bs(t[0]) && E(r, t) ? g(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === M && g(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: o } = e;
    return $e(r, t) ? (r[t] = n, !0) : process.env.NODE_ENV !== "production" && r.__isScriptSetup && E(r, t) ? (g(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : s !== L && E(s, t) ? (s[t] = n, !0) : E(e.props, t) ? (process.env.NODE_ENV !== "production" && g(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && g(
      `Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`
    ), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(o, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : o[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, propsOptions: o }
  }, i) {
    let c;
    return !!n[i] || e !== L && E(e, i) || $e(t, i) || (c = o[0]) && E(c, i) || E(s, i) || E(ce, i) || E(r.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : E(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (ws.ownKeys = (e) => (g(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
function Et(e) {
  return h(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function Ns(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: r,
    optionsCache: o,
    config: { optionMergeStrategies: i }
  } = e.appContext, c = o.get(t);
  let l;
  return c ? l = c : !r.length && !n && !s ? l = t : (l = {}, r.length && r.forEach(
    (a) => Se(l, a, i, !0)
  ), Se(l, t, i)), x(t) && o.set(t, l), l;
}
function Se(e, t, n, s = !1) {
  const { mixins: r, extends: o } = t;
  o && Se(e, o, n, !0), r && r.forEach(
    (i) => Se(e, i, n, !0)
  );
  for (const i in t)
    if (s && i === "expose")
      process.env.NODE_ENV !== "production" && g(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const c = vs[i] || n && n[i];
      e[i] = c ? c(e[i], t[i]) : t[i];
    }
  return e;
}
const vs = {
  data: bt,
  props: Nt,
  emits: Nt,
  // objects
  methods: se,
  computed: se,
  // lifecycle
  beforeCreate: v,
  created: v,
  beforeMount: v,
  mounted: v,
  beforeUpdate: v,
  updated: v,
  beforeDestroy: v,
  beforeUnmount: v,
  destroyed: v,
  unmounted: v,
  activated: v,
  deactivated: v,
  errorCaptured: v,
  serverPrefetch: v,
  // assets
  components: se,
  directives: se,
  // watch
  watch: Ss,
  // provide / inject
  provide: bt,
  inject: Os
};
function bt(e, t) {
  return t ? e ? function() {
    return P(
      w(e) ? e.call(this, this) : e,
      w(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Os(e, t) {
  return se(wt(e), wt(t));
}
function wt(e) {
  if (h(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function v(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function se(e, t) {
  return e ? P(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Nt(e, t) {
  return e ? h(e) && h(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : P(
    /* @__PURE__ */ Object.create(null),
    Et(e),
    Et(t ?? {})
  ) : t;
}
function Ss(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = P(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = v(e[s], t[s]);
  return n;
}
let vt = null;
function ys(e, t, n = !1) {
  const s = De || M;
  if (s || vt) {
    const r = s ? s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : vt._context.provides;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && w(t) ? t.call(s && s.proxy) : t;
    process.env.NODE_ENV !== "production" && g(`injection "${String(e)}" not found.`);
  } else
    process.env.NODE_ENV !== "production" && g("inject() can only be used inside setup() or functional components.");
}
const Vs = {}, qt = (e) => Object.getPrototypeOf(e) === Vs, Ot = ps, xs = (e) => e.__isTeleport, Gt = Symbol.for("v-fgt"), Ps = Symbol.for("v-txt"), Rs = Symbol.for("v-cmt");
let Y = null;
function Ue(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
const Ds = (...e) => Yt(
  ...e
), Jt = ({ key: e }) => e ?? null, we = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? V(e) || D(e) || w(e) ? { i: M, r: e, k: t, f: !!n } : e : null);
function Is(e, t = null, n = null, s = 0, r = null, o = e === Gt ? 0 : 1, i = !1, c = !1) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Jt(t),
    ref: t && we(t),
    scopeId: as,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: M
  };
  return c ? (ot(l, n), o & 128 && e.normalize(l)) : n && (l.shapeFlag |= V(n) ? 8 : 16), process.env.NODE_ENV !== "production" && l.key !== l.key && g("VNode created with invalid key (NaN). VNode type:", l.type), // avoid a block node from tracking itself
  !i && // has current parent block
  Y && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (l.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  l.patchFlag !== 32 && Y.push(l), l;
}
const Z = process.env.NODE_ENV !== "production" ? Ds : Yt;
function Yt(e, t = null, n = null, s = 0, r = null, o = !1) {
  if ((!e || e === us) && (process.env.NODE_ENV !== "production" && !e && g(`Invalid vnode type when creating vnode: ${e}.`), e = Rs), Ue(e)) {
    const c = ye(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && ot(c, n), !o && Y && (c.shapeFlag & 6 ? Y[Y.indexOf(e)] = c : Y.push(c)), c.patchFlag |= -2, c;
  }
  if (en(e) && (e = e.__vccOpts), t) {
    t = Ts(t);
    let { class: c, style: l } = t;
    c && !V(c) && (t.class = Je(c)), x(l) && (Fe(l) && !h(l) && (l = P({}, l)), t.style = Ge(l));
  }
  const i = V(e) ? 1 : fs(e) ? 128 : xs(e) ? 64 : x(e) ? 4 : w(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && Fe(e) && (e = p(e), g(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), Is(
    e,
    t,
    n,
    s,
    r,
    i,
    o,
    !0
  );
}
function Ts(e) {
  return e ? Fe(e) || qt(e) ? P({}, e) : e : null;
}
function ye(e, t, n = !1, s = !1) {
  const { props: r, ref: o, patchFlag: i, children: c, transition: l } = e, a = t ? $s(r || {}, t) : r, u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: a,
    key: a && Jt(a),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && o ? h(o) ? o.concat(we(t)) : [o, we(t)] : we(t)
    ) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && i === -1 && h(c) ? c.map(Zt) : c,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Gt ? i === -1 ? 16 : i | 16 : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: l,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && ye(e.ssContent),
    ssFallback: e.ssFallback && ye(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return l && s && (u.transition = l.clone(u)), u;
}
function Zt(e) {
  const t = ye(e);
  return h(e.children) && (t.children = e.children.map(Zt)), t;
}
function Cs(e = " ", t = 0) {
  return Z(Ps, null, e, t);
}
function ot(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (h(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), ot(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !qt(t) ? t._ctx = M : r === 3 && M && (M.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    w(t) ? (t = { default: t, _ctx: M }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [Cs(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function $s(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = Je([t.class, s.class]));
      else if (r === "style")
        t.style = Ge([t.style, s.style]);
      else if (on(r)) {
        const o = t[r], i = s[r];
        i && o !== i && !(h(o) && o.includes(i)) && (t[r] = o ? [].concat(o, i) : i);
      } else
        r !== "" && (t[r] = s[r]);
  }
  return t;
}
let De = null, We;
{
  const e = yt(), t = (n, s) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(s), (o) => {
      r.length > 1 ? r.forEach((i) => i(o)) : r[0](o);
    };
  };
  We = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => De = n
  ), t(
    "__VUE_SSR_SETTERS__",
    (n) => Qt = n
  );
}
const As = (e) => {
  const t = De;
  return We(e), e.scope.on(), () => {
    e.scope.off(), We(t);
  };
};
function Ms(e) {
  return e.vnode.shapeFlag & 4;
}
let Qt = !1;
process.env.NODE_ENV;
function js(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(Jn(Bn(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in ce)
          return ce[n](e);
      },
      has(t, n) {
        return n in t || n in ce;
      }
    }));
}
const Ls = /(?:^|[-_])(\w)/g, Hs = (e) => e.replace(Ls, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function Xt(e, t = !0) {
  return w(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function kt(e, t, n = !1) {
  let s = Xt(t);
  if (!s && t.__file) {
    const r = t.__file.match(/([^/\\]+)\.\w+$/);
    r && (s = r[1]);
  }
  if (!s && e && e.parent) {
    const r = (o) => {
      for (const i in o)
        if (o[i] === t)
          return i;
    };
    s = r(
      e.components || e.parent.type.components
    ) || r(e.appContext.components);
  }
  return s ? Hs(s) : n ? "App" : "Anonymous";
}
function en(e) {
  return w(e) && "__vccOpts" in e;
}
function Fs(e, t, n) {
  const s = arguments.length;
  return s === 2 ? x(t) && !h(t) ? Ue(t) ? Z(e, null, [t]) : Z(e, t) : Z(e, null, t) : (s > 3 ? n = Array.prototype.slice.call(arguments, 2) : s === 3 && Ue(n) && (n = [n]), Z(e, t, n));
}
process.env.NODE_ENV;
process.env.NODE_ENV;
process.env.NODE_ENV;
/*! #__NO_SIDE_EFFECTS__ */
function Ks(e, t, n) {
  const s = Es(e);
  class r extends it {
    constructor(i) {
      super(s, i, t, n);
    }
  }
  return $(r, "def", s), r;
}
const zs = typeof HTMLElement < "u" ? HTMLElement : class {
};
class it extends zs {
  constructor(n, s = {}, r = {}, o) {
    super();
    /**
     * @internal
     */
    $(this, "_instance", null);
    $(this, "_connected", !1);
    $(this, "_resolved", !1);
    $(this, "_numberProps", null);
    $(this, "_styles");
    $(this, "_slots", {});
    $(this, "_ob", null);
    this._def = n, this._props = s, this._config = r, this._root && o ? o(this._createVNode(), this._root) : (this._config.shadowRoot !== !1 && this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def));
  }
  get _root() {
    return this._config.shadowRoot ? this.shadowRoot : this;
  }
  connectedCallback() {
    this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    this._connected = !1, Ft(() => {
      this._connected || (this._ob && (this._ob.disconnect(), this._ob = null), ct(null, this._root), this._instance = null);
    });
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    this._resolved = !0;
    for (let r = 0; r < this.attributes.length; r++)
      this._setAttr(this.attributes[r].name);
    this._ob = new MutationObserver((r) => {
      for (const o of r)
        this._setAttr(o.attributeName);
    }), this._ob.observe(this, { attributes: !0 });
    const n = (r, o = !1) => {
      const { props: i, styles: c } = r;
      let l;
      if (i && !h(i))
        for (const a in i) {
          const u = i[a];
          (u === Number || u && u.type === Number) && (a in this._props && (this._props[a] = lt(this._props[a])), (l || (l = /* @__PURE__ */ Object.create(null)))[Te(a)] = !0);
        }
      if (this._numberProps = l, o && this._resolveProps(r), !this._config.shadowRoot) {
        this._slots = {};
        for (const a of Array.from(this.children)) {
          const u = a.getAttribute("slot") || "default";
          this._slots[u] || (this._slots[u] = []), this._slots[u].push(Fs(a.tagName.toLowerCase(), {}, a.innerHTML));
        }
        this.replaceChildren();
      }
      this._applyStyles(c), this._update();
    }, s = this._def.__asyncLoader;
    s ? s().then((r) => n(r, !0)) : n(this._def);
  }
  _resolveProps(n) {
    const { props: s } = n, r = h(s) ? s : Object.keys(s || {});
    for (const o of Object.keys(this))
      o[0] !== "_" && r.includes(o) && this._setProp(o, this[o], !0, !1);
    for (const o of r.map(Te))
      Object.defineProperty(this, o, {
        get() {
          return this._getProp(o);
        },
        set(i) {
          this._setProp(o, i);
        }
      });
  }
  _setAttr(n) {
    let s = this.hasAttribute(n) ? this.getAttribute(n) : void 0;
    const r = Te(n);
    this._numberProps && this._numberProps[r] && (s = lt(s)), this._setProp(r, s, !1);
  }
  /**
   * @internal
   */
  _getProp(n) {
    return this._props[n];
  }
  /**
   * @internal
   */
  _setProp(n, s, r = !0, o = !0) {
    s !== this._props[n] && (this._props[n] = s, o && this._instance && this._update(), r && (s === !0 ? this.setAttribute(te(n), "") : typeof s == "string" || typeof s == "number" ? this.setAttribute(te(n), s + "") : s || this.removeAttribute(te(n))));
  }
  _update() {
    ct(this._createVNode(), this._root);
  }
  _createVNode() {
    const n = Z(this._def, P({}, this._props), this._slots);
    return this._instance || (n.ce = (s) => {
      this._instance = s, s.isCE = !0;
      const r = (i, c) => {
        this.dispatchEvent(
          new CustomEvent(i, {
            detail: c
          })
        );
      };
      s.emit = (i, ...c) => {
        r(i, c), te(i) !== i && r(te(i), c);
      };
      let o = this;
      for (; o = o && (o.parentNode || o.host); )
        if (o instanceof it) {
          s.parent = o._instance, s.provides = o._instance.provides;
          break;
        }
    }), n;
  }
  _applyStyles(n) {
    n && n.forEach((s) => {
      const r = document.createElement("style");
      r.textContent = s, this._root.appendChild(r);
    });
  }
}
const Us = (e) => {
  for (; (e == null ? void 0 : e.nodeType) !== 1; ) {
    if (!e.parentElement)
      throw new Error(
        "No parent element found, the rootComponent must be wrapped in a HTML element (e.g. <template><div> app content </div></template>)"
      );
    e = e.parentElement;
  }
  return e;
};
function Ws(e) {
  return "on" + e.charAt(0).toUpperCase() + e.slice(1);
}
const Bs = ({
  rootComponent: e,
  plugins: t,
  cssFrameworkStyles: n,
  VueDefineCustomElement: s,
  h: r,
  createApp: o,
  getCurrentInstance: i,
  elementName: c,
  disableRemoveStylesOnUnmount: l,
  disableShadowDOM: a
}) => (a ? Ks : s)({
  styles: [n],
  props: {
    ...e.props,
    modelValue: { type: [String, Number, Boolean, Array, Object] }
    // v-model support
  },
  emits: e == null ? void 0 : e.emits,
  setup(_, { slots: O }) {
    var I;
    const S = [...(e == null ? void 0 : e.emits) || [], "update:modelValue"], b = o();
    if (b.component("app-root", e), e.provide) {
      const m = typeof e.provide == "function" ? e.provide() : e.provide;
      Object.keys(m).forEach((d) => {
        b.provide(d, m[d]);
      });
    }
    b.mixin({
      mounted() {
        var d;
        const m = (y) => {
          y != null && y.length && (this.__style = document.createElement("style"), this.__style.innerText = y.join().replace(/\n/g, ""), Us(this.$el).prepend(this.__style));
        };
        if (m((d = this.$) == null ? void 0 : d.type.styles), this.$options.components)
          for (const y of Object.values(this.$options.components))
            m(y.styles);
      },
      unmounted() {
        var m;
        l || (m = this.__style) == null || m.remove();
      }
    }), b.use(t);
    const T = i();
    if (Object.assign(T.appContext, b._context), Object.assign(T.provides, b._context.provides), process.env.NODE_ENV === "development" && window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
      const m = document.querySelector(c);
      b._container = m, b._instance = T;
      const d = {
        Comment: Symbol("v-cmt"),
        Fragment: Symbol("v-fgt"),
        Static: Symbol("v-stc"),
        Text: Symbol("v-txt")
      };
      window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit("app:init", b, b.version, d), window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = b;
    }
    const ee = S == null ? void 0 : S.reduce((m, d) => {
      const y = Ws(d);
      return m[y] = (f) => {
        T.emit(d, f);
      }, m;
    }, {}), C = (I = e == null ? void 0 : e.namedSlots) == null ? void 0 : I.reduce((m, d) => (m[d] = () => r("slot", { name: d }), m), {});
    return () => r(
      e,
      {
        ..._,
        ...ee
      },
      {
        default: () => r("slot"),
        ...C,
        ...O
      }
    );
  }
}, a && { shadowRoot: !1 }), Js = ({
  elementName: e,
  rootComponent: t,
  plugins: n,
  cssFrameworkStyles: s,
  VueDefineCustomElement: r,
  h: o,
  createApp: i,
  getCurrentInstance: c,
  disableRemoveStylesOnUnmount: l = !1,
  disableShadowDOM: a = !1
}) => {
  if (!t) {
    console.warn("No root component provided. Please provide a root component to create a web component.");
    return;
  }
  if (!e) {
    console.warn("No element name provided. Please provide an element name to create a web component.");
    return;
  }
  if (!r) {
    console.warn(
      "No VueDefineCustomElement provided. Please provide a VueDefineCustomElement to create a web component."
    );
    return;
  }
  if (!o) {
    console.warn("No h provided. Please provide an h to create a web component.");
    return;
  }
  if (!i) {
    console.warn("No createApp provided. Please provide a createApp to create a web component.");
    return;
  }
  if (!c) {
    console.warn("No getCurrentInstance provided. Please provide a getCurrentInstance to create a web component.");
    return;
  }
  const u = Bs({
    rootComponent: t,
    plugins: n,
    cssFrameworkStyles: s,
    VueDefineCustomElement: r,
    h: o,
    createApp: i,
    getCurrentInstance: c,
    elementName: e,
    disableRemoveStylesOnUnmount: l,
    disableShadowDOM: a
  });
  customElements.define(
    e,
    u
  );
};
export {
  Js as createWebComponent,
  Js as default
};
