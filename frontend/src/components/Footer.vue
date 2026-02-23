<template>
  <footer class="footer">
    <div class="footer-glow"></div>
    
    <div class="container">
      <div class="footer-content">
        <!-- Brand Section -->
        <div class="footer-brand">
          <div class="brand-logo">
            <div class="logo-vinyl spinning">
              <span class="vinyl-inner"></span>
            </div>
            <div class="brand-text">
              <span class="brand-name">CRATE STUDIO</span>
              <span class="brand-tagline">Music • Dev • Creative</span>
            </div>
          </div>
          <p class="brand-description">
            Musician, developer, and creative. Building digital experiences 
            and making music with various bands.
          </p>
        </div>

        <!-- Quick Links -->
        <div class="footer-section">
          <h4 class="footer-title">Navigation</h4>
          <ul class="footer-links">
            <li><router-link to="/">Home</router-link></li>
            <li><a href="/#about">About</a></li>
            <li><a href="/#music">Music</a></li>
            <li><a href="/#gallery">Gallery</a></li>
            <li><router-link to="/guestbook">Live Chat</router-link></li>
          </ul>
        </div>

        <!-- Social Links -->
        <div class="footer-section">
          <h4 class="footer-title">Connect</h4>
          <div class="social-links">
            <a href="https://github.com" target="_blank" rel="noopener" class="social-link" title="GitHub">
              <i class="fab fa-github"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener" class="social-link" title="LinkedIn">
              <i class="fab fa-linkedin-in"></i>
            </a>
            <a href="https://spotify.com" target="_blank" rel="noopener" class="social-link" title="Spotify">
              <i class="fab fa-spotify"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener" class="social-link" title="Instagram">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener" class="social-link" title="YouTube">
              <i class="fab fa-youtube"></i>
            </a>
          </div>
          <a href="mailto:hello@cratestudio.com" class="email-link">
            <i class="fas fa-envelope"></i>
            hello@cratestudio.com
          </a>
        </div>

        <!-- Now Playing -->
        <div class="footer-section">
          <h4 class="footer-title">Currently Vibing</h4>
          <div class="now-playing">
            <div class="now-playing-art">
              <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=80&h=80&fit=crop" alt="Album art" />
              <div class="playing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
            <div class="now-playing-info">
              <span class="now-playing-title">Sample Track</span>
              <span class="now-playing-artist">Crate Studio</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <p class="copyright">
          &copy; {{ currentYear }} Crate Studio. Crafted with 
          <span class="heart">♥</span> and lots of coffee.
        </p>
        <div class="footer-meta">
          <span class="tech-stack">
            Built with Vue.js + NestJS + Supabase
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
.footer {
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  padding: 60px 0 30px;
  margin-top: auto;
  position: relative;
  overflow: hidden;
}

.footer-glow {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 200px;
  background: radial-gradient(ellipse at center, var(--accent-glow), transparent 70%);
  opacity: 0.3;
  pointer-events: none;
}

.footer-content {
  display: grid;
  grid-template-columns: 1.5fr repeat(3, 1fr);
  gap: 40px;
  margin-bottom: 40px;
}

/* Brand Section */
.footer-brand {
  max-width: 300px;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.logo-vinyl {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 0 15px var(--accent-glow);
}

.logo-vinyl.spinning {
  animation: spin-slow 8s linear infinite;
}

.logo-vinyl::before {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--gradient-glow);
}

.vinyl-inner {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--bg-primary);
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-name {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 1px;
}

.brand-tagline {
  font-size: 0.75rem;
  color: var(--accent-primary);
}

.brand-description {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

/* Footer Sections */
.footer-section {
  display: flex;
  flex-direction: column;
}

.footer-title {
  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-links a {
  font-size: 0.9rem;
  color: var(--text-secondary);
  transition: all 0.2s ease;
}

.footer-links a:hover {
  color: var(--accent-primary);
  padding-left: 5px;
}

/* Social Links */
.social-links {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
}

.social-link {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  color: var(--text-secondary);
  font-size: 1rem;
  transition: all 0.25s ease;
}

.social-link:hover {
  color: var(--accent-primary);
  border-color: var(--accent-primary);
  transform: translateY(-3px);
  box-shadow: 0 5px 15px var(--accent-glow);
}

.email-link {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: var(--text-secondary);
  transition: color 0.2s ease;
}

.email-link:hover {
  color: var(--accent-primary);
}

/* Now Playing */
.now-playing {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
}

.now-playing-art {
  width: 50px;
  height: 50px;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
}

.now-playing-art img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.playing-indicator {
  position: absolute;
  bottom: 4px;
  right: 4px;
  display: flex;
  gap: 2px;
  align-items: flex-end;
  background: rgba(0, 0, 0, 0.6);
  padding: 3px;
  border-radius: 3px;
}

.playing-indicator span {
  width: 3px;
  background: var(--accent-green);
  border-radius: 1px;
  animation: equalizer 0.8s ease infinite;
}

.playing-indicator span:nth-child(1) { height: 8px; animation-delay: 0s; }
.playing-indicator span:nth-child(2) { height: 12px; animation-delay: 0.2s; }
.playing-indicator span:nth-child(3) { height: 6px; animation-delay: 0.4s; }

@keyframes equalizer {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(0.5); }
}

.now-playing-info {
  display: flex;
  flex-direction: column;
}

.now-playing-title {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-primary);
}

.now-playing-artist {
  font-size: 0.8rem;
  color: var(--text-muted);
}

/* Footer Bottom */
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 30px;
  border-top: 1px solid var(--border-color);
}

.copyright {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.heart {
  color: var(--accent-red);
  animation: heartbeat 1.5s ease infinite;
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.tech-stack {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-muted);
  padding: 6px 12px;
  background: var(--bg-card);
  border-radius: var(--radius-full);
}

/* Responsive */
@media (max-width: 900px) {
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .footer-brand {
    grid-column: span 2;
    max-width: none;
  }
}

@media (max-width: 600px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .footer-brand {
    grid-column: span 1;
  }
  
  .footer-bottom {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
}
</style>
