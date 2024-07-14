// Holds output for datalists. Will be written after all field definitions have been processed.
let dataLists = "";

// This is the array of field definition objects to display on the form.
let arFormFields = [];

// flag used while building the form to track if a fieldset is open
let fieldSetOpen = false;

// Arrow function to populate the form fields array with field definition objects
const populateFormFieldsArray = () => {
    const formFields = [
        { type: "panel", label: "Data", id: "pnlAuthentication" },
        { type: "input", id: "x_login", value: "QOAA1OCE-79g61W58I6s", locked: true },
        { type: "input", id: "x_tran_key", value: "55tLJu2tU694Z2hz", sendit: "0", locked: true },
        { type: "input", id: "x_fp_sequence", value: "1", sendit: "1", locked: true },
        { type: "input", id: "x_fp_timestamp", value: "", sendit: "1", locked: true },
        { type: "input", id: "x_fp_hash", value: "", sendit: "1", locked: true },
        { type: "input", id: "x_type", value: "auth_capture", sendit: "1" },
        { type: "input", id: "x_currency_code", value: "", sendit: "0", locked: true },
        { type: "input", id: "x_amount", value: "5", sendit: "1", locked: true },
        { type: "input", id: "x_invoice_num", value: "", sendit: "1" },
        { type: "input", id: "x_cust_id", value: "A123", sendit: "1" },
        { type: "input", id: "x_description", value: "SIM Test Sandbox - OCE", sendit: "1", locked: true },
        { type: "input", id: "x_line_item", value: "item1<|>golf balls<|><|>2<|>18.95<|>Y", sendit: "1" },
        { type: "input", id: "x_show_form", value: "payment_form", sendit: "1", locked: true },
        { type: "input", id: "x_response_format", value: "0", sendit: "1" },
        { type: "input", id: "x_duplicate_window", value: "0", sendit: "1" },
        { type: "input", id: "x_return_policy_url", value: "https://www.authorize.net", sendit: "1" },
        { type: "input", id: "x_cancel_url_text", value: "Cancel Order", sendit: "1" },
        { type: "input", id: "x_cancel_url", value: "https://www.authorize.net", sendit: "1" },
        { type: "input", id: "x_relay_response", value: "true", sendit: "1" },
        { type: "input", id: "x_relay_url", value: "https://anetreplayresponse.apt-account.workers.dev/", sendit: "1" }
    ];

    return formFields;
}

// Assigning the populated form fields array to arFormFields
arFormFields = populateFormFieldsArray();


// ------------------------------------------------------------------------------------
// Build the form using data in arFormFields.
// ------------------------------------------------------------------------------------
function buildFormFields() {

    dataLists = "";		// clear

    for (var i = 0; i < arFormFields.length; i++) {

        var obj = arFormFields[i];

        // write the data entry/selection 
        switch (obj.type.toLowerCase()) {
            case "panel":
                writePanelStart(obj);
                break;

            case "input":
                writeInputControl(obj);
                break;

            case "list":
                writeListControl(obj);
                break;

            case "footnote":
                writeNote(obj);
                break;

            case "break":
                writeBreak(obj);
                break;
            default:
                break;
        }
    }
    if (fieldSetOpen) writePanelEnd();
    if (dataLists != "") document.writeln(dataLists);
}

// ------------------------------------------------------------------------------------
// Start a new section. This version starts a new table with a caption at the top.
//  id          id attribute.
//  label       text to display as the caption at the top of the section.
//  description[] optional array containing a description of the panel
// ------------------------------------------------------------------------------------
function writePanelStart(obj) {
    if (fieldSetOpen) {
        writePanelEnd();
    }

    document.write("<fieldset class=\"panel\" name=\"");
    document.write(obj.id);
    document.writeln("\">");
    document.writeln("<details open id=\"dtls_" + obj.id + "\">");
    document.writeln("<summary>" + obj.label + "</summary>");
    document.writeln("<table>");
    fieldSetOpen = true;
}

// ------------------------------------------------------------------------------------
// Mark the end of a section.
// ------------------------------------------------------------------------------------
function writePanelEnd() {
    document.writeln("</table>");
    document.writeln("</details></fieldset>");
    fieldSetOpen = false;
}

// ------------------------------------------------------------------------------------
// Write INPUT text control.
//  id          Id attribute of the input box.
//  label       Label to show to the left of the input box.
//  value       Default value.
//  description Optional text describing the control. Appears to the right of the control.
//  sendit      Boolean. 1 to send data to server.
//  suggestions Array of strings to use for a datalist. Appears in UI as auto-complete list.
// ------------------------------------------------------------------------------------
function writeInputControl(obj) {
    var datalistId = "";

    document.write("<tr id=\"tr_" + obj.id + "\">");
    /**writeLabel(obj);**/
    writeSendit(obj);

    /**if (obj.suggestions != undefined) datalistId = writeDatalist(obj);**/

    // input box
    document.write("<td><input class=\"textbox\" size=\"35\" name=\"");
    if (obj.name != undefined) {
        document.write(obj.name);
    }
    else {
        document.write(obj.id);
    }

    document.write("\" id=\"");
    document.write(obj.id);
    document.write("\"");

    // write a default value
    if (obj.value != undefined) {
        document.write(" value=\"");
        if (obj.value != undefined) document.write(obj.value);
        document.write("\"");
    }

    if (datalistId != "") document.write(" list=\"" + datalistId + "\"");
    document.write(" /></td>");

    writeComment(obj);
    document.writeln("</tr>");
}

