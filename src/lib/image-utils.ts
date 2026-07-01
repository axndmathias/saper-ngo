const MAX_WIDTH = 1200;
const JPEG_QUALITY = 0.8;

export interface CompressResult {
  dataUrl: string;
  originalSize: number;
  compressedSize: number;
  originalName: string;
}

export function compressImage(file: File): Promise<CompressResult> {
  return new Promise((resolve, reject) => {
    const originalSize = file.size;
    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;
        if (width > MAX_WIDTH) {
          height = Math.round(height * MAX_WIDTH / width);
          width = MAX_WIDTH;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Falha ao obter contexto 2D"));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Falha ao comprimir imagem"));
              return;
            }
            const fr = new FileReader();
            fr.onload = () => {
              resolve({
                dataUrl: fr.result as string,
                originalSize,
                compressedSize: blob.size,
                originalName: file.name,
              });
            };
            fr.onerror = () => reject(new Error("Falha ao ler blob comprimido"));
            fr.readAsDataURL(blob);
          },
          "image/jpeg",
          JPEG_QUALITY,
        );
      };
      img.onerror = () => reject(new Error("Falha ao carregar imagem para compressão"));
      img.src = reader.result as string;
    };

    reader.onerror = () => reject(new Error("Falha ao ler arquivo"));
    reader.readAsDataURL(file);
  });
}
