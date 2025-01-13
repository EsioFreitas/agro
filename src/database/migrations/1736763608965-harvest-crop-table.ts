import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class HarvestCropTable1736763608965 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'harvest_crops',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'harvestId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'cropId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'area',
            type: 'decimal',
            precision: 5,
            scale: 2,
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'harvest_crops',
      new TableForeignKey({
        columnNames: ['harvestId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'harvests',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'harvest_crops',
      new TableForeignKey({
        columnNames: ['cropId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'crops',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('harvest_crops');
    if (table) {
      const foreignKeys = table.foreignKeys;
      for (const fk of foreignKeys) {
        await queryRunner.dropForeignKey('harvest_crops', fk);
      }
    }

    await queryRunner.dropTable('harvest_crops');
  }
}
