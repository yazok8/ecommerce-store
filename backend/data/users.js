import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },

  {
    name: 'Hayley Dunphy',
    email: 'hayley@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jason Smith',
    email: 'jason@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
