/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */
import uuid from 'uuid';
import { omit } from 'lodash';
import expect from '@kbn/expect';
import { secretKeys } from '@kbn/synthetics-plugin/common/constants/monitor_management';
import { DataStream, HTTPFields } from '@kbn/synthetics-plugin/common/runtime_types';
import { API_URLS } from '@kbn/synthetics-plugin/common/constants';
import { DEFAULT_FIELDS } from '@kbn/synthetics-plugin/common/constants/monitor_defaults';
import { ALL_SPACES_ID } from '@kbn/security-plugin/common/constants';
import { syntheticsMonitorType } from '@kbn/synthetics-plugin/server/legacy_uptime/lib/saved_objects/synthetics_monitor';
import { format as formatUrl } from 'url';
import supertest from 'supertest';
import { serviceApiKeyPrivileges } from '@kbn/synthetics-plugin/server/synthetics_service/get_api_key';
import { FtrProviderContext } from '../../../ftr_provider_context';
import { getFixtureJson } from './helper/get_fixture_json';

export default function ({ getService }: FtrProviderContext) {
  describe('[POST] /internal/uptime/service/monitors', function () {
    this.tags('skipCloud');

    const supertestAPI = getService('supertest');
    const supertestWithoutAuth = getService('supertestWithoutAuth');
    const security = getService('security');
    const kibanaServer = getService('kibanaServer');

    let _httpMonitorJson: HTTPFields;
    let httpMonitorJson: HTTPFields;

    before(() => {
      _httpMonitorJson = getFixtureJson('http_monitor');
    });

    beforeEach(() => {
      httpMonitorJson = _httpMonitorJson;
    });

    it('returns the newly added monitor', async () => {
      const newMonitor = httpMonitorJson;

      const apiResponse = await supertestAPI
        .post(API_URLS.SYNTHETICS_MONITORS)
        .set('kbn-xsrf', 'true')
        .send(newMonitor);

      expect(apiResponse.body.attributes).eql(omit(newMonitor, secretKeys));
    });

    it('returns bad request if payload is invalid for HTTP monitor', async () => {
      // Delete a required property to make payload invalid
      const newMonitor = { ...httpMonitorJson, 'check.request.headers': null };

      const apiResponse = await supertestAPI
        .post(API_URLS.SYNTHETICS_MONITORS)
        .set('kbn-xsrf', 'true')
        .send(newMonitor);

      expect(apiResponse.status).eql(400);
    });

    it('returns bad request if monitor type is invalid', async () => {
      const newMonitor = { ...httpMonitorJson, type: 'invalid-data-steam' };

      const apiResponse = await supertestAPI
        .post(API_URLS.SYNTHETICS_MONITORS)
        .set('kbn-xsrf', 'true')
        .send(newMonitor);

      expect(apiResponse.status).eql(400);
      expect(apiResponse.body.message).eql('Monitor type is invalid');
    });

    it('can create valid monitors without all defaults', async () => {
      // Delete a required property to make payload invalid
      const newMonitor = {
        name: 'Sample name',
        type: 'http',
        urls: 'https://elastic.co',
        locations: [
          {
            id: 'eu-west-01',
            label: 'Europe West',
            geo: {
              lat: 33.2343132435,
              lon: 73.2342343434,
            },
            url: 'https://example-url.com',
            isServiceManaged: true,
          },
        ],
      };

      const apiResponse = await supertestAPI
        .post(API_URLS.SYNTHETICS_MONITORS)
        .set('kbn-xsrf', 'true')
        .send(newMonitor);

      expect(apiResponse.status).eql(200);
      expect(apiResponse.body.attributes).eql(
        omit(
          {
            ...DEFAULT_FIELDS[DataStream.HTTP],
            ...newMonitor,
            revision: 1,
          },
          secretKeys
        )
      );
    });

    it('cannot create a invalid monitor without a monitor type', async () => {
      // Delete a required property to make payload invalid
      const newMonitor = {
        name: 'Sample name',
        url: 'https://elastic.co',
        locations: [
          {
            id: 'eu-west-01',
            label: 'Europe West',
            geo: {
              lat: 33.2343132435,
              lon: 73.2342343434,
            },
            url: 'https://example-url.com',
            isServiceManaged: true,
          },
        ],
      };

      const apiResponse = await supertestAPI
        .post(API_URLS.SYNTHETICS_MONITORS)
        .set('kbn-xsrf', 'true')
        .send(newMonitor);

      expect(apiResponse.status).eql(400);
    });

    it('can create monitor with API key with proper permissions', async () => {
      await supertestAPI
        .post('/internal/security/api_key')
        .set('kbn-xsrf', 'xxx')
        .send({
          name: 'test_api_key',
          expiration: '12d',
          kibana_role_descriptors: {
            uptime_save: {
              elasticsearch: serviceApiKeyPrivileges,
              kibana: [
                {
                  base: [],
                  spaces: [ALL_SPACES_ID],
                  feature: {
                    uptime: ['all'],
                  },
                },
              ],
            },
          },
        })
        .expect(200)
        .then(async (response: Record<string, any>) => {
          const { name, encoded: apiKey } = response.body;
          expect(name).to.eql('test_api_key');

          const config = getService('config');

          const { hostname, protocol, port } = config.get('servers.kibana');
          const kibanaServerUrl = formatUrl({ hostname, protocol, port });
          const supertestNoAuth = supertest(kibanaServerUrl);

          const apiResponse = await supertestNoAuth
            .post(API_URLS.SYNTHETICS_MONITORS)
            .auth(name, apiKey)
            .set('kbn-xsrf', 'true')
            .set('Authorization', `ApiKey ${apiKey}`)
            .send(httpMonitorJson);

          expect(apiResponse.status).eql(200);
        });
    });

    it('can not create monitor with API key without proper permissions', async () => {
      await supertestAPI
        .post('/internal/security/api_key')
        .set('kbn-xsrf', 'xxx')
        .send({
          name: 'test_api_key',
          expiration: '12d',
          kibana_role_descriptors: {
            uptime_save: {
              elasticsearch: serviceApiKeyPrivileges,
              kibana: [
                {
                  base: [],
                  spaces: [ALL_SPACES_ID],
                  feature: {
                    uptime: ['read'],
                  },
                },
              ],
            },
          },
        })
        .expect(200)
        .then(async (response: Record<string, any>) => {
          const { name, encoded: apiKey } = response.body;
          expect(name).to.eql('test_api_key');

          const config = getService('config');

          const { hostname, protocol, port } = config.get('servers.kibana');
          const kibanaServerUrl = formatUrl({ hostname, protocol, port });
          const supertestNoAuth = supertest(kibanaServerUrl);

          const apiResponse = await supertestNoAuth
            .post(API_URLS.SYNTHETICS_MONITORS)
            .auth(name, apiKey)
            .set('kbn-xsrf', 'true')
            .set('Authorization', `ApiKey ${apiKey}`)
            .send(httpMonitorJson);

          expect(apiResponse.status).eql(403);
          expect(apiResponse.body.message).eql('Unable to create synthetics-monitor');
        });
    });

    it('handles private location errors and immediately deletes monitor if integration policy is unable to be saved', async () => {
      const name = `Monitor with private location ${uuid.v4()}`;
      const newMonitor = {
        name,
        type: 'http',
        urls: 'https://elastic.co',
        locations: [
          {
            id: 'policy-id',
            label: 'Private Europe West',
            isServiceManaged: false,
          },
        ],
      };

      const username = 'admin';
      const roleName = `synthetics_admin`;
      const password = `${username}-password`;
      const SPACE_ID = `test-space-${uuid.v4()}`;
      const SPACE_NAME = `test-space-name ${uuid.v4()}`;
      try {
        await kibanaServer.spaces.create({ id: SPACE_ID, name: SPACE_NAME });

        // use a user without fleet permissions to cause an error
        await security.role.create(roleName, {
          kibana: [
            {
              feature: {
                uptime: ['all'],
              },
              spaces: ['*'],
            },
          ],
        });
        await security.user.create(username, {
          password,
          roles: [roleName],
          full_name: 'a kibana user',
        });
        await supertestWithoutAuth
          .post(API_URLS.SYNTHETICS_MONITORS)
          .auth(username, password)
          .set('kbn-xsrf', 'true')
          .send(newMonitor)
          .expect(500);

        const response = await supertestAPI
          .get(API_URLS.SYNTHETICS_MONITORS)
          .auth(username, password)
          .query({
            filter: `${syntheticsMonitorType}.attributes.name: "${name}"`,
          })
          .set('kbn-xsrf', 'true')
          .expect(200);

        expect(response.body.total).eql(0);
      } finally {
        await security.user.delete(username);
        await security.role.delete(roleName);
      }
    });
  });
}
