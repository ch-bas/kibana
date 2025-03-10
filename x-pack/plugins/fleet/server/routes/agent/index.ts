/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { AGENT_API_ROUTES } from '../../constants';
import {
  GetAgentsRequestSchema,
  GetTagsRequestSchema,
  GetOneAgentRequestSchema,
  UpdateAgentRequestSchema,
  DeleteAgentRequestSchema,
  PostAgentUnenrollRequestSchema,
  PostBulkAgentUnenrollRequestSchema,
  GetAgentStatusRequestSchema,
  GetAgentDataRequestSchema,
  PostNewAgentActionRequestSchema,
  PutAgentReassignRequestSchema,
  PostBulkAgentReassignRequestSchema,
  PostAgentUpgradeRequestSchema,
  PostBulkAgentUpgradeRequestSchema,
  PostCancelActionRequestSchema,
} from '../../types';
import * as AgentService from '../../services/agents';
import type { FleetConfigType } from '../..';
import type { FleetAuthzRouter } from '../security';

import { PostBulkUpdateAgentTagsRequestSchema } from '../../types/rest_spec/agent';

import {
  getAgentsHandler,
  getAgentTagsHandler,
  getAgentHandler,
  updateAgentHandler,
  deleteAgentHandler,
  getAgentStatusForAgentPolicyHandler,
  putAgentsReassignHandler,
  postBulkAgentsReassignHandler,
  getAgentDataHandler,
  bulkUpdateAgentTagsHandler,
} from './handlers';
import {
  postNewAgentActionHandlerBuilder,
  postCancelActionHandlerBuilder,
} from './actions_handlers';
import { postAgentUnenrollHandler, postBulkAgentsUnenrollHandler } from './unenroll_handler';
import {
  getCurrentUpgradesHandler,
  postAgentUpgradeHandler,
  postBulkAgentsUpgradeHandler,
} from './upgrade_handler';

export const registerAPIRoutes = (router: FleetAuthzRouter, config: FleetConfigType) => {
  // Get one
  router.get(
    {
      path: AGENT_API_ROUTES.INFO_PATTERN,
      validate: GetOneAgentRequestSchema,
      fleetAuthz: {
        fleet: { all: true },
      },
    },
    getAgentHandler
  );
  // Update
  router.put(
    {
      path: AGENT_API_ROUTES.UPDATE_PATTERN,
      validate: UpdateAgentRequestSchema,
      fleetAuthz: {
        fleet: { all: true },
      },
    },
    updateAgentHandler
  );
  // Bulk Update Tags
  router.post(
    {
      path: AGENT_API_ROUTES.BULK_UPDATE_AGENT_TAGS_PATTERN,
      validate: PostBulkUpdateAgentTagsRequestSchema,
      fleetAuthz: {
        fleet: { all: true },
      },
    },
    bulkUpdateAgentTagsHandler
  );
  // Delete
  router.delete(
    {
      path: AGENT_API_ROUTES.DELETE_PATTERN,
      validate: DeleteAgentRequestSchema,
      fleetAuthz: {
        fleet: { all: true },
      },
    },
    deleteAgentHandler
  );
  // List
  router.get(
    {
      path: AGENT_API_ROUTES.LIST_PATTERN,
      validate: GetAgentsRequestSchema,
      fleetAuthz: {
        fleet: { all: true },
      },
    },
    getAgentsHandler
  );
  // List Agent Tags
  router.get(
    {
      path: AGENT_API_ROUTES.LIST_TAGS_PATTERN,
      validate: GetTagsRequestSchema,
      fleetAuthz: {
        fleet: { all: true },
      },
    },
    getAgentTagsHandler
  );

  // Agent actions
  router.post(
    {
      path: AGENT_API_ROUTES.ACTIONS_PATTERN,
      validate: PostNewAgentActionRequestSchema,
      fleetAuthz: {
        fleet: { all: true },
      },
    },
    postNewAgentActionHandlerBuilder({
      getAgent: AgentService.getAgentById,
      cancelAgentAction: AgentService.cancelAgentAction,
      createAgentAction: AgentService.createAgentAction,
    })
  );

  router.post(
    {
      path: AGENT_API_ROUTES.CANCEL_ACTIONS_PATTERN,
      validate: PostCancelActionRequestSchema,
      fleetAuthz: {
        fleet: { all: true },
      },
    },
    postCancelActionHandlerBuilder({
      getAgent: AgentService.getAgentById,
      cancelAgentAction: AgentService.cancelAgentAction,
      createAgentAction: AgentService.createAgentAction,
    })
  );

  router.post(
    {
      path: AGENT_API_ROUTES.UNENROLL_PATTERN,
      validate: PostAgentUnenrollRequestSchema,
      fleetAuthz: {
        fleet: { all: true },
      },
    },
    postAgentUnenrollHandler
  );

  router.put(
    {
      path: AGENT_API_ROUTES.REASSIGN_PATTERN,
      validate: PutAgentReassignRequestSchema,
      fleetAuthz: {
        fleet: { all: true },
      },
    },
    putAgentsReassignHandler
  );

  // Get agent status for policy
  router.get(
    {
      path: AGENT_API_ROUTES.STATUS_PATTERN,
      validate: GetAgentStatusRequestSchema,
      fleetAuthz: {
        fleet: { all: true },
      },
    },
    getAgentStatusForAgentPolicyHandler
  );
  router.get(
    {
      path: AGENT_API_ROUTES.STATUS_PATTERN_DEPRECATED,
      validate: GetAgentStatusRequestSchema,
      fleetAuthz: {
        fleet: { all: true },
      },
    },
    getAgentStatusForAgentPolicyHandler
  );
  // Agent data
  router.get(
    {
      path: AGENT_API_ROUTES.DATA_PATTERN,
      validate: GetAgentDataRequestSchema,
      fleetAuthz: {
        fleet: { all: true },
      },
    },
    getAgentDataHandler
  );

  // upgrade agent
  router.post(
    {
      path: AGENT_API_ROUTES.UPGRADE_PATTERN,
      validate: PostAgentUpgradeRequestSchema,
      fleetAuthz: {
        fleet: { all: true },
      },
    },
    postAgentUpgradeHandler
  );
  // bulk upgrade
  router.post(
    {
      path: AGENT_API_ROUTES.BULK_UPGRADE_PATTERN,
      validate: PostBulkAgentUpgradeRequestSchema,
      fleetAuthz: {
        fleet: { all: true },
      },
    },
    postBulkAgentsUpgradeHandler
  );
  // Current upgrades
  router.get(
    {
      path: AGENT_API_ROUTES.CURRENT_UPGRADES_PATTERN,
      validate: false,
      fleetAuthz: {
        fleet: { all: true },
      },
    },
    getCurrentUpgradesHandler
  );

  // Bulk reassign
  router.post(
    {
      path: AGENT_API_ROUTES.BULK_REASSIGN_PATTERN,
      validate: PostBulkAgentReassignRequestSchema,
      fleetAuthz: {
        fleet: { all: true },
      },
    },
    postBulkAgentsReassignHandler
  );

  // Bulk unenroll
  router.post(
    {
      path: AGENT_API_ROUTES.BULK_UNENROLL_PATTERN,
      validate: PostBulkAgentUnenrollRequestSchema,
      fleetAuthz: {
        fleet: { all: true },
      },
    },
    postBulkAgentsUnenrollHandler
  );
};
