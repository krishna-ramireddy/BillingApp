# BillingApp
Can manage your bill payments using this application

## Steps to Run the App
1. Clone the Repository and checkout to dev branch
```bash
cd BillingApp
git checkout dev
```

2. To Run the Backend (Java Spring Boot)
#### Pre requisites Java 1.8 and Maven
```bash
cd backend/bill-payments
mvn clean install
java -jar target/bill-payments-snapshot0.0.1.jar
```

Or use your preferred IDE to run the java application

3. To Run the Fronend (React)
#### Pre requisites (Node 16+)
```bash
cd frontend/billing-app-ui
npm start
```

4. Once both the backend and frontend runs successfully [clickhere](http://localhost:3000) or visit [http://localhost:3000]

## Pages 
1. Manage Billings page where you can see existing billings and their details also can create a new one using a button on top right of the table.
2. Payment Screen here can pay the bill (just an alert displaying the amount and customer name) can be done only after Admin approves the Billing request (only approved bilings will be shown).
3. Admin Manage billings page here can review the billing request and respond with the status (Approve/Pending(default)/Reject).
