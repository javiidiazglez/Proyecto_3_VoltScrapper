/**
 * Prueba básica para validar el entorno de testing
 */

describe('Entorno de testing', () => {
    test('debe poder ejecutar pruebas básicas', () => {
        expect(1 + 1).toBe(2);
    });
    
    test('debe tener acceso a document', () => {
        expect(document).toBeDefined();
    });
    
    test('debe poder crear elementos HTML', () => {
        const div = document.createElement('div');
        div.id = 'test';
        expect(div.id).toBe('test');
    });
});
