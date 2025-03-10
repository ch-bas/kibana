/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { i18n } from '@kbn/i18n';
import { withTheme } from '@kbn/kibana-react-plugin/common';
import type { LayoutPropsWithTheme } from '../../../../public/pages/metrics/metric_detail/types';
// eslint-disable-next-line @kbn/imports/no_boundary_crossing
import { Section } from '../../../../public/pages/metrics/metric_detail/components/section';
// eslint-disable-next-line @kbn/imports/no_boundary_crossing
import { SubSection } from '../../../../public/pages/metrics/metric_detail/components/sub_section';
// eslint-disable-next-line @kbn/imports/no_boundary_crossing
import { GaugesSectionVis } from '../../../../public/pages/metrics/metric_detail/components/gauges_section_vis';
// eslint-disable-next-line @kbn/imports/no_boundary_crossing
import { ChartSectionVis } from '../../../../public/pages/metrics/metric_detail/components/chart_section_vis';

export const Layout = withTheme(({ metrics, onChangeRangeTime, theme }: LayoutPropsWithTheme) => (
  <React.Fragment>
    <Section
      navLabel="AWS"
      sectionLabel={i18n.translate(
        'xpack.infra.metricDetailPage.awsMetricsLayout.overviewSection.sectionLabel',
        {
          defaultMessage: 'AWS Overview',
        }
      )}
      metrics={metrics}
      onChangeRangeTime={onChangeRangeTime}
    >
      <SubSection id="awsOverview">
        <GaugesSectionVis
          seriesOverrides={{
            'cpu-util': {
              name: i18n.translate(
                'xpack.infra.metricDetailPage.awsMetricsLayout.overviewSection.cpuUtilizationSeriesLabel',
                {
                  defaultMessage: 'CPU Utilization',
                }
              ),
              color: theme.eui.euiColorFullShade,
              formatter: 'percent',
              gaugeMax: 1,
            },
            'status-check-failed': {
              name: i18n.translate(
                'xpack.infra.metricDetailPage.awsMetricsLayout.overviewSection.statusCheckFailedLabel',
                {
                  defaultMessage: 'Status check failed',
                }
              ),
              color: theme.eui.euiColorFullShade,
            },
            'packets-in': {
              name: i18n.translate(
                'xpack.infra.metricDetailPage.awsMetricsLayout.overviewSection.networkPacketsInLabel',
                {
                  defaultMessage: 'Packets (in)',
                }
              ),
              color: theme.eui.euiColorFullShade,
              formatter: 'number',
            },
            'packets-out': {
              name: i18n.translate(
                'xpack.infra.metricDetailPage.awsMetricsLayout.overviewSection.networkPacketsOutLabel',
                {
                  defaultMessage: 'Packets (out)',
                }
              ),
              color: theme.eui.euiColorFullShade,
              formatter: 'number',
            },
          }}
        />
      </SubSection>
      <SubSection
        id="awsCpuUtilization"
        label={i18n.translate(
          'xpack.infra.metricDetailPage.awsMetricsLayout.cpuUtilSection.sectionLabel',
          {
            defaultMessage: 'CPU Utilization',
          }
        )}
      >
        <ChartSectionVis
          type="area"
          formatter="number"
          seriesOverrides={{
            'cpu-util': {
              color: theme.eui.euiColorVis1,
              name: i18n.translate(
                'xpack.infra.metricDetailPage.awsMetricsLayout.cpuUtilSection.percentSeriesLabel',
                {
                  defaultMessage: 'percent',
                }
              ),
            },
          }}
        />
      </SubSection>
      <SubSection
        id="awsNetworkBytes"
        label={i18n.translate(
          'xpack.infra.metricDetailPage.awsMetricsLayout.networkBytesSection.sectionLabel',
          {
            defaultMessage: 'Network Traffic',
          }
        )}
      >
        <ChartSectionVis
          type="area"
          formatter="bits"
          formatterTemplate="{{value}}/s"
          seriesOverrides={{
            tx: {
              color: theme.eui.euiColorVis1,
              name: i18n.translate(
                'xpack.infra.metricDetailPage.awsMetricsLayout.networkBytesSection.txSeriesLabel',
                {
                  defaultMessage: 'out',
                }
              ),
            },
            rx: {
              color: theme.eui.euiColorVis2,
              name: i18n.translate(
                'xpack.infra.metricDetailPage.awsMetricsLayout.networkBytesSection.rxSeriesLabel',
                {
                  defaultMessage: 'in',
                }
              ),
            },
          }}
        />
      </SubSection>
      <SubSection
        id="awsNetworkPackets"
        label={i18n.translate(
          'xpack.infra.metricDetailPage.awsMetricsLayout.networkPacketsSection.sectionLabel',
          {
            defaultMessage: 'Network Packets (Average)',
          }
        )}
      >
        <ChartSectionVis
          type="area"
          formatter="number"
          seriesOverrides={{
            'packets-out': {
              color: theme.eui.euiColorVis1,
              name: i18n.translate(
                'xpack.infra.metricDetailPage.awsMetricsLayout.networkPacketsSection.packetsOutSeriesLabel',
                {
                  defaultMessage: 'out',
                }
              ),
            },
            'packets-in': {
              color: theme.eui.euiColorVis2,
              name: i18n.translate(
                'xpack.infra.metricDetailPage.awsMetricsLayout.networkPacketsSection.packetsInSeriesLabel',
                {
                  defaultMessage: 'in',
                }
              ),
            },
          }}
        />
      </SubSection>
      <SubSection
        id="awsDiskioOps"
        label={i18n.translate(
          'xpack.infra.metricDetailPage.awsMetricsLayout.diskioOperationsSection.sectionLabel',
          {
            defaultMessage: 'Disk I/O Operations',
          }
        )}
      >
        <ChartSectionVis
          type="area"
          formatter="number"
          seriesOverrides={{
            writes: {
              color: theme.eui.euiColorVis1,
              name: i18n.translate(
                'xpack.infra.metricDetailPage.awsMetricsLayout.diskioOperationsSection.writesSeriesLabel',
                {
                  defaultMessage: 'writes',
                }
              ),
            },
            reads: {
              color: theme.eui.euiColorVis2,
              name: i18n.translate(
                'xpack.infra.metricDetailPage.awsMetricsLayout.diskioOperationsSection.readsSeriesLabel',
                {
                  defaultMessage: 'reads',
                }
              ),
            },
          }}
        />
      </SubSection>
      <SubSection
        id="awsDiskioBytes"
        label={i18n.translate(
          'xpack.infra.metricDetailPage.awsMetricsLayout.diskioBytesSection.sectionLabel',
          {
            defaultMessage: 'Disk I/O Bytes',
          }
        )}
      >
        <ChartSectionVis
          type="area"
          formatter="number"
          seriesOverrides={{
            writes: {
              color: theme.eui.euiColorVis1,
              name: i18n.translate(
                'xpack.infra.metricDetailPage.awsMetricsLayout.diskioBytesSection.writesSeriesLabel',
                {
                  defaultMessage: 'writes',
                }
              ),
            },
            reads: {
              color: theme.eui.euiColorVis2,
              name: i18n.translate(
                'xpack.infra.metricDetailPage.awsMetricsLayout.diskioBytesSection.readsSeriesLabel',
                {
                  defaultMessage: 'reads',
                }
              ),
            },
          }}
        />
      </SubSection>
    </Section>
  </React.Fragment>
));
