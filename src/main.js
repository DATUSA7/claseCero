import './style.css'
  import * as THREE from 'three';

        // 1. CONFIGURACIÓN DEL ESCENARIO
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // 2. CREACIÓN DEL OBJETO (Torus Knot)
        // El TorusKnot es visualmente impactante y solo requiere una línea
        const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
        const material = new THREE.MeshStandardMaterial({ 
            color: 0x00ffcc, 
            metalness: 0.7, 
            roughness: 0.2,
            wireframe: true // Les encanta ver la malla
        });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // 3. ILUMINACIÓN
        const light = new THREE.DirectionalLight(0xffffff, 2);
        light.position.set(1, 1, 2);
        scene.add(light);
        scene.add(new THREE.AmbientLight(0x404040));

        camera.position.z = 4;

        // 4. INTERACTIVIDAD CON EL MOUSE
        let mouseX = 0;
        let mouseY = 0;

        window.addEventListener('mousemove', (event) => {
            // Normalizamos la posición del mouse de -1 a +1
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        });

        // 5. BUCLE DE ANIMACIÓN (El corazón de Three.js)
        function animate() {
            requestAnimationFrame(animate);

            // Rotación automática
            mesh.rotation.x += 0.01;
            mesh.rotation.y += 0.01;

            // Suave reacción al mouse (Interpolación)
            mesh.position.x += (mouseX - mesh.position.x) * 0.05;
            mesh.position.y += (mouseY - mesh.position.y) * 0.05;

            renderer.render(scene, camera);
        }

        // Manejo de cambio de tamaño de ventana
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        animate();