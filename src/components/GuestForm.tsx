"use client";

import React from "react";
import GuestFormDesign from "./design/GuestFormDesign";
import {
  sanitizePhoneNumber,
  isGuestFormValid,
  getSubmitButtonLabel,
} from "./functions/guestFormFunctions";

export interface GuestFormProps {
  guestName: string;
  guestPhone: string;
  onNameChange: (val: string) => void;
  onPhoneChange: (val: string) => void;
  onSubmit: () => void;
  loading: boolean;
  selectedRoomNumber: string | null;
}

export default function GuestForm({
  guestName,
  guestPhone,
  onNameChange,
  onPhoneChange,
  onSubmit,
  loading,
  selectedRoomNumber,
}: GuestFormProps) {
  function handlePhoneChange(rawInput: string) {
    const sanitized = sanitizePhoneNumber(rawInput);
    onPhoneChange(sanitized);
  }

  const isValid = isGuestFormValid(guestName, guestPhone, selectedRoomNumber);
  const isSubmitDisabled = loading || !isValid;
  const buttonLabel = getSubmitButtonLabel(loading, selectedRoomNumber);

  return (
    <GuestFormDesign
      guestName={guestName}
      guestPhone={guestPhone}
      selectedRoomNumber={selectedRoomNumber}
      buttonLabel={buttonLabel}
      isSubmitDisabled={isSubmitDisabled}
      loading={loading}
      onNameChange={onNameChange}
      onPhoneChange={handlePhoneChange}
      onSubmitClick={onSubmit}
    />
  );
}
