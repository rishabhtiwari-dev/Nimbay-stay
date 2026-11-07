"use client";

import React from "react";
import { AvailableRoom } from "@/lib/types";
import RoomCardDesign from "./design/RoomCardDesign";
import {
  getCategoryBadgeClass,
  getCardContainerClass,
  formatCurrency,
} from "./functions/roomCardFunctions";

export interface RoomCardProps {
  room: AvailableRoom;
  selected: boolean;
  onSelect: (room: AvailableRoom) => void;
}

export default function RoomCard({ room, selected, onSelect }: RoomCardProps) {
  const formattedPricePerNight = formatCurrency(room.price_per_night);
  const formattedTotalPrice = formatCurrency(room.total_price);
  const badgeClass = getCategoryBadgeClass(room.category);
  const containerClass = getCardContainerClass(room.category, selected);

  return (
    <RoomCardDesign
      roomNumber={room.number}
      category={room.category}
      formattedPricePerNight={formattedPricePerNight}
      formattedTotalPrice={formattedTotalPrice}
      badgeClass={badgeClass}
      containerClass={containerClass}
      isSelected={selected}
      onSelectClick={() => onSelect(room)}
    />
  );
}
