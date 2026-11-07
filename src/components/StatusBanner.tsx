"use client";

import React from "react";
import StatusBannerDesign from "./design/StatusBannerDesign";
import { getBannerStyleConfig } from "./functions/statusBannerFunctions";

export interface StatusBannerProps {
  message: string;
  type: "error" | "success";
  onDismiss: () => void;
}

export default function StatusBanner({
  message,
  type,
  onDismiss,
}: StatusBannerProps) {
  const { containerClass, iconClass, title } = getBannerStyleConfig(type);

  return (
    <StatusBannerDesign
      message={message}
      type={type}
      containerClass={containerClass}
      iconClass={iconClass}
      title={title}
      onDismissClick={onDismiss}
    />
  );
}
