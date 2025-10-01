// import { gsap } from "gsap";
// import {
//   Camera,
//   Mesh,
//   Plane,
//   Program,
//   Renderer,
//   Texture,
//   Transform,
// } from "ogl";
// import { useEffect, useRef } from "react";

// function debounce(func, wait) {
//   let timeout;
//   return function (...args) {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func.apply(this, args), wait);
//   };
// }

// function lerp(p1, p2, t) {
//   return p1 + (p2 - p1) * t;
// }

// function autoBind(instance) {
//   const proto = Object.getPrototypeOf(instance);
//   Object.getOwnPropertyNames(proto).forEach((key) => {
//     if (key !== "constructor" && typeof instance[key] === "function") {
//       instance[key] = instance[key].bind(instance);
//     }
//   });
// }

// function createTextTexture(
//   gl,
//   text,
//   font = "bold 30px monospace",
//   color = "black"
// ) {
//   const canvas = document.createElement("canvas");
//   const context = canvas.getContext("2d");
//   context.font = font;
//   const metrics = context.measureText(text);
//   const textWidth = Math.ceil(metrics.width);
//   const textHeight = Math.ceil(parseInt(font, 10) * 1.2);
//   canvas.width = textWidth + 20;
//   canvas.height = textHeight + 20;
//   context.font = font;
//   context.fillStyle = color;
//   context.textBaseline = "middle";
//   context.textAlign = "center";
//   context.clearRect(0, 0, canvas.width, canvas.height);
//   context.fillText(text, canvas.width / 2, canvas.height / 2);
//   const texture = new Texture(gl, { generateMipmaps: false });
//   texture.image = canvas;
//   return { texture, width: canvas.width, height: canvas.height };
// }

// class Title {
//   constructor({
//     gl,
//     plane,
//     renderer,
//     text,
//     textColor = "#545050",
//     font = "30px sans-serif",
//   }) {
//     autoBind(this);
//     this.gl = gl;
//     this.plane = plane;
//     this.renderer = renderer;
//     this.text = text;
//     this.textColor = textColor;
//     this.font = font;
//     this.createMesh();
//   }
//   createMesh() {
//     const { texture, width, height } = createTextTexture(
//       this.gl,
//       this.text,
//       this.font,
//       this.textColor
//     );
//     const geometry = new Plane(this.gl);
//     const program = new Program(this.gl, {
//       vertex: `
//         attribute vec3 position;
//         attribute vec2 uv;
//         uniform mat4 modelViewMatrix;
//         uniform mat4 projectionMatrix;
//         varying vec2 vUv;
//         void main() {
//           vUv = uv;
//           gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//         }
//       `,
//       fragment: `
//         precision highp float;
//         uniform sampler2D tMap;
//         varying vec2 vUv;
//         void main() {
//           vec4 color = texture2D(tMap, vUv);
//           if (color.a < 0.1) discard;
//           gl_FragColor = color;
//         }
//       `,
//       uniforms: { tMap: { value: texture } },
//       transparent: true,
//     });
//     this.mesh = new Mesh(this.gl, { geometry, program });
//     const aspect = width / height;
//     const textHeight = this.plane.scale.y * 0.15;
//     const textWidth = textHeight * aspect;
//     this.mesh.scale.set(textWidth, textHeight, 1);
//     this.mesh.position.y = -this.plane.scale.y * 0.5 - textHeight * 0.5 - 0.05;
//     this.mesh.setParent(this.plane);
//   }
// }

