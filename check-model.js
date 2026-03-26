const apiKey = "AIzaSyDOqnEwMJJcsjfNlvfN1vlEZbekg7WX-48"; 

async function test() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash?key=${apiKey}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log("Model Info:", JSON.stringify(data, null, 2));
  } catch (e) {
    console.error("Fetch failed:", e);
  }
}
test();
