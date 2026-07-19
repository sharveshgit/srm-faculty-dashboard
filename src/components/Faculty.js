import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function Faculty() {
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    let { data } = await supabase.from("faculty").select("*");
    setList(data || []);
  }

  return (
    <div style={{ display: "flex", gap: 20 }}>
      <div style={{ width: "30%" }}>
        {list.map((f) => (
          <div key={f.id} onClick={() => setSelected(f)} style={{ cursor: "pointer", padding: "8px 0" }}>
            {f.name}
          </div>
        ))}
      </div>

      <div style={{ width: "70%" }}>
        {selected && (
          <>
            <h2>{selected.name}</h2>
            <p>{selected.department}</p>
            <p>{selected.role}</p>
          </>
        )}
      </div>
    </div>
  );
}
