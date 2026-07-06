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
        touch-action: none; /* Touch events ke liye zaroori */
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
        touch-action: none; /* Header pe bhi touch action disable */
    }
    .uiz-title{font-size:15px;font-weight:700;letter-spacing:.3px;pointer-events:none;}
    .uiz-close,.uiz-minimize{
        width:30px;height:30px;border:none;border-radius:50%;
        background:rgba(255,255,255,.08);color:#fff;
        cursor:pointer;font-size:18px;transition:.2s;
        margin-left:5px;
        pointer-events:auto; /* Buttons pe events enable */
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

  // ✅ DESKTOP & MOBILE DONO KE LIYE DRAG SUPPORT
  let isDragging = false;
  let startX, startY, initialLeft, initialTop;
  const header = box.querySelector(".uiz-header");
  
  function onDragStart(e) {
    // Buttons pe drag nahi hoga
    if (e.target.closest('button')) return;
    
    isDragging = true;
    
    // Mouse ya touch position lein
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
    
    startX = clientX;
    startY = clientY;
    
    const rect = box.getBoundingClientRect();
    initialLeft = rect.left;
    initialTop = rect.top;
    
    box.style.transition = "none";
    box.style.right = "auto"; // right se left me convert karo
    box.style.left = initialLeft + "px";
    box.style.top = initialTop + "px";
  }
  
  function onDragMove(e) {
    if (!isDragging) return;
    
    e.preventDefault(); // Mobile pe scroll rokne ke liye
    
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
    
    const deltaX = clientX - startX;
    const deltaY = clientY - startY;
    
    let newLeft = initialLeft + deltaX;
    let newTop = initialTop + deltaY;
    
    // Screen ke boundaries me rakhein
    const maxLeft = window.innerWidth - box.offsetWidth;
    const maxTop = window.innerHeight - box.offsetHeight;
    
    newLeft = Math.max(0, Math.min(newLeft, maxLeft));
    newTop = Math.max(0, Math.min(newTop, maxTop));
    
    box.style.left = newLeft + "px";
    box.style.top = newTop + "px";
  }
  
  function onDragEnd() {
    isDragging = false;
    box.style.transition = "0.2s";
  }
  
  // 🖥️ Desktop Events
  header.addEventListener("mousedown", onDragStart);
  document.addEventListener("mousemove", onDragMove);
  document.addEventListener("mouseup", onDragEnd);
  
  // 📱 Mobile Events
  header.addEventListener("touchstart", onDragStart, { passive: false });
  document.addEventListener("touchmove", onDragMove, { passive: false });
  document.addEventListener("touchend", onDragEnd);
})();
