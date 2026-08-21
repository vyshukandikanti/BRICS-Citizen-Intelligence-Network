export async function exportDashboardToPDF(elementId: string = "dashboard-content") {
  // Dynamically import html2canvas and jspdf
  const html2canvas = (await import("html2canvas")).default;
  const jsPDF = (await import("jspdf")).default;

  const element = document.getElementById(elementId);
  if (!element) {
    console.error("Dashboard element not found");
    return;
  }

  // Create PDF
  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Add header
  pdf.setFillColor(11, 31, 51); // Navy
  pdf.rect(0, 0, pageWidth, 30, "F");
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(16);
  pdf.text("BRICS Citizen Intelligence Network", 15, 15);
  pdf.setFontSize(10);
  pdf.text("Infrastructure Intelligence Report", 15, 22);
  pdf.setFontSize(8);
  pdf.text(`Generated: ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}`, pageWidth - 15, 22, { align: "right" });

  // Capture dashboard content
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: "#F7F8FA",
  });

  const imgData = canvas.toDataURL("image/jpeg", 0.85);
  const imgWidth = pageWidth - 20;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let y = 35;
  const availableHeight = pageHeight - 40;

  if (imgHeight <= availableHeight) {
    pdf.addImage(imgData, "JPEG", 10, y, imgWidth, imgHeight);
  } else {
    // Split across pages
    let remainingHeight = imgHeight;
    let srcY = 0;

    while (remainingHeight > 0) {
      const sliceHeight = Math.min(availableHeight, remainingHeight);
      const sliceRatio = sliceHeight / imgHeight;
      const sliceCanvas = document.createElement("canvas");
      sliceCanvas.width = canvas.width;
      sliceCanvas.height = canvas.width * (sliceHeight / imgWidth);
      const sliceCtx = sliceCanvas.getContext("2d")!;
      sliceCtx.drawImage(
        canvas,
        0,
        srcY,
        canvas.width,
        sliceCanvas.height,
        0,
        0,
        canvas.width,
        sliceCanvas.height
      );

      const sliceData = sliceCanvas.toDataURL("image/jpeg", 0.85);
      pdf.addImage(sliceData, "JPEG", 10, y, imgWidth, sliceHeight);

      remainingHeight -= sliceHeight;
      srcY += sliceCanvas.height;

      if (remainingHeight > 0) {
        pdf.addPage();
        y = 10;
      }
    }
  }

  // Add footer
  const totalPages = pdf.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    pdf.setFillColor(11, 31, 51);
    pdf.rect(0, pageHeight - 10, pageWidth, 10, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(7);
    pdf.text(
      `© 2026 BRICS Citizen Intelligence Network | Page ${i} of ${totalPages} | CONFIDENTIAL - Government Use Only`,
      pageWidth / 2,
      pageHeight - 4,
      { align: "center" }
    );
  }

  pdf.save(`BCIN-Infrastructure-Report-${new Date().toISOString().split("T")[0]}.pdf`);
}
