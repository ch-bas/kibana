/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type {
  GetInstalledIntegrationsResponse,
  RulesSchema,
} from '../../../../../../common/detection_engine/schemas/response';

import { getRulesSchemaMock } from '../../../../../../common/detection_engine/schemas/response/rules_schema.mocks';
import { savedRuleMock, rulesMock } from '../mock';

import type {
  PatchRuleProps,
  CreateRulesProps,
  UpdateRulesProps,
  PrePackagedRulesStatusResponse,
  BasicFetchProps,
  Rule,
  FetchRuleProps,
  FetchRulesResponse,
  FetchRulesProps,
} from '../types';

export const updateRule = async ({ rule, signal }: UpdateRulesProps): Promise<RulesSchema> =>
  Promise.resolve(getRulesSchemaMock());

export const createRule = async ({ rule, signal }: CreateRulesProps): Promise<RulesSchema> =>
  Promise.resolve(getRulesSchemaMock());

export const patchRule = async ({ ruleProperties, signal }: PatchRuleProps): Promise<RulesSchema> =>
  Promise.resolve(getRulesSchemaMock());

export const getPrePackagedRulesStatus = async ({
  signal,
}: {
  signal: AbortSignal;
}): Promise<PrePackagedRulesStatusResponse> =>
  Promise.resolve({
    rules_custom_installed: 33,
    rules_installed: 12,
    rules_not_installed: 0,
    rules_not_updated: 0,
    timelines_installed: 0,
    timelines_not_installed: 0,
    timelines_not_updated: 0,
  });

export const createPrepackagedRules = async ({ signal }: BasicFetchProps): Promise<boolean> =>
  Promise.resolve(true);

export const fetchRuleById = jest.fn(
  async ({ id, signal }: FetchRuleProps): Promise<Rule> => savedRuleMock
);

export const fetchRules = async (_: FetchRulesProps): Promise<FetchRulesResponse> =>
  Promise.resolve(rulesMock);

export const fetchTags = async ({ signal }: { signal: AbortSignal }): Promise<string[]> =>
  Promise.resolve(['elastic', 'love', 'quality', 'code']);

// do not delete
export const fetchInstalledIntegrations = async ({
  packages,
  signal,
}: {
  packages?: string[];
  signal?: AbortSignal;
}): Promise<GetInstalledIntegrationsResponse> => {
  return Promise.resolve({
    installed_integrations: [
      {
        package_name: 'atlassian_bitbucket',
        package_title: 'Atlassian Bitbucket',
        package_version: '1.0.1',
        integration_name: 'audit',
        integration_title: 'Audit Logs',
        is_enabled: true,
      },
      {
        package_name: 'system',
        package_title: 'System',
        package_version: '1.6.4',
        is_enabled: true,
      },
    ],
  });
};
