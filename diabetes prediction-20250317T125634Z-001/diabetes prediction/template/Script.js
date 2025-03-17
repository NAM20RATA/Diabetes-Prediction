document.getElementById('predictionForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the form from submitting and refreshing the page

    // Display "Prediction: None" initially
    document.getElementById('predictionText').textContent = "None"; 

    // Collect input values
    const insulin = parseFloat(document.getElementById('insulin').value) || 0;
    const glucose = parseFloat(document.getElementById('glucose').value) || 0;
    const bmi = parseFloat(document.getElementById('bmi').value) || 0;
    const bloodPressure = parseFloat(document.getElementById('bloodPressure').value) || 0;
    const skinThickness = parseFloat(document.getElementById('skinThickness').value) || 0;
    const pedigree = parseFloat(document.getElementById('pedigree').value) || 0;
    const age = parseInt(document.getElementById('age').value) || 0;

    // Debugging: Log the values to the console
    console.log("Insulin:", insulin); 
    console.log("Glucose:", glucose); 
    console.log("BMI:", bmi); 
    console.log("Blood Pressure:", bloodPressure);
    console.log("Skin Thickness:", skinThickness);
    console.log("Pedigree:", pedigree);
    console.log("Age:", age);

    // Initialize the prediction variable
    let prediction = "None"; // Default to "None"

    // Insulin condition
    if (insulin < 17) {
        prediction = "Diabetic (low insulin level)";
    }

    // Glucose condition
    else if (glucose > 120) {
        prediction = "Diabetic (high glucose level)";
    }

    // BMI condition
    else if (bmi > 23) {
        prediction = "Diabetic (high BMI)";
    }

    // Blood Pressure condition (normal range is usually < 130/85)
    else if (bloodPressure > 130) {
        prediction = "Diabetic (high blood pressure)";
    }

    // Skin Thickness condition (this is an approximation, as it varies with different studies)
    else if (skinThickness > 30) {
        prediction = "Diabetic (high skin thickness)";
    }

    // Diabetes Pedigree Function condition (higher values indicate higher risk)
    else if (pedigree > 0.5) {
        prediction = "Diabetic (high family history risk)";
    }

    // Age condition (age over 45 increases diabetes risk)
    else if (age > 45) {
        prediction = "Diabetic (age factor)";
    }

    // Default condition (No diabetes detected based on input values)
    else {
        prediction = "No Diabetic";
    }

    // Update the result based on the prediction
    document.getElementById('predictionText').textContent = prediction;

    // Redirect based on the prediction
    if (prediction.startsWith("Diabetic")) {
        // If the prediction is diabetic, redirect to diabetic.html
        window.location.href = "diabetic.html";
    } else {
        // If the prediction is non-diabetic, redirect to non-diabetic.html
        window.location.href = "non-diabetic.html";
    }
});
