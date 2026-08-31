# Surpresa para ela — React

## 1. Instalar
Tenha Node.js instalado e rode:

npm install

## 2. Rodar
npm run dev

Abra o endereço mostrado pelo Vite.

## 3. Personalizar
Abra `src/main.jsx` e altere o objeto `CONFIG` no começo do arquivo.

Você pode trocar:
- `nomeDela`
- `nomeDele`
- `senha`
- nome/artista da música
- URL da música (opcional)
- fotos e legendas
- motivos
- linha do tempo

Coloque as fotos em `public/fotos/`.

## 4. Música
Se quiser tocar um arquivo local, uma opção simples é colocar um MP3 em `public/musica.mp3` e trocar:
`musicaUrl: "/musica.mp3"`

Use apenas uma música que você tenha direito de usar.

## 5. Build
Para gerar a versão de produção:

npm run build

A pasta `dist/` será criada.
