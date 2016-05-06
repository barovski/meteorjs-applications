Package.describe({
  name: 'deejay:file-upload',
  version: '0.0.1',
  summary: 'this is just a test project file upload package',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.2.4');
  api.use('ecmascript');
  api.mainModule('file-upload.js', 'client');
  api.mainModule('file-upload-server.js', 'server');
});
