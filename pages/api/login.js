// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'

const axiosLoginInstance = axios.create({
  baseURL: `${process.env.API_URL}/api/v1`,
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default (req, res) => {
  const formData = encodeURI(
    `username=${req.body.email}&password=${req.body.password}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=password`,
  )
  axiosLoginInstance
    .post('/oauth/token', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
    .then((response) => {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(response.data))
    })
    .catch((e) => {
      res.statusCode = 400
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(e.message))
    })
}
