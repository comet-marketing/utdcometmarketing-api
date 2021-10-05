module.exports = ({ env }) => ({
    upload: {
      provider: 'aws-s3',
      providerOptions: {
        accessKeyId: 'AKIA44NTNWXBIBHSEMUJ',
        secretAccessKey: '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',
        region: 'us-east-2',
        params: {
          Bucket: 'cometmarketinguploadprovider',
        },
      },
    },
  });
  