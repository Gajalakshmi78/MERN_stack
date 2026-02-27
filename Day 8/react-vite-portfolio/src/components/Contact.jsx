import { useState } from "react";

function Contact() {
  const [msg, setMsg] = useState("");

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2 style={{ color: "#dc3e3e" }}>Contact</h2>
      <p>Email: Gajalakshmi@gmail.com</p>
      <p>Phone: 9876543217</p>

      <button onClick={() => setMsg("Message Sent 🚀")}>
        Send Message
      </button>

      <p>{msg}</p>
    </div>
  );
}

export default Contact;