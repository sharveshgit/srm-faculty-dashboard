import React, { useState } from "react";
import { supabase } from "../supabase";

export default function Documents() {
  const [title, setTitle] = useState("");

  async function upload() {
    await supabase.from("documents").insert([
      {
        title,
        file_url: "demo.pdf",
        faculty_id: "YOUR_FACULTY_ID"
      }
    ]);

    await supabase.from("notifications").insert([
      {
        message: "New document uploaded by faculty",
        role: "HOD"
      }
    ]);

    alert("Uploaded + HOD notified");
  }

  return (
    <div>
      <h2>Upload Document</h2>
      <input
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
        style={{ display: "block", marginBottom: 10, padding: 8, width: 250 }}
      />
      <button onClick={upload}>Upload</button>
    </div>
  );
}
