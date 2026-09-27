const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

let currentLanguage = localStorage.getItem('aedesLanguage') === 'en' ? 'en' : 'ms';
let activeModeIndex = 0;
let activeCompareIndex = 0;
let activeXrayStage = 0;
let activeStoryChapter = 1;

const translations = {
  ms: {
    navProblem:'Tujuan', navMechanism:'Cara Berfungsi', navSystem:'Teroka Alat', navModes:'3 Mod', navDashboard:'Papan Pemuka', navCompare:'Keistimewaan', navValidation:'Ujian', nationalTag:'PERINGKAT KEBANGSAAN · 2026',
    loadingExperience:'MENYEDIAKAN PENGALAMAN', heroTitle:'PERLINDUNGAN<br><em>LEBIH PINTAR.</em>', heroText:'Prototaip perangkap nyamuk pintar yang menggabungkan tarikan CO₂, cahaya UV, aliran udara dan mikropengawal ESP32.',
    heroStatModes:'mod operasi', heroStatControls:'kaedah kawalan', heroStatStages:'peringkat sistem', beat1Label:'ISYARAT TARIKAN', beat1Title:'Nyamuk mengesan<br>isyarat CO₂.', beat2Label:'TARIKAN TAMBAHAN', beat2Title:'Cahaya UV<br>memandu laluan.', beat3Label:'ALIRAN UDARA', beat3Title:'Kipas menarik nyamuk<br>ke ruang tangkapan.', heroEndLabel:'INOVASI STEM · KAWALAN IoT', exploreMechanism:'Bagaimana ia berfungsi', scrollGuide:'SKROL UNTUK MENGGERAKKAN CERITA',
    challengeKicker:'02 · KENAPA KAMI BINA AEDES-X?', problemTitle:'Ancaman kecil.<br>Impak yang besar.', problemText:'Nyamuk Aedes aktif di persekitaran komuniti. Kami mahu membantu mengurangkan pendedahan melalui satu penyelesaian bebas semburan kimia yang mudah dipantau.',
    challenge1Title:'Aktif di ruang harian', challenge1Text:'Nyamuk Aedes boleh berada berhampiran ruang kediaman, sekolah dan kawasan aktiviti komuniti.', challenge2Title:'Punca mudah terlepas pandang', challenge2Text:'Takungan air kecil dan kawasan terlindung memerlukan pemeriksaan yang teliti serta berulang.', challenge3Title:'Pencegahan perlu konsisten', challenge3Text:'Pemantauan manual sahaja sukar dikekalkan. Komuniti memerlukan tindakan yang lebih mudah dan teratur.',
    mechanismKicker:'03 · BAGAIMANA PERANGKAP BERFUNGSI?', mechanismTitle:'Ikuti Perjalanan Nyamuk', mechanismText:'Cerita visual 4 babak bagaimana isyarat CO₂, cahaya UV dan aliran udara berurutan memandu nyamuk ke bakul jaring tanpa racun kimia.',
    chapFan:'Kipas', chapMesh:'Jaring', btnPlayStory:'Lihat proses', btnPauseStory:'Jeda', btnReplayStory:'Ulang proses', storyPrev:'Sebelumnya', storyNext:'Babak Seterusnya', storyDisclaimer:'*Ilustrasi mekanisme jangkaan—bukan rakaman makmal atau jaminan tangkapan mutlak.',
    systemKicker:'04 · TEROKA AEDES-X', systemTitle:'Satu sistem.<br>Lima peringkat.', systemText:'Teroka anatomi fizikal prototaip AEDES-X secara interaktif untuk memahami fungsi setiap komponen STEM sebenar.', missionStatusLabel:'STATUS ANATOMI:', xrayInstruction:'Tekan bahagian alat untuk teroka', fullDeviceBtn:'Peranti Penuh', missionKicker:'KONSOL KAWALAN PERTANDINGAN', missionHeadline:'Anatomi Modular AEDES-X', missionIntro:'Pilih mana-mana satu daripada lima bahagian pada alat atau panel ini untuk meneliti komponen fizikal, gambarajah terperinci dan mekanisme STEM sebenar.', backToFullBtn:'Kembali ke Peranti Penuh', stageAll:'Semua', stage1:'Kuasa & Input', stage1p:'Panel solar, suis utama, butang mod dan sensor LDR.', stage2:'Otak Sistem', stage2p:'ESP32 memproses input dan menyelaras operasi.', stage3:'Tarikan & Aliran', stage3p:'UV LED dan kipas menghasilkan tarikan serta sedutan.', stage4:'Tangkapan', stage4p:'Bakul jaring halus memerangkap nyamuk dengan selamat.', stage5:'Penghasil CO₂', stage5p:'Campuran yis, gula dan air suam menghasilkan isyarat tarikan.',
    modesKicker:'05 · TIGA MOD OPERASI', modesTitle:'Tiga mod. Satu matlamat.', modesText:'Pilih situasi untuk melihat mod yang paling sesuai mengikut keperluan.', modeSwipeTitle:'PILIH MOD', modeSwipeText:'Skrol atau leret ke tepi untuk menukar video', modeButton1Label:'01 · KAWALAN TERUS', modeButton1Place:'Rumah & demonstrasi', modeButton2Label:'02 · SENSOR CAHAYA', modeButton2Place:'Beranda & kawasan terlindung', modeButton3Label:'03 · JADUAL OPERASI', timerName:'Pemasa', modeButton3Place:'Sekolah, pejabat & dewan', modeDemo:'DEMONSTRASI MOD', seeDashCta:'Lihat Demo Papan Pemuka',
    dashboardKicker:'06 · DEMO PAPAN PEMUKA', dashTitle:'Kawalan pada telefon.<br>Butang fizikal sebagai sokongan.', dashText:'Papan pemuka AEDES-X menyatukan status masa nyata, tiga mod operasi, waktu mula berjadual dengan pemasa undur, dan maklumat sistem. Jika hotspot terputus, butang fizikal masih boleh menukar mod.', nationalUpgrade:'PENAMBAHBAIKAN PERINGKAT KEBANGSAAN', maintenance:'Peringatan Penyelenggaraan Pintar', maintenanceText:'Status prototaip perisian: Peringatan berjadual untuk semakan bakul jaring, penggantian bancuhan CO₂ dan pemeriksaan sistem—supaya penjagaan lebih konsisten.', newLabel:'DIRANCANG', badgeDashboard:'◉ Papan pemuka', badgePhysical:'● Butang fizikal', badgeHotspot:'⌁ Hotspot setempat', watchDashboard:'Tonton demonstrasi papan pemuka', screenHome:'Utama', screenControl:'Kawalan', screenTimer:'Pemasa', screenSystem:'Sistem', maintDue:'Pemeriksaan seterusnya', maintDate:'Bakul jaring · 7 hari',
    compareKicker:'07 · APA YANG MENJADIKAN AEDES-X BERBEZA?', compareTitle:'Bukan sekadar perangkap.<br>Satu sistem pintar.', compareText:'Tiga perbezaan utama yang direka oleh murid untuk perlindungan komuniti yang lebih pintar, selamat dan mudah dipantau.',
    diff1Tag:'TARIKAN BERGANDA', diff1Title:'Gabungan 3 Isyarat Serentak', diff1Text:'Tidak hanya bergantung pada cahaya UV semata-mata; AEDES-X menggabungkan isyarat aroma CO₂ semula jadi, cahaya UV visual, dan sedutan aliran udara dalam satu alat.',
    diff2Tag:'OPERASI PINTAR', diff2Title:'3 Mod Fleksibel Bersepadu', diff2Text:'Boleh dihidupkan secara Manual untuk demonstrasi, Auto LDR mengikut sensor gelap, atau mod Pemasa mengikut jadual rutin seperti awal pagi dan lewat petang.',
    diff3Tag:'KAWALAN DUAL', diff3Title:'Papan Pemuka + Butang Fizikal', diff3Text:'Dipantau dan dikawal mudah menerusi papan pemuka telefon pintar tanpa internet luar, disokong butang fizikal pada perumah sekiranya tiada peranti pintar.',
    btnToggleCompareText:'Lihat Perbandingan Terperinci (Fogging, Aerosol, Lingkaran, UV)', compareFogging:'Fogging', compareAerosol:'Semburan aerosol', compareCoil:'Lingkaran nyamuk', compareUV:'Perangkap UV biasa', ourPrototype:'PROTOTAIP KAMI', existingMethod:'KAEDAH SEDIA ADA', aedesApproach:'Menggabungkan CO₂, UV, aliran udara, tiga mod operasi dan kawalan IoT dalam satu sistem.', comparisonLens:'COMPARISON LENS', compareDisclaimer:'Perbandingan ini menerangkan ciri dan cara penggunaan umum—bukan keputusan ujian keberkesanan, tuntutan klinikal atau pengganti langkah pencegahan denggi rasmi seperti pemusnahan tempat pembiakan atau semburan berkuasa.',
    validationKicker:'08 · UJIAN & PENAMBAHBAIKAN', validationTitle:'Apa yang sudah kami uji?', validationText:'Pemisahan telus antara fungsi yang telah disahkan pada prototaip fizikal, ujian berjadual, dan perancangan masa depan tanpa sebarang angka rekaan.',
    valBadgeVerified:'SUDAH DITUNJUKKAN PADA PROTOTAIP', valBadgePlanned:'UJIAN SETERUSNYA', valBadgeRoadmap:'PENAMBAHBAIKAN',
    valCountVerified:'3 FUNGSI UTAMA', valCountPlanned:'3 PROTOKOL', valCountRoadmap:'3 FASA',
    valGroup1Title:'Fungsi Telah Disahkan',
    val1Brief1:'Kawalan Pintar ESP32 (Hotspot Web tanpa internet)',
    val1Brief2:'Pertukaran 3 mod & paparan skrin OLED',
    val1Brief3:'Penjanaan gas CO₂ berterusan daripada penapaian yis',
    valGroup2Title:'Protokol Ujian Berjadual',
    val2Brief1:'Ujian ketepatan masa mod Pemasa (10 kitaran ulangan)',
    val2Brief2:'Pemantauan kestabilan haba ESP32 (4 jam operasi)',
    val2Brief3:'Kalibrasi bacaan ambang cahaya sensor LDR',
    valGroup3Title:'Pelan Kemajuan',
    val3Brief1:'Peringatan penyelenggaraan pintar pada papan pemuka',
    val3Brief2:'Liang pengudaraan haba pasif & sinki haba',
    val3Brief3:'Eksperimen sensor pengira nyamuk inframerah (IR)',
    valToggleDetails:'Lihat butiran',
    valToggleClose:'Tutup butiran',
    valClose:'Tutup',
    valD1Heading:'Butiran Pengesahan Prototaip',
    val1D1Title:'Hotspot Web ESP32 Tempatan',
    val1D1Desc:'ESP32 memancarkan WiFi AP setempat membolehkan telefon pintar berhubung terus ke antaramuka kawalan tanpa talian internet atau router luar.',
    val1D2Title:'Maklum Balas OLED & Butang Fizikal',
    val1D2Desc:'Pertukaran mod memaparkan teks status masa nyata pada skrin OLED 0.96″, disokong butang fizikal pada perumah sekiranya telefon kehabisan bateri.',
    val1D3Title:'Penjanaan CO₂ Semula Jadi & Kuasa 5V',
    val1D3Desc:'Bancuhan yis, gula dan air suam terbukti mengeluarkan buih gas karbon dioksida berterusan, manakala sistem litar 5V membekalkan arus stabil.',
    valD2Heading:'Protokol & Kaedah Pengujian',
    val2D1Title:'Ujian Kitaran Berjadual 10 Ulangan',
    val2D1Desc:'Menguji ketepatan pemasaan dalaman ESP32 dan kestabilan pensuisan geganti kipas/UV selama 10 kitaran hidup-henti berturut-turut.',
    val2D2Title:'Pemantauan Suhu Komponen (4 Jam)',
    val2D2Desc:'Memantau bacaan suhu permukaan modul mikropengawal ESP32 semasa 4 jam operasi berterusan untuk keselamatan elektrik perkakasan.',
    val2D3Title:'Kalibrasi Ambang Cahaya LDR',
    val2D3Desc:'Mengukur ambang nilai analog rintangan sensor LDR merentasi persekitaran dalam bilik, beranda dan bawah naungan luar.',
    valIntegrityText:'<b>Prinsip Ketelusan:</b> Kami tidak mereka-reka angka tangkapan nyamuk. Pengesahan kadar tangkapan sebenar memerlukan kajian makmal terkawal entomologi atau kerjasama pihak berkuasa kesihatan.',
    valD3Heading:'Pelan Kemajuan Fasa Seterusnya',
    val3D1Title:'Peringatan Penyelenggaraan Pintar',
    val3D1Desc:'Notifikasi perisian papan pemuka bagi menjadualkan pembersihan bakul jaring setiap minggu dan penggantian bancuhan yis CO₂ setiap 14 hari.',
    val3D2Title:'Liang Pengudaraan Haba & Sinki Haba',
    val3D2Desc:'Menambah sinki haba aluminium mini serta liang udara reka bentuk sarang lebah pada bahagian atas perumah untuk peredaran haba pasif.',
    val3D3Title:'Eksperimen Sensor Pengira IR Mikro',
    val3D3Desc:'Meneroka sensor celah inframerah mikro di corong sedutan untuk merekodkan anggaran bilangan serangga yang melepasi ruang tangkapan.',
    valRoadmapNote:'Ciri-ciri ini telah dirangka dalam prototaip perisian papan pemuka dan akan disepadukan ke dalam perkakasan fizikal versi seterusnya selepas penilaian juri peringkat kebangsaan.',
    impactKicker:'09 · PENUTUP & IMPAK KOMUNITI', impactTitle:'Teknologi yang bermula<br>dengan komuniti.', impactText:'AEDES-X menghubungkan pembelajaran STEM dengan isu kesihatan sebenar—daripada idea, prototaip dan pengaturcaraan kepada pengujian yang bertanggungjawab.', sdg3Title:'SDG 3 · KESIHATAN BAIK DAN KESEJAHTERAAN', sdg3:'Menyokong kesedaran dan usaha pencegahan denggi dalam komuniti.', sdg9Title:'SDG 9 · INDUSTRI, INOVASI DAN INFRASTRUKTUR', sdg9:'Menggalakkan inovasi IoT yang dibina, diuji dan diterangkan oleh murid.', finalText:'Inovasi kecil. Impak yang bermakna.', backTop:'Kembali ke atas ↑'
  },
  en: {
    navProblem:'Purpose', navMechanism:'How It Works', navSystem:'Explore Anatomy', navModes:'3 Modes', navDashboard:'Dashboard', navCompare:'Differences', navValidation:'Testing', nationalTag:'NATIONAL STAGE · 2026',
    loadingExperience:'PREPARING EXPERIENCE', heroTitle:'SMARTER<br><em>PROTECTION.</em>', heroText:'A smart mosquito-trap prototype combining CO₂ attraction, UV light, airflow and ESP32 microcontroller.',
    heroStatModes:'operating modes', heroStatControls:'control methods', heroStatStages:'system stages', beat1Label:'ATTRACTION SIGNAL', beat1Title:'Mosquitoes detect<br>the CO₂ signal.', beat2Label:'SECONDARY ATTRACTION', beat2Title:'UV light<br>guides the path.', beat3Label:'AIRFLOW', beat3Title:'The fan pulls mosquitoes<br>into the capture chamber.', heroEndLabel:'STEM INNOVATION · IoT CONTROL', exploreMechanism:'How it works', scrollGuide:'SCROLL TO MOVE THE STORY',
    challengeKicker:'02 · WHY WE BUILT AEDES-X', problemTitle:'A small threat.<br>A major impact.', problemText:'Aedes mosquitoes are active around our communities. We aim to reduce exposure through a chemical-spray-free solution that is easy to monitor.',
    challenge1Title:'Active in daily spaces', challenge1Text:'Aedes mosquitoes can be present near homes, schools and community activity areas.', challenge2Title:'Sources are easily overlooked', challenge2Text:'Small water collections and sheltered areas require careful, repeated inspection.', challenge3Title:'Prevention must be consistent', challenge3Text:'Manual monitoring alone is difficult to maintain. Communities need action that is simpler and more organised.',
    mechanismKicker:'03 · HOW THE TRAP WORKS', mechanismTitle:'Follow the Mosquito’s Journey', mechanismText:'A 4-step visual story showing how sequential CO₂ cues, UV light, and airflow guide mosquitoes into the mesh basket without chemical sprays.',
    chapFan:'Fan', chapMesh:'Mesh', btnPlayStory:'Watch process', btnPauseStory:'Pause', btnReplayStory:'Replay', storyPrev:'Previous', storyNext:'Next Step', storyDisclaimer:'*Illustration of intended mechanism—not laboratory footage or absolute capture guarantee.',
    systemKicker:'04 · EXPLORE AEDES-X', systemTitle:'One system.<br>Five stages.', systemText:'Interactively explore the physical anatomy of the AEDES-X prototype to understand how real STEM components operate.', missionStatusLabel:'ANATOMY STATUS:', xrayInstruction:'Click device parts to explore', fullDeviceBtn:'Full Device', missionKicker:'COMPETITION COMMAND CONSOLE', missionHeadline:'AEDES-X Modular Anatomy', missionIntro:'Select any of the five zones on the prototype or control panel to examine real physical components, detailed diagrams and STEM mechanisms.', backToFullBtn:'Back to Full Device', stageAll:'All', stage1:'Power & Input', stage1p:'Solar panel, main switch, mode button and LDR sensor.', stage2:'System Brain', stage2p:'The ESP32 processes inputs and coordinates operation.', stage3:'Attraction & Airflow', stage3p:'UV LEDs and the fan provide attraction and suction.', stage4:'Capture', stage4p:'A fine-mesh basket securely retains mosquitoes.', stage5:'CO₂ Generator', stage5p:'Yeast, sugar and warm water produce an attraction signal.',
    modesKicker:'05 · THREE OPERATING MODES', modesTitle:'Three modes. One purpose.', modesText:'Choose a situation to see which mode best fits your requirements.', modeSwipeTitle:'SELECT A MODE', modeSwipeText:'Scroll or swipe sideways to change the video', modeButton1Label:'01 · DIRECT CONTROL', modeButton1Place:'Home & demonstration', modeButton2Label:'02 · LIGHT SENSOR', modeButton2Place:'Veranda & sheltered areas', modeButton3Label:'03 · SCHEDULED OPERATION', timerName:'Timer', modeButton3Place:'School, office & hall', modeDemo:'MODE DEMONSTRATION', seeDashCta:'See Dashboard Demo',
    dashboardKicker:'06 · DASHBOARD DEMO', dashTitle:'Control from your phone.<br>Physical button as backup.', dashText:'The AEDES-X dashboard combines live status, three operating modes, scheduled ON time with countdown, and system information. If the hotspot disconnects, the physical button can still change modes.', nationalUpgrade:'NATIONAL-STAGE IMPROVEMENT', maintenance:'Smart Maintenance Reminder', maintenanceText:'Software prototype status: Scheduled reminders for mesh basket inspection, CO₂ yeast replacement, and system health checks.', newLabel:'PLANNED', badgeDashboard:'◉ Dashboard', badgePhysical:'● Physical button', badgeHotspot:'⌁ Local hotspot', watchDashboard:'Watch dashboard demonstration', screenHome:'Home', screenControl:'Control', screenTimer:'Timer', screenSystem:'System', maintDue:'Next inspection', maintDate:'Mesh basket · 7 days',
    compareKicker:'07 · WHAT MAKES AEDES-X DIFFERENT?', compareTitle:'More than a trap.<br>One smart system.', compareText:'Three key differences designed by students for smarter, safer, and monitorable community protection.',
    diff1Tag:'MULTI-SIGNAL', diff1Title:'Combined 3-Signal Cue', diff1Text:'Rather than relying on UV light alone, AEDES-X combines natural CO₂ scent cues, visual UV light, and aerodynamic fan suction in one system.',
    diff2Tag:'SMART OPERATION', diff2Title:'3 Integrated Flexible Modes', diff2Text:'Operates in Manual for demonstrations, Auto LDR based on darkness, or Timer mode scheduled around routine hours like early morning and late afternoon.',
    diff3Tag:'DUAL CONTROL', diff3Title:'Dashboard + Physical Button', diff3Text:'Easily monitored and controlled via smartphone dashboard without external internet, backed by a built-in physical button if disconnected.',
    btnToggleCompareText:'View Detailed Comparison (Fogging, Aerosol, Coil, UV)', compareFogging:'Fogging', compareAerosol:'Aerosol spray', compareCoil:'Mosquito coil', compareUV:'Standard UV trap', ourPrototype:'OUR PROTOTYPE', existingMethod:'EXISTING METHOD', aedesApproach:'Combines CO₂, UV, airflow, three operating modes and IoT control in one system.', comparisonLens:'COMPARISON LENS', compareDisclaimer:'This comparison describes general features and usage—not efficacy test results, clinical claims or a replacement for official dengue-prevention measures such as source reduction or authorized spraying.',
    validationKicker:'08 · TESTING & IMPROVEMENTS', validationTitle:'What Have We Tested?', validationText:'A clear distinction between verified prototype functions, next test protocols, and future improvements without invented numbers.',
    valBadgeVerified:'DEMONSTRATED ON PROTOTYPE', valBadgePlanned:'NEXT TESTS', valBadgeRoadmap:'IMPROVEMENTS',
    valCountVerified:'3 CORE FUNCTIONS', valCountPlanned:'3 PROTOCOLS', valCountRoadmap:'3 PHASES',
    valGroup1Title:'Demonstrated on Prototype',
    val1Brief1:'ESP32 Smart Control (local Web hotspot without internet)',
    val1Brief2:'3-mode switching with live OLED display feedback',
    val1Brief3:'Continuous natural CO₂ from yeast fermentation',
    valGroup2Title:'Next Scheduled Tests',
    val2Brief1:'Timer mode timing accuracy test (10 repeated cycles)',
    val2Brief2:'ESP32 thermal stability monitoring (4-hour continuous run)',
    val2Brief3:'LDR light threshold calibration readings',
    valGroup3Title:'Future Improvements',
    val3Brief1:'Smart maintenance reminders in dashboard software',
    val3Brief2:'Passive thermal ventilation ports & heatsink',
    val3Brief3:'Infrared (IR) mosquito entry counter experiment',
    valToggleDetails:'View details',
    valToggleClose:'Close details',
    valClose:'Close',
    valD1Heading:'Prototype Verification Details',
    val1D1Title:'Local ESP32 Web Hotspot',
    val1D1Desc:'The ESP32 broadcasts a local WiFi AP allowing smartphone browser connection directly to the interface without external internet or router.',
    val1D2Title:'OLED Telemetry & Physical Button',
    val1D2Desc:'Mode switches display real-time status on the 0.96″ OLED screen, supported by a physical chassis button as backup if the phone battery dies.',
    val1D3Title:'Natural CO₂ Fermentation & 5V Power',
    val1D3Desc:'Yeast, sugar, and warm water mixture verified to produce continuous CO₂ bubbling, while the 5V circuit provides stable current.',
    valD2Heading:'Testing Protocols & Methodology',
    val2D1Title:'10-Run Scheduled Cycle Validation',
    val2D1Desc:'Testing ESP32 internal clock accuracy and relay switching consistency over 10 consecutive scheduled start-stop cycles.',
    val2D2Title:'ESP32 Thermal Monitoring (4 Hours)',
    val2D2Desc:'Monitoring ESP32 chip surface temperature during 4 hours of continuous operation to verify hardware thermal safety.',
    val2D3Title:'LDR Light Threshold Calibration',
    val2D3Desc:'Measuring analog resistance values of the LDR sensor across indoor, veranda, and shaded outdoor lighting environments.',
    valIntegrityText:'<b>Transparency Principle:</b> We do not fabricate mosquito capture counts. Actual capture verification requires controlled entomological laboratory testing or collaboration with health authorities.',
    valD3Heading:'Next Phase Roadmap Plan',
    val3D1Title:'Smart Maintenance Reminders',
    val3D1Desc:'Dashboard software alerts for scheduled weekly mesh basket cleaning and fortnightly CO₂ yeast solution replacement.',
    val3D2Title:'Passive Thermal Vents & Heatsink',
    val3D2Desc:'Adding miniature aluminum heatsinks and a honeycomb vent array to the upper chassis for passive thermal dissipation.',
    val3D3Title:'Micro-IR Counter Experiment',
    val3D3Desc:'Exploring a micro-infrared beam break sensor at the intake funnel to record estimated mosquito entry events.',
    valRoadmapNote:'These features are architected in the dashboard software prototype and will be integrated into the physical hardware after the national competition judging.',
    impactKicker:'09 · CONCLUSION & STEM IMPACT', impactTitle:'Technology that begins<br>with the community.', impactText:'AEDES-X connects STEM learning with a real health challenge—from ideas, prototyping and programming to responsible testing.', sdg3Title:'SDG 3 · GOOD HEALTH AND WELL-BEING', sdg3:'Supports dengue awareness and prevention efforts in the community.', sdg9Title:'SDG 9 · INDUSTRY, INNOVATION AND INFRASTRUKTUR', sdg9:'Encourages student-built and student-tested IoT innovation.', finalText:'Small innovation. Meaningful impact.', backTop:'Back to top ↑'
  }
};

