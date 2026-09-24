import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  Upload,
  Trash2,
  Check,
  Globe,
  Sparkles,
  Eye,
  EyeOff,
  User,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { optimizeImage } from '../../utils/imageOptimizer';
import { useLanguage } from '../../i18n/LanguageContext';

interface Props {
  photoUrl?: string;
  showPhoto: boolean;
  onPhotoChange: (url: string) => void;
  onToggleShowPhoto: (show: boolean) => void;
}

// Curated high quality professional avatars
const PRESET_AVATARS = [
  {
    id: 'male-1',
    label: 'Corporate Pro (M)',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'female-1',
    label: 'Executive (F)',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'male-2',
    label: 'Tech Specialist (M)',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'female-2',
    label: 'Creative Lead (F)',
    url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'male-3',
    label: 'Senior Engineer (M)',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'female-3',
    label: 'Product Manager (F)',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'male-4',
    label: 'Modern Minimal (M)',
    url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'female-4',
    label: 'Design Director (F)',
    url: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400'
  }
];

export const ProfilePhotoManager: React.FC<Props> = ({
  photoUrl,
  showPhoto,
  onPhotoChange,
  onToggleShowPhoto
}) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'upload' | 'presets' | 'url' | 'camera'>('upload');
  const [urlInput, setUrlInput] = useState(photoUrl && photoUrl.startsWith('http') ? photoUrl : '');
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [imgLoadError, setImgLoadError] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset image load error state whenever photoUrl changes
  useEffect(() => {
    setImgLoadError(false);
  }, [photoUrl]);

  // Support Clipboard Paste (Ctrl+V / Cmd+V)
  useEffect(() => {
    const handlePaste = async (e: ClipboardEvent) => {
      if (!e.clipboardData) return;
      const items = Array.from(e.clipboardData.items);
      const imageItem = items.find((item) => item.type.startsWith('image/'));

      if (imageItem) {
        const file = imageItem.getAsFile();
        if (file) {
          e.preventDefault();
          await handleProcessFile(file);
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  const showNotification = (msg: string, isError = false) => {
    if (isError) {
      setErrorMessage(msg);
      setSuccessMessage(null);
    } else {
      setSuccessMessage(msg);
      setErrorMessage(null);
    }
    setTimeout(() => {
      setErrorMessage(null);
      setSuccessMessage(null);
    }, 4000);
  };

  // Main file processor with automatic canvas resizing & compression
  const handleProcessFile = async (file: File) => {
    setErrorMessage(null);
    if (!file.type.startsWith('image/')) {
      showNotification(t.photoErrorFormat, true);
      return;
    }

    try {
      setIsProcessing(true);
      const optimizedDataUrl = await optimizeImage(file, {
        maxWidth: 500,
        maxHeight: 500,
        quality: 0.88,
        cropToSquare: true
      });

      onPhotoChange(optimizedDataUrl);
      onToggleShowPhoto(true);
      showNotification(t.photoSuccess);
    } catch (err: any) {
      console.error('Photo optimization error:', err);
      showNotification(t.photoErrorProcess, true);
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleProcessFile(file);
    }
  };

  // Drag & drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleProcessFile(file);
    }
  };

  // Handle URL Apply with optional canvas optimization
  const handleApplyUrl = async () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;

    try {
      setIsProcessing(true);
      setErrorMessage(null);

      try {
        const optimized = await optimizeImage(trimmed, {
          maxWidth: 500,
          maxHeight: 500,
          quality: 0.88,
          cropToSquare: true
        });
        onPhotoChange(optimized);
      } catch {
        onPhotoChange(trimmed);
      }

      onToggleShowPhoto(true);
      showNotification(t.photoSuccess);
    } catch (err) {
      showNotification(t.photoErrorProcess, true);
    } finally {
      setIsProcessing(false);
    }
  };

  // Camera Handling
  const startCamera = async () => {
    setErrorMessage(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 640 }, facingMode: 'user' },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraActive(true);
    } catch (err: any) {
      setErrorMessage(t.photoErrorCamera);
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = async () => {
    if (!videoRef.current) return;
    try {
      setIsProcessing(true);
      const canvas = document.createElement('canvas');
      const size = Math.min(videoRef.current.videoWidth, videoRef.current.videoHeight) || 400;
      canvas.width = 400;
      canvas.height = 400;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const sx = (videoRef.current.videoWidth - size) / 2;
        const sy = (videoRef.current.videoHeight - size) / 2;
        ctx.drawImage(videoRef.current, sx, sy, size, size, 0, 0, 400, 400);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
        onPhotoChange(dataUrl);
        onToggleShowPhoto(true);
        stopCamera();
        showNotification(t.photoSuccess);
      }
    } catch (err) {
      showNotification(t.photoErrorProcess, true);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemovePhoto = () => {
    onPhotoChange('');
    setUrlInput('');
    stopCamera();
    showNotification(t.photoRemoved);
  };

  return (
    <div
      ref={containerRef}
      className="p-4 border border-blue-100 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-white rounded-2xl space-y-4 shadow-2xs"
    >
      {/* Header with Title and Visibility Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-blue-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-600 text-white rounded-lg shadow-2xs">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-900">{t.photoTitle}</h3>
            <p className="text-[11px] text-gray-500">{t.photoSubtitle}</p>
          </div>
        </div>

        {/* Show / Hide on Resume toggle */}
        <button
          type="button"
          onClick={() => onToggleShowPhoto(!showPhoto)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition border cursor-pointer ${
            showPhoto
              ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
              : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
          }`}
          title={showPhoto ? t.photoVisible : t.photoHidden}
        >
          {showPhoto ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          <span>{showPhoto ? t.photoVisible : t.photoHidden}</span>
        </button>
      </div>

      {/* Notifications */}
      {errorMessage && (
        <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Main Avatar Card & Controls */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        {/* Current Photo Preview Box */}
        <div className="relative group shrink-0 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden border-3 border-white shadow-md bg-slate-100 relative flex items-center justify-center">
            {isProcessing ? (
              <div className="flex flex-col items-center justify-center text-blue-600 gap-1">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="text-[10px] font-medium">{t.photoProcessing}</span>
              </div>
            ) : photoUrl && !imgLoadError ? (
              <img
                src={photoUrl}
                alt="Profile Preview"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={() => setImgLoadError(true)}
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-400">
                <User className="w-10 h-10 stroke-1" />
                <span className="text-[10px] font-medium text-gray-400 mt-1">
                  {imgLoadError ? 'Error' : 'No Photo'}
                </span>
              </div>
            )}
          </div>

          {photoUrl && (
            <button
              type="button"
              onClick={handleRemovePhoto}
              className="mt-2 text-[11px] text-red-600 hover:text-red-700 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
            >
              <Trash2 className="w-3 h-3" />
              {t.removePhoto}
            </button>
          )}
        </div>

        {/* Options Tabs */}
        <div className="flex-1 w-full space-y-3">
          {/* Action Tabs Bar */}
          <div className="flex bg-white/90 p-1 rounded-xl border border-gray-200 text-xs font-semibold gap-1">
            <button
              type="button"
              onClick={() => {
                setActiveTab('upload');
                stopCamera();
              }}
              className={`flex-1 py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer ${
                activeTab === 'upload'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{t.photoUploadTab}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('presets');
                stopCamera();
              }}
              className={`flex-1 py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer ${
                activeTab === 'presets'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.photoPresetsTab}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('url');
                stopCamera();
              }}
              className={`flex-1 py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer ${
                activeTab === 'url'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{t.photoUrlTab}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('camera');
                startCamera();
              }}
              className={`flex-1 py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer ${
                activeTab === 'camera'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>{t.photoCameraTab}</span>
            </button>
          </div>

          {/* TAB 1: UPLOAD FROM DEVICE */}
          {activeTab === 'upload' && (
            <div className="space-y-2">
              <label
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`p-4 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition block ${
                  isDragging
                    ? 'border-blue-500 bg-blue-50/80 scale-[1.01]'
                    : 'border-blue-200 bg-white hover:border-blue-400 hover:bg-blue-50/30'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/webp, image/gif, image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {isProcessing ? (
                  <div className="flex flex-col items-center py-2">
                    <Loader2 className="w-7 h-7 text-blue-600 animate-spin mb-2" />
                    <p className="text-xs font-bold text-gray-800">{t.photoProcessing}</p>
                  </div>
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-1.5 shadow-2xs">
                      <Upload className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-bold text-gray-800">
                      {t.uploadDragDrop}
                    </p>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      {t.uploadFormatSupport}
                    </p>
                    <span className="mt-2 text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-medium border border-blue-100">
                      {t.uploadClipboardTip}
                    </span>
                  </>
                )}
              </label>
            </div>
          )}

          {/* TAB 2: SAMPLE AVATARS */}
          {activeTab === 'presets' && (
            <div className="space-y-2">
              <p className="text-[11px] text-gray-500 font-medium">
                {t.sampleAvatarsDesc}
              </p>
              <div className="grid grid-cols-4 gap-2">
                {PRESET_AVATARS.map((avatar) => {
                  const isSelected = photoUrl === avatar.url;
                  return (
                    <button
                      key={avatar.id}
                      type="button"
                      onClick={() => {
                        onPhotoChange(avatar.url);
                        onToggleShowPhoto(true);
                        showNotification(`Selected ${avatar.label}`);
                      }}
                      className={`relative group rounded-xl overflow-hidden border-2 aspect-square transition p-0.5 cursor-pointer ${
                        isSelected
                          ? 'border-blue-600 ring-2 ring-blue-500/40 shadow-sm'
                          : 'border-gray-200 hover:border-blue-400'
                      }`}
                      title={avatar.label}
                    >
                      <img
                        src={avatar.url}
                        alt={avatar.label}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-blue-600/40 flex items-center justify-center rounded-lg">
                          <Check className="w-5 h-5 text-white drop-shadow-md font-bold stroke-3" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: IMAGE WEB URL */}
          {activeTab === 'url' && (
            <div className="space-y-2">
              <p className="text-[11px] text-gray-500 font-medium">
                {t.imageUrlDesc}
              </p>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Globe className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleApplyUrl()}
                    placeholder={t.imageUrlPlaceholder}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleApplyUrl}
                  disabled={!urlInput.trim() || isProcessing}
                  className="px-3.5 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition disabled:opacity-50 shrink-0 cursor-pointer flex items-center gap-1.5"
                >
                  {isProcessing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                  <span>{t.applyUrl}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: WEBCAM CAPTURE */}
          {activeTab === 'camera' && (
            <div className="space-y-2">
              <div className="relative w-full aspect-4/3 max-h-52 bg-black rounded-xl overflow-hidden flex items-center justify-center">
                <video
                  ref={videoRef}
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                {/* Circle guide overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-36 h-36 rounded-full border-2 border-white/70 border-dashed shadow-sm" />
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={capturePhoto}
                  disabled={isProcessing}
                  className="flex-1 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {isProcessing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Camera className="w-3.5 h-3.5" />}
                  <span>{t.cameraSnapshot}</span>
                </button>
                <button
                  type="button"
                  onClick={stopCamera}
                  className="px-3 py-2 text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition cursor-pointer"
                >
                  {t.cameraClose}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
