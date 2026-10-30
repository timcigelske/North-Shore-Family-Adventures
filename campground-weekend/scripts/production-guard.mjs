if (process.env.PUBLIC_LAUNCH_ENABLED !== 'true') {
  console.error('Production publication is disabled. Use a Deploy Preview; a separate authorized release is required.');
  process.exit(1);
}