function applyLanguage(language) {
  currentLanguage = language;
  document.documentElement.lang = language;
  localStorage.setItem('aedesLanguage', language);
  $$('[data-copy]').forEach((element) => {
    const value = translations[language][element.dataset.copy];
    if (value !== undefined) element.innerHTML = value;
  });
  $$('.language-toggle button').forEach((button) => {
    const active = button.dataset.lang === language;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  renderStoryChapter(activeStoryChapter, false);
  renderXrayStage(activeXrayStage, false);
  renderMode(activeModeIndex, false);
  renderComparison(activeCompareIndex, false);
  $$('.val-toggle-btn').forEach((btn) => {
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    const textSpan = btn.querySelector('.val-btn-text');
    if (textSpan) {
      textSpan.innerHTML = isExpanded 
        ? translations[language].valToggleClose 
        : translations[language].valToggleDetails;
    }
  });
}

$$('.language-toggle button').forEach((button) => {
  button.addEventListener('click', () => applyLanguage(button.dataset.lang));
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

$$('.reveal').forEach((element) => revealObserver.observe(element));

addEventListener('scroll', () => {
  const maximum = document.documentElement.scrollHeight - innerHeight;
  $('.scroll-meter span').style.width = `${Math.min(100, scrollY / maximum * 100)}%`;
  $('#topbar').classList.toggle('compact', scrollY > 40);
}, { passive: true });

addEventListener('pointermove', (event) => {
  const glow = $('.cursor-glow');
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
}, { passive: true });

// Animasi cinematic berpandukan skrol — 120 bingkai daripada video 10 saat.
const cinemaSection = $('.scroll-cinema');
const canvas = $('#cinemaCanvas');
const fallbackVideo = $('.cinema-fallback');
const context = canvas ? canvas.getContext('2d', { alpha: false }) : null;
const frameCount = 120;
const frames = new Array(frameCount);
let loadedFrames = 0;
let currentFrame = 0;
let requestedFrame = 0;
let animationStarted = false;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function framePath(index) {
  return `assets/cinematic-frames/frame-${String(index + 1).padStart(4, '0')}.webp`;
}

function activateCinemaFallback() {
  if (canvas) canvas.style.display = 'none';
  if (fallbackVideo) {
    fallbackVideo.style.display = 'block';
    fallbackVideo.setAttribute('aria-hidden', 'false');
    fallbackVideo.play().catch(() => {});
  }
  const loader = $('#cinemaLoader');
  if (loader) loader.classList.add('hidden');
}

function drawFrame(index) {
  if (!context) return;
  const image = frames[index];
  if (!image || !image.complete || !image.naturalWidth) return;

  const width = canvas.width;
  const height = canvas.height;
  const isMobile = innerWidth < 768;
  const scale = isMobile
    ? Math.min(width / image.naturalWidth, height / image.naturalHeight)
    : Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const renderedWidth = image.naturalWidth * scale;
  const renderedHeight = image.naturalHeight * scale;
  const x = (width - renderedWidth) / 2;
  // On mobile portrait, position slightly higher to accommodate text copy
  const y = isMobile && innerHeight > innerWidth
    ? Math.max(0, (height - renderedHeight) * 0.32)
    : (height - renderedHeight) / 2;

  context.fillStyle = '#020604';
  context.fillRect(0, 0, width, height);
  context.drawImage(image, x, y, renderedWidth, renderedHeight);
}

function resizeCinema() {
  if (!canvas || !context) return;
  const ratio = Math.min(devicePixelRatio || 1, 2);
  canvas.width = Math.round(innerWidth * ratio);
  canvas.height = Math.round(innerHeight * ratio);
  drawFrame(currentFrame);
}

function updateCinemaCopy(progress) {
  let activeBeat = 0;
  if (progress >= 0.18) activeBeat = 1;
  if (progress >= 0.40) activeBeat = 2;
  if (progress >= 0.61) activeBeat = 3;
  if (progress >= 0.82) activeBeat = 4;

  $$('.cinema-copy').forEach((element) => {
    element.classList.toggle('active', Number(element.dataset.beat) === activeBeat);
  });
  const progressEl = $('#cinemaProgress');
  if (progressEl) progressEl.style.width = `${progress * 100}%`;
}

function updateCinemaFromScroll() {
  if (!cinemaSection) return;
  if (prefersReducedMotion) {
    updateCinemaCopy(0);
    return;
  }
  const rect = cinemaSection.getBoundingClientRect();
  const distance = cinemaSection.offsetHeight - innerHeight;
  const progress = distance > 0 ? Math.min(1, Math.max(0, -rect.top / distance)) : 0;
  requestedFrame = Math.min(frameCount - 1, Math.round(progress * (frameCount - 1)));
  updateCinemaCopy(progress);
  const guide = $('#cinemaScrollGuide');
  if (guide) guide.classList.toggle('hidden', progress > 0.07);
}

function animationLoop() {
  if (currentFrame !== requestedFrame) {
    currentFrame = requestedFrame;
    drawFrame(currentFrame);
  }
  if (!prefersReducedMotion) {
    requestAnimationFrame(animationLoop);
  }
}

if (!context) {
  activateCinemaFallback();
} else if (prefersReducedMotion) {
  // In reduced-motion mode, only load frame 0 for static showcase
  const firstFrame = new Image();
  firstFrame.src = framePath(0);
  firstFrame.onload = () => {
    frames[0] = firstFrame;
    resizeCinema();
    drawFrame(0);
    $('#cinemaLoader')?.classList.add('hidden');
  };
  firstFrame.onerror = activateCinemaFallback;
} else {
  // Safety timeout: if frames take too long to load (e.g. slow mobile connection), switch to fallback video
  const fallbackTimer = setTimeout(() => {
    if (loadedFrames < 5) activateCinemaFallback();
  }, 4000);

  for (let index = 0; index < frameCount; index += 1) {
    const image = new Image();
    image.decoding = 'async';
    image.src = framePath(index);
    image.onload = () => {
      loadedFrames += 1;
      if (index === 0) {
        resizeCinema();
        drawFrame(0);
      }
      if (index === currentFrame || index === requestedFrame) drawFrame(index);
      if (loadedFrames >= 8) {
        clearTimeout(fallbackTimer);
        $('#cinemaLoader')?.classList.add('hidden');
      }
      if (!animationStarted) {
        animationStarted = true;
        animationLoop();
      }
    };
    image.onerror = () => {
      if (loadedFrames === 0 && index === 0) {
        clearTimeout(fallbackTimer);
        activateCinemaFallback();
      }
    };
    frames[index] = image;
  }

  addEventListener('scroll', updateCinemaFromScroll, { passive: true });
  addEventListener('resize', resizeCinema);
  updateCinemaFromScroll();
}

// =====================================================================
// SECTION 02 · X-RAY EXPLORER + MISSION CONTROL EXHIBIT CONTROLLER
// =====================================================================
const stagesData = [
  null, // 0 = Full Device Overview
  {
    image: 'assets/stage-1.png',
    hotspot: { x: '56%', y: '14%' },
    ms: {
      statusText: 'PERINGKAT 01 · KUASA & INPUT',
      stepNum: 'PERINGKAT 01',
      role: 'PUNCA KUASA & KAWALAN',
      hw: 'SOLAR · LDR · SUIS · BUTANG',
      headline: 'Tenaga Solar & Kawalan Input Pintar',
      desc: 'Panel solar dan sumber kuasa menyokong operasi peranti secara mampan; suis utama, butang mod fizikal dan sensor LDR membekalkan kawalan input untuk operasi manual atau automatik.',
      chips: ['Panel Solar 5V', 'Sensor LDR', 'Suis Kuasa Utama', 'Butang Mod Fizikal']
    },
    en: {
      statusText: 'STAGE 01 · POWER & INPUT',
      stepNum: 'STAGE 01',
      role: 'POWER SOURCE & CONTROLS',
      hw: 'SOLAR · LDR · SWITCH · BUTTON',
      headline: 'Solar Energy & Smart Input Controls',
      desc: 'The solar panel and power source support sustainable device operation; the main switch, physical mode button, and LDR sensor provide control inputs for manual or automated modes.',
      chips: ['5V Solar Panel', 'LDR Sensor', 'Main Power Switch', 'Physical Mode Button']
    }
  },
  {
    image: 'assets/stage-2.png',
    hotspot: { x: '47%', y: '32%' },
    ms: {
      statusText: 'PERINGKAT 02 · OTAK SISTEM',
      stepNum: 'PERINGKAT 02',
      role: 'PEMPROSES UTAMA & PAPARAN',
      hw: 'ESP32 · OLED · LITAR KAWALAN',
      headline: 'Mikropengawal ESP32 & Paparan Status',
      desc: 'Mikropengawal ESP32 bertindak sebagai pusat kawalan utama yang memproses isyarat sensor, mengurus mod operasi dan memaparkan status sistem pada skrin OLED.',
      chips: ['Mikropengawal ESP32', 'Skrin Paparan OLED', 'Papan Litar & Pendawaian', 'Titik Sambungan IoT']
    },
    en: {
      statusText: 'STAGE 02 · SYSTEM BRAIN',
      stepNum: 'STAGE 02',
      role: 'CENTRAL CONTROLLER & DISPLAY',
      hw: 'ESP32 · OLED · CONTROL CIRCUIT',
      headline: 'ESP32 Microcontroller & Live Status Display',
      desc: 'The ESP32 microcontroller serves as the primary controller, processing sensor inputs, managing operating modes, and displaying system status on the OLED screen.',
      chips: ['ESP32 Microcontroller', 'OLED Status Screen', 'Circuit Wiring & Logic', 'Local IoT Hotspot']
    }
  },
  {
    image: 'assets/stage-3.png',
    hotspot: { x: '52%', y: '47%' },
    ms: {
      statusText: 'PERINGKAT 03 · TARIKAN & ALIRAN',
      stepNum: 'PERINGKAT 03',
      role: 'ISYARAT MEMANDU & SEDUTAN',
      hw: 'UV LED · KIPAS SEDUTAN · SALUR CO₂',
      headline: 'Tarikan CO₂, Cahaya UV & Aliran Udara Sedutan',
      desc: 'Gas CO₂ menyerupai hembusan nafas manusia untuk menarik nyamuk, manakala lampu UV memberikan panduan visual tambahan dan kipas menghasilkan aliran udara ke arah bawah.',
      chips: ['Jalur LED Ultraviolet', 'Kipas Sedutan Udara', 'Pelepasan Gas CO₂', 'Kamera Terbuka 360°']
    },
    en: {
      statusText: 'STAGE 03 · ATTRACTION & AIRFLOW',
      stepNum: 'STAGE 03',
      role: 'GUIDING SIGNALS & SUCTION',
      hw: 'UV LED · EXHAUST FAN · CO₂ STREAM',
      headline: 'CO₂ Attraction, UV Illumination & Downward Airflow',
      desc: 'CO₂ resembles a cue from human respiration to attract mosquitoes, while UV light provides an additional visual cue and the fan creates downward suction toward the trap.',
      chips: ['UV LED Strip', 'Suction Exhaust Fan', 'CO₂ Plume Emission', '360° Open Chamber']
    }
  },
  {
    image: 'assets/stage-4.png',
    hotspot: { x: '54%', y: '62%' },
    ms: {
      statusText: 'PERINGKAT 04 · TANGKAPAN',
      stepNum: 'PERINGKAT 04',
      role: 'RUANG PENAHANAN FIZIKAL',
      hw: 'LACI BOLEH TARIK · JARING HALUS',
      headline: 'Laci Tangkapan Boleh Tarik & Bakul Jaring Halus',
      desc: 'Bakul jaring halus menahan nyamuk yang disedut dengan selamat tanpa semburan kimia, serta boleh ditarik keluar dengan mudah untuk pemeriksaan dan pembersihan.',
      chips: ['Bakul Jaring Halus', 'Laci Tarik Modular', 'Pemegang Ergonomik', 'Bebas Racun Kimia']
    },
    en: {
      statusText: 'STAGE 04 · CAPTURE',
      stepNum: 'STAGE 04',
      role: 'PHYSICAL CONTAINMENT CHAMBER',
      hw: 'SLIDE-OUT TRAY · FINE MESH BASKET',
      headline: 'Removable Capture Drawer & Fine Mesh Basket',
      desc: 'The fine mesh basket securely retains mosquitoes without toxic sprays and can be easily removed for inspection and maintenance.',
      chips: ['Fine Mesh Retainer', 'Modular Slide-out Drawer', 'Ergonomic Handle', 'Chemical-Free Trap']
    }
  },
  {
    image: 'assets/stage-5.png',
    hotspot: { x: '50%', y: '78%' },
    ms: {
      statusText: 'PERINGKAT 05 · PENGHASIL CO₂',
      stepNum: 'PERINGKAT 05',
      role: 'PENJANAAN BIOLOGIKAL',
      hw: 'BEKAS PENAPAIAN · CAMPURAN MESRA ALAM',
      headline: 'Bekas Penapaian Semula Jadi Penghasil CO₂',
      desc: 'Campuran yis, gula dan air suam di dalam bekas penapaian bahagian bawah menghasilkan gas CO₂ secara semula jadi sebagai isyarat tarikan biologi yang selamat.',
      chips: ['Bekas Makanan Lutsinar', 'Campuran Yis & Gula', 'Penapaian Semula Jadi', 'Pintu Akses Berengsel']
    },
    en: {
      statusText: 'STAGE 05 · CO₂ GENERATOR',
      stepNum: 'STAGE 05',
      role: 'BIOLOGICAL SCENT GENERATION',
      hw: 'FERMENTATION CONTAINER · ECO MIXTURE',
      headline: 'Natural Fermentation CO₂ Bio-Generator',
      desc: 'Yeast, sugar, and warm water ferment inside the lower container to produce CO₂ naturally as a safe biological attraction cue.',
      chips: ['Transparent Container', 'Yeast & Sugar Solution', 'Natural Fermentation', 'Hinged Service Door']
    }
  }
];

// Preload the five detail images for instant zero-lag switching
[1, 2, 3, 4, 5].forEach((num) => {
  const img = new Image();
  img.src = `assets/stage-${num}.png`;
});

function renderXrayStage(stageIndex, smoothCamera = true) {
  activeXrayStage = stageIndex;
  const exhibit = $('#xrayExhibit');
  if (!exhibit) return;

  exhibit.setAttribute('data-active-stage', String(stageIndex));

  // Update Mission Stage Nav Buttons
  $$('.stage-nav-btn').forEach((btn) => {
    const isSelected = Number(btn.dataset.stage) === stageIndex;
    btn.classList.toggle('active', isSelected);
    btn.setAttribute('aria-selected', String(isSelected));
    btn.tabIndex = isSelected ? 0 : -1;
  });

  // Update Interactive Hotspots
  $$('.xray-hotspot').forEach((spot) => {
    const isCurrent = Number(spot.dataset.hotspot) === stageIndex;
    spot.classList.toggle('active', isCurrent);
    spot.setAttribute('aria-pressed', String(isCurrent));
  });

  const focusRing = $('#xrayFocusRing');
  const statusText = $('#missionStatusText');

  if (stageIndex === 0) {
    if (focusRing) {
      focusRing.style.opacity = '0';
      focusRing.style.transform = 'translate(-50%, -50%) scale(0)';
    }
    if (statusText) {
      statusText.textContent = currentLanguage === 'en' ? 'FULL DEVICE OVERVIEW' : 'PANDANGAN KESELURUHAN';
    }
    return;
  }

  const stageData = stagesData[stageIndex];
  if (!stageData) return;

  const info = stageData[currentLanguage] || stageData.ms;

  // Move & Show Focus Ring
  if (focusRing) {
    focusRing.style.left = stageData.hotspot.x;
    focusRing.style.top = stageData.hotspot.y;
    focusRing.style.opacity = '1';
    focusRing.style.transform = 'translate(-50%, -50%) scale(1)';
  }

  // Update Status Pill
  if (statusText) {
    statusText.textContent = info.statusText;
  }

  // Update Detail View Media & Content
  const detailImg = $('#stageDetailImg');
  if (detailImg) {
    detailImg.src = stageData.image;
    detailImg.alt = info.headline;
  }

  const stepNum = $('#detailStepNum');
  if (stepNum) stepNum.textContent = info.stepNum;

  const roleTag = $('#detailRoleTag');
  if (roleTag) roleTag.textContent = info.role;

  const hwTag = $('#detailHwTag');
  if (hwTag) hwTag.textContent = info.hw;

  const headline = $('#detailHeadline');
  if (headline) headline.textContent = info.headline;

  const desc = $('#detailDescription');
  if (desc) desc.textContent = info.desc;

  const chips = $('#detailChips');
  if (chips) {
    chips.innerHTML = info.chips.map(c => `<span>${c}</span>`).join('');
  }
}

// Stage Nav Buttons in Top Mission Bar
$$('.stage-nav-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    renderXrayStage(Number(btn.dataset.stage));
  });
});

// Interactive Hotspot Pins on Device
$$('.xray-hotspot').forEach((spot) => {
  spot.addEventListener('click', () => {
    renderXrayStage(Number(spot.dataset.hotspot));
  });
});

// Cards in Mission Control Overview
$$('.mission-card').forEach((card) => {
  card.addEventListener('click', () => {
    renderXrayStage(Number(card.dataset.stage));
  });
});

// Reset & Back Buttons
$('#btnResetView')?.addEventListener('click', () => renderXrayStage(0));
$('#btnBackToFull')?.addEventListener('click', () => renderXrayStage(0));

// Previous & Next Navigation Buttons
$('#btnPrevStage')?.addEventListener('click', () => {
  const target = activeXrayStage > 1 ? activeXrayStage - 1 : 5;
  renderXrayStage(target);
});

$('#btnNextStage')?.addEventListener('click', () => {
  const target = activeXrayStage < 5 ? activeXrayStage + 1 : 1;
  renderXrayStage(target);
});

// Keyboard Navigation & Accessibility (Escape to exit, Arrow keys to navigate)
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (activeXrayStage !== 0) {
      renderXrayStage(0);
    }
  } else if (event.key === 'ArrowLeft' && activeXrayStage > 0) {
    const target = activeXrayStage > 1 ? activeXrayStage - 1 : 5;
    renderXrayStage(target);
  } else if (event.key === 'ArrowRight' && activeXrayStage > 0) {
    const target = activeXrayStage < 5 ? activeXrayStage + 1 : 1;
    renderXrayStage(target);
  }
});

