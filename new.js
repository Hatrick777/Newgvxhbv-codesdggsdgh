(() => {
  if (document.getElementById("uiz-floating-tool")) return;

  const style = document.createElement("style");
  style.textContent = `
    #uiz-floating-tool{
        position:fixed;
        top:20px;
        right:20px;
        width:350px;
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
        max-height: 700px;
        display: flex;
        flex-direction: column;
        cursor: default;
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
        flex-shrink: 0;
        user-select: none;
    }
    .uiz-title{font-size:15px;font-weight:700;letter-spacing:.3px;}
    .uiz-close,.uiz-minimize{
        width:30px;height:30px;border:none;border-radius:50%;
        background:rgba(255,255,255,.08);color:#fff;
        cursor:pointer;font-size:18px;transition:.2s;
        margin-left:5px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }
    .uiz-close:hover{background:#ff4d4f;}
    .uiz-minimize:hover{background:rgba(255,255,255,0.2);}
    .uiz-body{
        padding:18px;
        overflow-y: auto;
        flex: 1;
    }
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
        margin-bottom:12px;
    }
    .uiz-btn:hover{transform:translateY(-2px);filter:brightness(1.08);}
    .uiz-btn:active{transform:scale(.98);}
    .uiz-result{
        margin-top:12px;padding:12px;
        background:rgba(255,255,255,0.08);border-radius:8px;
        font-size:14px;min-height:40px;word-wrap:break-word;
        display:none;
    }
    .uiz-char-count {
        text-align: right;
        font-size: 12px;
        color: #888;
        margin-top: -8px;
        margin-bottom: 12px;
    }
    .uiz-history-item {
        padding: 8px 12px;
        background: rgba(255,255,255,0.05);
        border-radius: 6px;
        margin-bottom: 6px;
        font-size: 13px;
        cursor: pointer;
        transition: 0.2s;
        border-left: 3px solid #4f8cff;
    }
    .uiz-history-item:hover {
        background: rgba(255,255,255,0.1);
    }
    .uiz-history-item .uiz-history-time {
        font-size: 10px;
        color: #666;
        float: right;
    }
    .uiz-history-clear {
        background: none;
        border: none;
        color: #ff4d4f;
        cursor: pointer;
        font-size: 12px;
        padding: 4px 8px;
        border-radius: 4px;
        transition: 0.2s;
    }
    .uiz-history-clear:hover {
        background: rgba(255,77,79,0.2);
    }
    .uiz-copy-btn {
        background: rgba(255,255,255,0.1);
        border: none;
        color: #fff;
        padding: 4px 12px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
        margin-top: 8px;
        transition: 0.2s;
    }
    .uiz-copy-btn:hover {
        background: rgba(255,255,255,0.2);
    }
    .uiz-tabs {
        display: flex;
        gap: 8px;
        margin-bottom: 16px;
        border-bottom: 1px solid rgba(255,255,255,0.08);
        padding-bottom: 8px;
    }
    .uiz-tab {
        background: none;
        border: none;
        color: #888;
        padding: 6px 14px;
        cursor: pointer;
        border-radius: 6px;
        font-size: 13px;
        transition: 0.2s;
    }
    .uiz-tab:hover {
        color: #fff;
        background: rgba(255,255,255,0.05);
    }
    .uiz-tab.active {
        color: #fff;
        background: rgba(79,140,255,0.2);
    }
    .uiz-history-list {
        max-height: 200px;
        overflow-y: auto;
    }
    .uiz-html-preview {
        background: rgba(0,0,0,0.3);
        border-radius: 8px;
        padding: 12px;
        margin-top: 12px;
        border: 1px solid rgba(255,255,255,0.1);
        font-family: monospace;
        font-size: 13px;
        min-height: 80px;
    }
    .uiz-html-preview .demo-text {
        background: #ff6b6b;
        padding: 2px 8px;
        border-radius: 4px;
        color: white;
        font-weight: bold;
        display: inline-block;
    }
    .uiz-html-preview .live-text {
        background: #51cf66;
        padding: 2px 8px;
        border-radius: 4px;
        color: white;
        font-weight: bold;
        display: inline-block;
        animation: uizPulse 0.5s ease;
    }
    @keyframes uizPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.3); }
        100% { transform: scale(1); }
    }
    .uiz-status-badge {
        display: inline-block;
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 600;
        margin: 8px 0;
    }
    .uiz-status-demo {
        background: #ff6b6b;
        color: white;
    }
    .uiz-status-live {
        background: #51cf66;
        color: white;
        animation: uizPulse 0.5s ease;
    }
    #updated-html-preview {
        background: rgba(0,0,0,0.2);
        padding: 10px;
        border-radius: 6px;
        margin-top: 8px;
        font-family: monospace;
        font-size: 13px;
        min-height: 60px;
    }
    .uiz-html-container {
        background: rgba(0,0,0,0.2);
        padding: 12px;
        border-radius: 6px;
        margin: 8px 0;
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
        <div class="uiz-tabs">
            <button class="uiz-tab active" data-tab="converter">Converter</button>
            <button class="uiz-tab" data-tab="history">History</button>
            <button class="uiz-tab" data-tab="html">HTML Tools</button>
        </div>
        
        <!-- Converter Tab -->
        <div class="uiz-tab-content" id="converter-tab">
            <div class="uiz-text">Ready to convert your content.</div>
            <input type="text" class="uiz-input" placeholder="Enter text here..." id="main-input">
            <div class="uiz-char-count" id="char-count">0 characters</div>
            <select class="uiz-select" id="convert-type">
                <option value="uppercase">UPPERCASE</option>
                <option value="lowercase">lowercase</option>
                <option value="reverse">Reverse Text</option>
                <option value="capitalize">Capitalize Words</option>
                <option value="count-words">Count Words & Characters</option>
            </select>
            <button class="uiz-btn" id="convert-btn">Convert</button>
            <div class="uiz-result" id="result-box"></div>
        </div>
        
        <!-- History Tab -->
        <div class="uiz-tab-content" id="history-tab" style="display:none;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                <span style="font-size:13px; color:#bdbdbd;">Recent conversions</span>
                <button class="uiz-history-clear" id="clear-history">Clear All</button>
            </div>
            <div class="uiz-history-list" id="history-list">
                <div style="color:#666; font-size:13px; text-align:center; padding:20px;">No history yet</div>
            </div>
        </div>

        <!-- HTML Tools Tab -->
        <div class="uiz-tab-content" id="html-tab" style="display:none;">
            <div class="uiz-text">🛠️ Change "Demo" to "Live" in HTML</div>
            
            <!-- Current HTML Preview -->
            <div style="margin-bottom:12px;">
                <label style="font-size:12px; color:#888; display:block; margin-bottom:4px;">Current HTML:</label>
                <div class="uiz-html-preview" id="html-preview">
                    <div class="zfJUm" flex>
                        <div class="Zt1hG">54,162.00</div>
                        <div class="v2KPX 1TzT1"><span class="demo-text" id="demo-span">Demo</span></div>
                    </div>
                </div>
            </div>

            <!-- Status Badge -->
            <div style="text-align:center; margin:5px 0;">
                <span class="uiz-status-badge uiz-status-demo" id="status-badge">🔴 DEMO</span>
            </div>

            <!-- Buttons -->
            <button class="uiz-btn" id="demo-to-live-btn" style="background:linear-gradient(135deg,#51cf66,#2b8a3e);">
                🔄 Convert "Demo" → "Live"
            </button>
            <button class="uiz-btn" id="reset-demo-btn" style="background:linear-gradient(135deg,#ff6b6b,#c92a2a); margin-top:0;">
                ↩️ Reset to "Demo"
            </button>

            <!-- Updated HTML Result -->
            <div class="uiz-result" id="html-result" style="display:block; background:rgba(0,0,0,0.3); margin-top:12px;">
                <div style="font-size:12px; color:#888; margin-bottom:6px;">📋 Updated HTML:</div>
                <div id="updated-html-preview">
                    <div class="zfJUm" flex>
                        <div class="Zt1hG">54,162.00</div>
                        <div class="v2KPX 1TzT1"><span class="demo-text">Demo</span></div>
                    </div>
                </div>
                <button class="uiz-copy-btn" id="copy-html-btn" style="margin-top:8px;">📋 Copy HTML</button>
            </div>
        </div>
    </div>
  `;

  document.body.appendChild(box);

  // --- State ---
  let history = JSON.parse(localStorage.getItem('uiz_converter_history') || '[]');
  let isMinimized = false;
  let isLive = false;

  // --- Helper Functions ---
  function saveHistory() {
    localStorage.setItem('uiz_converter_history', JSON.stringify(history));
  }

  function addToHistory(original, converted, type) {
    history.unshift({
      original,
      converted,
      type,
      timestamp: new Date().toLocaleString()
    });
    if (history.length > 20) history.pop();
    saveHistory();
    renderHistory();
  }

  function renderHistory() {
    const list = document.getElementById('history-list');
    if (history.length === 0) {
      list.innerHTML = '<div style="color:#666; font-size:13px; text-align:center; padding:20px;">No history yet</div>';
      return;
    }
    list.innerHTML = history.map((item, index) => `
      <div class="uiz-history-item" data-index="${index}">
        <div>
          <strong>${item.converted}</strong>
          <span class="uiz-history-time">${item.timestamp}</span>
        </div>
        <div style="font-size:12px; color:#888; margin-top:4px;">
          ${item.type}: "${item.original.substring(0, 30)}${item.original.length > 30 ? '...' : ''}"
        </div>
      </div>
    `).join('');

    list.querySelectorAll('.uiz-history-item').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.dataset.index);
        const item = history[idx];
        document.getElementById('main-input').value = item.original;
        document.getElementById('convert-type').value = item.type;
        switchTab('converter');
        document.getElementById('convert-btn').click();
      });
    });
  }

  function switchTab(tabName) {
    document.querySelectorAll('.uiz-tab-content').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.uiz-tab').forEach(el => el.classList.remove('active'));
    
    document.getElementById(`${tabName}-tab`).style.display = 'block';
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        const btn = document.querySelector('.uiz-copy-btn');
        if (btn && btn.textContent.includes('Copy')) {
          btn.textContent = '✅ Copied!';
          setTimeout(() => btn.textContent = '📋 Copy HTML', 2000);
        }
      }).catch(() => {
        // Fallback
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Copied!');
  }

  function updateHTMLPreview(isLiveMode) {
    const preview = document.getElementById('updated-html-preview');
    const badge = document.getElementById('status-badge');
    const mainPreview = document.getElementById('html-preview');
    
    // Update main preview
    const mainSpan = mainPreview.querySelector('#demo-span');
    if (mainSpan) {
      mainSpan.textContent = isLiveMode ? 'Live' : 'Demo';
      mainSpan.className = isLiveMode ? 'live-text' : 'demo-text';
    }
    
    // Update result preview
    const htmlContent = `
<div class="zfJUm" flex>
    <div class="Zt1hG">54,162.00</div>
    <div class="v2KPX 1TzT1"><span class="${isLiveMode ? 'live-text' : 'demo-text'}">${isLiveMode ? 'Live' : 'Demo'}</span></div>
</div>`;
    
    preview.innerHTML = htmlContent;
    
    // Update badge
    if (isLiveMode) {
      badge.className = 'uiz-status-badge uiz-status-live';
      badge.textContent = '🟢 LIVE';
    } else {
      badge.className = 'uiz-status-badge uiz-status-demo';
      badge.textContent = '🔴 DEMO';
    }
    
    isLive = isLiveMode;
  }

  // --- Tab Switching ---
  document.querySelectorAll('.uiz-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      switchTab(this.dataset.tab);
    });
  });

  // --- Close Button ---
  box.querySelector(".uiz-close").onclick = function() {
    box.remove();
  };
  
  // --- Minimize Button ---
  box.querySelector(".uiz-minimize").onclick = function() {
    const body = box.querySelector(".uiz-body");
    body.style.display = isMinimized ? "block" : "none";
    isMinimized = !isMinimized;
  };

  // --- Character Counter ---
  document.getElementById('main-input').addEventListener('input', function() {
    document.getElementById('char-count').textContent = this.value.length + ' characters';
  });

  // --- Convert Functionality ---
  document.getElementById('convert-btn').onclick = function() {
    const input = document.getElementById('main-input');
    const select = document.getElementById('convert-type');
    const result = document.getElementById('result-box');
    let text = input.value.trim();
    
    if (!text) {
      alert("Please enter some text!");
      return;
    }
    
    let convertedText = "";
    let conversionType = select.options[select.selectedIndex].text;
    
    switch(select.value) {
      case "uppercase": 
        convertedText = text.toUpperCase(); 
        break;
      case "lowercase": 
        convertedText = text.toLowerCase(); 
        break;
      case "reverse": 
        convertedText = text.split("").reverse().join(""); 
        break;
      case "capitalize": 
        convertedText = text.split(" ").map(word => 
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join(" ");
        break;
      case "count-words": 
        const words = text.split(/\s+/).filter(w => w.length > 0);
        convertedText = '📊 Words: ' + words.length + ' | Characters: ' + text.length + ' (without spaces: ' + text.replace(/\s/g, '').length + ')';
        break;
    }
    
    result.style.display = "block";
    result.innerHTML = '<strong>Result:</strong> ' + convertedText;
    
    if (select.value !== 'count-words') {
      const copyBtn = document.createElement('button');
      copyBtn.className = 'uiz-copy-btn';
      copyBtn.textContent = '📋 Copy Result';
      copyBtn.onclick = function() {
        copyToClipboard(convertedText);
      };
      result.appendChild(copyBtn);
      addToHistory(text, convertedText, conversionType);
    }
  };

  // --- Clear History ---
  document.getElementById('clear-history').onclick = function() {
    if (confirm('Clear all history?')) {
      history = [];
      saveHistory();
      renderHistory();
    }
  };

  // --- Enter key to convert ---
  document.getElementById('main-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      document.getElementById('convert-btn').click();
    }
  });

  // --- DEMO TO LIVE CONVERTER ---
  document.getElementById('demo-to-live-btn').onclick = function() {
    updateHTMLPreview(true);
    
    const result = document.getElementById('html-result');
    result.style.borderLeft = '3px solid #51cf66';
    
    // Animation effect
    const previewDiv = document.getElementById('updated-html-preview');
    previewDiv.style.animation = 'none';
    setTimeout(function() {
      previewDiv.style.animation = 'uizPulse 0.5s ease';
    }, 10);
  };

  document.getElementById('reset-demo-btn').onclick = function() {
    updateHTMLPreview(false);
    
    const result = document.getElementById('html-result');
    result.style.borderLeft = '3px solid #ff6b6b';
    
    const previewDiv = document.getElementById('updated-html-preview');
    previewDiv.style.animation = 'none';
    setTimeout(function() {
      previewDiv.style.animation = 'uizPulse 0.5s ease';
    }, 10);
  };

  // --- Copy HTML Button ---
  document.getElementById('copy-html-btn').onclick = function() {
    const htmlContent = document.getElementById('updated-html-preview').innerHTML;
    copyToClipboard(htmlContent);
  };

  // --- Initialize ---
  renderHistory();
  updateHTMLPreview(false);

  // --- DRAG FEATURE (FIXED) ---
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;
  const header = box.querySelector(".uiz-header");
  
  header.addEventListener("mousedown", function(e) {
    // Only allow drag on header, not on buttons
    if (e.target.closest('button')) return;
    
    isDragging = true;
    const rect = box.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    box.style.transition = "none";
    box.style.cursor = "grabbing";
    e.preventDefault();
  });

  document.addEventListener("mousemove", function(e) {
    if (!isDragging) return;
    
    let left = e.clientX - offsetX;
    let top = e.clientY - offsetY;
    
    // Keep within viewport
    left = Math.max(0, Math.min(left, window.innerWidth - box.offsetWidth));
    top = Math.max(0, Math.min(top, window.innerHeight - box.offsetHeight));
    
    box.style.left = left + "px";
    box.style.top = top + "px";
    box.style.right = "auto";
    box.style.bottom = "auto";
  });

  document.addEventListener("mouseup", function() {
    if (isDragging) {
      isDragging = false;
      box.style.transition = "0.2s";
      box.style.cursor = "default";
    }
  });

})();
