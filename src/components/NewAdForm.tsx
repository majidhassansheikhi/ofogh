import React, { useState } from "react";
import axios from "axios";

interface AdFormProps {}

const NewAdForm: React.FC<AdFormProps> = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [available, setAvailable] = useState(false);
  const [locationLat, setLocationLat] = useState(0);
  const [locationName, setLocationName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const ad = {
      title,
      description,
      price,
      available,
      location: {
        lat: locationLat,
        name: locationName,
      },
    };

    try {
      await axios.post("http://localhost:8000/ads", ad);
      alert("اگهی ایجاد شد");
    } catch (error) {
      console.error("خطا در ایجاد اگهی", error);
      alert("مشکل فنی رخ داده است");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <label>
        توضیحات:
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </label>
      <label>
        قیمت:
        <input type="number" value={price} onChange={(e) => setPrice(parseInt(e.target.value))} required />
      </label>
      <label>
        تحلیه شده:
        <input type="checkbox" checked={available} onChange={(e) => setAvailable(e.target.checked)} />
      </label>
      <label>
        موقعیت روی نقشه:
        <input type="number" value={locationLat} onChange={(e) => setLocationLat(parseFloat(e.target.value))} required />
        </label>
      <label>
         محله:
        <input type="text" value={locationName} onChange={(e) => setLocationName(e.target.value)} required />
      </label>
      <button type="submit">ایجاد آگهی</button>
    </form>
  );
};

export default NewAdForm;