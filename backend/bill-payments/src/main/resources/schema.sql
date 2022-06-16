CREATE TABLE Customers (
    id INTEGER  NOT NULL AUTO_INCREMENT,
    customerName VARCHAR(128) NOT NULL,
    email VARCHAR(128) NULL,
    phoneNo VARCHAR(64) NULL,
    address VARCHAR(256) NULL,
    dateRegisterd DateTime NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE AccountDetails (
    id INTEGER  NOT NULL AUTO_INCREMENT,
    customerId INTEGER NOT NULL,
    bankName VARCHAR(128) NULL,
    accountNo VARCHAR(64) NULL,
    PRIMARY KEY (id),
    foreign key (customerId) references Customers(id)
);

CREATE TABLE BillingDetails (
    id INTEGER  NOT NULL AUTO_INCREMENT,
    customerId INTEGER NOT NULL,
    amount VARCHAR(128) NULL,
    status VARCHAR(64) NULL,
    requestRaisedOn DateTime NOT NULL,
    remarks VARCHAR(256) NULL,
    PRIMARY KEY (id),
    foreign key (customerId) references Customers(id)
);

CREATE TABLE Payments (
    id INTEGER  NOT NULL AUTO_INCREMENT,
    billId INTEGER NOT NULL,
    paymentStatus VARCHAR(64) NULL,
    processedDate DateTime NOT NULL,
    PRIMARY KEY (id),
    foreign key (billId) references BillingDetails(id)
);