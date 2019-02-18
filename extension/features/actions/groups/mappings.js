const description = 'Go to %REPLACE%';

export const services = {
  compute: {
    name: 'Compute',
    description: 'Shortcuts for AWS Compute services.',
    shortcuts: [
      {
        keys: ['g', '2'],
        name: 'Elastic Compute Cloud',
        abbr: 'ec2',
        uri: '%REPLACE%/ec2/v2/home',
        description,
      },
      {
        keys: ['g', 'l'],
        name: 'Lambda',
        abbr: 'lambda',
        uri: '%REPLACE%/lambda/home',
        description,
      },
      {
        keys: ['g', 'b'],
        name: 'Elastic Beanstalk',
        abbr: 'elasticbeanstalk',
        uri: '%REPLACE%/elasticbeanstalk/home',
        description,
      }
    ],
  },
  storage: {
    name: 'Storage',
    description: 'Shortcuts for AWS Storage services.',
    shortcuts: [
      {
        keys: ['g', '3'],
        name: 'Simple Storage Service',
        abbr: 's3',
        uri: 's3.%REPLACE%/s3/home',
        description,
      },
      {
        keys: ['g', 'z'],
        name: 'S3 Glacier',
        abbr: 'glacier',
        uri: '%REPLACE%/glacier/home',
        description,
      },
      {
        keys: ['g', 'f'],
        name: 'Elastic File System',
        abbr: 'efs',
        uri: '%REPLACE%/efs/home',
        description,
      }
    ],
  },
  database: {
    name: 'Database',
    description: 'Shortcuts for AWS Database services.',
    shortcuts: [
      {
        keys: ['g', 't'],
        name: 'Amazon Redshift',
        abbr: 'redshift',
        uri: '%REPLACE%/redshift/home',
        description,
      },
      {
        keys: ['g', 'k'],
        name: 'ElastiCache',
        abbr: 'elasticache',
        uri: '%REPLACE%/elasticache/home',
        description,
      },
      {
        keys: ['g', 'y'],
        name: 'DynamoDB',
        abbr: 'dynamodb',
        uri: '%REPLACE%/dynamodb/home',
        description,
      },
      {
        keys: ['g', 'r'],
        name: 'Relational Database Service',
        abbr: 'rds',
        uri: '%REPLACE%/rds/home',
        description,
      }
    ],
  },
  networkingContentDelivery: {
    name: 'Networking & Content Delivery',
    description: 'Shortcuts for AWS Networking & Content Delivery services.',
    shortcuts: [
      {
        keys: ['g', 'c'],
        name: 'CloudFront',
        abbr: 'cloudfront',
        uri: '%REPLACE%/cloudfront/home',
        description,
      },
      {
        keys: ['g', '5'],
        name: 'Route 53',
        abbr: 'route53',
        uri: '%REPLACE%/route53/home',
        description,
      },
      {
        keys: ['g', 'v'],
        name: 'VPC',
        abbr: 'vpc',
        uri: '%REPLACE%/vpc/home',
        description,
      }
    ],
  },
  developerTools: {
    name: 'Developer Tools',
    description: 'Shortcuts for AWS Developer Tools services.',
    shortcuts: [
      {
        keys: ['g', 'o'],
        name: 'CodeBuild',
        abbr: 'codebuild',
        uri: '%REPLACE%/codebuild/home',
        description,
      },
      {
        keys: ['g', 'd'],
        name: 'CodeDeploy',
        abbr: 'codedeploy',
        uri: '%REPLACE%/codesuite/codedeploy/applications',
        description,
      },
      {
        keys: ['g', 'p'],
        name: 'CodePipeline',
        abbr: 'codepipeline',
        uri: '%REPLACE%/codesuite/codepipeline/pipelines',
        description,
      }
    ],
  },
  robotics: {
    name: 'Robotics',
    description: 'Shortcuts for Robotics services.',
    shortcuts: [
      {
        keys: ['g', 'x'],
        name: 'AWS RoboMaker',
        abbr: 'robomaker',
        uri: '%REPLACE%/robomaker/home',
        description,
      }
    ],
  },
  managementGovernance: {
    name: 'Management & Governance',
    description: 'Shortcuts for AWS Management & Governance services.',
    shortcuts: [
      {
        keys: ['g', '4'],
        name: 'CloudFormation',
        abbr: 'cloudformation',
        uri: '%REPLACE%/cloudformation/home',
        description,
      },
      {
        keys: ['g', 's'],
        name: 'Systems Manager',
        abbr: 'systems-manager',
        uri: '%REPLACE%/systems-manager/home',
        description,
      },
      {
        keys: ['g', 'w'],
        name: 'CloudWatch',
        abbr: 'cloudwatch',
        uri: '%REPLACE%/cloudwatch/home',
        description,
      }
    ],
  },
  applicationIntegration: {
    name: 'Application Integration',
    description: 'Shortcuts for AWS Application Integration services.',
    shortcuts: [
      {
        keys: ['g', 'm'],
        name: 'Amazon MQ',
        abbr: 'amazon-mq',
        uri: '%REPLACE%/amazon-mq/home',
        description,
      },
      {
        keys: ['g', 'n'],
        name: 'Simple Notification Service',
        abbr: 'sns',
        uri: '%REPLACE%/sns/v2/home',
        description,
      },
      {
        keys: ['g', 'q'],
        name: 'Simple Queue Service',
        abbr: 'sqs',
        uri: '%REPLACE%/sqs/home',
        description,
      }
    ],
  },
  securityIdentityCompliance: {
    name: 'Security, Identity, & Compliance',
    description: 'Shortcuts for AWS Security, Identity, & Compliance services.',
    shortcuts: [
      {
        keys: ['g', 'i'],
        name: 'Identity and Access Management',
        abbr: 'iam',
        uri: '%REPLACE%/iam/home',
        description,
      }
    ],
  },
  customerEngagement: {
    name: 'Customer Engagement',
    description: 'Shortcuts for AWS Customer Engagement services.',
    shortcuts: [
      {
        keys: ['g', 'e'],
        name: 'Simple Email Service',
        abbr: 'ses',
        uri: '%REPLACE%/ses/home',
        description,
      }
    ],
  },
};

const _sortedService = {};
for (const service in services) {
  if (services[service]) {
    const {name, description, shortcuts} = services[service];

    shortcuts.sort((a, b) => (a.keys[1] < b.keys[1]) ? -1 : 1);

    _sortedService[service] = {
      name,
      description,
      shortcuts,
    };
  }
}

export const sortedService = _sortedService;

export const defaultServices = (ctx, BASE, shortcutsContext, log) => {
  const defaultService = [];

  for (const service in sortedService) {
    if (services[service]) {
      const {name, description, shortcuts} = services[service];

      defaultService.push({
        name,
        description,
        shortcuts: shortcuts.map(shortcut => {
          const {keys, uri, abbr} = shortcut;

          shortcut.uri = uri.replace('%REPLACE%', BASE);
          shortcutsContext.inject(keys.join('+'), () => {
            ctx.location.replace(`//${shortcut.uri}`);
          });

          log('🔡', abbr, keys);

          return shortcut;
        }),
      });
    }
  }

  return defaultService;
};
