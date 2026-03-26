const apiKey = "AIzaSyDOqnEwMJJcsjfNlvfN1vlEZbekg7WX-48"; 

async function test() {
  const url = `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log("v1 Models:", JSON.stringify(data, null, 2));
  } catch (e) {
    console.error("Fetch failed:", e);
  }
}
test();
