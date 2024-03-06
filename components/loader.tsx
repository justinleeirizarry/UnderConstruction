import React, { CSSProperties } from "react";

const PreLoader = () => {
  const size = 20; // Size of the loader, implying the loader is a 20x20 square
  const depth = size / 2; // Ideally, depth should be half the size for a perfect cube appearance

  const globalStyles = `
    @keyframes spinner-y0fdc1 {
      0% {
        transform: rotate(45deg) rotateX(-25deg) rotateY(25deg);
      }
      50% {
        transform: rotate(45deg) rotateX(-385deg) rotateY(25deg);
      }
      100% {
        transform: rotate(45deg) rotateX(-385deg) rotateY(385deg);
      }
    }
  `;

  return (
    <>
      <style>{globalStyles}</style>
      <div
        className="inline-flex justify-center items-center"
        style={{ width: size, height: size }}
      >
        <div
          className="relative"
          style={{
            width: "100%",
            height: "100%",
            animation: "spinner-y0fdc1 2s infinite ease",
            transformStyle: "preserve-3d",
          }}
        >
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              style={{
                ...cubeFaceStyle(index, depth),
                backgroundColor: "rgba(0,0,0,0.2)",
                border: "1px solid #000",
                boxSizing: "border-box",
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

const cubeFaceStyle = (index: number, depth: number) => {
  const baseStyle: CSSProperties = {
    position: "absolute",
    width: "100%",
    height: "100%",
    transformOrigin: "center",
  };

  // Adjusting transformations to ensure cube symmetry
  const transform = [
    `rotateY(180deg) translateZ(${depth}px)`,
    `translateZ(-${depth}px)`,
    `rotateY(90deg) translateZ(${depth}px)`,
    `rotateY(-90deg) translateZ(${depth}px)`,
    `rotateX(90deg) translateZ(${depth}px)`,
    `rotateX(-90deg) translateZ(${depth}px)`,
  ][index];

  return { ...baseStyle, transform };
};

export default PreLoader;