const modes = [
  {
    video: 'assets/manual-mode.mp4', glow: 'rgba(76,255,175,.15)',
    ms: { context:'RUMAH · DEMONSTRASI', name:'MANUAL', description:'Kawalan terus melalui papan pemuka atau butang fizikal apabila pengguna mahu menghidupkan dan mematikan sistem sendiri.', trigger:'Pencetus: Arahan pengguna', best:'Sesuai: Kawalan dalaman', status:'MANUAL AKTIF' },
    en: { context:'HOME · DEMONSTRATION', name:'MANUAL', description:'Direct control through the dashboard or physical button whenever the user wants to switch the system on or off.', trigger:'Trigger: User command', best:'Best for: Indoor control', status:'MANUAL ACTIVE' }
  },
  {
    video: 'assets/auto-ldr-mode.mp4', glow: 'rgba(112,95,255,.20)',
    ms: { context:'BERANDA · KAWASAN BERLINDUNG', name:'AUTO LDR', description:'Sensor cahaya mengesan keadaan gelap dan mengaktifkan sistem secara automatik tanpa kawalan berulang.', trigger:'Pencetus: Tahap cahaya', best:'Sesuai: Senja dan malam', status:'LDR MEMANTAU' },
    en: { context:'VERANDA · SHELTERED AREA', name:'AUTO LDR', description:'The light sensor detects darkness and activates the system automatically without repeated manual control.', trigger:'Trigger: Light level', best:'Best for: Dusk and night', status:'LDR MONITORING' }
  },
  {
    video: 'assets/timer-mode.mp4', glow: 'rgba(44,198,255,.18)',
    ms: { context:'SEKOLAH · PEJABAT · DEWAN', name:'PEMASA', description:'Operasi mengikut jadual yang boleh diselaraskan pada bila-bila masa—contohnya diselaraskan sekitar awal pagi dan lewat petang mengikut rutin lokasi, tanpa mendakwa nyamuk hanya aktif pada waktu tersebut.', trigger:'Pencetus: Jadual masa fleksibel', best:'Sesuai: Waktu rutin lokasi', status:'PEMASA DIJADUALKAN' },
    en: { context:'SCHOOL · OFFICE · HALL', name:'TIMER', description:'Configurable scheduled operation that can be set for chosen hours—such as around early morning and late afternoon according to routine site needs, without claiming mosquitoes are active only during those times.', trigger:'Trigger: Flexible time schedule', best:'Best for: Routine site hours', status:'TIMER SCHEDULED' }
  }
];

