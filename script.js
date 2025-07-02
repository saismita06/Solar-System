const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("solarCanvas") });
renderer.setSize(window.innerWidth, window.innerHeight);

// Lighting
const light = new THREE.PointLight(0xffffff, 1.5, 0);
light.position.set(0, 0, 0);
scene.add(light);

// Sun
const sunGeometry = new THREE.SphereGeometry(3, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Planets
const planets = [];
const planetData = [
  { name: "Mercury", size: 0.3, distance: 5, speed: 0.04, color: 0xaaaaaa },
  { name: "Venus", size: 0.5, distance: 7, speed: 0.03, color: 0xffcc00 },
  { name: "Earth", size: 0.6, distance: 9, speed: 0.02, color: 0x0000ff },
  { name: "Mars", size: 0.4, distance: 11, speed: 0.018, color: 0xff3300 },
  { name: "Jupiter", size: 1.2, distance: 14, speed: 0.015, color: 0xff9900 },
  { name: "Saturn", size: 1.1, distance: 17, speed: 0.012, color: 0xccaa66 },
  { name: "Uranus", size: 0.9, distance: 20, speed: 0.01, color: 0x66ffff },
  { name: "Neptune", size: 0.85, distance: 23, speed: 0.009, color: 0x3366ff },
];

planetData.forEach((data, index) => {
  const geometry = new THREE.SphereGeometry(data.size, 32, 32);
  const material = new THREE.MeshStandardMaterial({ color: data.color });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  data.mesh = mesh;
  data.angle = Math.random() * Math.PI * 2;
  planets.push(data);

  // Add controls
  const control = document.createElement("div");
  control.innerHTML = `
    <label>${data.name}: <input type="range" min="0" max="0.1" step="0.001" value="${data.speed}" id="speed-${index}"/></label>
  `;
  document.getElementById("controls").appendChild(control);

  document.getElementById(`speed-${index}`).addEventListener("input", (e) => {
    data.speed = parseFloat(e.target.value);
  });
});

camera.position.z = 30;

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  planets.forEach((planet) => {
    planet.angle += planet.speed;
    const x = Math.cos(planet.angle) * planet.distance;
    const z = Math.sin(planet.angle) * planet.distance;
    planet.mesh.position.set(x, 0, z);
  });

  renderer.render(scene, camera);
}
animate();
