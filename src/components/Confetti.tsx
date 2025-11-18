import Lottie from 'lottie-web';
import confettiData from '../assets/confetti.json'; // скачать бесплатно с lottiefiles.com

export const Confetti = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const anim = Lottie.loadAnimation({ container: ref.current!, animationData: confettiData, renderer: 'svg', loop: false, autoplay: true });
    return () => anim.destroy();
  }, []);
  return <div ref={ref} className="pointer-events-none fixed inset-0 z-50" />;
};
