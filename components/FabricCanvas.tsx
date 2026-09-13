"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function FabricCanvas({ isDarkMode }: { isDarkMode: boolean }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // 1. Sahne ve Kamera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      100
    );
    camera.position.z = 7;
    camera.position.y = -1;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // 3. 3D Kumaş / Dalga Geometrisi
    const geometry = new THREE.PlaneGeometry(14, 10, 36, 36);
    
    // Kumaş Materyali (Hafif lüks wireframe / nokta estetiği)
    const material = new THREE.MeshBasicMaterial({
      color: isDarkMode ? 0xffffff : 0x111111,
      wireframe: true,
      transparent: true,
      opacity: isDarkMode ? 0.04 : 0.035,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 3;
    scene.add(mesh);

    // Fare Takibi
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animasyon Döngüsü (Kumaş Dalgalanması)
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Vertex Dalgalanma Fiziği
      const positionAttribute = geometry.attributes.position;
      for (let i = 0; i < positionAttribute.count; i++) {
        const u = positionAttribute.getX(i);
        const v = positionAttribute.getY(i);
        
        // Akışkan sinüs dalgaları + fare etkileşimi
        const wave = 
          Math.sin(u * 0.8 + elapsedTime * 1.2) * 0.25 +
          Math.cos(v * 0.8 + elapsedTime * 1.5) * 0.25 +
          Math.sin(u * 0.3 + v * 0.3 + mouseX * 2) * 0.2;

        positionAttribute.setZ(i, wave);
      }
      positionAttribute.needsUpdate = true;

      // Hafif Kamera Salınımı
      mesh.rotation.z = mouseX * 0.05;
      mesh.rotation.x = -Math.PI / 3 + mouseY * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Yönetimi
    const handleResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [isDarkMode]);

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden" />;
}