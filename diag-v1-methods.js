const apiKey = "AIzaSyDOqnEwMJJcsjfNlvfN1vlEZbekg7WX-48"; 

async function test() {
  const url = `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log("v1 Models with Methods:", JSON.stringify(data.models.map(m => ({ name: m.name, methods: m.supportedMethods })), null, 2));
  } catch (e) {
    console.error("Fetch failed:", e);
  }
}
test();
