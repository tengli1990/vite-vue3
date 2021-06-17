<template>
  <div>
    <div class="row" @drop="_drop" @dragenter="_suppress" @dragover="_suppress">
      <label for="file">Spreadsheet</label>
      <input type="file" class="form-control" id="file" :accept="SheetJSFT" @change="_change" />
    </div>
    <div class="row">
      <a-button :disabled="dataSource.length ? false : true" class="btn btn-success" @click="onExportBtn()">Export</a-button>
      <a-table :columns="columns" :data-source="dataSource" :scroll="{ x: 1500, y: 300 }"></a-table>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import XLSX from 'xlsx'
  const _SheetJSFT = ['xlsx', 'xlsb', 'xlsm', 'xls', 'xml', 'csv', 'txt', 'ods', 'fods', 'uos', 'sylk', 'dif', 'dbf', 'prn', 'qpw', '123', 'wb*', 'wq*', 'html', 'htm']
    .map(function (x) {
      return '.' + x
    })
    .join(',')

  const columns = [
    { title: 'Full Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
    { title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
    { title: 'Column 1', dataIndex: 'address', key: '1', width: 150 },
    { title: 'Column 2', dataIndex: 'address', key: '2', width: 150 },
    { title: 'Column 3', dataIndex: 'address', key: '3', width: 150 },
    { title: 'Column 4', dataIndex: 'address', key: '4', width: 150 },
    { title: 'Column 5', dataIndex: 'address', key: '5', width: 150 },
    { title: 'Column 6', dataIndex: 'address', key: '6', width: 150 },
    { title: 'Column 7', dataIndex: 'address', key: '7', width: 150 },
    { title: 'Column 8', dataIndex: 'address', key: '8' }
  ]
  interface DataItem {
    key: number;
    name: string;
    age: number;
    address: string;
  }

  const data: DataItem[] = []
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `Edrward ${i}`,
      age: 32,
      address: `London Park no. ${i}`
    })
  }
  export default defineComponent({
    setup () {
      return {
        columns: columns,
        dataSource: data,
        SheetJSFT: _SheetJSFT
      }
    },
    created () {
      // 获取thead 数据
      // console.log(this.getTheadList(this.columns));
    },
    methods: {
      _suppress (evt: any) {
        evt.stopPropagation()
        evt.preventDefault()
      },
      onExportBtn () {
        const thead: string[] = this.columns.map((item) => {
          return item.title
        })

        const tbody: any[] = this.dataSource.map((item: any) => {
          return this.columns.map(({ dataIndex }: any) => {
            return item[dataIndex]
          })
        })
        this._export({
          exportData: [thead, ...tbody]
        })
      },
      _export ({ exportData, name = 'sheet' }: any) {
        const ws = XLSX.utils.aoa_to_sheet(exportData)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, name)
        XLSX.writeFile(wb, 'sheetjs.xlsx')
      },
      _drop (evt: any) {
        evt.stopPropagation()
        evt.preventDefault()
        const files = evt.dataTransfer.files
        if (files && files[0]) this._file(files[0])
      },
      _change (evt: any) {
        const files = evt.target.files
        if (files && files[0]) this._file(files[0])
      },
      _file (file: File) {
        /* Boilerplate to set up FileReader */
        const reader = new FileReader()
        reader.onload = (e: any) => {
          /* Parse data */
          const bstr = e.target.result
          const wb = XLSX.read(bstr, { type: 'binary' })
          /* Get first worksheet */
          const wsname = wb.SheetNames[0]
          const ws = wb.Sheets[wsname]
          /* Convert array of arrays */
          const data = XLSX.utils.sheet_to_json(ws, { header: 1 })
          console.log('展示data', data)
          /* Update state */
          // this.data = data;
          // this.cols = make_cols(ws['!ref']);
        }
        reader.readAsBinaryString(file)
      }
    }
  })
</script>

<style scoped></style>
