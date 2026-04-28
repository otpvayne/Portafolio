"use client";

import React, { useRef, useEffect } from "react";

interface CelestialSphereProps {
  hue?: number;
  speed?: number;
  zoom?: number;
  particleSize?: number;
  className?: string;
}

export const CelestialSphere: React.FC<CelestialSphereProps> = ({
  hue = 249,
  speed = 0.3,
  zoom = 1.5,
  particleSize = 3.0,
  className = "",
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    let cancelled = false;
    const currentMount = mountRef.current;
    let animationFrameId: number;

    const init = async () => {
      const THREE = await import("three");
      if (cancelled || !currentMount) return;

      const mouse = { x: currentMount.clientWidth / 2, y: currentMount.clientHeight / 2 };

      const vertexShader = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `;

      const fragmentShader = `
        precision highp float;
        varying vec2 vUv;
        uniform vec2 u_resolution;
        uniform float u_time;
        uniform vec2 u_mouse;
        uniform float u_hue;
        uniform float u_zoom;
        uniform float u_particle_size;

        vec3 hsl2rgb(vec3 c) {
          vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0,0.0,1.0);
          return c.z * mix(vec3(1.0), rgb, c.y);
        }

        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }

        float noise(vec2 st) {
          vec2 i = floor(st); vec2 f = fract(st);
          float a = random(i);
          float b = random(i + vec2(1.0, 0.0));
          float c = random(i + vec2(0.0, 1.0));
          float d = random(i + vec2(1.0, 1.0));
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(a, b, u.x) + (c - a)*u.y*(1.0 - u.x) + (d - b)*u.y*u.x;
        }

        float fbm(vec2 st) {
          float value = 0.0; float amplitude = 0.5;
          for (int i = 0; i < 6; i++) {
            value += amplitude * noise(st);
            st *= 2.0; amplitude *= 0.5;
          }
          return value;
        }

        void main() {
          vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);
          uv *= u_zoom;
          vec2 mouse_n = u_mouse / u_resolution;
          uv += (mouse_n - 0.5) * 0.6;

          float f = fbm(uv + vec2(u_time * 0.1, u_time * 0.05));
          float t = fbm(uv + f + vec2(u_time * 0.05, u_time * 0.02));

          float nebula = pow(t, 2.0);
          vec3 color = hsl2rgb(vec3(u_hue / 360.0 + nebula * 0.15, 0.65, 0.45));
          color *= nebula * 2.2;

          float sv = random(vUv * 600.0);
          if (sv > 0.998) {
            color += vec3((sv - 0.998) / 0.002 * u_particle_size * 0.4);
          }

          gl_FragColor = vec4(color, 1.0);
        }
      `;

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      currentMount.appendChild(renderer.domElement);

      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          u_time: { value: 0.0 },
          u_resolution: { value: new THREE.Vector2() },
          u_mouse: { value: new THREE.Vector2() },
          u_hue: { value: hue },
          u_zoom: { value: zoom },
          u_particle_size: { value: particleSize },
        },
      });

      const geo = new THREE.PlaneGeometry(2, 2);
      scene.add(new THREE.Mesh(geo, material));

      const resize = () => {
        if (!currentMount) return;
        const w = currentMount.clientWidth;
        const h = currentMount.clientHeight;
        renderer.setSize(w, h);
        material.uniforms.u_resolution.value.set(w, h);
      };

      const onMouseMove = (e: MouseEvent) => {
        const rect = currentMount.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        material.uniforms.u_mouse.value.set(mouse.x, currentMount.clientHeight - mouse.y);
      };

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const s = prefersReduced ? 0 : speed;

      const animate = () => {
        if (cancelled) return;
        material.uniforms.u_time.value += 0.005 * s;
        renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(animate);
      };

      window.addEventListener("resize", resize);
      window.addEventListener("mousemove", onMouseMove);
      resize();
      animate();

      return () => {
        window.removeEventListener("resize", resize);
        window.removeEventListener("mousemove", onMouseMove);
        cancelAnimationFrame(animationFrameId);
        if (currentMount && renderer.domElement.parentNode === currentMount) {
          currentMount.removeChild(renderer.domElement);
        }
        geo.dispose();
        material.dispose();
        renderer.dispose();
      };
    };

    let cleanup: (() => void) | undefined;
    init().then((fn) => { cleanup = fn; });

    return () => {
      cancelled = true;
      cancelAnimationFrame(animationFrameId);
      if (cleanup) cleanup();
    };
  }, [hue, speed, zoom, particleSize]);

  return <div ref={mountRef} className={className || "w-full h-full"} />;
};

export default CelestialSphere;