// class Media {
//   constructor({
//     geometry,
//     gl,
//     image,
//     index,
//     length,
//     renderer,
//     scene,
//     screen,
//     text,
//     viewport,
//     bend,
//     textColor,
//     borderRadius = 0,
//     font,
//   }) {
//     this.extra = 0;
//     this.geometry = geometry;
//     this.gl = gl;
//     this.image = image;
//     this.index = index;
//     this.length = length;
//     this.renderer = renderer;
//     this.scene = scene;
//     this.screen = screen;
//     this.text = text;
//     this.viewport = viewport;
//     this.bend = bend;
//     this.textColor = textColor;
//     this.borderRadius = borderRadius;
//     this.font = font;
//     this.createShader();
//     this.createMesh();
//     this.createTitle();
//     this.onResize();
//   }
//   createShader() {
//     const texture = new Texture(this.gl, {
//       generateMipmaps: true,
//     });
//     this.program = new Program(this.gl, {
//       depthTest: false,
//       depthWrite: false,
//       vertex: `
//         precision highp float;
//         attribute vec3 position;
//         attribute vec2 uv;
//         uniform mat4 modelViewMatrix;
//         uniform mat4 projectionMatrix;
//         uniform float uTime;
//         uniform float uSpeed;
//         varying vec2 vUv;
//         void main() {
//           vUv = uv;
//           vec3 p = position;
//           p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
//           gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
//         }
//       `,
//       fragment: `
//         precision highp float;
//         uniform vec2 uImageSizes;
//         uniform vec2 uPlaneSizes;
//         uniform sampler2D tMap;
//         uniform float uBorderRadius;
//         varying vec2 vUv;

//         float roundedBoxSDF(vec2 p, vec2 b, float r) {
//           vec2 d = abs(p) - b;
//           return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
//         }

//         void main() {
//           vec2 ratio = vec2(
//             min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
//             min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
//           );
//           vec2 uv = vec2(
//             vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
//             vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
//           );
//           vec4 color = texture2D(tMap, uv);

//           float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);

//           // Smooth antialiasing for edges
//           float edgeSmooth = 0.002;
//           float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);

//           gl_FragColor = vec4(color.rgb, alpha);
//         }
//       `,
//       uniforms: {
//         tMap: { value: texture },
//         uPlaneSizes: { value: [0, 0] },
//         uImageSizes: { value: [0, 0] },
//         uSpeed: { value: 0 },
//         uTime: { value: 100 * Math.random() },
//         uBorderRadius: { value: this.borderRadius },
//       },
//       transparent: true,
//     });
//     const img = new Image();
//     img.crossOrigin = "anonymous";
//     img.src = this.image;
//     img.onload = () => {
//       texture.image = img;
//       this.program.uniforms.uImageSizes.value = [
//         img.naturalWidth,
//         img.naturalHeight,
//       ];
//     };
//   }
//   createMesh() {
//     this.plane = new Mesh(this.gl, {
//       geometry: this.geometry,
//       program: this.program,
//     });
//     this.plane.setParent(this.scene);
//   }
//   createTitle() {
//     this.title = new Title({
//       gl: this.gl,
//       plane: this.plane,
//       renderer: this.renderer,
//       text: this.text,
//       textColor: this.textColor,
//       fontFamily: this.font,
//     });
//   }
//   update(scroll, direction) {
//     this.plane.position.x = this.x - scroll.current - this.extra;

//     const x = this.plane.position.x;
//     const H = this.viewport.width / 2;

//     if (this.bend === 0) {
//       this.plane.position.y = 0;
//       this.plane.rotation.z = 0;
//     } else {
//       const B_abs = Math.abs(this.bend);
//       const R = (H * H + B_abs * B_abs) / (2 * B_abs);
//       const effectiveX = Math.min(Math.abs(x), H);

//       const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
//       if (this.bend > 0) {
//         this.plane.position.y = -arc;
//         this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
//       } else {
//         this.plane.position.y = arc;
//         this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
//       }
//     }

//     this.speed = scroll.current - scroll.last;
//     this.program.uniforms.uTime.value += 0.04;
//     this.program.uniforms.uSpeed.value = this.speed;

