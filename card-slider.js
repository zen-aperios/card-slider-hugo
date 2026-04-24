(() => {
  const MAX_ATTEMPTS = 40;
  const RETRY_MS = 100;
  let started = false;

  function initCardSlider() {
    if (started) return true;
    if (!window.gsap || !window.Draggable) return false;

    let m = document.querySelector("#stack"),
      x = gsap.utils.toArray("#stack .card-stack-item");

    if (!m || x.length < 2) return false;

    started = true;

    let t = document.querySelector(".slider-button.right"),
      a = document.querySelector(".slider-button.left"),
      r = 90,
      l = 1.35 * r,
      p = 26,
      c = 0.16,
      g = gsap.utils.wrap(-r, r * (x.length - 1)),
      o = (e) => Math.round(e / r) * r,
      s = document.createElement("div"),
      d = 0,
      u = false,
      i = null,
      n = () => e(1),
      h = () => e(-1);

    function f() {
      var e = -r;
      let n = r * (x.length - 1) - e;
      x.forEach((e, t) => {
        let a = g(d + t * r);
        a > n / 2 && (a -= n);
        a < -n / 2 && (a += n);
        var t = a / l,
          o = Math.min(Math.abs(t), 1),
          s = Math.abs(a / r);
        let i = 1;
        u && 1 < s && (i = gsap.utils.clamp(0, 1, 2 - s));
        gsap.set(e, {
          x: a,
          rotation: t * p,
          opacity: i,
          scale: 1 - o * c,
          zIndex: 200 - Math.round(Math.abs(a)),
        });
      });
    }

    function e(e) {
      var e = o(d + e * r);
      gsap.set(s, { x: d });
      u = true;
      gsap.to(s, {
        x: e,
        duration: 0.6,
        ease: "elastic.out(1, 0.55)",
        onUpdate() {
          d = gsap.getProperty(s, "x");
          f();
        },
        onComplete() {
          u = false;
          f();
        },
      });
    }

    function w() {
      i && (i.kill(), (i = null));
    }

    function v() {
      t && t.removeEventListener("click", n);
      a && a.removeEventListener("click", h);
    }

    gsap
      .matchMedia()
      .add(
        { isMobile: "(max-width: 767px)", isDesktop: "(min-width: 768px)" },
        (e) => {
          if (!e.conditions.isMobile)
            return (
              gsap.set(m, { position: "relative" }),
              gsap.set(x, {
                position: "absolute",
                top: "50%",
                left: "50%",
                xPercent: -50,
                yPercent: -50,
                transformOrigin: "center center",
                force3D: true,
                willChange: "transform, opacity",
              }),
              gsap.set(x, { x: (e) => e * r }),
              t && t.addEventListener("click", n),
              a && a.addEventListener("click", h),
              w(),
              (i = Draggable.create(s, {
                type: "x",
                trigger: m,
                inertia: !!window.InertiaPlugin,
                dragResistance: 0.12,
                edgeResistance: 0.9,
                onPress() {
                  u = true;
                  gsap.set(s, { x: d });
                  this.update();
                  f();
                },
                onDrag() {
                  d = this.x;
                  f();
                },
                onThrowUpdate() {
                  d = this.x;
                  f();
                },
                onRelease() {
                  var e;
                  window.InertiaPlugin ||
                    ((e = o(this.x)),
                    gsap.to(s, {
                      x: e,
                      duration: 0.6,
                      ease: "elastic.out(1, 0.55)",
                      onUpdate() {
                        d = gsap.getProperty(s, "x");
                        f();
                      },
                      onComplete() {
                        u = false;
                        f();
                      },
                    }));
                },
                onThrowComplete() {
                  var e = o(this.x);
                  gsap.to(s, {
                    x: e,
                    duration: 0.6,
                    ease: "elastic.out(1, 0.55)",
                    onUpdate() {
                      d = gsap.getProperty(s, "x");
                      f();
                    },
                    onComplete() {
                      u = false;
                      f();
                    },
                  });
                },
              })[0]),
              gsap.set(s, { x: d }),
              f(),
              () => {
                v();
                w();
                gsap.killTweensOf(s);
              }
            );

          v();
          w();
          gsap.killTweensOf(s);
          u = false;
          d = 0;
          m.style.removeProperty("position");
          x.forEach((e) => e.removeAttribute("style"));
        }
      );

    return true;
  }

  function tryInit(attempt = 0) {
    if (initCardSlider()) return;

    if (attempt >= MAX_ATTEMPTS) {
      console.error("GSAP, Draggable, #stack, or cards were not ready in time.");
      return;
    }

    setTimeout(() => tryInit(attempt + 1), RETRY_MS);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => tryInit(), { once: true });
  } else {
    tryInit();
  }

  window.addEventListener(
    "load",
    () => {
      if (!started) tryInit();
    },
    { once: true }
  );
})();
