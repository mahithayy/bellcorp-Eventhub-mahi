import React,{ useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const nav = useNavigate();

  const submit = async e => {
    e.preventDefault();
    const res = await API.post("/auth/login", form);
    localStorage.setItem("token", res.data.token);
    nav("/");
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-bold">Login</h2>
      <input className="border p-2 w-full" placeholder="Email"
        onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" className="border p-2 w-full" placeholder="Password"
        onChange={e => setForm({ ...form, password: e.target.value })} />
      <button className="bg-indigo-600 text-white w-full p-2 rounded">Login</button>
    </form>
  );
}
