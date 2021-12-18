import { useState } from "react";
import Webcam from "./components/Webcam";
import ImagePreviewer from "./components/ImagePreviewer";
import SlideShowPreviewer from "./components/SlideShowPreviewer";
import { upload, slidesConfig } from "./helpers";
import "./styles.css";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [deliveryURL, setDeliveryURL] = useState("");
  const [images, setImages] = useState([]);
  const onCapture = (newImage) =>
    setImages((prevImages) => [...prevImages, newImage]);

  const deleteImage = (ind) =>
    setImages((prevImages) => images.filter((_, index) => index !== ind));

  const uploadMultipleImages = async (arrOfImages) => {
    let arr = [];
    for (const image of images) {
      arr.push(await upload(image));
    }
    return arr;
  };

  const buildSlideShow = async () => {
    try {
      setLoading(true);
      const uploadedImgsPublicIds = await uploadMultipleImages();
      const deliveryURL = slidesConfig(uploadedImgsPublicIds);
      setDeliveryURL(deliveryURL);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="main con">
        <Webcam onCapture={onCapture} loading={loading} />
        {deliveryURL && <SlideShowPreviewer url={deliveryURL} />}
      </section>

      <div>
        <button onClick={buildSlideShow}> generate slideshow</button>
      </div>

      <section className="captured_imags_con con">
        {images.map((imgURL, index) => (
          <ImagePreviewer
            url={imgURL}
            key={index}
            del={() => deleteImage(index)}
          />
        ))}
      </section>
    </main>
  );
}