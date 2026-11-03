import test, { describe } from 'node:test';
import assert from 'node:assert';

describe('Fleet Management Demo Logic Suite', () => {
  const MOCK_VEHICLES = [
    { id: 'V-101', plate: 'BRA-2E19', model: 'Volvo FH 540', driver: 'Carlos Silva', status: 'active', mileage: 78000 },
    { id: 'V-102', plate: 'RQN-4F82', model: 'Mercedes Sprinter', driver: 'Marcos Santos', status: 'active', mileage: 32000 },
    { id: 'V-103', plate: 'GHJ-8H11', model: 'Scania R 450', driver: 'Roberto Almeida', status: 'maintenance', mileage: 142000 },
    { id: 'V-104', plate: 'BVC-7K90', model: 'Ford Transit', driver: 'Pátio', status: 'inactive', mileage: 112000 },
  ];

  const MOCK_DRIVERS = [
    { id: 'MOT-01', name: 'Carlos Silva', cnh: '054819283-E', status: 'on_trip' },
    { id: 'MOT-02', name: 'Marcos Santos', cnh: '038291048-D', status: 'active' },
    { id: 'MOT-03', name: 'Roberto Almeida', cnh: '029104829-E', status: 'off_duty' },
  ];

  const MOCK_MAINTENANCE = [
    { id: 'MNT-401', plate: 'GHJ-8H11', serviceType: 'Freios e ABS', status: 'in_progress', cost: 'R$ 4.250,00' },
    { id: 'MNT-400', plate: 'BRA-2E19', serviceType: 'Troca de Óleo', status: 'completed', cost: 'R$ 2.180,00' },
    { id: 'MNT-402', plate: 'KLP-3M22', serviceType: 'Revisão 190k km', status: 'scheduled', cost: 'R$ 3.400,00' },
  ];

  test('vehicles metrics calculate active, maintenance, and inactive counts', () => {
    const total = MOCK_VEHICLES.length;
    const active = MOCK_VEHICLES.filter((v) => v.status === 'active').length;
    const maint = MOCK_VEHICLES.filter((v) => v.status === 'maintenance').length;
    const inactive = MOCK_VEHICLES.filter((v) => v.status === 'inactive').length;

    assert.strictEqual(total, 4);
    assert.strictEqual(active, 2);
    assert.strictEqual(maint, 1);
    assert.strictEqual(inactive, 1);
    assert.strictEqual(active + maint + inactive, total);
  });

  test('drivers metrics calculate on_trip, standby, and off_duty counts', () => {
    const total = MOCK_DRIVERS.length;
    const onTrip = MOCK_DRIVERS.filter((d) => d.status === 'on_trip').length;
    const standby = MOCK_DRIVERS.filter((d) => d.status === 'active').length;
    const offDuty = MOCK_DRIVERS.filter((d) => d.status === 'off_duty').length;

    assert.strictEqual(total, 3);
    assert.strictEqual(onTrip, 1);
    assert.strictEqual(standby, 1);
    assert.strictEqual(offDuty, 1);
  });

  test('maintenance metrics calculate in_progress, scheduled, and completed', () => {
    const inProgress = MOCK_MAINTENANCE.filter((m) => m.status === 'in_progress').length;
    const scheduled = MOCK_MAINTENANCE.filter((m) => m.status === 'scheduled').length;
    const completed = MOCK_MAINTENANCE.filter((m) => m.status === 'completed').length;

    assert.strictEqual(inProgress, 1);
    assert.strictEqual(scheduled, 1);
    assert.strictEqual(completed, 1);
  });

  test('search queries filter vehicles across plate, model, and driver', () => {
    const query = 'scania';
    const result = MOCK_VEHICLES.filter(
      (v) =>
        v.plate.toLowerCase().includes(query) ||
        v.model.toLowerCase().includes(query) ||
        v.driver.toLowerCase().includes(query)
    );
    assert.strictEqual(result.length, 1);
    assert.strictEqual(result[0].id, 'V-103');
  });

  test('status filtering isolates matching items', () => {
    const maintenanceVehicles = MOCK_VEHICLES.filter((v) => v.status === 'maintenance');
    assert.strictEqual(maintenanceVehicles.length, 1);
    assert.strictEqual(maintenanceVehicles[0].plate, 'GHJ-8H11');
  });
});

