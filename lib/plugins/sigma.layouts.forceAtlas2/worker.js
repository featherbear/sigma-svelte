export default (function (undefined) {
  'use strict'
  function crush (a) {
    var b,
      c,
      d,
      e = [
        'x',
        'y',
        'dx',
        'dy',
        'old_dx',
        'old_dy',
        'mass',
        'convergence',
        'size',
        'fixed'
      ],
      f = ['source', 'target', 'weight'],
      g = [
        'node',
        'centerX',
        'centerY',
        'size',
        'nextSibling',
        'firstChild',
        'mass',
        'massCenterX',
        'massCenterY'
      ]
    for (c = 0, d = g.length; c < d; c++)
      (b = new RegExp("rp\\(([^,]*), '" + g[c] + "'\\)", 'g')),
        (a = a.replace(b, 0 === c ? '$1' : '$1 + ' + c))
    for (c = 0, d = e.length; c < d; c++)
      (b = new RegExp("np\\(([^,]*), '" + e[c] + "'\\)", 'g')),
        (a = a.replace(b, 0 === c ? '$1' : '$1 + ' + c))
    for (c = 0, d = f.length; c < d; c++)
      (b = new RegExp("ep\\(([^,]*), '" + f[c] + "'\\)", 'g')),
        (a = a.replace(b, 0 === c ? '$1' : '$1 + ' + c))
    return a
  }
  function getWorkerFn () {
    var a = crush ? crush(Worker.toString()) : Worker.toString()
    return ';(' + a + ').call(this);'
  }
  var _root = this,
    inWebWorker = !('document' in _root),
    Worker = function (a) {
      function b () {
        var a,
          b,
          c = {},
          d = arguments.length
        for (a = d - 1; a >= 0; a--)
          for (b in arguments[a]) c[b] = arguments[a][b]
        return c
      }
      function c (a) {
        var b
        for (b in a)
          ('hasOwnProperty' in a && !a.hasOwnProperty(b)) || delete a[b]
        return a
      }
      function d (a, b) {
        if (a % o.ppn !== 0) throw 'np: non correct (' + a + ').'
        if (a !== parseInt(a)) throw 'np: non int.'
        if (b in p) return a + p[b]
        throw 'ForceAtlas2.Worker - Inexistant node property given (' + b + ').'
      }
      function e (a, b) {
        if (a % o.ppe !== 0) throw 'ep: non correct (' + a + ').'
        if (a !== parseInt(a)) throw 'ep: non int.'
        if (b in q) return a + q[b]
        throw 'ForceAtlas2.Worker - Inexistant edge property given (' + b + ').'
      }
      function f (a, b) {
        if (a % o.ppr !== 0) throw 'rp: non correct (' + a + ').'
        if (a !== parseInt(a)) throw 'rp: non int.'
        if (b in r) return a + r[b]
        throw 'ForceAtlas2.Worker - Inexistant region property given (' +
          b +
          ').'
      }
      function g (a, b, c) {
        c = c || {}
        ;(k = a),
          (l = b),
          (o.nodesLength = k.length),
          (o.edgesLength = l.length),
          h(c)
      }
      function h (a) {
        o.settings = b(a, o.settings)
      }
      function i () {
        var a, b, c, g, h, i, j, n, p, q, r, s, t, u, v
        for (c = 0; c < o.nodesLength; c += o.ppn)
          (k[d(c, 'old_dx')] = k[d(c, 'dx')]),
            (k[d(c, 'old_dy')] = k[d(c, 'dy')]),
            (k[d(c, 'dx')] = 0),
            (k[d(c, 'dy')] = 0)
        if (o.settings.outboundAttractionDistribution) {
          for (p = 0, c = 0; c < o.nodesLength; c += o.ppn) p += k[d(c, 'mass')]
          p /= o.nodesLength
        }
        if (o.settings.barnesHutOptimize) {
          var w,
            x,
            y = 1 / 0,
            z = -(1 / 0),
            A = 1 / 0,
            B = -(1 / 0)
          for (m = [], c = 0; c < o.nodesLength; c += o.ppn)
            (y = Math.min(y, k[d(c, 'x')])),
              (z = Math.max(z, k[d(c, 'x')])),
              (A = Math.min(A, k[d(c, 'y')])),
              (B = Math.max(B, k[d(c, 'y')]))
          for (
            m[f(0, 'node')] = -1,
              m[f(0, 'centerX')] = (y + z) / 2,
              m[f(0, 'centerY')] = (A + B) / 2,
              m[f(0, 'size')] = Math.max(z - y, B - A),
              m[f(0, 'nextSibling')] = -1,
              m[f(0, 'firstChild')] = -1,
              m[f(0, 'mass')] = 0,
              m[f(0, 'massCenterX')] = 0,
              m[f(0, 'massCenterY')] = 0,
              a = 1,
              c = 0;
            c < o.nodesLength;
            c += o.ppn
          )
            for (b = 0; ; )
              if (m[f(b, 'firstChild')] >= 0)
                (w =
                  k[d(c, 'x')] < m[f(b, 'centerX')]
                    ? k[d(c, 'y')] < m[f(b, 'centerY')]
                      ? m[f(b, 'firstChild')]
                      : m[f(b, 'firstChild')] + o.ppr
                    : k[d(c, 'y')] < m[f(b, 'centerY')]
                    ? m[f(b, 'firstChild')] + 2 * o.ppr
                    : m[f(b, 'firstChild')] + 3 * o.ppr),
                  (m[f(b, 'massCenterX')] =
                    (m[f(b, 'massCenterX')] * m[f(b, 'mass')] +
                      k[d(c, 'x')] * k[d(c, 'mass')]) /
                    (m[f(b, 'mass')] + k[d(c, 'mass')])),
                  (m[f(b, 'massCenterY')] =
                    (m[f(b, 'massCenterY')] * m[f(b, 'mass')] +
                      k[d(c, 'y')] * k[d(c, 'mass')]) /
                    (m[f(b, 'mass')] + k[d(c, 'mass')])),
                  (m[f(b, 'mass')] += k[d(c, 'mass')]),
                  (b = w)
              else {
                if (m[f(b, 'node')] < 0) {
                  m[f(b, 'node')] = c
                  break
                }
                if (
                  ((m[f(b, 'firstChild')] = a * o.ppr),
                  (j = m[f(b, 'size')] / 2),
                  (n = m[f(b, 'firstChild')]),
                  (m[f(n, 'node')] = -1),
                  (m[f(n, 'centerX')] = m[f(b, 'centerX')] - j),
                  (m[f(n, 'centerY')] = m[f(b, 'centerY')] - j),
                  (m[f(n, 'size')] = j),
                  (m[f(n, 'nextSibling')] = n + o.ppr),
                  (m[f(n, 'firstChild')] = -1),
                  (m[f(n, 'mass')] = 0),
                  (m[f(n, 'massCenterX')] = 0),
                  (m[f(n, 'massCenterY')] = 0),
                  (n += o.ppr),
                  (m[f(n, 'node')] = -1),
                  (m[f(n, 'centerX')] = m[f(b, 'centerX')] - j),
                  (m[f(n, 'centerY')] = m[f(b, 'centerY')] + j),
                  (m[f(n, 'size')] = j),
                  (m[f(n, 'nextSibling')] = n + o.ppr),
                  (m[f(n, 'firstChild')] = -1),
                  (m[f(n, 'mass')] = 0),
                  (m[f(n, 'massCenterX')] = 0),
                  (m[f(n, 'massCenterY')] = 0),
                  (n += o.ppr),
                  (m[f(n, 'node')] = -1),
                  (m[f(n, 'centerX')] = m[f(b, 'centerX')] + j),
                  (m[f(n, 'centerY')] = m[f(b, 'centerY')] - j),
                  (m[f(n, 'size')] = j),
                  (m[f(n, 'nextSibling')] = n + o.ppr),
                  (m[f(n, 'firstChild')] = -1),
                  (m[f(n, 'mass')] = 0),
                  (m[f(n, 'massCenterX')] = 0),
                  (m[f(n, 'massCenterY')] = 0),
                  (n += o.ppr),
                  (m[f(n, 'node')] = -1),
                  (m[f(n, 'centerX')] = m[f(b, 'centerX')] + j),
                  (m[f(n, 'centerY')] = m[f(b, 'centerY')] + j),
                  (m[f(n, 'size')] = j),
                  (m[f(n, 'nextSibling')] = m[f(b, 'nextSibling')]),
                  (m[f(n, 'firstChild')] = -1),
                  (m[f(n, 'mass')] = 0),
                  (m[f(n, 'massCenterX')] = 0),
                  (m[f(n, 'massCenterY')] = 0),
                  (a += 4),
                  (w =
                    k[d(m[f(b, 'node')], 'x')] < m[f(b, 'centerX')]
                      ? k[d(m[f(b, 'node')], 'y')] < m[f(b, 'centerY')]
                        ? m[f(b, 'firstChild')]
                        : m[f(b, 'firstChild')] + o.ppr
                      : k[d(m[f(b, 'node')], 'y')] < m[f(b, 'centerY')]
                      ? m[f(b, 'firstChild')] + 2 * o.ppr
                      : m[f(b, 'firstChild')] + 3 * o.ppr),
                  (m[f(b, 'mass')] = k[d(m[f(b, 'node')], 'mass')]),
                  (m[f(b, 'massCenterX')] = k[d(m[f(b, 'node')], 'x')]),
                  (m[f(b, 'massCenterY')] = k[d(m[f(b, 'node')], 'y')]),
                  (m[f(w, 'node')] = m[f(b, 'node')]),
                  (m[f(b, 'node')] = -1),
                  (x =
                    k[d(c, 'x')] < m[f(b, 'centerX')]
                      ? k[d(c, 'y')] < m[f(b, 'centerY')]
                        ? m[f(b, 'firstChild')]
                        : m[f(b, 'firstChild')] + o.ppr
                      : k[d(c, 'y')] < m[f(b, 'centerY')]
                      ? m[f(b, 'firstChild')] + 2 * o.ppr
                      : m[f(b, 'firstChild')] + 3 * o.ppr),
                  w !== x)
                ) {
                  m[f(x, 'node')] = c
                  break
                }
                b = w
              }
        }
        if (o.settings.barnesHutOptimize)
          for (
            q = o.settings.scalingRatio, c = 0;
            c < o.nodesLength;
            c += o.ppn
          )
            for (b = 0; ; )
              if (m[f(b, 'firstChild')] >= 0) {
                if (
                  ((u = Math.sqrt(
                    Math.pow(k[d(c, 'x')] - m[f(b, 'massCenterX')], 2) +
                      Math.pow(k[d(c, 'y')] - m[f(b, 'massCenterY')], 2)
                  )),
                  (2 * m[f(b, 'size')]) / u < o.settings.barnesHutTheta)
                ) {
                  if (
                    ((r = k[d(c, 'x')] - m[f(b, 'massCenterX')]),
                    (s = k[d(c, 'y')] - m[f(b, 'massCenterY')]),
                    o.settings.adjustSizes
                      ? u > 0
                        ? ((v =
                            (q * k[d(c, 'mass')] * m[f(b, 'mass')]) / u / u),
                          (k[d(c, 'dx')] += r * v),
                          (k[d(c, 'dy')] += s * v))
                        : u < 0 &&
                          ((v = (-q * k[d(c, 'mass')] * m[f(b, 'mass')]) / u),
                          (k[d(c, 'dx')] += r * v),
                          (k[d(c, 'dy')] += s * v))
                      : u > 0 &&
                        ((v = (q * k[d(c, 'mass')] * m[f(b, 'mass')]) / u / u),
                        (k[d(c, 'dx')] += r * v),
                        (k[d(c, 'dy')] += s * v)),
                    m[f(b, 'nextSibling')] < 0)
                  )
                    break
                  b = m[f(b, 'nextSibling')]
                  continue
                }
                b = m[f(b, 'firstChild')]
              } else {
                if (
                  (m[f(b, 'node')] >= 0 &&
                    m[f(b, 'node')] !== c &&
                    ((r = k[d(c, 'x')] - k[d(m[f(b, 'node')], 'x')]),
                    (s = k[d(c, 'y')] - k[d(m[f(b, 'node')], 'y')]),
                    (u = Math.sqrt(r * r + s * s)),
                    o.settings.adjustSizes
                      ? u > 0
                        ? ((v =
                            (q *
                              k[d(c, 'mass')] *
                              k[d(m[f(b, 'node')], 'mass')]) /
                            u /
                            u),
                          (k[d(c, 'dx')] += r * v),
                          (k[d(c, 'dy')] += s * v))
                        : u < 0 &&
                          ((v =
                            (-q *
                              k[d(c, 'mass')] *
                              k[d(m[f(b, 'node')], 'mass')]) /
                            u),
                          (k[d(c, 'dx')] += r * v),
                          (k[d(c, 'dy')] += s * v))
                      : u > 0 &&
                        ((v =
                          (q *
                            k[d(c, 'mass')] *
                            k[d(m[f(b, 'node')], 'mass')]) /
                          u /
                          u),
                        (k[d(c, 'dx')] += r * v),
                        (k[d(c, 'dy')] += s * v))),
                  m[f(b, 'nextSibling')] < 0)
                )
                  break
                b = m[f(b, 'nextSibling')]
              }
        else
          for (
            q = o.settings.scalingRatio, g = 0;
            g < o.nodesLength;
            g += o.ppn
          )
            for (h = 0; h < g; h += o.ppn)
              (r = k[d(g, 'x')] - k[d(h, 'x')]),
                (s = k[d(g, 'y')] - k[d(h, 'y')]),
                o.settings.adjustSizes
                  ? ((u =
                      Math.sqrt(r * r + s * s) -
                      k[d(g, 'size')] -
                      k[d(h, 'size')]),
                    u > 0
                      ? ((v = (q * k[d(g, 'mass')] * k[d(h, 'mass')]) / u / u),
                        (k[d(g, 'dx')] += r * v),
                        (k[d(g, 'dy')] += s * v),
                        (k[d(h, 'dx')] += r * v),
                        (k[d(h, 'dy')] += s * v))
                      : u < 0 &&
                        ((v = 100 * q * k[d(g, 'mass')] * k[d(h, 'mass')]),
                        (k[d(g, 'dx')] += r * v),
                        (k[d(g, 'dy')] += s * v),
                        (k[d(h, 'dx')] -= r * v),
                        (k[d(h, 'dy')] -= s * v)))
                  : ((u = Math.sqrt(r * r + s * s)),
                    u > 0 &&
                      ((v = (q * k[d(g, 'mass')] * k[d(h, 'mass')]) / u / u),
                      (k[d(g, 'dx')] += r * v),
                      (k[d(g, 'dy')] += s * v),
                      (k[d(h, 'dx')] -= r * v),
                      (k[d(h, 'dy')] -= s * v)))
        for (
          n = o.settings.gravity / o.settings.scalingRatio,
            q = o.settings.scalingRatio,
            c = 0;
          c < o.nodesLength;
          c += o.ppn
        )
          (v = 0),
            (r = k[d(c, 'x')]),
            (s = k[d(c, 'y')]),
            (u = Math.sqrt(Math.pow(r, 2) + Math.pow(s, 2))),
            o.settings.strongGravityMode
              ? u > 0 && (v = q * k[d(c, 'mass')] * n)
              : u > 0 && (v = (q * k[d(c, 'mass')] * n) / u),
            (k[d(c, 'dx')] -= r * v),
            (k[d(c, 'dy')] -= s * v)
        for (
          q = 1 * (o.settings.outboundAttractionDistribution ? p : 1), i = 0;
          i < o.edgesLength;
          i += o.ppe
        )
          (g = l[e(i, 'source')]),
            (h = l[e(i, 'target')]),
            (j = l[e(i, 'weight')]),
            (t = Math.pow(j, o.settings.edgeWeightInfluence)),
            (r = k[d(g, 'x')] - k[d(h, 'x')]),
            (s = k[d(g, 'y')] - k[d(h, 'y')]),
            o.settings.adjustSizes
              ? ((u = Math.sqrt(
                  Math.pow(r, 2) +
                    Math.pow(s, 2) -
                    k[d(g, 'size')] -
                    k[d(h, 'size')]
                )),
                o.settings.linLogMode
                  ? o.settings.outboundAttractionDistribution
                    ? u > 0 &&
                      (v = (-q * t * Math.log(1 + u)) / u / k[d(g, 'mass')])
                    : u > 0 && (v = (-q * t * Math.log(1 + u)) / u)
                  : o.settings.outboundAttractionDistribution
                  ? u > 0 && (v = (-q * t) / k[d(g, 'mass')])
                  : u > 0 && (v = -q * t))
              : ((u = Math.sqrt(Math.pow(r, 2) + Math.pow(s, 2))),
                o.settings.linLogMode
                  ? o.settings.outboundAttractionDistribution
                    ? u > 0 &&
                      (v = (-q * t * Math.log(1 + u)) / u / k[d(g, 'mass')])
                    : u > 0 && (v = (-q * t * Math.log(1 + u)) / u)
                  : o.settings.outboundAttractionDistribution
                  ? ((u = 1), (v = (-q * t) / k[d(g, 'mass')]))
                  : ((u = 1), (v = -q * t))),
            u > 0 &&
              ((k[d(g, 'dx')] += r * v),
              (k[d(g, 'dy')] += s * v),
              (k[d(h, 'dx')] -= r * v),
              (k[d(h, 'dy')] -= s * v))
        var C, D, E, F
        if (o.settings.adjustSizes)
          for (c = 0; c < o.nodesLength; c += o.ppn)
            k[d(c, 'fixed')] ||
              ((C = Math.sqrt(
                Math.pow(k[d(c, 'dx')], 2) + Math.pow(k[d(c, 'dy')], 2)
              )),
              C > o.maxForce &&
                ((k[d(c, 'dx')] = (k[d(c, 'dx')] * o.maxForce) / C),
                (k[d(c, 'dy')] = (k[d(c, 'dy')] * o.maxForce) / C)),
              (D =
                k[d(c, 'mass')] *
                Math.sqrt(
                  (k[d(c, 'old_dx')] - k[d(c, 'dx')]) *
                    (k[d(c, 'old_dx')] - k[d(c, 'dx')]) +
                    (k[d(c, 'old_dy')] - k[d(c, 'dy')]) *
                      (k[d(c, 'old_dy')] - k[d(c, 'dy')])
                )),
              (E =
                Math.sqrt(
                  (k[d(c, 'old_dx')] + k[d(c, 'dx')]) *
                    (k[d(c, 'old_dx')] + k[d(c, 'dx')]) +
                    (k[d(c, 'old_dy')] + k[d(c, 'dy')]) *
                      (k[d(c, 'old_dy')] + k[d(c, 'dy')])
                ) / 2),
              (F = (0.1 * Math.log(1 + E)) / (1 + Math.sqrt(D))),
              (k[d(c, 'x')] =
                k[d(c, 'x')] + k[d(c, 'dx')] * (F / o.settings.slowDown)),
              (k[d(c, 'y')] =
                k[d(c, 'y')] + k[d(c, 'dy')] * (F / o.settings.slowDown)))
        else
          for (c = 0; c < o.nodesLength; c += o.ppn)
            k[d(c, 'fixed')] ||
              ((D =
                k[d(c, 'mass')] *
                Math.sqrt(
                  (k[d(c, 'old_dx')] - k[d(c, 'dx')]) *
                    (k[d(c, 'old_dx')] - k[d(c, 'dx')]) +
                    (k[d(c, 'old_dy')] - k[d(c, 'dy')]) *
                      (k[d(c, 'old_dy')] - k[d(c, 'dy')])
                )),
              (E =
                Math.sqrt(
                  (k[d(c, 'old_dx')] + k[d(c, 'dx')]) *
                    (k[d(c, 'old_dx')] + k[d(c, 'dx')]) +
                    (k[d(c, 'old_dy')] + k[d(c, 'dy')]) *
                      (k[d(c, 'old_dy')] + k[d(c, 'dy')])
                ) / 2),
              (F =
                (k[d(c, 'convergence')] * Math.log(1 + E)) /
                (1 + Math.sqrt(D))),
              (k[d(c, 'convergence')] = Math.min(
                1,
                Math.sqrt(
                  (F *
                    (Math.pow(k[d(c, 'dx')], 2) + Math.pow(k[d(c, 'dy')], 2))) /
                    (1 + Math.sqrt(D))
                )
              )),
              (k[d(c, 'x')] =
                k[d(c, 'x')] + k[d(c, 'dx')] * (F / o.settings.slowDown)),
              (k[d(c, 'y')] =
                k[d(c, 'y')] + k[d(c, 'dy')] * (F / o.settings.slowDown)))
        o.iterations++
      }
      function j (a) {
        for (var b = 0; b < a; b++) i()
        n()
      }
      var k,
        l,
        m,
        n,
        o = {
          ppn: 10,
          ppe: 3,
          ppr: 9,
          maxForce: 10,
          iterations: 0,
          converged: !1,
          settings: {
            linLogMode: !1,
            outboundAttractionDistribution: !1,
            adjustSizes: !1,
            edgeWeightInfluence: 0,
            scalingRatio: 1,
            strongGravityMode: !1,
            gravity: 1,
            slowDown: 1,
            barnesHutOptimize: !1,
            barnesHutTheta: 0.5,
            startingIterations: 1,
            iterationsPerRender: 1
          }
        },
        p = {
          x: 0,
          y: 1,
          dx: 2,
          dy: 3,
          old_dx: 4,
          old_dy: 5,
          mass: 6,
          convergence: 7,
          size: 8,
          fixed: 9
        },
        q = { source: 0, target: 1, weight: 2 },
        r = {
          node: 0,
          centerX: 1,
          centerY: 2,
          size: 3,
          nextSibling: 4,
          firstChild: 5,
          mass: 6,
          massCenterX: 7,
          massCenterY: 8
        }
      n =
        'undefined' != typeof window && window.document
          ? function () {
              var a
              document.createEvent
                ? ((a = document.createEvent('Event')),
                  a.initEvent('newCoords', !0, !1))
                : ((a = document.createEventObject()),
                  (a.eventType = 'newCoords')),
                (a.eventName = 'newCoords'),
                (a.data = { nodes: k.buffer }),
                requestAnimationFrame(function () {
                  document.dispatchEvent(a)
                })
            }
          : function () {
              self.postMessage({ nodes: k.buffer }, [k.buffer])
            }
      var s = function (a) {
        switch (a.data.action) {
          case 'start':
            g(
              new Float32Array(a.data.nodes),
              new Float32Array(a.data.edges),
              a.data.config
            ),
              j(o.settings.startingIterations)
            break
          case 'loop':
            ;(k = new Float32Array(a.data.nodes)),
              j(o.settings.iterationsPerRender)
            break
          case 'config':
            h(a.data.config)
            break
          case 'kill':
            c(o),
              (k = null),
              (l = null),
              (m = null),
              self.removeEventListener('message', s)
        }
      }
      self.addEventListener('message', s)
    }
  if (inWebWorker) eval(getWorkerFn())
  else {
    if ('undefined' == typeof sigma) throw 'sigma is not declared'
    sigma.prototype.getForceAtlas2Worker = getWorkerFn
  }
})