const multer = require("multer");
const db = require("../models");
const { v4: uuidv4 } = require('uuid');
const { Op } = require('sequelize'); 
const uuid1 = uuidv4();
const uuid2 = uuidv4();
const Order = db.orders
const User = db.users;
const OrderDetail = db.order_detail
const Payment = db.payments
const ExchangeRate = db.exchange_rates
const createOrderWithDetailsAndPayment = async (req, res) => {
    try {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, './uploadImage')
            }, // Set the destination directory
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                cb(null, uniqueSuffix + '-' + file.originalname);
            }
        });
        const upload = multer({ storage: storage }).single("payments_upload");
        upload(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                // Handle Multer-specific errors
                return res.status(400).json({ message: 'Payment image upload error.' });
            } else if (err) {
                // Handle other errors
                return res.status(500).json({ message: 'Internal server error.' });
            }
            // insert into Orders
            const { user } = req
            const orderData = {
                // order_id: uuid1,
                user_id: user.user_id,
                delivery_id: req.body.delivery_id,
                ex_id:1
            }
            const createdOrder = await Order.create(orderData)
            //insert to order detail
            const items = JSON.parse(req.body.items)
            const orderDetailData = items.map(i => ({
                price: i.price,
                quantity: i.quantity,
                book_id: i.book_id,
                order_id: createdOrder.order_id

            }))
            const createOrderDetail = await OrderDetail.bulkCreate(orderDetailData)
            //insert to payments


            // At this point, the payment picture upload is complete
            const paymentImageFile = req.file // Contains the uploaded image file details

            // Create the payment and associate it with the order
            const payment_data = {
                // payment_id: uuid2,
                total_price: req.body.total_price,
                payment_picture: paymentImageFile.filename,
                payment_type: "One pay",
                order_id: createdOrder.order_id
            }
            const payment_result = await Payment.create(payment_data)
            res.status(201).json({ message: "payment success waiting admin confirm", data: payment_result })
        });
    } catch (err) {
        res.status(400).json({ message: err })
    }
}
const addExchangeRate = async (req,res) => {
    try{
        const { bath, dollar } = req.body
        const exchangeRate = await ExchangeRate.create({ bath:bath, dollar:dollar })
        res.status(200).json(exchangeRate)
    }catch(err){
        res.status(400).json({message:err})
    }
   
    
}
const getOrders = async (req, res) => {
    try {
        const { user } = req;

        // Fetch user orders
        const userOrder = await User.findOne({
            include: [{
                model: Order,
                as: "order"
            }],
            where: { user_id: user.user_id }
        });

        if (!userOrder) {
            return res.status(404).json({ message: 'No orders found for this user.' });
        }

        const { order } = userOrder;
        const orderIds = order.map(order => order.order_id);

        // Debugging: log the orderIds array
        console.log(orderIds);

        // Fetch orders with related payments and order details
        const orderPayment = await Order.findAll({
            where: {
                order_id: {
                    [Op.in]: orderIds
                },
                order_pay_status: req.body.status
            },
            include: [{
                model: Payment,
                as: "payments"
            }, {
                model: OrderDetail,
                as: "order_detail"
            }]
        });

        res.status(200).json(orderPayment);
    } catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = { createOrderWithDetailsAndPayment, getOrders, addExchangeRate }