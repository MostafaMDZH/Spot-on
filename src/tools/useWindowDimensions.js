import { useState, useEffect } from 'react';

export default function useWindowDimensions(){

    //getWindowDimensions:
    const getWindowDimensions = () => {
        const { innerWidth: width, innerHeight: height } = window;
        return {width, height};
    }
  
    //state:
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    //listener:
    useEffect(() => {

        //handleResize:
        const handleResize = () => {
            setWindowDimensions(getWindowDimensions());
        }

        //listener:
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);

    }, []);

    return windowDimensions;

}
