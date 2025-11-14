# PDF Export için Gerekli Paketler

## Kurulacak Paketler

CV'leri PDF olarak dışa aktarmak için aşağıdaki paketleri kurmanız gerekecek:

```bash
npm install jspdf html2canvas
npm install -D @types/html2canvas
```

### Paket Açıklamaları

- **jspdf**: PDF dosyaları oluşturmak için kullanılan kütüphane
- **html2canvas**: HTML içeriğini canvas'a dönüştürmek için kullanılır
- **@types/html2canvas**: html2canvas için TypeScript tip tanımlamaları

## Kullanım Örneği

```typescript
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

async function exportToPDF(elementId: string, filename: string) {
  const element = document.getElementById(elementId);
  if (!element) return;

  const canvas = await html2canvas(element, {
    scale: 2, // Yüksek kalite için
    useCORS: true, // Harici görseller için
    logging: false,
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const imgWidth = 210; // A4 width in mm
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
  pdf.save(filename);
}
```

## Alternatif Yaklaşımlar

### 1. react-pdf (Önerilen - Gelecekte)

Daha kontrollü ve profesyonel PDF oluşturmak için:

```bash
npm install @react-pdf/renderer
```

### 2. puppeteer (Server-side için)

Server-side rendering gerekiyorsa:

```bash
npm install puppeteer
```

## Not

Şu an için **jspdf + html2canvas** çözümü basit ve hızlı başlangıç için uygundur.
İlerleyen aşamalarda daha profesyonel çözümler için @react-pdf/renderer'a geçilebilir.
