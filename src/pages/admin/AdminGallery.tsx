import { useEffect, useState } from "react";

function Gallery() {
  const [images, setImages] = useState([]);
  const [url, setUrl] = useState("");

  // GET images
  useEffect(() => {
    fetch("http://localhost:8080/api/gallery/images")
      .then(res => res.json())
      .then(data => setImages(data));
  }, []);

  // Upload
  const handleUpload = async () => {
    await fetch("http://localhost:8080/api/gallery/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url })
    });

    // reload images
    const res = await fetch("http://localhost:8080/api/gallery/images");
    const data = await res.json();
    setImages(data);
  };

  return (
    <div>
      <h2>Admin Gallery</h2>

      <input
        type="text"
        placeholder="Image URL"
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleUpload}>Upload</button>

      <div>
        {images.map((img, i) => (
          <img key={i} src={img.url} width="200" />
        ))}
      </div>
    </div>
  );
}

export default Gallery;
