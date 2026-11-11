/**
 * ==========================================================================
 * MUH. ARIEL ANUGRAH — PERSONAL PORTFOLIO
 * Main Interactive Scripts
 * Framework Reference: landing-page-design (Part B7 Motion & B9 States)
 * ==========================================================================
 */

/**
 * Global Contact & Identity Configuration
 * Informasi kontak resmi Muh. Ariel Anugrah.
 */
window.PORTFOLIO_CONFIG = {
  whatsappNumber: '62895635301360', // Nomor resmi WhatsApp (format internasional)
  whatsappUrl: 'https://wa.me/62895635301360',
  emailAddress: 'muharielanugrah08@gmail.com',
  githubUrl: 'https://github.com/muharielanugrah',
  instagramUrl: 'https://www.instagram.com/arielanugrahh_/',
  linkedinUrl: null // Belum tersedia (ditampilkan transparan / disembunyikan)
};

document.addEventListener('DOMContentLoaded', () => {
  initDynamicContactConfig();
  initTaglineReveal();
  initScrollReveal();
  initMobileMenu();
  initScrollSpy();
  initTerminalSimulator();
  initContactForm();
  initModals();
  initImageLightbox();
  initVideoPlayer();
});

/**
 * 0. Dynamic Contact Config Initializer
 * Menghubungkan konfigurasi kontak terpusat ke seluruh tombol & tautan halaman.
 */
function initDynamicContactConfig() {
  if (!window.PORTFOLIO_CONFIG) return;
  const { emailAddress, githubUrl, whatsappUrl, instagramUrl } = window.PORTFOLIO_CONFIG;

  if (emailAddress) {
    document.querySelectorAll('a[href^="mailto:"]').forEach(a => {
      a.href = `mailto:${emailAddress}`;
      a.setAttribute('aria-label', `Kirim surel ke ${emailAddress}`);
    });
  }
  if (githubUrl) {
    document.querySelectorAll('a[href="https://github.com"]').forEach(a => {
      a.href = githubUrl;
    });
  }
  if (whatsappUrl) {
    document.querySelectorAll('a[href^="https://wa.me/"]').forEach(a => {
      a.href = whatsappUrl;
    });
  }
  if (instagramUrl) {
    document.querySelectorAll('a[href*="instagram.com"]').forEach(a => {
      a.href = instagramUrl;
    });
  }
}

/**
 * 1. Mandatory Tagline Word-by-Word Scroll Reveal (Part B11)
 * Splits text into individual spans and changes color progressively on scroll.
 */
function initTaglineReveal() {
  const taglineElement = document.getElementById('taglineRevealText');
  if (!taglineElement) return;

  const originalText = taglineElement.innerText.trim();
  const words = originalText.split(/\s+/);
  taglineElement.innerHTML = words.map(w => `<span class="tagline-word">${w}</span>`).join(' ');

  const wordSpans = taglineElement.querySelectorAll('.tagline-word');

  const updateTaglineProgress = () => {
    const rect = taglineElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate progress as element crosses trigger threshold
    const progress = Math.min(Math.max((windowHeight - rect.top) / (windowHeight * 0.75), 0), 1);
    const activeWordCount = Math.floor(progress * wordSpans.length);

    wordSpans.forEach((span, index) => {
      if (index < activeWordCount) {
        span.classList.add('active');
      } else {
        span.classList.remove('active');
      }
    });
  };

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateTaglineProgress();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  updateTaglineProgress();
}

/**
 * 2. Section Scroll Reveals (Part B7)
 * Triggered once per section using IntersectionObserver on base curve.
 */
function initScrollReveal() {
  const revealItems = document.querySelectorAll('.reveal-item');
  if (!revealItems.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target); // Reveal once only per B7
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealItems.forEach(item => observer.observe(item));
  } else {
    // Fallback for browsers without IntersectionObserver
    revealItems.forEach(item => item.classList.add('revealed'));
  }
}

/**
 * 3. Mobile Navigation Menu Toggle (Part B7)
 */
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenuPanel = document.getElementById('mobileMenuPanel');
  const menuIcon = document.getElementById('menuIcon');

  if (!mobileMenuBtn || !mobileMenuPanel || !menuIcon) return;

  const toggleMenu = () => {
    const isHidden = mobileMenuPanel.classList.contains('hidden');
    if (isHidden) {
      mobileMenuPanel.classList.remove('hidden');
      mobileMenuPanel.classList.add('flex');
      menuIcon.className = 'ph ph-x text-base';
      mobileMenuBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    } else {
      mobileMenuPanel.classList.add('hidden');
      mobileMenuPanel.classList.remove('flex');
      menuIcon.className = 'ph ph-list text-base';
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  };

  mobileMenuBtn.addEventListener('click', toggleMenu);

  // Close when clicking any nav link inside mobile panel
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuPanel.classList.add('hidden');
      mobileMenuPanel.classList.remove('flex');
      menuIcon.className = 'ph ph-list text-base';
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

/**
 * 4. Active Nav Item Indicator / ScrollSpy
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav .nav-link');
  if (!sections.length || !navLinks.length) return;

  const handleScrollSpy = () => {
    const scrollPosition = window.scrollY + 160;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active-nav');
          } else {
            link.classList.remove('active-nav');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', handleScrollSpy, { passive: true });
  handleScrollSpy();
}

/**
 * 5. Interactive Terminal Simulator
 * Allows visitors to click commands and see live responses.
 */
function initTerminalSimulator() {
  const termOutput = document.getElementById('terminalOutput');
  const cmdButtons = document.querySelectorAll('.term-cmd-btn');
  if (!termOutput || !cmdButtons.length) return;

  const commandResponses = {
    'audit': `
<div class="p-3 bg-[#0F172A] border border-[#1E293B] rounded-md text-[11px] text-gray-300 font-mono mt-1">
  <span class="text-emerald-400 font-semibold">[PASS] Security Check:</span> Semua masukan formulir menerapkan sanitasi XSS.<br>
  <span class="text-emerald-400 font-semibold">[PASS] Parameterized Queries:</span> Perlindungan injeksi database aktif.<br>
  <span class="text-emerald-400 font-semibold">[PASS] Transport Security:</span> Header HSTS dan validasi TLS terverifikasi.
</div>`,
    'skills': `
<div class="p-3 bg-[#0F172A] border border-[#1E293B] rounded-md text-[11px] text-gray-300 font-mono mt-1">
  <span class="text-[#38BDF8] font-semibold">Core Capabilities:</span><br>
  • Cyber Defense: OWASP Top 10, Pen Testing Dasar, Wireshark, Burp Suite<br>
  • Engineering: PHP 8+, Laravel Framework, Python Scripting, RESTful API<br>
  • Data: MySQL/PostgreSQL Normalisasi 3NF, Keamanan Skema Relasional
</div>`,
    'status': `
<div class="p-3 bg-[#0F172A] border border-[#1E293B] rounded-md text-[11px] text-gray-300 font-mono mt-1">
  <span class="text-amber-400 font-semibold">Dual Competencies Status:</span><br>
  • <strong class="text-sky-300">Technology &amp; Security:</strong> Mahasiswa SI ITH (Security &amp; System Dev) | Proyek Good Life Parepare &amp; Jaringan Kampus<br>
  • <strong class="text-amber-300">Marching Band &amp; Coaching:</strong> Multitom &amp; Cymbal Player DCM | Pelatih Berprestasi MIMF 2026, BMBC 2024 &amp; Juara 6 Drum Battle JDCI 2025<br>
  • <strong class="text-emerald-300">Ketersediaan:</strong> Terbuka untuk magang industri, audit keamanan sistem, kepelatihan seksi perkusi &amp; klinik marching band
</div>`
  };

  cmdButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      const responseHtml = commandResponses[cmd];
      if (!responseHtml) return;

      // Update button visual states
      cmdButtons.forEach(b => {
        b.classList.remove('bg-[#38BDF8]', 'text-black');
        b.classList.add('bg-[#1E293B]', 'text-gray-300');
      });
      btn.classList.add('bg-[#38BDF8]', 'text-black');
      btn.classList.remove('bg-[#1E293B]', 'text-gray-300');

      termOutput.innerHTML = `
        <div class="flex items-start gap-2">
          <span class="text-[#38BDF8] select-none">$</span>
          <div>
            <span class="text-white font-mono">run --module ${cmd}</span>
            ${responseHtml}
          </div>
        </div>
      `;
    });
  });

  // Trigger default active command on initial load
  const defaultBtn = document.querySelector('.term-cmd-btn[data-cmd="audit"]');
  if (defaultBtn) {
    defaultBtn.click();
  }
}

