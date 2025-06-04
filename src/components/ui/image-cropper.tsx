import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Crop, Upload } from 'lucide-react';

interface ImageCropperProps {
  image: string;
  onCropComplete: (croppedImage: string) => void;
  onCancel: () => void;
  aspectRatio?: number;
}

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.src = url;
  });

const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number }
): Promise<string> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return '';
  }

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return canvas.toDataURL('image/jpeg');
};

export const ImageCropper = ({ image, onCropComplete, onCancel, aspectRatio = 1 }: ImageCropperProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const onCropChange = (crop: { x: number; y: number }) => setCrop(crop);
  const onZoomChange = (zoom: number) => setZoom(zoom);
  const onCropCompleteCallback = useCallback(
    (_: any, croppedAreaPixels: any) => setCroppedAreaPixels(croppedAreaPixels),
    []
  );

  const handleCropImage = async () => {
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      onCropComplete(croppedImage);
    } catch (e) {
      console.error('Error cropping image: ', e);
    }
  };

  return (
    <Dialog open={!!image} onOpenChange={() => onCancel()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Crop className="h-5 w-5" /> Crop Your Photo
          </DialogTitle>
        </DialogHeader>
        <div className="relative h-[300px] w-full mt-4">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={aspectRatio}
            onCropChange={onCropChange}
            onCropComplete={onCropCompleteCallback}
            onZoomChange={onZoomChange}
          />
        </div>
        <div className="mt-4 space-y-2">
          <Label htmlFor="zoom">Zoom</Label>
          <Slider
            id="zoom"
            min={1}
            max={3}
            step={0.1}
            value={[zoom]}
            onValueChange={([value]) => setZoom(value)}
          />
        </div>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleCropImage}>
            <Upload className="h-4 w-4 mr-2" /> Apply Crop
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
