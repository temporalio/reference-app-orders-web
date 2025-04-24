import type { Component } from "svelte";

type ComponentRef = {
  type: Component<any, any>;
  props: Record<string, any>;
};

export type TableColumns = {
  title: string;
  key: string;
  formatter?: (value: any, row: Record<string, any>) => string | ComponentRef;
}[];

export type TableData = {
  [key: string]: any;
}[];
