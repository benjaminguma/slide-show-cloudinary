import { useRef, useState, useEffect } from "react";
import axios from "axios";

const SlideShowPreviewer = ({ url }) => {
  const ref = useRef();
  const [retry, SetRetry] = useState(1);
  const [canView, setCanView] = useState(false);
  const [URL, setURL] = useState("");

  let loadingText = (
    <p>
      requesting for slide show with id of {url} please wait...{retry}(s) so far
    </p>
  );

  async function tryToGetSlideShow(URL) {
    return new Promise(async (res, rej) => {
      try {
        const response = await axios(URL);
        console.log({ response });
        setURL(URL);
        setCanView(true);
      } catch (error) {
        SetRetry(retry + 1);
      }
    });
  }

  useEffect(() => {
    if (!canView) ref.current = setTimeout(() => tryToGetSlideShow(url), 7000);
    return () => clearTimeout(ref.current);
  }, [retry, canView, url]);

  return (
    <article>
      {canView || URL ? (
        <>
          <video src={URL} autoPlay muted loop controls />
          {!canView && loadingText}
        </>
      ) : (
        loadingText
      )}
    </article>
  );
};
export default SlideShowPreviewer;
