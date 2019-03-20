import { GridApi, ColumnApi } from 'ag-grid-community';

export interface GridEvent {
	api: GridApi;
	columnApi: ColumnApi;
	type: string;
}
