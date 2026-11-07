export function getCategoryBadgeClass(category: string): string {
  switch (category) {
    case "Standard":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Deluxe":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "Suite":
      return "bg-purple-100 text-purple-800 border-purple-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

export function getCardContainerClass(
  category: string,
  isSelected: boolean
): string {
  const baseColors: Record<string, string> = {
    Standard: "border-blue-100 hover:border-blue-300 bg-blue-50/40",
    Deluxe: "border-amber-100 hover:border-amber-300 bg-amber-50/40",
    Suite: "border-purple-100 hover:border-purple-300 bg-purple-50/40",
  };

  const base = baseColors[category] || "border-gray-200 hover:border-gray-300 bg-gray-50/40";
  const selectionStyle = isSelected
    ? "ring-2 ring-emerald-600 border-emerald-600 bg-emerald-50/30 shadow-md"
    : "hover:shadow-sm";

  return `${base} ${selectionStyle}`;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
