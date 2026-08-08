# QR-V™ Admin — Consolidated Module Source

The administrative control plane is no longer planned as a separate public node.

## Canonical route

```text
https://qrv.network/admin
```

`/admin` must remain private, authenticated, role-restricted, and excluded from ordinary public navigation and search indexing. Consolidation into the platform node does **not** make the admin surface public.

## Runtime boundary

```text
qrv.network/admin
  ↓ server-side authorized requests
api.qrv.network/api/v1/admin/*
  ↓
PostgreSQL / audit data
```

The browser must never receive database credentials, platform write secrets, or unrestricted administrative API keys.

## Admin scope

- issuer approvals and suspension;
- record audits;
- revocation review;
- issuer/API key lifecycle;
- network metrics;
- suspicious record investigation;
- support escalations;
- billing/account cross-checks;
- operational controls.

## Required before activation

1. Individual administrator authentication.
2. MFA for privileged accounts.
3. Role-based authorization.
4. Admin audit logs.
5. CSRF protection for browser mutations.
6. Session rotation and revocation.
7. Rate limiting and security headers.
8. Explicit admin API authorization on `api.qrv.network`.
9. No administrative secrets in browser-readable configuration.
10. `robots.txt` / indexing exclusion.

## Repository status

This repository is retained as the source module and requirements record for the future `qrv.network/admin` implementation. It is not a separate production deployment in the two-node architecture.
