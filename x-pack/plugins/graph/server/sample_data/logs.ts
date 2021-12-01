/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { i18n } from '@kbn/i18n';
import { SampleDataRegistrySetup } from '../../../../../src/plugins/home/server';
import { APP_ICON, createWorkspacePath } from '../../common/constants';

const datasetId = 'logs';

const wsState: any = {
  selectedFields: [
    {
      name: 'agent.keyword',
      hopSize: 5,
      lastValidHopSize: 5,
      color: '#CE0060',
      selected: true,
      iconClass: 'fa-key',
    },
    {
      name: 'extension.keyword',
      hopSize: 5,
      lastValidHopSize: 5,
      color: '#B0916F',
      selected: true,
      iconClass: 'fa-key',
    },
    {
      name: 'geo.src',
      hopSize: 5,
      lastValidHopSize: 5,
      color: '#1EA593',
      selected: true,
      iconClass: 'fa-map-marker',
    },
    {
      name: 'response.keyword',
      hopSize: 5,
      lastValidHopSize: 5,
      color: '#7B000B',
      selected: true,
      iconClass: 'fa-key',
    },
  ],
  blocklist: [
    {
      x: 349.9814471314239,
      y: 274.1259761174194,
      label: '200',
      color: '#7B000B',
      field: 'response.keyword',
      term: '200',
      parent: null,
      size: 15,
    },
    {
      x: 264.83032783224775,
      y: 149.28911778947068,
      label: '404',
      color: '#7B000B',
      field: 'response.keyword',
      term: '404',
      parent: null,
      size: 15,
    },
  ],
  vertices: [
    {
      x: 705.0456564066692,
      y: 40.62170801995693,
      label: 'US',
      color: '#1EA593',
      field: 'geo.src',
      term: 'US',
      parent: null,
      size: 15,
    },
    {
      x: 403.9630841139531,
      y: 343.70678387260784,
      label: 'rpm',
      color: '#B0916F',
      field: 'extension.keyword',
      term: 'rpm',
      parent: null,
      size: 15,
    },
    {
      x: 725.3403430314892,
      y: 531.7559897276761,
      label: 'NG',
      color: '#1EA593',
      field: 'geo.src',
      term: 'NG',
      parent: null,
      size: 15,
    },
    {
      x: 226.82596303052026,
      y: 412.0884666842448,
      label: 'Mozilla/5.0 (X11; Linux x86_64; rv:6.0a1) Gecko/20110421 Firefox/6.0a1',
      color: '#CE0060',
      field: 'agent.keyword',
      term: 'Mozilla/5.0 (X11; Linux x86_64; rv:6.0a1) Gecko/20110421 Firefox/6.0a1',
      parent: null,
      size: 15,
    },
    {
      x: 292.5918164195066,
      y: 268.48941070600534,
      label: 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.1.4322)',
      color: '#CE0060',
      field: 'agent.keyword',
      term: 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.1.4322)',
      parent: null,
      size: 15,
    },
    {
      x: 778.0887942801058,
      y: 182.63288692820015,
      label: 'LK',
      color: '#1EA593',
      field: 'geo.src',
      term: 'LK',
      parent: null,
      size: 15,
    },
    {
      x: 341.01411891217134,
      y: 416.2991570121247,
      label: 'CN',
      color: '#1EA593',
      field: 'geo.src',
      term: 'CN',
      parent: null,
      size: 15,
    },
    {
      x: 190.18900623537502,
      y: 474.94911053447447,
      label: 'deb',
      color: '#B0916F',
      field: 'extension.keyword',
      term: 'deb',
      parent: null,
      size: 15,
    },
    {
      x: 232.7845499845522,
      y: 292.79169517403824,
      label: 'zip',
      color: '#B0916F',
      field: 'extension.keyword',
      term: 'zip',
      parent: null,
      size: 15,
    },
    {
      x: 138.90354356936942,
      y: 439.57743024730985,
      label: 'gz',
      color: '#B0916F',
      field: 'extension.keyword',
      term: 'gz',
      parent: null,
      size: 15,
    },
    {
      x: 365.6408169826396,
      y: 249.99925380062638,
      label:
        'Mozilla/5.0 (X11; Linux i686) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/11.0.696.50 Safari/534.24',
      color: '#CE0060',
      field: 'agent.keyword',
      term: 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/11.0.696.50 Safari/534.24',
      parent: null,
      size: 15,
    },
    {
      x: 265.07380044771776,
      y: 329.42267335684767,
      label: 'css',
      color: '#B0916F',
      field: 'extension.keyword',
      term: 'css',
      parent: null,
      size: 15,
    },
    {
      x: 580.3896044080259,
      y: 667.66318599786,
      label: 'ET',
      color: '#1EA593',
      field: 'geo.src',
      term: 'ET',
      parent: null,
      size: 15,
    },
    {
      x: 568.0601884734044,
      y: -49.27073508690644,
      label: 'ZW',
      color: '#1EA593',
      field: 'geo.src',
      term: 'ZW',
      parent: null,
      size: 15,
    },
    {
      x: 227.5383201433136,
      y: 199.48377517208598,
      label: '',
      color: '#B0916F',
      field: 'extension.keyword',
      term: '',
      parent: null,
      size: 15,
    },
    {
      x: 288.39123736592035,
      y: 393.4288970445101,
      label: 'GT',
      color: '#1EA593',
      field: 'geo.src',
      term: 'GT',
      parent: null,
      size: 15,
    },
    {
      x: 155.466542394056,
      y: 339.05104397852546,
      label: 'ES',
      color: '#1EA593',
      field: 'geo.src',
      term: 'ES',
      parent: null,
      size: 15,
    },
    {
      x: 401.32323264585983,
      y: -108.02214607103728,
      label: 'CO',
      color: '#1EA593',
      field: 'geo.src',
      term: 'CO',
      parent: null,
      size: 15,
    },
    {
      x: 792.1054319493805,
      y: 358.6366312643674,
      label: 'PA',
      color: '#1EA593',
      field: 'geo.src',
      term: 'PA',
      parent: null,
      size: 15,
    },
    {
      x: 314.32050042836784,
      y: 319.42284908520816,
      label: '503',
      color: '#7B000B',
      field: 'response.keyword',
      term: '503',
      parent: null,
      size: 15,
    },
    {
      x: 340.8606114563168,
      y: 186.9348337340475,
      label: 'IN',
      color: '#1EA593',
      field: 'geo.src',
      term: 'IN',
      parent: null,
      size: 15,
    },
    {
      x: 164.94735578931335,
      y: 303.33721636577303,
      label: 'SY',
      color: '#1EA593',
      field: 'geo.src',
      term: 'SY',
      parent: null,
      size: 15,
    },
    {
      x: 301.2853960233053,
      y: 435.9520992987688,
      label: 'MM',
      color: '#1EA593',
      field: 'geo.src',
      term: 'MM',
      parent: null,
      size: 15,
    },
    {
      x: 184.25271122815448,
      y: 64.76252387726619,
      label: 'BI',
      color: '#1EA593',
      field: 'geo.src',
      term: 'BI',
      parent: null,
      size: 15,
    },
    {
      x: 547.7017436962481,
      y: 363.41281417686463,
      label: 'JP',
      color: '#1EA593',
      field: 'geo.src',
      term: 'JP',
      parent: null,
      size: 15,
    },
    {
      x: 530.0067122142244,
      y: 267.5235740844544,
      label: 'IT',
      color: '#1EA593',
      field: 'geo.src',
      term: 'IT',
      parent: null,
      size: 15,
    },
    {
      x: 502.58809919406076,
      y: 453.01592357006285,
      label: 'YE',
      color: '#1EA593',
      field: 'geo.src',
      term: 'YE',
      parent: null,
      size: 15,
    },
  ],
  links: [
    { weight: 0.0040634810444444, width: 2, inferred: false, source: 8, target: 6 },
    { weight: 0.00001660379672906535, width: 2, inferred: false, source: 11, target: 3 },
    { weight: 0.00001687128485592423, width: 2, inferred: false, source: 1, target: 4 },
    { weight: 0.000042381532626601156, width: 2, inferred: false, source: 3, target: 7 },
    { weight: 0.0020092062171401465, width: 2, inferred: false, source: 6, target: 11 },
    { weight: 0.009186429989786131, width: 2, inferred: false, source: 6, target: 7 },
    { weight: 0.0000305247789830849, width: 2, inferred: false, source: 8, target: 4 },
    { weight: 0.000001708437364178419, width: 2, inferred: false, source: 11, target: 10 },
    { weight: 0.004598490556833276, width: 2, inferred: false, source: 1, target: 6 },
    { weight: 0.0000010807159115480025, width: 2, inferred: false, source: 3, target: 9 },
    { weight: 0.011760987925777693, width: 2, inferred: false, source: 6, target: 3 },
    { weight: 0.00000572246876958705, width: 2, inferred: false, source: 3, target: 8 },
    { weight: 0.00003799465167914097, width: 2, inferred: false, source: 1, target: 10 },
    { weight: 0.00019306796701208605, width: 2, inferred: false, source: 20, target: 10 },
    { weight: 0.001410620591413074, width: 2, inferred: false, source: 16, target: 19 },
    { weight: 0.00000260088891060836, width: 2, inferred: false, source: 16, target: 8 },
    { weight: 0.000004221034247288931, width: 2, inferred: false, source: 21, target: 9 },
    { weight: 0.0003983945660073508, width: 2, inferred: false, source: 19, target: 3 },
    { weight: 8.558271008580196e-7, width: 2, inferred: false, source: 14, target: 23 },
    { weight: 0.00002868576516354896, width: 2, inferred: false, source: 14, target: 10 },
    { weight: 0.0000016586853264248163, width: 2, inferred: false, source: 21, target: 4 },
    { weight: 5.648882390462957e-7, width: 2, inferred: false, source: 21, target: 14 },
    { weight: 0.00003419153715339904, width: 2, inferred: false, source: 19, target: 4 },
    { weight: 0.0005988902747672857, width: 2, inferred: false, source: 8, target: 19 },
    { weight: 0.000993973548776136, width: 2, inferred: false, source: 19, target: 1 },
    { weight: 3.835478702669183e-7, width: 2, inferred: false, source: 20, target: 1 },
    { weight: 0.00000739937347045766, width: 2, inferred: false, source: 16, target: 3 },
    { weight: 0.0014120620624644335, width: 2, inferred: false, source: 21, target: 19 },
    { weight: 0.00011448660448075209, width: 2, inferred: false, source: 20, target: 14 },
    { weight: 0.000029650891466752718, width: 2, inferred: false, source: 10, target: 19 },
    { weight: 0.0016870823187632464, width: 2, inferred: false, source: 19, target: 15 },
    { weight: 0.000008712259181870499, width: 2, inferred: false, source: 8, target: 20 },
    { weight: 0.0006524448834525575, width: 2, inferred: false, source: 19, target: 6 },
    { weight: 0.000003916666394077713, width: 2, inferred: false, source: 8, target: 10 },
    { weight: 0.0000018561676077277568, width: 2, inferred: false, source: 16, target: 9 },
    { weight: 0.000006461917090181791, width: 2, inferred: false, source: 20, target: 19 },
    { weight: 0.000813581545225818, width: 2, inferred: false, source: 19, target: 22 },
    { weight: 0.0000790962811304827, width: 2, inferred: false, source: 14, target: 19 },
    { weight: 0.0000038232332387185065, width: 2, inferred: false, source: 8, target: 15 },
    { weight: 1.3666472391330093e-8, width: 2, inferred: false, source: 4, target: 22 },
    { weight: 6.868214506521744e-7, width: 2, inferred: false, source: 15, target: 7 },
    { weight: 0.000005170326226968777, width: 2, inferred: false, source: 22, target: 1 },
    { weight: 0.000018344494132865016, width: 2, inferred: false, source: 3, target: 22 },
    { weight: 0.000020468166046825227, width: 2, inferred: false, source: 3, target: 1 },
    { weight: 0.0000020332506548392678, width: 2, inferred: false, source: 21, target: 11 },
    { weight: 0.0000019831315870577016, width: 2, inferred: false, source: 21, target: 7 },
    { weight: 3.630137259008554e-7, width: 2, inferred: false, source: 22, target: 9 },
    { weight: 0.000003238006460439622, width: 2, inferred: false, source: 4, target: 15 },
    { weight: 0.0000010228580484196547, width: 2, inferred: false, source: 4, target: 6 },
    { weight: 7.524068083846899e-7, width: 2, inferred: false, source: 1, target: 24 },
    { weight: 0.00000647545523418574, width: 2, inferred: false, source: 22, target: 8 },
    { weight: 0.000005887870505895788, width: 2, inferred: false, source: 15, target: 10 },
    { weight: 8.428178658580805e-7, width: 2, inferred: false, source: 16, target: 14 },
    { weight: 4.0006658216459443e-7, width: 2, inferred: false, source: 1, target: 25 },
    { weight: 9.694642023468333e-7, width: 2, inferred: false, source: 1, target: 26 },
    { weight: 4.714506544331047e-7, width: 2, inferred: false, source: 3, target: 21 },
    { weight: 8.212604651861594e-7, width: 2, inferred: false, source: 16, target: 11 },
    { weight: 3.477810450648006e-7, width: 2, inferred: false, source: 16, target: 7 },
    { weight: 9.208171070957436e-8, width: 2, inferred: false, source: 3, target: 15 },
    { weight: 0.0000010905102327000433, width: 2, inferred: false, source: 4, target: 16 },
    { weight: 0.000014782307685187607, width: 2, inferred: false, source: 15, target: 9 },
  ],
  urlTemplates: [
    {
      url: '/app/discover#/?_a=(columns%3A!(_source)%2Cindex%3A%2790943e30-9a47-11e8-b64d-95841ca0b247%27%2Cinterval%3Aauto%2Cquery%3A(language%3Akuery%2Cquery%3A{{gquery}})%2Csort%3A!(_score%2Cdesc))',
      description: 'Raw documents',
      isDefault: true,
      encoderID: 'kql-loose',
    },
  ],
  exploreControls: {
    useSignificance: true,
    sampleSize: 2000,
    timeoutMillis: 5000,
    maxValuesPerDoc: 1,
    minDocCount: 3,
  },
};

