# bilgehnbilge.github.io

Bilgehan Bilge'nin kişisel sitesi. Saf HTML, CSS ve JavaScript; kurulum ya da derleme gerektirmez.

## Yayına alma (GitHub Pages)

1. GitHub'da **bilgehnbilge.github.io** adında, herkese açık (public) yeni bir depo oluştur.
2. Depoda **Add file → Upload files**'a tıkla, bu klasörün içindeki her şeyi (`index.html`, `assets` klasörü, `.nojekyll`, `README.md`) sürükleyip bırak ve **Commit changes** de.
3. **Settings → Pages** bölümünde *Source* olarak **Deploy from a branch**, dal olarak **main** ve klasör olarak **/ (root)** seç.
4. Birkaç dakika içinde site **https://bilgehnbilge.github.io** adresinde açılır.

## İçeriği değiştirme

Metinler, fotoğraflar, yazılar ve projeler tek bir dosyada: `assets/js/content.js`. HTML'e dokunmadan oradan düzenleyebilirsin. GitHub'da dosyayı açıp kalem simgesiyle doğrudan tarayıcıdan da değiştirebilirsin.

- **Fotoğraf eklemek:** Dosyayı `assets/photos/` klasörüne koy ve `photos` listesine bir satır ekle. Dosyanın başındaki açıklamada örnek var. Kategoriler: `istanbul`, `travel`, `sport`.
- **Açılış fotoğrafları:** `hero` listesindeki numaralar, `photos` listesindeki sıraya karşılık gelir (0'dan başlar).
- **Projeler:** Paylaşmak istemediğin bir projenin satırını silmen yeterli.
- **Medium yazıları:** Liste dosyada duruyor. Medium'a yeni yazı eklersen site açılışta onu kendiliğinden listenin başına ekler.

## Fotoğraflar hakkında not

Şimdilik fotoğraflar Adobe Portfolio sayfandan (cdn.myportfolio.com) çekiliyor. Portfolio aboneliği biterse bu bağlantılar çalışmaz. Zamanla orijinal dosyaları `assets/photos/` altına koyup `content.js`'teki adresleri değiştirmen önerilir. Uzun kenarı 1600–2000 piksel, JPEG ya da WebP yeterli.

## Kendi alan adını bağlamak (ileride)

Bir alan adı alırsan **Settings → Pages → Custom domain** alanına yaz; GitHub depoya bir `CNAME` dosyası ekler. Alan adı sağlayıcında da GitHub'ın belirttiği DNS kayıtlarını girmen gerekir.

## Bilgisayarda önizleme

Klasörde bir terminal açıp `python -m http.server` çalıştır, ardından tarayıcıda `http://localhost:8000` adresine git.

## Kullanılan yazı tipleri

Newsreader ve Schibsted Grotesk (SIL Open Font License). Dosyalar `assets/fonts/` içinde, dış bir servise bağlı değil.
