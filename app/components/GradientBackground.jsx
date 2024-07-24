import React, { useEffect, useRef } from 'react';

const GradientBackground = ({ children }) => {
  const containerRef = useRef(null);
  const circle1Ref = useRef(null);
  const circle2Ref = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const circle1 = circle1Ref.current;
    const circle2 = circle2Ref.current;

    let circle1Pos = { x: 10, y: 20, dx: 0.05, dy: 0.05 };
    let circle2Pos = { x: 60, y: 40, dx: -0.05, dy: -0.05 };

    const animate = () => {
      // Update circle positions
      circle1Pos.x += circle1Pos.dx;
      circle1Pos.y += circle1Pos.dy;
      circle2Pos.x += circle2Pos.dx;
      circle2Pos.y += circle2Pos.dy;

      // Boundary checks
      if (circle1Pos.x <= 0 || circle1Pos.x >= 100 - 48) circle1Pos.dx *= -1;
      if (circle1Pos.y <= 0 || circle1Pos.y >= 100 - 48) circle1Pos.dy *= -1;
      if (circle2Pos.x <= 0 || circle2Pos.x >= 100 - 40) circle2Pos.dx *= -1;
      if (circle2Pos.y <= 0 || circle2Pos.y >= 100 - 40) circle2Pos.dy *= -1;

      // Apply new positions
      circle1.style.left = `${circle1Pos.x}%`;
      circle1.style.top = `${circle1Pos.y}%`;
      circle2.style.left = `${circle2Pos.x}%`;
      circle2.style.top = `${circle2Pos.y}%`;

      requestAnimationFrame(animate);
    };

    animate();

  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen w-full overflow-hidden">
      {/* Moving gradient circles */}
      <div
        ref={circle1Ref}
        className="absolute w-[48vw] h-[48vw] rounded-full bg-gradient-to-br from-yellow-300 via-pink-500 to-orange-500 blur-3xl opacity-30"
        style={{ left: '10%', top: '20%' }}
      ></div>
      <div
        ref={circle2Ref}
        className="absolute w-[40vw] h-[40vw] rounded-full bg-gradient-to-tl from-green-300 via-blue-500 to-purple-600 blur-3xl opacity-30"
        style={{ left: '60%', top: '40%' }}
      ></div>
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GradientBackground;