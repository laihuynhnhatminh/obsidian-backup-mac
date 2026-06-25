<span class="mcl-back-button">[[Technology/To Be Clean Up/Interview/Middle/index|← Middle]]</span> <span class="mcl-back-button">[[Home|🏠 Home]]</span>

---


---
tags:
  - advance
  - patterns
  - architecture
  - restapi
  - graphql
---
## REST API vs GraphQL

### Over-fetching / under-fetching

- **REST** — endpoint returns fixed fields; client gets more than it needs
- **GraphQL** — client requests exactly what it needs, nothing more

### N+1 problem

- **REST** — N+1 happens at the _client_ (waterfall requests for nested data)
- **GraphQL** — N+1 moves to the _server_ (resolvers); needs DataLoader to batch

### HTTP caching

- **REST** — works natively; CDNs and browsers understand `GET` + `Cache-Control`
- **GraphQL** — POST breaks standard HTTP caching; requires client-side cache management

### Error handling

- **REST** — `404`, `422`, `500` work with standard monitoring and alerting
- **GraphQL** — always returns `200`; errors live inside `{ "errors": [...] }` — breaks default alerting

### Authorization

- **REST** — route-level middleware, simple and centralized
- **GraphQL** — needs field-level auth; easy to miss an entry point; use `graphql-shield`

### Multiple clients (mobile + web)

- **REST** — endpoint sprawl or a dedicated BFF layer needed
- **GraphQL** — one schema; each client self-serves the shape it needs

### Type safety & docs

- **REST** — OpenAPI/Swagger maintained separately, drifts from reality
- **GraphQL** — schema is always in sync; introspection gives free autocomplete and docs

### File upload

- **REST** — native multipart support
- **GraphQL** — awkward; common pattern is to use a REST endpoint alongside
## Interview probes (for interviewers)

**Good follow-ups to separate theory from real experience:**

- "Have you hit the N+1 problem in GraphQL? How did you solve it?" → expect DataLoader
- "How do you handle field-level auth in GraphQL?" → expect `graphql-shield` or resolver checks
- "Your error rate alert didn't fire but users were getting errors — what happened?" → expect the 200-always answer
- "When would you use both in the same system?" → expect the BFF pattern

**Red flags:**

- "GraphQL is always better" — misses caching and monitoring trade-offs
- "REST is always better" — hasn't worked on multi-client or relational data problems
- Can't explain what a resolver is or how schema introspection works
- Doesn't mention DataLoader when asked about GraphQL at scale