/**
 * 6. Interactive Contact Form with Client-Side Validation (Part B9 & B10)
 */
function initContactForm() {
  const contactForm = document.getElementById('portfolioContactForm');
  const contactFeedback = document.getElementById('contactFeedback');
  const sendBtn = document.getElementById('sendBtn');

  if (!contactForm || !contactFeedback || !sendBtn) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('senderName');
    const contactInput = document.getElementById('senderContact');
    const messageInput = document.getElementById('senderMessage');
    const inquiryInput = document.getElementById('inquiryType');

    const name = nameInput ? nameInput.value.trim() : '';
    const contact = contactInput ? contactInput.value.trim() : '';
    const message = messageInput ? messageInput.value.trim() : '';
    const inquiryText = inquiryInput && inquiryInput.options[inquiryInput.selectedIndex] ? inquiryInput.options[inquiryInput.selectedIndex].text : 'Diskusi Proyek';

    // Validation
    if (!name || !contact || !message) {
      contactFeedback.textContent = '[ERROR] Harap lengkapi semua kolom formulir dengan benar.';
      contactFeedback.className = 'text-xs py-2 px-3 rounded-lg bg-red-950/70 border border-red-800 text-red-300 block font-mono';
      return;
    }

    // Loading State
    sendBtn.disabled = true;
    sendBtn.innerHTML = '<i class="ph ph-spinner animate-spin text-base"></i><span>[PROCESSING] Menyiapkan pesan...</span>';

    setTimeout(() => {
      contactFeedback.textContent = '[OK] Pesan siap! Membuka kanal komunikasi langsung WhatsApp...';
      contactFeedback.className = 'text-xs py-2 px-3 rounded-lg bg-emerald-950/70 border border-emerald-800 text-emerald-300 block font-mono';

      const targetPhone = (window.PORTFOLIO_CONFIG && window.PORTFOLIO_CONFIG.whatsappNumber) || '62895635301360';
      const formattedMessage = `Halo Ariel, saya ${name} (${contact}). Ingin berdiskusi perihal [${inquiryText}]:\n${message}`;
      const encodedUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(formattedMessage)}`;

      setTimeout(() => {
        window.open(encodedUrl, '_blank');
        sendBtn.disabled = false;
        sendBtn.innerHTML = '<i class="ph ph-paper-plane text-base"></i><span>Kirimkan Pesan Langsung</span>';
      }, 700);
    }, 600);
  });
}

/**
 * 7. Interactive Modals (Project Case Studies & Resume Viewer)
 */
function initModals() {
  const projectModal = document.getElementById('projectModal');
  const resumeModal = document.getElementById('resumeModal');
  const openResumeBtn = document.getElementById('openResumeBtn');
  const printResumeBtn = document.getElementById('printResumeBtn');
  const projectModalTitle = document.getElementById('projectModalTitle');
  const projectModalCategory = document.getElementById('projectModalCategory');
  const projectModalContent = document.getElementById('projectModalContent');
  const projectModalRepoLink = document.getElementById('projectModalRepoLink');

  const projectDetails = {
    'goodlife': {
      title: 'Good Life — Sistem Pemesanan Online Berbasis Web',
      category: 'CYBER SECURITY & SYSTEM DEVELOPMENT',
      status: 'In Development (Draft SRS v1.1)',
      role: 'Cyber Security Analyst',
      team: 'Muhammad Dirga Sopan (EIS) & Muhammad Ariel Anugrah (Security)',
      campus: 'Institut Teknologi Bacharuddin Jusuf Habibie (ITH)',
      tags: ['PHP 8.2+', 'MariaDB 10.6+', 'STRIDE Model', 'OWASP Top 10', 'Leaflet JS', 'DOKU QRIS', 'Bcrypt', 'Anti-CSRF', 'Figma'],
      repo: 'https://www.figma.com/design/CPlRYBDxCqqPoF4b3UfFSl/Good-Life?node-id=0-1&t=Kdjp5XDRUuiJHWSF-1',
      linkLabel: 'Buka Desain Mockup UI (Figma)',
      body: `
        <div class="space-y-6 text-sm text-gray-300">
          
          <!-- Metadata Summary Card -->
          <div class="p-4 bg-[#060A12] border border-[#1E293B] rounded-xl font-mono text-xs space-y-2">
            <div class="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#1E293B]">
              <span class="text-[#38BDF8] font-semibold">// INFORMASI PROYEK &amp; AKADEMIK</span>
              <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px]">
                STATUS: IN DEVELOPMENT (DRAFT SRS v1.1 - 11/11/2026)
              </span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-300 pt-1">
              <div><strong class="text-white">Peran Saya:</strong> <span class="text-[#38BDF8]">Cyber Security Analyst</span> (Konsentrasi Cyber Security, NIM 241031014)</div>
              <div><strong class="text-white">Tim Proyek:</strong> Kelompok Ecyith (Muh. Dirga Sopan - NIM 241031013 [EIS] &amp; Muh. Ariel Anugrah)</div>
              <div><strong class="text-white">Institusi:</strong> Institut Teknologi Bacharuddin Jusuf Habibie (ITH)</div>
              <div><strong class="text-white">Program Studi:</strong> Sistem Informasi, Jurusan Sains</div>
              <div><strong class="text-white">Mitra Usaha:</strong> Hamlia Hamid (Pemilik Good Life Parepare)</div>
              <div><strong class="text-white">Dosen Pengampu:</strong> A. Inayah Auliyah, S.Kom., M.T. (Software Testing &amp; QA)</div>
            </div>
          </div>

          <!-- Section: Overview & Business Problem -->
          <div>
            <h4 class="text-xs font-mono uppercase text-[#38BDF8] tracking-wider mb-2 font-semibold">// LATAR BELAKANG &amp; RINGKASAN SISTEM</h4>
            <p class="leading-relaxed mb-2 text-gray-300">
              Good Life merupakan proyek perancangan dan pengembangan sistem pemesanan online kuliner terintegrasi untuk gerai <strong>Good Life Parepare</strong> (Jl. H. Jamil Ismail, Parepare). Sistem ini memadukan pendekatan <em>Enterprise Architecture</em> (konsentrasi EIS) untuk efisiensi operasional dengan rekayasa <em>Keamanan Sistem Informasi</em> (konsentrasi Cyber Security).
            </p>
            <p class="leading-relaxed text-gray-400">
              Sistem ini mengatasi masalah pencatatan manual via nota kertas dan chat WhatsApp yang selama ini memicu kekeliruan pesanan hingga 12% pada jam sibuk, waktu tunggu konfirmasi 15–20 menit, ketidakjelasan status stok, dan ongkos kirim kurir yang belum terstandarisasi. Solusi yang dibangun mengintegrasikan rekomendasi menu Simple Additive Weighting (SAW), modul geospasial Leaflet JS &amp; formula Haversine (&times; 1,3), pembayaran DOKU Checkout QRIS dinamis &amp; Tunai/COD (maks Rp200.000), serta pelacakan pesanan real-time 4 tahap.
            </p>
          </div>

          <!-- Section: Specific Contributions as Cyber Security Analyst -->
          <div>
            <h4 class="text-xs font-mono uppercase text-[#38BDF8] tracking-wider mb-2 font-semibold">// KONTRIBUSI SPESIFIK SAYA (CYBER SECURITY ANALYST)</h4>
            <div class="space-y-3">
              
              <div class="p-3.5 bg-[#060A12] border border-[#1E293B] rounded-xl">
                <div class="flex items-center gap-2 mb-1.5 text-white font-semibold text-xs font-mono">
                  <i class="ph ph-shield-check text-[#38BDF8] text-base"></i>
                  <span>1. Security Requirements Analysis (NFR-001 s.d. NFR-011)</span>
                </div>
                <p class="text-xs text-gray-400 leading-relaxed">
                  Menurunkan spesifikasi kebutuhan non-fungsional terukur: ketersediaan layanan &gt;= 99% pada jam operasional gerai (15:00–23:00 WITA), waktu checkout &lt; 90 detik, proteksi otorisasi panel admin 100% anti-bypass, penegakan prinsip <em>Data Minimization</em> (tanpa wajib registrasi akun pelanggan), serta kepatuhan standar aksesibilitas WCAG 2.1 Level AA (kontras warna &gt;= 4,5:1, navigasi keyboard penuh, dan teks alternatif gambar).
                </p>
              </div>

              <div class="p-3.5 bg-[#060A12] border border-[#1E293B] rounded-xl">
                <div class="flex items-center gap-2 mb-1.5 text-white font-semibold text-xs font-mono">
                  <i class="ph ph-lock-key text-emerald-400 text-base"></i>
                  <span>2. Analisis &amp; Mitigasi Risiko Berbasis OWASP Top 10</span>
                </div>
                <ul class="text-xs text-gray-400 space-y-1 list-disc list-inside">
                  <li><strong class="text-gray-200">A01 Broken Access Control:</strong> Middleware otorisasi sesi RBAC (<code class="text-sky-300">admin_api_guard()</code>) pada seluruh route <code class="text-sky-300">/admin/*</code> serta proteksi berkas sensitif melalui aturan <code class="text-sky-300">.htaccess</code>.</li>
                  <li><strong class="text-gray-200">A03 Injection:</strong> Mewajibkan 100% pemanggilan query basis data MariaDB/MySQL menggunakan <em>PDO Prepared Statements</em> terparameterisasi.</li>
                  <li><strong class="text-gray-200">A04 Insecure Design:</strong> Validasi ulang seluruh komponen harga item, topping, jarak Haversine, dan tarif ongkir murni di sisi server (<em>server-side recalculation</em>) untuk mengeliminasi manipulasi parameter klien.</li>
                  <li><strong class="text-gray-200">A05 Security Misconfiguration:</strong> Menonaktifkan <code class="text-sky-300">display_errors</code> di produksi, menyembunyikan komentar ulasan lama saat penginputan baru, dan sanitasi berkas media.</li>
                  <li><strong class="text-gray-200">A07 Identification &amp; Auth Failures:</strong> Penyimpanan kata sandi hash Bcrypt di berkas lingkungan <code class="text-sky-300">.env</code>, regenerasi session ID (<code class="text-sky-300">session_regenerate_id</code>), token Anti-CSRF unik per sesi, verifikasi CAPTCHA, dan rate limiting login (maksimal 5 kali percobaan gagal).</li>
                </ul>
              </div>

              <div class="p-3.5 bg-[#060A12] border border-[#1E293B] rounded-xl">
                <div class="flex items-center gap-2 mb-1.5 text-white font-semibold text-xs font-mono">
                  <i class="ph ph-crosshair text-rose-400 text-base"></i>
                  <span>3. STRIDE Threat Modeling pada Data Flow Diagram (DFD)</span>
                </div>
                <p class="text-xs text-gray-400 leading-relaxed mb-2">
                  Mengidentifikasi dan memetakan 6 kategori ancaman Microsoft STRIDE terhadap komponen DFD:
                </p>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] font-mono">
                  <div class="p-2 bg-[#0B101D] rounded border border-[#1E293B]"><span class="text-rose-400 font-bold">Spoofing (S):</span> Auth Bcrypt &amp; CAPTCHA</div>
                  <div class="p-2 bg-[#0B101D] rounded border border-[#1E293B]"><span class="text-amber-400 font-bold">Tampering (T):</span> Server Validation &amp; PDO</div>
                  <div class="p-2 bg-[#0B101D] rounded border border-[#1E293B]"><span class="text-purple-400 font-bold">Repudiation (R):</span> Order ID &amp; Audit Log</div>
                  <div class="p-2 bg-[#0B101D] rounded border border-[#1E293B]"><span class="text-sky-400 font-bold">Info Disclosure (I):</span> .env &amp; Block /data</div>
                  <div class="p-2 bg-[#0B101D] rounded border border-[#1E293B]"><span class="text-yellow-400 font-bold">DoS (D):</span> Rate Limit &amp; Max Upload 5MB</div>
                  <div class="p-2 bg-[#0B101D] rounded border border-[#1E293B]"><span class="text-emerald-400 font-bold">Privilege Escalation (E):</span> RBAC Middleware</div>
                </div>
              </div>

              <div class="p-3.5 bg-[#060A12] border border-[#1E293B] rounded-xl">
                <div class="flex items-center gap-2 mb-1.5 text-white font-semibold text-xs font-mono">
                  <i class="ph ph-tree-structure text-cyan-400 text-base"></i>
                  <span>4. Data Flow Diagram (DFD) &amp; 3 Trust Boundaries</span>
                </div>
                <p class="text-xs text-gray-400 leading-relaxed">
                  Merancang arsitektur aliran data sistem dengan pemisahan 3 batas kepercayaan (*Trust Boundaries*): <strong>Trust Boundary 1</strong> (Zona Publik / Klien Browser), <strong>Trust Boundary 2</strong> (Zona Server Aplikasi Web PHP 8.2+ dengan RBAC, CSRF, dan Validasi OWASP), dan <strong>Trust Boundary 3</strong> (Zona Penyimpanan Basis Data MariaDB/MySQL dan konfigurasi kredensial <code class="text-sky-300">.env</code>).
                </p>
              </div>

              <div class="p-3.5 bg-[#060A12] border border-[#1E293B] rounded-xl">
                <div class="flex items-center gap-2 mb-1.5 text-white font-semibold text-xs font-mono">
                  <i class="ph ph-list-checks text-purple-400 text-base"></i>
                  <span>5. Requirement Traceability Matrix (RTM)</span>
                </div>
                <p class="text-xs text-gray-400 leading-relaxed">
                  Menyusun matriks ketertelusuran kebutuhan 100% yang menghubungkan 16 Fitur Produk (FR-001 s.d. FR-016), 16 Use Case (UC-01 s.d. UC-16), Kriteria Penerimaan berformat Gherkin (*Given-When-Then*), hingga 51 Test Cases (TC-001 s.d. TC-051) guna menjamin seluruh cakupan kebutuhan terverifikasi.
                </p>
              </div>

              <div class="p-3.5 bg-[#060A12] border border-[#1E293B] rounded-xl">
                <div class="flex items-center gap-2 mb-1.5 text-white font-semibold text-xs font-mono">
                  <i class="ph ph-bug-beetle text-amber-400 text-base"></i>
                  <span>6. Security Testing Support</span>
                </div>
                <p class="text-xs text-gray-400 leading-relaxed">
                  Merancang dan menyiapkan 20 kasus uji keamanan khusus (TC-032 s.d. TC-051) menggunakan metode *Equivalence Partitioning* dan *Boundary Value Analysis* (pengujian injeksi SQL pada parameter URL katalog, sanitasi XSS pada catatan pemesanan, validasi MIME/ukuran berkas unggah maks 5 MB, batas pembayaran COD tepat Rp200.000, serta pengujian proteksi forced browsing).
                </p>
              </div>

            </div>
          </div>

          <!-- Section: Authentic Architecture Visualizations -->
          <div>
            <h4 class="text-xs font-mono uppercase text-[#38BDF8] tracking-wider mb-2.5 font-semibold">// DOKUMENTASI VISUAL ARSITEKTUR &amp; KEAMANAN ASLI</h4>
            <div class="space-y-4">
              
              <!-- Diagram 1: DFD STRIDE Trust Boundaries -->
              <div class="p-3 bg-[#060A12] border border-[#1E293B] rounded-xl">
                <div class="flex items-center justify-between pb-2 mb-2 border-b border-[#1E293B]">
                  <span class="text-xs font-mono font-semibold text-white">Gambar A.6 SRS: DFD dengan 3 Zona Trust Boundary (Threat Modeling STRIDE)</span>
                  <span class="text-[10px] font-mono text-[#38BDF8]">ARSITEKTUR RESMI</span>
                </div>
                <a href="assets/images/goodlife/dfd-stride-threat-model.png" target="_blank" rel="noopener noreferrer" title="Klik untuk membuka ukuran penuh">
                  <img src="assets/images/goodlife/dfd-stride-threat-model.png" alt="Data Flow Diagram dengan Tiga Zona Trust Boundary STRIDE" class="w-full h-auto rounded-lg object-contain border border-[#1E293B] hover:border-[#38BDF8] transition-colors">
                </a>
                <p class="text-[11px] text-gray-400 mt-2 font-mono leading-relaxed">
                  Menggambarkan isolasi ketat antar zona: <em>Trust Boundary 1 (Zona Publik/Klien)</em>, <em>Trust Boundary 2 (Zona Server Web PHP dengan RBAC, CSRF, dan Validasi OWASP)</em>, dan <em>Trust Boundary 3 (Zona Database MariaDB &amp; Kredensial .env)</em>.
                </p>
              </div>

              <!-- Diagram 2: ERD 9 Tabel Database -->
              <div class="p-3 bg-[#060A12] border border-[#1E293B] rounded-xl">
                <div class="flex items-center justify-between pb-2 mb-2 border-b border-[#1E293B]">
                  <span class="text-xs font-mono font-semibold text-white">Gambar A.5 SRS: Skema Relasional 9 Tabel Basis Data Terintegrasi</span>
                  <span class="text-[10px] font-mono text-cyan-400">DATABASE ERD</span>
                </div>
                <a href="assets/images/goodlife/erd-database-goodlife.png" target="_blank" rel="noopener noreferrer" title="Klik untuk membuka ukuran penuh">
                  <img src="assets/images/goodlife/erd-database-goodlife.png" alt="Entity Relationship Diagram Basis Data Good Life" class="w-full h-auto rounded-lg object-contain border border-[#1E293B] hover:border-[#38BDF8] transition-colors">
                </a>
                <p class="text-[11px] text-gray-400 mt-2 font-mono leading-relaxed">
                  Skema normalisasi relasional mencakup tabel <code class="text-gray-300">kategori_menu</code>, <code class="text-gray-300">menu</code>, <code class="text-gray-300">pesanan</code>, <code class="text-gray-300">detail_pesanan</code>, <code class="text-gray-300">topping_detail_pesanan</code>, <code class="text-gray-300">ulasan</code> (relasi unik 1:0..1), <code class="text-gray-300">admin</code>, serta <code class="text-gray-300">galeri_profil_toko</code>.
                </p>
              </div>

              <!-- Diagram 3: Use Case Diagram -->
              <div class="p-3 bg-[#060A12] border border-[#1E293B] rounded-xl">
                <div class="flex items-center justify-between pb-2 mb-2 border-b border-[#1E293B]">
                  <span class="text-xs font-mono font-semibold text-white">Gambar A.1 SRS: Use Case Diagram Pemesanan Online (UC-01 s.d. UC-16)</span>
                  <span class="text-[10px] font-mono text-emerald-400">UML USE CASE</span>
                </div>
                <a href="assets/images/goodlife/usecase-goodlife.png" target="_blank" rel="noopener noreferrer" title="Klik untuk membuka ukuran penuh">
                  <img src="assets/images/goodlife/usecase-goodlife.png" alt="Use Case Diagram Good Life Parepare" class="w-full h-auto max-h-96 rounded-lg object-contain border border-[#1E293B] hover:border-[#38BDF8] transition-colors mx-auto">
                </a>
                <p class="text-[11px] text-gray-400 mt-2 font-mono leading-relaxed">
                  Memetakan pemisahan peran aktor Pelanggan (akses publik) dan Admin (akses terproteksi login) pada 16 alur use case sistem.
                </p>
              </div>

            </div>
          </div>

          <!-- Section: Academic Transparency & Integrity -->
          <div class="p-3.5 bg-sky-950/40 border border-sky-800/60 rounded-xl font-mono text-xs text-sky-200">
            <div class="flex items-center gap-1.5 font-bold mb-1 text-white">
              <i class="ph ph-info text-base text-[#38BDF8]"></i>
              <span>Transparansi &amp; Integritas Akademik:</span>
            </div>
            <p class="leading-relaxed">
              Proyek ini berstatus <strong>In Development (Draft SRS v1.1 per 11 November 2026)</strong> dalam mata kuliah Software Testing &amp; Quality Assurance (STQA). Seluruh diagram di atas merupakan dokumentasi teknis asli hasil perancangan tim. Target verifikasi sistem adalah <strong>0 Celah Kritis pada Audit OWASP Top 10</strong> dan pemenuhan 100% dari 51 kasus uji tanpa manipulasi hasil uji.
            </p>
          </div>

        </div>
      `
    },
    'ith-network': {
      title: 'Perancangan Infrastruktur Jaringan Kampus ITH',
      category: 'NETWORK ARCHITECTURE & SIMULATION',
      status: 'Selesai dengan Hasil Sebagian (Evaluasi Akademik)',
      role: 'Cisco Simulation Engineer',
      team: 'Team 2 (Yonatan Rannu - PM, Dirga Sopan - Analyst, Ariel Anugrah - Simulation, Farhan, Rifat, Amanda, Farel)',
      campus: 'Institut Teknologi Bacharuddin Jusuf Habibie (ITH)',
      tags: ['Cisco Packet Tracer', 'IEEE 802.1Q VLAN', 'Router-on-a-Stick', 'DHCP Server', 'Inter-VLAN Routing', 'Cost Analysis'],
      repo: 'https://github.com/muharielanugrah/ith-campus-network',
      linkLabel: 'Buka Repositori Jaringan GitHub',
      body: `
        <div class="space-y-4 text-sm text-gray-300">
          <div class="p-3 bg-[#060A12] border border-[#1E293B] rounded-lg font-mono text-xs space-y-1">
            <span class="text-[#38BDF8] font-bold">// INSTITUT TEKNOLOGI BACHARUDDIN JUSUF HABIBIE (ITH) — TEAM 2</span><br>
            <span class="text-white">Peran: Cisco Simulation Engineer (Muh. Ariel Anugrah - NIM 241031014)</span><br>
            <span class="text-gray-400">Dosen Pembimbing: Nurul Choirunnisa Noor, S.T., M.T. • Program Studi Sistem Informasi</span>
          </div>
          <div>
            <h4 class="text-xs font-mono uppercase text-[#38BDF8] tracking-wider mb-1">Ruang Lingkup &amp; Arsitektur:</h4>
            <p class="leading-relaxed">Perancangan jaringan kampus skala penuh berbasis simulator Cisco Packet Tracer selama 4 minggu yang membagi infrastruktur ke dalam 6 segmen VLAN:</p>
            <ul class="space-y-1 list-disc list-inside text-gray-400 text-xs font-mono mt-2">
              <li>VLAN 10 (ADMIN): 192.168.10.0/24 — Gateway 192.168.10.1</li>
              <li>VLAN 20 (DOSEN): 192.168.20.0/24 — Gateway 192.168.20.1</li>
              <li>VLAN 30 (LAB): 192.168.30.0/24 — Gateway 192.168.30.1</li>
              <li>VLAN 40 (MAHASISWA): 192.168.40.0/24 — Gateway 192.168.40.1</li>
              <li>VLAN 50 (GUEST): 192.168.50.0/24 — Gateway 192.168.50.1</li>
              <li>VLAN 60 (SERVER): 192.168.60.0/24 — Gateway 192.168.60.1</li>
            </ul>
          </div>
          <div>
            <h4 class="text-xs font-mono uppercase text-[#38BDF8] tracking-wider mb-1">Hasil Pengujian &amp; Evaluasi Terbuka:</h4>
            <div class="p-3 bg-[#060A12] border border-[#1E293B] rounded-lg font-mono text-xs space-y-1">
              <span class="text-emerald-400">&gt; Skenario Berhasil:</span> 7 dari 8 Skenario (87.5% PASS — DHCP, Routing, Gateway, Server)<br>
              <span class="text-amber-400">&gt; Temuan Evaluasi (D-04):</span> Pembatasan akses Guest ke jaringan internal belum tervalidasi penuh (Risiko R08 Occurred)<br>
              <span class="text-sky-400">&gt; Analisis Biaya:</span> Realisasi Rp12.000.000 dari anggaran Rp10.000.000 (+20% deviasi akibat intensitas troubleshooting)
            </div>
          </div>
        </div>
      `
    },
    '1': {
      title: 'Sistem Autentikasi Terenkripsi & Audit Log Akses Pengguna',
      category: 'SECURITY & AUTHENTICATION',
      tags: ['PHP 8.2', 'Argon2id', 'JWT HS256', 'OWASP Compliant', 'MySQL'],
      repo: 'https://github.com/muharielanugrah/secure-auth-system',
      body: `
        <div class="space-y-4 text-sm text-gray-300">
          <div>
            <h4 class="text-xs font-mono uppercase text-[#38BDF8] tracking-wider mb-1">Tantangan & Masalah:</h4>
            <p class="leading-relaxed">Sistem autentikasi konvensional seringkali rentan terhadap serangan brute force, session hijacking, dan password hash yang mudah dibobol melalui rainbow table.</p>
          </div>
          <div>
            <h4 class="text-xs font-mono uppercase text-[#38BDF8] tracking-wider mb-1">Arsitektur Pertahanan:</h4>
            <ul class="space-y-1.5 list-disc list-inside text-gray-400">
              <li><strong class="text-white">Argon2id Hashing:</strong> Memanfaatkan algoritma pemenang password hashing competition dengan resistensi GPU/ASIC.</li>
              <li><strong class="text-white">Rate Limiting Berlapis:</strong> Maksimal 5 percobaan gagal per IP/akun dengan delay eksponensial.</li>
              <li><strong class="text-white">CSRF & Prepared Statements:</strong> 100% bebas dari SQL injection berkat PDO parameterized queries.</li>
              <li><strong class="text-white">Immutable Audit Log:</strong> Setiap kegagalan login dan eskalasi hak akses dicatat dalam tabel audit bertanda waktu otomatis.</li>
            </ul>
          </div>
          <div class="p-3 bg-[#060A12] border border-[#1E293B] rounded-lg font-mono text-xs">
            <span class="text-emerald-400">&gt; Status Keamanan:</span> 0 Celah Terdeteksi pada ZAP Scan<br>
            <span class="text-sky-400">&gt; Standar Kepatuhan:</span> OWASP Authentication Verification Standard (ASVS) Level 2
          </div>
        </div>
      `
    },
    '2': {
      title: 'Platform Manajemen Rekod Data Akademik Terintegrasi',
      category: 'SYSTEM DEVELOPMENT & DATABASE',
      tags: ['Laravel', 'PostgreSQL', '3NF Relational', 'Granular RBAC', 'REST API'],
      repo: 'https://github.com/muharielanugrah/academic-record-system',
      body: `
        <div class="space-y-4 text-sm text-gray-300">
          <div>
            <h4 class="text-xs font-mono uppercase text-[#38BDF8] tracking-wider mb-1">Tantangan & Masalah:</h4>
            <p class="leading-relaxed">Inkonsistensi data transaksi nilai dan penjadwalan kuliah akibat redudansi data dan tidak adanya mekanisme locking saat periode pengisian KRS massal.</p>
          </div>
          <div>
            <h4 class="text-xs font-mono uppercase text-[#38BDF8] tracking-wider mb-1">Arsitektur Solusi:</h4>
            <ul class="space-y-1.5 list-disc list-inside text-gray-400">
              <li><strong class="text-white">Skema Database 3NF:</strong> Mengeliminasi anomali pembaruan dan redundansi pada 18 tabel relasional.</li>
              <li><strong class="text-white">Database Transaction Locking:</strong> Memastikan integritas kuota kelas saat diakses ratusan mahasiswa secara simultan.</li>
              <li><strong class="text-white">Role-Based Access Control (RBAC):</strong> Hak akses granular untuk Admin Program Studi, Dosen Wali, dan Mahasiswa.</li>
              <li><strong class="text-white">Optimasi Query:</strong> Penggunaan indexing selektif dan eager loading, menghasilkan latensi rata-rata &lt; 40ms.</li>
            </ul>
          </div>
          <div class="p-3 bg-[#060A12] border border-[#1E293B] rounded-lg font-mono text-xs">
            <span class="text-emerald-400">&gt; Efisiensi Query:</span> Penurunan waktu komputasi transkrip sebesar 62%<br>
            <span class="text-sky-400">&gt; Keandalan Data:</span> ACID Transactions Guarantee pada PostgreSQL
          </div>
        </div>
      `
    },
    '3': {
      title: 'Skrip Pemantau Trafik Jaringan & Pendeteksi Anomali',
      category: 'NETWORK DEFENSE & AUTOMATION',
      tags: ['Python 3.11', 'Socket Programming', 'Linux Daemon', 'Telegram Webhook'],
      repo: 'https://github.com/muharielanugrah/network-sentinel-daemon',
      body: `
        <div class="space-y-4 text-sm text-gray-300">
          <div>
            <h4 class="text-xs font-mono uppercase text-[#38BDF8] tracking-wider mb-1">Tantangan & Masalah:</h4>
            <p class="leading-relaxed">Keterlambatan tim teknis dalam mendeteksi port scan mencurigakan atau lonjakan paket flooding yang berpotensi melumpuhkan layanan web server.</p>
          </div>
          <div>
            <h4 class="text-xs font-mono uppercase text-[#38BDF8] tracking-wider mb-1">Arsitektur Solusi:</h4>
            <ul class="space-y-1.5 list-disc list-inside text-gray-400">
              <li><strong class="text-white">Background Linux Daemon:</strong> Berjalan mandiri dengan konsumsi memori rendah (&lt; 25MB RAM).</li>
              <li><strong class="text-white">Heuristic Anomaly Detection:</strong> Membandingkan baseline rata-rata paket per detik dengan lonjakan SYN flood tak wajar.</li>
              <li><strong class="text-white">Real-Time Telegram Alert:</strong> Peringatan otomatis dikirim dalam waktu &lt; 3 detik begitu ambang batas anomali terlampaui.</li>
              <li><strong class="text-white">Automated Firewall Action:</strong> Opsi integrasi langsung dengan aturan IP tables untuk memblokir IP penyerang sementara.</li>
            </ul>
          </div>
          <div class="p-3 bg-[#060A12] border border-[#1E293B] rounded-lg font-mono text-xs">
            <span class="text-emerald-400">&gt; Latensi Notifikasi:</span> 1.8 detik rata-rata dari deteksi ke Telegram<br>
            <span class="text-sky-400">&gt; Kompatibilitas OS:</span> Ubuntu Server 22.04 LTS & Debian 12
          </div>
        </div>
      `
    }
  };

  // Open Project Modal
  document.querySelectorAll('.open-project-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const projId = btn.getAttribute('data-project') || '1';
      const proj = projectDetails[projId];
      if (!proj || !projectModal) return;

      if (projectModalTitle) projectModalTitle.textContent = proj.title;
      if (projectModalCategory) projectModalCategory.textContent = proj.category;
      if (projectModalContent) projectModalContent.innerHTML = proj.body;
      if (projectModalRepoLink) {
        projectModalRepoLink.setAttribute('href', proj.repo);
        const linkText = projectModalRepoLink.querySelector('span');
        if (linkText) {
          linkText.textContent = proj.linkLabel || 'Buka Repositori GitHub';
        }
      }

      projectModal.classList.remove('hidden');
      setTimeout(() => projectModal.classList.add('modal-active'), 10);
      document.body.style.overflow = 'hidden';
    });
  });

  // Open Resume Modal
  if (openResumeBtn && resumeModal) {
    openResumeBtn.addEventListener('click', () => {
      resumeModal.classList.remove('hidden');
      setTimeout(() => resumeModal.classList.add('modal-active'), 10);
      document.body.style.overflow = 'hidden';
    });
  }

  // Print Resume Handler
  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Close modals
  const closeModal = (modal) => {
    if (!modal) return;
    modal.classList.remove('modal-active');
    setTimeout(() => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }, 250);
  };

  document.querySelectorAll('.close-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      closeModal(projectModal);
      closeModal(resumeModal);
    });
  });

  // Close on backdrop click
  [projectModal, resumeModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal(modal);
        }
      });
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(projectModal);
      closeModal(resumeModal);
    }
  });
}

/**
 * 8. Interactive Lightbox Modal for Achievements & Documentation
 */
function initImageLightbox() {
  const lightboxModal = document.getElementById('imageLightboxModal');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxOpenLink = document.getElementById('lightboxOpenLink');
  const closeBtn = document.getElementById('closeLightboxBtn');
  const closeFooterBtn = document.getElementById('closeLightboxFooterBtn');

  window.openImageLightbox = function(src, title, caption) {
    if (!lightboxModal || !lightboxImage) return;
    lightboxImage.src = src;
    if (lightboxTitle) lightboxTitle.textContent = title || 'Dokumentasi Prestasi';
    if (lightboxCaption) lightboxCaption.textContent = caption || '';
    if (lightboxOpenLink) lightboxOpenLink.href = src;

    lightboxModal.classList.remove('hidden');
    setTimeout(() => lightboxModal.classList.add('modal-active'), 10);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('modal-active');
    setTimeout(() => {
      lightboxModal.classList.add('hidden');
      document.body.style.overflow = '';
    }, 250);
  };

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (closeFooterBtn) closeFooterBtn.addEventListener('click', closeLightbox);

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal && !lightboxModal.classList.contains('hidden')) {
      closeLightbox();
    }
  });
}

