function calculate() {
    let rows = document.querySelectorAll('#items-table tbody tr');
    let subtotal = 0;

    rows.forEach(row => {
        let qty = row.querySelector('.qty').value;
        let price = row.querySelector('.price').value;
        let total = qty * price;
        row.querySelector('.row-total').innerText = total.toFixed(2);
        subtotal += total;
    });

    document.getElementById('subtotal').innerText = subtotal.toFixed(2);
    
    let taxRate = document.getElementById('tax-rate').value;
    let taxAmount = (subtotal * taxRate) / 100;
    let grandTotal = subtotal + taxAmount;
    
    document.getElementById('grand-total').innerText = grandTotal.toFixed(2);
}

function addItem() {
    let table = document.getElementById('items-table').getElementsByTagName('tbody')[0];
    let rowCount = table.rows.length + 1;
    let row = table.insertRow();
    row.innerHTML = `
        <td>${rowCount}</td>
        <td><input type="text" placeholder="Item description"></td>
        <td><input type="number" value="1" class="qty" oninput="calculate()"></td>
        <td><input type="number" value="0" class="price" oninput="calculate()"></td>
        <td class="row-total">0.00</td>
        <td class="no-print"><button onclick="removeItem(this)">X</button></td>
    `;
}

function removeItem(btn) {
    btn.closest('tr').remove();
    calculate();
}

function loadLogo(event) {
    let image = document.getElementById('company-logo');
    image.src = URL.createObjectURL(event.target.files[0]);
}

// PDF Generation
function generatePDF() {
    const element = document.getElementById('invoice-container');
    const opt = {
        margin: 0.5,
        filename: 'invoice.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
}

// Click logo to trigger file upload
document.getElementById('company-logo').onclick = () => {
    document.getElementById('logo-input').click();
};