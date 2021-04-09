export default ({
  baseURL: 'console.aws.amazon.com',
  namespace: {
    local: 'refined:aws:local:',
    sync: 'refined:aws:sync:'
  },
  devMode: false,
  logging: {
    error: '❌',
    warning: '⚠️',
    skipping: '💤',
    ok: '✅',
    registry: '🛂',
    sync: '🔄',
    bug: '🐞'
  },
  regionMappings: {
    // US
    'us-east-1': ['u', 'e', '1'],
    'us-east-2': ['u', 'e', '2'],
    'us-west-1': ['u', 'w', '1'],
    'us-west-2': ['u', 'w', '2'],

    // Africa
    'af-south-1': ['f', 's', '1'],

    // Asia
    'ap-east-1': ['a', 'p', '1'],
    'ap-south-1': ['a', 's', '1'],
    'ap-southeast-1': ['a', 'e', '1'],
    'ap-southeast-2': ['a', 's', '2'],
    'ap-northeast-1': ['a', 'n', '1'],
    'ap-northeast-2': ['a', 'n', '2'],
    'ap-northeast-3': ['a', 'n', '3'],

    // Canada
    'ca-central-1': ['c', 'c', '1'],

    // Europe
    'eu-central-1': ['e', 'c', '1'],
    'eu-west-1': ['e', 'w', '1'],
    'eu-west-2': ['e', 'w', '2'],
    'eu-west-3': ['e', 'w', '3'],
    'eu-north-1': ['e', 'n', '1'],
    'eu-south-1': ['e', 's', '1'],

    // Middle East
    'me-south-1': ['m', 's', '1'],

    // South America
    'sa-east-1': ['s', 'e', '1'],
  },
  cache: {
    frequency: 604800000, // 7days
    regionsKey: 'regions',
    servicesKey: 'services',
  },
});
