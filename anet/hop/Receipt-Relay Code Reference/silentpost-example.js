addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method === "POST") {
    // Parse the POST request's body as form data
    const formData = await request.formData();
    const data = {};

    // Iterate over the form data and store it in an object
    for (const entry of formData.entries()) {
      data[entry[0]] = entry[1];
    }

    // Log the data (for testing, in a real scenario you might want to do more secure processing)
    console.log("Received Silent Post data:", data);

    // Respond to Authorize.Net to acknowledge receipt of the Silent Post
    return new Response('Silent Post received', { status: 200 });
  } else {
    // Not a POST request, so inform the sender that this method is not allowed
    return new Response('Method Not Allowed', { status: 405 });
  }
}