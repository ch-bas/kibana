/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/*
 * This file contains logic to build and diff the index mappings for a migration.
 */

import crypto from 'crypto';
import { cloneDeep, mapValues } from 'lodash';
import type { SavedObjectsMappingProperties } from '@kbn/core-saved-objects-server';
import { IndexMapping, SavedObjectsTypeMappingDefinitions } from '../../mappings';

/**
 * Creates an index mapping with the core properties required by saved object
 * indices, as well as the specified additional properties.
 *
 * @param typeDefinitions - the type definitions to build mapping from.
 */
export function buildActiveMappings(
  typeDefinitions: SavedObjectsTypeMappingDefinitions | SavedObjectsMappingProperties
): IndexMapping {
  const mapping = defaultMapping();

  const mergedProperties = validateAndMerge(mapping.properties, typeDefinitions);

  return cloneDeep({
    ...mapping,
    properties: mergedProperties,
    _meta: {
      migrationMappingPropertyHashes: md5Values(mergedProperties),
    },
  });
}

/**
 * Diffs the actual vs expected mappings. The properties are compared using md5 hashes stored in _meta, because
 * actual and expected mappings *can* differ, but if the md5 hashes stored in actual._meta.migrationMappingPropertyHashes
 * match our expectations, we don't require a migration. This allows ES to tack on additional mappings that Kibana
 * doesn't know about or expect, without triggering continual migrations.
 */
export function diffMappings(actual: IndexMapping, expected: IndexMapping) {
  if (actual.dynamic !== expected.dynamic) {
    return { changedProp: 'dynamic' };
  }

  if (!actual._meta || !actual._meta.migrationMappingPropertyHashes) {
    return { changedProp: '_meta' };
  }

  const changedProp = findChangedProp(
    actual._meta.migrationMappingPropertyHashes,
    expected._meta!.migrationMappingPropertyHashes
  );

  return changedProp ? { changedProp: `properties.${changedProp}` } : undefined;
}

// Convert an object to an md5 hash string, using a stable serialization (canonicalStringify)
function md5Object(obj: any) {
  return crypto.createHash('md5').update(canonicalStringify(obj)).digest('hex');
}

// JSON.stringify is non-canonical, meaning the same object may produce slightly
// different JSON, depending on compiler optimizations (e.g. object keys
// are not guaranteed to be sorted). This function consistently produces the same
// string, if passed an object of the same shape. If the outpuf of this function
// changes from one release to another, migrations will run, so it's important
// that this function remains stable across releases.
function canonicalStringify(obj: any): string {
  if (Array.isArray(obj)) {
    return `[${obj.map(canonicalStringify)}]`;
  }

  if (!obj || typeof obj !== 'object') {
    return JSON.stringify(obj);
  }

  const keys = Object.keys(obj);

  // This is important for properly handling Date
  if (!keys.length) {
    return JSON.stringify(obj);
  }

  const sortedObj = keys
    .sort((a, b) => a.localeCompare(b))
    .map((k) => `${k}: ${canonicalStringify(obj[k])}`);

  return `{${sortedObj}}`;
}

// Convert an object's values to md5 hash strings
function md5Values(obj: any) {
  return mapValues(obj, md5Object);
}

// If something exists in actual, but is missing in expected, we don't
// care, as it could be a disabled plugin, etc, and keeping stale stuff
// around is better than migrating unecessesarily.
function findChangedProp(actual: any, expected: any) {
  return Object.keys(expected).find((k) => actual[k] !== expected[k]);
}

/**
 * These mappings are required for any saved object index.
 *
 * @returns {IndexMapping}
 */
function defaultMapping(): IndexMapping {
  return {
    dynamic: 'strict',
    properties: {
      migrationVersion: {
        // Saved Objects can't redefine dynamic, but we cheat here to support migrations
        // @ts-expect-error
        dynamic: 'true',
        type: 'object',
      },
      type: {
        type: 'keyword',
      },
      namespace: {
        type: 'keyword',
      },
      namespaces: {
        type: 'keyword',
      },
      originId: {
        type: 'keyword',
      },
      updated_at: {
        type: 'date',
      },
      references: {
        type: 'nested',
        properties: {
          name: {
            type: 'keyword',
          },
          type: {
            type: 'keyword',
          },
          id: {
            type: 'keyword',
          },
        },
      },
      coreMigrationVersion: {
        type: 'keyword',
      },
    },
  };
}

function validateAndMerge(
  dest: SavedObjectsMappingProperties,
  source: SavedObjectsTypeMappingDefinitions | SavedObjectsMappingProperties
) {
  Object.keys(source).forEach((k) => {
    if (k.startsWith('_')) {
      throw new Error(`Invalid mapping "${k}". Mappings cannot start with _.`);
    }
    if (dest.hasOwnProperty(k)) {
      throw new Error(`Cannot redefine core mapping "${k}".`);
    }
  });

  return Object.assign(dest, source);
}
