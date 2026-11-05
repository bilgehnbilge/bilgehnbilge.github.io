/*
  SİTE İÇERİĞİ
  ------------------------------------------------------------
  Sitedeki metinlerin, fotoğrafların, yazıların ve projelerin
  tamamı bu dosyada. Bir şeyi değiştirmek için HTML'e dokunman
  gerekmez: burayı düzenle, kaydet, GitHub'a yükle.

  Fotoğraf eklemek:
    1. Dosyayı assets/photos/ klasörüne koy (ör. kadikoy-03.jpg,
       uzun kenarı 1600 px civarı yeterli).
    2. Aşağıdaki "photos" listesine bir satır ekle:
       { src: 'assets/photos/kadikoy-03.jpg', w: 1200, h: 1800,
         place: 'Kadıköy', year: 2024, cat: 'istanbul' }
    cat: 'istanbul' | 'travel' | 'sport'

  Şimdilik fotoğraflar Adobe Portfolio sayfandan çekiliyor.
  Portfolio aboneliği biterse bu bağlantılar çalışmayı bırakır;
  zamanla dosyaları assets/photos/ altına taşıman iyi olur.
*/

const PF = 'https://cdn.myportfolio.com/e2476710-eefd-4451-8d2b-7e85420dd079/';

window.SITE = {
  /* Metinlerde {dp} yazan yerler bu adrese giden kırmızı "Doğruluk Payı" bağlantısına dönüşür. */
  dpUrl: 'https://www.dogrulukpayi.com/ekibimiz/bilgehan-bilge',

  links: [
    { label: 'Instagram', url: 'https://www.instagram.com/bilgehnbilge' },
    { label: 'X', url: 'https://x.com/bilgehnbilge' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/bilgehnbilge/' },
    { label: 'Medium', url: 'https://medium.com/@bilgehnbilge' },
    { label: 'Behance', url: 'https://www.behance.net/bilgehnbilge' },
    { label: 'GitHub', url: 'https://github.com/bilgehnbilge' },
    { label: 'Flickr', url: 'https://www.flickr.com/photos/159152582@N05/' },
    { label: '500px', url: 'https://500px.com/p/bilgehnbilge' }
  ],

  /* Açılış fotoğrafı bu listeden seçilir. "photos" içindeki sıra numarası (0'dan başlar). */
  hero: [10, 14, 2, 18],

  photos: [
    { src: PF + '39660e9f-249a-4900-bfce-c3b4cf4298db_rw_1200.jpg?h=252ebd2cec6eb1e700a559a8fcc13353', w: 1200, h: 800, place: 'Galata Köprüsü', year: 2020, cat: 'istanbul' },
    { src: PF + '6e0f4e3e-e3dd-4cb0-a5e7-7acb17e0261c_rw_1200.jpg?h=a160f8b7e11d416482be6bce699750b1', w: 1200, h: 1800, place: 'Galata Köprüsü', year: 2020, cat: 'istanbul' },
    { src: PF + '91cb00b8-1b3b-4971-933e-c212ab2422ef_rw_1200.jpg?h=f86d57018084f30602fdabbacd2576ba', w: 1200, h: 1800, place: 'Galata Köprüsü', year: 2020, cat: 'istanbul' },
    { src: PF + 'aa11d5e4-78f8-4527-988e-e8d9cdd436a5_rw_1200.jpg?h=f2951b53f9056ed5648ef6764510514e', w: 1200, h: 800, place: 'Galata Köprüsü', year: 2020, cat: 'istanbul' },
    { src: PF + 'ff6639fb-7d37-45b4-a18c-4b4ea6a8a57e_rw_1200.jpg?h=39aeacb553c0b44be5ff4fa29ddfd617', w: 1200, h: 800, place: 'Kadıköy', year: 2020, cat: 'istanbul' },
    { src: PF + 'f77a43ad-7acc-452c-9477-8eec43792410_rw_1200.jpg?h=99dee2ca5d0e08f24a9edd9a7d02168f', w: 1200, h: 800, place: 'Kadıköy', year: 2020, cat: 'istanbul' },
    { src: PF + 'f20755fa-0921-47c3-92f7-318fff96ec83_rw_1200.jpg?h=40a1262c30d868a1c99c940589fad1d8', w: 1200, h: 1800, place: 'Kadıköy', year: 2020, cat: 'istanbul' },
    { src: PF + '984626e6-57f6-4a9f-ad12-a0420a6f3b62_rw_1200.jpg?h=b7dc80b5771eff5c5a0e5f8c88ffd72d', w: 1200, h: 800, place: 'Caddebostan', year: 2020, cat: 'istanbul' },
    { src: PF + '7dcf46c1-9a1a-40b3-bfe5-10d43863704a_rw_1200.jpg?h=4f076c8f2664ef6a2522d147e4914778', w: 1200, h: 800, place: 'Caddebostan', year: 2020, cat: 'istanbul' },
    { src: PF + '058706f8-2afd-4aed-be76-48ad9f4c3e3a_rw_1200.jpg?h=574837c5fd49794188675d2b8f4cb9c0', w: 1200, h: 800, place: 'Caddebostan', year: 2020, cat: 'istanbul' },
    { src: PF + 'b11e89f9-df66-48f7-adc9-30c5ff2fc47a_rw_1200.jpg?h=37af76220cb685085f2092044cdfce16', w: 1200, h: 1800, place: 'Çamlıca Tepesi', year: 2020, cat: 'istanbul' },
    { src: PF + '68625c95-edb5-4e85-bcf2-7d0c72ec2099_rw_1200.jpg?h=38dcc66246100bc3ae08f8668c674f42', w: 1200, h: 800, place: 'Çamlıca Tepesi', year: 2020, cat: 'istanbul' },
    { src: PF + 'e0117f8d-5c7d-4c14-b7bc-1e428fa60462_rw_1200.jpg?h=9ba82c9ec5a516f74021435aecd772c2', w: 1200, h: 800, place: 'Çamlıca Tepesi', year: 2020, cat: 'istanbul' },
    { src: PF + '63117d5f-6dcc-4914-9644-c66bb73ef170_rw_1200.jpg?h=74de29fbfb2b707c8bd919fd6790f4f4', w: 1200, h: 1800, place: { tr: "İstanbul'da kış", en: 'Winter in Istanbul' }, year: 2021, cat: 'istanbul' },
    { src: PF + 'c17331c3-3ebf-49f3-9941-199302f44e06_rw_1200.jpg?h=5df047dafab3462a08861d4a088b62a6', w: 1200, h: 1800, place: { tr: 'Kapadokya', en: 'Cappadocia' }, year: 2020, cat: 'travel' },
    { src: PF + '61a62a99-1787-4726-a43c-81671c597499_rw_1200.jpg?h=b7e7ea7dd97f6b5fb2c32b7284200179', w: 1200, h: 1800, place: { tr: "İstanbul'da kış", en: 'Winter in Istanbul' }, year: 2021, cat: 'istanbul' },
    { src: PF + 'a3b293c1-4063-4ae5-bffe-db7e2a1af8b0_rw_1200.jpg?h=001eff6e5ba47ef5b4e4e49a71a91876', w: 1200, h: 1800, place: { tr: "İstanbul'da kış", en: 'Winter in Istanbul' }, year: 2021, cat: 'istanbul' },
    { src: PF + 'b4d8fe6f-adb2-41cf-886d-02989cc6a8f4_rw_1200.jpg?h=a2a39768c23076fdb23b0009c3407b36', w: 1200, h: 1800, place: { tr: "İstanbul'da kış", en: 'Winter in Istanbul' }, year: 2021, cat: 'istanbul' },
    { src: PF + 'c0f3921a-aa96-4ce3-ae26-e9c11cdd2f1f_rw_1200.jpg?h=08a5a073f044be3d28d7466652f1e69f', w: 1200, h: 1800, place: 'Rumelifeneri ve Garipçe', year: 2020, cat: 'travel' },
    { src: PF + '48707021-f9ce-405a-b026-b9306039942e_rw_1200.jpg?h=4fac259266e66458a605e6324c0a1e75', w: 1200, h: 1800, place: { tr: 'Kapadokya', en: 'Cappadocia' }, year: 2020, cat: 'travel' },
    { src: PF + '1a5849eb-d263-4ae9-b6a9-982093e9a15e_rw_1200.jpg?h=a691468c582570392317278599c5c106', w: 1200, h: 1800, place: { tr: 'Kapadokya', en: 'Cappadocia' }, year: 2020, cat: 'travel' },
    { src: PF + 'e801e8c7-61f7-43ea-8685-a58c6a18aef9_rw_1200.jpg?h=e9819b037361e24db21937572172476d', w: 1200, h: 1800, place: { tr: 'Kapadokya', en: 'Cappadocia' }, year: 2020, cat: 'travel' },
    { src: PF + '24dde2f9-aa89-4a14-969f-38ae1e6224f6_rw_1200.jpg?h=9595cb6abf57cab87966a20a166218bb', w: 1200, h: 1800, place: 'Rumelifeneri ve Garipçe', year: 2020, cat: 'travel' },
    { src: PF + '2803bc2a-b039-47d1-9e2d-13eccc6412ef_rw_1200.jpg?h=b7be02ed2f37e49e56ad3732cb9b6ca1', w: 1200, h: 1800, place: 'Rumelifeneri ve Garipçe', year: 2020, cat: 'travel' },
    { src: PF + 'cc29d2f7-2aa3-4973-8d33-a25d0275708d_rw_1200.jpg?h=6cf660087eb9970dc6a0626d86759703', w: 1200, h: 1800, place: 'Bolu', year: 2019, cat: 'travel' },
    { src: PF + 'e2d0184c-6d58-4bd7-bbb3-c4762c9cbc32_rw_1200.jpg?h=8f44a5617a3734d3d8122540f2711bf0', w: 1200, h: 800, place: 'Bolu', year: 2019, cat: 'travel' },
    { src: PF + 'd798f0d5-aaf0-41fe-a6db-481e6ffc3a87_rw_1200.jpg?h=dc3a6b8dbe05f1459c99409987babb02', w: 1200, h: 800, place: 'Bolu', year: 2019, cat: 'travel' },
    { src: PF + '281f600e-a7bb-464b-af84-b5a07c8d5c76_rw_1200.jpg?h=9a2dc1d7e81bae1c77dcb97d3c0a2eed', w: 1200, h: 800, place: { tr: 'Avrasya Maratonu', en: 'Istanbul Marathon' }, year: 2021, cat: 'sport' },
    { src: PF + 'ee6dd14b-b2ff-4bad-ab9f-08bdc322d4f2_rw_1200.jpg?h=ddaf7d2aec22b5c1d12e48ac69c664a1', w: 1200, h: 800, place: { tr: 'Avrasya Maratonu', en: 'Istanbul Marathon' }, year: 2021, cat: 'sport' },
    { src: PF + '743654e8-4245-40dc-9d3c-f888baff4ccf_rw_1200.jpg?h=c3dd20428206dcbc47c85465531c94fc', w: 1200, h: 800, place: { tr: 'Galatasaray imza töreni', en: 'Galatasaray signing ceremony' }, year: 2023, cat: 'sport' },
    { src: PF + '64c1aad0-d0e4-4f78-a3b3-e5784e68900f_rw_1200.jpg?h=779c8a65b6839df050ff1635f669bea4', w: 1200, h: 800, place: { tr: 'Galatasaray imza töreni', en: 'Galatasaray signing ceremony' }, year: 2023, cat: 'sport' },
    { src: PF + '2effb024-7ab0-4be3-8a6f-b3e3be754f7d_rw_1200.jpg?h=c656027525a035e11f87a9872ccf462f', w: 1200, h: 800, place: { tr: 'Galatasaray imza töreni', en: 'Galatasaray signing ceremony' }, year: 2023, cat: 'sport' }
  ],

  design: [
    {
      name: 'Gol var mı?',
      year: 2023,
      url: 'https://bilgehanbilge.myportfolio.com/gol-var-mi',
      text: {
        tr: 'golvarmi.com için hazırladığım sosyal medya tasarımları: transfer duyuruları, maç sonuçları, veda paylaşımları.',
        en: 'Social media designs for golvarmi.com: transfer announcements, match results and farewell posts.'
      },
      images: [
        { src: PF + 'a1948b19-4610-4f20-92cd-4f91174240a8_rw_1200.jpg?h=90df9bd6f6bbbe475922def3e3ce2fbc', w: 1080, h: 1350 },
        { src: PF + 'bf840a02-5afa-4a07-a7fc-edcb2b3d4faf_rw_1200.png?h=2c75678b52ae363e96c7d99cbfc6791e', w: 1200, h: 1499 },
        { src: PF + 'a1228ddd-0cdb-4c5f-9f8b-d30ccba98dfc_rw_1200.jpg?h=d50ce56f9eca54cb1ffb6cbcc9689849', w: 1080, h: 1350 }
      ]
    },
    {
      name: 'Lig Radyo',
      year: 2023,
      url: 'https://bilgehanbilge.myportfolio.com/lig-radyo',
      text: {
        tr: "Lig Radyo'nun sosyal medyası için hazırladığım çalışmalar: lig başlangıcı, kadro ve grafik paylaşımları.",
        en: "Work for Lig Radyo's social media: season openers, line-ups and infographics."
      },
      images: [
        { src: PF + 'a1980ae3-7be1-4cbf-ae2b-7fabcc7846f4_rw_1200.jpg?h=60390a7349e47f33fa2afaca201dacf9', w: 1080, h: 1350 },
        { src: PF + '40a70961-f241-4da2-8435-0d1952815a39_rw_1200.png?h=5c798a9cfe7aa35fed8987656b25488e', w: 1080, h: 1350 },
        { src: PF + '6b0938e7-579e-43cc-afdf-49c13e03b7ce_rw_1200.jpg?h=5fe0c973bd9870586b9a194f4546d7de', w: 1080, h: 1350 }
      ]
    }
  ],

  /* Medium yazıları. Sayfa açılınca Medium'daki yeni yazılar da otomatik eklenir. */
  posts: [
    { id: '38c87ef6906b', date: '2023-04-08', cat: 'tech', title: 'Instagram’da Gönderilerin Kalitesini Artırmak; Geliştirici Ayarları', dek: 'Instagram’a 4K video yüklemek ister misiniz? Üstelik Instagram’ın geliştirici ayarlarına erişmek sanılandan çok daha kolay.' },
    { id: '4d584f1343d1', date: '2022-10-07', cat: 'music', title: 'Keşif; Kraków Loves Adana', dek: 'Polonya, Türkiye ve Almanya arasındaki dillere destan bir aşk hikâyesi.' },
    { id: '361b236faa95', date: '2021-11-04', cat: 'news', title: '80 Milyonun Adres Bilgisi 50 Liraya Satılıyor', dek: 'Türkiye Cumhuriyeti vatandaşlarının özel bilgileri internette çok ucuza satılıyor.' },
    { id: '486091544515', date: '2021-11-04', cat: 'tech', title: 'Instagram’dan Geri Adım: ‘Yeniden Paylaş’ Etiketi Kaldırıldı', dek: 'Temmuz ayında başlayan test süreci ekim ayında sona erdi.' },
    { id: '25cdbe1c961f', date: '2021-10-27', cat: 'news', title: 'Twitch’te Kara Para Aklama İddiası', dek: 'Skandallar Twitch’in peşini bırakmıyor. Amazon’un başı şimdi de kara para aklama iddialarıyla dertte.' },
    { id: '5afa0d7ba769', date: '2021-08-11', cat: 'music', title: 'Chromatics Yolun Sonuna Geldi', dek: 'Ruth Radelet, Adam Miller ve Nat Walker, Chromatics’ten ayrıldıklarını açıkladı.' },
    { id: '51904b078ebf', date: '2021-08-09', cat: 'music', title: 'Keşif: Rein', dek: 'Son yıllarda İskandinavya’da adından söz ettirmeye başlayan genç sanatçı Joanna Reinikainen, yani Rein.' },
    { id: '23f6a0a475a1', date: '2021-03-02', cat: 'news', title: 'Türkiye’de Korona Yasakları Haritası (Normalleşme)', dek: '1 Mart itibarıyla Türkiye, koronavirüsle mücadelede normalleşme sürecine girdi.' },
    { id: '1633686db569', date: '2021-02-22', cat: 'tech', title: 'Android Kullanıcıları için Clubhouse Yayınlandı', dek: 'iOS’ta yayınlandığı günden bu yana geniş kitleleri peşinden sürükleyen Clubhouse, Android’e geldi.' },
    { id: 'eec10c711cd3', date: '2021-01-02', cat: 'tech', title: 'Android Kullanıcıları Twitch’te Better TV Kullanabilecek', dek: 'Resmi Twitch uygulaması üzerine yapılan bir mod, masaüstü sürümünün özelliklerini Android’e taşıyor.' }
  ],

  /* Projeler. Henüz paylaşmak istemediğin bir şey varsa satırını silmen yeterli. */
  projects: [
    {
      name: 'İstanbul Ulaşım',
      platform: { tr: 'Android uygulaması', en: 'Android app' },
      text: {
        tr: 'İETT öncelikli bir İstanbul toplu taşıma uygulaması. Material 3 tasarımlı, Monet renkleriyle telefonunun temasına uyuyor.',
        en: 'An Istanbul public transport app that puts İETT first. Built with Material 3 and Monet colours that follow your phone’s theme.'
      }
    },
    {
      name: 'Türkiye Hava Durumu',
      platform: { tr: 'Android uygulaması', en: 'Android app' },
      text: {
        tr: 'Meteoroloji Genel Müdürlüğü verileriyle çalışan, Material 3 Expressive tasarımlı bir hava durumu uygulaması.',
        en: 'A weather app powered by data from the Turkish State Meteorological Service, designed with Material 3 Expressive.'
      }
    },
    {
      name: 'Live Score Widget',
      platform: { tr: 'Android widget', en: 'Android widget' },
      text: {
        tr: 'Canlı futbol skorlarını ana ekrana taşıyan bir widget. Favori takımların maçları için Smartspacer desteği yolda.',
        en: 'A home-screen widget for live football scores. Smartspacer support for your favourite teams’ matches is on the way.'
      }
    },
    {
      name: 'LR Template to Cube',
      platform: { tr: 'Android uygulaması', en: 'Android app' },
      text: {
        tr: 'Lightroom presetlerini (.lrtemplate, .xmp) telefonda kullanılabilecek .cube LUT dosyalarına dönüştürüyor.',
        en: 'Converts Lightroom presets (.lrtemplate, .xmp) into .cube LUT files you can use on your phone.'
      }
    },
    {
      name: 'X Kaynak Etiketi',
      platform: { tr: 'Tarayıcı eklentisi', en: 'Browser extension' },
      text: {
        tr: 'Bir X gönderisinin hangi istemciden (iPhone, Android, web) gönderildiğini gönderinin yanında gösteriyor.',
        en: 'Shows which client an X post was sent from (iPhone, Android or web), right next to the post.'
      }
    },
    {
      name: 'Morphe Monet',
      platform: { tr: 'Android yama paketi', en: 'Android patch bundle' },
      text: {
        tr: 'Uygulamalara Monet (dinamik renk) teması ekleyen bir Morphe yama paketi. Her uygulama için ayrı yama; ilki Instafel.',
        en: 'A Morphe patch bundle that adds Monet (dynamic colour) theming to apps, one patch per app, starting with Instafel.'
      }
    }
  ],

  /* Arayüz metinleri */
  i18n: {
    tr: {
      'meta.description': 'Bilgehan Bilge: Doğruluk Payı’nda editör, fotoğrafçı ve tasarımcı. İstanbul.',
      'skip': 'İçeriğe geç',
      'nav.about': 'Hakkımda',
      'nav.photos': 'Fotoğraf',
      'nav.design': 'Tasarım',
      'nav.writing': 'Yazılar',
      'nav.projects': 'Projeler',
      'nav.contact': 'İletişim',
      'nav.menu': 'Menü',
      'nav.theme': 'Açık ya da koyu temaya geç',
      'hero.lead': '{dp}’nda editörüm. İstanbul’u fotoğraflıyor, sosyal medya için tasarım yapıyor ve kendi ihtiyaç duyduğum araçları geliştiriyorum.',
      'hero.hint': 'Görünmeyeni görmek için imleci fotoğrafta gezdir.',
      'hero.hintTouch': 'Görünmeyeni görmek için fotoğrafa dokun.',
      'hero.another': 'Başka bir kare',
      'glance.title': 'Kısaca',
      'card.now.label': 'Şu an',
      'card.now.title': 'Editör, {dp}',
      'card.now.text': 'Doğrulama içerikleri üzerinde çalışıyorum.',
      'card.edu.label': 'Eğitim',
      'card.edu.title': 'Gazetecilik',
      'card.edu.text': 'İstanbul Üniversitesi, İletişim Fakültesi',
      'card.photo.label': 'Fotoğraf',
      'card.photo.link': 'Galeriyi aç',
      'card.writing.label': 'Medium’daki son yazım',
      'card.writing.link': 'Tüm yazılar',
      'card.design.label': 'Tasarım',
      'card.design.text': 'Gol var mı? ve Lig Radyo için sosyal medya tasarımları',
      'card.projects.label': 'Geliştirdiklerim',
      'card.contact.label': 'Yazışalım',
      'about.title': 'Hakkımda',
      'about.p1': 'İstanbul Üniversitesi İletişim Fakültesi Gazetecilik bölümünden mezun oldum. Bugün {dp}’nda editör olarak çalışıyorum.',
      'about.p2': 'Gazetecilik dışında en çok fotoğrafla uğraşıyorum: İstanbul’un sokakları, yolculuklar ve sahalar. Bir dönem futbol medyası için sosyal medya tasarımları yaptım, Medium’da teknoloji, gündem ve müzik üzerine yazdım. Son zamanlarda Android uygulamaları ve tarayıcı eklentileri geliştiriyorum.',
      'about.f.city': 'Şehir',
      'about.f.cityV': 'İstanbul',
      'about.f.lang': 'Diller',
      'about.f.langV': 'Türkçe, İngilizce',
      'about.f.focus': 'İlgi alanları',
      'about.f.focusV': 'Doğrulama, fotoğraf, görsel tasarım, Android',
      'photos.title': 'Fotoğraf',
      'photos.intro': '2019’dan bu yana İstanbul’da, yolda ve sahada çektiğim karelerden bir seçki.',
      'photos.all': 'Tümü',
      'photos.istanbul': 'İstanbul',
      'photos.travel': 'Yol',
      'photos.sport': 'Spor',
      'photos.more': 'Daha fazlası Instagram, Flickr ve 500px’te.',
      'design.title': 'Tasarım',
      'design.intro': 'Futbol medyası için hazırladığım sosyal medya işlerinden örnekler.',
      'design.see': 'Tüm çalışmayı gör',
      'writing.title': 'Yazılar',
      'writing.intro': '2021 ile 2023 arasında Medium’da teknoloji, gündem ve müzik üzerine yazdım.',
      'writing.tech': 'Teknoloji',
      'writing.news': 'Gündem',
      'writing.music': 'Müzik',
      'writing.other': 'Yazı',
      'writing.profile': 'Medium profilim',
      'projects.title': 'Projeler',
      'projects.intro': 'İhtiyaç duyduğum araçları kendim geliştiriyorum. Çoğu Android için, Material You ile.',
      'projects.github': 'GitHub’da kodlar',
      'contact.title': 'İletişim',
      'contact.lead': 'Bir iş birliği, bir soru ya da sadece merhaba demek için bana bu hesaplardan ulaşabilirsiniz.',
      'footer.rights': 'Fotoğrafların ve tasarımların tüm hakları saklıdır.',
      'lb.close': 'Kapat',
      'lb.prev': 'Önceki fotoğraf',
      'lb.next': 'Sonraki fotoğraf',
      'img.missing': 'Fotoğraf yüklenemedi'
    },
    en: {
      'meta.description': 'Bilgehan Bilge: editor at Doğruluk Payı, photographer and designer based in Istanbul.',
      'skip': 'Skip to content',
      'nav.about': 'About',
      'nav.photos': 'Photography',
      'nav.design': 'Design',
      'nav.writing': 'Writing',
      'nav.projects': 'Projects',
      'nav.contact': 'Contact',
      'nav.menu': 'Menu',
      'nav.theme': 'Switch between light and dark theme',
      'hero.lead': 'I’m an editor at {dp}, a Turkish fact-checking organisation. I photograph Istanbul, design for social media and build the tools I need.',
      'hero.hint': 'See the unseen: move your cursor across the photo.',
      'hero.hintTouch': 'See the unseen: tap the photo.',
      'hero.another': 'Another frame',
      'glance.title': 'At a glance',
      'card.now.label': 'Now',
      'card.now.title': 'Editor, {dp}',
      'card.now.text': 'I work on fact-checking content.',
      'card.edu.label': 'Education',
      'card.edu.title': 'Journalism',
      'card.edu.text': 'Istanbul University, Faculty of Communication',
      'card.photo.label': 'Photography',
      'card.photo.link': 'Open the gallery',
      'card.writing.label': 'Latest on Medium',
      'card.writing.link': 'All articles',
      'card.design.label': 'Design',
      'card.design.text': 'Social media design for Gol var mı? and Lig Radyo',
      'card.projects.label': 'Things I build',
      'card.contact.label': 'Get in touch',
      'about.title': 'About',
      'about.p1': 'I studied journalism at Istanbul University’s Faculty of Communication. Today I work as an editor at {dp}.',
      'about.p2': 'Outside journalism, photography takes most of my time: Istanbul’s streets, trips and football pitches. I’ve designed social media content for football outlets and written on Medium about technology, current affairs and music. Lately I’ve been building Android apps and browser extensions.',
      'about.f.city': 'City',
      'about.f.cityV': 'Istanbul',
      'about.f.lang': 'Languages',
      'about.f.langV': 'Turkish, English',
      'about.f.focus': 'Interests',
      'about.f.focusV': 'Fact-checking, photography, visual design, Android',
      'photos.title': 'Photography',
      'photos.intro': 'A selection of frames from Istanbul, the road and the pitch, shot since 2019.',
      'photos.all': 'All',
      'photos.istanbul': 'Istanbul',
      'photos.travel': 'Travel',
      'photos.sport': 'Sport',
      'photos.more': 'More on Instagram, Flickr and 500px.',
      'design.title': 'Design',
      'design.intro': 'Examples of social media work I made for football outlets.',
      'design.see': 'See the full project',
      'writing.title': 'Writing',
      'writing.intro': 'Between 2021 and 2023 I wrote on Medium about technology, current affairs and music. The articles are in Turkish.',
      'writing.tech': 'Technology',
      'writing.news': 'Current affairs',
      'writing.music': 'Music',
      'writing.other': 'Article',
      'writing.profile': 'My Medium profile',
      'projects.title': 'Projects',
      'projects.intro': 'I build the tools I need. Most of them are for Android, with Material You.',
      'projects.github': 'Code on GitHub',
      'contact.title': 'Contact',
      'contact.lead': 'For a collaboration, a question, or just to say hello, you can reach me on any of these.',
      'footer.rights': 'All photographs and designs are copyrighted.',
      'lb.close': 'Close',
      'lb.prev': 'Previous photo',
      'lb.next': 'Next photo',
      'img.missing': 'Photo could not be loaded'
    }
  }
};
