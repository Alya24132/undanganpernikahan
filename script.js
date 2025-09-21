document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.getElementById('open-invitation');
  const mainContent = document.getElementById('main-content');
  const openingSection = document.getElementById('opening-section');

  const music = document.getElementById('musik');
  const musicIcon = document.getElementById('musicIcon');

  // Buka undangan: sembunyikan opening, tampilkan main content
  openBtn.addEventListener('click', () => {
      openingSection.classList.add('hidden');
      mainContent.classList.add('active');
    });

  const musik = document.getElementById("musik");
  const icon = document.getElementById("musicIcon");

  // Fungsi untuk mulai musik dan animasi
  function playMusic() {
    musik.play().then(() => {
      icon.style.animationPlayState = "running";
      icon.style.opacity = 1;
    }).catch((err) => {
      console.log("Autoplay diblokir, menunggu interaksi pengguna.");
    });
  }

  // Jalankan saat halaman dimuat
  window.addEventListener("load", () => {
    // Bypass autoplay diblokir dengan trigger user (misal: scroll pertama kali)
    const resumeMusic = () => {
      playMusic();
      window.removeEventListener("scroll", resumeMusic);
      window.removeEventListener("click", resumeMusic);
    };
    // Coba autoplay langsung
    playMusic();
    // Jika gagal, tunggu interaksi
    window.addEventListener("scroll", resumeMusic, { once: true });
    window.addEventListener("click", resumeMusic, { once: true });
  });

  // Toggle musik saat ikon diklikprofile-section
  icon.addEventListener("click", () => {
    if (musik.paused) {
      musik.play();
      icon.style.animationPlayState = "running";
      icon.style.opacity = 1;
    } else {
      musik.pause();
      icon.style.animationPlayState = "paused";
      icon.style.opacity = 0.5;
    }
  });

  // Countdown Timer
  const countdownDate = new Date('December 12, 2025 09:00:00').getTime();

  const daysSpan = document.getElementById('days');
  const hoursSpan = document.getElementById('hours');   
  const minutesSpan = document.getElementById('minutes');
  const secondsSpan = document.getElementById('seconds');

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    if (distance < 0) {
      daysSpan.textContent = '00';
      hoursSpan.textContent = '00';
      minutesSpan.textContent = '00';
      secondsSpan.textContent = '00';
      clearInterval(countdownInterval);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysSpan.textContent = days.toString().padStart(2, '0');
    hoursSpan.textContent = hours.toString().padStart(2, '0');
    minutesSpan.textContent = minutes.toString().padStart(2, '0');
    secondsSpan.textContent = seconds.toString().padStart(2, '0');
  }

  const countdownInterval = setInterval(updateCountdown, 1000);
  updateCountdown();

  // RSVP Form Handling
  const rsvpForm = document.getElementById('rsvp-form');
  const formMessage = document.getElementById('form-message');

  rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = rsvpForm.guestName.value.trim();
    const guestCount = rsvpForm.guestCount.value;
    const attendance = rsvpForm.attendance.value;

    if (!name || !guestCount || !attendance) {
      formMessage.textContent = 'Mohon lengkapi semua kolom.';
      formMessage.style.color = 'red';
      return;
    }

    // Simulasi kirim data (di sini bisa pakai AJAX jika ingin)
    formMessage.textContent = 'Terima kasih sudah mengonfirmasi kehadiran!';
    formMessage.style.color = '#682d63';

    rsvpForm.reset();
  });
});