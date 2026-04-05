const userId = 8941948601;

// ================= STATS FIX =================
async function getStats(){
  try{
    const proxy = "https://api.allorigins.win/raw?url=";

    const f1 = await fetch(proxy + `https://friends.roblox.com/v1/users/${userId}/friends/count`).then(r=>r.json());
    const f2 = await fetch(proxy + `https://friends.roblox.com/v1/users/${userId}/followers/count`).then(r=>r.json());
    const f3 = await fetch(proxy + `https://friends.roblox.com/v1/users/${userId}/followings/count`).then(r=>r.json());

    document.getElementById("friends").innerText = f1.count || 0;
    document.getElementById("followers").innerText = f2.count || 0;
    document.getElementById("following").innerText = f3.count || 0;

  }catch(e){
    console.log("ERROR:", e);
  }
}

// ================= AVATAR AUTO =================
function loadAvatar(){

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

  const renderer = new THREE.WebGLRenderer({alpha:true});
  renderer.setSize(document.getElementById("avatar3d").clientWidth, 400);
  document.getElementById("avatar3d").appendChild(renderer.domElement);

  const light = new THREE.AmbientLight(0xffffff,1.5);
  scene.add(light);

  const geometry = new THREE.BoxGeometry(2,2,2);
  const texture = new THREE.TextureLoader().load(`https://www.roblox.com/headshot-thumbnail/image?userId=${userId}&width=420&height=420&format=png`);

  const material = new THREE.MeshBasicMaterial({map:texture});
  const cube = new THREE.Mesh(geometry, material);

  scene.add(cube);

  camera.position.z = 5;

  function animate(){
    requestAnimationFrame(animate);
    cube.rotation.y += 0.01;
    renderer.render(scene,camera);
  }
  animate();
}

// ================= START =================
function start(){
  getStats();
  loadAvatar();
  setInterval(getStats,10000);
}

start();
