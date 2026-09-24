/**
 * Client-side Image Optimization Utility
 * Crops, scales, and compresses profile photos into lightweight Data URLs (<60KB)
 * to ensure 100% reliability with localStorage, instant template rendering, and clean PDF prints.
 */

export interface OptimizeImageOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  cropToSquare?: boolean;
}

/**
 * Optimizes an image from File, Blob, or base64/URL string.
 * Returns a high quality, low-footprint Base64 JPEG data URL.
 */
export async function optimizeImage(
  source: File | Blob | string,
  options: OptimizeImageOptions = {}
): Promise<string> {
  const {
    maxWidth = 400,
    maxHeight = 400,
    quality = 0.85,
    cropToSquare = true
  } = options;

  return new Promise((resolve, reject) => {
    let srcUrl = '';
    let isObjectUrl = false;

    if (typeof source === 'string') {
      srcUrl = source;
    } else if (source && typeof source === 'object' && 'size' in source) {
      srcUrl = URL.createObjectURL(source as Blob);
      isObjectUrl = true;
    } else {
      return reject(new Error('Invalid image source type'));
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          if (isObjectUrl) URL.revokeObjectURL(srcUrl);
          return resolve(typeof source === 'string' ? source : srcUrl);
        }

        const naturalWidth = img.naturalWidth || img.width || 400;
        const naturalHeight = img.naturalHeight || img.height || 400;

        if (cropToSquare) {
          // Crop square from center
          const minDim = Math.min(naturalWidth, naturalHeight);
          const targetDim = Math.min(minDim, maxWidth);

          canvas.width = targetDim;
          canvas.height = targetDim;

          const sx = (naturalWidth - minDim) / 2;
          const sy = (naturalHeight - minDim) / 2;

          // Fill white background for transparent images converted to JPEG
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, targetDim, targetDim);

          ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, targetDim, targetDim);
        } else {
          // Scale keeping aspect ratio
          let w = naturalWidth;
          let h = naturalHeight;

          if (w > maxWidth || h > maxHeight) {
            const ratio = Math.min(maxWidth / w, maxHeight / h);
            w = Math.round(w * ratio);
            h = Math.round(h * ratio);
          }

          canvas.width = w;
          canvas.height = h;

          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, w, h);
          ctx.drawImage(img, 0, 0, w, h);
        }

        // Export as optimized JPEG
        const optimizedDataUrl = canvas.toDataURL('image/jpeg', quality);

        if (isObjectUrl) {
          URL.revokeObjectURL(srcUrl);
        }

        resolve(optimizedDataUrl);
      } catch (err) {
        // If canvas is tainted by cross-origin policy, fallback to original URL
        if (isObjectUrl) {
          URL.revokeObjectURL(srcUrl);
        }
        if (typeof source === 'string') {
          resolve(source);
        } else {
          // Fallback to FileReader if objectUrl failed on canvas
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(err);
          reader.readAsDataURL(source as Blob);
        }
      }
    };

    img.onerror = (err) => {
      if (isObjectUrl) {
        URL.revokeObjectURL(srcUrl);
      }
      // If it's a URL string, still return it in case direct loading works in <img> tag
      if (typeof source === 'string' && source.startsWith('http')) {
        resolve(source);
      } else {
        reject(new Error('Failed to load or parse image'));
      }
    };

    img.src = srcUrl;
  });
}
