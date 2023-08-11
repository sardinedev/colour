---
"@sardine/colour": patch
---

fix: Reverts default export to CJS

Some widely used tools like [Jest still don't support ESM](https://jestjs.io/docs/ecmascript-modules) just yet.
This reverts the package to CJS, so node based tools can use it without any issues and we rely on modern bundlers to pick the ESM version when possible.
