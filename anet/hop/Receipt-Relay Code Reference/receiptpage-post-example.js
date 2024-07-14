addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method === "POST") {
    // Parse the form data from the POST request
    const formData = await request.formData();
    const transactionId = formData.get('x_trans_id');
    const responseCode = formData.get('x_response_code');
    const description = formData.get('x_description');

    // Generate HTML content with transaction data
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <title>Transaction Receipt</title>
      </head>
      <body>
          <h1>Transaction Receipt</h1>
          <div id="receipt">
          <p>Transaction ID: ${transactionId}</p>
          <p>Response Code: ${responseCode}</p>
          <p>Description: ${description}</p>
              <br />
              <p><a href='https://adthomps.github.io/anet.html'>Back to test site.</a></p>
          </div>
      </body>
      </html>
    `;

    return new Response(htmlContent, {
      headers: { 'Content-Type': 'text/html' }
    });
  } else {
    return new Response("Method Not Allowed", { status: 405 });
  }
}