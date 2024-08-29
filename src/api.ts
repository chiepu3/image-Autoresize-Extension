const API_BASE_URL = "http://localhost:8020";

export async function getConfig() {
  const response = await fetch(`${API_BASE_URL}/config`);
  if (!response.ok) {
    throw new Error("Failed to fetch configuration");
  }
  return response.json();
}

export async function updateConfig(config: any) {
  const response = await fetch(`${API_BASE_URL}/config`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(config),
  });
  if (!response.ok) {
    throw new Error("Failed to update configuration");
  }
  return response.json();
}

export async function downloadImage(url: string, filename: string) {
  const response = await fetch(`${API_BASE_URL}/download-image`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url, filename }),
  });
  if (!response.ok) {
    throw new Error("Failed to download image");
  }
  return response.json();
}

export async function saveImage(filename: string, imageData: string) {
  const response = await fetch(`${API_BASE_URL}/save-image`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ filename, imageData }),
  });
  if (!response.ok) {
    throw new Error("Failed to save image");
  }
  return response.json();
}
