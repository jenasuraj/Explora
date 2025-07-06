// ui/Loader.jsx
import { Player } from '@lottiefiles/react-lottie-player';
import '@/app/Loader.css';

const Loader = () => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-90 p-4">
    <Player
      autoplay
      loop
      src="https://lottie.host/022b629d-cf89-4d3e-9340-6e0e4614e436/VPIkCubeA3.json"
      className="w-60 h-60 sm:w-72 sm:h-72 md:w-96 md:h-96"
    />
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-10 text-center mt-4">
      <p className="text-base sm:text-lg font-mono text-black">
        Hang on buddy! I'm planning your trip...
      </p>
      <div className="loader"></div>
    </div>
  </div>
);

export default Loader;
