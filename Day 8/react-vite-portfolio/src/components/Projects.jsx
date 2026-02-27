import { useState } from "react";

function Projects() {
  const [show, setShow] = useState(false);

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ color: "#c83fea" }}>Projects</h2>

      <h3>React Portfolio</h3>

      {show && <p>A futuristic portfolio built and follow for more content <i>Staytuned</i>.</p>}

      <button onClick={() => setShow(!show)}>
        {show ? "Show Less" : "Show More"}
      </button>
    </div>
  );
}

export default Projects;