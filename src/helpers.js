import axios from "axios";

const cloudName = "dqydioa16";

const upload = async (imgFileB64) => {
  const imageData = new FormData();
  imageData.append("file", imgFileB64);
  imageData.append("upload_preset", "testpreset");
  const res = await axios.post(
    ` https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    imageData
  );
  const imageDetails = res.data;
  return imageDetails.public_id;
};

const slidesConfig = (arrOfAsetIds) => {
  const templateID = "wg1egl4wmlnpe1e80kmk";
  return `https://res.cloudinary.com/${cloudName}/video/upload/fn_render:w_500;h_500;du_18;vars_(tdur_1500;transition_s:hexagonalize;slides_(${arrOfAsetIds
    .map((id) => "(media_i:" + id + ";sdur_1000)")
    .join(";")}))/${templateID}.mp4`;
};

export { upload, slidesConfig };
