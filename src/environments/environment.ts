export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  mockData: {
    users: [
      { "username": "usuario123", "password": "¡Contraseña1!" },
      { "username": "coder_gal", "password": "SecurePass2#" },
      { "username": "dev_master", "password": "MySecretPwd3$" },
      { "username": "cuenta_de_prueba", "password": "ContraseñaDébil4%" },
      { "username": "admin_user", "password": "AdminPass5^" }
    ]
  },  config: {
    loginDelay: 500
  }
};
