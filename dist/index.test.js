"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const tap_1 = require("tap");
const _1 = require(".");
tap_1.test('folder size is larger than 0', t => {
    _1.getDirectorySize('.')
        .then((size) => {
        t.ok(Number.isFinite(size));
        t.ok(size > 0);
    })
        .catch(t.error)
        .finally(t.end);
});
tap_1.test('folder size is correct', t => {
    const testSize = 8 * 1024;
    const testDir = t.testdir({ rndBytes: crypto_1.randomBytes(testSize) });
    _1.getDirectorySize(testDir)
        .then((size) => {
        console.log('Expected:', testSize, '|', 'Got:', size);
        t.ok(size >= testSize);
        t.ok(size <= testSize * 1.5);
    })
        .catch(t.error)
        .finally(t.end);
});
//# sourceMappingURL=index.test.js.map