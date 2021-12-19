import Webcam from 'react-webcam';
import { useRef } from 'react';

const WebCam = ({ onCapture, loading }) => {
	const capture = async () => {
		// get screenshot
		const image = webCamRef.current.getScreenshot();
		onCapture(image);
	};
	const webCamRef = useRef();
	const videoConstraints = {
		width: 600,
		height: 400,
		facingMode: 'user',
	};

	return (
		<article className='media_box'>
			<div className='camera'>
				{/* web cam */}

				<Webcam
					audio={false}
					height={400}
					ref={webCamRef}
					screenshotFormat='image/jpeg'
					width={600}
					videoConstraints={videoConstraints}
				/>
				<button disabled={loading} onClick={capture} className={'capture_btn'}></button>
			</div>
		</article>
	);
};

export default WebCam;
