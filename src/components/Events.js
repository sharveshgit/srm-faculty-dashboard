import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    let { data } = await supabase.from("events").select("*");
    setEvents(data || []);
  }

  return (
    <div style={{ display: "flex", gap: 20 }}>
      <div style={{ width: "30%" }}>
        {events.map((e) => (
          <div key={e.id} onClick={() => setSelected(e)} style={{ cursor: "pointer", padding: "8px 0" }}>
            {e.title}
          </div>
        ))}
      </div>

      <div style={{ width: "70%" }}>
        {selected && (
          <>
            <h2>{selected.title}</h2>
            <p>{selected.description}</p>
            <p>Status: {selected.status}</p>
            <p>Date: {selected.date}</p>
          </>
        )}
      </div>
    </div>
  );
}
