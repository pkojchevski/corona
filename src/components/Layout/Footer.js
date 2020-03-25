import React, { useState } from "react";

function Footer({ lastUpdate }) {
  return (
    <footer className="footer">
      {lastUpdate && (
        <p className="text-center">
          Last update:
          <cite>{lastUpdate.substring(4, lastUpdate.length - 1)}</cite>
        </p>
      )}
    </footer>
  );
}

export default Footer;