//     const planeOffset = this.plane.scale.x / 2;
//     const viewportOffset = this.viewport.width / 2;
//     this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
//     this.isAfter = this.plane.position.x - planeOffset > viewportOffset;
//     if (direction === "right" && this.isBefore) {
//       this.extra -= this.widthTotal;
//       this.isBefore = this.isAfter = false;
//     }
//     if (direction === "left" && this.isAfter) {
//       this.extra += this.widthTotal;
//       this.isBefore = this.isAfter = false;
//     }
//   }
//   onResize({ screen, viewport } = {}) {
//     if (screen) this.screen = screen;
//     if (viewport) {
//       this.viewport = viewport;
//       if (this.plane.program.uniforms.uViewportSizes) {
//         this.plane.program.uniforms.uViewportSizes.value = [
//           this.viewport.width,
//           this.viewport.height,
//         ];
//       }
//     }
//     this.scale = this.screen.height / 1500;
//     this.plane.scale.y =
//       (this.viewport.height * (1300 * this.scale)) / this.screen.height;
//     this.plane.scale.x =
//       (this.viewport.width * (1300 * this.scale)) / this.screen.width;
//     this.plane.program.uniforms.uPlaneSizes.value = [
//       this.plane.scale.x,
//       this.plane.scale.y,
//     ];
//     this.padding = 6;
//     this.width = this.plane.scale.x + this.padding;
//     this.widthTotal = this.width * this.length;
//     this.x = this.width * this.index;
//   }
// }

// class App {
//   constructor(
//     container,
//     {
//       items,
//       bend,
//       textColor = "#ffffff",
//       borderRadius = 0,
//       font = "bold 30px Figtree",
//       scrollSpeed = 2,
//       scrollEase = 0.05,
//     } = {}
//   ) {
//     document.documentElement.classList.remove("no-js");
//     this.container = container;
//     this.scrollSpeed = scrollSpeed;
//     this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
//     this.onCheckDebounce = debounce(this.onCheck, 200);
//     this.createRenderer();
//     this.createCamera();
//     this.createScene();
//     this.onResize();
//     this.createGeometry();
//     this.createMedias(items, bend, textColor, borderRadius, font);
//     // this.createFullscreenPlane();   // added fullscreen mesh
//     // this.addMouseEvents();
//     this.update();
//     this.addEventListeners();
//   }
//   createRenderer() {
//     this.renderer = new Renderer({
//       alpha: true,
//       antialias: true,
//       dpr: Math.min(window.devicePixelRatio || 1, 2),
//     });
//     this.gl = this.renderer.gl;
//     this.gl.clearColor(0, 0, 0, 0);
//     this.container.appendChild(this.gl.canvas);
//   }
//   createCamera() {
//     this.camera = new Camera(this.gl);
//     this.camera.fov = 45;
//     this.camera.position.z = 20;
//   }
//   createScene() {
//     this.scene = new Transform();
//   }
//   createGeometry() {
//     this.planeGeometry = new Plane(this.gl, {
//       heightSegments: 50,
//       widthSegments: 100,
//     });
//   }
//   createMedias(items, bend = 1, textColor, borderRadius, font) {
//     const defaultItems = [
//       {
//         image: `https://picsum.photos/seed/1/800/600?grayscale`,
//         text: "Bridge",
//       },
//       {
//         image: `https://picsum.photos/seed/2/800/600?grayscale`,
//         text: "Desk Setup",
//       },
//       {
//         image: `https://picsum.photos/seed/3/800/600?grayscale`,
//         text: "Waterfall",
//       },
//       {
//         image: `https://picsum.photos/seed/4/800/600?grayscale`,
//         text: "Strawberries",
//       },
//       {
//         image: `https://picsum.photos/seed/5/800/600?grayscale`,
//         text: "Deep Diving",
//       },
//       {
//         image: `https://picsum.photos/seed/16/800/600?grayscale`,
//         text: "Train Track",
//       },
//       {
//         image: `https://picsum.photos/seed/17/800/600?grayscale`,
//         text: "Santorini",
//       },
//       {
//         image: `https://picsum.photos/seed/8/800/600?grayscale`,
//         text: "Blurry Lights",
//       },
//       {
//         image: `https://picsum.photos/seed/9/800/600?grayscale`,
//         text: "New York",
//       },
//       {
//         image: `https://picsum.photos/seed/10/800/600?grayscale`,
//         text: "Good Boy",
//       },
//       {
//         image: `https://picsum.photos/seed/21/800/600?grayscale`,
//         text: "Coastline",
//       },
//       {
//         image: `https://picsum.photos/seed/12/800/600?grayscale`,
//         text: "Palm Trees",
//       },

