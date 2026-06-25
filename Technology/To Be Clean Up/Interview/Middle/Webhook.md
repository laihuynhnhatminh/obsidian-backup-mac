<span class="mcl-back-button">[[Technology/To Be Clean Up/Interview/Middle/index|← Middle]]</span> <span class="mcl-back-button">[[Home|🏠 Home]]</span>

---


### Explain the difference between a webhook and a regular API call. When would you choose one over the other?

#### What a strong answer looks like

	- API call (polling): your server asks "did anything change?" repeatedly — wasteful if events are rare
- Webhook (push): the external service calls your server when something happens — event-driven, no wasted requests
- Choose webhooks when: events are infrequent or unpredictable, you need near-real-time reaction, you don't control the source system
- Choose polling when: the source doesn't support webhooks, you need to reconcile state in bulk, or delivery guarantees are unclear

Strong signal: mentions that webhooks invert the control flow — the sender drives timing, not the receiver. Shows they understand the architectural implication, not just the surface difference.

Red flag: describes webhooks purely as "faster API calls" without understanding the push vs pull model or the reliability implications that come with it.

---
### How do you verify that an incoming webhook actually came from the service you expect, and not a malicious third party?

#### What they should explain

- **Signature verification**: provider signs the payload with a shared secret using HMAC-SHA256, sends it in a header (e.g. `X-Signature`)
- On your side: recompute the HMAC using the raw request body + your stored secret, compare with the header value using a constant-time comparison
- **Why constant-time?** To prevent timing attacks — a naive `===` comparison leaks information about how many bytes matched
- **Replay attacks**: check a timestamp in the payload (e.g. `X-Timestamp`) and reject if it's older than 5 minutes
- Never verify against a parsed/re-serialized body — JSON key order or whitespace may differ; always use the raw bytes

Strong signal: mentions both constant-time comparison and replay attack prevention. Most candidates get the HMAC part; fewer think about the replay vector.

Red flag: only mentions "check for a secret key in the header" (basic auth / bearer token approach) without understanding payload signing — this doesn't protect against payload tampering.