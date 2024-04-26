import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const states = [
  { label: "Alabama", value: "AL" },
  { label: "Alaska", value: "AK" },
  { label: "Arizona", value: "AZ" },
  { label: "Arkansas", value: "AR" },
  { label: "California", value: "CA" },
  { label: "Colorado", value: "CO" },
  { label: "Connecticut", value: "CT" },
  { label: "Delaware", value: "DE" },
  { label: "Florida", value: "FL" },
  { label: "Georgia", value: "GA" },
  { label: "Hawaii", value: "HI" },
  { label: "Idaho", value: "ID" },
  { label: "Illinois", value: "IL" },
  { label: "Indiana", value: "IN" },
  { label: "Iowa", value: "IA" },
  { label: "Kansas", value: "KS" },
  { label: "Kentucky", value: "KY" },
  { label: "Louisiana", value: "LA" },
  { label: "Maine", value: "ME" },
  { label: "Maryland", value: "MD" },
  { label: "Massachusetts", value: "MA" },
  { label: "Michigan", value: "MI" },
  { label: "Minnesota", value: "MN" },
  { label: "Mississippi", value: "MS" },
  { label: "Missouri", value: "MO" },
  { label: "Montana", value: "MT" },
  { label: "Nebraska", value: "NE" },
  { label: "Nevada", value: "NV" },
  { label: "New Hampshire", value: "NH" },
  { label: "New Jersey", value: "NJ" },
  { label: "New Mexico", value: "NM" },
  { label: "New York", value: "NY" },
  { label: "North Carolina", value: "NC" },
  { label: "North Dakota", value: "ND" },
  { label: "Ohio", value: "OH" },
  { label: "Oklahoma", value: "OK" },
  { label: "Oregon", value: "OR" },
  { label: "Pennsylvania", value: "PA" },
  { label: "Rhode Island", value: "RI" },
  { label: "South Carolina", value: "SC" },
  { label: "South Dakota", value: "SD" },
  { label: "Tennessee", value: "TN" },
  { label: "Texas", value: "TX" },
  { label: "Utah", value: "UT" },
  { label: "Vermont", value: "VT" },
  { label: "Virginia", value: "VA" },
  { label: "Washington", value: "WA" },
  { label: "West Virginia", value: "WV" },
  { label: "Wisconsin", value: "WI" },
  { label: "Wyoming", value: "WY" },
];

export function convertFormValues(formValues: any) {
  const stateCode =
    states.findIndex((state) => state.value === formValues.startup_location) +
    1;

  const fundingTypeReceived = {
    has_VC: formValues.funding_type_received.includes("VC"),
    has_angel: formValues.funding_type_received.includes("Angel"),
    has_roundA: formValues.funding_type_received.includes("roundA"),
    has_roundB: formValues.funding_type_received.includes("roundB"),
    has_roundC: formValues.funding_type_received.includes("roundC"),
    has_roundD: formValues.funding_type_received.includes("roundD"),
  };

  const startupCategory = {
    is_software: formValues.startup_category === "software",
    is_web: formValues.startup_category === "web",
    is_mobile: formValues.startup_category === "mobile",
    is_enterprise: formValues.startup_category === "enterprise",
    is_advertising: formValues.startup_category === "advertising",
    is_gamesvideo: formValues.startup_category === "gamesvideo",
    is_ecommerce: formValues.startup_category === "ecommerce",
    is_biotech: formValues.startup_category === "biotech",
    is_consulting: formValues.startup_category === "consulting",
    is_othercategory: formValues.startup_category === "other category",
  };

  const startupLocation = {
    is_CA: stateCode === states.findIndex((state) => state.value === "CA") + 1,
    is_NY: stateCode === states.findIndex((state) => state.value === "NY") + 1,
    is_MA: stateCode === states.findIndex((state) => state.value === "MA") + 1,
    is_TX: stateCode === states.findIndex((state) => state.value === "TX") + 1,
    is_otherstate: !(
      stateCode === states.findIndex((state) => state.value === "CA") + 1 ||
      stateCode === states.findIndex((state) => state.value === "NY") + 1 ||
      stateCode === states.findIndex((state) => state.value === "MA") + 1 ||
      stateCode === states.findIndex((state) => state.value === "TX") + 1
    ),
  };

  const data = {
    state_code: stateCode,
    age_first_funding_year: parseFloat(formValues.age_first_funding_year),
    age_last_funding_year: parseFloat(formValues.age_last_funding_year),
    relationships: parseInt(formValues.relationships),
    funding_rounds: parseInt(formValues.funding_rounds),
    funding_total_usd: parseInt(formValues.funding_total_usd),
    milestones: parseInt(formValues.milestones),
    ...startupLocation,
    ...startupCategory,
    ...fundingTypeReceived,
    avg_participants: parseFloat(formValues.avg_participants),
    is_top500: formValues.is_top500,
  };
  //convert false to 0 and true to 1
  return Object.values(data).map((value) => {
    if (typeof value === "boolean") {
      return value ? 1 : 0;
    }
    return value;
  });
}