//     ];
//     const galleryItems = items && items.length ? items : defaultItems;
//     this.mediasImages = galleryItems.concat(galleryItems);
//     this.medias = this.mediasImages.map((data, index) => {
//       return new Media({
//         geometry: this.planeGeometry,
//         gl: this.gl,
//         image: data.image,
//         index,
//         length: this.mediasImages.length,
//         renderer: this.renderer,
//         scene: this.scene,
//         screen: this.screen,
//         text: data.text,
//         viewport: this.viewport,
//         bend,
//         textColor,
//         borderRadius,
//         font,
//       });
//     });
//   }

//   onTouchDown(e) {
//     this.isDown = true;
//     this.scroll.position = this.scroll.current;
//     this.start = e.touches ? e.touches[0].clientX : e.clientX;
//   }
//   onTouchMove(e) {
//     if (!this.isDown) return;
//     const x = e.touches ? e.touches[0].clientX : e.clientX;
//     const distance = (this.start - x) * (this.scrollSpeed * 0.025);
//     this.scroll.target = this.scroll.position + distance;
//   }
//   onTouchUp() {
//     this.isDown = false;
//     this.onCheck();
//   }
//   onWheel(e) {
//     const delta = e.deltaY || e.wheelDelta || e.detail;
//     this.scroll.target +=
//       (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;
//     this.onCheckDebounce();
//   }
//   onCheck() {
//     if (!this.medias || !this.medias[0]) return;
//     const width = this.medias[0].width;
//     const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
//     const item = width * itemIndex;
//     this.scroll.target = this.scroll.target < 0 ? -item : item;
//   }
//   onResize() {
//     this.screen = {
//       width: this.container.clientWidth,
//       height: this.container.clientHeight,
//     };
//     this.renderer.setSize(this.screen.width, this.screen.height);
//     this.camera.perspective({
//       aspect: this.screen.width / this.screen.height,
//     });
//     const fov = (this.camera.fov * Math.PI) / 180;
//     const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
//     const width = height * this.camera.aspect;
//     this.viewport = { width, height };
//     if (this.medias) {
//       this.medias.forEach((media) =>
//         media.onResize({ screen: this.screen, viewport: this.viewport })
//       );
//     }
//   }
//   update() {
//     this.scroll.current = lerp(
//       this.scroll.current,
//       this.scroll.target,
//       this.scroll.ease
//     );
//     const direction = this.scroll.current > this.scroll.last ? "right" : "left";
//     if (this.medias) {
//       this.medias.forEach((media) => media.update(this.scroll, direction));
//     }
//     this.renderer.render({ scene: this.scene, camera: this.camera });
//     this.scroll.last = this.scroll.current;
//     this.raf = window.requestAnimationFrame(this.update.bind(this));
//   }
//   addEventListeners() {
//     this.boundOnResize = this.onResize.bind(this);
//     this.boundOnWheel = this.onWheel.bind(this);
//     this.boundOnTouchDown = this.onTouchDown.bind(this);
//     this.boundOnTouchMove = this.onTouchMove.bind(this);
//     this.boundOnTouchUp = this.onTouchUp.bind(this);
//     window.addEventListener("resize", this.boundOnResize);
//     window.addEventListener("mousewheel", this.boundOnWheel);
//     window.addEventListener("wheel", this.boundOnWheel);
//     window.addEventListener("mousedown", this.boundOnTouchDown);
//     window.addEventListener("mousemove", this.boundOnTouchMove);
//     window.addEventListener("mouseup", this.boundOnTouchUp);
//     window.addEventListener("touchstart", this.boundOnTouchDown);
//     window.addEventListener("touchmove", this.boundOnTouchMove);
//     window.addEventListener("touchend", this.boundOnTouchUp);
//   }
//   destroy() {
//     window.cancelAnimationFrame(this.raf);
//     window.removeEventListener("resize", this.boundOnResize);
//     window.removeEventListener("mousewheel", this.boundOnWheel);
//     window.removeEventListener("wheel", this.boundOnWheel);
//     window.removeEventListener("mousedown", this.boundOnTouchDown);
//     window.removeEventListener("mousemove", this.boundOnTouchMove);
//     window.removeEventListener("mouseup", this.boundOnTouchUp);
//     window.removeEventListener("touchstart", this.boundOnTouchDown);
//     window.removeEventListener("touchmove", this.boundOnTouchMove);
//     window.removeEventListener("touchend", this.boundOnTouchUp);
//     if (
//       this.renderer &&
//       this.renderer.gl &&
//       this.renderer.gl.canvas.parentNode
//     ) {
//       this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);
//     }
//   }
// }

