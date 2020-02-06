import XLSX from 'xlsx'

export default function file2Xce(file) {
  return new Promise(((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const data = e.target.result
      const excelData = XLSX.read(data, {
        type: 'binary',
      })
      const result = []
      excelData.SheetNames.forEach((sheetName) => {
        result.push({
          sheetName,
          sheet: XLSX.utils.sheet_to_json(excelData.Sheets[sheetName]),
        })
      })
      resolve(result)
    }
    reader.readAsBinaryString(file.raw)
  }))
}
