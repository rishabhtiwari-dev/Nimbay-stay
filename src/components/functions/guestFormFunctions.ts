export function sanitizePhoneNumber(input: string): string {
  return input.replace(/\D/g, "").slice(0, 10);
}

export function isValidPhoneNumber(phone: string): boolean {
  return /^\d{10}$/.test(phone);
}

export function isGuestFormValid(
  guestName: string,
  guestPhone: string,
  selectedRoomNumber: string | null
): boolean {
  return (
    guestName.trim().length > 0 &&
    isValidPhoneNumber(guestPhone) &&
    Boolean(selectedRoomNumber)
  );
}

export function getSubmitButtonLabel(
  loading: boolean,
  selectedRoomNumber: string | null
): string {
  if (loading) return "Processing Booking...";
  if (!selectedRoomNumber) return "Select a Room First";
  return "Confirm & Book Stay";
}
