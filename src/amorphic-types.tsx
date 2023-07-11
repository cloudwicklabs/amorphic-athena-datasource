import { SQLQuery } from './amorphic-aws-sdk';

import { InlineField, Input } from '@grafana/ui';
import { AwsAuthDataSourceJsonData, AwsAuthDataSourceSecureJsonData } from './amorphic-aws-sdk';

import React, { FC } from 'react';
import { DataSourceSettings, DataSourcePluginOptionsEditorProps, SelectableValue } from '@grafana/data';
import { FormEvent } from 'react-dom/node_modules/@types/react';

export interface InlineInputProps extends DataSourcePluginOptionsEditorProps<{}, AwsAuthDataSourceSecureJsonData> {
  value: string;
  onChange: (e: FormEvent<HTMLInputElement>) => void;
  label?: string;
  tooltip?: string;
  placeholder?: string;
  'data-testid'?: string;
  hidden?: boolean;
  disabled?: boolean;
  labelWidth?: number;
}

export function InlineInput(props: InlineInputProps) {
  return (
    <InlineField
      label={props.label}
      labelWidth={props.labelWidth ?? DEFAULT_LABEL_WIDTH}
      tooltip={props.tooltip}
      hidden={props.hidden}
      disabled={props.disabled}
    >
      <Input
        data-testid={props['data-testid']}
        className="width-30"
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        disabled={props.disabled}
      />
    </InlineField>
  );
}

declare const DEFAULT_LABEL_WIDTH = 28;

export enum FormatOptions {
  TimeSeries,
  Table,
  Logs,
}

export const SelectableFormatOptions: Array<SelectableValue<FormatOptions>> = [
  {
    label: 'Time Series',
    value: FormatOptions.TimeSeries,
  },
  {
    label: 'Table',
    value: FormatOptions.Table,
  },
  {
    label: 'Logs',
    value: FormatOptions.Logs,
  },
];

export interface AthenaQuery extends SQLQuery {
  format: FormatOptions;
  connectionArgs: {
    region?: string;
    catalog?: string;
    database?: string;
    resultReuseEnabled?: boolean;
    resultReuseMaxAgeInMinutes?: number;
  };
  table?: string;
  column?: string;

  queryID?: string;
}

export const defaultKey = '__default';

export const DEFAULT_RESULT_REUSE_ENABLED = false;
export const DEFAULT_RESULT_REUSE_MAX_AGE_IN_MINUTES = 60;

export const defaultQuery: Partial<AthenaQuery> = {
  format: FormatOptions.Table,
  rawSQL: '',
  connectionArgs: {
    region: defaultKey,
    catalog: defaultKey,
    database: defaultKey,
    resultReuseEnabled: DEFAULT_RESULT_REUSE_ENABLED,
    resultReuseMaxAgeInMinutes: DEFAULT_RESULT_REUSE_MAX_AGE_IN_MINUTES,
  },
};

/**
 * These are options configured for each DataSource instance
 */
export interface AthenaDataSourceOptions extends AwsAuthDataSourceJsonData {
  catalog?: string;
  database?: string;
  workgroup?: string;
  outputLocation?: string;
}

/**
 * Values that are used in the backend, but never sent over HTTP to the frontend
 */
export interface AthenaDataSourceSecureJsonData extends AwsAuthDataSourceSecureJsonData {}
export type AthenaDataSourceSettings = DataSourceSettings<AthenaDataSourceOptions, AthenaDataSourceSecureJsonData>;
