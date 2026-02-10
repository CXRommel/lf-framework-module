import { countryClient } from "@/sdk/countryClient";
import { createService } from "@/reactive";

export const countryReactive = {
  onSuccess: ({ action, payload, params, db }) => {
    switch (action) {
      case "getCountries":
        db.collection("countries").bulkWrite(payload);
        break;
    }
  },
  onError: () => {},
};

export const countryService = createService(countryClient, countryReactive);
