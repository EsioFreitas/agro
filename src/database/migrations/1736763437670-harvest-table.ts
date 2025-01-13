import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class HarvestTable1736763437670 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'harvests',
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
            name: 'year',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'propertyId',
            type: 'uuid',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'harvests',
      new TableForeignKey({
        columnNames: ['propertyId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'properties',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('harvests');
    if (table) {
      const foreignKey = table.foreignKeys.find(
        (fk) => fk.columnNames.indexOf('propertyId') !== -1,
      );
      if (foreignKey) {
        await queryRunner.dropForeignKey('harvests', foreignKey);
      }
    }

    await queryRunner.dropTable('harvests');
  }
}
