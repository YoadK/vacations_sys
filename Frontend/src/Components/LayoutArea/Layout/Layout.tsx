// Layout.tsx

import React from "react";
import Header from "../Header/Header";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {
  return (
    <div className="Layout">
      <header>
        <Header />
      </header>
      <main>
        <Routing />
      </main>
      <footer>{/* Your footer content */}</footer>
    </div>
  );
}

export default Layout;
