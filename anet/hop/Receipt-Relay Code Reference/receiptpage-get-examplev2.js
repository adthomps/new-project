addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method === "GET") {
    // Extract query parameters from the request URL
    const url = new URL(request.url);
    const transactionId = url.searchParams.get('x_trans_id');
    const responseCode = url.searchParams.get('x_response_reason_code');
    const description = url.searchParams.get('x_description');
    const amount = url.searchParams.get('x_amount');
    const invoicenum = url.searchParams.get('x_invoice_num');
    const custid = url.searchParams.get('x_cust_id');
    const currency = url.searchParams.get('x_currency_code');

    // Generate HTML content with transaction data
    const htmlContent = `

    <!doctype html>
    <html lang="en" data-bs-theme="auto">
    
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    
        <!-- Favicon -->
        <link rel="icon" href="https://adthomps.github.io/images/icons/profile.jpg" type="image/x-icon">
    
        <!-- Title -->
        <title>APT Portfolio - Bootstrap</title>
    
        <!-- CSS - Universal -->
        <link href=".https://adthomps.github.io/scripts/CSS/common.css" rel="stylesheet">
        <link href="https://adthomps.github.io/scripts/CSS/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    
      <!-- CSS - Custom Color Selector -->
      <style>
        /*Theme Color Switcher*/
        .btn-bd-primary {
          --bd-violet-bg: #1739fc;
          --bd-violet-rgb: 112.520718, 44.062154, 249.437846;
    
          --bs-btn-font-weight: 600;
          --bs-btn-color: var(--bs-white);
          --bs-btn-bg: var(--bd-violet-bg);
          --bs-btn-border-color: var(--bd-violet-bg);
          --bs-btn-hover-color: var(--bs-white);
          --bs-btn-hover-bg: #0923b6;
          --bs-btn-hover-border-color: #1739fc;
          --bs-btn-focus-shadow-rgb: var(--bd-violet-rgb);
          --bs-btn-active-color: var(--bs-btn-hover-color);
          --bs-btn-active-bg: #1739fc;
          --bs-btn-active-border-color: #0923b6;
        }
    
        .bd-mode-toggle {
          z-index: 1500;
        }
    
        .bd-mode-toggle .dropdown-menu .active .bi {
          display: block !important;
        }
      </style>
    
        <!-- JS References for Accept Form -->
        <script src="https://code.jquery.com/jquery-3.1.1.min.js"
            integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
    
        <script src="https://jstest.authorize.net/v1/Accept.js" charset="utf-8"></script>
    
        <!-- JavaScript -->
        <script type="text/javascript">
            var blob = "";
    
            function getSecureData() {
                var secureData = {},
                    authData = {},
                    cardData = {};
                cardData.cardNumber = document.getElementById('CARDNUMBER_ID').value;
                cardData.month = document.getElementById('EXPIRY_MONTH_ID').value;
                cardData.year = document.getElementById('EXPIRY_YEAR_ID').value;
                cardData.zip = document.getElementById('ZIP_CODE').value;
                cardData.cardCode = document.getElementById('CARD_CODE').value;
                secureData.cardData = cardData;
                authData.clientKey = '4abK6fG25BtW9QF3LZUN84FsmvQh47bpdm8FJ2yA28r9p5WPB34H8N6n7whjUsBu';
                authData.apiLoginID = '62W3Efur';
                secureData.authData = authData;
                Accept.dispatchData(secureData, 'responseHandler');
            }
    
            function responseHandler(response) {
                if (response.messages.resultCode === 'Error') {
                    for (var i = 0; i < response.messages.message.length; i++) {
                        console.log(response.messages.message[i].code + ':' + response.messages.message[i].text);
                        $("#blob").val(response.messages.message[i].code + ':' + response.messages.message[i].text);
                    }
                } else {
                    useOpaqueData(response.opaqueData)
                }
            }
    
            function useOpaqueData(responseData) {
                console.log(responseData.dataDescriptor);
                console.log(responseData.dataValue);
                $("#blob").val(responseData.dataValue);
            }
        </script>
    
    </head>
    
    <body>
        <!--Theme Color Icons Start-->
        <svg xmlns="http://www.w3.org/2000/svg" class="d-none">
          <symbol id="check2" viewBox="0 0 16 16">
            <path
              d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
          </symbol>
          <symbol id="circle-half" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z" />
          </symbol>
          <symbol id="moon-stars-fill" viewBox="0 0 16 16">
            <path
              d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
            <path
              d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z" />
          </symbol>
          <symbol id="sun-fill" viewBox="0 0 16 16">
            <path
              d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
          </symbol>
        </svg>
        <!--Theme Color Icons End-->
      
        <!--Theme Code Start-->
        <div class="dropdown position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle">
          <button class="btn btn-bd-primary py-2 dropdown-toggle d-flex align-items-center" id="bd-theme" type="button"
            data-bs-toggle="dropdown" aria-label="Toggle theme (auto)">
            <svg class="bi my-1 theme-icon-active" width="1em" height="1em">
              <use href="#circle-half"></use>
            </svg>
            <span class="visually-hidden" id="bd-theme-text">Toggle theme</span>
          </button>
          <ul class="dropdown-menu dropdown-menu-end shadow" aria-labelledby="bd-theme-text">
            <li>
              <button type="button" class="dropdown-item d-flex align-items-center" data-bs-theme-value="light"
                aria-pressed="false">
                <svg class="bi me-2 opacity-50 theme-icon" width="1em" height="1em">
                  <use href="#sun-fill"></use>
                </svg>
                Light
                <svg class="bi ms-auto d-none" width="1em" height="1em">
                  <use href="#check2"></use>
                </svg>
              </button>
            </li>
            <li>
              <button type="button" class="dropdown-item d-flex align-items-center" data-bs-theme-value="dark"
                aria-pressed="false">
                <svg class="bi me-2 opacity-50 theme-icon" width="1em" height="1em">
                  <use href="#moon-stars-fill"></use>
                </svg>
                Dark
                <svg class="bi ms-auto d-none" width="1em" height="1em">
                  <use href="#check2"></use>
                </svg>
              </button>
            </li>
            <li>
              <button type="button" class="dropdown-item d-flex align-items-center active" data-bs-theme-value="auto"
                aria-pressed="true">
                <svg class="bi me-2 opacity-50 theme-icon" width="1em" height="1em">
                  <use href="#circle-half"></use>
                </svg>
                Auto
                <svg class="bi ms-auto d-none" width="1em" height="1em">
                  <use href="#check2"></use>
                </svg>
              </button>
            </li>
          </ul>
        </div>
        <!--Theme Code End-->
    
        <main>
            <div class="container">
    
                <header class="p-3 mb-3 border-bottom">
                    <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a class="navbar-brand" href="https://adthomps.github.io/sign-in.html"><img src="https://adthomps.github.io/images/icons/profile.jpg" width="50"
                                height="50" class="rounded-circle" alt="Logo"></a>
            
                                <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                                    <li class="nav-item dropdown">
                                        <a class="nav-link px-2 link-body-emphasis dropdown-toggle" href="#" role="button"
                                            data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-house"></i> Home</a>
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="https://adthomps.github.io/index.html"><i
                                                        class="bi bi-house"></i> Home Page</a>
                                            </li>
                                            <li><a class="dropdown-item" href="https://adthomps.github.io/gallery.html"><i class="bi bi-images"></i> Gallery</a>
                                            </li>
                                            <li><a class="dropdown-item" href="https://adthomps.github.io/dashboard.html"><i class="bi bi-graph-up"></i> Dashboard</a>
                                            </li>
                                            <li><a class="dropdown-item" href="https://adthomps.github.io/product.html"><i class="bi bi-archive"></i>
                                                Product</a>
                                            </li>
                                        </ul>
                                    </li>
            
                                    <li class="nav-item dropdown">
                                        <a class="nav-link px-2 link-secondary dropdown-toggle" href="#" role="button"
                                            data-bs-toggle="dropdown" aria-expanded="false"><i
                                                class="bi bi-credit-card-2-front"></i> Platform Tests</a>
                                        <ul class="dropdown-menu">
                                            <li><a class="link-secondary dropdown-item" href="https://adthomps.github.io/anet.html"><i class="bi bi-credit-card"></i> Authorize.net</a>
                                            </li>
                                            <li><a class="dropdown-item" href="https://adthomps.github.io/cybs.html"><i class="bi bi-credit-card-fill"></i> Cybersource</a>
                                            </li>
                                        </ul>
                                    </li>
            
                            <li class="nav-item dropdown">
                                <a class="nav-link px-2 link-body-emphasis dropdown-toggle" href="#" role="button"
                                    data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-activity"></i> Status
                                    Page Examples</a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" target="_blank" href="https://adthomps.github.io/statuspage1.html">Status Page
                                            Examples 1</a>
                                    </li>
                                    <li><a class="dropdown-item" target="_blank" href="https://adthomps.github.io/statuspage2.html">Status Page
                                            Examples 2</a>
                                    </li>
                                </ul>
                            </li>
            
                            <li class="nav-item dropdown">
                                <a class="nav-link px-2 link-body-emphasis dropdown-toggle" href="#" role="button"
                                    data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-file-earmark-code"></i>
                                    Dev Docs</a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" target="_blank"
                                            href="https://developer.authorize.net/">Authorize.net</a>
                                    </li>
                                    <li><a class="dropdown-item" target="_blank"
                                            href="https://developer.cybersource.com/">Cybersource</a>
                                    </li>
                                </ul>
                            </li>
            
                            <li><a href="https://adthomps.github.io/drone.html" class="nav-link px-2 link-body-emphasis"><i
                                        class="bi bi-pin-map"></i> Drone
                                    Map</a></li>
            
                        </ul>
            
                        <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                            <div class="form-floating">
                                <input type="search" class="form-control" placeholder="Search...">
                                <label for="floatingInput">Search...</label>
                            </div>
                        </form>
            
                        <div class="dropdown text-end">
                            <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="https://adthomps.github.io/images/avatar/IMG_3686.jpg" alt="mdo" width="40" height="50"
                                    class="rounded-circle">
                            </a>
                            <ul class="dropdown-menu text-small">
                                <li><a class="dropdown-item" href="#">Profile</a></li>
                                <li><a class="dropdown-item" href="#">Settings</a></li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li><a class="dropdown-item" href="https://adthomps.github.io/sign-in.html">Sign out</a></li>
                            </ul>
                        </div>
                    </div>
            
                </header>
                
            </div>
    
            <div class="container">
    
                <div class="px-4 py-0 my-5 text-center">
                    <h1 class="display-8 fw-bold">Transaction Receipt Test</h1>
                    <div class="d-flex justify-content-center">
                        <p class="lead mb-4">Testing transaction receipt creation.</p>
                    </div>
                    <!--<i class="bi bi-wallet2" style="font-size: 5rem; "></i>-->
                </div>
    
                <div class="container">
                    <hr class="my-4">
                    <div class="row g-5">
    
                        <!--Cart Section-->
                        <div class="col-md-5 col-lg-10 order-md-last">
                            <h4 class="d-flex justify-content-between align-items-center mb-3">
                                <span class="text-primary">Your Transaction Receipt</span>
                            </h4>
                            <ul class="list-group mb-3">
                                <li class="list-group-item d-flex justify-content-between lh-sm">
                                    <div>
                                        <h6 class="my-0">Transaction ID</h6>
                                        <small class="text-body-secondary">${transactionId}</small>
                                    </div>
                                    <!--<span class="text-body-secondary">${amount}</span>-->
                                </li>
                                <li class="list-group-item d-flex justify-content-between lh-sm">
                                    <div>
                                        <h6 class="my-0">Customer ID</h6>
                                        <small class="text-body-secondary">${custid}</small>
                                    </div>
                                    <!--<span class="text-body-secondary">${amount}</span>-->
                                </li>
                                <li class="list-group-item d-flex justify-content-between lh-sm">
                                    <div>
                                        <h6 class="my-0">Invoice Number</h6>
                                        <small class="text-body-secondary">${invoicenum}</small>
                                    </div>
                                    <!--<span class="text-body-secondary">$8</span>-->
                                </li>
                                <li class="list-group-item d-flex justify-content-between lh-sm">
                                    <div>
                                        <h6 class="my-0">Product name</h6>
                                        <small class="text-body-secondary">${description}</small>
                                    </div>
                                    <span class="text-body-secondary">$10</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between bg-body-tertiary">
                                    <div class="text-success">
                                        <h6 class="my-0">Promo code</h6>
                                        <small>EXAMPLECODE</small>
                                    </div>
                                    <span class="text-success">-$5</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between">
                                    <span>Total (USD)</span>
                                    <strong>${amount}</strong>
                                </li>
                            </ul>
    
                        <!--</div>-->
    
                    </div>
                </div>
    
            </div>
    
            <div class="container">
    
                <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                    <div class="col-md-4 d-flex align-items-center">
                        <span class="mb-3 mb-md-0 text-body-secondary">&copy;
                            <script>document.write(new Date().getFullYear())</script> Company, Inc | <a
                                href="https://adthomps.github.io/privacy.html" target="_blank">Privacy</a> | <a href="https://adthomps.github.io/terms.html"
                                target="_blank">Terms</a>
                        </span>
                    </div>
                    <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
                        <li class="ms-3">
                            <a class="text-body-secondary" href="https://www.linkedin.com/in/adam-thompson-a547468/"
                                target="_blank">
                                <i class="bi bi-linkedin" style="font-size: 1.5rem; "></i>
                            </a>
                        </li>
                        <li class="ms-3">
                            <a class="text-body-secondary" href="https://www.flickr.com/photos/adam-p-thompson/albums"
                                target="_blank">
                                <i class="bi bi-camera2" style="font-size: 1.5rem; "></i>
                            </a>
                        </li>
                        <li class="ms-3">
                            <a class="text-body-secondary" href="https://www.behance.net/adthomps" target="_blank">
                                <i class="bi bi-behance" style="font-size: 1.5rem; "></i>
                            </a>
                        </li>
                        <li class="ms-3">
                            <a class="text-body-secondary" href="https://www.youtube.com/channel/UChghyQZmnM2UYBYyJ2yhyVg"
                                target="_blank">
                                <i class="bi bi-youtube" style="font-size: 1.5rem; "></i>
                            </a>
                        </li>
                    </ul>
                </footer>
    
            </div>
    
        </main>
    
        <!-- JS -->
        <script src="https://adthomps.github.io/scripts/JS/color-modes3.js"></script>
        <script src="https://adthomps.github.io/scripts/JS/checkout.js"></script>
        <script src="https://adthomps.github.io/scripts/JS/bootstrap.bundle.min.js"></script>
    
    </body>
    
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