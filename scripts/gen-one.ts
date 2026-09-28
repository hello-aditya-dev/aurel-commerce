import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

const name = process.argv[2];
const size = process.argv[3];
const prompt = process.argv[4];

if (!name || !size || !prompt) {
  console.error('Usage: gen-one.ts <name> <size> <prompt>');
  process.exit(1);
}

const outPath = `/home/z/my-project/public/images/${name}.png`;
if (fs.existsSync(outPath)) {
  console.log(`SKIP ${name}`);
  process.exit(0);
}

process.on('unhandledRejection', (e) => {
  console.error(`UNHANDLED ${name}:`, (e as Error)?.message);
  process.exit(2);
});

(async () => {
  const start = Date.now();
  console.log(`GEN ${name} (${size})...`);
  const zai = await ZAI.create();
  const res = await Promise.race([
    zai.images.generations.create({ prompt, size: size as any }),
    new Promise((_, rej) => setTimeout(() => rej(new Error('timeout 150s')), 150000)),
  ]) as any;
  fs.writeFileSync(outPath, Buffer.from(res.data[0].base64, 'base64'));
  console.log(`OK ${name} (${Date.now() - start}ms)`);
  process.exit(0);
})().catch((e) => {
  console.error(`ERR ${name}: ${e.message}`);
  process.exit(3);
});