// export default function CircularGallery({
//   items,
//   bend = 3,
//   textColor = "#ffffff",
//   borderRadius = 0.05,
//   font = "bold 30px Figtree",
//   scrollSpeed = 2,
//   scrollEase = 0.05,
// }) {
//   const containerRef = useRef(null);
//   useEffect(() => {
//     const app = new App(containerRef.current, {
//       items,
//       bend,
//       textColor,
//       borderRadius,
//       font,
//       scrollSpeed,
//       scrollEase,
//     });
//     return () => {
//       app.destroy();
//     };
//   }, [items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase]);
//   return (
//     <div
//       className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
//       ref={containerRef}
//     />
//   );
// }

// // import { useEffect, useRef } from "react";
// // import { gsap } from "gsap";
// // import { ScrollTrigger } from "gsap/ScrollTrigger";
// // import "./CircularGallery.css";

// // gsap.registerPlugin(ScrollTrigger);

// // const images = [
// //   "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/1005.png",
// //   "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/1021.png",
// //   "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/1022.png",
// //   "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/1024.png",
// //   "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/1025.png",
// //   "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/006.png",
// //   "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/976.png",
// //   "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/078.png",
// //   "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/066.png",
// //   "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/043.png",
// //   "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/078.png",
// //   "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/765.png",
// //   "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/678.png",
// //   "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/667.png",
// //   "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/891.png",
// //   "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/221.png",
// //   "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/342.png",
// //   "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/421.png",
// //   "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/555.png",
// //   "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/613.png",
// //   "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/777.png",
// //   "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/169.png",
// //   "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/278.png",
// //   "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/388.png",
// //   "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/404.png",
// //   "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/504.png",
// //   "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/604.png",
// //   "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/674.png",
// // ];

// // export default function CircularGallery() {
// //   const sliderRef = useRef(null);

// //   useEffect(() => {
// //     const slider = sliderRef.current;
// //     const items = slider.querySelectorAll(".img");

// //     function sliderCircle() {
// //       let radius = slider.offsetWidth / 2;
// //       let center = slider.offsetWidth / 2;
// //       let total = items.length;
// //       let slice = (2 * Math.PI) / total;

// //       items.forEach((item, i) => {
// //         let radian = i * slice;
// //         let x = radius * Math.sin(radian) + center;
// //         let y = -radius * Math.cos(radian) + center;

// //         gsap.set(item, {
// //           rotation: radian + "rad",
// //           xPercent: -50,
// //           yPercent: -50,
// //           x: x,
// //           y: y,
// //         });
// //       });
// //     }

// //     sliderCircle();
// //     window.addEventListener("resize", sliderCircle);

// //     gsap.to(slider, {
// //       rotate: () => -360,
// //       ease: "none",
// //       duration: items.length,
// //       scrollTrigger: {
// //         start: 0,
// //         end: "max",
// //         scrub: 1,
// //       },
// //     });

// //     return () => window.removeEventListener("resize", sliderCircle);
// //   }, []);

// //   return (
// //     <div className="container">
// //       <div className="slider" ref={sliderRef}>
// //         {images.map((src, index) => (
// //           <div className="img" key={index}>
// //             <img src={src} alt={`pokemon-${index}`} />
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// import { useLayoutEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import "./CircularGallery.css"; // Make sure this CSS file is imported

// gsap.registerPlugin(ScrollTrigger);

