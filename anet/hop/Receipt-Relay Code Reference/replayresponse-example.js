addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method === "POST") {
    // Parse the form data from the POST request
    const formData = await request.formData();
    const transactionId = formData.get('x_trans_id');
    const responseCode = formData.get('x_response_code');
    const reasonText = formData.get('x_response_reason_text');
    const description = formData.get('x_description');

    // Generate a response based on the transaction result
    if (responseCode === '1') {
      return new Response(`
      <html>
        <body>
          <h1>Payment Successful</h1>
          <p>Transaction ID: ${transactionId}</p>
          <p>Response Code: ${responseCode}</p>
          <p>Description: ${description}</p>
          <br />
          <p><a href='https://adthomps.github.io/anet/hop.html'>Back to test site.</a></p>
        </body>
      </html>`, {
        headers: { 'Content-Type': 'text/html' }
      });
    } else {
      return new Response(`
      <html>
        <body>
          <h1>Payment Failed</h1>
          <p>Transaction ID: ${transactionId}</p>
          <p>Response Code: ${responseCode}</p>
          <p>Error Message: ${reasonText}</p>
          <br />
          <p><a href='https://adthomps.github.io/anet/hop.html'>Back to test site.</a></p>
        </body>
      </html>`, {
        headers: { 'Content-Type': 'text/html' }
      });
    }
  } else {
    return new Response(`
    <html>
      <body>
        <h1>Method Not Allowed</h1>
        <br />
        <p><a href='https://adthomps.github.io/anet.html'>Back to test site.</a></p>
      </body>
    </html>`, {
      status: 405,
      headers: { 'Content-Type': 'text/html' }
    });
  }
}
