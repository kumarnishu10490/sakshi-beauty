import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // FETCH DATA
  const fetchServices = async () => {
    const { data } = await supabase.from("services").select("*");
    setServices(data || []);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // ADD
  const addService = async () => {
    await supabase.from("services").insert([{ name, price }]);
    fetchServices();
    setName("");
    setPrice("");
  };

  // DELETE
  const deleteService = async (id: number) => {
    await supabase.from("services").delete().eq("id", id);
    fetchServices();
  };

  return (
    <div>
      <h2>Admin Services</h2>

      {/* Add Form */}
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Service Name"
      />
      <input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
      />
      <button onClick={addService}>Add</button>

      {/* List */}
      {services.map((item: any) => (
        <div key={item.id}>
          {item.name} - ₹{item.price}
          <button onClick={() => deleteService(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}