let modeSwitchToken = 0;

function renderMode(index, animate = true) {
  activeModeIndex = index;
  const modeConfig = modes[index];
  const mode = modeConfig[currentLanguage];
  $('#modeIndex').textContent = `0${index + 1} / 03`;
  $('#modeContext').textContent = mode.context;
  $('#modeName').textContent = mode.name;
  $('#modeDescription').textContent = mode.description;
  $('#modeTrigger').textContent = mode.trigger;
  $('#modeBest').textContent = mode.best;
  $('#modeStatus').textContent = mode.status;
  $('.mode-viewer').style.background = `radial-gradient(circle at 72% 26%,${modeConfig.glow},transparent 38%),rgba(255,255,255,.018)`;
  $('#modePoster').alt = `Visual mod ${mode.name} AEDES-X`;
  $('#modePoster').style.transform = `translateY(${index === 1 ? -6 : index === 2 ? 4 : 0}px) scale(${index === 1 ? 1.035 : 1})`;

  const video = $('#modeVideo');
  const visual = $('.mode-visual');
  const sourceChanged = video.getAttribute('src') !== modeConfig.video;
  if (sourceChanged) {
    const token = ++modeSwitchToken;
    video.pause();
    if (animate) visual.classList.add('switching');
    setTimeout(() => {
      if (token !== modeSwitchToken) return;
      video.setAttribute('src', modeConfig.video);
      video.load();
      visual.classList.add('has-video');
      video.play().catch(() => {});
      visual.classList.remove('switching');
    }, animate ? 220 : 0);
  }

  $$('.mode-button').forEach((button, buttonIndex) => {
    const active = buttonIndex === index;
    button.classList.toggle('active', active);
    button.setAttribute('aria-selected', String(active));
  });
}

