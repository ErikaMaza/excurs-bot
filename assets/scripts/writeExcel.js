import XLSX from 'xlsx';

export async function writeExcel(data) {
    if (!Array.isArray(data)) {
        console.error("Ошибка: data должно быть массивом объектов.");
        return;
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    const fileName = `./assets/db/data.xlsx`;

    try {
        XLSX.writeFile(workbook, fileName);
        console.log("Файл сохранен в:", fileName);
    } catch (err) {
        console.error("Ошибка при записи файла:", err);
    }
}
