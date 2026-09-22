import { profile } from '../../data/profile'
import './Footer.css'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p className="footer-log">
          &gt; fim do processo <span>ok</span>
        </p>
        <p>
          Desenhado e desenvolvido por {profile.name} · {new Date().getFullYear()}
        </p>
        <a href="#inicio" className="footer-top">
          Voltar ao topo ↑
        </a>
      </div>
    </footer>
  )
}
