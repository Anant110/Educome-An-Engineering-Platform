import { useEffect } from 'react';

const useSmoothScroll = () => {
  useEffect(() => {
    let timer;
    let scroll = window.scrollY;
    const step = 0; // Increase this number to slow down the scroll speed
    const delay = 0; // Adjust the delay to control the smoothness
    
    const smoothScroll = () => {
      if (scroll !== window.scrollY) {
        scroll = window.scrollY;
        window.scrollTo(0, scroll + step);
      }
      timer = setTimeout(smoothScroll, delay);
    };

    smoothScroll();

    return () => clearTimeout(timer);
  }, []);
};

export default useSmoothScroll;
