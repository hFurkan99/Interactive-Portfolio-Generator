# CV Builder - Proje Planı ve Dökümantasyon

## 📋 Proje Özeti

**CV Builder**, kullanıcıların profesyonel CV'lerini kolayca oluşturmasını, düzenlemesini ve PDF olarak dışa aktarmasını sağlayan modern bir web uygulamasıdır.

### Temel Özellikler

1. ✅ **Şablon Seçimi**: Farklı stil ve düzenlerde hazır CV şablonları
2. 🌍 **Çoklu Dil Desteği**: Türkçe ve İngilizce arayüz (i18next)
3. 🎨 **Görsel Editör**: Sürükle-bırak ile komponent düzenleme
4. 📝 **Dinamik İçerik**: Deneyim, eğitim, beceriler, projeler vb. ekleme
5. 🎯 **Özelleştirme**: Renkler, fontlar, düzen ayarları
6. 📄 **PDF Export**: Yüksek kalitede PDF olarak indirme
7. 💾 **Otomatik Kayıt**: LocalStorage ile veri saklama

---

## 🏗️ Teknik Mimari

### Teknoloji Stack'i

- **Framework**: React 19 + TypeScript
- **Routing**: React Router v7
- **State Management**: Zustand
- **Internationalization**: i18next + react-i18next
- **Form Yönetimi**: React Hook Form + Zod
- **Drag & Drop**: @dnd-kit/core
- **Styling**: Tailwind CSS v4
- **PDF Export**: jsPDF + html2canvas (eklenecek)
- **UI Components**: Radix UI + Custom Components

### Proje Yapısı

```
src/
├── components/
│   ├── common/          # Genel kullanım komponentleri
│   ├── layout/          # Layout komponentleri
│   │   ├── Header.tsx   # Navigation header
│   │   └── Layout.tsx   # Main layout wrapper
│   └── ui/              # UI komponentleri (shadcn/ui)
│       └── button.tsx
├── pages/               # Sayfa komponentleri
│   ├── HomePage.tsx
│   ├── TemplateSelectionPage.tsx
│   ├── EditorPage.tsx
│   └── PreviewPage.tsx
├── stores/              # Zustand store'ları
│   ├── cvStore.ts       # CV dokümanları yönetimi
│   ├── editorStore.ts   # Editör UI state
│   └── uiStore.ts       # Global UI state
├── types/               # TypeScript type tanımlamaları
│   └── cv.types.ts      # CV ile ilgili tüm tipler
├── interfaces/          # Interface tanımlamaları
│   └── index.ts         # Store ve servis interface'leri
├── locales/             # i18n çeviri dosyaları
│   ├── en.ts           # İngilizce çeviriler
│   ├── tr.ts           # Türkçe çeviriler
│   └── i18n.ts         # i18next yapılandırması
├── utils/               # Yardımcı fonksiyonlar
│   ├── constants.ts     # Sabitler
│   ├── templates.ts     # Şablon tanımlamaları
│   └── id.ts           # ID generator
├── hooks/               # Custom React hooks (eklenecek)
├── App.tsx
├── main.tsx
└── routes.tsx          # Route tanımlamaları
```

---

## 🗺️ Sayfa Yapısı ve Routing

| Route                  | Sayfa                 | Açıklama                |
| ---------------------- | --------------------- | ----------------------- |
| `/`                    | HomePage              | Ana sayfa / Landing     |
| `/templates`           | TemplateSelectionPage | Şablon seçim ekranı     |
| `/editor/:documentId`  | EditorPage            | CV düzenleme editörü    |
| `/preview/:documentId` | PreviewPage           | PDF önizleme ve indirme |

---

## 📦 Veri Modeli

### Component Types (Komponent Tipleri)

Her CV şu komponentlerden oluşur:

1. **Header** - Ad, unvan, fotoğraf
2. **Contact** - İletişim bilgileri (email, telefon, sosyal medya)
3. **Summary** - Profesyonel özet
4. **Experience** - İş deneyimleri
5. **Education** - Eğitim bilgileri
6. **Skills** - Beceriler (seviye göstergeli)
7. **Projects** - Projeler
8. **Certifications** - Sertifikalar
9. **Languages** - Yabancı diller
10. **Custom Section** - Özel bölümler

### CVDocument Yapısı

```typescript
{
  id: string;
  title: string;
  templateId: string;
  components: CVComponentData[];
  settings: {
    colors: ColorScheme;
    typography: TypographySettings;
    layout: LayoutSettings;
  };
  createdAt: string;
  updatedAt: string;
  version: number;
}
```

---

## 🎨 Şablon Sistemi

### Mevcut Şablonlar

