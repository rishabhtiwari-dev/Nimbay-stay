export interface BannerStyleConfig {
  containerClass: string;
  iconClass: string;
  title: string;
}

export function getBannerStyleConfig(type: "error" | "success"): BannerStyleConfig {
  if (type === "error") {
    return {
      containerClass: "bg-red-50/80 border-red-200 text-red-900",
      iconClass: "text-red-500",
      title: "Action Failed",
    };
  }

  return {
    containerClass: "bg-emerald-50/80 border-emerald-200 text-emerald-900",
    iconClass: "text-emerald-500",
    title: "Success",
  };
}
