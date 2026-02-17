const BASE_URL = "http://127.0.0.1:5000";

export async function getHealthRisk(data) {
  const res = await fetch(`${BASE_URL}/api/ai/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch prediction");
  }

  return res.json();
}
