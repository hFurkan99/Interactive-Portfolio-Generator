export default {
  translation: {
    // Header
    header: {
      home: "Ana Sayfa",
      templates: "Şablonlar",
      myDocuments: "CV'lerim",
      language: "Dil",
    },

    // Home Page
    home: {
      title: "CV Oluşturucu",
      subtitle:
        "Profesyonel CV'nizi birkaç dakikada oluşturun. Hazır şablonlar, sürükle-bırak editör ve PDF export ile.",
      getStarted: "Hemen Başla",
      viewExamples: "Örneklere Bak",
    },

    // Template Selection
    templates: {
      title: "Şablon Seçin",
      subtitle: "Size uygun CV şablonunu seçin ve düzenlemeye başlayın",
      continue: "Devam Et",
      premium: "Premium",
      free: "Ücretsiz",
      selected: "şablonu seçtiniz",
      selectWarning: "Lütfen önce bir şablon seçin",
      created: "CV başarıyla oluşturuldu!",
    },

    // Template Names
    templateNames: {
      modern: "Modern",
      classic: "Klasik",
      minimal: "Minimal",
      creative: "Yaratıcı",
      professional: "Profesyonel",
    },

    // Template Full Names
    templateFullNames: {
      modernProfessional: "Modern Profesyonel",
      classicElegance: "Klasik Zarafet",
      minimalClean: "Minimal Temiz",
      creativeBold: "Yaratıcı Cesur",
      professionalExecutive: "Profesyonel Yönetici",
    },

    // Template Descriptions
    templateDescriptions: {
      modern: "Modern ve profesyonel görünüm. Teknik pozisyonlar için ideal.",
      classic: "Klasik ve zarif tasarım. Kurumsal pozisyonlar için uygun.",
      minimal: "Minimalist ve temiz görünüm. Yaratıcı profesyoneller için.",
      creative:
        "Yaratıcı ve cesur tasarım. Tasarımcılar ve yaratıcı profesyoneller için.",
      professional:
        "Profesyonel ve üst düzey görünüm. Yönetici pozisyonları için.",
    },

    // Editor
    editor: {
      components: "Komponentler",
      settings: "Ayarlar",
      preview: "Önizle",
      edit: "Düzenle",
      save: "Kaydet",
      export: "Dışa Aktar",
      addComponent: "Komponent Ekle",
      componentsList: "CV bileşenleri buraya eklenecek",
      settingsList: "Stil ve ayarlar buraya eklenecek",
      editorArea: "Editör alanı - Komponentler buraya eklenecek",
      notFound: "CV bulunamadı",
      backToTemplates: "Şablon seçimine dön",
      added: "Eklendi",
    },

    // Preview
    preview: {
      downloadPDF: "PDF İndir",
      backToEditor: "Düzenle",
      previewArea: "PDF önizleme alanı - CV içeriği buraya render edilecek",
      pdfComingSoon: "PDF dışa aktarma özelliği çok yakında!",
    },

    // Components
    componentTypes: {
      header: "Başlık",
      contact: "İletişim Bilgileri",
      summary: "Özet",
      experience: "İş Deneyimi",
      education: "Eğitim",
      skills: "Beceriler",
      projects: "Projeler",
      certifications: "Sertifikalar",
      languages: "Diller",
      customSection: "Özel Bölüm",
    },

    // Header Form
    headerForm: {
      fullname: "Ad Soyad",
      title: "Profesyonel Unvan",
      photoUrl: "Fotoğraf URL",
      validations: {
        nameRequired: "Ad soyad alanı zorunludur",
        titleRequired: "Profesyonel unvan alanı zorunludur",
      },
    },

    // Contact Form validations
    contactForm: {
      validations: {
        invalidEmail: "Geçersiz e-posta",
        invalidUrl: "Geçersiz URL",
      },
    },

    // Summary Form validations
    summaryForm: {
      validations: {
        summaryRequired: "Özet alanı gerekli",
      },
    },

    // Experience Form validations
    experienceForm: {
      validations: {
        companyRequired: "Şirket alanı zorunludur",
        positionRequired: "Pozisyon alanı zorunludur",
        startDateRequired: "Başlangıç tarihi alanı zorunludur",
        atLeastOneExperience: "En az bir deneyim gereklidir",
      },
    },

    // Education Form validations
    educationForm: {
      validations: {
        institutionRequired: "Kurum alanı zorunludur",
        degreeRequired: "Derece alanı zorunludur",
        startDateRequired: "Başlangıç tarihi alanı zorunludur",
        atLeastOneEducation: "En az bir eğitim gereklidir",
      },
    },

    // Skills Form validations
    skillsForm: {
      validations: {
        skillNameRequired: "Yetenek adı gerekli",
        atLeastOneSkill: "En az bir yetenek gereklidir",
      },
    },

    // Projects Form validations
    projectsForm: {
      validations: {
        projectNameRequired: "Proje adı gerekli",
        descriptionRequired: "Açıklama gerekli",
        invalidUrl: "Geçersiz URL",
        atLeastOneProject: "En az bir proje gereklidir",
      },
    },

    // Certifications Form validations
    certificationsForm: {
      validations: {
        certificationNameRequired: "Sertifika adı gerekli",
        issuerRequired: "Veren kuruluş gerekli",
        dateRequired: "Tarih gerekli",
        invalidUrl: "Geçersiz URL",
        atLeastOneCertification: "En az bir sertifika gereklidir",
      },
    },

    // Languages Form validations
    languagesForm: {
      validations: {
        languageRequired: "Dil alanı zorunludur",
        atLeastOneLanguage: "En az bir dil gereklidir",
      },
    },

    // Skills
    skillLevels: {
      beginner: "Başlangıç",
      intermediate: "Orta",
      advanced: "İleri",
      expert: "Uzman",
    },

    // Languages
    languageProficiency: {
      basic: "Temel",
      conversational: "Konuşma",
      fluent: "Akıcı",
      native: "Anadil",
    },

    // Common
    common: {
      loading: "Yükleniyor...",
      error: "Hata",
      success: "Başarılı",
      cancel: "İptal",
      delete: "Sil",
      add: "Ekle",
      optional: "İsteğe bağlı",
      edit: "Düzenle",
      save: "Kaydet",
      close: "Kapat",
      search: "Ara",
      filter: "Filtrele",
      sort: "Sırala",
      noData: "Veri bulunamadı",
    },
  },
};
