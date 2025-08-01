const fs = require('fs-extra');
const path = require('path');
const { spawn } = require('child_process');

const jsonPath = path.resolve(__dirname, 'fixtures', 'clipboard-output.json');

(async () => {
  await fs.writeJson(jsonPath, [], { spaces: 2 });
  console.log('📄 clipboard-output.json cleared.');

  await require('cypress').run({
    spec: 'cypress/e2e/PreRequisite.feature',
    headed: true,
    browser: 'chrome'
  });

  console.log('✅ Waiting for valid JSON...');

  let users;
  // Retry until JSON is fully written and parsable
  while (true) {
    try {
      users = await fs.readJson(jsonPath);
      if (Array.isArray(users)) break;
    } catch {
      await new Promise(r => setTimeout(r, 250));
    }
  }
  console.log('✅ JSON validation complete. Users:', users.length);

  users = await fs.readJson(jsonPath);
  if (!Array.isArray(users) || users.length === 0) {
    throw new Error('❌ No users found in users.json');
  }

  const template = await fs.readFile('cypress/e2e/login.feature', 'utf-8');
  const procs = [];

  for (const [index, u] of users.entries()) {
    const safe = u.username.replace(/[^a-z0-9]/gi, '_');
    const featureContent = template
      .replace(/<username>/g, u.username)
      .replace(/<password>/g, u.password);

    const featureDir = path.resolve(__dirname,'e2e');
    await fs.ensureDir(featureDir);

    const featureFilename = `Testlogin${index + 1}_${safe}.feature`;
    const featurePath = path.join(featureDir, featureFilename);
    await fs.writeFile(featurePath, featureContent);

    const specPath = "cypress/e2e/"+featureFilename;
    console.log(`🧪 Running spec for ${u.username} → ${specPath}`);
    console.log(specPath);
    const cmd = process.platform === 'win64' ? 'npx.cmd' : 'npx';
    const args = [
      'cypress',
      'run',
      '--spec',
      specPath,
      '--browser',
      'chrome',
      '--headed'
    ];

    const proc = spawn(cmd, args, {
      shell: true,
      stdio: 'inherit'
    });

    proc.on('exit', (code) => {
      console.log(`✅ ${u.username} finished (exit code ${code})`);
      fs.removeSync(featurePath);
    });

    proc.on('error', (err) => {
      console.error(`❌ Spawn error for ${u.username}:`, err);
      fs.removeSync(featurePath);
    });

    procs.push(proc);
  }

  await Promise.all(procs.map(p => new Promise(res => p.on('close', res))));
  console.log('🎉 All parallel login tests completed.');
})();
