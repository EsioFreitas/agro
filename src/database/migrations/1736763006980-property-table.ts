import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class PropertyTable1736763006980 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'properties',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'city',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'state',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'totalArea',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'farmableArea',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'vegetationArea',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'producerId',
            type: 'uuid',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'properties',
      new TableForeignKey({
        columnNames: ['producerId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'producers',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('properties');
    if (table) {
      const foreignKey = table.foreignKeys.find(
        (fk) => fk.columnNames.indexOf('producerId') !== -1,
      );
      if (foreignKey) {
        await queryRunner.dropForeignKey('properties', foreignKey);
      }
    }

    await queryRunner.dropTable('properties');
    await queryRunner.dropTable('producers');
  }
}
