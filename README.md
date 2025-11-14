# 📝 Interactive Portfolio Generator

Modern, kullanıcı dostu bir CV (resume) oluşturma platformu. Kullanıcılar hazır şablonlarla profesyonel CV'lerini kolayca oluşturabilir, düzenleyebilir ve PDF olarak indirebilir.

## ✨ Özellikler

- 🎨 **5 Farklı Şablon**: Modern, Klasik, Minimal, Yaratıcı ve Profesyonel tasarımlar
- 🌍 **Çoklu Dil Desteği**: Türkçe ve İngilizce arayüz (i18next)
- 🎯 **Sürükle-Bırak Editör**: Kolay kullanımlı görsel editör (yakında)
- 📦 **Modüler Komponentler**: Header, İletişim, Deneyim, Eğitim, Beceriler, Projeler ve daha fazlası
- 🎨 **Özelleştirme**: Renkler, fontlar ve düzen ayarları
- 💾 **Otomatik Kayıt**: LocalStorage ile verileriniz güvende
- 📄 **PDF Export**: Yüksek kalitede PDF indirme (yakında)

## 🚀 Hızlı Başlangıç

### Gereksinimler

- Node.js 18+
- npm veya yarn

### Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build
```

## 📁 Proje Yapısı

```
src/
├── components/       # React komponentleri
│   ├── layout/      # Layout komponentleri (Header, Layout)
│   └── ui/          # UI komponentleri (Button, vb.)
├── pages/           # Sayfa komponentleri
├── stores/          # Zustand state yönetimi
├── types/           # TypeScript tipleri
├── interfaces/      # Interface tanımlamaları
├── locales/         # i18n çeviri dosyaları (tr, en)
├── utils/           # Yardımcı fonksiyonlar
└── hooks/           # Custom React hooks
```

## 🛠️ Teknolojiler

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Zustand** - State management
- **React Router v7** - Routing
- **Tailwind CSS v4** - Styling
- **i18next** - Internationalization (TR/EN)
- **react-toastify** - Toast notifications
- **React Hook Form + Zod** - Form yönetimi
- **@dnd-kit/core** - Drag & drop
- **Radix UI** - Accessible UI components

## 📖 Kullanım

1. **Dil Seçin**: Header'daki 🌍 butonuyla Türkçe/İngilizce arasında geçiş yapın
2. **Şablon Seç**: Ana sayfadan başlayın ve beğendiğiniz şablonu seçin
3. **Düzenle**: Editörde CV'nizi oluşturun ve özelleştirin
4. **Önizle**: Sonuçları canlı olarak görün
5. **İndir**: PDF olarak bilgisayarınıza kaydedin

## 📚 Dökümantasyon

Detaylı proje planı ve dokümantasyon için [PLAN.md](./PLAN.md) dosyasına bakın.

## 🔮 Gelecek Özellikler

- [ ] Gelişmiş sürükle-bırak düzenleme
- [ ] PDF export işlevselliği
- [ ] Daha fazla şablon seçeneği
- [ ] Resim yükleme
- [ ] Cloud storage entegrasyonu
- [x] ~~Çoklu dil desteği~~ ✅ Tamamlandı!
- [x] ~~Toast notification sistemi~~ ✅ Tamamlandı!

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Issue açabilir veya pull request gönderebilirsiniz.

## 📄 Lisans

Bu proje özel kullanım içindir.

---

**Not**: Proje aktif geliştirme aşamasındadır. Bazı özellikler henüz tamamlanmamıştır.
