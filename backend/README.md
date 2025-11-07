# Backend microservices (local Docker Compose)

This folder contains three services and an API Gateway for a microservices blogging platform.

Services:
- gateway (port 8080)
- user-service (port 3001)
- post-service (port 3002)
- comment-service (port 3003)

Each service connects to its own MongoDB instance (declared in docker-compose.yml).

Quick start (requires Docker):

```powershell
# from backend/ folder
docker compose up --build
```

After startup, gateway will be available at http://localhost:8080 and will proxy requests to the services under /api/v1/*.

Example: Register a user

POST http://localhost:8080/api/v1/auth/register
{
  "email": "alice@example.com",
  "name": "Alice",
  "password": "password"
}

Then use the returned token for protected calls in the Authorization header as: `Bearer <token>`

Notes:
- JWT secret is read from environment variable `JWT_SECRET` defined in docker-compose.yml. Update as needed.
- Each service exposes `/health` and `/metrics` endpoints for health checks and basic metrics.
