import React from "react";

function Footer({ lastUpdate }) {
  return (
    <footer className="footer">
      {lastUpdate && (
        <p className="text-center">
          <cite>Last update: {lastUpdate.substring(4, lastUpdate.length)}</cite>
        </p>
      )}
    </footer>
  );
}

export default Footer;
