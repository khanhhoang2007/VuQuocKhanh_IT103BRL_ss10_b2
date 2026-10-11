let circulationLogs = [
  {
    logId: "L01",
    studentCode: "SV01",
    bookIsbn: "ISBN001",
    status: "BORROWING",
    fineAmount: 0,
    borrowDate: "2026-09-01",
    returnDate: null,
    settled: false,
  },
  {
    logId: "L02",
    studentCode: "SV02",
    bookIsbn: "ISBN002",
    status: "BORROWING",
    fineAmount: 0,
    borrowDate: "2026-09-05",
    returnDate: null,
    settled: false,
  },
  {
    logId: "L03",
    studentCode: "SV03",
    bookIsbn: "ISBN003",
    status: "RETURNED",
    fineAmount: 10000,
    borrowDate: "2026-08-01",
    returnDate: "2026-08-10",
    settled: true,
  },
];

let validStudents = ["SV01", "SV02", "SV03", "SV04"];

// 1. Muon sach moi
let studentCode = "SV04";
let bookIsbn = "ISBN004";

let studentExists = false;

for (let i = 0; i < validStudents.length; i++) {
  if (validStudents[i] === studentCode) {
    studentExists = true;
  }
}

if (studentExists) {
  circulationLogs.push({
    logId: "L04",
    studentCode: studentCode,
    bookIsbn: bookIsbn,
    status: "BORROWING",
    fineAmount: 0,
    borrowDate: "2026-10-11",
    returnDate: null,
    settled: false,
  });

  console.log("Muon sach thanh cong.");
} else {
  console.log("Ma sinh vien khong hop le.");
}

// 2. Gia han sach L01
for (let i = 0; i < circulationLogs.length; i++) {
  if (circulationLogs[i].logId === "L01") {
    if (circulationLogs[i].status === "BORROWING") {
      console.log("Da gia han sach L01.");
    } else {
      console.log("Khong the gia han giao dich nay.");
    }
  }
}

// 3. Tra sach va tinh tien phat
let returnLogId = "L01";
let isLost = false;
let lateDays = 3;

for (let i = 0; i < circulationLogs.length; i++) {
  if (circulationLogs[i].logId === returnLogId) {
    if (circulationLogs[i].status === "BORROWING") {
      if (isLost) {
        circulationLogs[i].status = "LOST";
        circulationLogs[i].fineAmount = 200000;
      } else {
        circulationLogs[i].status = "RETURNED";
        circulationLogs[i].fineAmount = lateDays * 5000;
      }

      circulationLogs[i].returnDate = "2026-10-11";
      circulationLogs[i].settled = true;

      console.log("Da cap nhat giao dich tra sach.");
    } else {
      console.log("Giao dich khong o trang thai dang muon.");
    }
  }
}

// 4. Thanh toan tien phat
for (let i = 0; i < circulationLogs.length; i++) {
  if (circulationLogs[i].settled === true) {
    console.log(
      "Giao dich " +
        circulationLogs[i].logId +
        " da quyet toan: " +
        circulationLogs[i].fineAmount.toLocaleString("vi-VN") +
        " VND",
    );
  }
}

// 5. Xoa nhat ky da quyet toan qua 30 ngay
let today = new Date("2026-10-11");

for (let i = circulationLogs.length - 1; i >= 0; i--) {
  let log = circulationLogs[i];

  if (log.status === "RETURNED" && log.settled === true) {
    let returnDate = new Date(log.returnDate);
    let daysPassed = (today - returnDate) / (1000 * 60 * 60 * 24);

    if (daysPassed > 30) {
      circulationLogs.splice(i, 1);
      console.log("Da xoa nhat ky " + log.logId);
    }
  }
}

// 6. Bao cao cuoi ngay
let borrowingCount = 0;
let totalFine = 0;
let returnedCount = 0;
let lostCount = 0;

for (let i = 0; i < circulationLogs.length; i++) {
  if (circulationLogs[i].status === "BORROWING") {
    borrowingCount++;
  }

  if (circulationLogs[i].status === "RETURNED") {
    returnedCount++;
  }

  if (circulationLogs[i].status === "LOST") {
    lostCount++;
  }

  if (circulationLogs[i].settled === true) {
    totalFine += circulationLogs[i].fineAmount;
  }
}

// In bang bao cao
console.log("");
console.log("======================================================");
console.log("         BAO CAO LUU CHUYEN SACH CUOI NGAY");
console.log("======================================================");
console.log(
  "Ma GD".padEnd(10) +
    "Ma SV".padEnd(10) +
    "ISBN".padEnd(15) +
    "Trang thai".padEnd(15) +
    "Tien phat",
);
console.log("------------------------------------------------------");

for (let i = 0; i < circulationLogs.length; i++) {
  console.log(
    circulationLogs[i].logId.padEnd(10) +
      circulationLogs[i].studentCode.padEnd(10) +
      circulationLogs[i].bookIsbn.padEnd(15) +
      circulationLogs[i].status.padEnd(15) +
      circulationLogs[i].fineAmount.toLocaleString("vi-VN") +
      " VND",
  );
}

console.log("------------------------------------------------------");
console.log("So giao dich dang muon: " + borrowingCount);
console.log("So giao dich da tra: " + returnedCount);
console.log("So giao dich mat sach: " + lostCount);
console.log(
  "Tong tien phat da quyet toan: " + totalFine.toLocaleString("vi-VN") + " VND",
);
console.log("======================================================");
