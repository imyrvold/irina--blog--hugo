// OAuth start - redirects to GitHub authorization
export default async (req) => {
  const clientId = Netlify.env.get("GITHUB_CLIENT_ID");
  const siteUrl = Netlify.env.get("URL") || "https://irina.myrvold.blog";

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `${siteUrl}/.netlify/functions/callback`,
    scope: "repo",
  });

  return new Response(null, {
    status: 302,
    headers: {
      Location: `https://github.com/login/oauth/authorize?${params.toString()}`,
    },
  });
};