const modeSelector = $('#modeSelector');

function scrollModeTo(index) {
  const button = $$('.mode-button')[index];
  const left = button.offsetLeft - (modeSelector.clientWidth - button.offsetWidth) / 2;
  modeSelector.scrollTo({ left, behavior: 'smooth' });
}

$$('.mode-button').forEach((button, index) => button.addEventListener('click', () => {
  renderMode(index);
  scrollModeTo(index);
}));

$('#modePrev').addEventListener('click', () => {
  const index = Math.max(0, activeModeIndex - 1);
  renderMode(index);
  scrollModeTo(index);
});

$('#modeNext').addEventListener('click', () => {
  const index = Math.min(modes.length - 1, activeModeIndex + 1);
  renderMode(index);
  scrollModeTo(index);
});

modeSelector.addEventListener('wheel', (event) => {
  if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
    event.preventDefault();
    modeSelector.scrollLeft += event.deltaY;
  }
}, { passive: false });

let modeScrollTimer;
modeSelector.addEventListener('scroll', () => {
  clearTimeout(modeScrollTimer);
  modeScrollTimer = setTimeout(() => {
    const center = modeSelector.scrollLeft + modeSelector.clientWidth / 2;
    const buttons = $$('.mode-button');
    let closest = 0;
    let distance = Infinity;
    buttons.forEach((button, index) => {
      const buttonCenter = button.offsetLeft + button.offsetWidth / 2;
      const nextDistance = Math.abs(buttonCenter - center);
      if (nextDistance < distance) { distance = nextDistance; closest = index; }
    });
    if (closest !== activeModeIndex) renderMode(closest);
  }, 140);
}, { passive: true });

