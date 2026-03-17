import express from "express";

const app = express();
app.use(express.json({ limit: "1mb" }));

const PIXEL_ID = "783027081098083";
const ACCESS_TOKEN = "EAFYzF3XBTyUBQ2trQKtZBuKG8sqo6IxXCzeRSZCkVAT8h8hVXRViTC4ONdZAsYyc0zacR7hU1uguSClQZBJoZBqNWpg71J53il1AFZBFwZB40Nhvq01CfpRSVsihwykJ0rBYc5QWWGKWajTNw5bEOvhj5vFqb3OhdxCDTiaATetZBTMjfeNAQ9CAnmnhFZCJmE4orDwZDZD";
const API_VERSION = "v21.0"; // use your current Meta Graph API version

app.post("/api/meta/lead", async (req, res) => {
  try {
    const { eventId, eventSourceUrl, fbp, fbc, testEventCode } = req.body;

    const payload = {
      data: [
        {
          event_name: "Lead",
          event_time: Math.floor(Date.now() / 1000),
          action_source: "website",
          event_id: eventId,
         event_source_url: eventSourceUrl || "https://www.i88rayamy26.com/",
          user_data: {
            fbp: fbp || undefined,
            fbc: fbc || undefined,
          },
        },
      ],
    };

    if (testEventCode) {
      payload.test_event_code = testEventCode;
    }

    const response = await fetch(
      `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return res.status(500).json(result);
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

app.listen(3001, () => {
  console.log("Meta CAPI server running on port 3001");
});
