import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Heart, Lock, Sparkles, Music2, Camera, Mail, Gift, ArrowDown,
  ChevronLeft, ChevronRight, X, Play, Pause
} from "lucide-react";
import "./styles.css";

const CONFIG = {
  nomeDela: "Nenemguinha",
  nomeDele: "Davi",
  senha: "2904",
  musicaNome: "Lembrei de Nós",
  musicaArtista: "João Gomes",
  musicaUrl: "https://cdn.imageurlgenerator.com/uploads/dfff5f39-f256-42d3-a781-13ed1ee62daf.wav", // opcional: coloque aqui uma URL pública de áudio
  fotos: [
    { src: "/fotos/foto1.jpg", legenda: "Uma memória que eu guardo com carinho." },
    { src: "/fotos/foto2.jpg", legenda: "Um daqueles momentos que eu queria repetir." },
    { src: "/fotos/foto3.jpg", legenda: "Só nós dois, do nosso jeito." },
    { src: "/fotos/foto4.jpg", legenda: "E ainda tem muita história pela frente." }
  ],
  motivos: [
    "Porque você consegue deixar até um dia comum mais especial.",
    "Porque eu adoro o jeito que você é, inclusive nas pequenas coisas.",
    "Porque com você eu coleciono memórias que realmente importam.",
    "Porque eu posso ser eu mesmo quando estou com você.",
    "Porque eu me sinto mais feliz quando estou contigo.",
    "Porque, no fim, simplesmente gosto de ter você na minha vida."
  ],
  timeline: [
    { data: "Capítulo 1", titulo: "Quando tudo começou", texto: "Lembro das nossas conversas, do primeiro beijo tímido e de como eu me sentia feliz de poder ter você." },
    { data: "Capítulo 2", titulo: "Um momento especial", texto: "Quando ficamos na pracinha embaixo de casa dançando e por um momento eu experimentei o paraíso." },
    { data: "Capítulo 3", titulo: "Uma lembrança engraçada", texto: "Quando eu estava com muita vontade de ir no banheiro e tive que usar o banheiro da sua mãe kkkkkkkkk." },
    { data: "Capítulo 4", titulo: "Hoje", texto: "E essa história continua sendo escrita..." }
  ]
};