const modeVideo = $('#modeVideo');
modeVideo.addEventListener('timeupdate', () => {
  const progress = modeVideo.duration ? modeVideo.currentTime / modeVideo.duration * 100 : 0;
  $('#modeVideoProgress').style.width = `${progress}%`;
});

const comparisons = [
  {
    image:'assets/compare-fogging.webp',
    ms:{name:'Fogging', alt:'Operasi fogging di kawasan perumahan', summary:'Rawatan kawasan yang lazimnya dijalankan oleh petugas terlatih pada masa tertentu.', headline:'Kawalan pintar berbanding rawatan berkala', detail:'AEDES-X direka untuk operasi setempat yang boleh dipantau, manakala fogging ialah rawatan kawasan pada masa tertentu.', rows:[['Cara utama','Perangkap CO₂ + UV + aliran udara','Rawatan ruang/kawasan'],['Bahan kimia semburan','Tidak','Ya'],['Kawalan pengguna','Dashboard + butang fizikal','Dilaksana petugas'],['Operasi automatik','Auto LDR + Pemasa','Bukan operasi berterusan']]},
    en:{name:'Fogging', alt:'Fogging operation in a residential area', summary:'An area treatment commonly carried out by trained personnel at selected times.', headline:'Smart control versus periodic treatment', detail:'AEDES-X is designed for monitored local operation, while fogging is an area treatment performed at selected times.', rows:[['Main approach','CO₂ + UV + airflow trap','Space/area treatment'],['Chemical spray','No','Yes'],['User control','Dashboard + physical button','Operator-led'],['Automatic operation','Auto LDR + Timer','Not continuous operation']]}
  },
  {
    image:'assets/compare-aerosol.webp',
    ms:{name:'Semburan aerosol', alt:'Tin semburan aerosol serangga', summary:'Pilihan mudah alih untuk penggunaan terus pada ruang atau sasaran tertentu.', headline:'Sistem boleh dipantau berbanding semburan segera', detail:'AEDES-X menawarkan kawalan mod dan status sistem; aerosol memerlukan semburan manual berulang mengikut keperluan.', rows:[['Cara utama','Menarik dan memerangkap','Semburan langsung'],['Bahan kimia semburan','Tidak','Ya'],['Kawalan pengguna','Dashboard + butang fizikal','Tekan tin secara manual'],['Peringatan penyelenggaraan','Ada dalam dashboard','Tiada']]},
    en:{name:'Aerosol spray', alt:'Insect aerosol spray cans', summary:'A portable option for direct use in a selected space or on a target.', headline:'A monitorable system versus immediate spraying', detail:'AEDES-X provides mode control and system status; aerosol requires repeated manual spraying when needed.', rows:[['Main approach','Attracts and captures','Direct spray'],['Chemical spray','No','Yes'],['User control','Dashboard + physical button','Manual can operation'],['Maintenance reminder','Available in dashboard','None']]}
  },
  {
    image:'assets/compare-coil.webp',
    ms:{name:'Lingkaran nyamuk', alt:'Lingkaran nyamuk dalam pembungkusan', summary:'Kaedah ringkas tanpa bekalan elektrik yang membebaskan asap ketika dibakar.', headline:'Perangkap berasaskan sensor berbanding kaedah pembakaran', detail:'AEDES-X menggunakan sensor dan kawalan elektronik; lingkaran nyamuk perlu dinyalakan dan menghasilkan asap semasa digunakan.', rows:[['Cara utama','Tarikan + tangkapan fizikal','Asap penghalau'],['Api atau pembakaran','Tidak','Ya'],['Kawalan pengguna','3 mod operasi','Nyalakan / padamkan'],['Pemantauan sistem','Status pada dashboard','Tiada']]},
    en:{name:'Mosquito coil', alt:'Mosquito coil and packaging', summary:'A simple no-electricity method that releases smoke while burning.', headline:'Sensor-based trapping versus a burning method', detail:'AEDES-X uses sensors and electronic controls; a mosquito coil must be lit and releases smoke during use.', rows:[['Main approach','Attraction + physical capture','Repellent smoke'],['Flame or burning','No','Yes'],['User control','3 operating modes','Light / extinguish'],['System monitoring','Dashboard status','None']]}
  },
  {
    image:'assets/compare-uv.webp',
    ms:{name:'Perangkap UV biasa', alt:'Perangkap serangga UV biasa', summary:'Peranti elektrik yang lazimnya menggunakan cahaya UV sebagai tarikan utama.', headline:'Tarikan berbilang isyarat berbanding cahaya sahaja', detail:'AEDES-X menambah CO₂, aliran udara, tiga mod dan kawalan IoT kepada tarikan UV. Ciri perangkap UV komersial boleh berbeza mengikut model.', rows:[['Isyarat tarikan','CO₂ + UV','Kebiasaannya UV'],['Aliran udara','Kipas sedutan 5V','Bergantung pada model'],['Kawalan pintar','Dashboard + 3 mod','Bergantung pada model'],['Sokongan kuasa','Panel solar membantu kuasa','Kebiasaannya kuasa utama']]},
    en:{name:'Standard UV trap', alt:'Standard UV insect trap', summary:'An electrical device that commonly uses UV light as its primary attraction method.', headline:'Multiple attraction signals versus light alone', detail:'AEDES-X adds CO₂, airflow, three modes and IoT control to UV attraction. Commercial UV-trap features vary by model.', rows:[['Attraction signal','CO₂ + UV','Typically UV'],['Airflow','5V suction fan','Model-dependent'],['Smart control','Dashboard + 3 modes','Model-dependent'],['Power support','Solar-assisted','Typically mains power']]}
  }
];

