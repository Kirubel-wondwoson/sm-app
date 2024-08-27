import jwt from "jsonwebtoken"

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) res.sendStatus(401) // 401 : unauthorized (client is not authenticated to access the resource)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403) // 403 : Forbidden (client is not authorized to access the resource)
    req.user = user
    next()
  })
}
export default authenticateToken