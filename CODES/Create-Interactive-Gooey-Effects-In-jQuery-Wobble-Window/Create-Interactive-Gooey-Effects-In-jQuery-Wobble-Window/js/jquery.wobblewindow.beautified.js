/*
Wobble window jQuery plugin
Version: 1.0.2

Written by Niklas Knaack

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
!function() {
    function a(a, b) {
        function h() {
            c = document.createElement("canvas"), c.style.position = "absolute", c.style.zIndex = f.depth.toString(), 
            c.addEventListener("mousemove", o), c.addEventListener("mouseleave", p), a.parentElement.appendChild(c), 
            a.style.zIndex = (f.depth + 1).toString(), d = c.getContext("2d"), i(), k();
        }
        function i() {
            f.elementWidth = a.offsetWidth, f.elementHeight = a.offsetHeight, f.elementRect = a.getBoundingClientRect(), 
            f.elementParentRect = a.parentElement.getBoundingClientRect();
            var b = f.elementWidth + 2 * f.offsetX, d = f.elementHeight + 2 * f.offsetY, e = b / (f.numberOfXPoints - 1), g = d / (f.numberOfYPoints + 1), h = Math.ceil(Math.max(e, g));
            c.width = f.elementWidth + 2 * h, c.height = f.elementHeight + 2 * h, c.style.left = f.elementRect.left - f.elementParentRect.left - h + "px", 
            c.style.top = f.elementRect.top - f.elementParentRect.top - h + "px", f.canvasWidth = c.width, 
            f.canvasHeight = c.height, f.pointHolder = [];
            var l, m, n, o, i = (f.canvasWidth - b) / 2, k = (f.canvasHeight - d) / 2;
            for (m = !0, n = 0, o = f.numberOfXPoints; n < o; n++) f.movementTop ? (m ? (l = j(i + n * e, k, 0, 0, 0, !0, e, "P", f.debug), 
            m = !1) : (l = j(i + n * e, k, 0, 0, 0, !0, e, "C", f.debug), m = !0), 0 !== n && n !== o - 1 || (l.color = "#00FF00", 
            l.movement = !1), f.pointHolder.push(l)) : (0 !== n && n !== o - 1 || (l = j(i + n * e, k, 0, 0, 0, !1, 0, "P", f.debug)), 
            f.pointHolder.push(l));
            for (m = !1, n = 1, o = f.numberOfYPoints + 1; n < o; n++) f.movementRight ? (m ? (l = j(i + b, k + n * g, 0, 0, 0, !0, g, "P", f.debug), 
            m = !1) : (l = j(i + b, k + n * g, 0, 0, 0, !0, g, "C", f.debug), m = !0), f.pointHolder.push(l)) : (1 === n ? l = j(i + b, k + (n - 1) * g, 0, 0, 0, !1, 0, "P", f.debug) : n === f.numberOfYPoints && (l = j(i + b, k + (n + 1) * g, 0, 0, 0, !1, 0, "P", f.debug)), 
            f.pointHolder.push(l));
            for (m = !0, n = f.numberOfXPoints - 1, o = -1; n > o; n--) f.movementBottom ? (m ? (l = j(i + n * e, k + d, 0, 0, 0, !0, e, "P", f.debug), 
            m = !1) : (l = j(i + n * e, k + d, 0, 0, 0, !0, e, "C", f.debug), m = !0), 0 !== n && n !== f.numberOfXPoints - 1 || (l.color = "#00FF00", 
            l.movement = !1), f.pointHolder.push(l)) : (console.log(n, o, f.numberOfXPoints), 
            0 !== n && n !== f.numberOfXPoints - 1 || (l = j(i + n * e, k + d, 0, 0, 0, !1, 0, "P", f.debug)), 
            f.pointHolder.push(l));
            for (m = !1, n = f.numberOfYPoints, o = -1; n > o; n--) f.movementLeft ? (m ? (l = j(i, k + n * g, 0, 0, 0, !0, g, "P", f.debug), 
            m = !1) : (l = j(i, k + n * g, 0, 0, 0, !0, g, "C", f.debug), m = !0), f.pointHolder.push(l)) : (0 === n ? l = j(i, k + n * g, 0, 0, 0, !1, 0, "P", f.debug) : n === f.numberOfYPoints && (l = j(i, k + (n + 1) * g, 0, 0, 0, !1, 0, "P", f.debug)), 
            f.pointHolder.push(l));
        }
        function j(a, b, c, d, e, f, g, h, i) {
            var j = {};
            return j.x = a, j.y = b, j.xp = a, j.yp = b, j.sx = 0, j.sy = 0, j.distance = e, 
            j.movement = f, j.radius = g, j.type = h, j.visible = i, j;
        }
        function k() {
            requestAnimFrame(k), l(), f.autoResize && m();
        }
        function l() {
            d.clearRect(0, 0, f.canvasWidth, f.canvasHeight);
            var b, c, a = f.pointHolder;
            for (d.beginPath(), d.moveTo(a[0].x, a[0].y), b = 1, c = a.length; b < c; b += 2) {
                var g = a[b], h = e.x - g.xp, i = e.y - g.yp;
                g.distance = Math.sqrt(h * h + i * i), g.distance < g.radius ? "wobble" === f.moveTypeIn ? (g.sx = g.sx * f.wobbleFactor + (e.x - g.x) * f.wobbleSpeed, 
                g.sy = g.sy * f.wobbleFactor + (e.y - g.y) * f.wobbleSpeed, g.x = g.x + g.sx, g.y = g.y + g.sy) : "move" === f.moveTypeIn && (g.x -= (g.x - e.x) / f.moveSpeed, 
                g.y -= (g.y - e.y) / f.moveSpeed) : "wobble" === f.moveTypeOut ? (g.sx = g.sx * f.wobbleFactor + (g.xp - g.x) * f.wobbleSpeed, 
                g.sy = g.sy * f.wobbleFactor + (g.yp - g.y) * f.wobbleSpeed, g.x = g.x + g.sx, g.y = g.y + g.sy) : "move" === f.moveTypeOut && (g.x -= (g.x - g.xp) / f.moveSpeed, 
                g.y -= (g.y - g.yp) / f.moveSpeed);
                var j = a[b - 1], k = a[b + 1];
                b > 2 && b < a.length - 2 && (j.movement && (j.x = (a[b - 2].x + g.x) / 2, j.y = (a[b - 2].y + g.y) / 2), 
                k.movement && (k.x = (a[b + 2].x + g.x) / 2, k.y = (a[b + 2].y + g.y) / 2)), d.quadraticCurveTo(g.x, g.y, k.x, k.y);
            }
            if (f.lineColor.length > 0 && (d.lineWidth = f.lineWidth, d.strokeStyle = f.lineColor, 
            d.stroke()), f.bodyColor.length > 0 && (d.fillStyle = f.bodyColor, d.fill()), f.debug) {
                for (b = 0, c = a.length; b < c; b++) {
                    var g = a[b];
                    g.visible && ("P" === g.type ? n(g.x, g.y, 3, "#FF0000") : n(g.x, g.y, 6, "#FF00FF"), 
                    g.color && n(g.x, g.y, 12, g.color));
                }
                d.strokeStyle = "#000000", d.strokeRect(0, 0, f.canvasWidth, f.canvasHeight);
            }
        }
        function m() {
            f.elementWidth === a.offsetWidth && f.elementHeight === a.offsetHeight && f.elementRect.left === a.getBoundingClientRect().left && f.elementRect.top === a.getBoundingClientRect().top || i();
        }
        function n(a, b, c, e) {
            d.beginPath(), d.arc(a, b, c, 0, 2 * Math.PI), d.strokeStyle = e, d.stroke();
        }
        function o(a) {
            e = q(c, a);
        }
        function p(a) {
            e.x = -1e4, e.y = -1e4;
        }
        function q(a, b) {
            var c = a.getBoundingClientRect();
            return {
                x: b.clientX - c.left,
                y: b.clientY - c.top
            };
        }
        var c, d, e = {
            x: 0,
            y: 0
        }, f = {};
        if (f.name = "window", f.depth = 1, f.offsetX = 0, f.offsetY = 0, f.moveTypeIn = "move", 
        f.moveTypeOut = "wobble", f.wobbleFactor = .9, f.wobbleSpeed = .1, f.moveSpeed = 6, 
        f.lineWidth = 1, f.lineColor = "", f.bodyColor = "#FFF", f.numberOfXPoints = 7, 
        f.numberOfYPoints = 5, f.movementLeft = !0, f.movementRight = !0, f.movementTop = !0, 
        f.movementBottom = !0, f.autoResize = !0, f.debug = !1, void 0 !== b) for (var g in b) b.hasOwnProperty(g) && f.hasOwnProperty(g) && (f[g] = b[g]);
        if (!a) throw Error("\nNo div element found");
        if (f.numberOfXPoints % 2 == 0) throw Error("\nParam numberOfXPoints must be an odd integer");
        if (f.numberOfYPoints % 2 == 0) throw Error("\nParam numberOfXPoints must be an odd integer");
        window.requestAnimFrame = function() {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(a) {
                window.setTimeout(a, 1e3 / 60);
            };
        }(), h();
    }
    window.WobbleWindow = a;
}(), "undefined" != typeof jQuery && function(a) {
    a.fn.wobbleWindow = function(b) {
        var c = arguments;
        return this.each(function() {
            if (a.data(this, "plugin_WobbleWindow")) {
                var d = a.data(this, "plugin_WobbleWindow");
                d[b] ? d[b].apply(this, Array.prototype.slice.call(c, 1)) : a.error("Method " + b + " does not exist on jQuery.wobbleWindow");
            } else a.data(this, "plugin_WobbleWindow", new WobbleWindow(this, b));
        });
    };
}(jQuery);