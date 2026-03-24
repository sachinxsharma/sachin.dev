"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeDScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Globe
    const geometry = new THREE.SphereGeometry(2.5, 32, 32);
    const material = new THREE.MeshStandardMaterial({ 
      color: 0x00f0ff, 
      wireframe: true, 
      emissive: 0x00f0ff, 
      emissiveIntensity: 0.5 
    });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Rocket Group
    const rocketGroup = new THREE.Group();
    const rocketBodyGeom = new THREE.CylinderGeometry(0.15, 0.15, 0.8, 16);
    const rocketBodyMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const rocketBody = new THREE.Mesh(rocketBodyGeom, rocketBodyMat);
    rocketGroup.add(rocketBody);

    const rocketNoseGeom = new THREE.ConeGeometry(0.15, 0.4, 16);
    const rocketNoseMat = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const rocketNose = new THREE.Mesh(rocketNoseGeom, rocketNoseMat);
    rocketNose.position.y = 0.6;
    rocketGroup.add(rocketNose);

    const finGeom = new THREE.BoxGeometry(0.05, 0.3, 0.5);
    const finMat = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const fin1 = new THREE.Mesh(finGeom, finMat);
    fin1.position.set(0.15, -0.2, 0);
    const fin2 = new THREE.Mesh(finGeom, finMat);
    fin2.position.set(-0.15, -0.2, 0);
    rocketGroup.add(fin1, fin2);
    scene.add(rocketGroup);

    // Boy Group (Low Opacity)
    const boyGroup = new THREE.Group();
    const headGeom = new THREE.SphereGeometry(0.2, 16, 16);
    const headMat = new THREE.MeshStandardMaterial({ color: 0xffcc99, transparent: true, opacity: 0.25 });
    const head = new THREE.Mesh(headGeom, headMat);
    head.position.y = 0.4;
    boyGroup.add(head);

    const boyBodyGeom = new THREE.CylinderGeometry(0.15, 0.15, 0.6, 16);
    const boyBodyMat = new THREE.MeshStandardMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.25 });
    const body = new THREE.Mesh(boyBodyGeom, boyBodyMat);
    boyGroup.add(body);
    scene.add(boyGroup);

    // Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(3, 2, 1);
    scene.add(directionalLight);

    camera.position.z = 6;

    // Animation loop
    let animationFrameId: number;
    let time = 0;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.01;

      globe.rotation.x += 0.002;
      globe.rotation.y += 0.005;

      // Animate Rocket
      const rocketRadius = 3.5;
      rocketGroup.position.x = Math.sin(time * 1.5) * rocketRadius;
      rocketGroup.position.z = Math.cos(time * 1.5) * rocketRadius;
      rocketGroup.position.y = Math.sin(time * 2) * 1.5;
      
      const tangentX = Math.cos(time * 1.5);
      const tangentZ = -Math.sin(time * 1.5);
      const tangentY = Math.cos(time * 2);
      const targetPos = rocketGroup.position.clone().add(new THREE.Vector3(tangentX, tangentY, tangentZ));
      rocketGroup.lookAt(targetPos);
      rocketGroup.rotateX(Math.PI / 2); // align cylinder up axis

      // Animate Boy
      const boyRadius = 4.5;
      boyGroup.position.x = Math.sin(time * 0.5) * boyRadius;
      boyGroup.position.y = Math.cos(time * 0.3) * 2 - 1.5;
      boyGroup.position.z = Math.cos(time * 0.5) * boyRadius;
      boyGroup.rotation.y += 0.01;

      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach(mat => mat.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0 h-full w-full opacity-50 pointer-events-none" />;
}
