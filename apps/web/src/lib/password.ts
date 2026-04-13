export function checkPasswordStrength(value: string) {
  let score = 0;

  if (value.length >= 8) score++;
  if (/[A-Z]/.test(value)) score++;
  if (/[0-9]/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;

  return score;
}

export function getPasswordStrengthLabel(strength: number) {
  switch (strength) {
    case 1:
      return "약함";
    case 2:
      return "보통";
    case 3:
      return "강함";
    case 4:
      return "매우 강함";
    default:
      return "";
  }
}
