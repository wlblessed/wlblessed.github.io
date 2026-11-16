# WRBLESSED — catálogo

Catálogo de produtos estático: HTML, CSS e JS puros, sem build e sem dependências.
As fotos dos produtos vêm de `imagens/` e foram copiadas para `assets/produtos/`.

## Publicado

- site: https://wrblessed.github.io/
- repositório: https://github.com/wrblessed/wrblessed.github.io (branch `main`, raiz)
- GitHub Pages: `build_type: legacy`, branch `main` path `/`, `.nojekyll` na raiz

Para publicar uma mudança: `git add -A && git commit -m "..." && git push` — o
Pages reconstrói sozinho em ~1 minuto.

## Rodar

```sh
cd /media/usforce/EXT42020/AGENT_DOT2/WRBLESSED
python3 serve.py 8095        # http://127.0.0.1:8095/
```

`serve.py` só serve arquivos. Abrir `index.html` como `file://` funciona, mas o
`localStorage` da sacola fica por origem e some.

## Estrutura

| path | o que é |
| --- | --- |
| `index.html` | markup: topo, hero, catálogo, sacola |
| `style.css` | tema escuro, grid responsivo, drawer |
| `app.js` | produtos, filtros, busca, sacola persistida, pedido no WhatsApp |
| `assets/produtos/*.jpg` | fotos usadas nos cards e no hero |
| `assets/tee-box.svg` | favicon |
| `imagens/` | originais enviados pela loja, não são editados |

## Comprar pelo WhatsApp

O botão da sacola monta a mensagem com item, tamanho, quantidade, subtotal e
forma de pagamento, e abre `https://wa.me/<número>?text=<mensagem>`.

- número: `WHATSAPP_NUMBER` no topo de `app.js` (`5531972014470`)
- texto: `buildOrderMessage()` em `app.js`
- testar sem abrir aba: `__shop.buildOrderUrl()` no console

## Pagamento

Seletor na sacola, incluído no texto do pedido.

| método | o que a página faz |
| --- | --- |
| Pix | mostra a chave `PIX_KEY` com botão de copiar; o pedido diz que é Pix |
| Cartão de crédito | seletor de 1x a 3x sem juros; a loja envia o link de pagamento no WhatsApp |

Não existe gateway nem backend: a página **não** recebe número de cartão. Para
cobrança automática seria preciso integrar um PSP (Mercado Pago, PagSeguro,
Stripe) com servidor — fora do escopo desta demo.

## Dados de demonstração

Preços, tamanhos e descrições são ilustrativos. Editar o array `PRODUCTS` em
`app.js` é o único lugar necessário para trocar o catálogo.
