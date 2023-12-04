// require('dotenv-flow').config();
// const { name } = require('../../package.json');
// const urljoin = require('url-join');
// // const exec = require('shelljs.exec');
// const { exec } = require('child_process');
// const env = require('@blocklet/sdk/lib/env');

// async function createSqliteDatabase() {
//   const schemaUrl = urljoin(process.cwd(), 'prisma/schema.prisma');
//   // 注意: npx 可能会运行一个被缓存的旧版本的 prisma, 所以建议在这里为 prisma 指定 "latest" 或一个特定版本号
//   exec(`npx prisma@latest generate --schema ${schemaUrl}`);

//   if (process.env.DATABASE_URL) {
//     return;
//   }

//   process.env.DATABASE_URL = `file:${urljoin(env.dataDir, 'db/prd.db')}`;

//   // @see: https://www.prisma.io/docs/concepts/components/prisma-migrate/db-push#can-i-use-prisma-migrate-and-db-push-together
//   exec(`npx prisma@latest migrate deploy --schema ${schemaUrl}`);
// }

// (async () => {
//   try {
//     await createSqliteDatabase();
//   } catch (err) {
//     console.error(`${name} pre-start error`, err.message);
//     process.exit(1);
//   }
// })();