export function registerLogsSampleData(sampleDataRegistry: SampleDataRegistrySetup) {
  sampleDataRegistry.addSavedObjectsToSampleDataset(datasetId, [
    {
      type: 'graph-workspace',
      id: 'e2141080-32fa-11ea-bbe4-818d9c786051',
      version: '2',
      attributes: {
        title: 'Kibana Sample Data - Data Logs',
        description:
          'This is a sample graph based on the data logs data view, which shows agents, extensions, source geography of the log, and response codes.  The graph has 200 and 404 response codes blocked, as they have low cardinality.',
        numLinks: 61,
        numVertices: 27,
        version: 1,
        wsState: JSON.stringify(JSON.stringify(wsState)),
        legacyIndexPatternRef: 'kibana_sample_data_logs',
      },
      references: [],
      migrationVersion: {
        'graph-workspace': '7.11.0',
      },
      updated_at: '2020-01-09T16:40:36.122Z',
    },
  ]);
}
export function registerLogsSampleDataLink(sampleDataRegistry: SampleDataRegistrySetup) {
  sampleDataRegistry.addAppLinksToSampleDataset(datasetId, [
    {
      sampleObject: {
        type: 'graph-workspace',
        id: 'e2141080-32fa-11ea-bbe4-818d9c786051',
      },
      getPath: createWorkspacePath,
      label: i18n.translate('xpack.graph.sampleData.label', { defaultMessage: 'Graph' }),
      icon: APP_ICON,
    },
  ]);
}
