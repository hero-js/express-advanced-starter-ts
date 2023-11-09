import adapter from 'App/app';
import Config from 'Config';
import * as fs from 'fs';
import https from 'https';

adapter
  .adapt()
  .then((adaptedApp) => {
    const port = Config.getInt('PORT', { defaultValue: 3000 });
    const nodeEnv = Config.get<'development' | 'production'>('NODE_ENV', {
      defaultValue: 'production',
    });

    if (nodeEnv === 'production') {
      const options = {
        key: fs.readFileSync(Config.getOrThrow('SSL_KEY') || ''),
        cert: fs.readFileSync(Config.getOrThrow('SSL_CERT') || ''),
      };

      https.createServer(options, adaptedApp).listen(port, () => {
        console.log(`Server running on ${port}`);
      });
    } else {
      adaptedApp.listen(port, () =>
        console.log(`Server running on port ${port}`),
      );
    }
  })
  .catch((err) => console.error(err));
