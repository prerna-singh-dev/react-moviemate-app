import { fetchOptions } from "./fetchOptions";
export async function loadData(url) {
  try {
    const res = await fetch(url, fetchOptions);
    if (!res.ok) {
      throw new Error("Network issue occurred");
      return;
    }
    return res.json();
  } catch (err) {
    console.log("Error Occured in loader::", err.message);
  }
  return;
}