function renderComparison(index, animate = true) {
  const stage = $('#compareLab');
  if (!stage) return;
  activeCompareIndex = index;
  const item = comparisons[index][currentLanguage];
  const image = $('#compareImage');
  if (animate) stage.classList.add('is-switching');
  setTimeout(() => {
    image.src = comparisons[index].image;
    image.alt = item.alt;
    $('#compareName').textContent = item.name;
    $('#compareSummary').textContent = item.summary;
    $('#compareHeadline').textContent = item.headline;
    $('#compareDetail').textContent = item.detail;
    const countEl = $('#compareCount'); if (countEl) countEl.textContent = String(index + 1).padStart(2, '0');
    $('#compareMatrix').innerHTML = item.rows.map((row) => `<div class="compare-row"><span>${row[0]}</span><b><i>✓</i>${row[1]}</b><em>${row[2]}</em></div>`).join('');
    $$('.compare-tab').forEach((button, buttonIndex) => {
      const active = buttonIndex === index;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', String(active));
    });
    stage.classList.remove('is-switching');
  }, animate ? 170 : 0);
}

$$('.compare-tab').forEach((button, index) => button.addEventListener('click', () => renderComparison(index)));

$$('[data-tilt]').forEach((card) => {
  card.addEventListener('pointermove', (event) => {
    if (matchMedia('(pointer: coarse)').matches) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    card.style.transform = `perspective(900px) rotateY(${x * 4}deg) rotateX(${y * -4}deg) translateY(-3px)`;
  });
  card.addEventListener('pointerleave', () => { card.style.transform = ''; });
});

function showScreen(index) {
  $$('.screens img').forEach((image, imageIndex) => image.classList.toggle('active', imageIndex === index));
  $$('.screen-nav button').forEach((button, buttonIndex) => button.classList.toggle('active', buttonIndex === index));
}

$$('.screen-nav button').forEach((button, index) => button.addEventListener('click', () => showScreen(index)));
let screenIndex = 0;
setInterval(() => {
  if (!document.hidden) {
    screenIndex = (screenIndex + 1) % 4;
    showScreen(screenIndex);
  }
}, 4800);

const modal = $('#teaserModal');
$('#playTeaser')?.addEventListener('click', () => {
  if (modal) {
    modal.showModal();
    modal.querySelector('video')?.play();
  }
});
$('.modal-close')?.addEventListener('click', () => {
  if (modal) {
    modal.querySelector('video')?.pause();
    modal.close();
  }
});
const navToggle = $('#navToggle');
const mobileNav = $('#mobileNav');
const navClose = $('#navClose');
const navBackdrop = $('#navBackdrop');

function openMobileNav() {
  if (!mobileNav || !navToggle) return;
  navToggle.setAttribute('aria-expanded', 'true');
  navToggle.classList.add('active');
  mobileNav.classList.add('open');
  mobileNav.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
  if (!mobileNav || !navToggle) return;
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.classList.remove('active');
  mobileNav.classList.remove('open');
  mobileNav.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = mobileNav && mobileNav.classList.contains('open');
    if (isOpen) closeMobileNav(); else openMobileNav();
  });
}
if (navClose) navClose.addEventListener('click', closeMobileNav);
if (navBackdrop) navBackdrop.addEventListener('click', closeMobileNav);

$$('.mobile-nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    closeMobileNav();
  });
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && mobileNav && mobileNav.classList.contains('open')) {
    closeMobileNav();
  }
});

// =====================================================================
// SECTION 03 · CINEMATIC "IKUTI PERJALANAN NYAMUK" STORYBOARD CONTROLLER
// =====================================================================
const storyChapters = {
  1: {
    ms: {
      badge: 'BABAK 01 / 04',
      principle: 'PRINSIP BIOLOGI · ISYARAT AROMA',
      title: '1. Penapaian Menjana Gas CO₂ Semula Jadi',
      desc: 'Bancuhan air suam, yis dan gula di bahagian bawah bekas menghasilkan gas karbon dioksida (CO₂) secara berterusan. Gas ini meruap naik ke udara, menyerupai hembusan nafas manusia untuk menarik perhatian nyamuk dari jarak jauh.',
      stemHeading: 'Prinsip Sains:',
      stemDetail: 'Nyamuk betina menggunakan reseptor deria bau khusus untuk mengesan kepekatan gas CO₂ sebagai isyarat kehadiran mangsa.'
    },
    en: {
      badge: 'CHAPTER 01 / 04',
      principle: 'BIOLOGY PRINCIPLE · SCENT CUES',
      title: '1. Natural Fermentation Generates CO₂',
      desc: 'A warm water, yeast, and sugar mixture at the base container produces continuous carbon dioxide (CO₂). This gas rises into the air, resembling human breath cues to attract mosquitoes from afar.',
      stemHeading: 'Science Principle:',
      stemDetail: 'Female mosquitoes use specialized olfactory receptors to detect rising CO₂ gradients as an indicator of potential hosts.'
    }
  },
  2: {
    ms: {
      badge: 'BABAK 02 / 04',
      principle: 'PRINSIP OPTIK · PANDUAN VISUAL',
      title: '2. Cahaya UV Memandu Nyamuk Mendekat',
      desc: 'Semasa nyamuk menghampiri sumber aroma dalam suasana senja atau malap, cahaya ultraungu (UV) menyediakan isyarat visual tambahan yang memandu arah terbangnya terus ke perimeter bukaan perangkap.',
      stemHeading: 'Fizik Optik:',
      stemDetail: 'Mata majmuk serangga mempunyai kepekaan fotoreseptor tinggi terhadap jarak gelombang UV dalam keadaan cahaya persekitaran rendah.'
    },
    en: {
      badge: 'CHAPTER 02 / 04',
      principle: 'OPTICAL PRINCIPLE · VISUAL GUIDANCE',
      title: '2. UV Light Guides the Mosquito Closer',
      desc: 'As the mosquito approaches the scent source in dim or evening light, gentle ultraviolet (UV) illumination provides a secondary visual cue guiding its flight path toward the trap perimeter.',
      stemHeading: 'Optical Physics:',
      stemDetail: 'Insect compound eyes exhibit high photoreceptor sensitivity toward UV wavelengths under low ambient light conditions.'
    }
  },
  3: {
    ms: {
      badge: 'BABAK 03 / 04',
      principle: 'AERODINAMIK · SEDUTAN FIZIKAL',
      title: '3. Aliran Udara Menarik Nyamuk ke Dalam Corong',
      desc: 'Kipas sedutan 5V menjana pusaran aliran udara ke arah bawah. Sebaik sahaja nyamuk melepasi perimeter sedutan, daya aliran udara menariknya masuk ke dalam corong perangkap sebelum sempat berpatah balik.',
      stemHeading: 'Mekanik Bendalir:',
      stemDetail: 'Halaju sedutan udara kipas mengatasi daya tujahan kepak nyamuk bersaiz kecil untuk mengarahkannya ke ruang tangkapan.'
    },
    en: {
      badge: 'CHAPTER 03 / 04',
      principle: 'AERODYNAMICS · MECHANICAL SUCTION',
      title: '3. Airflow Pulls the Mosquito Downward',
      desc: 'A 5V suction fan generates downward airflow. As soon as the mosquito crosses the intake perimeter, gentle suction draws it into the trap funnel before it can fly away.',
      stemHeading: 'Fluid Mechanics:',
      stemDetail: 'Inward airflow velocity overcomes the low flight thrust of small mosquitoes, directing them toward the capture chamber.'
    }
  },
  4: {
    ms: {
      badge: 'BABAK 04 / 04',
      principle: 'PENAHANAN FIZIKAL · BEBAS RACUN',
      title: '4. Tertahan Selamat di Bakul Jaring Halus',
      desc: 'Perjalanan nyamuk berakhir di bakul jaring halus jenis laci boleh tanggal. Udara mengalir keluar dengan lancar melalui lubang jaring sementara serangga tertahan secara fizikal tanpa sebarang racun kimia.',
      stemHeading: 'Reka Bentuk Selamat & Mampan:',
      stemDetail: 'Jaring mikron membenarkan peredaran udara berterusan sambil memudahkan pelupusan dan pemeriksaan yang bersih.'
    },
    en: {
      badge: 'CHAPTER 04 / 04',
      principle: 'MECHANICAL RETENTION · CHEMICAL-FREE',
      title: '4. Safely Retained in the Fine Mesh Basket',
      desc: 'The journey ends in the removable fine mesh basket drawer. Airflow exhausts smoothly through the mesh while mosquitoes are safely retained without any hazardous chemical poisons.',
      stemHeading: 'Safe & Sustainable Design:',
      stemDetail: 'Micron mesh enables continuous ventilation while making hygienic inspection and removal safe and simple.'
    }
  }
};

