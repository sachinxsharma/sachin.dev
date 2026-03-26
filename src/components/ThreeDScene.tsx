"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeDScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const scrollY = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Starfield
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 2000;
    const posArray = new Float32Array(starsCount * 3);
    for(let i = 0; i < starsCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 20;
    }
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const starsMaterial = new THREE.PointsMaterial({ size: 0.005, color: 0xffffff, transparent: true, opacity: 0.8 });
    const starsMesh = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starsMesh);

    // Globe
    const geometry = new THREE.SphereGeometry(2.5, 64, 64);
    const material = new THREE.MeshStandardMaterial({ 
      color: 0x00f0ff, 
      wireframe: true, 
      emissive: 0x00f0ff, 
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.4
    });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Inner Glow Sphere
    const innerGeom = new THREE.SphereGeometry(2.4, 32, 32);
    const innerMat = new THREE.MeshPhongMaterial({
      color: 0x004466,
      transparent: true,
      opacity: 0.2,
    });
    const innerSphere = new THREE.Mesh(innerGeom, innerMat);
    scene.add(innerSphere);

    // Enhanced Rocket Group
    const rocketGroup = new THREE.Group();
    
    // Body
    const rocketBodyGeom = new THREE.CylinderGeometry(0.18, 0.2, 0.9, 32);
    const rocketBodyMat = new THREE.MeshStandardMaterial({ color: 0xeeeeee, metalness: 0.8, roughness: 0.2 });
    const rocketBody = new THREE.Mesh(rocketBodyGeom, rocketBodyMat);
    rocketGroup.add(rocketBody);

    // Nose
    const rocketNoseGeom = new THREE.ConeGeometry(0.18, 0.45, 32);
    const rocketNoseMat = new THREE.MeshStandardMaterial({ color: 0xff3333, metalness: 0.5, roughness: 0.1 });
    const rocketNose = new THREE.Mesh(rocketNoseGeom, rocketNoseMat);
    rocketNose.position.y = 0.675;
    rocketGroup.add(rocketNose);

    // Fins (4 fins for better look)
    const finGeom = new THREE.BoxGeometry(0.05, 0.35, 0.5);
    const finMat = new THREE.MeshStandardMaterial({ color: 0xff3333 });
    for(let i = 0; i < 4; i++) {
        const fin = new THREE.Mesh(finGeom, finMat);
        const angle = (i * Math.PI) / 2;
        fin.position.set(Math.cos(angle) * 0.18, -0.25, Math.sin(angle) * 0.18);
        fin.rotation.y = -angle;
        rocketGroup.add(fin);
    }

    // Engine "Flame" (Simple emissive cone)
    const flameGeom = new THREE.ConeGeometry(0.1, 0.3, 16);
    const flameMat = new THREE.MeshBasicMaterial({ color: 0xffaa00, transparent: true, opacity: 0.6 });
    const flame = new THREE.Mesh(flameGeom, flameMat);
    flame.position.y = -0.6;
    flame.rotation.x = Math.PI;
    rocketGroup.add(flame);

    scene.add(rocketGroup);

    // Space Boy (Low Opacity)
    const boyGroup = new THREE.Group();
    const headGeom = new THREE.SphereGeometry(0.22, 16, 16);
    const headMat = new THREE.MeshStandardMaterial({ color: 0xffcc99, transparent: true, opacity: 0.3 });
    const head = new THREE.Mesh(headGeom, headMat);
    head.position.y = 0.45;
    boyGroup.add(head);

    const helmetGeom = new THREE.SphereGeometry(0.25, 16, 16);
    const helmetMat = new THREE.MeshStandardMaterial({ color: 0x88ccff, transparent: true, opacity: 0.1, wireframe: true });
    const helmet = new THREE.Mesh(helmetGeom, helmetMat);
    helmet.position.y = 0.45;
    boyGroup.add(helmet);

    const boyBodyGeom = new THREE.CylinderGeometry(0.15, 0.15, 0.6, 16);
    const boyBodyMat = new THREE.MeshStandardMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.3 });
    const body = new THREE.Mesh(boyBodyGeom, boyBodyMat);
    boyGroup.add(body);
    scene.add(boyGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x00f0ff, 2, 20);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
    mainLight.position.set(10, 10, 10);
    scene.add(mainLight);

    camera.position.z = 7;

    // Handlers
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const handleMouseMove = (event: MouseEvent) => {
        mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
        scrollY.current = window.scrollY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    // Animation loop
    let animationFrameId: number;
    let time = 0;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.01;

      // Rotate Stars slightly
      starsMesh.rotation.y += 0.0005;

      // Rotate Globe
      globe.rotation.y += 0.003;
      globe.rotation.x = scrollY.current * 0.001;
      innerSphere.rotation.y -= 0.001;

      // Animate Rocket with Mouse Influence
      const rocketRadius = 3.8;
      const targetPosX = Math.sin(time * 1.2) * rocketRadius + mouse.current.x * 0.5;
      const targetPosZ = Math.cos(time * 1.2) * rocketRadius + mouse.current.y * 0.5;
      const targetPosY = Math.sin(time * 1.8) * 1.5 + (scrollY.current * 0.002);

      rocketGroup.position.lerp(new THREE.Vector3(targetPosX, targetPosY, targetPosZ), 0.1);
      
      const tangentX = Math.cos(time * 1.2);
      const tangentZ = -Math.sin(time * 1.2);
      const tangentY = Math.cos(time * 1.8);
      const lookTarget = rocketGroup.position.clone().add(new THREE.Vector3(tangentX, tangentY, tangentZ));
      rocketGroup.lookAt(lookTarget);
      rocketGroup.rotateX(Math.PI / 2); 

      // Animate Flame
      flame.scale.y = 0.8 + Math.sin(time * 20) * 0.2;

      // Animate Boy
      const boyRadius = 4.8;
      boyGroup.position.x = Math.sin(time * 0.5) * boyRadius;
      boyGroup.position.z = Math.cos(time * 0.5) * boyRadius;
      boyGroup.position.y = Math.cos(time * 0.3) * 2 - 1.5 - (scrollY.current * 0.001);
      boyGroup.rotation.y += 0.01;
      boyGroup.rotation.z = Math.sin(time * 0.5) * 0.2;

      // Subtle Camera Parallax
      camera.position.x += (mouse.current.x * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (-mouse.current.y * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          object.geometry.dispose();
          if ('material' in object) {
            if (Array.isArray(object.material)) {
              object.material.forEach(mat => mat.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0 h-full w-full opacity-60 pointer-events-none" />;
}
