'use strict';

/**
 * Defines app constants.
 */
angular.module('config', [])
  .constant('config', {
    // Debug mode: automatically switched to false when built using gulp
    'debug': true,
    // Show in-app developer console
    'devConsole': false,

    'version': '2.0.39.1',
    'supportedLanguages': ['en-US', 'fr-FR', 'it-IT', 'de-DE'],

    // REST server URLs and paths
    'servers': [
      {
        label: 'Debug',
        location: 'debug',
        restServerUrl: 'http://localhost:9000',
        restUri: '/api',
        active: false
      },
      {
        label: 'Staging',
        location: 'staging',
        restServerUrl: 'https://fithales-preprod.fi.schneider-electric.com',
        restUri: '/api/smartphone',
        active: true
      },
      {
        label: 'FI Internal',
        location: 'fiointernal',
        restServerUrl: 'https://fiointernal.fi.schneider-electric.com:443',
        restUri: '/api/smartphone',
        active: true
      },
      {
        label: 'Qualification',
        location: 'qualification',
        restServerUrl: 'https://facilityinsights-qualif.fi.schneider-electric.com:443',
        restUri: '/api/smartphone',
        active: false
      },
      {
        label: 'Pre-Production',
        location: 'preprod',
        restServerUrl: 'https://facilityinsights-preprod.schneider-electric.com:443',
        restUri: '/api/smartphone',
        active: false
      },
      {
        label: 'T_EUROPE_SERVER',
        location: 'europe',
        restServerUrl: 'https://facilityinsights-eu.schneider-electric.com:443',
        restUri: '/api/smartphone',
        active: false
      },
      {
        label: 'T_NORTH_AMERICA_SERVER',
        location: 'northamerica',
        restServerUrl: 'https://facilityinsights-us.schneider-electric.com:443',
        restUri: '/api/smartphone',
        active: false
      }
    ],

    // Analytics report URI
    'analyticsReportUri': '/publicapi/v1/Analytics/AnalyticsReport/?encryptedToken=',

    // Android push config
    'androidPush': {
      'senderID': '146416628644'
    },

    // iOS push config
    'iosPush': {
      'badge':'true',
      'sound':'true',
      'alert':'true'
    },

    // Data auto-update interval, in minutes
    'autoUpdateInterval': 5,

    // Deferred list rendering duration, in milliseconds
    'deferredDuration': 750
  })
  .constant('$ionicLoadingConfig', {
    templateUrl: 'modules/ui-components/ionic-loading/ionic-loading.view.html',
    delay: 100
  });
