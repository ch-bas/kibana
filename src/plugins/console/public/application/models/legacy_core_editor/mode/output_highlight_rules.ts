/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import ace from 'brace';
import 'brace/mode/json';
import { addXJsonToRules } from '@kbn/ace';

const JsonHighlightRules = ace.acequire('ace/mode/json_highlight_rules').JsonHighlightRules;

export const mapStatusCodeToBadge = (value: string) => {
  const regExpMatchArray = value.match(/\d+/);
  if (regExpMatchArray) {
    const status = parseInt(regExpMatchArray[0], 10);
    if (status <= 199) {
      return 'badge.badge--default';
    }
    if (status <= 299) {
      return 'badge.badge--success';
    }
    if (status <= 399) {
      return 'badge.badge--primary';
    }
    if (status <= 499) {
      return 'badge.badge--warning';
    }
    return 'badge.badge--danger';
  }
};

export class OutputJsonHighlightRules extends JsonHighlightRules {
  constructor() {
    super();
    this.$rules = {};
    addXJsonToRules(this, 'start');
    this.$rules.start.unshift(
      {
        token: 'warning',
        regex: '#!.*$',
      },
      {
        token: 'comment',
        regex: /#(.*?)(?=\d+\s(?:[\sA-Za-z]+)|$)/,
      },
      {
        token: mapStatusCodeToBadge,
        regex: /(\d+\s[\sA-Za-z]+$)/,
      }
    );

    if (this instanceof OutputJsonHighlightRules) {
      this.normalizeRules();
    }
  }
}
