module.exports = {
  extends: [
    "react-app",
    "react-app/jest"
  ],
  rules: {
    "indent": ["error", 2], // Indentación de 2 espacios
    "no-mixed-spaces-and-tabs": "error", // No permitir mezcla de espacios y tabulaciones
    "no-trailing-spaces": "error", // No permitir espacios al final de las líneas
    "space-before-function-paren": ["error", "always"] // Espacio antes de los paréntesis de las funciones
  }
};