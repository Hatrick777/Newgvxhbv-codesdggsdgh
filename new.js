(() => {
  if (document.getElementById("uiz-floating-tool")) return;

  const style = document.createElement("style");
  style.textContent = `
    #uiz-floating-tool{
        position:fixed;
        top:20px;
        right:20px;
        width:270px;
        background:rgba(20,20,25,.92);
        backdrop-filter:blur(18px);
        -webkit-backdrop-filter:blur(18px);
        border:1px solid rgba(255,255,255,.12);
        border-radius:18px;
        box-shadow:0 20px 50px rgba(0,0,0,.35);
        font-family:Inter,Arial,sans-serif;
        color:#fff;
        z-index:2147483647;
        overflow:hidden;
        animation:uizFade .25s ease;
    }
    @keyframes uizFade{
        from{opacity:0;transform:translateY(-12px) scale(.95)}
        to{opacity:1;transform:translateY(0) scale(1)}
    }
    #uiz-floating-tool *{box-sizing:border-box;}
    .uiz-header{
        display:flex;
        align-items:center;
        justify-content:space-between;
        padding:14px 16px;
        border-bottom:1px solid rgba(255,255,255,.08);
        cursor:move;
    }
    .uiz-title{font-size:15px;font-weight:700;letter-spacing:.3px;}
    .uiz-close,.uiz-minimize{
        width:30px;height:30px;border:none;border-radius:50%;
        background:rgba(255,255,255,.08);color:#fff;
        cursor:pointer;font-size:18px;transition:.2s;
        margin-left:5px;
    }
    .uiz-close:hover{background:#ff4d4f;}
    .uiz-minimize:hover{background:rgba(255,255,255,0.2);}
    .uiz-body{padding:18px;}
    .uiz-text{color:#bdbdbd;font-size:13px;margin-bottom:16px;line-height:1.5;}
    .uiz-input,.uiz-select{
        width:100%;padding:10px;margin-bottom:12px;
        border-radius:8px;border:1px solid rgba(255,255,255,0.2);
        background:rgba(255,255,255,0.1);color:white;
        font-size:14px;outline:none;
    }
    .uiz-input:focus,.uiz-select:focus{border-color:#4f8cff;}
    .uiz-select{cursor:pointer;}
    .uiz-btn{
        width:100%;border:none;cursor:pointer;border-radius:12px;
        padding:13px;font-size:15px;font-weight:700;color:#fff;
        background:linear-gradient(135deg,#4f8cff,#7d5cff);
        transition:.25s;box-shadow:0 10px 25px rgba(79,140,255,.35);
    }
    .uiz-btn:hover{transform:translateY(-2px);filter:brightness(1.08);}
    .uiz-btn:active{transform:scale(.98);}
    .uiz-result{
        margin-top:12px;padding:12px;
        background:rgba(255,255,255,0.08);border-radius:8px;
        font-size:14px;min-height:40px;word-wrap:break-word;
        display:none;
    }
  `;
  document.head.appendChild(style);

  const box = document.createElement("div");
  box.id = "uiz-floating-tool";
  
  box.innerHTML = `
    <div class="uiz-header">
        <div class="uiz-title">⚡ Converter Tool</div>
        <div>
            <button class="uiz-minimize">_</button>
            <button class="uiz-close">&times;</button>
        </div>
    </div>
    <div class="uiz-body">
        <div class="uiz-text">Ready to convert your content.</div>
        <input type="text" class="uiz-input" placeholder="Enter text here...">
        <select class="uiz-select">
            <option value="uppercase">UPPERCASE</option>
            <option value="lowercase">lowercase</option>
            <option value="reverse">Reverse Text</option>
        </select>
        <button class="uiz-btn">Convert</button>
        <div class="uiz-result"></div>
    </div>
  `;

  document.body.appendChild(box);

  // Close button
  box.querySelector(".uiz-close").onclick = () => box.remove();
  
  // Minimize button
  let isMinimized = false;
  box.querySelector(".uiz-minimize").onclick = () => {
    const body = box.querySelector(".uiz-body");
    body.style.display = isMinimized ? "block" : "none";
    isMinimized = !isMinimized;
  };

  // Convert functionality
  box.querySelector(".uiz-btn").onclick = () => {
    const input = box.querySelector(".uiz-input");
    const select = box.querySelector(".uiz-select");
    const result = box.querySelector(".uiz-result");
    let text = input.value.trim();
    
    if (!text) {
      alert("Please enter some text!");
      return;
    }
    
    let convertedText = "";
    switch(select.value) {
      case "uppercase": convertedText = text.toUpperCase(); break;
      case "lowercase": convertedText = text.toLowerCase(); break;
      case "reverse": convertedText = text.split("").reverse().join(""); break;
    }
    
    result.style.display = "block";
    result.innerHTML = `<strong>Result:</strong> ${convertedText}`;
  };

  // Drag feature
  let isDragging = false, offsetX, offsetY;
  const header = box.querySelector(".uiz-header");
  
  header.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - box.getBoundingClientRect().left;
    offsetY = e.clientY - box.getBoundingClientRect().top;
    box.style.transition = "none";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    box.style.left = (e.clientX - offsetX) + "px";
    box.style.top = (e.clientY - offsetY) + "px";
    box.style.right = "auto";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    box.style.transition = "0.2s";
  });
})();