// ------------------------------------------------------------------------------------
// Write SELECT and OPTION values.
//  id          Id attribute.
//  label       Label to show to the left of the list.
//  description Text describing the control. Appears to the right of the control.
//  sendit      Boolean. 1 to send data to server.
//  choices     Array of objects for the drop down list.
// ------------------------------------------------------------------------------------
function writeListControl(obj) {
    document.write("<tr id=\"tr_" + obj.id + "\">");
    writeLabel(obj);
    writeSendit(obj);

    document.write("<td class=\"select\">");
    document.write("<select class=\"select\" name=\"");
    if (obj.name != undefined) {
        document.write(obj.name);
    } else {
        document.write(obj.id);
    }
    document.write("\" id=\"");
    document.write(obj.id);
    document.writeln("\">");

    // build the list
    for (var opt = 0; opt < obj.choices.length; opt++) {
        document.write("<option");
        if (obj.choices[opt].selected == "1") document.write(" selected");
        document.write(" value=\"");
        document.write(obj.choices[opt].value);   // the value
        document.write("\" />");
        document.writeln(obj.choices[opt].text);    // the display text
    }
    document.write("</select>");
    document.writeln("</td>");
    writeComment(obj);
    document.writeln("</tr>");
}

// ------------------------------------------------------------------------------------
// Build and write the comment for the given object.
// ------------------------------------------------------------------------------------
function writeComment(obj) {
    var comment = "";
    comment += " (";
    if (obj.name != undefined) {
        comment += obj.name;
    } else {
        comment += obj.id;
    }
    comment += ") ";

    if (obj.description != undefined) comment += obj.description;
    document.writeln("<td class=\"comment\">" + comment + "</td>");
}

// ------------------------------------------------------------------------------------
// Build the input label.
// ------------------------------------------------------------------------------------
function writeLabel(obj) {
    document.write("<td class=\"label\">");
    document.write(obj.label);
    document.writeln("</td>");
}

// ------------------------------------------------------------------------------------
// Write the note.
// ------------------------------------------------------------------------------------
/**function writeNote(obj) {
    document.write("<tr id=\"tr_" + obj.id + "\">");
    //document.write("<td></td>");    // label
    //document.write("<td></td>");    // sendit checkbox

    // write the note using the input and comment cells
    if (obj.description != undefined) {
        document.writeln("<td colspan=\"4\" class=\"note\">" + obj.description + "</td>");
    }
    document.writeln("</tr>");
}**/

// ------------------------------------------------------------------------------------
// Build the sendit checkbox.
// ------------------------------------------------------------------------------------
function writeSendit(obj) {
    var id = "chk_" + obj.id;
    var inputName = obj.id;
    if (obj.name != undefined) inputName = obj.name;

    document.write("<td title='Send to server if checked.'><input class='checkbox' type='checkbox' id='" + id + "'");
    if (obj.sendit != "0") document.write(" CHECKED");
    if (obj.locked) document.write(" disabled"); // Add this line to disable the checkbox if 'locked' property is true
    document.write(" onclick=\"onclickSendit(this,'" + obj.id + "','" + inputName + "')\"");
    document.writeln(" /></td>");
}

// ------------------------------------------------------------------------------------
// onclick handler for the sendit checkbox.
// ------------------------------------------------------------------------------------
function onclickSendit(checkbox, objid, objname) {
    var field = document.getElementById(objid);
    if (checkbox.checked) field.name = objname; else field.name = "";
}

// ------------------------------------------------------------------------------------
// Build the datalist element.
// ------------------------------------------------------------------------------------
function writeDatalist(obj) {
    var datalistId = "datalist_" + obj.id;

    // build the datalist 
    dataLists += "<datalist id=\"" + datalistId + "\">\r\n";
    for (var opt = 0; opt < obj.suggestions.length; opt++) {
        dataLists += "<option";
        dataLists += " value=\"";
        dataLists += obj.suggestions[opt];   // the value
        dataLists += "\" />";
        dataLists += "\r\n";
    }
    dataLists += "</datalist>\r\n";
    return datalistId;
}

