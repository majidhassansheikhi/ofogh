import { useEffect, useState } from "react";
//creating a custom hook to detect the user`s prefered mode
const useDarkMode = () => {
    const [isDarkMode , setDarkMode] = useState(window.matchMedia('(prefers-color-scheme : dark)').matches);
    //cheks if the user prefers a dark mode based on their system settings.
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme : dark)'); 
        //listens to changes in user preferences by adding event listener
        const handleChange = () => setDarkMode(mediaQuery.matches);
        mediaQuery.addEventListener('change', handleChange);
        return () => {
            mediaQuery.addEventListener('change', handleChange);
        };
    } , []);
    return [isDarkMode, () => setDarkMode((prev) => !prev)] as const;

};
export default useDarkMode;

//if the user prefers a dark mode based on their system settings, the app will start in dark mode.