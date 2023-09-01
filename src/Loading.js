import { useState, useEffect } from "react";

export default function Loading(){
    
    const [loading, setLoading] = useState(true);
    let loaderStyle = {
            position: 'absolute',
            top: 0,
            height: '0.5vh',
            width: '20%',
            backgroundColor: 'red',
            animation: 'loader-animation 1s ease infinite',
            zIndex:200  
        }
    useEffect(() => {
        const loadData = async () => {
            await new Promise((r) => setTimeout(r, 2000));
            setLoading((loading) => !loading);
        };
        loadData();
    }, [])
    if (loading) {
        return <div style={loaderStyle}></div>
    }
}