module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'], // Extensiones que Jest buscará para los archivos de pruebas
    rootDir: 'src',  // Carpeta raíz donde están ubicados los archivos de tu proyecto
    testRegex: '.*\\.spec\\.ts$',  // Expresión regular que identifica los archivos de prueba
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',  // Utiliza ts-jest para transformar archivos TypeScript a JavaScript
    },
    collectCoverageFrom: [
      '**/*.(t|j)s',  // Configura la cobertura de pruebas para archivos TS y JS
    ],
    coverageDirectory: '../coverage',  // Directorio donde se guardará la cobertura de pruebas
    testEnvironment: 'node',  // Entorno de prueba (Node.js para aplicaciones backend)
    
    moduleNameMapper: {
      '^src/(.*)$': '<rootDir>/$1',  // Resuelve rutas absolutas a la carpeta 'src'
      '^common/(.*)$': '<rootDir>/common/$1',  // Si tienes una carpeta 'common' mapea las rutas también
      '^modules/(.*)$': '<rootDir>/modules/$1',  // Si tienes una carpeta 'modules', la puedes mapear
    },
  
    // Para MongoDB Memory Server (opcional si usas MongoDB en pruebas)
    // globalSetup: '<rootDir>/../test/setup.ts', // Configuración inicial global para las pruebas
    // globalTeardown: '<rootDir>/../test/teardown.ts', // Limpiar después de las pruebas
    // setupFilesAfterEnv: ['<rootDir>/../test/setupTest.ts'], // Configuración de entorno de prueba
  };
  