export type NetworkLoadingState = {
  state: "loading";
};

export type NetworkFailedState = {
  state: "failed";
  code: number;
};

export type NetworkSuccessState<T> = {
  state: "success";
  response: T;
};

export type NetworkState<T> =
  | NetworkLoadingState
  | NetworkFailedState
  | NetworkSuccessState<T>;

export interface OlmapResponse {
  associated_entrances: Array<number>;
  image_notes: Array<OlmapNote>;
  detail?: string;
  status: number;
}

export interface OlmapNote {
  id: number;
  image: string;
}

export const fetchOlmapData = async (
  osmId: number
): Promise<NetworkState<OlmapResponse> | undefined> => {
  if (osmId === -1) {
    return undefined;
  }
  try {
    const response = await fetch(
      `https://api.olmap.org/rest/osm_features/${osmId}/`
    );
    try {
      const data = await response.json();
      return {
        state: "success",
        response: data as OlmapResponse,
      };
    } catch {
      return {
        state: "failed",
        code: response.status,
      };
    }
  } catch {
    return {
      state: "failed",
      code: 0,
    };
  }
};
