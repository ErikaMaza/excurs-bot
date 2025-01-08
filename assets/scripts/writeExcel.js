import XLSX from 'xlsx'

export async function writeExcel(data){
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data")

    XLSX.writeFileAsync(workbook, `${Date.now()}_${data.name}`)
}