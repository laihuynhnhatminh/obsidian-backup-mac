<span class="mcl-back-button">[[Technology/To Be Clean Up/Interview/Middle/index|← Middle]]</span> <span class="mcl-back-button">[[Home|🏠 Home]]</span>

---


---
tags:
  - redis
  - intermediate
  - advance
---
## Redis usage

### What Redis actually is

An in-memory data store. Reads/writes happen in RAM, not disk. That single fact explains every use case — and every limitation.

- Sub-millisecond latency (vs ~10ms for Postgres)
- Data lives in RAM — expensive, volatile by default
- Supports persistence (RDB snapshots, AOF logs) but that's secondary
- Single-threaded command execution — atomic by design

---

## Core use cases

### 1. Caching

The most common use case. Store expensive query results so you don't hit the DB every request.

```
Request → Redis hit? → return cached value
                ↓ miss
           Query DB → store in Redis with TTL → return
```

**When to use:**

- DB query is slow or expensive (joins, aggregations)
- Data doesn't change often (product listings, config, user profiles)
- Same data is read by many users

**Key decisions:**

- TTL (time-to-live) — how stale is acceptable?
- Invalidation strategy — do you delete on write, or let TTL expire?
- Cache-aside (app manages) vs write-through (always write to both)

**Real example — car platform:** Car listing pages, finance rate tables, dealer info — all good cache candidates. Finance calculations that depend on live rates — cache with short TTL or skip caching.

---

### 2. Session storage

HTTP is stateless. Sessions need to live somewhere fast and shared across server instances.

**Why not just the DB?** Every request would hit the DB to validate the session — unnecessary load.

**Why not in-memory on the server?** Doesn't work with multiple server instances (load balancer sends user to different server).

Redis is the standard answer: shared, fast, TTL-based expiry handles session timeout automatically.

---

### 3. Rate limiting

Control how many requests a user/IP can make in a time window.

```
INCR user:123:requests
EXPIRE user:123:requests 60   ← resets counter after 60s
```

Redis atomic `INCR` + `EXPIRE` makes this safe without race conditions. No distributed locking needed.

**When to use:**

- API abuse prevention
- Login attempt throttling
- Preventing duplicate form submissions

---

### 4. Job queues / background processing

Push jobs to a Redis list, workers pop and process them.

Libraries: BullMQ (Node.js), Celery (Python), Sidekiq (Ruby) — all backed by Redis.

```
Producer → LPUSH queue:emails { jobData }
Worker   → BRPOP queue:emails  ← blocks until job available
```

**When to use:**

- Email sending, PDF generation, report processing
- Anything that shouldn't block the HTTP response
- Tasks that need retry logic, delay, or concurrency control

**Your stack:** BullMQ + Next.js App Router — already using this pattern.

---

### 5. Pub/Sub messaging

Publishers push messages to a channel, subscribers receive them.

```
Publisher → PUBLISH car:price-update { carId, newPrice }
Subscriber ← receives event in real time
```

**When to use:**

- Real-time notifications
- Broadcasting state changes to multiple services
- Lightweight event bus between services

**Important limit:** Redis Pub/Sub is fire-and-forget. If a subscriber is offline, the message is lost. For guaranteed delivery, use a proper message broker (Kafka, RabbitMQ) or Redis Streams.

---

### 6. Distributed locking

Prevent two processes from doing the same thing simultaneously.

```
SET lock:process-name uniqueToken NX EX 30
```

`NX` — only set if key doesn't exist (atomic check-and-set) `EX 30` — auto-release after 30s if process crashes

**When to use:**

- Preventing duplicate cron job execution across instances
- Ensuring only one worker processes a specific record at a time

**Use Redlock** for multi-node Redis setups — single-node locking has failure edge cases.

---

### 7. Real-time leaderboards / counters

Sorted sets (`ZADD`, `ZRANK`, `ZRANGE`) are built for ranked data.

```
ZADD leaderboard 1500 user:123
ZRANK leaderboard user:123   ← rank in O(log N)
ZRANGE leaderboard 0 9 REV   ← top 10
```

**When to use:**

- Gaming leaderboards
- "Most viewed" or "trending" lists
- Activity feeds with scoring

---

## Architecture decision guide

```
Is the data hot (read many times, written rarely)?
  └─ Yes → Cache it in Redis with a TTL

Is the operation time-sensitive but shouldn't block the user?
  └─ Yes → Push to a Redis job queue

Do you need to share state across multiple server instances?
  └─ Yes → Redis (sessions, locks, pub/sub)

Is the data relational or needs complex queries?
  └─ No → Redis is wrong, use Postgres

Does data need to survive a Redis restart with 100% guarantee?
  └─ Yes → Redis alone is wrong, use a DB as source of truth
```

---

## Interview probes (for interviewers)

**Good follow-ups:**

- "What happens to your cached data when Redis restarts?" → expect persistence config knowledge or "cache rebuilds from DB"
- "How would you prevent a cache stampede?" → expect mutex lock, probabilistic early expiry, or background refresh
- "Why not use Redis as your primary database?" → expect RAM cost, durability trade-offs, no relational queries
- "How does Pub/Sub differ from Redis Streams?" → expect fire-and-forget vs persistent log with consumer groups

**Red flags:**

- "Use Redis for everything" — doesn't understand RAM cost or durability limits
- Can't explain TTL or cache invalidation strategy
- Thinks Redis Pub/Sub guarantees delivery
- Never mentions eviction policies (`LRU`, `LFU`) when discussing caching at scale
