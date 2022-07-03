mongo -- "$MONGO_INITDB_DATABASE" <<EOF
    db = new Mongo().getDB("management");
    db.createCollection("ticket_management", { capped: false });
    db.createCollection("ticket_order", { capped: false });
    db.ticket_management.insert([
    { type: "A", price: 5000, amountPerDay: 10, minimumBuy: 1, createdAt: new Date() },
    { type: "B", price: 2500, amountPerDay: 20, minimumBuy: 2, createdAt: new Date() },
    { type: "C", price: 1000, amountPerDay: 30, minimumBuy: 2, createdAt: new Date() },
    { type: "D", price: 500, amountPerDay: 40, minimumBuy: 3, createdAt: new Date() }
    ])
    db.ticket_order.insert([
    { type: "A", sold: 10, createdAt: new Date(), updatedAt: new Date(Date.now() + 6.048e+8)},
    { type: "A", sold: 1, createdAt: new Date(), updatedAt: new Date(Date.now() + 6.048e+8)},
    { type: "A", sold: 1, createdAt: new Date(), updatedAt: new Date(Date.now() + 6.048e+8)},
    { type: "A", sold: 1, createdAt: new Date(), updatedAt: new Date(Date.now() + 6.048e+8)},
    { type: "A", sold: 6, createdAt: new Date(), updatedAt: new Date(Date.now() + 6.048e+8)},
    { type: "B", sold: 5, createdAt: new Date(), updatedAt: new Date(Date.now() + 6.048e+8)},
    { type: "C", sold: 2, createdAt: new Date(), updatedAt: new Date(Date.now() + 6.048e+8)},
    { type: "D", sold: 3, createdAt: new Date(), updatedAt: new Date(Date.now() + 6.048e+8)}
    ])
EOF
