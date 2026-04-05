const userId = 8941948601;

// ===== STATS (WORKING FIX)
async function getStats(){
  try{
    const proxy = "https://corsproxy.io/?";

    const f1 = await fetch(proxy + `https://friends.roblox.com/v1/users/${userId}/friends/count`).then(r=>r.json());
    const f2 = await fetch(proxy + `https://friends.roblox.com/v1/users/${userId}/followers/count`).then(r=>r.json());
    const f3 = await fetch(proxy + `https://friends.roblox.com/v1/users/${userId}/followings/count`).then(r=>r.json());

    document.getElementById("friends").innerText = f1.count;
    document.getElementById("followers").innerText = f2.count;
    document.getElementById("following").innerText = f3.count;

  }catch(e){
    console.log("ERROR:", e);
  }
}

// ===== AVATAR ROBLOX (PASTI MUNCUL)
function loadAvatar(){
  const avatar = document.getElementById("avatar");

  avatar.src = `https://thumbnails.roblox.com/v1/users/avatar?userIds=${userId}&size=720x720&format=Png&isCircular=false`;

  // FIX response JSON
  fetch(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${userId}&size=720x720&format=Png&isCircular=false`)
    .then(res=>res.json())
    .then(data=>{
      avatar.src = data.data[0].imageUrl;
    });
}

// ===== INIT
function start(){
  getStats();
  loadAvatar();
  setInterval(getStats,10000);
}

start();
