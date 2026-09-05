# Web Ajdar

ÜNOG’un yeni web sitesi. ÜNOG, Türkiye’deki bağımsız oyun geliştiricilerini bir araya getiren ve bilgi paylaşımını destekleyen bir topluluktur.

## Teknolojiler

- [Next.js](https://nextjs.org/) 16 — App Router
- [React](https://react.dev/) 19
- TypeScript
- [Tailwind CSS](https://tailwindcss.com/) 4
- [shadcn/ui](https://ui.shadcn.com/) bileşen yaklaşımı
- [Oxlint](https://oxc.rs/docs/guide/usage/linter) — lint kontrolü
- Docker — production container çalıştırma

## Gereksinimler

- Node.js 24 veya uyumlu güncel bir LTS sürümü
- pnpm 11.23.0

## Kurulum

Repository’yi klonlayıp proje dizinine geçin:

```bash
git clone https://github.com/unoghub/web-ajdar
cd web-ajdar
```

Bağımlılıkları yükleyin:

```bash
pnpm install
```

## Geliştirme

Geliştirme sunucusunu başlatın:

```bash
pnpm dev
```

Ardından [http://localhost:3000](http://localhost:3000) adresini tarayıcıda açın. Kod değişiklikleri geliştirme sunucusunda otomatik olarak yenilenir.

## Kullanılabilir komutlar

| Komut | Açıklama |
| --- | --- |
| `pnpm dev` | Geliştirme sunucusunu başlatır. |
| `pnpm lint` | Oxlint ile kod kontrolü yapar. |
| `pnpm lint:fix` | Otomatik düzeltilebilen lint sorunlarını düzeltir. |
| `pnpm build` | Production build oluşturur. |
| `pnpm start` | Oluşturulan production build’i çalıştırır. |

Production build’i yerel olarak kontrol etmek için:

```bash
pnpm build
pnpm start
```

## Docker ile çalıştırma

Production Docker imajını oluşturun:

```bash
docker build -t unog-web .
```

Container’ı başlatın:

```bash
docker run --rm -p 4001:4001 unog-web
```

Uygulama [http://localhost:4001](http://localhost:4001) adresinde çalışır. Docker yapılandırması Next.js’in `standalone` çıktısını ve production ortamını kullanır.

## Geliştirme notları

- Bağımlılık değişikliklerinden sonra `pnpm-lock.yaml` dosyasını güncel tutun.
- Yeni ortak bileşenleri `components` altında, route’a özel dosyaları ilgili `app` segmentinde konumlandırın.
- Lint kontrolünü ve production build’ini commit öncesinde çalıştırın.
