function calculateTip() {
    const billAmount = parseFloat(document.getElementById("bill").value);
    const tipPercentage = parseFloat(document.getElementById("tip").value);
  
    if (isNaN(billAmount) || isNaN(tipPercentage) || billAmount <= 0 || tipPercentage < 0) {
      alert("Please enter valid values for bill amount and tip percentage.");
      return;
    }
  
    const tipAmount = (billAmount * tipPercentage) / 100;
    const totalAmount = billAmount + tipAmount;
  
    document.getElementById("tipAmount").textContent = `Tip: ₹${tipAmount.toFixed(2)}`;
    document.getElementById("totalAmount").textContent = `Total: ₹${totalAmount.toFixed(2)}`;
  }
  