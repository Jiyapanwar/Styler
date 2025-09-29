// import React from "react";

// export default function Footer() {
//   return (
//     <div className="bg-white min-h-screen">
//       <div className="bg-[#191919] text-white rounded-3xl p-25  mt-20">
//         {/* Top Section */}
//         <div className="grid md:grid-cols-5 gap-8">
//           {/* Column 1 */}
//           <div className="col-span-2 pr-10">
//             <h2 className="text-2xl font-inter mb-2">Styler.</h2>
//             <p className="text-[#AAAAAA] text-md leading-relaxed">
//               A dynamic agency dedicated to bringing your ideas to life. Where
//               creativity meets purpose.
//             </p>
//           </div>

//           {/* Column 2 */}
//           <div>
//             <h2 className="text-sm font-semibold text-[#AAAAAA] mb-1">
//               Explore
//             </h2>
//             <ul className="space-y-1 text-md">
//               <li>
//                 <a href="#">Home</a>
//               </li>
//               <li>
//                 <a href="#">About</a>
//               </li>
//               <li>
//                 <a href="#">Works</a>
//               </li>
//               <li>
//                 <a href="#">Services</a>
//               </li>
//               <li>
//                 <a href="#">Blog</a>
//               </li>
//             </ul>
//           </div>

//           {/* Column 3 */}
//           <div>
//             <h2 className="text-sm font-semibold text-[#AAAAAA] mb-1">More</h2>
//             <ul className="space-y-1 text-md">
//               <li>
//                 <a href="#">Contact</a>
//               </li>
//               <li>
//                 <a href="#">Style Guide</a>
//               </li>
//               <li>
//                 <a href="#">Changelog</a>
//               </li>
//               <li>
//                 <a href="#">Licenses</a>
//               </li>
//               <li>
//                 <a href="#">Instructions</a>
//               </li>
//             </ul>
//           </div>

//           {/* Column 4 */}
//           <div>
//             <h2 className="text-sm font-semibold text-[#AAAAAA] mb-1">
//               Contacts
//             </h2>
//             <p className="text-[1rem] text-white pr-2">
//               XYZ Times Sq, New York, United States
//             </p>
//             <p className="text-md text-white mt-2">hello@styler.com</p>
//             <p className="text-md text-white">+1 023-456-789</p>
//           </div>
//         </div>

//         {/* Big Heading */}
//         <div className="text-center text-6xl md:text-8xl font-semibold font-inter mt-20">
//           <span className="inline-block mr-3">Design</span>
//           <span className="inline-block mr-3">is</span>
//           <span className="inline-block mr-3">Our</span>
//           <span className="inline-block">Passion.</span>
//         </div>

//         {/* Footer */}
//         <div className="mt-10  flex flex-col md:flex-row justify-between items-center text-md text-[#AAAAAA]">
//           <p>
//             Built by <span className=" text-white">Yves Adrales</span> Powered
//             by <span className=" text-white">Webflow</span>
//           </p>
//           <p className="mt-4 md:mt-0">© 2025 Styler. All Rights Reserved.</p>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const containerRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const headingEl = headingRef.current;
    if (!container || !headingEl) return;

    // ---- Split heading into characters ----
    const raw = headingEl.textContent || "";
    if (!headingEl.dataset.split) {
      headingEl.dataset.split = "true";
      headingEl.innerHTML = "";
      Array.from(raw).forEach((ch) => {
        const span = document.createElement("span");
        span.className = "char inline-block opacity-0";
        span.innerHTML = ch === " " ? "&nbsp;" : ch;
        headingEl.appendChild(span);
      });
    }

    const chars = headingEl.querySelectorAll("span.char");

    // ---- Select columns instead of individual li ----
    const columns = container.querySelectorAll(".footer-col");

    // Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // Heading characters: left + up + fade in
    tl.fromTo(
      chars,
      { x: -30, y: 20, opacity: 0 },
      {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.05,
      },
      0
    );

    // Columns: slide up + fade in, all at once
    tl.fromTo(
      columns,
      { y: 150, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 4,
        ease: "back.out(1.7)",
      },
      0 // start together with heading
    );

    // Cleanup
    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <div
        ref={containerRef}
        className="bg-[#191919] text-white rounded-3xl p-25 mt-20"
      >
        {/* Top Section */}
        <div className="grid md:grid-cols-5 gap-8">
          {/* Column 1 */}
          <div className="footer-col col-span-2 pr-10">
            <h2 className="text-2xl font-inter mb-2">Styler.</h2>
            <p className="text-[#AAAAAA] text-md leading-relaxed">
              A dynamic agency dedicated to bringing your ideas to life. Where
              creativity meets purpose.
            </p>
          </div>

          {/* Column 2 */}
          <div className="footer-col">
            <h2 className="text-sm font-semibold text-[#AAAAAA] mb-1">
              Explore
            </h2>
            <ul className="space-y-1 text-md">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Works</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="footer-col">
            <h2 className="text-sm font-semibold text-[#AAAAAA] mb-1">More</h2>
            <ul className="space-y-1 text-md">
              <li>
                <a href="#">Contact</a>
              </li>
              <li>
                <a href="#">Style Guide</a>
              </li>
              <li>
                <a href="#">Changelog</a>
              </li>
              <li>
                <a href="#">Licenses</a>
              </li>
              <li>
                <a href="#">Instructions</a>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="footer-col">
            <h2 className="text-sm font-semibold text-[#AAAAAA] mb-1">
              Contacts
            </h2>
            <p className="text-[1rem] text-white pr-2">
              XYZ Times Sq, New York, United States
            </p>
            <p className="text-md text-white mt-2">hello@styler.com</p>
            <p className="text-md text-white">+1 023-456-789</p>
          </div>
        </div>

        {/* Big Heading */}
        <div
          ref={headingRef}
          className="text-center text-6xl md:text-8xl font-semibold font-inter mt-20"
        >
          Design is Our Passion.
        </div>

        {/* Footer */}
        <div className="footer-col mt-10 flex flex-col md:flex-row justify-between items-center text-md text-[#AAAAAA]">
          <p>
            Built by <span className="text-white">Yves Adrales</span> Powered by{" "}
            <span className="text-white">Webflow</span>
          </p>
          <p className="mt-4 md:mt-0">© 2025 Styler. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}
