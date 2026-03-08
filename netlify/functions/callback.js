// OAuth callback - exchanges code for token and sends it back to CMS
export default async (req) => {
  const clientId = Netlify.env.get("GITHUB_CLIENT_ID");
  const clientSecret = Netlify.env.get("GITHUB_CLIENT_SECRET");

  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return new Response("Missing code parameter", { status: 400 });
  }

  // Exchange the code for an access token
  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
    }),
  });

  const data = await tokenResponse.json();

  if (data.error) {
    return new Response(`Error: ${data.error_description}`, { status: 400 });
  }

  // Send the token back to the CMS via postMessage
  const html = `
<!DOCTYPE html>
<html>
<head><title>Авторизация...</title></head>
<body>
<script>
(function() {
  function receiveMessage(e) {
    console.log("receiveMessage %o", e);
    window.opener.postMessage(
      'authorization:github:success:${JSON.stringify({ token: data.access_token, provider: "github" })}',
      e.origin
    );
    window.removeEventListener("message", receiveMessage, false);
  }
  window.addEventListener("message", receiveMessage, false);
  window.opener.postMessage("authorizing:github", "*");
})();
</script>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: { "Content-Type": "text/html" },
  });
};
