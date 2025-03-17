import axios from 'axios';

const downloadPDF = async (pdfUrl) => {
  try {
    // Ensure the protocol is lowercase
    const normalizedUrl = pdfUrl.replace(/^Https:\/\//i, 'https://');

    // API call to get the PDF file
    const response = await axios({
      url: normalizedUrl,
      method: 'GET',
      responseType: 'blob', // Ensures the response is a binary file (Blob)
    });

    // Create a blob URL for the PDF
    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);

    // Trigger download using a link
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Nissan-Almera-Black-Edition-2024-MY.pdf'); // File name for the download
    document.body.appendChild(link);
    link.click();

    // Clean up
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading the PDF:', error);
  }
};

export default downloadPDF