/**
 * 9. YouTube Video Embed Player & Interactive Playlist Handler
 */
function initVideoPlayer() {
  const iframe = document.getElementById('portfolioYoutubeIframe');
  const poster = document.getElementById('videoPoster');
  const videoModal = document.getElementById('videoUrlModal');
  const videoUrlInput = document.getElementById('videoUrlInput');
  const saveVideoUrlBtn = document.getElementById('saveVideoUrlBtn');
  const changeVideoUrlBtn = document.getElementById('changeVideoUrlBtn');
  const closeVideoModalBtn = document.getElementById('closeVideoModalBtn');
  const cancelVideoModalBtn = document.getElementById('cancelVideoModalBtn');
  const titleDisplay = document.getElementById('videoDisplayTitle');
  const descDisplay = document.getElementById('videoDisplayDesc');
  const categoryDisplay = document.getElementById('videoDisplayCategory');
  const roleDisplay = document.getElementById('videoDisplayRole');

  const videoData = {
    'FHMUzzruFak': {
      title: 'Drum Battle — Drum Corps Makassar (DCM) | JDCI 2025',
      category: 'Drum Battle • Jakarta Drum Corps International (JDCI) 2025',
      role: 'Pemain Cymbal (Cymbal Player)',
      roleBadgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      desc: 'Dokumentasi rekaman aksi pertarungan panggung Drum Battle Drum Corps Makassar (DCM) pada ajang bergengsi Jakarta Drum Corps International (JDCI) 2025 di Jakarta International Velodrome. Bertanding dan berkontribusi sebagai Pemain Cymbal (Cymbal Player) dengan raihan Juara 6.'
    },
    'qwTmB1uLkXM': {
      title: 'Display Full Band — BMBC XI 2024 (Juara 1 & Juara Umum)',
      category: 'Display Divisi Open • BMBC XI 2024 (Bandung)',
      role: 'Pemain Multitom (Multitom Player)',
      roleBadgeClass: 'bg-[#1E293B] text-[#38BDF8] border-sky-800/60',
      desc: 'Penampilan Display Full Band Drum Corps Makassar pada ajang Bandung Marching Band Championship (BMBC) XI 2024 yang sukses meraih predikat Juara 1 Display dan Juara Umum Divisi Open.'
    },
    'Hq9dKCBeCeU': {
      title: 'Percussion Ensemble — BMBC XI 2024 (Juara 1)',
      category: 'Percussion Ensemble • BMBC XI 2024 (Bandung)',
      role: 'Pemain Multitom (Multitom Player)',
      roleBadgeClass: 'bg-[#1E293B] text-[#38BDF8] border-sky-800/60',
      desc: 'Sesi pertunjukan repertoar Percussion Ensemble Drum Corps Makassar di BMBC XI 2024 yang sukses meraih predikat Juara 1.'
    },
    'snIuq52IW-g': {
      title: 'Performance on Piala Raja Hamengku Buwono X 2023 — Drum Corps Makassar',
      category: 'Piala Raja HB Cup 2023 • Yogyakarta',
      role: 'Pemain Multitom (Multitom Player)',
      roleBadgeClass: 'bg-[#1E293B] text-[#38BDF8] border-sky-800/60',
      desc: 'Dokumentasi rekaman penampilan Drum Corps Makassar pada kejuaraan nasional bergengsi Piala Raja Hamengku Buwono X 2023 di Yogyakarta (Juara 2 Drum Battle & Juara 3 Street Parade).'
    },
    'DNJFazlax1s': {
      title: 'MB Cakrawala MTs YMPI Rappang — MIMF 2026',
      category: 'Coaching Achievement • MIMF 2026',
      role: 'Pelatih (Coach)',
      roleBadgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      desc: 'Dokumentasi penampilan kompetisi kontingen binaan Marching Band Cakrawala MTs YMPI Rappang pada ajang Makassar International Marching Fest (MIMF) 2026 yang berhasil memborong 13 penghargaan kejuaraan (termasuk 7 gelar Juara 1).'
    }
  };

  const extractYoutubeId = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? match[1] : (url.length === 11 ? url : null);
  };

  window.selectPortfolioVideo = function(videoId, autoplay = true) {
    if (!videoId) return;
    if (iframe) {
      iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0${autoplay ? '&autoplay=1' : ''}`;
      iframe.classList.remove('hidden');
    }
    if (poster) poster.classList.add('hidden');

    // Update metadata if known
    const meta = videoData[videoId];
    if (meta) {
      if (titleDisplay) titleDisplay.textContent = meta.title;
      if (descDisplay) descDisplay.textContent = meta.desc;
      if (categoryDisplay) categoryDisplay.textContent = meta.category;
      if (roleDisplay) {
        roleDisplay.textContent = meta.role;
        roleDisplay.className = `px-2.5 py-0.5 rounded border text-[10px] font-mono font-semibold ${meta.roleBadgeClass || 'bg-[#1E293B] text-[#38BDF8] border-sky-800/60'}`;
      }
    }

    // Update active playlist card styling
    document.querySelectorAll('.video-playlist-item').forEach(card => {
      if (card.getAttribute('data-video-id') === videoId) {
        card.classList.add('video-active');
      } else {
        card.classList.remove('video-active');
      }
    });

    localStorage.setItem('portfolio_youtube_id', videoId);
  };

  window.playPortfolioVideo = function() {
    const currentId = localStorage.getItem('portfolio_youtube_id') || 'FHMUzzruFak';
    window.selectPortfolioVideo(currentId, true);
  };

  window.openVideoUrlModal = function() {
    if (!videoModal) return;
    videoModal.classList.remove('hidden');
    setTimeout(() => videoModal.classList.add('modal-active'), 10);
    if (videoUrlInput) {
      const current = localStorage.getItem('portfolio_youtube_id') || 'FHMUzzruFak';
      videoUrlInput.value = `https://www.youtube.com/watch?v=${current}`;
      videoUrlInput.focus();
    }
  };

  const closeVideoModal = () => {
    if (!videoModal) return;
    videoModal.classList.remove('modal-active');
    setTimeout(() => videoModal.classList.add('hidden'), 250);
  };

  if (changeVideoUrlBtn) changeVideoUrlBtn.addEventListener('click', window.openVideoUrlModal);
  if (closeVideoModalBtn) closeVideoModalBtn.addEventListener('click', closeVideoModal);
  if (cancelVideoModalBtn) cancelVideoModalBtn.addEventListener('click', closeVideoModal);

  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) closeVideoModal();
    });
  }

  if (saveVideoUrlBtn && videoUrlInput) {
    saveVideoUrlBtn.addEventListener('click', () => {
      const inputVal = videoUrlInput.value.trim();
      const extractedId = extractYoutubeId(inputVal);
      if (extractedId) {
        window.selectPortfolioVideo(extractedId, true);
        closeVideoModal();
      } else {
        alert('Format URL YouTube tidak valid. Contoh format: https://www.youtube.com/watch?v=... atau https://youtu.be/...');
      }
    });
  }

  // Bind playlist items click events
  document.querySelectorAll('.video-playlist-item').forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't trigger if clicked external direct link
      if (e.target.closest('a')) return;
      const vid = card.getAttribute('data-video-id');
      if (vid) {
        window.selectPortfolioVideo(vid, true);
        const playerContainer = document.getElementById('videoPlayerContainer');
        if (playerContainer && window.innerWidth < 1024) {
          playerContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    });
  });

  // Check saved or default video: default to JDCI 2025 Drum Battle (FHMUzzruFak)
  const defaultVideoId = 'FHMUzzruFak';
  let savedYoutubeId = localStorage.getItem('portfolio_youtube_id');
  if (!savedYoutubeId || savedYoutubeId === 'snIuq52IW-g') {
    savedYoutubeId = defaultVideoId;
    localStorage.setItem('portfolio_youtube_id', defaultVideoId);
  }
  if (savedYoutubeId && videoData[savedYoutubeId]) {
    const meta = videoData[savedYoutubeId];
    if (titleDisplay) titleDisplay.textContent = meta.title;
    if (descDisplay) descDisplay.textContent = meta.desc;
    if (categoryDisplay) categoryDisplay.textContent = meta.category;
    if (roleDisplay) {
      roleDisplay.textContent = meta.role;
      roleDisplay.className = `px-2.5 py-0.5 rounded border text-[10px] font-mono font-semibold ${meta.roleBadgeClass || 'bg-[#1E293B] text-[#38BDF8] border-sky-800/60'}`;
    }
  }
}