// const images = [
//   "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bbac017f6a400b614_Stylized%20Graffiti-Inspired%20Robot.webp",
//   "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bdd829a2fb5a6dc35_Fashion%20Portrait%20with%20Vibrant%20Hat.webp",
//   "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66a24a7a04635323b86_Cheerful%20Young%20Woman%20with%20Colorful%20Attire.webp",
//   "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bbac017f6a400b614_Stylized%20Graffiti-Inspired%20Robot.webp",
//   "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bdd829a2fb5a6dc35_Fashion%20Portrait%20with%20Vibrant%20Hat.webp",
//   "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66a24a7a04635323b86_Cheerful%20Young%20Woman%20with%20Colorful%20Attire.webp",
//   "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bbac017f6a400b614_Stylized%20Graffiti-Inspired%20Robot.webp",
//   "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bdd829a2fb5a6dc35_Fashion%20Portrait%20with%20Vibrant%20Hat.webp",
//   "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66a24a7a04635323b86_Cheerful%20Young%20Woman%20with%20Colorful%20Attire.webp",
//   "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bbac017f6a400b614_Stylized%20Graffiti-Inspired%20Robot.webp",
//   "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bdd829a2fb5a6dc35_Fashion%20Portrait%20with%20Vibrant%20Hat.webp",
//   "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66a24a7a04635323b86_Cheerful%20Young%20Woman%20with%20Colorful%20Attire.webp",
//   "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bbac017f6a400b614_Stylized%20Graffiti-Inspired%20Robot.webp",
//   "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bdd829a2fb5a6dc35_Fashion%20Portrait%20with%20Vibrant%20Hat.webp",
//   "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66a24a7a04635323b86_Cheerful%20Young%20Woman%20with%20Colorful%20Attire.webp",
//   "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bbac017f6a400b614_Stylized%20Graffiti-Inspired%20Robot.webp",
//   "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bdd829a2fb5a6dc35_Fashion%20Portrait%20with%20Vibrant%20Hat.webp",
//   "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66a24a7a04635323b86_Cheerful%20Young%20Woman%20with%20Colorful%20Attire.webp",

// ];

// const CircularGallery = () => {
//   const containerRef = useRef(null);

//   useLayoutEffect(() => {
//     let ctx = gsap.context(() => {
//       const slider = containerRef.current.querySelector(".slider");
//       const items = gsap.utils.toArray(".img");

//       if (!slider || items.length === 0) return;

//       const total = items.length;
//       const radius = slider.offsetWidth / 2;
//       const center = slider.offsetWidth / 2;
//       const totalArc = Math.PI / 0.5;
//       const slice = totalArc / (total - 1);

//       // Initial positioning of the images in an arc
//       items.forEach((item, i) => {
//         const radian = (slice * i) - (totalArc / 2);
//         const x = radius * Math.sin(radian) + center;
//         const y = -radius * Math.cos(radian) + center;

//         gsap.set(item, {
//           rotation: `${radian}rad`,
//           xPercent: -50,
//           yPercent: -50,
//           x: x,
//           y: y,
//         });
//       });

//       // --- NEW ANIMATION LOGIC ---

//       // 1. Define how much rotation each image should "cost"
//       const rotationPerImage = totalArc / (total - 1) * (180 / Math.PI); // Convert radians to degrees
//       const totalRotation = (total - 1) * rotationPerImage;

//       // 2. Define how many pixels of scrolling it takes to rotate through the gallery
//       const scrollDistance = total * 150; // 150px of scroll per image

//       // 3. Create the ScrollTrigger animation
//       gsap.to(slider, {
//         rotate: -totalRotation, // The total amount it will rotate
//         ease: "none",
//         scrollTrigger: {
//           trigger: document.body,
//           start: "top top",
//           // The animation will end after you scroll the calculated distance
//           end: `+=${scrollDistance}`,
//           scrub: 1, // Smoothly ties the rotation to the scrollbar
//         },
//       });

//     }, containerRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <div className="circular-container" ref={containerRef}>
//       <div className="slider">
//         {images.map((src, i) => (
//           <div className="img" key={i}>
//             <img src={src} alt={`pokemon-${i}`} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CircularGallery;

