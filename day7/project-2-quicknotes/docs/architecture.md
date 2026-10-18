# QuickNotes Architecture Document

## 1. Requirements & Estimates
- Scale: 1,000,000 active users.
- Throughput: ~1,000 requests per second (RPS) peak read/write traffic.
- Availability: 99.9% uptime SLA.

---

## 2. Architecture Diagram
[ Clients / Web App ] 
        │ (HTTPS / TLS)
        ▼
[ Cloud Load Balancer (ALB) ]
        │
        ├──────────────────────────┐
        ▼                          ▼
[ API Gateway / Reverse Proxy (Nginx) ]
        │
        ├──────────────────────────┐
        ▼                          ▼
[ Node.js / Express API Pods (Auto-scaling 2-10 instances) ]
        │
        ├──────────────────────────┐
        ▼                          ▼
[ Primary PostgreSQL (Read/Write) ] ──(Streaming Replication)──> [ Replica DB ]

---

## 3. Component Explanations & Request Flows
- Load Balancer: Distributes incoming HTTPS traffic across API instances and terminates TLS.
- API Gateway / Auth Middleware: Validates JWT tokens and rate-limits incoming requests.
- App Servers: Stateless Node.js microservices handling business logic and ORM queries.
- Database Cluster: PostgreSQL primary database with read replicas for scaling read-heavy query loads.

---

## 4. Trade-offs & Single Points of Failure (SPOF)
- Trade-off: Chose relational PostgreSQL over NoSQL for consistency guarantees, at the cost of requiring horizontal sharding or partitioning strategies at massive multi-million user scales.
- SPOF Mitigation: The primary PostgreSQL database is backed up by automated failover replicas and multi-region backups. Application servers are stateless and autoscaled behind a managed load balancer.
-