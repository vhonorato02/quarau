# Fontes

Barlow e Barlow Condensed (OFL, `OFL-LICENSE.txt`), recortadas para o PT-BR e sem hinting para pesar menos.
Para refazer a partir dos arquivos latin do Fontsource:

```sh
uv run --no-project --with fonttools --with brotli pyftsubset <arquivo>.woff2 \
  --unicodes="U+0020-007E,U+00A0-00FF,U+0152-0153,U+02C6,U+02DC,U+2010-2027,U+2030-203A,U+20AC,U+2122" \
  --layout-features="kern,liga,lnum,tnum,case" --flavor=woff2 --no-hinting --desubroutinize \
  --output-file=<arquivo>.woff2
```

Os `.woff` (sem o 2) servem só à imagem de compartilhamento (`app/next/og`), que não lê woff2.
