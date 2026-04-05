const userId = 8941948601;

// ===== FETCH ROBLOX (FIX CORS)
async function getStats(){
  try{
    const proxy = "https://corsproxy.io/?";

    const friends = await fetch(proxy + `https://friends.roblox.com/v1/users/${userId}/friends/count`).then(r=>r.json());
    const followers = await fetch(proxy + `https://friends.roblox.com/v1/users/${userId}/followers/count`).then(r=>r.json());
    const following = await fetch(proxy + `https://friends.roblox.com/v1/users/${userId}/followings/count`).then(r=>r.json());

    document.getElementById("friends").innerText = friends.count;
    document.getElementById("followers").innerText = followers.count;
    document.getElementById("following").innerText = following.count;

  }catch(e){
    console.log("ERROR API:", e);
  }
}

// ===== AVATAR 3D
function loadAvatar(){

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 350/450, 0.1, 1000);

  const renderer = new THREE.WebGLRenderer({alpha:true});
  renderer.setSize(350,450);
  document.getElementById("avatar").appendChild(renderer.domElement);

  const light = new THREE.AmbientLight(0xffffff,1.5);
  scene.add(light);

  const loader = new THREE.GLTFLoader();

  loader.load("avatar.glb", (gltf)=>{
    const model = gltf.scene;
    model.scale.set(2,2,2);
    scene.add(model);

    function animate(){
      requestAnimationFrame(animate);
      model.rotation.y += 0.01;
      renderer.render(scene,camera);
    }
    animate();
  });

  camera.position.z = 5;
}

// ===== START
function start(){
  getStats();
  loadAvatar();
  setInterval(getStats,10000);
}

start();