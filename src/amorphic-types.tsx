import React, { FC } from 'react';
import { FormEvent } from 'react-dom/node_modules/@types/react';
import { SQLQuery } from '@grafana/aws-sdk';
import {
  DataSourceSettings,
  DataSourceJsonData,
  SelectableValue,
  DataSourcePluginOptionsEditorProps,
} from '@grafana/data';
import { InputActionMeta } from '@grafana/ui';

// import { DataSourceJsonData, DataSourceSettings, DataSourcePluginOptionsEditorProps, SelectableValue, DataQuery, DataSourceApi, QueryEditorProps, ScopedVars } from '@grafana/data';

interface AwsAuthDataSourceSecureJsonData {
  accessKey?: string;
  secretKey?: string;
  sessionToken?: string;
}

export declare enum AwsAuthType {
  Keys = 'keys',
  Credentials = 'credentials',
  Default = 'default',
  EC2IAMRole = 'ec2_iam_role',
  /**
   * @deprecated use default
   */
  ARN = "arn"
}

interface AwsAuthDataSourceJsonData extends DataSourceJsonData {
  authType?: AwsAuthType;
  assumeRoleArn?: string;
  externalId?: string;
  profile?: string;
  defaultRegion?: string;
  endpoint?: string;
}

export interface ConfigSelectProps
  extends DataSourcePluginOptionsEditorProps<AwsAuthDataSourceJsonData, AwsAuthDataSourceSecureJsonData> {
  value: string;
  fetch: () => Promise<Array<string | SelectableValue<string>>>;
  onChange: (e: SelectableValue<string> | null) => void;
  dependencies?: string[];
  label?: string;
  'data-testid'?: string;
  hidden?: boolean;
  disabled?: boolean;
  allowCustomValue?: boolean;
  saveOptions: () => Promise<void>;
  autoFocus?: boolean;
  backspaceRemovesValue?: boolean;
  className?: string;
  invalid?: boolean;
  isClearable?: boolean;
  isMulti?: boolean;
  inputId?: string;
  showAllSelectedWhenOpen?: boolean;
  maxMenuHeight?: number;
  minMenuHeight?: number;
  maxVisibleValues?: number;
  menuPlacement?: 'auto' | 'bottom' | 'top';
  menuPosition?: 'fixed' | 'absolute';
  noOptionsMessage?: string;
  onBlur?: () => void;
  onCreateOption?: (value: string) => void;
  onInputChange?: (value: string, actionMeta: InputActionMeta) => void;
  placeholder?: string;
  width?: number;
  isOptionDisabled?: () => boolean;
  labelWidth?: number;
}

export declare function ConfigSelect(props: ConfigSelectProps): JSX.Element;

interface AwsAuthDataSourceSecureJsonData {
  accessKey?: string;
  secretKey?: string;
  sessionToken?: string;
}
declare type AwsAuthDataSourceSettings = DataSourceSettings<AwsAuthDataSourceJsonData, AwsAuthDataSourceSecureJsonData>;

interface InlineInputProps extends DataSourcePluginOptionsEditorProps<{}, AwsAuthDataSourceSecureJsonData> {
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
declare function InlineInput(props: InlineInputProps): JSX.Element;

declare const DEFAULT_LABEL_WIDTH = 28;

interface ConnectionConfigProps<
  J extends AwsAuthDataSourceJsonData = AwsAuthDataSourceJsonData,
  S = AwsAuthDataSourceSecureJsonData
> extends DataSourcePluginOptionsEditorProps<J, S> {
  standardRegions?: string[];
  loadRegions?: () => Promise<string[]>;
  defaultEndpoint?: string;
  skipHeader?: boolean;
  skipEndpoint?: boolean;
  children?: React.ReactNode;
  labelWidth?: number;
}
declare const ConnectionConfig: FC<ConnectionConfigProps>;
declare const SIGV4ConnectionConfig: React.FC<DataSourcePluginOptionsEditorProps<any, any>>;

enum FormatOptions {
  TimeSeries,
  Table,
  Logs,
}

const SelectableFormatOptions: Array<SelectableValue<FormatOptions>> = [
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

const defaultKey = '__default';

const DEFAULT_RESULT_REUSE_ENABLED = false;
const DEFAULT_RESULT_REUSE_MAX_AGE_IN_MINUTES = 60;

const defaultQuery: Partial<AthenaQuery> = {
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
interface AthenaDataSourceOptions extends AwsAuthDataSourceJsonData {
  catalog?: string;
  database?: string;
  workgroup?: string;
  outputLocation?: string;
}

/**
 * Values that are used in the backend, but never sent over HTTP to the frontend
 */
interface AthenaDataSourceSecureJsonData extends AwsAuthDataSourceSecureJsonData {}
type AthenaDataSourceSettings = DataSourceSettings<AthenaDataSourceOptions, AthenaDataSourceSecureJsonData>;
export {
  AthenaDataSourceOptions,
  AthenaDataSourceSecureJsonData,
  AthenaDataSourceSettings,
  // AthenaQuery,
  AwsAuthDataSourceJsonData,
  AwsAuthDataSourceSecureJsonData,
  AwsAuthDataSourceSettings,
  ConnectionConfig,
  ConnectionConfigProps,
  DEFAULT_LABEL_WIDTH,
  DEFAULT_RESULT_REUSE_ENABLED,
  DEFAULT_RESULT_REUSE_MAX_AGE_IN_MINUTES,
  defaultKey,
  defaultQuery,
  FormatOptions,
  InlineInput,
  SelectableFormatOptions,
  SIGV4ConnectionConfig,
};