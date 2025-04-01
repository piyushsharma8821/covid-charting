export async function run() {
  let data: [string, number][] = [];

  try {
    const response = await fetch("https://raw.githubusercontent.com/piyushsharma8821/covid-charting/main/covid_india.csv");
    const csvText = await response.text();

    const rows = csvText.trim().split("\n").slice(1); 
    data = rows.map(row => {
      const [date, cases] = row.split(",");
      return [date, parseFloat(cases)];
    });
  } catch (fetchError) {
    console.error("Failed to fetch CSV:", fetchError);
    return;
  }

  try {
    await Excel.run(async (context) => {
      const sheet = context.workbook.worksheets.getActiveWorksheet();
      //sheet.activate();

      const fullData = [["Date", "New Cases"], ...data];
      const range = sheet.getRange("A1:B" + fullData.length);
      range.values = fullData;

      const chart = sheet.charts.add("Line", range, "Auto");
      chart.setPosition("D2", "M20");
      chart.title.text = "COVID-19 Daily New Cases (India)";
    });
  } catch (excelError) {
    console.error("Excel run failed:", excelError);
  }
}

Office.onReady((info) => {
  if (info.host === Office.HostType.Excel) {
    run().catch(console.error);
  }
});
