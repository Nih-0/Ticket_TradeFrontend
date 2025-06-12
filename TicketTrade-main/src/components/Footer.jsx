import React from "react";

const Footer = () => {
  return (
    <footer
      className=" text-white text-center mt-auto d-flex justify-content-center align-items-center"
      style={{
        // padding: "0.5rem 0",   // Reduced vertical padding
        lineHeight: "1.2",     // Tighter line spacing
        height:"100px",
        backgroundColor: "#fff"
      }}
    >
      <div className="">
        <p className="mb-1 text-black" style={{ fontSize: "0.9rem" }}>
          &copy; {new Date().getFullYear()} TicketTrade.
        </p>
        <p className="mb-0" style={{ fontSize: "0.8rem" }}>
          <a href="/privacy" className="text-black text-decoration-none">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a href="/terms" className="text-black text-decoration-none">
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
