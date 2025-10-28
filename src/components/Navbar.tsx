import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between border-b border-white/10">
        <Link href="#" className="flex items-center gap-2">
          <svg className="w-28 sm:w-36 md:w-44 lg:w-48 h-auto" id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 166.16 24.78">
            <defs>
              <style>

                {
                  `
                   @import url('https://fonts.googleapis.com/css?family=Roboto:500');
                .cls-1 {
                letter-spacing: -.01em;
              }

                .cls-2 {
                fill: url(#linear-gradient-2);
              }

                .cls-3, .cls-4 {
                fill: #fff;
              }

                .cls-5 {
                fill: url(#linear-gradient-3);
              }

                .cls-6 {
                fill: none;
                stroke: #fff;
                stroke-linecap: round;
                stroke-miterlimit: 10;
              }

                .cls-7 {
                letter-spacing: 0em;
              }

                .cls-4 {
                fontFamily: Roboto-Medium, Roboto;
                font-size: 22px;
                fontWeight: 500;
              }

                .cls-8 {
                fill: url(#linear-gradient);
              }`
                }
              </style>
              <linearGradient id="linear-gradient" x1="159.91" y1="19.58" x2="147.4" y2="7.43" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#21c3ee"/>
                <stop offset="0" stopColor="#21c2ed"/>
                <stop offset=".69" stopColor="#8b94c8"/>fontFamily
                <stop offset="1" stopColor="#b582ba"/>
              </linearGradient>
              <linearGradient id="linear-gradient-2" x1="169.34" y1="17.19" x2="159.84" y2="6.41" xlinkHref="#linear-gradient"/>
              <linearGradient id="linear-gradient-3" x1="0" y1="10.62" x2="36.25" y2="10.62" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#b483b9"/>
                <stop offset="1" stopColor="#ffcf48"/>
              </linearGradient>
            </defs>
            <g id="Layer_1-2" data-name="Layer 1">
              <g id="Adsforge">
                <g>
                  <path className="cls-8" d="M162,19.31c0,.09-.09.13-.26.13-.14,0-.33-.01-.6-.03-.26-.02-.46-.03-.6-.03s-.34.01-.61.03c-.27.02-.48.03-.61.03-.2,0-.46-.54-.77-1.63s-.63-1.63-.95-1.65c-.27-.01-.96-.02-2.07-.02h-1.7c-1.18,0-1.85,0-2.02.02-.26.02-.53.57-.82,1.65-.29,1.08-.51,1.62-.67,1.62h-2.42c-.14,0-.21-.05-.21-.15,0-.07.05-.23.15-.48l2.63-7.2c.22-.58.9-2.25,2.02-5.02.2-.46.47-1.15.82-2.07.09-.27.18-.41.28-.41.14,0,.34.02.6.05.26.04.47.05.6.05.13,0,.32-.02.59-.06.26-.04.45-.06.57-.06.06,0,.15.13.27.4.17.4,1.02,2.56,2.55,6.48,2.16,5.51,3.23,8.29,3.23,8.34ZM156.99,13.38c0-.21-.32-1.14-.97-2.79-.62-1.6-1.06-2.66-1.32-3.16-1.48,3.78-2.22,5.76-2.22,5.94,0,.24.27.39.82.43.03,0,.38.01,1.05.01h1.11c1.02,0,1.54-.14,1.54-.43Z"/>
                  <path className="cls-2" d="M166.16,19.22c0,.15-.1.23-.31.23-.13,0-.33-.01-.59-.03-.27-.02-.46-.03-.59-.03-.14,0-.34.01-.6.03-.27.02-.46.03-.59.03-.18,0-.27-.08-.27-.25,0-.82.04-2.05.11-3.69s.11-2.88.11-3.7-.04-1.99-.11-3.58c-.08-1.59-.11-2.79-.11-3.58,0-.18.08-.27.25-.27.14,0,.34.01.62.03s.49.03.63.03c.13,0,.32-.01.58-.03s.45-.03.58-.03c.19,0,.28.07.28.21,0,.8-.03,2.01-.09,3.61-.06,1.6-.09,2.81-.09,3.61s.03,2.06.09,3.71c.06,1.65.09,2.88.09,3.71Z"/>
                </g>
                <g>
                  <path className="cls-5" d="M18.28,14.91c0,.08.03.16.03.25,0,1.24-1.01,2.25-2.25,2.25-1.08,0-1.98-.76-2.2-1.77l-5.13-3.5c-.16.04-.33.07-.51.07l-3.71,4.25s.01.07.01.11c0,1.69-1.86,2.95-3.65,1.83-.17-.11-.32-.26-.43-.43-1.12-1.79.14-3.65,1.83-3.65.04,0,.08.01.12.01l3.58-4.1c-.01-.09-.03-.18-.03-.27,0-1.24,1.01-2.25,2.25-2.25,1.14,0,2.08.85,2.22,1.96l4.93,3.37c.22-.07.45-.12.7-.12l6.15-7.3c-.01-.1-.03-.2-.03-.31,0-1.69,1.87-2.95,3.66-1.82.17.11.32.26.43.43,1.1,1.77-.11,3.59-1.76,3.64l-6.21,7.37ZM35.72,2.78c-.63-.54-1.58-.46-2.11.17l-11.08,13.03c-.54.63-.46,1.58.17,2.11.28.24.63.36.97.36.42,0,.85-.18,1.14-.53l11.08-13.03c.54-.63.46-1.58-.17-2.11Z"/>
                  <text  fontFamily="Roboto, sans-serif" fontWeight="500" className="cls-4" transform="translate(47.01 18.82)"><tspan x="0" y="0">ds</tspan><tspan className="cls-1" x="23.77" y="0">F</tspan><tspan x="35.63" y="0">o</tspan><tspan className="cls-7" x="48.16" y="0">r</tspan><tspan x="55.69" y="0">ge</tspan></text>
                  <path className="cls-3" d="M32.59,18.69h-2.83l12.58-15.64h2.44v15.64M42.19,18.69l.1-11.27-9.43,11.27"/>
                </g>
                <line className="cls-6" x1="138.32" y1="4.37" x2="138.32" y2="21.73"/>
              </g>
            </g>
          </svg>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link
            href="#features"
            className="opacity-80 hover:opacity-100 transition"
          >
            Features
          </Link>
          <Link
            href="#live-demo"
            className="opacity-80 hover:opacity-100 transition"
          >
            Live demo
          </Link>
          <Link
            href="#contact"
            className="opacity-80 hover:opacity-100 transition"
          >
            Contact
          </Link>
        </nav>
        <Link
          href="#waitlist"
          className="inline-flex items-center rounded-full bg-white text-black px-4 py-2 text-sm font-medium shadow hover:shadow-md transition"
        >
          Join the waitlist
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