function renderStoryChapter(chapterNum, animate = true) {
  if (chapterNum < 1) chapterNum = 1;
  if (chapterNum > 4) chapterNum = 4;
  activeStoryChapter = chapterNum;

  const theater = $('#storyTheater');
  if (theater) theater.setAttribute('data-active-chapter', String(chapterNum));

  // Update tabs
  $$('.chapter-btn').forEach((btn) => {
    const isAct = Number(btn.dataset.chapter) === chapterNum;
    btn.classList.toggle('active', isAct);
    btn.setAttribute('aria-selected', String(isAct));
  });

  const data = storyChapters[chapterNum][currentLanguage];
  const badge = $('#storyChapBadge');
  const principle = $('#storyPrincipleTag');
  const title = $('#storyCardTitle');
  const text = $('#storyCardText');
  const stemHeading = $('#storyStemHeading');
  const stemDetail = $('#storyStemDetail');

  if (badge) badge.textContent = data.badge;
  if (principle) principle.textContent = data.principle;
  if (title) title.textContent = data.title;
  if (text) text.textContent = data.desc;
  if (stemHeading) stemHeading.textContent = data.stemHeading;
  if (stemDetail) stemDetail.textContent = data.stemDetail;
}

// Chapter button clicks
$$('.chapter-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    stopStoryPlayback();
    renderStoryChapter(Number(btn.dataset.chapter));
  });
});

// Previous / Next Chapter Buttons
$('#storyPrevBtn')?.addEventListener('click', () => {
  stopStoryPlayback();
  const prev = activeStoryChapter > 1 ? activeStoryChapter - 1 : 4;
  renderStoryChapter(prev);
});

$('#storyNextBtn')?.addEventListener('click', () => {
  stopStoryPlayback();
  const next = activeStoryChapter < 4 ? activeStoryChapter + 1 : 1;
  renderStoryChapter(next);
});

// Sequential 10-15s Animated Playback Controller
let storyPlaybackInterval = null;
let isStoryPlaying = false;
const STORY_TOTAL_DURATION = 12000; // 12 seconds total (~3.0s per chapter)
const CHAPTER_DURATION = STORY_TOTAL_DURATION / 4;
let storyStartTime = 0;
let storyElapsedBeforePause = 0;

function updateStoryPlayButtonUI() {
  const btn = $('#btnPlayStory');
  const icon = $('#playIcon');
  const label = $('#playStoryLabel');
  if (!btn || !label) return;

  if (isStoryPlaying) {
    btn.classList.add('playing');
    if (icon) icon.textContent = '⏸';
    label.textContent = translations[currentLanguage].btnPauseStory;
  } else {
    btn.classList.remove('playing');
    if (icon) icon.textContent = '▶';
    label.textContent = activeStoryChapter === 4 && storyElapsedBeforePause >= STORY_TOTAL_DURATION
      ? translations[currentLanguage].btnReplayStory
      : translations[currentLanguage].btnPlayStory;
  }
}

function stopStoryPlayback(resetToStart = false) {
  isStoryPlaying = false;
  if (storyPlaybackInterval) {
    cancelAnimationFrame(storyPlaybackInterval);
    storyPlaybackInterval = null;
  }
  if (resetToStart) {
    storyElapsedBeforePause = 0;
    const progressFill = $('#playProgressFill');
    if (progressFill) progressFill.style.width = '0%';
  }
  updateStoryPlayButtonUI();
}

function startStoryPlayback() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    renderStoryChapter(activeStoryChapter < 4 ? activeStoryChapter + 1 : 1);
    return;
  }

  if (storyElapsedBeforePause >= STORY_TOTAL_DURATION || activeStoryChapter === 4) {
    storyElapsedBeforePause = 0;
    renderStoryChapter(1);
  }

  isStoryPlaying = true;
  storyStartTime = performance.now() - storyElapsedBeforePause;
  updateStoryPlayButtonUI();

  const progressFill = $('#playProgressFill');

  function tickStory(now) {
    if (!isStoryPlaying) return;
    const elapsed = now - storyStartTime;
    storyElapsedBeforePause = elapsed;

    const progress = Math.min(100, (elapsed / STORY_TOTAL_DURATION) * 100);
    if (progressFill) progressFill.style.width = `${progress}%`;

    const targetChapter = Math.min(4, Math.floor(elapsed / CHAPTER_DURATION) + 1);
    if (targetChapter !== activeStoryChapter) {
      renderStoryChapter(targetChapter);
    }

    if (elapsed >= STORY_TOTAL_DURATION) {
      stopStoryPlayback(false);
      renderStoryChapter(4);
      if (progressFill) progressFill.style.width = '100%';
      return;
    }

    storyPlaybackInterval = requestAnimationFrame(tickStory);
  }

  storyPlaybackInterval = requestAnimationFrame(tickStory);
}

$('#btnPlayStory')?.addEventListener('click', () => {
  if (isStoryPlaying) {
    stopStoryPlayback(false);
  } else {
    startStoryPlayback();
  }
});

// =====================================================================
// SECTION 07 · COMPARE COLLAPSIBLE ACCORDION
// =====================================================================
const btnToggleCompare = $('#btnToggleCompare');
const compareCollapsible = $('#compareCollapsibleWrapper');

if (btnToggleCompare && compareCollapsible) {
  btnToggleCompare.addEventListener('click', () => {
    const isExpanded = compareCollapsible.classList.contains('expanded');
    compareCollapsible.classList.toggle('expanded', !isExpanded);
    btnToggleCompare.classList.toggle('expanded', !isExpanded);
    btnToggleCompare.setAttribute('aria-expanded', String(!isExpanded));
    compareCollapsible.setAttribute('aria-hidden', String(isExpanded));
  });
}


// =====================================================================
// SECTION 08 · VALIDATION DRAWERS CONTROLLER
// =====================================================================
$$('.val-toggle-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.target;
    const targetDrawer = $(`#valDrawer${targetId}`);
    const card = btn.closest('.val-summary-card');
    const isCurrentlyOpen = targetDrawer && targetDrawer.classList.contains('open');

    // Close all drawers first
    $$('.val-drawer').forEach((d) => {
      d.classList.remove('open');
      d.setAttribute('aria-hidden', 'true');
    });
    $$('.val-summary-card').forEach((c) => c.classList.remove('active-card'));
    $$('.val-toggle-btn').forEach((b) => {
      b.setAttribute('aria-expanded', 'false');
      const textSpan = b.querySelector('.val-btn-text');
      if (textSpan) {
        textSpan.innerHTML = translations[currentLanguage].valToggleDetails;
      }
    });

    // If it wasn't open, open this one
    if (!isCurrentlyOpen && targetDrawer) {
      targetDrawer.classList.add('open');
      targetDrawer.setAttribute('aria-hidden', 'false');
      if (card) card.classList.add('active-card');
      btn.setAttribute('aria-expanded', 'true');
      const textSpan = btn.querySelector('.val-btn-text');
      if (textSpan) {
        textSpan.innerHTML = translations[currentLanguage].valToggleClose;
      }

      if (window.innerWidth <= 768) {
        setTimeout(() => {
          targetDrawer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 120);
      }
    }
  });
});

$$('.val-drawer-close').forEach((closeBtn) => {
  closeBtn.addEventListener('click', () => {
    const targetId = closeBtn.dataset.close;
    const targetDrawer = $(`#valDrawer${targetId}`);
    const toggleBtn = $(`.val-toggle-btn[data-target="${targetId}"]`);
    const card = toggleBtn ? toggleBtn.closest('.val-summary-card') : null;

    if (targetDrawer) {
      targetDrawer.classList.remove('open');
      targetDrawer.setAttribute('aria-hidden', 'true');
    }
    if (card) card.classList.remove('active-card');
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-expanded', 'false');
      const textSpan = toggleBtn.querySelector('.val-btn-text');
      if (textSpan) {
        textSpan.innerHTML = translations[currentLanguage].valToggleDetails;
      }
    }
  });
});

// Initialise language and state
applyLanguage(currentLanguage);

