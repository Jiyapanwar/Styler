import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

// const servicesData = [
//   {
//     title: "Web Development",
//     description: "Custom websites & apps",
//     image: "https://via.placeholder.com/300x200",
//   },
//   {
//     title: "Mobile Apps",
//     description: "iOS & Android solutions",
//     image: "https://via.placeholder.com/300x200",
//   },
//   {
//     title: "UI/UX Design",
//     description: "Modern & user-friendly designs",
//     image: "https://via.placeholder.com/300x200",
//   },
// ];

// const worksData = [
//   {
//     title: "E-commerce",
//     description: "Shopify, WooCommerce, custom stores",
//     image: "https://via.placeholder.com/300x200",
//   },
//   {
//     title: "Portfolio",
//     description: "Showcase your skills and projects",
//     image: "https://via.placeholder.com/300x200",
//   },
//   {
//     title: "Landing Pages",
//     description: "High-converting landing pages",
//     image: "https://via.placeholder.com/300x200",
//   },
//   {
//     title: "Dashboards",
//     description: "Interactive & responsive dashboards",
//     image: "https://via.placeholder.com/300x200",
//   },
// ];

export default function Navbar() {
  //   const [hoveredDropdown, setHoveredDropdown] = useState(null);

  //   const handleMouseEnter = (dropdown) => {
  //     setHoveredDropdown(dropdown);
  //   };

  //   const handleMouseLeave = () => {
  //     setHoveredDropdown(null);
  //   };

  return (
    <>
      <nav className="text-[#191919] fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-navbar rounded-full px-8 py-2 shadow-lg backdrop-blur-sm bg-[#E9E9E9E9]">
          <div className="font-inter flex items-center justify-between min-w-[350px] text-sm ">
            <div className="flex items-center space-x-6">
              <Link
                to="/about"
                className="navbar-link text-navbar-text hover:text-navbar-text transition-transform duration-300 hover:-translate-y-1"
              >
                About
              </Link>

              <div
                className="relative"
                // onMouseEnter={() => handleMouseEnter("services")}
                // onMouseLeave={handleMouseLeave}
              >
                <button className="navbar-link text-navbar-text flex items-center gap-1 transition-transform duration-300 hover:-translate-y-1">
                  Services
                  <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                </button>
              </div>
            </div>

            {/* Logo */}
            <div className="text-logo text-2xl font-bold">
              <Link to="/">
                <svg
                  width="25"
                  height="30"
                  viewBox="0 0 77 76"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M56.3965 10H24.3965V0H56.3965C67.4422 0 76.3965 8.9543 76.3965 20V52H66.3965V20C66.3965 14.4772 61.9193 10 56.3965 10Z"
                    fill="#FD291C"
                  />
                  <path
                    d="M20.3965 66H52.3965V76H20.3965C9.35079 76 0.396483 67.0457 0.396484 56L0.396486 24H10.3965L10.3965 56C10.3965 61.5228 14.8736 66 20.3965 66Z"
                    fill="#FD291C"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M58.3965 38C58.3965 49.0457 49.4422 58 38.3965 58C27.3508 58 18.3965 49.0457 18.3965 38C18.3965 26.9543 27.3508 18 38.3965 18C49.4422 18 58.3965 26.9543 58.3965 38ZM48.3965 38C48.3965 43.5229 43.9193 48 38.3965 48C32.8736 48 28.3965 43.5229 28.3965 38C28.3965 32.4772 32.8736 28 38.3965 28C43.9193 28 48.3965 32.4772 48.3965 38Z"
                    fill="#FD291C"
                  />
                </svg>
              </Link>
            </div>

            <div className="flex items-center space-x-6">
              <div
                className="relative"
                // onMouseEnter={() => handleMouseEnter("works")}
                // onMouseLeave={handleMouseLeave}
              >
                <button className="navbar-link text-navbar-text flex items-center gap-1 transition-transform duration-300 hover:-translate-y-1">
                  Works
                  <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                </button>
              </div>

              <button className="navbar-link text-navbar-text transition-transform duration-300 hover:-translate-y-1">
                Contact
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full-width Dropdown
      <div
        className={`fixed inset-x-0 top-0 z-40 bg-dropdown shadow-xl transform transition-transform duration-500 ease-in-out ${
          hoveredDropdown
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
        // onMouseEnter={() =>
        //   hoveredDropdown && handleMouseEnter(hoveredDropdown)
        // }
        // onMouseLeave={handleMouseLeave}
      >
        {hoveredDropdown && (
          <div className="pt-24 pb-12 px-8">
            <div className="max-w-6xl mx-auto">
              <div
                className={`grid gap-8 ${
                  hoveredDropdown === "services" ? "grid-cols-3" : "grid-cols-4"
                }`}
              >
                {(hoveredDropdown === "services"
                  ? servicesData
                  : worksData
                ).map((item, index) => (
                  <div
                    key={index}
                    className="group cursor-pointer bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-card-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div> */}
    </>
  );
}