import { useLayoutEffect, useRef, useState } from "react"; // 1. Import useState
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./CircularGallery.css";

gsap.registerPlugin(ScrollTrigger);

const images = [
  "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bbac017f6a400b614_Stylized%20Graffiti-Inspired%20Robot.webp",
  "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bdd829a2fb5a6dc35_Fashion%20Portrait%20with%20Vibrant%20Hat.webp",
  "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66a24a7a04635323b86_Cheerful%20Young%20Woman%20with%20Colorful%20Attire.webp",
  "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bbac017f6a400b614_Stylized%20Graffiti-Inspired%20Robot.webp",
  "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bdd829a2fb5a6dc35_Fashion%20Portrait%20with%20Vibrant%20Hat.webp",
  "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66a24a7a04635323b86_Cheerful%20Young%20Woman%20with%20Colorful%20Attire.webp",
  "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bbac017f6a400b614_Stylized%20Graffiti-Inspired%20Robot.webp",
  "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bdd829a2fb5a6dc35_Fashion%20Portrait%20with%20Vibrant%20Hat.webp",
  "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66a24a7a04635323b86_Cheerful%20Young%20Woman%20with%20Colorful%20Attire.webp",
  "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bbac017f6a400b614_Stylized%20Graffiti-Inspired%20Robot.webp",
  "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bdd829a2fb5a6dc35_Fashion%20Portrait%20with%20Vibrant%20Hat.webp",
  "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66a24a7a04635323b86_Cheerful%20Young%20Woman%20with%20Colorful%20Attire.webp",
  "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bbac017f6a400b614_Stylized%20Graffiti-Inspired%20Robot.webp",
  "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bdd829a2fb5a6dc35_Fashion%20Portrait%20with%20Vibrant%20Hat.webp",
  "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66a24a7a04635323b86_Cheerful%20Young%20Woman%20with%20Colorful%20Attire.webp",
  "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bbac017f6a400b614_Stylized%20Graffiti-Inspired%20Robot.webp",
  "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bdd829a2fb5a6dc35_Fashion%20Portrait%20with%20Vibrant%20Hat.webp",
  "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66a24a7a04635323b86_Cheerful%20Young%20Woman%20with%20Colorful%20Attire.webp",
];

const CircularGallery = () => {
  const containerRef = useRef(null);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  useLayoutEffect(() => {
    // Your GSAP logic remains the same
    let ctx = gsap.context(() => {
      const slider = containerRef.current.querySelector(".slider");
      const items = gsap.utils.toArray(".img");

      if (!slider || items.length === 0) return;

      const total = items.length;
      const radius = slider.offsetWidth / 2;
      const center = slider.offsetWidth / 2;
      const totalArc = Math.PI / 0.5;
      const slice = totalArc / (total - 1);

      items.forEach((item, i) => {
        const radian = slice * i - totalArc / 2;
        const x = radius * Math.sin(radian) + center;
        const y = -radius * Math.cos(radian) + center;

        gsap.set(item, {
          rotation: `${radian}rad`,
          xPercent: -50,
          yPercent: -50,
          x: x,
          y: y,
        });
      });

      const rotationPerImage = ((totalArc / (total - 1)) * 180) / Math.PI;
      const totalRotation = (total - 1) * rotationPerImage;
      const scrollDistance = total * 150;

      gsap.to(slider, {
        rotate: -totalRotation,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: `+=${scrollDistance}`,
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="circular-container" ref={containerRef}>
        <div className="slider">
          {images.map((src, i) => (
            <div
              className="img"
              key={i}
              onMouseEnter={() => setFullscreenImage(src)}
              onMouseLeave={() => setFullscreenImage(null)}
            >
              <img src={src} alt={`Gallery image ${i + 1}`} />
            </div>
          ))}
        </div>
      </div>

      <div
        // Renamed the class for clarity
        className="hover-background-viewer"
        style={{
          opacity: fullscreenImage ? 1 : 0,
        }}
      >
        {fullscreenImage && (
          <img src={fullscreenImage} alt="Fullscreen background" />
        )}
      </div>
    </>
  );
};

export default CircularGallery;
