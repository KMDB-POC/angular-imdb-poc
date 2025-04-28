// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const RESEND_AUDIENCE_ID = Deno.env.get('RESEND_AUDIENCE_ID');
const IMDB_ACCESS_TOKEN = Deno.env.get('IMDB_ACCESS_TOKEN');
const IMDB_BASE_URL = Deno.env.get('IMDB_BASE_URL');
const IMDB_IMAGE_BASE_URL = Deno.env.get('IMDB_IMAGE_BASE_URL');
const MAIL_FROM = Deno.env.get('MAIL_FROM');
Deno.serve(async (req)=>{
  const broadcastId = (await createBroadcast()).id;
  const res = await fetch(`https://api.resend.com/broadcasts/${broadcastId}/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${RESEND_API_KEY}`
    }
  });
  const data = await res.json();
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
});
async function fetchNewMovies() {
  const today = new Date();
  const curDay = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  today.setDate(today.getDate() - 1);
  const prevDay = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const res = await fetch(IMDB_BASE_URL + '/discover/movie?' + new URLSearchParams({
    'primary_release_date.gte': prevDay,
    'primary_release_date.lte': curDay
  }), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${IMDB_ACCESS_TOKEN}`
    }
  });
  return await res.json();
}
async function createBroadcast() {
  const newMovies = await fetchNewMovies();
  let html = `
     <html>
      <body style="font-family: Arial, sans-serif;">
        <h2>🎬 New Movie Releases</h2>
        <ul style="list-style-type: none; padding: 0;">
  `;
  newMovies.results.forEach((movie)=>{
    html += `
      <li style="margin-bottom: 20px; border-bottom: 1px solid #ccc; padding-bottom: 10px;">
        <img src="${IMDB_IMAGE_BASE_URL + movie.poster_path}" alt="${movie.title}" style="width: 200px; height: auto; display: block; margin-bottom: 5px;" />
        <strong>${movie.title}</strong><br/>
        <span>Release Date: ${movie.release_date}</span>
      </li>
    `;
  });
  html += `
        </ul>
      </body>
    </html>
  `;
  const res = await fetch(`https://api.resend.com/broadcasts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${RESEND_API_KEY}`
    },
    body: JSON.stringify({
      audience_id: RESEND_AUDIENCE_ID,
      from: `KMDB <${MAIL_FROM}>`,
      subject: "Here's the latest movie list",
      html
    })
  });
  return await res.json();
}
