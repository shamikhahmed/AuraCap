type HapticKind = 'light' | 'medium' | 'success' | 'error' | 'selection';

function vibrate(pattern: number | number[]) {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(pattern);
  }
}

export function hapticLight() {
  vibrate(6);
}

export function hapticMedium() {
  vibrate(12);
}

export function hapticSelection() {
  vibrate(4);
}

export function hapticSuccess() {
  vibrate([20, 40, 20]);
}

export function hapticError() {
  vibrate([80, 40, 80]);
}

export function triggerHaptic(kind: HapticKind) {
  switch (kind) {
    case 'light':
      hapticLight();
      break;
    case 'medium':
      hapticMedium();
      break;
    case 'selection':
      hapticSelection();
      break;
    case 'success':
      hapticSuccess();
      break;
    case 'error':
      hapticError();
      break;
  }
}
