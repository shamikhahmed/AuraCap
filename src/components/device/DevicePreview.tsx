import type { DeviceType } from '@/types';
import { IPhonePreview } from './IPhonePreview';
import { IPadPreview } from './IPadPreview';
import { MacPreview } from './MacPreview';

export function DevicePreview({ device, model }: { device: DeviceType; model: string }) {
  if (device === 'ipad') return <IPadPreview model={model} />;
  if (device === 'mac') return <MacPreview model={model} />;
  return <IPhonePreview model={model} />;
}
