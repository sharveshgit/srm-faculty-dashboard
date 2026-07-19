import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function Notifications() {
  const [list, setList] = useState([]);

  useEffect(() => {
    load();

    const channel = supabase
      .channel("notifications")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "notifications" },
        (payload) => {
          setList((prev) => [payload.new, ...prev]);
          alert(payload.new.message);
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  async function load() {
    let { data } = await supabase.from("notifications").select("*");
    setList(data || []);
  }

  return (
    <div>
      <h2>Notifications</h2>
      {list.map((n) => (
        <div key={n.id} style={{ padding: "8px 0", borderBottom: "1px solid #eee" }}>{n.message}</div>
      ))}
    </div>
  );
}
