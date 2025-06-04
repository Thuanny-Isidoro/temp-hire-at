
import React, { useState } from 'react';
import { Input } from './input';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { Upload, X } from 'lucide-react';
import { ImageCropper } from './image-cropper';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  className?: string;
}

export const ImageUpload = ({ value, onChange, className }: ImageUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [cropperImage, setCropperImage] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          // Open cropper dialog
          setCropperImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleRemove = () => {
    onChange('');
  };

  const handleCropComplete = (croppedImage: string) => {
    onChange(croppedImage);
    setCropperImage('');
  };

  const handleCropCancel = () => {
    setCropperImage('');
  };

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      {value ? (
        <div className="relative">
          <img
            src={value}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-2 border-primary/20"
          />
          <Button 
            type="button" 
            variant="destructive" 
            size="icon" 
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
            onClick={handleRemove}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ) : (
        <div
          className={cn(
            "w-32 h-32 rounded-full flex flex-col items-center justify-center border-2 border-dashed p-4 transition-colors",
            isDragging ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary/50",
            "cursor-pointer"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('photo-upload')?.click()}
        >
          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
          <span className="text-xs text-center text-muted-foreground">
            Upload Photo
          </span>
        </div>
      )}
      <Input
        id="photo-upload"
        type="file"
        accept="image/jpeg,image/png"
        onChange={handleFileChange}
        className="hidden"
      />
      <p className="text-xs text-muted-foreground">
        JPG or PNG. Max 5MB
      </p>

      {cropperImage && (
        <ImageCropper 
          image={cropperImage} 
          onCropComplete={handleCropComplete} 
          onCancel={handleCropCancel}
          aspectRatio={1}
        />
      )}
    </div>
  );
};
