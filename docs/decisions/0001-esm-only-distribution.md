# 0001. Publish ESM only

- Status: Accepted, implemented
- Date: 2026-10-19
- Issue: #492 (tracker #490)
- Implemented in: #529

## Context

The package published both CommonJS and ESM builds. The dual build duplicated
distribution output and package metadata (`main`, the `require` export
condition, a CJS size-limit entry) for a library whose consumers can import ESM.

## Decision

Publish ESM only from 5.0.0:

- Remove the CommonJS build, the `require` export condition and CJS-specific
  metadata and checks.
- Keep `type: module`, the root `import`/`types` conditions, `module`,
  `sideEffects: false`, the TypeScript declarations and the minified ESM browser
  build (`unpkg`).
- No compatibility wrapper, `.cjs`/`.d.cts` artifact or `require` fallback.
- The Node.js minimum (`>= 20`) is unchanged.

## Consequences

- CommonJS callers migrate to `import`, use asynchronous `import()` where
  practical, or stay on 4.x. The README documents this.
- Packaging gets simpler and the tarball smaller. This does not make the
  colour calculations themselves faster.
- Release verification (#500) checks that packed consumers resolve the
  declarations under strict `NodeNext` and `bundler` resolution.