1. **Modern Professional** (Ücretsiz)

   - 2 kolonlu düzen
   - Modern renkler
   - Teknik pozisyonlar için

2. **Classic Elegance** (Ücretsiz)

   - 1 kolonlu düzen
   - Serif font
   - Kurumsal pozisyonlar için

3. **Minimal Clean** (Ücretsiz)

   - 1 kolonlu düzen
   - Minimalist tasarım
   - Yaratıcı profesyoneller için

4. **Creative Bold** (Premium)

   - 2 kolonlu düzen
   - Cesur renkler
   - Tasarımcılar için

5. **Professional Executive** (Premium)
   - 2 kolonlu düzen
   - Şık tipografi
   - Üst düzey pozisyonlar için

### Özelleştirme Seçenekleri

- **Renkler**: Primary, secondary, accent, text, background, border
- **Tipografi**: Font aileleri, boyutları
- **Düzen**: Kolon sayısı, boşluklar, kenar boşlukları
- **Bölüm Aralığı**: Compact, normal, relaxed

---

## 🔄 State Management

### Store'lar

#### 1. CVStore

- CV dokümanlarının yönetimi
- CRUD operasyonları
- LocalStorage ile kalıcılık

#### 2. EditorStore

- Seçili komponent
- Önizleme modu
- Zoom seviyesi
- Undo/Redo (gelecekte)

#### 3. UIStore

- Sidebar durumu
- Modal yönetimi
- Toast bildirimleri

---

## 🚀 Geliştirilecek Özellikler

### Aşama 1 - Temel İşlevsellik ✅

- [x] Type ve interface tanımlamaları
- [x] Store yapıları
- [x] Temel route yapısı
- [x] Şablon verileri
- [x] Placeholder sayfalar
- [x] Header komponenti
- [x] Çoklu dil desteği (i18next - TR/EN)

### Aşama 2 - Komponent Geliştirme (Devam Edecek)

- [ ] CV komponent preview'ları
- [ ] CV komponent editörleri
- [ ] Komponent ekleme paneli
- [ ] Sürükle-bırak fonksiyonalitesi
- [ ] Form validasyonları

### Aşama 3 - Editör Özellikleri

- [ ] Stil ayarları paneli
- [ ] Renk seçici
- [ ] Font seçici
- [ ] Düzen ayarları
- [ ] Undo/Redo
- [ ] Keyboard shortcuts

### Aşama 4 - PDF Export

- [ ] jsPDF ve html2canvas entegrasyonu
- [ ] PDF oluşturma servisi
- [ ] Export seçenekleri (format, kalite)
- [ ] PDF önizleme

### Aşama 5 - İyileştirmeler

- [ ] Responsive tasarım
- [ ] Daha fazla şablon
- [ ] Şablon önizleme görselleri
- [ ] Animasyonlar ve transition'lar
- [ ] Erişilebilirlik iyileştirmeleri

### Aşama 6 - Gelişmiş Özellikler

- [ ] Kullanıcı hesapları (optional)
- [ ] Cloud storage (optional)
- [ ] CV paylaşma (optional)
- [ ] İstatistikler (optional)
- [x] ~~Çoklu dil desteği~~ ✅ Tamamlandı!

---

## 📝 Kullanım Senaryosu

1. **Başlangıç**: Kullanıcı ana sayfadan "Hemen Başla"ya tıklar
2. **Şablon Seçimi**: Beğendiği şablonu seçer
3. **Editör**: Açılan editörde:
   - Sol panel: Komponentleri ekler/kaldırır
   - Orta alan: CV'yi düzenler
   - Sağ panel: Stil ayarlarını yapar
4. **Önizleme**: "Önizle" butonuna tıklar
5. **Export**: PDF olarak indirir

---

## 🎯 Performans Hedefleri

- İlk yükleme: < 2 saniye
- Component render: < 100ms
- PDF oluşturma: < 3 saniye
- Lighthouse Score: > 90

---

## 🔒 Veri Güvenliği

- Tüm veriler browser'ın LocalStorage'ında saklanır
- Hiçbir veri sunucuya gönderilmez
- Kullanıcı verisi tamamen lokal kalır

---

## 🛠️ Geliştirme Komutları

```bash
# Geliştirme sunucusu
npm run dev

# Production build
npm run build

# Linting
npm run lint

# Preview production build
npm run preview
```

---

## 📚 Kaynaklar ve Referanslar

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [React Hook Form](https://react-hook-form.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)

---

## 🤝 Katkıda Bulunma

Bu proje aktif geliştirme aşamasındadır. Önerileriniz ve katkılarınız için issue açabilirsiniz.

---

## 📄 Lisans

Bu proje özel kullanım içindir.
