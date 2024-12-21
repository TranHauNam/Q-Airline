import React, { useEffect, useRef } from 'react';
import Spheres1Background from 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.17/build/backgrounds/spheres1.cdn.min.js';
import './SphereBackground.css';

const SphereBackground = () => {
    const canvasRef = useRef(null);
    const bgRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current) {
            bgRef.current = Spheres1Background(canvasRef.current, {
                count: 100,
                minSize: 0.3,
                maxSize: 1,
                gravity: 1
            });
        }
    }, []);

    const handleGravityToggle = () => {
        if (bgRef.current) {
            bgRef.current.spheres.config.gravity = 
                bgRef.current.spheres.config.gravity === 0 ? 1 : 0;
        }
    };

    const handleColorChange = () => {
        if (bgRef.current) {
            bgRef.current.spheres.setColors([
                0xffffff * Math.random(),
                0xffffff * Math.random(),
                0xffffff * Math.random()
            ]);
        }
    };

    return (
        <div className="sphere-background">
            <div className="sphere-background__hero">
                <h1 className="sphere-background__title">Sphere</h1>
                <h2 className="sphere-background__subtitle">Packing</h2>
            </div>
            <div className="sphere-background__buttons">
                <button 
                    type="button" 
                    className="sphere-background__button"
                    onClick={handleGravityToggle}
                >
                    Toggle gravity
                </button>
                <button 
                    type="button" 
                    className="sphere-background__button"
                    onClick={handleColorChange}
                >
                    Random colors
                </button>
            </div>
            <canvas ref={canvasRef} className="sphere-background__canvas"></canvas>
        </div>
    );
};

export default SphereBackground; 