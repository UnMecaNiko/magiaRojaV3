const CAMPAIGN_KEY = "velo_campaign";

export type CampaignData = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
};

export function captureCampaign(): CampaignData {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const campaign = {
    utm_source: params.get("utm_source") || undefined,
    utm_medium: params.get("utm_medium") || undefined,
    utm_campaign: params.get("utm_campaign") || undefined,
  };

  if (Object.values(campaign).some(Boolean)) {
    sessionStorage.setItem(CAMPAIGN_KEY, JSON.stringify(campaign));
    return campaign;
  }

  return getCampaign();
}

export function getCampaign(): CampaignData {
  if (typeof window === "undefined") return {};

  try {
    return JSON.parse(sessionStorage.getItem(CAMPAIGN_KEY) || "{}");
  } catch {
    return {};
  }
}
