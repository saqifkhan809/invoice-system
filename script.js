function calculate() {
    let rows = document.querySelectorAll('#items-table tbody tr');
    let subtotal = 0;

    rows.forEach(row => {
        let qty = parseFloat(row.querySelector('.qty').value) || 0;
        let price = parseFloat(row.querySelector('.price').value) || 0;
        let total = qty * price;
        row.querySelector('.row-total').innerText = total.toFixed(2);
        subtotal += total;
    });

    document.getElementById('subtotal').innerText = subtotal.toFixed(2);
    let taxRate = parseFloat(document.getElementById('tax-rate').value) || 0;
    let taxAmount = (subtotal * taxRate) / 100;
    let grandTotal = subtotal + taxAmount;
    document.getElementById('grand-total').innerText = grandTotal.toFixed(2);
}

function addItem() {
    let table = document.querySelector('#items-table tbody');
    let sn = table.rows.length + 1;
    let row = document.createElement('tr');
    row.innerHTML = `
        <td data-label="SN">${sn}</td>
        <td data-label="Description"><input type="text" placeholder="Item/Service description"></td>
        <td data-label="Qty"><input type="number" value="1" class="qty" oninput="calculate()"></td>
        <td data-label="Price"><input type="number" value="0" class="price" oninput="calculate()"></td>
        <td data-label="Total" class="row-total">0.00</td>
        <td class="no-print"><button class="btn-del" onclick="removeItem(this)">×</button></td>
    `;
    table.appendChild(row);
    calculate();
}

function removeItem(btn) {
    btn.closest('tr').remove();
    calculate();
}

function loadLogo(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const output = document.getElementById('company-logo');
        output.src = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
}

async function generatePDF() {
    const element = document.getElementById('invoice-container');
    const opt = {
        margin: 0.3,
        filename: 'Professional_Invoice.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Use the promise-based approach to handle mobile triggers better
    try {
        await html2pdf().set(opt).from(element).save();
    } catch (error) {
        console.error("PDF Generation Error:", error);
        alert("There was an issue generating the PDF. Please try again.");
    }
}
