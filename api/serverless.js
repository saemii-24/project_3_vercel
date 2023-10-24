import fetch from "node-fetch";

export default async function handler(request, response) {
  const apiKey = process.env.API_KEY;
  const city = request.query.city;
  // console.log(request.body);
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=kr`;
  const res = await fetch(apiUrl);
  const json = await res.json();
  response.status(200).json(json);
}
