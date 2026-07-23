# qrv-admin

Internal administrative console for the QR-V™ Global Verification Network.

## Production Boundary

`admin.qrv.network` must remain private and authenticated. It must not be merged into the public `qrv.network` root site.

## Admin Scope

The admin console may cover:

- issuer approvals;
- issuer status changes;
- record audits;
- revocation review;
- API key management;
- metrics and network activity;
- suspicious record investigation;
- support escalations;
- billing/account status cross-checks;
- operational controls.

## Required Before Public Deployment

1. Authentication.
2. Role-based authorization.
3. Admin audit logs.
4. API key management.
5. Issuer approval workflow.
6. Revocation review workflow.
7. No public write routes without authorization.
8. Rate limiting and security headers.
9. `.env.example` with required secrets placeholders.
10. Deployment documentation.

## Public-Safe Rule

The public root site may link to `qrv.network/support`, `qrv.network/status`, and `issuer.qrv.network`. It should not link ordinary visitors into admin surfaces.

## Current Status

Planning repository. Not production deployable until the required controls above exist.