// ------------------------------------------------------------------------------------
// Submit the form after processing the fields.
// ------------------------------------------------------------------------------------
function submitTransactTestForm() {
    prepareFormForSubmission(document.transactTestForm);

    var form = document.transactTestForm;
    var url = form.serverSecure.value + "://" + form.serverDomain.value + form.serverPath.value;

    // submit form
    form.method = form.serverMethod.value;
    form.action = url;
    if (form.chkResponseNewTab.checked) {
        form.target = "_blank";
    } else {
        form.target = "_self";
    }
    return true;
}

// ------------------------------------------------------------------------------------
// Iterate through all fields on the form.
// If the sendit checkbox is not checked clear the name attribute of the corresponding
// field to prevent it from being submitted to the server.
// Store all values, list selection and checked states in the local storage.
// ------------------------------------------------------------------------------------
function prepareFormForSubmission(form) {
    var fields = form.elements;

    if (form.chkRandomInvoice.checked) generateRandomInvoice(form);

    if (fields["chk_x_fp_hash"] != undefined) {
        if (form.chk_x_fp_hash.checked) {
            if (fields["x_tran_key"] != undefined
                && form.x_tran_key.value != "") {
                generateFingerprintHMAC(form);
            }
            else if (fields["i_signature_key"] != undefined
                && form.i_signature_key.value != "") {
                generateFingerprintSHA512(form);
            }
        }
    }

    for (var i = 0; i < fields.length; i++) {
        if (fields[i].type != undefined
            && fields[i].type.toLowerCase() == "checkbox"
            && fields[i].id.substr(0, 4) == "chk_") {
            // If this is a check box that controls submission of the field
            // then only send the field if the box is checked.
            if (!fields[i].checked) {
                // clearing the name will prevent the field from being submitted
                var inputId = fields[i].id.substr(4, 99);
                fields[inputId].name = "";
            }
        }
    }
}

// ------------------------------------------------------------------------------------
// Iterate through all fields on the form.
// ------------------------------------------------------------------------------------
function buildSetValuesString() {
    var cmdstr = "version=" + version + ";\n";
    for (var f = 0; f < document.forms.length; f++) {
        var form = document.forms[f];
        var fields = form.elements;
        for (var i = 0; i < fields.length; i++) {
            if (fields[i].id != undefined
                && fields[i].type != undefined
                && fields[i].id != ""
                && fields[i].id[0] != "_"      // special fields, do not include
                && (fields[i].value != undefined
                    || fields[i].checked != undefined
                    || fields[i].selectedIndex != undefined)) {
                cmdstr += "document." + form.name + "[\"" + fields[i].id + "\"]";

                switch (fields[i].type.toLowerCase()) {
                    case "checkbox":
                        cmdstr += ".checked=" + fields[i].checked;
                        break;
                    case "select-one":
                        cmdstr += ".selectedIndex=" + fields[i].selectedIndex;
                        break;
                    default:
                        cmdstr += ".value=decodeURI(\"" + encodeURI(fields[i].value) + "\")";
                        break;
                }
                cmdstr += ";\n";
            }
        }
    }
    return cmdstr;
}

// ------------------------------------------------------------------------------------
// Generate a fingerprint and store in x_fp_hash input box.
// The following elements must exist on the form:
//   x_tran_key, x_fp_hash, x_fp_timestamp, x_fp_sequence, x_login, x_amount, x_currency_code
// ------------------------------------------------------------------------------------
function generateFingerprintHMAC(form) {
    form.x_fp_timestamp.value = GetSecondsSince1970();
    var strhash = form.x_login.value
        + "^" + form.x_fp_sequence.value
        + "^" + form.x_fp_timestamp.value
        + "^" + form.x_amount.value
        + "^" + form.x_currency_code.value;

    var fingerprint = HMAC(form.x_tran_key.value, strhash);
    form.x_fp_hash.value = fingerprint;
}

// ------------------------------------------------------------------------------------
// Generate a fingerprint and store in x_fp_hash input box using SHA-512.
// The following elements must exist on the form:
//   i_signature_key, x_fp_hash, x_fp_timestamp, x_fp_sequence, x_login, x_amount, x_currency_code
// ------------------------------------------------------------------------------------			
function generateFingerprintSHA512(form) {
    form.x_fp_timestamp.value = GetSecondsSince1970();
    var strhash = form.x_login.value
        + "^" + form.x_fp_sequence.value
        + "^" + form.x_fp_timestamp.value
        + "^" + form.x_amount.value
        + "^" + form.x_currency_code.value;

    var sha = new sha("SHA-512", "TEXT");
    sha.setHMACKey(form.i_signature_key.value, "HEX");
    sha.update(strhash);

    var fingerprint = sha.getHMAC("HEX");

    form.x_fp_hash.value = fingerprint;
}

// ------------------------------------------------------------------------------------
// Generate a random invoice number.
// ------------------------------------------------------------------------------------
function generateRandomInvoice(form) {
    if (form.elements["x_invoice_num"] == undefined) return;

    var val = String(Math.random());
    var idx = val.indexOf(".") + 1;
    val = val.substring(idx, val.length - idx + 1);
    form.x_invoice_num.value = val;
}
