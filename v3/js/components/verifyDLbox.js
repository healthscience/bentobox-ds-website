class FileVerifier extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.isDragging = false;
    this.fileName = '';
    this.status = null; // 'processing', 'success', 'mismatch', 'error'
  }

  static get observedAttributes() {
    return ['expected-hash'];
  }

  get expectedHash() {
    return this.getAttribute('expected-hash') || 'cc1acfc5f91a51ae42fa7e88ff0194d8d70805e0eb8a9bb791520617da4dbd8b';
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  setupEventListeners() {
    const dropZone = this.shadowRoot.getElementById('drop-zone');

    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      this.isDragging = true;
      dropZone.classList.add('is-dragging');
    });

    dropZone.addEventListener('dragleave', () => {
      this.isDragging = false;
      dropZone.classList.remove('is-dragging');
    });

    dropZone.addEventListener('drop', async (e) => {
      e.preventDefault();
      this.isDragging = false;
      dropZone.classList.remove('is-dragging');

      const file = e.dataTransfer.files[0];
      if (!file) return;

      this.fileName = file.name;
      this.updateStatus('processing');

      try {
        // Local streaming directly to the native Web Crypto API
        const buffer = await file.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
        
        // Convert the binary stream into a readable hex character string
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const calculatedHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

        if (calculatedHash.toLowerCase() === this.expectedHash.toLowerCase()) {
          this.updateStatus('success');
        } else {
          this.updateStatus('mismatch');
        }
      } catch (err) {
        this.updateStatus('error');
      }
    });
  }

  updateStatus(state) {
    this.status = state;
    const resultBox = this.shadowRoot.getElementById('verify-result');
    const dropText = this.shadowRoot.getElementById('drop-text');
    
    dropText.textContent = this.fileName;
    resultBox.className = `result-box status-${state}`;
    resultBox.style.display = 'block';

    if (state === 'processing') {
      resultBox.innerHTML = '<em>Analyzing file blocks and calculating SHA-256 hash...</em>';
    } else if (state === 'success') {
      resultBox.innerHTML = '<strong>✓ Verified Authentic</strong><br>The file matches the official cryptographic ledger entry exactly. No corruption or modifications detected.';
    } else if (state === 'mismatch') {
      resultBox.innerHTML = '<strong>⚠️ Hash Mismatch Warning</strong><br>The local file checksum does not match our recorded release. The download may be incomplete or modified.';
    } else if (state === 'error') {
      resultBox.innerHTML = 'Unable to process file verification locally in this browser context.';
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          max-width: 500px;
          font-family: sans-serif;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 24px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
          box-sizing: border-box;
        }
        h3 {
          margin-top: 0;
          margin-bottom: 8px;
          font-size: 18px;
          color: #333;
        }
        .description {
          font-size: 14px;
          color: #666;
          margin-bottom: 20px;
          line-height: 1.4;
        }
        .drop-zone {
          border: 2px dashed #b4b4b4;
          border-radius: 6px;
          padding: 32px 16px;
          text-align: center;
          cursor: pointer;
          background: #fafafa;
          transition: background 0.2s, border-color 0.2s;
        }
        .drop-zone.is-dragging {
          background: #f0f4f8;
          border-color: #0066cc;
        }
        .drop-text {
          font-size: 15px;
          color: #555;
          font-weight: 500;
          word-break: break-all;
        }
        .result-box {
          margin-top: 20px;
          font-size: 14px;
          line-height: 1.5;
          padding: 12px;
          border-radius: 6px;
          display: none;
        }
        .status-processing {
          background: #f5f5f5;
          color: #333;
          border: 1px solid #e0e0e0;
        }
        .status-success {
          background: #edf7ed;
          color: #1e4620;
          border: 1px solid #c3e6cb;
        }
        .status-mismatch {
          background: #fdf2f2;
          color: #611a1a;
          border: 1px solid #f5c6cb;
        }
        .status-error {
          background: #fff3cd;
          color: #664d03;
          border: 1px solid #ffeeba;
        }
      </style>
      <div class="verifier-container">
        <h3>Integrity Verification</h3>
        <p class="description">
          Drag and drop your downloaded installer below to verify it bit-for-bit against the official ledger release.
        </p>
        <div id="drop-zone" class="drop-zone">
          <span id="drop-text" class="drop-text">Drop installer file here to check</span>
        </div>
        <div id="verify-result" class="result-box"></div>
      </div>
    `;
  }
}

// Define the custom tag element
customElements.define('file-verifier', FileVerifier);