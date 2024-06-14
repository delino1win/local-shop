const midtransClient = require('midtrans-client')

let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SECRET!,
  clientKey: process.env.MIDTRANS_NEXT_CLIENTKEY!
})

export default snap