function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [photo, setPhoto] = useState(null);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [showSurprise, setShowSurprise] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    if (!CONFIG.musicaUrl) return;
    const audio = new Audio();
    audio.preload = "auto";
    audio.loop = true;
    audio.src = CONFIG.musicaUrl;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) {
      setMusicPlaying(v => !v);
      return;
    }
    if (musicPlaying) {
      audio.pause();
      setMusicPlaying(false);
    } else {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setMusicPlaying(true))
          .catch((err) => {
            console.error("Erro ao tocar áudio:", err);
            // Tenta novamente após interação do usuário (autoplay policy)
            audio.load();
            audio.play()
              .then(() => setMusicPlaying(true))
              .catch((err2) => console.error("Falha ao tocar:", err2));
          });
      }
    }
  };

  const unlock = (e) => {
    e.preventDefault();
    if (password.trim() === CONFIG.senha) {
      setUnlocked(true);
      setError("");
    } else {
      setError("Essa não... tenta de novo ❤️");
      setPassword("");
    }
  };

  if (!unlocked) {
    return (
      <main className="lock-screen">
        <div className="stars" />
        <div className="lock-card">
          <div className="floating-heart"><Heart fill="currentColor" size={30} /></div>
          <Sparkles className="spark" size={20} />
          <p className="eyebrow">UMA PEQUENA SURPRESA</p>
          <h1>Ei, {CONFIG.nomeDela}...</h1>
          <p className="subtitle">
            Tem uma coisa aqui que eu preparei especialmente para você.
          </p>
          <div className="divider"><span>♥</span></div>
          <p className="hint">A senha é uma data ou número que só nós entenderíamos.</p>
          <form onSubmit={unlock}>
            <div className="password-wrap">
              <Lock size={17} />
              <input
                autoFocus
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Digite a senha..."
                aria-label="Senha"
              />
            </div>
            <button className="primary" type="submit">
              Abrir minha surpresa <Heart size={17} fill="currentColor" />
            </button>
          </form>
          {error && <p className="error">{error}</p>}
        </div>
      </main>
    );
  }

  return (
    <div className="app">
      <div className="ambient ambient-1" />
      <div className="ambient ambient-2" />

      <header className="topbar">
        <span className="logo"><Heart size={16} fill="currentColor" /> nós</span>
        <button className="music-button" onClick={toggleMusic}>
          {musicPlaying ? <Pause size={16} /> : <Play size={16} />}
          <span>{CONFIG.musicaNome}</span>
        </button>
      </header>

      <section className="hero">
        <div className="hero-copy reveal">
          <p className="eyebrow"><Sparkles size={15} /> feito especialmente para você</p>
          <h1>Eu queria te dar<br /><em>um pedacinho</em> do que sinto.</h1>
          <p>
            Então, em vez de só mandar uma mensagem, fiz esse cantinho
            para guardar algumas coisas que eu queria te dizer.
          </p>
          <button className="ghost" onClick={() => document.getElementById("carta").scrollIntoView({ behavior: "smooth" })}>
            Começar <ArrowDown size={17} />
          </button>
        </div>
        <div className="hero-heart">
          <div className="heart-orbit orbit-a" />
          <div className="heart-orbit orbit-b" />
          <Heart className="big-heart" size={125} fill="currentColor" />
          <span>♡</span>
        </div>
      </section>

      <section className="section" id="carta">
        <div className="section-label"><Mail size={16} /> uma carta</div>
        <div className="letter-card">
          <div className="letter-decoration">“</div>
          <p>Meu amor,</p>
          <p>
            Eu não precisava de uma data especial para fazer isso.
            Só queria que você tivesse alguma coisa para abrir e lembrar
            que existe alguém aqui que pensa em você com muito carinho.
          </p>
          <p>
            Eu gosto das nossas conversas, das nossas brincadeiras,
            dos momentos simples e principalmente da sensação de poder
            compartilhar a vida com você.
          </p>
          {letterOpen && (
            <div className="extra-letter">
              <p>
                Se eu pudesse guardar algumas partes dos nossos dias em uma
                caixinha, provavelmente seriam justamente aquelas que parecem
                pequenas na hora, mas que depois fazem a gente sorrir sozinho.
              </p>
              <p>
                Espero que ainda venham muitos capítulos, muitas risadas,
                muitos rolês e muitas histórias que só nós dois vamos entender.
              </p>
            </div>
          )}
          <button className="text-button" onClick={() => setLetterOpen(v => !v)}>
            {letterOpen ? "Fechar carta" : "Tem mais uma coisa..."}
          </button>
          <div className="signature">
            <span>Com carinho,</span>
            <strong>{CONFIG.nomeDele} ♡</strong>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label"><Heart size={16} /> alguns motivos</div>
        <h2>Por que você é<br /><em>tão especial pra mim</em></h2>
        <div className="reasons">
          {CONFIG.motivos.map((motivo, i) => (
            <div className="reason" key={motivo}>
              <span>0{i + 1}</span>
              <p>{motivo}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-label"><Camera size={16} /> nossas memórias</div>
        <h2>Alguns pedacinhos<br /><em>da nossa história</em></h2>
        <div className="gallery">
          {CONFIG.fotos.map((foto, i) => (
            <button className={`photo photo-${i + 1}`} key={foto.src} onClick={() => setPhoto(foto)}>
              <img src={foto.src} alt={foto.legenda} onError={(e) => e.currentTarget.style.display = "none"} />
              <div className="photo-placeholder">
                <Camera size={26} />
                <span>Coloque sua foto aqui</span>
              </div>
              <div className="photo-caption">{foto.legenda}</div>
            </button>
          ))}
        </div>
      </section>

      <section className="section timeline-section">
        <div className="section-label"><Sparkles size={16} /> nossa história</div>
        <h2>Capítulos que<br /><em>eu quero guardar</em></h2>
        <div className="timeline">
          {CONFIG.timeline.map((item, i) => (
            <div className="timeline-item" key={item.titulo}>
              <div className="timeline-dot">{i + 1}</div>
              <div>
                <span>{item.data}</span>
                <h3>{item.titulo}</h3>
                <p>{item.texto}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="final-section">
        <div className="final-card">
          <Gift size={30} />
          <p className="eyebrow">última coisa</p>
          <h2>Ainda não acabou.</h2>
          <p>
            Tem um último presente escondido aqui.<br />
            Mas você precisa clicar.
          </p>
          <button className="primary" onClick={() => setShowSurprise(true)}>
            Quero ver <Sparkles size={17} />
          </button>
        </div>
      </section>

      <footer>feito com carinho · {new Date().getFullYear()}</footer>

      {photo && (
        <div className="modal" onClick={() => setPhoto(null)}>
          <button className="close" onClick={() => setPhoto(null)}><X /></button>
          <div className="photo-modal" onClick={e => e.stopPropagation()}>
            <img src={photo.src} alt={photo.legenda} />
            <p>{photo.legenda}</p>
          </div>
        </div>
      )}

      {showSurprise && (
        <div className="modal surprise-modal" onClick={() => setShowSurprise(false)}>
          <div className="surprise-box" onClick={e => e.stopPropagation()}>
            <div className="confetti">✦ ✧ ♥ ✧ ✦</div>
            <Heart size={42} fill="currentColor" />
            <p className="eyebrow">prêmio desbloqueado</p>
            <h2>Você ganhou...</h2>
            <p className="big-message">um encontro comigo.</p>
            <p>
              Você escolhe o dia. Eu cuido do resto. ❤️
            </p>
            <button className="primary" onClick={() => setShowSurprise(false)}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
